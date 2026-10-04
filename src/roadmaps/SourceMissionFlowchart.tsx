import { useId, useMemo, useState } from 'react';
import { Check, Flag, LockKeyhole, RotateCcw } from 'lucide-react';
import { getProgressForVersion, prerequisitesFor } from '../domain/catalog';
import type { AppState, Mission } from '../domain/types';
import { Badge } from '../components';
import { Diagram } from './Diagram';
import type { DiagramEdge } from './Diagram';
import { checkpointLevels } from './roadmapGraph';

const completionEdges: DiagramEdge[] = [
  { from: 'rule-current', to: 'rule-decision' },
  { from: 'rule-decision', to: 'rule-next', label: 'Yes' },
  { from: 'rule-decision', to: 'rule-practice', kind: 'branch', label: 'Not yet' },
  { from: 'rule-practice', to: 'rule-current', kind: 'return' },
];

export function SourceMissionFlowchart({ mission, state, tutorialTarget = true }: { mission: Mission; state: AppState; tutorialTarget?: boolean }) {
  const progress = getProgressForVersion(state, mission.id, mission.roadmapVersion);
  const stages = mission.stages ?? [];
  const currentStage = stages.find(stage => stage.checkpointIds.includes(progress?.checkpointId ?? ''));
  const [selection, setSelection] = useState<string | null>(null);
  const selected = stages.find(stage => stage.id === selection) ?? currentStage ?? stages[0];
  const titleId = useId();
  const descriptionId = useId();
  const completed = useMemo(() => new Set(progress?.completedCheckpointIds ?? []), [progress]);
  const checkpoints = useMemo(() => mission.checkpoints.filter(checkpoint => selected?.checkpointIds.includes(checkpoint.id)), [mission, selected]);
  const levels = useMemo(() => checkpointLevels(mission, checkpoints), [mission, checkpoints]);
  const edges = useMemo<DiagramEdge[]>(() => {
    const ids = new Set(checkpoints.map(checkpoint => checkpoint.id));
    const hasChildren = new Set<string>();
    const result: DiagramEdge[] = [];
    checkpoints.forEach(checkpoint => {
      const parents = prerequisitesFor(mission, checkpoint).filter(id => ids.has(id));
      if (!parents.length) result.push({ from: 'stage-start', to: checkpoint.id });
      parents.forEach(parent => {
        hasChildren.add(parent);
        result.push({ from: parent, to: checkpoint.id, tone: completed.has(parent) ? 'complete' : 'normal' });
      });
    });
    checkpoints.filter(checkpoint => !hasChildren.has(checkpoint.id)).forEach(checkpoint => {
      result.push({ from: checkpoint.id, to: 'stage-finish', tone: completed.has(checkpoint.id) ? 'complete' : 'normal' });
    });
    return result;
  }, [mission, checkpoints, completed]);

  return <figure className="mission-flowchart source-mission-flowchart" aria-labelledby={titleId} aria-describedby={descriptionId} data-tour={tutorialTarget ? 'mission-roadmap' : undefined}>
    <figcaption><h3 id={titleId}>{mission.name} checkpoint flowchart</h3><p id={descriptionId}>Documented roadmap v{mission.roadmapVersion}. Stage topics and optional references are separate from tracked checkpoint completion.</p></figcaption>
    {!progress && <p className="source-preview-note">Preview only. No personal progress is assigned to this roadmap version.</p>}
    <details className="source-stage-tree">
      <summary>All documented stages ({stages.length})</summary>
      <ol>{stages.map(stage => <li key={stage.id}><button type="button" aria-pressed={selected?.id === stage.id} onClick={() => setSelection(stage.id)}>{stage.title}<small>{stage.optional ? 'Optional reference; not a prerequisite' : stage.checkpointIds.length ? `${stage.checkpointIds.length} tracked ${stage.checkpointIds.length === 1 ? 'node' : 'nodes'}` : 'Reference / planning material only'}</small></button></li>)}</ol>
    </details>
    {selected && <>
      <div className="source-stage-heading"><label>Roadmap stage<select aria-label="Roadmap stage" value={selected.id} onChange={event => setSelection(event.target.value)}>{stages.map(stage => <option value={stage.id} key={stage.id}>{stage.title}{stage.optional ? ' (optional)' : ''}</option>)}</select></label>{currentStage && <button className="button secondary" onClick={() => setSelection(null)}>Current stage</button>}</div>
      <p className="source-stage-description">{selected.summary}{selected.optional && <Badge>Optional</Badge>}</p>
      {checkpoints.length ? <Diagram edges={edges} className="flow-canvas source-flow-canvas">
        <div className="flow-terminal" data-diagram-node="stage-start">{selected.title}</div>
        {levels.map((level, index) => <div className="source-level" key={index}>{level.map(checkpoint => {
          const done = completed.has(checkpoint.id);
          const current = progress?.status !== 'completed' && progress?.checkpointId === checkpoint.id;
          const unlocked = !!progress && prerequisitesFor(mission, checkpoint).every(id => completed.has(id));
          const status = !progress ? 'reference' : done ? 'complete' : current ? 'current' : unlocked ? 'available' : 'locked';
          return <article key={checkpoint.id} className={`flow-node flow-checkpoint ${status}`} data-diagram-node={checkpoint.id} data-checkpoint={checkpoint.id}>
            <span className="flow-state">{done ? <Check size={13} /> : current ? <Flag size={13} /> : <LockKeyhole size={13} />}{!progress ? 'Not tracked' : done ? 'Completed' : current ? 'Current checkpoint' : unlocked ? 'Available' : 'Locked'}</span>
            <h4>{checkpoint.sourceId && !checkpoint.title.startsWith(checkpoint.sourceId) ? `${checkpoint.sourceId} · ` : ''}{checkpoint.title}</h4><small>{checkpoint.granularity ?? 'checkpoint'}</small>
          </article>;
        })}</div>)}
        <div className={`flow-terminal ${checkpoints.every(checkpoint => completed.has(checkpoint.id)) ? 'complete' : ''}`} data-diagram-node="stage-finish">All tracked nodes in this stage complete</div>
      </Diagram> : <div className="source-stage-tree"><ol>{selected.topics.map(topic => <li key={topic}><div className="source-reference-topic">{topic}</div></li>)}</ol><p className="source-privacy">These are reference topics or planning estimates, not invented checkpoint IDs or recorded achievements.</p></div>}
      {checkpoints.length > 0 && <details className="source-stage-topics"><summary>Topics and completion criteria in this stage</summary>{checkpoints.map(checkpoint => <section key={checkpoint.id}><h4>{checkpoint.title}</h4><ul>{checkpoint.topics?.map(topic => <li key={topic}>{topic}</li>)}</ul><strong className="small">Completion evidence</strong><ul>{checkpoint.criteria.map(criterion => <li key={criterion}>{criterion}</li>)}</ul></section>)}</details>}
    </>}
    {checkpoints.length > 0 && <details className="source-flow-rule"><summary>How checkpoint completion works</summary>
      <Diagram edges={completionEdges} className="flow-canvas">
        <div className="flow-node flow-checkpoint" data-diagram-node="rule-current">Current checkpoint</div>
        <div className="flow-decision-row"><div className="flow-decision" data-diagram-node="rule-decision"><span>Evidence<br />+ criteria<br />confirmed?</span></div><div className="flow-node flow-practice" data-diagram-node="rule-practice"><RotateCcw size={15} /><strong>Practice</strong><small>Record evidence</small></div></div>
        <div className="flow-terminal" data-diagram-node="rule-next">Next available checkpoint</div>
      </Diagram><p className="flow-note">Only an active, unblocked mission can record completion. Available branches still keep exactly one current checkpoint. Reviews never silently change completed work.</p>
    </details>}
  </figure>;
}
