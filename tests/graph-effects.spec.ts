import { expect, test, type Page } from '@playwright/test';
import { CURSOR_REPULSION_PX, cursorRepulsionOffset, edgeRepulsionShader } from '../src/graph/edgeRepulsion';
import { clickGraphOption, graphCheckbox, searchGraphNodes } from './graph-ui';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';

async function ready(page: Page) {
  await page.goto('./#/home');
  const scene = page.locator('.career-graph-scene');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  return scene;
}

test('inspection and zoom keep ambient animation running until the separate pause button is used', async ({ page }) => {
  const scene = await ready(page);
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  await expect(graphCheckbox(page, 'Auto-rotate')).toBeChecked();
  await expect(scene).toHaveAttribute('data-animation-state', 'running');
  const time = async () => Number(await scene.getAttribute('data-animation-time'));
  let previous = await time();
  await page.getByRole('button', { name: 'Zoom career graph in', exact: true }).click();
  await expect.poll(time).toBeGreaterThan(previous);
  const canvas = page.locator('.career-graph-stage canvas');
  await canvas.scrollIntoViewIfNeeded();
  const box = await canvas.boundingBox();
  previous = await time();
  await page.mouse.move(box!.x + box!.width * .4, box!.y + box!.height * .4);
  await page.mouse.down();
  await page.mouse.move(box!.x + box!.width * .5, box!.y + box!.height * .45, { steps: 5 });
  await page.mouse.up();
  await expect.poll(time).toBeGreaterThan(previous);
  await expect(graphCheckbox(page, 'Auto-rotate')).toBeChecked();
  await searchGraphNodes(page, 'HashMap Fundamentals');
  await page.locator('.career-graph-node-list > button').filter({ hasText: 'HashMap Fundamentals' }).first().click();
  await expect(graphCheckbox(page, 'Auto-rotate')).toBeChecked();
  previous = await time();
  await expect.poll(time).toBeGreaterThan(previous);
  await page.getByRole('button', { name: 'Pause animation', exact: true }).click();
  await expect(scene).toHaveAttribute('data-animation-state', 'paused');
  const paused = await scene.getAttribute('data-animation-time');
  await page.waitForTimeout(300);
  await expect(scene).toHaveAttribute('data-animation-time', paused!);
  await page.getByRole('button', { name: 'Resume animation', exact: true }).click();
  await expect(scene).toHaveAttribute('data-animation-state', 'running');
  await expect.poll(time).toBeGreaterThan(Number(paused));
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('the full shell is default and Clear center toggles the real mask without dropping connections', async ({ page }, testInfo) => {
  const scene = await ready(page);
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  await page.getByRole('button', { name: 'Pause animation', exact: true }).click();
  await expect(scene).toHaveAttribute('data-decoration-mode', 'full-shell');
  const nodes = await scene.getAttribute('data-node-count');
  const edges = await scene.getAttribute('data-edge-count');
  const canvas = page.locator('.career-graph-stage canvas');
  const full = await canvas.screenshot();
  const toggle = page.getByRole('button', { name: 'Clear center', exact: true, includeHidden: true });
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await clickGraphOption(page, 'Clear center');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(scene).toHaveAttribute('data-decoration-mode', 'outer-rim-only');
  const clear = await canvas.screenshot();
  expect(clear.equals(full)).toBe(false);
  await testInfo.attach('full-shell', { body: full, contentType: 'image/png' });
  await testInfo.attach('clear-center', { body: clear, contentType: 'image/png' });
  await clickGraphOption(page, 'Clear center');
  await expect(scene).toHaveAttribute('data-decoration-mode', 'full-shell');
  await expect(scene).toHaveAttribute('data-node-count', nodes!);
  await expect(scene).toHaveAttribute('data-edge-count', edges!);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('cursor repulsion is a transient visual response, not movement of saved nodes', async ({ page }, testInfo) => {
  const scene = await ready(page);
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  await page.getByRole('button', { name: 'Pause animation', exact: true }).click();
  const canvas = page.locator('.career-graph-stage canvas');
  const nodes = await scene.getAttribute('data-node-count');
  const edges = await scene.getAttribute('data-edge-count');
  await page.mouse.move(1, 1);
  await expect.poll(async () => Number(await scene.getAttribute('data-cursor-strength'))).toBe(0);
  const before = await canvas.screenshot();
  const box = await canvas.boundingBox();
  await page.mouse.move(box!.x + box!.width * .49, box!.y + box!.height * .54);
  await expect.poll(async () => Number(await scene.getAttribute('data-cursor-strength'))).toBeGreaterThan(.8);
  const repelled = await canvas.screenshot();
  expect(repelled.equals(before)).toBe(false);
  await testInfo.attach('cursor-repelled', { body: repelled, contentType: 'image/png' });
  await page.mouse.move(1, 1);
  await expect.poll(async () => Number(await scene.getAttribute('data-cursor-strength'))).toBe(0);
  await expect(scene).toHaveAttribute('data-node-count', nodes!);
  await expect(scene).toHaveAttribute('data-edge-count', edges!);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('cursor force starts doubled, progressively decreases with zoom and returns with Frame all', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const scene = await ready(page);
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  const nodes = await scene.getAttribute('data-node-count');
  const edges = await scene.getAttribute('data-edge-count');
  const force = async () => Number(await scene.getAttribute('data-cursor-offset'));
  await expect.poll(force).toBeCloseTo(56, 2);
  for (let step = 1; step <= 4; step++) {
    await page.getByRole('button', { name: 'Zoom career graph in', exact: true }).click();
    await expect.poll(force).toBeCloseTo(cursorRepulsionOffset(.8 ** step), 2);
  }
  const canvas = scene.locator('canvas');
  await canvas.scrollIntoViewIfNeeded();
  const box = await canvas.boundingBox();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  const beforeWheel = await force();
  await page.mouse.wheel(0, -200);
  await expect.poll(force).toBeLessThan(beforeWheel);
  await page.getByRole('button', { name: 'Frame all', exact: true }).click();
  await expect.poll(force).toBeCloseTo(56, 2);
  await page.getByRole('button', { name: 'Zoom career graph out', exact: true }).click();
  await expect.poll(force).toBeCloseTo(56, 2);
  await expect(scene).toHaveAttribute('data-node-count', nodes!);
  await expect(scene).toHaveAttribute('data-edge-count', edges!);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('reduced motion starts paused and an explicit resume is usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const scene = await ready(page);
  await expect(scene).toHaveAttribute('data-animation-state', 'paused');
  await expect(graphCheckbox(page, 'Auto-rotate')).not.toBeChecked();
  await page.getByRole('button', { name: 'Resume animation', exact: true }).click();
  await expect(scene).toHaveAttribute('data-animation-state', 'running');
  const time = Number(await scene.getAttribute('data-animation-time'));
  await expect.poll(async () => Number(await scene.getAttribute('data-animation-time'))).toBeGreaterThan(time);
});

test('the actual GPU displacement is outward on both sides, smooth through center and fixed at endpoints', async ({ page }) => {
  const samples = await page.evaluate(({ shader, maximumOffset }) => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) throw new Error('A real WebGL2 context is required.');
    const compile = (type: number, code: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, code);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader compile failure');
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, `#version 300 es
      precision highp float;
      uniform mat4 projectionMatrix;
      in vec4 aPoint;
      in float aT;
      out vec4 result;
      ${shader.replace('attribute vec2 aCurveT;', '')}
      void main() { result = repelInterior(aPoint, aT); gl_Position = result; }`);
    const fragment = compile(gl.FRAGMENT_SHADER, `#version 300 es
      precision highp float;
      out vec4 color;
      void main() { color = vec4(1.0); }`);
    const program = gl.createProgram()!;
    const input = gl.createBuffer()!;
    const output = gl.createBuffer()!;
    const feedback = gl.createTransformFeedback()!;
    try {
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.transformFeedbackVaryings(program, ['result'], gl.INTERLEAVED_ATTRIBS);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'Shader link failure');
      gl.useProgram(program);
      gl.uniformMatrix4fv(gl.getUniformLocation(program, 'projectionMatrix'), false, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      gl.uniform2f(gl.getUniformLocation(program, 'uCursor'), 0, 0);
      gl.uniform2f(gl.getUniformLocation(program, 'uCursorViewport'), 320, 320);
      gl.uniform1f(gl.getUniformLocation(program, 'uCursorRadius'), 115);
      gl.uniform1f(gl.getUniformLocation(program, 'uCursorOffset'), maximumOffset);
      gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, feedback);
      gl.bindBuffer(gl.TRANSFORM_FEEDBACK_BUFFER, output);
      const count = 481;
      gl.bufferData(gl.TRANSFORM_FEEDBACK_BUFFER, count * 16, gl.STREAM_READ);
      gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, 0, output);
      gl.bindBuffer(gl.ARRAY_BUFFER, input);
      const pointLocation = gl.getAttribLocation(program, 'aPoint');
      gl.enableVertexAttribArray(pointLocation);
      gl.vertexAttribPointer(pointLocation, 4, gl.FLOAT, false, 0, 0);
      gl.enable(gl.RASTERIZER_DISCARD);
      const result = new Float32Array(count * 4);
      const samples: { offset: number; t: number; strength: number; axis: number; displacement: number[] }[] = [];
      for (const axis of [0, 1]) {
        const points = new Float32Array(count * 4);
        for (let index = 0; index < count; index++) {
          points[index * 4 + axis] = (-120 + index * .5) / 160;
          points[index * 4 + 2] = -1;
          points[index * 4 + 3] = 1;
        }
        gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
        for (const t of [0, .5, 1]) {
          for (const strength of [0, .5, 1]) {
            gl.vertexAttrib1f(gl.getAttribLocation(program, 'aT'), t);
            gl.uniform1f(gl.getUniformLocation(program, 'uCursorStrength'), strength);
            gl.beginTransformFeedback(gl.POINTS);
            gl.drawArrays(gl.POINTS, 0, count);
            gl.endTransformFeedback();
            gl.getBufferSubData(gl.TRANSFORM_FEEDBACK_BUFFER, 0, result);
            for (let index = 0; index < count; index++) {
              const offset = -120 + index * .5;
              const x = axis === 0 ? offset : 0, y = axis === 1 ? offset : 0;
              samples.push({ offset, t, strength, axis, displacement: [result[index * 4] * 160 - x, result[index * 4 + 1] * 160 - y] });
            }
          }
        }
      }
      if (gl.getError() !== gl.NO_ERROR) throw new Error('GPU displacement probe failed.');
      return samples;
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
  }, { shader: edgeRepulsionShader, maximumOffset: CURSOR_REPULSION_PX });
  expect(samples).toHaveLength(481 * 18);
  expect(samples.filter(sample => {
    const length = Math.hypot(...sample.displacement);
    const fixed = sample.t === 0 || sample.t === 1 || sample.strength === 0 || sample.offset === 0;
    return !sample.displacement.every(Number.isFinite) || length > CURSOR_REPULSION_PX + .001 ||
      sample.offset * sample.displacement[sample.axis] < -.001 || (fixed && length >= .001);
  })).toEqual([]);
  for (const axis of [0, 1]) {
    const moving = samples.filter(sample => sample.axis === axis && sample.t === .5 && sample.strength === 1);
    const legacyForce = samples.filter(sample => sample.axis === axis && sample.t === .5 && sample.strength === .5);
    expect(moving.filter((sample, index) => Math.abs(sample.displacement[axis] - 2 * legacyForce[index].displacement[axis]) > .001)).toEqual([]);
    const differences = moving.slice(1).map((sample, index) => Math.abs(sample.displacement[axis] - moving[index].displacement[axis]));
    expect(Math.max(...differences)).toBeLessThan(CURSOR_REPULSION_PX / 10);
  }
});
