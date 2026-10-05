import { useId } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function MapInspector({ title, expanded, onExpandedChange, children, contentClassName = '' }: {
  title: string;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  children: ReactNode;
  contentClassName?: string;
}) {
  const id = useId();
  return <section className="full-roadmap-inspector" data-expanded={expanded} aria-label="Roadmap details">
    <div className="full-roadmap-inspector-header">
      <strong id={`${id}-title`} className="full-roadmap-inspector-title" title={title}>{title}</strong>
      <button type="button" className="full-roadmap-inspector-toggle" data-tour="map-details-toggle"
        aria-expanded={expanded} aria-controls={`${id}-content`} aria-describedby={`${id}-title`}
        onClick={() => onExpandedChange(!expanded)}>
        {expanded ? 'Hide details' : 'Show details'}
        {expanded ? <ChevronDown size={17} /> : <ChevronUp size={17} />}
      </button>
    </div>
    <div id={`${id}-content`} className={`full-roadmap-inspector-content ${contentClassName}`} hidden={!expanded}>
      {children}
    </div>
  </section>;
}
