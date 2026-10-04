import { describe, expect, it } from 'vitest';
import { nextSunAngle, themeAngle, unwrapSunAngle } from './sunCycle';

describe('east-to-west sun cycle', () => {
  it('keeps moving counter-clockwise over repeated days instead of reversing at sunset', () => {
    let angle = themeAngle('dark');
    expect(angle).toBe(-180);
    for (let cycle = 1; cycle <= 5; cycle++) {
      angle = nextSunAngle(angle, 'light');
      expect(angle).toBe(-360 * cycle);
      angle = nextSunAngle(angle, 'dark');
      expect(angle).toBe(-360 * cycle - 180);
    }
  });

  it('coalesces quick changes to the next matching phase without accumulating extra spins', () => {
    expect(nextSunAngle(-190, 'light')).toBe(-360);
    expect(nextSunAngle(-195, 'dark')).toBe(-540);
    expect(nextSunAngle(-200, 'light')).toBe(-360);
    expect(nextSunAngle(-400, 'light')).toBe(-720);
  });

  it.each([
    [90, -180, -360, -270],
    [-90, -360, -540, -450],
    [170, -185, -540, -190],
    [-90, -720, -900, -810],
    [180, -180, -360, -180],
  ])('recovers CSS matrix winding for %s degrees', (principal, from, to, expected) => {
    expect(unwrapSunAngle(principal, { from, to })).toBe(expected);
  });

  it('tolerates endpoint roundoff without adding another revolution', () => {
    expect(nextSunAngle(-180.00000001, 'dark')).toBe(-180);
    expect(nextSunAngle(-360.00000001, 'light')).toBe(-360);
  });

  it('does not accept invalid geometry', () => {
    expect(() => nextSunAngle(NaN, 'light')).toThrow('finite');
    expect(() => unwrapSunAngle(Infinity, { from: 0, to: -180 })).toThrow('finite');
  });
});
