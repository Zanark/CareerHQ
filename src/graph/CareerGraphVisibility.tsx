import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CareerGraph, CareerGraphKind } from './careerGraphModel';
import {
  createCareerVisibilityGroups, getCareerVisibilityItemIds, getCareerVisibilitySelection,
} from './careerVisibility';
import './career-visibility.css';

function VisibilityGroupCheckbox({ label, checked, mixed, disabled, describedBy, onChange }: {
  label: string;
  checked: boolean;
  mixed: boolean;
  disabled: boolean;
  describedBy: string;
  onChange: (visible: boolean) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = mixed;
  }, [mixed]);
  return <input ref={ref} type="checkbox" aria-label={label} aria-describedby={describedBy}
    checked={checked} aria-checked={mixed ? 'mixed' : checked} disabled={disabled}
    onChange={event => onChange(event.target.checked)} />;
}

export const CareerGraphVisibility = forwardRef<HTMLDivElement, {
  graph: CareerGraph;
  hiddenIds: ReadonlySet<string>;
  visibleNodeIds: ReadonlySet<string>;
  visibleOrbitIds: ReadonlySet<string>;
  kindLabels: Readonly<Record<CareerGraphKind, string>>;
  onChange: (ids: readonly string[], visible: boolean) => void;
}>(function CareerGraphVisibility({ graph, hiddenIds, visibleNodeIds, visibleOrbitIds, kindLabels, onChange }, ref) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [limit, setLimit] = useState(40);
  const descriptionId = useId();
  const groupCountPrefix = useId();
  const groups = useMemo(() => createCareerVisibilityGroups(graph), [graph]);
  const allIds = useMemo(() => getCareerVisibilityItemIds(graph), [graph]);
  const items = useMemo(() => {
    const nodes = graph.nodes.map(node => ({
      id: node.id, type: 'node', kind: node.kind, label: node.label, context: node.context,
      kindLabel: kindLabels[node.kind], accessibleName: `Show node: ${node.label} - ${node.context}`,
    }));
    const orbits = graph.orbits.map(orbit => ({
      id: orbit.id, type: 'orbit', kind: orbit.kind, label: orbit.label,
      context: orbit.kind === 'mission'
        ? [orbit.roadmapVersion ? `Saved tracker v${orbit.roadmapVersion}` : 'Mission view', orbit.missionMode].filter(Boolean).join(' · ')
        : 'Collection view',
      kindLabel: `Ring view · ${kindLabels[orbit.kind]}`, accessibleName: `Show ring: ${orbit.label}`,
    }));
    return [...new Map([...nodes, ...orbits].map(item => [item.id, item])).values()];
  }, [graph, kindLabels]);
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return items.filter(item => (type === 'all' || item.type === type) &&
      `${item.label} ${item.context} ${item.kindLabel}`.toLowerCase().includes(search));
  }, [items, query, type]);
  const selection = getCareerVisibilitySelection(allIds, hiddenIds);
  const visibleWorkCount = items.filter(item => item.type === 'node' && item.kind !== 'core' && visibleNodeIds.has(item.id)).length;
  const visibleRingCount = items.filter(item => item.type === 'orbit' && visibleOrbitIds.has(item.id)).length;
  return <div ref={ref} className="career-node-visibility">
    <p id={descriptionId}>View only - your saved work is unchanged.</p>
    <p className="career-visibility-counts" role="status">
      <span>{visibleWorkCount} work nodes · {visibleRingCount} rings</span>
      <span>{selection.chosen}/{selection.total} chosen</span>
    </p>
    <div className="career-visibility-actions">
      <button type="button" className="button secondary" onClick={() => onChange(allIds, true)}>Select all items</button>
      <button type="button" className="button secondary" onClick={() => onChange(allIds, false)}>Clear all items</button>
    </div>
    <fieldset className="career-visibility-groups" aria-describedby={descriptionId}>
      <legend>Groups</legend>
      <div className="career-visibility-group-grid">{groups.map((group, index) => {
        const groupSelection = getCareerVisibilitySelection(group.itemIds, hiddenIds);
        const countId = `${groupCountPrefix}-${index}`;
        return <label key={group.id} className="career-visibility-group" data-visibility-group={group.id}>
          <VisibilityGroupCheckbox label={`Show ${group.label} group`} checked={groupSelection.checked}
            mixed={groupSelection.mixed} disabled={!groupSelection.total} describedBy={countId}
            onChange={visible => onChange(group.itemIds, visible)} />
          <i aria-hidden="true" style={{ backgroundColor: group.color }} />
          <span><strong>{group.label}</strong>
            <small id={countId}>{groupSelection.chosen} of {groupSelection.total} chosen</small>
          </span>
        </label>;
      })}</div>
    </fieldset>
    <details className="career-visibility-items">
      <summary>Individual nodes and rings</summary>
      <div className="career-visibility-search">
        <label>Find an item<input type="search" aria-label="Search visibility items" value={query}
          placeholder="Name, kind or saved context"
          onChange={event => { setQuery(event.target.value); setLimit(40); }} /></label>
        <label>Item type<select aria-label="Filter visibility item types" value={type}
          onChange={event => { setType(event.target.value); setLimit(40); }}>
          <option value="all">All items</option><option value="node">Nodes</option><option value="orbit">Ring views</option>
        </select></label>
      </div>
      <p role="status">{Math.min(limit, filtered.length)} of {filtered.length} matching items listed.</p>
      <ul>{filtered.slice(0, limit).map(item => {
        const chosen = !hiddenIds.has(item.id);
        const shown = (item.type === 'node' ? visibleNodeIds : visibleOrbitIds).has(item.id);
        return <li key={item.id} data-visibility-item={item.id}>
          <label className="career-visibility-item">
            <input type="checkbox" checked={chosen} aria-label={item.accessibleName}
              onChange={event => onChange([item.id], event.target.checked)} />
            <span><small className="career-visibility-kind">{item.kindLabel}</small>
              <strong>{item.label}</strong><small>{item.context}</small>
              {chosen && !shown && <small className="career-visibility-filtered">Hidden by another filter</small>}
            </span>
          </label>
        </li>;
      })}</ul>
      {!filtered.length && <p>No items match. Try another name or item type.</p>}
      {filtered.length > limit && <button type="button" className="button secondary"
        onClick={() => setLimit(value => value + 60)}>Show more items</button>}
    </details>
    <details className="career-visibility-help">
      <summary>How visibility works</summary>
      <p>Groups select their current nodes and ring together; individual choices can leave a group partly selected. Shared items update across groups.</p>
      <p>Choices combine with the mission and layer filters in View options. Counts are choices, not completion. Nodes and mission rings start chosen; the six collection rings start hidden. Sparks are controlled separately in View options.</p>
      <p>These choices last only while this graph page is open. Nothing is deleted from your workspace or backups.</p>
    </details>
  </div>;
});
