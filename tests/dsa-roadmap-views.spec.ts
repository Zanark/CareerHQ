import { expect, test, type Page } from '@playwright/test';
import { createInitialState, generatePlan, localDate, recordEvidence } from '../src/domain/engine';
import type { RoadmapVersion } from '../src/domain/types';

const key = 'careerhq.workspace.v1';

async function oldTracker(page: Page, version: RoadmapVersion) {
  let state = createInitialState(false, version);
  for (let index = 0; index < 2; index++) {
    state = recordEvidence(state, {
      missionId: 'pattern', checkpointId: state.missions.pattern.checkpointId,
      title: `Synthetic saved work ${index + 1}`, summary: 'Existing saved progress that must remain on its original tracker.',
      kind: 'code', url: '', advance: true, criteriaConfirmed: true,
    });
  }
  state.missions.pattern.mode = 'background';
  state.missions.pattern.blocker = 'Synthetic saved blocker';
  state.plans[localDate()] = generatePlan(state);
  const raw = JSON.stringify(state);
  await page.addInitScript(({ key, raw }) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, raw);
  }, { key, raw });
  return { state, raw };
}

for (const version of ['1.0.0', '2.0.0'] as const) {
  for (const width of [1440, 390, 320]) {
    test(`saved v${version} opens the complete DSA curriculum and finds DFS at ${width}px without adopting`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: width < 500 ? 568 : 1000 });
      const { state, raw } = await oldTracker(page, version);
      await page.goto('./#/mission/pattern');
      await expect(page.locator('.source-upgrade')).toContainText('DFS');
      await page.getByRole('button', { name: 'Full roadmap', exact: true }).click();
      const dialog = page.getByRole('dialog', { name: 'DSA full roadmap', exact: true });
      await expect(dialog).toContainText('Preview v3.0.0');
      await expect(dialog.getByLabel('Roadmap view', { exact: true })).toHaveValue('complete');
      await expect(dialog.locator('.full-roadmap-stage')).toHaveCount(14);
      await expect(dialog.locator('.full-roadmap-node')).toHaveCount(48);
      await expect(dialog.locator('.full-roadmap-node.reference')).toHaveCount(48);
      await expect(dialog.locator('[aria-current="step"], .full-roadmap-node.complete')).toHaveCount(0);
      await expect(dialog.getByRole('button', { name: 'Current checkpoint', exact: true })).toHaveCount(0);
      await expect(dialog.locator('[data-full-checkpoint="pattern-v3-section-22"] strong')).toContainText('BFS');
      await expect(dialog.locator('[data-full-checkpoint="pattern-v3-section-23"] strong')).toContainText('DFS');
      await expect(dialog.locator('[data-full-checkpoint="pattern-v3-section-40"] strong')).toContainText('Advanced DP');

      await dialog.getByLabel('Roadmap view', { exact: true }).focus();
      await dialog.getByLabel('Roadmap view', { exact: true }).selectOption('saved');
      await expect(dialog).toContainText(`Tracker v${version}`);
      await expect(dialog.locator('.full-roadmap-node')).toHaveCount(5);
      await expect(dialog.locator('.full-roadmap-node.complete')).toHaveCount(2);
      await expect(dialog.locator('[aria-current="step"]')).toHaveAttribute('data-full-checkpoint', state.missions.pattern.checkpointId);
      await expect(dialog.getByLabel('Roadmap view', { exact: true })).toBeFocused();

      await dialog.getByLabel('Roadmap view', { exact: true }).selectOption('complete');
      await expect(dialog.getByRole('button', { name: 'Fit all', exact: true })).toHaveAttribute('aria-pressed', 'true');
      await dialog.getByLabel('Find a roadmap topic', { exact: true }).selectOption('pattern-v3-section-23');
      const dfs = dialog.locator('[data-full-checkpoint="pattern-v3-section-23"]');
      await expect(dfs).toHaveAttribute('aria-pressed', 'true');
      await expect(dfs).toBeFocused();
      await expect(dialog.getByLabel('Roadmap zoom level')).toHaveText('100%');
      await expect(dialog.locator('.full-roadmap-details')).toContainText('DFS');
      await expect(dialog.locator('.full-roadmap-details')).toContainText('Topics');
      await expect(dialog.getByRole('link', { name: "Open this topic's practice set", exact: true })).toHaveAttribute('href', '#/dsa/23');
      await expect.poll(() => dfs.evaluate(element => {
        const box = element.getBoundingClientRect();
        return element.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
      })).toBe(true);
      expect((await dialog.locator('.full-roadmap-viewport').boundingBox())!.height).toBeGreaterThan(90);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await testInfo.attach('DFS-readable-preview', { body: await page.screenshot(), contentType: 'image/png' });
      expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(page.getByRole('button', { name: 'Full roadmap', exact: true })).toBeFocused();
      await page.getByRole('button', { name: 'Full roadmap', exact: true }).click();
      await expect(dialog.getByLabel('Roadmap view', { exact: true })).toHaveValue('complete');
      expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
    });
  }
}

