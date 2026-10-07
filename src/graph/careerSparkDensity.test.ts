import { describe, expect, it } from 'vitest';
import { DEFAULT_SPARK_DENSITY, DEFAULT_SPARK_LINE_DENSITY, sparkParticleCount, sparkLineCount } from './careerSparkDensity';

describe('spark density budgets', () => {
  it.each([
    { calm: false, compact: false, full: 1800, initial: 180 },
    { calm: false, compact: true, full: 900, initial: 90 },
    { calm: true, compact: false, full: 300, initial: 30 },
    { calm: true, compact: true, full: 175, initial: 18 },
  ])('defaults to ten percent of the full budget (calm=$calm, compact=$compact)', ({ calm, compact, full, initial }) => {
    expect(DEFAULT_SPARK_DENSITY).toBe(10);
    expect(sparkParticleCount(DEFAULT_SPARK_DENSITY, calm, compact)).toBe(initial);
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
    expect(() => sparkLineCount(density, false, false)).toThrow(RangeError);
  });

  it.each([
    { calm: false, compact: false, full: 600, initial: 60 },
    { calm: false, compact: true, full: 300, initial: 30 },
    { calm: true, compact: false, full: 120, initial: 12 },
    { calm: true, compact: true, full: 70, initial: 7 },
  ])('independently budgets short lines (calm=$calm, compact=$compact)', ({ calm, compact, full, initial }) => {
    expect(DEFAULT_SPARK_LINE_DENSITY).toBe(10);
    expect(sparkLineCount(DEFAULT_SPARK_LINE_DENSITY, calm, compact)).toBe(initial);
    expect(sparkLineCount(0, calm, compact)).toBe(0);
    expect(sparkLineCount(100, calm, compact)).toBe(full);
    let previous = 0;
    for (let density = 0; density <= 100; density += 5) {
      const count = sparkLineCount(density, calm, compact);
      expect(Number.isInteger(count)).toBe(true);
      expect(count).toBeGreaterThanOrEqual(previous);
      expect(count).toBeLessThanOrEqual(full);
      previous = count;
    }
  });
});
