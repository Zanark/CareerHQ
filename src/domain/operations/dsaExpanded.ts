import type { Checkpoint, Mission, RoadmapStage } from '../types';
import { technicalMissions } from './technical';
import { DSA_EXPANDED_SOURCE, dsaMasteryGate, dsaSections } from './dsaStudy';

const original = technicalMissions.find(mission => mission.id === 'pattern');
if (!original) throw new Error('The preserved HashMap roadmap is required before appending DSA topics.');

export const dsaPhases = [
  { id: 'foundation-bridge', title: 'Foundation bridge (source Phase 0)', sections: [2, 42, 3, 4], summary: 'Review complexity, C# containers, arrays and strings before the broader technique sequence. Appended after the preserved HashMap track, not inserted as retroactive gates.' },
  { id: 'hashmap-transfer', title: 'Phase 1 - HashMap transfer review', sections: [5], summary: 'Extend the existing five HashMap checkpoints with broader representation choices and unhinted transfer. No prior work is replaced.' },
  { id: 'linear-patterns', title: 'Phase 2 - Linear patterns', sections: [9, 10, 11, 12, 14], summary: 'Two pointers, windows, prefix state, sorting and intervals establish the core linear and near-linear toolkit.' },
  { id: 'pointers-state', title: 'Phase 3 - Pointers and state', sections: [6, 7, 8], summary: 'Build pointer-update, stack and queue fluency. Graph and monotonic stress examples can be revisited with their later prerequisites.' },
  { id: 'monotonic-search', title: 'Phase 4 - Monotonic search', sections: [13], summary: 'Search ordered spaces and feasible answers through explicit monotonic predicates and boundary invariants.' },
  { id: 'recursive-search', title: 'Phase 5 - Recursive reasoning', sections: [15, 16, 38], summary: 'Recursion and backtracking lead into divide-and-conquer. Section 38 is not placed in Appendix A; its core is placed here after recursion and sorting, an explicit integration choice.' },
  { id: 'hierarchy-priority', title: 'Phase 6 - Hierarchy and priority', sections: [17, 18, 19, 20], summary: 'Tree/BST structure, heaps and tries extend the model to hierarchical, priority and prefix-based state.' },
  { id: 'graph-core', title: 'Phase 7 - Core graph toolkit', sections: [21, 22, 23, 24, 25], summary: 'Model graphs, traverse frontiers and depth, resolve dependencies and merge components.' },
  { id: 'optimization', title: 'Phase 8 - Optimization', sections: [26, 27, 28, 29, 30], summary: 'Test greedy choices and formulate reusable DP states across choices, sequences and trees.' },
  { id: 'advanced-tools', title: 'Phase 9 - Advanced reusable tools', sections: [31, 32, 33, 34, 35, 36], summary: 'Weighted paths, spanning trees, range structures, monotonic candidates, bitwise state and mathematical reasoning.' },
  { id: 'specialization', title: 'Phase 10 - Late specialization', sections: [37, 39, 40, 41], summary: 'Advanced string, graph, DP and geometry techniques after their prerequisite toolkits. This is broader mastery material, not a promise of interview coverage.' },
  { id: 'transfer', title: 'Phase 11 - Mixed mastery and transfer', sections: [43, 50], summary: 'Recognize techniques without labels and demonstrate explanation, implementation, tests and complexity under realistic time pressure.' },
] as const;

const added: Checkpoint[] = [];
const stages: RoadmapStage[] = [];
for (const phase of dsaPhases) {
  const ids: string[] = [];
  for (const number of phase.sections) {
    const section = dsaSections.find(candidate => candidate.number === number);
    if (!section) throw new Error(`DSA source section ${number} is missing.`);
    const id = `pattern-v3-section-${String(number).padStart(2, '0')}`;
    const previous = added.at(-1);
    added.push({
      id, stage: phase.title, title: number === 5 ? 'HashMap & HashSet transfer review' : section.title,
      action: `Practice one representative ${section.title} example; record the invariant, complexity, result and remaining gap.`,
      recoveryAction: `Trace one small ${section.title} example and name the state you need to keep.`,
      minutes: 30,
      criteria: [section.goal, ...dsaMasteryGate],
      topics: section.topics,
      prerequisites: previous ? [previous.id] : ['pattern-v2-2-3', 'pattern-v2-2-4'],
      sourceId: `Section ${String(number).padStart(2, '0')}`,
      studySection: number,
      granularity: 'topic-group',
      source: { document: DSA_EXPANDED_SOURCE, section: `${String(number).padStart(2, '0')}. ${section.title}`, page: section.page },
    });
    ids.push(id);
  }
  stages.push({
    id: `dsa-expanded-${phase.id}`, title: phase.title, summary: phase.summary,
    topics: phase.sections.map(number => dsaSections.find(section => section.number === number)!.title),
    checkpointIds: ids,
    source: { document: DSA_EXPANDED_SOURCE, section: 'Appendix A - dependency-aware master sequence', page: 103 },
  });
}

