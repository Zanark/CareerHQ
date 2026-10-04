import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { BookOpen, Check, Flag, Focus, LockKeyhole, Maximize2, Minus, Plus } from 'lucide-react';
import { getLatestMission, getProgressForVersion, prerequisitesFor } from '../domain/catalog';
import type { AppState, Checkpoint, Mission } from '../domain/types';
import { Modal } from '../components';
import { Diagram } from './Diagram';
import type { DiagramEdge } from './Diagram';
import { checkpointLevels, roadmapGroups } from './roadmapGraph';
import './full-roadmap.css';
import { dsaStudySectionFor } from '../domain/operations/dsaStudy';

type Anchor = 'fit' | 'current' | { x: number; y: number } | { checkpointId: string };
const stageNodeId = (id: string) => `full-stage-${id}`;

export function FullMissionRoadmap({ mission, state, onClose }: {
  mission: Mission; state: AppState; onClose: () => void;
}) {
  const latest = getLatestMission(mission.id);
  const hasExpandedDsa = mission.id === 'pattern' && mission.roadmapVersion !== latest.roadmapVersion;
  const [showSaved, setShowSaved] = useState(false);
  const preview = hasExpandedDsa && !showSaved;
  const displayed = preview ? latest : mission;
  const groupCount = roadmapGroups(displayed).length;
  const subtitle = `${groupCount} stages · ${displayed.checkpoints.length} ${preview ? 'checkpoints' : 'tracked checkpoints'} · ${preview ? 'Preview' : 'Tracker'} v${displayed.roadmapVersion}`;

  return <Modal title={`${mission.name} full roadmap`} subtitle={subtitle}
    eyebrow={mission.operation} className={`full-roadmap-modal ${preview ? 'full-roadmap-preview' : ''}`} onClose={onClose} restoreFocus>
    {hasExpandedDsa && <div className="full-roadmap-version-bar" data-tour="full-map-version">
      <label>View<select aria-label="Roadmap view" value={showSaved ? 'saved' : 'complete'}
        onChange={event => setShowSaved(event.target.value === 'saved')}>
        <option value="complete">Complete curriculum · v{latest.roadmapVersion}</option>
        <option value="saved">My saved tracker · v{mission.roadmapVersion}</option>
      </select></label>
      <span>{preview ? `Saved: v${mission.roadmapVersion}` : 'Your saved progress'}</span>
      <a className="text-link" href={`#/sources/${mission.id}`}>Review tracker update</a>
    </div>}
    <RoadmapCanvas key={`${displayed.id}-${displayed.roadmapVersion}`} mission={displayed}
      savedMission={mission} preview={preview} state={state} onClose={onClose} />
  </Modal>;
}

