# CareerHQ guide

Track current checkpoints, daily actions, and saved work.
Built with React, TypeScript, and Vite; data stays in your browser.

[Website](https://zanark.github.io/CareerHQ/) ·
[Overview](../README.md) · [Architecture](ARCHITECTURE.md) · [Themes](THEMES.md) · [Privacy](PRIVACY.md) ·
[Agent contract](AGENT_CONTRACT.md) · [Operation sources](OPERATION-SOURCES.md)

## What this prototype does

- Keeps one current checkpoint per mission, with source-defined prerequisites.
- Uses a branching mission tree and top-down checkpoint flowcharts, with connected nodes,
  an evidence/criteria decision, and a practice loop. Includes responsive and printable views.
- Separates **practice recorded** from **checkpoint completed**. Completion requires
  an artifact and explicit confirmation of every criterion; it is not AI-graded.
- Builds up to three daily actions. Gentle capacity offers at most one small action,
  within 15 minutes. Background missions keep their place.
- Provides evidence search/filtering, event history, a tab-local focus timer,
  an opportunity pipeline, and self-assessed interview readiness.
- Saves browser-local state and supports private JSON backup/export and replacement import.
- Tracks freelance research and spaced recall separately from checkpoint completion.
- Preserves previous roadmap versions and requires confirmation before adopting new definitions.
- Provides an interactive **Tutorial** using a separate, temporary practice workspace.
  Try real controls without changing your progress, theme preference, or existing focus session.
- Uses **DeepSeaFoam** dark and **Harbor Daylight** light palettes. The header switch
  animates sunrise/sunset, remembers your choice, and respects reduced motion.

The supplied operation documents define nine missions. Tracking granularity is explicit:

| Mission | Documented tracking |
| --- | --- |
| Pattern Forge | 5 HashMap checkpoints; later techniques remain reference material |
| System Forge | 28 topic-group milestones across 7 stages |
| Escape Velocity | 1 ongoing workflow; application and rehabilitation workstreams are parallel |
| Fabric Core | 32 numbered checkpoints across 5 stages |
| Blueprint | 5 phase-level milestones; no invented fine-grained numbering |
| Credential Forge | 6 main milestones, with optional credentials kept outside hard gates |
| Neural Edge | 7 phase-level milestones and a 9-project reference ladder |
| Algorithm Forge | Planning forecast; detailed checkpoints remain **pending** |
| Side Income | 3-step starting search sprint and a private freelance ledger |

These are source-aligned tracking definitions, not complete courses or imported personal achievements.
The original PDFs and private progress/biographical sections are not published. See the source notes
for conflicts, granularity choices and unverified certification availability.
There is no actual AI agent, cloud workspace, authentication, or multi-device sync.
The AI-engineering mission is a learning roadmap, not a connected AI service.

## Start using it

1. A new browser starts with **no assumed progress**. Existing workspaces, including
   earlier sample workspaces, are preserved rather than reset during an update.
2. Click **Tutorial** in the header or sidebar for the click-by-click practice walkthrough.
   Exit or finish to return to your real data and previous page. Practice exports are
   named `careerhq-tutorial-example-*`, not real backups.
   The current target glows, buttons get a pointing hand, and completed actions point you
   to Next. Reduced-motion mode keeps the glow and hand static. Back, Skip and Exit remain available.
3. Use Overview for daily actions and current checkpoints. Open a mission or Daily plan
   for its details, timer, capacity, and completion criteria.
4. Only select **This checkpoint is complete** when your artifact demonstrates
   every listed criterion. Saving ordinary progress does not unlock the next checkpoint.
5. Download private backups regularly. Importing a valid backup **replaces**, rather
   than merges, the current workspace after confirmation.

**Local is not encrypted.** Saved work is not a secure vault.
Other JavaScript on the same GitHub Pages origin can read the same localStorage.
Do not enter credentials, confidential material, or sensitive personal information.
Keep exported backups private. Read [Privacy](PRIVACY.md) before entering real data.
Saving and exporting share a 5 MiB compact UTF-8 limit so accepted workspaces remain importable.
Larger writes fail without replacing the previous saved workspace.

## Persistence and changing machines

There are **no user profiles, accounts, streak counters, or automatic cloud sync**.
Progress uses localStorage for the current browser and site origin (scheme, domain,
and port), not a server account. Refreshing retains compatible data. This revision safely
converts v1 storage to data format v2 while keeping its previous roadmap positions, evidence,
plans and history. The storage key remains compatible with existing installations.

Adopting a documented roadmap is a separate, confirmed action on its mission or Operation
documents page. It archives the previous position and starts the new definition without
inventing completion credit. Saved work remains visible by its original version. Future
schema or roadmap changes require explicit migrations, not silent resets.

To move devices or browsers, export a backup, transfer it privately, and import it
on the destination. Moving from the local preview to GitHub Pages also requires this:
they are different origins. Clearing site data or deleting a browser profile can
remove local progress. Export regularly; import replaces the destination after confirmation.

## Develop and verify

Use a current Node.js LTS release and npm.

Text uses `rem` units and the shared `--type-scale` value in `src/typography.css`.
The current scale is **1.5×** the original typography, without page zoom. Keep new
font sizes relative to this scale; layouts should wrap rather than shrink the text.

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

## Deployment and troubleshooting

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

The application is at **https://zanark.github.io/CareerHQ/**, not the GitHub repository
file listing. Use the exact `/CareerHQ/` project path.

If the website is missing or appears outdated:

1. Open [repository Pages settings](https://github.com/Zanark/CareerHQ/settings/pages).
   An administrator must select **GitHub Actions** as the build source.
2. Open [Validate and deploy CareerHQ](https://github.com/Zanark/CareerHQ/actions/workflows/deploy.yml).
   Select the latest `main` run and inspect **both** `build` and `deploy`.
3. If the source setting was just corrected, use **Re-run all jobs** on that run, or
   **Run workflow** with branch `main`. A green build alone does not establish deployment.
4. If either job fails, open its failed step. Fix the reported error rather than clearing
   browser storage or rerunning blindly. The old "Read Pages configuration: Not Found"
   error means Pages needs the source setting above.
5. After both jobs succeed, open the website link and hard-refresh with **Ctrl+Shift+R**.
   Do not clear site data: that can delete your private progress.

Repository administration and Git push permissions can differ. A user who can push
may still need the owner to change Pages settings.

Implementation entry points: `src/App.tsx` (`Workspace`), `src/dialogs.tsx`
(`EvidenceDialog`), `src/useWorkspace.ts` (`useWorkspace`), `src/domain/catalog.ts`
(`missions`), and `src/domain/engine.ts` (`parseState`, `generatePlan`, `recordEvidence`).

## README screenshots

Images under `docs/images/` are real browser captures from a fresh workspace and the
isolated tutorial. They contain no personal progress. They illustrate appearance, not
evidence that any visitor has completed a checkpoint.
