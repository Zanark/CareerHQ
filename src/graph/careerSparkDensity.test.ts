import { describe, expect, it } from 'vitest';
import { DEFAULT_SPARK_DENSITY, sparkParticleCount } from './careerSparkDensity';

describe('spark density budgets', () => {
  it.each([
    { calm: false, compact: false, full: 1800, half: 900 },
    { calm: false, compact: true, full: 900, half: 450 },
    { calm: true, compact: false, full: 300, half: 150 },
    { calm: true, compact: true, full: 175, half: 88 },
  ])('defaults to half the previous budget (calm=$calm, compact=$compact)', ({ calm, compact, full, half }) => {
    expect(DEFAULT_SPARK_DENSITY).toBe(50);
    expect(sparkParticleCount(DEFAULT_SPARK_DENSITY, calm, compact)).toBe(half);
    expect(sparkParticleCount(0, calm, compact)).toBe(0);
    expect(sparkParticleCount(100, calm, compact)).toBe(full);
    let previous = 0;
    for (let density = 0; density <= 100; density += 5) {
      const count = sparkParticleCount(density, calm, compact);
      expect(Number.isInteger(count)).toBe(true);
      expect(count).toBeGreaterThanOrEqual(previous);
      expect(count).toBeLessThanOrEqual(full);
      previous = count;
    }
  });

  it.each([-1, 101, NaN, Infinity, -Infinity])('rejects an invalid density %s instead of silently changing the amount', density => {
    expect(() => sparkParticleCount(density, false, false)).toThrow(RangeError);
  });
});
