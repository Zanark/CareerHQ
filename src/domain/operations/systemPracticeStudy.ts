import type { Checkpoint } from '../types';
import { systemPracticeModules, systemPracticeCases } from './systemPracticeContent';
import type { SystemPracticeUnit } from './systemPracticeTypes';

export const SYSTEM_PRACTICE_SOURCE = 'SystemDesign_RoadMap.pdf';
export const systemPracticeUnits: readonly SystemPracticeUnit[] = [...systemPracticeModules, ...systemPracticeCases];

export const systemPracticePhases = [
  { id: 'a', title: 'A - Foundations', start: 1, end: 10, summary: 'Requirements, scale, availability, consistency and estimation.' },
  { id: 'b', title: 'B - Networking & Traffic', start: 11, end: 20, summary: 'Protocols, APIs, DNS, load balancing, reverse proxies and CDNs.' },
  { id: 'c', title: 'C - Caching & Data', start: 21, end: 35, summary: 'Caching, database choices, indexes, replication, sharding and transactions.' },
  { id: 'd', title: 'D - Asynchronism & Messaging', start: 36, end: 44, summary: 'Queues, background work, delivery semantics, events and replay.' },
  { id: 'e', title: 'E - Application Architecture', start: 45, end: 50, summary: 'Service boundaries, discovery, gateways, communication and antipatterns.' },
  { id: 'f', title: 'F - Reliability & Distributed Systems', start: 51, end: 61, summary: 'Resilience, coordination, ordering, locks, event sourcing and read models.' },
  { id: 'g', title: 'G - Operations & Security', start: 62, end: 68, summary: 'Search, rate limits, observability, service objectives and identity.' },
  { id: 'h', title: 'H - Advanced Architecture', start: 69, end: 71, summary: 'Multi-tenancy, multi-region decisions and cloud-pattern selection.' },
  { id: 'i', title: 'I - Interview & Case Studies', start: 72, end: 72, summary: 'End-to-end design and transfer, with an independently selectable case-study practice bank.' },
] as const;

export const systemDifficultyLadder = [
  { level: 'Easy', task: 'Explain the idea in everyday terms and sketch the smallest architecture that uses it.', success: 'Explain the purpose and flow without notes.' },
  { level: 'Medium', task: 'Change one requirement or constraint and revise the affected part of the design.', success: 'Identify what changed and justify the adaptation.' },
  { level: 'Hard', task: 'Combine this idea with two previously learned components and introduce a failure.', success: 'Defend the trade-offs and user-visible failure behavior.' },
];

export const systemTransferDrills = [
  'Increase the scale tenfold and identify the first bottleneck.',
  'Remove the primary component and describe the fallback.',
  'Lose a region and revisit the design assumptions.',
  'Introduce stale or duplicated data and identify the guarantee at risk.',
  'Reduce the budget and explain what you would simplify.',
];

export const systemMasteryChecks = [
  'Explain the concept without relying on notes.',
  'Draw the architecture and trace its happy path and a failure path.',
  'Modify the design for a changed constraint.',
  'Explain how the design handles failure and what users observe.',
  'Compare alternatives and defend the chosen trade-off.',
];

export const systemPracticeProtocol = [
  'Start with the problem the concept addresses, then sketch a minimal architecture.',
  'Explain normal operation and one failure before adding components.',
  'Compare at least two alternatives and attempt the module exercise without copying.',
  'Revisit mistakes before increasing complexity. Reading alone is not completion.',
  'If the gate is not met, revisit the smallest missing mental model, redraw it and retry a changed scenario.',
  'Learn core concepts deeply; survey specialized patterns first and deepen them when an exercise needs them.',
  'Some prompts leave workload numbers or scenarios unspecified. State your assumptions before solving rather than treating invented inputs as source requirements.',
];

export const systemInterviewPrompts = [
  'Why choose this approach rather than a simpler alternative?',
  'Where is it commonly misused or overengineered?',
  'Which metric would reveal that it is becoming a bottleneck?',
  'What would you change first if traffic increased tenfold?',
];

export const systemMentalModel = [
  'What problem does this concept solve?',
  'Which resource or coordination boundary becomes constrained as the workload grows?',
  'What observable guarantee or invariant must the design preserve?',
];

export const systemSketchTemplate = ['Clients', 'Entry / routing', 'Service / workflow', 'State / dependency'];

export const systemDecisionLens = [
  ['Scale', 'Identify whether requests, data, users, connections or background work are growing.'],
  ['Latency', 'Name the synchronous path and its tail-latency target.'],
  ['State', 'Locate the source of truth and decide what can be cached or replicated.'],
  ['Failure', 'Describe the result of a slow, unavailable or duplicated dependency.'],
  ['Trade-off', 'State what property you give up to obtain the chosen benefit.'],
] as const;

export const systemLearningStates = [
  ['Planned', 'Listed but not yet studied.'],
  ['Introduced', 'Explained once.'],
  ['Practiced', 'One or more exercises attempted.'],
  ['Demonstrated', 'Explained, drawn or designed without notes.'],
  ['Completed', 'The module-specific gate has been met.'],
  ['Retained', 'Retrieved and applied again after a delay.'],
] as const;

export const systemDiagnostics = [
  { id: 'foundation', title: 'Foundation recall', task: 'Answer ten rapid questions about requirements, scalability, latency, availability, consistency, CAP, replication and estimation.' },
  { id: 'traffic', title: 'Traffic architecture', task: 'Draw the request path through DNS, CDN, load balancing and services; explain every hop.' },
  { id: 'data', title: 'Data architecture', task: 'Choose SQL/NoSQL, replication, sharding and caching for a specified workload.' },
  { id: 'async', title: 'Async architecture', task: 'Convert a synchronous workflow into a queue or event-driven design and justify its delivery semantics.' },
  { id: 'reliability', title: 'Reliability', task: 'Handle a failing dependency using appropriate timeouts, retries, circuit breaking, isolation and degradation.' },
  { id: 'distributed', title: 'Distributed systems', task: 'Explain leader election, quorum, idempotency, distributed locks and stale-leader risk.' },
  { id: 'production', title: 'Production architecture', task: 'Design a multi-tenant, multi-region service and include observability and security.' },
  { id: 'interview', title: 'Interview simulation', task: 'Complete and defend an end-to-end design in a 35-45 minute rehearsal without notes.' },
];

export function systemPracticeFor(checkpoint?: Checkpoint): SystemPracticeUnit | undefined {
  return checkpoint ? systemPracticeUnits.find(unit => `system-v3-${unit.id}` === checkpoint.id) : undefined;
}
