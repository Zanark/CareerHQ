import { parseState, recordChange } from '../domain/engine';
import { personalProofFileSchema, personalProofListSchema } from '../domain/personalProofSchema';
import type { AppState, PersonalProof } from '../domain/types';

export function parsePersonalProofFile(value: unknown): PersonalProof[] {
  const result = personalProofFileSchema.safeParse(value);
  if (!result.success) throw new Error(`Invalid personal-history file: ${result.error.issues[0].message}`);
  return result.data.records;
}

export function newPersonalProof(state: AppState, records: PersonalProof[]): PersonalProof[] {
  return personalProofListSchema.parse(records).filter(record => {
    const existing = state.personalProof?.find(item => item.id === record.id);
    if (!existing) return true;
    if (existing.title !== record.title || existing.detail !== record.detail || existing.source !== record.source ||
        existing.date !== record.date || existing.url !== record.url) {
      throw new Error('A history record with the same ID has different content. Remove the old record only if you intend to replace it.');
    }
    return false;
  });
}

export function addPersonalProof(state: AppState, records: PersonalProof[]): AppState {
  const next = parseState(state);
  const added = newPersonalProof(next, records);
  if (!added.length) throw new Error('These history records are already saved. Nothing was added.');
  next.personalProof = [...next.personalProof ?? [], ...added];
  return recordChange(next, `Added ${added.length} personal-history ${added.length === 1 ? 'record' : 'records'}`);
}

export function removePersonalProof(state: AppState, id: string): AppState {
  if (!state.personalProof?.some(record => record.id === id)) throw new Error('That personal-history record no longer exists.');
  return recordChange({
    ...state, personalProof: state.personalProof.filter(record => record.id !== id),
  }, 'Removed a personal-history record');
}
