export type CareerOrbitSpeeds = Readonly<Record<string, number>>;

export const DEFAULT_ROTATION_SPEED = 100;
export const MAX_ROTATION_SPEED = 300;
export const ROTATION_SPEED_STEP = 10;

/** Validate the whole replacement before changing any ring's view-only speed. */
export function validateCareerOrbitSpeeds(speeds: CareerOrbitSpeeds): CareerOrbitSpeeds {
  const entries = Object.entries(speeds);
  for (const [, speed] of entries) {
    if (!Number.isFinite(speed) || speed < 0 || speed > MAX_ROTATION_SPEED) {
      throw new RangeError('Rotation speed must be between 0 and 300 percent.');
    }
  }
  return Object.freeze(Object.fromEntries(entries));
}
