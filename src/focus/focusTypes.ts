export interface FocusSessionController {
  remaining: number;
  duration: number;
  running: boolean;
  phase: 'ready' | 'running' | 'paused' | 'finished';
  distractionCount: number;
  distractionLabel: 'This session' | 'Last session';
  hasRecordedSession: boolean;
  canLogDistraction: boolean;
  pendingSave: boolean;
  error: string;
  toggle: () => boolean;
  reset: () => boolean;
  logDistraction: () => boolean;
  retrySave: () => boolean;
  discard: () => void;
}

export interface FocusRoomHandle {
  open: () => void;
  close: () => void;
}
