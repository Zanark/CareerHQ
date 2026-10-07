export const DEFAULT_SPARK_DENSITY = 10;
export const DEFAULT_SPARK_LINE_DENSITY = 10;
export const MAX_SPARK_DENSITY = 100;

function validateDensity(density: number): void {
  if (!Number.isFinite(density) || density < 0 || density > MAX_SPARK_DENSITY) {
    throw new RangeError('Spark density must be between 0 and 100 percent.');
  }
}

export function sparkParticleCount(density: number, calm: boolean, compact: boolean): number {
  validateDensity(density);
  const maximum = calm ? compact ? 175 : 300 : compact ? 900 : 1800;
  return Math.round(maximum * density / MAX_SPARK_DENSITY);
}

/** Independent short decorative streaks, never graph edges or replacements for spark dots. */
export function sparkLineCount(density: number, calm: boolean, compact: boolean): number {
  validateDensity(density);
  const maximum = calm ? compact ? 70 : 120 : compact ? 300 : 600;
  return Math.round(maximum * density / MAX_SPARK_DENSITY);
}
