import { test, expect, type Page } from '@playwright/test';

async function expectVertical(page: Page) {
  const lanes = await page.locator('.roadmap-lane').all();
  expect(lanes.length).toBeGreaterThan(0);
  for (const lane of lanes) {
    const stops = await lane.locator('.roadmap-stop').all();
    let previous: { x: number; y: number; width: number; height: number } | null = null;
    for (const stop of stops) {
      const bounds = await stop.boundingBox();
      expect(bounds).not.toBeNull();
      if (previous && bounds) {
        expect(bounds.y).toBeGreaterThanOrEqual(previous.y + previous.height + 15);
        expect(Math.abs(bounds.x - previous.x)).toBeLessThan(1);
      }
      previous = bounds;
    }
    if (stops.length > 1) {
      expect(await stops[0].evaluate(element => getComputedStyle(element, '::after').content)).toContain('\u2193');
    }
  }
}

for (const width of [1440, 1024, 390]) {
  test(`roadmap progression remains vertical at ${width}px and in print`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('./#/roadmap');
    await expect(page.getByRole('heading', { name: 'Roadmap', level: 1, exact: true })).toBeVisible();
    const before = await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'));
    await expectVertical(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
    const screenshot = testInfo.outputPath(`vertical-roadmap-${width}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });
    await testInfo.attach(`vertical-roadmap-${width}`, { path: screenshot, contentType: 'image/png' });
    await page.getByRole('checkbox', { name: 'In-focus missions only' }).check();
    await expect(page.locator('.roadmap-lane')).toHaveCount(3);
    await expectVertical(page);
    await page.emulateMedia({ media: 'print' });
    await expectVertical(page);
    await page.emulateMedia({ media: 'screen' });
    await page.getByRole('link', { name: /Pattern Forge\s+DSA/ }).click();
    await expect(page.getByRole('heading', { name: 'DSA', level: 1, exact: true })).toBeVisible();
    const rows = await page.locator('.checkpoint-row').all();
    for (let index = 1; index < rows.length; index++) {
      const before = await rows[index - 1].boundingBox();
      const after = await rows[index].boundingBox();
      expect(after!.y).toBeGreaterThanOrEqual(before!.y + before!.height);
    }
    expect(await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'))).toBe(before);
  });
}
