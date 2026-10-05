import { describe, expect, it } from 'vitest';
import { Euler, Matrix4, PerspectiveCamera, Quaternion, Vector3 } from 'three';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { CareerRippleField, careerEdgeVertexShader, careerRippleVertexShader, createRippleUniforms, rippleOffset } from './careerRipple';
import { CoreHeartbeat } from './CoreHeartbeat';

describe('shared travelling radial deformation', () => {
  it('arrives near the core before farther meshes and smoothly returns both to baseline', () => {
    const heartbeat = new CoreHeartbeat();
    heartbeat.setSource(new Vector3(), 100, 80);
    heartbeat.update(0, true);
    const near = new Vector3(25, 0, 0), far = new Vector3(75, 0, 0), output = new Vector3();
    const samples = [near, far].map(point => {
      let peak = 0, arrival = 0;
      for (let now = 0; now <= 10000; now += 10) {
        // A standalone field sample avoids integrating positions or clock reversal.
        const front = 110 * Math.min(1, now / 6000);
        const amount = now < 6000 ? rippleOffset(point.length(), front, 20, 3.2) : 0;
        if (amount > peak) { peak = amount; arrival = now; }
        expect(amount).toBeGreaterThanOrEqual(0);
        expect(amount).toBeLessThanOrEqual(3.2);
      }
      return { peak, arrival };
    });
    expect(samples[0].arrival).toBeLessThan(samples[1].arrival);
    expect(samples[0].peak).toBeGreaterThan(3.19);
    expect(samples[1].peak).toBeGreaterThan(3.19);
    heartbeat.update(samples[0].arrival, true);
    expect(heartbeat.field.deformWorld(near, output).x).toBeGreaterThan(25);
    expect(heartbeat.field.deformWorld(far, output)).toEqual(far);
    heartbeat.update(samples[1].arrival, true);
    expect(heartbeat.field.deformWorld(near, output)).toEqual(near);
    expect(heartbeat.field.deformWorld(far, output).x).toBeGreaterThan(75);
    heartbeat.update(6000, true);
    expect(heartbeat.field.deformWorld(near, output)).toEqual(near);
    expect(heartbeat.field.deformWorld(far, output)).toEqual(far);
  });

  it('pins the actual source, tapers near it, and has exact compact support with no overshoot', () => {
    const field = new CareerRippleField();
    field.source.set(17, -9, 6);
    field.setWave(0, 20, 4);
    expect(field.deformWorld(field.source, new Vector3())).toEqual(field.source);
    expect(rippleOffset(0.00001, 0, 20, 4)).toBe(0);
    expect(rippleOffset(0.001, 0, 20, 4)).toBeLessThan(0.000001);
    expect(rippleOffset(40, 50, 20, 4)).toBe(0);
    expect(rippleOffset(60, 50, 20, 4)).toBe(0);
    expect(rippleOffset(50, 50, 20, 4)).toBe(4);
    expect(rippleOffset(50, 50, 20, 4, false)).toBe(0);
    for (const edge of [40, 60]) {
      expect(Math.abs(rippleOffset(edge + 0.001, 50, 20, 4) - rippleOffset(edge - 0.001, 50, 20, 4))).toBeLessThan(0.000001);
    }
  });

  it('matches the GLSL view-space formula under rotated/panned cameras and nested particle transforms', () => {
    const field = new CareerRippleField();
    field.source.set(9, -6, 2);
    field.setWave(60, 24, 4);
    const camera = new PerspectiveCamera(46, 1.5, 0.1, 1000);
    camera.position.set(130, 80, 240);
    camera.lookAt(15, -10, 3);
    field.updateCamera(camera);
    const world = new Vector3(69, -6, 2);
    const expected = field.deformWorld(world, new Vector3()).applyMatrix4(camera.matrixWorldInverse);
    const view = world.clone().applyMatrix4(camera.matrixWorldInverse);
    const radial = view.clone().sub(field.uniforms.uRippleSourceView.value);
    const distance = radial.length();
    const q = Math.abs(distance - field.frontRadius) * 2 / field.bandWidth;
    const shoulder = 1 - q * q;
    const t = Math.min(1, distance / (field.bandWidth * 0.5));
    const offset = field.maxDisplacement * shoulder * shoulder * t * t * (3 - 2 * t);
    view.addScaledVector(radial, offset / distance);
    expect(view.distanceTo(expected)).toBeLessThan(1e-10);
    const model = new Matrix4().compose(new Vector3(30, -8, 4), new Quaternion().setFromEuler(new Euler(0.2, 0.6, -0.4)), new Vector3(70, 70, 70));
    const local = world.clone().applyMatrix4(model.clone().invert());
    expect(local.applyMatrix4(model).applyMatrix4(camera.matrixWorldInverse).distanceTo(world.clone().applyMatrix4(camera.matrixWorldInverse))).toBeLessThan(1e-10);
    expect(careerRippleVertexShader).toContain('shoulder * shoulder * pin');
    expect(careerRippleVertexShader).toContain('smoothstep(0.0, uRippleBandWidth * 0.5, distance)');
    expect(careerRippleVertexShader).not.toContain('projectionMatrix');
    expect(createRippleUniforms().uRippleActive.value).toBe(0);
  });

  it('preserves immutable inputs and gives node, edge, tether and packet endpoints the same displayed position', () => {
    const field = new CareerRippleField();
    field.source.set(10, 3, -4);
    field.setWave(40, 20, 3.2);
    const node = Object.freeze(new Vector3(50, 3, -4));
    const before = node.toArray();
    const displayedNode = field.deformWorld(node, new Vector3());
    for (const geometryEndpoint of [new Float32Array(before), new Float32Array(before), new Float32Array(before)]) {
      const base = new Vector3().fromArray(geometryEndpoint);
      expect(field.deformWorld(base, base)).toEqual(displayedNode);
      expect(Array.from(geometryEndpoint)).toEqual(before);
    }
    expect(node.toArray()).toEqual(before);
    field.cancel();
    expect(field.deformWorld(node, new Vector3()).toArray()).toEqual(before);
  });

  it('deforms both real ribbon endpoints before the existing endpoint-pinned cursor bend', () => {
    const material = new LineMaterial();
    const shader = careerEdgeVertexShader(material.vertexShader);
    expect(shader).toContain(careerRippleVertexShader);
    expect(shader).toContain('start = rippleView(start);');
    expect(shader).toContain('end = rippleView(end);');
    expect(shader).toContain('start = repelInterior(start, aCurveT.x);');
    expect(shader).toContain('end = repelInterior(end, aCurveT.y);');
    expect(shader.indexOf('end = rippleView(end);')).toBeLessThan(shader.indexOf('start = repelInterior(start, aCurveT.x);'));
    expect(shader).toContain('uCursorOffset');
    material.dispose();
  });
});
