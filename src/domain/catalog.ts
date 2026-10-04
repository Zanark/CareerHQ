import type { AppState, Checkpoint, Mission, MissionId, MissionProgress, RoadmapVersion } from './types';
import { legacyMissions } from './legacyCatalog';
import { technicalMissions } from './operations/technical';
import { growthMissions } from './operations/growth';
import { executionMissions } from './operations/execution';

export const LATEST_ROADMAP_VERSION = '2.0.0' as const;
export const missions: Mission[] = [
  ...technicalMissions, ...growthMissions, ...executionMissions,
].sort((a, b) => ['pattern', 'system', 'escape', 'fabric', 'blueprint', 'credential', 'neural', 'algorithm', 'income'].indexOf(a.id) -
  ['pattern', 'system', 'escape', 'fabric', 'blueprint', 'credential', 'neural', 'algorithm', 'income'].indexOf(b.id));

export function getMissionVersion(id: MissionId, version: RoadmapVersion): Mission {
  const mission = (version === '1.0.0' ? legacyMissions : missions).find(candidate => candidate.id === id);
  if (!mission) throw new Error(`No ${version} roadmap exists for mission ${id}`);
  return mission;
}

export function getMission(id: MissionId, state?: AppState): Mission {
  return getMissionVersion(id, state?.missions[id].roadmapVersion ?? LATEST_ROADMAP_VERSION);
}

export function getMissions(state: AppState): Mission[] {
  return missions.map(mission => getMission(mission.id, state));
}

export function recordRoadmapVersion(record: { roadmapVersion?: RoadmapVersion }): RoadmapVersion {
  return record.roadmapVersion ?? '1.0.0';
}

export function getProgressForVersion(state: AppState, id: MissionId, version: RoadmapVersion): MissionProgress | undefined {
  return state.missions[id].roadmapVersion === version ? state.missions[id] :
    state.archives.find(archive => archive.missionId === id && archive.progress.roadmapVersion === version)?.progress;
}

export function getCheckpoint(id: MissionId, checkpointId: string, version: RoadmapVersion): Checkpoint {
  const checkpoint = getMissionVersion(id, version).checkpoints.find(item => item.id === checkpointId);
  if (!checkpoint) throw new Error(`Unknown checkpoint ${checkpointId} in ${id} roadmap ${version}`);
  return checkpoint;
}

export function prerequisitesFor(mission: Mission, checkpoint: Checkpoint): string[] {
  if (checkpoint.prerequisites) return checkpoint.prerequisites;
  const index = mission.checkpoints.findIndex(item => item.id === checkpoint.id);
  return index > 0 ? [mission.checkpoints[index - 1].id] : [];
}
