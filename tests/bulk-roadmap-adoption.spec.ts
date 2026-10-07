import { expect, test, type Page } from '@playwright/test';
import {
  countCompletedCheckpoints, createInitialState, generatePlan, localDate, parseState,
  previewRoadmapUpgrades, recordEvidence, recordFocusSessionEvent, recordRecall, startFocusSession,
} from '../src/domain/engine';
import { getLatestMission } from '../src/domain/catalog';
import type { AppState } from '../src/domain/types';

const key = 'careerhq.workspace.v1';
const openName = 'Adopt all documented roadmaps';
const dialogName = 'Adopt all documented roadmaps?';

async function stored(page: Page): Promise<AppState> {
  return page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key);
}

async function raw(page: Page) {
  return page.evaluate(key => localStorage.getItem(key), key);
}

async function prepare(page: Page, state: AppState, date = localDate()) {
  state.plans[date] = generatePlan(state, date);
  const original = JSON.stringify(parseState(state));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(({ key, original }) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, original);
  }, { key, original });
  await page.goto('./#/sources');
  await expect(page.getByRole('heading', { name: 'Operation documents', level: 1, exact: true })).toBeVisible();
  expect(await raw(page)).toBe(original);
  await page.evaluate(key => {
    const setItem = Storage.prototype.setItem;
    document.documentElement.dataset.bulkWrites = '0';
    Storage.prototype.setItem = function (name, value) {
      if (name === key && document.documentElement.dataset.blockBulkWrites === 'true') {
        throw new DOMException('Synthetic storage failure', 'QuotaExceededError');
      }
      setItem.call(this, name, value);
      if (name === key) {
        document.documentElement.dataset.bulkWrites = String(Number(document.documentElement.dataset.bulkWrites) + 1);
      }
    };
  }, key);
  return original;
}

async function writes(page: Page) {
  return page.locator('html').getAttribute('data-bulk-writes');
}

function mixedState() {
  let state = createInitialState(false, '2.0.0');
  state.missions.fabric = createInitialState(false, '1.0.0').missions.fabric;
  const latest = createInitialState(false);
  state.missions.escape = latest.missions.escape;
  state.missions.income = latest.missions.income;
  for (const missionId of ['pattern', 'system'] as const) {
    state = recordEvidence(state, {
      missionId, checkpointId: state.missions[missionId].checkpointId,
      title: 'Synthetic roadmap exercise', summary: 'A fictional solved exercise with explicitly checked criteria.',
      kind: 'exercise', url: '', advance: true, criteriaConfirmed: true,
    });
  }
  state = recordRecall(state, {
    missionId: 'pattern', roadmapVersion: '2.0.0', checkpointId: state.evidence[0].checkpointId,
    outcome: 'partial', checks: { explanation: true, diagram: false, exercise: false }, notes: 'Synthetic recall.',
  });
  state.missions.pattern.blocker = 'A synthetic retained blocker';
  state.missions.system.blocker = 'A synthetic archived blocker';
  state.missions.pattern.mode = 'background';
  state.focusMissionId = 'system';
  state.personalProof = [{
    id: 'bulk-proof', title: 'Synthetic history', detail: 'A fictional earlier project with an explicit source.',
    source: 'Synthetic test note, page 1', url: '',
  }];
  state = startFocusSession(state, 600);
  return recordFocusSessionEvent(state, {
    sessionId: state.focusSessions![0].id, kind: 'distraction', elapsedMs: 1000,
  });
}

test('already-current workspaces show an explicit disabled all-adopted state without writes', async ({ page }) => {
  const original = await prepare(page, createInitialState(false));
  await expect(page.getByRole('button', { name: openName, exact: true })).toBeDisabled();
  await expect(page.locator('.source-bulk-status')).toContainText('All documented roadmaps are already adopted.');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(await writes(page)).toBe('0');
  expect(await raw(page)).toBe(original);
});

