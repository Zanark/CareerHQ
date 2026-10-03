import { z } from 'zod';
import { getMission, missions } from './catalog';
import { missionIds, opportunityStages, readinessKeys } from './types';
import type {
  AppState, Checkpoint, CheckpointStatus, DailyAction, EvidenceInput,
  Mission, MissionId, MissionProgress,
} from './types';

export const STORAGE_KEY = 'careerhq.workspace.v1';
const ROADMAP_VERSION = '1.0.0';
const MAX_RECORDS = 5000;
const MAX_PLAN_DAYS = 3660;
const missionIdSchema = z.enum(missionIds);
const idSchema = z.string().min(1).max(128).regex(/^[a-zA-Z0-9][a-zA-Z0-9._:-]*$/, 'Invalid identifier');
const text = (max: number, min = 1) => z.string().min(min).max(max)
  .refine((value) => min === 0 || value.trim().length >= min, 'Text is too short');

function isDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith('0000')) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

const dateSchema = z.string().length(10).refine(isDate, 'Use a valid calendar date: YYYY-MM-DD');
const timestampSchema = z.string().max(35).datetime({ offset: true });
const urlSchema = z.string().max(2048).refine((value) => {
  if (value === '') return true;
  if (!/^https?:\/\//i.test(value) || /[\s\\\u0000-\u001f\u007f]/.test(value)) return false;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && !!url.hostname && !url.username && !url.password;
  } catch {
    return false;
  }
}, 'Use an http:// or https:// URL without credentials, or leave it empty');
const kindSchema = z.enum(['code', 'diagram', 'explanation', 'exercise', 'project', 'application', 'interview', 'note']);
const statusSchema = z.enum(['not-started', 'in-progress', 'completed']);
const readinessSchema = z.enum(['unassessed', 'building', 'ready']);
const progressSchema = z.object({
  checkpointId: z.union([idSchema, z.literal('')]),
  status: statusSchema,
  mode: z.enum(['active', 'background', 'planned']),
  completedCheckpointIds: z.array(idSchema).max(5),
  blocker: text(1000, 0),
}).strict();
const actionSchema = z.object({
  id: idSchema,
  date: dateSchema,
  missionId: missionIdSchema,
  checkpointId: idSchema,
  title: text(200),
  minutes: z.number().int().min(1).max(120),
  reason: text(500),
  completed: z.boolean(),
}).strict();
const evidenceSchema = z.object({
  id: idSchema,
  missionId: missionIdSchema,
  checkpointId: idSchema,
  title: text(120, 3),
  summary: text(4000, 10),
  kind: kindSchema,
  url: urlSchema,
  visibility: z.literal('local'),
  createdAt: timestampSchema,
  completedCheckpoint: z.boolean(),
}).strict();
const eventSchema = z.object({
  id: idSchema,
  type: text(80),
  title: text(200),
  missionId: missionIdSchema.optional(),
  createdAt: timestampSchema,
}).strict();
const opportunitySchema = z.object({
  id: idSchema,
  company: text(120),
  role: text(160),
  stage: z.enum(opportunityStages),
  url: urlSchema,
  notes: text(4000, 0),
  createdAt: timestampSchema,
}).strict();
const stateSchema = z.object({
  schemaVersion: z.literal(1),
  roadmapVersion: z.literal(ROADMAP_VERSION),
  sampleData: z.boolean(),
  updatedAt: timestampSchema,
  objective: text(500),
  focusMissionId: missionIdSchema,
  capacity: z.enum(['gentle', 'steady', 'deep']),
  interviewMode: z.boolean(),
  missions: z.object({
    pattern: progressSchema,
    system: progressSchema,
    escape: progressSchema,
    fabric: progressSchema,
    blueprint: progressSchema,
    credential: progressSchema,
    neural: progressSchema,
    algorithm: progressSchema,
  }).strict(),
  plans: z.record(dateSchema, z.array(actionSchema).max(3))
    .refine((plans) => Object.keys(plans).length <= MAX_PLAN_DAYS, 'Too many saved plan dates'),
  evidence: z.array(evidenceSchema).max(MAX_RECORDS),
  events: z.array(eventSchema).max(MAX_RECORDS),
  readiness: z.object({
    'Coding patterns': readinessSchema,
    'System design': readinessSchema,
    'Resume defense': readinessSchema,
    'STAR stories': readinessSchema,
    'Sustained coding': readinessSchema,
  }).strict(),
  opportunities: z.array(opportunitySchema).max(500),
}).strict();
const evidenceInputSchema = z.object({
  missionId: missionIdSchema,
  checkpointId: idSchema,
  title: z.string().trim().pipe(text(120, 3)),
  summary: z.string().trim().pipe(text(4000, 10)),
  kind: kindSchema,
  url: z.string().trim().pipe(urlSchema),
  advance: z.boolean(),
  criteriaConfirmed: z.boolean(),
  actionId: idSchema.optional(),
}).strict();

