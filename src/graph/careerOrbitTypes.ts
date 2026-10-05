import type { MissionId, RoadmapVersion } from '../domain/types';
import type { CareerGraphStatus } from './careerGraphModel';

export type CareerOrbitKind = 'mission' | 'action' | 'evidence' | 'opportunity' | 'freelance' | 'history' | 'curriculum';

export interface CareerOrbitMember {
  nodeId: string;
  status: CareerGraphStatus;
  current: boolean;
}

export interface CareerOrbitSegment {
  id: string;
  label: string;
  summary: string;
  detail: string;
  members: CareerOrbitMember[];
  href?: string;
}

export interface CareerOrbit {
  id: string;
  index: number;
  kind: CareerOrbitKind;
  label: string;
  summary: string;
  detail: string;
  color: string;
  href: string;
  hubNodeId: string;
  missionId?: MissionId;
  roadmapVersion?: RoadmapVersion;
  currentNodeId?: string;
  progress?: { completed: number; total: number };
  memberIds: string[];
  segments: CareerOrbitSegment[];
}

export interface CareerOrbitSelection {
  orbitId: string;
  segmentId?: string;
}
