import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createInitialState, parseState, recordChange, recordFocusSessionEvent, startFocusSession } from './engine';
import { focusRecordSignature, focusSessionSummary, focusSessionsSchema, MAX_FOCUS_EVENTS, MAX_FOCUS_SESSIONS } from './focusSession';
import type { AppState, FocusEventKind, FocusSessionEvent, FocusSessionRecord } from './types';
import { serializeWorkspace } from '../workspaceFile';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-10-05T08:00:00Z'));
});
afterEach(() => vi.useRealTimers());

function session(state: AppState) { return state.focusSessions!.at(-1)!; }
function event(state: AppState, kind: FocusEventKind, elapsedMs = 1000) {
  return recordFocusSessionEvent(state, { sessionId: session(state).id, kind, elapsedMs });
}

describe('persistent focus-session and distraction records', () => {
  it('keeps the optional collection absent from old workspaces and exact round trips', () => {
    const state = createInitialState(false, '2.0.0');
    const raw = serializeWorkspace(state);
    expect(state).not.toHaveProperty('focusSessions');
    expect(serializeWorkspace(parseState(JSON.parse(raw)))).toBe(raw);
  });

  it('records each press immediately with its own identity, timestamp and elapsed timer time', () => {
    let state = startFocusSession(createInitialState(false), 1500);
    const startedAt = session(state).startedAt;
    state = event(state, 'distraction', 1234);
    state = event(state, 'distraction', 1234);
    const reports = session(state).events;
    expect(reports).toHaveLength(2);
    expect(new Set(reports.map(item => item.id)).size).toBe(2);
    expect(reports.every(item => item.kind === 'distraction' && item.elapsedMs === 1234)).toBe(true);
    expect(Date.parse(reports[0].at)).toBeGreaterThanOrEqual(Date.parse(startedAt));
    expect(Date.parse(reports[1].at)).toBeGreaterThan(Date.parse(reports[0].at));
    expect(focusSessionSummary(session(state)).outcome).toBe('open');
  });

  it('exports all saved presses before completion and restores them without normalization loss', () => {
    let state = startFocusSession(createInitialState(false), 1500);
    state = event(state, 'distraction', 60_000);
    const raw = serializeWorkspace(state);
    const restored = parseState(JSON.parse(raw));
    expect(restored.focusSessions).toEqual(state.focusSessions);
    expect(serializeWorkspace(restored)).toBe(raw);
    expect(focusSessionSummary(session(restored)).distractions).toHaveLength(1);
    expect(focusSessionSummary(session(restored)).outcome).toBe('open');
  });

  it('distinguishes reports made while paused and excludes pause time from the stored counter', () => {
    let state = startFocusSession(createInitialState(false), 1500);
    state = event(state, 'distraction', 30_000);
    state = event(state, 'pause', 60_000);
    vi.advanceTimersByTime(300_000);
    state = event(state, 'distraction', 60_000);
    state = event(state, 'resume', 60_000);
    state = event(state, 'distraction', 61_000);
    const summary = focusSessionSummary(session(state));
    expect(summary.distractions.map(item => item.whilePaused)).toEqual([false, true, false]);
    expect(summary.elapsedMs).toBe(61_000);
    expect(summary.lastRecordedPhase).toBe('running');
  });

  it.each(['reset', 'complete'] as const)('%s retains every report without awarding any mission progress', kind => {
    const base = createInitialState(false);
    let state = startFocusSession(base, 60);
    state = event(state, 'distraction', 1000);
    state = event(state, kind, kind === 'complete' ? 60_000 : 2000);
    expect(focusSessionSummary(session(state)).outcome).toBe(kind === 'complete' ? 'completed' : 'reset');
    expect(focusSessionSummary(session(state)).distractions).toHaveLength(1);
    for (const field of ['missions', 'evidence', 'events', 'plans', 'readiness', 'opportunities', 'recalls'] as const) {
      expect(state[field]).toEqual(base[field]);
    }
    expect(parseState(JSON.parse(serializeWorkspace(state)))).toEqual(state);
  });

  it('preserves an unended record rather than inventing completion when a later session starts', () => {
    let state = startFocusSession(createInitialState(false), 1500);
    state = event(state, 'distraction');
    const first = session(state);
    state = startFocusSession(state, 600);
    expect(state.focusSessions).toHaveLength(2);
    expect(state.focusSessions![0]).toEqual(first);
    expect(focusSessionSummary(first).outcome).toBe('open');
    expect(session(state).id).not.toBe(first.id);
  });

  it('does not mutate previous records when extending the log', () => {
    const state = startFocusSession(createInitialState(false), 600);
    const before = serializeWorkspace(state);
    Object.freeze(session(state).events);
    Object.freeze(session(state));
    Object.freeze(state.focusSessions);
    Object.freeze(state);
    const after = event(state, 'distraction');
    expect(serializeWorkspace(state)).toBe(before);
    expect(session(after).events).toHaveLength(1);
  });

  it('keeps identifiers globally unique with every existing workspace collection', () => {
    let state = startFocusSession(createInitialState(false), 600);
    state = event(state, 'distraction');
    state = recordChange(state, 'Synthetic ordinary change');
    const corrupted = structuredClone(state);
    corrupted.events[0].id = session(corrupted).events[0].id;
    expect(() => parseState(corrupted)).toThrow('Duplicate record identifier');
    const rootCollision = structuredClone(state);
    rootCollision.events[0].id = session(rootCollision).id;
    expect(() => parseState(rootCollision)).toThrow('Duplicate record identifier');
  });

  it('does not reorder new reports if the system clock moves backward', () => {
    let state = startFocusSession(createInitialState(false), 600);
    state = event(state, 'distraction');
    const previous = session(state).events[0].at;
    vi.setSystemTime(new Date('2026-10-04T08:00:00Z'));
    state = event(state, 'distraction', 2000);
    expect(Date.parse(session(state).events[1].at)).toBeGreaterThan(Date.parse(previous));
  });

  it.each([
    ['unknown session', { sessionId: 'missing', kind: 'distraction', elapsedMs: 0 }],
    ['negative time', { kind: 'distraction', elapsedMs: -1 }],
    ['fractional time', { kind: 'distraction', elapsedMs: 0.5 }],
    ['excess time', { kind: 'distraction', elapsedMs: 60_001 }],
    ['premature completion', { kind: 'complete', elapsedMs: 1 }],
    ['resume while running', { kind: 'resume', elapsedMs: 0 }],
  ] as const)('rejects %s without losing the saved log', (_name, change) => {
    const state = startFocusSession(createInitialState(false), 60);
    const before = serializeWorkspace(state);
    expect(() => recordFocusSessionEvent(state, { sessionId: session(state).id, ...change })).toThrow();
    expect(serializeWorkspace(state)).toBe(before);
  });

  it('rejects increasing paused time, backward counters, and events after an ending', () => {
    let state = startFocusSession(createInitialState(false), 60);
    state = event(state, 'pause', 1000);
    expect(() => event(state, 'distraction', 2000)).toThrow('Paused focus time');
    expect(() => event(state, 'distraction', 999)).toThrow('elapsed time');
    state = event(state, 'reset', 1000);
    expect(() => event(state, 'distraction', 1000)).toThrow('finished focus session');
  });

  it('rejects malformed timestamps, extra properties and duplicate focus event IDs in imports', () => {
    const state = event(startFocusSession(createInitialState(false), 60), 'distraction');
    const malformed = JSON.parse(serializeWorkspace(state));
    malformed.focusSessions[0].events[0].at = 'not-a-time';
    expect(() => parseState(malformed)).toThrow('Invalid workspace');
    const extra = JSON.parse(serializeWorkspace(state));
    extra.focusSessions[0].events[0].attentionScore = 100;
    expect(() => parseState(extra)).toThrow('Invalid workspace');
    const duplicate = structuredClone(state);
    session(duplicate).events.push({ ...session(duplicate).events[0] });
    expect(() => parseState(duplicate)).toThrow('duplicate identifiers');
    const early = structuredClone(state);
    session(early).events[0].at = '2026-10-04T08:00:00Z';
    expect(() => parseState(early)).toThrow('chronological order');
  });

  it('detects replacement even when an importer keeps the same record and event IDs', () => {
    const state = event(startFocusSession(createInitialState(false), 60), 'distraction');
    const original = session(state);
    const replaced = structuredClone(original);
    replaced.events[0].elapsedMs++;
    expect(focusRecordSignature(replaced)).not.toBe(focusRecordSignature(original));
  });

  it('rejects a stale owner atomically before appending to a same-ID imported record', () => {
    const state = event(startFocusSession(createInitialState(false), 60), 'distraction');
    const ownedSignature = focusRecordSignature(session(state));
    const imported = structuredClone(state);
    session(imported).events[0].elapsedMs = 1500;
    const before = serializeWorkspace(imported);
    expect(() => recordFocusSessionEvent(imported, {
      sessionId: session(imported).id, kind: 'distraction', elapsedMs: 2000,
    }, ownedSignature)).toThrow('focus record was replaced');
    expect(serializeWorkspace(imported)).toBe(before);
    const accepted = recordFocusSessionEvent(state, {
      sessionId: session(state).id, kind: 'distraction', elapsedMs: 2000,
    }, ownedSignature);
    expect(session(accepted).events).toHaveLength(2);
  });

  it('bounds the complete log without silently truncating any record', () => {
    const at = '2026-10-05T08:00:00Z';
    const example: FocusSessionRecord = { id: 'focus-one', startedAt: at, plannedSeconds: 60, events: [] };
    expect(focusSessionsSchema.safeParse(Array.from({ length: MAX_FOCUS_SESSIONS + 1 }, (_, index) => ({
      ...example, id: `focus-${index}`,
    }))).success).toBe(false);
    const makeEvents = (prefix: string): FocusSessionEvent[] => Array.from({ length: MAX_FOCUS_EVENTS / 2 + 1 }, (_, index) => ({
      id: `${prefix}-${index}`, kind: 'distraction', at, elapsedMs: 0,
    }));
    const oversized = [{ ...example, events: makeEvents('one') }, { ...example, id: 'focus-two', events: makeEvents('two') }];
    const result = focusSessionsSchema.safeParse(oversized);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.message).toContain('20,000-event limit');
    expect(oversized[0].events).toHaveLength(MAX_FOCUS_EVENTS / 2 + 1);
  });
});
