import type { CareerOrbit, CareerOrbitSelection } from './careerOrbitTypes';

export interface CareerNodeScreenHit { nodeId: string; distance: number }
export interface CareerOrbitScreenHit { selection: CareerOrbitSelection; distance: number }
export type CareerSceneHit =
  | { kind: 'node'; nodeId: string }
  | { kind: 'orbit'; selection: CareerOrbitSelection };

/** Foreground anchors compete by screen distance; paths never steal a work-node hit. */
export function chooseCareerSceneHit(
  node: CareerNodeScreenHit | undefined,
  anchor: CareerOrbitScreenHit | undefined,
  path?: CareerOrbitSelection,
): CareerSceneHit | undefined {
  if (anchor && (!node || anchor.distance <= node.distance + 0.0001)) return { kind: 'orbit', selection: anchor.selection };
  if (node) return { kind: 'node', nodeId: node.nodeId };
  return path ? { kind: 'orbit', selection: path } : undefined;
}

export function compactOrbitTooltip(orbit: CareerOrbit, selection: CareerOrbitSelection, hovered: boolean): string {
  const segment = orbit.segments.find(item => item.id === selection.segmentId);
  const title = segment ? `${orbit.label} · ${segment.label}` : orbit.label;
  if (!hovered) return title;
  const count = segment?.members.length ?? orbit.memberIds.length;
  const noun = orbit.kind === 'mission' ? 'checkpoint' : 'record';
  return `${title} · ${count} ${noun}${count === 1 ? '' : 's'}`;
}

export function showOrbitIdentityLabels(width: number, height: number, decorationVisible: boolean): boolean {
  return decorationVisible && width >= 640 && height >= 350;
}
