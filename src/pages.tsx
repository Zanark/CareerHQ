import { useRef, useState } from 'react';
import { ArrowDownToLine, ArrowRight, ArrowUpRight, Check, CircleCheck, Clock3, FileJson2, GitBranch, History, Info, LayoutGrid, List, LockKeyhole, Plus, RefreshCw, ShieldCheck, Upload } from 'lucide-react';
import { getMission, missions } from './domain/catalog';
import { createInitialState, generatePlan, localDate, parseState, recordChange } from './domain/engine';
import type { AppState, Opportunity, OpportunityStage, Readiness } from './domain/types';
import { opportunityStages, readinessKeys } from './domain/types';
import { Badge, Empty, ExternalLink, MissionIcon, PageHeading, SectionTitle, Star } from './components';
import { MAX_WORKSPACE_BYTES } from './workspaceFile';

type Commit = (transform: (current: AppState) => AppState) => boolean;

export function HistoryPage({ state }: { state: AppState }) {
  const [filter, setFilter] = useState('all');
  const events = [...state.events].reverse().filter(event => filter === 'all' || event.missionId === filter);
  const groups = new Map<string, typeof events>();
  for (const event of events) {
    const date = new Date(event.createdAt).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    groups.set(date, [...(groups.get(date) ?? []), event]);
  }
  return <><PageHeading eyebrow="NOTHING USEFUL GETS LOST" title="A record of moving forward." description="Your checkpoints, decisions, and evidence. Kept in order, not rewritten by your next step." /><div className="filter-row"><span className="muted small">{events.length} recorded events</span><select aria-label="Filter history by mission" value={filter} onChange={event => setFilter(event.target.value)}><option value="all">All missions</option>{missions.map(mission => <option key={mission.id} value={mission.id}>{mission.operation}</option>)}</select></div>{groups.size ? <div className="history-groups">{[...groups.entries()].map(([date, entries]) => <section key={date}><h2>{date}</h2><div className="history-list">{entries.map(event => <article key={event.id} className="history-entry"><span className="history-icon">{event.missionId ? <MissionIcon mission={getMission(event.missionId)} size={18} /> : <History size={18} />}</span><div><h3>{event.title}</h3><p>{event.missionId ? getMission(event.missionId).operation : 'CareerHQ workspace'}<span>·</span>{event.type.replaceAll('_', ' ').toLowerCase()}</p></div><time dateTime={event.createdAt}>{new Date(event.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</time></article>)}</div></section>)}</div> : <Empty title="Your story starts with the next step." icon="book">No events in this view yet. Starting a checkpoint or adding evidence will leave a record here.</Empty>}</>;
}

const stageGroups = [
  { name: 'Discover', stages: ['Found', 'Screening'], color: 'sage' },
  { name: 'In conversation', stages: ['Recruiter', 'Technical', 'System design', 'Onsite'], color: 'blue' },
  { name: 'The next chapter', stages: ['Offer', 'Accepted'], color: 'amber' },
  { name: 'Closed, not forgotten', stages: ['Rejected', 'Withdrawn'], color: 'gray' },
];

export function PipelinePage({ state, onAdd, commit, notify }: { state: AppState; onAdd: () => void; commit: Commit; notify: (message: string) => void }) {
  const [view, setView] = useState('board');
  function setStage(opportunity: Opportunity, stage: OpportunityStage) {
    if (commit(current => recordChange({
      ...current, opportunities: current.opportunities.map(item => item.id === opportunity.id ? { ...item, stage } : item),
    }, `Opportunity moved from ${opportunity.stage} to ${stage}: ${opportunity.company}`, 'escape'))) notify(`Moved to ${stage}. The transition is kept in history.`);
  }
  function stageSelect(opportunity: Opportunity) {
    return <select aria-label={`Stage for ${opportunity.company}`} value={opportunity.stage} onChange={event => setStage(opportunity, event.target.value as OpportunityStage)}>{opportunityStages.map(stage => <option key={stage}>{stage}</option>)}</select>;
  }
  return <><PageHeading eyebrow="OPERATION ESCAPE VELOCITY" title="Make space for opportunity." description="A quiet place for the roles you find, the conversations you start, and the next steps that matter."><button className="button primary" onClick={onAdd}><Plus size={16} />Add opportunity</button></PageHeading><div className="pipeline-summary"><div><strong>{state.opportunities.length.toString().padStart(2, '0')}</strong><span>opportunities tracked</span></div><div><strong>{state.opportunities.filter(item => ['Recruiter', 'Technical', 'System design', 'Onsite'].includes(item.stage)).length.toString().padStart(2, '0')}</strong><span>active conversations</span></div><div><strong>{state.opportunities.filter(item => ['Offer', 'Accepted'].includes(item.stage)).length.toString().padStart(2, '0')}</strong><span>offers & next chapters</span></div><span className="privacy-note"><LockKeyhole size={15} />Only on this device</span></div><div className="filter-row"><span className="muted small">Every stage change keeps its history.</span><div className="segmented"><button className={view === 'board' ? 'active' : ''} aria-pressed={view === 'board'} onClick={() => setView('board')}><LayoutGrid size={14} />Board</button><button className={view === 'table' ? 'active' : ''} aria-pressed={view === 'table'} onClick={() => setView('table')}><List size={14} />Table</button></div></div>
    {view === 'board' ? <div className="pipeline-board">{stageGroups.map(group => <section className={`pipeline-column ${group.color}`} key={group.name}><h2><span className="legend-dot" />{group.name}<span className="column-count">{state.opportunities.filter(item => group.stages.includes(item.stage)).length}</span></h2>{state.opportunities.filter(item => group.stages.includes(item.stage)).map(item => <article className="opportunity-card" key={item.id}><span className="company-letter">{item.company.slice(0, 1).toUpperCase()}</span><h3>{item.company}</h3><strong>{item.role}</strong>{item.notes && <p>{item.notes}</p>}{item.url && <ExternalLink href={item.url}>View listing</ExternalLink>}{stageSelect(item)}<span className="opportunity-date">Added {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span></article>)}{!state.opportunities.some(item => group.stages.includes(item.stage)) && <div className="empty-column"><span>Room for what’s next.</span>{group.name === 'Discover' && <button className="text-link" onClick={onAdd}><Plus size={14} />Add a role</button>}</div>}</section>)}</div> : <div className="table-scroll"><table><thead><tr><th>Company / role</th><th>Stage</th><th>Next step</th><th>Listing</th></tr></thead><tbody>{state.opportunities.map(item => <tr key={item.id}><td><strong>{item.company}</strong><small>{item.role}</small></td><td>{stageSelect(item)}</td><td>{item.notes || 'No next step recorded.'}</td><td>{item.url ? <ExternalLink href={item.url}>Open</ExternalLink> : 'No link'}</td></tr>)}</tbody></table>{!state.opportunities.length && <Empty title="Find a role worth a closer look.">Add an opportunity to begin. There’s no application target to chase here.</Empty>}</div>}
  </>;
}

const readinessDescriptions: Record<typeof readinessKeys[number], string> = {
  'Coding patterns': 'Recognize the pattern, explain the choice, and implement it without copying.',
  'System design': 'Draw the flow from memory. Explain a trade-off and what happens when a component fails.',
  'Resume defense': 'Connect each important claim to a concrete example and the work behind it.',
  'STAR stories': 'Retrieve a situation, your action, and an observable result in your own words.',
  'Sustained coding': 'Build, debug, and explain a small solution while working against a realistic time limit.',
};

export function ReadinessPage({ state, commit }: { state: AppState; commit: Commit }) {
  return <><PageHeading eyebrow="READINESS IS A CAPABILITY, NOT A FEELING" title="Know what you can demonstrate." description="A self-assessment, not an automated score. Use your evidence to decide where you stand." /><div className="readiness-intro"><TargetArt /><div><h2>There is no perfect-readiness gate.</h2><p>This view helps you name the next practice opportunity. It doesn’t decide whether you deserve to apply. An unchecked dimension is an open question, not a verdict.</p></div></div><div className="readiness-matrix">{readinessKeys.map((key, index) => <section className="readiness-row" key={key}><span className="readiness-index">0{index + 1}</span><div><h3>{key}</h3><p>{readinessDescriptions[key]}</p></div><div className="segmented" role="group" aria-label={`${key} readiness`}>{(['unassessed', 'building', 'ready'] as Readiness[]).map(level => <button aria-pressed={state.readiness[key] === level} className={state.readiness[key] === level ? `active ${level}` : ''} key={level} onClick={() => commit(current => recordChange({ ...current, readiness: { ...current.readiness, [key]: level } }, `Readiness self-assessed: ${key} - ${level}`))}>{level === 'ready' && <Check size={13} />}{level === 'unassessed' ? 'Not assessed' : level === 'building' ? 'Building' : 'Ready'}</button>)}</div></section>)}</div><div className="quiet-note"><Info size={18} /><p>“Ready” means you can currently demonstrate the capability. It isn’t inferred from time spent, artifacts saved, or an AI evaluation. Reassess whenever useful.</p><a href="#/evidence" className="text-link">Review your proof<ArrowRight size={15} /></a></div></>;
}

function TargetArt() {
  return <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" fill="none" stroke="var(--dsf-border)" strokeDasharray="2 4" /><circle cx="50" cy="50" r="27" fill="none" stroke="var(--dsf-muted)" /><circle cx="50" cy="50" r="12" fill="var(--dsf-accent)" stroke="var(--dsf-heading)" /><path d="M50 4v18m0 56v18M4 50h18m56 0h18" stroke="var(--dsf-heading)" /></svg>;
}

export function DataPage({ state, commit, onExport, onReplace, notify }: { state: AppState; commit: Commit; onExport: () => void; onReplace: (state: AppState) => boolean; notify: (message: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState('');
  const [objective, setObjective] = useState(state.objective);
  async function importBackup(file: File) {
    setImportError('');
    if (file.size > MAX_WORKSPACE_BYTES) { setImportError('This file is larger than the 5 MB import limit. Your workspace is unchanged.'); return; }
    try {
      const parsed = parseState(JSON.parse(await file.text()));
      if (!window.confirm('Replace the current browser workspace with this backup? Export the current workspace first if you want to keep it.')) return;
      if (onReplace(parsed)) { setObjective(parsed.objective); notify('Backup restored. Your missions and history are back in place.'); }
      else setImportError('The validated backup could not be stored. Your previous workspace is unchanged.');
    } catch (error) {
      setImportError(`Backup not imported. Your workspace is unchanged. ${error instanceof Error ? error.message : 'Unable to read this file.'}`);
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  }
  function reset(sampleData: boolean) {
    if (!window.confirm(sampleData ? 'Replace your browser workspace with illustrative sample data? Export your current data first.' : 'Start a fresh workspace? This removes all current progress, evidence, history, and opportunities from this browser. Export first to keep them.')) return;
    const next = createInitialState(sampleData);
    next.plans[localDate()] = generatePlan(next);
    if (onReplace(next)) { setObjective(next.objective); notify(sampleData ? 'Sample workspace loaded.' : 'Your fresh workspace is ready. Make it your own.'); }
  }
  return <><PageHeading eyebrow="YOUR WORKSPACE. YOUR DATA." title="Keep it yours." description="A few intentional settings. A portable backup. No account or cloud service in the middle." /><div className="settings-grid"><section className="panel"><SectionTitle eyebrow="A DIRECTION, NOT A DEADLINE" title="Your north star" /><form className="stack-form" onSubmit={event => { event.preventDefault(); if (commit(current => recordChange({ ...current, objective: objective.trim() }, 'Strategic objective updated'))) notify('North star updated.'); }}><label>What are you working toward?<textarea value={objective} onChange={event => setObjective(event.target.value)} maxLength={240} minLength={5} required rows={3} /></label><p className="muted small">Shown on your overview and master roadmap. Keep it useful, not perfect.</p><button className="button primary">Save direction<Check size={15} /></button></form></section><section className="panel data-boundary"><ShieldCheck size={27} strokeWidth={1.4} /><h2>Local-first, not a secure vault.</h2><p>Your changes live in this browser’s local storage. CareerHQ does not send them to a server or commit them to GitHub.</p><ul><li>No sign-in, AI requests, analytics, or automatic sync.</li><li>Browser storage and backups are <strong>not encrypted</strong>.</li><li>Other apps on the same GitHub Pages origin may access this storage.</li><li>Clearing browser data removes your workspace. Export regularly.</li></ul><span className="privacy-note"><LockKeyhole size={14} />Never store credentials, confidential work, or sensitive personal details.</span></section>
      <section className="panel backup-panel"><SectionTitle eyebrow="CONTINUITY YOU CAN TAKE WITH YOU" title="Backup & restore" /><div className="backup-row"><span className="backup-icon"><ArrowDownToLine size={22} /></span><div><h3>Take a copy with you.</h3><p>Export mission state, evidence, plans, pipeline, and history as a versioned JSON file.</p></div><button className="button secondary" onClick={onExport}>Export backup</button></div><div className="backup-row"><span className="backup-icon"><Upload size={22} /></span><div><h3>Pick up from a saved copy.</h3><p>Validated before import. Restoring replaces this browser workspace, rather than merging.</p></div><button className="button secondary" onClick={() => fileRef.current?.click()}>Import backup</button><input ref={fileRef} type="file" accept=".json,application/json" aria-label="Choose backup file" className="sr-only" onChange={event => { const file = event.target.files?.[0]; if (file) void importBackup(file); }} /></div><p className="privacy-note"><FileJson2 size={14} />Plain-text backups can contain private entries. Keep them out of public repositories.</p>{importError && <pre className="import-error" role="alert">{importError}</pre>}</section>
      <section className="panel"><SectionTitle eyebrow={state.sampleData ? 'YOU ARE IN SAMPLE MODE' : 'THIS IS YOUR OWN WORKSPACE'} title={state.sampleData ? 'Ready to make it yours?' : 'Workspace controls'} /><p className="muted">{state.sampleData ? 'The sample progress, artifacts, and opportunities are fictional. Start fresh to keep the same mission roadmaps with no assumed history.' : 'Your workspace has no assumed personal history. Reloading the sample is a destructive replacement, not a second workspace.'}</p><div className="button-row settings-reset"><button className="button primary" onClick={() => reset(false)}>Start a fresh workspace<ArrowRight size={15} /></button><button className="button secondary" onClick={() => reset(true)}>Reload sample</button></div></section>
    </div><div className="system-status panel"><div><span className="status-dot" /><strong>Workspace schema v{state.schemaVersion}</strong></div><span>Prototype roadmaps v{state.roadmapVersion}</span><span>Last saved {new Date(state.updatedAt).toLocaleString()}</span><a href="#/guide" className="text-link">Read the operating guide<ArrowUpRight size={14} /></a></div></>;
}

export function GuidePage() {
  return <><PageHeading eyebrow="THE CAREERHQ WAY" title="Build capability. Keep your place." description="A small operating system for a long journey. More useful than another giant to-do list." /><section className="guide-hero"><Star /><h2>Roadmaps give you direction.<br /><em>Save states give you a way back.</em></h2><p>You don’t need to remember where every ambition stopped. Each mission holds its current stage, exact checkpoint, status, and next unlock. An absence is a pause, not a reset.</p></section><div className="guide-steps">{[
    ['01', 'Choose a direction', 'Your north star connects the missions. Pick one primary mission; keep the others active or in the background as needed.'],
    ['02', 'Make the day smaller', 'Choose a capacity. HQ selects up to three executable actions from active, unblocked missions. Gentle days get one recovery action, not a bigger backlog.'],
    ['03', 'Do something observable', 'A short explanation, working code, a diagram from memory, or an application. The stopping condition matters more than the minutes.'],
    ['04', 'Leave a little proof', 'Log your artifact. Practice and mastery are different: only confirm checkpoint completion when its criteria are met. The next checkpoint then unlocks in order.'],
    ['05', 'Return, don’t restart', 'Your place and history remain in this browser. Export a private backup before clearing browser data or moving to another device.'],
  ].map(([number, title, description]) => <section key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></section>)}</div><div className="guide-boundaries"><section className="panel"><h2>What this prototype does</h2><p>Seven starter mission roadmaps, a planned competitive-programming lane, capacity-aware daily planning, evidence-gated sequential unlocks, history, a focus timer, local opportunities, manual readiness, search, print, and validated backup/restore.</p></section><section className="panel"><h2>What it doesn’t pretend to do</h2><p>No AI coaching or assessment, employer integration, full curricula, automatic retention tests, cloud sync, or private authentication. Capability connections aren’t cross-mission unlock gates. Sample progress is not anyone’s actual record.</p></section></div><div className="quiet-note"><GitBranch size={20} /><p>Inspired by the supplied Career HQ Operating System brief. The source document and private history are not part of this public site. Mission coaches teach; HQ coordinates; you remain the authority.</p></div></>;
}
