import { describe, expect, it } from 'vitest';
import { createInitialState, parseState } from './domain/engine';
import { MAX_WORKSPACE_BYTES, serializeWorkspace } from './workspaceFile';
import type { Evidence } from './domain/types';

function nearLimitWorkspace() {
  const state = createInitialState(false);
  state.missions.pattern.status = 'in-progress';
  const evidence: Evidence = {
    id: 'artifact-0000',
    missionId: 'pattern',
    checkpointId: state.missions.pattern.checkpointId,
    title: 'Synthetic large backup',
    summary: 'x'.repeat(3900),
    kind: 'note',
    url: '',
    visibility: 'local',
    createdAt: state.updatedAt,
    completedCheckpoint: false,
  };
  const count = Math.floor((MAX_WORKSPACE_BYTES - JSON.stringify(state).length - 1024) / (JSON.stringify(evidence).length + 1));
  state.evidence = Array.from({ length: count }, (_, index) => ({
    ...evidence,
    id: `artifact-${String(index).padStart(4, '0')}`,
  }));
  return parseState(state);
}

describe('portable workspace encoding', () => {
  it('round-trips a valid workspace whose pretty-printed export would exceed the import limit', () => {
    const state = nearLimitWorkspace();
    expect(new TextEncoder().encode(JSON.stringify(state, null, 2)).byteLength).toBeGreaterThan(MAX_WORKSPACE_BYTES);
    const savedAndExported = serializeWorkspace(state);
    expect(new TextEncoder().encode(savedAndExported).byteLength).toBeLessThanOrEqual(MAX_WORKSPACE_BYTES);
    expect(parseState(JSON.parse(savedAndExported))).toEqual(state);
  });

  it('counts UTF-8 bytes rather than characters and leaves oversized data unchanged', () => {
    const state = nearLimitWorkspace();
    state.evidence = state.evidence.map(item => ({ ...item, summary: '\u2605'.repeat(3900) }));
    expect(JSON.stringify(state).length).toBeLessThan(MAX_WORKSPACE_BYTES);
    expect(() => serializeWorkspace(state)).toThrow('5 MB portable backup limit');
    expect(state.evidence[0].summary).toBe('\u2605'.repeat(3900));
  });

  it('uses the same lossless compact encoding for small and empty workspaces', () => {
    const state = createInitialState(false);
    expect(serializeWorkspace(state)).toBe(JSON.stringify(state));
    expect(parseState(JSON.parse(serializeWorkspace(state)))).toEqual(state);
  });
});