export function localDate(now = new Date()): string {
  if (!Number.isFinite(now.getTime())) throw new Error('Cannot format an invalid date');
  return `${String(now.getFullYear()).padStart(4, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function ensure(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function checkpointIndex(missionId: MissionId, checkpointId: string): number {
  const index = getMission(missionId).checkpoints.findIndex((checkpoint) => checkpoint.id === checkpointId);
  ensure(index >= 0, `Unknown checkpoint "${checkpointId}" for ${missionId}`);
  return index;
}

export function parseState(value: unknown): AppState {
  const result = stateSchema.safeParse(value);
  if (!result.success) {
    const issue = result.error.issues[0];
    throw new Error(`Invalid workspace at ${issue.path.join('.') || 'root'}: ${issue.message}`);
  }
  const state: AppState = result.data;
  const ids = new Set<string>();
  const unique = (id: string) => {
    ensure(!ids.has(id), `Duplicate record identifier: ${id}`);
    ids.add(id);
  };
  const completions = new Set<string>();
  const evidenceRefs = new Set<string>();
  for (const evidence of state.evidence) {
    unique(evidence.id);
    const index = checkpointIndex(evidence.missionId, evidence.checkpointId);
    const progress = state.missions[evidence.missionId];
    ensure(index <= progress.completedCheckpointIds.length, `Evidence references a locked checkpoint: ${evidence.checkpointId}`);
    const reference = `${evidence.missionId}:${evidence.checkpointId}`;
    evidenceRefs.add(reference);
    if (evidence.completedCheckpoint) {
      ensure(progress.completedCheckpointIds.includes(evidence.checkpointId), `Completion evidence has no completed checkpoint: ${evidence.checkpointId}`);
      ensure(!completions.has(reference), `Duplicate checkpoint completion: ${evidence.checkpointId}`);
      completions.add(reference);
    }
  }
  for (const mission of missions) {
    const progress = state.missions[mission.id];
    if (mission.planned) {
      ensure(progress.mode === 'planned' && progress.checkpointId === '' &&
        progress.status === 'not-started' && progress.completedCheckpointIds.length === 0 &&
        progress.blocker === '', `${mission.name} is planned and cannot have progress`);
      continue;
    }
    ensure(progress.mode !== 'planned', `${mission.name} has an available roadmap and cannot be planned`);
    const completed = progress.completedCheckpointIds;
    ensure(completed.length <= mission.checkpoints.length, `Too many completed checkpoints for ${mission.id}`);
    completed.forEach((id, index) => {
      ensure(id === mission.checkpoints[index].id, `Broken sequential prerequisite for ${mission.id}: ${id}`);
      ensure(completions.has(`${mission.id}:${id}`), `Completed checkpoint requires completion evidence: ${id}`);
    });
    const finished = completed.length === mission.checkpoints.length;
    const expected = mission.checkpoints[finished ? completed.length - 1 : completed.length];
    ensure(progress.checkpointId === expected.id, `Current checkpoint is inconsistent with prerequisites for ${mission.id}`);
    ensure((progress.status === 'completed') === finished, `Final completion status is inconsistent for ${mission.id}`);
    ensure(progress.status !== 'not-started' || !evidenceRefs.has(`${mission.id}:${progress.checkpointId}`),
      `A checkpoint with evidence must be started: ${progress.checkpointId}`);
  }
  for (const [date, actions] of Object.entries(state.plans)) {
    const dayMissions = new Set<MissionId>();
    ensure(actions.reduce((sum, action) => sum + action.minutes, 0) <= 120, `Plan exceeds 120 minutes on ${date}`);
    for (const action of actions) {
      unique(action.id);
      ensure(action.date === date, `Action date does not match its plan: ${action.id}`);
      ensure(!dayMissions.has(action.missionId), `Duplicate mission in plan for ${date}: ${action.missionId}`);
      dayMissions.add(action.missionId);
      const index = checkpointIndex(action.missionId, action.checkpointId);
      ensure(index <= state.missions[action.missionId].completedCheckpointIds.length,
        `Plan references a locked checkpoint: ${action.checkpointId}`);
      ensure(!action.completed || evidenceRefs.has(`${action.missionId}:${action.checkpointId}`),
        `Completed action requires evidence: ${action.id}`);
    }
  }
  let previousEventTime = -Infinity;
  for (const event of state.events) {
    unique(event.id);
    const time = Date.parse(event.createdAt);
    ensure(time >= previousEventTime, 'History events must be in chronological order');
    previousEventTime = time;
  }
  for (const opportunity of state.opportunities) unique(opportunity.id);
  return state;
}

function nextTimestamp(state: AppState): string {
  // A moved-back system clock must not reorder an imported event history.
  return new Date(Math.max(Date.now(), Date.parse(state.updatedAt) + 1,
    ...state.events.map((event) => Date.parse(event.createdAt) + 1))).toISOString();
}

function nextId(state: AppState, prefix: string): string {
  const existing = new Set([
    ...state.evidence.map((entry) => entry.id),
    ...state.events.map((entry) => entry.id),
    ...state.opportunities.map((entry) => entry.id),
    ...Object.values(state.plans).flat().map((entry) => entry.id),
  ]);
  let sequence = state.evidence.length + state.events.length + 1;
  while (existing.has(`${prefix}-${sequence}`)) sequence += 1;
  return `${prefix}-${sequence}`;
}

export function createInitialState(sampleData = true): AppState {
  let state: AppState = {
    schemaVersion: 1,
    roadmapVersion: ROADMAP_VERSION,
    sampleData,
    updatedAt: new Date().toISOString(),
    objective: 'Build evidence, one calm step at a time.',
    focusMissionId: 'pattern',
    capacity: 'steady',
    interviewMode: false,
    missions: Object.fromEntries(missions.map((mission): [MissionId, MissionProgress] => [mission.id, {
      checkpointId: mission.checkpoints[0]?.id ?? '',
      status: 'not-started',
      mode: mission.planned ? 'planned' : ['pattern', 'system', 'escape'].includes(mission.id) ? 'active' : 'background',
      completedCheckpointIds: [],
      blocker: '',
    }])) as Record<MissionId, MissionProgress>,
    plans: {},
    evidence: [],
    events: [],
    readiness: Object.fromEntries(readinessKeys.map((key) => [key, 'unassessed'])) as AppState['readiness'],
    opportunities: [],
  };
  if (!sampleData) return state;
  const samples: Array<{ missionId: MissionId; title: string; summary: string; kind: EvidenceInput['kind'] }> = [
    {
      missionId: 'pattern', title: 'Fictional sample: pair-sum trace', kind: 'code',
      summary: 'Synthetic exercise: a lookup map finds indices for [2, 7, 11] and target 9. Check before inserting to avoid reusing one index. [3, 3] tests duplicates; target 99 has no match. Expected time O(n), space O(n).',
    },
    {
      missionId: 'system', title: 'Fictional sample: service scope', kind: 'explanation',
      summary: 'Imaginary link-saving service: save a URL and fetch a saved link. Assume 1,000 daily users making 20 reads each, roughly 0.23 reads/second on average. A prototype goal is reads under 300 ms; peak load and availability need separate validation.',
    },
    {
      missionId: 'escape', title: 'Fictional sample: role comparison', kind: 'note',
      summary: 'Two invented software roles at Example Harbor Labs and Example Orchard Systems share API design, testing, and clear communication. The example postings list these as required capabilities; a specific cloud platform is an optional signal.',
    },
  ];
  for (const sample of samples) {
    state = recordEvidence(state, {
      ...sample, checkpointId: state.missions[sample.missionId].checkpointId,
      url: '', advance: true, criteriaConfirmed: true,
    });
  }
  state = recordEvidence(state, {
    missionId: 'pattern', checkpointId: state.missions.pattern.checkpointId,
    title: 'Fictional sample: window warm-up',
    summary: 'Synthetic trace in progress: keep the window free of duplicate values. Extend the right edge; move the left edge until the duplicate is removed. Empty-input and shrinking-window tests are still to do.',
    kind: 'explanation', url: '', advance: false, criteriaConfirmed: false,
  });
  state.readiness['Coding patterns'] = 'building';
  state.readiness['System design'] = 'building';
  state.opportunities = [{
    id: 'sample-opportunity-1',
    company: 'Example Harbor Labs (fictional)',
    role: 'Software Engineer (sample)',
    stage: 'Found',
    url: 'https://example.com/careers',
    notes: 'Fictional demonstration only. No real application, employer, or interview is represented.',
    createdAt: state.updatedAt,
  }];
  return parseState(state);
}

export function getSaveState(mission: Mission, state: AppState): {
  stage: string;
  checkpoint: Checkpoint | undefined;
  status: CheckpointStatus;
  next: string;
  completed: number;
  total: number;
} {
  const progress = state.missions[mission.id];
  const index = mission.checkpoints.findIndex((candidate) => candidate.id === progress.checkpointId);
  const checkpoint = mission.checkpoints[index];
  return {
    stage: mission.planned ? 'Planned' : checkpoint?.stage ?? 'Unavailable',
    checkpoint,
    status: progress.status,
    next: mission.planned ? 'Awaiting canonical roadmap' : progress.status === 'completed' ? 'Mission complete'
      : checkpoint ? mission.checkpoints[index + 1]?.title ?? 'Mission complete' : 'Checkpoint unavailable',
    completed: progress.completedCheckpointIds.length,
    total: mission.checkpoints.length,
  };
}

export function generatePlan(state: AppState, date = localDate()): DailyAction[] {
  dateSchema.parse(date);
  if (Object.hasOwn(state.plans, date)) return state.plans[date];
  const interviewWeight: Partial<Record<MissionId, number>> = { escape: 3, system: 2, pattern: 1 };
  const candidates = missions.filter((mission) => {
    const progress = state.missions[mission.id];
    return !mission.planned && progress.mode === 'active' &&
      progress.status !== 'completed' && !progress.blocker.trim();
  }).sort((left, right) => {
    const focus = Number(right.id === state.focusMissionId) - Number(left.id === state.focusMissionId);
    if (focus) return focus;
    return state.interviewMode ? (interviewWeight[right.id] ?? 0) - (interviewWeight[left.id] ?? 0) : 0;
  });
  const actions: DailyAction[] = [];
  let remaining = state.capacity === 'gentle' ? 15 : state.capacity === 'steady' ? 75 : 120;
  for (const mission of candidates) {
    if (actions.length === (state.capacity === 'gentle' ? 1 : 3)) break;
    const checkpoint = getSaveState(mission, state).checkpoint;
    if (!checkpoint) continue;
    const minutes = state.capacity === 'gentle' ? Math.min(15, checkpoint.minutes) : checkpoint.minutes;
    if (minutes > remaining) continue;
    const reason = mission.id === state.focusMissionId ? 'Your focus mission.'
      : state.interviewMode && interviewWeight[mission.id] ? 'Prioritized for interview preparation.'
        : 'A small step in an active mission.';
    actions.push({
      id: `plan-${date}-${mission.id}-${checkpoint.id}-${state.capacity}`,
      date, missionId: mission.id, checkpointId: checkpoint.id,
      title: state.capacity === 'gentle' ? checkpoint.recoveryAction : checkpoint.action,
      minutes,
      reason: `${reason} ${state.capacity === 'gentle' ? 'Recovery pace; no catch-up required.' : 'Only the current checkpoint; no overdue carryover.'}`,
      completed: false,
    });
    remaining -= minutes;
  }
  return actions;
}

export function recordEvidence(state: AppState, input: EvidenceInput): AppState {
  const next = parseState(state);
  const data = evidenceInputSchema.parse(input);
  const mission = getMission(data.missionId);
  const index = checkpointIndex(data.missionId, data.checkpointId);
  const progress = next.missions[data.missionId];
  ensure(!mission.planned && progress.mode === 'active', 'Evidence requires an active mission');
  ensure(!progress.blocker.trim(), 'Resolve the mission blocker before recording evidence');
  ensure(progress.status !== 'completed', 'This mission is already complete');
  ensure(progress.checkpointId === data.checkpointId, 'Evidence must target the current checkpoint');
  ensure(!data.advance || data.criteriaConfirmed, 'Confirm all checkpoint criteria before advancing');
  const today = localDate();
  if (data.actionId !== undefined) {
    const action = next.plans[today]?.find((candidate) => candidate.id === data.actionId);
    ensure(action && !action.completed && action.missionId === data.missionId &&
      action.checkpointId === data.checkpointId,
    "This action is no longer available for today's current checkpoint");
  }
  const createdAt = nextTimestamp(next);
  next.evidence.push({
    id: nextId(next, 'evidence'), missionId: data.missionId, checkpointId: data.checkpointId,
    title: data.title, summary: data.summary, kind: data.kind, url: data.url,
    visibility: 'local', createdAt, completedCheckpoint: data.advance,
  });
  progress.status = 'in-progress';
  if (data.advance) {
    progress.completedCheckpointIds.push(data.checkpointId);
    const following = mission.checkpoints[index + 1];
    progress.checkpointId = following?.id ?? data.checkpointId;
    progress.status = following ? 'not-started' : 'completed';
  }
  next.plans[today]?.forEach((action) => {
    if (action.missionId === data.missionId && action.checkpointId === data.checkpointId &&
      (data.advance || action.id === data.actionId)) action.completed = true;
  });
  next.events.push({
    id: nextId(next, 'event'),
    type: data.advance ? 'checkpoint-completed' : 'evidence-recorded',
    title: data.advance ? `Completed: ${mission.checkpoints[index].title}` : `Evidence: ${data.title}`,
    missionId: data.missionId, createdAt,
  });
  next.updatedAt = createdAt;
  return parseState(next);
}

export function recordChange(state: AppState, title: string, missionId?: MissionId): AppState {
  const next = parseState(state);
  const validatedTitle = z.string().trim().pipe(text(200)).parse(title);
  if (missionId !== undefined) missionIdSchema.parse(missionId);
  const createdAt = nextTimestamp(next);
  next.events.push({
    id: nextId(next, 'event'),
    type: 'workspace-change',
    title: validatedTitle,
    ...(missionId === undefined ? {} : { missionId }),
    createdAt,
  });
  next.updatedAt = createdAt;
  return parseState(next);
}
