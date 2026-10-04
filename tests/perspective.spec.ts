import { expect, test, type Page } from '@playwright/test';
import { createInitialState, generatePlan, localDate, recordEvidence, upgradeRoadmap } from '../src/domain/engine';
import type { AppState } from '../src/domain/types';

const key = 'careerhq.workspace.v1';

function recordedWorkspace() {
  let state = createInitialState(false, '1.0.0');
  for (let index = 1; index <= 4; index++) {
    state = recordEvidence(state, {
      missionId: 'pattern', checkpointId: state.missions.pattern.checkpointId,
      title: `Recorded attempt ${index}`, summary: `Synthetic practice ${index}: traced the lookup and noted one remaining question.`,
      kind: 'explanation', url: '', advance: false, criteriaConfirmed: false,
    });
  }
  state = upgradeRoadmap(state, 'pattern');
  state.evidence.reverse();
  return state;
}

async function seed(page: Page, state: AppState) {
  state.plans[localDate()] = generatePlan(state);
  const raw = JSON.stringify(state);
  await page.addInitScript(({ key, raw }) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, raw);
  }, { key, raw });
  return raw;
}

test('Keep going is optional, before Overview, and supports direct links without changing data', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Overview', exact: true, level: 1 })).toBeVisible();
  const before = await page.evaluate(key => localStorage.getItem(key), key);
  const navigation = page.getByRole('complementary', { name: 'Main navigation' }).locator('nav').first();
  await expect(navigation.getByRole('link').nth(0)).toHaveText('Keep going');
  await expect(navigation.getByRole('link').nth(1)).toHaveText('Overview');
  await navigation.getByRole('link', { name: 'Keep going', exact: true }).click();
  await expect(page).toHaveURL(/#\/perspective$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hard is not the same as hopeless.');
  await expect(navigation.getByRole('link', { name: 'Keep going', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.perspective-empty')).toContainText('Nothing logged here yet. That is not the same as nothing done.');
  await expect(page.locator('.perspective-receipt')).toHaveCount(0);
  await page.reload();
  await expect(page).toHaveTitle('Keep going - CareerHQ');
  await page.getByRole('link', { name: 'Choose one doable action', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Daily plan', exact: true, level: 1 })).toBeVisible();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
});

test('receipts use actual saved dates and archived versions, open exact evidence, and never manufacture credit', async ({ page }) => {
  const raw = await seed(page, recordedWorkspace());
  await page.goto('./#/perspective');
  await expect(page.locator('.perspective-record-count')).toContainText('4 saved entries');
  const receipts = page.locator('.perspective-receipt');
  await expect(receipts).toHaveCount(3);
  await expect(receipts.locator('h3')).toHaveText(['Recorded attempt 4', 'Recorded attempt 3', 'Recorded attempt 2']);
  await expect(receipts.first()).toContainText('v1.0.0');
  const destination = await receipts.first().getAttribute('href');
  await receipts.first().click();
  await expect(page.getByRole('heading', { name: 'Saved work', exact: true, level: 1 })).toBeVisible();
  expect(new URL(page.url()).hash).toBe(destination);
  await expect(page.locator('.evidence-card.highlighted h3')).toHaveText('Recorded attempt 4');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
  expect(JSON.parse(raw).missions.pattern.completedCheckpointIds).toEqual([]);
});

test('sample-containing workspaces are not presented as personal achievements or wholly fictional', async ({ page }) => {
  const initial = createInitialState(true);
  const mixed = recordEvidence(initial, {
    missionId: 'pattern', checkpointId: initial.missions.pattern.checkpointId,
    title: 'An added record alongside the samples', summary: 'A synthetic user-added entry mixed with the original example records.',
    kind: 'note', url: '', advance: false, criteriaConfirmed: false,
  });
  const raw = await seed(page, mixed);
  await page.goto('./#/perspective');
  await expect(page.getByRole('heading', { name: 'This workspace includes examples.', exact: true })).toBeVisible();
  await expect(page.locator('.perspective-record')).toContainText('may mix fictional examples with anything you added');
  await expect(page.locator('.perspective-record-count')).toContainText('5 workspace entries');
  await expect(page.locator('.perspective-receipt').first()).toContainText('An added record alongside the samples');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

test('the new tutorial chapter shows only temporary receipts and returns to the real record', async ({ page }) => {
  const raw = await seed(page, recordedWorkspace());
  await page.goto('./#/perspective');
  await page.locator('header').getByRole('button', { name: 'Start tutorial', exact: true }).click();
  const coach = page.locator('.tutorial-panel');
  await coach.getByLabel('Tutorial chapter').selectOption('perspective');
  await expect(coach).toHaveAttribute('data-step', 'perspective-intro');
  await expect(page.locator('.perspective-record')).toContainText('Practice, not your real record.');
  await expect(page.locator('.perspective-record')).not.toContainText('Recorded attempt');
  await coach.getByLabel('Tutorial chapter').selectOption('evidence');
  await page.locator('[data-tour="record-evidence"]').click();
  await page.locator('[data-tour="evidence-example"]').click();
  await page.locator('[data-tour="evidence-submit"]').click();
  await coach.getByLabel('Tutorial chapter').selectOption('perspective');
  await expect(page.locator('.perspective-record-count')).toContainText('1 practice entry');
  await coach.getByRole('button', { name: 'Exit tutorial', exact: true }).click();
  await expect(page.locator('.perspective-record-count')).toContainText('4 saved entries');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

for (const theme of ['dark', 'light']) {
  for (const width of [1440, 390, 320]) {
    test(`research, limits, and records stay readable at ${width}px in ${theme}`, async ({ page, baseURL }, testInfo) => {
      const errors: string[] = [];
      const externalRequests: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('request', request => {
        if (new URL(request.url()).origin !== new URL(baseURL!).origin) externalRequests.push(request.url());
      });
      await page.setViewportSize({ width, height: 1000 });
      await page.addInitScript(theme => localStorage.setItem('careerhq.theme.v1', theme), theme);
      await page.goto('./#/perspective');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const before = await page.evaluate(key => localStorage.getItem(key), key);
      const sources = page.locator('.perspective-source');
      expect(await sources.count()).toBeGreaterThanOrEqual(4);
      for (const source of await sources.all()) {
        await source.locator('summary').click();
        await expect(source).toHaveAttribute('open', '');
        await expect(source).toContainText('What this does not mean:');
        const link = source.getByRole('link');
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        expect(new URL((await link.getAttribute('href'))!).protocol).toBe('https:');
        expect(await source.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect(page.locator('.perspective-boundary')).toContainText('They cannot promise a job');
      expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
      await page.evaluate(() => window.scrollTo(0, 0));
      const path = testInfo.outputPath(`perspective-${theme}-${width}.png`);
      await page.screenshot({ path, fullPage: true, animations: 'disabled' });
      await testInfo.attach('grounded-perspective', { path, contentType: 'image/png' });
      expect(externalRequests).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}
