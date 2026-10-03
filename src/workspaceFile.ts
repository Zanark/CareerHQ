import type { AppState } from './domain/types';

export const MAX_WORKSPACE_BYTES = 5 * 1024 * 1024;

export function serializeWorkspace(state: AppState): string {
  const json = JSON.stringify(state);
  if (new TextEncoder().encode(json).byteLength > MAX_WORKSPACE_BYTES) {
    throw new Error('The workspace exceeds the 5 MB portable backup limit. Export your current data before starting a new workspace.');
  }
  return json;
}
