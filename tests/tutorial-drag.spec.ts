import { expect, test, type Locator, type Page } from '@playwright/test';

const key = 'careerhq.workspace.v1';
const handleName = 'Drag to move tutorial window';

async function start(page: Page) {
  await page.goto('./');
  await page.locator('header').getByRole('button', { name: 'Start tutorial', exact: true }).click();
  await expect(page.locator('.tutorial-panel')).toHaveAttribute('data-step', 'welcome-intro');
}

async function dragTo(page: Page, left: number, top: number) {
  const coach = await page.locator('.tutorial-panel').boundingBox();
  const handle = await page.getByRole('button', { name: handleName, exact: true }).boundingBox();
  const x = handle!.x + handle!.width / 2;
  const y = handle!.y + handle!.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + left - coach!.x, y + top - coach!.y, { steps: 8 });
  await page.mouse.up();
}

async function atPosition(coach: Locator, left: number, top: number) {
  await expect.poll(async () => {
    const box = await coach.boundingBox();
    return !!box && Math.abs(box.x - left) < 2 && Math.abs(box.y - top) < 2;
  }).toBe(true);
}

async function contained(page: Page) {
  await expect.poll(async () => {
    const box = await page.locator('.tutorial-panel').boundingBox();
    const viewport = page.viewportSize()!;
    return !!box && box.x >= 9 && box.y >= 9 &&
      box.x + box.width <= viewport.width - 9 && box.y + box.height <= viewport.height - 9;
  }).toBe(true);
}

async function cueFollowsNext(page: Page) {
  await expect(page.locator('.tutorial-cues')).toHaveAttribute('data-cue-for', 'next');
  await expect.poll(async () => {
    const button = await page.locator('.tutorial-panel').getByRole('button', { name: 'Next', exact: true }).boundingBox();
    const ring = await page.locator('.tutorial-target-ring').boundingBox();
    return !!button && !!ring && Math.abs(ring.x - button.x + 6) < 2 && Math.abs(ring.y - button.y + 6) < 2;
  }).toBe(true);
}

for (const theme of ['dark', 'light']) {
  test(`the ${theme} coach moves away from capacity controls and stays put across steps, scroll and collapse`, async ({ page }, testInfo) => {
    await page.addInitScript(theme => localStorage.setItem('careerhq.theme.v1', theme), theme);
    await start(page);
    const before = await page.evaluate(key => localStorage.getItem(key), key);
    const coach = page.locator('.tutorial-panel');
    await coach.getByLabel('Tutorial chapter').selectOption('plan');
    await expect(coach).toHaveAttribute('data-step', 'plan-capacity');
    await dragTo(page, 30, 90);
    await expect(coach).toHaveAttribute('data-position', 'manual');
    await atPosition(coach, 30, 90);
    const gentle = page.locator('[data-tour="capacity"]').getByRole('button', { name: 'Gentle', exact: true });
    await gentle.click();
    await atPosition(coach, 30, 90);
    await cueFollowsNext(page);
    await testInfo.attach('moved-away-from-controls', { body: await page.screenshot(), contentType: 'image/png' });
    await coach.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(coach).toHaveAttribute('data-step', 'plan-actions');
    await atPosition(coach, 30, 90);
    await page.evaluate(() => window.scrollTo(0, 200));
    await atPosition(coach, 30, 90);
    await coach.getByRole('button', { name: 'Collapse tutorial panel', exact: true }).click();
    await atPosition(coach, 30, 90);
    await coach.getByRole('button', { name: 'Expand tutorial panel', exact: true }).click();
    await atPosition(coach, 30, 90);
    await coach.getByRole('button', { name: 'Reset tutorial position', exact: true }).click();
    await expect(coach).toHaveAttribute('data-position', 'auto');
    await coach.getByRole('button', { name: 'Exit tutorial', exact: true }).click();
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
  });
}

test('the Next glow follows the moving window while pointer capture is active', async ({ page }) => {
  await start(page);
  const box = await page.getByRole('button', { name: handleName, exact: true }).boundingBox();
  await page.mouse.move(box!.x + 20, box!.y + 10);
  await page.mouse.down();
  await page.mouse.move(box!.x - 200, box!.y - 150, { steps: 5 });
  await expect(page.locator('.tutorial-panel')).toHaveClass(/tutorial-dragging/);
  await cueFollowsNext(page);
  await page.mouse.up();
  await expect(page.locator('.tutorial-panel')).not.toHaveClass(/tutorial-dragging/);
  await cueFollowsNext(page);
});

test('moving over a control hides its cue instead of painting it over the coach text', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await start(page);
  await page.locator('.tutorial-panel').getByLabel('Tutorial chapter').selectOption('plan');
  const target = page.locator('[data-tour="capacity"]').getByRole('button', { name: 'Gentle', exact: true });
  await expect(page.locator('.tutorial-target-ring')).toBeVisible();
  const button = await target.boundingBox();
  const panel = await page.locator('.tutorial-panel').boundingBox();
  await dragTo(page, Math.min(button!.x - 30, 1440 - panel!.width - 10), button!.y - 70);
  await expect(page.locator('.tutorial-target-ring')).toHaveCount(0);
  await dragTo(page, 30, 60);
  await expect(page.locator('.tutorial-target-ring')).toBeVisible();
  await expect(page.locator('.tutorial-glow-halo')).toHaveCSS('animation-name', 'none');
});

