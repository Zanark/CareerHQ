import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { nextSunAngle, readSunAngle, themeAngle } from './sunCycle';
import type { OrbitTravel } from './sunCycle';
import { createPaletteTransition } from './paletteTransition';

export type Theme = 'dark' | 'light';
export const THEME_STORAGE_KEY = 'careerhq.theme.v1';
export const THEME_COLORS: Record<Theme, string> = { dark: '#000F13', light: '#F3F2E9' };
export const THEME_MOTION_MS = 1200;

export function useTheme(preview = false) {
  const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  const [orbitAngle, setOrbitAngle] = useState(() => themeAngle(theme));
  const travel = useRef<OrbitTravel>({ from: orbitAngle, to: orbitAngle });
  const [motion, setMotion] = useState<'sunrise' | 'sunset' | null>(null);
  const [notice, setNotice] = useState(document.documentElement.dataset.themeNotice ?? '');
  const [palette] = useState(() => createPaletteTransition(document, THEME_COLORS, message =>
    setNotice(previous => previous || message)));
  const timer = useRef<number | undefined>(undefined);
  const current = useRef(theme);
  const previewSnapshot = useRef<Theme | null>(null);
  function snapOrbit(next: Theme) {
    const angle = themeAngle(next);
    travel.current = { from: angle, to: angle };
    setOrbitAngle(angle);
  }

  useLayoutEffect(() => {
    palette.change(theme, document.documentElement.hasAttribute('data-theme-transition'));
  }, [theme, palette]);
  useEffect(() => () => palette.dispose(), [palette]);

  useLayoutEffect(() => {
    if (preview) {
      previewSnapshot.current = current.current;
      palette.change(current.current, false);
      snapOrbit(current.current);
      setMotion(null);
      window.clearTimeout(timer.current);
      delete document.documentElement.dataset.themeTransition;
      return;
    }
    if (previewSnapshot.current === null) return;
    let restored = previewSnapshot.current;
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') restored = saved;
      else if (saved === null) restored = 'dark';
      else setNotice('The saved theme was not recognized. Your previous appearance is restored.');
    } catch {
      setNotice('Theme preferences could not be read. Your previous appearance is restored for this tab.');
    }
    previewSnapshot.current = null;
    current.current = restored;
    palette.change(restored, false);
    snapOrbit(restored);
    setTheme(restored);
    setMotion(null);
    window.clearTimeout(timer.current);
    delete document.documentElement.dataset.themeTransition;
  }, [preview]);

  useEffect(() => {
    const syncPreference = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
      if (event.newValue !== 'dark' && event.newValue !== 'light' && event.newValue !== null) {
        setNotice('An unrecognized theme preference from another tab was ignored.');
        return;
      }
      const next = event.newValue === 'light' ? 'light' : 'dark';
      if (preview) {
        previewSnapshot.current = next;
        return;
      }
      setNotice('');
      delete document.documentElement.dataset.themeNotice;
      current.current = next;
      palette.change(next, false);
      snapOrbit(next);
      setTheme(next);
      setMotion(null);
      window.clearTimeout(timer.current);
      delete document.documentElement.dataset.themeTransition;
    };
    window.addEventListener('storage', syncPreference);
    return () => {
      window.removeEventListener('storage', syncPreference);
      window.clearTimeout(timer.current);
    };
  }, [preview]);

  function toggle(button: HTMLElement) {
    const next = current.current === 'dark' ? 'light' : 'dark';
    const from = readSunAngle(button, travel.current);
    const to = nextSunAngle(from, next);
    travel.current = { from, to };
    setOrbitAngle(to);
    current.current = next;
    setTheme(next);
    window.clearTimeout(timer.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      snapOrbit(next);
      setMotion(null);
      delete document.documentElement.dataset.themeTransition;
    } else {
      setMotion(next === 'light' ? 'sunrise' : 'sunset');
      document.documentElement.dataset.themeTransition = '';
      timer.current = window.setTimeout(() => {
        setMotion(null);
        delete document.documentElement.dataset.themeTransition;
      }, THEME_MOTION_MS + 100);
    }
    if (preview) {
      setNotice('');
      return;
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
      setNotice('');
      delete document.documentElement.dataset.themeNotice;
    } catch {
      setNotice('Theme changed for this tab, but the preference could not be saved.');
    }
  }

  return { theme, orbitAngle, motion, notice, dismissNotice: () => setNotice(''), toggle };
}
