import { expect, test } from '@playwright/test';
import { PerspectiveCamera, Vector3 } from 'three';
import { CareerRippleField, careerRippleVertexShader } from '../src/graph/careerRipple';
import { edgeRepulsionShader } from '../src/graph/edgeRepulsion';
import { createInitialState } from '../src/domain/engine';
import { buildCareerGraph } from '../src/graph/careerGraphModel';
import { CareerOrbitVisuals } from '../src/graph/CareerOrbitVisuals';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });

test('actual orbit shaders pin quiet rings and join weighted tethers to moving work nodes', async ({ page }) => {
  const graph = buildCareerGraph(createInitialState(false));
  const nodes = new Map(graph.nodes.map(node => [node.id, node]));
  const active = graph.orbits.find(orbit => orbit.missionId === 'pattern')!;
  const quiet = graph.orbits.find(orbit => orbit.missionId === 'fabric')!;
  const selection = { orbitId: quiet.id, segmentId: quiet.segments[0].id };
  const camera = new PerspectiveCamera(46, 1.4, .1, 1000);
  camera.position.set(90, 45, 230);
  camera.lookAt(17, -8, 4);
  camera.updateMatrixWorld();
  const field = new CareerRippleField();
  field.source.set(9, -6, 2);
  field.setWave(60, 300, 4);
  field.updateCamera(camera);
  const visuals = new CareerOrbitVisuals();
  try {
    visuals.setRippleField(field);
    visuals.setData([active, quiet], nodes, field.source, 100);
    visuals.setSelection(selection);
    visuals.update(camera, 2);
    const objects = [visuals.paths, visuals.anchors, visuals.primaryTethers, visuals.detailTethers, visuals.selectedAnchor];
    const batches = objects.map(object => ({
      shader: object.material.vertexShader,
      positions: Array.from(object.geometry.getAttribute('position').array),
      weights: Array.from(object.geometry.getAttribute('aRippleWeight').array),
    }));
    const expected = batches.map(batch => batch.weights.flatMap((weight, index) => {
      const base = new Vector3().fromArray(batch.positions, index * 3);
      return base.clone().lerp(field.deformWorld(base, new Vector3()), weight).applyMatrix4(camera.matrixWorldInverse).toArray();
    }));
    expect(batches[1].weights).toEqual([1, 0]);
    expect(batches[4].weights).toEqual([0]);
    expect(batches[3].weights[0]).toBe(0);
    expect(batches[3].weights[visuals.detailTetherSegments * 2 - 1]).toBe(1);
    const outputs = await page.evaluate(({ batches, source, modelView, projection }) => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) throw new Error('Real WebGL2 is required for quiet-ring shader coverage.');
      const outputs: number[][] = [];
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader compile failed.');
        return shader;
      };
      try {
        for (const batch of batches) {
          const vertex = compile(gl.VERTEX_SHADER, `#version 300 es
            precision highp float;
            uniform mat4 projectionMatrix;
            uniform mat4 modelViewMatrix;
            in vec3 position;
            in vec3 color;
            ${batch.shader.replace(/\battribute\b/g, 'in').replace(/\bvarying\b/g, 'out')}`);
          const fragment = compile(gl.FRAGMENT_SHADER, `#version 300 es
            precision highp float;
            out vec4 color;
            void main() { color = vec4(1.0); }`);
          const program = gl.createProgram()!;
          const buffers = [gl.createBuffer()!, gl.createBuffer()!, gl.createBuffer()!];
          const feedback = gl.createTransformFeedback()!;
          try {
            gl.attachShader(program, vertex);
            gl.attachShader(program, fragment);
            gl.transformFeedbackVaryings(program, ['vViewPosition'], gl.INTERLEAVED_ATTRIBS);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'Shader link failed.');
            gl.useProgram(program);
            gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionMatrix'), false, projection);
            gl.uniformMatrix4fv(gl.getUniformLocation(program, 'modelViewMatrix'), false, modelView);
            gl.uniform3fv(gl.getUniformLocation(program, 'uRippleSourceView'), source);
            for (const [name, value] of Object.entries({ uRippleFront: 60, uRippleBandWidth: 300, uRippleAmplitude: 4, uRippleActive: 1, uPixelRatio: 1 })) {
              gl.uniform1f(gl.getUniformLocation(program, name), value);
            }
            for (const [index, attribute] of [{ name: 'position', size: 3, values: batch.positions }, { name: 'aRippleWeight', size: 1, values: batch.weights }].entries()) {
              gl.bindBuffer(gl.ARRAY_BUFFER, buffers[index]);
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attribute.values), gl.STATIC_DRAW);
              const location = gl.getAttribLocation(program, attribute.name);
              if (location < 0) throw new Error(`Missing actual shader attribute: ${attribute.name}`);
              gl.enableVertexAttribArray(location);
              gl.vertexAttribPointer(location, attribute.size, gl.FLOAT, false, 0, 0);
            }
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, feedback);
            gl.bindBuffer(gl.TRANSFORM_FEEDBACK_BUFFER, buffers[2]);
            gl.bufferData(gl.TRANSFORM_FEEDBACK_BUFFER, batch.positions.length * 4, gl.STREAM_READ);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, buffers[2]);
            gl.enable(gl.RASTERIZER_DISCARD);
            gl.beginTransformFeedback(gl.POINTS);
            gl.drawArrays(gl.POINTS, 0, batch.weights.length);
            gl.endTransformFeedback();
            const result = new Float32Array(batch.positions.length);
            gl.getBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER, 0, result);
            if (gl.getError() !== gl.NO_ERROR) throw new Error('Actual orbit transform feedback failed.');
            outputs.push(Array.from(result));
          } finally {
            gl.disable(gl.RASTERIZER_DISCARD);
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
            gl.deleteTransformFeedback(feedback);
            buffers.forEach(buffer => gl.deleteBuffer(buffer));
            gl.deleteProgram(program);
            gl.deleteShader(vertex);
            gl.deleteShader(fragment);
          }
        }
        return outputs;
      } finally {
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    }, { batches, source: field.uniforms.uRippleSourceView.value.toArray(), modelView: camera.matrixWorldInverse.toArray(), projection: camera.projectionMatrix.toArray() });
    let maximumError = 0;
    outputs.forEach((output, batch) => {
      expect(output.every(Number.isFinite)).toBe(true);
      output.forEach((value, index) => {
        maximumError = Math.max(maximumError, Math.abs(value - expected[batch][index]));
      });
    });
    expect(maximumError).toBeLessThan(.0002);
    expect(outputs[3].slice(0, 3)).toEqual(outputs[4].slice(0, 3));
    expect(outputs[2].slice(0, 3)).toEqual(outputs[1].slice(0, 3));
    const target = nodes.get(quiet.segments[0].members[0].nodeId)!;
    const targetView = field.deformWorld(new Vector3().fromArray(target.position), new Vector3()).applyMatrix4(camera.matrixWorldInverse);
    const nodeEndpoint = (visuals.detailTetherSegments * 2 - 1) * 3;
    expect(new Vector3().fromArray(outputs[3], nodeEndpoint).distanceTo(targetView)).toBeLessThan(.0002);
  } finally {
    visuals.dispose();
  }
});

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
