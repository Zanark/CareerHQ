import { describe, expect, it } from 'vitest';
import { CHECKPOINT_COMPLETE_COLOR, COLLECTION_COLORS, MISSION_COLORS } from '../missionVisuals';
import type { MissionId } from '../domain/types';
import type { CareerGraphKind, CareerGraphNode, CareerGraphStatus } from './careerGraphModel';
import { careerNodeColor, careerNodeStatusClass } from './careerGraphColors';

const kinds: CareerGraphKind[] = ['core', 'mission', 'checkpoint', 'action', 'evidence', 'opportunity', 'freelance', 'history', 'curriculum'];
const statuses: CareerGraphStatus[] = ['complete', 'incomplete', 'reference'];

describe('career graph identity and completion colors', () => {
  it('reserves green and the complete CSS token exclusively for completed checkpoint nodes', () => {
    for (const kind of kinds) {
      for (const status of statuses) {
        const node = Object.freeze({ kind, status, missionId: 'pattern' as const });
        const completedCheckpoint = kind === 'checkpoint' && status === 'complete';
        expect(careerNodeColor(node) === CHECKPOINT_COMPLETE_COLOR).toBe(completedCheckpoint);
        expect(careerNodeStatusClass(node) === 'complete').toBe(completedCheckpoint);
        expect(careerNodeStatusClass(node)).toBe(status === 'complete' && !completedCheckpoint ? 'recorded' : status);
        expect(node.status).toBe(status);
      }
    }
  });

  it('keeps checkpoint semantics for recorded archives and shared-prefix completions without coloring other recorded work green', () => {
    for (const archived of [false, true]) {
      const node: CareerGraphNode = {
        id: 'checkpoint:synthetic', kind: 'checkpoint', status: 'complete', missionId: 'pattern',
        archived, label: '', context: '', detail: '', href: '/', position: [1, 2, 3],
      };
      const before = JSON.stringify(node);
      expect(careerNodeColor(node)).toBe(CHECKPOINT_COMPLETE_COLOR);
      expect(careerNodeStatusClass(node)).toBe('complete');
      expect(careerNodeColor({ ...node, status: 'incomplete' })).toBe('#F34B00');
      expect(careerNodeColor({ ...node, status: 'reference' })).toBe('#268BD2');
      expect(JSON.stringify(node)).toBe(before);
    }
  });

  it('uses the shared mission and collection identities regardless of recorded status, while keeping the core ivory', () => {
    for (const status of statuses) {
      expect(careerNodeColor({ kind: 'core', status })).toBe('#EEE8D5');
      for (const [missionId, color] of Object.entries(MISSION_COLORS)) {
        expect(careerNodeColor({ kind: 'mission', status, missionId: missionId as MissionId })).toBe(color);
      }
      for (const [kind, color] of Object.entries(COLLECTION_COLORS)) {
        expect(careerNodeColor({ kind: kind as CareerGraphKind, status })).toBe(color);
      }
      expect(careerNodeColor({ kind: 'mission', status })).toBe(COLLECTION_COLORS.curriculum);
    }
  });
});
