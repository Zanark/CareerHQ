import { expect, test, type Page } from '@playwright/test';
import { createInitialState, generatePlan, localDate, recordEvidence } from '../src/domain/engine';
import { getMissionVersion } from '../src/domain/catalog';
import { dsaSections } from '../src/domain/operations/dsaStudy';
import type { AppState } from '../src/domain/types';

const key = 'careerhq.workspace.v1';

async function seed(page: Page, state: AppState) {
  state.plans[localDate()] = generatePlan(state);
  const raw = JSON.stringify(state);
  await page.addInitScript(({ key, raw }) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, raw);
  }, { key, raw });
  return raw;
}

async function saved(page: Page): Promise<AppState> {
  return page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key);
}

async function confirm(page: Page, accept: boolean) {
  const nextDialog = page.waitForEvent('dialog');
  const pending = page.getByRole('button', { name: 'Append expanded roadmap', exact: true }).click();
  const dialog = await nextDialog;
  expect(dialog.message()).toContain('existing HashMap checkpoints');
  if (accept) await dialog.accept(); else await dialog.dismiss();
  await pending;
}

function completeOriginal(count: number) {
  let state = createInitialState(false, '2.0.0');
  for (let index = 0; index < count; index++) {
    state = recordEvidence(state, {
      missionId: 'pattern', checkpointId: state.missions.pattern.checkpointId,
      title: `Preserved HashMap work ${index + 1}`, summary: 'Synthetic original-topic work with explicit completion confirmation.',
      kind: 'code', url: '', advance: true, criteriaConfirmed: true,
    });
  }
  return state;
}

test('fresh DSA includes the unchanged HashMap start plus all 43 new topics in a 14-stage map', async ({ page }) => {
  await page.goto('./#/mission/pattern');
  await expect(page.locator('.source-counts')).toContainText('48 tracked nodes');
  await expect(page.locator('.save-state-main h2')).toHaveText('HashMap Fundamentals');
  await expect(page.getByRole('button', { name: 'Append expanded roadmap', exact: true })).toHaveCount(0);
  const before = JSON.stringify(await saved(page));
  await page.getByRole('button', { name: 'Full roadmap', exact: true }).click();
  await expect(page.locator('.full-roadmap-stage')).toHaveCount(14);
  await expect(page.locator('.full-roadmap-node')).toHaveCount(48);
  await expect(page.locator('.full-roadmap-node[aria-current="step"]')).toHaveAttribute('data-full-checkpoint', 'pattern-v2-fundamentals');
  await expect(page.locator('[data-connection="pattern-v2-2-3:pattern-v3-section-02"]')).toHaveCount(1);
  await expect(page.locator('[data-connection="pattern-v2-2-4:pattern-v3-section-02"]')).toHaveCount(1);
  const titles = await page.locator('.full-roadmap-stage-heading h3').allTextContents();
  expect(titles[2]).toContain('Foundation bridge');
  expect(titles[4]).toContain('Linear patterns');
  expect(titles.at(-1)).toContain('Mixed mastery');
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  expect(JSON.stringify(await saved(page))).toBe(before);
});

test('v2 append is explicit and retains current work, completed IDs, blocker, historical plans and accurate totals', async ({ page }) => {
  let state = completeOriginal(3);
  state = recordEvidence(state, {
    missionId: 'pattern', checkpointId: state.missions.pattern.checkpointId,
    title: 'Current complement practice', summary: 'Synthetic in-progress work that must stay linked to its original roadmap.',
    kind: 'note', url: '', advance: false, criteriaConfirmed: false,
  });
  state.missions.pattern.blocker = 'Synthetic blocker must stay visible.';
  const raw = await seed(page, state);
  await page.goto('./#/mission/pattern');
  await expect(page.locator('.source-heading')).toContainText('Active tracker v2.0.0');
  expect(JSON.stringify(await saved(page))).toBe(raw);
  await confirm(page, false);
  expect(JSON.stringify(await saved(page))).toBe(raw);
  await confirm(page, true);
  const after = await saved(page);
  expect(after.missions.pattern).toEqual({ ...state.missions.pattern, roadmapVersion: '3.0.0' });
  expect(after.evidence).toEqual(state.evidence);
  expect(after.plans).toEqual(state.plans);
  expect(after.recalls).toEqual(state.recalls);
  expect(after.archives[0].progress).toEqual(state.missions.pattern);
  await expect(page.locator('.save-state-main h2')).toHaveText('Complement Lookup');
  await expect(page.getByLabel('What is blocking this mission?')).toHaveValue(state.missions.pattern.blocker);
  await page.goto('./#/hq');
  await expect(page.locator('.overview-summary > a').nth(1).locator('strong')).toHaveText('3');
  await page.reload();
  expect((await saved(page)).evidence).toEqual(state.evidence);
});

