import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowDownToLine, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Check,
  ChevronDown, ChevronRight, CircleCheck, Clock3, Compass, FileCheck2, Flag, FolderOpen,
  GitBranch, History, House, Info, LayoutGrid, ListChecks, LockKeyhole, Menu, MoreHorizontal,
  Pause, Play, Plus, RotateCcw, Search, Settings2, ShieldCheck, SlidersHorizontal, Target, X,
} from 'lucide-react';
import { missions, getMission } from './domain/catalog';
import { createInitialState, generatePlan, getSaveState, localDate, parseState, recordChange, recordEvidence } from './domain/engine';
import type { AppState, Capacity, DailyAction, Evidence, Mission, MissionId } from './domain/types';
import { readinessKeys } from './domain/types';
import { Badge, Checkmark, Empty, kindLabels, MissionIcon, OrbitArt, PageHeading, Progress, SectionTitle, Star, statusLabels } from './components';
import { EvidenceDialog, OpportunityDialog } from './dialogs';
import { DataPage, GuidePage, HistoryPage, PipelinePage, ReadinessPage } from './pages';
import { downloadFile, useWorkspace } from './useWorkspace';
import { serializeWorkspace } from './workspaceFile';

type Commit = (transform: (current: AppState) => AppState) => boolean;
const mainNav = [
  { id: 'hq', label: 'HQ overview', icon: House },
  { id: 'missions', label: 'My missions', icon: LayoutGrid },
  { id: 'roadmap', label: 'Master roadmap', icon: GitBranch },
  { id: 'plan', label: 'Daily plan', icon: ListChecks },
  { id: 'evidence', label: 'Evidence vault', icon: FolderOpen },
  { id: 'history', label: 'History', icon: History },
];
const extraNav = [
  { id: 'pipeline', label: 'Opportunity pipeline', icon: BriefcaseBusiness },
  { id: 'readiness', label: 'Interview readiness', icon: Target },
];
const capacities: { id: Capacity; label: string; description: string }[] = [
  { id: 'gentle', label: 'Gentle', description: 'One small step. Up to 15 minutes.' },
  { id: 'steady', label: 'Steady', description: 'A little momentum. Up to 75 minutes.' },
  { id: 'deep', label: 'Deep focus', description: 'Room to go deeper. Up to 120 minutes.' },
];

function routeNow() { return window.location.hash.slice(2) || 'hq'; }
function navigate(route: string) { window.location.hash = `/${route}`; }
function formatDate(date: string) { return new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); }

export default function App() {
  const workspace = useWorkspace();
  if (!workspace.state) {
    return <div className="recovery-screen"><Star /><span className="eyebrow">CAREERHQ / SAFE RECOVERY</span><h1>Your existing data comes first.</h1><p>The workspace could not be opened. It has not been reset or overwritten. Storage may be unavailable, or the saved data may need a compatible version.</p><pre>{workspace.error}</pre><div className="button-row">{workspace.recoveryRaw && <button className="button primary" onClick={() => downloadFile(workspace.recoveryRaw!, `careerhq-backup-recovery-${localDate()}.json`)}>Download original data</button>}<button className="button secondary" onClick={() => location.reload()}>Try again</button><button className="button secondary" onClick={() => {
      if (window.confirm('Start over on this browser? Download your original data first. This replaces the unreadable workspace.')) workspace.replace(createInitialState(false));
    }}>Start a clean workspace</button></div></div>;
  }
  return <Workspace state={workspace.state} workspace={workspace} />;
}

