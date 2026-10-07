import { expect, test, type Locator, type Page } from '@playwright/test';
import { PNG } from './png';
import { closeGraphPanels, graphCheckbox, openGraphPanel, setGraphCheckbox } from './graph-ui';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';

async function capture(page: Page, canvas: Locator, scene: Locator) {
  await closeGraphPanels(page);
  await canvas.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  await expect.poll(async () => Number(await scene.getAttribute('data-cursor-strength'))).toBe(0);
  return canvas.screenshot();
}

for (const width of [1440, 320]) {
  test(`spark amount is adjustable and defaults to ten percent at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./#/home');
    const scene = page.locator('.career-graph-scene');
    await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
    const slider = page.getByRole('slider', { name: 'Spark dots', exact: true, includeHidden: true });
    const full = width === 1440 ? 1800 : 900;
    await expect(slider).toHaveAttribute('min', '0');
    await expect(slider).toHaveAttribute('max', '100');
    await expect(slider).toHaveValue('10');
    await expect(scene).toHaveAttribute('data-spark-density', '10');
    await expect(scene).toHaveAttribute('data-spark-count', String(full / 10));
    const raw = await page.evaluate(key => localStorage.getItem(key), key);
    const counts = await scene.evaluate(element => [element.getAttribute('data-node-count'), element.getAttribute('data-edge-count'), element.getAttribute('data-orbit-count')]);
    const canvas = scene.locator('canvas');
    await canvas.evaluate(element => element.setAttribute('data-spark-density-canvas', 'original'));
    await page.getByRole('button', { name: 'Zoom career graph in', exact: true }).click();
    await expect.poll(async () => Number(await scene.getAttribute('data-cursor-offset'))).toBeLessThan(56);
    const zoom = await scene.getAttribute('data-cursor-offset');
    await openGraphPanel(page, 'view');
    await slider.press('Home');
    await expect(slider).toHaveValue('0');
    await expect(scene).toHaveAttribute('data-spark-count', '0');
    const none = await capture(page, canvas, scene);
    await openGraphPanel(page, 'view');
    await slider.press('End');
    await expect(slider).toHaveValue('100');
    await expect(scene).toHaveAttribute('data-spark-count', String(full));
    const maximum = await capture(page, canvas, scene);
    const a = PNG.sync.read(none), b = PNG.sync.read(maximum);
    expect([b.width, b.height]).toEqual([a.width, a.height]);
    let changed = 0;
    for (let index = 0; index < a.data.length; index += 4) {
      if (Math.abs(a.data[index] - b.data[index]) + Math.abs(a.data[index + 1] - b.data[index + 1]) + Math.abs(a.data[index + 2] - b.data[index + 2]) > 12) changed++;
    }
    expect(changed, 'The slider must change actual spark pixels, not just its label').toBeGreaterThan(20);
    await openGraphPanel(page, 'view');
    for (let step = 0; step < 5; step++) await slider.press('ArrowLeft');
    await expect(slider).toHaveValue('75');
    await expect(scene).toHaveAttribute('data-spark-count', String(full * .75));
    await setGraphCheckbox(page, 'Sparks', false);
    await expect(slider).toBeDisabled();
    await expect(slider).toHaveValue('75');
    await expect(scene).toHaveAttribute('data-sparks-visible', 'false');
    await setGraphCheckbox(page, 'Sparks', true);
    await expect(slider).toBeEnabled();
    await expect(scene).toHaveAttribute('data-spark-density', '75');
    await expect(scene).toHaveAttribute('data-spark-count', String(full * .75));
    await expect(scene).toHaveAttribute('data-cursor-offset', zoom!);
    await expect(graphCheckbox(page, 'Rings')).toBeChecked();
    await page.setViewportSize({ width: width === 1440 ? 390 : 1440, height: 1000 });
    await expect(scene).toHaveAttribute('data-spark-count', String((width === 1440 ? 900 : 1800) * .75));
    await expect(slider).toHaveValue('75');
    await expect(canvas).toHaveAttribute('data-spark-density-canvas', 'original');
    expect(await scene.evaluate(element => [element.getAttribute('data-node-count'), element.getAttribute('data-edge-count'), element.getAttribute('data-orbit-count')])).toEqual(counts);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
    await testInfo.attach('zero-sparks', { body: none, contentType: 'image/png' });
    await testInfo.attach('full-sparks', { body: maximum, contentType: 'image/png' });
    await openGraphPanel(page, 'view');
    await page.screenshot({ path: testInfo.outputPath('spark-slider.png') });
  });

  test(`focus ambience also starts at ten percent of its spark budget at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./#/plan');
    const raw = await page.evaluate(key => localStorage.getItem(key), key);
    await page.locator('[data-tour="focus-room-open"]').click();
    const scene = page.locator('.focus-room .career-graph-scene');
    await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
    await expect(scene).toHaveAttribute('data-spark-density', '10');
    await expect(scene).toHaveAttribute('data-spark-count', width === 1440 ? '30' : '18');
    await expect(scene).toHaveAttribute('data-spark-line-density', '10');
    await expect(scene).toHaveAttribute('data-spark-line-count', width === 1440 ? '12' : '7');
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
  });
}
