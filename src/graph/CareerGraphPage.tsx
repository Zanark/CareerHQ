import { Component, lazy, Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Check, ClipboardCopy, Focus,
  Expand, Maximize2, Minimize2, Minus, Network, Pause, Play, Plus, Search, X,
} from 'lucide-react';
import type { AppState, MissionId } from '../domain/types';
import { getMissions } from '../domain/catalog';
import { buildCareerGraph } from './careerGraphModel';
import type { CareerGraphEdge, CareerGraphKind, CareerGraphNode } from './careerGraphModel';
import { CareerGraphConnections } from './CareerGraphConnections';
import { CareerOrbitInspector } from './CareerOrbitInspector';
import type { CareerOrbitSelection } from './careerOrbitTypes';
import type { CareerGraphSceneHandle } from './CareerGraphScene';
import './career-graph.css';

const CareerGraphScene = lazy(() => import('./CareerGraphScene'));
const statusLabels = { complete: 'Recorded done', incomplete: 'Not marked complete', reference: 'Reference' };
const kindLabels: Record<CareerGraphKind, string> = {
  core: 'Career OS', mission: 'Mission', checkpoint: 'Checkpoint', action: 'Daily action',
  evidence: 'Saved-work record', opportunity: 'Opportunity', freelance: 'Research lead',
  history: 'Past accomplishment', curriculum: 'Untracked curriculum',
};
const recordKinds = new Set<CareerGraphKind>(['action', 'evidence', 'opportunity', 'freelance', 'history']);

class GraphSceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Career graph rendering failed.', error.message, info.componentStack);
    this.props.onFailure();
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return <div className="career-graph-unavailable" role="alert">
      <strong>The 3D view could not load.</strong>
      <p>Your records and ring views are still available in the indexes below. Reload the page to retry; this does not clear saved data.</p>
      <button className="button secondary" onClick={() => location.reload()}>Reload 3D view</button>
    </div>;
  }
}

function matchesScope(node: CareerGraphNode, scope: string) {
  return scope === 'all' || node.kind === 'core' || node.missionId === scope;
}