function Workspace({ state, workspace }: { state: AppState; workspace: ReturnType<typeof useWorkspace> }) {
  const { commit, date } = workspace;
  const [route, setRoute] = useState(routeNow);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const [evidenceDialog, setEvidenceDialog] = useState<{ missionId: MissionId; action?: DailyAction } | null>(null);
  const [opportunityDialog, setOpportunityDialog] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const page = route.split('/')[0];
  const selected = missions.find(mission => mission.id === route.split('/')[1]);
  const focus = getMission(state.focusMissionId);
  const focusSession = useFocusSession(state.capacity);
  const todayPlan = state.plans[date] ?? [];
  const active = missions.filter(mission => state.missions[mission.id].mode === 'active' && state.missions[mission.id].status !== 'completed');
  const totalCompleted = Object.values(state.missions).reduce((sum, mission) => sum + mission.completedCheckpointIds.length, 0);
  const title = [...mainNav, ...extraNav, { id: 'settings', label: 'Settings & data' }, { id: 'guide', label: 'The operating guide' }].find(item => item.id === page)?.label ?? selected?.operation ?? 'Not found';

  useEffect(() => {
    const onHash = () => { setRoute(routeNow()); setMenuOpen(false); setQuery(''); window.scrollTo(0, 0); };
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); searchRef.current?.focus(); }
      if (event.key === 'Escape') { setMenuOpen(false); setQuery(''); }
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('keydown', onKey); };
  }, []);
  useEffect(() => { document.title = `${title} - CareerHQ`; headingRef.current?.focus({ preventScroll: true }); }, [route, title]);
  useEffect(() => { if (!toast) return; const id = window.setTimeout(() => setToast(''), 4500); return () => window.clearTimeout(id); }, [toast]);

  function change(title: string, transform: (current: AppState) => AppState, missionId?: MissionId) {
    const ok = commit(current => recordChange(transform(current), title, missionId));
    if (ok) setToast(title);
    return ok;
  }

  function exportBackup() {
    downloadFile(serializeWorkspace(state), `careerhq-backup-${date}.json`);
    setToast('Backup downloaded. Keep this private; it contains your browser data.');
  }

  function openEvidence(missionId = state.focusMissionId, action?: DailyAction) {
    const progress = state.missions[missionId];
    if (progress.mode !== 'active' || progress.status === 'completed' || progress.blocker) {
      const eligible = active.find(item => !state.missions[item.id].blocker);
      if (!eligible) { setToast('Activate an unblocked mission before recording evidence.'); return; }
      missionId = eligible.id;
    }
    setEvidenceDialog({ missionId, action });
  }

  function setCapacity(capacity: Capacity) {
    change(`Capacity set to ${capacity}`, current => {
      const next = { ...current, capacity, plans: { ...current.plans } };
      if (!next.plans[date]?.some(action => action.completed)) {
        delete next.plans[date];
        next.plans[date] = generatePlan(next, date);
      }
      return next;
    });
  }

  function resume(missionId: MissionId) {
    const progress = state.missions[missionId];
    if (progress.mode === 'active' && progress.status === 'not-started' && !progress.blocker) {
      change('Checkpoint started', current => ({ ...current, missions: { ...current.missions, [missionId]: { ...current.missions[missionId], status: 'in-progress' } } }), missionId);
    }
    navigate(`mission/${missionId}`);
  }

  const searchResults = query.trim() ? [
    ...missions.filter(mission => `${mission.operation} ${mission.name} ${mission.checkpoints.map(cp => cp.title).join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())).map(mission => ({ label: mission.operation, detail: mission.name, route: `mission/${mission.id}` })),
    ...state.evidence.filter(item => `${item.title} ${item.summary}`.toLowerCase().includes(query.trim().toLowerCase())).map(item => ({ label: item.title, detail: 'Evidence', route: `evidence/${item.id}` })),
  ].slice(0, 7) : [];

  const navButton = (item: typeof mainNav[number]) => <a key={item.id} href={`#/${item.id}`} className={`nav-item ${page === item.id || (item.id === 'missions' && page === 'mission') ? 'selected' : ''}`} aria-current={page === item.id || (item.id === 'missions' && page === 'mission') ? 'page' : undefined}><item.icon size={18} strokeWidth={1.7} /><span>{item.label}</span>{item.id === 'missions' && <span className="nav-count">{active.length}</span>}{item.id === 'hq' && <span className="selected-dot" />}</a>;

  return <div className="app">
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); headingRef.current?.focus(); }}>Skip to content</a>
    {menuOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
      <a href="#/hq" className="brand"><span className="brand-mark"><Star /></span><span>Career<span className="brand-hq">HQ</span><small>YOUR NEXT CHAPTER</small></span></a>
      <div className="workspace-label"><span className="workspace-monogram">C</span><div>My workspace<small>Personal operating system</small></div><ChevronDown size={14} aria-hidden="true" /></div>
      <span className="nav-label">COMMAND CENTER</span>
      <nav>{mainNav.map(navButton)}</nav>
      <span className="nav-label second">THE NEXT CHAPTER</span>
      <nav>{extraNav.map(navButton)}</nav>
      <div className="sidebar-bottom">
        <a className="guide-card" href="#/guide"><span className="guide-spark"><Star /></span><strong>Progress, not pressure.</strong><p>Small actions.<br />Lasting capability.</p><span>The CareerHQ way <ArrowUpRight size={14} /></span></a>
        <a href="#/settings" className={`nav-item ${page === 'settings' ? 'selected' : ''}`}><Settings2 size={18} /><span>Settings & data</span></a>
        <div className="local-status"><span className="status-dot" /><span>Saved on this device<small>No account. No cloud sync.</small></span><ShieldCheck size={17} /></div>
      </div>
    </aside>
    <div className="main-shell">
      <header className="topbar">
        <div className="breadcrumbs"><button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation" aria-expanded={menuOpen}><Menu size={22} /></button><span>Workspace</span><ChevronRight size={13} /><strong>{title}</strong></div>
        <div className="top-actions"><div className="search-wrap"><Search size={16} /><input ref={searchRef} placeholder="Find a mission or evidence..." aria-label="Search missions and evidence" value={query} onChange={event => setQuery(event.target.value)} /><kbd>Ctrl K</kbd>
          {query && <div className="search-results"><span className="eyebrow">IN YOUR WORKSPACE</span>{searchResults.length ? searchResults.map(item => <a key={item.route} href={`#/${item.route}`}><span>{item.label}<small>{item.detail}</small></span><ArrowUpRight size={14} /></a>) : <p>No matches. Try a mission name or an artifact title.</p>}<button className="text-button" onClick={() => setQuery('')}>Close search</button></div>}
        </div><button className="icon-button export-top" aria-label="Download workspace backup" onClick={exportBackup}><ArrowDownToLine size={18} /></button><span className="avatar" title="Local workspace">HQ</span></div>
      </header>
      <main id="main-content" ref={headingRef} tabIndex={-1}>
        {workspace.conflict && <div className="alert error" role="alert"><span>This workspace changed in another tab. Reload to avoid overwriting newer work.</span><button onClick={() => location.reload()} className="button secondary">Reload</button></div>}
        {workspace.error && <div className="alert error" role="alert"><span>{workspace.error}</span><button className="icon-button" aria-label="Dismiss error" onClick={() => workspace.setError('')}><X size={17} /></button></div>}
        {state.sampleData && <div className="sample-banner"><span><span className="sample-dot" />You’re exploring a sample workspace. Progress and artifacts are illustrative, not your personal history.</span><a href="#/settings">Make it yours <ArrowRight size={14} /></a></div>}
        {page === 'hq' && <>
          <PageHeading eyebrow={new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} title="A little progress. A clearer direction." description="Your place is saved. Pick up what matters, right where you left off."><button className="button secondary" onClick={() => openEvidence()}><Plus size={16} />Add evidence</button></PageHeading>
          <div className="hero-grid"><section className="hero"><div className="hero-copy"><span className="eyebrow"><span className="status-dot" />THE BIG PICTURE</span><h2>Your next chapter,<br /><em>built one step at a time.</em></h2><p>{state.objective}</p><button className="button lime" onClick={() => resume(focus.id)}>Resume {focus.operation}<ArrowRight size={17} /></button><div className="hero-foot"><span className="hero-line" />A roadmap for the long game. A next step for today.</div></div><OrbitArt /></section>
            <section className="capacity-card"><span className="eyebrow"><SlidersHorizontal size={14} />MAKE ROOM FOR TODAY</span><h2>Find your pace.</h2><p>Your plan should fit your day.<br />Not the other way around.</p><CapacityControl value={state.capacity} onChange={setCapacity} /><div className="capacity-description"><Clock3 size={15} />{capacities.find(item => item.id === state.capacity)?.description}</div><div className="capacity-note"><span className="small-orbit">↳</span>No streaks to protect.<br />Just a good place to resume.</div></section>
          </div>
          <div className="signal-strip"><Signal icon={<Compass size={20} />} value={active.length} label="missions in focus" detail="The rest can wait." /><Signal icon={<CircleCheck size={20} />} value={totalCompleted} label="checkpoints completed" detail="Evidence, not just activity." /><Signal icon={<FileCheck2 size={20} />} value={state.evidence.length} label="pieces of proof" detail="Your progress has a paper trail." /><div className="health-signal"><ShieldCheck size={19} /><div><strong>All save states intact</strong><span>Roadmaps v{state.roadmapVersion}</span></div></div></div>
          <div className="dashboard-grid"><div><SectionTitle eyebrow="SMALL ENOUGH TO START" title="Today’s three, at most."><a href="#/plan" className="text-link">Open daily plan<ArrowUpRight size={15} /></a></SectionTitle><PlanList actions={todayPlan} onEvidence={action => openEvidence(action.missionId, action)} onResume={resume} state={state} /><div className="section-spacer" /><SectionTitle eyebrow="YOUR ACTIVE CHAPTERS" title="A place for every ambition."><a href="#/missions" className="text-link">All missions<ArrowUpRight size={15} /></a></SectionTitle><div className="mission-grid compact">{active.map(mission => <MissionCard key={mission.id} mission={mission} state={state} onResume={resume} />)}</div></div>
            <div className="right-rail"><FocusTimer session={focusSession} /><Blockers state={state} /><section className="panel recent-panel"><SectionTitle title="Recent proof"><a href="#/evidence" className="icon-button" aria-label="Open evidence vault"><ArrowUpRight size={17} /></a></SectionTitle>{state.evidence.length ? [...state.evidence].reverse().slice(0, 2).map(item => <a key={item.id} href={`#/evidence/${item.id}`} className="mini-evidence"><span className="artifact-icon"><FileCheck2 size={17} /></span><div><strong>{item.title}</strong><span>{getMission(item.missionId).operation} · {formatDate(item.createdAt)}</span></div></a>) : <p className="muted small">Your first piece of proof belongs here. A note, a sketch, or a few lines of code is a start.</p>}</section><section className="readiness-preview"><span className="eyebrow">THE OPPORTUNITY WINDOW</span><h3>Ready is something<br />you can work toward.</h3><div className="readiness-dots">{readinessKeys.map(key => <span key={key} className={state.readiness[key]} title={`${key}: ${state.readiness[key]}`} />)}</div><p>{readinessKeys.filter(key => state.readiness[key] === 'ready').length} of 5 dimensions self-assessed ready</p><a href="#/readiness" className="text-link">Review interview readiness<ArrowRight size={15} /></a></section></div>
          </div>
        </>}
        {page === 'missions' && <MissionsPage state={state} onResume={resume} />}
        {page === 'mission' && selected && <MissionPage mission={selected} state={state} commit={commit} onEvidence={() => openEvidence(selected.id)} onResume={resume} notify={setToast} />}
        {page === 'roadmap' && <RoadmapPage state={state} />}
        {page === 'plan' && <>
          <PageHeading eyebrow="ONE DAY, NOT THE WHOLE ROADMAP" title="Make today manageable." description="A maximum of three actions. Clear stopping points. No inherited backlog."><button className="button secondary" onClick={() => window.print()}><ArrowDownToLine size={16} />Print plan</button></PageHeading>
          <div className="plan-settings panel"><div><h3>How much room do you have?</h3><p className="muted small">Capacity changes rebuild an untouched plan. Completed plans stay intact until tomorrow.</p></div><CapacityControl value={state.capacity} onChange={setCapacity} /></div>
          <div className="dashboard-grid"><div><SectionTitle title={new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}><Badge>{todayPlan.filter(action => action.completed).length} / {todayPlan.length} complete</Badge></SectionTitle><PlanList actions={todayPlan} state={state} onEvidence={action => openEvidence(action.missionId, action)} onResume={resume} /><div className="plan-bottom"><span><Clock3 size={15} />{todayPlan.reduce((sum, action) => sum + action.minutes, 0)} minutes planned</span><button className="text-button" onClick={() => {
            if (todayPlan.some(action => action.completed)) { setToast('Completed work is preserved. A fresh plan arrives tomorrow.'); return; }
            change('Daily plan refreshed from your active missions', current => {
              const next = { ...current, plans: { ...current.plans } }; delete next.plans[date]; next.plans[date] = generatePlan(next, date); return next;
            });
          }}><RotateCcw size={14} />Refresh plan</button></div><section className="paper-note"><span className="eyebrow">A GENTLE REMINDER</span><h3>You don’t need to catch up.<br />You need a place to continue.</h3><p>Completing an action records practice. Completing a checkpoint requires evidence against its criteria. Both are real progress.</p></section></div><div className="right-rail"><FocusTimer session={focusSession} /><Blockers state={state} /><section className="panel"><label className="checkbox-label"><input type="checkbox" checked={state.interviewMode} onChange={event => change(event.target.checked ? 'Interview mode enabled' : 'Interview mode disabled', current => ({ ...current, interviewMode: event.target.checked }))} /><span><strong>Interview mode</strong><small>Prioritize coding, design, and opportunity work the next time you refresh an untouched plan.</small></span></label></section></div></div>
        </>}
        {page === 'evidence' && <EvidencePage state={state} selectedId={route.split('/')[1]} onAdd={() => openEvidence()} />}
        {page === 'history' && <HistoryPage state={state} />}
        {page === 'pipeline' && <PipelinePage state={state} onAdd={() => setOpportunityDialog(true)} commit={commit} notify={setToast} />}
        {page === 'readiness' && <ReadinessPage state={state} commit={commit} />}
        {page === 'settings' && <DataPage state={state} commit={commit} onExport={exportBackup} onReplace={next => workspace.replace(next)} notify={setToast} />}
        {page === 'guide' && <GuidePage />}
        {(!['hq', 'missions', 'mission', 'roadmap', 'plan', 'evidence', 'history', 'pipeline', 'readiness', 'settings', 'guide'].includes(page) || (page === 'mission' && !selected)) && <Empty title="This page isn’t on the map."><a href="#/hq">Return to HQ overview</a></Empty>}
        <footer className="page-footer"><span><Star /> Built for the long game.</span><span>CareerHQ <span className="footer-divider">/</span> Local-first by design <LockKeyhole size={12} /></span></footer>
      </main>
    </div>
    {toast && <div className="toast" role="status"><Check size={17} />{toast}<button aria-label="Dismiss notification" className="icon-button" onClick={() => setToast('')}><X size={14} /></button></div>}
    {evidenceDialog && <EvidenceDialog state={state} initialMission={evidenceDialog.missionId} action={evidenceDialog.action} onClose={() => setEvidenceDialog(null)} onSave={input => { const ok = commit(current => recordEvidence(current, input)); if (ok) setToast(input.advance ? 'Checkpoint complete. Your next step is unlocked.' : 'Evidence saved. Your progress has a place.'); return ok; }} />}
    {opportunityDialog && <OpportunityDialog onClose={() => setOpportunityDialog(false)} onSave={opportunity => change('Opportunity added', current => ({ ...current, opportunities: [...current.opportunities, opportunity] }), 'escape')} />}
  </div>;
}

