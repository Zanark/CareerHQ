import type { AppState } from '../domain/types';
import type { TutorialSignals } from './types';
import type { Theme } from '../useTheme';

export interface CheckContext {
  state: AppState;
  signals: TutorialSignals;
  route: string;
  enterTheme: Theme;
}

export type StepKind = 'explain' | 'action';

export interface TutorialStep {
  id: string;
  chapter: string;
  title: string;
  body: string;
  kind: StepKind;
  /** data-tour values to search for, in priority order. First match wins. */
  targets?: string[];
  /** Route to navigate to once, when this step becomes current. */
  route?: string;
  /** Command to invoke once, when this step becomes current (opens real UI, never submits data). */
  command?: 'open-evidence' | 'open-opportunity' | 'close-dialogs';
  /** For action steps: condition that marks the step as demonstrated. Ignored for explain steps. */
  check?: (ctx: CheckContext) => boolean;
}

export interface TutorialChapter {
  id: string;
  title: string;
}

export const chapters: TutorialChapter[] = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'overview', title: 'Overview' },
  { id: 'plan', title: 'Plan & focus' },
  { id: 'mission', title: 'Mission basics' },
  { id: 'evidence', title: 'Recording evidence' },
  { id: 'review', title: 'Review & roadmap' },
  { id: 'control', title: 'Mission control' },
  { id: 'pipeline', title: 'Opportunities' },
  { id: 'readiness', title: 'Readiness & interview mode' },
  { id: 'settings', title: 'Settings & backup' },
  { id: 'persistence', title: 'How data is stored' },
  { id: 'tools', title: 'Search, theme & help' },
  { id: 'finish', title: 'Finish' },
];

