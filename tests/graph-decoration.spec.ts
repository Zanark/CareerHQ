import { expect, test } from '@playwright/test';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });
const key = 'careerhq.workspace.v1';

for (const width of [1440, 320]) {
  test(`rings and sparks can be hidden without changing the filtered graph at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./#/home');
    const scene = page.locator('.career-graph-scene');
    await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
    const toggle = page.getByRole('checkbox', { name: 'Rings & sparks', exact: true });
    await expect(toggle).toBeChecked();
    await expect(scene).toHaveAttribute('data-decoration-visible', 'true');
    const raw = await page.evaluate(key => localStorage.getItem(key), key);
    await page.getByLabel('Filter career graph by mission').selectOption('pattern');
    await expect.poll(async () => Number(await scene.getAttribute('data-node-count'))).toBeLessThan(100);
    await page.getByRole('button', { name: 'Zoom career graph in', exact: true }).click();
    await expect.poll(async () => Number(await scene.getAttribute('data-cursor-offset'))).toBeLessThan(56);
    const force = await scene.getAttribute('data-cursor-offset');
    const nodes = await scene.getAttribute('data-node-count');
    const edges = await scene.getAttribute('data-edge-count');
    const canvas = scene.locator('canvas');
    await canvas.evaluate(element => element.setAttribute('data-original-decoration-canvas', 'true'));
    await page.mouse.move(1, 1);
    const before = await canvas.screenshot();
    await toggle.uncheck();
    await expect(scene).toHaveAttribute('data-decoration-visible', 'false');
    await expect(page.getByRole('button', { name: 'Clear center', exact: true })).toBeDisabled();
    await expect(scene.locator('.career-graph-scene__space-note')).toHaveText('Orange links: connections · Orbit views and sparks hidden');
    const hidden = await canvas.screenshot();
    expect(hidden.equals(before)).toBe(false);
    await testInfo.attach('rings-and-sparks-visible', { body: before, contentType: 'image/png' });
    await testInfo.attach('rings-and-sparks-hidden', { body: hidden, contentType: 'image/png' });
    await expect(canvas).toHaveAttribute('data-original-decoration-canvas', 'true');
    await expect(scene).toHaveAttribute('data-node-count', nodes!);
    await expect(scene).toHaveAttribute('data-edge-count', edges!);
    await expect(scene).toHaveAttribute('data-cursor-offset', force!);
    await toggle.check();
    await expect(scene).toHaveAttribute('data-decoration-visible', 'true');
    const clear = page.getByRole('button', { name: 'Clear center', exact: true });
    await clear.click();
    await expect(scene).toHaveAttribute('data-decoration-mode', 'outer-rim-only');
    await toggle.uncheck();
    await toggle.check();
    await expect(clear).toHaveAttribute('aria-pressed', 'true');
    await expect(scene).toHaveAttribute('data-decoration-mode', 'outer-rim-only');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(raw);
  });
}
