import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { THEME_COLORS, THEME_STORAGE_KEY } from './useTheme';

const source = readFileSync(join(process.cwd(), 'public', 'theme-init.js'), 'utf8');

function bootstrap(saved: string | null, unavailable = false) {
  const root: { dataset: Record<string, string> } = { dataset: {} };
  let metaColor = '';
  runInNewContext(source, {
    document: {
      documentElement: root,
      querySelector: () => ({
        setAttribute: (name: string, value: string) => {
          expect(name).toBe('content');
          metaColor = value;
        },
      }),
    },
    localStorage: {
      getItem: (key: string) => {
        expect(key).toBe(THEME_STORAGE_KEY);
        if (unavailable) throw new Error('Storage is unavailable');
        return saved;
      },
    },
  });
  return { theme: root.dataset.theme, notice: root.dataset.themeNotice, metaColor };
}

describe('prepaint theme initialization', () => {
  it('defaults to the canonical DeepSeaFoam background without changing workspace data', () => {
    expect(bootstrap(null)).toEqual({ theme: 'dark', notice: undefined, metaColor: THEME_COLORS.dark });
  });

  it.each(['light', 'dark'] as const)('restores %s before application modules render', theme => {
    expect(bootstrap(theme)).toEqual({ theme, notice: undefined, metaColor: THEME_COLORS[theme] });
  });

  it('surfaces unavailable storage rather than silently pretending a preference loaded', () => {
    const result = bootstrap('light', true);
    expect(result.theme).toBe('dark');
    expect(result.notice).toContain('could not be read');
    expect(result.metaColor).toBe(THEME_COLORS.dark);
  });

  it('reports an invalid stored preference and keeps a readable default', () => {
    const result = bootstrap('not-a-theme');
    expect(result.theme).toBe('dark');
    expect(result.notice).toContain('not recognized');
  });
});
