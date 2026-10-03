# Privacy and local data

## What is public

The published static app ships authored starter roadmaps and clearly labeled,
fictional sample records only. Samples are demonstrations, not someone's personal
history. Private source documents and personal baseline information must not be
copied into the site, repository, screenshots, or tests.

The application has no login, cloud workspace, AI service, analytics integration,
or automatic upload. Hosting providers still receive normal page/asset requests.
Opening an external artifact or job link leaves the app and uses that destination's
privacy rules. “No app upload” is not a promise that web hosting has no access logs.

## What stays in this browser

Progress, evidence text and links, plans, history, readiness, and opportunities are
stored under `careerhq.workspace.v1` in **localStorage**. Evidence is text/links, not
an uploaded file archive. The focus timer is tab-local.

**localStorage is not encrypted or a secure vault.** The “Evidence vault” label
describes organization, not security. Anyone with suitable access to the browser,
extensions, developer tools, or same-origin JavaScript may read or modify it.

GitHub Pages project paths are **not separate origins**. For example, another site
running under `https://zanark.github.io/` can access storage used by `/CareerHQ/`.
A distinct storage key avoids accidental collisions; it is not access control.

Do not store passwords, tokens, credentials, confidential employer material, or
sensitive personal information. Prefer synthetic examples and non-sensitive summaries.
There is no multi-device sync, account recovery, or server backup. Clearing site data,
using private browsing, browser cleanup, or storage failure can lose local work.

## Backups, imports, and reset

- **Export** downloads plaintext JSON containing the whole local workspace. Keep it
  private and protect it yourself. Do not commit it, attach it to public issues, or
  put it in the deployed build.
- **Import** reads a selected file locally, checks schema/version and record references,
  and asks before **replacing the whole workspace**. It does not merge. Invalid input
  must fail without overwriting the existing workspace.
- **Reset** destroys the current local workspace after confirmation. Export first.
  Removing sample records is not the same as removing your saved backups from disk.
- **Recovery** does not silently overwrite unreadable storage. Download the original
  data before choosing a clean replacement.
- **Multiple tabs** can become stale. Reload the warned tab before editing; do not
  treat localStorage conflict checks as a synchronization service.

Validation prevents malformed application state, not malicious modification by
someone who controls the browser. An accepted backup is not cryptographic proof of
the events or achievements it describes.

Implementation references: `src/domain/catalog.ts` (`missions`),
`src/domain/engine.ts` (`createInitialState`, `parseState`),
`src/useWorkspace.ts` (`loadWorkspace`, `replace`, `downloadFile`),
`src/dialogs.tsx` (`EvidenceDialog`, `OpportunityDialog`), and
`src/pages.tsx` (`DataPage`).
