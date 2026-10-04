import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const images = join(root, 'docs', 'images');
const names = ['cover', 'roadmaps', 'routine', 'storage'];
const browser = await chromium.launch({
  ...(process.platform === 'win32' ? { channel: 'msedge' } : {}),
});

try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.route('**/*', route => route.abort());

  for (const name of names) {
    const source = await readFile(join(images, `readme-${name}.svg`), 'utf8');
    await page.setContent(`<style>body{margin:0}svg{display:block}</style>${source}`);
    await page.evaluate(() => document.fonts.ready);
    const svg = page.locator('svg').first();
    const result = await svg.evaluate(element => {
      const canvas = element.getBoundingClientRect();
      const clipped = [...element.querySelectorAll('text')].filter(text => {
        const box = text.getBoundingClientRect();
        return box.left < canvas.left || box.right > canvas.right ||
          box.top < canvas.top || box.bottom > canvas.bottom;
      }).map(text => text.textContent);
      return { width: canvas.width, height: canvas.height, clipped };
    });
    if (!result.width || !result.height || result.clipped.length) {
      throw new Error(`Invalid ${name} artwork: ${JSON.stringify(result)}`);
    }
    await svg.screenshot({ path: join(images, `readme-${name}.png`), omitBackground: true });
    console.log(`readme-${name}.png: ${result.width} x ${result.height}`);
  }
} finally {
  await browser.close();
}
