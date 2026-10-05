import { describe, expect, it, vi } from 'vitest';
import { LineSegments, Mesh, PerspectiveCamera, Points, ShaderMaterial, Vector3 } from 'three';
import { HolographicCore } from './HolographicCore';

function rimLines(core: HolographicCore): LineSegments {
  let lines: LineSegments | undefined;
  core.object.traverse(object => { if (object instanceof LineSegments) lines = object; });
  if (!lines) throw new Error('Expected batched rim arcs.');
  return lines;
}

function rimMaterial(core: HolographicCore): ShaderMaterial {
  const material = rimLines(core).material;
  if (!(material instanceof ShaderMaterial)) throw new Error('Expected the rim shader.');
  return material;
}

describe('outer-rim-only decoration', () => {
  it.each([false, true])('has no invented interior line or particle geometry (calm=%s)', calm => {
    const core = new HolographicCore(calm);
    let lineObjects = 0;
    core.object.traverse(object => {
      if (!(object instanceof LineSegments || object instanceof Points)) return;
      if (object instanceof LineSegments) lineObjects++;
      const positions = object.geometry.getAttribute('position');
      let minimum = Infinity, maximum = 0;
      for (let index = 0; index < positions.count; index++) {
        const radius = Math.hypot(positions.getX(index), positions.getY(index), positions.getZ(index));
        minimum = Math.min(minimum, radius);
        maximum = Math.max(maximum, radius);
      }
      expect(minimum).toBeGreaterThanOrEqual(1.059);
      expect(maximum).toBeLessThan(1.24);
      if (!(object.material instanceof ShaderMaterial)) throw new Error('Rim decoration needs its silhouette shader.');
      expect(object.material.fragmentShader).toContain('rimVisibility()');
      expect(object.material.fragmentShader).toContain('if (clearance < 1.035) discard');
    });
    expect(lineObjects).toBe(1);
    core.dispose();
  });

  it('toggles projection masking without moving or rebuilding the outer-shell geometry', () => {
    const core = new HolographicCore();
    const objects: (LineSegments | Points)[] = [];
    core.object.traverse(object => {
      if (object instanceof LineSegments || object instanceof Points) objects.push(object);
    });
    const positions = objects.map(object => object.geometry.getAttribute('position'));
    for (const enabled of [true, false, true]) {
      core.setRimOnly(enabled);
      objects.forEach((object, index) => {
        if (!(object.material instanceof ShaderMaterial)) throw new Error('Expected the shell shader.');
        expect(object.material.uniforms.uRimOnly.value).toBe(enabled ? 1 : 0);
        expect(object.material.fragmentShader).toContain('if (uRimOnly < 0.5) return 1.0');
        expect(object.geometry.getAttribute('position')).toBe(positions[index]);
      });
    }
    core.dispose();
  });

  it('keeps decoration centered on the enclosing sphere while the aura follows only the actual core', () => {
    const core = new HolographicCore(true);
    const center = new Vector3(30, 5, 0);
    const actualCore = new Vector3(0, 0, 0);
    core.setBounds(center, 70, actualCore);
    expect(core.object.getObjectByName('Decorative outer rim only')?.position).toEqual(center);
    expect(core.object.getObjectByName('Existing core node aura')?.position).toEqual(actualCore);
    core.setBounds(center, 70);
    expect(core.object.getObjectByName('Existing core node aura')?.visible).toBe(false);
    core.dispose();
  });

  it('updates the silhouette mask from the real camera when rotating and panning', () => {
    const core = new HolographicCore();
    const center = new Vector3(8, -5, 2);
    core.setBounds(center, 60);
    const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
    for (const position of [[0, 0, 240], [220, 90, 160], [-150, 130, -220]]) {
      camera.position.fromArray(position);
      camera.lookAt(new Vector3(20, 10, 0));
      core.update(camera, 0.05);
      const expected = center.clone().applyMatrix4(camera.matrixWorldInverse);
      core.object.traverse(object => {
        if (!(object instanceof LineSegments || object instanceof Points)) return;
        if (!(object.material instanceof ShaderMaterial)) throw new Error('Rim decoration needs its silhouette shader.');
        expect(object.material.uniforms.uCenterView.value.distanceTo(expected)).toBeLessThan(0.00001);
        expect(object.material.uniforms.uRadius.value).toBe(60);
      });
    }
    core.dispose();
  });
});

