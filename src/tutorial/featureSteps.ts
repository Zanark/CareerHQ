import type { TutorialStep } from './steps';

const value = (root: Document, target: string) => root.querySelector<HTMLSelectElement>(`[data-tour="${target}"]`)?.value;
const expanded = (root: Document, target: string) => root.querySelector<HTMLDetailsElement>(`[data-tour="${target}"]`)?.open === true;

export const sourceSteps: TutorialStep[] = [
  {
    id: 'source-upgrades', chapter: 'sources', kind: 'explain', route: 'sources', command: 'close-dialogs',
    targets: ['operation-source'], title: 'Where the PDFs went',
    body: 'The PDFs became built-in roadmap definitions, not complete courses or imported achievements. This page shows their sources and scope. No PDF upload is needed. Our temporary Service Fabric example uses an older tracker so you can safely practice adoption.',
  },
  {
    id: 'source-select-fabric', chapter: 'sources', kind: 'action',
    targets: ['source-mission'], title: 'Choose an operation',
    body: 'Choose Service Fabric / Fabric Core in Mission. Compare Documented roadmap with Active tracker. These can differ because an update never silently reclassifies your saved position.',
    checkUi: root => value(root, 'source-mission') === 'fabric',
  },
  {
    id: 'source-preview', chapter: 'sources', kind: 'action',
    targets: ['source-preview', 'source-material'], title: 'Preview before switching',
    body: 'Open Preview documented roadmap before adopting. Review the new stages without changing anything. If you already adopted this example, its archive replaces the preview and you can continue.',
    checkUi: root => value(root, 'source-mission') === 'fabric' &&
      (expanded(root, 'source-preview') || !!root.querySelector('[data-tour="source-archive"]')),
  },
  {
    id: 'source-adopt', chapter: 'sources', kind: 'action',
    targets: ['source-adopt', 'operation-source'], title: 'Adopt the practice roadmap',
    body: 'Click Adopt documented roadmap and confirm. Only tutorial data changes. Your old position becomes a read-only archive; new checkpoints start unconfirmed. In real use, export a backup before switching.',
    check: ({ state }) => state.missions.fabric.roadmapVersion === '2.0.0',
  },
  {
    id: 'source-archive', chapter: 'sources', kind: 'action',
    targets: ['source-archive'], title: 'Find the preserved position',
    body: 'Expand Previous roadmap v1.0.0. This is the preserved old position, not credit toward different new topics. Historical work remains associated with its original version.',
    checkUi: root => expanded(root, 'source-archive'),
  },
  {
    id: 'source-stage', chapter: 'sources', kind: 'action',
    targets: ['roadmap-stage'], title: 'Browse another stage',
    body: 'Choose the last option in Roadmap stage. This changes the diagram you are inspecting, not your current checkpoint. Current stage returns to your saved position.',
    checkUi: root => {
      const select = root.querySelector<HTMLSelectElement>('[data-tour="roadmap-stage"]');
      return !!select && select.options.length > 1 && select.selectedIndex === select.options.length - 1;
    },
  },
  {
    id: 'source-topics', chapter: 'sources', kind: 'action',
    targets: ['roadmap-stage-topics'], title: 'Read the actual requirements',
    body: 'Expand Topics and completion criteria in this stage. These show what each tracked milestone asks for. A short phase-review checklist is not the entire course or proof of subject mastery.',
    checkUi: root => expanded(root, 'roadmap-stage-topics'),
  },
  {
    id: 'source-optional', chapter: 'sources', kind: 'action',
    targets: ['source-optional'], title: 'Optional does not mean locked',
    body: 'Choose Certifications in Mission, then select a Roadmap stage marked optional. Optional paths are reference material, not compulsory checkpoint gates or earned certifications.',
    checkUi: root => value(root, 'source-mission') === 'credential' &&
      !!root.querySelector<HTMLSelectElement>('[data-tour="roadmap-stage"]')?.selectedOptions[0]?.textContent?.includes('(optional)'),
  },
  {
    id: 'source-forecast', chapter: 'sources', kind: 'action',
    targets: ['source-mission'], title: 'Recognize a forecast',
    body: 'Choose Competitive programming / Algorithm Forge. Its four stages are conditional planning references, with zero tracked checkpoints. There is no invented progress or promised completion date.',
    checkUi: root => value(root, 'source-mission') === 'algorithm',
  },
  {
    id: 'source-projects', chapter: 'sources', kind: 'explain', route: 'sources/neural',
    targets: ['source-projects'], title: 'Projects are supporting material',
    body: 'AI Engineering has seven tracked phases and a nine-project reference ladder. The project list is not nine completed builds. Use learning material or a coach for the work, then record genuine evidence in CareerHQ.',
  },
];

