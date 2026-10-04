import type { Checkpoint } from '../types';
import type { DsaStudySection } from './dsaStudyTypes';
import { dsaSectionNotes } from './dsaSectionNotes';
import { dsaProblemSets } from './dsaProblemSets';

export const DSA_EXPANDED_SOURCE = 'Complete_DSA_LeetCode_Mastery_Roadmap_EXPANDED.pdf';

export const dsaSections: readonly DsaStudySection[] = dsaSectionNotes.map(section => ({
  ...section,
  page: section.number * 2 + 1,
  problems: dsaProblemSets[section.number],
}));

export const dsaMasteryGate = [
  'State the invariant before writing the solution.',
  'Implement the core approach from memory and explain its state transitions.',
  'Give a variation or counterexample where the obvious approach is unsuitable.',
  'Justify time complexity and auxiliary-space use.',
  'Solve a previously unseen transfer problem without a pattern hint.',
];

export const dsaPracticeProtocol = [
  'Start with the model and operations. Use representative easier problems to build a reusable implementation, unless that groundwork is already fluent.',
  'Use Medium problems to transfer the pattern and combine it with other structures. Write the invariant and revisit mistakes before increasing difficulty.',
  'Treat Hard problems as later stress practice, not entry requirements for every topic. The document does not require solving every listed problem.',
  'After a break, revisit three problems: one Easy, one Medium, and one that previously went wrong.',
  'Tag failures by recognition, invariant, implementation, complexity, or edge-case handling; use the tag to choose what to change.',
  'Every 20-30 problems, attempt a mixed set with pattern labels hidden. Repeated problems across sections are deliberate alternative viewpoints.',
  'Use the same protocol, revision habits, C# toolkit and mastery questions throughout the roadmap, rather than waiting for their late chapter numbers.',
];

export function dsaStudySectionFor(checkpoint?: Checkpoint): DsaStudySection | undefined {
  if (!checkpoint) return undefined;
  const number = checkpoint.studySection ?? (checkpoint.id.startsWith('pattern-v2-') ? 5 : undefined);
  return dsaSections.find(section => section.number === number);
}
