import { expect, test, type Page } from '@playwright/test';
import { createInitialState, generatePlan, localDate, parseState, recordEvidence } from '../src/domain/engine';
import { getMission } from '../src/domain/catalog';
import type { AppState } from '../src/domain/types';
import { buildCareerGraph } from '../src/graph/careerGraphModel';
import type { CareerOrbit } from '../src/graph/careerOrbitTypes';

const key = 'careerhq.workspace.v1';

async function open(page: Page, state = createInitialState(false)) {
  state.plans[localDate()] = generatePlan(state);
  const canonical = parseState(state);
  const raw = JSON.stringify(canonical);
  await page.addInitScript(({ key, raw }) => {
    localStorage.setItem(key, raw);
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
        return type === 'webgl2' ? null : Reflect.apply(original, this, [type, ...args]);
      },
    });
  }, { key, raw });
  await page.goto('./#/home');
  await expect(page.locator('.career-graph-scene')).toHaveAttribute('data-scene-state', 'unavailable');
  await page.locator('.career-orbit-index > summary').click();
  await expect(page.locator('.career-orbit-list > button')).toHaveCount(15);
  return { raw, graph: buildCareerGraph(canonical) };
}

async function inspect(page: Page, orbit: CareerOrbit) {
  await page.locator('.career-orbit-list > button').filter({ has: page.getByText(orbit.label, { exact: true }) }).click();
  const inspector = page.getByRole('complementary', { name: 'Selected career orbit', exact: true });
  await expect(inspector).toHaveAttribute('data-orbit-id', orbit.id);
  await expect(inspector.getByRole('heading', { name: orbit.label, exact: true, level: 2 })).toBeVisible();
  return inspector;
}

function completeOne(state: AppState) {
  return recordEvidence(state, {
    missionId: 'pattern', checkpointId: state.missions.pattern.checkpointId,
    title: 'Synthetic orbit checkpoint', summary: 'Synthetic confirmed work for saved-version orbit coverage.',
    kind: 'exercise', url: '', advance: true, criteriaConfirmed: true,
  });
}

