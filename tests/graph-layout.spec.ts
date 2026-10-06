import { expect, test, type Page } from '@playwright/test';
import { closeGraphPanels, graphCheckbox, openGraphPanel, type GraphPanel } from './graph-ui';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';

async function open(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/home');
  const scene = page.locator('.career-graph-scene');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  await expect.poll(async () => Number(await scene.getAttribute('data-view-revision'))).toBeGreaterThan(0);
  return scene;
}

for (const viewport of [
  { width: 1440, height: 1000, minimum: .75 },
  { width: 390, height: 844, minimum: .65 },
  { width: 320, height: 568, minimum: .65 },
  { width: 568, height: 320, minimum: .5 },
]) {
  test(`the initial graph is genuinely visible and uncluttered at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    const scene = await open(page);
    const bounds = await scene.locator('canvas').boundingBox();
    if (!bounds) throw new Error('Expected a real initial graph viewport.');
    expect(await page.evaluate(() => scrollY)).toBe(0);
    const visibleHeight = Math.max(0, Math.min(bounds.y + bounds.height, viewport.height) - Math.max(0, bounds.y));
    expect(visibleHeight / viewport.height).toBeGreaterThanOrEqual(viewport.minimum);
    expect(bounds.y).toBeGreaterThanOrEqual(0);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(viewport.height + 1);
    await expect(page.locator('[data-graph-panel][data-open="true"]')).toHaveCount(0);
    await expect(page.locator('.career-graph-page').getByRole('checkbox')).toHaveCount(1);
    await expect(page.getByRole('checkbox', { name: 'Node labels', exact: true })).toBeInViewport({ ratio: 1 });
    for (const name of ['View options', 'Explore ring views', 'Choose visible nodes and rings', 'Find work',
      'Frame all', 'Zoom career graph in', 'Zoom career graph out', 'Resume animation', 'Full screen']) {
      await expect(page.getByRole('button', { name, exact: true })).toBeInViewport({ ratio: 1 });
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath('canvas-first-graph.png') });
  });
}

for (const width of [1440, 320]) {
  test(`panels do not shrink or move the graph and remain recoverable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    const scene = await open(page);
    const raw = await page.evaluate(key => localStorage.getItem(key), key);
    const canvas = scene.locator('canvas');
    const before = await canvas.boundingBox();
    const revision = await scene.getAttribute('data-view-revision');
    await canvas.evaluate(element => element.setAttribute('data-layout-original-canvas', 'true'));
    for (const panel of ['view', 'rings', 'visibility', 'work'] as const) {
      await openGraphPanel(page, panel);
      await expect(page.locator('[data-graph-panel][data-open="true"]')).toHaveCount(1);
      const drawer = page.locator(`[data-graph-panel="${panel}"]`);
      await expect(drawer).toBeVisible();
      const box = (await drawer.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.y + box.height).toBeLessThanOrEqual(845);
      expect(await canvas.boundingBox()).toEqual(before);
      await expect(scene).toHaveAttribute('data-view-revision', revision!);
    }
    await page.getByLabel('Search career graph nodes', { exact: true }).fill('HashMap');
    await openGraphPanel(page, 'view');
    await graphCheckbox(page, 'Rings').uncheck();
    await openGraphPanel(page, 'work');
    await expect(page.getByLabel('Search career graph nodes', { exact: true })).toHaveValue('HashMap');
    const first = page.locator('.career-graph-node-list > button').first();
    const title = await first.locator('strong').innerText();
    await first.click();
    await expect(page.locator('[data-graph-panel][data-open="true"]')).toHaveCount(0);
    const inspector = page.getByRole('complementary', { name: 'Selected career node', exact: true });
    await expect(inspector.getByRole('heading', { level: 2 })).toHaveText(title);
    await expect(inspector).toBeFocused();
    expect(await canvas.boundingBox()).toEqual(before);
    expect(await page.evaluate(() => scrollY)).toBe(0);
    await openGraphPanel(page, 'view');
    await expect(inspector).toBeHidden();
    await expect(graphCheckbox(page, 'Rings')).not.toBeChecked();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-graph-panel][data-open="true"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'View options', exact: true })).toBeFocused();
    await expect(inspector).toBeVisible();
    await expect(canvas).toHaveAttribute('data-layout-original-canvas', 'true');
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
    await page.screenshot({ path: testInfo.outputPath('retained-inspection.png') });
  });
}

test('fullscreen preserves every panel and leaves room for the real graph', async ({ page }) => {
  await page.setViewportSize({ width: 568, height: 320 });
  const scene = await open(page);
  await page.getByRole('button', { name: 'Full screen', exact: true }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement?.classList.contains('career-graph-stage-wrap'))).toBe(true);
  const before = await scene.locator('canvas').boundingBox();
  expect(before!.height).toBeGreaterThanOrEqual(240);
  for (const panel of ['view', 'rings', 'visibility', 'work'] as GraphPanel[]) {
    await openGraphPanel(page, panel);
    const drawer = page.locator(`[data-graph-panel="${panel}"]`);
    await expect(drawer).toBeVisible();
    const box = (await drawer.boundingBox())!;
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.y + box.height).toBeLessThanOrEqual(321);
    expect(await scene.locator('canvas').boundingBox()).toEqual(before);
    await closeGraphPanels(page);
  }
  await page.getByRole('button', { name: 'Exit full screen', exact: true }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement === null)).toBe(true);
});

test('printing retains the filtered named work list instead of producing a blank canvas page', async ({ page }) => {
  await open(page);
  await openGraphPanel(page, 'work');
  await page.getByLabel('Search career graph nodes', { exact: true }).fill('HashMap');
  const entries = page.locator('.career-graph-node-list > button');
  const count = await entries.count();
  expect(count).toBeGreaterThan(0);
  await closeGraphPanels(page);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('[data-graph-panel="work"]')).toBeVisible();
  await expect(entries).toHaveCount(count);
  await expect(entries.first()).toBeVisible();
  await expect(page.locator('.career-graph-scene')).toBeHidden();
});
