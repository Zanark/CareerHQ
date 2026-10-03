export const missionIds = ['pattern', 'system', 'escape', 'fabric', 'blueprint', 'credential', 'neural', 'algorithm'] as const;
export type MissionId = typeof missionIds[number];
export type Capacity = 'gentle' | 'steady' | 'deep';
export type MissionMode = 'active' | 'background' | 'planned';
export type CheckpointStatus = 'not-started' | 'in-progress' | 'completed';
export type EvidenceKind = 'code' | 'diagram' | 'explanation' | 'exercise' | 'project' | 'application' | 'interview' | 'note';
export type Readiness = 'unassessed' | 'building' | 'ready';
export const readinessKeys = ['Coding patterns', 'System design', 'Resume defense', 'STAR stories', 'Sustained coding'] as const;
export const opportunityStages = ['Found', 'Screening', 'Recruiter', 'Technical', 'System design', 'Onsite', 'Offer', 'Accepted', 'Rejected', 'Withdrawn'] as const;
export type OpportunityStage = typeof opportunityStages[number];

export interface Checkpoint {
  id: string;
  stage: string;
  title: string;
  action: string;
  recoveryAction: string;
  minutes: number;
  criteria: string[];
}

export interface Mission {
  id: MissionId;
  name: string;
  operation: string;
  description: string;
  purpose: string;
  color: string;
  icon: string;
  owner: string;
  roadmapVersion: string;
  planned: boolean;
  dependencies: MissionId[];
  checkpoints: Checkpoint[];
}

export interface MissionProgress {
  checkpointId: string;
  status: CheckpointStatus;
  mode: MissionMode;
  completedCheckpointIds: string[];
  blocker: string;
}

export interface DailyAction {
  id: string;
  date: string;
  missionId: MissionId;
  checkpointId: string;
  title: string;
  minutes: number;
  reason: string;
  completed: boolean;
}

export interface Evidence {
  id: string;
  missionId: MissionId;
  checkpointId: string;
  title: string;
  summary: string;
  kind: EvidenceKind;
  url: string;
  visibility: 'local';
  createdAt: string;
  completedCheckpoint: boolean;
}

export interface HistoryEvent {
  id: string;
  type: string;
  title: string;
  missionId?: MissionId;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  company: string;
  role: string;
  stage: OpportunityStage;
  url: string;
  notes: string;
  createdAt: string;
}

export interface AppState {
  schemaVersion: 1;
  roadmapVersion: string;
  sampleData: boolean;
  updatedAt: string;
  objective: string;
  focusMissionId: MissionId;
  capacity: Capacity;
  interviewMode: boolean;
  missions: Record<MissionId, MissionProgress>;
  plans: Record<string, DailyAction[]>;
  evidence: Evidence[];
  events: HistoryEvent[];
  readiness: Record<typeof readinessKeys[number], Readiness>;
  opportunities: Opportunity[];
}

export interface EvidenceInput {
  missionId: MissionId;
  checkpointId: string;
  title: string;
  summary: string;
  kind: EvidenceKind;
  url: string;
  advance: boolean;
  criteriaConfirmed: boolean;
  actionId?: string;
}
