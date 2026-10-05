import { expect, test, type Locator, type Page } from '@playwright/test';
import { PNG } from './png';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';
const dsa = 'orbit:mission:pattern';

async function open(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/home');
  const scene = page.locator('.career-graph-scene');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  await page.getByRole('checkbox', { name: 'Sparks', exact: true }).uncheck();
  await page.locator('.career-orbit-index > summary').click();
  return scene;
}

async function select(page: Page, id: string) {
  await page.locator(`.career-orbit-list > button[data-orbit-id="${id}"]`).click();
  const inspector = page.getByRole('complementary', { name: 'Selected career orbit', exact: true });
  await expect(inspector).toHaveAttribute('data-orbit-id', id);
  return inspector;
}

async function capture(page: Page, scene: Locator) {
  const canvas = scene.locator('canvas');
  await canvas.scrollIntoViewIfNeeded();
  await page.mouse.move(1, 1);
  await expect.poll(async () => Number(await scene.getAttribute('data-cursor-strength'))).toBe(0);
  return canvas.screenshot({
    style: '.career-graph-inspector, .career-graph-scene__node-label, .career-graph-scene__orbit-label { visibility: hidden !important; }',
  });
}

function greenGains(before: Buffer, after: Buffer) {
  const a = PNG.sync.read(before), b = PNG.sync.read(after);
  expect([b.width, b.height]).toEqual([a.width, a.height]);
  const quadrants = [0, 0, 0, 0];
  for (let y = 0; y < a.height; y++) for (let x = 0; x < a.width; x++) {
    const index = (y * a.width + x) * 4;
    if (b.data[index + 1] > a.data[index + 1] + 35
      && b.data[index + 1] > b.data[index] + 15
      && b.data[index + 1] > b.data[index + 2] + 15) {
      quadrants[Number(x >= a.width / 2) + 2 * Number(y >= a.height / 2)]++;
    }
  }
  return quadrants;
}

test('selecting a card or stage visibly lights the whole ring without moving the camera or work', async ({ page }, testInfo) => {
  const scene = await open(page);
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  const nodes = await scene.getAttribute('data-node-count'), edges = await scene.getAttribute('data-edge-count');
  const view = await scene.getAttribute('data-view-revision');
  const canvas = scene.locator('canvas');
  await canvas.evaluate(element => element.setAttribute('data-highlight-original-canvas', 'true'));
  const before = await capture(page, scene);
  const inspector = await select(page, dsa);
  await expect(scene).toHaveAttribute('data-highlighted-orbit-id', dsa);
  await expect(scene).toHaveAttribute('data-orbit-highlight-visible', 'true');
  const wholeTethers = Number(await scene.getAttribute('data-orbit-tether-count'));
  const whole = await capture(page, scene);
  const wholeGain = greenGains(before, whole);
  expect(wholeGain.every(count => count > 80), `Full ring glow should reach all four quadrants: ${wholeGain}`).toBe(true);
  expect(wholeGain.reduce((sum, count) => sum + count, 0)).toBeGreaterThan(1000);
  const picker = inspector.getByRole('combobox', { name: 'Orbit stage or record group' });
  const stage = await picker.locator('option').nth(1).getAttribute('value');
  await picker.selectOption(stage!);
  await expect(scene).toHaveAttribute('data-selected-orbit-segment-id', stage!);
  await expect(scene).toHaveAttribute('data-highlighted-orbit-id', dsa);
  await expect.poll(async () => Number(await scene.getAttribute('data-orbit-tether-count'))).toBeLessThan(wholeTethers);
  const stageFrame = await capture(page, scene);
  const stageGain = greenGains(before, stageFrame);
  expect(stageGain.every(count => count > 80), `Stage selection must not reduce glow to one arc: ${stageGain}`).toBe(true);
  await expect(scene).toHaveAttribute('data-animation-state', 'paused');
  await expect(scene).toHaveAttribute('data-view-revision', view!);
  await expect(scene).toHaveAttribute('data-node-count', nodes!);
  await expect(scene).toHaveAttribute('data-edge-count', edges!);
  await expect(canvas).toHaveAttribute('data-highlight-original-canvas', 'true');
  await page.screenshot({ path: testInfo.outputPath('whole-ring-selection.png') });
  await testInfo.attach('before-selection', { body: before, contentType: 'image/png' });
  await testInfo.attach('whole-ring-glow', { body: whole, contentType: 'image/png' });
  await testInfo.attach('whole-ring-with-stage', { body: stageFrame, contentType: 'image/png' });
  await inspector.getByRole('button', { name: 'Close orbit details', exact: true }).click();
  await expect(scene).toHaveAttribute('data-highlighted-orbit-id', '');
  await expect(scene).toHaveAttribute('data-orbit-highlight-visible', 'false');
  const cleared = PNG.sync.read(await capture(page, scene));
  expect(cleared.data.equals(PNG.sync.read(before).data)).toBe(true);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('switching cards, Clear center, ring hiding and node inspection cleanly control selection glow', async ({ page }) => {
  const scene = await open(page);
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  await select(page, dsa);
  await expect(scene).toHaveAttribute('data-highlighted-orbit-id', dsa);
  const inactive = 'orbit:mission:fabric';
  const inspector = await select(page, inactive);
  await expect(scene).toHaveAttribute('data-highlighted-orbit-id', inactive);
  await expect(scene).toHaveAttribute('data-orbit-highlight-visible', 'true');
  await page.getByLabel('Filter career graph by mission').selectOption('fabric');
  await expect(scene).toHaveAttribute('data-orbit-count', '7');
  await capture(page, scene);
  const marker = scene.locator(`.career-graph-scene__orbit-diagnostic[data-orbit-id="${inactive}"]`);
  await expect(marker).toHaveAttribute('data-mission-mode', 'background');
  await expect(marker).toHaveAttribute('data-orbit-revolving', 'false');
  const point = await marker.evaluate(element => [element.getAttribute('data-world-x'), element.getAttribute('data-world-y'), element.getAttribute('data-world-z')]);
  await page.getByRole('button', { name: 'Clear center', exact: true }).click();
  await expect(scene).toHaveAttribute('data-decoration-mode', 'outer-rim-only');
  await page.getByRole('checkbox', { name: 'Rings', exact: true }).uncheck();
  await expect(scene).toHaveAttribute('data-orbit-highlight-visible', 'false');
  await expect(inspector).toContainText('Rings are hidden');
  await inspector.getByRole('button', { name: 'Reveal orbit and members', exact: true }).click();
  await expect(scene).toHaveAttribute('data-highlighted-orbit-id', inactive);
  await expect(page.getByRole('checkbox', { name: 'Sparks', exact: true })).not.toBeChecked();
  await expect(scene).toHaveAttribute('data-decoration-mode', 'outer-rim-only');
  await page.getByRole('button', { name: 'Clear center', exact: true }).click();
  await expect(scene).toHaveAttribute('data-orbit-highlight-visible', 'true');
  expect(await marker.evaluate(element => [element.getAttribute('data-world-x'), element.getAttribute('data-world-y'), element.getAttribute('data-world-z')])).toEqual(point);
  await inspector.getByRole('button', { name: /Current checkpoint:/ }).click();
  await expect(scene).toHaveAttribute('data-highlighted-orbit-id', '');
  await expect(scene).toHaveAttribute('data-orbit-highlight-visible', 'false');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});
