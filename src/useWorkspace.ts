import { useEffect, useRef, useState } from 'react';
import { createInitialState, generatePlan, localDate, parseState, STORAGE_KEY } from './domain/engine';
import type { AppState } from './domain/types';
import { serializeWorkspace } from './workspaceFile';

function message(error: unknown) {
  return error instanceof Error ? error.message : 'An unexpected storage error occurred.';
}

function loadWorkspace() {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
    const state = raw ? parseState(JSON.parse(raw)) : createInitialState();
    const date = localDate();
    if (!state.plans[date]) state.plans[date] = generatePlan(state, date);
    const serialized = serializeWorkspace(state);
    localStorage.setItem(STORAGE_KEY, serialized);
    return { state, serialized, raw, error: '' };
  } catch (error) {
    return { state: null, serialized: raw, raw, error: message(error) };
  }
}

export function downloadFile(content: string, filename: string, type = 'application/json') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function useWorkspace() {
  const [initial] = useState(loadWorkspace);
  const [state, setState] = useState<AppState | null>(initial.state);
  const stateRef = useRef(state);
  const serialized = useRef(initial.serialized);
  const [error, setError] = useState(initial.error);
  const [conflict, setConflict] = useState(false);
  const [date, setDate] = useState(localDate);

  useEffect(() => {
    const timer = window.setInterval(() => setDate(localDate()), 30_000);
    const onStorage = (event: StorageEvent) => {
      if ((event.key === STORAGE_KEY || event.key === null) && event.newValue !== serialized.current) {
        setConflict(true);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => { window.clearInterval(timer); window.removeEventListener('storage', onStorage); };
  }, []);

  function replace(next: AppState): boolean {
    try {
      if (conflict || localStorage.getItem(STORAGE_KEY) !== serialized.current) {
        setConflict(true);
        throw new Error('This workspace changed in another tab. Reload before making changes.');
      }
      const valid = parseState(next);
      const json = serializeWorkspace(valid);
      localStorage.setItem(STORAGE_KEY, json);
      serialized.current = json;
      stateRef.current = valid;
      setState(valid);
      setError('');
      return true;
    } catch (cause) {
      setError(`Not saved. ${message(cause)}`);
      return false;
    }
  }

  function commit(transform: (current: AppState) => AppState): boolean {
    if (!stateRef.current) return false;
    try {
      return replace(transform(stateRef.current));
    } catch (cause) {
      setError(`Not saved. ${message(cause)}`);
      return false;
    }
  }

  useEffect(() => {
    if (stateRef.current && !stateRef.current.plans[date]) {
      commit(current => ({
        ...current,
        plans: { ...current.plans, [date]: generatePlan(current, date) },
      }));
    }
  }, [date, state]); // A new day or imported workspace gets a plan, never yesterday's backlog.

  return { state, date, error, setError, conflict, commit, replace, recoveryRaw: initial.raw };
}