describe('independently orbiting rim arcs', () => {
  it('batches 60 deterministic arc speeds without moving the entire globe', () => {
    const core = new HolographicCore();
    const repeat = new HolographicCore();
    const geometry = rimLines(core).geometry;
    const positions = geometry.getAttribute('position');
    const axes = geometry.getAttribute('aOrbitAxis');
    const speeds = geometry.getAttribute('aOrbitSpeed');
    const uniqueSpeeds = new Set(Array.from(speeds.array));
    expect(uniqueSpeeds.size).toBe(60);
    expect(Array.from(uniqueSpeeds).some(speed => speed < 0)).toBe(true);
    expect(Array.from(uniqueSpeeds).some(speed => speed > 0)).toBe(true);
    expect(speeds.array).toEqual(rimLines(repeat).geometry.getAttribute('aOrbitSpeed').array);
    expect(axes.count).toBe(positions.count);
    expect(speeds.count).toBe(positions.count);
    for (let index = 0; index < positions.count; index += 2) {
      const axis = new Vector3().fromBufferAttribute(axes, index);
      const position = new Vector3().fromBufferAttribute(positions, index);
      expect(axis.length()).toBeCloseTo(1, 6);
      expect(speeds.getX(index)).toBe(speeds.getX(index + 1));
      expect(Math.abs(speeds.getX(index))).toBeGreaterThanOrEqual(0.028);
      expect(Math.abs(speeds.getX(index))).toBeLessThanOrEqual(0.113);
      expect(Math.abs(position.dot(axis))).toBeLessThan(0.000001);
      expect(position.clone().applyAxisAngle(axis, speeds.getX(index) * 400).length()).toBeCloseTo(position.length(), 5);
    }
    const before = positions.array.slice();
    core.update(new PerspectiveCamera(), 0.04);
    expect(positions.array).toEqual(before);
    expect(core.object.getObjectByName('Decorative outer rim only')?.rotation.toArray()).toEqual([0, 0, 0, 'XYZ']);
    expect(rimMaterial(core).vertexShader).toContain('uPhase * aOrbitSpeed');
    expect(rimMaterial(core).fragmentShader).toContain('if (clearance < 1.035) discard');
    core.dispose();
    repeat.dispose();
  });

  it('advances only by supplied active-frame deltas, keeping pause and resume continuous', () => {
    const core = new HolographicCore();
    const camera = new PerspectiveCamera();
    expect(core.animationTime).toBe(0);
    core.update(camera, 0.04);
    expect(rimMaterial(core).uniforms.uPhase.value).toBeCloseTo(0.04);
    expect(core.animationTime).toBeCloseTo(0.04);
    camera.position.set(80, 15, 240);
    for (let frame = 0; frame < 50; frame++) core.update(camera, 0);
    expect(rimMaterial(core).uniforms.uPhase.value).toBeCloseTo(0.04);
    expect(core.animationTime).toBeCloseTo(0.04);
    core.update(camera, 0.03);
    expect(rimMaterial(core).uniforms.uPhase.value).toBeCloseTo(0.07);
    expect(core.animationTime).toBeCloseTo(0.07);
    core.dispose();
  });

  it('keeps the focus profile slow and sparse while restoring career rim sparks', () => {
    const core = new HolographicCore();
    const calm = new HolographicCore(true);
    const camera = new PerspectiveCamera();
    for (const item of [core, calm]) {
      item.resize(700, 1, false);
      item.update(camera, 1);
    }
    expect(rimMaterial(calm).uniforms.uPhase.value).toBeCloseTo(0.055);
    expect(rimMaterial(core).uniforms.uPhase.value).toBe(1);
    expect(rimMaterial(calm).uniforms.uOpacity.value).toBeCloseTo(0.55 * 0.48);
    const particleCount = (item: HolographicCore) => {
      let count = 0;
      item.object.traverse(object => { if (object instanceof Points) count += object.geometry.drawRange.count; });
      return count;
    };
    expect(particleCount(core)).toBe(3600);
    expect(particleCount(calm)).toBe(600);
    core.resize(400, 1.25, true);
    calm.resize(400, 1, true);
    expect(particleCount(core)).toBe(1800);
    expect(particleCount(calm)).toBe(350);
    core.dispose();
    calm.dispose();
  });

  it('disposes every batched geometry and material exactly once', () => {
    const core = new HolographicCore();
    const disposals: ReturnType<typeof vi.spyOn>[] = [];
    core.object.traverse(object => {
      if (!(object instanceof Mesh || object instanceof Points || object instanceof LineSegments)) return;
      disposals.push(vi.spyOn(object.geometry, 'dispose'));
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        disposals.push(vi.spyOn(material, 'dispose'));
      }
    });
    core.dispose();
    for (const dispose of disposals) expect(dispose).toHaveBeenCalledOnce();
    expect(core.object.children).toHaveLength(0);
  });
});
