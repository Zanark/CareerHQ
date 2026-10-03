import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check, LockKeyhole } from 'lucide-react';
import { getMission, missions } from './domain/catalog';
import { getSaveState, localDate } from './domain/engine';
import type { AppState, DailyAction, EvidenceInput, EvidenceKind, MissionId, Opportunity } from './domain/types';
import { kindLabels, Modal } from './components';

export function EvidenceDialog({ state, initialMission, action, onSave, onClose }: {
  state: AppState;
  initialMission: MissionId;
  action?: DailyAction;
  onSave: (input: EvidenceInput) => boolean;
  onClose: () => void;
}) {
  const [missionId, setMission] = useState(initialMission);
  const [advance, setAdvance] = useState(false);
  const [confirmed, setConfirmed] = useState<string[]>([]);
  const [error, setError] = useState('');
  const mission = getMission(missionId);
  const save = getSaveState(mission, state);
  const eligible = missions.filter(item => !item.planned && state.missions[item.id].mode === 'active' && state.missions[item.id].status !== 'completed' && !state.missions[item.id].blocker);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!save.checkpoint) return setError('Select a mission with an available checkpoint.');
    const data = new FormData(event.currentTarget);
    const input: EvidenceInput = {
      missionId, checkpointId: save.checkpoint.id,
      title: String(data.get('title')).trim(),
      summary: String(data.get('summary')).trim(),
      kind: String(data.get('kind')) as EvidenceKind,
      url: String(data.get('url')).trim(), advance,
      criteriaConfirmed: confirmed.length === save.checkpoint.criteria.length,
      actionId: action?.missionId === missionId && action.date === localDate() ? action.id : undefined,
    };
    if (!input.title || !input.summary) return setError('A title and a short description of your work are required.');
    if (onSave(input)) onClose();
    else setError('The evidence could not be saved. Check the workspace warning and try again.');
  }

  return <Modal title="Keep the proof." subtitle="A small artifact today. Something you can return to tomorrow." onClose={onClose}>
    <form onSubmit={submit} className="stack-form">
      <label>Mission<select value={missionId} disabled={!!action} onChange={event => { setMission(event.target.value as MissionId); setConfirmed([]); setAdvance(false); }}>
        {eligible.map(item => <option key={item.id} value={item.id}>{item.operation}</option>)}
      </select></label>
      <div className="form-context"><span className="eyebrow">CURRENT CHECKPOINT</span><strong>{save.checkpoint?.title ?? 'No checkpoint available'}</strong></div>
      {action && action.date !== localDate() && <p className="form-context small">A new day has started. Your draft is safe: it will be saved as checkpoint evidence, without changing yesterday’s plan.</p>}
      <div className="form-row"><label>What did you make?<select name="kind" defaultValue="explanation">{Object.entries(kindLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label><label>Artifact title<input name="title" placeholder="e.g. Cache-aside, from memory" required minLength={3} maxLength={120} /></label></div>
      <label>A little context<textarea name="summary" placeholder="What did you practice, produce, or discover? What can you now explain?" required minLength={10} maxLength={2000} rows={3} /></label>
      <label>Link to your work <span className="optional">(optional)</span><input type="url" name="url" placeholder="https://..." maxLength={2000} /></label>
      <label className="checkbox-label completion-choice"><input type="checkbox" checked={advance} onChange={event => setAdvance(event.target.checked)} /><span><strong>This checkpoint is complete</strong><small>Only advance when you can demonstrate every criterion below. Otherwise, just save your progress.</small></span></label>
      {advance && <fieldset className="criteria"><legend>My completion evidence meets these criteria</legend>{save.checkpoint?.criteria.map(criterion => <label className="checkbox-label" key={criterion}><input type="checkbox" checked={confirmed.includes(criterion)} onChange={event => setConfirmed(current => event.target.checked ? [...current, criterion] : current.filter(item => item !== criterion))} /><span>{criterion}</span></label>)}<p>Self-confirmed, not evaluated by AI. Next: {save.next}</p></fieldset>}
      <p className="privacy-note"><LockKeyhole size={14} /> Stays in this browser. No upload, even in sample mode.</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="modal-footer"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button className="button primary" disabled={!save.checkpoint || !eligible.some(item => item.id === missionId) || (advance && confirmed.length !== save.checkpoint.criteria.length)}>{advance ? 'Complete & unlock next' : 'Save evidence'}<Check size={16} /></button></div>
    </form>
  </Modal>;
}

export function OpportunityDialog({ onSave, onClose }: { onSave: (opportunity: Opportunity) => boolean; onClose: () => void }) {
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const opportunity: Opportunity = {
      id: crypto.randomUUID(), company: String(data.get('company')).trim(), role: String(data.get('role')).trim(),
      url: String(data.get('url')).trim(), notes: String(data.get('notes')).trim(),
      stage: 'Found', createdAt: new Date().toISOString(),
    };
    if (!opportunity.company || !opportunity.role) return setError('Company and role cannot be blank.');
    if (onSave(opportunity)) onClose();
    else setError('Could not save this opportunity. Use an http or https link and check the workspace warning.');
  }
  return <Modal title="Open a new door." subtitle="Keep the next step close. Leave the sensitive details out." onClose={onClose}><form className="stack-form" onSubmit={submit}>
    <label>Company<input name="company" required maxLength={100} placeholder="Company name" /></label>
    <label>Role<input name="role" required maxLength={150} placeholder="e.g. Platform Engineer" /></label>
    <label>Job listing <span className="optional">(optional)</span><input name="url" type="url" placeholder="https://..." maxLength={2000} /></label>
    <label>Next step <span className="optional">(optional)</span><textarea name="notes" rows={3} maxLength={1000} placeholder="One small thing to move this forward" /></label>
    <p className="privacy-note"><LockKeyhole size={14} /> Local only. Never add passwords or confidential information.</p>
    {error && <p role="alert" className="form-error">{error}</p>}
    <div className="modal-footer"><button className="button secondary" type="button" onClick={onClose}>Cancel</button><button className="button primary">Add opportunity<ArrowRight size={16} /></button></div>
  </form></Modal>;
}
