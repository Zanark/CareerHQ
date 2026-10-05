import { expect, test } from '@playwright/test';
import { createInitialState, generatePlan, localDate, recordEvidence } from '../src/domain/engine';
import { getPackOutline } from '../src/domain/roadmapPacks/registry';

test('renamed Pages path loads assets and lazy modules while retaining same-origin legacy progress', async ({ page, baseURL }) => {
  let state = createInitialState(false, '2.0.0');
  state = recordEvidence(state, {
    missionId: 'pattern', checkpointId: state.missions.pattern.checkpointId,
    title: 'Synthetic pre-rename checkpoint', summary: 'Test-only evidence retained across a same-origin project-path rename.',
    kind: 'exercise', url: '', advance: true, criteriaConfirmed: true,
  });
  state.plans[localDate()] = generatePlan(state);
  const raw = JSON.stringify(state);
  const workspaceKey = 'careerhq.workspace.v1';
  const themeKey = 'careerhq.theme.v1';
  const oldURL = new URL('/CareerHQ/', baseURL).href;

  // A same-origin legacy shell establishes old-path storage without depending
  // on GitHub retaining the previous project URL after a repository rename.
  await page.route(oldURL, route => route.fulfill({ contentType: 'text/html', body: '<title>Synthetic legacy shell</title>' }));
  await page.goto(oldURL);
  await page.evaluate(({ workspaceKey, themeKey, raw }) => {
    localStorage.setItem(workspaceKey, raw);
    localStorage.setItem(themeKey, 'light');
  }, { workspaceKey, themeKey, raw });
  await page.unroute(oldURL);

  const paths: string[] = [];
  const failures: string[] = [];
  const errors: string[] = [];
  page.on('request', request => paths.push(new URL(request.url()).pathname));
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./#/mission/pattern');
  await expect(page).toHaveURL(/\/CareerOS\/#\/mission\/pattern$/);
  await expect(page.getByRole('heading', { level: 1, name: 'DSA', exact: true })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('script[type="module"][src]')).toHaveAttribute('src', /^\/CareerOS\/assets\/.+\.js$/);
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', /^\/CareerOS\/assets\/.+\.svg$/);
  expect(paths).toContain('/CareerOS/theme-init.js');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'DSA', exact: true })).toBeVisible();

  const pack = getPackOutline('fabric')!;
  const last = pack.units.at(-1)!;
  await page.goto(`./#/practice/fabric/${last.id}`);
  await expect(page.getByRole('heading', { level: 2, name: last.title, exact: true })).toBeVisible();
  expect(paths.some(path => /^\/CareerOS\/assets\/fabric-.+\.js$/.test(path))).toBe(true);
  await page.reload();
  await expect(page.getByRole('heading', { level: 2, name: last.title, exact: true })).toBeVisible();

  expect(await page.evaluate(key => localStorage.getItem(key), workspaceKey)).toBe(raw);
  expect(await page.evaluate(key => localStorage.getItem(key), themeKey)).toBe('light');
  expect(paths.every(path => path.startsWith('/CareerOS/'))).toBe(true);
  expect(failures).toEqual([]);
  expect(errors).toEqual([]);
});