function Signal({ icon, value, label, detail }: { icon: ReactNode; value: number; label: string; detail: string }) {
  return <div className="signal"><span className="signal-icon">{icon}</span><div><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span><small>{detail}</small></div></div>;
}

function CapacityControl({ value, onChange }: { value: Capacity; onChange: (capacity: Capacity) => void }) {
  return <div className="segmented" role="group" aria-label="Daily capacity">{capacities.map(capacity => <button key={capacity.id} onClick={() => onChange(capacity.id)} className={value === capacity.id ? 'active' : ''} aria-pressed={value === capacity.id}>{capacity.label}</button>)}</div>;
}

function MissionCard({ mission, state, onResume }: { mission: Mission; state: AppState; onResume: (id: MissionId) => void }) {
  const save = getSaveState(mission, state);
  const progress = state.missions[mission.id];
  return <article className={`mission-card ${mission.color}`}><div className="mission-card-top"><MissionIcon mission={mission} /><Badge tone={progress.mode === 'active' ? 'green' : ''}>{mission.planned ? 'Planned' : progress.status === 'completed' ? 'Completed' : progress.mode === 'active' ? 'In focus' : 'Background'}</Badge></div><span className="mission-subtitle">{mission.name}</span><h3>{mission.operation}</h3><p className="checkpoint-title">{save.checkpoint?.title ?? 'Roadmap not yet defined'}</p><div className="mission-progress-label"><span>{save.stage}</span><span>{save.completed}/{save.total}</span></div><Progress value={save.total ? save.completed / save.total * 100 : 0} label={`${mission.operation} checkpoints`} /><div className="mission-card-bottom"><span>{progress.blocker ? 'Blocked - needs attention' : mission.planned ? 'Room for a future chapter' : `Next: ${save.next}`}</span><button onClick={() => onResume(mission.id)} className="icon-button" aria-label={`Open ${mission.operation}`}><ArrowUpRight size={18} /></button></div></article>;
}

