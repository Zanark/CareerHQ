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

## Review findings: structure is not a complete course

The document-to-code review confirmed the node counts above, but found narrower execution
requirements in several places. These are current limitations, not changes to the original
documents or claims that the omitted work has been completed.

| Area | What the tracker does not fully capture |
| --- | --- |
| Pattern Forge | Its short criteria do not track the complete copy/modify/solve progression or every supplied exercise. Completing the five-node HashMap track is not completing DSA. |
| System Forge | Broad topic groups can be completed with representative exercises. For example, the common-designs group does not require building every listed system. Supplementary visual details such as mock-interview feedback and AI-specific failure/timeout handling are not fully carried into the criteria. |
| Fabric Core | Node 4.4 covers application upgrades but omits cluster upgrades. The Stage 1 checklist ends with a working cluster, while the source milestone includes a running application. Node 3.6 accepts discussion preparation rather than requiring the discussion itself. |
| Fabric first-time setup | Explorer appears before environment setup in the supplied sequence. A new learner may need the setup instructions before performing the Explorer exercise; the tracker is not a self-contained installation tutorial. |
| Blueprint | The five phase reviews replace fine-grained execution. The named Hashmaps Foundation kickoff remains reference material rather than the current actionable checkpoint. |
| Neural Edge | Seven phase reviews are tracked; the nine-project ladder is reference-only. Some review criteria accept explanations or representative examples rather than a working implementation of every phase capability. |
| Credential Forge | Six milestones are not six earned certifications. Practical labs are not consistently required by the short criteria. Module 2 remains a reference rather than a separately tracked next lesson; free-first learning guidance is abbreviated. |
| Escape Velocity | The outcome workflow and parallel workstreams are present, but the full coached reconstruction/implementation/teach-back sequence is not an executable teaching flow. A single application is not mission completion. |
| Side Income | The source calls for classifying all ten researched leads; the checkpoint criteria explicitly require classification only of the selected five. Recurring-skill analysis and an actual coach evaluation are not fully captured by preparing a review brief. |
| Algorithm Forge | The four forecast phases and practice scenarios are preserved without invented checkpoints. Plateau/recovery guidance is abbreviated; ratings and time ranges are conditional estimates. |
| Shared learning model | Task duration estimates and bounded acceptance criteria are application-authored adaptations. Neither the timer nor a completed checklist measures subject mastery. |

Technical source locations: Pattern handoff section 11 and 19; System handoff sections
3, 7 and 10-11; Fabric handoff section 3; Blueprint handoff sections 4-5 and 19.
Implementation: `src/domain/operations/technical.ts`, `growth.ts`, and `operationBuilder.ts`.
Fabric Stage 2's displayed page reference points to the heading on physical page 2;
its numbered content continues on page 3.

Growth/execution source locations: Neural roadmap pages 1-2; Credential handoff sections
3, 11 and 19; Escape handoff sections 1-3 and 11; Side Income Sprint 3 and Mission Report;
Algorithm timeline pages 1-2. Implementation: `src/domain/operations/growth.ts` and
`execution.ts`. The Neural and Credential documents also give different certification
priorities; they are not one independently validated exam schedule.

The Operating System also describes capabilities beyond the present tracker: teaching
and coach assessment, recall-aware daily scheduling, role-specific readiness evaluation,
reusable multi-mission evidence, and external integrations. Those are not delivered merely
because the source-defined mission names and stages are present. The source's later-stage
capabilities are distinct from its smaller V1 tracking goal.

For actual use, begin with [the PDF walkthrough and one-session instructions](GUIDE.md#start-using-it).
Review the first action and criteria of one mission before treating a whole phase as completed.
