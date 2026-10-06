import { Component, forwardRef, lazy, Suspense, useCallback, useEffect, useId, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, Check, ClipboardCopy, Focus,
  CircleDot, Expand, ListChecks, Maximize2, Minimize2, Minus, Network, Pause, Play, Plus, Search, Settings2, X,
} from 'lucide-react';
import type { AppState, MissionId } from '../domain/types';
import { getMissions } from '../domain/catalog';
import { buildCareerGraph } from './careerGraphModel';
import type { CareerGraphEdge, CareerGraphKind, CareerGraphNode } from './careerGraphModel';
import { CareerGraphConnections } from './CareerGraphConnections';
import { CareerOrbitInspector } from './CareerOrbitInspector';
import { CareerGraphVisibility } from './CareerGraphVisibility';
import { setCareerItemsVisible } from './careerVisibility';
import { DEFAULT_SPARK_DENSITY, MAX_SPARK_DENSITY } from './careerSparkDensity';
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
      <p>Your records and ring views are still available in Find work and Explore ring views. Reload the page to retry; this does not clear saved data.</p>
      <button className="button secondary" onClick={() => location.reload()}>Reload 3D view</button>
    </div>;
  }
}

function matchesScope(node: CareerGraphNode, scope: string) {
  return scope === 'all' || node.kind === 'core' || node.missionId === scope;
}

export type CareerGraphPanel = 'view' | 'rings' | 'visibility' | 'work';
export interface CareerGraphPageHandle {
  openPanel: (panel: CareerGraphPanel) => void;
  closePanels: () => void;
}

const panelNames: Record<CareerGraphPanel, string> = {
  view: 'View options', rings: 'Explore ring views', visibility: 'Choose visible nodes and rings', work: 'Find work',
};

