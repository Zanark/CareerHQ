import { useRef, useState } from 'react';
import { ArrowDownToLine, ArrowRight, ArrowUpRight, Check, FileJson2, History, Info, LayoutGrid, List, LockKeyhole, Plus, ShieldCheck, Upload } from 'lucide-react';
import { getMission, getMissions } from './domain/catalog';
import { createInitialState, generatePlan, localDate, parseState, recordChange } from './domain/engine';
import type { AppState, Opportunity, OpportunityStage, Readiness } from './domain/types';
import { opportunityStages, readinessKeys } from './domain/types';
import { Empty, ExternalLink, MissionIcon, PageHeading, SectionTitle } from './components';
import { MAX_WORKSPACE_BYTES } from './workspaceFile';
import { ApplicationMetrics } from './OperationTools';

type Commit = (transform: (current: AppState) => AppState) => boolean;

export function HistoryPage({ state }: { state: AppState }) {
  const missions = getMissions(state);
  const [filter, setFilter] = useState('all');
  const events = [...state.events].reverse().filter(event => filter === 'all' || event.missionId === filter);
  const groups = new Map<string, typeof events>();
  for (const event of events) {
    const date = new Date(event.createdAt).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    groups.set(date, [...(groups.get(date) ?? []), event]);
  }
  return <><PageHeading eyebrow="NOTHING USEFUL GETS LOST" title="A record of moving forward." description="Your checkpoints, decisions, and evidence. Kept in order, not rewritten by your next step." /><div className="filter-row"><span className="muted small">{events.length} recorded events</span><select aria-label="Filter history by mission" value={filter} onChange={event => setFilter(event.target.value)}><option value="all">All missions</option>{missions.map(mission => <option key={mission.id} value={mission.id}>{mission.operation}</option>)}</select></div>{groups.size ? <div className="history-groups">{[...groups.entries()].map(([date, entries]) => <section key={date}><h2>{date}</h2><div className="history-list">{entries.map(event => <article key={event.id} className="history-entry"><span className="history-icon">{event.missionId ? <MissionIcon mission={getMission(event.missionId)} size={18} /> : <History size={18} />}</span><div><h3>{event.title}</h3><p>{event.missionId ? getMission(event.missionId).operation : 'CareerOS workspace'}<span>·</span>{event.type.replaceAll('_', ' ').toLowerCase()}</p></div><time dateTime={event.createdAt}>{new Date(event.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</time></article>)}</div></section>)}</div> : <Empty title="Your story starts with the next step." icon="book">No events in this view yet. Starting a checkpoint or adding evidence will leave a record here.</Empty>}</>;
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
    return <select data-tour="opportunity-stage" aria-label={`Stage for ${opportunity.company}`} value={opportunity.stage} onChange={event => setStage(opportunity, event.target.value as OpportunityStage)}>{opportunityStages.map(stage => <option key={stage}>{stage}</option>)}</select>;
  }
  return <><PageHeading eyebrow="JOB SEARCH" title="Opportunities" description="Track roles, application stages, and next steps."><button className="button primary" data-tour="pipeline-add" onClick={onAdd}><Plus size={16} />Add opportunity</button></PageHeading><div className="pipeline-summary"><div><strong>{state.opportunities.length.toString().padStart(2, '0')}</strong><span>opportunities tracked</span></div><div><strong>{state.opportunities.filter(item => ['Recruiter', 'Technical', 'System design', 'Onsite'].includes(item.stage)).length.toString().padStart(2, '0')}</strong><span>active conversations</span></div><div><strong>{state.opportunities.filter(item => ['Offer', 'Accepted'].includes(item.stage)).length.toString().padStart(2, '0')}</strong><span>offers / accepted</span></div><span className="privacy-note"><LockKeyhole size={15} />Browser-only data</span></div><div className="filter-row"><span className="muted small">Every stage change is recorded in History.</span><div className="segmented"><button className={view === 'board' ? 'active' : ''} aria-pressed={view === 'board'} onClick={() => setView('board')}><LayoutGrid size={14} />Board</button><button data-tour="pipeline-table" className={view === 'table' ? 'active' : ''} aria-pressed={view === 'table'} onClick={() => setView('table')}><List size={14} />Table</button></div></div>
    {view === 'board' ? <div className="pipeline-board">{stageGroups.map(group => <section className={`pipeline-column ${group.color}`} key={group.name}><h2><span className="legend-dot" />{group.name}<span className="column-count">{state.opportunities.filter(item => group.stages.includes(item.stage)).length}</span></h2>{state.opportunities.filter(item => group.stages.includes(item.stage)).map(item => <article className="opportunity-card" key={item.id}><span className="company-letter">{item.company.slice(0, 1).toUpperCase()}</span><h3>{item.company}</h3><strong>{item.role}</strong>{item.notes && <p>{item.notes}</p>}{item.url && <ExternalLink href={item.url}>View listing</ExternalLink>}{stageSelect(item)}<span className="opportunity-date">Added {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span></article>)}{!state.opportunities.some(item => group.stages.includes(item.stage)) && <div className="empty-column"><span>Room for what’s next.</span>{group.name === 'Discover' && <button className="text-link" onClick={onAdd}><Plus size={14} />Add a role</button>}</div>}</section>)}</div> : <div className="table-scroll"><table><thead><tr><th>Company / role</th><th>Stage</th><th>Next step</th><th>Listing</th></tr></thead><tbody>{state.opportunities.map(item => <tr key={item.id}><td><strong>{item.company}</strong><small>{item.role}</small></td><td>{stageSelect(item)}</td><td>{item.notes || 'No next step recorded.'}</td><td>{item.url ? <ExternalLink href={item.url}>Open</ExternalLink> : 'No link'}</td></tr>)}</tbody></table>{!state.opportunities.length && <Empty title="Find a role worth a closer look.">Add an opportunity to begin. There’s no application target to chase here.</Empty>}</div>}
    <ApplicationMetrics state={state} />
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
  return <><PageHeading eyebrow="SELF-ASSESSMENT" title="Interview readiness" description="Record what you can currently demonstrate. These ratings are yours, not an AI score." /><div className="readiness-matrix">{readinessKeys.map((key, index) => <section className="readiness-row" key={key}><span className="readiness-index">0{index + 1}</span><div><h3>{key}</h3><p>{readinessDescriptions[key]}</p></div><div className="segmented" data-tour={index === 0 ? 'readiness-coding' : undefined} role="group" aria-label={`${key} readiness`}>{(['unassessed', 'building', 'ready'] as Readiness[]).map(level => <button aria-pressed={state.readiness[key] === level} className={state.readiness[key] === level ? `active ${level}` : ''} key={level} onClick={() => commit(current => recordChange({ ...current, readiness: { ...current.readiness, [key]: level } }, `Readiness self-assessed: ${key} - ${level}`))}>{level === 'ready' && <Check size={13} />}{level === 'unassessed' ? 'Not assessed' : level === 'building' ? 'Building' : 'Ready'}</button>)}</div></section>)}</div><div className="quiet-note"><Info size={18} /><p>Saved work and timer sessions do not automatically raise these ratings.</p><a href="#/evidence" className="text-link">Review saved work<ArrowRight size={15} /></a></div></>;
}

export function DataPage({ state, commit, onExport, onReplace, notify, practice = false, onImported }: { state: AppState; commit: Commit; onExport: () => void; onReplace: (state: AppState) => boolean; notify: (message: string) => void; practice?: boolean; onImported?: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState('');
  const [objective, setObjective] = useState(state.objective);
  async function importBackup(file: File) {
    setImportError('');
    if (file.size > MAX_WORKSPACE_BYTES) { setImportError('This file is larger than the 5 MB import limit. Your workspace is unchanged.'); return; }
    try {
      const parsed = parseState(JSON.parse(await file.text()));
      if (!window.confirm(practice ? 'Import this file into the temporary tutorial workspace? Your real data will not change.' : 'Replace the current browser workspace with this backup? Export the current workspace first if you want to keep it.')) return;
      if (onReplace(parsed)) { setObjective(parsed.objective); onImported?.(); notify(practice ? 'Example imported into the tutorial only.' : 'Backup restored.'); }
      else setImportError('The validated backup could not be stored. Your previous workspace is unchanged.');
    } catch (error) {
      setImportError(`Backup not imported. Your workspace is unchanged. ${error instanceof Error ? error.message : 'Unable to read this file.'}`);
    } finally {
      if (fileRef.current) fileRef.current.value = '';
    }
  }
  function reset(sampleData: boolean) {
    if (!window.confirm(practice ? 'Reset temporary tutorial data? Your real progress stays unchanged.' : sampleData ? 'Replace your browser workspace, including focus and distraction records, with illustrative sample data? Export your current data first.' : 'Start a fresh workspace? This removes all current progress, evidence, history, opportunities, focus sessions and distraction records from this browser. Export first to keep them.')) return;
    const next = createInitialState(sampleData);
    next.plans[localDate()] = generatePlan(next);
    if (onReplace(next)) { setObjective(next.objective); notify(practice ? 'Tutorial data reset.' : sampleData ? 'Sample workspace loaded.' : 'Fresh workspace ready.'); }
  }
  return <><PageHeading eyebrow="SAVING & PORTABILITY" title="Settings & data" description="Browser-only storage, private backups, and your tracking settings." /><div className="settings-grid">
      <section className="panel data-lifecycle" data-tour="storage-info">
        <SectionTitle title="How saving works" />
        <dl>
          <div><dt>Where is progress saved?</dt><dd>In localStorage for this browser and website address. It is not a server account or cloud backup. There are no profiles or streak counters.</dd></div>
          <div><dt>What survives a refresh or update?</dt><dd>Refreshes keep saved records, including focus sessions and distraction reports. The running countdown itself is tab-local; an interrupted session is not marked complete. Adopting a documented roadmap is a separate confirmed action; old progress is archived, not reclassified. Unreadable data is preserved for recovery.</dd></div>
          <div><dt>What if I change machines?</dt><dd>Export a JSON backup here, transfer it privately, then import it on the other machine. The same applies to another browser or website address, including moving from this local preview to the hosted site. There is no automatic sync.</dd></div>
          <div><dt>What can delete it?</dt><dd>Clearing site data, deleting your browser profile, or ending a private-browsing session can remove progress. Export regularly. Imports replace the destination workspace after confirmation.</dd></div>
        </dl>
      </section>
      <section className="panel"><SectionTitle title="Goal" /><form className="stack-form" data-tour="goal-form" onSubmit={event => { event.preventDefault(); if (commit(current => recordChange({ ...current, objective: objective.trim() }, 'Strategic objective updated'))) notify('Goal updated.'); }}><label>What are you working toward?<textarea value={objective} onChange={event => setObjective(event.target.value)} maxLength={240} minLength={5} required rows={3} /></label><p className="muted small">Shown on your roadmap.</p><button className="button primary">Save direction<Check size={15} /></button></form></section>
      <section className="panel data-boundary"><ShieldCheck size={27} strokeWidth={1.4} /><h2>Privacy</h2><p>Storage and exported backups are not encrypted. No progress is uploaded or committed to GitHub.</p><ul><li>Other apps on the same website origin may access localStorage.</li><li>Do not add passwords, confidential work, or sensitive personal details.</li><li>Automatic multi-device sync is not implemented.</li></ul></section>
      <section className="panel backup-panel"><SectionTitle title="Backup & restore" />
        <div className="backup-row"><span className="backup-icon"><ArrowDownToLine size={22} /></span><div><h3>{practice ? 'Export a tutorial example' : 'Export your progress'}</h3><p>{practice ? 'Downloads only the temporary practice workspace, not your real progress.' : 'Includes current and archived progress, saved work, plans, opportunities, recall, ratings, history, and the full focus-session and timestamped distraction log.'}</p></div><button data-tour="backup-export" className="button secondary" onClick={onExport}>{practice ? 'Export example' : 'Export backup'}</button></div>
        <div className="backup-row"><span className="backup-icon"><Upload size={22} /></span><div><h3>{practice ? 'Try importing the example' : 'Import a saved backup'}</h3><p>{practice ? 'Select the example JSON you downloaded. Only tutorial data will change.' : 'Validated first, then replaces this browser workspace after confirmation.'}</p></div><button data-tour="backup-import" className="button secondary" onClick={() => fileRef.current?.click()}>Import backup</button><input data-tour="backup-input" ref={fileRef} type="file" accept=".json,application/json" aria-label="Choose backup file" className="sr-only" onChange={event => { const file = event.target.files?.[0]; if (file) void importBackup(file); }} /></div>
        <p className="privacy-note"><FileJson2 size={14} />Backups are plain-text JSON. Keep them private and out of public repositories.</p>{importError && <pre className="import-error" role="alert">{importError}</pre>}
      </section>
      <section className="panel" data-tour="workspace-reset"><SectionTitle title="Reset or load examples" /><p className="muted">Both replace the current workspace after confirmation. Export first to retain its progress.</p><div className="button-row settings-reset"><button className="button primary" onClick={() => reset(false)}>Start a fresh workspace<ArrowRight size={15} /></button><button className="button secondary" onClick={() => reset(true)}>Reload sample</button></div></section>
    </div><div className="system-status panel"><div><span className="status-dot" /><strong>Data format v{state.schemaVersion}</strong></div><span>Roadmaps v{state.roadmapVersion}</span><span>{practice ? 'Practice updated' : 'Last saved'} {new Date(state.updatedAt).toLocaleString()}</span><a href="#/guide" className="text-link">Help & glossary<ArrowUpRight size={14} /></a></div></>;
}

export function GuidePage({ onStartTutorial }: { onStartTutorial: () => void }) {
  return <div data-tour="help-guide"><PageHeading eyebrow="HOW TO USE CAREEROS" title="Help & glossary" description="Use the interactive tutorial to practice the actual controls without changing your progress."><button className="button primary" onClick={onStartTutorial}>Start tutorial<ArrowRight size={16} /></button></PageHeading>
    <div className="guide-glossary">{[
      ['Mission', 'One learning or career area, such as DSA (data structures and algorithms) or System Design. Names like Pattern Forge label those areas; they are not accounts.'],
      ['Checkpoint', 'The milestone you are currently working on. Its saved state records the stage, exact checkpoint, status, and what unlocks next.'],
      ['Daily action', 'A practice task for today. Time capacity selects up to three tasks from active, unblocked missions. Finishing one does not automatically mean a whole checkpoint is complete.'],
      ['Focus room and distractions', 'A quiet fullscreen timer over a frosted 3D backdrop. Each distraction-button press is saved immediately with its session, timestamp and elapsed timer time, and is included in backups. It is self-reported, not measured attention. Resetting the clock retains the log; closing the room keeps the timer running.'],
      ['Saved work / evidence', 'A note, code link, explanation, diagram, or other artifact recording what you did. Completing a checkpoint also needs your confirmation of every completion criterion.'],
      ['Primary / background', 'The primary mission gets priority. Background missions retain progress but are not included in daily plans. Blocked missions are excluded until their blocker is cleared.'],
      ['Readiness and opportunities', 'Readiness is your own rating of interview skills. Opportunities is a manual tracker for roles and stages; it does not send applications or assess you with AI.'],
      ['Storage and backups', 'Progress stays in this browser and site, not in an account. Export and import JSON to move machines. Ordinary UI updates preserve compatible data; clearing site data can delete it.'],
      ['Tutorial practice', 'A separate temporary workspace. You can log examples, advance checkpoints and try imports. Exiting restores your real progress, appearance and previous page; example files are labeled.'],
      ['Roadmap versions', 'Operation documents provide new definitions. Older saved positions stay on their previous version until you confirm adoption. The old position is archived; saved work is not erased or credited to different topics.'],
      ['Recall practice', 'Review what you can retrieve from memory after saving evidence. Retained recall is separate from checkpoint completion, needs appropriate self-checks and spacing, and can change without deleting completed work.'],
      ['Freelance ledger', 'Collect links, platforms, skills, budgets and verdicts. The source sprint researches ten opportunities and reviews five. A saved lead is not an application, income, or completed checkpoint.'],
    ].map(([title, text]) => <section className="panel" key={title}><h3>{title}</h3><p>{text}</p></section>)}</div>
    <div className="quiet-note"><Info size={18} /><p>There is no streak counter, account system, or automatic cloud sync.</p><a href="#/settings" className="text-link">Saving and device changes<ArrowRight size={14} /></a></div>
  </div>;
}