function PlanList({ actions, state, onEvidence, onResume }: { actions: DailyAction[]; state: AppState; onEvidence: (action: DailyAction) => void; onResume: (id: MissionId) => void }) {
  if (!actions.length) return <section className="panel"><Empty title="Room for a fresh start.">There are no available actions at this capacity. Activate an unblocked mission, choose a larger capacity, or refresh the plan after changing focus.</Empty><a href="#/missions" className="button secondary">Explore your missions<ArrowRight size={16} /></a></section>;
  return <div className="plan-list">{actions.map((action, index) => {
    const mission = getMission(action.missionId);
    const progress = state.missions[action.missionId];
    const unavailable = progress.blocker || progress.mode !== 'active' || progress.checkpointId !== action.checkpointId || progress.status === 'completed';
    return <article key={action.id} className={`plan-item ${action.completed ? 'done' : ''}`}><span className="plan-number">{action.completed ? <Check size={17} /> : `0${index + 1}`}</span><div className="plan-content"><div className="plan-meta"><span className={`mission-tag ${mission.color}`}>{mission.operation}</span><span><Clock3 size={12} />{action.minutes} min</span></div><h3>{action.title}</h3><p>{action.reason}</p>{!action.completed && !!unavailable && <p className="attention-text">This mission changed. Open it to inspect the current checkpoint.</p>}<div className="plan-item-footer">{action.completed ? <span className="done-label"><CircleCheck size={14} />Evidence recorded</span> : <><button className="text-link" onClick={() => onResume(action.missionId)}>Open checkpoint<ArrowUpRight size={14} /></button><button className="complete-button" disabled={!!unavailable} onClick={() => onEvidence(action)}><Plus size={13} />Log progress</button></>}</div></div></article>;
  })}</div>;
}