test('keyboard movement, reset and drag cancellation do not advance or exit the tutorial', async ({ page }) => {
  await start(page);
  const coach = page.locator('.tutorial-panel');
  const handle = page.getByRole('button', { name: handleName, exact: true });
  await expect(coach.getByRole('button', { name: 'Reset tutorial position' })).toBeDisabled();
  const initial = await coach.boundingBox();
  await handle.focus();
  await handle.press('Shift+ArrowLeft');
  await handle.press('ArrowUp');
  await atPosition(coach, initial!.x - 40, initial!.y - 10);
  await handle.press('Home');
  await expect(coach).toHaveAttribute('data-position', 'auto');
  await atPosition(coach, initial!.x, initial!.y);
  const box = await handle.boundingBox();
  await page.mouse.move(box!.x + 20, box!.y + 10);
  await page.mouse.down();
  await page.mouse.move(box!.x - 180, box!.y - 100, { steps: 5 });
  await expect(coach).toHaveAttribute('data-position', 'manual');
  await page.keyboard.press('Escape');
  await page.mouse.up();
  await expect(coach).toHaveAttribute('data-position', 'auto');
  await expect(coach).toHaveAttribute('data-step', 'welcome-intro');
  await atPosition(coach, initial!.x, initial!.y);
});

test('dragging beyond the viewport and resizing cannot strand the window offscreen', async ({ page }) => {
  await start(page);
  await dragTo(page, -400, -400);
  await atPosition(page.locator('.tutorial-panel'), 10, 10);
  await dragTo(page, 2400, 1800);
  await contained(page);
  await page.setViewportSize({ width: 900, height: 650 });
  await contained(page);
  await page.setViewportSize({ width: 320, height: 568 });
  await contained(page);
  await page.setViewportSize({ width: 568, height: 320 });
  await contained(page);
  await expect(page.getByRole('button', { name: handleName, exact: true })).toBeInViewport();
  await expect(page.locator('.tutorial-panel').getByRole('button', { name: 'Exit tutorial', exact: true })).toBeInViewport();
});

test('dragging works inside native dialogs and retains the position after closing them', async ({ page }) => {
  await start(page);
  const coach = page.locator('.tutorial-panel');
  await dragTo(page, 30, 60);
  await coach.getByLabel('Tutorial chapter').selectOption('evidence');
  await page.locator('[data-tour="record-evidence"]').click();
  await expect(page.locator('dialog[open] .tutorial-panel')).toHaveCount(1);
  await atPosition(coach, 30, 60);
  await dragTo(page, 900, 80);
  await atPosition(coach, 900, 80);
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  await atPosition(coach, 900, 80);
});

test('compact map guidance stays docked and restores the floating position afterward', async ({ page }) => {
  await start(page);
  const coach = page.locator('.tutorial-panel');
  await dragTo(page, 30, 60);
  await coach.getByLabel('Tutorial chapter').selectOption('full-map');
  await page.locator('[data-tour="full-roadmap-open"]').click();
  await expect(page.locator('.tutorial-map-guide')).toHaveCSS('position', 'static');
  await expect(page.getByRole('button', { name: handleName, exact: true })).toHaveCount(0);
  expect((await page.locator('.full-roadmap-viewport').boundingBox())!.height).toBeGreaterThan(100);
  await page.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await expect(coach).toHaveAttribute('data-position', 'manual');
  await atPosition(coach, 30, 60);
});

test('restart and exit discard manual placement without writing workspace data', async ({ page }) => {
  await start(page);
  const before = await page.evaluate(() => ({ ...localStorage }));
  await dragTo(page, 40, 90);
  await page.locator('.tutorial-panel').getByRole('button', { name: 'Restart tutorial', exact: true }).click();
  await expect(page.locator('.tutorial-panel')).toHaveAttribute('data-position', 'auto');
  await dragTo(page, 50, 100);
  await page.locator('.tutorial-panel').getByRole('button', { name: 'Exit tutorial', exact: true }).click();
  await page.mouse.move(600, 500);
  await expect(page.locator('.tutorial-panel, .tutorial-cues')).toHaveCount(0);
  expect(await page.evaluate(() => ({ ...localStorage }))).toEqual(before);
  await page.locator('header').getByRole('button', { name: 'Start tutorial', exact: true }).click();
  await expect(page.locator('.tutorial-panel')).toHaveAttribute('data-position', 'auto');
});

test.describe('touch movement', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test('the handle drags vertically without scrolling the page and touch cancellation restores placement', async ({ page, context }) => {
    await start(page);
    const coach = page.locator('.tutorial-panel');
    const initial = await coach.boundingBox();
    const handle = await page.getByRole('button', { name: handleName, exact: true }).boundingBox();
    const scroll = await page.evaluate(() => window.scrollY);
    const session = await context.newCDPSession(page);
    const point = { x: handle!.x + 30, y: handle!.y + 12 };
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...point, id: 1 }] });
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: point.x, y: point.y - 150, id: 1 }] });
    await expect(coach).toHaveAttribute('data-position', 'manual');
    await atPosition(coach, 10, initial!.y - 150);
    expect(await page.evaluate(() => window.scrollY)).toBe(scroll);
    await session.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
    await expect(coach).toHaveAttribute('data-position', 'auto');
    await atPosition(coach, initial!.x, initial!.y);
    const resetHandle = await page.getByRole('button', { name: handleName, exact: true }).boundingBox();
    const startPoint = { x: resetHandle!.x + 30, y: resetHandle!.y + 12 };
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...startPoint, id: 2 }] });
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: startPoint.x, y: startPoint.y - 120, id: 2 }] });
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await atPosition(coach, 10, initial!.y - 120);
    await expect(coach).not.toHaveClass(/tutorial-dragging/);
    await contained(page);
  });
});
