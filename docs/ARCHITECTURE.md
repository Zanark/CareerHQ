# Architecture

CareerHQ separates an authored roadmap from a person's changing browser workspace.
That makes a checkpoint resumable without treating activity, time spent, or a generated
plan as proof of capability.

## Boundaries

| Layer | Responsibility |
| --- | --- |
| `src/domain/catalog.ts`, `operations/*`, `legacyCatalog.ts` | Exact-version definitions: frozen v1/v2 references, DSA v3 append and independently adopted System v3 modules. Latest is per mission; saved versions never silently change. |
| `src/domain/types.ts` — `AppState` | Versioned runtime shape: progress, plans, evidence, history, readiness, opportunities. |
| `src/domain/engine.ts` — `parseState` | Schema and cross-reference validation before accepting persisted or imported state. |
| `src/domain/engine.ts` — `generatePlan`, `recordEvidence` | Capacity-bounded planning and evidence-gated, prerequisite-aware completion. |
| `src/useWorkspace.ts` — `useWorkspace` | Browser load/save, storage errors, date rollover, stale-tab detection, explicit replacement. |
| `src/usePracticeWorkspace.ts` | Separate in-memory tutorial data using the same schema and domain operations, without storage writes. |
| `src/tutorial/*` | Guided steps, state-derived completion gates, real-control highlighting and dialog-aware coaching. |
| `src/roadmaps/*` | Read-only mission tree and top-down checkpoint flowcharts, using accessible HTML nodes and locally drawn SVG connections. |
| `src/perspective/*`, `personalProofSchema.ts` | Personal evidence page: supplied past accomplishments and saved work. Strictly validated, confirmed history imports merge without changing checkpoint progress; no research or motivational filler. |
| `src/dsa/*`, `operations/dsaStudy*`, `dsaProblemSets.ts` | Read-only 50-section DSA practice reference, preserving source group/difficulty/URL/page and intentional repeats. No per-problem achievements are inferred. |
| `src/system/*` | The supplied System Design concept tree and readable/searchable browser, separate from versioned checkpoint progress. Source reading-route and grouping edges are not prerequisite gates. |
| `operations/systemPractice*`, `src/system/SystemPractice.tsx` | The 72-module System v3 source progression, 15 read-only cases, complete practice prompts and diagnostics. Context links connect the separate concepts source without inventing case prerequisites. |
| `src/roadmaps/useMapViewport.ts` | Shared fit/zoom, pointer panning, focus/centering, resize measurement and lifecycle cleanup for both tracked and concept maps. |
| `src/workspaceFile.ts` — `serializeWorkspace` | Identical compact JSON encoding for saved and exported state, with a shared 5 MiB UTF-8 limit also used by import. |
| `src/App.tsx`, `src/pages.tsx`, `src/dialogs.tsx` | Hash navigation, views, accessible forms, and user-confirmed commands. |
| `vite.config.ts` | `/CareerHQ/` asset base; Vite emits the static deployment into `dist`. |

Large DSA problem references and System practice summaries are emitted into a
separately cacheable static data chunk. They remain local bundled content, not a
runtime service or a request containing personal progress.

There is no backend, authentication layer, remote database, agent execution service,
or model call. Nine missions are represented; eight have documented tracking units and
competitive coding remains a planning forecast. A cross-mission link expresses a related
capability, not a lock.
Prerequisites within a mission control availability. Unspecified relationships follow the
documented order; explicit source branches can expose more than one available checkpoint,
but the progress record still holds exactly one current checkpoint.

The roadmap tree branches by the existing focus/background/planned settings, not invented
curriculum dependencies. Selecting a node only changes which flowchart is displayed.
The checkpoint decision/return loop illustrates the evidence-confirmation rule; it never
performs an unlock or assessment itself. [Mermaid reference](checkpoint-flow.mmd) documents
that small workflow; the website has no Mermaid runtime or external rendering dependency.

## Runtime flow

1. `loadWorkspace` reads `careerhq.workspace.v1` from localStorage. Missing data creates
   an empty v2 workspace; v1 data is strictly validated and safely normalized while its original
   roadmap positions remain active. Unreadable data produces recovery UI.
2. `parseState` checks the schema and roadmap version, identifiers, record limits,
   dates, URLs, prerequisites, and active/archived evidence and plan references.
3. `generatePlan` derives today's bounded actions from active, unblocked missions.
   Existing plans are retained; a new local calendar day gets its own plan, not a backlog.
4. User commands pass through `commit`/`replace`. A stale storage snapshot blocks
   saving and asks for a reload rather than silently overwriting a newer tab.
5. `recordEvidence` appends an artifact and a history event. Ordinary action progress
   leaves mastery unchanged. Explicit completion plus all criteria advances one checkpoint.

The roadmap is **configuration in source control**; progress is **runtime state in a browser**.
Changing the configuration is not a progress update. Future schema or roadmap revisions
need an explicit migration story; unsupported backups must not be silently coerced.

The DSA v3 definition declares its exact v2 prefix. Only verified identical
checkpoints can share evidence identity through that append lineage. Explicit
v2→v3 adoption preserves original records and carries genuine progress, while
new topics start unconfirmed. Completion totals deduplicate shared identities
across the active tracker and archives; other upgrades do not guess a mapping.
System v3 therefore archives v1/v2 on explicit adoption and starts its detailed
modules unconfirmed. Case references are deliberately outside checkpoint identity,
completion counts and evidence validation.

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

Tutorial cues share that portal: an animated opacity halo traces the current target,
and a transform-animated pointing hand indicates buttons. They track scroll/resize
without a continuous JavaScript animation loop, never intercept pointer events, and
point to Next after an action completes. Reduced motion retains static cues.

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
