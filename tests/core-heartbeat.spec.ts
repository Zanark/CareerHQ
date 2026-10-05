import { expect, test, type Page } from '@playwright/test';
import { PNG } from './png';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';

async function ready(page: Page) {
  const scene = page.locator('.career-graph-scene');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  await expect(scene).toHaveAttribute('data-heartbeat-period-ms', '3000');
  return scene;
}

async function frozenMain(page: Page) {
  await page.clock.install({ time: new Date('2026-10-05T12:00:00Z') });
  await page.clock.pauseAt(new Date('2026-10-05T12:01:00Z'));
  await page.goto('./#/home');
  await expect.poll(async () => {
    await page.clock.runFor(100);
    return page.evaluate(() => document.querySelector('.career-graph-scene')?.getAttribute('data-scene-state') ?? 'loading');
  }, { timeout: 20_000 }).toBe('ready');
  return page.locator('.career-graph-scene');
}

for (const viewport of [{ width: 1920, height: 1200 }, { width: 390, height: 844 }, { width: 568, height: 320 }]) {
  test(`focus graph is centered on the actual core at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    if (viewport.width !== 1920) {
      await page.addInitScript(() => Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, get: () => false }));
    }
    await page.goto('./#/plan');
    await page.locator('[data-tour="focus-room-open"]').waitFor();
    const raw = await page.evaluate(key => localStorage.getItem(key), key);
    await page.locator('[data-tour="focus-room-open"]').click();
    const scene = await ready(page);
    const room = page.locator('.focus-room');
    const stage = room.locator('[data-focus-room-stage]');
    const background = room.locator('.focus-room__background');
    if (viewport.width === 1920) await expect.poll(() => page.evaluate(() => document.fullscreenElement?.matches('[data-focus-room-stage]'))).toBe(true);
    await expect(background).toHaveCSS('transform', 'none');
    await expect(scene).toHaveAttribute('data-core-screen-visible', 'true');
    const canvas = await scene.locator('canvas').boundingBox();
    const bounds = await stage.boundingBox();
    if (!canvas || !bounds) throw new Error('Expected the actual focus stage and WebGL canvas.');
    expect(canvas.x).toBeCloseTo(bounds.x, 0);
    expect(canvas.y).toBeCloseTo(bounds.y, 0);
    expect(canvas.width).toBeCloseTo(bounds.width, 0);
    expect(canvas.height).toBeCloseTo(bounds.height, 0);
    await expect.poll(async () => Number(await scene.getAttribute('data-core-screen-x')) / canvas.width).toBeCloseTo(.5, 3);
    await expect.poll(async () => Number(await scene.getAttribute('data-core-screen-y')) / canvas.height).toBeCloseTo(.5, 3);
    await expect(scene).toHaveAttribute('data-heartbeat-running', 'false');
    await expect(room.locator('[data-tour="focus-room-time"]')).toBeInViewport({ ratio: 1 });
    await expect(room.locator('[data-tour="focus-room-distraction"]')).toBeInViewport({ ratio: 1 });
    await expect(room.getByRole('checkbox', { name: 'Core heartbeat', exact: true })).toBeVisible();
    await testInfo.attach('centered-focus-core', { body: await page.screenshot(), contentType: 'image/png' });
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
  });
}

test('the heartbeat completes a three-second cycle even when animation frames are skipped', async ({ page }) => {
  const scene = await frozenMain(page);
  await expect(scene).toHaveAttribute('data-heartbeat-period-ms', '3000');
  const cycle = Number(await scene.getAttribute('data-heartbeat-cycle'));
  for (let beat = 1; beat <= 2; beat++) {
    await page.clock.fastForward(3000);
    await page.clock.runFor(50);
    await expect(scene).toHaveAttribute('data-heartbeat-cycle', String(cycle + beat));
  }
  await expect(scene).toHaveAttribute('data-orbit-pulse-count', '0');
});

test('the expanding ripple changes rendered pixels without changing work or orbit motion', async ({ page }, testInfo) => {
  const scene = await frozenMain(page);
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  await page.getByRole('checkbox', { name: 'Auto-rotate', exact: true }).uncheck();
  await page.getByRole('checkbox', { name: 'Rings & sparks', exact: true }).uncheck();
  const heartbeat = page.getByRole('checkbox', { name: 'Core heartbeat', exact: true });
  await heartbeat.uncheck();
  await page.clock.runFor(50);
  await heartbeat.check();
  await page.clock.fastForward(900);
  await page.clock.runFor(50);
  await expect(scene).toHaveAttribute('data-heartbeat-wave-visible', 'true');
  const canvas = scene.locator('canvas');
  await canvas.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  const wave = await canvas.screenshot();
  await heartbeat.uncheck();
  await page.clock.runFor(50);
  await expect(scene).toHaveAttribute('data-heartbeat-wave-visible', 'false');
  await canvas.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  const still = await canvas.screenshot();
  const a = PNG.sync.read(wave), b = PNG.sync.read(still);
  expect([a.width, a.height]).toEqual([b.width, b.height]);
  let changed = 0;
  for (let index = 0; index < a.data.length; index += 4) {
    if (Math.abs(a.data[index] - b.data[index]) + Math.abs(a.data[index + 1] - b.data[index + 1]) + Math.abs(a.data[index + 2] - b.data[index + 2]) > 12) changed++;
  }
  expect(changed, 'The actual spherical ripple must be visible, not just a running counter').toBeGreaterThan(100);
  await testInfo.attach('core-ripple-on', { body: wave, contentType: 'image/png' });
  await testInfo.attach('core-ripple-off', { body: still, contentType: 'image/png' });
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('the core heartbeat toggle leaves orbit motion, connections and stored work unchanged', async ({ page }) => {
  await page.goto('./#/home');
  const scene = await ready(page);
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  const nodes = await scene.getAttribute('data-node-count'), edges = await scene.getAttribute('data-edge-count');
  const heartbeat = page.getByRole('checkbox', { name: 'Core heartbeat', exact: true });
  await expect(heartbeat).toBeChecked();
  await expect(scene).toHaveAttribute('data-heartbeat-running', 'true');
  await heartbeat.uncheck();
  await expect(scene).toHaveAttribute('data-heartbeat-enabled', 'false');
  await expect(scene).toHaveAttribute('data-heartbeat-running', 'false');
  const time = Number(await scene.getAttribute('data-animation-time'));
  await expect.poll(async () => Number(await scene.getAttribute('data-animation-time'))).toBeGreaterThan(time);
  await heartbeat.check();
  await expect(scene).toHaveAttribute('data-heartbeat-running', 'true');
  await page.getByRole('checkbox', { name: 'Rings & sparks', exact: true }).uncheck();
  await expect(scene).toHaveAttribute('data-heartbeat-running', 'true');
  await page.getByRole('button', { name: 'Pause animation', exact: true }).click();
  await expect(scene).toHaveAttribute('data-heartbeat-running', 'false');
  await expect(scene).toHaveAttribute('data-node-count', nodes!);
  await expect(scene).toHaveAttribute('data-edge-count', edges!);
  await expect(scene).toHaveAttribute('data-orbit-pulse-count', '0');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('the main-view ripple source follows the real white core when the camera is panned', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/home');
  const scene = await ready(page);
  const canvas = scene.locator('canvas');
  await canvas.scrollIntoViewIfNeeded();
  const x = await scene.getAttribute('data-core-screen-x');
  const source = await Promise.all(['x', 'y', 'z'].map(axis => scene.getAttribute(`data-heartbeat-source-${axis}`)));
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Expected the live graph canvas.');
  await page.mouse.move(box.x + box.width * .45, box.y + box.height * .45);
  await page.mouse.down({ button: 'right' });
  await page.mouse.move(box.x + box.width * .45 + 70, box.y + box.height * .45 + 30, { steps: 4 });
  await page.mouse.up({ button: 'right' });
  await expect.poll(() => scene.getAttribute('data-core-screen-x')).not.toBe(x);
  expect(await Promise.all(['x', 'y', 'z'].map(axis => scene.getAttribute(`data-heartbeat-source-${axis}`)))).toEqual(source);
  expect(source.map(Number)).toEqual([0, 0, 0]);
});
