import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: '/CareerOS/',
  build: {
    rollupOptions: {
      output: { manualChunks: id => {
        if (/[\\/]node_modules[\\/]three[\\/]/.test(id)) return 'career-3d';
        if (id.includes('node_modules')) return 'vendor';
        if (/[\\/]roadmapPacks[\\/]outlines\.ts$/.test(id)) return 'roadmap-pack-outlines';
        if (/(?:dsaProblemSets|systemPracticeContent)\.ts$/.test(id)) return 'practice-reference-data';
        return undefined;
      } },
    },
  },
  plugins: [
    react(),
    {
      name: 'development-refresh-policy',
      transformIndexHtml: {
        order: 'pre',
        handler(html) {
          // Vite's development-only inline refresh preamble is not part of the static build.
          return command === 'serve'
            ? html.replace(/<meta http-equiv="Content-Security-Policy"[^>]+>/, '')
            : html;
        },
      },
    },
  ],
  test: {
    include: ['src/**/*.test.ts'],
  },
}));
