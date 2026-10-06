import type { CareerGraph, CareerGraphNode } from './careerGraphModel';

export const DEFAULT_NODE_SPACING = 100;
export const MAX_NODE_SPACING = 300;

/** Expand presentation coordinates before filtering; never modify the source graph or saved workspace. */
export function spaceCareerGraph(graph: CareerGraph, spacing: number): CareerGraph {
  if (!Number.isFinite(spacing) || spacing < DEFAULT_NODE_SPACING || spacing > MAX_NODE_SPACING) {
    throw new RangeError('Node spacing must be between 100 and 300 percent.');
  }
  if (spacing === DEFAULT_NODE_SPACING || graph.nodes.length === 0) return graph;
  const core = graph.nodes.find(node => node.kind === 'core');
  if (!core) throw new Error('Node spacing requires the unfiltered graph with its core.');
  const factor = spacing / DEFAULT_NODE_SPACING;
  return {
    ...graph,
    nodes: graph.nodes.map((node): CareerGraphNode => node.kind === 'core' ? node : {
      ...node,
      position: [
        core.position[0] + (node.position[0] - core.position[0]) * factor,
        core.position[1] + (node.position[1] - core.position[1]) * factor,
        core.position[2] + (node.position[2] - core.position[2]) * factor,
      ],
    }),
  };
}
