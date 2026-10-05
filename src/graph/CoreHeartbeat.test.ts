import { describe, expect, it, vi } from 'vitest';
import { AdditiveBlending, Group, PerspectiveCamera, SphereGeometry, Vector3 } from 'three';
import { CoreHeartbeat } from './CoreHeartbeat';
import { HEARTBEAT_WAVE_SECONDS } from './coreHeartbeatTiming';

describe('actual-core spherical heartbeat wavefront', () => {
  it.each([false, true])('anchors one smooth visible wave at the supplied real core, calm=%s', calm => {
    const heartbeat = new CoreHeartbeat(calm);
    const core = new Vector3(17, -9, 6);
    heartbeat.setSource(core, 120, 3);
    heartbeat.update(0, true);
    heartbeat.update(650, true);
    expect(heartbeat.object.position).toEqual(core);
    expect(heartbeat.object.geometry).toBeInstanceOf(SphereGeometry);
    expect(heartbeat.radius).toBeCloseTo(3 + (120 - 3) * 0.25);
    expect(heartbeat.object.visible).toBe(true);
    expect(heartbeat.object.material.uniforms.uOpacity.value).toBe(calm ? 0.2 : 0.28);
    expect(heartbeat.object.material).toMatchObject({ blending: AdditiveBlending, transparent: true, depthWrite: false, wireframe: false });
    expect(heartbeat.object.material.fragmentShader).toContain('fresnel');
    const camera = new PerspectiveCamera(46, 1.5, 0.1, 1000);
    camera.position.set(30, 20, 260);
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();
    const initialProjection = core.clone().project(camera);
    camera.lookAt(55, 30, 0);
    camera.updateMatrixWorld();
    expect(core.clone().project(camera).distanceTo(initialProjection)).toBeGreaterThan(0.1);
    expect(heartbeat.object.position).toEqual(core);
    heartbeat.dispose();
  });

  it('never fabricates a source when the actual core is absent', () => {
    const heartbeat = new CoreHeartbeat();
    heartbeat.update(0, true);
    heartbeat.update(6000, true);
    expect(heartbeat.hasSource).toBe(false);
    expect(heartbeat.running).toBe(false);
    expect(heartbeat.object.visible).toBe(false);
    expect(heartbeat.radius).toBe(0);
    heartbeat.setSource(new Vector3(8, 0, 0), 100, 3);
    heartbeat.update(6100, true);
    heartbeat.update(6220, true);
    expect(heartbeat.object.visible).toBe(true);
    heartbeat.setSource(undefined, 100, 3);
    expect(heartbeat.running).toBe(false);
    expect(heartbeat.radius).toBe(0);
    expect(heartbeat.coreScale).toBe(1);
    heartbeat.dispose();
  });

  it('uses the same uncapped three-second cadence for main and focus, with bounded reusable geometry', () => {
    const normal = new CoreHeartbeat(), calm = new CoreHeartbeat(true);
    for (const heartbeat of [normal, calm]) heartbeat.setSource(new Vector3(), 100, 3);
    const geometry = normal.object.geometry;
    const material = normal.object.material;
    const positions = geometry.getAttribute('position');
    const before = positions.array.slice();
    for (const now of [0, 1200, 3000, 4100, 6300, 15000, 19200]) {
      normal.update(now, true);
      calm.update(now, true);
      expect(calm.phase).toBe(normal.phase);
      expect(calm.cycle).toBe(normal.cycle);
      expect(calm.radius).toBe(normal.radius);
      expect(normal.radius).toBeLessThanOrEqual(100);
    }
    expect(normal.cycle).toBe(6);
    expect(normal.phase).toBe(1.2);
    expect(normal.object.geometry).toBe(geometry);
    expect(normal.object.material).toBe(material);
    expect(normal.object.geometry.getAttribute('position')).toBe(positions);
    expect(positions.array).toEqual(before);
    expect(normal.object.children).toHaveLength(0);
    normal.dispose();
    calm.dispose();
  });

  it('immediately hides and restores baseline on disable or motion suppression, never replaying old waves', () => {
    const heartbeat = new CoreHeartbeat();
    heartbeat.setSource(new Vector3(), 100, 3);
    heartbeat.update(0, true);
    heartbeat.update(120, true);
    expect(heartbeat.coreScale).toBeCloseTo(1.14);
    expect(heartbeat.coreGlow).toBeGreaterThan(1);
    heartbeat.setEnabled(false);
    expect(heartbeat.isEnabled).toBe(false);
    expect(heartbeat.coreScale).toBe(1);
    expect(heartbeat.coreGlow).toBe(1);
    expect(heartbeat.object.visible).toBe(false);
    heartbeat.update(30000, true);
    expect(heartbeat.running).toBe(false);
    heartbeat.setEnabled(true);
    heartbeat.update(30100, true);
    expect(heartbeat.cycle).toBe(0);
    expect(heartbeat.phase).toBe(0);
    heartbeat.update(30220, true);
    heartbeat.update(30230, false);
    expect(heartbeat.object.visible).toBe(false);
    expect(heartbeat.radius).toBe(0);
    expect(heartbeat.coreScale).toBe(1);
    heartbeat.update(90000, true);
    expect(heartbeat.cycle).toBe(0);
    expect(heartbeat.phase).toBe(0);
    heartbeat.dispose();
  });

  it('does not reset the cycle on the same source, graph refresh, resize radius or unchanged toggle', () => {
    const heartbeat = new CoreHeartbeat();
    heartbeat.setSource(new Vector3(8, 2, -3), 100, 3);
    heartbeat.update(0, true);
    heartbeat.update(1000, true);
    heartbeat.setSource(new Vector3(8, 2, -3), 120, 4);
    heartbeat.setEnabled(true);
    heartbeat.update(1800, true);
    expect(heartbeat.phase).toBe(1.8);
    expect(heartbeat.radius).toBeCloseTo(4 + 116 * 1.8 / HEARTBEAT_WAVE_SECONDS);
    heartbeat.update(3000, true);
    expect(heartbeat.cycle).toBe(1);
    expect(heartbeat.radius).toBe(4);
    expect(heartbeat.object.visible).toBe(false);
    heartbeat.dispose();
  });

  it('fades the wave before the next cycle and disposes every resource exactly once', () => {
    const heartbeat = new CoreHeartbeat();
    const parent = new Group();
    parent.add(heartbeat.object);
    heartbeat.setSource(new Vector3(), 100, 3);
    heartbeat.update(0, true);
    heartbeat.update(2200, true);
    expect(heartbeat.object.material.uniforms.uOpacity.value).toBeLessThan(0.28);
    heartbeat.update(2600, true);
    expect(heartbeat.object.visible).toBe(false);
    expect(heartbeat.radius).toBe(100);
    const geometry = vi.spyOn(heartbeat.object.geometry, 'dispose');
    const material = vi.spyOn(heartbeat.object.material, 'dispose');
    heartbeat.dispose();
    heartbeat.dispose();
    heartbeat.update(3120, true);
    expect(geometry).toHaveBeenCalledOnce();
    expect(material).toHaveBeenCalledOnce();
    expect(parent.children).toHaveLength(0);
    expect(heartbeat.object.visible).toBe(false);
  });
});
