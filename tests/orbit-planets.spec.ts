import { expect, test } from '@playwright/test';
import { PNG } from './png';
import { openGraphPanel, setGraphCheckbox } from './graph-ui';

test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } });

for (const scale of [1, 2]) {
  test.describe(`planet anchors at pixel ratio ${scale}`, () => {
    test.use({ deviceScaleFactor: scale });

    test('renders a large shaded body and picks its edge without changing work', async ({ page }, testInfo) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('./#/home');
      const scene = page.locator('.career-graph-scene');
      await expect(scene).toHaveAttribute('data-scene-state', 'ready', { timeout: 20_000 });
      const raw = await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'));
      await setGraphCheckbox(page, 'Sparks', false);
      await openGraphPanel(page, 'rings');
      await page.locator('.career-orbit-list > button[data-orbit-id="orbit:mission:pattern"]').click();
      await page.getByRole('button', { name: 'Focus ring', exact: true }).click();
      const canvas = scene.locator('canvas');
      const marker = scene.locator('.career-graph-scene__selected-orbit-marker');
      await canvas.scrollIntoViewIfNeeded();
      const bounds = await canvas.boundingBox();
      if (!bounds) throw new Error('Expected the actual planet canvas.');
      await expect.poll(async () => Number(await marker.getAttribute('data-screen-x'))).toBeCloseTo(bounds.width / 2, 0);
      await expect.poll(async () => Number(await marker.getAttribute('data-screen-y'))).toBeCloseTo(bounds.height / 2, 0);
      const point = { x: Number(await marker.getAttribute('data-screen-x')), y: Number(await marker.getAttribute('data-screen-y')) };
      await page.getByRole('button', { name: 'Close orbit details', exact: true }).click();
      await expect(scene).toHaveAttribute('data-selected-orbit-id', '');
      const capture = async () => {
        await canvas.scrollIntoViewIfNeeded();
        await page.mouse.move(1, 1);
        await expect.poll(async () => Number(await scene.getAttribute('data-cursor-strength'))).toBe(0);
        const box = await canvas.boundingBox();
        if (!box) throw new Error('Expected the unchanged planet canvas.');
        return page.screenshot({ clip: { x: Math.floor(box.x + point.x - 20), y: Math.floor(box.y + point.y - 20), width: 40, height: 40 } });
      };
      const visible = await capture();
      await setGraphCheckbox(page, 'Rings', false);
      await expect(scene).toHaveAttribute('data-rings-visible', 'false');
      const hidden = await capture();
      const a = PNG.sync.read(visible), b = PNG.sync.read(hidden);
      expect([a.width, a.height]).toEqual([40 * scale, 40 * scale]);
      expect([b.width, b.height]).toEqual([a.width, a.height]);
      let changedBodyPixels = 0;
      for (let y = 0; y < a.height; y++) for (let x = 0; x < a.width; x++) {
        if (Math.hypot(x + .5 - a.width / 2, y + .5 - a.height / 2) > 11 * scale) continue;
        const index = (y * a.width + x) * 4;
        const change = Math.abs(a.data[index] - b.data[index]) + Math.abs(a.data[index + 1] - b.data[index + 1]) + Math.abs(a.data[index + 2] - b.data[index + 2]);
        if (change > 15) changedBodyPixels++;
      }
      expect(changedBodyPixels, 'The filled planet must be substantially larger than the old 10px marker').toBeGreaterThan(200 * scale * scale);
      const quadrants = [[-5, -5], [5, -5], [-5, 5], [5, 5]].map(([dx, dy]) => {
        let luminance = 0;
        for (let y = -scale; y <= scale; y++) for (let x = -scale; x <= scale; x++) {
          const index = ((a.height / 2 + dy * scale + y) * a.width + a.width / 2 + dx * scale + x) * 4;
          luminance += a.data[index] + a.data[index + 1] + a.data[index + 2];
        }
        return luminance / (2 * scale + 1) ** 2;
      });
      expect(Math.max(...quadrants) - Math.min(...quadrants), 'The opaque body should have spherical light and shadow, not a flat disc').toBeGreaterThan(25);
      await testInfo.attach('planet-body', { body: visible, contentType: 'image/png' });
      await setGraphCheckbox(page, 'Rings', true);
      await expect(scene).toHaveAttribute('data-rings-visible', 'true');
      await canvas.scrollIntoViewIfNeeded();
      await canvas.click({ position: { x: point.x + 12, y: point.y } });
      await expect(page.getByRole('complementary', { name: 'Selected career orbit', exact: true }))
        .toHaveAttribute('data-orbit-id', 'orbit:mission:pattern');
      await page.screenshot({ path: testInfo.outputPath('planet-view.png') });
      expect(await page.evaluate(() => localStorage.getItem('careerhq.workspace.v1'))).toBe(raw);
    });
  });
}
