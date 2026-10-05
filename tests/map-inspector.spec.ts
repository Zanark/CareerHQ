import { expect, test, type Locator, type Page } from '@playwright/test';

const key = 'careerhq.workspace.v1';

async function open(page: Page, mission = 'pattern') {
  await page.goto(`./#/mission/${mission}`);
  await page.getByRole('button', { name: 'Full roadmap', exact: true }).click();
  return page.getByRole('dialog');
}

async function canvasHeight(dialog: Locator) {
  return (await dialog.locator('.full-roadmap-viewport').boundingBox())!.height;
}

for (const { width, height } of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 568 }, { width: 568, height: 320 }]) {
  test(`the whole bottom panel collapses and returns real canvas space at ${width}x${height}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height });
    const dialog = await open(page);
    const before = await page.evaluate(key => localStorage.getItem(key), key);
    await expect(dialog.getByRole('button', { name: 'Show details', exact: true })).toHaveAttribute('aria-expanded', 'false');
    await dialog.getByLabel('Find a roadmap topic').selectOption('pattern-v3-section-42');
    const inspector = dialog.locator('.full-roadmap-inspector');
    await expect(inspector).toHaveAttribute('data-expanded', 'true');
    const expanded = await canvasHeight(dialog);
    const view = await dialog.locator('.full-roadmap-viewport').evaluate(element => ({ left: element.scrollLeft, top: element.scrollTop }));
    await dialog.getByRole('button', { name: 'Hide details', exact: true }).click();
    const show = dialog.getByRole('button', { name: 'Show details', exact: true });
    await expect(show).toBeFocused();
    await expect(show).toHaveAttribute('aria-expanded', 'false');
    await expect(inspector.locator('.full-roadmap-inspector-content')).toBeHidden();
    await expect.poll(() => canvasHeight(dialog)).toBeGreaterThan(expanded + 20);
    expect((await inspector.boundingBox())!.height).toBeLessThanOrEqual(45);
    await expect(dialog.getByLabel('Roadmap zoom level')).toHaveText('100%');
    expect(await dialog.locator('.full-roadmap-viewport').evaluate(element => ({ left: element.scrollLeft, top: element.scrollTop }))).toEqual(view);
    await expect(dialog.locator('[data-full-checkpoint="pattern-v3-section-42"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(dialog.locator('.full-roadmap-inspector-title')).toHaveText('C# Implementation Toolkit');
    await show.press('Enter');
    await expect(inspector).toHaveAttribute('data-expanded', 'true');
    await expect(inspector.locator('.full-roadmap-inspector-content')).toBeVisible();
    await expect.poll(async () => Math.abs(await canvasHeight(dialog) - expanded)).toBeLessThan(2);
    const hide = dialog.getByRole('button', { name: 'Hide details', exact: true });
    const controlled = await hide.getAttribute('aria-controls');
    expect(await hide.evaluate((button, id) => button.ownerDocument.getElementById(id!)?.hidden, controlled)).toBe(false);
    await hide.press('Space');
    await dialog.getByLabel('Find a roadmap topic').selectOption('pattern-v3-section-23');
    await expect(inspector).toHaveAttribute('data-expanded', 'false');
    await expect(inspector.locator('.full-roadmap-inspector-title')).toHaveText('DFS');
    await testInfo.attach('more-room-for-the-graph', { body: await page.screenshot(), contentType: 'image/png' });
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
  });
}

test('collapse preference survives System problem, case and concept view changes', async ({ page }) => {
  const dialog = await open(page, 'system');
  const before = await page.evaluate(key => localStorage.getItem(key), key);
  await dialog.getByLabel('Find a roadmap topic').selectOption('practice-case-a');
  await expect(dialog.getByRole('link', { name: 'Open this case-study exercise', exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Hide details', exact: true }).click();
  await dialog.getByLabel('Find a roadmap topic').selectOption('practice-case-b');
  await expect(dialog.locator('.full-roadmap-inspector')).toHaveAttribute('data-expanded', 'false');
  await dialog.getByLabel('Roadmap view').selectOption('concepts');
  const option = dialog.getByLabel('Find a System Design concept').locator('option').filter({ hasText: 'Reliability Patterns / Resiliency / Circuit Breaker' });
  await dialog.getByLabel('Find a System Design concept').selectOption((await option.getAttribute('value'))!);
  await expect(dialog.locator('.full-roadmap-inspector')).toHaveAttribute('data-expanded', 'false');
  await expect(dialog.locator('.full-roadmap-inspector-title')).toHaveText('Circuit Breaker');
  const collapsed = await canvasHeight(dialog);
  await dialog.getByRole('button', { name: 'Show details', exact: true }).click();
  await expect.poll(() => canvasHeight(dialog)).toBeLessThan(collapsed - 20);
  await expect(dialog.locator('.system-concept-inspector')).toBeVisible();
  await dialog.getByLabel('Roadmap view').selectOption('saved');
  await expect(dialog.locator('.full-roadmap-inspector')).toHaveAttribute('data-expanded', 'true');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
});

test('fit-all recalculates after collapse, and reopening starts with a compact bar', async ({ page }) => {
  const dialog = await open(page, 'fabric');
  await dialog.locator('[data-full-checkpoint]').last().click();
  await expect(dialog.locator('.full-roadmap-inspector')).toHaveAttribute('data-expanded', 'true');
  await dialog.getByRole('button', { name: 'Fit all', exact: true }).click();
  await dialog.getByRole('button', { name: 'Hide details', exact: true }).click();
  await expect.poll(() => dialog.evaluate(root => {
    const viewport = root.querySelector('.full-roadmap-viewport')!.getBoundingClientRect();
    return [...root.querySelectorAll('[data-full-checkpoint]')].every(node => {
      const box = node.getBoundingClientRect();
      return box.left >= viewport.left - 1 && box.right <= viewport.right + 1 &&
        box.top >= viewport.top - 1 && box.bottom <= viewport.bottom + 1;
    });
  })).toBe(true);
  await dialog.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page.getByRole('button', { name: 'Full roadmap', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Show details', exact: true })).toHaveAttribute('aria-expanded', 'false');
});

test('guided inspection asks to show hidden details instead of reopening them against the user choice', async ({ page }) => {
  await page.goto('./');
  const before = await page.evaluate(key => localStorage.getItem(key), key);
  await page.locator('header').getByRole('button', { name: 'Start tutorial', exact: true }).click();
  const coach = page.locator('.tutorial-panel');
  await coach.getByLabel('Tutorial chapter').selectOption('full-map');
  await page.locator('[data-tour="full-roadmap-open"]').click();
  await page.getByRole('button', { name: 'Show details', exact: true }).click();
  await page.getByRole('button', { name: 'Hide details', exact: true }).click();
  await coach.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('button', { name: 'Zoom in', exact: true }).click();
  await coach.getByRole('button', { name: 'Next', exact: true }).click();
  await page.locator('[data-tour="full-map-last-node"]').click();
  await expect(coach.getByRole('button', { name: 'Next', exact: true })).toBeDisabled();
  await expect(page.locator('.tutorial-cues')).toHaveAttribute('data-cue-for', 'map-details-toggle');
  await page.getByRole('button', { name: 'Show details', exact: true }).click();
  await expect(coach.getByRole('button', { name: 'Next', exact: true })).toBeEnabled();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
});
