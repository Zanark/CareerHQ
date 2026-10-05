import { describe, expect, it } from 'vitest';
import { PerspectiveCamera, Sphere, Vector3 } from 'three';
import { coreCenteredBounds } from './careerCoreFraming';

describe('focus-only real-core framing', () => {
  it('centers the fit on the actual core, enclosing the unchanged offset data and orbit shell', () => {
    const bounds = new Sphere(new Vector3(30, -20, 8), 60);
    const core = new Vector3(4, 5, -3);
    const original = bounds.clone();
    const fit = coreCenteredBounds(bounds, core, new Sphere());
    expect(fit.center).toEqual(core);
    expect(fit.center).not.toBe(core);
    expect(fit.radius).toBeCloseTo(60 * 1.24 + core.distanceTo(bounds.center));
    expect(bounds).toEqual(original);
    for (const direction of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) {
      const shellPoint = new Vector3().fromArray(direction).multiplyScalar(60 * 1.24).add(bounds.center);
      expect(shellPoint.distanceTo(fit.center)).toBeLessThanOrEqual(fit.radius);
    }
  });

  it.each([0.55, 1, 1.8])('projects the real core to the camera center while fitting the shell at aspect=%s', aspect => {
    const bounds = new Sphere(new Vector3(35, -16, 5), 70);
    const core = new Vector3(3, 8, -1);
    const fit = coreCenteredBounds(bounds, core, new Sphere());
    const camera = new PerspectiveCamera(46, aspect, 0.1, 3000);
    const halfFov = camera.fov * Math.PI / 360;
    const limitingFov = Math.min(halfFov, Math.atan(Math.tan(halfFov) * camera.aspect));
    const distance = fit.radius * 1.08 / Math.sin(limitingFov);
    camera.position.copy(core).addScaledVector(new Vector3(0.58, 0.32, 1).normalize(), distance);
    camera.lookAt(fit.center);
    camera.updateMatrixWorld();
    const projected = core.clone().project(camera);
    expect(projected.x).toBeCloseTo(0, 10);
    expect(projected.y).toBeCloseTo(0, 10);
    for (let index = 0; index < 100; index++) {
      const angle = index / 100 * Math.PI * 2;
      const point = new Vector3(Math.cos(angle), Math.sin(angle), 0).multiplyScalar(bounds.radius * 1.24).add(bounds.center).project(camera);
      expect(Math.abs(point.x)).toBeLessThan(1);
      expect(Math.abs(point.y)).toBeLessThan(1);
    }
  });

  it('falls back to the real bounds when no core exists, without inventing a core location', () => {
    const bounds = new Sphere(new Vector3(20, 10, 3), 60);
    const fit = coreCenteredBounds(bounds, undefined, new Sphere());
    expect(fit.center).toEqual(bounds.center);
    expect(fit.radius).toBe(60 * 1.24);
  });
});
