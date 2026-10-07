import { expect, test, type Locator, type Page } from '@playwright/test';
import { PNG } from './png';
import { closeGraphPanels, graphCheckbox, openGraphPanel, setGraphCheckbox } from './graph-ui';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';

async function capture(page: Page, scene: Locator) {
  await closeGraphPanels(page);
  const canvas = scene.locator('canvas');
  await canvas.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  await expect.poll(async () => Number(await scene.getAttribute('data-cursor-strength'))).toBe(0);
  return canvas.screenshot();
}

function changedPixels(before: Buffer, after: Buffer): number {
  const a = PNG.sync.read(before), b = PNG.sync.read(after);
  expect([a.width, a.height]).toEqual([b.width, b.height]);
  let changed = 0;
  for (let index = 0; index < a.data.length; index += 4) {
    if (Math.abs(a.data[index] - b.data[index]) + Math.abs(a.data[index + 1] - b.data[index + 1])
      + Math.abs(a.data[index + 2] - b.data[index + 2]) > 12) changed++;
  }
  return changed;
}

for (const width of [1440, 320]) {
  test(`independent spark dots and short lines render distinct mixed pixels at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./#/home');
    const scene = page.locator('.career-graph-scene');
    await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
    const dots = page.getByRole('slider', { name: 'Spark dots', exact: true, includeHidden: true });
    const lines = page.getByRole('slider', { name: 'Spark lines', exact: true, includeHidden: true });
    const fullLines = width === 1440 ? 600 : 300, fullDots = width === 1440 ? 1800 : 900;
    for (const slider of [dots, lines]) {
      await expect(slider).toHaveValue('10');
      await expect(slider).toHaveAttribute('min', '0');
      await expect(slider).toHaveAttribute('max', '100');
    }
    await expect(scene).toHaveAttribute('data-spark-line-density', '10');
    await expect(scene).toHaveAttribute('data-spark-line-count', String(fullLines / 10));
    const raw = await page.evaluate(key => localStorage.getItem(key), key);
    const camera = await scene.getAttribute('data-view-revision');
    const counts = await scene.evaluate(element => ['node', 'edge', 'orbit'].map(name => element.getAttribute(`data-${name}-count`)));
    const canvas = scene.locator('canvas');
    await canvas.evaluate(element => element.setAttribute('data-original-mixed-sparks-canvas', 'true'));

    await openGraphPanel(page, 'view');
    await dots.press('Home'); await lines.press('Home');
    await expect(scene).toHaveAttribute('data-spark-count', '0');
    await expect(scene).toHaveAttribute('data-spark-line-count', '0');
    const none = await capture(page, scene);
    await openGraphPanel(page, 'view');
    await lines.press('End');
    await expect(scene).toHaveAttribute('data-spark-line-count', String(fullLines));
    await expect(scene).toHaveAttribute('data-spark-count', '0');
    const linesOnly = await capture(page, scene);
    await openGraphPanel(page, 'view');
    await lines.press('Home'); await dots.press('End');
    const dotsOnly = await capture(page, scene);
    await openGraphPanel(page, 'view');
    await lines.press('End');
    await expect(scene).toHaveAttribute('data-spark-count', String(fullDots));
    const mixed = await capture(page, scene);
    expect(changedPixels(none, linesOnly), 'Line percentage must draw actual short streaks').toBeGreaterThan(20);
    expect(changedPixels(none, dotsOnly), 'Existing spark dots must remain visible').toBeGreaterThan(20);
    expect(changedPixels(linesOnly, dotsOnly), 'Lines must not just relabel the existing dot layer').toBeGreaterThan(20);
    expect(changedPixels(mixed, dotsOnly), 'Mixed mode retains visible line contributions').toBeGreaterThan(20);
    expect(changedPixels(mixed, linesOnly), 'Mixed mode retains visible dot contributions').toBeGreaterThan(20);

    await setGraphCheckbox(page, 'Sparks', false);
    await expect(dots).toBeDisabled(); await expect(lines).toBeDisabled();
    expect(changedPixels(none, await capture(page, scene)), 'The Sparks master must hide both layers only').toBe(0);
    await expect(graphCheckbox(page, 'Rings')).toBeChecked();
    await setGraphCheckbox(page, 'Sparks', true);
    await expect(dots).toHaveValue('100'); await expect(lines).toHaveValue('100');
    await openGraphPanel(page, 'view');
    for (let step = 0; step < 5; step++) await lines.press('ArrowLeft');
    await dots.press('Home');
    for (let step = 0; step < 5; step++) await dots.press('ArrowRight');
    await expect(lines).toHaveValue('75'); await expect(dots).toHaveValue('25');
    await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 1000 });
    await expect(scene).toHaveAttribute('data-spark-line-count', String((width === 1440 ? 300 : 600) * .75));
    await expect(scene).toHaveAttribute('data-spark-count', String((width === 1440 ? 900 : 1800) * .25));
    await expect(scene).toHaveAttribute('data-spark-line-density', '75');
    await expect(scene).toHaveAttribute('data-spark-density', '25');
    await expect(canvas).toHaveAttribute('data-original-mixed-sparks-canvas', 'true');
    await expect(scene).toHaveAttribute('data-view-revision', camera!);
    expect(await scene.evaluate(element => ['node', 'edge', 'orbit'].map(name => element.getAttribute(`data-${name}-count`)))).toEqual(counts);
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const [name, body] of Object.entries({ none, linesOnly, dotsOnly, mixed })) {
      await testInfo.attach(name, { body, contentType: 'image/png' });
    }
  });
}
