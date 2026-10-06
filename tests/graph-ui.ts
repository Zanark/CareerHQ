import { expect, type Page } from '@playwright/test';

export type GraphPanel = 'view' | 'rings' | 'visibility' | 'work';

export async function openGraphPanel(page: Page, panel: GraphPanel) {
  const opener = page.locator(`[data-graph-panel-trigger="${panel}"]`);
  if (await opener.getAttribute('aria-expanded') !== 'true') await opener.click();
  await expect(opener).toHaveAttribute('aria-expanded', 'true');
}

export async function closeGraphPanels(page: Page) {
  const open = page.locator('[data-graph-panel-trigger][aria-expanded="true"]');
  if (await open.count()) {
    await open.click();
    await expect(page.locator('[data-graph-panel-trigger][aria-expanded="true"]')).toHaveCount(0);
  }
}

export const graphCheckbox = (page: Page, name: string) =>
  page.locator('.career-graph-page').getByRole('checkbox', { name, exact: true, includeHidden: true });

export async function setGraphCheckbox(page: Page, name: string, checked: boolean) {
  await openGraphPanel(page, 'view');
  await graphCheckbox(page, name).setChecked(checked);
  await closeGraphPanels(page);
}

export async function setGraphScope(page: Page, scope: string) {
  await openGraphPanel(page, 'view');
  await page.getByLabel('Filter career graph by mission').selectOption(scope);
  await closeGraphPanels(page);
}

export async function searchGraphNodes(page: Page, query: string) {
  await openGraphPanel(page, 'work');
  await page.getByLabel('Search career graph nodes', { exact: true }).fill(query);
}

export async function clickGraphOption(page: Page, name: string) {
  await openGraphPanel(page, 'view');
  await page.getByRole('button', { name, exact: true }).click();
  await closeGraphPanels(page);
}