test('the latest tracker keeps its real current glow while topic lookup only inspects', async ({ page }) => {
  await page.goto('./#/mission/pattern');
  const before = await page.evaluate(key => localStorage.getItem(key), key);
  await page.getByRole('button', { name: 'Full roadmap', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'DSA full roadmap', exact: true });
  await expect(dialog.getByLabel('Roadmap view', { exact: true })).toHaveCount(0);
  await expect(dialog.locator('[aria-current="step"]')).toHaveAttribute('data-full-checkpoint', 'pattern-v2-fundamentals');
  await dialog.getByLabel('Find a roadmap topic', { exact: true }).selectOption('pattern-v3-section-23');
  await expect(dialog.locator('[aria-current="step"]')).toHaveAttribute('data-full-checkpoint', 'pattern-v2-fundamentals');
  await dialog.getByRole('link', { name: "Open this topic's practice set", exact: true }).click();
  await expect(page).toHaveURL(/#\/dsa\/23$/);
  await expect(page.locator('#dsa-topic-title')).toHaveText('DFS');
  await expect(page.locator('.dsa-topic .eyebrow')).toContainText('PAGES 47-48');
  await expect(page.locator('.dsa-library-source')).toContainText('LeetCode_RoadMap.pdf');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
});

test('reviewing an update from the preview remains a separate explicit action', async ({ page }) => {
  const { raw } = await oldTracker(page, '1.0.0');
  await page.goto('./#/mission/pattern');
  await page.getByRole('button', { name: 'Full roadmap', exact: true }).click();
  await page.getByRole('link', { name: 'Review tracker update', exact: true }).click();
  await expect(page).toHaveURL(/#\/sources\/pattern$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Adopt documented roadmap', exact: true })).toBeVisible();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
});

for (const viewport of [{ width: 568, height: 320 }, { width: 640, height: 360 }]) {
  test(`the expanded preview leaves a usable DFS canvas in ${viewport.width}x${viewport.height} landscape`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const { raw } = await oldTracker(page, '1.0.0');
    await page.goto('./#/mission/pattern');
    await page.getByRole('button', { name: 'Full roadmap', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'DSA full roadmap', exact: true });
    await dialog.getByLabel('Find a roadmap topic').selectOption('pattern-v3-section-23');
    const dfs = dialog.locator('[data-full-checkpoint="pattern-v3-section-23"]');
    await expect(dfs).toBeFocused();
    await expect.poll(async () => (await dialog.locator('.full-roadmap-viewport').boundingBox())!.height).toBeGreaterThan(90);
    await expect.poll(() => dfs.evaluate(element => {
      const box = element.getBoundingClientRect();
      return element.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
    })).toBe(true);
    await expect(dialog.getByRole('button', { name: 'Close dialog', exact: true })).toBeInViewport();
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
  });
}
