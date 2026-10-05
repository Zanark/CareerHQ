export const DEFAULT_SPARK_DENSITY = 50;
export const MAX_SPARK_DENSITY = 100;

export function sparkParticleCount(density: number, calm: boolean, compact: boolean): number {
  if (!Number.isFinite(density) || density < 0 || density > MAX_SPARK_DENSITY) {
    throw new RangeError('Spark density must be between 0 and 100 percent.');
  }
  const maximum = calm ? compact ? 175 : 300 : compact ? 900 : 1800;
  return Math.round(maximum * density / MAX_SPARK_DENSITY);
}
