import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';

type MapAnchor = 'fit' | { nodeId: string } | { x: number; y: number };

export function useMapViewport(onClose: () => void) {
  const viewport = useRef<HTMLDivElement>(null);
  const graph = useRef<HTMLDivElement>(null);
  const nodes = useRef(new Map<string, HTMLButtonElement>());
  const pendingAnchor = useRef<MapAnchor | null>(null);
  const drag = useRef<{ id: number; x: number; y: number; left: number; top: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = useState({ width: 1, height: 1, viewportWidth: 1, viewportHeight: 1, ready: false });
  const [view, setView] = useState<{ zoom: number | null; revision: number }>({ zoom: null, revision: 0 });
  const fit = Math.min(1, Math.max(1, size.viewportWidth - 48) / size.width, Math.max(1, size.viewportHeight - 48) / size.height);
  const zoom = view.zoom ?? fit;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('hashchange', onClose);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('hashchange', onClose);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    const surface = viewport.current;
    const content = graph.current;
    if (!surface || !content) return;
    let frame = 0;
    const measure = () => {
      if (!surface.clientWidth || !surface.clientHeight || !content.offsetWidth || !content.offsetHeight) return;
      const next = {
        width: content.offsetWidth, height: content.offsetHeight,
        viewportWidth: surface.clientWidth, viewportHeight: surface.clientHeight, ready: true,
      };
      setSize(previous => previous.width === next.width && previous.height === next.height &&
        previous.viewportWidth === next.viewportWidth && previous.viewportHeight === next.viewportHeight &&
        previous.ready === next.ready ? previous : next);
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    observer.observe(surface);
    observer.observe(content);
    measure();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  useLayoutEffect(() => {
    const surface = viewport.current;
    const content = graph.current;
    const anchor = pendingAnchor.current;
    if (!surface || !content || !size.ready || !anchor) return;
    pendingAnchor.current = null;
    if (anchor === 'fit') {
      surface.scrollTo({ left: 0, top: 0 });
      return;
    }
    const surfaceBox = surface.getBoundingClientRect();
    const contentBox = content.getBoundingClientRect();
    const node = 'nodeId' in anchor ? nodes.current.get(anchor.nodeId) : undefined;
    const nodeBox = node?.getBoundingClientRect();
    const x = nodeBox ? nodeBox.left + nodeBox.width / 2 :
      'x' in anchor ? contentBox.left + anchor.x * zoom : contentBox.left;
    const y = nodeBox ? nodeBox.top + nodeBox.height / 2 :
      'y' in anchor ? contentBox.top + anchor.y * zoom : contentBox.top;
    surface.scrollTo({
      left: surface.scrollLeft + x - surfaceBox.left - surface.clientWidth / 2,
      top: surface.scrollTop + y - surfaceBox.top - surface.clientHeight / 2,
    });
    node?.focus({ preventScroll: true });
  }, [view, size, zoom]);

  function changeZoom(value: number | null, anchor?: MapAnchor) {
    const surface = viewport.current;
    const content = graph.current;
    if (!surface || !content) return;
    const surfaceBox = surface.getBoundingClientRect();
    const contentBox = content.getBoundingClientRect();
    pendingAnchor.current = anchor ?? {
      x: (surfaceBox.left + surface.clientWidth / 2 - contentBox.left) / zoom,
      y: (surfaceBox.top + surface.clientHeight / 2 - contentBox.top) / zoom,
    };
    setView(previous => ({
      zoom: value === null ? null : Math.max(Math.min(fit, 0.25), Math.min(2, value)),
      revision: previous.revision + 1,
    }));
  }

  function beginPan(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || event.button !== 0 || (event.target instanceof Element && event.target.closest('button'))) return;
    const surface = event.currentTarget;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: surface.scrollLeft, top: surface.scrollTop };
    surface.setPointerCapture(event.pointerId);
    setDragging(true);
    event.preventDefault();
  }

  function endPan(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    drag.current = null;
    setDragging(false);
  }

  function registerNode(id: string, node: HTMLButtonElement | null) {
    if (node) nodes.current.set(id, node);
    else nodes.current.delete(id);
  }

  return {
    viewport, graph, size, view, fit, zoom, dragging, changeZoom, registerNode,
    panProps: {
      onPointerDown: beginPan, onPointerUp: endPan, onPointerCancel: endPan,
      onLostPointerCapture: () => { drag.current = null; setDragging(false); },
      onPointerMove: (event: PointerEvent<HTMLDivElement>) => {
        const start = drag.current;
        if (!start || start.id !== event.pointerId) return;
        event.currentTarget.scrollLeft = start.left - (event.clientX - start.x);
        event.currentTarget.scrollTop = start.top - (event.clientY - start.y);
      },
    },
  };
}
