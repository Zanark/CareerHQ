import { afterEach, describe, expect, it, vi } from 'vitest';
import { createInitialState, parseState, recallSummary, recordEvidence, recordRecall, upgradeRoadmap } from './engine';

afterEach(() => vi.useRealTimers());

describe('source update boundary regressions', () => {
  it('can reach retained after an early review rather than getting stuck forever', () => {
    vi.useFakeTimers();
    const started = new Date('2026-10-04T10:00:00Z');
    vi.setSystemTime(started);
    let state = createInitialState(false);
    const checkpointId = state.missions.pattern.checkpointId;
    state = recordEvidence(state, { missionId: 'pattern', checkpointId, title: 'Practice example', summary: 'A small example before spaced recall.', kind: 'code', url: '', advance: false, criteriaConfirmed: false });
    const review = { missionId: 'pattern' as const, checkpointId, roadmapVersion: '2.0.0' as const, outcome: 'independent' as const, checks: { explanation: true, diagram: false, exercise: true }, notes: '' };
    state = recordRecall(state, review);
    expect(recallSummary(state, 'pattern', checkpointId, '2.0.0').status).toBe('practiced');
    vi.setSystemTime(new Date(started.getTime() + 25 * 3600_000));
    state = recordRecall(state, review);
    vi.setSystemTime(new Date(started.getTime() + 100 * 3600_000));
    state = recordRecall(state, review);
    expect(recallSummary(state, 'pattern', checkpointId, '2.0.0').status).toBe('retained');
    state = recordRecall(state, { ...review, outcome: 'partial' });
    expect(recallSummary(state, 'pattern', checkpointId, '2.0.0').status).toBe('practiced');
    expect(state.missions.pattern.completedCheckpointIds).toEqual([]);
  });

  it('rejects imported independent reviews without their required checks', () => {
    let state = createInitialState(false);
    const checkpointId = state.missions.pattern.checkpointId;
    state = recordEvidence(state, { missionId: 'pattern', checkpointId, title: 'Practice example', summary: 'A small example before spaced recall.', kind: 'code', url: '', advance: false, criteriaConfirmed: false });
    state = recordRecall(state, { missionId: 'pattern', checkpointId, roadmapVersion: '2.0.0', outcome: 'independent', checks: { explanation: true, diagram: false, exercise: true }, notes: '' });
    state.recalls[0].checks.exercise = false;
    expect(() => parseState(state)).toThrow(/required self-checks/);
  });

  it('keeps archived current-checkpoint status consistent with its retained evidence', () => {
    let state = createInitialState(false, '1.0.0');
    state = recordEvidence(state, { missionId: 'pattern', checkpointId: state.missions.pattern.checkpointId, title: 'Legacy practice', summary: 'A legacy example that must not disappear.', kind: 'code', url: '', advance: false, criteriaConfirmed: false });
    state = upgradeRoadmap(state, 'pattern');
    state.archives[0].progress.status = 'not-started';
    expect(() => parseState(state)).toThrow(/checkpoint with evidence must be started/);
  });
});
