import type { CareerGraph, CareerGraphNode } from './careerGraphModel';

export const DEFAULT_NODE_SPACING = 100;
export const MAX_NODE_SPACING = 300;
export const CAREER_NODE_HOME_DIRECTION = [0.58, 0.32, 1] as const;

// A fixed presentation basis, never the live camera: rotation and filtering cannot relayout nodes.
const FORWARD = normalize(CAREER_NODE_HOME_DIRECTION);
const RIGHT = normalize([FORWARD[2], 0, -FORWARD[0]]);
const UP = [
  FORWARD[1] * RIGHT[2] - FORWARD[2] * RIGHT[1],
  FORWARD[2] * RIGHT[0] - FORWARD[0] * RIGHT[2],
  FORWARD[0] * RIGHT[1] - FORWARD[1] * RIGHT[0],
];
const INNER_RADIUS = 52;
const OUTER_RADIUS = 116;
const DESIGN_DISTANCE = 520;
const ROW_HEIGHT = Math.sqrt(3) / 2;
const NEIGHBOR_CELLS = Array.from({ length: 17 * 17 }, (_, index) => [index % 17 - 8, Math.floor(index / 17) - 8])
  .filter(([q, r]) => Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r)) <= 8)
  .sort(([aq, ar], [bq, br]) => (aq + ar / 2) ** 2 + (ar * ROW_HEIGHT) ** 2
    - (bq + br / 2) ** 2 - (br * ROW_HEIGHT) ** 2 || aq - bq || ar - br);

/** Redistribute presentation coordinates before filtering, never the source graph or saved workspace. */
export function spaceCareerGraph(graph: CareerGraph, spacing: number): CareerGraph {
  if (!Number.isFinite(spacing) || spacing < DEFAULT_NODE_SPACING || spacing > MAX_NODE_SPACING) {
    throw new RangeError('Node spacing must be between 100 and 300 percent.');
  }
  if (graph.nodes.length === 0) return graph;
  const core = graph.nodes.find(node => node.kind === 'core');
  if (!core) throw new Error('Node spacing requires the unfiltered graph with its core.');
  const missions = new Map(graph.nodes.filter(node => node.kind === 'mission').map(node => [node.missionId, node]));
  const spread = (spacing - DEFAULT_NODE_SPACING) / (MAX_NODE_SPACING - DEFAULT_NODE_SPACING);
  const area = Math.PI * (OUTER_RADIUS ** 2 - INNER_RADIUS ** 2);
  // Enlarge local exclusion cells, not the containing composition. Dense imports share the same finite room.
  const densityScale = Math.min(1, 0.98 * Math.sqrt(area / Math.max(600, graph.nodes.length - 1)) / 8);
  const separation = (5.4 + spread * 2.6) * densityScale;
  const cells = new Map<string, [number, number]>();
  const limit = Math.ceil(OUTER_RADIUS / separation / ROW_HEIGHT);
  for (let r = -limit; r <= limit; r++) for (let q = -limit * 2; q <= limit * 2; q++) {
    const x = (q + r / 2) * separation, y = r * ROW_HEIGHT * separation;
    if (x * x + y * y >= INNER_RADIUS ** 2 && x * x + y * y <= OUTER_RADIUS ** 2) cells.set(`${q},${r}`, [x, y]);
  }
  const fallback = [...cells.keys()].sort((a, b) => unitHash(a) - unitHash(b));
  let fallbackIndex = 0;
  const positions = new Map<string, CareerGraphNode['position']>();
  const priority = (node: CareerGraphNode) => node.kind === 'mission' ? 0
    : node.kind === 'checkpoint' || node.kind === 'curriculum' ? 1 : 2;
  // Interleave stable IDs so one mission cannot claim every nearby cell before another mission is placed.
  const ordered = graph.nodes.filter(node => node.kind !== 'core')
    .sort((a, b) => priority(a) - priority(b) || unitHash(a.id) - unitHash(b.id)
      || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  for (const node of ordered) {
    const hub = missions.get(node.missionId);
    const relative = node.position.map((value, axis) => value - core.position[axis]);
    const hubPosition = hub?.position.map((value, axis) => value - core.position[axis]);
    const expanded = hubPosition
      ? relative.map((value, axis) => hubPosition[axis] * 1.55 + (value - hubPosition[axis]) * 1.9)
      : relative.map(value => value * 2.5);
    const depth = Math.max(-48, Math.min(48, dot(expanded, FORWARD) * 0.45));
    let x = dot(expanded, RIGHT), y = dot(expanded, UP);
    const length = Math.hypot(x, y);
    const radius = Math.max(INNER_RADIUS + 2, Math.min(OUTER_RADIUS - 2, length));
    const angle = length > 0 ? Math.atan2(y, x) : unitHash(node.id) * Math.PI * 2;
    x = Math.cos(angle) * radius;
    y = Math.sin(angle) * radius;
    const r = Math.round(y / (ROW_HEIGHT * separation)), q = Math.round(x / separation - r / 2);
    let key: string | undefined;
    // Bounded local searches retain mission neighborhoods; overflow uses a single linear free-cell scan.
    for (const [dq, dr] of NEIGHBOR_CELLS) {
      const candidate = `${q + dq},${r + dr}`;
      if (cells.has(candidate)) { key = candidate; break; }
    }
    while (!key && fallbackIndex < fallback.length) {
      const candidate = fallback[fallbackIndex++];
      if (cells.has(candidate)) key = candidate;
    }
    if (!key) throw new Error('Career graph spatial cells exhausted.');
    [x, y] = cells.get(key)!;
    cells.delete(key);
    // Retain real depth, with compensation for the perspective in the fitted home view.
    const perspective = 1 - depth / DESIGN_DISTANCE;
    positions.set(node.id, core.position.map((value, axis) => value + RIGHT[axis] * x * perspective
      + UP[axis] * y * perspective + FORWARD[axis] * depth) as CareerGraphNode['position']);
  }
  return {
    ...graph,
    nodes: graph.nodes.map((node): CareerGraphNode => node.kind === 'core' ? node : { ...node, position: positions.get(node.id)! }),
  };
}

function dot(a: number[], b: number[]): number {
  return a.reduce((sum, value, axis) => sum + value * b[axis], 0);
}

function normalize(vector: readonly number[]): number[] {
  const length = Math.hypot(...vector);
  return vector.map(value => value / length);
}

function unitHash(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index++) hash = Math.imul(hash ^ value.charCodeAt(index), 16777619);
  hash = Math.imul(hash ^ (hash >>> 16), 0x85ebca6b);
  hash = Math.imul(hash ^ (hash >>> 13), 0xc2b2ae35);
  return ((hash ^ (hash >>> 16)) >>> 0) / 4294967296;
}
