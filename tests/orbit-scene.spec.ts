import { expect, test, type Page } from '@playwright/test';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';
const orbitId = 'orbit:mission:pattern';

async function open(page: Page, paused = true) {
  if (paused) await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/home');
  const scene = page.locator('.career-graph-scene');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  await expect(scene).toHaveAttribute('data-orbit-count', '15');
  return scene;
}

async function selectDsa(page: Page) {
  await page.locator('.career-orbit-index > summary').click();
  await page.locator('.career-orbit-list > button').filter({ has: page.getByText('DSA', { exact: true }) }).click();
  const inspector = page.getByRole('complementary', { name: 'Selected career orbit', exact: true });
  await expect(inspector).toHaveAttribute('data-orbit-id', orbitId);
  return inspector;
}

test('real orbit anchors are pickable and stage tethers show actual members without moving the data', async ({ page }, testInfo) => {
  const scene = await open(page);
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  const nodes = await scene.getAttribute('data-node-count');
  const edges = await scene.getAttribute('data-edge-count');
  const baselineTethers = Number(await scene.getAttribute('data-orbit-tether-count'));
  expect(baselineTethers).toBeGreaterThan(0);
  const inspector = await selectDsa(page);
  await expect(scene).toHaveAttribute('data-selected-orbit-id', orbitId);
  await page.getByRole('button', { name: 'Focus ring', exact: true }).click();
  const marker = scene.locator('.career-graph-scene__selected-orbit-marker');
  await expect(marker).toHaveAttribute('data-screen-visible', 'true');
  const viewport = await scene.locator('canvas').boundingBox();
  if (!viewport) throw new Error('Expected visible orbit canvas.');
  await expect.poll(async () => Number(await marker.getAttribute('data-screen-x'))).toBeCloseTo(viewport.width / 2, 0);
  await expect.poll(async () => Number(await marker.getAttribute('data-screen-y'))).toBeCloseTo(viewport.height / 2, 0);
  const point = { x: Number(await marker.getAttribute('data-screen-x')), y: Number(await marker.getAttribute('data-screen-y')) };
  await page.getByRole('button', { name: 'Close orbit details', exact: true }).click();
  const canvas = scene.locator('canvas');
  await canvas.scrollIntoViewIfNeeded();
  await canvas.click({ position: point });
  await expect(scene).toHaveAttribute('data-selected-orbit-id', orbitId);
  await expect(inspector).toBeVisible();
  const select = inspector.getByRole('combobox', { name: 'Orbit stage or record group' });
  const stageId = await select.locator('option').nth(1).getAttribute('value');
  await select.selectOption(stageId!);
  await expect(scene).toHaveAttribute('data-selected-orbit-segment-id', stageId!);
  await expect.poll(async () => Number(await scene.getAttribute('data-orbit-tether-count'))).toBeGreaterThan(baselineTethers);
  await expect(scene).toHaveAttribute('data-node-count', nodes!);
  await expect(scene).toHaveAttribute('data-edge-count', edges!);
  await page.getByRole('button', { name: 'Frame all', exact: true }).click();
  await testInfo.attach('meaningful-orbit-stage', { body: await page.screenshot(), contentType: 'image/png' });
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

for (const viewport of [{ width: 320, height: 568 }, { width: 568, height: 320 }]) {
  test(`fullscreen ring index and inspection stay usable at ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    await open(page);
    await page.getByRole('button', { name: 'Full screen', exact: true }).click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement?.classList.contains('career-graph-stage-wrap'))).toBe(true);
    await page.locator('.career-orbit-index > summary').click();
    const index = page.locator('.career-orbit-index');
    expect((await index.boundingBox())!.height).toBeLessThanOrEqual(viewport.height / 2 + 1);
    expect((await page.locator('.career-graph-stage').boundingBox())!.height).toBeGreaterThanOrEqual(159);
    await page.locator('.career-orbit-list > button').last().click();
    await expect(index).not.toHaveAttribute('open');
    const inspector = page.getByRole('complementary', { name: 'Selected career orbit', exact: true });
    await expect(inspector).toBeVisible();
    await expect(inspector.getByRole('button', { name: 'Close orbit details', exact: true })).toBeInViewport({ ratio: 1 });
    expect((await page.locator('.career-graph-stage').boundingBox())!.height).toBeGreaterThanOrEqual(159);
    await testInfo.attach('compact-fullscreen-orbit', { body: await page.screenshot(), contentType: 'image/png' });
    await inspector.getByRole('button', { name: 'Close orbit details', exact: true }).click();
    await page.locator('.career-orbit-index > summary').click();
    await page.locator('.career-orbit-list > button').filter({ has: page.getByText('DSA', { exact: true }) }).click();
    await inspector.locator('.career-orbit-current').click();
    const nodeInspector = page.getByRole('complementary', { name: 'Selected career node', exact: true });
    await expect(nodeInspector.getByRole('button', { name: 'Close node details', exact: true })).toBeInViewport({ ratio: 1 });
    await nodeInspector.getByRole('button', { name: 'Close node details', exact: true }).click();
    await page.getByRole('button', { name: 'Exit full screen', exact: true }).click();
    await expect.poll(() => page.evaluate(() => document.fullscreenElement === null)).toBe(true);
  });
}

test('orbit anchors keep revolving with attached tethers until animation is explicitly paused', async ({ page }) => {
  const scene = await open(page, false);
  await page.getByRole('checkbox', { name: 'Auto-rotate', exact: true }).uncheck();
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  await selectDsa(page);
  await expect(scene).toHaveAttribute('data-animation-state', 'running');
  const marker = scene.locator('.career-graph-scene__selected-orbit-marker');
  await expect(marker).toHaveAttribute('data-screen-visible', 'true');
  const start = await marker.getAttribute('data-screen-x');
  const tethers = await scene.getAttribute('data-orbit-tether-count');
  await expect.poll(() => marker.getAttribute('data-screen-x')).not.toBe(start);
  await expect(scene).toHaveAttribute('data-orbit-tether-count', tethers!);
  await page.getByRole('button', { name: 'Pause animation', exact: true }).click();
  await expect(scene).toHaveAttribute('data-animation-state', 'paused');
  const stopped = await marker.getAttribute('data-screen-x');
  await page.waitForTimeout(250);
  await expect(marker).toHaveAttribute('data-screen-x', stopped!);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('ring visibility, mission scope and Clear center retain data identities and inspection', async ({ page }) => {
  const scene = await open(page);
  const raw = await page.evaluate(key => localStorage.getItem(key), key);
  await page.getByLabel('Filter career graph by mission').selectOption('pattern');
  await expect(scene).toHaveAttribute('data-orbit-count', '7');
  const inspector = await selectDsa(page);
  await page.getByRole('button', { name: 'Clear center', exact: true }).click();
  await expect(scene).toHaveAttribute('data-decoration-mode', 'outer-rim-only');
  await expect(scene.locator('.career-graph-scene__selected-orbit-marker')).toHaveAttribute('data-screen-visible', 'true');
  const nodes = await scene.getAttribute('data-node-count');
  const edges = await scene.getAttribute('data-edge-count');
  await page.getByRole('checkbox', { name: 'Rings & sparks', exact: true }).uncheck();
  await expect(scene).toHaveAttribute('data-decoration-visible', 'false');
  await expect(inspector).toContainText('Rings are hidden');
  await expect(page.getByRole('button', { name: 'Focus ring', exact: true })).toBeDisabled();
  await expect(scene).toHaveAttribute('data-node-count', nodes!);
  await expect(scene).toHaveAttribute('data-edge-count', edges!);
  await inspector.getByRole('button', { name: 'Reveal orbit and members', exact: true }).click();
  await expect(scene).toHaveAttribute('data-decoration-visible', 'true');
  await expect(scene).toHaveAttribute('data-selected-orbit-id', orbitId);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('recording through a mission orbit uses the existing criteria form and updates the same scene', async ({ page }) => {
  const scene = await open(page, false);
  await page.getByRole('checkbox', { name: 'Auto-rotate', exact: true }).uncheck();
  const inspector = await selectDsa(page);
  const canvas = scene.locator('canvas');
  await canvas.evaluate(element => element.setAttribute('data-orbit-completion-canvas', 'original'));
  await expect(scene).toHaveAttribute('data-orbit-pulse-count', '0');
  await page.getByRole('button', { name: 'Full screen', exact: true }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement?.classList.contains('career-graph-stage-wrap'))).toBe(true);
  await page.evaluate(() => {
    const scene = document.querySelector('.career-graph-scene')!;
    const observer = new MutationObserver(() => {
      if (Number(scene.getAttribute('data-orbit-pulse-count')) > 0) {
        document.documentElement.dataset.recordedOrbitPulse = 'true';
        observer.disconnect();
      }
    });
    observer.observe(scene, { attributes: true, attributeFilter: ['data-orbit-pulse-count'] });
  });
  await inspector.getByRole('button', { name: 'Record evidence', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Record progress', exact: true });
  await dialog.getByLabel('Artifact title').fill('Synthetic orbit completion');
  await dialog.getByLabel('What did you practice?').fill('A synthetic checked implementation and explicit confirmation of each existing checkpoint criterion.');
  await dialog.getByRole('checkbox', { name: /This checkpoint is complete/ }).check();
  for (const box of await dialog.locator('fieldset input[type="checkbox"]').all()) await box.check();
  await dialog.getByRole('button', { name: 'Complete & unlock next', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page).toHaveURL(/#\/home$/);
  await expect(canvas).toHaveAttribute('data-orbit-completion-canvas', 'original');
  await expect.poll(() => page.evaluate(() => document.fullscreenElement?.classList.contains('career-graph-stage-wrap'))).toBe(true);
  await expect(inspector.getByRole('progressbar')).toHaveAttribute('value', '1');
  await expect(page.locator('html')).toHaveAttribute('data-recorded-orbit-pulse', 'true');
  const state = JSON.parse((await page.evaluate(key => localStorage.getItem(key), key))!);
  expect(state.evidence).toHaveLength(1);
  expect(state.missions.pattern.completedCheckpointIds).toEqual(['pattern-v2-fundamentals']);
  await page.getByRole('button', { name: 'Pause animation', exact: true }).click();
  await expect(scene).toHaveAttribute('data-orbit-pulse-count', '0');
});
