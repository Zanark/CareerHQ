import { describe, expect, it } from 'vitest';
import { Object3D, Vector3 } from 'three';
import { CoreHeartbeat } from './CoreHeartbeat';
import { HEARTBEAT_WAVE_SECONDS } from './coreHeartbeatTiming';

describe('ten-second core-origin mesh ripple', () => {
  it.each([false, true])('has no standalone overlay mesh and bounds deformation by DATA radius, calm=%s', calm => {
    const heartbeat = new CoreHeartbeat(calm);
    const core = new Vector3(17, -9, 6);
    heartbeat.setSource(core, 160, 80);
    heartbeat.update(0, true);
    heartbeat.update(3000, true);
    expect(heartbeat.sourcePosition).toEqual(core);
    expect(heartbeat.radius).toBe(88);
    expect(heartbeat.field.bandWidth).toBe(32);
    expect(heartbeat.field.maxDisplacement).toBe(80 * (calm ? 0.0225 : 0.04));
    expect(heartbeat.field.active).toBe(true);
    expect(Object.values(heartbeat).some(value => value instanceof Object3D)).toBe(false);
    expect('object' in heartbeat).toBe(false);
    heartbeat.dispose();
  });

  it('never fabricates a source when the actual core is absent', () => {
    const heartbeat = new CoreHeartbeat();
    heartbeat.update(0, true);
    heartbeat.update(20000, true);
    expect(heartbeat.hasSource).toBe(false);
    expect(heartbeat.running).toBe(false);
    expect(heartbeat.field.active).toBe(false);
    expect(heartbeat.radius).toBe(0);
    heartbeat.setSource(new Vector3(8, 0, 0), 100, 80);
    heartbeat.update(20100, true);
    heartbeat.update(21100, true);
    expect(heartbeat.field.active).toBe(true);
    heartbeat.setSource(undefined, 100, 80);
    expect(heartbeat.running).toBe(false);
    expect(heartbeat.field.maxDisplacement).toBe(0);
    expect(heartbeat.coreScale).toBe(1);
    heartbeat.dispose();
  });

  it('uses uncapped monotonic time, six seconds of travel and four seconds exactly settled', () => {
    const normal = new CoreHeartbeat(), calm = new CoreHeartbeat(true);
    for (const heartbeat of [normal, calm]) heartbeat.setSource(new Vector3(), 100, 80);
    const uniforms = normal.field.uniforms;
    const sourceView = uniforms.uRippleSourceView.value;
    const base = new Vector3(50, 0, 0);
    for (const now of [0, 1200, 6000, 9100, 10000, 14500, 19200, 43000]) {
      normal.update(now, true);
      calm.update(now, true);
      expect(calm.phase).toBe(normal.phase);
      expect(calm.cycle).toBe(normal.cycle);
      expect(calm.radius).toBe(normal.radius);
      expect(normal.radius).toBeLessThanOrEqual(110);
      if (normal.phase >= HEARTBEAT_WAVE_SECONDS) {
        expect(normal.field.active).toBe(false);
        expect(normal.field.deformWorld(base, new Vector3())).toEqual(base);
      }
    }
    expect(normal.cycle).toBe(4);
    expect(normal.phase).toBe(3);
    expect(normal.field.uniforms).toBe(uniforms);
    expect(normal.field.uniforms.uRippleSourceView.value).toBe(sourceView);
    normal.dispose();
    calm.dispose();
  });

  it('disables, cancels and resumes fresh without preserving any positional drift', () => {
    const heartbeat = new CoreHeartbeat();
    heartbeat.setSource(new Vector3(), 100, 80);
    heartbeat.update(0, true);
    heartbeat.update(3000, true);
    const base = new Vector3(55, 0, 0);
    expect(heartbeat.field.deformWorld(base, new Vector3()).x).toBeGreaterThan(base.x);
    heartbeat.setEnabled(false);
    expect(heartbeat.field.deformWorld(base, new Vector3())).toEqual(base);
    expect(heartbeat.coreScale).toBe(1);
    expect(heartbeat.coreGlow).toBe(1);
    heartbeat.update(30000, true);
    expect(heartbeat.running).toBe(false);
    heartbeat.setEnabled(true);
    heartbeat.update(30100, true);
    expect(heartbeat.cycle).toBe(0);
    expect(heartbeat.phase).toBe(0);
    heartbeat.update(33100, true);
    heartbeat.update(33101, false);
    expect(heartbeat.field.active).toBe(false);
    expect(heartbeat.field.deformWorld(base, new Vector3())).toEqual(base);
    heartbeat.update(90000, true);
    expect(heartbeat.cycle).toBe(0);
    expect(heartbeat.phase).toBe(0);
    heartbeat.dispose();
  });

  it('preserves phase across same-source, bounds, filter and unchanged toggle refreshes', () => {
    const heartbeat = new CoreHeartbeat();
    heartbeat.setSource(new Vector3(8, 2, -3), 100, 80);
    heartbeat.update(0, true);
    heartbeat.update(1000, true);
    heartbeat.setSource(new Vector3(8, 2, -3), 120, 90);
    heartbeat.setEnabled(true);
    heartbeat.update(1800, true);
    expect(heartbeat.phase).toBe(1.8);
    expect(heartbeat.radius).toBeCloseTo(132 * 1.8 / HEARTBEAT_WAVE_SECONDS);
    heartbeat.update(10000, true);
    expect(heartbeat.cycle).toBe(1);
    expect(heartbeat.radius).toBe(0);
    expect(heartbeat.field.active).toBe(false);
    heartbeat.dispose();
  });

  it('disposes idempotently without GPU resources or later field reactivation', () => {
    const heartbeat = new CoreHeartbeat();
    heartbeat.setSource(new Vector3(), 100, 80);
    heartbeat.update(0, true);
    heartbeat.update(3000, true);
    heartbeat.dispose();
    heartbeat.dispose();
    heartbeat.update(13000, true);
    heartbeat.setSource(new Vector3(), 200, 180);
    heartbeat.setEnabled(true);
    expect(heartbeat.field.active).toBe(false);
    expect(heartbeat.field.maxDisplacement).toBe(0);
    expect(heartbeat.running).toBe(false);
  });
});
