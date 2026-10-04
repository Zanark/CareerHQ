import { useId, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { ReactNode } from 'react';

export interface DiagramEdge {
  from: string;
  to: string;
  kind?: 'down' | 'branch' | 'return' | 'root' | 'member' | 'cross-stage';
  via?: string;
  label?: string;
  tone?: 'normal' | 'current' | 'complete';
}

interface Box { x: number; y: number; width: number; height: number }
interface DrawnEdge { from: string; to: string; kind: string; path: string; label?: string; x: number; y: number; arrow: boolean; tone: string }
interface Layout { width: number; height: number; paths: DrawnEdge[]; error: string }

export function connectDiagram(edges: DiagramEdge[], boxes: Record<string, Box>, width: number): DrawnEdge[] {
  const rootTargets = edges.filter(edge => edge.kind === 'root' && Object.hasOwn(boxes, edge.to)).map(edge => boxes[edge.to]);
  const stacked = rootTargets.some(box => Math.abs(box.y - rootTargets[0].y) > 2);
  return edges.map(edge => {
    const a = Object.hasOwn(boxes, edge.from) ? boxes[edge.from] : undefined;
    const b = Object.hasOwn(boxes, edge.to) ? boxes[edge.to] : undefined;
    if (!a || !b) throw new Error(`Missing diagram node: ${!a ? edge.from : edge.to}`);
    const from = { x: a.x + a.width / 2, y: a.y + a.height };
    const to = { x: b.x + b.width / 2, y: b.y };
    const middle = (from.y + to.y) / 2;
    let path = `M ${from.x} ${from.y} V ${middle} H ${to.x} V ${to.y}`;
    let labelX = to.x + 14;
    let labelY = middle - 7;
    if (edge.kind === 'branch') {
      const x1 = a.x + a.width;
      const y1 = a.y + a.height / 2;
      const y2 = b.y + b.height / 2;
      const midX = (x1 + b.x) / 2;
      path = `M ${x1} ${y1} H ${midX} V ${y2} H ${b.x}`;
      labelX = midX;
      labelY = y1 - 10;
    } else if (edge.kind === 'cross-stage') {
      const group = edge.via ? boxes[edge.via] : a;
      if (!group) throw new Error(`Missing diagram group: ${edge.via}`);
      const forwards = b.x > a.x;
      const rail = forwards ? group.x + group.width + 12 : group.x - 12;
      const start = forwards ? a.x + a.width : a.x;
      path = `M ${start} ${a.y + a.height / 2} H ${rail} V ${b.y - 20} H ${to.x} V ${to.y}`;
    } else if (edge.kind === 'return') {
      const rail = width - 7;
      const y1 = a.y + a.height / 2;
      const y2 = b.y + b.height / 2;
      path = `M ${a.x + a.width} ${y1} H ${rail} V ${y2} H ${b.x + b.width}`;
    } else if (edge.kind === 'member' || (edge.kind === 'root' && stacked)) {
      const rail = edge.kind === 'root' ? Math.min(...rootTargets.map(box => box.x)) - 20 : b.x - 17;
      path = `M ${from.x} ${from.y} V ${from.y + 15} H ${rail} V ${b.y + b.height / 2} H ${b.x}`;
    }
    return { from: edge.from, to: edge.to, kind: edge.kind ?? 'down', path, label: edge.label, x: labelX, y: labelY, arrow: !['root', 'member'].includes(edge.kind ?? ''), tone: edge.tone ?? 'normal' };
  });
}

export function Diagram({ edges, children, className = '' }: { edges: DiagramEdge[]; children: ReactNode; className?: string }) {
  const canvas = useRef<HTMLDivElement>(null);
  const marker = `diagram-arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [layout, setLayout] = useState<Layout>({ width: 1, height: 1, paths: [], error: '' });

  useLayoutEffect(() => {
    const root = canvas.current;
    if (!root) return;
    let frame = 0;
    const measure = () => {
      if (!root.isConnected) return;
      const area = root.getBoundingClientRect();
      if (!area.width || !area.height) return;
      // Keep connector geometry in CSS pixels when a whole roadmap is zoomed.
      const scaleX = area.width / root.offsetWidth;
      const scaleY = area.height / root.offsetHeight;
      const boxes: Record<string, Box> = Object.create(null);
      root.querySelectorAll<HTMLElement>('[data-diagram-node]').forEach(node => {
        const rect = node.getBoundingClientRect();
        boxes[node.dataset.diagramNode!] = {
          x: (rect.x - area.x) / scaleX, y: (rect.y - area.y) / scaleY,
          width: rect.width / scaleX, height: rect.height / scaleY,
        };
      });
      const missing = edges.find(edge => !boxes[edge.from] || !boxes[edge.to] || (edge.via && !boxes[edge.via]));
      const next: Layout = {
        width: root.offsetWidth, height: root.offsetHeight,
        paths: missing ? [] : connectDiagram(edges, boxes, root.offsetWidth),
        error: missing ? 'Diagram connections could not be drawn. The labeled milestones remain available below.' : '',
      };
      setLayout(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const print = () => flushSync(measure);
    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    root.querySelectorAll('[data-diagram-node]').forEach(node => observer.observe(node));
    window.addEventListener('resize', schedule);
    window.addEventListener('beforeprint', print);
    window.addEventListener('afterprint', schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('beforeprint', print);
      window.removeEventListener('afterprint', schedule);
    };
  }, [edges]);

  return <div ref={canvas} className={`diagram-canvas ${className}`}>
    <svg className="diagram-connectors" viewBox={`0 0 ${layout.width} ${layout.height}`} width="100%" height="100%" aria-hidden="true">
      <defs><marker id={marker} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto-start-reverse"><path d="M 0 0 L 7 3.5 L 0 7 z" /></marker></defs>
      {layout.paths.map(edge => <g key={`${edge.from}-${edge.to}`} className={`diagram-edge ${edge.tone}`} data-connection={`${edge.from}:${edge.to}`} data-kind={edge.kind}>
        <path d={edge.path} markerEnd={edge.arrow ? `url(#${marker})` : undefined} />
        {edge.label && <text x={edge.x} y={edge.y} textAnchor="middle">{edge.label}</text>}
      </g>)}
    </svg>
    {children}
    {layout.error && <p className="diagram-error" role="alert">{layout.error}</p>}
  </div>;
}
