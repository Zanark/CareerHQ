import type { Checkpoint, Mission } from '../types';
import { technicalMissions } from './technical';
import { SYSTEM_PRACTICE_SOURCE, systemMasteryChecks, systemPracticePhases } from './systemPracticeStudy';
import { systemPracticeModules, systemPracticeCases } from './systemPracticeContent';

const original = technicalMissions.find(mission => mission.id === 'system');
if (!original) throw new Error('The preserved System Forge definition is required.');

const checkpoints: Checkpoint[] = systemPracticeModules.map((unit, index) => {
  const phase = systemPracticePhases.find(candidate => unit.number >= candidate.start && unit.number <= candidate.end);
  if (!phase) throw new Error(`No source phase contains ${unit.id}`);
  return {
    id: `system-v3-${unit.id}`, title: unit.title, stage: phase.title,
    action: `Practice ${unit.title}: sketch a minimal design, attempt a source exercise and record its decisions or gaps.`,
    recoveryAction: `Draw the smallest ${unit.title} example and explain one request or state transition.`,
    minutes: 30,
    criteria: [unit.gate, ...systemMasteryChecks],
    topics: unit.focus,
    prerequisites: index ? [`system-v3-${systemPracticeModules[index - 1].id}`] : [],
    sourceId: `Module ${String(unit.number).padStart(2, '0')}`,
    granularity: 'topic-group',
    source: { document: SYSTEM_PRACTICE_SOURCE, section: `Module ${unit.number}: ${unit.title}`, page: unit.page },
  };
});

export const systemPracticeMission: Mission = {
  ...original,
  roadmapVersion: '3.0.0',
  description: 'A source-driven progression of System Design modules, exercises and end-to-end design cases.',
  purpose: 'Explain, draw, adapt, design for failure and defend trade-offs; then apply the concepts to unfamiliar systems.',
  coverage: 'documented',
  completionLabel: 'System Design practice roadmap completed (self-confirmed)',
  checkpoints,
  stages: systemPracticePhases.map(phase => ({
    id: `system-practice-${phase.id}`, title: phase.title, summary: phase.summary,
    topics: systemPracticeModules.filter(unit => unit.number >= phase.start && unit.number <= phase.end).map(unit => unit.title),
    checkpointIds: checkpoints.filter(checkpoint => checkpoint.stage === phase.title).map(checkpoint => checkpoint.id),
    source: { document: SYSTEM_PRACTICE_SOURCE, section: `Curriculum Map: ${phase.title}`, page: 3 },
  })),
  sources: [
    { document: SYSTEM_PRACTICE_SOURCE, section: 'How to Read This Roadmap', page: 2 },
    { document: SYSTEM_PRACTICE_SOURCE, section: 'Curriculum Map: phases A-I', page: 3 },
    { document: SYSTEM_PRACTICE_SOURCE, section: 'Case-study roadmap', page: 148 },
    { document: SYSTEM_PRACTICE_SOURCE, section: 'System Design Diagnostic Gates', page: 179 },
    { document: SYSTEM_PRACTICE_SOURCE, section: 'Coach operating protocol and final standard', page: 180 },
    { document: 'system-design.pdf', section: 'Companion concepts map (reference)', page: 1 },
  ],
  sourceNotes: [
    'SystemDesign_RoadMap.pdf supplies the problem-solving curriculum; system-design.pdf supplies the companion concepts map. The two documents are kept as separate, connected views.',
    'This edition tracks 72 core modules and offers all 15 case studies as an independently selectable practice bank. The source does not prescribe serial case-to-case prerequisites or require completing all 15, so no such gates are invented.',
    'Existing v1/v2 checkpoints are broader or different. Adoption is explicit: the old tracker is archived with its evidence, plans and recall records. New modules start unconfirmed; no completion mapping is guessed.',
    'Reading, browsing and drawing a familiar diagram are not automatically mastery. Each tracked gate is self-confirmed; the site does not grade architectures, simulate failures or assess interview readiness.',
    'Cloud and specialized patterns begin at overview depth and are deepened when an exercise needs them. The companion concept map is not a mandatory master-every-pattern checklist.',
    'The listed minutes describe one practice session, not the time to master a whole module. Source learning-state labels and diagnostics are guidance, not additional automatically computed status fields.',
  ],
  referenceGroups: [
    { title: 'Case-study practice bank (not mandatory serial checkpoints)', kind: 'parallel',
      items: systemPracticeCases.map(unit => ({ title: `Case ${unit.letter}: ${unit.title}`, detail: `${unit.summary} Source pp.${unit.page}-${unit.page + 1}.` })),
    },
    { title: 'Diagnostic evidence', kind: 'parallel', items: [
      { title: 'Recall and transfer', detail: 'Record what you explained without notes, where hints were needed, a missed failure mode and the trade-off that needs another attempt.' },
      { title: 'Periodic diagnostics', detail: 'The eight source diagnostic gates revisit foundations, traffic, data, async design, reliability, distributed systems, production design and interview simulation.' },
    ] },
    { title: 'Session and save-state protocol', kind: 'parallel', items: [
      { title: 'One current checkpoint', detail: 'Keep the saved stage, checkpoint, status and next unlock explicit. Do not reset after a break or award completion for exposure.' },
      { title: 'A concrete working session', detail: 'Choose a concept, explain its purpose, sketch it, connect it to a real use, attempt an exercise, record the takeaway and update the existing tracker.' },
      { title: 'Review before moving on', detail: 'When recall or the gate is weak, revisit the smallest missing model and repeat a changed transfer task. This app does not automatically reschedule the whole curriculum.' },
    ] },
  ],
};
