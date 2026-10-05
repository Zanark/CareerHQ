import { describe, expect, it, vi } from 'vitest';
import { LineSegments, Mesh, PerspectiveCamera, Points, ShaderMaterial, Vector3 } from 'three';
import { HolographicCore } from './HolographicCore';
import { CareerRippleField } from './careerRipple';
import { sparkParticleCount } from './careerSparkDensity';

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
  it('shares the view-space field for nested sparks and legacy helpers without mutating their base buffers', () => {
    const core = new HolographicCore();
    const field = new CareerRippleField();
    core.setRippleField(field.uniforms);
    field.source.set(4, -2, 8);
    field.setWave(60, 20, 3);
    core.setBounds(new Vector3(20, 4, 0), 60, field.source);
    const before: { object: Points | LineSegments; positions: ArrayLike<number> }[] = [];
    core.object.traverse(object => {
      if (!(object instanceof Points || object instanceof LineSegments)) return;
      if (!(object.material instanceof ShaderMaterial)) throw new Error('Expected shared deformation shader.');
      expect(object.material.uniforms.uRippleAmplitude).toBe(field.uniforms.uRippleAmplitude);
      expect(object.material.vertexShader).toContain('rippleView(modelViewMatrix');
      before.push({ object, positions: object.geometry.getAttribute('position').array.slice() });
    });
    core.update(new PerspectiveCamera(), 0.5);
    for (const { object, positions } of before) expect(object.geometry.getAttribute('position').array).toEqual(positions);
    expect(core.object.getObjectByName('Existing core node aura')?.position).toEqual(field.source);
    core.dispose();
  });

  it('allocates no decorative belt geometry in semantic orbit scenes, preserving sparks and the opaque core', () => {
    const core = new HolographicCore(false, false);
    const legacy = new HolographicCore();
    let lines = 0;
    let sparks: Points | undefined;
    let legacySparks: Points | undefined;
    core.object.traverse(object => {
      if (object instanceof LineSegments) lines++;
      if (object instanceof Points) sparks = object;
    });
    legacy.object.traverse(object => { if (object instanceof Points) legacySparks = object; });
    expect(lines).toBe(0);
    expect(sparks?.geometry.getAttribute('position').array).toEqual(legacySparks?.geometry.getAttribute('position').array);
    core.setBounds(new Vector3(), 60, new Vector3());
    core.setDecorationVisible(false);
    expect(core.object.getObjectByName('Existing core node aura')?.visible).toBe(true);
    core.dispose();
    legacy.dispose();
  });

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

  it.each([false, true])('keeps the white core mesh fully opaque (calm=%s)', calm => {
    const core = new HolographicCore(calm);
    const heart = core.object.getObjectByName('Existing core node aura')!;
    const mesh = heart.children.find(child => child instanceof Mesh)!;
    expect(mesh).toBeInstanceOf(Mesh);
    expect(mesh.material).toMatchObject({ transparent: false, opacity: 1, depthWrite: true });
    core.dispose();
  });

  it.each([false, true])('throbs only the actual opaque core and restores its exact baseline (calm=%s)', calm => {
    const core = new HolographicCore(calm, false);
    const position = new Vector3(7, -4, 2);
    core.setBounds(new Vector3(25, 10, 5), 60, position);
    const heart = core.object.getObjectByName('Existing core node aura')!;
    const mesh = heart.children.find(child => child instanceof Mesh)!;
    const baselineColor = mesh.material.color.clone();
    const rim = core.object.getObjectByName('Decorative outer rim only')!;
    const rimScale = rim.scale.clone();
    core.setHeartbeatStrength(1);
    expect(heart.scale.x).toBeCloseTo(60 * (calm ? 1.1 : 1.14));
    expect(heart.position).toEqual(position);
    expect(mesh.material).toMatchObject({ transparent: false, opacity: 1, depthWrite: true });
    expect(mesh.material.color.r).toBeGreaterThan(baselineColor.r);
    expect(rim.scale).toEqual(rimScale);
    core.setDecorationVisible(false);
    expect(heart.visible).toBe(true);
    core.update(new PerspectiveCamera(), 12);
    expect(heart.scale.x).toBeCloseTo(60 * (calm ? 1.1 : 1.14));
    core.setHeartbeatStrength(0);
    expect(heart.scale.x).toBe(60);
    expect(mesh.material.color).toEqual(baselineColor);
    core.update(new PerspectiveCamera(), 2);
    expect(heart.scale.x).toBe(60);
    core.dispose();
  });

  it('hides rings and particles together without removing the real core aura or rebuilding geometry', () => {
    const core = new HolographicCore();
    core.setBounds(new Vector3(0, 0, 0), 60, new Vector3(0, 0, 0));
    const rim = core.object.getObjectByName('Decorative outer rim only')!;
    const heart = core.object.getObjectByName('Existing core node aura')!;
    const geometry = rimLines(core).geometry;
    core.setRimOnly(false);
    for (const visible of [false, true, false, true]) {
      core.setDecorationVisible(visible);
      expect(rim.visible).toBe(visible);
      expect(heart.visible).toBe(true);
      expect(rim.children.some(child => child instanceof LineSegments)).toBe(true);
      expect(rim.children.some(child => child instanceof Points)).toBe(true);
      expect(rimLines(core).geometry).toBe(geometry);
      expect(rimMaterial(core).uniforms.uRimOnly.value).toBe(0);
    }
    core.dispose();
  });

  it.each([false, true])('hides only sparks without changing the core, legacy rings or geometry (calm=%s)', calm => {
    const core = new HolographicCore(calm);
    core.setBounds(new Vector3(), 60, new Vector3());
    const rim = core.object.getObjectByName('Decorative outer rim only')!;
    const heart = core.object.getObjectByName('Existing core node aura')!;
    const particles = rim.children.find((child): child is Points => child instanceof Points)!;
    const geometry = particles.geometry;
    const rings = rimLines(core);
    core.setRimOnly(false);
    for (const visible of [false, true, false, true]) {
      core.setSparksVisible(visible);
      expect(particles.visible).toBe(visible);
      expect(particles.geometry).toBe(geometry);
      expect(rim.visible).toBe(true);
      expect(rings.visible).toBe(true);
      expect(heart.visible).toBe(true);
      expect(rimMaterial(core).uniforms.uRimOnly.value).toBe(0);
    }
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
      expect(Math.abs(speeds.getX(index))).toBeLessThanOrEqual(0.226);
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

  it('boosts exactly two distinct rings by 1.5x and 2x without altering the other original speeds', () => {
    const original = [
      [-0.059875801915, 0.048182137383, 0.078584063323, -0.031296684774],
      [0.082183274286, 0.044465094842, -0.084656528006, 0.066178309777],
      [0.031601344114, -0.032388548447, 0.077641187241, 0.079343642821],
      [-0.042214634527, 0.029587570407, 0.076300416460, -0.080202850757],
      [0.102459483143, 0.028242549119, -0.04160929843, 0.093457024578],
      [0.042735763106, -0.045959925189, 0.042144470065, 0.048087785497],
      [-0.080628957003, 0.038814483106, 0.088261424612, -0.101339395317],
      [0.043564357529, 0.104013910541, -0.064057251935, 0.068670454955],
      [0.092880286815, -0.062971120235, 0.09314318404, 0.042805607593],
      [-0.076484073945, 0.081521349508, 0.097047764688, -0.068195555607],
      [0.110841959534, 0.037480880126, -0.089088077874, 0.057338106049],
      [0.110524550671, -0.103567686611, 0.072928312423, 0.06607340849],
      [-0.112855008112, 0.066613879039, 0.060581409011, -0.073441401463],
      [0.064183272589, 0.087256248795, -0.055952398384, 0.060645329735],
      [0.107711955329, -0.099761167322, 0.050048428673, 0.112706132042],
    ];
    const core = new HolographicCore();
    const geometry = rimLines(core).geometry;
    const axes = geometry.getAttribute('aOrbitAxis');
    const speeds = geometry.getAttribute('aOrbitSpeed');
    const rings = new Map<string, Set<number>>();
    for (let index = 0; index < speeds.count; index++) {
      const axis = [axes.getX(index), axes.getY(index), axes.getZ(index)].join(',');
      if (!rings.has(axis)) rings.set(axis, new Set());
      rings.get(axis)!.add(speeds.getX(index));
    }
    expect(rings.size).toBe(15);
    const multipliers = [...rings.values()].map((ring, index) => {
      const actual = [...ring].sort((a, b) => a - b);
      const baseline = [...original[index]].sort((a, b) => a - b);
      expect(actual).toHaveLength(4);
      const multiplier = Math.round(actual[0] / baseline[0] * 10) / 10;
      actual.forEach((speed, arc) => expect(speed).toBeCloseTo(baseline[arc] * multiplier, 7));
      return multiplier;
    });
    expect(multipliers.sort((a, b) => a - b)).toEqual([...Array<number>(13).fill(1), 1.5, 2]);
    core.dispose();
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

  it('defaults to half the previous particle budgets and keeps focus motion slower than career motion', () => {
    const core = new HolographicCore();
    const calm = new HolographicCore(true);
    const camera = new PerspectiveCamera();
    for (const item of [core, calm]) {
      item.resize(700, 1, false);
      item.update(camera, 1);
    }
    expect(rimMaterial(calm).uniforms.uPhase.value).toBeCloseTo(0.4);
    expect(rimMaterial(core).uniforms.uPhase.value).toBe(1);
    expect(rimMaterial(calm).uniforms.uOpacity.value).toBeCloseTo(0.55 * 0.48);
    const particleCount = (item: HolographicCore) => {
      let count = 0;
      item.object.traverse(object => { if (object instanceof Points) count += object.geometry.drawRange.count; });
      return count;
    };
    expect(particleCount(core)).toBe(900);
    expect(particleCount(calm)).toBe(150);
    core.resize(400, 1.25, true);
    calm.resize(400, 1, true);
    expect(particleCount(core)).toBe(450);
    expect(particleCount(calm)).toBe(88);
    core.dispose();
    calm.dispose();
  });

  it.each([false, true])('changes only the particle draw range, retaining density through resize and visibility (calm=%s)', calm => {
    const core = new HolographicCore(calm, false);
    core.setBounds(new Vector3(), 60, new Vector3());
    const rim = core.object.getObjectByName('Decorative outer rim only')!;
    const particles = rim.children.find((child): child is Points => child instanceof Points)!;
    const geometry = particles.geometry;
    const attributes = ['position', 'color', 'aSize'].map(name => geometry.getAttribute(name));
    const dispose = vi.spyOn(geometry, 'dispose');
    core.update(new PerspectiveCamera(), .5);
    core.setSparksVisible(false);
    for (const density of [0, 25, 100, 50, 75]) {
      core.setSparkDensity(density);
      for (const compact of [true, false, true]) {
        core.resize(500, compact ? 1.25 : 1.5, compact);
        expect(core.sparkDensity).toBe(density);
        expect(core.sparkCount).toBe(sparkParticleCount(density, calm, compact));
        expect(particles.visible).toBe(false);
        expect(core.object.getObjectByName('Existing core node aura')?.visible).toBe(true);
        expect(core.animationTime).toBe(.5);
        ['position', 'color', 'aSize'].forEach((name, index) => expect(geometry.getAttribute(name)).toBe(attributes[index]));
      }
    }
    expect(dispose).not.toHaveBeenCalled();
    const count = core.sparkCount;
    expect(() => core.setSparkDensity(NaN)).toThrow(RangeError);
    expect(core.sparkDensity).toBe(75);
    expect(core.sparkCount).toBe(count);
    core.setSparksVisible(true);
    core.setBounds(new Vector3(3, 5, 7), 80);
    expect(core.sparkDensity).toBe(75);
    expect(core.sparkCount).toBe(count);
    expect(particles.visible).toBe(true);
    core.dispose();
    expect(dispose).toHaveBeenCalledOnce();
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
