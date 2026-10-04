import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, LogOut, RotateCcw, SkipForward, X } from 'lucide-react';
import type { TutorialProps } from './types';
import { chapters, steps } from './steps';
import type { TutorialStep } from './steps';
import { TutorialCue } from './TutorialCue';

const MOBILE_WIDTH = 640;
const PANEL_MARGIN = 24;

function findOpenDialog(): HTMLElement | null {
  return document.querySelector<HTMLElement>('dialog[open]');
}

function findTarget(targets: string[] | undefined, dialog: HTMLElement | null): HTMLElement | null {
  if (!targets || targets.length === 0) return null;
  if (dialog && (targets.includes('evidence-example') || targets.includes('checkpoint-complete'))) {
    const title = dialog.querySelector<HTMLInputElement>('[name="title"]')?.value.trim() ?? '';
    const summary = dialog.querySelector<HTMLTextAreaElement>('[name="summary"]')?.value.trim() ?? '';
    if (title.length < 3 || summary.length < 10) return dialog.querySelector('[data-tour="evidence-example"]');
    if (targets.includes('checkpoint-complete')) {
      const complete = dialog.querySelector<HTMLInputElement>('[data-tour="checkpoint-complete"]');
      if (!complete?.checked) return complete;
      const remaining = dialog.querySelector<HTMLInputElement>('[data-tour="evidence-criteria"] input:not(:checked)');
      if (remaining) return remaining;
    }
    return dialog.querySelector('[data-tour="evidence-submit"]');
  }
  if (dialog && targets.includes('opportunity-example')) {
    const company = dialog.querySelector<HTMLInputElement>('[name="company"]')?.value.trim();
    const role = dialog.querySelector<HTMLInputElement>('[name="role"]')?.value.trim();
    if (company && role) return dialog.querySelector('[data-tour="opportunity-submit"]');
  }
  if (dialog && targets.includes('freelance-example')) {
    const title = dialog.querySelector<HTMLInputElement>('[name="title"]')?.value.trim();
    const platform = dialog.querySelector<HTMLInputElement>('[name="platform"]')?.value.trim();
    if (title && platform) return dialog.querySelector('[data-tour="freelance-save"]');
  }
  if (dialog && targets.includes('recall-outcome') && dialog.querySelector<HTMLInputElement>('input[name="outcome"]:checked')?.parentElement?.textContent?.trim() === 'Partial') {
    return dialog.querySelector('[data-tour="recall-save"]');
  }
  if (!dialog && targets.includes('capacity')) {
    const buttons = document.querySelectorAll<HTMLElement>('[data-tour="capacity"] button');
    return [...buttons].find(button => button.textContent?.trim() === 'Gentle') ?? null;
  }
  if (!dialog && targets.includes('readiness-coding')) {
    const buttons = document.querySelectorAll<HTMLElement>('[data-tour="readiness-coding"] button');
    return [...buttons].find(button => button.textContent?.trim() === 'Building') ?? null;
  }
  for (const name of targets) {
    const scoped = dialog?.querySelector<HTMLElement>(`[data-tour="${name}"]`);
    if (scoped) return scoped;
  }
  if (dialog) return null;
  for (const name of targets) {
    const global = document.querySelector<HTMLElement>(`[data-tour="${name}"]`);
    if (global) return global;
  }
  return null;
}

