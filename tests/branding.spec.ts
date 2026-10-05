import { expect, test } from '@playwright/test';

const storageKey = 'careerhq.workspace.v1';

for (const theme of ['dark', 'light']) {
  for (const width of [1440, 390, 320]) {
    test(`career OS network identity fits ${theme} navigation at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('careerhq.theme.v1', value), theme);
      await page.goto('./#/missions');
      await expect(page.getByRole('heading', { name: 'Missions', exact: true, level: 1 })).toBeVisible();
      const before = await page.evaluate(key => localStorage.getItem(key), storageKey);
      if (width < 761) await page.getByRole('button', { name: 'Open navigation', exact: true }).click();

      const brand = page.getByRole('link', { name: 'CareerOS - Career operating system', exact: true });
      await expect(brand).toBeVisible();
      await expect(brand.locator('.brand-name')).toHaveText('CareerOS');
      await expect(page).toHaveTitle('Missions - CareerOS');
      await expect(page.locator('.breadcrumbs')).toContainText('CareerOS');
      await expect(page.getByRole('complementary', { name: 'Main navigation' }).getByRole('link', { name: 'Overview' })).toHaveCount(1);
      await expect(brand.locator('.brand-tagline')).toHaveText('Career OS');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      const mark = brand.locator('img');
      await expect(mark).toHaveAttribute('alt', '');
      const source = await mark.getAttribute('src');
      expect(source).toMatch(/^\/CareerOS\/assets\/careerhq-mark-.+\.svg$/);
      await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', source!);
      expect(await mark.evaluate(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth === 64)).toBe(true);

      const sidebar = await page.locator('.sidebar').boundingBox();
      for (const part of ['.brand-mark', '.brand-name', '.brand-tagline']) {
        const box = await brand.locator(part).boundingBox();
        expect(box!.x).toBeGreaterThanOrEqual(sidebar!.x);
        expect(box!.x + box!.width).toBeLessThanOrEqual(sidebar!.x + sidebar!.width);
      }
      expect(await page.locator('.sidebar').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
      const path = testInfo.outputPath(`identity-${theme}-${width}.png`);
      await page.screenshot({ path });
      await testInfo.attach('career-os-identity', { path, contentType: 'image/png' });

      await brand.click();
      await expect(page.getByRole('heading', { name: 'Career graph', exact: true, level: 1 })).toBeVisible();
      if (width < 761) await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toHaveAttribute('aria-expanded', 'false');
      expect(await page.evaluate(key => localStorage.getItem(key), storageKey)).toBe(before);
    });
  }
}

test('the recovery screen uses the same system mark without replacing unreadable data', async ({ page }) => {
  const raw = '{"unreadable-workspace":';
  await page.addInitScript(({ key, value }) => localStorage.setItem(key, value), { key: storageKey, value: raw });
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Your existing data comes first.' })).toBeVisible();
  const mark = page.locator('.recovery-toolbar .brand-mark');
  await expect(mark).toBeVisible();
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', (await mark.getAttribute('src'))!);
  expect(await mark.evaluate(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth === 64)).toBe(true);
  expect(await page.evaluate(key => localStorage.getItem(key), storageKey)).toBe(raw);
});
