import { describe, expect, it } from 'vitest';
import { Vector3 } from 'three';
import { CAREER_ORBIT_PLANES, careerOrbitMotion, orbitPoint } from './careerOrbitMotion';

describe('saved mission orbit motion policy', () => {
  it('keeps active missions and collections at their original full radius and seeded motion', () => {
    for (const index of [0, 4, 8, 14]) {
      for (const identity of [{ kind: 'mission' as const, missionMode: 'active' as const }, { kind: 'evidence' as const }]) {
        const motion = careerOrbitMotion({ ...identity, index });
        expect(motion).toEqual({
          quiet: false, revolving: true, normalizedRadius: CAREER_ORBIT_PLANES[index].radius, radiusScale: 1, rippleWeight: 1,
        });
        const angle = CAREER_ORBIT_PLANES[index].anchorAngle, center = new Vector3(8, 3, -4);
        expect(orbitPoint(index, angle, 12, center, 60, new Vector3(), 0.012, true, motion))
          .toEqual(orbitPoint(index, angle, 12, center, 60, new Vector3(), 0.012, true));
      }
    }
  });

  it.each(['background', 'planned', undefined] as const)('treats %s mission mode as quiet, with stable distinct inner spacing', missionMode => {
    const radii = [];
    for (let index = 0; index < 15; index++) {
      const motion = careerOrbitMotion({ kind: 'mission', missionMode, index });
      const center = new Vector3(8, 3, -4);
      const initial = orbitPoint(index, 0.7, 0, center, 60, new Vector3(), 0, false, motion);
      for (const calm of [false, true]) {
        expect(orbitPoint(index, 0.7, 100, center, 60, new Vector3(), 0, calm, motion)).toEqual(initial);
      }
      expect(motion).toMatchObject({ quiet: true, revolving: false, rippleWeight: 0 });
      expect(initial.distanceTo(center) / 60).toBeCloseTo(motion.normalizedRadius);
      expect(motion.normalizedRadius).toBeGreaterThanOrEqual(0.45);
      expect(motion.normalizedRadius).toBeLessThanOrEqual(0.65);
      radii.push(motion.normalizedRadius);
    }
    expect(new Set(radii).size).toBe(15);
  });
});