function isVisible(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

interface Placement {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
}

function computePlacement(targetRect: DOMRect | null, panelSize: { width: number; height: number }, mobile: boolean): Placement {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  if (mobile) {
    const width = viewportWidth - PANEL_MARGIN * 2;
    return { top: viewportHeight - panelSize.height - PANEL_MARGIN, left: PANEL_MARGIN, width, maxHeight: viewportHeight * 0.6 };
  }
  const width = Math.min(440, viewportWidth - PANEL_MARGIN * 2);
  if (!targetRect) {
    return { top: viewportHeight - panelSize.height - PANEL_MARGIN, left: viewportWidth - width - PANEL_MARGIN, width, maxHeight: viewportHeight - PANEL_MARGIN * 2 };
  }
  const spaceRight = viewportWidth - targetRect.right;
  const spaceLeft = targetRect.left;
  const spaceBelow = viewportHeight - targetRect.bottom;
  const spaceAbove = targetRect.top;
  let left: number;
  let top: number;
  if (spaceRight >= width + PANEL_MARGIN) {
    left = targetRect.right + PANEL_MARGIN;
    top = Math.min(Math.max(targetRect.top, PANEL_MARGIN), viewportHeight - panelSize.height - PANEL_MARGIN);
  } else if (spaceLeft >= width + PANEL_MARGIN) {
    left = targetRect.left - width - PANEL_MARGIN;
    top = Math.min(Math.max(targetRect.top, PANEL_MARGIN), viewportHeight - panelSize.height - PANEL_MARGIN);
  } else if (spaceBelow >= panelSize.height + PANEL_MARGIN) {
    top = targetRect.bottom + PANEL_MARGIN;
    left = Math.min(Math.max(targetRect.left, PANEL_MARGIN), viewportWidth - width - PANEL_MARGIN);
  } else if (spaceAbove >= panelSize.height + PANEL_MARGIN) {
    top = targetRect.top - panelSize.height - PANEL_MARGIN;
    left = Math.min(Math.max(targetRect.left, PANEL_MARGIN), viewportWidth - width - PANEL_MARGIN);
  } else {
    left = viewportWidth - width - PANEL_MARGIN;
    top = PANEL_MARGIN;
  }
  left = Math.min(Math.max(left, PANEL_MARGIN), viewportWidth - width - PANEL_MARGIN);
  top = Math.min(Math.max(top, PANEL_MARGIN), viewportHeight - panelSize.height - PANEL_MARGIN);
  return { top, left, width, maxHeight: viewportHeight - PANEL_MARGIN * 2 };
}

export function Tutorial({ state, route, signals, onNavigate, onCommand, onExit, onRestart }: TutorialProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [achieved, setAchieved] = useState<Set<string>>(new Set());
  const [collapsed, setCollapsed] = useState(false);
  const [dialogHost, setDialogHost] = useState<HTMLElement | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [targetMissing, setTargetMissing] = useState(false);
  const [panelSize, setPanelSize] = useState({ width: 440, height: 220 });
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= MOBILE_WIDTH);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const targetElRef = useRef<HTMLElement | null>(null);
  const enterThemeRef = useRef(signals.theme);
  const rafRef = useRef(0);
  const pendingRef = useRef(false);

  const step: TutorialStep = steps[stepIndex];
  const total = steps.length;
  const satisfied = step.kind === 'explain' || achieved.has(step.id);
  const nextCue = satisfied && (step.kind === 'action' || !step.targets?.length);
  const stepRoute = [...steps.slice(0, stepIndex + 1)].reverse().find(candidate => candidate.route)?.route ?? 'hq';

  // Navigate / invoke command exactly once when the step changes.
  useEffect(() => {
    enterThemeRef.current = signals.theme;
    if (stepRoute !== route) onNavigate(stepRoute);
    if (step.command) onCommand(step.command);
    setCollapsed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  // Evaluate the current step's completion condition.
  useEffect(() => {
    if (step.kind !== 'action' || !step.check || achieved.has(step.id)) return;
    const ok = step.check({ state, signals, route, enterTheme: enterThemeRef.current });
    if (ok) setAchieved((prev) => (prev.has(step.id) ? prev : new Set(prev).add(step.id)));
  }, [step, state, signals, route, achieved]);

  const scan = useCallback(() => {
    const dialog = findOpenDialog();
    setDialogHost((prev) => (prev === dialog ? prev : dialog));
    const target = findTarget(step.targets, dialog);
    if (target && isVisible(target)) {
      targetElRef.current = target;
      setTargetElement(previous => previous === target ? previous : target);
      const rect = target.getBoundingClientRect();
      setTargetRect(previous => previous && previous.x === rect.x && previous.y === rect.y &&
        previous.width === rect.width && previous.height === rect.height ? previous : rect);
      setTargetMissing(false);
    } else {
      if (targetElRef.current) targetElRef.current = null;
      setTargetElement(null);
      setTargetRect(null);
      setTargetMissing(Boolean(step.targets && step.targets.length > 0));
    }
    setMobile(window.innerWidth <= MOBILE_WIDTH);
  }, [step]);

  const schedule = useCallback(() => {
    if (pendingRef.current) return;
    pendingRef.current = true;
    rafRef.current = window.requestAnimationFrame(() => {
      pendingRef.current = false;
      scan();
    });
  }, [scan]);

  // Re-scan on step change, DOM mutation (dialogs opening/closing), resize, and scroll.
  useEffect(() => {
    schedule();
    const mutation = new MutationObserver(() => schedule());
    mutation.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['open', 'class'] });
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, true);
    document.addEventListener('input', schedule, true);
    document.addEventListener('change', schedule, true);
    document.addEventListener('click', schedule, true);
    return () => {
      mutation.disconnect();
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule, true);
      document.removeEventListener('input', schedule, true);
      document.removeEventListener('change', schedule, true);
      document.removeEventListener('click', schedule, true);
      window.cancelAnimationFrame(rafRef.current);
      pendingRef.current = false;
    };
  }, [schedule]);

  // Track the highlighted target's own size changes (e.g. expanding content).
  useEffect(() => {
    const target = targetElement;
    if (!target || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(() => schedule());
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetElement, schedule]);

  // Measure the coach panel itself so placement can avoid covering the target.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const measure = () => {
      const rect = panel.getBoundingClientRect();
      setPanelSize((prev) => (prev.width === rect.width && prev.height === rect.height ? prev : { width: rect.width, height: rect.height }));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(panel);
    return () => observer.disconnect();
  }, [step.id, collapsed, targetMissing, dialogHost]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add('tutorial-running');
    root.style.setProperty('--tutorial-clearance', `${mobile ? panelSize.height + 32 : 24}px`);
    return () => {
      root.classList.remove('tutorial-running');
      root.style.removeProperty('--tutorial-clearance');
    };
  }, [mobile, panelSize.height]);

  // Scroll the target into view once when the step (or found target) changes, not continuously.
  useEffect(() => {
    const target = targetElement;
    if (!target || nextCue) return;
    target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center', inline: 'nearest' });
    target.classList.add('tutorial-highlight');
    return () => target.classList.remove('tutorial-highlight');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step.id, targetElement, nextCue]);

  const chapterOf = (id: string) => chapters.find((candidate) => candidate.id === id);
  const currentChapter = chapterOf(step.chapter);
  const chapterStartIndex = useMemo(() => {
    const map = new Map<string, number>();
    steps.forEach((candidate, index) => { if (!map.has(candidate.chapter)) map.set(candidate.chapter, index); });
    return map;
  }, []);

  function goTo(index: number) {
    const clamped = Math.min(Math.max(index, 0), total - 1);
    setStepIndex(clamped);
  }
  function next() { goTo(stepIndex + 1); }
  function back() { goTo(stepIndex - 1); }
  function skip() { goTo(stepIndex + 1); }
  function jumpToChapter(chapterId: string) {
    const start = chapterStartIndex.get(chapterId);
    if (start !== undefined) goTo(start);
  }
  function showStep() {
    if (stepRoute !== route) onNavigate(stepRoute);
    if (step.command) onCommand(step.command);
    else if (dialogHost) onCommand('close-dialogs');
    schedule();
  }
  function focusControl() {
    const target = targetElRef.current;
    if (!target) return;
    const control = target.matches('button,input,select,textarea,a[href]')
      ? target
      : target.querySelector<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href]');
    control?.focus({ preventScroll: true });
  }
  function handleEscape() {
    onExit();
  }

  const placement = computePlacement(mobile ? null : targetRect, panelSize, mobile);
  const host = dialogHost ?? document.body;
  const progressPct = Math.round(((stepIndex + 1) / total) * 100);

  if (dialogHost?.classList.contains('full-roadmap-modal')) return createPortal(
    <div ref={panelRef} data-step={step.id} className="tutorial-panel tutorial-map-guide" role="region" aria-label="Tutorial roadmap practice">
      <span>Practice only. Tutorial paused.</span>
      <button type="button" className="button secondary" onClick={() => onCommand('close-dialogs')}>Back to tutorial</button>
      <button type="button" className="icon-button" aria-label="Exit tutorial" onClick={onExit}><X size={18} /></button>
    </div>, dialogHost);

  const panel = (
    <>
    <TutorialCue target={nextCue ? nextRef.current : targetElement} panel={panelRef.current} anchorRect={targetRect} />
    <div
      ref={panelRef}
      data-step={step.id}
      className={`tutorial-panel ${mobile ? 'tutorial-panel-mobile' : 'tutorial-panel-floating'} ${collapsed ? 'tutorial-collapsed' : ''}`}
      style={mobile
        ? { maxHeight: collapsed ? undefined : placement.maxHeight }
        : { top: placement.top, left: placement.left, width: placement.width, maxHeight: placement.maxHeight }}
      role="region"
      aria-label={`Tutorial step ${stepIndex + 1} of ${total}: ${step.title}`}
      onKeyDown={(event) => { if (event.key === 'Escape' && !(event.target instanceof HTMLSelectElement)) { event.preventDefault(); event.stopPropagation(); handleEscape(); } }}
    >
      <div className="tutorial-head">
        <div className="tutorial-head-text">
          <span className="tutorial-eyebrow">{currentChapter?.title ?? 'Tutorial'} &middot; {stepIndex + 1}/{total}</span>
          {!collapsed && <h2 className="tutorial-title">{step.title}</h2>}
        </div>
        <div className="tutorial-head-actions">
          <button type="button" className="icon-button" aria-label={collapsed ? 'Expand tutorial panel' : 'Collapse tutorial panel'} onClick={() => setCollapsed((value) => !value)}>
            {collapsed ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <button type="button" className="icon-button" aria-label="Exit tutorial" onClick={onExit}><X size={18} /></button>
        </div>
      </div>
      <div className="tutorial-progress-track" aria-hidden="true"><div className="tutorial-progress-fill" style={{ width: `${progressPct}%` }} /></div>
      {!collapsed && (
        <>
          <label className="tutorial-chapter-nav">Chapter
            <select aria-label="Tutorial chapter" value={step.chapter} onChange={event => jumpToChapter(event.target.value)}>
              {chapters.map(chapter => <option key={chapter.id} value={chapter.id}>{chapter.title}</option>)}
            </select>
          </label>
          <p className="tutorial-body" aria-live="polite">{step.body}</p>
          {step.kind === 'action' && (
            <p className="tutorial-status" aria-live="polite">
              {satisfied ? 'Done. Click Next to continue.' : 'Try the action above, then Next unlocks.'}
            </p>
          )}
          {step.kind === 'action' && !satisfied && targetElement && <button type="button" className="tutorial-link-button" onClick={focusControl}>Focus highlighted control</button>}
          {targetMissing && !satisfied && (
            <div className="tutorial-missing">
              <p>This step&rsquo;s control isn&rsquo;t visible right now.</p>
              <button type="button" className="button secondary" onClick={showStep}>Show this step</button>
            </div>
          )}
          <div className="tutorial-actions">
            <button type="button" className="button secondary" onClick={back} disabled={stepIndex === 0}>
              <ArrowLeft size={14} /> Back
            </button>
            <button type="button" className="button secondary" onClick={skip} disabled={stepIndex === total - 1}>
              <SkipForward size={14} /> Skip step
            </button>
            <button ref={nextRef} data-tutorial-next="next" type="button" className="button primary" onClick={stepIndex === total - 1 ? onExit : next} disabled={!satisfied}>
              {stepIndex === total - 1 ? 'Finish tutorial' : 'Next'} <ArrowRight size={14} />
            </button>
          </div>
          <div className="tutorial-footer-actions">
            <button type="button" className="tutorial-link-button" onClick={onRestart}><RotateCcw size={13} /> Restart tutorial</button>
            <button type="button" className="tutorial-link-button" onClick={onExit}><LogOut size={13} /> Exit to real workspace</button>
          </div>
        </>
      )}
    </div>
    </>
  );

  return createPortal(panel, host);
}
