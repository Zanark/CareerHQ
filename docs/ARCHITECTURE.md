# Architecture

CareerHQ separates an authored roadmap from a person's changing browser workspace.
That makes a checkpoint resumable without treating activity, time spent, or a generated
plan as proof of capability.

## Boundaries

| Layer | Responsibility |
| --- | --- |
| `src/domain/catalog.ts` — `missions` | Public mission configuration: stable IDs, starter checkpoints, criteria, and capability connections. |
| `src/domain/types.ts` — `AppState` | Versioned runtime shape: progress, plans, evidence, history, readiness, opportunities. |
| `src/domain/engine.ts` — `parseState` | Schema and cross-reference validation before accepting persisted or imported state. |
| `src/domain/engine.ts` — `generatePlan`, `recordEvidence` | Capacity-bounded planning and evidence-gated sequential completion. |
| `src/useWorkspace.ts` — `useWorkspace` | Browser load/save, storage errors, date rollover, stale-tab detection, explicit replacement. |
| `src/usePracticeWorkspace.ts` | Separate in-memory tutorial data using the same schema and domain operations, without storage writes. |
| `src/tutorial/*` | Guided steps, state-derived completion gates, real-control highlighting and dialog-aware coaching. |
| `src/workspaceFile.ts` — `serializeWorkspace` | Identical compact JSON encoding for saved and exported state, with a shared 5 MiB UTF-8 limit also used by import. |
| `src/App.tsx`, `src/pages.tsx`, `src/dialogs.tsx` | Hash navigation, views, accessible forms, and user-confirmed commands. |
| `vite.config.ts` | `/CareerHQ/` asset base; Vite emits the static deployment into `dist`. |

There is no backend, authentication layer, remote database, agent execution service,
or model call. Seven missions contain compact starter roadmaps; the eighth remains
planned. A dependency link expresses a related capability, not a cross-mission lock.
Checkpoint order within a mission is the actual prerequisite.

## Runtime flow

1. `loadWorkspace` reads `careerhq.workspace.v1` from localStorage. Missing data creates
   an empty workspace; existing data is preserved and unreadable data produces recovery UI.
2. `parseState` checks the schema and roadmap version, identifiers, record limits,
   dates, URLs, sequential progress, and evidence/plan references.
3. `generatePlan` derives today's bounded actions from active, unblocked missions.
   Existing plans are retained; a new local calendar day gets its own plan, not a backlog.
4. User commands pass through `commit`/`replace`. A stale storage snapshot blocks
   saving and asks for a reload rather than silently overwriting a newer tab.
5. `recordEvidence` appends an artifact and a history event. Ordinary action progress
   leaves mastery unchanged. Explicit completion plus all criteria advances one checkpoint.

The roadmap is **configuration in source control**; progress is **runtime state in a browser**.
Changing the configuration is not a progress update. Future schema or roadmap revisions
need an explicit migration story; unsupported backups must not be silently coerced.

## History and authority

Normal commands append history events, and existing evidence/events have no edit UI.
This is an **immutable audit record in the application workflow**, not a tamper-proof,
signed ledger. Someone with browser access can edit localStorage, and an explicitly
confirmed backup import or reset replaces the whole workspace.

The browser's current validated workspace is the local authority. An exported JSON file
is a snapshot, not a synchronization channel. Storage-event checks and a pre-write
snapshot comparison catch stale tabs; localStorage does not provide an atomic
multi-writer transaction. Use one editing tab at a time.

Focus-session state belongs to the app shell, so navigating between routes does
not cancel its deadline. A page reload ends that tab-local session. An evidence draft
left open across midnight keeps its text and becomes standalone checkpoint evidence;
it does not silently complete an action in yesterday's plan.

Completion criteria and interview readiness are self-attested. Neither proves mastery
externally. The focus timer belongs to the current tab and does not award progress.

## Practice isolation

The tutorial creates a fresh `AppState` only in `usePracticeWorkspace` memory. The real
storage hook remains mounted for conflict detection, but pauses automatic plan writes.
Actual forms and domain operations operate on the selected model; practice commits,
imports and resets never call the real model's writer. Exiting switches models rather
than writing an old snapshot back, so it cannot overwrite a newer tab's data.

The practice workspace has its own focus timer. The real timer remains mounted.
`useTheme(preview)` changes appearance without writing the preference; exit restores the
current stored preference. Workspace subtrees remount across the boundary so practice
dialogs and drafts cannot accidentally carry into a real save.

Coaching portals into an open native dialog so controls remain usable in the top layer.
Highlights follow actual controls, with state-derived Next gates and optional skips.
No artificial user achievement is recorded to make a step pass. Exported practice files
are explicitly labeled examples. Practice state itself is not saved across reloads.

## Delivery and verification

Hash routes keep deep links compatible with GitHub Pages project hosting. Deploy only
Vite's `dist` output; the source repository and private browser exports are not runtime
data sources. There is no service worker or guaranteed offline installation.

`src/domain/engine.test.ts` tests domain invariants. `tests/workspace.spec.ts` exercises
the production build through Vite preview, including its content-security policy,
real UI, and persistence in a browser. It rejects unexpected external requests and
console/page errors, and captures desktop/mobile screenshots. Playwright uses Edge
locally and Chromium in CI; screenshot captures are inspection artifacts, not
pixel-baseline visual regression assertions.

See [Privacy](PRIVACY.md) for storage risks and [Agent contract](AGENT_CONTRACT.md)
for boundaries on future automation.