function useFocusSession(capacity: Capacity) {
  const duration = capacity === 'gentle' ? 10 : capacity === 'deep' ? 50 : 25;
  const [remaining, setRemaining] = useState(duration * 60);
  const [running, setRunning] = useState(false);
  const target = useRef(0);
  useEffect(() => { if (!running) setRemaining(duration * 60); }, [duration]);
  useEffect(() => {
    if (!running) return;
    const tick = () => { const left = Math.max(0, Math.ceil((target.current - Date.now()) / 1000)); setRemaining(left); if (left === 0) setRunning(false); };
    const timer = window.setInterval(tick, 250);
    return () => window.clearInterval(timer);
  }, [running]);
  function toggle() {
    if (!running) target.current = Date.now() + (remaining || duration * 60) * 1000;
    setRunning(!running);
  }
  function reset() { setRunning(false); setRemaining(duration * 60); }
  return { remaining, running, duration, toggle, reset };
}

function FocusTimer({ session }: { session: ReturnType<typeof useFocusSession> }) {
  const { remaining, running, duration, toggle, reset } = session;
  const display = `${Math.floor(remaining / 60).toString().padStart(2, '0')}:${(remaining % 60).toString().padStart(2, '0')}`;
  return <section className="focus-timer panel"><div className="focus-top"><span className="eyebrow"><span className={`status-dot ${running ? 'pulsing' : ''}`} />A LITTLE ROOM TO FOCUS</span><span className="timer-tab-note">THIS TAB</span></div><div className="timer-time" role="timer" aria-label={`${Math.floor(remaining / 60)} minutes ${remaining % 60} seconds remaining`}>{display}</div><p>{remaining === 0 ? 'Session finished. Keep a little proof of what you did.' : running ? 'One thing at a time. You have this space.' : 'Clear a little space. Do one useful thing.'}</p><div className="timer-buttons"><button className="button primary" onClick={toggle}>{running ? <Pause size={15} /> : <Play size={15} />}{running ? 'Pause session' : remaining === duration * 60 || remaining === 0 ? 'Start focus session' : 'Continue session'}</button><button className="icon-button" aria-label="Reset focus timer" onClick={reset}><RotateCcw size={16} /></button></div></section>;
}

