import { expect, test, type Page } from '@playwright/test';
import { closeGraphPanels, openGraphPanel, searchGraphNodes, setGraphCheckbox, setGraphScope } from './graph-ui';
import { PNG } from './png';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';

async function open(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/home');
  const scene = page.locator('.career-graph-page .career-graph-scene');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  return scene;
}

async function select(page: Page, title: string) {
  await searchGraphNodes(page, title);
  await page.locator('.career-graph-node-list > button').filter({ has: page.getByText(title, { exact: true }) }).click();
  const marker = page.locator('.career-graph-page .career-graph-scene__selected-marker');
  await expect(page.locator('.career-graph-page .career-graph-scene__node-label')).toHaveText(title);
  await expect(marker).toHaveAttribute('data-screen-visible', 'true');
  return {
    x: Number(await marker.getAttribute('data-screen-x')),
    y: Number(await marker.getAttribute('data-screen-y')),
    id: (await marker.getAttribute('data-node-id'))!,
  };
}

async function doubleSpacing(page: Page) {
  await openGraphPanel(page, 'view');
  const slider = page.getByRole('slider', { name: 'Node spacing', exact: true });
  await slider.press('Home');
  for (let step = 0; step < 10; step++) await slider.press('ArrowRight');
  await expect(slider).toHaveValue('200');
}

test('spacing expands real projected node gaps without zooming, preserves picking and exactly restores the original layout', async ({ page }, testInfo) => {
  const scene = await open(page);
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  await setGraphCheckbox(page, 'Sparks', false);
  await setGraphCheckbox(page, 'Rings', false);
  const canvas = scene.locator('canvas');
  await canvas.evaluate(element => element.setAttribute('data-spacing-original', 'true'));
  const first = await select(page, 'HashMap Fundamentals');
  const second = await select(page, 'Seen Before');
  const revision = await scene.getAttribute('data-view-revision');
  const radius = Number(await scene.getAttribute('data-orbit-data-radius'));
  const counts = await scene.evaluate(element => [element.dataset.nodeCount, element.dataset.edgeCount, element.dataset.orbitCount]);
  const core = await scene.evaluate(element => [element.dataset.coreScreenX, element.dataset.coreScreenY]);
  const before = await canvas.screenshot();
  await openGraphPanel(page, 'view');
  const slider = page.getByRole('slider', { name: 'Node spacing', exact: true });
  await expect(slider).toHaveValue('100');
  for (let step = 0; step < 5; step++) await slider.press('ArrowRight');
  await expect(slider).toHaveValue('150');
  await expect(slider).toHaveAttribute('aria-valuetext', '1.5 times original distance');
  await expect.poll(async () => Number(await scene.getAttribute('data-orbit-data-radius'))).toBeCloseTo(radius * 1.5, 5);
  const widerFirst = await select(page, 'HashMap Fundamentals');
  const widerSecond = await select(page, 'Seen Before');
  const gap = Math.hypot(first.x - second.x, first.y - second.y);
  const widerGap = Math.hypot(widerFirst.x - widerSecond.x, widerFirst.y - widerSecond.y);
  expect(widerGap, 'Rendered nodes must become farther apart, not just the slider value').toBeGreaterThan(gap * 1.35);
  await expect(scene).toHaveAttribute('data-view-revision', revision!);
  expect(await scene.evaluate(element => [element.dataset.coreScreenX, element.dataset.coreScreenY])).toEqual(core);
  expect(await scene.evaluate(element => [element.dataset.nodeCount, element.dataset.edgeCount, element.dataset.orbitCount])).toEqual(counts);
  await expect(scene).toHaveAttribute('data-orbit-pulse-count', '0');
  const expanded = await canvas.screenshot();
  const a = PNG.sync.read(before), b = PNG.sync.read(expanded);
  let changed = 0;
  for (let index = 0; index < a.data.length; index += 4) {
    if (Math.abs(a.data[index] - b.data[index]) + Math.abs(a.data[index + 1] - b.data[index + 1])
      + Math.abs(a.data[index + 2] - b.data[index + 2]) > 20) changed++;
  }
  expect(changed).toBeGreaterThan(1000);
  await openGraphPanel(page, 'view');
  await slider.press('Home');
  await expect.poll(async () => Number(await scene.getAttribute('data-orbit-data-radius'))).toBeCloseTo(radius, 5);
  expect(await select(page, 'HashMap Fundamentals')).toEqual(first);
  expect(await select(page, 'Seen Before')).toEqual(second);
  await expect(canvas).toHaveAttribute('data-spacing-original', 'true');
  await doubleSpacing(page);
  await closeGraphPanels(page);
  await page.getByRole('button', { name: 'Frame all', exact: true }).click();
  await page.getByRole('button', { name: 'Focus node', exact: true }).click();
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error('Expected the actual expanded node canvas.');
  const marker = scene.locator('.career-graph-scene__selected-marker');
  await expect.poll(async () => Number(await marker.getAttribute('data-screen-x'))).toBeCloseTo(bounds.width / 2, 0);
  await page.getByRole('button', { name: 'Close node details', exact: true }).click();
  await canvas.click({ position: { x: bounds.width / 2, y: bounds.height / 2 } });
  await expect(canvas).toHaveAttribute('data-selected-node-id', second.id);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
  await testInfo.attach('original-spacing', { body: before, contentType: 'image/png' });
  await testInfo.attach('expanded-spacing', { body: expanded, contentType: 'image/png' });
});