test('a completed v2 track continues at the bridge without erasing or double-counting its five completions', async ({ page }) => {
  const state = completeOriginal(5);
  await seed(page, state);
  await page.goto('./#/mission/pattern');
  await confirm(page, true);
  const after = await saved(page);
  expect(after.missions.pattern.completedCheckpointIds).toEqual(state.missions.pattern.completedCheckpointIds);
  expect(after.missions.pattern.checkpointId).toBe('pattern-v3-section-02');
  expect(after.missions.pattern.status).toBe('not-started');
  await expect(page.locator('.save-state-main h2')).toHaveText('Complexity & Big-O');
  await expect(page.locator('.save-count')).toContainText('5');
  await page.getByRole('link', { name: 'Open practice set', exact: true }).click();
  await expect(page).toHaveURL(/#\/dsa\/2$/);
  await expect(page.locator('#dsa-topic-title')).toHaveText('Complexity & Big-O');
  await page.goto('./#/hq');
  await expect(page.locator('.overview-summary > a').nth(1).locator('strong')).toHaveText('5');
});

test('all 50 library sections expose their exact source problem counts and metadata without recording work', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('./#/dsa/1');
  const before = JSON.stringify(await saved(page));
  await expect(page.getByLabel('DSA source section')).toHaveCount(1);
  await expect(page.getByLabel('DSA source section').locator('option')).toHaveCount(50);
  let count = 0;
  for (const section of dsaSections) {
    await page.getByLabel('DSA source section').selectOption(String(section.number));
    await expect(page.locator('#dsa-topic-title')).toHaveText(section.title);
    const links = page.locator('.dsa-problem-set li > a');
    await expect(links).toHaveCount(section.problems.length);
    count += await links.count();
    const expected = ['foundation', 'core-a', 'core-b', 'stress'].flatMap(set =>
      section.problems.filter(problem => problem.set === set).map(problem => problem.url));
    expect(await links.evaluateAll(elements => elements.map(element => element.getAttribute('href')))).toEqual(expected);
  }
  expect(count).toBe(939);
  await page.getByLabel('DSA source section').selectOption('1');
  await expect(page.locator('[data-problem-set="core-a"] li').filter({ hasText: '1. Two Sum' }).locator('.dsa-difficulty')).toHaveText('Easy');
  await page.getByLabel('DSA source section').selectOption('16');
  await expect(page.locator('[data-problem-set="foundation"] .dsa-difficulty').first()).toHaveText('Medium');
  expect(JSON.stringify(await saved(page))).toBe(before);
});

for (const width of [1440, 390, 320]) {
  test(`practice filters and source detail fit ${width}px without changing the tracker`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./#/dsa/9');
    const before = JSON.stringify(await saved(page));
    await page.getByLabel('Filter DSA problems by difficulty').selectOption('Easy');
    await expect(page.locator('.dsa-difficulty')).toHaveCount(7);
    await page.getByLabel('Search DSA practice problems').fill('125');
    await expect(page.locator('.dsa-problem-set li')).toHaveCount(1);
    await expect(page.locator('.dsa-problem-set li')).toContainText('Valid Palindrome');
    await page.getByLabel('Search DSA practice problems').fill('does-not-exist');
    await expect(page.locator('.dsa-library-empty')).toContainText('No problems match');
    await page.getByLabel('Search DSA practice problems').fill('');
    await page.locator('.dsa-topic summary').click();
    await page.locator('.dsa-protocol summary').click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const link of await page.locator('.dsa-problem-set li > a').all()) {
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(link).toHaveAttribute('target', '_blank');
    }
    await testInfo.attach('DSA-practice-library', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
    expect(JSON.stringify(await saved(page))).toBe(before);
  });
}

test('unchanged v2 definitions remain independently browsable before adoption', async ({ page }) => {
  const state = createInitialState(false, '2.0.0');
  await seed(page, state);
  await page.goto('./#/mission/pattern');
  await page.getByRole('button', { name: 'Full roadmap', exact: true }).click();
  await expect(page.locator('.full-roadmap-node')).toHaveCount(getMissionVersion('pattern', '2.0.0').checkpoints.length);
  await expect(page.locator('.full-roadmap-stage')).toHaveCount(2);
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page.locator('[data-tour="source-preview"] > summary').click();
  await expect(page.locator('[data-tour="source-preview"] select[aria-label="Roadmap stage"] option')).toHaveCount(14);
  expect((await saved(page)).missions.pattern.roadmapVersion).toBe('2.0.0');
});
