import { describe, expect, it } from 'vitest';
import { createInitialState } from '../domain/engine';
import { buildCareerGraph } from './careerGraphModel';
import { DEFAULT_NODE_SPACING, MAX_NODE_SPACING, spaceCareerGraph } from './careerNodeSpacing';

describe('view-only node spacing', () => {
  it('preserves the original layout by default and restores it exactly without cumulative drift', () => {
    const graph = buildCareerGraph(createInitialState(false));
    const before = JSON.stringify(graph);
    expect(DEFAULT_NODE_SPACING).toBe(100);
    expect(spaceCareerGraph(graph, 100)).toBe(graph);
    for (const spacing of [130, 200, 300, 180, 100]) {
      spaceCareerGraph(graph, spacing);
      expect(JSON.stringify(graph)).toBe(before);
    }
    expect(spaceCareerGraph(graph, 100)).toBe(graph);
  });

  it.each([150, 200, MAX_NODE_SPACING])('expands every pairwise distance by %s percent, not just camera zoom', spacing => {
    const graph = buildCareerGraph(createInitialState(false, '2.0.0'));
    const spaced = spaceCareerGraph(graph, spacing);
    const distance = (a: number[], b: number[]) => Math.hypot(...a.map((value, index) => value - b[index]));
    let largestError = 0;
    for (let a = 0; a < graph.nodes.length; a++) for (let b = a + 1; b < graph.nodes.length; b++) {
      largestError = Math.max(largestError, Math.abs(distance(spaced.nodes[a].position, spaced.nodes[b].position)
        - distance(graph.nodes[a].position, graph.nodes[b].position) * spacing / 100));
    }
    expect(largestError).toBeLessThan(1e-9);
    expect(spaced.edges).toBe(graph.edges);
    expect(spaced.orbits).toBe(graph.orbits);
    expect(spaced.stats).toBe(graph.stats);
    expect(spaced.updates).toBe(graph.updates);
    expect(spaced.nodes.map(({ position: _position, ...node }) => node))
      .toEqual(graph.nodes.map(({ position: _position, ...node }) => node));
  });

  it('pins a non-origin core and preserves identities across reordering, filtering and new records', () => {
    const state = createInitialState(false);
    state.personalProof = [{ id: 'spacing-proof', title: 'Synthetic work', detail: 'A fictional history record.', source: 'Test', url: '' }];
    const graph = buildCareerGraph(state);
    graph.nodes = graph.nodes.map(node => ({ ...node, position: [node.position[0] + 5, node.position[1] - 12, node.position[2] + 7] }));
    const expanded = spaceCareerGraph(graph, 200);
    const byId = new Map(expanded.nodes.map(node => [node.id, node.position]));
    expect(byId.get('core:careerhq')).toEqual([5, -12, 7]);
    const rearranged = spaceCareerGraph({ ...graph, nodes: [...graph.nodes].reverse().filter(node => node.kind !== 'history') }, 200);
    for (const node of rearranged.nodes) expect(node.position).toEqual(byId.get(node.id));
    state.personalProof.push({ id: 'spacing-proof-2', title: 'Another synthetic work', detail: 'A second fictional record.', source: 'Test', url: '' });
    const original = buildCareerGraph(createInitialState(false));
    const added = spaceCareerGraph(buildCareerGraph(state), 200);
    const expected = spaceCareerGraph(original, 200);
    for (const node of expected.nodes) expect(added.nodes.find(item => item.id === node.id)?.position).toEqual(node.position);
  });

  it.each([99, 301, NaN, Infinity, -Infinity])('rejects invalid spacing %s', spacing => {
    expect(() => spaceCareerGraph(buildCareerGraph(createInitialState(false)), spacing)).toThrow(RangeError);
  });

  it('rejects a nonempty filtered source without its core instead of silently choosing a new anchor', () => {
    const graph = buildCareerGraph(createInitialState(false));
    expect(() => spaceCareerGraph({ ...graph, nodes: graph.nodes.filter(node => node.kind !== 'core') }, 200)).toThrow('unfiltered graph');
    const empty = { ...graph, nodes: [] };
    expect(spaceCareerGraph(empty, 200)).toBe(empty);
  });
});
