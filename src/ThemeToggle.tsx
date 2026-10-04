import type { CSSProperties } from 'react';
import { THEME_MOTION_MS, type useTheme } from './useTheme';

export function ThemeToggle({ appearance }: { appearance: ReturnType<typeof useTheme> }) {
  const motionStyle: CSSProperties & { '--theme-motion-duration': string; '--theme-orbit-angle': string } = {
    '--theme-motion-duration': `${THEME_MOTION_MS}ms`,
    '--theme-orbit-angle': `${appearance.orbitAngle}deg`,
  };
  return <button
    className="theme-toggle"
    data-tour="theme-switch"
    type="button"
    role="switch"
    aria-label="Dark theme"
    aria-checked={appearance.theme === 'dark'}
    title={appearance.theme === 'dark' ? 'Sunrise from the east (right): switch to Harbor Daylight' : 'Sunset in the west (left): switch to DeepSeaFoam'}
    data-motion={appearance.motion ?? undefined}
    style={motionStyle}
    onClick={event => appearance.toggle(event.currentTarget)}
  >
    <span className="theme-scene" aria-hidden="true">
      <span className="theme-sky" />
      <svg className="theme-stars" width="56" height="32" viewBox="0 0 56 32" fill="currentColor"><circle cx="10" cy="8" r="1" /><circle cx="43" cy="6" r=".8" /><path d="m40 14 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z" /></svg>
      <span className="theme-orbit">
        <svg className="theme-sun" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" fill="currentColor" /><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        <svg className="theme-moon" width="16" height="16" viewBox="0 0 24 24"><path d="M20.4 15.3A9 9 0 0 1 8.7 3.6a9 9 0 1 0 11.7 11.7Z" fill="currentColor" /></svg>
      </span>
      <svg className="theme-clouds" width="56" height="32" viewBox="0 0 56 32" fill="currentColor" stroke="var(--dsf-blue)" strokeWidth=".45" strokeOpacity=".22">
        <path d="M1 19h11a2.5 2.5 0 0 0 .3-5 3.6 3.6 0 0 0-6.9-1.2A3.3 3.3 0 0 0 1 19Z" />
        <path d="M43 16h12a2.6 2.6 0 0 0 .1-5.2 3.5 3.5 0 0 0-6.5-1.5A3.6 3.6 0 0 0 43 16Z" />
      </svg>
      <svg className="theme-water" width="56" height="12" viewBox="0 0 56 12" fill="none"><path d="M0 3c7-4 12 4 20 0s13 4 21 0 12 2 15 0v9H0Z" fill="currentColor" /><path d="M4 6h10m10 0h7m10 0h9M17 9h10m8 0h6" stroke="var(--dsf-pearl)" strokeOpacity=".6" strokeWidth=".6" strokeLinecap="round" /></svg>
    </span>
    <span className="theme-toggle-label">{appearance.theme === 'dark' ? 'Dark' : 'Light'}</span>
  </button>;
}