function Blockers({ state }: { state: AppState }) {
  const blocked = missions.filter(mission => state.missions[mission.id].blocker);
  return <section className="blockers-card"><span className="eyebrow"><Flag size={13} />ON YOUR RADAR</span>{blocked.length ? blocked.map(mission => <a href={`#/mission/${mission.id}`} key={mission.id}><strong>{mission.operation}</strong><p>{state.missions[mission.id].blocker}</p><span>Work through this<ArrowUpRight size={13} /></span></a>) : <><h3>No blockers in the way.</h3><p>When something slows you down, name it in your mission. You don’t have to hold it all in your head.</p></>}</section>;
}

function MissionsPage({ state, onResume }: { state: AppState; onResume: (id: MissionId) => void }) {
  const [filter, setFilter] = useState('all');
  const filtered = missions.filter(mission => filter === 'all' || state.missions[mission.id].mode === filter);
  return <><PageHeading eyebrow="MANY AMBITIONS. ONE CLEAR NEXT STEP." title="Your missions, connected." description="Each mission keeps its own roadmap and exactly one place to resume." /><div className="filter-row"><div className="tabs">{[['all', 'All missions'], ['active', 'In focus'], ['background', 'Background'], ['planned', 'Planned']].map(([key, label]) => <button key={key} onClick={() => setFilter(key)} className={filter === key ? 'active' : ''} aria-pressed={filter === key}>{label}<span>{key === 'all' ? missions.length : missions.filter(m => state.missions[m.id].mode === key).length}</span></button>)}</div><span className="muted small">Prototype roadmaps · v{state.roadmapVersion}</span></div><div className="mission-grid all-missions">{filtered.map(mission => <MissionCard key={mission.id} mission={mission} state={state} onResume={onResume} />)}</div><div className="quiet-note"><Info size={17} /><p>Permanent doesn’t mean daily. Background missions keep their place while you focus on what matters now. These starter roadmaps are not full curricula.</p></div></>;
}

