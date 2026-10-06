import { expect, test, type Page } from '@playwright/test';
import { openGraphPanel, searchGraphNodes } from './graph-ui';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });

async function open(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/home');
  const scene = page.locator('.career-graph-scene');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  return scene;
}

test('the count-adjacent Labels checkbox hides all graph text tags without hiding work or breaking inspection', async ({ page }, testInfo) => {
  const scene = await open(page);
  const raw = await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'));
  const checkbox = page.getByRole('checkbox', { name: 'Node labels', exact: true });
  await expect(checkbox).toBeChecked();
  expect(await checkbox.evaluate(element => !!element.closest('.career-graph-commandbar'))).toBe(true);
  await searchGraphNodes(page, 'HashMap Fundamentals');
  await page.locator('.career-graph-node-list > button').click();
  const inspector = page.getByRole('complementary', { name: 'Selected career node', exact: true });
  await expect(inspector).toBeVisible();
  const label = scene.locator('.career-graph-scene__node-label');
  await expect(label).toBeVisible();
  const canvas = scene.locator('canvas');
  await canvas.evaluate(element => element.setAttribute('data-label-canvas', 'original'));
  const bounds = await canvas.boundingBox();
  const values = await scene.evaluate(element => [element.dataset.nodeCount, element.dataset.edgeCount, element.dataset.orbitCount, element.dataset.viewRevision]);
  const marker = scene.locator('.career-graph-scene__selected-marker');
  const id = await canvas.getAttribute('data-selected-node-id');
  const point = await marker.evaluate(element => [element.dataset.screenX, element.dataset.screenY]);
  await checkbox.uncheck();
  await expect(page.locator('.career-graph-page')).toHaveAttribute('data-node-labels', 'false');
  for (const selector of ['.career-graph-scene__mission-labels', '.career-graph-scene__orbit-labels', '.career-graph-scene__node-label']) {
    await expect(scene.locator(selector)).toBeHidden();
  }
  await expect(inspector).toBeVisible();
  await expect(canvas).toHaveAttribute('data-selected-node-id', id!);
  expect(await marker.evaluate(element => [element.dataset.screenX, element.dataset.screenY])).toEqual(point);
  expect(await scene.evaluate(element => [element.dataset.nodeCount, element.dataset.edgeCount, element.dataset.orbitCount, element.dataset.viewRevision])).toEqual(values);
  expect(await canvas.boundingBox()).toEqual(bounds);
  await page.screenshot({ path: testInfo.outputPath('labels-disabled.png') });
  await page.getByRole('button', { name: 'Focus node', exact: true }).click();
  const focused = await canvas.boundingBox();
  if (!focused) throw new Error('Expected the same focusable graph canvas.');
  await expect.poll(async () => Number(await marker.getAttribute('data-screen-x'))).toBeCloseTo(focused.width / 2, 0);
  await page.getByRole('button', { name: 'Close node details', exact: true }).click();
  await canvas.click({ position: { x: focused.width / 2, y: focused.height / 2 } });
  await expect(canvas).toHaveAttribute('data-selected-node-id', id!);
  await expect(label).toBeHidden();
  await checkbox.check();
  await expect(label).toBeVisible();
  await expect(canvas).toHaveAttribute('data-label-canvas', 'original');
  expect(await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'))).toBe(raw);
});

for (const viewport of [{ width: 320, height: 568 }, { width: 568, height: 320 }]) {
  test(`Labels remains reachable beside counts in fullscreen at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await open(page);
    const raw = await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'));
    const checkbox = page.getByRole('checkbox', { name: 'Node labels', exact: true });
    await expect(checkbox).toBeInViewport({ ratio: 1 });
    await checkbox.uncheck();
    await page.getByRole('button', { name: 'Full screen', exact: true }).click();
    await expect(checkbox).toBeInViewport({ ratio: 1 });
    await expect(checkbox).not.toBeChecked();
    await openGraphPanel(page, 'rings');
    await page.locator('.career-orbit-list > button[data-orbit-id="orbit:mission:pattern"]').click();
    await expect(page.getByRole('complementary', { name: 'Selected career orbit', exact: true })).toBeVisible();
    await expect(page.locator('.career-graph-scene__node-label')).toBeHidden();
    await checkbox.check();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'))).toBe(raw);
  });
}
