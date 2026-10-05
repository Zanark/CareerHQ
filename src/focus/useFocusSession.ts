import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { recordFocusSessionEvent, startFocusSession } from '../domain/engine';
import { focusRecordSignature, FocusRecordReplacedError, focusSessionSummary } from '../domain/focusSession';
import type { FocusEventKind, FocusSessionRecord } from '../domain/types';
import type { WorkspaceModel } from '../useWorkspace';
import type { FocusSessionController } from './focusTypes';

interface RunningSession {
  id: string;
  plannedSeconds: number;
  phase: 'running' | 'paused' | 'finished';
  elapsedMs: number;
  resumedAt: number;
  signature: string;
}

function durationFor(workspace: WorkspaceModel) {
  return workspace.state?.capacity === 'gentle' ? 10 : workspace.state?.capacity === 'deep' ? 50 : 25;
}

function elapsed(session: RunningSession) {
  const additional = session.phase === 'running' ? Math.max(0, performance.now() - session.resumedAt) : 0;
  return Math.min(session.plannedSeconds * 1000, Math.floor(session.elapsedMs + additional));
}

export function useFocusSession(workspace: WorkspaceModel, persistencePaused = false): FocusSessionController {
  const latest = useRef({ workspace, persistencePaused });
  latest.current = { workspace, persistencePaused };
  const active = useRef<RunningSession | null>(null);
  const finishPending = useRef(false);
  const [pendingSave, setPendingSave] = useState(false);
  const [recordId, setRecordId] = useState<string>();
  const [error, setError] = useState('');
  const defaultDuration = durationFor(workspace);
  const [clock, setClock] = useState<{
    remaining: number; duration: number; phase: FocusSessionController['phase'];
  }>(() => ({ remaining: defaultDuration * 60, duration: defaultDuration, phase: 'ready' }));

  const clearRuntime = useCallback((notice = '') => {
    active.current = null;
    finishPending.current = false;
    setPendingSave(false);
    setRecordId(undefined);
    setError(notice);
    const duration = durationFor(latest.current.workspace);
    setClock({ remaining: duration * 60, duration, phase: 'ready' });
  }, []);
  const stopReplaced = useCallback(() => clearRuntime(
    'The timer stopped because its saved focus record was replaced. Previously saved reports remain in the current workspace or your backup.',
  ), [clearRuntime]);

  const showClock = useCallback((session: RunningSession) => {
    const remaining = Math.max(0, Math.ceil((session.plannedSeconds * 1000 - elapsed(session)) / 1000));
    setClock(previous => previous.remaining === remaining && previous.phase === session.phase &&
      previous.duration === session.plannedSeconds / 60 ? previous :
      { remaining, duration: session.plannedSeconds / 60, phase: session.phase });
  }, []);

  const saveEvent = useCallback((kind: FocusEventKind, elapsedMs: number) => {
    const session = active.current;
    if (!session || latest.current.persistencePaused) return false;
    let saved: FocusSessionRecord | undefined;
    let replaced = false;
    const ok = latest.current.workspace.commit(state => {
      try {
        const next = recordFocusSessionEvent(state, { sessionId: session.id, kind, elapsedMs }, session.signature);
        saved = next.focusSessions?.find(record => record.id === session.id);
        return next;
      } catch (cause) {
        if (cause instanceof FocusRecordReplacedError) replaced = true;
        throw cause;
      }
    });
    if (replaced) { stopReplaced(); return false; }
    if (!ok || !saved) {
      setError(kind === 'distraction'
        ? 'Distraction not saved. Your previous records are intact; resolve the storage warning before trying again.'
        : 'The focus-session change was not saved. Your previous records are intact.');
      return false;
    }
    session.signature = focusRecordSignature(saved);
    setError('');
    return true;
  }, [stopReplaced]);

  const retrySave = useCallback(() => {
    const session = active.current;
    if (!finishPending.current || !session || latest.current.persistencePaused) return false;
    if (!saveEvent('complete', session.plannedSeconds * 1000)) {
      if (active.current === session) setError('The timer ended, but its ending was not saved. Retry saving before starting another session.');
      return false;
    }
    finishPending.current = false;
    setPendingSave(false);
    return true;
  }, [saveEvent]);

  const finish = useCallback(() => {
    const session = active.current;
    if (!session) return false;
    session.elapsedMs = session.plannedSeconds * 1000;
    session.phase = 'finished';
    showClock(session);
    finishPending.current = true;
    setPendingSave(true);
    return latest.current.persistencePaused ? false : retrySave();
  }, [retrySave, showClock]);

  const start = useCallback(() => {
    if (latest.current.persistencePaused) return false;
    const plannedSeconds = durationFor(latest.current.workspace) * 60;
    let saved: FocusSessionRecord | undefined;
    const ok = latest.current.workspace.commit(state => {
      const next = startFocusSession(state, plannedSeconds);
      saved = next.focusSessions?.at(-1);
      return next;
    });
    if (!ok || !saved) {
      setError('A recorded focus session could not be started. Resolve the storage warning first.');
      return false;
    }
    active.current = {
      id: saved.id, plannedSeconds, phase: 'running', elapsedMs: 0,
      resumedAt: performance.now(), signature: focusRecordSignature(saved),
    };
    setRecordId(saved.id);
    setError('');
    showClock(active.current);
    return true;
  }, [showClock]);

  const toggle = useCallback(() => {
    if (finishPending.current) {
      setError('Save the previous session ending before starting another session.');
      return false;
    }
    const session = active.current;
    if (!session || session.phase === 'finished') return start();
    const currentElapsed = elapsed(session);
    if (session.phase === 'running' && currentElapsed >= session.plannedSeconds * 1000) return finish();
    const kind = session.phase === 'running' ? 'pause' : 'resume';
    if (!saveEvent(kind, currentElapsed)) return false;
    session.elapsedMs = currentElapsed;
    session.resumedAt = performance.now();
    session.phase = kind === 'pause' ? 'paused' : 'running';
    showClock(session);
    return true;
  }, [finish, saveEvent, showClock, start]);

  const reset = useCallback(() => {
    if (finishPending.current) {
      setError('Save the session ending before resetting the clock.');
      return false;
    }
    const session = active.current;
    if (session && session.phase !== 'finished') {
      const currentElapsed = elapsed(session);
      if (session.phase === 'running' && currentElapsed >= session.plannedSeconds * 1000) {
        if (!finish()) return false;
      } else if (!saveEvent('reset', currentElapsed)) return false;
    }
    active.current = null;
    const duration = durationFor(latest.current.workspace);
    setClock({ remaining: duration * 60, duration, phase: 'ready' });
    setError('');
    return true;
  }, [finish, saveEvent]);

  const logDistraction = useCallback(() => {
    const session = active.current;
    if (!session || session.phase === 'finished') {
      setError('Start a focus session before recording a distraction.');
      return false;
    }
    const currentElapsed = elapsed(session);
    if (!saveEvent('distraction', currentElapsed)) return false;
    if (session.phase === 'running' && currentElapsed >= session.plannedSeconds * 1000) finish();
    return true;
  }, [finish, saveEvent]);

  const discard = useCallback(() => clearRuntime(), [clearRuntime]);

  useEffect(() => {
    if (clock.phase !== 'running') return;
    const tick = () => {
      const session = active.current;
      if (!session || session.phase !== 'running') return;
      if (elapsed(session) >= session.plannedSeconds * 1000) finish();
      else showClock(session);
    };
    const timer = window.setInterval(tick, 250);
    return () => window.clearInterval(timer);
  }, [clock.phase, finish, showClock]);

  useEffect(() => {
    if (!active.current) setClock(previous => previous.phase === 'ready'
      ? { remaining: defaultDuration * 60, duration: defaultDuration, phase: 'ready' } : previous);
  }, [defaultDuration]);

  useEffect(() => {
    if (!persistencePaused && finishPending.current) retrySave();
  }, [persistencePaused, retrySave]);

  useEffect(() => {
    const session = active.current;
    if (!session) return;
    const record = workspace.state?.focusSessions?.find(item => item.id === session.id);
    if (!record || focusRecordSignature(record) !== session.signature) {
      stopReplaced();
    }
  }, [workspace.state?.focusSessions, stopReplaced]);

  const record = workspace.state?.focusSessions?.find(item => item.id === recordId);
  const summary = useMemo(() => record ? focusSessionSummary(record) : undefined, [record]);
  const combinedError = workspace.conflict && active.current ? 'This workspace changed in another tab. Reload before saving focus records.'
    : error ? `${error}${workspace.error ? ` ${workspace.error}` : ''}` : '';
  return {
    ...clock, running: clock.phase === 'running',
    distractionCount: summary?.distractions.length ?? 0,
    distractionLabel: clock.phase === 'ready' ? 'Last session' : 'This session',
    hasRecordedSession: !!record,
    canLogDistraction: (clock.phase === 'running' || clock.phase === 'paused') && !persistencePaused && !workspace.conflict,
    pendingSave, error: combinedError,
    toggle, reset, logDistraction, retrySave, discard,
  };
}
