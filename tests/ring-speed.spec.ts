import { expect, test, type Locator, type Page } from '@playwright/test';
import { LineSegments, Matrix4, PerspectiveCamera, ShaderMaterial, Vector3 } from 'three';
import { CareerOrbitVisuals } from '../src/graph/CareerOrbitVisuals';
import { HolographicCore } from '../src/graph/HolographicCore';
import { CareerRippleField } from '../src/graph/careerRipple';
import { CAREER_ORBIT_PLANES } from '../src/graph/careerOrbitMotion';
import { createInitialState } from '../src/domain/engine';
import { buildCareerGraph } from '../src/graph/careerGraphModel';
import { closeGraphPanels, openGraphPanel, setGraphCheckbox, setGraphScope } from './graph-ui';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';
const orbitId = 'orbit:mission:pattern';

async function select(page: Page, id: string) {
  await openGraphPanel(page, 'rings');
  await page.locator(`.career-orbit-list > button[data-orbit-id="${id}"]`).click();
  const inspector = page.getByRole('complementary', { name: 'Selected career orbit', exact: true });
  await expect(inspector).toHaveAttribute('data-orbit-id', id);
  return inspector;
}

async function setSpeed(slider: Locator, speed: number) {
  await slider.press('Home');
  for (let index = 0; index < speed / 10; index++) await slider.press('ArrowRight');
  await expect(slider).toHaveValue(String(speed));
}

test('selected-ring slider integrates real motion at 100/200/0 percent without jumps or changing other rings', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/home');
  const scene = page.locator('.career-graph-scene');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  await setGraphCheckbox(page, 'Auto-rotate', false);
  await setGraphCheckbox(page, 'Core heartbeat', false);
  const inspector = await select(page, orbitId);
  const slider = inspector.getByRole('slider', { name: 'Rotation speed', exact: true });
  await expect(slider).toHaveAttribute('min', '0');
  await expect(slider).toHaveAttribute('max', '300');
  await expect(slider).toHaveAttribute('step', '10');
  await expect(slider).toHaveValue('100');
  await expect(slider).toBeEnabled();
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  const camera = await scene.getAttribute('data-view-revision');
  const canvas = scene.locator('canvas');
  await canvas.evaluate(element => element.setAttribute('data-original-speed-canvas', 'true'));
  const marker = scene.locator(`.career-graph-scene__orbit-diagnostic[data-orbit-id="${orbitId}"]`);
  const other = scene.locator('.career-graph-scene__orbit-diagnostic[data-orbit-revolving="true"]');
  const otherId = await other.evaluateAll((elements, selected) => elements.find(element => element.getAttribute('data-orbit-id') !== selected)?.getAttribute('data-orbit-id'), orbitId);
  expect(otherId).toBeTruthy();
  const otherMarker = scene.locator(`.career-graph-scene__orbit-diagnostic[data-orbit-id="${otherId}"]`);
  const snapshot = () => scene.evaluate((element, ids) => ({
    time: Number(element.getAttribute('data-animation-time')),
    rings: ids.map(id => {
      const marker = element.querySelector(`.career-graph-scene__orbit-diagnostic[data-orbit-id="${id}"]`)!;
      return { phase: Number(marker.getAttribute('data-rotation-phase')),
        point: ['x', 'y', 'z'].map(axis => Number(marker.getAttribute(`data-world-${axis}`))) };
    }),
  }), [orbitId, otherId!]);
  const original = await snapshot();
  const rates: number[] = [];
  for (const speed of [100, 200, 0]) {
    const beforeChange = await snapshot();
    await setSpeed(slider, speed);
    await expect(marker).toHaveAttribute('data-rotation-speed', String(speed));
    await expect(otherMarker).toHaveAttribute('data-rotation-speed', '100');
    expect(await snapshot()).toEqual(beforeChange);
    const start = await snapshot();
    await page.getByRole('button', { name: 'Resume animation', exact: true }).click();
    await expect(scene).toHaveAttribute('data-animation-state', 'running');
    await expect.poll(async () => (await snapshot()).time - start.time).toBeGreaterThan(.35);
    await page.getByRole('button', { name: 'Pause animation', exact: true }).click();
    await expect(scene).toHaveAttribute('data-animation-state', 'paused');
    const end = await snapshot(), elapsed = end.time - start.time;
    rates.push((end.rings[0].phase - start.rings[0].phase) / elapsed);
    if (speed === 0) expect(end.rings[0]).toEqual(start.rings[0]);
    else expect(end.rings[0].point).not.toEqual(start.rings[0].point);
    expect(end.rings[1].point).not.toEqual(start.rings[1].point);
  }
  const graph = buildCareerGraph(createInitialState(false));
  const index = graph.orbits.find(orbit => orbit.id === orbitId)!.index;
  expect(rates[0]).toBeCloseTo(CAREER_ORBIT_PLANES[index].speed, 3);
  expect(rates[1]).toBeCloseTo(CAREER_ORBIT_PLANES[index].speed * 2, 3);
  expect(rates[2]).toBe(0);
  expect((await snapshot()).rings[0].point).not.toEqual(original.rings[0].point);
  await expect(scene).toHaveAttribute('data-orbit-pulse-count', '0');
  await expect(scene).toHaveAttribute('data-view-revision', camera!);
  await expect(canvas).toHaveAttribute('data-original-speed-canvas', 'true');
  const frozen = await snapshot();
  await setGraphScope(page, 'fabric');
  await setGraphScope(page, 'all');
  await select(page, orbitId);
  await expect(slider).toHaveValue('0');
  expect(await snapshot()).toEqual(frozen);
  const picker = inspector.getByRole('combobox', { name: 'Orbit stage or record group' });
  const stage = await picker.locator('option').nth(1).getAttribute('value');
  await picker.selectOption(stage!);
  await expect(scene).toHaveAttribute('data-highlighted-orbit-id', orbitId);
  await expect(scene).toHaveAttribute('data-orbit-highlight-visible', 'true');
  await expect(scene).toHaveAttribute('data-selected-orbit-segment-id', stage!);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('quiet mission inspector disables rotation and retained speeds do not bypass global pause', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/home');
  const scene = page.locator('.career-graph-scene');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  const inspector = await select(page, 'orbit:mission:fabric');
  await expect(inspector.getByRole('slider', { name: 'Rotation speed', exact: true })).toBeDisabled();
  await inspector.getByRole('button', { name: 'Reveal orbit and members', exact: true }).click();
  const quiet = scene.locator('.career-graph-scene__orbit-diagnostic[data-orbit-id="orbit:mission:fabric"]');
  await expect(quiet).toHaveAttribute('data-orbit-revolving', 'false');
  await expect(quiet).toHaveAttribute('data-rotation-phase', /^(0|0\.0+)$/);
  await select(page, orbitId);
  const slider = inspector.getByRole('slider', { name: 'Rotation speed', exact: true });
  await setSpeed(slider, 300);
  const marker = scene.locator(`.career-graph-scene__orbit-diagnostic[data-orbit-id="${orbitId}"]`);
  const phase = await marker.getAttribute('data-rotation-phase');
  await closeGraphPanels(page);
  await page.waitForTimeout(250);
  await expect(scene).toHaveAttribute('data-animation-state', 'paused');
  await expect(marker).toHaveAttribute('data-rotation-phase', phase!);
});

