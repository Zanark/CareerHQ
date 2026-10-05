import { z } from 'zod';
import { idSchema, timestampSchema } from './legacyState';
import type { FocusSessionRecord } from './types';

export const MAX_FOCUS_SESSIONS = 5000;
export const MAX_FOCUS_EVENTS = 20000;
export const focusDurationSchema = z.number().int().min(60).max(4 * 60 * 60);
export const focusEventKindSchema = z.enum(['pause', 'resume', 'distraction', 'complete', 'reset']);

export class FocusRecordReplacedError extends Error {
  constructor() { super('The focus record was replaced. The previous timer can no longer write to it.'); }
}

const focusEventSchema = z.object({
  id: idSchema,
  kind: focusEventKindSchema,
  at: timestampSchema,
  elapsedMs: z.number().int().min(0).max(4 * 60 * 60 * 1000),
}).strict();

export const focusSessionSchema = z.object({
  id: idSchema,
  startedAt: timestampSchema,
  plannedSeconds: focusDurationSchema,
  events: z.array(focusEventSchema).max(MAX_FOCUS_EVENTS),
}).strict().superRefine((session, context) => {
  let phase: 'running' | 'paused' | 'closed' = 'running';
  let previousTime = Date.parse(session.startedAt);
  if (!Number.isFinite(previousTime)) context.addIssue({ code: z.ZodIssueCode.custom, path: ['startedAt'], message: 'Invalid focus start timestamp.' });
  let previousElapsed = 0;
  for (const [index, event] of session.events.entries()) {
    const issue = (message: string) => context.addIssue({ code: z.ZodIssueCode.custom, path: ['events', index], message });
    const time = Date.parse(event.at);
    if (!Number.isFinite(time)) issue('Invalid focus event timestamp.');
    if (time < previousTime) issue('Focus events must follow session start in chronological order.');
    if (event.elapsedMs < previousElapsed || event.elapsedMs > session.plannedSeconds * 1000) {
      issue('Focus elapsed time must be ordered and within the planned duration.');
    }
    if (phase === 'closed') issue('A finished focus session cannot receive more events.');
    if (phase === 'paused' && event.elapsedMs !== previousElapsed) issue('Paused focus time cannot increase.');
    if (event.kind === 'pause' && phase !== 'running') issue('Only a running focus session can be paused.');
    if (event.kind === 'resume' && phase !== 'paused') issue('Only a paused focus session can be resumed.');
    if (event.kind === 'complete' && (phase !== 'running' || event.elapsedMs !== session.plannedSeconds * 1000)) {
      issue('Timer completion requires the full planned running duration.');
    }
    if (event.kind === 'pause') phase = 'paused';
    if (event.kind === 'resume') phase = 'running';
    if (event.kind === 'complete' || event.kind === 'reset') phase = 'closed';
    previousTime = time;
    previousElapsed = event.elapsedMs;
  }
});

export const focusSessionsSchema = z.array(focusSessionSchema).max(MAX_FOCUS_SESSIONS)
  .superRefine((sessions, context) => {
    const ids = new Set<string>();
    let count = 0;
    for (const session of sessions) {
      for (const id of [session.id, ...session.events.map(event => event.id)]) {
        if (ids.has(id)) context.addIssue({ code: z.ZodIssueCode.custom, message: 'Focus history contains duplicate identifiers.' });
        ids.add(id);
      }
      count += session.events.length;
    }
    if (count > MAX_FOCUS_EVENTS) context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'The focus history has reached its 20,000-event limit. Export your existing records before starting a new workspace.',
    });
  });

export const focusEventInputSchema = z.object({
  sessionId: idSchema,
  kind: focusEventKindSchema,
  elapsedMs: z.number().int().min(0).max(4 * 60 * 60 * 1000),
}).strict();

export function focusSessionSummary(session: FocusSessionRecord) {
  let lastRecordedPhase: 'running' | 'paused' | 'closed' = 'running';
  let outcome: 'open' | 'completed' | 'reset' = 'open';
  const distractions: { id: string; at: string; elapsedMs: number; whilePaused: boolean }[] = [];
  for (const event of session.events) {
    if (event.kind === 'distraction') distractions.push({
      id: event.id, at: event.at, elapsedMs: event.elapsedMs, whilePaused: lastRecordedPhase === 'paused',
    });
    if (event.kind === 'pause') lastRecordedPhase = 'paused';
    if (event.kind === 'resume') lastRecordedPhase = 'running';
    if (event.kind === 'complete' || event.kind === 'reset') {
      lastRecordedPhase = 'closed';
      outcome = event.kind === 'complete' ? 'completed' : 'reset';
    }
  }
  return {
    outcome, lastRecordedPhase, distractions,
    elapsedMs: session.events.at(-1)?.elapsedMs ?? 0,
    lastRecordedAt: session.events.at(-1)?.at ?? session.startedAt,
  };
}

export function focusRecordSignature(session: FocusSessionRecord) {
  return JSON.stringify(session);
}
