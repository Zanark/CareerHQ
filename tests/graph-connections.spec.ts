import { expect, test, type Page } from '@playwright/test';
import { checkpointIdentity, getCheckpoint } from '../src/domain/catalog';
import { createInitialState, generatePlan, localDate, upgradeRoadmap } from '../src/domain/engine';
import type { AppState } from '../src/domain/types';
import { careerSkillLinks } from '../src/graph/careerSkillLinks';
import { buildCareerGraph } from '../src/graph/careerGraphModel';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';
const link = careerSkillLinks[0];
const source = getCheckpoint(link.source.missionId, link.source.checkpointId, link.source.roadmapVersion);
const target = getCheckpoint(link.target.missionId, link.target.checkpointId, link.target.roadmapVersion);

async function openGraph(page: Page, state = createInitialState(false)) {
  state.plans[localDate()] = generatePlan(state);
  const raw = JSON.stringify(state);
  await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), { key, raw });
  await page.goto('./#/home');
  await expect(page.locator('.career-graph-scene')).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  await page.getByRole('button', { name: 'Pause animation', exact: true }).click();
  return raw;
}

async function inspectSource(page: Page) {
  await page.getByLabel('Search career graph nodes', { exact: true }).fill(source.title);
  await page.locator('.career-graph-node-list > button').filter({ hasText: source.title }).first().click();
  const inspector = page.getByRole('complementary', { name: 'Selected career node' });
  await expect(inspector.getByRole('heading', { level: 2 })).toHaveText(source.title);
  await inspector.locator('.career-graph-connections > summary').click();
  return inspector;
}

test('shared links add only edges, have a visibility toggle, and do not recreate the scene or save progress', async ({ page }) => {
  const state = createInitialState(false);
  const expected = buildCareerGraph(state).edges.filter(edge => edge.kind === 'shared-skill').length;
  const raw = await openGraph(page, state);
  const scene = page.locator('.career-graph-scene');
  const count = Number(await scene.getAttribute('data-edge-count'));
  const nodes = await scene.getAttribute('data-node-count');
  await page.locator('.career-graph-stage canvas').evaluate(canvas => canvas.setAttribute('data-original', 'true'));
  await expect(page.locator('.career-graph-link-key')).toContainText(`${expected} shared skill links`);
  await page.getByRole('checkbox', { name: 'Shared skill links', exact: true }).uncheck();
  await expect(scene).toHaveAttribute('data-edge-count', String(count - expected));
  await expect(scene).toHaveAttribute('data-node-count', nodes!);
  await expect(page.locator('.career-graph-stage canvas')).toHaveAttribute('data-original', 'true');
  await page.getByRole('checkbox', { name: 'Shared skill links', exact: true }).check();
  await expect(scene).toHaveAttribute('data-edge-count', String(count));
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

for (const width of [1440, 320]) {
  test(`connection reasons and source pages are inspectable at ${width}px without changing the tracker`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    const raw = await openGraph(page);
    const inspector = await inspectSource(page);
    await expect(inspector.locator('.career-graph-connections')).toContainText('not source-declared prerequisites');
    const entry = inspector.locator('li[data-connection-kind="shared-skill"]').filter({ has: page.getByText(link.reason, { exact: true }) });
    await expect(entry).toContainText(target.title);
    await entry.getByText('Curriculum basis', { exact: true }).click();
    await expect(entry).toContainText(source.source!.document);
    await expect(entry).toContainText(`p. ${source.source!.page}`);
    await expect(entry).toContainText(target.source!.document);
    await expect(entry).toContainText(`p. ${target.source!.page}`);
    await testInfo.attach('connection-reason', { body: await page.screenshot(), contentType: 'image/png' });
    await entry.getByRole('button', { name: `Inspect ${target.title}`, exact: true }).click();
    await expect(inspector.getByRole('heading', { level: 2 })).toHaveText(target.title);
    await expect(inspector).toBeFocused();
    await expect(page.locator('.career-graph-stage canvas')).toHaveAttribute('data-selected-node-id',
      `checkpoint:${checkpointIdentity(link.target.missionId, link.target.checkpointId, link.target.roadmapVersion)}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
  });
}

test('following a hidden peer explicitly reveals its mission, reference layer and disabled shared links', async ({ page }) => {
  const state = upgradeRoadmap(createInitialState(false, '2.0.0'), link.source.missionId);
  const raw = await openGraph(page, state);
  await page.getByLabel('Filter career graph by mission').selectOption(link.source.missionId);
  await page.getByRole('checkbox', { name: 'References', exact: true }).uncheck();
  await page.getByRole('checkbox', { name: 'Shared skill links', exact: true }).uncheck();
  const inspector = await inspectSource(page);
  const entry = inspector.locator('li[data-connection-kind="shared-skill"]').filter({ has: page.getByText(link.reason, { exact: true }) });
  await expect(entry).toContainText('outside the current view');
  await expect(entry).toContainText('Shared skill lines are off');
  await entry.getByRole('button', { name: `Reveal and inspect ${target.title}`, exact: true }).click();
  await expect(page.getByLabel('Filter career graph by mission')).toHaveValue('all');
  await expect(page.getByRole('checkbox', { name: 'References', exact: true })).toBeChecked();
  await expect(page.getByRole('checkbox', { name: 'Shared skill links', exact: true })).toBeChecked();
  await expect(inspector.getByRole('heading', { level: 2 })).toHaveText(target.title);
  await expect(inspector.locator('.graph-status-tag')).toHaveText('Reference');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});