test('one exact preview cancels without writes and confirms all mixed editions in one persistent write', async ({ page }) => {
  const state = mixedState();
  const preview = previewRoadmapUpgrades(state);
  const original = await prepare(page, state);
  let downloads = 0;
  page.on('download', () => { downloads += 1; });
  const open = page.getByRole('button', { name: openName, exact: true });
  const dialog = page.getByRole('dialog', { name: dialogName, exact: true });
  await expect(page.getByRole('button', { name: 'Append expanded roadmap', exact: true })).toBeVisible();
  await open.click();
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.bulk-roadmap-list li')).toHaveCount(preview.upgrades.length);
  for (const upgrade of preview.upgrades) {
    const item = dialog.locator('.bulk-roadmap-list li').filter({ has: page.getByRole('heading', { name: upgrade.name, exact: true }) });
    await expect(item).toContainText(`v${upgrade.fromVersion} → v${upgrade.toVersion}`);
    await expect(item).toContainText(upgrade.preservesProgress ? 'Verified DSA append' : 'Archive previous progress');
  }
  for (const id of ['escape', 'income'] as const) {
    await expect(dialog.getByRole('heading', { name: getLatestMission(id).name, exact: true })).toHaveCount(0);
  }
  await expect(dialog.getByRole('link', { name: 'export a workspace backup in Settings' })).toHaveAttribute('href', '#/settings');
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(open).toBeFocused();
  expect(await raw(page)).toBe(original);
  expect(await writes(page)).toBe('0');
  expect(downloads).toBe(0);

  await open.click();
  await dialog.getByRole('button', { name: 'Confirm all roadmaps', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(open).toBeDisabled();
  await expect(page.locator('.source-bulk-status [role="status"]')).toContainText('adopted together');
  const next = await stored(page);
  expect(await writes(page)).toBe('1');
  expect(next.archives).toHaveLength(preview.upgrades.length);
  expect(next.missions.pattern).toEqual({ ...state.missions.pattern, roadmapVersion: '3.0.0' });
  expect(next.missions.system.completedCheckpointIds).toEqual([]);
  expect(next.missions.system.blocker).toBe('');
  expect(next.missions.algorithm.mode).toBe('background');
  expect(next.missions.escape).toEqual(state.missions.escape);
  expect(next.missions.income).toEqual(state.missions.income);
  for (const field of ['plans', 'evidence', 'recalls', 'personalProof', 'focusSessions', 'focusMissionId', 'readiness'] as const) {
    expect(next[field]).toEqual(state[field]);
  }
  expect(next.events.slice(0, state.events.length)).toEqual(state.events);
  expect(next.events.slice(state.events.length).every(event => event.type === 'roadmap-upgraded')).toBe(true);
  expect(countCompletedCheckpoints(next)).toBe(countCompletedCheckpoints(state));
  expect(downloads).toBe(0);
  await page.reload();
  expect(await stored(page)).toEqual(next);
  await expect(open).toBeDisabled();
});

test('Escape closes the single confirmation without adopting or downloading', async ({ page }) => {
  const original = await prepare(page, createInitialState(false, '2.0.0'));
  const open = page.getByRole('button', { name: openName, exact: true });
  await open.click();
  await expect(page.getByRole('dialog', { name: dialogName, exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(open).toBeFocused();
  expect(await writes(page)).toBe('0');
  expect(await raw(page)).toBe(original);
});

for (const cause of ['archive collision', 'history capacity', 'storage denial'] as const) {
  test(`a ${cause} fails visibly with zero partial workspace writes`, async ({ page }) => {
    const state = createInitialState(false, '2.0.0');
    if (cause === 'archive collision') state.archives.push({
      missionId: 'income', archivedAt: state.updatedAt, progress: createInitialState(false).missions.income,
    });
    if (cause === 'history capacity') state.events = Array.from({ length: 4992 }, (_, index) => ({
      id: `bulk-capacity-${index}`, type: 'workspace-change', title: 'Synthetic history', createdAt: state.updatedAt,
    }));
    const original = await prepare(page, state);
    if (cause === 'storage denial') {
      await page.evaluate(() => { document.documentElement.dataset.blockBulkWrites = 'true'; });
    }
    await page.getByRole('button', { name: openName, exact: true }).click();
    await page.getByRole('dialog', { name: dialogName, exact: true })
      .getByRole('button', { name: 'Confirm all roadmaps', exact: true }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('.source-bulk-status [role="status"]')).toContainText('No roadmaps were changed.');
    await expect(page.getByRole('alert')).toContainText(cause === 'archive collision' ? 'Archive duplicates' :
      cause === 'history capacity' ? 'Invalid workspace at events' : 'Synthetic storage failure');
    expect(await writes(page)).toBe('0');
    expect(await raw(page)).toBe(original);
    await expect(page.getByRole('button', { name: openName, exact: true })).toBeEnabled();
  });
}

test('another tab changing the workspace during confirmation is never overwritten', async ({ page }) => {
  await prepare(page, createInitialState(false, '2.0.0'));
  await page.getByRole('button', { name: openName, exact: true }).click();
  const other = await page.context().newPage();
  await other.goto('./#/settings');
  await other.getByLabel('What are you working toward?').fill('Synthetic replacement from another tab.');
  await other.getByRole('button', { name: 'Save direction', exact: true }).click();
  const replacement = await raw(other);
  await page.getByRole('dialog', { name: dialogName, exact: true })
    .getByRole('button', { name: 'Confirm all roadmaps', exact: true }).click();
  await expect(page.locator('.source-bulk-status [role="status"]')).toContainText('No roadmaps were changed.');
  await expect(page.getByRole('alert').filter({ hasText: 'Not saved.' })).toContainText('another tab');
  expect(await writes(page)).toBe('0');
  expect(await raw(page)).toBe(replacement);
  await other.close();
});

test('a same-tab timer update invalidates the exact preview even when every eligible roadmap is unchanged', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-10-06T10:00:00Z') });
  await page.clock.pauseAt(new Date('2026-10-06T10:01:00Z'));
  const state = createInitialState(false, '2.0.0');
  state.capacity = 'gentle';
  await prepare(page, state, '2026-10-06');
  await page.getByRole('link', { name: 'Daily plan', exact: true }).click();
  await page.getByRole('button', { name: 'Start focus session', exact: true }).click();
  await page.getByRole('link', { name: 'Operation documents', exact: true }).click();
  await page.getByRole('button', { name: openName, exact: true }).click();
  const dialog = page.getByRole('dialog', { name: dialogName, exact: true });
  await expect(dialog.locator('.bulk-roadmap-list li')).toHaveCount(9);
  await page.clock.fastForward(600_000);
  await expect.poll(async () => (await stored(page)).focusSessions?.[0].events.at(-1)?.kind).toBe('complete');
  const afterTimer = await raw(page);
  const timerWrites = await writes(page);
  await dialog.getByRole('button', { name: 'Confirm all roadmaps', exact: true }).click();
  await expect(page.locator('.source-bulk-status [role="status"]')).toContainText('No roadmaps were changed.');
  await expect(page.getByRole('alert')).toContainText('workspace changed since this roadmap preview');
  expect(await raw(page)).toBe(afterTimer);
  expect(await writes(page)).toBe(timerWrites);
  expect((await stored(page)).archives).toEqual([]);
});

for (const viewport of [{ width: 320, height: 568 }, { width: 568, height: 320 }]) {
  test(`the entire confirmation remains readable and operable at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const original = await prepare(page, createInitialState(false, '2.0.0'));
    const open = page.getByRole('button', { name: openName, exact: true });
    await expect(open).toBeInViewport({ ratio: 1 });
    expect(await page.locator('html').evaluate(element => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
    await open.click();
    const dialog = page.getByRole('dialog', { name: dialogName, exact: true });
    await expect(dialog).toBeInViewport({ ratio: 1 });
    await expect(dialog.getByRole('button', { name: 'Cancel', exact: true })).toBeInViewport({ ratio: 1 });
    await expect(dialog.getByRole('button', { name: 'Confirm all roadmaps', exact: true })).toBeInViewport({ ratio: 1 });
    const body = dialog.locator('.bulk-roadmap-body');
    expect(await body.evaluate(element => element.clientHeight)).toBeGreaterThan(60);
    expect(await body.evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);
    expect(await dialog.evaluate(element => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
    for (const heading of await dialog.locator('.bulk-roadmap-list h3').all()) {
      await heading.evaluate(element => element.scrollIntoView({ block: 'center' }));
      await expect(heading).toBeInViewport({ ratio: 1 });
    }
    await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();
    expect(await writes(page)).toBe('0');
    expect(await raw(page)).toBe(original);
  });
}
