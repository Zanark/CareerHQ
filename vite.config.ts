import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: '/CareerHQ/',
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
