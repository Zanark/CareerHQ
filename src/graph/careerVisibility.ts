import type { CareerGraph, CareerGraphNode } from './careerGraphModel';

export interface CareerVisibilityGroup {
  id: string;
  label: string;
  color: string;
  itemIds: string[];
}

export function getCareerVisibilityItemIds(graph: CareerGraph): string[] {
  return [...new Set([...graph.nodes.map(node => node.id), ...graph.orbits.map(orbit => orbit.id)])];
}

export function getDefaultHiddenCareerRingIds(graph: Pick<CareerGraph, 'orbits'>): ReadonlySet<string> {
  return new Set(graph.orbits.filter(orbit => orbit.kind !== 'mission').map(orbit => orbit.id));
}

export function setCareerItemsVisible(
  hiddenIds: ReadonlySet<string>, ids: readonly string[], visible: boolean,
): ReadonlySet<string> {
  const next = new Set(hiddenIds);
  for (const id of ids) {
    if (visible) next.delete(id);
    else next.add(id);
  }
  return next;
}

export function getCareerVisibilitySelection(ids: readonly string[], hiddenIds: ReadonlySet<string>): {
  chosen: number; total: number; checked: boolean; mixed: boolean;
} {
  const uniqueIds = new Set(ids);
  let chosen = 0;
  for (const id of uniqueIds) if (!hiddenIds.has(id)) chosen += 1;
  const total = uniqueIds.size;
  return { chosen, total, checked: total > 0 && chosen === total, mixed: chosen > 0 && chosen < total };
}

export function createCareerVisibilityGroups(graph: CareerGraph): CareerVisibilityGroup[] {
  const groups = new Map<string, CareerVisibilityGroup>();
  const nodeIds = new Set(graph.nodes.map(node => node.id));
  const byKind = new Map<CareerGraphNode['kind'], string[]>();
  const byMission = new Map<string, string[]>();
  for (const node of graph.nodes) {
    const kindIds = byKind.get(node.kind) ?? [];
    kindIds.push(node.id);
    byKind.set(node.kind, kindIds);
    if (node.missionId) {
      const missionIds = byMission.get(node.missionId) ?? [];
      missionIds.push(node.id);
      byMission.set(node.missionId, missionIds);
    }
  }
  function addGroup(id: string, label: string, color: string, itemIds: string[]) {
    const previous = groups.get(id);
    groups.set(id, {
      id, label: previous?.label ?? label, color: previous?.color ?? color,
      itemIds: [...new Set([...(previous?.itemIds ?? []), ...itemIds])],
    });
  }

  const coreIds = byKind.get('core') ?? [];
  if (coreIds.length) addGroup('core', 'CareerOS core', 'var(--dsf-heading)', coreIds);
  for (const orbit of graph.orbits) {
    if (orbit.kind === 'mission') {
      // A mission choice includes its archives, previews and records, not just its saved ring members.
      addGroup(`mission:${orbit.missionId ?? orbit.id}`, orbit.label, orbit.color,
        [orbit.id, ...(orbit.missionId ? byMission.get(orbit.missionId) ?? [] : [])]);
    } else {
      addGroup(`collection:${orbit.kind}`, orbit.label, orbit.color, [
        orbit.id, ...orbit.memberIds.filter(id => nodeIds.has(id)), ...(byKind.get(orbit.kind) ?? []),
      ]);
    }
  }

  const groupedIds = new Set([...groups.values()].flatMap(group => group.itemIds));
  const otherIds = graph.nodes.filter(node => !groupedIds.has(node.id)).map(node => node.id);
  if (otherIds.length) addGroup('other', 'Other nodes', 'var(--dsf-muted)', otherIds);
  return [...groups.values()];
}
