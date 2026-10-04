import { describe, expect, it } from 'vitest';
import { connectDiagram } from './Diagram';

const boxes = {
  goal: { x: 100, y: 0, width: 200, height: 60 },
  a: { x: 20, y: 120, width: 100, height: 40 },
  b: { x: 240, y: 120, width: 100, height: 40 },
  leaf: { x: 50, y: 220, width: 200, height: 80 },
};

describe('diagram connections', () => {
  it('draws a branching overview without claiming prerequisite arrows', () => {
    const edges = connectDiagram([{ from: 'goal', to: 'a', kind: 'root' }, { from: 'goal', to: 'b', kind: 'root' }], boxes, 400);
    expect(edges).toHaveLength(2);
    expect(edges[0].path).toBe('M 200 60 V 90 H 70 V 120');
    expect(edges.every(edge => !edge.arrow)).toBe(true);
  });

  it('routes vertically stacked tree groups outside their node bodies', () => {
    const stacked = { ...boxes, b: { ...boxes.b, x: 20, y: 380 } };
    const edges = connectDiagram([{ from: 'goal', to: 'a', kind: 'root' }, { from: 'goal', to: 'b', kind: 'root' }], stacked, 400);
    expect(edges[1].path).toBe('M 200 60 V 75 H 0 V 400 H 20');
  });

  it('joins tree children to a shared side branch rather than chaining siblings', () => {
    const [edge] = connectDiagram([{ from: 'a', to: 'leaf', kind: 'member' }], boxes, 400);
    expect(edge.path).toBe('M 70 160 V 175 H 33 V 260 H 50');
    expect(edge.arrow).toBe(false);
  });

  it('routes a practice loop back to the current checkpoint', () => {
    const [edge] = connectDiagram([{ from: 'leaf', to: 'a', kind: 'return' }], boxes, 400);
    expect(edge.path).toBe('M 250 260 H 393 V 140 H 120');
    expect(edge.arrow).toBe(true);
  });

  it('surfaces broken node references instead of inventing a connection', () => {
    expect(() => connectDiagram([{ from: 'missing', to: 'a' }], boxes, 400)).toThrow('Missing diagram node');
    expect(() => connectDiagram([{ from: 'toString', to: 'a' }], boxes, 400)).toThrow('Missing diagram node');
    expect(connectDiagram([], boxes, 400)).toEqual([]);
  });
});
