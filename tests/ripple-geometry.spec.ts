import { expect, test } from '@playwright/test';
import { PerspectiveCamera, Vector3 } from 'three';
import { CareerRippleField, careerRippleVertexShader } from '../src/graph/careerRipple';
import { edgeRepulsionShader } from '../src/graph/edgeRepulsion';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });

test('real GPU ripple matches CPU labels and keeps cursor-bent edge endpoints attached', async ({ page }) => {
  const camera = new PerspectiveCamera(46, 1.4, .1, 1000);
  camera.position.set(90, 45, 230);
  camera.lookAt(17, -8, 4);
  camera.updateMatrixWorld();
  const field = new CareerRippleField();
  field.source.set(9, -6, 2);
  const directions = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, -1), new Vector3(.4, -.3, .7).normalize()];
  const positions = directions.flatMap(direction =>
    [0, .00001, .001, 1, 10, 34.9, 35, 40, 49, 50, 59, 65, 66, 80].map(distance =>
      field.source.clone().addScaledVector(direction, distance)));
  const viewPositions = positions.flatMap(position => position.clone().applyMatrix4(camera.matrixWorldInverse).toArray());
  const cases = [{ front: 50, width: 30, amplitude: 4 }, { front: 0, width: 30, amplitude: 4 }, { front: 50, width: 30, amplitude: 0 }];
  const expected = cases.map(parameters => {
    field.setWave(parameters.front, parameters.width, parameters.amplitude);
    return positions.flatMap(position => field.deformWorld(position, new Vector3()).applyMatrix4(camera.matrixWorldInverse).toArray());
  });
  field.updateCamera(camera);
  const results = await page.evaluate(({ ripple, cursor, viewPositions, source, projection, cases }) => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) throw new Error('Real WebGL2 is required for ripple endpoint parity.');
    const compile = (type: number, code: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, code);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader compile failed.');
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, `#version 300 es
      precision highp float;
      uniform mat4 projectionMatrix;
      in vec3 aPoint;
      in float aT;
      out vec4 nodePoint;
      out vec4 edgePoint;
      ${ripple}
      ${cursor.replace('attribute vec2 aCurveT;', '')}
      void main() {
        nodePoint = rippleView(vec4(aPoint, 1.0));
        edgePoint = repelInterior(nodePoint, aT);
        gl_Position = projectionMatrix * nodePoint;
      }`);
    const fragment = compile(gl.FRAGMENT_SHADER, `#version 300 es
      precision highp float;
      out vec4 color;
      void main() { color = vec4(1.0); }`);
    const program = gl.createProgram()!;
    const input = gl.createBuffer()!, output = gl.createBuffer()!;
    const feedback = gl.createTransformFeedback()!;
    try {
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.transformFeedbackVaryings(program, ['nodePoint', 'edgePoint'], gl.INTERLEAVED_ATTRIBS);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'Shader link failed.');
      gl.useProgram(program);
      gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionMatrix'), false, projection);
      gl.uniform3fv(gl.getUniformLocation(program, 'uRippleSourceView'), source);
      gl.uniform2f(gl.getUniformLocation(program, 'uCursor'), .03, -.02);
      gl.uniform2f(gl.getUniformLocation(program, 'uCursorViewport'), 320, 320);
      gl.uniform1f(gl.getUniformLocation(program, 'uCursorStrength'), 1);
      gl.uniform1f(gl.getUniformLocation(program, 'uCursorRadius'), 115);
      gl.uniform1f(gl.getUniformLocation(program, 'uCursorOffset'), 56);
      gl.bindBuffer(gl.ARRAY_BUFFER, input);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(viewPositions), gl.STATIC_DRAW);
      const location = gl.getAttribLocation(program, 'aPoint');
      gl.enableVertexAttribArray(location);
      gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, feedback);
      gl.bindBuffer(gl.TRANSFORM_FEEDBACK_BUFFER, output);
      const count = viewPositions.length / 3;
      gl.bufferData(gl.TRANSFORM_FEEDBACK_BUFFER, count * 8 * 4, gl.STREAM_READ);
      gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, output);
      gl.enable(gl.RASTERIZER_DISCARD);
      const results: number[][][] = [];
      for (const parameters of cases) {
        gl.uniform1f(gl.getUniformLocation(program, 'uRippleFront'), parameters.front);
        gl.uniform1f(gl.getUniformLocation(program, 'uRippleBandWidth'), parameters.width);
        gl.uniform1f(gl.getUniformLocation(program, 'uRippleAmplitude'), parameters.amplitude);
        gl.uniform1f(gl.getUniformLocation(program, 'uRippleActive'), parameters.amplitude > 0 ? 1 : 0);
        const endpoints: number[][] = [];
        for (const t of [0, 1]) {
          gl.vertexAttrib1f(gl.getAttribLocation(program, 'aT'), t);
          gl.beginTransformFeedback(gl.POINTS);
          gl.drawArrays(gl.POINTS, 0, count);
          gl.endTransformFeedback();
          const values = new Float32Array(count * 8);
          gl.getBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER, 0, values);
          endpoints.push(Array.from(values));
        }
        results.push(endpoints);
      }
      if (gl.getError() !== gl.NO_ERROR) throw new Error('GPU ripple transform feedback failed.');
      return results;
    } finally {
      gl.disable(gl.RASTERIZER_DISCARD);
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
      gl.deleteTransformFeedback(feedback);
      gl.deleteBuffer(input);
      gl.deleteBuffer(output);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  }, { ripple: careerRippleVertexShader, cursor: edgeRepulsionShader, viewPositions, source: field.uniforms.uRippleSourceView.value.toArray(), projection: camera.projectionMatrix.toArray(), cases });
  let largestCpuError = 0, largestEndpointGap = 0;
  results.forEach((endpoints, scenario) => endpoints.forEach(values => {
    for (let point = 0; point < positions.length; point++) {
      for (let axis = 0; axis < 3; axis++) {
        const node = values[point * 8 + axis], edge = values[point * 8 + 4 + axis];
        expect(Number.isFinite(node) && Number.isFinite(edge)).toBe(true);
        largestCpuError = Math.max(largestCpuError, Math.abs(node - expected[scenario][point * 3 + axis]));
        largestEndpointGap = Math.max(largestEndpointGap, Math.abs(node - edge));
      }
    }
  }));
  expect(largestCpuError).toBeLessThan(.0002);
  expect(largestEndpointGap).toBe(0);
});
