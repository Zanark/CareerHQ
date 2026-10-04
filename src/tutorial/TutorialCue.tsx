import { useLayoutEffect, useState } from 'react';
import type { CSSProperties } from 'react';

interface CueBox { left: number; top: number; width: number; height: number; radius: string }
interface HandBox { left: number; top: number; direction: 'up' | 'down' | 'left' | 'right' }
interface CueLayout { box: CueBox; hand: HandBox | null }
const HAND_SIZE = 48;
const GAP = 12;

function overlaps(a: { left: number; top: number; width: number; height: number }, b: DOMRect) {
  return a.left < b.right && a.left + a.width > b.left && a.top < b.bottom && a.top + a.height > b.top;
}

export function TutorialCue({ target, panel, anchorRect }: {
  target: HTMLElement | null; panel: HTMLElement | null; anchorRect: DOMRect | null;
}) {
  const [layout, setLayout] = useState<CueLayout | null>(null);
  useLayoutEffect(() => {
    if (!target) { setLayout(null); return; }
    let frame = 0;
    const measure = () => {
      if (!target.isConnected || target.closest('[inert]') || target.closest('dialog:not([open])')) {
        setLayout(null);
        return;
      }
      const rect = target.getBoundingClientRect();
      let left = Math.max(3, rect.left);
      let top = Math.max(3, rect.top);
      let right = Math.min(innerWidth - 3, rect.right);
      let bottom = Math.min(innerHeight - 3, rect.bottom);
      for (let parent = target.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
        const style = getComputedStyle(parent);
        const bounds = parent.getBoundingClientRect();
        if (/(auto|scroll|hidden|clip)/.test(style.overflowX)) {
          left = Math.max(left, bounds.left);
          right = Math.min(right, bounds.right);
        }
        if (/(auto|scroll|hidden|clip)/.test(style.overflowY)) {
          top = Math.max(top, bounds.top);
          bottom = Math.min(bottom, bounds.bottom);
        }
      }
      if (right - left < 2 || bottom - top < 2 || getComputedStyle(target).visibility === 'hidden') {
        setLayout(null);
        return;
      }
      const box = { left, top, width: right - left, height: bottom - top, radius: getComputedStyle(target).borderRadius || '6px' };
      let hand: HandBox | null = null;
      const clickable = target.matches('button:not(:disabled),[role="button"],a[href],input[type="submit"]:not(:disabled)');
      if (clickable) {
        const candidates: HandBox[] = [
          { left: left + box.width / 2 - HAND_SIZE / 2, top: bottom + GAP, direction: 'up' },
          { left: right + GAP, top: top + box.height / 2 - HAND_SIZE / 2, direction: 'left' },
          { left: left - GAP - HAND_SIZE, top: top + box.height / 2 - HAND_SIZE / 2, direction: 'right' },
          { left: left + box.width / 2 - HAND_SIZE / 2, top: top - GAP - HAND_SIZE, direction: 'down' },
        ];
        const fits = candidates.filter(candidate => candidate.left >= 4 && candidate.top >= 4 &&
          candidate.left + HAND_SIZE <= innerWidth - 4 && candidate.top + HAND_SIZE <= innerHeight - 4);
        const panelRect = panel && !panel.contains(target) ? panel.getBoundingClientRect() : null;
        hand = fits.find(candidate => !panelRect || !overlaps({ ...candidate, width: HAND_SIZE, height: HAND_SIZE }, panelRect)) ?? fits[0] ?? null;
      }
      const next = { box, hand };
      setLayout(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(target);
    if (panel) observer.observe(panel);
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, true);
    window.visualViewport?.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule, true);
      window.visualViewport?.removeEventListener('resize', schedule);
    };
  }, [target, panel, anchorRect]);

  if (!layout || !target) return null;
  const { box, hand } = layout;
  const handStyle: CSSProperties & { '--hand-x': string; '--hand-y': string } | undefined = hand ? {
    left: hand.left, top: hand.top,
    '--hand-x': hand.direction === 'left' ? '-5px' : hand.direction === 'right' ? '5px' : '0px',
    '--hand-y': hand.direction === 'up' ? '-5px' : hand.direction === 'down' ? '5px' : '0px',
  } : undefined;
  return <div className="tutorial-cues" aria-hidden="true" data-cue-for={target.dataset.tour ?? target.dataset.tutorialNext ?? 'section'}>
    <div className="tutorial-target-ring" style={{ left: box.left, top: box.top, width: box.width, height: box.height, borderRadius: box.radius }}>
      <div className="tutorial-glow-halo" />
    </div>
    {hand && <div className="tutorial-pointing-hand" data-direction={hand.direction} style={handStyle}>
      <div className="tutorial-hand-motion"><svg className="tutorial-hand-art" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M18 29V8a4 4 0 0 1 8 0v14-3a3.5 3.5 0 0 1 7 0v4-1a3.5 3.5 0 0 1 7 0v6a3 3 0 0 1 6 0v5c0 5-3 8-6 10H22c-4-2-5-6-7-9l-5-7a3.5 3.5 0 0 1 5-5l3 4"
          transform="translate(-3 -1)" fill="#FDF6E3" stroke="#001E26" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M23 23v7m7-6v7m7-4v5" stroke="#6B857E" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M17 40h23v6H17z" fill="#00A591" stroke="#001E26" strokeWidth="1.5" strokeLinejoin="round" />
      </svg></div>
    </div>}
  </div>;
}
