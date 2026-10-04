import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent, RefObject } from 'react';

interface Point { left: number; top: number }
interface Size { width: number; height: number }
interface Drag {
  id: number;
  handle: HTMLButtonElement;
  x: number;
  y: number;
  origin: Point;
  previous: Point | null;
  moved: boolean;
}

const EDGE = 10;
const viewportSize = (): Size => ({ width: window.innerWidth, height: window.innerHeight });

export function clampTutorialPosition(position: Point, panel: Size, viewport: Size): Point {
  return {
    left: Math.max(EDGE, Math.min(position.left, viewport.width - panel.width - EDGE)),
    top: Math.max(EDGE, Math.min(position.top, viewport.height - panel.height - EDGE)),
  };
}

export function useTutorialPosition(panelRef: RefObject<HTMLDivElement | null>, panelSize: Size, host: HTMLElement | null) {
  const [preferred, setPreferred] = useState<Point | null>(null);
  const [dragging, setDragging] = useState(false);
  const [viewport, setViewport] = useState(viewportSize);
  const drag = useRef<Drag | null>(null);

  function releasePointer() {
    const active = drag.current;
    drag.current = null;
    if (active?.handle.hasPointerCapture(active.id)) active.handle.releasePointerCapture(active.id);
    return active;
  }

  useEffect(() => {
    const resize = () => setViewport(viewportSize());
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useLayoutEffect(() => {
    setDragging(false);
    return () => { releasePointer(); };
  }, [host]);

  function finish(cancel = false) {
    const active = releasePointer();
    if (cancel && active) setPreferred(active.previous);
    setDragging(false);
  }

  function reset() {
    finish();
    setPreferred(null);
  }

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary || drag.current || !panelRef.current) return;
    const bounds = panelRef.current.getBoundingClientRect();
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      id: event.pointerId, handle: event.currentTarget,
      x: event.clientX, y: event.clientY, origin: { left: bounds.left, top: bounds.top },
      previous: preferred, moved: false,
    };
    setDragging(true);
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    const active = drag.current;
    const panel = panelRef.current;
    if (!active || active.id !== event.pointerId || !panel) return;
    const dx = event.clientX - active.x;
    const dy = event.clientY - active.y;
    if (!active.moved && Math.hypot(dx, dy) < 3) return;
    active.moved = true;
    setPreferred(clampTutorialPosition({
      left: active.origin.left + dx, top: active.origin.top + dy,
    }, panel.getBoundingClientRect(), viewportSize()));
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Escape' && drag.current) {
      event.preventDefault();
      event.stopPropagation();
      finish(true);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      event.stopPropagation();
      reset();
      return;
    }
    const offset: Record<string, Point> = {
      ArrowLeft: { left: -1, top: 0 }, ArrowRight: { left: 1, top: 0 },
      ArrowUp: { left: 0, top: -1 }, ArrowDown: { left: 0, top: 1 },
    };
    const direction = offset[event.key];
    const panel = panelRef.current;
    if (!direction || !panel) return;
    event.preventDefault();
    event.stopPropagation();
    finish();
    const bounds = panel.getBoundingClientRect();
    const distance = event.shiftKey ? 40 : 10;
    setPreferred(clampTutorialPosition({
      left: bounds.left + direction.left * distance,
      top: bounds.top + direction.top * distance,
    }, bounds, viewportSize()));
  }

  return {
    position: preferred ? clampTutorialPosition(preferred, panelSize, viewport) : null,
    dragging, reset,
    handleProps: {
      onPointerDown, onPointerMove, onKeyDown,
      onPointerUp: (event: PointerEvent<HTMLButtonElement>) => { if (drag.current?.id === event.pointerId) finish(); },
      onPointerCancel: (event: PointerEvent<HTMLButtonElement>) => { if (drag.current?.id === event.pointerId) finish(true); },
      onLostPointerCapture: () => finish(),
    },
  };
}
