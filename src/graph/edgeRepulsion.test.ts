import { describe, expect, it } from 'vitest';
import { CURSOR_REPULSION_PX, cursorRepulsionOffset } from './edgeRepulsion';

describe('zoom-scaled cursor repulsion', () => {
  it('doubles the original 28px force at the fitted view without amplifying further when zoomed out', () => {
    expect(CURSOR_REPULSION_PX).toBe(2 * 28);
    expect(cursorRepulsionOffset(1)).toBe(56);
    expect(cursorRepulsionOffset(2)).toBe(56);
    expect(cursorRepulsionOffset(10)).toBe(56);
  });

  it('reduces gradually as camera distance decreases, reaching half force at four-times zoom', () => {
    expect(cursorRepulsionOffset(.8)).toBeCloseTo(50.0879, 3);
    expect(cursorRepulsionOffset(.5)).toBeCloseTo(39.598, 3);
    expect(cursorRepulsionOffset(.25)).toBe(28);
    expect(cursorRepulsionOffset(.0625)).toBe(14);
    expect(cursorRepulsionOffset(0)).toBe(0);
    expect(cursorRepulsionOffset(-1)).toBe(0);
    let previous = cursorRepulsionOffset(1);
    for (let step = 1; step <= 100; step++) {
      const next = cursorRepulsionOffset(1 - step / 100);
      expect(next).toBeLessThan(previous);
      expect(next).toBeGreaterThanOrEqual(0);
      previous = next;
    }
  });

  it('is continuous at the full-view cap and depends on relative zoom rather than graph size', () => {
    expect(cursorRepulsionOffset(1 - 1e-6)).toBeCloseTo(cursorRepulsionOffset(1 + 1e-6), 4);
    expect(cursorRepulsionOffset(40 / 160)).toBe(cursorRepulsionOffset(200 / 800));
  });
});