function MissionPage({ mission, state, commit, onEvidence, onResume, notify }: { mission: Mission; state: AppState; commit: Commit; onEvidence: () => void; onResume: (id: MissionId) => void; notify: (text: string) => void }) {
  const save = getSaveState(mission, state);
  const progress = state.missions[mission.id];
  const [blocker, setBlocker] = useState(progress.blocker);
  useEffect(() => setBlocker(progress.blocker), [mission.id, progress.blocker]);
  function update(title: string, transform: (current: AppState) => AppState) {
    if (commit(current => recordChange(transform(current), title, mission.id))) notify(title);
  }
  return <><a className="back-link" href="#/missions">← All missions</a><PageHeading eyebrow={`${mission.name} / ${mission.owner}`} title={mission.operation} description={mission.description}>{!mission.planned && <button className="button secondary" onClick={() => update(progress.mode === 'active' ? 'Mission moved to background' : 'Mission brought into focus', current => ({ ...current, missions: { ...current.missions, [mission.id]: { ...current.missions[mission.id], mode: progress.mode === 'active' ? 'background' : 'active' } } }))}>{progress.mode === 'active' ? <Pause size={15} /> : <Play size={15} />}{progress.mode === 'active' ? 'Move to background' : 'Bring into focus'}</button>}</PageHeading>
    {mission.planned ? <section className="panel"><Empty title="An ambition with room to grow.">Competitive programming has its own mission. A canonical roadmap hasn’t been defined, so there are no invented checkpoints or progress here.</Empty></section> : <>
      <section className={`save-state-card ${mission.color}`}><div className="save-state-header"><span className="eyebrow"><Flag size={14} />YOUR SAVE STATE</span><Badge tone="green">{statusLabels[save.status]}</Badge></div><div className="save-state-main"><MissionIcon mission={mission} size={27} /><div><span>{save.stage}</span><h2>{save.checkpoint?.title}</h2></div><span className="save-count">{save.completed}<small> / {save.total} complete</small></span></div><Progress value={save.completed / save.total * 100} label="Mission checkpoint progress" /><div className="save-state-bottom"><span><LockKeyhole size={14} /><strong>Next unlock:</strong> {save.next}</span><button className="text-link" onClick={() => update('Primary mission updated', current => ({ ...current, focusMissionId: mission.id }))}>{state.focusMissionId === mission.id ? 'Your primary mission' : 'Make primary mission'}<Target size={14} /></button></div></section>
      <div className="dashboard-grid mission-detail"><div><section className="panel next-action"><span className="eyebrow">THE NEXT MECHANICAL ACTION</span><h2>{save.status === 'completed' ? 'The whole chapter, completed.' : save.checkpoint?.action}</h2><p>{save.status === 'completed' ? 'Your evidence and history remain here. A future roadmap revision should preserve this record.' : mission.purpose}</p>{save.status !== 'completed' && <><div className="criteria-list"><h4>What “done” looks like</h4>{save.checkpoint?.criteria.map(criterion => <div key={criterion}><span className="tiny-circle" />{criterion}</div>)}</div><div className="button-row"><button className="button primary" onClick={onEvidence} disabled={progress.mode !== 'active' || !!progress.blocker}><Plus size={16} />Record evidence</button>{progress.status === 'not-started' && <button className="button secondary" onClick={() => onResume(mission.id)} disabled={progress.mode !== 'active' || !!progress.blocker}>Begin checkpoint<Play size={14} /></button>}<span className="muted small"><Clock3 size={13} />About {save.checkpoint?.minutes} min</span></div>{progress.mode !== 'active' && <p className="attention-text">Bring this mission into focus to start or record new evidence.</p>}</>}</section>
        <SectionTitle eyebrow="A STABLE MAP. A MOVING YOU." title="The path ahead." /><div className="checkpoint-roadmap">{mission.checkpoints.map((checkpoint, index) => {
          const done = progress.completedCheckpointIds.includes(checkpoint.id);
          const current = checkpoint.id === progress.checkpointId && !done;
          return <div key={checkpoint.id} className={`checkpoint-row ${done ? 'complete' : current ? 'current' : 'locked'}`}><span className="checkpoint-node">{done ? <Check size={15} /> : current ? <span /> : <LockKeyhole size={12} />}</span><div><span className="eyebrow">{checkpoint.stage}</span><h3>{checkpoint.title}</h3>{current && <p>{checkpoint.action}</p>}</div><Badge tone={current ? 'green' : ''}>{done ? 'Completed' : current ? 'You are here' : 'Locked'}</Badge><span className="checkpoint-order">0{index + 1}</span></div>;
        })}</div>
      </div><div className="right-rail"><section className="panel"><SectionTitle title="Clear the path." /><form className="stack-form" onSubmit={event => { event.preventDefault(); update(blocker.trim() ? 'Blocker recorded' : 'Blocker cleared', current => ({ ...current, missions: { ...current.missions, [mission.id]: { ...current.missions[mission.id], blocker: blocker.trim() } } })); }}><label>What’s slowing you down?<textarea value={blocker} onChange={event => setBlocker(event.target.value)} rows={3} maxLength={500} placeholder="A question, a missing resource, a decision..." /></label><button className="button secondary" type="submit">{blocker.trim() ? 'Save blocker' : 'Clear blocker'}</button></form></section><section className="panel dependencies"><span className="eyebrow">NOT AN ISOLATED CHAPTER</span><h3>Builds on & connects to</h3>{mission.dependencies.map(id => <a href={`#/mission/${id}`} key={id}><MissionIcon mission={getMission(id)} size={16} /><span>{getMission(id).operation}</span><ArrowUpRight size={14} /></a>)}{!mission.dependencies.length && <p className="muted small">A foundation other missions can build on.</p>}<p className="muted small">Capability connections, not automatic prerequisite locks. Checkpoints unlock in order within each mission.</p></section><section className="panel"><SectionTitle title="Mission proof" /><p className="muted small">{state.evidence.filter(item => item.missionId === mission.id).length} artifacts in your evidence vault.</p><a href="#/evidence" className="text-link">Browse the evidence<ArrowUpRight size={14} /></a></section><section className="panel"><span className="eyebrow">RECENT MISSION HISTORY</span>{[...state.events].reverse().filter(event => event.missionId === mission.id).slice(0, 3).map(event => <p className="mission-event" key={event.id}><strong>{event.title}</strong><small>{formatDate(event.createdAt)}</small></p>)}{!state.events.some(event => event.missionId === mission.id) && <p className="muted small">Your next action starts the record.</p>}</section></div></div>
    </>}</>;
}

