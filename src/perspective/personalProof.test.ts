import { describe, expect, it } from 'vitest';
import { createInitialState, parseState, recordChange } from '../domain/engine';
import { serializeWorkspace } from '../workspaceFile';
import { addPersonalProof, newPersonalProof, parsePersonalProofFile, removePersonalProof } from './personalProof';

const record = {
  id: 'personal-test-queue',
  title: 'Built a sample queue',
  detail: 'Implemented enqueue and dequeue in a fictional practice project.',
  source: 'Synthetic test note, page 2',
  url: '',
};
const file = { format: 'careerhq-personal-proof', version: 1, records: [record] };

describe('private personal history', () => {
  it('keeps old workspaces byte-equivalent without silently adding a new collection', () => {
    const state = createInitialState(false);
    expect(Object.hasOwn(state, 'personalProof')).toBe(false);
    expect(JSON.stringify(parseState(state))).toBe(JSON.stringify(state));
  });

  it('requires a recognized file, evidence source and safe links', () => {
    expect(parsePersonalProofFile(file)).toEqual([record]);
    for (const bad of [
      {}, { ...file, version: 2 }, { ...file, records: [] },
      { ...file, records: [{ ...record, source: '' }] },
      { ...file, records: [{ ...record, url: 'javascript:alert(1)' }] },
      { ...file, records: [{ ...record, date: '2026-02-30' }] },
      { ...file, records: [record, record] },
      { ...file, records: [{ ...record, completedCheckpoint: true }] },
    ]) expect(() => parsePersonalProofFile(bad)).toThrow();
  });

  it('merges explicitly without changing any mission, evidence, plan or recall', () => {
    const state = createInitialState(true);
    const before = JSON.stringify(state);
    const after = addPersonalProof(state, [record]);
    expect(JSON.stringify(state)).toBe(before);
    expect(after.personalProof).toEqual([record]);
    for (const field of ['missions', 'evidence', 'plans', 'recalls', 'archives', 'opportunities'] as const) expect(after[field]).toEqual(state[field]);
    expect(after.events.slice(0, -1)).toEqual(state.events);
    expect(parseState(JSON.parse(serializeWorkspace(after)))).toEqual(after);
  });

  it('deduplicates identical imports and rejects conflicting replacements', () => {
    const state = addPersonalProof(createInitialState(false), [record]);
    expect(newPersonalProof(state, [record])).toEqual([]);
    expect(() => addPersonalProof(state, [record])).toThrow(/already saved/);
    expect(() => newPersonalProof(state, [{ ...record, detail: 'Different fictional history with the same ID.' }])).toThrow(/different content/);
  });

  it('removes only the requested history entry, never its mission evidence', () => {
    const state = addPersonalProof(createInitialState(true), [record]);
    const after = removePersonalProof(state, record.id);
    expect(after.personalProof).toEqual([]);
    expect(after.evidence).toEqual(state.evidence);
    expect(after.missions).toEqual(state.missions);
    expect(() => removePersonalProof(after, record.id)).toThrow(/no longer exists/);
  });

  it('preserves global ID uniqueness and rejects oversized collections', () => {
    const state = recordChange(createInitialState(false), 'Synthetic pre-existing event');
    expect(() => addPersonalProof(state, [{ ...record, id: state.events[0].id }])).toThrow(/Duplicate record identifier/);
    expect(() => addPersonalProof(state, Array.from({ length: 201 }, (_, index) => ({ ...record, id: `personal-${index}` })))).toThrow();
  });
});