test('mission orbits inspect the exact saved roadmap and current checkpoint without another tracker', async ({ page }) => {
  const state = completeOne(createInitialState(false, '2.0.0'));
  const mission = getMission('pattern', state);
  const { raw, graph } = await open(page, state);
  const orbit = graph.orbits.find(item => item.missionId === 'pattern')!;
  const inspector = await inspect(page, orbit);
  await expect(inspector).toBeFocused();
  await expect(inspector).toContainText('Saved tracker v2.0.0');
  await expect(inspector.getByRole('progressbar')).toHaveAttribute('value', '1');
  await expect(inspector.getByRole('progressbar')).toHaveAttribute('max', String(mission.checkpoints.length));
  await expect(inspector).toContainText('not an extra task');
  await expect(inspector.getByRole('combobox', { name: 'Orbit stage or record group' }).locator('option')).toHaveCount(orbit.segments.length + 1);
  const stage = orbit.segments[0];
  await inspector.getByRole('combobox', { name: 'Orbit stage or record group' }).selectOption(stage.id);
  await expect(inspector.getByRole('heading', { name: stage.label, level: 3, exact: true })).toBeVisible();
  await inspector.locator('.career-orbit-member-details > summary').click();
  await expect(inspector.locator('.career-orbit-members li')).toHaveCount(stage.members.length);
  await inspector.locator('.career-orbit-current').click();
  await expect(page.getByRole('complementary', { name: 'Selected career node' }).getByRole('heading', { level: 2 }))
    .toHaveText(mission.checkpoints.find(checkpoint => checkpoint.id === state.missions.pattern.checkpointId)!.title);
  await expect(page.getByRole('complementary', { name: 'Selected career orbit' })).toHaveCount(0);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('record orbits use real pipeline groups and explicitly reveal filtered members', async ({ page }) => {
  const state = createInitialState(false);
  state.opportunities = (['Found', 'Accepted', 'Rejected'] as const).map(stage => ({
    id: `synthetic-${stage}`, company: 'Synthetic company', role: 'Synthetic role', stage,
    notes: 'Synthetic test record', url: '', createdAt: state.updatedAt,
  }));
  const { raw, graph } = await open(page, state);
  const orbit = graph.orbits.find(item => item.kind === 'opportunity')!;
  await page.getByLabel('Filter career graph by mission').selectOption('pattern');
  await page.getByRole('checkbox', { name: 'Work records', exact: true }).uncheck();
  await page.getByRole('checkbox', { name: 'References', exact: true }).uncheck();
  await page.getByRole('checkbox', { name: 'Rings & sparks', exact: true }).uncheck();
  const inspector = await inspect(page, orbit);
  await expect(inspector.getByRole('progressbar')).toHaveCount(0);
  await expect(inspector).toContainText('0 of 3 members visible');
  await expect(inspector).toContainText('Rings are hidden');
  const rejected = orbit.segments.find(segment => segment.members.some(member => member.nodeId.endsWith('synthetic-Rejected')))!;
  await inspector.getByRole('combobox', { name: 'Orbit stage or record group' }).selectOption(rejected.id);
  await expect(inspector).toContainText('0 of 1 members visible');
  await inspector.getByRole('button', { name: 'Reveal orbit and members', exact: true }).click();
  await expect(page.getByLabel('Filter career graph by mission')).toHaveValue('all');
  for (const name of ['Work records', 'References', 'Rings & sparks']) await expect(page.getByRole('checkbox', { name, exact: true })).toBeChecked();
  await expect(inspector).toContainText('1 of 1 members visible');
  await inspector.locator('.career-orbit-member-details > summary').click();
  await expect(inspector.locator('.graph-status-tag')).toHaveText('Reference');
  await inspector.locator('.career-orbit-members button').click();
  await expect(page.getByRole('complementary', { name: 'Selected career node' }).locator('.graph-status-tag')).toHaveText('Reference');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('empty record/reference rings remain honest and usable without WebGL', async ({ page }) => {
  const { raw, graph } = await open(page);
  const empty = graph.orbits.filter(orbit => orbit.kind !== 'mission' && !orbit.memberIds.length);
  expect(empty.length).toBeGreaterThanOrEqual(4);
  for (const orbit of empty) {
    const inspector = await inspect(page, orbit);
    await expect(inspector.locator('.career-orbit-empty')).toHaveText('No matching records in this workspace.');
    await expect(inspector.getByRole('progressbar')).toHaveCount(0);
    await expect(inspector).toContainText('0 of 0 members visible');
    await expect(inspector.getByRole('link', { name: 'Open records', exact: true })).toHaveAttribute('href', orbit.href);
  }
  await expect(page.getByRole('button', { name: 'Focus ring', exact: true })).toBeDisabled();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('collection totals distinguish global records from a mission-filtered view', async ({ page }) => {
  let state = createInitialState(false);
  for (const missionId of ['pattern', 'system'] as const) {
    state = recordEvidence(state, {
      missionId, checkpointId: state.missions[missionId].checkpointId,
      title: `Synthetic ${missionId} evidence`, summary: 'A synthetic practice record without completion credit.',
      kind: 'exercise', url: '', advance: false, criteriaConfirmed: false,
    });
  }
  const { raw, graph } = await open(page, state);
  await page.getByLabel('Filter career graph by mission').selectOption('pattern');
  const inspector = await inspect(page, graph.orbits.find(orbit => orbit.kind === 'evidence')!);
  await expect(inspector).toContainText('1 of 2 members visible');
  await inspector.getByRole('button', { name: 'Reveal orbit and members', exact: true }).click();
  await expect(inspector).toContainText('2 of 2 members visible');
  await expect(page.getByLabel('Filter career graph by mission')).toHaveValue('all');
  const fabric = graph.orbits.find(orbit => orbit.missionId === 'fabric')!;
  await page.getByLabel('Filter career graph by mission').selectOption('pattern');
  const fabricInspector = await inspect(page, fabric);
  await expect(page.getByLabel('Filter career graph by mission')).toHaveValue('fabric');
  await expect(fabricInspector.getByRole('button', { name: 'Record evidence', exact: true })).toBeDisabled();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('ring inspection and record lists fit a 320px viewport without altering progress', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 900 });
  const { raw, graph } = await open(page);
  const inspector = await inspect(page, graph.orbits.find(orbit => orbit.missionId === 'system')!);
  await inspector.locator('.career-orbit-member-details > summary').click();
  await inspector.getByLabel('Search orbit members', { exact: true }).fill('HTTP');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(inspector).toBeInViewport();
  await testInfo.attach('compact-orbit-inspection', { body: await page.screenshot(), contentType: 'image/png' });
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});
