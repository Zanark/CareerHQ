import { ArrowRight, Check, Clock3, Download, HardDrive, Plus } from 'lucide-react';
import { getMission, missions } from './domain/catalog';
import { getSaveState } from './domain/engine';
import type { AppState, DailyAction, MissionId } from './domain/types';
import { MissionIcon, Progress, SectionTitle, statusLabels } from './components';

export function Overview({ state, date, practice, onEvidence, onResume, onExport }: {
  state: AppState;
  date: string;
  practice: boolean;
  onEvidence: (missionId?: MissionId, action?: DailyAction) => void;
  onResume: (missionId: MissionId) => void;
  onExport: () => void;
}) {
  const actions = state.plans[date] ?? [];
  const active = missions.filter(mission => state.missions[mission.id].mode === 'active' && state.missions[mission.id].status !== 'completed');
  const visibleMissions = [...active].sort((left, right) =>
    Number(right.id === state.focusMissionId) - Number(left.id === state.focusMissionId)).slice(0, 3);
  const completed = Object.values(state.missions).reduce((sum, mission) => sum + mission.completedCheckpointIds.length, 0);
  return <div className="overview-page">
    <div className="overview-heading">
      <div><h1>Overview</h1><time dateTime={date}>{new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</time></div>
      <button className="button primary" onClick={() => onEvidence()}><Plus size={16} />Log progress</button>
    </div>
    <div className="overview-summary" data-tour="overview-summary">
      <a href="#/plan"><strong>{actions.filter(action => action.completed).length}<span>/{actions.length}</span></strong><span>Actions done today</span></a>
      <a href="#/missions"><strong>{completed}</strong><span>Checkpoints completed</span></a>
      <a href="#/evidence"><strong>{state.evidence.length}</strong><span>Saved work</span></a>
    </div>
    <section data-tour="overview-today">
      <SectionTitle title="Today's plan"><a className="text-link" href="#/plan">Daily plan<ArrowRight size={14} /></a></SectionTitle>
      <div className="overview-list">
        {actions.map(action => {
          const mission = getMission(action.missionId);
          const progress = state.missions[action.missionId];
          const unavailable = !!progress.blocker || progress.mode !== 'active' || progress.checkpointId !== action.checkpointId || progress.status === 'completed';
          return <article className={`overview-action ${action.completed ? 'is-complete' : ''}`} key={action.id}>
            <MissionIcon mission={mission} size={18} />
            <div className="overview-row-content"><span>{mission.name}</span><h3>{action.title}</h3></div>
            <span className="overview-time"><Clock3 size={13} />{action.minutes}m</span>
            {action.completed ? <span className="overview-done"><Check size={15} />Done</span> :
              <button className="button secondary" disabled={unavailable} onClick={() => onEvidence(action.missionId, action)}>Log progress</button>}
          </article>;
        })}
        {!actions.length && <p className="overview-empty">No actions planned. <a href="#/plan">Adjust your daily plan.</a></p>}
      </div>
    </section>
    <section data-tour="overview-missions">
      <SectionTitle title="Current checkpoints"><a className="text-link" href="#/missions">All missions<ArrowRight size={14} /></a></SectionTitle>
      <div className="overview-list">
        {visibleMissions.map(mission => {
          const save = getSaveState(mission, state);
          const progress = state.missions[mission.id];
          return <article key={mission.id} className="overview-checkpoint">
            <MissionIcon mission={mission} size={18} />
            <div className="overview-row-content"><h3>{mission.name}</h3><p>{save.checkpoint?.title}</p></div>
            <div className={`overview-track-progress ${mission.color}`}><span>{save.completed}/{save.total} completed</span><Progress value={save.total ? save.completed / save.total * 100 : 0} label={`${mission.name} checkpoints`} /></div>
            <span className={`overview-status ${progress.blocker ? 'blocked' : ''}`}>{progress.blocker ? 'Blocked' : statusLabels[save.status]}</span>
            <button className="text-link" aria-label={`Resume ${mission.name}`} onClick={() => onResume(mission.id)}>Resume<ArrowRight size={14} /></button>
          </article>;
        })}
        {!active.length && <p className="overview-empty">No active missions. <a href="#/missions">Choose a mission to work on.</a></p>}
        {active.length > visibleMissions.length && <p className="overview-more"><a href="#/missions">{active.length - visibleMissions.length} more active missions<ArrowRight size={13} /></a></p>}
      </div>
    </section>
    <aside className="overview-storage" data-tour="overview-storage">
      <HardDrive size={18} />
      <p><strong>{practice ? 'Tutorial practice data' : 'Stored in this browser only'}</strong><span>{practice ? 'Discarded when you exit. Your real progress is unchanged.' : 'No cloud sync. Export a backup before changing browsers or machines.'}</span></p>
      <a href="#/settings" className="text-link">How saving works</a>
      <button className="button secondary" onClick={onExport}><Download size={14} />{practice ? 'Export example' : 'Export backup'}</button>
    </aside>
  </div>;
}
