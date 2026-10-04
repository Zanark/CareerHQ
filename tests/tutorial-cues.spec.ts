import { test, expect, type Locator, type Page } from '@playwright/test';

async function start(page: Page) {
  await page.goto('./');
  await page.locator('header').getByRole('button', { name: 'Start tutorial', exact: true }).click();
  await expect(page.locator('.tutorial-panel')).toHaveAttribute('data-step', 'welcome-intro');
}

async function cueMatches(page: Page, target: Locator) {
  await expect(page.locator('.tutorial-target-ring')).toBeVisible();
  await expect(page.locator('.tutorial-pointing-hand')).toBeVisible();
  await expect.poll(async () => {
    const ring = await page.locator('.tutorial-target-ring').boundingBox();
    const button = await target.boundingBox();
    return !!ring && !!button && Math.abs(ring.x - button.x) < 2 &&
      Math.abs(ring.y - button.y) < 2 && Math.abs(ring.width - button.width) < 2 &&
      Math.abs(ring.height - button.height) < 2;
  }).toBe(true);
  const hit = await target.evaluate(element => {
    const bounds = element.getBoundingClientRect();
    return element.contains(document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2));
  });
  expect(hit, 'The cue must never intercept a real button click').toBe(true);
  const hand = await page.locator('.tutorial-pointing-hand').boundingBox();
  const viewport = page.viewportSize()!;
  expect(hand!.x).toBeGreaterThanOrEqual(0);
  expect(hand!.y).toBeGreaterThanOrEqual(0);
  expect(hand!.x + hand!.width).toBeLessThanOrEqual(viewport.width);
  expect(hand!.y + hand!.height).toBeLessThanOrEqual(viewport.height);
}

for (const width of [1440, 320]) {
  for (const theme of ['dark', 'light']) {
    test(`glowing tutorial cues guide real buttons and Next at ${width}px in ${theme}`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(theme => localStorage.setItem('careerhq.theme.v1', theme), theme);
      await start(page);
      const before = await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'));
      const coach = page.locator('.tutorial-panel');
      await cueMatches(page, coach.getByRole('button', { name: 'Next', exact: true }));
      await coach.getByRole('combobox', { name: 'Tutorial chapter' }).selectOption('plan');
      await expect(coach).toHaveAttribute('data-step', 'plan-capacity');
      const gentle = page.locator('[data-tour="capacity"]').getByRole('button', { name: 'Gentle', exact: true });
      await cueMatches(page, gentle);
      await expect(page.locator('.tutorial-glow-halo')).toHaveCSS('animation-name', 'tutorial-glow-breathe');
      await expect(page.locator('.tutorial-hand-motion')).toHaveCSS('animation-name', 'tutorial-hand-point');
      const glowSamples = await page.locator('.tutorial-glow-halo').evaluate(element => {
        const animation = element.getAnimations()[0];
        animation.pause();
        animation.currentTime = 0;
        const dim = Number(getComputedStyle(element).opacity);
        animation.currentTime = 900;
        return { dim, bright: Number(getComputedStyle(element).opacity), shadow: getComputedStyle(element).boxShadow };
      });
      expect(glowSamples.bright).toBeGreaterThan(glowSamples.dim + .4);
      expect(glowSamples.shadow).not.toBe('none');
      const path = testInfo.outputPath(`handholding-${theme}-${width}.png`);
      await page.screenshot({ path, fullPage: false, animations: 'allow' });
      await testInfo.attach('handholding', { path, contentType: 'image/png' });
      await gentle.click();
      await cueMatches(page, coach.getByRole('button', { name: 'Next', exact: true }));
      expect(await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'))).toBe(before);
      await coach.getByRole('button', { name: 'Exit tutorial', exact: true }).click();
      await expect(page.locator('.tutorial-cues, .tutorial-highlight')).toHaveCount(0);
    });
  }
}

test('glow and hand follow form buttons in the native dialog top layer', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await start(page);
  const coach = page.locator('.tutorial-panel');
  await coach.getByRole('combobox', { name: 'Tutorial chapter' }).selectOption('evidence');
  await page.locator('[data-tour="record-evidence"]').click();
  await coach.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.locator('dialog[open] .tutorial-cues')).toHaveCount(1);
  const example = page.locator('[data-tour="evidence-example"]');
  await cueMatches(page, example);
  await example.click();
  const save = page.locator('[data-tour="evidence-submit"]');
  await cueMatches(page, save);
  await save.click();
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  await cueMatches(page, coach.getByRole('button', { name: 'Next', exact: true }));
});

test('reduced motion retains a steady glow and pointing hand', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await start(page);
  const coach = page.locator('.tutorial-panel');
  await coach.getByRole('combobox', { name: 'Tutorial chapter' }).selectOption('plan');
  await cueMatches(page, page.locator('[data-tour="capacity"]').getByRole('button', { name: 'Gentle', exact: true }));
  await expect(page.locator('.tutorial-glow-halo')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.tutorial-hand-motion')).toHaveCSS('animation-name', 'none');
  await expect(page.locator('.tutorial-glow-halo')).not.toHaveCSS('box-shadow', 'none');
  expect(await page.locator('.tutorial-cues').evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
});

test('the ring follows scrolling and resizing without persistent observers after exit', async ({ page }) => {
  await start(page);
  const coach = page.locator('.tutorial-panel');
  await coach.getByRole('combobox', { name: 'Tutorial chapter' }).selectOption('tools');
  const search = page.locator('[data-tour="global-search"]');
  await expect(page.locator('.tutorial-pointing-hand')).toHaveCount(0);
  await search.fill('DSA');
  await coach.getByRole('button', { name: 'Next', exact: true }).click();
  const theme = page.getByRole('switch', { name: 'Dark theme' });
  await cueMatches(page, theme);
  await page.setViewportSize({ width: 390, height: 844 });
  await cueMatches(page, theme);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.locator('.tutorial-cues')).toHaveCount(0);
  await coach.getByRole('button', { name: 'Exit tutorial', exact: true }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator('.tutorial-cues')).toHaveCount(0);
});
