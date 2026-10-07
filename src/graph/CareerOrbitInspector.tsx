import { forwardRef, useId, useState } from 'react';
import { ArrowUpRight, Focus, X } from 'lucide-react';
import type { CareerGraphNode } from './careerGraphModel';
import type { CareerOrbit, CareerOrbitSegment, CareerOrbitSelection } from './careerOrbitTypes';
import { careerNodeColor, careerNodeStatusClass } from './careerGraphColors';
import { DEFAULT_ROTATION_SPEED, MAX_ROTATION_SPEED, ROTATION_SPEED_STEP } from './careerOrbitSpeeds';

const statusLabels = { complete: 'Recorded done', incomplete: 'Not marked complete', reference: 'Reference' };

function OrbitMembers({ ids, nodes, visibleIds, onInspect }: {
  ids: string[];
  nodes: ReadonlyMap<string, CareerGraphNode>;
  visibleIds: ReadonlySet<string>;
  onInspect: (node: CareerGraphNode) => void;
}) {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(30);
  const members = ids.map(id => nodes.get(id)!).filter(node =>
    `${node.label} ${node.context}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="career-orbit-members">
    <label>Find a member<input aria-label="Search orbit members" value={query} onChange={event => { setQuery(event.target.value); setLimit(30); }} /></label>
    <p role="status">{members.length} matching members</p>
    <ul>{members.slice(0, limit).map(node => <li key={node.id}>
      <span className={`graph-status-tag ${careerNodeStatusClass(node)}`} style={{ borderColor: careerNodeColor(node) }}>{statusLabels[node.status]}</span>
      <strong>{node.label}</strong><small>{node.context}</small>
      {!visibleIds.has(node.id) && <span className="career-graph-connection-hidden">Hidden by the current graph filters.</span>}
      <button className="button secondary" onClick={() => onInspect(node)}>
        {visibleIds.has(node.id) ? 'Inspect' : 'Reveal and inspect'} {node.label}
      </button>
    </li>)}</ul>
    {members.length > limit && <button className="button secondary" onClick={() => setLimit(value => value + 60)}>Show more members</button>}
  </div>;
}

export const CareerOrbitInspector = forwardRef<HTMLElement, {
  orbit: CareerOrbit;
  segment?: CareerOrbitSegment;
  nodes: ReadonlyMap<string, CareerGraphNode>;
  visibleIds: ReadonlySet<string>;
  ringsVisible: boolean;
  onClose: () => void;
  onSelect: (selection: CareerOrbitSelection) => void;
  onReveal: () => void;
  onInspect: (node: CareerGraphNode) => void;
  detailsAvailable?: boolean;
  completedToday?: boolean;
  rotationSpeed?: number;
  onRotationSpeed?: (value: number) => void;
  onRecord?: () => void;
}>(function CareerOrbitInspector({ orbit, segment, nodes, visibleIds, ringsVisible, onClose, onSelect, onReveal, onInspect, onRecord, detailsAvailable = true, completedToday = false, rotationSpeed = DEFAULT_ROTATION_SPEED, onRotationSpeed }, ref) {
  const speedId = useId();
  const ids = segment ? segment.members.map(member => member.nodeId) : orbit.memberIds;
  const visibleCount = ids.filter(id => visibleIds.has(id)).length;
  const current = orbit.currentNodeId ? nodes.get(orbit.currentNodeId) : undefined;
  return <aside ref={ref} className="career-graph-inspector career-orbit-inspector" tabIndex={-1}
    aria-label="Selected career orbit" style={{ borderTopColor: orbit.color }} data-orbit-id={orbit.id} data-mission-mode={orbit.missionMode}>
    <div className="career-graph-node-meta"><span>{orbit.kind === 'mission' ? 'Mission orbit' : 'Record / reference orbit'}</span>
      <button className="icon-button" aria-label="Close orbit details" onClick={onClose}><X size={17} /></button></div>
    <h2>{orbit.label}</h2>
    {orbit.missionMode && <p className="career-orbit-view-note">{orbit.missionMode === 'active'
      ? 'Active mission - colored outer ring; revolves when animation is on.'
      : `${orbit.missionMode === 'background' ? 'Background' : 'Planned'} mission - smaller stationary ring in its mission color near the core.`}</p>}
    {onRotationSpeed && <div className="career-ring-speed" data-tour="career-ring-speed">
      <label htmlFor={speedId}>Rotation speed <output htmlFor={speedId}>{rotationSpeed}%</output></label>
      <input id={speedId} type="range" aria-label="Rotation speed" aria-describedby={`${speedId}-hint`}
      min={0} max={MAX_ROTATION_SPEED} step={ROTATION_SPEED_STEP} value={rotationSpeed} aria-valuetext={`${rotationSpeed}% of this ring's normal speed`}
      disabled={orbit.missionMode !== 'active'} onChange={event => onRotationSpeed(event.currentTarget.valueAsNumber)} />
      <small id={`${speedId}-hint`}>{orbit.missionMode === 'active'
      ? 'Only this ring: 0% stops it, 100% is normal, 300% is triple speed. Global pause and reduced motion still apply.'
      : 'Background and planned mission rings stay still. Bring the mission into focus to animate it.'}</small>
    </div>}
    {!detailsAvailable && <p className="career-orbit-view-note">Outside focus: the mission node stays visible without checkpoints or connections. You can read checkpoint details here; completing one today reveals this mission's full graph for today.</p>}
    {completedToday && orbit.missionMode !== 'active' && <p className="career-orbit-view-note">Revealed for today after checkpoint completion. This mission is still outside focus; its graph collapses again tomorrow unless brought into focus.</p>}
    {orbit.activity && <p className="career-orbit-view-note" data-worked-today={orbit.activity.workedToday}>
      {orbit.activity.streak} {orbit.activity.streak === 1 ? 'day' : 'days'} of recorded-work streak · {orbit.activity.workedToday ? 'Work recorded today' : 'No work recorded today'}.
      {' '}Saving progress/evidence or a recall review lights the dot border; it does not grant checkpoint completion.
    </p>}
    {!orbit.progress && <p className="career-orbit-summary">{orbit.summary}</p>}
    {orbit.roadmapVersion && <p className="career-graph-node-context">Saved tracker v{orbit.roadmapVersion}</p>}
    {orbit.progress && <div className="career-orbit-progress">
      <progress aria-label="Recorded checkpoint completion" value={orbit.progress.completed} max={orbit.progress.total} style={{ accentColor: orbit.color }} />
      <span>{orbit.progress.completed} / {orbit.progress.total} checkpoints marked complete</span>
    </div>}
    <p className="career-orbit-view-note">A view of existing data, not an extra task. Tethers show membership, not prerequisites.</p>
    <details className="career-orbit-basis"><summary>What this ring means</summary><p>{orbit.detail}</p>{segment && <p>{segment.detail}</p>}</details>
    {current && <button className="button secondary career-orbit-current" onClick={() => onInspect(current)}>
      <Focus size={15} /><span>Current checkpoint: {current.label}</span>
    </button>}
    <div className="career-orbit-actions">
      {current && <button className="button secondary" disabled={!onRecord} onClick={onRecord}
        title={onRecord ? 'Use the existing evidence and completion-criteria form.' : 'Open the mission to adopt its roadmap or resolve its blocker before recording.'}>Record evidence</button>}
      <a className="button primary" href={orbit.href}>Open {orbit.kind === 'mission' ? 'mission' : 'records'}<ArrowUpRight size={15} /></a>
    </div>
    {orbit.segments.length > 0 && <label className="career-orbit-segment-picker">{orbit.kind === 'mission' ? 'Stage' : 'Record group'}
      <select aria-label="Orbit stage or record group" value={segment?.id ?? ''} onChange={event =>
        onSelect({ orbitId: orbit.id, ...(event.target.value ? { segmentId: event.target.value } : {}) })}>
        <option value="">Whole orbit</option>
        {orbit.segments.map(item => <option key={item.id} value={item.id}>{item.label} ({item.members.length})</option>)}
      </select>
    </label>}
    {segment && <div className="career-orbit-segment-detail"><h3>{segment.label}</h3><p>{segment.summary}</p></div>}
    <p className="career-orbit-visibility">{visibleCount} of {ids.length} members visible in this graph view.</p>
    {(!ringsVisible || (detailsAvailable && visibleCount < ids.length)) && <div className="career-orbit-reveal">
      <p>{!ringsVisible ? 'Rings are hidden. ' : ''}{detailsAvailable && visibleCount < ids.length ? 'Some members are hidden by mission or layer filters. ' : ''}Reveal changes only the view; outside-focus checkpoint and connection rules still apply.</p>
      <button className="button secondary" onClick={onReveal}>Reveal orbit and members</button>
    </div>}
    {!ids.length ? <p className="career-orbit-empty">{orbit.kind === 'mission' ? 'No tracked checkpoints in this saved view.' : 'No matching records in this workspace.'}</p>
      : <details className="career-orbit-member-details">
        <summary>Connected members ({ids.length})</summary>
        <OrbitMembers key={`${orbit.id}:${segment?.id ?? ''}`} ids={ids} nodes={nodes} visibleIds={visibleIds} onInspect={onInspect} />
      </details>}
  </aside>;
});
