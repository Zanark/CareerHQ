import { expect, test, type Page } from '@playwright/test';
import { getMissions } from '../src/domain/catalog';
import { createInitialState, generatePlan } from '../src/domain/engine';
import type { AppState } from '../src/domain/types';

test.use({ timezoneId: 'Asia/Kolkata' });

const key = 'careerhq.workspace.v1';
const now = new Date('2026-10-06T19:00:00.000Z');
const today = '2026-10-07';

async function seed(page: Page, state = createInitialState(false)) {
  state.updatedAt = now.toISOString();
  await page.clock.setFixedTime(now);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(({ key, state }) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(state));
  }, { key, state });
}

async function stored(page: Page): Promise<AppState> {
  return page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key);
}

async function openFabric(page: Page) {
  await page.goto('./#/mission/fabric');
  await expect(page.getByRole('heading', { name: 'Service Fabric', level: 1, exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Bring into focus', exact: true })).toBeVisible();
}

async function fillEvidence(page: Page, title: string) {
  const dialog = page.getByRole('dialog', { name: 'Record progress', exact: true });
  await expect(dialog.getByRole('combobox', { name: 'Mission', exact: true })).toHaveValue('fabric');
  await dialog.getByLabel('Artifact title').fill(title);
  await dialog.getByLabel('What did you practice?').fill('A synthetic demonstration recorded on the selected background mission without changing focus.');
  return dialog;
}

function unchangedFocus(saved: AppState, before: AppState) {
  expect(saved.focusMissionId).toBe(before.focusMissionId);
  expect(Object.values(saved.missions).map(progress => progress.mode))
    .toEqual(Object.values(before.missions).map(progress => progress.mode));
  expect(saved.missions.fabric.mode).toBe('background');
  expect(saved.schemaVersion).toBe(before.schemaVersion);
  expect(saved.roadmapVersion).toBe(before.roadmapVersion);
  expect(saved.missions.fabric.roadmapVersion).toBe(before.missions.fabric.roadmapVersion);
  expect(saved.archives).toEqual(before.archives);
  expect(saved.readiness).toEqual(before.readiness);
}

for (const complete of [false, true]) {
  test(`explicit background mission ${complete ? 'completion requires every criterion' : 'practice grants no completion'} and preserves focus after reload`, async ({ page }) => {
    const state = createInitialState(false);
    state.focusMissionId = 'pattern';
    await seed(page, state);
    await openFabric(page);
    const before = await stored(page);
    await page.getByRole('button', { name: 'Record evidence', exact: true }).click();
    const dialog = await fillEvidence(page, `Synthetic background ${complete ? 'completion' : 'practice'}`);
    if (complete) {
      await dialog.getByRole('checkbox', { name: /This checkpoint is complete/ }).check();
      const submit = dialog.getByRole('button', { name: 'Complete & unlock next', exact: true });
      await expect(submit).toBeDisabled();
      const criteria = await dialog.getByRole('group', { name: 'My completion evidence meets these criteria' }).getByRole('checkbox').all();
      expect(criteria.length).toBeGreaterThan(0);
      for (const checkbox of criteria.slice(0, -1)) await checkbox.check();
      await expect(submit).toBeDisabled();
      await criteria.at(-1)!.check();
      await expect(submit).toBeEnabled();
      await submit.click();
    } else {
      await dialog.getByRole('button', { name: 'Save evidence', exact: true }).click();
    }
    await expect(dialog).toHaveCount(0);
    const saved = await stored(page);
    unchangedFocus(saved, before);
    expect(saved.evidence).toHaveLength(1);
    expect(saved.evidence[0]).toMatchObject({
      missionId: 'fabric', checkpointId: before.missions.fabric.checkpointId,
      roadmapVersion: before.missions.fabric.roadmapVersion, completedCheckpoint: complete,
    });
    expect(saved.evidence[0].createdAt.slice(0, 10)).toBe('2026-10-06');
    expect(await page.evaluate(createdAt => new Date(createdAt).getDate(), saved.evidence[0].createdAt)).toBe(7);
    expect(saved.missions.fabric.completedCheckpointIds).toEqual(complete ? [before.missions.fabric.checkpointId] : []);
    if (complete) expect(saved.missions.fabric.checkpointId).not.toBe(before.missions.fabric.checkpointId);
    else expect(saved.missions.fabric).toEqual({ ...before.missions.fabric, status: 'in-progress' });
    expect(saved.missions.pattern).toEqual(before.missions.pattern);
    expect(saved.plans).toEqual(before.plans);
    expect(saved.events.at(-1)?.type).toBe(complete ? 'checkpoint-completed' : 'evidence-recorded');
    await page.reload();
    await expect(page.getByRole('button', { name: 'Bring into focus', exact: true })).toBeVisible();
    expect(await stored(page)).toEqual(saved);
  });
}

test('Saved work offers background missions with none active and clears criteria when changing the selected mission', async ({ page }) => {
  const state = createInitialState(false);
  state.focusMissionId = 'pattern';
  for (const mission of getMissions(state)) {
    if (!mission.planned) state.missions[mission.id].mode = 'background';
  }
  await seed(page, state);
  await page.goto('./#/evidence');
  const before = await stored(page);
  expect(before.plans[today]).toEqual([]);
  await page.getByRole('button', { name: 'Add evidence', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Record progress', exact: true });
  const mission = dialog.getByRole('combobox', { name: 'Mission', exact: true });
  await expect(mission).toHaveValue('pattern');
  await expect(mission.locator('option[value="fabric"]')).toHaveCount(1);
  await dialog.getByRole('checkbox', { name: /This checkpoint is complete/ }).check();
  const criteria = dialog.getByRole('group', { name: 'My completion evidence meets these criteria' }).getByRole('checkbox');
  for (const checkbox of await criteria.all()) await checkbox.check();
  await mission.selectOption('fabric');
  await expect(dialog.getByRole('checkbox', { name: /This checkpoint is complete/ })).not.toBeChecked();
  await expect(dialog.getByRole('group', { name: 'My completion evidence meets these criteria' })).toHaveCount(0);
  await fillEvidence(page, 'Synthetic selected background practice');
  await dialog.getByRole('button', { name: 'Save evidence', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  const saved = await stored(page);
  unchangedFocus(saved, before);
  expect(saved.evidence[0]).toMatchObject({ missionId: 'fabric', completedCheckpoint: false });
  expect(saved.missions.fabric.completedCheckpointIds).toEqual([]);
  expect(saved.missions.pattern).toEqual(before.missions.pattern);
  expect(saved.plans).toEqual(before.plans);
});

test('background blockers still prevent recording until explicitly cleared', async ({ page }) => {
  const state = createInitialState(false);
  state.missions.fabric.blocker = 'Synthetic unresolved prerequisite question';
  await seed(page, state);
  await openFabric(page);
  await expect(page.getByRole('button', { name: 'Record evidence', exact: true })).toBeDisabled();
  await page.goto('./#/evidence');
  await page.getByRole('button', { name: 'Add evidence', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Record progress', exact: true });
  await expect(dialog.getByRole('combobox', { name: 'Mission', exact: true }).locator('option[value="fabric"]')).toHaveCount(0);
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
  await openFabric(page);
  expect((await stored(page)).evidence).toEqual([]);
  await page.getByLabel('What is blocking this mission?').fill('');
  await page.getByRole('button', { name: 'Clear blocker', exact: true }).click();
  const before = await stored(page);
  await page.getByRole('button', { name: 'Record evidence', exact: true }).click();
  await fillEvidence(page, 'Synthetic unblocked background practice');
  await dialog.getByRole('button', { name: 'Save evidence', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  const saved = await stored(page);
  unchangedFocus(saved, before);
  expect(saved.evidence[0]).toMatchObject({ missionId: 'fabric', completedCheckpoint: false });
});

test('planned reference-only missions remain excluded from evidence even with a newer source roadmap', async ({ page }) => {
  const state = createInitialState(false, '2.0.0');
  expect(state.missions.algorithm.mode).toBe('planned');
  await seed(page, state);
  await page.goto('./#/mission/algorithm');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const before = await stored(page);
  await expect(page.getByRole('button', { name: 'Record evidence', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Bring into focus', exact: true })).toHaveCount(0);
  await page.goto('./#/evidence');
  await page.getByRole('button', { name: 'Add evidence', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Record progress', exact: true });
  await expect(dialog.getByRole('combobox', { name: 'Mission', exact: true }).locator('option[value="algorithm"]')).toHaveCount(0);
  await expect(dialog.getByRole('combobox', { name: 'Mission', exact: true }).locator('option[value="fabric"]')).toHaveCount(1);
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
  expect(await stored(page)).toEqual(before);
});

test('a stale daily-plan action stays disabled while standalone background practice remains available', async ({ page }) => {
  const state = createInitialState(false);
  state.capacity = 'gentle';
  state.focusMissionId = 'fabric';
  state.missions.fabric.mode = 'active';
  state.plans[today] = generatePlan(state, today);
  expect(state.plans[today][0].missionId).toBe('fabric');
  state.missions.fabric.mode = 'background';
  await seed(page, state);
  await page.goto('./#/plan');
  await expect(page.getByRole('button', { name: 'Log progress', exact: true })).toBeDisabled();
  const before = await stored(page);
  await openFabric(page);
  await page.getByRole('button', { name: 'Record evidence', exact: true }).click();
  const dialog = await fillEvidence(page, 'Synthetic standalone background work');
  await dialog.getByRole('button', { name: 'Save evidence', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  const saved = await stored(page);
  unchangedFocus(saved, before);
  expect(saved.evidence[0]).toMatchObject({ missionId: 'fabric', completedCheckpoint: false });
  expect(saved.plans).toEqual(before.plans);
  expect(saved.plans[today][0].completed).toBe(false);
});

test('failed background completion persistence keeps the draft and grants no credit before a successful retry', async ({ page }) => {
  await seed(page);
  await openFabric(page);
  const before = await stored(page);
  await page.getByRole('button', { name: 'Record evidence', exact: true }).click();
  const dialog = await fillEvidence(page, 'Synthetic background persistence retry');
  await dialog.getByRole('checkbox', { name: /This checkpoint is complete/ }).check();
  for (const checkbox of await dialog.getByRole('group', { name: 'My completion evidence meets these criteria' }).getByRole('checkbox').all()) {
    await checkbox.check();
  }
  await page.evaluate(key => {
    const setItem = Storage.prototype.setItem;
    sessionStorage.setItem('test-background-write-failure', 'true');
    Storage.prototype.setItem = function (name: string, value: string) {
      if (name === key && sessionStorage.getItem('test-background-write-failure')) {
        throw new DOMException('Synthetic full storage', 'QuotaExceededError');
      }
      setItem.call(this, name, value);
    };
  }, key);
  await dialog.getByRole('button', { name: 'Complete & unlock next', exact: true }).click();
  await expect(dialog.getByRole('alert')).toContainText('The evidence could not be saved');
  await expect(dialog.getByLabel('Artifact title')).toHaveValue('Synthetic background persistence retry');
  expect(await stored(page)).toEqual(before);
  await expect(page.getByRole('progressbar', { name: 'Mission checkpoint progress', exact: true })).toHaveAttribute('aria-valuenow', '0');
  await page.evaluate(() => sessionStorage.removeItem('test-background-write-failure'));
  await dialog.getByRole('button', { name: 'Complete & unlock next', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  const saved = await stored(page);
  unchangedFocus(saved, before);
  expect(saved.evidence).toHaveLength(1);
  expect(saved.evidence[0]).toMatchObject({ missionId: 'fabric', completedCheckpoint: true });
  expect(saved.missions.fabric.completedCheckpointIds).toEqual([before.missions.fabric.checkpointId]);
});
