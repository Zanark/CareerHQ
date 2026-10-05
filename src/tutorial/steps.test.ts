import { describe, expect, it } from 'vitest';
import { chapters, steps } from './steps';

describe('current tutorial curriculum', () => {
  it('has unique steps, valid chapters, and actual gates for required actions', () => {
    expect(new Set(steps.map(step => step.id)).size).toBe(steps.length);
    expect(new Set(chapters.map(chapter => chapter.id)).size).toBe(chapters.length);
    for (const chapter of chapters) expect(steps.some(step => step.chapter === chapter.id)).toBe(true);
    for (const step of steps) {
      expect(chapters.some(chapter => chapter.id === step.chapter)).toBe(true);
      if (step.kind === 'action') expect(!!step.check || !!step.checkUi, step.id).toBe(true);
    }
  });

  it('covers the newer tools without removing the original safe workflow', () => {
    const ids = new Set(steps.map(step => step.id));
    for (const id of [
      'source-preview', 'source-adopt', 'source-archive', 'source-stage', 'source-optional', 'source-forecast',
      'source-projects', 'full-map-open', 'full-map-zoom', 'full-map-inspect', 'full-map-current', 'full-map-fit',
      'pipeline-details', 'pipeline-metrics', 'freelance-research-examples', 'freelance-brief', 'freelance-copy',
      'review-recall-setup', 'review-independent', 'settings-export', 'settings-import', 'persistence-transfer',
      'evidence-save', 'evidence-complete', 'control-blocker', 'tools-theme', 'perspective-intro',
      'dsa-library', 'dsa-library-section', 'dsa-library-filter',
      'system-concepts-intro', 'system-concepts-search',
      'system-practice-intro', 'system-practice-select', 'system-practice-transfer',
      'career-graph-intro', 'career-graph-orbits', 'career-graph-search', 'career-graph-select',
      'pack-open', 'pack-reference', 'pack-exercises', 'pack-guide', 'pack-gate',
      'focus-room-open', 'focus-room-run', 'focus-room-report', 'focus-room-data', 'focus-room-close', 'focus-room-history',
    ]) expect(ids.has(id), id).toBe(true);
  });
});
