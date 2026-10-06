import { CHECKPOINT_COMPLETE_COLOR, COLLECTION_COLORS, missionColor } from '../missionVisuals';
import type { CareerGraphNode, CareerGraphStatus } from './careerGraphModel';

export function careerNodeColor(node: Pick<CareerGraphNode, 'kind' | 'status' | 'missionId'>): string {
  if (node.kind === 'core') return '#EEE8D5';
  if (node.kind === 'checkpoint') {
    return node.status === 'complete' ? CHECKPOINT_COMPLETE_COLOR : node.status === 'incomplete' ? '#F34B00' : '#268BD2';
  }
  if (node.kind === 'mission') return node.missionId ? missionColor(node.missionId) : COLLECTION_COLORS.curriculum;
  return COLLECTION_COLORS[node.kind];
}

export function careerNodeStatusClass(node: Pick<CareerGraphNode, 'kind' | 'status'>): CareerGraphStatus | 'recorded' {
  return node.status === 'complete' && node.kind !== 'checkpoint' ? 'recorded' : node.status;
}
