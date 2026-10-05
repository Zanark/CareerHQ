import { forwardRef, useState } from 'react';
import { ArrowUpRight, Focus, X } from 'lucide-react';
import type { CareerGraphNode } from './careerGraphModel';
import type { CareerOrbit, CareerOrbitSegment, CareerOrbitSelection } from './careerOrbitTypes';

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
      <span className={`graph-status-tag ${node.status}`}>{statusLabels[node.status]}</span>
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
  onRecord?: () => void;
}>(function CareerOrbitInspector({ orbit, segment, nodes, visibleIds, ringsVisible, onClose, onSelect, onReveal, onInspect, onRecord }, ref) {
  const ids = segment ? segment.members.map(member => member.nodeId) : orbit.memberIds;
  const visibleCount = ids.filter(id => visibleIds.has(id)).length;
  const current = orbit.currentNodeId ? nodes.get(orbit.currentNodeId) : undefined;
  return <aside ref={ref} className="career-graph-inspector career-orbit-inspector" tabIndex={-1}
    aria-label="Selected career orbit" style={{ borderTopColor: orbit.color }} data-orbit-id={orbit.id}>
    <div className="career-graph-node-meta"><span>{orbit.kind === 'mission' ? 'Mission orbit' : 'Record / reference orbit'}</span>
      <button className="icon-button" aria-label="Close orbit details" onClick={onClose}><X size={17} /></button></div>
    <h2>{orbit.label}</h2>
    {!orbit.progress && <p className="career-orbit-summary">{orbit.summary}</p>}
    {orbit.roadmapVersion && <p className="career-graph-node-context">Saved tracker v{orbit.roadmapVersion}</p>}
    {orbit.progress && <div className="career-orbit-progress">
      <progress aria-label="Recorded checkpoint completion" value={orbit.progress.completed} max={orbit.progress.total} />
      <span>{orbit.progress.completed} / {orbit.progress.total} checkpoints marked complete</span>
    </div>}
    <p className="career-orbit-view-note">A view of existing data, not an extra task. Tethers show membership, not prerequisites.</p>
    <details className="career-orbit-basis"><summary>What this ring means</summary><p>{orbit.detail}</p>{segment && <p>{segment.detail}</p>}</details>
    {current && <button className="button secondary career-orbit-current" onClick={() => onInspect(current)}>
      <Focus size={15} /><span>Current checkpoint: {current.label}</span>
    </button>}
    <div className="career-orbit-actions">
      {current && <button className="button secondary" disabled={!onRecord} onClick={onRecord}
        title={onRecord ? 'Use the existing evidence and completion-criteria form.' : 'Open the mission to activate or unblock it before recording.'}>Record evidence</button>}
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
    {(!ringsVisible || visibleCount < ids.length) && <div className="career-orbit-reveal">
      <p>{!ringsVisible ? 'Rings are hidden. ' : ''}{visibleCount < ids.length ? 'Some members are hidden by mission or layer filters. ' : ''}Reveal changes only the view.</p>
      <button className="button secondary" onClick={onReveal}>Reveal orbit and members</button>
    </div>}
    {!ids.length ? <p className="career-orbit-empty">{orbit.kind === 'mission' ? 'No tracked checkpoints in this saved view.' : 'No matching records in this workspace.'}</p>
      : <details className="career-orbit-member-details">
        <summary>Connected members ({ids.length})</summary>
        <OrbitMembers key={`${orbit.id}:${segment?.id ?? ''}`} ids={ids} nodes={nodes} visibleIds={visibleIds} onInspect={onInspect} />
      </details>}
  </aside>;
});