export const CareerGraphPage = forwardRef<CareerGraphPageHandle, {
  state: AppState; practice: boolean; date: string; onRecord: (missionId: MissionId) => void;
}>(function CareerGraphPage({ state, practice, date, onRecord }, ref) {
  const graph = useMemo(() => buildCareerGraph(state), [state, date]);
  const [scope, setScope] = useState('all');
  const [includeRecords, setIncludeRecords] = useState(true);
  const [includeReferences, setIncludeReferences] = useState(true);
  const [includeSharedSkills, setIncludeSharedSkills] = useState(true);
  const [includeRings, setIncludeRings] = useState(true);
  const [includeSparks, setIncludeSparks] = useState(true);
  const [sparkDensity, setSparkDensity] = useState(DEFAULT_SPARK_DENSITY);
  const [hiddenIds, setHiddenIds] = useState<ReadonlySet<string>>(() => new Set());
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
  const [activePanel, setActivePanel] = useState<CareerGraphPanel | null>(null);
  const panelId = useId();
  const panelOpeners = useRef<Partial<Record<CareerGraphPanel, HTMLButtonElement | null>>>({});
  const panelElements = useRef<Partial<Record<CareerGraphPanel, HTMLElement | null>>>({});
  const controls = useRef<CareerGraphSceneHandle>(null);
  const stageRef = useRef<HTMLElement>(null);
  const inspectorRef = useRef<HTMLElement>(null);
  const orbitInspectorRef = useRef<HTMLElement>(null);
  const inspectFromList = useRef(false);
  const inspectOrbitFromList = useRef(false);
  const previousFilter = useRef(`${scope}:${includeRecords}:${includeReferences}`);
  const missionNodes = graph.nodes.filter(node => node.kind === 'mission');
  const nodeMap = useMemo(() => new Map(graph.nodes.map(node => [node.id, node])), [graph]);
  const framingNodes = useMemo(() => graph.nodes.filter(node => matchesScope(node, scope) &&
      (includeRecords || !recordKinds.has(node.kind)) &&
      (includeReferences || node.kind === 'core' || node.kind === 'mission' || node.status !== 'reference')),
    [graph, scope, includeRecords, includeReferences]);
  const visible = useMemo(() => {
    const nodes = framingNodes.filter(node => !hiddenIds.has(node.id));
    const ids = new Set(nodes.map(node => node.id));
    const orbits = graph.orbits.filter(orbit => !hiddenIds.has(orbit.id) &&
      (scope === 'all' || orbit.kind !== 'mission' || orbit.missionId === scope));
    return { ...graph, nodes, orbits, edges: graph.edges.filter(edge => ids.has(edge.source) && ids.has(edge.target) &&
      (includeSharedSkills || edge.kind !== 'shared-skill')) };
  }, [graph, framingNodes, hiddenIds, scope, includeSharedSkills]);
  const visibleIds = useMemo(() => new Set(visible.nodes.map(node => node.id)), [visible.nodes]);
  const visibleOrbitIds = useMemo(() => new Set(includeRings ? visible.orbits.map(orbit => orbit.id) : []), [visible.orbits, includeRings]);
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
  const openPanel = useCallback((panel: CareerGraphPanel) => setActivePanel(panel), []);
  const closePanels = useCallback(() => {
    setActivePanel(null);
    if (activePanel) panelOpeners.current[activePanel]?.focus({ preventScroll: true });
  }, [activePanel]);
  useImperativeHandle(ref, () => ({ openPanel, closePanels }), [openPanel, closePanels]);
  const selectNode = useCallback((id: string) => {
    setSelectedId(id);
    setOrbitSelection(null);
    setActivePanel(null);
  }, []);
  const selectOrbit = useCallback((selection: CareerOrbitSelection) => {
    setOrbitSelection(selection);
    setSelectedId(null);
    setActivePanel(null);
  }, []);
  const changeVisibility = useCallback((ids: readonly string[], show: boolean) => {
    setHiddenIds(current => setCareerItemsVisible(current, ids, show));
  }, []);
  useLayoutEffect(() => {
    if (activePanel || !selected || !inspectFromList.current) return;
    inspectFromList.current = false;
    inspectorRef.current?.focus({ preventScroll: true });
  }, [selected?.id, activePanel]);
  useLayoutEffect(() => {
    if (activePanel || !selectedOrbit || !inspectOrbitFromList.current) return;
    inspectOrbitFromList.current = false;
    orbitInspectorRef.current?.focus({ preventScroll: true });
  }, [selectedOrbit?.id, selectedSegment?.id, activePanel]);
  useLayoutEffect(() => {
    if (!activePanel) return;
    const panel = panelElements.current[activePanel];
    const target = activePanel === 'work'
      ? panel?.querySelector<HTMLInputElement>('[data-tour="career-graph-search"]')
      : panel;
    target?.focus({ preventScroll: true });
  }, [activePanel]);
  useEffect(() => {
    if (!activePanel) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.isComposing || !(event.target instanceof Node)
        || !stageRef.current?.contains(event.target)) return;
      event.preventDefault();
      event.stopPropagation();
      closePanels();
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [activePanel, closePanels]);
  useEffect(() => {
    const update = () => {
      const active = document.fullscreenElement === stageRef.current;
      setFullscreen(active);
      closePanels();
    };
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, [closePanels]);
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
    changeVisibility([node.id], true);
    if (!matchesScope(node, scope)) setScope('all');
    if (node.status === 'reference' && node.kind !== 'core' && node.kind !== 'mission') setIncludeReferences(true);
    if (recordKinds.has(node.kind)) setIncludeRecords(true);
    setQuery('');
    setListCount(40);
    inspectFromList.current = true;
    selectNode(node.id);
  }

  function inspectConnection(node: CareerGraphNode, edge: CareerGraphEdge) {
    if (edge.kind === 'shared-skill') setIncludeSharedSkills(true);
    inspectOrbitMember(node);
  }

  function inspectOrbitFromIndex(orbitId: string) {
    const orbit = graph.orbits.find(item => item.id === orbitId)!;
    if (orbit.kind === 'mission' && scope !== 'all' && orbit.missionId !== scope) setScope(orbit.missionId!);
    inspectOrbitFromList.current = true;
    selectOrbit({ orbitId });
  }

  function revealOrbit() {
    if (!selectedOrbit) return;
    setScope(selectedOrbit.kind === 'mission' ? selectedOrbit.missionId! : 'all');
    const ids = selectedSegment ? selectedSegment.members.map(member => member.nodeId) : selectedOrbit.memberIds;
    changeVisibility([selectedOrbit.id, selectedOrbit.hubNodeId, ...ids], true);
    const members = ids.map(id => nodeMap.get(id)!);
    if (members.some(node => recordKinds.has(node.kind))) setIncludeRecords(true);
    if (members.some(node => node.status === 'reference')) setIncludeReferences(true);
    setIncludeRings(true);
    setQuery('');
    setListCount(40);
  }

  function panelAttributes(panel: CareerGraphPanel) {
    return {
      id: `${panelId}-${panel}`,
      ref: (element: HTMLElement | null) => { panelElements.current[panel] = element; },
      hidden: activePanel !== panel,
      'data-graph-panel': panel,
      'data-open': activePanel === panel,
      'aria-labelledby': `${panelId}-${panel}-title`,
      tabIndex: -1,
    };
  }

  function panelHeading(panel: CareerGraphPanel) {
    return <header className="career-graph-panel-heading">
      <h2 id={`${panelId}-${panel}-title`}>{panel === 'work' ? 'Find your work' : panelNames[panel]}</h2>
      <button type="button" className="icon-button" aria-label={`Close ${panelNames[panel].toLowerCase()}`}
        title="Close panel (Escape)" onClick={closePanels}><X size={18} /></button>
    </header>;
  }

  return <div className="career-graph-page">
    <div className="career-graph-workspace">
      <section ref={stageRef} className="career-graph-stage-wrap" aria-label="Career network visualization">
        <header className="career-graph-commandbar">
          <div className="career-graph-heading"><Network size={18} aria-hidden="true" /><h1>Career graph</h1>
            {(practice || state.sampleData) && <span className="career-graph-context-badge"
              title={practice ? 'Temporary tutorial records only.' : 'This workspace includes sample records; not entirely personal progress.'}>
              {practice ? 'Practice' : 'Sample data'}
            </span>}
          </div>
          <div className="career-graph-summary" data-tour="career-graph-summary">
            <div title="Saved checkpoints marked complete"><strong>{completed}<span> / {checkpoints.length}</span></strong><span><span className="sr-only">checkpoints </span>done</span></div>
            <div title="Visible work and reference nodes"><strong>{visible.nodes.filter(node => node.kind !== 'core').length}</strong><span>nodes</span></div>
          </div>
          <nav className="career-graph-panel-openers" aria-label="Graph panels">
            {([
              ['view', 'View', Settings2], ['rings', 'Rings', CircleDot],
              ['visibility', 'Nodes', ListChecks], ['work', 'Work', Search],
            ] as const).map(([panel, label, Icon]) => <button key={panel} type="button"
              ref={element => { panelOpeners.current[panel] = element; }}
              className={`button secondary${panel === 'visibility' ? ' career-visibility-open' : ''}`}
              aria-label={panelNames[panel]} title={panelNames[panel]} aria-expanded={activePanel === panel}
              aria-controls={`${panelId}-${panel}`}
              data-graph-panel-trigger={panel}
              data-tour={panel === 'rings' ? 'career-graph-orbits' : panel === 'visibility' ? 'career-graph-visibility' : undefined}
              onClick={() => activePanel === panel ? closePanels() : openPanel(panel)}>
              <Icon size={16} /><span>{label}</span>
            </button>)}
          </nav>
        </header>
        {fullscreenError && <p className="career-graph-render-notice" role="alert">{fullscreenError}</p>}
        {(sceneStatus === 'unavailable' || sceneStatus === 'lost') && <p className="career-graph-render-notice" role="status">{sceneMessage || 'The 3D renderer is unavailable. Find work and Explore ring views still show your saved data.'}</p>}
        <div className="career-graph-stage" data-tour="career-graph-stage">
          <GraphSceneBoundary onFailure={onSceneFailure}>
            <Suspense fallback={<div className="career-graph-loading" role="status">Loading the 3D career network...</div>}>
              <CareerGraphScene ref={controls} graph={visible} framingNodes={framingNodes} selectedId={selected?.id ?? null} onSelect={selectNode}
                selectedOrbit={activeOrbitSelection} onOrbitSelect={selectOrbit}
                autoRotate={autoRotate && !animationPaused} animate={!animationPaused} allowReducedMotion={motionOptIn}
                rimOnly={rimOnly} showRings={includeRings} showSparks={includeSparks} sparkDensity={sparkDensity} heartbeat={heartbeat} onStatusChange={onSceneStatus} />
            </Suspense>
          </GraphSceneBoundary>
          {graph.updates.length > 0 && <a href="#/sources" className="career-graph-update-link"
            title="Expanded roadmaps are available. Untracked curriculum is reference, not assumed progress.">Source updates available<ArrowUpRight size={13} /></a>}
          <div className="career-graph-inspectors" hidden={activePanel !== null}>
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
          <div className="career-graph-controls" role="group" aria-label="Graph camera and animation">
            <button className="button secondary career-graph-frame" title="Frame all" disabled={!sceneReady}
             onClick={() => controls.current?.resetView()}><Maximize2 size={16} /><span>Frame all</span></button>
            <button className="icon-button" aria-label="Zoom career graph in" title="Zoom career graph in" disabled={!sceneReady} onClick={() => controls.current?.zoomIn()}><Plus size={17} /></button>
            <button className="icon-button" aria-label="Zoom career graph out" title="Zoom career graph out" disabled={!sceneReady} onClick={() => controls.current?.zoomOut()}><Minus size={17} /></button>
            {selected && <button className="button secondary career-graph-compact-control" aria-label="Focus node" title="Focus node" disabled={!sceneReady}
             onClick={() => controls.current?.focusNode(selected.id)}><Focus size={16} /><span>Focus node</span></button>}
            {activeOrbitSelection && <button className="button secondary career-graph-compact-control" aria-label="Focus ring" title="Focus ring"
             disabled={!sceneReady || !includeRings || !visible.orbits.some(orbit => orbit.id === activeOrbitSelection.orbitId)}
             onClick={() => controls.current?.focusOrbit(activeOrbitSelection)}><Focus size={16} /><span>Focus ring</span></button>}
            <button className="button secondary career-graph-compact-control" disabled={!sceneReady} aria-pressed={animationPaused}
             aria-label={animationPaused ? 'Resume animation' : 'Pause animation'} title={animationPaused ? 'Resume animation' : 'Pause animation'}
             onClick={() => { setMotionOptIn(animationPaused); setAnimationPaused(paused => !paused); }}>
             {animationPaused ? <Play size={16} /> : <Pause size={16} />}<span>{animationPaused ? 'Resume animation' : 'Pause animation'}</span>
            </button>
            <button className="button secondary career-graph-compact-control" disabled={!sceneReady || !document.fullscreenEnabled}
             aria-label={fullscreen ? 'Exit full screen' : 'Full screen'} title={fullscreen ? 'Exit full screen' : 'Full screen'}
             onClick={() => void toggleFullscreen()}>
             {fullscreen ? <Minimize2 size={16} /> : <Expand size={16} />}<span>{fullscreen ? 'Exit full screen' : 'Full screen'}</span>
            </button>
          </div>
          <section {...panelAttributes('view')} className="career-graph-panel career-graph-view">
            {panelHeading('view')}
            <div className="career-graph-panel-body">
             {(practice || state.sampleData) && <p className="career-graph-data-notice">{practice ? 'Practice graph: temporary tutorial records only.' : 'This workspace includes sample records. The graph is not entirely personal progress.'}</p>}
             <div className="career-graph-filters" data-tour="career-graph-filters">
               <label className="career-graph-mission-filter">Mission view<select aria-label="Filter career graph by mission" value={scope} onChange={event => { setScope(event.target.value); setListCount(40); }}>
                 <option value="all">Whole career</option>{missionNodes.map(node => <option key={node.id} value={node.missionId}>{node.label}</option>)}
               </select></label>
               <label className="graph-checkbox"><input type="checkbox" checked={includeRecords} onChange={event => setIncludeRecords(event.target.checked)} />Work records</label>
               <label className="graph-checkbox" title="Notes and untracked curriculum are reference nodes. Mission hubs stay visible."><input type="checkbox" checked={includeReferences} onChange={event => setIncludeReferences(event.target.checked)} />References</label>
               <label className="graph-checkbox" title="Curated curriculum connections, not additional prerequisites or tasks."><input type="checkbox" checked={includeSharedSkills} onChange={event => setIncludeSharedSkills(event.target.checked)} />Shared skill links</label>
               <label className="graph-checkbox" title="Show mission and record-view rings, their anchors and membership tethers. Work nodes and their connections stay visible."><input type="checkbox" checked={includeRings} onChange={event => setIncludeRings(event.target.checked)} />Rings</label>
               <div className="career-spark-controls">
                 <label className="graph-checkbox" title="Show decorative floating dots. Rings, work nodes and the core glow are unchanged."><input type="checkbox" checked={includeSparks} onChange={event => setIncludeSparks(event.target.checked)} />Sparks</label>
                 <label className="career-spark-density" title={includeSparks ? 'Spark amount: 0% shows none; 100% restores the previous full amount.' : 'Enable Sparks to adjust the amount.'}>
                   <span className="sr-only">Spark amount</span>
                   <input type="range" aria-label="Spark amount" min={0} max={MAX_SPARK_DENSITY} step={5}
                     value={sparkDensity} aria-valuetext={`${sparkDensity}%`} disabled={!includeSparks}
                     onChange={event => setSparkDensity(event.currentTarget.valueAsNumber)} />
                   <span aria-hidden="true">{sparkDensity}%</span>
                 </label>
               </div>
               <label className="graph-checkbox"><input type="checkbox" checked={autoRotate} disabled={!sceneReady} onChange={event => setAutoRotate(event.target.checked)} />Auto-rotate</label>
               <label className="graph-checkbox" title="A gentle outward-and-back mesh ripple from the white core every 10 seconds; paused with animation.">
                 <input type="checkbox" checked={heartbeat} onChange={event => setHeartbeat(event.target.checked)} />Core heartbeat
               </label>
               <button className="button secondary" disabled={!sceneReady || !includeRings} aria-pressed={rimOnly}
                 title="Hide ring paths where they cross the center of the camera view. Data anchors and membership links stay visible."
                 onClick={() => setRimOnly(value => !value)}>Clear center</button>
             </div>
             <div className="button-row career-graph-page-actions">
               <a href="#/hq" className="button secondary">Open Overview<ArrowRight size={16} /></a>
               <button className="button secondary" onClick={() => void copyBrief()}><ClipboardCopy size={16} />{copied ? 'Copied' : 'Copy brief for AI'}</button>
             </div>
             {copied && <p role="status">Career brief copied to your clipboard.</p>}{copyError && <p role="alert" className="form-error">{copyError}</p>}
             {graph.updates.length > 0 && <div className="career-graph-update">
               <p>Expanded roadmaps are available. Untracked curriculum is shown as reference, not assumed progress.</p><a href="#/sources" className="text-link">Review updates<ArrowRight size={14} /></a>
             </div>}
             <details className="career-graph-keyboard"><summary>Keyboard rotation controls</summary><div className="button-row">
               {([['left', ArrowLeft], ['right', ArrowRight], ['up', ArrowUp], ['down', ArrowDown]] as const).map(([direction, Icon]) =>
                 <button key={direction} className="button secondary" disabled={!sceneReady} onClick={() => controls.current?.rotate(direction)}><Icon size={15} />Rotate {direction}</button>)}
             </div></details>
             <div className="career-graph-stage-footer">
               <p className="career-graph-hint">Drag to rotate · scroll or pinch to zoom · select a work node or ring anchor.</p>
               <div className="career-graph-legend"><span>Work nodes:</span><span><i className="graph-status-complete" />Done</span><span><i className="graph-status-incomplete" />Unfinished</span><span><i className="graph-status-reference" />Reference</span></div>
               <p className="career-graph-link-key"><i />{visible.edges.filter(edge => edge.kind === 'shared-skill').length} shared skill links · select a node, then Connections for the reason.</p>
               <p className="career-graph-orbit-key">{visible.orbits.length} ring views · active missions: colored outer rings · background/planned: small, gray, stationary inner rings.</p>
             </div>
             <footer className="career-graph-footer">
               <p className="button-row"><a href="#/guide">Help &amp; glossary</a><a href="#/settings">Data &amp; backups</a></p>
               <p>Orange links connect actual nodes; their reasons are in Connections. Rings summarize your saved missions and record collections. Their stretching tethers show real membership; selecting a ring reveals its members. Ring views add no tasks or completion credit. Clear center hides ring paths, not their data anchors. Sparks, glow and the core heartbeat are visual atmosphere, not live AI activity. Green is recorded completion, not automatic mastery.</p>
               <p>Copying a brief uses your local clipboard. Nothing is sent to an AI service; review it before sharing.</p>
             </footer>
            </div>
          </section>
          <section {...panelAttributes('rings')} className="career-graph-panel career-orbit-index">
            {panelHeading('rings')}
            <div className="career-graph-panel-body">
             <p>{graph.orbits.length} ring views: nine saved missions and six record/reference collections. Mission rings follow Bring into focus / Move to background, not just the primary mission. Inspect any ring here, even without 3D.</p>
             <div className="career-orbit-list">{graph.orbits.map(orbit => <button key={orbit.id} type="button"
               data-orbit-id={orbit.id} data-mission-mode={orbit.missionMode}
               aria-pressed={selectedOrbit?.id === orbit.id} onClick={() => inspectOrbitFromIndex(orbit.id)}>
               <i style={{ backgroundColor: orbit.color }} /><span><strong>{orbit.label}</strong>
                 {orbit.missionMode && <small>{orbit.missionMode === 'active' ? 'Active - colored outer ring' : `${orbit.missionMode === 'background' ? 'Background' : 'Planned'} - small stationary ring`}</small>}
                 <small>{orbit.summary}</small></span>
             </button>)}</div>
            </div>
          </section>
          <section {...panelAttributes('visibility')} className="career-graph-panel">
            {panelHeading('visibility')}
            <div className="career-graph-panel-body">
             <CareerGraphVisibility graph={graph} hiddenIds={hiddenIds}
               visibleNodeIds={visibleIds} visibleOrbitIds={visibleOrbitIds} kindLabels={kindLabels}
               onChange={changeVisibility} />
            </div>
          </section>
          <section {...panelAttributes('work')} className="career-graph-panel career-graph-index">
            {panelHeading('work')}
            <div className="career-graph-panel-body">
             <div className="career-graph-index-heading">
               <label><Search size={16} /><input data-tour="career-graph-search" aria-label="Search career graph nodes" placeholder="Node name or area" value={query} onChange={event => { setQuery(event.target.value); setListCount(40); }} /></label>
               <span role="status">{filtered.length} matching nodes</span>
             </div>
             <div className="career-graph-node-list" data-tour="career-graph-list">
               {filtered.slice(0, listCount).map(node => <button key={node.id} type="button" aria-pressed={selected?.id === node.id} onClick={() => {
                 inspectFromList.current = true;
                 selectNode(node.id);
               }}>
                 <i className={`graph-status-${node.status}`} /><span><strong>{node.label}</strong><small>{kindLabels[node.kind]} · {statusLabels[node.status]}{node.archived ? ' · Archived' : ''}</small></span>
                 {node.status === 'complete' && <Check size={15} />}
               </button>)}
             </div>
             {!filtered.length && <p className="career-graph-empty">No nodes match this view. Change the mission, layers or search text.</p>}
             {filtered.length > listCount && <button className="button secondary" onClick={() => setListCount(count => count + 80)}>Show more nodes</button>}
            </div>
          </section>
        </div>
      </section>
    </div>
  </div>;
});
