import { expect, test } from '@playwright/test';
import { PNG } from './png';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });

test('the white core and inner halo remain opaque over links with decoration on or off', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#/home');
  const scene = page.locator('.career-graph-scene');
  await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
  const raw = await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'));
  await page.getByLabel('Filter career graph by mission').selectOption('pattern');
  await page.getByLabel('Search career graph nodes', { exact: true }).fill('DSA');
  await page.locator('.career-graph-node-list > button').filter({ hasText: 'DSA' }).first().click();
  const inspector = page.getByRole('complementary', { name: 'Selected career node', exact: true });
  await inspector.locator('.career-graph-connections > summary').click();
  await inspector.getByRole('button', { name: 'Inspect CareerOS', exact: true }).click();
  await expect(inspector.getByRole('heading', { name: 'CareerOS', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Focus node', exact: true }).click();
  const canvas = scene.locator('canvas');
  const marker = scene.locator('.career-graph-scene__selected-marker');
  await expect(marker).toHaveAttribute('data-screen-visible', 'true');
  await canvas.scrollIntoViewIfNeeded();
  const box = await canvas.boundingBox();
  if (!box) throw new Error('The actual core canvas must be visible.');
  await expect.poll(async () => Number(await marker.getAttribute('data-screen-x'))).toBeCloseTo(box.width / 2, 0);
  await expect.poll(async () => Number(await marker.getAttribute('data-screen-y'))).toBeCloseTo(box.height / 2, 0);
  await page.getByRole('button', { name: 'Close node details', exact: true }).click();
  for (const visible of [false, true]) {
    await page.getByRole('checkbox', { name: 'Rings & sparks', exact: true }).setChecked(visible);
    await expect(scene).toHaveAttribute('data-decoration-visible', String(visible));
    await canvas.scrollIntoViewIfNeeded();
    const currentBox = await canvas.boundingBox();
    if (!currentBox) throw new Error('The core canvas must stay visible when decoration changes.');
    const clip = { x: Math.floor(currentBox.x + currentBox.width / 2 - 16), y: Math.floor(currentBox.y + currentBox.height / 2 - 16), width: 32, height: 32 };
    await page.mouse.move(1, 1);
    const image = await page.screenshot({ clip });
    const { data } = PNG.sync.read(image);
    const unfilled: number[][] = [];
    for (let index = 0; index < data.length; index += 4) {
      if (Math.abs(data[index] - 238) > 2 || Math.abs(data[index + 1] - 232) > 2 || Math.abs(data[index + 2] - 213) > 2) {
        unfilled.push([...data.subarray(index, index + 3)]);
      }
    }
    expect(unfilled.slice(0, 10), 'Every inner-halo pixel must use the solid core ink, not reveal the scene underneath').toEqual([]);
    await testInfo.attach(`opaque-core-decoration-${visible}`, { body: image, contentType: 'image/png' });
  }
  expect(await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'))).toBe(raw);
});
