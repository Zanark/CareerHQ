import { Fragment, useId, useMemo } from 'react';
import { Check, Flag, LockKeyhole, RotateCcw } from 'lucide-react';
import type { AppState, Mission } from '../domain/types';
import { Diagram } from './Diagram';
import type { DiagramEdge } from './Diagram';
import { getProgressForVersion } from '../domain/catalog';
import { SourceMissionFlowchart } from './SourceMissionFlowchart';
import { missionAccentStyle } from '../missionVisuals';

interface FlowProps { mission: Mission; state: AppState; tutorialTarget?: boolean }
const emptyCompleted: string[] = [];

export function MissionFlowchart(props: FlowProps) {
  return props.mission.roadmapVersion !== '1.0.0'
    ? <SourceMissionFlowchart key={`${props.mission.id}-${props.mission.roadmapVersion}`} {...props} />
    : <LegacyMissionFlowchart {...props} />;
}

function LegacyMissionFlowchart({ mission, state, tutorialTarget = true }: FlowProps) {
  const progress = getProgressForVersion(state, mission.id, mission.roadmapVersion);
  const completed = progress?.completedCheckpointIds ?? emptyCompleted;
  const activeIndex = !progress || progress.status === 'completed' ? -1 : mission.checkpoints.findIndex(checkpoint => checkpoint.id === progress.checkpointId);
  const titleId = useId();
  const descriptionId = useId();
  const edges = useMemo(() => {
    if (!mission.checkpoints.length) return [];
    const result: DiagramEdge[] = [{ from: 'start', to: mission.checkpoints[0].id }];
    mission.checkpoints.forEach((checkpoint, index) => {
      const next = mission.checkpoints[index + 1]?.id ?? 'finish';
      if (index === activeIndex) {
        result.push(
          { from: checkpoint.id, to: 'decision', tone: 'current' },
          { from: 'decision', to: next, label: 'Yes', tone: 'current' },
          { from: 'decision', to: 'practice', kind: 'branch', label: 'Not yet', tone: 'current' },
          { from: 'practice', to: checkpoint.id, kind: 'return' },
        );
      } else {
        result.push({ from: checkpoint.id, to: next, tone: completed.includes(checkpoint.id) ? 'complete' : 'normal' });
      }
    });
    return result;
  }, [mission, activeIndex, completed]);

  if (mission.planned) return <p className="diagram-pending">Roadmap pending. No checkpoints or prerequisite branches have been invented.</p>;

  return <figure className={`mission-flowchart ${mission.color}`} style={missionAccentStyle(mission.id)} aria-labelledby={titleId} aria-describedby={descriptionId} data-tour={tutorialTarget ? 'mission-roadmap' : undefined}>
    <figcaption><h3 id={titleId}>{mission.name} checkpoint flowchart</h3><p id={descriptionId}>Follow the arrows downward. Evidence and confirmed criteria unlock the next milestone; otherwise, practice and return.</p></figcaption>
    <Diagram edges={edges} className="flow-canvas">
      <div className="flow-terminal" data-diagram-node="start">Start mission</div>
      {mission.checkpoints.map((checkpoint, index) => {
        const complete = completed.includes(checkpoint.id);
        const current = index === activeIndex;
        return <Fragment key={checkpoint.id}>
          <article data-diagram-node={checkpoint.id} data-checkpoint={checkpoint.id} className={`flow-node flow-checkpoint ${complete ? 'complete' : current ? 'current' : 'locked'}`}>
            <span className="flow-state">{complete ? <Check size={13} /> : current ? <Flag size={13} /> : <LockKeyhole size={13} />}{complete ? 'Completed' : current ? 'Current checkpoint' : 'Locked'}</span>
            <h4>{checkpoint.title}</h4><small>{checkpoint.stage}</small>
          </article>
          {current && <div className="flow-decision-row">
            <div className="flow-decision" data-diagram-node="decision"><span>Evidence<br />+ criteria<br />confirmed?</span></div>
            <div className="flow-node flow-practice" data-diagram-node="practice"><RotateCcw size={15} /><strong>Practice</strong><small>Record evidence</small></div>
          </div>}
        </Fragment>;
      })}
      <div className={`flow-terminal ${progress?.status === 'completed' ? 'complete' : ''}`} data-diagram-node="finish">Previous roadmap complete</div>
    </Diagram>
    <p className="flow-note">Recording progress requires an active, unblocked mission. Only Record evidence changes your progress; this diagram does not grade or complete work.</p>
  </figure>;
}
