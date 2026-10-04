import { test, expect, type Page } from '@playwright/test';

async function snapshot(page: Page) {
  return page.evaluate(() => Object.fromEntries(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)])));
}

async function begin(page: Page, chapter: string) {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible();
  const before = await snapshot(page);
  await page.locator('header').getByRole('button', { name: 'Start tutorial', exact: true }).click();
  await page.getByLabel('Tutorial chapter', { exact: true }).selectOption(chapter);
  return before;
}

async function next(page: Page, id: string) {
  await page.locator('.tutorial-panel').getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.locator('.tutorial-panel')).toHaveAttribute('data-step', id);
}

async function finish(page: Page, before: Awaited<ReturnType<typeof snapshot>>) {
  await page.locator('.tutorial-panel').getByRole('button', { name: 'Exit tutorial', exact: true }).click();
  await expect(page.locator('.app')).toHaveAttribute('data-workspace', 'saved');
  expect(await snapshot(page)).toEqual(before);
}

test('source adoption needs confirmation and never changes the real roadmap', async ({ page }) => {
  const before = await begin(page, 'sources');
  await next(page, 'source-select-fabric');
  await page.locator('[data-tour="source-mission"]').selectOption('fabric');
  await next(page, 'source-preview');
  await expect(page.locator('.tutorial-panel').getByRole('button', { name: 'Next', exact: true })).toBeDisabled();
  await page.locator('[data-tour="source-preview"] > summary').click();
  await next(page, 'source-adopt');
  page.once('dialog', dialog => dialog.dismiss());
  await page.locator('[data-tour="source-adopt"]').click();
  await expect(page.locator('.source-heading')).toContainText('Active tracker v1.0.0');
  await expect(page.locator('.tutorial-panel').getByRole('button', { name: 'Next', exact: true })).toBeDisabled();
  page.once('dialog', dialog => dialog.accept());
  await page.locator('[data-tour="source-adopt"]').click();
  await expect(page.locator('.source-heading')).toContainText('Active tracker v2.0.0');
  await next(page, 'source-archive');
  await page.locator('[data-tour="source-archive"] > summary').click();
  await expect(page.locator('[data-tour="source-archive"]')).toContainText('0/5 completed');
  await expect(page.locator('.tutorial-panel').getByRole('button', { name: 'Next', exact: true })).toBeEnabled();
  await finish(page, before);
});

test('jumping to review can create a fictional recall example without completion credit', async ({ page }) => {
  const before = await begin(page, 'review');
  await next(page, 'review-filter-work');
  await page.locator('[data-tour="saved-work-type"]').selectOption('code');
  await next(page, 'review-history');
  await next(page, 'review-recall-setup');
  await page.locator('[data-tour="recall-example"]').click();
  await expect(page.locator('.recall-card')).toHaveCount(1);
  await next(page, 'review-recall');
  await page.locator('[data-tour="recall-add"]').click();
  await page.getByRole('radio', { name: 'Partial', exact: true }).check();
  await page.locator('[data-tour="recall-save"]').click();
  await next(page, 'review-independent');
  await page.locator('[data-tour="recall-add"]').click();
  await page.locator('[data-tour="recall-independent-choice"]').check();
  await expect(page.locator('[data-tour="recall-save"]')).toBeDisabled();
  for (const check of await page.locator('[data-tour="recall-checks"] input[data-required="true"]').all()) await check.check();
  await page.locator('[data-tour="recall-save"]').click();
  await expect(page.locator('.recall-card')).not.toContainText('Retained');
  await finish(page, before);
});

