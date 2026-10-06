import { expect, test } from '@playwright/test';
import { MISSION_COLORS } from '../src/missionVisuals';

const storageKey = 'careerhq.workspace.v1';

for (const theme of ['dark', 'light']) {
  for (const width of [1440, 390, 320]) {
    test(`career OS network identity fits ${theme} navigation at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(value => localStorage.setItem('careerhq.theme.v1', value), theme);
      await page.goto('./#/missions');
      await expect(page.getByRole('heading', { name: 'Missions', exact: true, level: 1 })).toBeVisible();
      const before = await page.evaluate(key => localStorage.getItem(key), storageKey);
      if (width < 761) {
        await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
        await expect(page.locator('.sidebar')).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)');
      }

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

test('the graph-inspired mark retains its opaque core and colored orbital identity at favicon sizes', async ({ page }, testInfo) => {
  await page.goto('./#/hq');
  const mark = page.locator('.brand-mark');
  const url = (await mark.getAttribute('src'))!;
  const response = await page.request.get(url);
  expect(response.ok()).toBe(true);
  const source = await response.text();
  const structure = await page.evaluate(svg => {
    const document = new DOMParser().parseFromString(svg, 'image/svg+xml');
    return {
      errors: document.querySelectorAll('parsererror').length,
      active: [...document.querySelectorAll('#active-orbits ellipse')].map(orbit => orbit.getAttribute('stroke')),
      quiet: document.querySelector('#quiet-orbit')?.getAttribute('stroke'),
      dots: document.querySelectorAll('#orbit-dots > g').length,
      sphereGradients: document.querySelectorAll('[id$="-planet"]').length,
      core: document.querySelector('#career-core')?.getAttribute('fill'),
      externalOrExecutable: document.querySelectorAll('script, image, foreignObject, animate, animateTransform, [href], [xlink\\:href]').length,
    };
  }, source);
  expect(structure).toEqual({
    errors: 0, active: [MISSION_COLORS.pattern, MISSION_COLORS.system, MISSION_COLORS.escape], quiet: MISSION_COLORS.fabric,
    dots: 4, sphereGradients: 0, core: '#EEE8D5', externalOrExecutable: 0,
  });
  const samples = await page.evaluate(async url => {
    const image = new Image();
    image.src = url;
    await image.decode();
    return [16, 24, 32, 44, 96].map(size => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      const context = canvas.getContext('2d')!;
      context.drawImage(image, 0, 0, size, size);
      const { data } = context.getImageData(0, 0, size, size);
      const center = (Math.floor(size / 2) * size + Math.floor(size / 2)) * 4;
      let green = 0, blue = 0, orange = 0;
      for (let pixel = 0; pixel < data.length; pixel += 4) {
        const [r, g, b, a] = data.subarray(pixel, pixel + 4);
        if (a < 200) continue;
        if (g > r + 12 && g > b + 8) green++;
        if (b > r + 12 && b > g + 8) blue++;
        if (r > g + 20 && r > b + 25) orange++;
      }
      return { size, core: Array.from(data.subarray(center, center + 4)), green, blue, orange };
    });
  }, url);
  for (const sample of samples) {
    expect(sample.core[0]).toBeGreaterThan(200);
    expect(sample.core[1]).toBeGreaterThan(190);
    expect(sample.core[2]).toBeGreaterThan(165);
    expect(sample.core[3]).toBe(255);
    if (sample.size >= 24) expect(sample.core).toEqual([238, 232, 213, 255]);
    expect(sample.green).toBe(0);
    expect(sample.blue).toBeGreaterThan(0);
    expect(sample.orange).toBeGreaterThan(0);
  }
  await testInfo.attach('graph-logo-size-samples', { body: JSON.stringify(samples, null, 2), contentType: 'application/json' });
});