for (const viewport of [{ width: 320, height: 568 }, { width: 568, height: 320 }]) {
  test(`spacing stays usable in fullscreen and through filters at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    const scene = await open(page);
    const raw = await page.evaluate(key => localStorage.getItem(key), key);
    await page.getByRole('button', { name: 'Full screen', exact: true }).click();
    await openGraphPanel(page, 'view');
    const slider = page.getByRole('slider', { name: 'Node spacing', exact: true });
    await slider.press('End');
    await expect(slider).toHaveValue('300');
    await expect(slider).toBeInViewport();
    await setGraphCheckbox(page, 'Checkpoints', false);
    await setGraphScope(page, 'pattern');
    await openGraphPanel(page, 'view');
    await expect(slider).toHaveValue('300');
    await closeGraphPanels(page);
    await page.getByRole('button', { name: 'Frame all', exact: true }).click();
    await expect(scene).toHaveAttribute('data-scene-state', 'ready');
    await openGraphPanel(page, 'view');
    await slider.scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath('node-spacing-control.png') });
    await slider.press('Home');
    await expect(slider).toHaveValue('100');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
  });
}

test('spacing survives real recorded work without compounding the expansion or changing focus-room defaults', async ({ page }) => {
  const scene = await open(page);
  await doubleSpacing(page);
  await closeGraphPanels(page);
  await page.getByRole('button', { name: 'Frame all', exact: true }).click();
  const first = await select(page, 'HashMap Fundamentals');
  await openGraphPanel(page, 'rings');
  await page.locator('.career-orbit-list > button[data-orbit-id="orbit:mission:pattern"]').click();
  await page.getByRole('complementary', { name: 'Selected career orbit', exact: true }).getByRole('button', { name: 'Record evidence', exact: true }).click();
  const form = page.getByRole('dialog', { name: 'Record progress', exact: true });
  await form.getByLabel('Artifact title').fill('Synthetic spaced-graph work');
  await form.getByLabel('What did you practice?').fill('A fictional unfinished exercise while using wider graph spacing.');
  await form.getByRole('button', { name: 'Save evidence', exact: true }).click();
  await expect(page.locator('.career-graph-page')).toHaveAttribute('data-node-spacing', '200');
  expect(await select(page, 'HashMap Fundamentals')).toEqual(first);
  await expect(scene).toHaveAttribute('data-orbit-pulse-count', '0');
  const unexpandedRadius = Number(await scene.getAttribute('data-orbit-data-radius')) / 2;
  const saved = await page.evaluate(key => localStorage.getItem(key), key);
  await page.goto('./#/plan');
  await page.locator('[data-tour="focus-room-open"]').click();
  const focus = page.locator('.focus-room .career-graph-scene');
  await expect(focus).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  expect(Number(await focus.getAttribute('data-orbit-data-radius'))).toBeCloseTo(unexpandedRadius, 5);
  await page.goto('./#/home');
  await expect(page.locator('.career-graph-page')).toHaveAttribute('data-node-spacing', '100');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(saved);
  expect(JSON.parse(saved!).evidence).toHaveLength(1);
  expect(JSON.parse(saved!).missions.pattern.completedCheckpointIds).toEqual([]);
});
