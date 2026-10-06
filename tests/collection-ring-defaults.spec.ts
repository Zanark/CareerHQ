import { expect, test, type Page } from '@playwright/test';
import { createInitialState, generatePlan, localDate, parseState, recordEvidence } from '../src/domain/engine';
import { buildCareerGraph } from '../src/graph/careerGraphModel';
import { closeGraphPanels, openGraphPanel, setGraphCheckbox } from './graph-ui';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';
const collections = ['action', 'evidence', 'opportunity', 'freelance', 'history', 'curriculum'];
const ring = (kind: string) => `orbit:${kind}`;

async function open(page: Page) {
  let state = createInitialState(false, '2.0.0');
  state = recordEvidence(state, {
    missionId: 'pattern', checkpointId: state.missions.pattern.checkpointId,
    title: 'Synthetic collection evidence', summary: 'An unfinished fictional exercise retained when its collection ring is hidden.',
    kind: 'exercise', url: '', advance: false, criteriaConfirmed: false,
  });
  state.plans[localDate()] = generatePlan(state);
  state.opportunities = [{ id: 'collection-application', company: 'Example', role: 'Example role', stage: 'Found',
    url: '', notes: 'Fictional application.', createdAt: state.updatedAt }];
  state.freelanceOpportunities = [{ id: 'collection-lead', title: 'Example lead', platform: 'Example', url: '',
    skills: '', budget: '', verdict: 'Unreviewed', notes: 'Fictional lead.', createdAt: state.updatedAt }];
  state.personalProof = [{ id: 'collection-history', title: 'Example accomplishment', detail: 'A fictional past work record.',
    source: 'Test fixture', url: '' }];
  const raw = JSON.stringify(parseState(state));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(({ key, raw }) => { if (!localStorage.getItem(key)) localStorage.setItem(key, raw); }, { key, raw });
  await page.goto('./#/home');
  const scene = page.locator('.career-graph-page .career-graph-scene');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  return { scene, raw, graph: buildCareerGraph(state) };
}

test('all six populated collection rings start unchecked without hiding any records and can be enabled individually', async ({ page }, testInfo) => {
  const { scene, graph, raw } = await open(page);
  expect(graph.orbits.filter(orbit => orbit.kind !== 'mission').every(orbit => orbit.memberIds.length > 0)).toBe(true);
  await expect(scene).toHaveAttribute('data-orbit-count', '9');
  await expect(scene).toHaveAttribute('data-node-count', String(graph.nodes.length));
  await expect(scene).toHaveAttribute('data-edge-count', String(graph.edges.length));
  const radius = await scene.getAttribute('data-orbit-data-radius');
  const revision = await scene.getAttribute('data-view-revision');
  const canvas = scene.locator('canvas');
  await canvas.evaluate(element => element.setAttribute('data-collection-original', 'true'));
  await testInfo.attach('mission-only-rings', { body: await page.screenshot(), contentType: 'image/png' });
  await setGraphCheckbox(page, 'Sparks', false);
  await openGraphPanel(page, 'visibility');
  const panel = page.locator('[data-graph-panel="visibility"]');
  await panel.locator('.career-visibility-items > summary').click();
  await panel.getByLabel('Filter visibility item types', { exact: true }).selectOption('orbit');
  for (const kind of collections) {
    await expect(panel.locator(`[data-visibility-item="${ring(kind)}"]`).getByRole('checkbox')).not.toBeChecked();
    await expect(scene.locator(`.career-graph-scene__orbit-diagnostic[data-orbit-id="${ring(kind)}"]`)).toHaveCount(0);
  }
  for (const [index, kind] of collections.entries()) {
    await panel.locator(`[data-visibility-item="${ring(kind)}"]`).getByRole('checkbox').check();
    await expect(scene).toHaveAttribute('data-orbit-count', String(10 + index));
    await expect(scene).toHaveAttribute('data-node-count', String(graph.nodes.length));
    await expect(scene).toHaveAttribute('data-edge-count', String(graph.edges.length));
  }
  await expect(scene).toHaveAttribute('data-sparks-visible', 'false');
  await expect(scene).toHaveAttribute('data-orbit-data-radius', radius!);
  await expect(scene).toHaveAttribute('data-view-revision', revision!);
  await expect(canvas).toHaveAttribute('data-collection-original', 'true');
  await closeGraphPanels(page);
  await testInfo.attach('explicitly-enabled-collections', { body: await page.screenshot(), contentType: 'image/png' });
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('inspecting a hidden collection does not enable it and explicit reveal restores only that ring', async ({ page }) => {
  const { scene, raw } = await open(page);
  await setGraphCheckbox(page, 'Sparks', false);
  await openGraphPanel(page, 'rings');
  const card = page.locator('.career-orbit-list > button[data-orbit-id="orbit:evidence"]');
  await expect(card).toContainText('Hidden in this view');
  await card.click();
  const inspector = page.getByRole('complementary', { name: 'Selected career orbit', exact: true });
  await expect(inspector).toContainText('Rings are hidden');
  await expect(scene).toHaveAttribute('data-orbit-count', '9');
  await expect(page.getByRole('button', { name: 'Focus ring', exact: true })).toBeDisabled();
  await inspector.getByRole('button', { name: 'Reveal orbit and members', exact: true }).click();
  await expect(scene).toHaveAttribute('data-orbit-count', '10');
  await expect(scene).toHaveAttribute('data-highlighted-orbit-id', 'orbit:evidence');
  await expect(page.getByRole('button', { name: 'Focus ring', exact: true })).toBeEnabled();
  for (const kind of collections.filter(kind => kind !== 'evidence')) {
    await expect(scene.locator(`.career-graph-scene__orbit-diagnostic[data-orbit-id="${ring(kind)}"]`)).toHaveCount(0);
  }
  await expect(scene).toHaveAttribute('data-sparks-visible', 'false');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('Select all is an explicit opt-in while focus and a reopened graph independently use mission-only defaults', async ({ page }) => {
  const { scene, graph, raw } = await open(page);
  await openGraphPanel(page, 'visibility');
  await page.getByRole('button', { name: 'Select all items', exact: true }).click();
  await expect(scene).toHaveAttribute('data-orbit-count', '15');
  await page.goto('./#/plan');
  await page.locator('[data-tour="focus-room-open"]').click();
  const focus = page.locator('.focus-room .career-graph-scene');
  await expect(focus).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  await expect(focus).toHaveAttribute('data-orbit-count', '9');
  await expect(focus).toHaveAttribute('data-node-count', String(graph.nodes.length));
  await expect(focus).toHaveAttribute('data-edge-count', String(graph.edges.length));
  for (const kind of collections) {
    await expect(focus.locator(`.career-graph-scene__orbit-diagnostic[data-orbit-id="${ring(kind)}"]`)).toHaveCount(0);
  }
  await page.goto('./#/home');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  await expect(scene).toHaveAttribute('data-orbit-count', '9');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});