export const dsaExpandedMission: Mission = {
  ...original,
  roadmapVersion: '3.0.0',
  appendFrom: '2.0.0',
  description: 'The existing HashMap track, followed by a dependency-aware complete DSA and LeetCode practice roadmap.',
  purpose: 'Keep the original HashMap milestones, then build wider DSA capability through representative practice, explicit invariants and unhinted transfer.',
  coverage: 'documented',
  checkpoints: [...original.checkpoints, ...added],
  stages: [...original.stages ?? [], ...stages],
  sources: [
    ...original.sources ?? [],
    { document: DSA_EXPANDED_SOURCE, section: 'Sections 01-50 - concepts, practice sets and mastery gates', page: 3 },
    { document: DSA_EXPANDED_SOURCE, section: 'Appendix A - dependency-aware master sequence', page: 103 },
    { document: DSA_EXPANDED_SOURCE, section: 'Appendix B - deliberate practice and retrieval', page: 104 },
    { document: DSA_EXPANDED_SOURCE, section: 'Appendix C - final capability checklist', page: 105 },
  ],
  sourceNotes: [
    'This is an append, not a replacement. All five v2 HashMap checkpoint definitions, their IDs and their Frequency-to-Complement/Grouping branches are unchanged.',
    'Existing v2 users explicitly append the extension. Their genuine HashMap progress, evidence and blocker carry across unchanged; no new topic is completed automatically. v1 adoption remains a separate archive-and-start operation.',
    'The PDF has 50 sections and 939 problem appearances representing 371 distinct problem IDs. Four wrapped problem titles use two link annotations each; 943 annotations are not 943 separate problems.',
    'Appendix A, not chapter numbering, governs the added sequence. Because the user requested an append, source Phase 0 becomes an explicit foundation bridge after the retained HashMap track, followed by source Phases 1-11.',
    'Section 38 Divide & Conquer is omitted from Appendix A. Its core is placed after Recursion/Backtracking and earlier Sorting; its advanced counting applications are revisited with later tools. This placement is an integration judgment, not a claim of explicit source ordering.',
    'Sections 01 and 44-49 remain cross-cutting study support. Section 42 toolkit review is available from the start and tracked in the foundation bridge; section 43 supplies a late mixed-recognition checkpoint. All 50 sections are accessible in the practice library at any time.',
    'Problem sets are curated options, not mandatory solve-everything checklists. Keep source-set placement separate from each printed difficulty label. Mixed-pattern and advanced examples should wait for their prerequisite techniques.',
    'The appended milestones are topic-group reviews, not individual LeetCode completion counters or automatic mastery assessment. Thirty minutes is a starting practice-session estimate, not a topic-completion deadline.',
  ],
  referenceGroups: [
    {
      title: 'Study support available throughout',
      kind: 'parallel',
      items: dsaSections.filter(section => [1, 42, 44, 45, 46, 47, 48, 49].includes(section.number))
        .map(section => ({ title: `${String(section.number).padStart(2, '0')}. ${section.title}`, detail: `${section.summary} ${section.goal}` })),
    },
    {
      title: 'Practice-set interpretation',
      kind: 'parallel',
      items: [
        { title: 'Construction, transfer, stress', detail: 'Build a template with easier examples, combine patterns through representative Medium work, and defer Hard stress tests until the core is stable.' },
        { title: 'Not a problem-count scoreboard', detail: 'Repeated IDs teach multiple viewpoints. Neither opening a link nor solving one repeated problem grants automatic mastery across the curriculum.' },
        { title: 'Cross-pattern exceptions', detail: 'Some source sets deliberately include other techniques: e.g. a trie-design problem in Topological Sort and weighted scheduling in Greedy. Use the section guidance to defer or reinterpret them.' },
      ],
    },
  ],
};
