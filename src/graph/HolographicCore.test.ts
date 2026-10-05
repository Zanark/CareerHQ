import { describe, expect, it } from 'vitest';
import { LineSegments, PerspectiveCamera, Points, ShaderMaterial, Vector3 } from 'three';
import { HolographicCore } from './HolographicCore';

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
      const material = object.material;
      expect(material.fragmentShader).toContain('rimVisibility()');
      expect(material.fragmentShader).toContain('if (clearance < 1.035) discard');
    });
    expect(lineObjects).toBe(1);
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
        const material = object.material;
        expect(material.uniforms.uCenterView.value.distanceTo(expected)).toBeLessThan(0.00001);
        expect(material.uniforms.uRadius.value).toBe(60);
      });
    }
    core.dispose();
  });
});