export function CareerGraphPage({ state, practice, date, onRecord }: {
  state: AppState; practice: boolean; date: string; onRecord: (missionId: MissionId) => void;
}) {
  const graph = useMemo(() => buildCareerGraph(state), [state, date]);
  const [scope, setScope] = useState('all');
  const [includeRecords, setIncludeRecords] = useState(true);
  const [includeReferences, setIncludeReferences] = useState(true);
  const [includeSharedSkills, setIncludeSharedSkills] = useState(true);
  const [includeRings, setIncludeRings] = useState(true);
  const [includeSparks, setIncludeSparks] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [orbitSelection, setOrbitSelection] = useState<CareerOrbitSelection | null>(null);
  const [listCount, setListCount] = useState(40);
  const [autoRotate, setAutoRotate] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [animationPaused, setAnimationPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [heartbeat, setHeartbeat] = useState(true);
  const [motionOptIn, setMotionOptIn] = useState(false);
  const [rimOnly, setRimOnly] = useState(false);
  const [sceneStatus, setSceneStatus] = useState<'loading' | 'ready' | 'unavailable' | 'lost'>('loading');
  const [sceneMessage, setSceneMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState('');
  const controls = useRef<CareerGraphSceneHandle>(null);
  const stageRef = useRef<HTMLElement>(null);
  const inspectorRef = useRef<HTMLElement>(null);
  const orbitInspectorRef = useRef<HTMLElement>(null);
  const orbitIndexRef = useRef<HTMLDetailsElement>(null);
  const inspectFromList = useRef(false);
  const inspectOrbitFromList = useRef(false);
  const previousFilter = useRef(`${scope}:${includeRecords}:${includeReferences}`);
  const missionNodes = graph.nodes.filter(node => node.kind === 'mission');
  const nodeMap = useMemo(() => new Map(graph.nodes.map(node => [node.id, node])), [graph]);
  const visible = useMemo(() => {
    const nodes = graph.nodes.filter(node => matchesScope(node, scope) &&
      (includeRecords || !recordKinds.has(node.kind)) &&
      (includeReferences || node.kind === 'core' || node.kind === 'mission' || node.status !== 'reference'));
    const ids = new Set(nodes.map(node => node.id));
    const orbits = graph.orbits.filter(orbit => scope === 'all' || orbit.kind !== 'mission' || orbit.missionId === scope);
    return { ...graph, nodes, orbits, edges: graph.edges.filter(edge => ids.has(edge.source) && ids.has(edge.target) &&
      (includeSharedSkills || edge.kind !== 'shared-skill')) };
  }, [graph, scope, includeRecords, includeReferences, includeSharedSkills]);
  const visibleIds = useMemo(() => new Set(visible.nodes.map(node => node.id)), [visible.nodes]);
  const selected = visible.nodes.find(node => node.id === selectedId);
  const selectedOrbit = graph.orbits.find(orbit => orbit.id === orbitSelection?.orbitId);
  const selectedSegment = selectedOrbit?.segments.find(segment => segment.id === orbitSelection?.segmentId);
  const activeOrbitSelection = useMemo(() => selectedOrbit ? {
    orbitId: selectedOrbit.id, ...(selectedSegment ? { segmentId: selectedSegment.id } : {}),
  } : null, [selectedOrbit?.id, selectedSegment?.id]);
  const recordableOrbitMission = selectedOrbit?.missionId && selectedOrbit.currentNodeId &&
    state.missions[selectedOrbit.missionId].mode === 'active' &&
    state.missions[selectedOrbit.missionId].status !== 'completed' && !state.missions[selectedOrbit.missionId].blocker
    ? selectedOrbit.missionId : undefined;
  const checkpoints = graph.nodes.filter(node => node.kind === 'checkpoint' && !node.archived && matchesScope(node, scope));
  const completed = checkpoints.filter(node => node.status === 'complete').length;
  const filtered = visible.nodes.filter(node => node.kind !== 'core' &&
    `${node.label} ${node.context} ${kindLabels[node.kind]}`.toLowerCase().includes(query.trim().toLowerCase()));
  const sceneReady = sceneStatus === 'ready';
  const onSceneStatus = useCallback((status: 'ready' | 'unavailable' | 'lost', message?: string) => {
    setSceneStatus(status);
    setSceneMessage(message ?? '');
  }, []);
  const onSceneFailure = useCallback(() => setSceneStatus('unavailable'), []);
  const selectNode = useCallback((id: string) => { setSelectedId(id); setOrbitSelection(null); }, []);
  const selectOrbit = useCallback((selection: CareerOrbitSelection) => {
    setOrbitSelection(selection);
    setSelectedId(null);
  }, []);
  useLayoutEffect(() => {
    if (!selected || !inspectFromList.current) return;
    inspectFromList.current = false;
    inspectorRef.current?.focus({ preventScroll: true });
    inspectorRef.current?.scrollIntoView({ block: 'center', behavior: 'instant' });
  }, [selected?.id]);
  useLayoutEffect(() => {
    if (!selectedOrbit || !inspectOrbitFromList.current) return;
    inspectOrbitFromList.current = false;
    orbitInspectorRef.current?.focus({ preventScroll: true });
    orbitInspectorRef.current?.scrollIntoView({ block: 'center', behavior: 'instant' });
  }, [selectedOrbit?.id, selectedSegment?.id]);
  useEffect(() => {
    const update = () => {
      const active = document.fullscreenElement === stageRef.current;
      setFullscreen(active);
      if (active && orbitIndexRef.current) orbitIndexRef.current.open = false;
    };
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, []);
  useEffect(() => {
    const next = `${scope}:${includeRecords}:${includeReferences}`;
    if (previousFilter.current === next) return;
    previousFilter.current = next;
    const frame = requestAnimationFrame(() => controls.current?.resetView());
    return () => cancelAnimationFrame(frame);
  }, [scope, includeRecords, includeReferences]);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { if (motion.matches) { setAutoRotate(false); setAnimationPaused(true); setMotionOptIn(false); } };
    motion.addEventListener('change', update);
    return () => motion.removeEventListener('change', update);
  }, []);

  async function copyBrief() {
    setCopied(false);
    setCopyError('');
    const missions = getMissions(state).filter(mission => scope === 'all' || mission.id === scope);
    const lines = [
      `CareerOS ${practice ? 'TUTORIAL PRACTICE' : state.sampleData ? 'SAMPLE-CONTAINING WORKSPACE' : 'saved-work'} snapshot`,
      `Current saved checkpoints: ${completed}/${checkpoints.length} marked complete.`,
      'This is a user-maintained tracker, not an independent assessment or an AI-generated plan.',
      ...missions.map(mission => {
        const progress = state.missions[mission.id];
        const current = mission.checkpoints.find(checkpoint => checkpoint.id === progress.checkpointId);
        return `${mission.name} (v${mission.roadmapVersion}): ${progress.mode}; ${progress.status}; ${progress.completedCheckpointIds.length}/${mission.checkpoints.length} checkpoints. Saved position: ${current?.title ?? 'Reference only'}.`;
      }),
      ...(selected ? ['', `Selected ${kindLabels[selected.kind]}: ${selected.label}`, statusLabels[selected.status], selected.context, selected.detail] : []),
      ...(selectedOrbit ? ['', `Selected orbit: ${selectedOrbit.label}`, selectedSegment?.summary ?? selectedOrbit.summary,
        selectedOrbit.detail, 'An orbit is a derived data view, not another task or a mastery assessment.'] : []),
      '', 'Use this context to discuss the next step. Do not invent completion or change the tracker without confirmation.',
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
    } catch {
      setCopyError('Clipboard access was denied. Nothing was sent to an AI service.');
    }
  }

  async function toggleFullscreen() {
    setFullscreenError('');
    try {
      if (document.fullscreenElement === stageRef.current) await document.exitFullscreen();
      else await stageRef.current?.requestFullscreen();
    } catch {
      setFullscreenError('This browser could not enter full screen. The 3D view remains available here.');
    }
  }

  function inspectOrbitMember(node: CareerGraphNode) {
    if (!matchesScope(node, scope)) setScope('all');
    if (node.status === 'reference' && node.kind !== 'core' && node.kind !== 'mission') setIncludeReferences(true);
    if (recordKinds.has(node.kind)) setIncludeRecords(true);
    setQuery('');
    setListCount(40);
    inspectFromList.current = true;
    setSelectedId(node.id);
    setOrbitSelection(null);
  }

  function inspectConnection(node: CareerGraphNode, edge: CareerGraphEdge) {
    if (edge.kind === 'shared-skill') setIncludeSharedSkills(true);
    inspectOrbitMember(node);
  }

  function inspectOrbitFromIndex(orbitId: string) {
    const orbit = graph.orbits.find(item => item.id === orbitId)!;
    if (fullscreen && orbitIndexRef.current) orbitIndexRef.current.open = false;
    if (orbit.kind === 'mission' && scope !== 'all' && orbit.missionId !== scope) setScope(orbit.missionId!);
    inspectOrbitFromList.current = true;
    selectOrbit({ orbitId });
    if (selectedOrbit?.id === orbitId && !selectedSegment) {
      inspectOrbitFromList.current = false;
      orbitInspectorRef.current?.focus({ preventScroll: true });
      orbitInspectorRef.current?.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }

  function revealOrbit() {
    if (!selectedOrbit) return;
    setScope(selectedOrbit.kind === 'mission' ? selectedOrbit.missionId! : 'all');
    const ids = selectedSegment ? selectedSegment.members.map(member => member.nodeId) : selectedOrbit.memberIds;
    const members = ids.map(id => nodeMap.get(id)!);
    if (members.some(node => recordKinds.has(node.kind))) setIncludeRecords(true);
    if (members.some(node => node.status === 'reference')) setIncludeReferences(true);
    setIncludeRings(true);
    setQuery('');
    setListCount(40);
  }

  return <div className="career-graph-page">
    <header className="career-graph-heading">
      <div><span className="eyebrow">CAREEROS / CAREER OPERATING SYSTEM</span><h1>Career graph</h1></div>
      <div className="button-row"><a href="#/hq" className="button secondary">Open Overview<ArrowRight size={16} /></a>
        <button className="button secondary" onClick={() => void copyBrief()}><ClipboardCopy size={16} />{copied ? 'Copied' : 'Copy brief for AI'}</button></div>
    </header>
    {(practice || state.sampleData) && <p className="career-graph-data-notice">{practice ? 'Practice graph: temporary tutorial records only.' : 'This workspace includes sample records. The graph is not entirely personal progress.'}</p>}
    {graph.updates.length > 0 && <div className="career-graph-update">
      <span>Expanded roadmaps are available. Untracked curriculum is shown as reference, not assumed progress.</span><a href="#/sources" className="text-link">Review updates<ArrowRight size={14} /></a>
    </div>}
    <div className="career-graph-workspace">
      <section ref={stageRef} className="career-graph-stage-wrap" aria-label="Career network visualization">
        <div className="career-graph-commandbar">
          <div className="career-graph-summary" data-tour="career-graph-summary">
            <div><strong>{completed}<span> / {checkpoints.length}</span></strong><span>CHECKPOINTS COMPLETE</span></div>
            <div><strong>{visible.nodes.filter(node => node.kind !== 'core').length}</strong><span>DATA NODES</span></div>
          </div>
          <div className="career-graph-filters" data-tour="career-graph-filters">
            <label><span className="sr-only">View</span><select aria-label="Filter career graph by mission" value={scope} onChange={event => { setScope(event.target.value); setListCount(40); }}>
              <option value="all">Whole career</option>{missionNodes.map(node => <option key={node.id} value={node.missionId}>{node.label}</option>)}
            </select></label>
            <label className="graph-checkbox"><input type="checkbox" checked={includeRecords} onChange={event => setIncludeRecords(event.target.checked)} />Work records</label>
            <label className="graph-checkbox" title="Notes and untracked curriculum are reference nodes. Mission hubs stay visible."><input type="checkbox" checked={includeReferences} onChange={event => setIncludeReferences(event.target.checked)} />References</label>
            <label className="graph-checkbox" title="Curated curriculum connections, not additional prerequisites or tasks."><input type="checkbox" checked={includeSharedSkills} onChange={event => setIncludeSharedSkills(event.target.checked)} />Shared skill links</label>
            <label className="graph-checkbox" title="Show mission and record-view rings, their anchors and membership tethers. Work nodes and their connections stay visible."><input type="checkbox" checked={includeRings} onChange={event => setIncludeRings(event.target.checked)} />Rings</label>
            <label className="graph-checkbox" title="Show decorative floating dots. Rings, work nodes and the core glow are unchanged."><input type="checkbox" checked={includeSparks} onChange={event => setIncludeSparks(event.target.checked)} />Sparks</label>
          </div>
        </div>
        <div className="career-graph-stage" data-tour="career-graph-stage">
          <GraphSceneBoundary onFailure={onSceneFailure}>
            <Suspense fallback={<div className="career-graph-loading" role="status">Loading the 3D career network...</div>}>
              <CareerGraphScene ref={controls} graph={visible} selectedId={selected?.id ?? null} onSelect={selectNode}
                selectedOrbit={activeOrbitSelection} onOrbitSelect={selectOrbit}
                autoRotate={autoRotate && !animationPaused} animate={!animationPaused} allowReducedMotion={motionOptIn}
                rimOnly={rimOnly} showRings={includeRings} showSparks={includeSparks} heartbeat={heartbeat} onStatusChange={onSceneStatus} />
            </Suspense>
          </GraphSceneBoundary>
          <div className="career-graph-stage-label"><Network size={15} /><span>{practice ? 'PRACTICE NETWORK' : 'CAREER NETWORK'}</span></div>
          <aside ref={inspectorRef} className="career-graph-inspector" hidden={!selected} tabIndex={-1}
            aria-label="Selected career node" data-tour="career-graph-node">
            {selected && <>
              <div className="career-graph-node-meta"><span>{kindLabels[selected.kind]}</span>
                <button type="button" className="icon-button" aria-label="Close node details" onClick={() => setSelectedId(null)}><X size={17} /></button></div>
              <span className={`graph-status-tag ${selected.status}`}>{statusLabels[selected.status]}</span>
              <h2>{selected.label}</h2><p className="career-graph-node-context">{selected.context}</p>
              <p className="career-graph-node-detail">{selected.detail}</p>
              {selected.current && <p className="career-graph-current"><Focus size={15} />Saved current checkpoint</p>}
              <a className="button primary" href={selected.href}>Open related page<ArrowUpRight size={16} /></a>
              <CareerGraphConnections key={selected.id} selectedId={selected.id} edges={graph.edges} nodes={nodeMap}
                visibleIds={visibleIds} includeSharedSkills={includeSharedSkills} onInspect={inspectConnection} />
            </>}
          </aside>
          {selectedOrbit && <CareerOrbitInspector ref={orbitInspectorRef} key={selectedOrbit.id}
            orbit={selectedOrbit} segment={selectedSegment} nodes={nodeMap} visibleIds={visibleIds}
            ringsVisible={includeRings && visible.orbits.some(orbit => orbit.id === selectedOrbit.id)}
            onClose={() => setOrbitSelection(null)} onSelect={selectOrbit} onReveal={revealOrbit} onInspect={inspectOrbitMember}
            onRecord={recordableOrbitMission ? () => onRecord(recordableOrbitMission) : undefined} />}
        </div>
        <div className="career-graph-controls">
          <button className="button secondary" disabled={!sceneReady} onClick={() => controls.current?.resetView()}><Maximize2 size={15} />Frame all</button>
          <button className="icon-button" aria-label="Zoom career graph in" disabled={!sceneReady} onClick={() => controls.current?.zoomIn()}><Plus size={17} /></button>
          <button className="icon-button" aria-label="Zoom career graph out" disabled={!sceneReady} onClick={() => controls.current?.zoomOut()}><Minus size={17} /></button>
          <button className="button secondary" disabled={!sceneReady || !selected} onClick={() => { if (selected) controls.current?.focusNode(selected.id); }}><Focus size={15} />Focus node</button>
          <button className="button secondary" disabled={!sceneReady || !activeOrbitSelection || !includeRings || !visible.orbits.some(orbit => orbit.id === activeOrbitSelection.orbitId)}
            onClick={() => { if (activeOrbitSelection) controls.current?.focusOrbit(activeOrbitSelection); }}><Focus size={15} />Focus ring</button>
          <button className="button secondary" disabled={!sceneReady || !document.fullscreenEnabled} onClick={() => void toggleFullscreen()}>{fullscreen ? <Minimize2 size={15} /> : <Expand size={15} />}{fullscreen ? 'Exit full screen' : 'Full screen'}</button>
          <button className="button secondary" disabled={!sceneReady} aria-pressed={animationPaused}
            onClick={() => { setMotionOptIn(animationPaused); setAnimationPaused(paused => !paused); }}>{animationPaused ? <Play size={15} /> : <Pause size={15} />}{animationPaused ? 'Resume animation' : 'Pause animation'}</button>
          <label className="graph-checkbox" title="A gentle outward-and-back mesh ripple from the white core every 10 seconds; paused with animation.">
            <input type="checkbox" checked={heartbeat} onChange={event => setHeartbeat(event.target.checked)} />Core heartbeat
          </label>
          <button className="button secondary" disabled={!sceneReady || !includeRings} aria-pressed={rimOnly}
            title="Hide ring paths where they cross the center of the camera view. Data anchors and membership links stay visible."
            onClick={() => setRimOnly(value => !value)}>Clear center</button>
          <label className="graph-checkbox"><input type="checkbox" checked={autoRotate} disabled={!sceneReady} onChange={event => setAutoRotate(event.target.checked)} />Auto-rotate</label>
        </div>
        <div className="career-graph-stage-footer">
          <p className="career-graph-hint">Drag to rotate · scroll or pinch to zoom · select a work node or ring anchor.</p>
          <div className="career-graph-legend"><span>Work nodes:</span><span><i className="graph-status-complete" />Done</span><span><i className="graph-status-incomplete" />Unfinished</span><span><i className="graph-status-reference" />Reference</span></div>
          <p className="career-graph-link-key"><i />{visible.edges.filter(edge => edge.kind === 'shared-skill').length} shared skill links · select a node, then Connections for the reason.</p>
          <p className="career-graph-orbit-key">{visible.orbits.length} ring views · active missions: colored outer rings · background/planned: small, gray, stationary inner rings.</p>
        </div>
        <details ref={orbitIndexRef} className="career-orbit-index" data-tour="career-graph-orbits">
          <summary>Explore ring views ({graph.orbits.length})</summary>
          <p>Nine saved-mission views and six record/reference collections. Mission rings follow Bring into focus / Move to background, not just the primary mission. Inspect any ring here, even without 3D.</p>
          <div className="career-orbit-list">{graph.orbits.map(orbit => <button key={orbit.id} type="button"
            data-orbit-id={orbit.id} data-mission-mode={orbit.missionMode}
            aria-pressed={selectedOrbit?.id === orbit.id} onClick={() => inspectOrbitFromIndex(orbit.id)}>
            <i style={{ backgroundColor: orbit.color }} /><span><strong>{orbit.label}</strong>
              {orbit.missionMode && <small>{orbit.missionMode === 'active' ? 'Active - colored outer ring' : `${orbit.missionMode === 'background' ? 'Background' : 'Planned'} - small stationary ring`}</small>}
              <small>{orbit.summary}</small></span>
          </button>)}</div>
        </details>
        {fullscreenError && <p className="career-graph-render-notice" role="alert">{fullscreenError}</p>}
        {(sceneStatus === 'unavailable' || sceneStatus === 'lost') && <p className="career-graph-render-notice" role="status">{sceneMessage || 'The 3D renderer is unavailable. The node list and your saved data remain accessible.'}</p>}
        <details className="career-graph-keyboard"><summary>Keyboard rotation controls</summary><div className="button-row">
          {([['left', ArrowLeft], ['right', ArrowRight], ['up', ArrowUp], ['down', ArrowDown]] as const).map(([direction, Icon]) =>
            <button key={direction} className="button secondary" disabled={!sceneReady} onClick={() => controls.current?.rotate(direction)}><Icon size={15} />Rotate {direction}</button>)}
        </div></details>
      </section>
    </div>
    <section className="career-graph-index" aria-labelledby="career-node-list-title">
      <div className="career-graph-index-heading"><h2 id="career-node-list-title">Find your work</h2>
        <label><Search size={16} /><input data-tour="career-graph-search" aria-label="Search career graph nodes" placeholder="Node name or area" value={query} onChange={event => { setQuery(event.target.value); setListCount(40); }} /></label>
        <span role="status">{filtered.length} matching nodes</span>
      </div>
      <div className="career-graph-node-list" data-tour="career-graph-list">
        {filtered.slice(0, listCount).map(node => <button key={node.id} type="button" aria-pressed={selected?.id === node.id} onClick={() => {
          setOrbitSelection(null);
          if (selectedId === node.id) {
            inspectFromList.current = false;
            inspectorRef.current?.focus({ preventScroll: true });
            inspectorRef.current?.scrollIntoView({ block: 'center', behavior: 'instant' });
          } else {
            inspectFromList.current = true;
            setSelectedId(node.id);
          }
        }}>
          <i className={`graph-status-${node.status}`} /><span><strong>{node.label}</strong><small>{kindLabels[node.kind]} · {statusLabels[node.status]}{node.archived ? ' · Archived' : ''}</small></span>
          {node.status === 'complete' && <Check size={15} />}
        </button>)}
      </div>
      {!filtered.length && <p className="career-graph-empty">No nodes match this view. Change the mission, layers or search text.</p>}
      {filtered.length > listCount && <button className="button secondary" onClick={() => setListCount(count => count + 80)}>Show more nodes</button>}
    </section>
    <footer className="career-graph-footer"><p>Orange links connect actual nodes; their reasons are in Connections. Rings summarize your saved missions and record collections. Their stretching tethers show real membership; selecting a ring reveals its members. Ring views add no tasks or completion credit. Clear center hides ring paths, not their data anchors. Sparks, glow and the core heartbeat are visual atmosphere, not live AI activity. Green is recorded completion, not automatic mastery.</p><p>Copying a brief uses your local clipboard. Nothing is sent to an AI service; review it before sharing.</p>
      {copied && <p role="status">Career brief copied to your clipboard.</p>}{copyError && <p role="alert" className="form-error">{copyError}</p>}
    </footer>
  </div>;
}
