import { describe, expect, it } from 'vitest';
import { createInitialState } from '../domain/engine';
import { buildCareerGraph } from './careerGraphModel';
import { DEFAULT_NODE_SPACING, MAX_NODE_SPACING, spaceCareerGraph } from './careerNodeSpacing';

describe('view-only node spacing', () => {
  it('applies the roomier default and restores it exactly without mutating or compounding the source', () => {
    const graph = buildCareerGraph(createInitialState(false));
    const before = JSON.stringify(graph);
    expect(DEFAULT_NODE_SPACING).toBe(100);
    const initial = spaceCareerGraph(graph, 100);
    expect(initial.nodes).not.toEqual(graph.nodes);
    for (const spacing of [130, 200, 300, 180, 100]) {
      spaceCareerGraph(graph, spacing);
      expect(JSON.stringify(graph)).toBe(before);
    }
    expect(spaceCareerGraph(graph, 100)).toEqual(initial);
  });

  it.each([100, 150, 200, MAX_NODE_SPACING])('redistributes nodes inside bounded geometry at %s, retaining all semantic data', spacing => {
    const graph = buildCareerGraph(createInitialState(false, '2.0.0'));
    const spaced = spaceCareerGraph(graph, spacing);
    const radii = spaced.nodes.filter(node => node.kind !== 'core').map(node => Math.hypot(...node.position));
    expect(Math.min(...radii)).toBeGreaterThan(50);
    expect(Math.max(...radii)).toBeLessThan(137);
    const ratios = spaced.nodes.filter(node => node.kind !== 'core').map(node =>
      Math.hypot(...node.position) / Math.hypot(...graph.nodes.find(source => source.id === node.id)!.position));
    expect(Math.max(...ratios) - Math.min(...ratios)).toBeGreaterThan(0.5);
    expect(spaced.edges).toBe(graph.edges);
    expect(spaced.orbits).toBe(graph.orbits);
    expect(spaced.stats).toBe(graph.stats);
    expect(spaced.updates).toBe(graph.updates);
    expect(spaced.nodes.map(({ position: _position, ...node }) => node))
      .toEqual(graph.nodes.map(({ position: _position, ...node }) => node));
  });

  it('keeps chosen positions when item and mission filters run after the full projection', () => {
    const projected = spaceCareerGraph(buildCareerGraph(createInitialState(false)), 300);
    const positions = new Map(projected.nodes.map(node => [node.id, node.position]));
    for (const filtered of [
      projected.nodes.filter(node => node.missionId === 'pattern'),
      projected.nodes.filter(node => node.kind !== 'checkpoint'),
      projected.nodes.filter((_, index) => index % 3 === 0),
    ]) {
      for (const node of filtered) expect(node.position).toBe(positions.get(node.id));
    }
  });

  it('does not relayout progress-only updates or collapse the last slider steps into a no-op', () => {
    const graph = buildCareerGraph(createInitialState(false));
    const updated = { ...graph, nodes: graph.nodes.map(node => ({ ...node, status: 'complete' as const, current: false })) };
    for (const spacing of [100, 200, 300]) {
      expect(spaceCareerGraph(updated, spacing).nodes.map(node => node.position))
        .toEqual(spaceCareerGraph(graph, spacing).nodes.map(node => node.position));
    }
    expect(spaceCareerGraph(graph, 290).nodes.map(node => node.position))
      .not.toEqual(spaceCareerGraph(graph, 300).nodes.map(node => node.position));
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

  it('handles more than ten thousand coincident records without dropping nodes or pairwise relaxation', () => {
    const graph = buildCareerGraph(createInitialState(false));
    const example = graph.nodes.find(node => node.kind === 'checkpoint')!;
    const crowded = {
      ...graph,
      nodes: [...graph.nodes, ...Array.from({ length: 10_500 }, (_, index) => ({
        ...example, id: `history:synthetic-${index}`, kind: 'history' as const, missionId: undefined,
        position: [0, 0, 0] as [number, number, number],
      }))],
    };
    const start = performance.now();
    const result = spaceCareerGraph(crowded, 300);
    expect(result.nodes).toHaveLength(crowded.nodes.length);
    expect(result.nodes.every(node => node.position.every(Number.isFinite))).toBe(true);
    expect(new Set(result.nodes.map(node => node.position.join(','))).size).toBe(result.nodes.length);
    expect(performance.now() - start).toBeLessThan(3000);
  });
});
