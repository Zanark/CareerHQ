import { describe, expect, it } from 'vitest';
import { chapters, steps } from './steps';

const ui = (controls: Record<string, object> = {}) => ({
  querySelector: (selector: string) => controls[selector] ?? null,
  querySelectorAll: () => [],
}) as unknown as Document;

const gate = (id: string, root: Document) => steps.find(step => step.id === id)!.checkUi!(root);

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
      'source-bulk-preview', 'source-bulk-cancel',
      'source-projects', 'full-map-open', 'full-map-zoom', 'full-map-inspect', 'full-map-current', 'full-map-fit',
      'pipeline-details', 'pipeline-metrics', 'freelance-research-examples', 'freelance-brief', 'freelance-copy',
      'review-recall-setup', 'review-independent', 'settings-export', 'settings-import', 'persistence-transfer',
      'evidence-save', 'evidence-activity', 'evidence-complete', 'control-blocker', 'tools-theme', 'perspective-intro',
      'dsa-library', 'dsa-library-section', 'dsa-library-filter',
      'system-concepts-intro', 'system-concepts-search',
      'system-practice-intro', 'system-practice-select', 'system-practice-transfer',
      'career-graph-intro', 'career-graph-orbits', 'career-graph-visibility', 'career-graph-search', 'career-graph-select',
      'career-graph-checkpoints-hide', 'career-graph-checkpoints-show',
      'pack-open', 'pack-reference', 'pack-exercises', 'pack-guide', 'pack-gate',
      'focus-room-open', 'focus-room-run', 'focus-room-report', 'focus-room-data', 'focus-room-close', 'focus-room-history',
    ]) expect(ids.has(id), id).toBe(true);
  });

  it('does not complete the new control lessons when their real UI is missing', () => {
    for (const id of [
      'career-graph-checkpoints-hide', 'career-graph-checkpoints-show',
      'source-bulk-preview', 'source-bulk-cancel', 'evidence-activity',
    ]) expect(gate(id, ui()), id).toBe(false);
  });

  it('requires hiding and restoring Checkpoints, not a different layer checkbox', () => {
    for (const checked of [false, true]) {
      const root = {
        querySelectorAll: () => [
          { textContent: 'Work records', querySelector: () => ({ checked: !checked }) },
          { textContent: ' Checkpoints ', querySelector: () => ({ checked }) },
        ],
      } as unknown as Document;
      expect(gate('career-graph-checkpoints-hide', root)).toBe(!checked);
      expect(gate('career-graph-checkpoints-show', root)).toBe(checked);
    }
  });

  it('gates bulk preview on the review dialog and cancel on returning to sources', () => {
    const source = { '[data-tour="source-mission"]': {}, '.source-page-actions button': { disabled: false } };
    expect(gate('source-bulk-preview', ui(source))).toBe(false);
    expect(gate('source-bulk-cancel', ui(source))).toBe(true);
    const reviewing = ui({ ...source, 'dialog.bulk-roadmap-modal[open]': {} });
    expect(gate('source-bulk-preview', reviewing)).toBe(true);
    expect(gate('source-bulk-cancel', reviewing)).toBe(false);
    expect(gate('source-bulk-preview', ui({ '.source-page-actions button': { disabled: true } }))).toBe(true);
  });

  it('requires expanding the recorded-work explanation on the practice mission', () => {
    expect(gate('evidence-activity', ui({ '.mission-work-streak[data-mission-id="fabric"] details[open]': {} }))).toBe(false);
    expect(gate('evidence-activity', ui({ '.mission-work-streak[data-mission-id="pattern"] details[open]': {} }))).toBe(true);
  });

  it('keeps preview-and-cancel ahead of the deliberate per-mission archive exercise', () => {
    const ordered = ['source-upgrades', 'source-bulk-preview', 'source-bulk-cancel', 'source-select-fabric', 'source-preview', 'source-adopt', 'source-archive'];
    const positions = ordered.map(id => steps.findIndex(step => step.id === id));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    for (const id of ['source-bulk-preview', 'source-bulk-cancel']) {
      expect(steps.find(step => step.id === id)?.command).toBeUndefined();
    }
    expect(steps.find(step => step.id === 'source-bulk-cancel')?.body).toContain('Click Cancel, not Confirm all roadmaps');
  });
});