export const steps: TutorialStep[] = [
  // Welcome
  {
    id: 'welcome-intro', chapter: 'welcome', kind: 'explain',
    title: 'Welcome to the practice tutorial',
    body: 'Practice with the real controls on temporary data. Your real progress and theme preference stay unchanged. Click the highlighted control, then Next. You can skip a step or exit at any time.',
  },
  // Overview
  {
    id: 'overview-today', chapter: 'overview', kind: 'explain', route: 'hq',
    targets: ['overview-today', 'overview-summary'],
    title: "Today's plan",
    body: 'HQ overview shows a short plan for today and a summary of your missions. Nothing here is graded; it is just a snapshot of your own tracked work.',
  },
  {
    id: 'overview-missions', chapter: 'overview', kind: 'explain',
    targets: ['overview-missions', 'overview-summary'],
    title: 'Missions and checkpoints',
    body: 'A mission is a career area, like DSA or system design. Each mission has an ordered list of checkpoints, which are small milestones. There are no accounts, logins, or streak counters here.',
  },
  // Plan & focus
  {
    id: 'plan-capacity', chapter: 'plan', kind: 'action', route: 'plan',
    targets: ['capacity'],
    title: 'Choose a capacity',
    body: 'Click Gentle to plan one action of up to 15 minutes. Steady and Deep focus allow up to three actions within a larger time budget.',
    check: ({ state }) => state.capacity === 'gentle',
  },
  {
    id: 'plan-actions', chapter: 'plan', kind: 'explain',
    targets: ['plan-actions'],
    title: "Today's actions",
    body: "These are the checkpoints suggested for today, based on your active missions and chosen capacity. Completing them is optional; evidence is what actually advances a checkpoint.",
  },
  {
    id: 'plan-refresh', chapter: 'plan', kind: 'explain',
    targets: ['plan-refresh'],
    title: 'Refresh an untouched plan',
    body: 'Refresh plan applies your latest active missions and priorities. It can rebuild an untouched plan, but preserves a plan once you have logged work. It never adds a missed-day backlog.',
  },
  {
    id: 'plan-focus', chapter: 'plan', kind: 'action',
    targets: ['focus-start'],
    title: 'Try the focus timer',
    body: 'Click Start focus session. The timer measures time only; it does not record evidence or complete any checkpoint.',
    check: ({ signals }) => signals.focusRunning,
  },
  {
    id: 'plan-pause', chapter: 'plan', kind: 'action',
    targets: ['focus-start'],
    title: 'Pause the timer',
    body: 'Click Pause session. Your real focus timer, if you had one running before this tutorial, is separate.',
    check: ({ signals }) => !signals.focusRunning,
  },
  {
    id: 'plan-open-pattern', chapter: 'plan', kind: 'action',
    targets: ['plan-open-pattern'],
    title: 'Open a mission from the plan',
    body: "Open today's DSA checkpoint directly from the plan.",
    check: ({ route }) => route === 'mission/pattern',
  },
  // Mission basics
  {
    id: 'mission-save-state', chapter: 'mission', kind: 'explain', route: 'mission/pattern',
    targets: ['save-state'],
    title: 'The save-state card',
    body: 'This card shows four things: the stage, the current checkpoint, its status, and what unlocks next. Completing the current checkpoint with evidence is what moves "next" forward.',
  },
  {
    id: 'mission-roadmap-intro', chapter: 'mission', kind: 'explain',
    targets: ['mission-roadmap'],
    title: 'A mission roadmap',
    body: 'Checkpoints inside one mission are locked in sequence. Dependencies shown between missions are soft, related links only; they do not block progress in this mission.',
  },
  {
    id: 'mission-list', chapter: 'mission', kind: 'explain', route: 'missions',
    targets: ['mission-list'],
    title: 'Find all learning areas',
    body: 'Missions lists every area. Use In focus, Background, or Planned to filter it, then open a card for its checkpoint. Planned areas have no invented progress or working roadmap yet.',
  },
  // Evidence
  {
    id: 'evidence-open', chapter: 'evidence', kind: 'action', route: 'mission/pattern',
    targets: ['record-evidence'],
    title: 'Open the evidence form',
    body: 'Click Record evidence to open the real form for this checkpoint.',
    check: ({ signals }) => signals.evidenceOpen,
  },
  {
    id: 'evidence-save', chapter: 'evidence', kind: 'action', command: 'open-evidence',
    targets: ['evidence-example', 'evidence-form', 'evidence-submit'],
    title: 'Record evidence without completing',
    body: "Click Fill example (or write your own practice note), leave 'This checkpoint is complete' unchecked, then click Save evidence.",
    check: ({ state }) => state.evidence.length >= 1,
  },
  {
    id: 'evidence-criteria', chapter: 'evidence', kind: 'explain', command: 'open-evidence',
    targets: ['evidence-criteria', 'evidence-form'],
    title: 'Checkpoint criteria',
    body: 'Criteria are short, specific statements you confirm yourself. Nothing here is graded or checked by AI; it is an honest self-record of what you did.',
  },
  {
    id: 'evidence-complete', chapter: 'evidence', kind: 'action', command: 'open-evidence',
    targets: ['checkpoint-complete', 'evidence-submit', 'evidence-form'],
    title: 'Complete the checkpoint',
    body: "Open evidence again, click Fill example, check 'This checkpoint is complete', confirm every criterion, then click Complete & unlock next.",
    check: ({ state }) => state.missions.pattern.completedCheckpointIds.length >= 1,
  },
  // Review & roadmap
  {
    id: 'review-saved-work', chapter: 'review', kind: 'explain', route: 'evidence', command: 'close-dialogs',
    targets: ['saved-work-filter'],
    title: 'Saved work',
    body: 'Your practice notes and completion evidence appear here. Try the mission/type filters or search. This is not an encrypted vault.',
  },
  {
    id: 'review-history', chapter: 'review', kind: 'explain', route: 'history',
    title: 'History',
    body: 'This separate page records actions, checkpoint completions, and setting changes in order. Records survive normal app updates; tutorial records are discarded on exit.',
  },
  {
    id: 'review-master-roadmap', chapter: 'review', kind: 'explain', route: 'roadmap',
    targets: ['master-roadmap'],
    title: 'The master roadmap',
    body: 'This view shows every mission at once. Checkpoints within a mission stay locked in sequence; lines between missions are soft, related links, not hard prerequisites.',
  },
  // Mission control
  {
    id: 'control-mode', chapter: 'control', kind: 'action', route: 'mission/fabric',
    targets: ['mission-mode', 'mission-primary'],
    title: 'Bring a mission into focus',
    body: "Click Bring into focus. This makes Service Fabric eligible for daily planning; it does not erase its current checkpoint.",
    check: ({ state }) => state.missions.fabric.mode === 'active',
  },
  {
    id: 'control-primary', chapter: 'control', kind: 'action',
    targets: ['mission-primary'],
    title: 'Choose a primary mission',
    body: 'Click Make primary mission. The primary mission is considered first when generating a fresh plan, as long as it is active and unblocked.',
    check: ({ state }) => state.focusMissionId === 'fabric',
  },
  {
    id: 'control-blocker', chapter: 'control', kind: 'action',
    targets: ['blocker-input', 'blocker-submit', 'blocker-form'],
    title: 'Record a blocker',
    body: "Type 'Need a practice lab' into the blocker field and save it. A blocked mission is skipped by daily planning until you clear it.",
    check: ({ state }) => state.missions.fabric.blocker.trim().length > 0,
  },
  {
    id: 'control-blocker-clear', chapter: 'control', kind: 'explain',
    targets: ['blocker-form'],
    title: 'Clearing a blocker',
    body: 'Clearing the blocker field and saving lets this mission appear in daily plans again. Try it now, or move on; it is optional.',
  },
  {
    id: 'control-background', chapter: 'control', kind: 'action',
    targets: ['mission-mode'],
    title: 'Keep a mission in the background',
    body: 'Click Move to background. Its checkpoint and evidence stay intact, but it no longer gets a daily action.',
    check: ({ state }) => state.missions.fabric.mode === 'background',
  },
  // Pipeline
  {
    id: 'pipeline-add', chapter: 'pipeline', kind: 'action', route: 'pipeline',
    targets: ['opportunity-example', 'opportunity-form', 'pipeline-add'],
    title: 'Add an opportunity',
    body: 'Click Add opportunity, then Fill example, then Add opportunity inside the form. This creates only a fictional tutorial entry.',
    check: ({ state }) => state.opportunities.length >= 1,
  },
  {
    id: 'pipeline-stage', chapter: 'pipeline', kind: 'action',
    targets: ['opportunity-stage', 'pipeline-table'],
    title: 'Move a stage forward',
    body: "Change the first opportunity's stage to Recruiter.",
    check: ({ state }) => state.opportunities.some((item) => item.stage === 'Recruiter'),
  },
  {
    id: 'pipeline-table', chapter: 'pipeline', kind: 'explain',
    targets: ['pipeline-table'],
    title: 'Board and table views',
    body: 'Click Table for a compact list, or Board to group roles by stage. Both views edit the same opportunities; a stage change is recorded in History.',
  },
  // Readiness & interview mode
  {
    id: 'readiness-coding', chapter: 'readiness', kind: 'action', route: 'readiness', command: 'close-dialogs',
    targets: ['readiness-coding'],
    title: 'Self-assess readiness',
    body: "Select Building for Coding patterns. This is your own self-assessment; nothing automatically grades it.",
    check: ({ state }) => state.readiness['Coding patterns'] === 'building',
  },
  {
    id: 'readiness-interview-mode', chapter: 'readiness', kind: 'action', route: 'plan',
    targets: ['interview-mode'],
    title: 'Interview mode',
    body: 'Enable Interview mode to prioritize interview preparation. Refresh can rebuild an untouched plan; if you already logged work today, that plan stays intact and the change applies to a later fresh plan.',
    check: ({ state }) => state.interviewMode,
  },
  // Settings & backup
  {
    id: 'settings-goal', chapter: 'settings', kind: 'explain', route: 'settings',
    targets: ['goal-form'],
    title: 'Your objective',
    body: 'This optional text is a reminder for yourself. It does not change how missions or plans behave.',
  },
  {
    id: 'settings-export', chapter: 'settings', kind: 'action',
    targets: ['backup-export'],
    title: 'Export an example backup',
    body: 'Click Export example to download a clearly labeled tutorial JSON file. This is not a backup of your real progress.',
    check: ({ signals }) => signals.exportCount > 0,
  },
  {
    id: 'settings-import', chapter: 'settings', kind: 'action',
    targets: ['backup-import', 'backup-input'],
    title: 'Import that backup',
    body: 'Click Import backup and choose the file you just downloaded, then confirm. Your file dialog may not be available in every environment; Skip is fine.',
    check: ({ signals }) => signals.importCount > 0,
  },
  {
    id: 'settings-reset', chapter: 'settings', kind: 'explain',
    targets: ['workspace-reset'],
    title: 'Fresh data and examples',
    body: 'Start a fresh workspace clears progress after confirmation; Reload sample replaces it with examples. Export before doing either in your real workspace. Here they only reset temporary tutorial data.',
  },
  // Persistence
  {
    id: 'persistence-explain', chapter: 'persistence', kind: 'explain', route: 'settings',
    targets: ['storage-info'],
    title: 'Where your data lives',
    body: 'Your real data is saved only in this browser, in localStorage, on this device and origin. There is no account, server sync, or streak tracking. Refreshing or reopening this app here keeps your data; clearing site data deletes it. To use another browser or device, export a backup and import it there. Backups are plain, readable JSON. Future app versions may need an explicit migration step before opening an older backup.',
  },
  // Search, theme, print, help
  {
    id: 'tools-search', chapter: 'tools', kind: 'action', route: 'hq',
    targets: ['global-search'],
    title: 'Global search',
    body: 'Type DSA or a saved-work title in global search. Matching missions and saved evidence appear below; click a result to open it. Opportunities are tracked on their own page, not in this search.',
    check: ({ signals }) => signals.searchQuery.trim().length > 0,
  },
  {
    id: 'tools-theme', chapter: 'tools', kind: 'action',
    targets: ['theme-switch'],
    title: 'Day and night theme',
    body: 'Click the theme toggle. This change is temporary for the tutorial; your real preference is restored when you exit.',
    check: ({ signals, enterTheme }) => signals.theme !== enterTheme,
  },
  {
    id: 'tools-print', chapter: 'tools', kind: 'explain', route: 'plan',
    targets: ['print-plan'],
    title: 'Printing your plan',
    body: "Print plan opens your browser's print dialog for today's actions. Try it now, or move on; it is optional.",
  },
  {
    id: 'tools-help', chapter: 'tools', kind: 'explain', route: 'guide',
    targets: ['help-guide'],
    title: 'Help and glossary',
    body: 'The guide page explains terms like mission, checkpoint, and readiness in one place, any time you need a refresher.',
  },
  // Finish
  {
    id: 'finish', chapter: 'finish', kind: 'explain',
    title: 'Back to your real workspace',
    body: 'That covers the real controls: plan, focus, evidence, missions, pipeline, readiness, backups, search, and theme. Exit to return to your real workspace exactly as you left it, or Restart to try the tutorial again on fresh practice data.',
  },
];
