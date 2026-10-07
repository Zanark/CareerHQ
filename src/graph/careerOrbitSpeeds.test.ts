import { describe, expect, it } from 'vitest';
import { DEFAULT_ROTATION_SPEED, MAX_ROTATION_SPEED, ROTATION_SPEED_STEP, validateCareerOrbitSpeeds } from './careerOrbitSpeeds';

describe('view-only orbit speed settings', () => {
  it('uses percent controls and snapshots the full validated record', () => {
    expect([DEFAULT_ROTATION_SPEED, MAX_ROTATION_SPEED, ROTATION_SPEED_STEP]).toEqual([100, 300, 10]);
    const source = { stationary: 0, original: 100, fastest: 300, precise: 125.5 };
    const speeds = validateCareerOrbitSpeeds(source);
    expect(speeds).toEqual(source);
    expect(Object.isFrozen(speeds)).toBe(true);
    source.original = 200;
    expect(speeds.original).toBe(100);
    expect(validateCareerOrbitSpeeds({})).toEqual({});
  });

  it.each([-1, 301, NaN, Infinity, -Infinity])('rejects invalid speed %s rather than clamping it', speed => {
    expect(() => validateCareerOrbitSpeeds({ first: 200, second: speed })).toThrow(RangeError);
  });
});
