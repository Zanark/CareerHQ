import { describe, expect, it } from 'vitest';
import type { CareerOrbit } from './careerOrbitTypes';
import { chooseCareerSceneHit, compactOrbitTooltip, showOrbitIdentityLabels } from './careerSceneInteraction';

const selection = { orbitId: 'orbit:mission:example', segmentId: 'stage:first' };
const orbit: CareerOrbit = {
  id: selection.orbitId, index: 0, kind: 'mission', label: 'Example mission', color: '#EDAE29',
  summary: 'A long saved-checkpoint paragraph that belongs only in the inspector.',
  detail: '', href: '/', hubNodeId: 'mission:example', memberIds: ['checkpoint:one', 'checkpoint:two'],
  segments: [{
    id: selection.segmentId, label: 'First stage',
    summary: 'Another long checkpoint summary that must not fill the canvas tooltip.',
    detail: '', members: [{ nodeId: 'checkpoint:one', status: 'incomplete', current: true }],
  }],
};

describe('career scene screen-space picking priority', () => {
  it.each([
    { nodeDistance: 8, anchorDistance: 1, kind: 'orbit' },
    { nodeDistance: 1, anchorDistance: 8, kind: 'node' },
    { nodeDistance: 0, anchorDistance: 0, kind: 'orbit' },
    { nodeDistance: 5, anchorDistance: 5, kind: 'orbit' },
    { nodeDistance: 0, anchorDistance: 0.00001, kind: 'orbit' },
  ])('chooses $kind for node=$nodeDistance and foreground anchor=$anchorDistance', ({ nodeDistance, anchorDistance, kind }) => {
    expect(chooseCareerSceneHit(
      { nodeId: 'checkpoint:one', distance: nodeDistance },
      { selection, distance: anchorDistance },
    )?.kind).toBe(kind);
  });

  it('never lets a ring path steal a valid work-node hit, even at the exact path position', () => {
    expect(chooseCareerSceneHit({ nodeId: 'checkpoint:one', distance: 8 }, undefined, selection))
      .toEqual({ kind: 'node', nodeId: 'checkpoint:one' });
  });

  it('falls back to visible anchors, then paths, then no hit', () => {
    expect(chooseCareerSceneHit(undefined, { selection, distance: 3 }))
      .toEqual({ kind: 'orbit', selection });
    expect(chooseCareerSceneHit(undefined, undefined, selection)).toEqual({ kind: 'orbit', selection });
    expect(chooseCareerSceneHit(undefined, undefined)).toBeUndefined();
  });
});

describe('compact orbit canvas labels', () => {
  it('uses only titles for selected fallback and short counts for hover, never full summaries', () => {
    expect(compactOrbitTooltip(orbit, selection, false)).toBe('Example mission · First stage');
    expect(compactOrbitTooltip(orbit, { orbitId: orbit.id }, false)).toBe('Example mission');
    expect(compactOrbitTooltip(orbit, selection, true)).toBe('Example mission · First stage · 1 checkpoint');
    expect(compactOrbitTooltip(orbit, { orbitId: orbit.id }, true)).toBe('Example mission · 2 checkpoints');
    const empty: CareerOrbit = { ...orbit, kind: 'action', label: 'Daily work', memberIds: [], segments: [] };
    expect(compactOrbitTooltip(empty, { orbitId: empty.id }, true)).toBe('Daily work · 0 records');
  });

  it.each([
    [639, 700, true, false], [640, 700, true, true], [1000, 349, true, false],
    [1000, 350, true, true], [1000, 700, false, false],
  ])('applies identity-label compact visibility at %s × %s', (width, height, decoration, expected) => {
    expect(showOrbitIdentityLabels(width as number, height as number, decoration as boolean)).toBe(expected);
  });
});
