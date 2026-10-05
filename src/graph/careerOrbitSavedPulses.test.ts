import { describe, expect, it } from 'vitest';
import type { CareerGraphNode } from './careerGraphModel';
import type { CareerOrbit } from './careerOrbitTypes';
import { CareerOrbitSavedPulses, SAVED_STATUS_PULSE_SECONDS } from './careerOrbitSavedPulses';

function orbit(): CareerOrbit {
  return {
    id: 'orbit:mission:example', index: 0, kind: 'mission', label: 'Example',
    summary: '', detail: '', color: '#EDAE29', href: '/', hubNodeId: 'mission:example',
    roadmapVersion: '1.0.0', currentNodeId: 'checkpoint:current',
    memberIds: ['checkpoint:current', 'checkpoint:later'],
    segments: [{
      id: 'stage:one', label: 'Stage one', summary: '', detail: '', members: [
        { nodeId: 'checkpoint:current', status: 'incomplete', current: true },
        { nodeId: 'checkpoint:later', status: 'incomplete', current: false },
      ],
    }],
  };
}

function visible(): Map<string, Pick<CareerGraphNode, 'kind' | 'archived' | 'roadmapVersion'>> {
  return new Map([
    ['checkpoint:current', { kind: 'checkpoint', roadmapVersion: '1.0.0' }],
    ['checkpoint:later', { kind: 'checkpoint', roadmapVersion: '1.0.0' }],
  ]);
}

function complete(data: CareerOrbit): void {
  data.segments[0].members[0].status = 'complete';
  data.segments[0].members[0].current = false;
  data.segments[0].members[1].current = true;
  data.currentNodeId = 'checkpoint:later';
}

describe('saved-status pulse qualification', () => {
  it('observes copied full-orbit statuses, triggering only the previously current checkpoint transition', () => {
    const data = orbit(), tracker = new CareerOrbitSavedPulses();
    tracker.setEnabled(true);
    const nodes = visible();
    tracker.observe([data], nodes);
    expect(tracker.active).toHaveLength(0);
    complete(data);
    tracker.observe([data], nodes);
    expect(tracker.active).toEqual([{
      orbitId: data.id, segmentId: 'stage:one', nodeId: 'checkpoint:current', roadmapVersion: '1.0.0', elapsed: 0,
    }]);
    tracker.advance(0.4);
    tracker.observe([data], nodes);
    expect(tracker.active[0].elapsed).toBe(0.4);
  });

  it.each(['initial', 'new-member', 'new-orbit', 'new-visible-node', 'hidden-completion'] as const)('never pulses on %s appearance', scenario => {
    const data = orbit(), tracker = new CareerOrbitSavedPulses();
    tracker.setEnabled(true);
    const nodes = visible();
    if (scenario === 'new-member') {
      const previous = orbit();
      previous.segments[0].members.shift();
      previous.memberIds.shift();
      tracker.observe([previous], nodes);
    } else if (scenario === 'new-orbit') {
      tracker.observe([data], nodes);
      tracker.observe([], nodes);
    } else if (scenario === 'new-visible-node' || scenario === 'hidden-completion') {
      tracker.observe([data], new Map());
    }
    complete(data);
    tracker.observe([data], scenario === 'hidden-completion' ? new Map() : nodes);
    tracker.observe([data], nodes);
    expect(tracker.active).toHaveLength(0);
  });

  it('keeps filter and layer changes silent while retaining the full member-status baseline', () => {
    const data = orbit(), tracker = new CareerOrbitSavedPulses();
    tracker.setEnabled(true);
    tracker.observe([data], visible());
    tracker.observe([data], new Map());
    tracker.observe([data], visible());
    expect(tracker.active).toHaveLength(0);
    complete(data);
    tracker.observe([data], visible());
    expect(tracker.active).toHaveLength(1);
    tracker.observe([data], new Map());
    expect(tracker.active).toHaveLength(0);
    tracker.observe([data], visible());
    expect(tracker.active).toHaveLength(0);
  });

  it.each(['version-change', 'archive', 'history', 'collection', 'preview-node', 'undefined-version'] as const)('rejects %s transitions', scenario => {
    const data = orbit(), tracker = new CareerOrbitSavedPulses();
    tracker.setEnabled(true);
    const nodes = visible();
    if (scenario === 'history') data.kind = 'history';
    if (scenario === 'collection') data.kind = 'action';
    if (scenario === 'undefined-version') delete data.roadmapVersion;
    tracker.observe([data], nodes);
    complete(data);
    if (scenario === 'version-change') {
      data.roadmapVersion = '2.0.0';
      nodes.get('checkpoint:current')!.roadmapVersion = '2.0.0';
    }
    if (scenario === 'archive') nodes.get('checkpoint:current')!.archived = true;
    if (scenario === 'preview-node') nodes.get('checkpoint:current')!.kind = 'curriculum';
    tracker.observe([data], nodes);
    expect(tracker.active).toHaveLength(0);
  });

  it('ignores noncurrent completions, reversions and reference-to-complete changes', () => {
    for (const before of ['incomplete', 'complete', 'reference'] as const) {
      const data = orbit(), tracker = new CareerOrbitSavedPulses();
      tracker.setEnabled(true);
      data.segments[0].members[0].status = before;
      data.segments[0].members[0].current = before !== 'incomplete';
      tracker.observe([data], visible());
      data.segments[0].members[0].status = before === 'complete' ? 'incomplete' : 'complete';
      data.segments[0].members[1].status = 'complete';
      tracker.observe([data], visible());
      expect(tracker.active).toHaveLength(0);
    }
  });

  it('expires after a bounded active duration with no wall clock, scheduler or persistent state', () => {
    const data = orbit(), tracker = new CareerOrbitSavedPulses();
    tracker.setEnabled(true);
    tracker.observe([data], visible());
    complete(data);
    tracker.observe([data], visible());
    tracker.advance(0);
    tracker.advance(-5);
    tracker.advance(Infinity);
    expect(tracker.active[0].elapsed).toBe(0);
    tracker.advance(SAVED_STATUS_PULSE_SECONDS - 0.01);
    expect(tracker.active).toHaveLength(1);
    tracker.advance(0.02);
    expect(tracker.active).toHaveLength(0);
    tracker.observe([data], visible());
    expect(tracker.active).toHaveLength(0);
  });

  it('suppresses paused/reduced-motion transitions and cancels an in-flight pulse without replay on opt-in', () => {
    const data = orbit(), tracker = new CareerOrbitSavedPulses();
    tracker.observe([data], visible());
    complete(data);
    tracker.observe([data], visible());
    tracker.setEnabled(true);
    tracker.observe([data], visible());
    expect(tracker.active).toHaveLength(0);
    const next = orbit();
    tracker.observe([next], visible());
    complete(next);
    tracker.observe([next], visible());
    expect(tracker.active).toHaveLength(1);
    tracker.setEnabled(false);
    expect(tracker.active).toHaveLength(0);
    tracker.setEnabled(true);
    tracker.observe([next], visible());
    expect(tracker.active).toHaveLength(0);
    tracker.dispose();
    tracker.setEnabled(true);
    tracker.observe([next], visible());
    expect(tracker.active).toHaveLength(0);
  });
});
