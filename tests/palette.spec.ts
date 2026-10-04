import { test, expect, type Page } from '@playwright/test';
import { PALETTE_COVER_MS, PALETTE_FADE_MS } from '../src/paletteTransition';

const key = 'careerhq.workspace.v1';
const toggle = (page: Page) => page.getByRole('switch', { name: 'Dark theme', exact: true });

async function pauseFade(page: Page, phase: 'cover' | 'reveal', time: number) {
  const veil = page.locator('.palette-veil');
  await expect(veil).toHaveAttribute('data-phase', phase);
  return veil.evaluate((element, time) => {
    const animation = element.getAnimations()[0];
    animation.pause();
    animation.currentTime = time;
    return { opacity: Number(getComputedStyle(element).opacity), duration: animation.effect!.getComputedTiming().duration };
  }, time);
}

async function finishPhase(page: Page) {
  await page.locator('.palette-veil').evaluate(element => element.getAnimations().forEach(animation => animation.finish()));
}

for (const initial of ['dark', 'light'] as const) {
test(`the ${initial} page changes palette behind an opaque layer and reveals it gradually`, async ({ page }, testInfo) => {
  await page.addInitScript(theme => localStorage.setItem('careerhq.theme.v1', theme), initial);
  await page.goto('./');
  const before = await page.evaluate(key => localStorage.getItem(key), key);
  await toggle(page).click();
  const cover = await pauseFade(page, 'cover', PALETTE_COVER_MS / 2);
  expect(cover.opacity).toBeGreaterThan(.35);
  expect(cover.opacity).toBeLessThan(.65);
  await expect(page.locator('html')).toHaveAttribute('data-theme', initial);
  await finishPhase(page);
  const midpoint = await pauseFade(page, 'reveal', (PALETTE_FADE_MS - PALETTE_COVER_MS) / 2);
  await expect(page.locator('html')).toHaveAttribute('data-theme', initial === 'dark' ? 'light' : 'dark');
  expect(midpoint.opacity).toBeGreaterThan(.35);
  expect(midpoint.opacity).toBeLessThan(.65);
  expect(midpoint.duration).toBeGreaterThanOrEqual(1000);
  const screenshot = testInfo.outputPath('palette-mid-transition.png');
  await page.screenshot({ path: screenshot, animations: 'allow' });
  await testInfo.attach('palette-mid-transition', { path: screenshot, contentType: 'image/png' });
  await finishPhase(page);
  await expect(page.locator('.palette-veil')).toHaveCount(0);
  await expect(page.locator('html')).not.toHaveAttribute('data-palette-transition');
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
});
}

test('the sun cutout and toggle stay clickable while a fade is in progress', async ({ page }) => {
  await page.goto('./');
  await toggle(page).click();
  await pauseFade(page, 'cover', 100);
  await expect(page.locator('.palette-veil')).not.toHaveCSS('clip-path', 'none');
  const clickable = await toggle(page).evaluate(button => {
    const bounds = button.getBoundingClientRect();
    return button.contains(document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2));
  });
  expect(clickable).toBe(true);
  await toggle(page).click();
  await expect(toggle(page)).toHaveAttribute('aria-checked', 'true');
  await finishPhase(page);
  await pauseFade(page, 'reveal', 200);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await finishPhase(page);
  await expect(page.locator('.palette-veil')).toHaveCount(0);
});

test('a late change queues a new fade without abruptly removing the current layer', async ({ page }) => {
  await page.goto('./');
  await toggle(page).click();
  await pauseFade(page, 'cover', 100);
  await finishPhase(page);
  await pauseFade(page, 'reveal', 400);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await toggle(page).click();
  await expect(toggle(page)).toHaveAttribute('aria-checked', 'true');
  await expect(page.locator('.palette-veil')).toHaveAttribute('data-phase', 'reveal');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await finishPhase(page);
  await pauseFade(page, 'cover', 100);
  await finishPhase(page);
  await pauseFade(page, 'reveal', 500);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await finishPhase(page);
  await expect(page.locator('html')).not.toHaveAttribute('data-palette-transition');
});

test('page fades do not require native view-transition support', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(document, 'startViewTransition', { value: undefined }));
  await page.goto('./');
  await toggle(page).click();
  await expect(page.locator('.palette-veil')).toHaveCount(1);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('.palette-veil')).toHaveCount(0);
});

test('reduced motion bypasses page fades entirely', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await toggle(page).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('html')).not.toHaveAttribute('data-palette-transition');
  await expect(page.locator('.palette-veil')).toHaveCount(0);
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
});

test('leaving tutorial practice cancels its fade without applying a stale theme later', async ({ page }) => {
  await page.goto('./');
  const before = await page.evaluate(key => localStorage.getItem(key), key);
  await page.locator('header').getByRole('button', { name: 'Start tutorial', exact: true }).click();
  await toggle(page).click();
  await pauseFade(page, 'cover', 100);
  await page.locator('.tutorial-panel').getByRole('button', { name: 'Exit tutorial', exact: true }).click();
  await expect(page.locator('.palette-veil')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.waitForTimeout(PALETTE_FADE_MS + 100);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => localStorage.getItem('careerhq.theme.v1'))).toBeNull();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
});
