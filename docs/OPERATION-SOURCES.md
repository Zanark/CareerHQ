# Operation-document integration

The October operation pack contains ten PDFs under local `docs/OperationDocs`.
They remain excluded from Git and the deployed site. Public definitions contain only reusable
roadmap structure, source references, and explanatory limitations; personal save states,
biography, employer details, financial information and private notes are not seed data.

## Authority and mapping

The Operating System document defines shared coordination, evidence, privacy and versioning
rules. Its page 113 explicitly says textual mission handoffs govern interpretation of the
visual references on pages 114-119. Individual mission documents provide the domain content.
Later specific handoffs take precedence over conflicting older visual taxonomy.

| Mission | Source | Application mapping |
| --- | --- | --- |
| Pattern Forge | Handoff section 3 | HashMap Fundamentals and numbered 2.1-2.4; Complement Lookup and Grouping both require Frequency Counting. Other DSA techniques remain future references. |
| System Forge | Handoff section 3; OS page 115 | Seven stages with four named topic groups each. App IDs identify those groups, not invented source checkpoint numbers. |
| Fabric Core | Handoff section 3; OS page 117 | All 32 numbered checkpoints, 1.1-5.7, with source stage boundaries and supporting topics. |
| Blueprint | Handoff section 3; OS page 116 | Five phase outcomes as tracking milestones. The handoff does not establish fine-grained numbering beyond its named kickoff lesson. |
| Credential Forge | Handoff section 3; OS page 118 | Main Azure learning/capability milestones and Apply & Showcase. Data Engineering, AWS, and additional credentials remain optional references, not blockers. |
| Neural Edge | Dedicated roadmap pages 1-2; OS page 119 | Latest phases 0-6 and project ladder. No current personal progress is inferred from the source. |
| Escape Velocity | Handoff sections 3, 11 and 20 | One ongoing application/rehabilitation workflow; the five workstreams are parallel references, not a fabricated numbered ladder. |
| Algorithm Forge | Realistic Timeline pages 1-2 | Four planning phases and conditional time estimates. The document does not provide a detailed checkpoint contract, so tracking remains planned. |
| Side Income | Starting Search Sprint pages 1-2 | Ledger setup, ten-opportunity research, and top-five review. Completion means the documented starting sprint, not an income guarantee or a finished career mission. |

There are 87 tracked nodes across the ready missions. Topic-group and phase-level milestones
are labeled as such. Their evidence prompts adapt the source's explain/build/draw/review
requirements; they are not claims that every source supplied a complete exercise rubric.

## Important distinctions

- The older Pattern Forge visual uses a broad pattern taxonomy whose numbering differs from
  the later HashMap objective. They are not merged into one contradictory checkpoint sequence.
- Visual checkmarks and private progress ledgers are not imported as completed learning.
- Exactly one checkpoint is current. Several may be available at a documented branch;
  selecting another available checkpoint does not complete the previous one.
- Blueprint's phase outcomes and System Forge's topic boxes are legitimate source structure,
  but are not represented as invented official sub-checkpoint IDs.
- Certification names reflect the source material. Availability, retirement, costs and voucher
  claims have not been independently established here. Check the provider before scheduling an
  exam. App milestone completion does not issue or verify a credential.
- Forecast ranges are planning references, not promised outcomes.

## Safe data and roadmap upgrades

Data format v2 retains the `careerhq.workspace.v1` storage location for compatibility.
The strict v1 parser first validates against the frozen v1 catalog. It preserves existing
evidence, event, plan and opportunity values, labels original mission positions with their
roadmap version, and adds empty v2 collections plus the new background Side Income mission.
It grants no new progress.

Roadmap adoption requires a separate confirmation. The old four-field position, completion
IDs and blocker become a read-only archive; old evidence and plans still resolve against that
version. New checkpoints start unconfirmed. The current day's plan is retained until an
explicit refresh is possible. Backups include active and archived progress.

The v1 definitions remain in `src/domain/legacyCatalog.ts`; documented definitions are in
`src/domain/operations/`. `operationBuilder.ts` assigns version-qualified technical IDs and
retains actual source IDs separately. These are not uploads or copies of the private PDFs.

## New operational views

**Freelance ledger** implements the source columns and verdicts. Its research target and
five-item review brief do not submit applications or award checkpoint completion.

**Recall practice** records self-reported retrieval separately from mastery. Independent
reviews require the appropriate self-checks and spacing; a later weak review flags learning
without deleting completed checkpoints. This is not AI assessment.

**Operation documents** exposes sources, optional/future material, phase/topic granularity,
and the adoption flow. The tutorial uses isolated practice data for these surfaces too.
