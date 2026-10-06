import { expect, test } from '@playwright/test';
import { Color, Matrix4, ShaderChunk } from 'three';
import { CareerOrbitVisuals } from '../src/graph/CareerOrbitVisuals';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });

for (const ratio of [1, 2]) {
  test(`actual dot shader keeps a flat body and changes only the activity circumference at DPR ${ratio}`, async ({ page }) => {
    const visuals = new CareerOrbitVisuals();
    const material = visuals.anchors.material;
    const result = await page.evaluate(({ vertexSource, fragmentSource, colorspace, identity, color, ratio }) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 64 * ratio;
      const gl = canvas.getContext('webgl2', { antialias: false });
      if (!gl) throw new Error('Real WebGL2 is required for the activity-dot pixel check.');
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader compilation failed.');
        return shader;
      };
      const vertex = compile(gl.VERTEX_SHADER, `#version 300 es
        precision highp float;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        in vec3 position;
        in vec3 color;
        ${vertexSource.replace(/\battribute\b/g, 'in').replace(/\bvarying\b/g, 'out')}`);
      const fragment = compile(gl.FRAGMENT_SHADER, `#version 300 es
        precision highp float;
        out vec4 fragmentColor;
        ${colorspace}
        ${fragmentSource.replace(/\bvarying\b/g, 'in').replace(/\bgl_FragColor\b/g, 'fragmentColor')
          .replace('#include <colorspace_fragment>', 'fragmentColor = sRGBTransferOETF(fragmentColor);')}`);
      const program = gl.createProgram()!;
      try {
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'Shader link failed.');
        gl.useProgram(program);
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 'modelViewMatrix'), false, identity);
        gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionMatrix'), false, identity);
        gl.uniform1f(gl.getUniformLocation(program, 'uPixelRatio'), ratio);
        gl.uniform1f(gl.getUniformLocation(program, 'uDotDiameter'), 32);
        gl.uniform1f(gl.getUniformLocation(program, 'uRippleActive'), 0);
        gl.vertexAttrib3f(gl.getAttribLocation(program, 'position'), 0, 0, 0);
        gl.vertexAttrib3fv(gl.getAttribLocation(program, 'color'), color);
        gl.vertexAttrib1f(gl.getAttribLocation(program, 'aRippleWeight'), 0);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        const frames = [1, .18, 1].map(strength => {
          gl.vertexAttrib1f(gl.getAttribLocation(program, 'aActivityBorderStrength'), strength);
          gl.clearColor(0, 0, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.POINTS, 0, 1);
          const pixels = new Uint8Array(canvas.width * canvas.height * 4);
          gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
          return pixels;
        });
        if (gl.getError() !== gl.NO_ERROR) throw new Error('Activity-dot GPU rendering failed.');
        const sample = (pixels: Uint8Array, x: number, y: number) => {
          const at = ((canvas.height / 2 + y * ratio) * canvas.width + canvas.width / 2 + x * ratio) * 4;
          return Array.from(pixels.slice(at, at + 4));
        };
        let brighter = 0;
        for (let pixel = 0; pixel < frames[0].length; pixel += 4) {
          if (frames[0][pixel] > frames[1][pixel] + 20) brighter++;
        }
        return {
          brighter,
          body: [-4, 0, 4].flatMap(x => [-4, 0, 4].map(y => sample(frames[0], x, y))),
          dimBody: sample(frames[1], 0, 0),
          restored: frames[0].every((value, index) => value === frames[2][index]),
        };
      } finally {
        gl.deleteProgram(program);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    }, { vertexSource: material.vertexShader, fragmentSource: material.fragmentShader,
      colorspace: ShaderChunk.colorspace_pars_fragment, identity: new Matrix4().toArray(), color: new Color('#E84A5F').toArray(), ratio });
    visuals.dispose();
    expect(result.brighter).toBeGreaterThan(150 * ratio * ratio);
    expect(result.body.every(pixel => JSON.stringify(pixel) === JSON.stringify(result.body[0]))).toBe(true);
    expect(result.dimBody).toEqual(result.body[0]);
    expect(result.restored).toBe(true);
  });
}
