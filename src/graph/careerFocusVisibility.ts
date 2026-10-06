import { localDate } from '../domain/engine';
import { missionIds, type AppState, type MissionId } from '../domain/types';
import type { CareerGraph } from './careerGraphModel';

export interface CareerFocusVisibility {
  date: string;
  activeMissionIds: ReadonlySet<MissionId>;
  completedTodayMissionIds: ReadonlySet<MissionId>;
  detailedMissionIds: ReadonlySet<MissionId>;
}

export function getCareerFocusVisibility(state: Pick<AppState, 'missions' | 'evidence'>, date: string): CareerFocusVisibility {
  const activeMissionIds = new Set(missionIds.filter(id => state.missions[id].mode === 'active'));
  const completedTodayMissionIds = new Set(state.evidence.filter(record =>
    record.completedCheckpoint && localDate(new Date(record.createdAt)) === date).map(record => record.missionId));
  return { date, activeMissionIds, completedTodayMissionIds,
    detailedMissionIds: new Set([...activeMissionIds, ...completedTodayMissionIds]) };
}

/** Keep quiet mission hubs, but no work cloud or attached line, outside today's detailed missions. */
export function focusCareerGraph(graph: CareerGraph, detailedMissionIds: ReadonlySet<MissionId>): CareerGraph {
  const nodes = graph.nodes.filter(node => node.kind === 'core' || node.kind === 'mission'
    || (node.missionId !== undefined && detailedMissionIds.has(node.missionId)));
  const ids = new Set(nodes.map(node => node.id));
  const disconnectedNodeIds = new Set(nodes.filter(node => node.kind === 'mission'
    && (node.missionId === undefined || !detailedMissionIds.has(node.missionId))).map(node => node.id));
  return { ...graph, nodes, disconnectedNodeIds,
    edges: graph.edges.filter(edge => ids.has(edge.source) && ids.has(edge.target)
      && !disconnectedNodeIds.has(edge.source) && !disconnectedNodeIds.has(edge.target)) };
}
