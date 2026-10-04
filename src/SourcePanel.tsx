import { useState } from 'react';
import { ArrowRight, FileText, History, RefreshCw } from 'lucide-react';
import { getCheckpoint, getLatestMission, getMission, getMissionVersion, missions } from './domain/catalog';
import { upgradeRoadmap } from './domain/engine';
import type { AppState, Mission, MissionId } from './domain/types';
import { Badge, PageHeading } from './components';
import { MissionFlowchart } from './roadmaps/MissionFlowchart';

type Commit = (transform: (state: AppState) => AppState) => boolean;

export function SourcePanel({ missionId, state, commit, expanded = false }: {
  missionId: MissionId; state: AppState; commit: Commit; expanded?: boolean;
}) {
  const active = getMission(missionId, state);
  const latest = getLatestMission(missionId);
  const [notice, setNotice] = useState('');
  const pending = active.roadmapVersion !== latest.roadmapVersion;
  const append = pending && latest.appendFrom === active.roadmapVersion;
  const archives = state.archives.filter(archive => archive.missionId === missionId);

  function adopt() {
    const change = append
      ? 'Your existing HashMap checkpoints, completion evidence, current position and blocker are retained. Only new topic checkpoints start unconfirmed. The previous tracker is also archived; completed work is counted once.'
      : 'Your previous checkpoint, blocker and completion record will be archived. All saved work and history stay available. New checkpoints start unconfirmed; old progress is not credited to different topics.';
    if (!window.confirm(`${append ? 'Append the expanded' : 'Adopt the documented'} ${latest.operation} roadmap?\n\n${change}\n\nYour existing daily plan will be preserved. Refresh an untouched plan to use the new checkpoint.`)) return;
    const ok = commit(current => upgradeRoadmap(current, missionId));
    setNotice(ok ? append ? 'Expanded roadmap appended. Existing HashMap progress is retained; new topics start unconfirmed. Refresh an untouched daily plan when ready.' : 'Documented roadmap adopted. Previous progress is preserved below; refresh an untouched daily plan when ready.' : 'Roadmap was not changed. Check the workspace warning.');
  }

  return <section className={`source-panel ${latest.color}`} data-tour="operation-source">
    <div className="source-heading"><FileText size={18} /><div><h3>Operation documents</h3><p>Documented roadmap v{latest.roadmapVersion} · Active tracker v{active.roadmapVersion}</p></div><Badge>{latest.coverage ?? 'documented'}</Badge></div>
    {pending && <div className="source-upgrade">
      <p>{append ? 'Full roadmap shows the complete expanded DSA curriculum, including BFS, DFS and DP. Append it to your saved HashMap tracker when ready; your current position and genuine completions stay.' : missionId === 'pattern' ? `Full roadmap shows all ${latest.checkpoints.length} checkpoints from the expanded PDF, including BFS, DFS and DP. Your saved tracker is still v${active.roadmapVersion}. Browsing the complete map does not change it; adoption is a separate confirmed action.` : 'Your saved position still uses the previous roadmap. Review the documented content before switching; no existing work will be silently reclassified.'}</p>
      <button className="button primary" data-tour="source-adopt" onClick={adopt}><RefreshCw size={15} />{append ? 'Append expanded roadmap' : 'Adopt documented roadmap'}</button>
    </div>}
    {missionId === 'pattern' && <p className="source-notice"><a className="text-link" data-tour="dsa-library-open" href="#/dsa/1">Browse all 50 DSA sections and problem sets<ArrowRight size={14} /></a></p>}
    {notice && <p className="source-notice" role="status">{notice}</p>}
    {missionId === 'income' && <p className="source-notice"><a className="text-link" href="#/freelance">Open freelance opportunity ledger<ArrowRight size={14} /></a></p>}
    {['pattern', 'system'].includes(missionId) && <p className="source-notice"><a className="text-link" href="#/recall">Review saved work in recall practice<ArrowRight size={14} /></a></p>}
    <details className="source-details" data-tour="source-material" open={expanded}>
      <summary>Sources, scope and supporting material</summary>
      <div className="source-counts"><span>{latest.stages?.length ?? 0} documented stages</span><span>{latest.checkpoints.length} tracked nodes</span><span>Personal progress not imported</span></div>
      {latest.sourceNotes?.length ? <ul className="source-notes">{latest.sourceNotes.map(note => <li key={note}>{note}</li>)}</ul> : null}
      {latest.referenceGroups?.map(group => <section className="source-reference-group" data-tour={group.kind === 'projects' ? 'source-projects' : undefined} key={group.title}><h4>{group.title}<Badge>{group.kind}</Badge></h4><dl>{group.items.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.detail}</dd></div>)}</dl></section>)}
      {latest.resources?.length ? <div className="source-resources">{latest.resources.map(resource => <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer">{resource.label}<ArrowRight size={12} /></a>)}</div> : null}
      <h4 className="source-citations-heading">Source references</h4>
      <ul className="source-citations">{latest.sources?.map((source, index) => <li key={`${source.document}-${index}`}><strong>{source.document}</strong><span>{source.section}{source.page ? ` · page ${source.page}` : ''}</span></li>)}</ul>
      <p className="source-privacy">The original PDFs contain private material and are not bundled with the public site. Only reusable roadmap structure is shown here.</p>
    </details>
    {pending && <details className="source-details" data-tour="source-preview"><summary>Preview documented roadmap before adopting</summary><MissionFlowchart mission={latest} state={state} tutorialTarget={false} /></details>}
    {archives.map(archive => {
      const previous = getMissionVersion(missionId, archive.progress.roadmapVersion);
      const checkpoint = archive.progress.checkpointId ? getCheckpoint(missionId, archive.progress.checkpointId, previous.roadmapVersion) : undefined;
      return <details className="source-details roadmap-archive" data-tour="source-archive" key={previous.roadmapVersion}>
        <summary><History size={14} /> Previous roadmap v{previous.roadmapVersion}: {archive.progress.completedCheckpointIds.length}/{previous.checkpoints.length} completed</summary>
        <p className="source-archive-position">Preserved checkpoint: <strong>{checkpoint?.title ?? 'Roadmap pending'}</strong> · {archive.progress.status}. This archive is read-only.</p>
        {archive.progress.blocker && <p className="source-archive-position">Previous blocker: {archive.progress.blocker}</p>}
        <MissionFlowchart mission={previous} state={state} tutorialTarget={false} />
      </details>;
    })}
  </section>;
}

export function OperationSourcesPage({ state, commit, initialSelection = 'pattern' }: { state: AppState; commit: Commit; initialSelection?: MissionId }) {
  const [selection, setSelection] = useState<MissionId>(initialSelection);
  const mission: Mission = getLatestMission(selection);
  return <>
    <PageHeading eyebrow="DOCUMENTED MATERIAL" title="Operation documents" description="Roadmaps extracted from the supplied handoffs and visual references. Your private progress is separate." />
    <div className="source-selector"><label>Mission<select data-tour="source-mission" value={selection} onChange={event => setSelection(event.target.value as MissionId)}>{missions.map(item => <option key={item.id} value={item.id}>{item.name} · {item.operation}</option>)}</select></label><a className="button secondary" href={`#/mission/${selection}`}>Open current tracker<ArrowRight size={15} /></a></div>
    <SourcePanel key={selection} missionId={selection} state={state} commit={commit} expanded />
    <MissionFlowchart key={`${selection}-latest`} mission={mission} state={state} tutorialTarget={false} />
  </>;
}
