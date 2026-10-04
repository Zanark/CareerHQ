import type { Checkpoint, Mission, SourceReference } from './types';

export interface CheckpointSpec {
  id: string;
  title: string;
  action: string;
  recoveryAction: string;
  minutes: number;
  criteria: string[];
  topics?: string[];
  sourceId?: string;
  requires?: string[];
  granularity?: Checkpoint['granularity'];
}

export interface StageSpec {
  id: string;
  title: string;
  summary: string;
  topics: string[];
  source: SourceReference;
  optional?: boolean;
  checkpoints?: CheckpointSpec[];
}

type MissionSpec = Omit<Mission, 'roadmapVersion' | 'planned' | 'checkpoints' | 'stages'> & { stages: StageSpec[] };

export function defineOperation(spec: MissionSpec): Mission {
  const prefix = `${spec.id}-v2-`;
  const checkpoints: Checkpoint[] = spec.stages.flatMap(stage => (stage.checkpoints ?? []).map(checkpoint => ({
    id: `${prefix}${checkpoint.id}`,
    stage: stage.title,
    title: checkpoint.title,
    action: checkpoint.action,
    recoveryAction: checkpoint.recoveryAction,
    minutes: checkpoint.minutes,
    criteria: checkpoint.criteria,
    topics: checkpoint.topics ?? stage.topics,
    sourceId: checkpoint.sourceId,
    prerequisites: checkpoint.requires?.map(id => `${prefix}${id}`),
    granularity: checkpoint.granularity ?? 'checkpoint',
    source: stage.source,
  })));
  return {
    ...spec,
    roadmapVersion: '2.0.0',
    planned: checkpoints.length === 0,
    checkpoints,
    stages: spec.stages.map(stage => ({
      id: stage.id, title: stage.title, summary: stage.summary, topics: stage.topics,
      optional: stage.optional, source: stage.source,
      checkpointIds: (stage.checkpoints ?? []).map(checkpoint => `${prefix}${checkpoint.id}`),
    })),
  };
}
