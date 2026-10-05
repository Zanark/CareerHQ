import { describe, expect, it } from 'vitest';
import { createPracticeState } from './usePracticeWorkspace';
import { createInitialState, parseState, recordEvidence, upgradeRoadmap } from './domain/engine';

describe('tutorial practice state', () => {
  it('starts with independent example data and a usable plan, not assumed completion', () => {
    const state = createPracticeState('2026-10-04');
    expect(parseState(state)).toEqual(state);
    expect(state.sampleData).toBe(true);
    expect(state.evidence).toEqual([]);
    expect(state.events).toEqual([]);
    expect(state.opportunities).toEqual([]);
    expect(state.plans['2026-10-04'].length).toBeGreaterThan(0);
    expect(state.plans['2026-10-04'].length).toBeLessThanOrEqual(3);
    expect(state.plans['2026-10-04'].reduce((total, action) => total + action.minutes, 0)).toBeLessThanOrEqual(75);
    expect(state.missions.algorithm.mode).toBe('background');
    expect(state.missions.fabric.roadmapVersion).toBe('1.0.0');
    expect(state.missions.fabric.completedCheckpointIds).toEqual([]);
  });

  it('practice progression cannot mutate a separately created real workspace', () => {
    const real = createInitialState(false);
    const original = JSON.stringify(real);
    const practice = createPracticeState();
    const after = recordEvidence(practice, {
      missionId: 'pattern', checkpointId: practice.missions.pattern.checkpointId,
      title: 'Tutorial example', summary: 'Synthetic example with explicit completion criteria.',
      kind: 'code', url: '', advance: true, criteriaConfirmed: true,
    });
    expect(after.missions.pattern.completedCheckpointIds).toHaveLength(1);
    expect(JSON.stringify(real)).toBe(original);
    expect(createPracticeState().evidence).toEqual([]);
  });

  it('offers an older practice roadmap for explicit adoption without touching the real one', () => {
    const real = createInitialState(false);
    const original = JSON.stringify(real);
    const practice = createPracticeState();
    const adopted = upgradeRoadmap(practice, 'fabric');
    expect(adopted.missions.fabric.roadmapVersion).toBe('3.0.0');
    expect(adopted.missions.fabric.completedCheckpointIds).toEqual([]);
    expect(adopted.archives[0].progress).toEqual(practice.missions.fabric);
    expect(JSON.stringify(real)).toBe(original);
    expect(createPracticeState().missions.fabric.roadmapVersion).toBe('1.0.0');
  });
});
