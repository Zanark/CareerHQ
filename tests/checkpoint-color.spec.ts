import { expect, test, type Page } from '@playwright/test';
import { createInitialState, parseState, recordEvidence } from '../src/domain/engine';
import { buildCareerGraph, type CareerGraphNode } from '../src/graph/careerGraphModel';
import { closeGraphPanels, openGraphPanel, searchGraphNodes } from './graph-ui';
import { PNG } from './png';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });

async function isolatedPixels(page: Page, node: CareerGraphNode) {
  await openGraphPanel(page, 'visibility');
  const choices = page.locator('[data-graph-panel="visibility"]');
  await choices.getByRole('button', { name: 'Clear all items', exact: true }).click();
  const details = choices.locator('.career-visibility-items');
  if (await details.getAttribute('open') === null) await details.locator('summary').click();
  await choices.getByLabel('Search visibility items', { exact: true }).fill(node.label);
  await choices.locator(`[data-visibility-item="${node.id}"]`).getByRole('checkbox').check();
  await searchGraphNodes(page, node.label);
  await page.locator('.career-graph-node-list > button').click();
  await page.getByRole('button', { name: 'Focus node', exact: true }).click();
  const scene = page.locator('.career-graph-scene');
  await expect(scene).toHaveAttribute('data-node-count', '1');
  await expect(scene).toHaveAttribute('data-orbit-count', '0');
  const canvas = scene.locator('canvas');
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error('Expected the rendered graph canvas.');
  const marker = scene.locator('.career-graph-scene__selected-marker');
  await expect.poll(async () => Number(await marker.getAttribute('data-screen-x'))).toBeCloseTo(bounds.width / 2, 0);
  await expect.poll(async () => Number(await marker.getAttribute('data-screen-y'))).toBeCloseTo(bounds.height / 2, 0);
  await page.getByRole('button', { name: 'Close node details', exact: true }).click();
  await closeGraphPanels(page);
  await page.mouse.move(1, 1);
  const image = await page.screenshot({ clip: {
    x: Math.floor(bounds.x + bounds.width / 2 - 16), y: Math.floor(bounds.y + bounds.height / 2 - 16),
    width: 32, height: 32,
  } });
  const pixels = PNG.sync.read(image);
  let green = 0, colored = 0;
  for (let index = 0; index < pixels.data.length; index += 4) {
    const [r, g, b] = pixels.data.subarray(index, index + 3);
    if (Math.max(r, g, b) > 70) colored++;
    if (g > r + 20 && g > b + 20 && g > 70) green++;
  }
  return { image, green, colored };
}

test('actual completed checkpoint pixels are green, but a recorded accomplishment is not', async ({ page }, testInfo) => {
  let state = createInitialState(false);
  state = recordEvidence(state, {
    missionId: 'pattern', checkpointId: state.missions.pattern.checkpointId,
    title: 'Synthetic completed exercise', summary: 'Confirmed the defined checkpoint criteria in a fictional test workspace.',
    kind: 'exercise', url: '', advance: true, criteriaConfirmed: true,
  });
  state.personalProof = [{
    id: 'synthetic-proof-color', title: 'Synthetic parser project',
    detail: 'A fictional past accomplishment, not a completed curriculum checkpoint.', source: 'Test fixture', url: '',
  }];
  const graph = buildCareerGraph(state);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(raw => localStorage.setItem('careerhq.workspace.v1', raw), JSON.stringify(parseState(state)));
  await page.goto('./#/home');
  await expect(page.locator('.career-graph-scene')).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  const raw = await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'));
  const completed = await isolatedPixels(page, graph.nodes.find(node => node.kind === 'checkpoint' && node.status === 'complete')!);
  expect(completed.green).toBeGreaterThan(40);
  const history = await isolatedPixels(page, graph.nodes.find(node => node.kind === 'history')!);
  expect(history.colored).toBeGreaterThan(40);
  expect(history.green).toBe(0);
  await testInfo.attach('completed-checkpoint-green', { body: completed.image, contentType: 'image/png' });
  await testInfo.attach('recorded-accomplishment-identity', { body: history.image, contentType: 'image/png' });
  expect(await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'))).toBe(raw);
});