test('actual ring-speed and spark-line GPU shaders retain offset-source ripple parity', async ({ page }) => {
  const graph = buildCareerGraph(createInitialState(false));
  const orbit = graph.orbits.find(orbit => orbit.id === orbitId)!;
  const camera = new PerspectiveCamera(46, 1.4, .1, 1000);
  camera.position.set(90, 45, 230); camera.lookAt(17, -8, 4); camera.updateMatrixWorld();
  const field = new CareerRippleField();
  field.source.set(9, -6, 2); field.setWave(60, 300, 4); field.updateCamera(camera);
  const visuals = new CareerOrbitVisuals(), core = new HolographicCore(false, false);
  try {
    visuals.setRippleField(field);
    visuals.setData([orbit], new Map(graph.nodes.map(node => [node.id, node])), new Vector3(17, -8, 4), 100);
    visuals.setSelection({ orbitId, segmentId: orbit.segments[0].id });
    visuals.update(camera, 2);
    visuals.setRotationSpeeds({ [orbitId]: 200 });
    visuals.update(camera, 3);
    expect(visuals.getRotationPhase(orbitId)).toBeCloseTo(8 * CAREER_ORBIT_PLANES[orbit.index].speed);
    core.setBounds(new Vector3(17, -8, 4), 100, field.source);
    core.setRippleField(field.uniforms); core.setSparkLineDensity(100); core.update(camera, 8);
    core.object.updateMatrixWorld(true); visuals.object.updateMatrixWorld(true);
    const streaks = core.object.getObjectByName('Decorative spark streaks - not graph connections');
    if (!(streaks instanceof LineSegments) || !(streaks.material instanceof ShaderMaterial)) throw new Error('Expected actual streak shader.');
    const objects = [visuals.paths, visuals.anchors, visuals.primaryTethers, visuals.detailTethers, visuals.selectedAnchor, streaks];
    const batches = objects.map(object => {
      if (!(object.material instanceof ShaderMaterial)) throw new Error('Expected actual shared ripple shader.');
      const positions = Array.from(object.geometry.getAttribute('position').array, Number);
      const weights = object.geometry.getAttribute('aRippleWeight');
      return { shader: object.material.vertexShader, positions,
        weights: weights ? Array.from(weights.array, Number) : null,
        modelView: new Matrix4().multiplyMatrices(camera.matrixWorldInverse, object.matrixWorld).toArray(),
        expected: Array.from({ length: positions.length / 3 }, (_, index) => {
          const base = new Vector3().fromArray(positions, index * 3).applyMatrix4(object.matrixWorld);
          return base.clone().lerp(field.deformWorld(base, new Vector3()), weights ? weights.getX(index) : 1)
            .applyMatrix4(camera.matrixWorldInverse).toArray();
        }).flat() };
    });
    const outputs = await page.evaluate(({ batches, source, projection }) => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) throw new Error('Real WebGL2 is required for renderer ripple parity.');
      const compile = (type: number, source: string) => {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source); gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader compile failed.');
        return shader;
      };
      try {
        return batches.map(batch => {
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
          const program = gl.createProgram()!, feedback = gl.createTransformFeedback()!;
          const vertexArray = gl.createVertexArray()!;
          const buffers = [gl.createBuffer()!, gl.createBuffer()!, gl.createBuffer()!];
          try {
            gl.bindVertexArray(vertexArray);
            gl.attachShader(program, vertex); gl.attachShader(program, fragment);
            gl.transformFeedbackVaryings(program, ['vViewPosition'], gl.INTERLEAVED_ATTRIBS);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'Shader link failed.');
            gl.useProgram(program);
            gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionMatrix'), false, projection);
            gl.uniformMatrix4fv(gl.getUniformLocation(program, 'modelViewMatrix'), false, batch.modelView);
            gl.uniform3fv(gl.getUniformLocation(program, 'uRippleSourceView'), source);
            for (const [name, value] of Object.entries({ uRippleFront: 60, uRippleBandWidth: 300, uRippleAmplitude: 4, uRippleActive: 1, uPixelRatio: 1 })) {
              gl.uniform1f(gl.getUniformLocation(program, name), value);
            }
            const attributes = [{ name: 'position', size: 3, values: batch.positions }];
            if (batch.weights) attributes.push({ name: 'aRippleWeight', size: 1, values: batch.weights });
            for (const [index, attribute] of attributes.entries()) {
              gl.bindBuffer(gl.ARRAY_BUFFER, buffers[index]);
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attribute.values), gl.STATIC_DRAW);
              const location = gl.getAttribLocation(program, attribute.name);
              if (location < 0) throw new Error(`Missing actual attribute ${attribute.name}`);
              gl.enableVertexAttribArray(location);
              gl.vertexAttribPointer(location, attribute.size, gl.FLOAT, false, 0, 0);
            }
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, feedback);
            gl.bindBuffer(gl.TRANSFORM_FEEDBACK_BUFFER, buffers[2]);
            gl.bufferData(gl.TRANSFORM_FEEDBACK_BUFFER, batch.positions.length * 4, gl.STREAM_READ);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, buffers[2]);
            gl.enable(gl.RASTERIZER_DISCARD); gl.beginTransformFeedback(gl.POINTS);
            gl.drawArrays(gl.POINTS, 0, batch.positions.length / 3); gl.endTransformFeedback();
            const output = new Float32Array(batch.positions.length);
            gl.getBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER, 0, output);
            if (gl.getError() !== gl.NO_ERROR) throw new Error('Actual renderer transform feedback failed.');
            return Array.from(output);
          } finally {
            gl.disable(gl.RASTERIZER_DISCARD); gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
            gl.bindVertexArray(null); gl.deleteVertexArray(vertexArray);
            gl.deleteTransformFeedback(feedback); buffers.forEach(buffer => gl.deleteBuffer(buffer));
            gl.deleteProgram(program); gl.deleteShader(vertex); gl.deleteShader(fragment);
          }
        });
      } finally { gl.getExtension('WEBGL_lose_context')?.loseContext(); }
    }, { batches: batches.map(({ expected: _, ...batch }) => batch), source: field.uniforms.uRippleSourceView.value.toArray(), projection: camera.projectionMatrix.toArray() });
    let error = 0;
    outputs.forEach((output, batch) => {
      expect(output.every(Number.isFinite)).toBe(true);
      output.forEach((value, index) => {
        error = Math.max(error, Math.abs(value - batches[batch].expected[index]));
      });
    });
    expect(error).toBeLessThan(.0002);
    expect(outputs[3].slice(0, 3)).toEqual(outputs[4].slice(0, 3));
    expect(outputs[2].slice(0, 3)).toEqual(outputs[1].slice(0, 3));
  } finally { visuals.dispose(); core.dispose(); }
});
