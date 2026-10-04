# CareerHQ

Track current checkpoints, daily actions, and saved work.
Built with React, TypeScript, and Vite; data stays in your browser.

[Website](https://zanark.github.io/CareerHQ/) ·
[Architecture](docs/ARCHITECTURE.md) · [Themes](docs/THEMES.md) · [Privacy](docs/PRIVACY.md) ·
[Agent contract](docs/AGENT_CONTRACT.md)

## What this prototype does

- Keeps one current checkpoint per mission, with sequential unlocks.
- Separates **practice recorded** from **checkpoint completed**. Completion requires
  an artifact and explicit confirmation of every criterion; it is not AI-graded.
- Builds up to three daily actions. Gentle capacity offers at most one small action,
  within 15 minutes. Background missions keep their place.
- Provides evidence search/filtering, event history, a tab-local focus timer,
  an opportunity pipeline, and self-assessed interview readiness.
- Saves browser-local state and supports private JSON backup/export and replacement import.
- Provides an interactive **Tutorial** using a separate, temporary practice workspace.
  Try real controls without changing your progress, theme preference, or existing focus session.
- Uses **DeepSeaFoam** dark and **Harbor Daylight** light palettes. The header switch
  animates sunrise/sunset, remembers your choice, and respects reduced motion.

Seven missions have compact **prototype starter roadmaps**, not complete curricula:

| Mission | Focus |
| --- | --- |
| Pattern Forge | DSA |
| System Forge | System design |
| Escape Velocity | Career opportunities |
| Fabric Core | Service Fabric |
| Blueprint | Software architecture |
| Credential Forge | Certifications |
| Neural Edge | AI engineering |
| Algorithm Forge | Competitive programming — **planned**, no checkpoints yet |

This is a scoped, working prototype, **not the complete 101-page blueprint**.
There is no actual AI agent, cloud workspace, authentication, or multi-device sync.
The AI-engineering mission is a learning roadmap, not a connected AI service.

## Start using it

1. A new browser starts with **no assumed progress**. Existing workspaces, including
   earlier sample workspaces, are preserved rather than reset during an update.
2. Click **Tutorial** in the header or sidebar for the click-by-click practice walkthrough.
   Exit or finish to return to your real data and previous page. Practice exports are
   named `careerhq-tutorial-example-*`, not real backups.
3. Use Overview for daily actions and current checkpoints. Open a mission or Daily plan
   for its details, timer, capacity, and completion criteria.
4. Only select **This checkpoint is complete** when your artifact demonstrates
   every listed criterion. Saving ordinary progress does not unlock the next checkpoint.
5. Download private backups regularly. Importing a valid backup **replaces**, rather
   than merges, the current workspace after confirmation.

**Local is not encrypted.** Saved work is not a secure vault.
Other JavaScript on the same GitHub Pages origin can read the same localStorage.
Do not enter credentials, confidential material, or sensitive personal information.
Keep exported backups private. Read [Privacy](docs/PRIVACY.md) before entering real data.
Saving and exporting share a 5 MiB compact UTF-8 limit so accepted workspaces remain importable.
Larger writes fail without replacing the previous saved workspace.

## Persistence and changing machines

There are **no user profiles, accounts, streak counters, or automatic cloud sync**.
Progress uses localStorage for the current browser and site origin (scheme, domain,
and port), not a server account. Refreshing or installing a normal UI update at that
same origin retains compatible data. This UI revision keeps data format v1 unchanged.
Future schema or roadmap changes require explicit migrations, not silent resets.

To move devices or browsers, export a backup, transfer it privately, and import it
on the destination. Moving from the local preview to GitHub Pages also requires this:
they are different origins. Clearing site data or deleting a browser profile can
remove local progress. Export regularly; import replaces the destination after confirmation.

## Develop and verify

Use a current Node.js LTS release and npm.

```sh
npm ci
npm run dev
npm run validate
npm run test:e2e
npm run build
```

The development site is `http://127.0.0.1:5173/CareerHQ/`.
Playwright builds the production app and manages Vite preview on port `4173`, reusing
an existing server outside CI. Use a production preview at that address, not a dev server:
the browser tests should exercise the shipped content-security policy.
Local E2E tests use installed Microsoft Edge (`msedge`); CI uses Playwright
Chromium. If the required browser is genuinely absent, install it before testing:
`npx playwright install chromium` for CI, or install Microsoft Edge for local runs.
If port `4173` belongs to another process, leave it alone and set `CAREERHQ_E2E_PORT`
to a free port before running the tests (PowerShell: `$env:CAREERHQ_E2E_PORT='4174'`).

Browser coverage includes navigation and deep-link reload, desktop screenshots,
390px/320px layouts, local persistence, evidence/criteria, capacity, filters,
pipeline changes, backup replacement/rejection, and stale-tab protection.
Screenshots and failure traces are in `test-results`;
the HTML report is in `playwright-report`. Test contexts use only synthetic records.

## Static hosting

The Vite base is `/CareerHQ/`. Routes use hashes, such as
`/CareerHQ/#/mission/pattern`, so reloading a deep link does not require server rewrites.
`npm run build` produces `dist`; **only that build output belongs in the Pages artifact**.
Do not publish local backups, browser reports, source-reference documents, or context stores.

For the first deployment, a repository administrator must select **Settings → Pages →
Build and deployment → Source: GitHub Actions**. The `Validate and deploy CareerHQ`
workflow then validates, builds, runs browser coverage, and deploys on pushes to `main`.
It can also be run manually from Actions. If a run happened before Pages was enabled,
rerun it after selecting that source.

The production HTML carries a restrictive content-security policy and makes no external
runtime requests. Only Vite development mode removes that policy to allow its inline
hot-refresh preamble; the built static HTML retains the policy.

The Website link is the intended GitHub Pages address, not a deployment-status assertion.
See the repository's deployment workflow and its actual run result before claiming a release.

Implementation entry points: `src/App.tsx` (`Workspace`), `src/dialogs.tsx`
(`EvidenceDialog`), `src/useWorkspace.ts` (`useWorkspace`), `src/domain/catalog.ts`
(`missions`), and `src/domain/engine.ts` (`parseState`, `generatePlan`, `recordEvidence`).
