import { expect, test } from '@playwright/test';
import { BufferAttribute, LineSegments, Matrix4, PerspectiveCamera, Points, ShaderMaterial, Vector3 } from 'three';
import { HolographicCore } from '../src/graph/HolographicCore';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });

for (const position of [[0, 0, 240], [220, 90, 160], [-150, 130, -220], [8, -5, 20]]) {
  test(`decorative shaders leave the sphere interior empty from camera ${position.join(',')}`, async ({ page }) => {
    const core = new HolographicCore();
    core.setRimOnly(true);
    const center = new Vector3(8, -5, 2);
    const radius = 60;
    const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.fromArray(position);
    camera.lookAt(20, 10, 0);
    const inside = camera.position.distanceTo(center) < radius;
    core.setBounds(center, radius);
    core.resize(320, 1, false);
    core.update(camera, 0.05);
    core.object.updateMatrixWorld(true);
    const draws: {
      points: boolean; vertex: string; fragment: string;
      attributes: Record<string, { values: number[]; size: number }>;
      uniforms: Record<string, number | number[]>; modelView: number[]; count: number;
    }[] = [];
    core.object.traverse(object => {
      if (!(object instanceof LineSegments || object instanceof Points) || !(object.material instanceof ShaderMaterial)) return;
      const attributes: Record<string, { values: number[]; size: number }> = {};
      for (const [name, attribute] of Object.entries(object.geometry.attributes)) {
        if (attribute instanceof BufferAttribute) attributes[name] = { values: Array.from(attribute.array), size: attribute.itemSize };
      }
      const uniforms: Record<string, number | number[]> = {};
      for (const [name, uniform] of Object.entries(object.material.uniforms)) {
        if (typeof uniform.value === 'number') uniforms[name] = uniform.value;
        else if (uniform.value instanceof Vector3) uniforms[name] = uniform.value.toArray();
      }
      draws.push({
        points: object instanceof Points,
        vertex: object.material.vertexShader,
        fragment: object.material.fragmentShader.replace('#include <colorspace_fragment>', ''),
        attributes, uniforms,
        modelView: new Matrix4().multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld).toArray(),
        count: Math.min(object.geometry.getAttribute('position').count, object.geometry.drawRange.count),
      });
    });
    const result = await page.evaluate(({ draws, projection, centerView, radius }) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 320;
      const gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true });
      if (!gl) throw new Error('Real WebGL2 is required for the decoration-mask check.');
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader compilation failed');
        return shader;
      };
      gl.viewport(0, 0, 320, 320);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      let arcPixels = 0;
      for (const draw of draws) {
        const vertex = compile(gl.VERTEX_SHADER, `precision highp float; attribute vec3 position; attribute vec3 color; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix;\n${draw.vertex}`);
        const fragment = compile(gl.FRAGMENT_SHADER, `precision highp float;\n${draw.fragment}`);
        const program = gl.createProgram()!;
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'Shader link failed');
        gl.useProgram(program);
        const buffers: WebGLBuffer[] = [];
        const locations: number[] = [];
        for (const [name, attribute] of Object.entries(draw.attributes)) {
          const location = gl.getAttribLocation(program, name);
          if (location < 0) continue;
          const buffer = gl.createBuffer()!;
          buffers.push(buffer);
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attribute.values), gl.STATIC_DRAW);
          gl.enableVertexAttribArray(location);
          locations.push(location);
          gl.vertexAttribPointer(location, attribute.size, gl.FLOAT, false, 0, 0);
        }
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionMatrix'), false, projection);
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 'modelViewMatrix'), false, draw.modelView);
        for (const [name, value] of Object.entries(draw.uniforms)) {
          const location = gl.getUniformLocation(program, name);
          if (typeof value === 'number') gl.uniform1f(location, value);
          else gl.uniform3fv(location, value);
        }
        gl.drawArrays(draw.points ? gl.POINTS : gl.LINES, 0, draw.count);
        if (!draw.points) {
          const linePixels = new Uint8Array(320 * 320 * 4);
          gl.readPixels(0, 0, 320, 320, gl.RGBA, gl.UNSIGNED_BYTE, linePixels);
          for (let index = 3; index < linePixels.length; index += 4) if (linePixels[index]) arcPixels++;
        }
        for (const location of locations) gl.disableVertexAttribArray(location);
        for (const buffer of buffers) gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
      }
      const pixels = new Uint8Array(320 * 320 * 4);
      gl.readPixels(0, 0, 320, 320, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      let painted = 0, interior = 0;
      for (let y = 0; y < 320; y++) for (let x = 0; x < 320; x++) {
        if (!pixels[(y * 320 + x) * 4 + 3]) continue;
        painted++;
        const ray = [((x + 0.5) / 160 - 1) / projection[0], ((y + 0.5) / 160 - 1) / projection[5], -1];
        const length = Math.hypot(...ray);
        const [rx, ry, rz] = ray.map(value => value / length);
        const [cx, cy, cz] = centerView;
        const clearance = Math.hypot(cy * rz - cz * ry, cz * rx - cx * rz, cx * ry - cy * rx) / radius;
        if (clearance < 1) interior++;
      }
      const error = gl.getError();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return { painted, arcPixels, interior, error };
    }, { draws, projection: camera.projectionMatrix.toArray(), centerView: center.clone().applyMatrix4(camera.matrixWorldInverse).toArray(), radius });
    core.dispose();
    expect(result.error).toBe(0);
    if (inside) {
      expect(result.painted).toBe(0);
      expect(result.arcPixels).toBe(0);
    } else {
      expect(result.painted).toBeGreaterThan(50);
      expect(result.arcPixels).toBeGreaterThan(50);
    }
    expect(result.interior).toBe(0);
  });
}
