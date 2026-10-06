import type { Page } from '@playwright/test';
import { closeGraphPanels, openGraphPanel } from './graph-ui';
import type { AppState } from '../src/domain/types';
import { localDate } from '../src/domain/engine';
import { buildCareerGraph } from '../src/graph/careerGraphModel';
import { focusCareerGraph, getCareerFocusVisibility } from '../src/graph/careerFocusVisibility';

export function focusedGraphForState(state: AppState, date = localDate()) {
  return focusCareerGraph(buildCareerGraph(state), getCareerFocusVisibility(state, date).detailedMissionIds);
}

export async function chooseMissionRings(page: Page, missionIds: string[]) {
  await openGraphPanel(page, 'visibility');
  const panel = page.locator('[data-graph-panel="visibility"]');
  const items = panel.locator('.career-visibility-items');
  if (await items.getAttribute('open') === null) await items.locator('summary').click();
  await panel.getByLabel('Filter visibility item types', { exact: true }).selectOption('orbit');
  await panel.getByLabel('Search visibility items', { exact: true }).fill('');
  for (const id of missionIds) {
    await panel.locator(`[data-visibility-item="orbit:mission:${id}"]`).getByRole('checkbox').check();
  }
  await closeGraphPanels(page);
}
