import { expect, test } from '@playwright/test';
import { PNG } from './png';
import { clickGraphOption, graphCheckbox, setGraphCheckbox, setGraphScope } from './graph-ui';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';

function changedPixels(first: Buffer, second: Buffer): number {
  const a = PNG.sync.read(first), b = PNG.sync.read(second);
  expect([b.width, b.height]).toEqual([a.width, a.height]);
  let changed = 0;
  for (let index = 0; index < a.data.length; index += 4) {
    if (Math.abs(a.data[index] - b.data[index]) + Math.abs(a.data[index + 1] - b.data[index + 1]) + Math.abs(a.data[index + 2] - b.data[index + 2]) > 12) changed++;
  }
  return changed;
}

for (const width of [1440, 320]) {
  test(`rings and sparks can be hidden independently without changing the filtered graph at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./#/home');
    const scene = page.locator('.career-graph-scene');
    await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
    const rings = graphCheckbox(page, 'Rings');
    const sparks = graphCheckbox(page, 'Sparks');
    await expect(rings).toBeChecked();
    await expect(sparks).toBeChecked();
    await expect(scene).toHaveAttribute('data-rings-visible', 'true');
    await expect(scene).toHaveAttribute('data-sparks-visible', 'true');
    const raw = await page.evaluate(key => localStorage.getItem(key), key);
    await setGraphScope(page, 'pattern');
    await expect.poll(async () => Number(await scene.getAttribute('data-node-count'))).toBeLessThan(100);
    await page.getByRole('button', { name: 'Zoom career graph in', exact: true }).click();
    await expect.poll(async () => Number(await scene.getAttribute('data-cursor-offset'))).toBeLessThan(56);
    const force = await scene.getAttribute('data-cursor-offset');
    const nodes = await scene.getAttribute('data-node-count');
    const edges = await scene.getAttribute('data-edge-count');
    const canvas = scene.locator('canvas');
    await canvas.evaluate(element => element.setAttribute('data-original-decoration-canvas', 'true'));
    await page.mouse.move(1, 1);
    const before = await canvas.screenshot();
    const clear = page.getByRole('button', { name: 'Clear center', exact: true, includeHidden: true });
    await setGraphCheckbox(page, 'Sparks', false);
    await expect(scene).toHaveAttribute('data-rings-visible', 'true');
    await expect(scene).toHaveAttribute('data-sparks-visible', 'false');
    await expect(clear).toBeEnabled();
    const ringsOnly = await canvas.screenshot();
    expect(changedPixels(before, ringsOnly), 'Only the spark pixels should disappear').toBeGreaterThan(20);
    await setGraphCheckbox(page, 'Rings', false);
    await expect(scene).toHaveAttribute('data-rings-visible', 'false');
    await expect(scene).toHaveAttribute('data-sparks-visible', 'false');
    await expect(clear).toBeDisabled();
    await expect(scene.locator('.career-graph-scene__space-note')).toHaveText('Orange links: connections · Rings hidden · Sparks hidden');
    const hidden = await canvas.screenshot();
    expect(changedPixels(ringsOnly, hidden), 'Ring geometry should disappear independently').toBeGreaterThan(20);
    await setGraphCheckbox(page, 'Sparks', true);
    await expect(scene).toHaveAttribute('data-rings-visible', 'false');
    await expect(scene).toHaveAttribute('data-sparks-visible', 'true');
    await expect(rings).not.toBeChecked();
    await expect(clear).toBeDisabled();
    await expect(scene.locator('.career-graph-scene__orbit-diagnostic[data-screen-visible="true"]')).toHaveCount(0);
    const sparksOnly = await canvas.screenshot();
    expect(changedPixels(hidden, sparksOnly), 'Sparks should return without rings').toBeGreaterThan(20);
    await testInfo.attach('rings-and-sparks-visible', { body: before, contentType: 'image/png' });
    await testInfo.attach('rings-only', { body: ringsOnly, contentType: 'image/png' });
    await testInfo.attach('rings-and-sparks-hidden', { body: hidden, contentType: 'image/png' });
    await testInfo.attach('sparks-only', { body: sparksOnly, contentType: 'image/png' });
    await expect(canvas).toHaveAttribute('data-original-decoration-canvas', 'true');
    await expect(scene).toHaveAttribute('data-node-count', nodes!);
    await expect(scene).toHaveAttribute('data-edge-count', edges!);
    await expect(scene).toHaveAttribute('data-cursor-offset', force!);
    await setGraphCheckbox(page, 'Rings', true);
    await expect(scene).toHaveAttribute('data-rings-visible', 'true');
    await expect(scene).toHaveAttribute('data-sparks-visible', 'true');
    await clickGraphOption(page, 'Clear center');
    await expect(scene).toHaveAttribute('data-decoration-mode', 'outer-rim-only');
    await setGraphCheckbox(page, 'Sparks', false);
    await setGraphCheckbox(page, 'Rings', false);
    await setGraphCheckbox(page, 'Rings', true);
    await expect(sparks).not.toBeChecked();
    await expect(scene).toHaveAttribute('data-sparks-visible', 'false');
    await expect(clear).toHaveAttribute('aria-pressed', 'true');
    await expect(scene).toHaveAttribute('data-decoration-mode', 'outer-rim-only');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
  });
}
