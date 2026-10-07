import type { TutorialUiObservation } from './steps';
import { getLatestMission } from '../domain/catalog';

export const graphSkillCheckpointTitle = getLatestMission('pattern').checkpoints
  .find(checkpoint => checkpoint.id === 'pattern-v3-section-05')!.title;

export function graphToggle(root: Document, label: string): HTMLInputElement | null {
  const explicit = root.querySelector<HTMLInputElement>(`input[aria-label="${label}"]`);
  if (explicit) return explicit;
  return [...root.querySelectorAll<HTMLLabelElement>('[data-tour="career-graph-filters"] label')]
    .find(candidate => candidate.textContent?.trim() === label)?.querySelector<HTMLInputElement>('input') ?? null;
}

export function toggleIs(root: Document, label: string, checked: boolean): boolean {
  const control = graphToggle(root, label);
  return !!control && !control.disabled && control.checked === checked;
}

export function rangeIs(root: Document, label: string, value: number): boolean {
  const control = root.querySelector<HTMLInputElement>(`input[aria-label="${label}"]`);
  return !!control && !control.disabled && Number(control.value) === value;
}

export function cameraChanged(root: Document, observation?: TutorialUiObservation): boolean {
  const scene = root.querySelector<HTMLElement>('.career-graph-page .career-graph-scene');
  return observation?.interacted === true && observation.viewRevision !== null &&
    scene?.dataset.sceneState === 'ready' && Number(scene.dataset.viewRevision) > observation.viewRevision;
}

export const graphTargets: Record<string, string> = {
  'graph-labels': 'input[aria-label="Node labels"]',
  'graph-everything': '[data-tour="career-graph-everything"]',
  'graph-spacing': 'input[aria-label="Node spacing"]',
  'graph-spark-amount': 'input[aria-label="Spark dots"]',
  'graph-spark-lines': 'input[aria-label="Spark lines"]',
  'graph-ring-speed': 'input[aria-label="Rotation speed"]',
  'graph-pause': '.career-graph-controls button[aria-label="Pause animation"], .career-graph-controls button[aria-label="Resume animation"]',
  'graph-clear-center': '.career-graph-filters button[title^="Hide ring paths"]',
  'graph-ring-select': '.career-orbit-list button[data-orbit-id="orbit:mission:pattern"]',
  'graph-background-ring': '.career-orbit-list button[data-orbit-id="orbit:mission:fabric"]',
  'graph-ring-stage': 'select[aria-label="Orbit stage or record group"]',
  'graph-ring-basis': '.career-orbit-basis > summary',
  'graph-ring-members': '.career-orbit-member-details > summary',
  'graph-ring-search': 'input[aria-label="Search orbit members"]',
  'graph-ring-current': '.career-orbit-current',
  'graph-focus-ring': '.career-graph-controls button[aria-label="Focus ring"]',
  'graph-focus-node': '.career-graph-controls button[aria-label="Focus node"]',
  'graph-connections': '.career-graph-connections > summary',
  'graph-connection-source': '.career-graph-connection-reason details > summary',
  'graph-hidden-connection': '.career-graph-connections li:has(.career-graph-connection-hidden) button',
  'graph-group': '[data-visibility-group="mission:pattern"] input',
  'graph-individuals': '.career-visibility-items > summary',
  'graph-visibility-search': 'input[aria-label="Search visibility items"]',
  'graph-individual': '.career-visibility-items [data-visibility-item^="checkpoint:pattern:"] input',
  'graph-select-all': '.career-visibility-actions button:first-child',
  'graph-zoom': '.career-graph-controls button[aria-label="Zoom career graph in"]',
  'graph-frame': '.career-graph-frame',
  'graph-keyboard': '.career-graph-keyboard > summary',
  'graph-rotate': '.career-graph-keyboard button:first-child',
  'graph-canvas': '.career-graph-page canvas[aria-label="Interactive 3D career graph"]',
  'graph-fullscreen': '.career-graph-controls button[aria-label="Full screen"], .career-graph-controls button[aria-label="Exit full screen"]',
  'graph-brief': '.career-graph-page-actions button',
};

export function graphTarget(root: Document, name: string): HTMLElement | null {
  if (name === 'graph-canvas') {
    return root.querySelector<HTMLElement>('.career-graph-inspectors:not([hidden]) .career-graph-inspector:not([hidden]) button[aria-label="Close node details"]') ??
      root.querySelector<HTMLElement>(graphTargets[name]);
  }
  if (name === 'graph-skill-connection') {
    const connections = root.querySelector<HTMLElement>('.career-graph-connections:has([data-connection-kind="shared-skill"]) > summary');
    if (connections && !connections.closest('[hidden]')) return connections;
    const search = root.querySelector<HTMLInputElement>('[aria-label="Search career graph nodes"]');
    if (search?.value.toLowerCase() !== 'hashmap') return search;
    return [...root.querySelectorAll<HTMLElement>('[data-tour="career-graph-list"] button')]
      .find(button => button.querySelector('strong')?.textContent === graphSkillCheckpointTitle) ?? search;
  }
  if (name.startsWith('graph-toggle:')) return graphToggle(root, name.slice('graph-toggle:'.length));
  return graphTargets[name] ? root.querySelector<HTMLElement>(graphTargets[name]) : null;
}
