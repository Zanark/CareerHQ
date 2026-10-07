import { expect, test, type Page } from '@playwright/test';
import { graphSkillCheckpointTitle } from '../src/tutorial/graphControls';

async function storage(page: Page) {
  return page.evaluate(() => Object.fromEntries(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)])));
}

async function begin(page: Page, chapter: string) {
  await page.goto('./#/hq');
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible();
  const before = await storage(page);
  await page.locator('header').getByRole('button', { name: 'Start tutorial', exact: true }).click();
  await page.getByLabel('Tutorial chapter', { exact: true }).selectOption(chapter);
  return before;
}

const coach = (page: Page) => page.locator('.tutorial-panel');
const nextButton = (page: Page) => coach(page).getByRole('button', { name: 'Next', exact: true });
async function next(page: Page, id: string) {
  await nextButton(page).click();
  await expect(coach(page)).toHaveAttribute('data-step', id);
}
async function finish(page: Page, before: Awaited<ReturnType<typeof storage>>) {
  await coach(page).getByRole('button', { name: 'Exit tutorial', exact: true }).click();
  await expect(page.locator('.app')).toHaveAttribute('data-workspace', 'saved');
  expect(await storage(page)).toEqual(before);
}

for (const width of [1440, 320]) {
  test(`graph tutorial demonstrates exact Show everything restoration at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const before = await begin(page, 'graph-view');
    const labels = page.getByRole('checkbox', { name: 'Node labels', exact: true });
    await expect(nextButton(page)).toBeDisabled();
    await labels.uncheck();
    await page.getByLabel('Filter career graph by mission', { exact: true }).selectOption('pattern');
    await page.getByRole('checkbox', { name: 'Checkpoints', exact: true }).uncheck();
    await next(page, 'graph-everything-on');
    await expect(nextButton(page)).toBeDisabled();
    await page.getByRole('checkbox', { name: 'Show everything', exact: true }).check();
    await expect(labels).toBeChecked();
    await expect(labels).toBeDisabled();
    await expect(page.getByLabel('Filter career graph by mission', { exact: true })).toHaveValue('all');
    await expect(page.getByRole('checkbox', { name: 'Checkpoints', exact: true })).toBeChecked();
    await expect(page.getByRole('slider', { name: 'Spark dots', exact: true })).toHaveValue('10');
    await expect(page.getByRole('slider', { name: 'Spark lines', exact: true })).toHaveValue('10');
    await expect(page.getByRole('slider', { name: 'Node spacing', exact: true })).toBeEnabled();
    await next(page, 'graph-everything-off');
    await expect(nextButton(page)).toBeDisabled();
    await page.getByRole('checkbox', { name: 'Show everything', exact: true }).uncheck();
    await expect(labels).not.toBeChecked();
    await expect(labels).toBeEnabled();
    await expect(page.getByLabel('Filter career graph by mission', { exact: true })).toHaveValue('pattern');
    await expect(page.getByRole('checkbox', { name: 'Checkpoints', exact: true })).not.toBeChecked();
    await next(page, 'graph-labels-show');
    await labels.check();
    await expect(nextButton(page)).toBeEnabled();
    if (width === 320) expect((await page.locator('.career-graph-stage').boundingBox())!.height).toBeGreaterThan(320);
    await finish(page, before);
  });

  test(`node spacing tutorial reaches both extremes and restores the original view at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const before = await begin(page, 'graph-view');
    await page.getByRole('checkbox', { name: 'Node labels', exact: true }).uncheck();
    await next(page, 'graph-everything-on');
    await page.getByRole('checkbox', { name: 'Show everything', exact: true }).check();
    await next(page, 'graph-everything-off');
    await page.getByRole('checkbox', { name: 'Show everything', exact: true }).uncheck();
    await next(page, 'graph-labels-show');
    await page.getByRole('checkbox', { name: 'Node labels', exact: true }).check();
    await next(page, 'graph-spacing-spread');
    await expect(nextButton(page)).toBeDisabled();
    const spacing = page.getByRole('slider', { name: 'Node spacing', exact: true });
    await spacing.focus();
    await spacing.press('End');
    await expect(spacing).toHaveValue('300');
    await next(page, 'graph-spacing-reset');
    await expect(nextButton(page)).toBeDisabled();
    await spacing.press('Home');
    await expect(spacing).toHaveValue('100');
    await expect(nextButton(page)).toBeEnabled();
    if (width === 320) expect((await page.locator('.career-graph-stage').boundingBox())!.height).toBeGreaterThan(320);
    await finish(page, before);
  });
}

