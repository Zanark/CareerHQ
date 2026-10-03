import { test as base, expect, type Page, type TestInfo } from '@playwright/test';
import type { AppState } from '../src/domain/types';

const storageKey = 'careerhq.workspace.v1';
const sampleMessage = /You’re exploring a sample workspace/;

const test = base.extend<{ browserHealth: void }>({
  browserHealth: [async ({ context, baseURL }, use) => {
    const appOrigin = new URL(baseURL!).origin;
    const errors: string[] = [];
    const externalRequests: string[] = [];
    const watch = (page: Page) => {
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => {
        if (message.type() === 'error') errors.push(message.text());
      });
    };
    context.pages().forEach(watch);
    context.on('page', watch);
    context.on('request', request => {
      const url = new URL(request.url());
      if (['http:', 'https:'].includes(url.protocol) && url.origin !== appOrigin) {
        externalRequests.push(request.url());
      }
    });
    context.on('response', response => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await use();
    expect(errors, 'No console errors, page exceptions, or failed HTTP responses').toEqual([]);
    expect(externalRequests, 'The app must not request external assets or services').toEqual([]);
  }, { auto: true }],
});

async function stored(page: Page): Promise<AppState> {
  return page.evaluate(key => JSON.parse(localStorage.getItem(key)!), storageKey);
}

async function rawStored(page: Page): Promise<string | null> {
  return page.evaluate(key => localStorage.getItem(key), storageKey);
}

async function navigate(page: Page, name: string | RegExp) {
  const menu = page.getByRole('button', { name: 'Open navigation', exact: true });
  if (await menu.isVisible() && await menu.getAttribute('aria-expanded') !== 'true') {
    await menu.click();
  }
  await page.getByRole('complementary', { name: 'Main navigation' })
    .getByRole('link', { name }).click();
}

async function confirmNext(page: Page, action: () => Promise<unknown>, accept = true) {
  const confirmation = page.waitForEvent('dialog');
  const click = action();
  const dialog = await confirmation;
  expect(dialog.type()).toBe('confirm');
  if (accept) await dialog.accept();
  else await dialog.dismiss();
  await click;
}

async function freshWorkspace(page: Page) {
  await page.goto('./');
  await navigate(page, 'Settings & data');
  await confirmNext(page, () => page.getByRole('button', { name: 'Start a fresh workspace', exact: true }).click());
  await expect(page.getByText(sampleMessage)).toHaveCount(0);
  await expect.poll(async () => (await stored(page)).sampleData).toBe(false);
}

async function openPatternForge(page: Page) {
  await navigate(page, /^My missions/);
  await page.getByRole('button', { name: 'Open Pattern Forge', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Pattern Forge', exact: true, level: 1 })).toBeVisible();
}

async function fillEvidence(page: Page, title: string, summary = 'I traced an example and explained the result in my own words.') {
  const dialog = page.getByRole('dialog', { name: 'Keep the proof.' });
  await dialog.getByLabel('Artifact title').fill(title);
  await dialog.getByLabel('A little context').fill(summary);
  return dialog;
}

async function screenshot(page: Page, testInfo: TestInfo, name: string, fullPage = true) {
  const path = testInfo.outputPath(`${name}.png`);
  await page.screenshot({ path, fullPage, animations: 'disabled' });
  await testInfo.attach(name, { path, contentType: 'image/png' });
}

async function noOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth,
  ), { message: 'No horizontal document overflow' }).toBeLessThanOrEqual(0);
}

test('sample workspace, accessible navigation, and hash deep-link reload', async ({ page }, testInfo) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1, name: 'A little progress. A clearer direction.' })).toBeVisible();
  await expect(page.getByText(sampleMessage)).toBeVisible();
  await noOverflow(page);
  await screenshot(page, testInfo, 'hq-desktop');

  const pages = [
    [/^My missions/, 'Your missions, connected.'],
    ['Master roadmap', 'Separate paths. Shared direction.'],
    ['Daily plan', 'Make today manageable.'],
    ['Evidence vault', 'Work you can point to.'],
  ] as const;
  for (const [link, title] of pages) {
    await navigate(page, link);
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
  }
  await openPatternForge(page);
  await expect(page).toHaveURL(/\/CareerHQ\/#\/mission\/pattern$/);
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'Pattern Forge', exact: true })).toBeVisible();
  await screenshot(page, testInfo, 'mission-desktop');
});