function RoadmapPage({ state }: { state: AppState }) {
  const [onlyActive, setOnlyActive] = useState(false);
  return <><PageHeading eyebrow="THE LONG GAME, IN PERSPECTIVE" title="Separate paths. Shared direction." description="An overview of how your capabilities grow together. The work still happens one checkpoint at a time."><button className="button secondary" onClick={() => window.print()}>Print roadmap<ArrowDownToLine size={16} /></button></PageHeading><section className="roadmap-north-star"><Star /><div><span className="eyebrow">YOUR NORTH STAR</span><h2>{state.objective}</h2></div><Compass size={36} strokeWidth={1} /></section><div className="roadmap-legend"><span><i className="legend-dot completed" />Completed</span><span><i className="legend-dot current" />Current checkpoint</span><span><LockKeyhole size={12} />Locked</span><label className="checkbox-label"><input type="checkbox" checked={onlyActive} onChange={event => setOnlyActive(event.target.checked)} />In-focus missions only</label></div><div className="roadmap-lanes">{missions.filter(mission => !onlyActive || state.missions[mission.id].mode === 'active').map(mission => <section key={mission.id} className={`roadmap-lane ${mission.color}`}><a href={`#/mission/${mission.id}`} className="roadmap-mission"><MissionIcon mission={mission} /><div><small>{mission.name}</small><h3>{mission.operation}</h3></div><ArrowUpRight size={14} /></a><div className="roadmap-stops">{mission.checkpoints.map(checkpoint => {
    const done = state.missions[mission.id].completedCheckpointIds.includes(checkpoint.id);
    const current = state.missions[mission.id].checkpointId === checkpoint.id && !done;
    return <a href={`#/mission/${mission.id}`} key={checkpoint.id} className={`roadmap-stop ${done ? 'complete' : current ? 'current' : ''}`}><span>{done ? <CircleCheck size={16} /> : current ? <Target size={16} /> : <LockKeyhole size={14} />}{done ? 'Completed' : current ? 'Current' : 'Locked'}</span><strong>{checkpoint.title}</strong><small>{checkpoint.stage}</small></a>;
  })}{mission.planned && <p className="planned-roadmap">A future chapter. Roadmap pending, no progress assumed.</p>}</div>{mission.dependencies.length > 0 && <div className="roadmap-connections"><GitBranch size={13} />Capability connections:{mission.dependencies.map(id => <a key={id} href={`#/mission/${id}`}>{getMission(id).operation}<ArrowUpRight size={11} /></a>)}</div>}</section>)}</div><div className="quiet-note"><Info size={18} /><p>These are compact prototype roadmaps, not complete course plans. Lines between missions show related capabilities; only checkpoint sequence within a mission controls unlocks.</p></div></>;
}

function EvidencePage({ state, selectedId, onAdd }: { state: AppState; selectedId?: string; onAdd: () => void }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('all');
  useEffect(() => { setFilter('all'); setQuery(''); setKind('all'); }, [selectedId]);
  useEffect(() => { if (selectedId) document.getElementById(`proof-${selectedId}`)?.scrollIntoView({ block: 'center' }); }, [selectedId, filter, query, kind]);
  const evidence = [...state.evidence].reverse().filter(item => (filter === 'all' || item.missionId === filter) && (kind === 'all' || item.kind === kind) && `${item.title} ${item.summary}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeading eyebrow="CONFIDENCE WITH A PAPER TRAIL" title="Work you can point to." description="The code, diagrams, explanations, and small breakthroughs that make your progress real."><button className="button primary" onClick={onAdd}><Plus size={16} />Add evidence</button></PageHeading><div className="evidence-summary"><span className="big-stat">{state.evidence.length.toString().padStart(2, '0')}</span><div><h3>pieces of proof, kept close.</h3><p>Stored on this browser. Yours to export, revisit, and build on.</p></div><FileCheck2 size={44} strokeWidth={1} /></div><div className="filter-row evidence-filters"><div className="input-with-icon"><Search size={16} /><input aria-label="Search evidence" placeholder="Find a piece of proof..." value={query} onChange={event => setQuery(event.target.value)} /></div><select value={filter} aria-label="Filter evidence by mission" onChange={event => setFilter(event.target.value)}><option value="all">All missions</option>{missions.filter(mission => !mission.planned).map(mission => <option key={mission.id} value={mission.id}>{mission.operation}</option>)}</select><select aria-label="Filter evidence by type" value={kind} onChange={event => setKind(event.target.value)}><option value="all">All artifact types</option>{Object.entries(kindLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></div>{evidence.length ? <div className="evidence-grid">{evidence.map(item => <EvidenceCard key={item.id} item={item} highlighted={item.id === selectedId} />)}</div> : <Empty title={state.evidence.length ? 'No proof matches those filters.' : 'The first artifact is a beginning.'} icon="file">{state.evidence.length ? 'Try another mission, type, or search term.' : 'Explain something in your own words, save a diagram, or link a little code. It doesn’t have to be perfect to be useful.'}</Empty>}</>;
}

function EvidenceCard({ item, highlighted }: { item: Evidence; highlighted: boolean }) {
  const mission = getMission(item.missionId);
  const checkpoint = mission.checkpoints.find(cp => cp.id === item.checkpointId);
  return <article id={`proof-${item.id}`} className={`evidence-card ${highlighted ? 'highlighted' : ''}`}><div className="evidence-card-top"><span className={`mission-tag ${mission.color}`}>{mission.operation}</span><span className="local-label"><LockKeyhole size={12} />Local</span></div><div className={`artifact-illustration ${mission.color}`}><FileCheck2 size={34} strokeWidth={1.2} /><span>{kindLabels[item.kind]}</span></div><h3>{item.title}</h3><p>{item.summary}</p><div className="artifact-checkpoint"><Flag size={12} />{checkpoint?.title}</div><div className="evidence-card-footer"><span>{formatDate(item.createdAt)}{item.completedCheckpoint && <span className="proof-complete"><CircleCheck size={12} />Checkpoint proof</span>}</span>{item.url && <a className="text-link" href={item.url} target="_blank" rel="noopener noreferrer">Open artifact<ArrowUpRight size={14} /></a>}</div></article>;
}