test('a denied clipboard write does not complete the copy lesson', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true, value: { writeText: async () => { throw new DOMException('Denied for test', 'NotAllowedError'); } },
    });
  });
  const before = await begin(page, 'freelance');
  await page.locator('[data-tour="freelance-add"]').click();
  await page.locator('[data-tour="freelance-example"]').click();
  await page.locator('[data-tour="freelance-save"]').click();
  await next(page, 'freelance-classify');
  await page.locator('[data-tour="freelance-verdict"]').selectOption('Apply Now');
  await next(page, 'freelance-research-examples');
  await page.locator('[data-tour="freelance-research-examples"]').click();
  await expect(page.locator('.freelance-table tbody tr')).toHaveCount(10);
  await next(page, 'freelance-filters');
  await next(page, 'freelance-brief');
  for (const checkbox of (await page.locator('[data-tour="freelance-select"]').all()).slice(0, 5)) await checkbox.check();
  await next(page, 'freelance-copy');
  await page.locator('[data-tour="freelance-copy"]').click();
  await expect(page.locator('[data-tour="freelance-copy-error"]')).toBeVisible();
  await expect(page.locator('[data-tour="freelance-copy-success"]')).toHaveCount(0);
  await expect(page.locator('.tutorial-panel').getByRole('button', { name: 'Next', exact: true })).toBeDisabled();
  await page.locator('.tutorial-panel').getByRole('button', { name: 'Skip step', exact: true }).click();
  await finish(page, before);
});

test('the compact full-map chapter guides controls without silently adopting a roadmap', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  const before = await begin(page, 'full-map');
  await page.locator('[data-tour="full-roadmap-open"]').click();
  await expect(page.locator('.tutorial-map-guided')).toBeVisible();
  await expect(page.locator('.full-roadmap-modal')).toContainText('Tracker v1.0.0');
  await next(page, 'full-map-zoom');
  await expect(page.locator('.tutorial-map-copy > strong')).toBeInViewport({ ratio: 1 });
  await expect(page.locator('.tutorial-map-actions').getByRole('button', { name: 'Next', exact: true })).toBeInViewport({ ratio: 1 });
  await page.locator('[data-tour="full-map-zoom-in"]').click();
  await next(page, 'full-map-inspect');
  await page.locator('[data-tour="full-map-last-node"]').click();
  await expect(page.locator('.full-roadmap-details')).toContainText('View only');
  await expect.poll(() => page.locator('.full-roadmap-viewport').evaluate(element => element.clientHeight)).toBeGreaterThan(80);
  await next(page, 'full-map-current');
  await page.locator('[data-tour="full-map-current"]').click();
  await next(page, 'full-map-pan');
  await next(page, 'full-map-fit');
  await page.locator('[data-tour="full-map-fit"]').click();
  await next(page, 'full-map-close');
  await page.locator('[data-tour="dialog-close"]').click();
  await expect(page.locator('.tutorial-panel').getByRole('button', { name: 'Next', exact: true })).toBeEnabled();
  await finish(page, before);
});

test('Show this step reopens a roadmap after returning from a different route', async ({ page }) => {
  const before = await begin(page, 'full-map');
  await page.locator('[data-tour="full-roadmap-open"]').click();
  await next(page, 'full-map-zoom');
  await page.getByRole('link', { name: 'Review the newer operation documents', exact: true }).click();
  await expect(page).toHaveURL(/#\/sources$/);
  await page.getByRole('button', { name: 'Show this step', exact: true }).click();
  await expect(page).toHaveURL(/#\/mission\/fabric$/);
  await expect(page.locator('.full-roadmap-modal')).toBeVisible();
  await expect(page.locator('.tutorial-map-guided')).toHaveAttribute('data-step', 'full-map-zoom');
  await page.locator('[data-tour="full-map-zoom-in"]').click();
  await expect(page.locator('.tutorial-panel').getByRole('button', { name: 'Next', exact: true })).toBeEnabled();
  await finish(page, before);
});

for (const viewport of [{ width: 568, height: 320 }, { width: 640, height: 360 }]) {
  test(`landscape ${viewport.width}x${viewport.height} keeps instructions and navigation reachable`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('./');
    const before = await snapshot(page);
    await page.locator('header').getByRole('button', { name: 'Start tutorial', exact: true }).click();
    await expect.poll(() => page.locator('.tutorial-content').evaluate(element => element.clientHeight)).toBeGreaterThanOrEqual(80);
    await expect(page.locator('.tutorial-body')).toBeInViewport();
    await next(page, 'overview-today');
    await finish(page, before);
  });
}