export const fullMapSteps: TutorialStep[] = [
  {
    id: 'full-map-open', chapter: 'full-map', kind: 'action', route: 'mission/fabric', command: 'close-dialogs',
    targets: ['full-roadmap-open'], title: 'Open the entire mission',
    body: 'Click Full roadmap beside the mission name. Every stage of your active version appears together. If you skipped roadmap adoption, this practice mission may still show its older version.',
    check: ({ signals }) => signals.fullRoadmapOpen,
  },
  {
    id: 'full-map-zoom', chapter: 'full-map', kind: 'action', command: 'open-roadmap',
    targets: ['full-map-zoom-in'], title: 'Zoom into the overview',
    body: 'Click + to zoom in; - zooms out. Fit all is a whole-map overview, not large text on every screen. The percentage shows your zoom, and 100% gives normal-size text.',
    checkUi: root => root.querySelector('[data-tour="full-map-fit"]')?.getAttribute('aria-pressed') === 'false',
  },
  {
    id: 'full-map-inspect', chapter: 'full-map', kind: 'action', command: 'open-roadmap',
    targets: ['full-map-last-node'], title: 'Inspect without advancing',
    body: 'Click the highlighted later checkpoint. Its action and criteria open below. Your current checkpoint stays where it was: clicking a roadmap node never completes work or moves your saved position.',
    checkUi: root => !!root.querySelector('.full-roadmap-inspector details[open]') &&
      !!root.querySelector('.full-roadmap-node[aria-pressed="true"]:not([aria-current="step"])'),
  },
  {
    id: 'full-map-current', chapter: 'full-map', kind: 'action', command: 'open-roadmap',
    targets: ['full-map-current'], title: 'Find your glowing checkpoint',
    body: 'Click Current checkpoint. The view centers on your actual saved step at readable size. Its bright glow pulses unless reduced motion is enabled. A background mission can still have a saved current step.',
    checkUi: root => !!root.activeElement?.matches('.full-roadmap-node[aria-current="step"]'),
  },
  {
    id: 'full-map-pan', chapter: 'full-map', kind: 'explain', command: 'open-roadmap',
    targets: ['full-map-canvas'], title: 'Move around a large map',
    body: 'Drag empty canvas space with a mouse, scroll, or swipe on a touch screen. With the canvas focused, arrow keys also scroll. These movements affect only the view, never your progress.',
  },
  {
    id: 'full-map-fit', chapter: 'full-map', kind: 'action', command: 'open-roadmap',
    targets: ['full-map-fit'], title: 'Bring every stage back',
    body: 'Click Fit all to see the entire map again. Optional and forecast sections stay visible without fake completion nodes. A fully completed mission has no current-step glow.',
    checkUi: root => root.querySelector('[data-tour="full-map-fit"]')?.getAttribute('aria-pressed') === 'true',
  },
  {
    id: 'full-map-close', chapter: 'full-map', kind: 'action',
    targets: ['dialog-close'], title: 'Return to the mission',
    body: 'Close the map with its top-right X or Escape. You return to the mission and the Full roadmap button. No checkpoint, evidence, or saved position has changed.',
    check: ({ signals }) => !signals.fullRoadmapOpen,
  },
];
