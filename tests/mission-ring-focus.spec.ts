import { expect, test, type Locator, type Page } from '@playwright/test';
import { createInitialState, parseState } from '../src/domain/engine';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';
const orbitId = (mission: string) => `orbit:mission:${mission}`;
const diagnostic = (scene: Locator, id: string) =>
  scene.locator(`.career-graph-scene__orbit-diagnostic[data-orbit-id="${id}"]`);

async function point(marker: Locator) {
  return marker.evaluate(element => ['x', 'y', 'z'].map(axis => Number(element.getAttribute(`data-world-${axis}`) ?? NaN)));
}

async function open(page: Page, profile: 'main' | 'focus') {
  const state = createInitialState(false);
  state.missions.algorithm = createInitialState(false, '2.0.0').missions.algorithm;
  state.focusMissionId = 'fabric';
  await page.addInitScript(({ key, raw }) => {
    localStorage.setItem(key, raw);
    Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, get: () => false });
  }, { key, raw: JSON.stringify(parseState(state)) });
  await page.clock.install({ time: new Date('2026-10-06T00:00:00Z') });
  await page.clock.pauseAt(new Date('2026-10-06T00:01:00Z'));
  await page.goto(`./#/${profile === 'main' ? 'home' : 'plan'}`);
  if (profile === 'focus') await page.locator('[data-tour="focus-room-open"]').click();
  await expect.poll(async () => {
    await page.clock.runFor(100);
    return page.evaluate(() => document.querySelector('.career-graph-scene')?.getAttribute('data-scene-state') ?? 'loading');
  }, { timeout: 20_000 }).toBe('ready');
  return page.locator('.career-graph-scene');
}

for (const profile of ['main', 'focus'] as const) {
  test(`${profile}: active rings revolve while smaller gray mission rings stay fixed through the heartbeat`, async ({ page }, testInfo) => {
    const scene = await open(page, profile);
    await expect(scene).toHaveAttribute('data-camera-rotation-speed', profile === 'focus' ? '0.24' : '0.3');
    await expect(scene).toHaveAttribute('data-rings-visible', 'true');
    await expect(scene).toHaveAttribute('data-sparks-visible', 'true');
    const raw = await page.evaluate(key => localStorage.getItem(key), key);
    const counts = await scene.evaluate(element => [element.getAttribute('data-node-count'), element.getAttribute('data-edge-count')]);
    const active = diagnostic(scene, orbitId('pattern'));
    const background = diagnostic(scene, orbitId('fabric'));
    const planned = diagnostic(scene, orbitId('algorithm'));
    const collection = diagnostic(scene, 'orbit:action');
    await expect(active).toHaveAttribute('data-mission-mode', 'active');
    await expect(active).toHaveAttribute('data-orbit-revolving', 'true');
    await expect(background).toHaveAttribute('data-mission-mode', 'background');
    await expect(planned).toHaveAttribute('data-mission-mode', 'planned');
    await expect(collection).toHaveAttribute('data-mission-mode', 'collection');
    await expect(collection).toHaveAttribute('data-orbit-revolving', 'true');
    const activeRadius = Number(await active.getAttribute('data-orbit-radius'));
    expect(activeRadius).toBeGreaterThan(1);
    for (const quiet of [background, planned]) {
      await expect(quiet).toHaveAttribute('data-orbit-revolving', 'false');
      const radius = Number(await quiet.getAttribute('data-orbit-radius'));
      expect(radius).toBeGreaterThan(.3);
      expect(radius).toBeLessThan(activeRadius * .7);
    }
    const initial = { active: await point(active), background: await point(background), planned: await point(planned), collection: await point(collection) };
    expect(Object.values(initial).flat().every(Number.isFinite)).toBe(true);
    let waveObserved = false;
    for (const elapsed of [1500, 1500, 2000, 4000, 2000]) {
      await page.clock.fastForward(elapsed);
      await page.clock.runFor(50);
      waveObserved ||= await scene.getAttribute('data-heartbeat-wave-active') === 'true';
      expect(await point(background)).toEqual(initial.background);
      expect(await point(planned)).toEqual(initial.planned);
    }
    expect(waveObserved).toBe(true);
    expect(await point(active)).not.toEqual(initial.active);
    expect(await point(collection)).not.toEqual(initial.collection);
    await expect(scene).toHaveAttribute('data-orbit-pulse-count', '0');
    expect(await scene.evaluate(element => [element.getAttribute('data-node-count'), element.getAttribute('data-edge-count')])).toEqual(counts);
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
    await testInfo.attach(`${profile}-active-and-quiet-rings`, { body: await page.screenshot(), contentType: 'image/png' });
  });
}

test('a quiet inner ring remains pickable, inspectable and quiet after selection and filtering', async ({ page }) => {
  const scene = await open(page, 'main');
  await page.getByRole('checkbox', { name: 'Auto-rotate', exact: true }).uncheck();
  await page.getByLabel('Filter career graph by mission').selectOption('fabric');
  await page.clock.runFor(100);
  await page.locator('.career-orbit-index > summary').click();
  await page.locator(`.career-orbit-list > button[data-orbit-id="${orbitId('fabric')}"]`).click();
  await page.clock.runFor(100);
  const inspector = page.getByRole('complementary', { name: 'Selected career orbit', exact: true });
  await expect(inspector).toHaveAttribute('data-mission-mode', 'background');
  const quiet = diagnostic(scene, orbitId('fabric'));
  const initial = await point(quiet);
  await page.getByRole('button', { name: 'Focus ring', exact: true }).click();
  await page.clock.runFor(100);
  const marker = scene.locator('.career-graph-scene__selected-orbit-marker');
  const canvas = scene.locator('canvas');
  await canvas.scrollIntoViewIfNeeded();
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error('Expected a rendered canvas for quiet-ring picking.');
  await expect(marker).toHaveAttribute('data-screen-visible', 'true');
  await expect.poll(async () => {
    await page.clock.runFor(100);
    return Number(await marker.getAttribute('data-screen-x'));
  }).toBeCloseTo(bounds.width / 2, 0);
  await expect.poll(async () => {
    await page.clock.runFor(100);
    return Number(await marker.getAttribute('data-screen-y'));
  }).toBeCloseTo(bounds.height / 2, 0);
  const x = Number(await marker.getAttribute('data-screen-x'));
  const y = Number(await marker.getAttribute('data-screen-y'));
  expect(x).toBeCloseTo(bounds.width / 2, 0);
  expect(y).toBeCloseTo(bounds.height / 2, 0);
  await inspector.getByRole('button', { name: 'Close orbit details', exact: true }).click();
  await canvas.click({ position: { x, y } });
  await page.clock.runFor(50);
  await expect(inspector).toHaveAttribute('data-orbit-id', orbitId('fabric'));
  await expect(scene).toHaveAttribute('data-animation-state', 'running');
  await page.clock.fastForward(2000);
  await page.clock.runFor(50);
  expect(await point(quiet)).toEqual(initial);
  await expect(quiet).toHaveAttribute('data-orbit-revolving', 'false');
  await expect(inspector.getByRole('button', { name: 'Record evidence', exact: true })).toBeDisabled();
  await inspector.getByRole('button', { name: /Current checkpoint:/ }).click();
  await expect(page.getByRole('complementary', { name: 'Selected career node', exact: true })).toBeVisible();
});
