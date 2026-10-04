export interface OrbitTravel { from: number; to: number }
const EPSILON = 0.00001;

export function themeAngle(theme: 'dark' | 'light'): number {
  return theme === 'dark' ? -180 : 0;
}

export function nextSunAngle(current: number, theme: 'dark' | 'light'): number {
  if (!Number.isFinite(current)) throw new Error('The sun angle must be finite.');
  const phase = themeAngle(theme);
  return phase + 360 * Math.floor((current - phase + EPSILON) / 360);
}

export function unwrapSunAngle(principal: number, travel: OrbitTravel): number {
  if (![principal, travel.from, travel.to].every(Number.isFinite)) throw new Error('Orbit coordinates must be finite.');
  // CSS matrices discard full turns; recover the angle inside the current travel interval.
  const angle = principal + 360 * Math.floor((travel.from - principal + EPSILON) / 360);
  return Math.max(travel.to, Math.min(travel.from, angle));
}

export function readSunAngle(button: HTMLElement, travel: OrbitTravel): number {
  const orbit = button.querySelector('.theme-orbit');
  if (!orbit) throw new Error('The theme control is missing its orbit.');
  const transform = getComputedStyle(orbit).transform;
  const transition = orbit.getAnimations().find(animation =>
    animation instanceof CSSTransition && animation.transitionProperty === 'transform');
  if (!transition || transition.playState === 'finished' || transition.effect?.getComputedTiming().progress === 1) return travel.to;
  const matrix = new DOMMatrixReadOnly(transform);
  const principal = Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
  return unwrapSunAngle(principal, travel);
}
