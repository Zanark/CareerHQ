import { test, expect } from '@playwright/test';

const samples = [
  { route: 'hq', selector: 'body', original: 16, mobile: 16 },
  { route: 'hq', selector: '.overview-heading h1', original: 30, mobile: 27 },
  { route: 'hq', selector: '.overview-heading time', original: 12, mobile: 12 },
  { route: 'hq', selector: '.overview-summary strong', original: 27, mobile: 25 },
  { route: 'hq', selector: '.overview-summary > a > span', original: 12, mobile: 10 },
  { route: 'hq', selector: '.overview-row-content h3', original: 13, mobile: 13 },
  { route: 'hq', selector: '.overview-time', original: 11, mobile: 11 },
  { route: 'hq', selector: '.nav-item', original: 12, mobile: 12 },
  { route: 'plan', selector: '.timer-time', original: 51, mobile: 60 },
  { route: 'plan', selector: '.segmented button', original: 11, mobile: 11 },
  { route: 'plan', selector: '.plan-content h3', original: 15, mobile: 14 },
  { route: 'plan', selector: '.plan-content > p', original: 12, mobile: 11 },
  { route: 'settings', selector: '.data-lifecycle dt', original: 13, mobile: 13 },
  { route: 'settings', selector: '.data-lifecycle dd', original: 12, mobile: 12 },
  { route: 'settings', selector: '.stack-form label', original: 11, mobile: 11 },
  { route: 'settings', selector: '.stack-form textarea', original: 12, mobile: 12 },
  { route: 'roadmap', selector: '.tree-mission strong', original: 13, mobile: 12 },
  { route: 'roadmap', selector: '.tree-mission small', original: 10, mobile: 10 },
  { route: 'roadmap', selector: '.source-stage-heading select', original: 12, mobile: 12 },
  { route: 'guide', selector: '.guide-glossary h3', original: 15, mobile: 15 },
  { route: 'guide', selector: '.guide-glossary p', original: 12, mobile: 12 },
];

for (const width of [1440, 390, 320]) {
  test(`typography is 1.5x the baseline without viewport overflow at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of [...new Set(samples.map(sample => sample.route))]) {
      await page.goto(`./#/${route}`);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      for (const sample of samples.filter(sample => sample.route === route)) {
        const expected = (width <= 480 ? sample.mobile : sample.original) * 1.5;
        await expect(page.locator(sample.selector).first()).toHaveCSS('font-size', `${expected}px`);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
      expect(await page.locator('body').evaluate(body => getComputedStyle(body).zoom)).toBe('1');
    }
    await page.goto('./');
    const path = testInfo.outputPath(`readable-fonts-${width}.png`);
    await page.screenshot({ path, fullPage: true });
    await testInfo.attach('enlarged-typography', { path, contentType: 'image/png' });
  });
}

test('the tutorial and native form labels use the same scale', async ({ page }) => {
  await page.goto('./');
  await page.locator('header').getByRole('button', { name: 'Start tutorial', exact: true }).click();
  await expect(page.locator('.tutorial-title')).toHaveCSS('font-size', '22.5px');
  await expect(page.locator('.tutorial-body')).toHaveCSS('font-size', '19.5px');
  await page.locator('.tutorial-panel').getByRole('combobox', { name: 'Tutorial chapter' }).selectOption('evidence');
  await page.locator('[data-tour="record-evidence"]').click();
  const dialog = page.getByRole('dialog', { name: 'Record progress', exact: true });
  await expect(dialog.locator('.stack-form label').first()).toHaveCSS('font-size', '16.5px');
  await expect(dialog.getByLabel('Artifact title')).toHaveCSS('font-size', '18px');
});

test('tutorial exit stays reachable when the larger mobile copy needs scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('./');
  await page.locator('header').getByRole('button', { name: 'Start tutorial', exact: true }).click();
  const coach = page.locator('.tutorial-panel');
  await coach.evaluate(panel => { panel.scrollTop = panel.scrollHeight; });
  const panel = await coach.boundingBox();
  const exit = coach.getByRole('button', { name: 'Exit tutorial', exact: true });
  const button = await exit.boundingBox();
  expect(button!.y).toBeGreaterThanOrEqual(panel!.y);
  await exit.click();
  await expect(coach).toHaveCount(0);
});
