import { defineOperation } from '../operationBuilder';
import type { Mission, SourceReference } from '../types';

const escapeSource: SourceReference = { document: 'Operation_Escape_Velocity_Career_HQ_Handoff.pdf', section: '3. Roadmap', page: 1 };
const incomeSource: SourceReference = { document: 'operation_side_income_starting_sprint.pdf', section: 'Next action - 45-minute search sprint', page: 1 };
const algorithmSource: SourceReference = { document: 'Operation_Algorithm_Forge_Realistic_Timeline.pdf', section: 'Expected progression and milestone forecast', page: 1 };

export const executionMissions: Mission[] = [
  defineOperation({
    id: 'escape', name: 'Career opportunities', operation: 'Escape Velocity',
    description: 'Opportunity generation and interview rehabilitation run in parallel.',
    purpose: 'Take concrete application, outreach, and recall steps without waiting for an undefined state of perfect readiness.',
    color: 'amber', icon: 'rocket', owner: 'Job Search Coach',
    dependencies: ['pattern', 'system', 'blueprint', 'fabric', 'neural'],
    coverage: 'partial', completionLabel: 'Transition outcome recorded',
    sources: [
      escapeSource,
      { ...escapeSource, section: '11. Learning methodology', page: 3 },
      { ...escapeSource, section: '20. Career HQ display requirements', page: 4 },
    ],
    sourceNotes: [
      'The handoff supplies workstreams, not formal checkpoint numbering. This app uses one ongoing workflow rather than inventing a sequential application curriculum.',
      'Application work and interview rehabilitation are parallel. The evidence and resume workstreams are not hard locks that prevent an application.',
      'Private targets, reported career history, dossier contents, and personal readiness claims are not part of the public template.',
      'Time and friction scores are manually recorded observations, not automatic assessments or application quotas.',
    ],
    stages: [
      {
        id: 'evidence', title: 'Career Evidence Recovery', summary: 'Recover verifiable examples before making resume or interview claims.',
        topics: ['Experience mining', 'Evidence inventory', 'Separate historical experience from current recall'],
        source: escapeSource,
      },
      {
        id: 'positioning', title: 'Resume Positioning', summary: 'Use evidence-backed positioning for relevant roles.',
        topics: ['Role-specific resume variants', 'Claim verification', 'Evidence-to-story mapping'],
        source: escapeSource,
      },
      {
        id: 'applications', title: 'Application Pipeline', summary: 'Keep opportunity generation running alongside technical rehabilitation.',
        topics: ['Matched applications', 'Referrals and recruiter outreach', 'Reusable private application payload', 'Easy / heavy ATS lanes', 'Time and friction tracking'],
        source: escapeSource,
        checkpoints: [{
          id: 'active-search', title: 'Applications and interview rehabilitation',
          granularity: 'workflow',
          action: 'Complete one matched application or outreach step and record its next action.',
          recoveryAction: 'Review one saved role and write its next application or follow-up step.',
          minutes: 25,
          criteria: [
            'Record evidence of the accepted transition outcome.',
            'Keep the supporting resume and interview evidence traceable without unsupported claims.',
          ],
        }],
      },
      {
        id: 'readiness', title: 'Interview Readiness', summary: 'Build recall and explanation while opportunities are already being pursued.',
        topics: ['Resume defense', 'STAR stories', 'Technical memory rehabilitation', 'Spaced DSA recall', 'Evidence versus interview-ready recall'],
        source: escapeSource,
      },
      {
        id: 'execution', title: 'Interview Execution', summary: 'Track interviews, follow-up actions, and outcomes without assuming success.',
        topics: ['Interview preparation', 'Technical and behavioral rehearsal', 'Follow-up', 'Offers and transition outcome'],
        source: escapeSource,
      },
    ],
    referenceGroups: [{
      title: 'Technical memory rehabilitation', kind: 'parallel',
      items: [
        { title: 'Recall', detail: 'Choose a non-confidential example, close the source, and explain what you remember.' },
        { title: 'Reconstruct', detail: 'Draw its architecture or recreate a small implementation; compare with an authorized source.' },
        { title: 'Record gaps', detail: 'Name missing concepts, revisit them, then try the explanation again later.' },
        { title: 'Reuse evidence', detail: 'Convert the verified result into a concise interview story or resume-defense note.' },
      ],
    }],
  }),
  defineOperation({
    id: 'income', name: 'Freelance research', operation: 'Side Income',
    description: 'A demand-first starting sprint for freelance opportunity research.',
    purpose: 'Collect real demand, classify the gaps, and choose useful proof before committing to a new learning path.',
    color: 'teal', icon: 'compass', owner: 'Freelance Coach',
    dependencies: ['blueprint', 'neural', 'escape'],
    coverage: 'sprint', completionLabel: 'Documented starting sprint complete',
    sources: [incomeSource, { ...incomeSource, section: 'Classification system and HQ report', page: 2 }],
    sourceNotes: [
      'The source defines a starting search sprint, not a complete long-term income roadmap.',
      'The sprint asks for research and review first, not immediate applications or unverified income promises.',
      'Budgets, opportunity notes, and verdicts entered in the ledger remain private browser data.',
    ],
    stages: [
      {
        id: 'ledger', title: 'Sprint 1 - Opportunity ledger', summary: 'Prepare the fields needed to compare real opportunities.',
        topics: ['Link', 'Platform', 'Role', 'Skills', 'Budget', 'Verdict'], source: incomeSource,
        checkpoints: [{
          id: 'ledger', sourceId: 'Sprint 1', title: 'Set up the opportunity ledger', granularity: 'sprint',
          action: 'Prepare an opportunity ledger with link, platform, role, skills, budget, and verdict fields.',
          recoveryAction: 'Open the freelance ledger and identify the fields needed for one opportunity.',
          minutes: 10,
          criteria: ['Prepare all six source-defined ledger fields.', 'Keep private opportunity details out of public source files.'],
        }],
      },
      {
        id: 'search', title: 'Sprint 2 - Collect demand', summary: 'Collect ten opportunities before deciding what to learn or apply for.',
        topics: ['LinkedIn contract/remote listings', 'Upwork', 'Contra', 'Authorized community leads'], source: incomeSource,
        checkpoints: [{
          id: 'search', sourceId: 'Sprint 2', title: 'Collect ten real opportunities', granularity: 'sprint',
          action: 'Collect ten freelance opportunities and record their required skills in the ledger.',
          recoveryAction: 'Save one opportunity with its source link and required skills.',
          minutes: 25,
          criteria: ['Record ten real opportunities with source links and skill requirements.', 'Research demand before applying or starting a broad new technology course.'],
        }],
      },
      {
        id: 'review', title: 'Sprint 3 - Review the top five', summary: 'Prepare the strongest five opportunities for review.',
        topics: ['Existing capability match', 'Required project or proof', 'Focused skill gaps', 'Apply / ramp / ignore'], source: incomeSource,
        checkpoints: [{
          id: 'review', sourceId: 'Sprint 3', title: 'Review and classify the top five', granularity: 'sprint',
          action: 'Prepare the top five opportunities for coach review with a verdict and supporting rationale.',
          recoveryAction: 'Classify one opportunity and write the evidence or skill gap behind that choice.',
          minutes: 10,
          criteria: ['Select five opportunities and record the capability or proof needed.', 'Classify each as Apply Now, 1-Week Ramp, 1-Month Ramp, or Ignore.'],
        }],
      },
    ],
    referenceGroups: [{
      title: 'Source verdict definitions', kind: 'parallel',
      items: [
        { title: 'Apply Now', detail: 'Existing capability supports a credible application.' },
        { title: '1-Week Ramp', detail: 'A small, focused gap appears closable with a short learning/proof effort.' },
        { title: '1-Month Ramp', detail: 'A meaningful skill or project ramp is needed first.' },
        { title: 'Ignore', detail: 'Poor fit, weak leverage, or too much ramp for the current objective.' },
      ],
    }],
    resources: [
      { label: 'LinkedIn jobs', url: 'https://www.linkedin.com/jobs/' },
      { label: 'Upwork', url: 'https://www.upwork.com/' },
      { label: 'Contra', url: 'https://contra.com/' },
    ],
  }),
  defineOperation({
    id: 'algorithm', name: 'Competitive programming', operation: 'Algorithm Forge',
    description: 'A source-provided planning timeline toward consistent contest problem solving.',
    purpose: 'Develop contest intuition, implementation speed, pattern recognition, and debugging under time pressure.',
    color: 'gray', icon: 'trophy', owner: 'Competitive Programming Coach',
    dependencies: ['pattern'], coverage: 'forecast', sources: [algorithmSource],
    sourceNotes: [
      'This document supplies a forecast, not a detailed evidence-gated checkpoint roadmap. The mission remains planned until those checkpoints are defined.',
      'The time ranges and rating milestones are source estimates, not guarantees or recorded achievements.',
      'The source estimate assumes programming and basic DSA exposure; this is not a claim about any visitor or imported personal capability.',
    ],
    stages: [
      {
        id: 'orientation', title: 'Month 1 - Contest orientation', summary: 'Learn contest mechanics and practice very easy contest problems.',
        topics: ['Codeforces mechanics', 'C# contest template', 'Easy contest problem practice'], source: algorithmSource,
      },
      {
        id: 'patterns', title: 'Months 2-3 - Core contest patterns', summary: 'Build toward consistent Div 3 A-C problem solving.',
        topics: ['Two pointers', 'Greedy', 'Maps and sets', 'Frequency counting', 'Binary search', 'Basic math'], source: algorithmSource,
      },
      {
        id: 'div2', title: 'Months 4-6 - Div 2 foundations', summary: 'Strengthen graph, tree, recursion, and beginner dynamic-programming skills.',
        topics: ['BFS and DFS', 'Trees', 'Recursion', 'Beginner DP', 'Div 2 A/B practice'], source: algorithmSource,
      },
      {
        id: 'specialist', title: 'Months 7-12 - Specialist-level practice', summary: 'Build repeated contest performance rather than treating a rating as guaranteed.',
        topics: ['Advanced greedy', 'Number theory', 'Combinatorics', 'Bitmasking', 'Contest experience', 'Source target: approximately 1400+'], source: algorithmSource,
      },
    ],
    referenceGroups: [{
      title: 'Practice-time planning scenarios (estimates)', kind: 'forecast',
      items: [
        { title: '30 minutes/day', detail: 'Source planning range: 12-18 months.' },
        { title: '1 hour/day', detail: 'Source planning range: 8-12 months; use 10 months as a planning number.' },
        { title: '2 hours/day', detail: 'Source planning range: 6-8 months.' },
        { title: '3+ hours/day', detail: 'Potentially faster only when sustainable; no guaranteed outcome.' },
      ],
    }, {
      title: 'Illustrative milestone forecast', kind: 'forecast',
      items: [
        { title: 'Week 1', detail: 'First contest or contest-environment exposure.' },
        { title: 'Around month 2', detail: 'Work toward meaningful Div 3 C-level success.' },
        { title: 'Around month 5', detail: 'Work toward making Div 2 B problems accessible.' },
        { title: 'Around months 8-10', detail: 'The source target window for approximately 1400+, conditional on consistent practice and contests.' },
      ],
    }],
    resources: [{ label: 'Codeforces', url: 'https://codeforces.com/' }],
  }),
];
