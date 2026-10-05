# Architecture

CareerOS separates an authored roadmap from a person's changing browser workspace.
That makes a checkpoint resumable without treating activity, time spent, or a generated
plan as proof of capability.

## Boundaries

| Layer | Responsibility |
| --- | --- |
| `src/domain/catalog.ts`, `operations/*`, `roadmapPacks/*`, `legacyCatalog.ts` | Exact-version definitions: frozen v1/v2 references, DSA v3 append, System v3 modules and seven independently adopted expanded v3 workbooks. Saved versions never silently change. |
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
| `src/domain/roadmapPacks/*`, `src/practice/*` | Typed outlines generate 377 new-edition checkpoints; seven lazy study chunks preserve 806 source units and 5,944 exercise occurrences. Reference/practice roles stay outside required checkpoint identity. |
| `src/roadmaps/useMapViewport.ts` | Shared fit/zoom, pointer panning, focus/centering, resize measurement and lifecycle cleanup for both tracked and concept maps. |
| `src/graph/*` | Read-only career graph model, stable 3D positions and Three.js rendering. Recorded statuses drive colors; context/archives are not silently promoted to current mastery. |
| `src/graph/careerOrbitModel.ts`, `careerOrbitTypes.ts` | Fifteen derived data views: exact saved-mission stages and six record/reference collections. Membership reuses real graph IDs, never new task identities or completion gates. |
| `src/domain/focusSession.ts`, focus operations in `engine.ts` | Optional, bounded focus-session event records, strict chronology/state/ID validation and conditional ownership checks before appending reports. |
| `src/focus/*` | One tab-local controller shared by compact/fullscreen timers, immediately persisted self-reports, retained history, and an inert calm-profile 3D backdrop. |
| `src/workspaceFile.ts` — `serializeWorkspace` | Identical compact JSON encoding for saved and exported state, with a shared 5 MiB UTF-8 limit also used by import. |
| `src/App.tsx`, `src/pages.tsx`, `src/dialogs.tsx` | Hash navigation, views, accessible forms, and user-confirmed commands. |
| `vite.config.ts` | `/CareerOS/` asset base matching the renamed repository; Vite emits the static deployment into `dist`. |

Large DSA problem references and System practice summaries are emitted into a
separately cacheable static data chunk. They remain local bundled content, not a
runtime service or a request containing personal progress.
The expanded outlines have their own cacheable chunk; full study prose loads only for
the selected workbook. Loading failures are explicit and offer a reload without
replacing workspace data. Search/filter/navigation remain read-only.
The Three.js renderer is loaded separately for the Career graph route. The named
node list remains available while loading or when WebGL is unavailable.
Only `graph.edges` supplies node-to-node line geometry. `careerSkillLinks.ts` is a
curated, exact-version registry of cross-mission comparisons, with a specific reason
and both checkpoint citations on each shared-skill edge. It never reads private prose,
changes the domain prerequisites, awards progress or substitutes an archived definition.
Multiple reasons for the same unordered pair share one edge. View filters may hide
lines, but the collapsible connection inspector retains reasons and explicit reveal actions.

`CareerGraph.orbits` is a read-only projection shared by home and the focus snapshot.
Mission progress includes only active saved-version checkpoints, not archived
completions or latest-version previews. Collection membership follows the graph's
record-inclusion rules, and collection groups do not get invented progress percentages.
Orbits are not added to `nodes`, `edges` or completion statistics. Their separate
tethers mean collection membership, with actual graph endpoints; filtered-out members
stay listed with explicit reveal actions instead of silently becoming "no records."

Data orbits revolve outside the enclosing data sphere, leaving work-node positions
fixed. Full-shell projection is the default; Clear center masks orbit paths but not
their useful anchors. The accessible ring index and inspector work without WebGL.
The animation pause control is independent of inspection and camera manipulation.
Cursor repulsion bends real edge interiors, not their endpoint identities or stored positions.
The optional periodic core heartbeat is separate from saved-status completion pulses.
Its source is the real core node, its three-second cadence uses active elapsed time,
and it never creates graph records or focus events. Focus framing targets that core;
the main graph retains its user-controlled camera.

There is no backend, authentication layer, remote database, agent execution service,
or model call. All nine latest missions now have documented tracking units, totaling
497 checkpoints. Historical forecast-only definitions remain frozen. A cross-mission link expresses a related
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
System and the seven expanded workbook editions therefore archive v1/v2 on explicit
adoption and start detailed modules unconfirmed. Case references are deliberately outside checkpoint identity,
completion counts and evidence validation.

`defineOperation` defaults to v2 to preserve every original definition and accepts an
explicit v3 for new books. Per-checkpoint citations override stage-level citations.
`documentedPackMission` includes only source units marked `checkpoint`; practice and
reference units remain visible in the library and complete map without invented gates.
The complete latest map is the default across missions; saved-version inspection is separate.

## History and authority

Normal commands append history events, and existing evidence/events have no edit UI.
This is an **immutable audit record in the application workflow**, not a tamper-proof,
signed ledger. Someone with browser access can edit localStorage, and an explicitly
confirmed backup import or reset replaces the whole workspace.

The browser's current validated workspace is the local authority. An exported JSON file
is a snapshot, not a synchronization channel. Storage-event checks and a pre-write
snapshot comparison catch stale tabs; localStorage does not provide an atomic
multi-writer transaction. Use one editing tab at a time.

The focus countdown belongs to the app shell, so navigating between routes or closing
the focus room does not cancel it. Its length is fixed once begun. A page reload does
not resume the old countdown, but its saved session/distraction records remain.
An unended record is not assumed completed. An evidence draft
left open across midnight keeps its text and becomes standalone checkpoint evidence;
it does not silently complete an action in yesterday's plan.

Completion criteria and interview readiness are self-attested. Neither proves mastery
externally. The focus timer belongs to the current tab and does not award progress.

### Focus records and failure boundaries

`focusSessions` is optional and absent in older workspace serialization. Each record
has an ID, start timestamp, planned seconds and ordered events. Pause, resume,
distraction, complete and reset events carry a globally unique ID, timestamp and
elapsed running-clock milliseconds. Source records can support later charts without
inventing an attention score or treating elapsed time as learning evidence.

Every report is committed before acknowledgment. The controller's monotonic clock
excludes pauses and writes only on events, not every tick. Timer reset retains
history. Failed saves do not increment counts; failed natural endings remain visibly
pending with an explicit retry. A replaced record stops its previous timer. The
record signature is checked inside the commit transaction, not only in a later effect.

The room snapshots the actual career graph when opened, so logging does not rebuild
the background on every press. Its focus profile uses the current full-shell geometry
and fine orange strokes, with subdued glow, fewer particles and slower but visible motion.
Labels and picking stay disabled. Ambient motion is independent of the countdown;
reduced motion starts it still and requires an explicit opt-in. Closing releases the scene.

## Practice isolation

The tutorial creates a fresh `AppState` only in `usePracticeWorkspace` memory. The real
storage hook remains mounted for conflict detection, but pauses automatic plan writes.
Actual forms and domain operations operate on the selected model; practice commits,
imports and resets never call the real model's writer. Exiting switches models rather
than writing an old snapshot back, so it cannot overwrite a newer tab's data.

The practice workspace has its own focus timer. The real timer remains mounted.
Real automatic focus-ending writes are deferred while practice is active; practice
events use only the temporary model. Exiting can then persist the real timer's own
ending without copying any practice reports.
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