function RoadmapCanvas({ mission, savedMission, preview, state, onClose }: {
  mission: Mission; savedMission: Mission; preview: boolean; state: AppState; onClose: () => void;
}) {
  const progress = preview ? undefined : getProgressForVersion(state, mission.id, mission.roadmapVersion);
  const savedProgress = state.missions[savedMission.id];
  const savedCheckpoint = savedMission.checkpoints.find(checkpoint => checkpoint.id === savedProgress.checkpointId);
  const completed = useMemo(() => new Set(progress?.completedCheckpointIds ?? []), [progress]);
  const current = progress?.status !== 'completed'
    ? mission.checkpoints.find(checkpoint => checkpoint.id === progress?.checkpointId)
    : undefined;
  const groups = useMemo(() => roadmapGroups(mission).map(group => {
    const levels = checkpointLevels(mission, group.checkpoints);
    const columns = Math.max(1, ...levels.map(level => level.length));
    return { ...group, levels, width: columns * 280 + (columns - 1) * 24 + 48 };
  }), [mission]);
  const edges = useMemo<DiagramEdge[]>(() => {
    const membership = new Map(groups.flatMap(group => group.checkpoints.map(checkpoint => [checkpoint.id, group.id] as const)));
    return mission.checkpoints.flatMap(checkpoint => prerequisitesFor(mission, checkpoint).map(parent => {
      const across = membership.get(parent) !== membership.get(checkpoint.id);
      return {
        from: parent, to: checkpoint.id,
        kind: across ? 'cross-stage' : 'down',
        via: across ? stageNodeId(membership.get(parent)!) : undefined,
        tone: completed.has(parent) ? 'complete' : checkpoint.id === current?.id ? 'current' : 'normal',
      };
    }));
  }, [mission, groups, completed, current?.id]);

  const viewport = useRef<HTMLDivElement>(null);
  const graph = useRef<HTMLDivElement>(null);
  const currentNode = useRef<HTMLButtonElement>(null);
  const checkpointNodes = useRef(new Map<string, HTMLButtonElement>());
  const pendingAnchor = useRef<Anchor | null>(null);
  const drag = useRef<{ id: number; x: number; y: number; left: number; top: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState({ width: 1, height: 1, viewportWidth: 1, viewportHeight: 1, ready: false });
  const [view, setView] = useState<{ zoom: number | null; revision: number }>({ zoom: null, revision: 0 });
  const [selectedId, setSelectedId] = useState<string | undefined>(current?.id ?? mission.checkpoints[0]?.id);
  const selected = mission.checkpoints.find(checkpoint => checkpoint.id === selectedId);
  const studySection = mission.id === 'pattern' ? dsaStudySectionFor(selected) : undefined;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const fit = Math.min(1, Math.max(1, size.viewportWidth - 48) / size.width, Math.max(1, size.viewportHeight - 48) / size.height);
  const zoom = view.zoom ?? fit;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('hashchange', onClose);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('hashchange', onClose);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    const surface = viewport.current;
    const content = graph.current;
    if (!surface || !content) return;
    let frame = 0;
    const measure = () => {
      if (!surface.clientWidth || !surface.clientHeight || !content.offsetWidth || !content.offsetHeight) return;
      const next = {
        width: content.offsetWidth, height: content.offsetHeight,
        viewportWidth: surface.clientWidth, viewportHeight: surface.clientHeight, ready: true,
      };
      setSize(previous => previous.width === next.width && previous.height === next.height &&
        previous.viewportWidth === next.viewportWidth && previous.viewportHeight === next.viewportHeight &&
        previous.ready === next.ready ? previous : next);
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    observer.observe(surface);
    observer.observe(content);
    measure();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  useLayoutEffect(() => {
    const surface = viewport.current;
    const content = graph.current;
    const anchor = pendingAnchor.current;
    if (!surface || !content || !size.ready || !anchor) return;
    pendingAnchor.current = null;
    if (anchor === 'fit') {
      surface.scrollTo({ left: 0, top: 0 });
      return;
    }
    const surfaceBox = surface.getBoundingClientRect();
    const contentBox = content.getBoundingClientRect();
    const node = anchor === 'current' ? currentNode.current :
      'checkpointId' in anchor ? checkpointNodes.current.get(anchor.checkpointId) : undefined;
    const checkpointBox = node?.getBoundingClientRect();
    const x = checkpointBox ? checkpointBox.left + checkpointBox.width / 2 :
      typeof anchor === 'object' && 'x' in anchor ? contentBox.left + anchor.x * zoom : contentBox.left;
    const y = checkpointBox ? checkpointBox.top + checkpointBox.height / 2 :
      typeof anchor === 'object' && 'y' in anchor ? contentBox.top + anchor.y * zoom : contentBox.top;
    surface.scrollTo({
      left: surface.scrollLeft + x - surfaceBox.left - surface.clientWidth / 2,
      top: surface.scrollTop + y - surfaceBox.top - surface.clientHeight / 2,
    });
    node?.focus({ preventScroll: true });
  }, [view, size, zoom]);

  function changeZoom(value: number | null, anchor?: 'fit' | 'current' | { checkpointId: string }) {
    const surface = viewport.current;
    const content = graph.current;
    if (!surface || !content) return;
    const surfaceBox = surface.getBoundingClientRect();
    const contentBox = content.getBoundingClientRect();
    pendingAnchor.current = anchor ?? {
      x: (surfaceBox.left + surface.clientWidth / 2 - contentBox.left) / zoom,
      y: (surfaceBox.top + surface.clientHeight / 2 - contentBox.top) / zoom,
    };
    setView(previous => ({
      zoom: value === null ? null : Math.max(Math.min(fit, 0.25), Math.min(2, value)),
      revision: previous.revision + 1,
    }));
  }

  function beginPan(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || event.button !== 0 || (event.target instanceof Element && event.target.closest('button'))) return;
    const surface = event.currentTarget;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: surface.scrollLeft, top: surface.scrollTop };
    surface.setPointerCapture(event.pointerId);
    setDragging(true);
    event.preventDefault();
  }

  function endPan(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    drag.current = null;
    setDragging(false);
  }

  function statusOf(checkpoint: Checkpoint) {
    if (preview) return 'reference';
    return completed.has(checkpoint.id) ? 'complete' : checkpoint.id === current?.id ? 'current'
      : progress && prerequisitesFor(mission, checkpoint).every(id => completed.has(id)) ? 'available' : 'locked';
  }

  return <>
    <div className="full-roadmap-toolbar">
      <button className="button secondary" data-tour="full-map-fit" onClick={() => changeZoom(null, 'fit')} aria-pressed={view.zoom === null}><Maximize2 size={17} />Fit all</button>
      {!preview && <button className="button primary" data-tour="full-map-current" disabled={!current} onClick={() => {
        setSelectedId(current?.id);
        setDetailsOpen(false);
        changeZoom(1, 'current');
      }}><Focus size={17} />Current checkpoint</button>}
      {mission.id === 'pattern' && <select className="full-roadmap-topic-finder" aria-label="Find a roadmap topic" value=""
        onChange={event => {
          const checkpoint = mission.checkpoints.find(candidate => candidate.id === event.target.value);
          if (!checkpoint) return;
          setSelectedId(checkpoint.id);
          setDetailsOpen(true);
          changeZoom(1, { checkpointId: checkpoint.id });
        }}>
        <option value="" disabled>Find a topic...</option>
        {mission.checkpoints.map(checkpoint => <option key={checkpoint.id} value={checkpoint.id}>{checkpoint.title}</option>)}
      </select>}
      <div className="full-roadmap-zoom" role="group" aria-label="Roadmap zoom">
        <button className="icon-button" data-tour="full-map-zoom-out" aria-label="Zoom out" disabled={zoom <= Math.min(fit, 0.25)} onClick={() => changeZoom(zoom / 1.5)}><Minus size={18} /></button>
        <output aria-label="Roadmap zoom level">{Math.round(zoom * 100)}%</output>
        <button className="icon-button" data-tour="full-map-zoom-in" aria-label="Zoom in" disabled={zoom >= 2} onClick={() => changeZoom(zoom * 1.5)}><Plus size={18} /></button>
        <button className="text-button" data-tour="full-map-readable" onClick={() => changeZoom(1)}>100%</button>
      </div>
    </div>
    <p className="full-roadmap-hint" id="full-roadmap-help">Zoom to read. Drag or scroll to explore. Viewing never changes progress.</p>
    <div className={`full-roadmap-viewport ${dragging ? 'is-dragging' : ''}`} ref={viewport} data-tour="full-map-canvas"
      role="region" aria-label="Full roadmap canvas" aria-describedby="full-roadmap-help" tabIndex={0}
      onPointerDown={beginPan} onPointerUp={endPan} onPointerCancel={endPan}
      onLostPointerCapture={() => { drag.current = null; setDragging(false); }}
      onPointerMove={event => {
        const start = drag.current;
        if (!start || start.id !== event.pointerId) return;
        event.currentTarget.scrollLeft = start.left - (event.clientX - start.x);
        event.currentTarget.scrollTop = start.top - (event.clientY - start.y);
      }}>
      <div className="full-roadmap-space">
        <div className="full-roadmap-plane" data-ready={size.ready} style={{ width: size.width * zoom, height: size.height * zoom }}>
          <div className="full-roadmap-graph" ref={graph} style={{ transform: `scale(${zoom})` }}>
            <Diagram edges={edges} className="full-roadmap-connections">
              <div className="full-roadmap-stages">
                {groups.map(group => <section key={group.id} data-full-stage={group.id}
                  data-diagram-node={stageNodeId(group.id)} className={`full-roadmap-stage ${group.optional ? 'optional' : ''}`} style={{ width: group.width }}>
                  <header className="full-roadmap-stage-heading">
                    <span>{group.optional ? 'Optional reference' : group.checkpoints.length ? `${group.checkpoints.length} ${group.checkpoints.length === 1 ? 'checkpoint' : 'checkpoints'}` : mission.planned ? 'Planning reference' : 'Parallel / supporting work'}</span>
                    <h3>{group.title}</h3>
                  </header>
                  {group.levels.map((level, index) => <div className="full-roadmap-level" key={index}>
                    {level.map(checkpoint => {
                      const status = statusOf(checkpoint);
                      return <button key={checkpoint.id} ref={node => {
                        if (node) checkpointNodes.current.set(checkpoint.id, node);
                        else checkpointNodes.current.delete(checkpoint.id);
                        if (status === 'current') currentNode.current = node;
                      }}
                        className={`full-roadmap-node ${status}`} data-diagram-node={checkpoint.id}
                        data-full-checkpoint={checkpoint.id} data-full-current={status === 'current' ? 'true' : undefined}
                        data-tour={checkpoint.id === mission.checkpoints.at(-1)?.id ? 'full-map-last-node' : undefined}
                        aria-current={status === 'current' ? 'step' : undefined} aria-pressed={selected?.id === checkpoint.id}
                        onClick={() => { setSelectedId(checkpoint.id); setDetailsOpen(true); }}>
                        <span className="full-roadmap-state">{status === 'complete' ? <Check size={16} /> : status === 'current' ? <Flag size={16} /> : status === 'reference' ? <BookOpen size={16} /> : <LockKeyhole size={16} />}
                          {status === 'complete' ? 'Completed' : status === 'current' ? 'Current checkpoint' : status === 'available' ? 'Available' : status === 'reference' ? 'Not tracked' : 'Locked'}</span>
                        <strong>{checkpoint.sourceId && !checkpoint.title.startsWith(checkpoint.sourceId) ? `${checkpoint.sourceId} · ` : ''}{checkpoint.title}</strong>
                        {status === 'current' && <span className="full-roadmap-here">You are here</span>}
                      </button>;
                    })}
                  </div>)}
                  {!group.checkpoints.length && <div className="full-roadmap-reference" data-full-reference>
                    <p>{group.summary}</p>
                    <ul>{group.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
                    <strong>Reference only; no completion credit.</strong>
                  </div>}
                </section>)}
                {!groups.length && <p className="diagram-pending">This roadmap has no defined stages or checkpoints yet. No progress has been invented.</p>}
              </div>
            </Diagram>
          </div>
        </div>
      </div>
    </div>
    <div className="full-roadmap-inspector">
      {preview ? <p className="full-roadmap-summary">
        {savedProgress.status === 'completed' ? `Your saved v${savedMission.roadmapVersion} tracker is complete.` : <>Saved v{savedMission.roadmapVersion} checkpoint: <strong>{savedCheckpoint?.title}</strong>.</>}
        {' '}Progress unchanged.
      </p> : !current && <p className="full-roadmap-summary">{progress?.status === 'completed' ? 'All tracked checkpoints complete. Your saved work is preserved.' : 'Planning / reference material only. There is no current checkpoint.'}</p>}
      {selected && <details open={detailsOpen} onToggle={event => setDetailsOpen(event.currentTarget.open)}>
        <summary><span>{selected.id === current?.id ? 'Your current checkpoint' : 'Inspect checkpoint'}</span><strong>{selected.title}</strong><span>Details</span></summary>
        <div className="full-roadmap-details"><p>{selected.action}</p><h4>Completion criteria</h4><ul>{selected.criteria.map(criterion => <li key={criterion}>{criterion}</li>)}</ul>
          {prerequisitesFor(mission, selected).length > 0 && <p><strong>Requires: </strong>{prerequisitesFor(mission, selected).map(id => mission.checkpoints.find(checkpoint => checkpoint.id === id)?.title).join(', ')}</p>}
          {!!selected.topics?.length && <><h4>Topics</h4><ul>{selected.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></>}
          {studySection && <p><a className="text-link" href={`#/dsa/${studySection.number}`}>Open this topic's practice set</a></p>}
          <p>View only. Record evidence from the mission page to update progress.</p>
        </div>
      </details>}
      {mission.roadmapVersion !== getLatestMission(mission.id).roadmapVersion && <p className="full-roadmap-summary">This is your saved v{mission.roadmapVersion} roadmap. <a href={`#/sources/${mission.id}`}>Review the newer operation documents</a> before adopting a different version.</p>}
    </div>
  </>;
}