for (const width of [390, 320]) {
  test(`all primary routes and evidence dialog fit ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('./');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await noOverflow(page);
    await screenshot(page, testInfo, `hq-${width}`);
    for (const link of [/^My missions/, 'Master roadmap', 'Daily plan', 'Evidence vault', 'History',
      'Opportunity pipeline', 'Interview readiness', 'Settings & data']) {
      await navigate(page, link);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await noOverflow(page);
      await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toHaveAttribute('aria-expanded', 'false');
    }
    await openPatternForge(page);
    await noOverflow(page);
    await page.getByRole('button', { name: 'Record evidence', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'Keep the proof.' })).toBeVisible();
    await noOverflow(page);
    const dialogBox = await page.getByRole('dialog', { name: 'Keep the proof.' }).boundingBox();
    expect(dialogBox).not.toBeNull();
    expect(dialogBox!.x).toBeGreaterThanOrEqual(0);
    expect(dialogBox!.x + dialogBox!.width).toBeLessThanOrEqual(width);
    await screenshot(page, testInfo, `evidence-dialog-${width}`, false);
    const dialog = await fillEvidence(page, `Synthetic proof recorded at ${width}px`);
    await dialog.getByRole('button', { name: 'Save evidence', exact: true }).click();
    await expect(dialog).toHaveCount(0);
    expect((await stored(page)).evidence.some(item => item.title === `Synthetic proof recorded at ${width}px`)).toBe(true);
    await noOverflow(page);
  });
}

test('reset needs confirmation, removes samples, and survives reload', async ({ page }) => {
  await page.goto('./');
  await navigate(page, 'Settings & data');
  const before = await rawStored(page);
  await confirmNext(page, () => page.getByRole('button', { name: 'Start a fresh workspace', exact: true }).click(), false);
  expect(await rawStored(page)).toBe(before);
  await expect(page.getByText(sampleMessage)).toBeVisible();
  await confirmNext(page, () => page.getByRole('button', { name: 'Start a fresh workspace', exact: true }).click());
  const clean = await stored(page);
  expect(clean.sampleData).toBe(false);
  expect(clean.evidence).toEqual([]);
  expect(clean.opportunities).toEqual([]);
  expect(Object.values(clean.missions).every(mission => mission.completedCheckpointIds.length === 0)).toBe(true);
  await page.reload();
  await expect(page.getByText(sampleMessage)).toHaveCount(0);
  expect((await stored(page)).evidence).toEqual([]);
});

test('required evidence records action progress without claiming mastery', async ({ page }) => {
  await freshWorkspace(page);
  await navigate(page, 'Daily plan');
  const before = await stored(page);
  const action = page.getByRole('article').filter({ has: page.getByText('Pattern Forge', { exact: true }) });
  await action.getByRole('button', { name: 'Log progress', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Keep the proof.' });
  await dialog.getByRole('button', { name: 'Save evidence', exact: true }).click();
  expect(await dialog.getByLabel('Artifact title').evaluate((input: HTMLInputElement) => input.validity.valueMissing)).toBe(true);
  expect((await stored(page)).evidence).toHaveLength(0);
  await dialog.getByLabel('Artifact title').fill('A test-owned practice trace');
  await dialog.getByRole('button', { name: 'Save evidence', exact: true }).click();
  expect(await dialog.getByLabel('A little context').evaluate((input: HTMLTextAreaElement) => input.validity.valueMissing)).toBe(true);
  expect((await stored(page)).evidence).toHaveLength(0);
  await dialog.getByLabel('A little context').fill('I traced a small example and recorded the boundary cases, without claiming completion.');
  await dialog.getByRole('button', { name: 'Save evidence', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(action.getByText('Evidence recorded', { exact: true })).toBeVisible();
  const after = await stored(page);
  expect(after.evidence).toHaveLength(1);
  expect(after.evidence[0].completedCheckpoint).toBe(false);
  expect(after.missions.pattern.checkpointId).toBe(before.missions.pattern.checkpointId);
  expect(after.missions.pattern.completedCheckpointIds).toEqual([]);
  expect(after.events.slice(0, before.events.length)).toEqual(before.events);
  await page.reload();
  await expect(action.getByText('Evidence recorded', { exact: true })).toBeVisible();
  await openPatternForge(page);
  await expect(page.getByRole('progressbar', { name: 'Mission checkpoint progress' })).toHaveAttribute('aria-valuenow', '0');
  await expect(page.getByText('In progress', { exact: true })).toBeVisible();
});

test('checkpoint unlock requires all criteria and retains evidence across reload', async ({ page }) => {
  await freshWorkspace(page);
  await openPatternForge(page);
  const before = await stored(page);
  await page.getByRole('button', { name: 'Record evidence', exact: true }).click();
  const dialog = await fillEvidence(page, 'A test-owned checkpoint demonstration');
  await dialog.getByRole('checkbox', { name: /This checkpoint is complete/ }).check();
  const complete = dialog.getByRole('button', { name: 'Complete & unlock next', exact: true });
  await expect(complete).toBeDisabled();
  const criteria = dialog.getByRole('group', { name: 'My completion evidence meets these criteria' }).getByRole('checkbox');
  expect(await criteria.count()).toBeGreaterThan(0);
  for (const checkbox of await criteria.all()) await checkbox.check();
  await expect(complete).toBeEnabled();
  await complete.click();
  await expect(dialog).toHaveCount(0);
  const after = await stored(page);
  expect(after.missions.pattern.completedCheckpointIds).toEqual([before.missions.pattern.checkpointId]);
  expect(after.missions.pattern.checkpointId).not.toBe(before.missions.pattern.checkpointId);
  expect(after.missions.pattern.status).toBe('not-started');
  expect(after.evidence[0].completedCheckpoint).toBe(true);
  expect(after.events.slice(0, before.events.length)).toEqual(before.events);
  await page.reload();
  expect((await stored(page)).missions.pattern).toEqual(after.missions.pattern);
  await expect(page.getByRole('progressbar', { name: 'Mission checkpoint progress' })).not.toHaveAttribute('aria-valuenow', '0');
  await navigate(page, 'Evidence vault');
  await expect(page.getByRole('heading', { name: 'A test-owned checkpoint demonstration', exact: true })).toBeVisible();
  await expect(page.getByText('Checkpoint proof', { exact: true })).toBeVisible();
});

test('mission and evidence filters use real browser-owned records', async ({ page }) => {
  await freshWorkspace(page);
  await navigate(page, /^My missions/);
  await page.getByRole('button', { name: /^Planned/ }).click();
  await expect(page.getByRole('button', { name: 'Open Algorithm Forge', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open Pattern Forge', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: /^All missions/ }).click();
  await page.getByRole('button', { name: 'Open Pattern Forge', exact: true }).click();
  await page.getByRole('button', { name: 'Record evidence', exact: true }).click();
  const dialog = await fillEvidence(page, 'Filterable practice artifact');
  await dialog.getByLabel('What did you make?').selectOption('code');
  await dialog.getByRole('button', { name: 'Save evidence', exact: true }).click();
  await navigate(page, 'Evidence vault');
  const artifact = page.getByRole('heading', { name: 'Filterable practice artifact', exact: true });
  await expect(artifact).toBeVisible();
  await page.getByRole('combobox', { name: 'Filter evidence by mission' }).selectOption('system');
  await expect(artifact).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Filter evidence by mission' }).selectOption('pattern');
  await page.getByRole('combobox', { name: 'Filter evidence by type' }).selectOption('diagram');
  await expect(artifact).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Filter evidence by type' }).selectOption('code');
  await expect(artifact).toBeVisible();
  await page.getByRole('textbox', { name: 'Search evidence', exact: true }).fill('not-a-matching-artifact');
  await expect(page.getByRole('heading', { name: 'No proof matches those filters.' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Search evidence', exact: true }).fill('Filterable');
  await expect(artifact).toBeVisible();
});

test('gentle capacity rebuilds an untouched plan to at most one short action', async ({ page }) => {
  await freshWorkspace(page);
  await navigate(page, 'Daily plan');
  await page.getByRole('group', { name: 'Daily capacity' }).getByRole('button', { name: 'Gentle', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Gentle', exact: true })).toHaveAttribute('aria-pressed', 'true');
  const state = await stored(page);
  const today = await page.evaluate(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  });
  expect(state.capacity).toBe('gentle');
  expect(state.plans[today].length).toBeLessThanOrEqual(1);
  expect(state.plans[today].reduce((sum, action) => sum + action.minutes, 0)).toBeLessThanOrEqual(15);
  expect(await page.getByRole('button', { name: 'Log progress', exact: true }).count()).toBeLessThanOrEqual(1);
  await page.reload();
  await expect(page.getByRole('button', { name: 'Gentle', exact: true })).toHaveAttribute('aria-pressed', 'true');
  expect((await stored(page)).plans[today]).toEqual(state.plans[today]);
});

test('opportunities can be created and moved between stages without changing mastery', async ({ page }) => {
  await freshWorkspace(page);
  const before = await stored(page);
  await navigate(page, 'Opportunity pipeline');
  await page.getByRole('button', { name: 'Add opportunity', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Open a new door.' });
  await dialog.getByLabel('Company', { exact: true }).fill('Example Test Workshop');
  await dialog.getByLabel('Role', { exact: true }).fill('Fictional Platform Engineer');
  await dialog.getByLabel('Job listing').fill('https://example.com/synthetic-role');
  await dialog.getByLabel('Next step').fill('Read the fictional role requirements.');
  await dialog.getByRole('button', { name: 'Add opportunity', exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Example Test Workshop', exact: true })).toBeVisible();
  const stage = page.getByRole('combobox', { name: 'Stage for Example Test Workshop', exact: true });
  await expect(stage).toHaveValue('Found');
  for (const value of ['Screening', 'Technical', 'Offer', 'Accepted']) {
    await stage.selectOption(value);
    await expect(stage).toHaveValue(value);
    expect((await stored(page)).opportunities[0].stage).toBe(value);
  }
  await page.getByRole('button', { name: 'Table', exact: true }).click();
  await expect(page.getByRole('row').filter({ hasText: 'Example Test Workshop' })).toContainText('Fictional Platform Engineer');
  const after = await stored(page);
  expect(after.missions).toEqual(before.missions);
  expect(after.evidence).toEqual([]);
  expect(after.events.filter(event => event.title.startsWith('Opportunity moved'))).toHaveLength(4);
  await page.reload();
  await expect(stage).toHaveValue('Accepted');
  await navigate(page, 'History');
  await page.getByRole('combobox', { name: 'Filter history by mission' }).selectOption('escape');
  await expect(page.getByRole('heading', { name: 'Opportunity moved from Offer to Accepted: Example Test Workshop', exact: true })).toBeVisible();
});

test('malformed JSON, incompatible schema, and broken references never overwrite data', async ({ page }) => {
  await freshWorkspace(page);
  const fileInput = page.getByLabel('Choose backup file', { exact: true });
  const before = await rawStored(page);
  const brokenReference = await stored(page);
  brokenReference.missions.pattern.checkpointId = 'nonexistent-checkpoint';
  const invalidBackups = [
    '{"schemaVersion":',
    JSON.stringify({ schemaVersion: 999 }),
    JSON.stringify(brokenReference),
  ];
  for (const content of invalidBackups) {
    await fileInput.setInputFiles({ name: 'invalid-backup.json', mimeType: 'application/json', buffer: Buffer.from(content) });
    await expect(page.getByRole('alert')).toContainText('Backup not imported. Your workspace is unchanged.');
    expect(await rawStored(page)).toBe(before);
  }
  await page.reload();
  expect(await rawStored(page)).toBe(before);
});

test('private export restores an exact snapshot only after replacement confirmation', async ({ page }) => {
  await freshWorkspace(page);
  const direction = page.getByLabel('What are you working toward?');
  await direction.fill('An explicitly saved synthetic direction.');
  await page.getByRole('button', { name: 'Save direction', exact: true }).click();
  const snapshot = await stored(page);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export backup', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^careerhq-backup-\d{4}-\d{2}-\d{2}\.json$/);
  const stream = await download.createReadStream();
  expect(stream).not.toBeNull();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  const content = Buffer.concat(chunks);
  expect(JSON.parse(content.toString())).toEqual(snapshot);
  await direction.fill('A newer synthetic direction to replace.');
  await page.getByRole('button', { name: 'Save direction', exact: true }).click();
  const newer = await rawStored(page);
  const upload = () => page.getByLabel('Choose backup file', { exact: true }).setInputFiles({
    name: 'private-synthetic-backup.json', mimeType: 'application/json', buffer: content,
  });
  await confirmNext(page, upload, false);
  expect(await rawStored(page)).toBe(newer);
  await confirmNext(page, upload);
  await expect(direction).toHaveValue(snapshot.objective);
  expect(await stored(page)).toEqual(snapshot);
  await page.reload();
  await expect(direction).toHaveValue(snapshot.objective);
});

test('readiness is explicit self-assessment and persists without checkpoint credit', async ({ page }) => {
  await freshWorkspace(page);
  const before = await stored(page);
  await navigate(page, 'Interview readiness');
  const coding = page.getByRole('group', { name: 'Coding patterns readiness', exact: true });
  await coding.getByRole('button', { name: 'Building', exact: true }).click();
  await expect(coding.getByRole('button', { name: 'Building', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await coding.getByRole('button', { name: 'Ready', exact: true }).click();
  const after = await stored(page);
  expect(after.readiness['Coding patterns']).toBe('ready');
  expect(after.missions).toEqual(before.missions);
  expect(after.evidence).toEqual([]);
  await page.reload();
  await expect(coding.getByRole('button', { name: 'Ready', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('another tab cannot silently overwrite a newer workspace', async ({ page, context }) => {
  await freshWorkspace(page);
  await navigate(page, 'Daily plan');
  const other = await context.newPage();
  await other.goto('./#/plan');
  await expect(other.getByRole('heading', { name: 'Make today manageable.' })).toBeVisible();
  await page.getByRole('button', { name: 'Gentle', exact: true }).click();
  const latest = await rawStored(page);
  await expect(other.getByRole('alert').filter({ hasText: /changed in another tab/ })).toBeVisible();
  await other.getByRole('button', { name: 'Deep focus', exact: true }).click();
  expect(await rawStored(page)).toBe(latest);
  await other.reload();
  await expect(other.getByRole('button', { name: 'Gentle', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(other.getByRole('alert')).toHaveCount(0);
});

test('focus timer can pause, resume, and reset without recording mastery', async ({ page }) => {
  await freshWorkspace(page);
  await navigate(page, 'Daily plan');
  await page.getByRole('button', { name: 'Gentle', exact: true }).click();
  await page.clock.install();
  const before = await rawStored(page);
  await expect(page.getByRole('timer')).toHaveText('10:00');
  await page.getByRole('button', { name: 'Start focus session', exact: true }).click();
  await page.clock.runFor(2000);
  await expect(page.getByRole('timer')).toHaveText('09:58');
  await page.getByRole('button', { name: 'Pause session', exact: true }).click();
  await page.clock.runFor(2000);
  await expect(page.getByRole('timer')).toHaveText('09:58');
  await page.getByRole('button', { name: 'Continue session', exact: true }).click();
  await page.clock.runFor(1000);
  await expect(page.getByRole('timer')).toHaveText('09:57');
  await page.getByRole('button', { name: 'Reset focus timer', exact: true }).click();
  await expect(page.getByRole('timer')).toHaveText('10:00');
  expect(await rawStored(page)).toBe(before);
});
