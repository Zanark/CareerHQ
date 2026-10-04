import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check, LockKeyhole } from 'lucide-react';
import { getMission, getMissions } from './domain/catalog';
import { getSaveState, localDate } from './domain/engine';
import type { AppState, DailyAction, EvidenceInput, EvidenceKind, MissionId, Opportunity } from './domain/types';
import { kindLabels, Modal } from './components';

export function EvidenceDialog({ state, initialMission, action, practice = false, onSave, onClose }: {
  state: AppState;
  initialMission: MissionId;
  action?: DailyAction;
  practice?: boolean;
  onSave: (input: EvidenceInput) => boolean;
  onClose: () => void;
}) {
  const [missionId, setMission] = useState(initialMission);
  const [advance, setAdvance] = useState(false);
  const [confirmed, setConfirmed] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [artifactTitle, setArtifactTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [kind, setKind] = useState<EvidenceKind>('explanation');
  const mission = getMission(missionId, state);
  const save = getSaveState(mission, state);
  const eligible = getMissions(state).filter(item => !item.planned && state.missions[item.id].mode === 'active' && state.missions[item.id].status !== 'completed' && !state.missions[item.id].blocker);

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

  return <Modal title="Record progress" subtitle="Save what you practiced. Complete a checkpoint only when its criteria are met." onClose={onClose}>
    <form onSubmit={submit} className="stack-form" data-tour="evidence-form">
      {practice && <button type="button" className="button secondary practice-example" data-tour="evidence-example" onClick={() => {
        setArtifactTitle(`Tutorial: ${save.checkpoint?.title ?? mission.name}`.slice(0, 120));
        setSummary(`Illustrative practice only. ${save.checkpoint?.action ?? mission.purpose} Criteria to demonstrate: ${save.checkpoint?.criteria.join('; ') ?? 'record a concrete example'}`);
        setKind('code');
      }}>Fill example</button>}
      <label>Mission<select value={missionId} disabled={!!action} onChange={event => { setMission(event.target.value as MissionId); setConfirmed([]); setAdvance(false); }}>
        {eligible.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select></label>
      <div className="form-context"><span className="eyebrow">CURRENT CHECKPOINT</span><strong>{save.checkpoint?.title ?? 'No checkpoint available'}</strong></div>
      {action && action.date !== localDate() && <p className="form-context small">A new day has started. Your draft is safe: it will be saved as checkpoint evidence, without changing yesterday’s plan.</p>}
      <div className="form-row"><label>What did you make?<select name="kind" value={kind} onChange={event => setKind(event.target.value as EvidenceKind)}>{Object.entries(kindLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label><label>Artifact title<input name="title" value={artifactTitle} onChange={event => setArtifactTitle(event.target.value)} placeholder="e.g. Cache-aside explanation" required minLength={3} maxLength={120} /></label></div>
      <label>What did you practice?<textarea name="summary" value={summary} onChange={event => setSummary(event.target.value)} placeholder="Briefly describe the work and what you can demonstrate." required minLength={10} maxLength={2000} rows={3} /></label>
      <label>Link to your work <span className="optional">(optional)</span><input type="url" name="url" placeholder="https://..." maxLength={2000} /></label>
      <label className="checkbox-label completion-choice"><input data-tour="checkpoint-complete" type="checkbox" checked={advance} onChange={event => setAdvance(event.target.checked)} /><span><strong>This checkpoint is complete</strong><small>Only advance when you can demonstrate every criterion below. Otherwise, just save your progress.</small></span></label>
      {advance && <fieldset className="criteria" data-tour="evidence-criteria"><legend>My completion evidence meets these criteria</legend>{save.checkpoint?.criteria.map(criterion => <label className="checkbox-label" key={criterion}><input type="checkbox" checked={confirmed.includes(criterion)} onChange={event => setConfirmed(current => event.target.checked ? [...current, criterion] : current.filter(item => item !== criterion))} /><span>{criterion}</span></label>)}<p>Self-confirmed, not evaluated by AI. Next: {save.next}</p></fieldset>}
      <p className="privacy-note"><LockKeyhole size={14} />{practice ? 'Practice only. Discarded when you exit the tutorial.' : 'Stored in this browser. Not uploaded or synced.'}</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="modal-footer"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button className="button primary" data-tour="evidence-submit" disabled={!save.checkpoint || !eligible.some(item => item.id === missionId) || (advance && confirmed.length !== save.checkpoint.criteria.length)}>{advance ? 'Complete & unlock next' : 'Save evidence'}<Check size={16} /></button></div>
    </form>
  </Modal>;
}

export function OpportunityDialog({ onSave, onClose, practice = false }: { onSave: (opportunity: Opportunity) => boolean; onClose: () => void; practice?: boolean }) {
  const [error, setError] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const opportunity: Opportunity = {
      id: crypto.randomUUID(), company: String(data.get('company')).trim(), role: String(data.get('role')).trim(),
      url: String(data.get('url')).trim(), notes: String(data.get('notes')).trim(),
      stage: 'Found', createdAt: new Date().toISOString(),
      ...(data.get('lane') ? { lane: String(data.get('lane')) as Opportunity['lane'] } : {}),
      ...(String(data.get('resumeVariant') ?? '').trim() ? { resumeVariant: String(data.get('resumeVariant')).trim() } : {}),
      ...(String(data.get('effortMinutes') ?? '').trim() ? { effortMinutes: Number(data.get('effortMinutes')) } : {}),
      ...(String(data.get('frictionScore') ?? '').trim() ? { frictionScore: Number(data.get('frictionScore')) } : {}),
    };
    if (!opportunity.company || !opportunity.role) return setError('Company and role cannot be blank.');
    if (onSave(opportunity)) onClose();
    else setError('Could not save this opportunity. Check the form values and the workspace warning.');
  }
  return <Modal title="Add opportunity" subtitle="Track a role and its next step." onClose={onClose}><form className="stack-form" onSubmit={submit} data-tour="opportunity-form">
    {practice && <button type="button" className="button secondary practice-example" data-tour="opportunity-example" onClick={() => { setCompany('Example Systems (tutorial)'); setRole('Platform Engineer (practice)'); }}>Fill example</button>}
    <label>Company<input name="company" value={company} onChange={event => setCompany(event.target.value)} required maxLength={100} placeholder="Company name" /></label>
    <label>Role<input name="role" value={role} onChange={event => setRole(event.target.value)} required maxLength={150} placeholder="e.g. Platform Engineer" /></label>
    <label>Job listing <span className="optional">(optional)</span><input name="url" type="url" placeholder="https://..." maxLength={2000} /></label>
    <label>Next step <span className="optional">(optional)</span><textarea name="notes" rows={3} maxLength={1000} placeholder="One small thing to move this forward" /></label>
    <details className="application-details"><summary>Application details (optional)</summary>
      <div className="form-row"><label>Application lane<select name="lane" defaultValue=""><option value="">Not recorded</option><option value="easy-apply">Easy Apply</option><option value="ats">ATS / longer form</option><option value="referral">Referral / outreach</option><option value="other">Other</option></select></label><label>Resume variant<input name="resumeVariant" maxLength={120} placeholder="e.g. Backend / Platform" /></label></div>
      <div className="form-row"><label>Time spent (minutes)<input name="effortMinutes" type="number" min={0} max={1440} step={1} /></label><label>Friction score (1-10)<input name="frictionScore" type="number" min={1} max={10} step={1} /></label></div>
      <p className="muted small">Your own observations, not an automated fit or readiness score.</p>
    </details>
    <p className="privacy-note"><LockKeyhole size={14} />{practice ? 'Practice only. Discarded when you exit the tutorial.' : 'Local only. Never add passwords or confidential information.'}</p>
    {error && <p role="alert" className="form-error">{error}</p>}
    <div className="modal-footer"><button className="button secondary" type="button" onClick={onClose}>Cancel</button><button className="button primary" data-tour="opportunity-submit">Add opportunity<ArrowRight size={16} /></button></div>
  </form></Modal>;
}
