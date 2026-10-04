import { prerequisitesFor } from '../domain/catalog';
import type { Checkpoint, Mission } from '../domain/types';

export interface RoadmapGroup {
  id: string;
  title: string;
  summary: string;
  topics: string[];
  optional: boolean;
  checkpoints: Checkpoint[];
}

export function roadmapGroups(mission: Mission): RoadmapGroup[] {
  if (mission.stages?.length) return mission.stages.map(stage => ({
    ...stage,
    optional: stage.optional ?? false,
    checkpoints: mission.checkpoints.filter(checkpoint => stage.checkpointIds.includes(checkpoint.id)),
  }));
  const groups = new Map<string, RoadmapGroup>();
  for (const checkpoint of mission.checkpoints) {
    let group = groups.get(checkpoint.stage);
    if (!group) {
      group = { id: `legacy-stage-${groups.size}`, title: checkpoint.stage, summary: '', topics: [], optional: false, checkpoints: [] };
      groups.set(checkpoint.stage, group);
    }
    group.checkpoints.push(checkpoint);
  }
  return [...groups.values()];
}

export function checkpointLevels(mission: Mission, checkpoints: Checkpoint[]): Checkpoint[][] {
  const included = new Map(checkpoints.map(checkpoint => [checkpoint.id, checkpoint]));
  const depths = new Map<string, number>();
  const visiting = new Set<string>();
  const depth = (checkpoint: Checkpoint): number => {
    const known = depths.get(checkpoint.id);
    if (known !== undefined) return known;
    if (visiting.has(checkpoint.id)) throw new Error(`Cyclic source roadmap: ${checkpoint.id}`);
    visiting.add(checkpoint.id);
    const parents = prerequisitesFor(mission, checkpoint).flatMap(id => {
      const parent = included.get(id);
      return parent ? [parent] : [];
    });
    const value = parents.length ? Math.max(...parents.map(depth)) + 1 : 0;
    visiting.delete(checkpoint.id);
    depths.set(checkpoint.id, value);
    return value;
  };
  const result: Checkpoint[][] = [];
  checkpoints.forEach(checkpoint => {
    (result[depth(checkpoint)] ??= []).push(checkpoint);
  });
  return result;
}
