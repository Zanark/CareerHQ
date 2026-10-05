import { Sphere, Vector3 } from 'three';

/** Enclose the existing shell without translating any data or orbit geometry. */
export function coreCenteredBounds(bounds: Sphere, core: Vector3 | undefined, target: Sphere): Sphere {
  target.center.copy(core ?? bounds.center);
  target.radius = bounds.radius * 1.24 + target.center.distanceTo(bounds.center);
  return target;
}