for (const width of [1440, 390, 320]) {
test(`camera lessons require real movement and remain usable through native fullscreen at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const before = await begin(page, 'graph-camera');
  await page.getByLabel('Search career graph nodes', { exact: true }).fill('HashMap');
  await next(page, 'career-graph-select');
  await page.locator('[data-tour="career-graph-list"] button').first().click();
  await next(page, 'graph-focus-node');
  await expect(nextButton(page)).toBeDisabled();
  const focus = page.getByRole('button', { name: 'Focus node', exact: true });
  await focus.focus();
  await expect(nextButton(page)).toBeDisabled();
  await focus.click();
  await next(page, 'graph-zoom');
  await expect(nextButton(page)).toBeDisabled();
  await page.getByRole('button', { name: 'Zoom career graph in', exact: true }).click();
  await next(page, 'graph-rotate');
  await page.locator('.career-graph-keyboard > summary').click();
  await page.getByRole('button', { name: 'Rotate left', exact: true }).click();
  await next(page, 'graph-drag');
  await page.getByRole('button', { name: 'Close node details', exact: true }).click();
  const canvas = page.locator('.career-graph-page canvas');
  await canvas.scrollIntoViewIfNeeded();
  const point = await canvas.evaluate(element => {
    const box = element.getBoundingClientRect();
    for (let y = Math.max(12, box.top + 24); y < Math.min(innerHeight - 30, box.bottom - 30); y += 24) {
      for (let x = Math.min(innerWidth - 12, box.right - 24); x > Math.max(72, box.left + 72); x -= 24) {
        if ([0, 0.5, 1].every(t => document.elementFromPoint(x - 55 * t, y + 15 * t) === element)) return { x, y };
      }
    }
    return null;
  });
  expect(point, 'The canvas needs an actual uncovered drag path').not.toBeNull();
  const { x, y } = point!;
  await page.mouse.click(x, y);
  await expect(nextButton(page)).toBeDisabled();
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x - 55, y + 15, { steps: 5 });
  await page.mouse.up();
  await next(page, 'graph-frame');
  await page.getByRole('button', { name: 'Frame all', exact: true }).click();
  await next(page, 'graph-fullscreen');
  await page.getByRole('button', { name: 'Full screen', exact: true }).click();
  await expect(page.locator('.career-graph-stage-wrap > .tutorial-panel')).toBeVisible();
  await next(page, 'graph-fullscreen-exit');
  await page.getByRole('button', { name: 'Exit full screen', exact: true }).click();
  await next(page, 'graph-brief');
  await finish(page, before);
});
}

test('Show this step restores the requested graph panel after leaving the route', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const before = await begin(page, 'graph-motion');
  await page.getByRole('link', { name: 'Open Overview', exact: true }).click();
  await expect(page).toHaveURL(/#\/hq$/);
  await coach(page).getByRole('button', { name: 'Show this step', exact: true }).click();
  await expect(page).toHaveURL(/#\/home$/);
  await expect(coach(page)).toHaveAttribute('data-step', 'graph-rings-hide');
  await expect(page.locator('[data-graph-panel-trigger="view"]')).toHaveAttribute('aria-expanded', 'true');
  await expect(nextButton(page)).toBeDisabled();
  await page.getByRole('checkbox', { name: 'Rings', exact: true }).uncheck();
  await expect(nextButton(page)).toBeEnabled();
  await finish(page, before);
});

test('no-WebGL tutorial keeps named inspection honest and camera actions unearned', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: function (type: string, ...args: unknown[]) {
        return type.startsWith('webgl') ? null : Reflect.apply(original, this, [type, ...args]);
      },
    });
  });
  const before = await begin(page, 'graph-camera');
  await expect(page.locator('.career-graph-scene')).toHaveAttribute('data-scene-state', 'unavailable');
  await page.getByLabel('Search career graph nodes', { exact: true }).fill('HashMap');
  await next(page, 'career-graph-select');
  await page.locator('[data-tour="career-graph-list"] button').first().click();
  await next(page, 'graph-focus-node');
  await expect(page.getByRole('button', { name: 'Focus node', exact: true })).toBeDisabled();
  await expect(nextButton(page)).toBeDisabled();
  await expect(coach(page)).toContainText('unavailable');
  await coach(page).getByRole('button', { name: 'Skip step', exact: true }).click();
  await expect(coach(page)).toHaveAttribute('data-step', 'graph-zoom');
  await expect(nextButton(page)).toBeDisabled();
  await page.getByLabel('Tutorial chapter', { exact: true }).selectOption('graph-rings');
  await page.locator('.career-orbit-list [data-orbit-id="orbit:mission:pattern"]').click();
  await next(page, 'graph-ring-speed');
  const speed = page.getByRole('slider', { name: 'Rotation speed', exact: true });
  await speed.focus();
  await speed.press('End');
  for (let i = 0; i < 10; i++) await speed.press('ArrowLeft');
  await next(page, 'graph-ring-speed-reset');
  for (let i = 0; i < 10; i++) await speed.press('ArrowLeft');
  await next(page, 'graph-ring-stage');
  await page.getByLabel('Orbit stage or record group', { exact: true }).selectOption({ index: 1 });
  await next(page, 'graph-ring-basis');
  await page.locator('.career-orbit-basis > summary').click();
  await next(page, 'graph-ring-members');
  await page.locator('.career-orbit-member-details > summary').click();
  await page.getByLabel('Search orbit members', { exact: true }).fill('HashMap');
  await next(page, 'graph-focus-ring');
  await expect(nextButton(page)).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Focus ring', exact: true })).toBeDisabled();
  await coach(page).getByRole('button', { name: 'Skip step', exact: true }).click();
  await page.locator('.career-orbit-current').click();
  await next(page, 'graph-connections');
  await page.getByLabel('Search career graph nodes', { exact: true }).fill('HashMap');
  await page.locator('[data-tour="career-graph-list"] button').filter({
    has: page.locator('strong', { hasText: graphSkillCheckpointTitle }),
  }).click();
  await page.locator('.career-graph-connections > summary').click();
  await next(page, 'graph-connection-sources');
  await page.locator('.career-graph-connection-reason details > summary').first().click();
  await next(page, 'graph-hidden-inspect');
  await page.locator('.career-graph-connections li:has(.career-graph-connection-hidden) button').first().click();
  await expect(page.locator('[data-tour="career-graph-node"]')).toContainText('Details only:');
  await expect(nextButton(page)).toBeEnabled();
  await finish(page, before);
  expect(errors).toEqual([]);
});

for (const [chapter, step] of [
  ['graph-rings', 'graph-ring-select'], ['graph-view', 'graph-labels-hide'],
  ['graph-motion', 'graph-rings-hide'], ['graph-camera', 'career-graph-search'],
  ['career-graph', 'career-graph-intro'], ['graph-nodes', 'career-graph-visibility'],
]) {
  test(`${chapter} can be entered directly without creating records or changing real data`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const before = await begin(page, chapter);
    await expect(coach(page)).toHaveAttribute('data-step', step);
    await expect(page).toHaveURL(/#\/home$/);
    await expect(coach(page).getByRole('button', { name: 'Exit tutorial', exact: true })).toBeVisible();
    await finish(page, before);
  });
}
