export const PALETTE_FADE_MS = 1400;
export const PALETTE_COVER_MS = 350;
type Palette = 'dark' | 'light';

export function createPaletteTransition(
  document: Document,
  colors: Record<Palette, string>,
  notify: (message: string) => void,
) {
  const root = document.documentElement;
  let desired: Palette = root.dataset.theme === 'light' ? 'light' : 'dark';
  let generation = 0;
  let active: { cancel: () => void } | undefined;

  function apply(theme: Palette) {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors[theme]);
  }

  function finish(ticket: number) {
    if (ticket !== generation) return;
    active = undefined;
    delete root.dataset.paletteTransition;
    if (root.dataset.theme !== desired) begin();
  }

  function veilTransition(ticket: number) {
    const veil = document.createElement('div');
    veil.className = 'palette-veil';
    veil.setAttribute('aria-hidden', 'true');
    veil.dataset.phase = 'cover';
    document.body.append(veil);
    let frame = 0;
    const updateCutout = () => {
      const scene = document.querySelector('.theme-toggle .theme-scene');
      const bounds = scene?.getBoundingClientRect();
      if (!bounds || bounds.bottom <= 0 || bounds.top >= root.clientHeight) {
        veil.style.clipPath = '';
        return;
      }
      const { left, top, right, bottom } = bounds;
      const radius = Math.min(bounds.height / 2, bounds.width / 2, 18);
      const width = document.defaultView?.innerWidth ?? root.clientWidth;
      const height = document.defaultView?.innerHeight ?? root.clientHeight;
      const rounded = `path(evenodd, "M 0 0 H ${width} V ${height} H 0 Z M ${left + radius} ${top} H ${right - radius} A ${radius} ${radius} 0 0 1 ${right} ${top + radius} V ${bottom - radius} A ${radius} ${radius} 0 0 1 ${right - radius} ${bottom} H ${left + radius} A ${radius} ${radius} 0 0 1 ${left} ${bottom - radius} V ${top + radius} A ${radius} ${radius} 0 0 1 ${left + radius} ${top} Z")`;
      veil.style.clipPath = CSS.supports('clip-path', rounded) ? rounded
        : `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${left}px ${top}px, ${left}px ${bottom}px, ${right}px ${bottom}px, ${right}px ${top}px, ${left}px ${top}px)`;
    };
    const scheduleCutout = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateCutout);
    };
    const remove = () => {
      cancelAnimationFrame(frame);
      document.defaultView?.removeEventListener('resize', scheduleCutout);
      document.defaultView?.removeEventListener('scroll', scheduleCutout, true);
      veil.remove();
    };
    updateCutout();
    document.defaultView?.addEventListener('resize', scheduleCutout);
    document.defaultView?.addEventListener('scroll', scheduleCutout, true);
    let animation = veil.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: PALETTE_COVER_MS, easing: 'ease-in-out', fill: 'forwards',
    });
    active = { cancel: () => { animation.cancel(); remove(); } };
    void animation.finished.then(async () => {
      if (ticket !== generation) return;
      apply(desired);
      veil.dataset.phase = 'reveal';
      const cover = animation;
      animation = veil.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: PALETTE_FADE_MS - PALETTE_COVER_MS, easing: 'ease-in-out', fill: 'forwards',
      });
      cover.cancel();
      await animation.finished;
      remove();
      finish(ticket);
    }).catch(() => {
      remove();
      if (ticket !== generation) return;
      notify('The page fade could not finish. Your selected theme is still applied.');
      apply(desired);
      finish(ticket);
    });
  }

  function begin() {
    if (active || root.dataset.theme === desired) return;
    const ticket = ++generation;
    root.dataset.paletteTransition = '';
    veilTransition(ticket);
  }

  function change(theme: Palette, animate: boolean) {
    desired = theme;
    if (!animate || document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.visibilityState === 'hidden') {
      generation++;
      active?.cancel();
      active = undefined;
      delete root.dataset.paletteTransition;
      apply(theme);
      return;
    }
    // Finish a current fade before starting the latest request, instead of flashing to its end.
    begin();
  }

  const reduced = document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)');
  const reduceMotion = () => { if (reduced?.matches) change(desired, false); };
  reduced?.addEventListener('change', reduceMotion);

  return {
    change,
    dispose() {
      generation++;
      active?.cancel();
      active = undefined;
      delete root.dataset.paletteTransition;
      reduced?.removeEventListener('change', reduceMotion);
    },
  };
}
