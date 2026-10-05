import { createRequire } from 'node:module';

// Reuse the locked Playwright PNG decoder outside the browser/GPU process.
export const { PNG }: {
  PNG: { sync: { read(buffer: Buffer): { width: number; height: number; data: Buffer } } };
} = createRequire(import.meta.url)('playwright-core/lib/utilsBundle');
