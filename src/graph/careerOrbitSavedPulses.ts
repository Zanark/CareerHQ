import type { RoadmapVersion } from '../domain/types';
import type { CareerGraphNode, CareerGraphStatus } from './careerGraphModel';
import type { CareerOrbit } from './careerOrbitTypes';

export const SAVED_STATUS_PULSE_SECONDS = 1.2;

export interface SavedStatusPulse {
  orbitId: string;
  segmentId: string;
  nodeId: string;
  roadmapVersion: RoadmapVersion;
  elapsed: number;
}

interface MemberSnapshot {
  status: CareerGraphStatus;
  current: boolean;
}
interface OrbitSnapshot {
  roadmapVersion: RoadmapVersion;
  members: Map<string, MemberSnapshot>;
}
type VisiblePulseNode = Pick<CareerGraphNode, 'kind' | 'archived' | 'roadmapVersion'>;

/** Ephemeral saved-status differences, never a source of progress or mastery claims. */
export class CareerOrbitSavedPulses {
  readonly active: SavedStatusPulse[] = [];
  private previous = new Map<string, OrbitSnapshot>();
  private previousVisible = new Set<string>();
  private enabled = false;

  setEnabled(value: boolean): void {
    this.enabled = value;
    if (!value) this.active.length = 0;
  }

  observe(orbits: readonly CareerOrbit[], visibleNodes: ReadonlyMap<string, VisiblePulseNode>): void {
    const next = new Map<string, OrbitSnapshot>();
    for (const orbit of orbits) {
      if (orbit.kind !== 'mission' || !orbit.roadmapVersion) continue;
      const members = new Map<string, MemberSnapshot>();
      const previous = this.previous.get(orbit.id);
      for (const segment of orbit.segments) {
        for (const member of segment.members) {
          members.set(member.nodeId, { status: member.status, current: member.current });
          const before = previous?.members.get(member.nodeId);
          const target = visibleNodes.get(member.nodeId);
          if (this.enabled && previous?.roadmapVersion === orbit.roadmapVersion
            && before?.current && before.status === 'incomplete' && member.status === 'complete'
            && this.previousVisible.has(member.nodeId) && target?.kind === 'checkpoint'
            && !target.archived && target.roadmapVersion === orbit.roadmapVersion) {
            const existing = this.active.find(pulse => pulse.orbitId === orbit.id && pulse.nodeId === member.nodeId);
            if (existing) existing.elapsed = 0;
            else this.active.push({
              orbitId: orbit.id, segmentId: segment.id, nodeId: member.nodeId,
              roadmapVersion: orbit.roadmapVersion, elapsed: 0,
            });
          }
        }
      }
      next.set(orbit.id, { roadmapVersion: orbit.roadmapVersion, members });
    }
    let count = 0;
    for (const pulse of this.active) {
      const snapshot = next.get(pulse.orbitId);
      const target = visibleNodes.get(pulse.nodeId);
      if (this.enabled && snapshot?.roadmapVersion === pulse.roadmapVersion
        && snapshot.members.get(pulse.nodeId)?.status === 'complete' && target?.kind === 'checkpoint'
        && !target.archived && target.roadmapVersion === pulse.roadmapVersion) {
        this.active[count++] = pulse;
      }
    }
    this.active.length = count;
    this.previous = next;
    this.previousVisible = new Set([...visibleNodes].filter(([, node]) => node.kind === 'checkpoint' && !node.archived).map(([id]) => id));
  }

  advance(delta: number): void {
    if (!this.enabled || delta <= 0 || !Number.isFinite(delta)) return;
    let count = 0;
    for (const pulse of this.active) {
      pulse.elapsed += delta;
      if (pulse.elapsed < SAVED_STATUS_PULSE_SECONDS) this.active[count++] = pulse;
    }
    this.active.length = count;
  }

  dispose(): void {
    this.enabled = false;
    this.active.length = 0;
    this.previous.clear();
    this.previousVisible.clear();
  }
}
