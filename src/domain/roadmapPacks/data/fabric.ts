import type { RoadmapPack } from '../types';

export default {
  "missionId": "fabric",
  "document": "Operation_Fabric_Core_Complete_Roadmap.pdf",
  "title": "Operation Fabric Core \u2014 Complete Service Fabric Mastery Roadmap",
  "pageCount": 112,
  "overview": "Five canonical stages develop Service Fabric platform judgment, implementation, evidence-based application, operational reasoning, and defensible architecture communication. Thirty-two checkpoints retain their original identifiers. Integrations, cases, diagnostics, capstones, twenty lab playbooks, and reference checklists supplement rather than replace that progression. Reading this pack does not establish mastery or authorize infrastructure changes.",
  "sourceNotes": [
    "Reviewed all 112 physical PDF pages and the entire 44,794-word extraction, including dotted contents entries; the extraction has another 560 whitespace tokens in its 112 added page markers.",
    "The source is version 1.0, dated 05 October 2026. Its main contents end at page 87; supplemental Appendices D\u2013H continue on physical pages 88\u2013112, with footer numbering restarted at 1.",
    "The source names mission handoffs and a roadmap-generation prompt as background sources. Those documents were not independently reviewed; their personal baseline and save-state assertions are not imported as progress.",
    "Public technical references are retained in the source-guidance unit. Their current availability and platform-specific behavior were not independently revalidated during this source review.",
    "All body descriptions are authored paraphrases. Short checkpoint, lab, case, and appendix identifiers preserve source provenance. Session estimates describe only a starting work period.",
    "PDF vector geometry and table cells were inspected, especially pages 12, 79\u201381, 109 and 111. Dense table headers overlap on page 81 and some cells overrun on page 109; text spans and column positions resolve their relationships. No raster images were present."
  ],
  "phases": [
    {
      "id": "foundation",
      "title": "Stage 1 \u2014 Foundation",
      "summary": "Checkpoints 1.1\u20131.6: explain platform fit and core entities, distinguish state, partitions and replicas, inspect Explorer, and establish a reproducible local application loop."
    },
    {
      "id": "core-development",
      "title": "Stage 2 \u2014 Core Development",
      "summary": "Checkpoints 2.1\u20132.6: build and test stateless and stateful services, package applications, communicate through logical identities, configure safely and study controlled failures."
    },
    {
      "id": "real-world-application",
      "title": "Stage 3 \u2014 Real-World Application",
      "summary": "Checkpoints 3.1\u20133.6: investigate authorized migration context, map dependencies and concepts, plan bounded changes, preserve evidence, and discuss validated design decisions."
    },
    {
      "id": "advanced-topics",
      "title": "Stage 4 \u2014 Advanced Topics",
      "summary": "Checkpoints 4.1\u20134.7: deepen reliable-state design and reason about availability, scaling, upgrades, observability, security and performance."
    },
    {
      "id": "interview-career",
      "title": "Stage 5 \u2014 Interview & Career",
      "summary": "Checkpoints 5.1\u20135.7: derive accurate case studies from evidence, explain and defend designs, communicate visually, practice interviews and retain platform knowledge."
    }
  ],
  "units": [
    {
      "id": "fabric-source-guidance",
      "sourceId": "Mission Charter",
      "title": "Source fidelity, continuity and reference guidance",
      "phaseId": "foundation",
      "role": "reference",
      "pages": [
        1,
        12,
        13,
        14,
        15,
        16,
        27,
        38,
        49,
        61,
        82,
        83,
        87,
        88
      ],
      "summary": "Understand the permanent five-stage curriculum, evidence-driven single-checkpoint workflow, supplementary lab boundary and public source basis without importing a personal baseline.",
      "action": "Read the progression and evidence rules; identify the next task from actual evidence, not the source save-state card.",
      "minutes": 20,
      "concepts": [
        "canonical checkpoint IDs",
        "single active checkpoint",
        "evidence ledger",
        "Done / Blocked / Next",
        "source fidelity",
        "unknowns",
        "public references"
      ],
      "sections": [
        {
          "heading": "Source and navigation boundaries",
          "paragraphs": [
            "The long-form curriculum expands the canonical roadmap rather than replacing it. Stage milestones progress from a local basic application to communicating services, validated migration reasoning, operational design and defensible architecture evidence.",
            "The main contents list the original 87-page sequence. The later lab playbooks and review appendices remain part of this 112-page document despite its earlier end marker."
          ],
          "items": [
            "A source-generated prompt is reference material, not an instruction to execute.",
            "Save-state examples on pages 1, 15 and 82 are not proof of current learner state.",
            "Appendix C preserves practical explanations, original numbering, real evidence, one active checkpoint and recovery without restarting unrelated learning."
          ]
        },
        {
          "heading": "Public technical references from page 83",
          "paragraphs": [
            "These source-supplied links are retained for later verification; this review does not certify current runtime behavior."
          ],
          "items": [
            "Architecture: https://learn.microsoft.com/en-us/azure/service-fabric/service-fabric-architecture",
            "Service Fabric overview: https://learn.microsoft.com/en-us/azure/architecture/reference-architectures/microservices/service-fabric",
            "Terminology: https://learn.microsoft.com/en-us/azure/service-fabric/service-fabric-technical-overview",
            "Reliable Services quick start: https://learn.microsoft.com/en-us/azure/service-fabric/service-fabric-reliable-services-quick-start",
            "Local deployment/removal: https://learn.microsoft.com/en-us/azure/service-fabric/service-fabric-get-started-with-a-local-cluster",
            "Well-Architected guidance: https://learn.microsoft.com/en-us/azure/well-architected/service-guides/azure-service-fabric"
          ]
        }
      ],
      "exercises": [],
      "criteria": [
        "Reference use does not change progress. Any update must point to actual evidence and unresolved blockers."
      ],
      "recovery": "Read the actual saved state and probe recall before choosing a bounded next task."
    },
    {
      "id": "fabric-1-1",
      "sourceId": "1.1",
      "title": "Why Service Fabric?",
      "phaseId": "foundation",
      "role": "checkpoint",
      "pages": [
        17,
        18,
        82
      ],
      "summary": "Judge platform fit from workload, state, availability, lifecycle, operations and migration constraints; defend both adoption and rejection.",
      "action": "Compare a stateless API and a stateful session workload before listing Service Fabric features.",
      "minutes": 45,
      "concepts": [
        "distributed application lifecycle",
        "stateful microservices",
        "placement",
        "failover",
        "application lifecycle management",
        "health",
        "testability",
        "containers",
        "mixed workloads",
        "ecosystem fit",
        "migration cost"
      ],
      "sections": [
        {
          "heading": "Decision model",
          "paragraphs": [
            "Ask which architectural and operational responsibilities the platform would remove from application code, deployment tooling and recovery procedures. Evaluate workload shape, state ownership, availability, deployment, operational constraints, team expertise, ecosystem fit and migration cost in that order.",
            "A stateless API using an external database has a different value proposition from partitioned state held near service logic with platform-managed replication."
          ],
          "items": [
            "Choosing a platform is a constraint trade-off, not a feature tally.",
            "State locality changes failure modes and ownership.",
            "Migration must preserve business behavior while clarifying platform responsibility."
          ]
        },
        {
          "heading": "Failure patterns and professional use",
          "paragraphs": [
            "A defensible architecture answer identifies conditions where Service Fabric is unsuitable."
          ],
          "items": [
            "Existing team use is not a workload justification.",
            "Stateful services still require data and consistency design.",
            "Orchestration alone does not establish high availability.",
            "Include migration effort, observability, security and team capability in the decision."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Unfamiliar workload decision",
          "level": "L6 Transfer",
          "task": "Evaluate an unfamiliar system for Service Fabric using workload, state, availability, deployment, operations and migration constraints.",
          "check": "Make the decision boundary explicit.",
          "page": 17
        },
        {
          "title": "Skeptical architect explanation",
          "task": "Explain the platform's purpose to a skeptical architect in 90 seconds.",
          "page": 18
        },
        {
          "title": "Four-workload matrix",
          "task": "Compare a stateless REST API, stateful session service, batch worker and containerized legacy process in a decision matrix.",
          "page": 18
        },
        {
          "title": "Transfer drill \u2014 familiarity bias",
          "level": "L6 Transfer",
          "task": "Diagnose a choice justified only by existing team use; replace that justification with workload evidence.",
          "page": 18
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared problem/assumptions/mechanism/evidence/failure/trade-off/role artifact for platform choice.",
          "page": 18
        },
        {
          "title": "Diagnostic 1",
          "task": "Which problem is platform selection solving here?",
          "page": 18
        },
        {
          "title": "Diagnostic 2",
          "task": "Separate the platform's guarantees from responsibilities it leaves to the application.",
          "page": 18
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence is needed before changing the platform or system?",
          "page": 18
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure would reveal an inadequate platform mental model?",
          "page": 18
        },
        {
          "title": "Diagnostic 5",
          "task": "Name an alternative and the constraint that would make you choose it.",
          "page": 18
        },
        {
          "title": "Active-card evidence task",
          "task": "Prepare a platform explanation, workload matrix, explicit do-not-choose scenario and trade-off defense; do not import the card's saved status.",
          "page": 82
        }
      ],
      "criteria": [
        "Apply the common five-dimension checkpoint gate.",
        "Defend both use and non-use decisions without feature recitation."
      ],
      "recovery": "Revisit the missing decision constraint; repair only the failed recall, reproduction, variation, transfer or failure dimension."
    },
    {
      "id": "fabric-1-2",
      "sourceId": "1.2",
      "title": "Core Concepts \u2014 Cluster, Nodes, Applications, Services",
      "phaseId": "foundation",
      "role": "checkpoint",
      "pages": [
        18,
        19,
        20
      ],
      "summary": "Distinguish logical definitions, runtime instances and placement to navigate the Service Fabric entity hierarchy during investigation.",
      "action": "Draw the entity hierarchy and separately mark deployment definitions and running instances.",
      "minutes": 45,
      "concepts": [
        "cluster",
        "node",
        "node type",
        "application type",
        "application instance",
        "service type",
        "named service",
        "partition",
        "replica",
        "instance",
        "package registration",
        "activation",
        "health aggregation"
      ],
      "sections": [
        {
          "heading": "Ownership and lifecycle",
          "paragraphs": [
            "A cluster supplies the runtime; nodes supply compute locations; applications group service types; named services are runtime instances of those types. Placement and logical containment are different relationships.",
            "Trace package, provision/register, create instance, placement, activation, health, then upgrade or removal. Investigate the unhealthy entity, its placement, originating package and required dependency."
          ],
          "items": [
            "Nodes identify failure locations; services identify logical workloads.",
            "Replica health can affect service health and then application health.",
            "A manifest is not the running service."
          ]
        },
        {
          "heading": "Diagnostic pitfalls",
          "paragraphs": [
            "Use the management model to investigate a real cluster rather than labeling every symptom a platform problem."
          ],
          "items": [
            "Do not confuse application type and instance.",
            "Do not start only with code logs when placement or activation has not succeeded.",
            "Keep cluster and node context when inspecting application failures."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Incident investigation tree",
          "level": "L6 Transfer",
          "task": "Given a brief report that an orders service is down on a node, draft the minimum investigation tree before opening logs.",
          "page": 18
        },
        {
          "title": "Hierarchy recall",
          "task": "Draw the Service Fabric hierarchy without notes, separating placement from logical definitions.",
          "page": 19
        },
        {
          "title": "Failed-replica tracing",
          "task": "Identify a failed replica's service, application, hosting node and likely diagnostic surfaces.",
          "page": 19
        },
        {
          "title": "Transfer drill \u2014 type versus instance",
          "task": "Correct an incident analysis that confuses an application type with its running instance.",
          "page": 19
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared evidence artifact for an entity/lifecycle investigation.",
          "page": 19
        },
        {
          "title": "Diagnostic 1",
          "task": "What investigation problem does the entity model solve?",
          "page": 19
        },
        {
          "title": "Diagnostic 2",
          "task": "Which conclusions does the model support, and which does it not establish?",
          "page": 19
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence should precede a change to an unhealthy entity?",
          "page": 19
        },
        {
          "title": "Diagnostic 4",
          "task": "Choose a failure exposing confusion between definitions and runtime entities.",
          "page": 19
        },
        {
          "title": "Diagnostic 5",
          "task": "Name an alternative investigation approach and when you would switch.",
          "page": 20
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain logical definitions and runtime instances accurately and use the hierarchy for navigation."
      ],
      "recovery": "Redraw the confused relationship from memory, then trace one failed replica through a minimal investigation."
    },
    {
      "id": "fabric-1-3",
      "sourceId": "1.3",
      "title": "Stateful vs Stateless Services",
      "phaseId": "foundation",
      "role": "checkpoint",
      "pages": [
        20,
        21
      ],
      "summary": "Choose authoritative state ownership, durability and recovery semantics from business invariants rather than framework labels.",
      "action": "Choose one business invariant and identify where its authoritative state survives a process loss.",
      "minutes": 45,
      "concepts": [
        "stateless instances",
        "stateful replicas",
        "external persistence",
        "state and compute co-location",
        "recovery semantics",
        "state ownership",
        "durability",
        "consistency",
        "transactions",
        "serialization",
        "hybrid services"
      ],
      "sections": [
        {
          "heading": "State ownership model",
          "paragraphs": [
            "A stateless instance is not the authoritative durable holder of business state. A stateful service owns state through a replicated model. Start with the invariant, then ask who stores and replicates truth when a process or node disappears.",
            "Compare a memory-only counter with a reliable-state counter across restart, node loss, replica movement and concurrent writes."
          ],
          "items": [
            "Stateful does not imply system-wide consistency.",
            "Stateless services can be highly available with reliable external persistence.",
            "State locality brings partition and replica responsibilities.",
            "Stateful code still needs transaction and serialization discipline."
          ]
        },
        {
          "heading": "Misconceptions and application",
          "paragraphs": [
            "Predict the recovery consequence of the chosen state model."
          ],
          "items": [
            "A working happy path does not justify mutable business state hidden inside a stateless instance.",
            "Stateful does not eliminate every need for a database.",
            "Identify an owner for each state item rather than assuming durability."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Two session-service designs",
          "level": "L6 Transfer",
          "task": "Design session management as stateless plus external storage and as a stateful service; compare latency, availability, consistency, operations and recovery.",
          "page": 20
        },
        {
          "title": "Counter lifecycle comparison",
          "task": "Compare memory-only and reliable-state counters during restart, node loss, replica movement and concurrent writes.",
          "page": 20
        },
        {
          "title": "Ten-workload classification",
          "task": "Classify ten workloads as stateless, stateful or hybrid and justify each.",
          "page": 21
        },
        {
          "title": "Externalize authoritative state",
          "task": "Convert a stateful sketch to a stateless design with external persistence and compare failures.",
          "page": 21
        },
        {
          "title": "Transfer drill \u2014 hidden mutable state",
          "task": "Analyze a stateless design that keeps mutable business state because its happy path works; explain the broken assumption.",
          "page": 21
        },
        {
          "title": "Checkpoint artifact",
          "task": "Create the shared evidence artifact for the state-ownership decision.",
          "page": 21
        },
        {
          "title": "Diagnostic 1",
          "task": "Which requirement is the state model addressing?",
          "page": 21
        },
        {
          "title": "Diagnostic 2",
          "task": "State the guarantees and limits of the chosen ownership model.",
          "page": 21
        },
        {
          "title": "Diagnostic 3",
          "task": "Which evidence is required before relocating state?",
          "page": 21
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure would expose an incorrect durability assumption?",
          "page": 21
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative state model would you choose under a changed constraint?",
          "page": 21
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Justify state ownership from requirements and predict restart/failover consequences."
      ],
      "recovery": "Re-establish the source of truth, then rerun only the failed state or recovery comparison."
    },
    {
      "id": "fabric-1-4",
      "sourceId": "1.4",
      "title": "Partitions and Replicas",
      "phaseId": "foundation",
      "role": "checkpoint",
      "pages": [
        22,
        23
      ],
      "summary": "Separate workload division from redundancy and reason about replica placement, hot partitions, quorum and correlated failure.",
      "action": "Sketch customer keys 0\u2013999 as range partitions with replica placements on a small cluster.",
      "minutes": 60,
      "concepts": [
        "partitioning",
        "partition key",
        "replica set",
        "primary",
        "secondary",
        "stateless instance",
        "logical shard",
        "quorum",
        "durability",
        "failure domain",
        "hot partition",
        "correlated failure"
      ],
      "sections": [
        {
          "heading": "Division versus copies",
          "paragraphs": [
            "Partitioning divides workload or state for distribution and scale. Replication preserves copies for availability and recovery. A stateful partition is a logical shard with a replica set; stateless services have instances.",
            "For customer IDs 0\u2013999, assign ranges to partitions and place their replicas. A node loss affects physical copies, not the definition of a logical shard."
          ],
          "items": [
            "Replica count does not imply unlimited throughput.",
            "Additional partitions increase coordination and operational overhead.",
            "Placement and failure-domain diversity matter alongside count."
          ]
        },
        {
          "heading": "Failure and design boundaries",
          "paragraphs": [
            "A useful explanation connects distribution, recovery and business semantics."
          ],
          "items": [
            "Partition count is not only a performance knob.",
            "Replication does not remove every data-loss risk; quorum and durability matter.",
            "Avoid shared failure-domain placement and ignored traffic hotspots."
          ]
        }
      ],
      "exercises": [
        {
          "title": "100-million-key transfer",
          "level": "L6 Transfer",
          "task": "Propose partitioning for 100 million keys with skewed traffic and identify hotspot monitoring.",
          "page": 22
        },
        {
          "title": "Toy keyspace failure",
          "task": "Partition customer IDs 0\u2013999 into ranges, place copies on a small cluster, and simulate a node loss to track available logical data.",
          "page": 22
        },
        {
          "title": "Five-node placement map",
          "task": "Draw partitions and replicas for a five-node cluster.",
          "page": 23
        },
        {
          "title": "Node blast radius",
          "task": "Identify the affected logical data and copies for each node failure.",
          "page": 23
        },
        {
          "title": "Transfer drill \u2014 partition-count shortcut",
          "task": "Challenge a partition count selected solely for performance; include availability and operational consequences.",
          "page": 23
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared evidence artifact for the partition and replica design.",
          "page": 23
        },
        {
          "title": "Diagnostic 1",
          "task": "Which different problems do partitioning and replication address?",
          "page": 23
        },
        {
          "title": "Diagnostic 2",
          "task": "What do partitioning and replication guarantee, and what remains unprotected?",
          "page": 23
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence precedes a partitioning or placement change?",
          "page": 23
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure exposes a weak understanding of replica placement?",
          "page": 23
        },
        {
          "title": "Diagnostic 5",
          "task": "Compare an alternative partitioning/replication choice and its switch condition.",
          "page": 23
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain distinct scale and availability effects without equating partitions, replicas and instances."
      ],
      "recovery": "Rebuild the shard/copy map and a failure matrix for the specific confused case, not the whole roadmap."
    },
    {
      "id": "fabric-1-5",
      "sourceId": "1.5",
      "title": "Service Fabric Explorer \u2014 Hands-on",
      "phaseId": "foundation",
      "role": "checkpoint",
      "pages": [
        23,
        24,
        25
      ],
      "summary": "Use Explorer's entity views as evidence for placement, activation, health, dependency, resource and upgrade hypotheses.",
      "action": "From a hypothetical unhealthy replica, trace its node, partition, sibling replicas, service and application.",
      "minutes": 45,
      "concepts": [
        "cluster view",
        "node health",
        "application health",
        "service health",
        "partition/replica state",
        "deployment state",
        "placement",
        "activation",
        "health reports",
        "resource pressure",
        "upgrade state"
      ],
      "sections": [
        {
          "heading": "Observation before repair",
          "paragraphs": [
            "Move from the symptom to the relevant cluster, node, application, service and partition/replica. An Error label is an observation, not a cause. Distinguish placement, activation, health reporting, dependencies, resources, upgrades and business logic.",
            "Trace an unhealthy replica through its hosting node, partition, sibling replicas and parent health reports."
          ],
          "items": [
            "Health is a point-in-time signal.",
            "Cross-entity context makes hypotheses testable.",
            "Capture evidence before restart or repair."
          ]
        },
        {
          "heading": "Operational pitfalls",
          "paragraphs": [
            "Explorer should produce a disciplined investigation, not a series of guesses."
          ],
          "items": [
            "Do not inspect only the application layer.",
            "A warning is not automatically harmless when traffic still succeeds.",
            "Cluster health remains relevant to service diagnosis."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Five-minute triage note",
          "level": "L6 Transfer",
          "task": "Use a hypothetical Explorer snapshot to write observations, hypotheses, missing evidence and a safe next action in five minutes.",
          "page": 23
        },
        {
          "title": "Unhealthy replica context",
          "task": "Trace node, partition, sibling replica, service and application health around one unhealthy replica.",
          "page": 24
        },
        {
          "title": "Explorer navigation",
          "task": "Navigate cluster, node, application and service views in a safe local or simulated context.",
          "page": 24
        },
        {
          "title": "Pre-change evidence",
          "task": "Describe what to record before changing anything.",
          "page": 24
        },
        {
          "title": "Transfer drill \u2014 restart-first response",
          "task": "Replace a restart-without-evidence response with a discriminating investigation plan.",
          "page": 24
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared evidence artifact for an Explorer-led investigation.",
          "page": 24
        },
        {
          "title": "Diagnostic 1",
          "task": "What operational problem does Explorer help solve?",
          "page": 24
        },
        {
          "title": "Diagnostic 2",
          "task": "What can its health views establish, and what can they not?",
          "page": 24
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence should precede intervention?",
          "page": 24
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure would expose superficial dashboard reading?",
          "page": 24
        },
        {
          "title": "Diagnostic 5",
          "task": "What other diagnostic surface would you use, and when?",
          "page": 24
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Convert health state into hypotheses using the full hierarchy."
      ],
      "recovery": "Return to a single replica snapshot, separate observations from hypotheses, and collect the missing evidence before any repair."
    },
    {
      "id": "fabric-1-6",
      "sourceId": "1.6",
      "title": "Development Environment Setup \u2014 SDK and Local Cluster",
      "phaseId": "foundation",
      "role": "checkpoint",
      "pages": [
        25,
        26
      ],
      "summary": "Establish a reproducible Windows SDK/runtime/tooling and local-cluster loop while distinguishing environment failures from application defects.",
      "action": "Record the required SDK, runtime and tool versions plus the smallest reproducible local setup sequence.",
      "minutes": 60,
      "concepts": [
        "Windows development",
        "SDK/tooling",
        "runtime versions",
        "local cluster",
        "application package",
        "deployment",
        "Service Fabric Explorer",
        "debugging",
        "known-good baseline",
        "clean removal"
      ],
      "sections": [
        {
          "heading": "Environment as a debugging asset",
          "paragraphs": [
            "A cheap, repeatable local environment makes lifecycle and failure states observable. Record exact tool versions and the minimal command or IDE sequence; setup is not an undocumented ritual.",
            "Use build, deploy, inspect, modify, redeploy, fault-test and clean-up as a reproducible loop. Version mismatch can resemble application failure."
          ],
          "items": [
            "Observe every deployment stage.",
            "Do not change several environment variables at once.",
            "Keep the initial known-good state.",
            "Local topology does not prove production behavior; include clean removal and redeployment."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Works-on-my-machine transfer",
          "level": "L6 Transfer",
          "task": "Prepare an evidence-first environment comparison checklist for a teammate's inconsistent Service Fabric result.",
          "page": 25
        },
        {
          "title": "Tiny application lifecycle",
          "task": "In a local sandbox, build and deploy a tiny application, inspect it, change one property, redeploy and remove it; deliberately break one endpoint or configuration and inspect reporting.",
          "page": 25
        },
        {
          "title": "Blank-machine setup checklist",
          "task": "Write a reproducible setup checklist starting from a blank machine.",
          "page": 26
        },
        {
          "title": "Clean deploy/remove cycle",
          "task": "Perform and record a clean local deployment and removal cycle.",
          "page": 26
        },
        {
          "title": "Transfer drill \u2014 multiple variables",
          "task": "Redesign an environment investigation that changes several variables simultaneously.",
          "page": 26
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared evidence artifact with exact setup versions, observations and scope limits.",
          "page": 26
        },
        {
          "title": "Diagnostic 1",
          "task": "Which learning and debugging problems does a local environment solve?",
          "page": 26
        },
        {
          "title": "Diagnostic 2",
          "task": "What does local success establish, and what does it not establish about production?",
          "page": 26
        },
        {
          "title": "Diagnostic 3",
          "task": "Which baseline evidence is needed before changing the environment?",
          "page": 26
        },
        {
          "title": "Diagnostic 4",
          "task": "Which setup failure would expose an unrepeatable workflow?",
          "page": 26
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative setup approach fits a changed constraint?",
          "page": 26
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Demonstrate a known-good local build/deploy/inspect/modify/redeploy/fault-test/cleanup loop.",
        "Stage 1 milestone: explain core entities and run a basic application locally."
      ],
      "recovery": "Compare versions and the known-good baseline, isolate environment from application failure, and repeat only the smallest failing local cycle."
    },
    {
      "id": "fabric-2-1",
      "sourceId": "2.1",
      "title": "Create Your First Service Fabric Application",
      "phaseId": "core-development",
      "role": "checkpoint",
      "pages": [
        28,
        29
      ],
      "summary": "Connect application packaging, manifests, registration, runtime instances and version identity through a minimal local application.",
      "action": "Inspect a minimal application's package and distinguish static metadata from runtime state.",
      "minutes": 60,
      "concepts": [
        "application manifest",
        "service manifest",
        "package layout",
        "application type",
        "application instance",
        "service type",
        "endpoints",
        "configuration",
        "registration",
        "activation",
        "versioning"
      ],
      "sections": [
        {
          "heading": "Package to runtime",
          "paragraphs": [
            "The application is a deployable contract describing service types, configuration, endpoints and versions, not merely a code project. The runtime turns that package into instances placed on nodes.",
            "A deployment is a distributed state transition. Package metadata and business code have different roles; a successful build does not imply a healthy deployment."
          ],
          "items": [
            "Inspect generated metadata before editing it.",
            "Registration of a type is different from creating an instance.",
            "Track version identity through upgrades.",
            "Vary one manifest property and compare the predicted and actual effect."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Build succeeds, health fails",
          "level": "L6 Transfer",
          "task": "Diagnose a package that builds successfully but never becomes a healthy application.",
          "page": 28
        },
        {
          "title": "Minimal application lifecycle",
          "task": "Create one local stateless service, deploy and locate it in Explorer, change configuration or version, and redeploy; record packaging and runtime differences.",
          "page": 28
        },
        {
          "title": "Lifecycle diagram",
          "task": "Draw package \u2192 registration \u2192 application instance \u2192 service \u2192 runtime process.",
          "page": 29
        },
        {
          "title": "Manifest modification",
          "task": "Predict and observe the deployment effect of changing one manifest setting.",
          "page": 29
        },
        {
          "title": "Transfer drill \u2014 generated files",
          "task": "Analyze the risks of editing generated files without identifying their deployment role.",
          "page": 29
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared evidence artifact for packaging and lifecycle behavior.",
          "page": 29
        },
        {
          "title": "Diagnostic 1",
          "task": "What problem does application packaging and lifecycle management solve?",
          "page": 29
        },
        {
          "title": "Diagnostic 2",
          "task": "Which deployment guarantees follow from a package, and which do not?",
          "page": 29
        },
        {
          "title": "Diagnostic 3",
          "task": "Which evidence should precede a package or runtime change?",
          "page": 29
        },
        {
          "title": "Diagnostic 4",
          "task": "What failure exposes confusion between successful build, registration and running health?",
          "page": 29
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative deployment approach would you consider under a changed constraint?",
          "page": 29
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Create, inspect, deploy and explain the minimal application without treating the template as magic."
      ],
      "recovery": "Locate the failing packaging-to-runtime transition and reproduce only that transition in a minimal local application."
    },
    {
      "id": "fabric-2-2",
      "sourceId": "2.2",
      "title": "Build a Stateless Service \u2014 REST API",
      "phaseId": "core-development",
      "role": "checkpoint",
      "pages": [
        29,
        30,
        31
      ],
      "summary": "Implement an externally callable API whose instances remain replaceable and whose dependency behavior is bounded by timeout, cancellation and retry semantics.",
      "action": "Draw a client-to-instance-to-dependency request path and mark its timeout and state ownership.",
      "minutes": 60,
      "concepts": [
        "listeners",
        "HTTP endpoints",
        "service instances",
        "configuration",
        "timeouts",
        "cancellation",
        "idempotency",
        "health endpoint",
        "structured logging",
        "retry amplification",
        "dependency errors"
      ],
      "sections": [
        {
          "heading": "Stateless behavior",
          "paragraphs": [
            "Any healthy eligible instance should serve a request. Separate transport from business logic and identify what must persist elsewhere through replacement or movement.",
            "A stateless class does not establish stateless behavior. Timeouts and cancellation participate in correctness; retries require idempotency and can amplify load."
          ],
          "items": [
            "Implement resource GET/POST, useful health reporting and structured logs.",
            "Do not hide mutable business state in an instance.",
            "Distinguish dependency failures instead of returning undifferentiated 500s.",
            "Health probes must not worsen an overloaded downstream service."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Burst plus slow dependency",
          "level": "L6 Transfer",
          "task": "Redesign API behavior for a request burst and slow dependency to prevent cascading failure.",
          "page": 29
        },
        {
          "title": "Catalog/task API",
          "task": "Build a local GET/POST catalog or task API with health and structured logs; introduce a dependency timeout and observe slowdown behavior and instance replacement.",
          "page": 30
        },
        {
          "title": "Request flow",
          "task": "Write the client, service-instance and dependency request flow.",
          "page": 30
        },
        {
          "title": "Timeout and cancellation",
          "task": "Add timeout and cancellation behavior to the local request path.",
          "page": 30
        },
        {
          "title": "Transfer drill \u2014 instance-local state",
          "task": "Find hidden mutable per-instance state and explain why replacement breaks the intended contract.",
          "page": 30
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared evidence artifact for API behavior under replacement and dependency failure.",
          "page": 30
        },
        {
          "title": "Diagnostic 1",
          "task": "Which workload problem does a stateless API solve?",
          "page": 30
        },
        {
          "title": "Diagnostic 2",
          "task": "What does statelessness guarantee, and what remains external?",
          "page": 30
        },
        {
          "title": "Diagnostic 3",
          "task": "What baseline and dependency evidence precede a behavior change?",
          "page": 30
        },
        {
          "title": "Diagnostic 4",
          "task": "What failure exposes hidden state or unsafe retry assumptions?",
          "page": 30
        },
        {
          "title": "Diagnostic 5",
          "task": "Name another service model and a requirement that would favor it.",
          "page": 30
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain API behavior under instance replacement and downstream failure."
      ],
      "recovery": "Reduce to one request and one dependency; repair the failed state, timeout, cancellation or retry assumption and retest."
    },
    {
      "id": "fabric-2-3",
      "sourceId": "2.3",
      "title": "Build a Stateful Service \u2014 Reliable Collections",
      "phaseId": "core-development",
      "role": "checkpoint",
      "pages": [
        31,
        32
      ],
      "summary": "Use reliable state with explicit keys, writes, transaction scope and serialization; distinguish platform replication from business consistency.",
      "action": "Define a two-record invariant before implementing a reliable dictionary transaction.",
      "minutes": 60,
      "concepts": [
        "Reliable Dictionary",
        "Reliable Queue",
        "Reliable State Manager",
        "transaction",
        "serialization",
        "replication",
        "schema evolution",
        "resource growth",
        "atomicity",
        "stateful lifecycle"
      ],
      "sections": [
        {
          "heading": "Reliable state semantics",
          "paragraphs": [
            "Reliable Collections integrate state with replication and stateful lifecycle, while the application still defines keys, business invariants, serialization and transaction boundaries.",
            "A local reference mutation is not automatically a replicated update. Write updated values back through the supported transactional model."
          ],
          "items": [
            "Observe a simple counter or key-value store across restart, then introduce related reads/writes.",
            "Durability does not cover arbitrary application state.",
            "Unbounded collections and values create resource pressure.",
            "Stored values need an evolution plan; cross-service consistency needs an explicit design."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Order and inventory boundary",
          "level": "L6 Transfer",
          "task": "Design consistent order-status and inventory-reservation changes; identify what can share a transaction and what crosses services.",
          "page": 31
        },
        {
          "title": "Stateful CRUD and restart",
          "task": "Build a local add/update/remove stateful store, transactionally update two related records, then restart or move it and verify state against configured lifecycle/replication assumptions.",
          "page": 31
        },
        {
          "title": "Reliable dictionary reproduction",
          "task": "Reproduce a basic reliable dictionary operation.",
          "page": 32
        },
        {
          "title": "Two-key modification",
          "task": "Modify the operation to update two related keys within a supported transaction.",
          "page": 32
        },
        {
          "title": "Transfer drill \u2014 reference mutation",
          "task": "Explain and correct a collection read whose returned object is mutated without writing the updated value back.",
          "page": 32
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared evidence artifact for reliable-state transactions and recovery.",
          "page": 32
        },
        {
          "title": "Diagnostic 1",
          "task": "Which state-management problem do Reliable Collections solve?",
          "page": 32
        },
        {
          "title": "Diagnostic 2",
          "task": "Define supported transactional guarantees and their limits.",
          "page": 32
        },
        {
          "title": "Diagnostic 3",
          "task": "What state/schema evidence precedes a change?",
          "page": 32
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure exposes an incorrect durability or transaction assumption?",
          "page": 32
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative store fits a different requirement?",
          "page": 32
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Build a small stateful service and explain reliable-state boundaries accurately."
      ],
      "recovery": "Restate the invariant and reproduce the smallest read/update/commit sequence; retest only the failing transaction or lifecycle dimension."
    },
    {
      "id": "fabric-2-4",
      "sourceId": "2.4",
      "title": "Service Communication \u2014 Inside and Outside the Cluster",
      "phaseId": "core-development",
      "role": "checkpoint",
      "pages": [
        33,
        34
      ],
      "summary": "Preserve logical service identity across changing placement and choose synchronous or asynchronous communication with bounded failure behavior.",
      "action": "Draw logical service resolution beside direct node addressing and identify the placement dependency.",
      "minutes": 60,
      "concepts": [
        "service naming",
        "location resolution",
        "logical service identity",
        "stable ingress",
        "request-response",
        "asynchronous messaging",
        "timeouts",
        "timeout propagation",
        "versioning",
        "retry budget",
        "idempotency",
        "delivery",
        "ordering"
      ],
      "sections": [
        {
          "heading": "Identity and indirection",
          "paragraphs": [
            "Callers should address a logical service rather than a permanent machine. Resolution provides placement indirection; external clients need stable ingress that hides cluster topology.",
            "Synchronous calls couple latency and availability. Messaging can decouple work but introduces delivery, ordering and consistency semantics."
          ],
          "items": [
            "Use bounded retries with budgets and idempotency.",
            "Propagate timeouts across the call path.",
            "Hard-coded node addresses break mobility.",
            "Transport success does not establish business success."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Three-service chain transfer",
          "level": "L6 Transfer",
          "task": "Redesign a three-service synchronous chain for a slow or unavailable downstream service.",
          "page": 33
        },
        {
          "title": "Frontend/backend movement",
          "task": "Build a local frontend calling a backend through logical identity; add timeout and bounded retries, then analyze backend movement.",
          "page": 33
        },
        {
          "title": "Call-chain boundaries",
          "task": "Draw a synchronous chain and identify every failure boundary.",
          "page": 34
        },
        {
          "title": "Queue substitution",
          "task": "Replace one synchronous call with a queue and enumerate the new delivery, ordering and consistency semantics.",
          "page": 34
        },
        {
          "title": "Transfer drill \u2014 node address",
          "task": "Explain the broken assumption in a hard-coded node address and restore logical identity.",
          "page": 34
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared evidence artifact for service resolution and communication choices.",
          "page": 34
        },
        {
          "title": "Diagnostic 1",
          "task": "Which distributed problem does logical service communication solve?",
          "page": 34
        },
        {
          "title": "Diagnostic 2",
          "task": "What does resolution guarantee and what must the caller still handle?",
          "page": 34
        },
        {
          "title": "Diagnostic 3",
          "task": "What call-path evidence should precede a communication change?",
          "page": 34
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure reveals placement coupling or unbounded retries?",
          "page": 34
        },
        {
          "title": "Diagnostic 5",
          "task": "Choose an alternative communication pattern and state its switch condition.",
          "page": 34
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Design around logical identity, bounded failures and explicit coupling."
      ],
      "recovery": "Trace one failing call through naming, placement and timeout budgets; revisit only the failed communication assumption."
    },
    {
      "id": "fabric-2-5",
      "sourceId": "2.5",
      "title": "Configuration and Settings",
      "phaseId": "core-development",
      "role": "checkpoint",
      "pages": [
        34,
        35,
        36
      ],
      "summary": "Treat configuration as a versioned runtime contract, distinguish secrets, and plan ownership, validation and rollback for changes.",
      "action": "Classify a setting as code, deploy-time parameter, runtime configuration, secret or operational control.",
      "minutes": 45,
      "concepts": [
        "configuration package",
        "parameters",
        "environment settings",
        "versioning",
        "secret handling",
        "safe rollout",
        "configuration drift",
        "defaults",
        "safe ranges",
        "rollback",
        "feature flags"
      ],
      "sections": [
        {
          "heading": "Configuration contract",
          "paragraphs": [
            "Environment-specific behavior should not require recompiling business logic. Each setting needs a category, owner and rollout path; secrets require separate handling.",
            "Endpoint, timeout and feature-flag changes can affect traffic, resource usage and consistency. Document which changes are safe dynamically and which require deployment."
          ],
          "items": [
            "Versioned differences reveal configuration drift.",
            "Do not embed environment identity in business code or commit secrets.",
            "Avoid changing multiple high-risk settings together.",
            "Document defaults, permitted ranges and rollback."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Configuration approval transfer",
          "level": "L6 Transfer",
          "task": "For a fictional production change request, identify evidence and rollback needed before approval; do not execute the change.",
          "page": 34
        },
        {
          "title": "Externalize sample settings",
          "task": "In a local application, externalize endpoint, timeout and feature flag; classify a secret separately and document deployment versus runtime change behavior.",
          "page": 35
        },
        {
          "title": "Ten-setting classification",
          "task": "Classify ten settings by code, deploy-time, runtime, secret or operational-control responsibility.",
          "page": 35
        },
        {
          "title": "Configuration diff checklist",
          "task": "Create a review checklist for a versioned configuration difference.",
          "page": 35
        },
        {
          "title": "Transfer drill \u2014 secret in source",
          "task": "Analyze why committing secrets is unsafe and describe the appropriate separate handling; never create a real secret-bearing commit.",
          "page": 35
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared evidence artifact for a safe configuration decision.",
          "page": 35
        },
        {
          "title": "Diagnostic 1",
          "task": "What problem does separating configuration from code solve?",
          "page": 35
        },
        {
          "title": "Diagnostic 2",
          "task": "What does versioned configuration establish and what does it not guarantee?",
          "page": 35
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence precedes a risky setting change?",
          "page": 35
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure exposes incorrect configuration ownership or secret handling?",
          "page": 35
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative configuration approach fits another constraint?",
          "page": 35
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain configuration as an operational contract rather than a collection of constants."
      ],
      "recovery": "Compare the known-good versioned configuration, isolate one setting and repair only the failed classification or validation step."
    },
    {
      "id": "fabric-2-6",
      "sourceId": "2.6",
      "title": "Local Testing, Fault Simulation and Debugging",
      "phaseId": "core-development",
      "role": "checkpoint",
      "pages": [
        36,
        37
      ],
      "summary": "Design hypothesis-led local fault experiments with business invariants, timestamps, user impact and verified recovery.",
      "action": "Write the baseline, injected fault, expected invariant and recovery evidence for one local experiment.",
      "minutes": 60,
      "concepts": [
        "fault injection",
        "restart",
        "node loss",
        "replica movement",
        "health",
        "logs",
        "precondition",
        "business invariant",
        "client-visible impact",
        "reconfiguration",
        "recovery correctness"
      ],
      "sections": [
        {
          "heading": "Failures as controlled experiments",
          "paragraphs": [
            "Happy-path tests do not establish distributed recovery. Define precondition, fault, expected invariant and observed recovery before an authorized local experiment.",
            "Compare stateless interruption and stateful replica/node disruption while recording traffic, health, timestamps and state behavior."
          ],
          "items": [
            "Inject one fault at a time after a baseline.",
            "A restarted process can still violate business correctness.",
            "Capture reconfiguration and client-visible impact.",
            "Observability must explain the recovery sequence."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Smallest revealing fault",
          "level": "L6 Transfer",
          "task": "For an unfamiliar distributed application, design the smallest safe experiment that tests recovery correctness.",
          "page": 36
        },
        {
          "title": "Stateless and stateful disruption",
          "task": "In a local sandbox, interrupt a stateless instance and a stateful replica/node in separate experiments; capture timestamps, traffic, state and recovery.",
          "page": 36
        },
        {
          "title": "Application fault matrix",
          "task": "Design a matrix of faults, expected invariants, observations and recovery for the application.",
          "page": 37
        },
        {
          "title": "Single-fault execution",
          "task": "Run one authorized local failure at a time and compare the result with the prediction.",
          "page": 37
        },
        {
          "title": "Transfer drill \u2014 no baseline",
          "task": "Repair a fault experiment plan that lacks a known-good baseline.",
          "page": 37
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared evidence artifact with actual recovery and remaining risk.",
          "page": 37
        },
        {
          "title": "Diagnostic 1",
          "task": "Which learning and correctness problems does fault testing solve?",
          "page": 37
        },
        {
          "title": "Diagnostic 2",
          "task": "What does the chosen experiment prove and leave untested?",
          "page": 37
        },
        {
          "title": "Diagnostic 3",
          "task": "What baseline evidence is needed before injection?",
          "page": 37
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure reveals an inadequate recovery model?",
          "page": 37
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative experiment would you choose under a different risk constraint?",
          "page": 37
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain and debug lifecycle transitions systematically.",
        "Stage 2 milestone: build, run and test communicating stateless and stateful services."
      ],
      "recovery": "Restore the known-good local state, identify the failed invariant or missing signal, and repeat only that bounded experiment."
    },
    {
      "id": "fabric-3-1",
      "sourceId": "3.1",
      "title": "Understand the Current Migration Architecture",
      "phaseId": "real-world-application",
      "role": "checkpoint",
      "pages": [
        39,
        40
      ],
      "summary": "Construct evidence-qualified current and target system models without inventing migration facts.",
      "action": "Create a one-page map with separate known, inferred and unknown fields using authorized sanitized inputs.",
      "minutes": 45,
      "concepts": [
        "current state",
        "target state",
        "migration boundary",
        "traffic flow",
        "state flow",
        "dependencies",
        "entry points",
        "data stores",
        "queues",
        "identity",
        "deployment surfaces",
        "ownership",
        "compatibility",
        "rollback"
      ],
      "sections": [
        {
          "heading": "Architecture as a validated model",
          "paragraphs": [
            "Begin with a factual map rather than a polished speculative diagram. Include entry points, services, stores, queues, dependencies, identities, deployment surfaces and failure boundaries; then show which runtime/lifecycle responsibilities change in the target.",
            "For every arrow identify direction, protocol, synchronous/asynchronous behavior, timeout assumptions and owner. Mark each component migrated, wrapped, replaced or merely connected."
          ],
          "items": [
            "Validate the diagram's hypotheses.",
            "Keep compatibility, failure and rollback paths visible.",
            "Do not conflate logical architecture and deployment topology.",
            "Data migration and ownership matter; migration is not a single atomic event."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Messy description transfer",
          "level": "L6 Transfer",
          "task": "Turn an unfamiliar migration description into a clear architecture map and the five questions that most reduce uncertainty.",
          "page": 39
        },
        {
          "title": "Annotated current/target model",
          "task": "Create the current/target map and annotate every arrow and component category from authorized sanitized evidence.",
          "page": 39
        },
        {
          "title": "Component inventory",
          "task": "Inventory components from supplied authorized work evidence; mark unsupported fields unknown.",
          "page": 40
        },
        {
          "title": "Traffic flow comparison",
          "task": "Draw current and target traffic flows without adding unsupported facts.",
          "page": 40
        },
        {
          "title": "Transfer drill \u2014 ownerless boxes",
          "task": "Identify missing ownership in a box diagram and formulate the evidence needed to resolve it.",
          "page": 40
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared artifact, distinguishing validated facts, inference and unknowns.",
          "page": 40
        },
        {
          "title": "Diagnostic 1",
          "task": "What uncertainty does migration modeling resolve?",
          "page": 40
        },
        {
          "title": "Diagnostic 2",
          "task": "What does the current evidence establish and not establish?",
          "page": 40
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence precedes a migration change?",
          "page": 40
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure would expose an incomplete architecture model?",
          "page": 40
        },
        {
          "title": "Diagnostic 5",
          "task": "Name an alternative migration boundary and a constraint favoring it.",
          "page": 40
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain validated components, flows, dependencies and remaining unknowns; generic exercises do not establish real migration experience."
      ],
      "recovery": "Return to the unvalidated arrow or component and gather authorized evidence rather than filling the gap."
    },
    {
      "id": "fabric-3-2",
      "sourceId": "3.2",
      "title": "Identify Migration Components \u2014 Services, Dependencies, Data",
      "phaseId": "real-world-application",
      "role": "checkpoint",
      "pages": [
        40,
        41,
        42
      ],
      "summary": "Expose state ownership and hidden coupling through a dependency matrix that supports migration order and rollback boundaries.",
      "action": "For one component, list its responsibility, state, callers, dependencies and unavailable behavior.",
      "minutes": 45,
      "concepts": [
        "service boundaries",
        "data ownership",
        "external stores",
        "queues",
        "configuration",
        "identity",
        "dependency graph",
        "shared database",
        "startup dependency",
        "certificates",
        "critical/optional/best-effort dependencies",
        "centrality",
        "migration sequencing"
      ],
      "sections": [
        {
          "heading": "Dependency inventory",
          "paragraphs": [
            "A matrix makes coupling visible across authentication, configuration, databases, brokers, APIs, files and caches. Boundaries should reflect responsibility and failure domains, not only organization charts.",
            "For each component record current technology, target Service Fabric role, state model, dependencies, health signal, deployment unit and rollback strategy. Keep unvalidated fields unknown."
          ],
          "items": [
            "Classify dependencies as critical, optional or best effort.",
            "Shared data can invalidate apparently independent migration.",
            "Account for startup, identity and certificate dependencies.",
            "Sequence migration by dependency direction and compatibility; document shared-infrastructure owners."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Shared-store migration order",
          "level": "L6 Transfer",
          "task": "Given one shared database and two message paths, propose and defend a migration order.",
          "page": 40
        },
        {
          "title": "Component dependency matrix",
          "task": "Populate current technology, target role, state, dependencies, health, deployment and rollback for authorized sanitized components.",
          "page": 41
        },
        {
          "title": "Dependency graph",
          "task": "Draw the component dependency graph with explicit ownership.",
          "page": 41
        },
        {
          "title": "Highest-centrality risk",
          "task": "Identify the most central component and assess its blast radius.",
          "page": 41
        },
        {
          "title": "Transfer drill \u2014 hidden shared state",
          "task": "Challenge an independent-service migration plan that retains shared-state coupling.",
          "page": 41
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared evidence artifact for component boundaries and dependency order.",
          "page": 41
        },
        {
          "title": "Diagnostic 1",
          "task": "What migration risk does explicit decomposition address?",
          "page": 41
        },
        {
          "title": "Diagnostic 2",
          "task": "What can a dependency inventory establish and not guarantee?",
          "page": 41
        },
        {
          "title": "Diagnostic 3",
          "task": "Which evidence is needed before moving a component?",
          "page": 41
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure exposes a missing dependency?",
          "page": 41
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative decomposition or order fits a changed constraint?",
          "page": 41
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain migration components and their dependency relationships explicitly."
      ],
      "recovery": "Inspect the specific missing dependency or ownership field and redraw only the affected graph segment."
    },
    {
      "id": "fabric-3-3",
      "sourceId": "3.3",
      "title": "Map Concepts to Work",
      "phaseId": "real-world-application",
      "role": "checkpoint",
      "pages": [
        42,
        43
      ],
      "summary": "Translate observed tasks into Service Fabric mechanisms, distributed-systems principles, risk and defensible evidence without inflating ownership.",
      "action": "Map one authorized task to concept, distributed principle, risk, evidence and an accurate role statement.",
      "minutes": 45,
      "concepts": [
        "task-to-concept mapping",
        "hypothesis",
        "evidence",
        "decision record",
        "failure mode",
        "lesson",
        "before/after state",
        "ownership",
        "interview story"
      ],
      "sections": [
        {
          "heading": "Six-column learning bridge",
          "paragraphs": [
            "Use task \u2192 Service Fabric concept \u2192 distributed-systems principle \u2192 risk \u2192 evidence \u2192 interview story. Completing an operational step alone is not evidence of understanding its mechanism.",
            "Deployment configuration, communication, replicas, health, upgrades and container hosting are example categories, not claims that the learner has performed them."
          ],
          "items": [
            "One task may touch several concepts.",
            "Record before/after evidence when available.",
            "Explain why the change mattered and what could fail.",
            "Do not replace reasoning with screenshots or claim the whole team's result."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Read-only operational transfer",
          "level": "L6 Transfer",
          "task": "Convert a generic operational task into a distributed-systems learning exercise without changing production.",
          "page": 42
        },
        {
          "title": "Three-task mapping example",
          "task": "Take three authorized migration tasks and map each through the six-column model; do not claim absent work evidence.",
          "page": 42
        },
        {
          "title": "Three mappings",
          "task": "Create three task-to-concept mappings with their evidence and ownership limits.",
          "page": 43
        },
        {
          "title": "Why and what-if prompts",
          "task": "For each mapping, write one why question and one what-if question.",
          "page": 43
        },
        {
          "title": "Transfer drill \u2014 steps-only note",
          "task": "Turn a procedural-only note into a mechanism, risk and evidence explanation.",
          "page": 43
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared artifact with exact contribution and interpreted evidence.",
          "page": 43
        },
        {
          "title": "Diagnostic 1",
          "task": "What learning gap does task-to-concept mapping close?",
          "page": 43
        },
        {
          "title": "Diagnostic 2",
          "task": "What competence does the evidence show, and what does it not show?",
          "page": 43
        },
        {
          "title": "Diagnostic 3",
          "task": "Which evidence should precede a change linked to this task?",
          "page": 43
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure would expose steps-only understanding?",
          "page": 43
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative mechanism would you consider under different constraints?",
          "page": 43
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Convert exposure into reusable understanding and evidence, not unsupported achievement claims."
      ],
      "recovery": "Add the missing mechanism, why, failure or evidence interpretation to one mapping and retest that dimension."
    },
    {
      "id": "fabric-3-4",
      "sourceId": "3.4",
      "title": "Actual Tasks \u2014 Code, Configuration, Deployment, Troubleshooting",
      "phaseId": "real-world-application",
      "role": "checkpoint",
      "pages": [
        44,
        45
      ],
      "summary": "Plan and explain authorized changes using hypotheses, bounded impact, validation, rollback and post-change learning.",
      "action": "Draft a pre-change hypothesis, expected effect, validation signal and rollback trigger without executing it.",
      "minutes": 45,
      "concepts": [
        "change planning",
        "deployment",
        "troubleshooting",
        "rollback",
        "logs",
        "health",
        "blast radius",
        "customer impact",
        "recovery time",
        "root cause",
        "prevention",
        "partial rollout"
      ],
      "sections": [
        {
          "heading": "Controlled operational reasoning",
          "paragraphs": [
            "Separate symptom, hypothesis, evidence, cause, fix and prevention. In deployment, distinguish artifact creation, package registration, application upgrade, health validation and rollback.",
            "A sanitized change record contains component, change class, risk, evidence, result and lesson. Logs explain the sequence of events; architecture explains why those events were possible."
          ],
          "items": [
            "Prepare rollback before change, not after failure.",
            "Measure user impact and recovery time, not only process success.",
            "Do not hide broken dependencies with retries.",
            "Repair the failure mechanism rather than symptoms; document unsuccessful paths too."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Mixed-version recovery transfer",
          "level": "L6 Transfer",
          "task": "For a partially successful deployment with mixed versions, define a safe investigation and recovery sequence.",
          "page": 44
        },
        {
          "title": "Sanitized change record",
          "task": "Prepare a bounded task record with hypothesis, effect, validation, rollback and lessons; actual execution requires separate authorization.",
          "page": 44
        },
        {
          "title": "Pre-change checklist",
          "task": "Write the checklist needed before the proposed change.",
          "page": 45
        },
        {
          "title": "Blameless reconstruction",
          "task": "Reconstruct an incident from authorized or synthetic evidence, separating symptom, hypothesis, cause, fix and prevention.",
          "page": 45
        },
        {
          "title": "Transfer drill \u2014 no validation",
          "task": "Repair a production-change proposal that has no validation signal; do not execute it.",
          "page": 45
        },
        {
          "title": "Checkpoint artifact",
          "task": "Create the shared evidence artifact including impact, recovery and exact role.",
          "page": 45
        },
        {
          "title": "Diagnostic 1",
          "task": "What risk does controlled change planning address?",
          "page": 45
        },
        {
          "title": "Diagnostic 2",
          "task": "Which outcomes can validation establish and which remain uncertain?",
          "page": 45
        },
        {
          "title": "Diagnostic 3",
          "task": "Which evidence is required before intervention?",
          "page": 45
        },
        {
          "title": "Diagnostic 4",
          "task": "What failure would expose a weak rollback or diagnostic model?",
          "page": 45
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative change or recovery approach fits a different constraint?",
          "page": 45
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain authorized operational work as controlled distributed-systems engineering; plans alone are not execution evidence."
      ],
      "recovery": "Return to the missing validation, invariant or rollback decision, repair it in a bounded plan or local test, and retain unrelated progress."
    },
    {
      "id": "fabric-3-5",
      "sourceId": "3.5",
      "title": "Document Learnings",
      "phaseId": "real-world-application",
      "role": "checkpoint",
      "pages": [
        45,
        46,
        47
      ],
      "summary": "Preserve architecture, decisions, diagnostics and evidence in layered notes that another engineer can use without relying on folklore.",
      "action": "Convert one authorized task note into a one-page explanation with context, evidence and a failure path.",
      "minutes": 45,
      "concepts": [
        "architecture note",
        "decision record",
        "runbook",
        "failure analysis",
        "diagram",
        "evidence log",
        "one-page recall summary",
        "technical deep dive",
        "interview derivation"
      ],
      "sections": [
        {
          "heading": "Layered documentation",
          "paragraphs": [
            "Use a short recall summary, a detailed technical note, an operational runbook and an evidence-derived interview story. A useful note reconstructs the system model and diagnostic path.",
            "Capture context, problem, constraints, options, decision, implementation, validation, failure modes, monitoring, rollback and lessons for a future attempt."
          ],
          "items": [
            "Diagrams need explanatory assumptions; narratives need evidence.",
            "Runbooks require decision points, not only commands.",
            "Connect official guidance to the actual model instead of copying it.",
            "Exclude confidential details, include failure paths and correct stale notes."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Reusable documentation transfer",
          "level": "L6 Transfer",
          "task": "Create a template usable for a new Service Fabric feature, incident or migration decision.",
          "page": 45
        },
        {
          "title": "Complete lesson record",
          "task": "Write the context-to-rollback lesson record for one meaningful authorized or synthetic scenario.",
          "page": 46
        },
        {
          "title": "One-page architecture summary",
          "task": "Convert one task note into a one-page architecture summary.",
          "page": 46
        },
        {
          "title": "Incident-to-runbook conversion",
          "task": "Convert an incident analysis into a runbook with decision points.",
          "page": 46
        },
        {
          "title": "Transfer drill \u2014 copied documentation",
          "task": "Revise copied guidance into an evidence-linked explanation of the system and its limits.",
          "page": 46
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared artifact with sanitized evidence and precise ownership.",
          "page": 46
        },
        {
          "title": "Diagnostic 1",
          "task": "What future learning or operational burden does the note reduce?",
          "page": 46
        },
        {
          "title": "Diagnostic 2",
          "task": "What can the documentation support and what remains unverified?",
          "page": 46
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence should be recorded before changing the system?",
          "page": 46
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure would reveal a happy-path-only runbook?",
          "page": 46
        },
        {
          "title": "Diagnostic 5",
          "task": "What other documentation structure would better fit another audience or constraint?",
          "page": 46
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Produce documentation useful for operations, learning and interviews without overstating contribution."
      ],
      "recovery": "Repair the missing assumption, evidence link, decision point or failure path in the existing note."
    },
    {
      "id": "fabric-3-6",
      "sourceId": "3.6",
      "title": "Discuss Design Decisions with the Team",
      "phaseId": "real-world-application",
      "role": "checkpoint",
      "pages": [
        47,
        48
      ],
      "summary": "Investigate design rationale through intent, constraints, mechanisms, rejected alternatives and failure questions.",
      "action": "Write your current hypothesis and five rationale questions before an authorized design discussion.",
      "minutes": 45,
      "concepts": [
        "intent",
        "constraints",
        "mechanism",
        "why",
        "alternatives",
        "failure behavior",
        "operational burden",
        "ownership",
        "decision record",
        "rejected alternatives"
      ],
      "sections": [
        {
          "heading": "Questions that expose rationale",
          "paragraphs": [
            "Ask why a choice fits its constraints, what alternatives were rejected and what would reverse it. Form a hypothesis first, record how discussion changes the model, and summarize the trade-off afterward.",
            "Local optimization can impose system-wide cost. Operational simplicity is a legitimate objective, not a substitute for analysis."
          ],
          "items": [
            "Understand requirements before implementation details.",
            "Current architecture is not universally optimal.",
            "Standard practice is not itself a rationale.",
            "Update the model when evidence contradicts it."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Reconstruct unwritten rationale",
          "level": "L6 Transfer",
          "task": "Reconstruct a decision record from observable constraints and stakeholder questions without treating inference as fact.",
          "page": 47
        },
        {
          "title": "Discussion learning loop",
          "task": "Prepare a hypothesis, record changes during discussion and write the resulting trade-off paragraph.",
          "page": 47
        },
        {
          "title": "Four-layer question examples",
          "task": "Ask why stateful was selected, what drove partitioning, how failover preserves the invariant and what happens if a dependency fails during upgrade.",
          "page": 47
        },
        {
          "title": "Five architecture questions",
          "task": "Prepare five architecture questions for one authorized task.",
          "page": 48
        },
        {
          "title": "Failure-behavior question",
          "task": "Ask one question specifically about failure behavior and record the supported answer.",
          "page": 48
        },
        {
          "title": "Transfer drill \u2014 premature implementation",
          "task": "Reframe implementation-first questions around requirements and constraints.",
          "page": 48
        },
        {
          "title": "Checkpoint artifact",
          "task": "Create the shared artifact for a validated design rationale and its ownership boundary.",
          "page": 48
        },
        {
          "title": "Diagnostic 1",
          "task": "What uncertainty does rationale-focused discussion resolve?",
          "page": 48
        },
        {
          "title": "Diagnostic 2",
          "task": "Which conclusions are supported and which remain assumptions?",
          "page": 48
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence should precede a design change?",
          "page": 48
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure would expose a missing rationale?",
          "page": 48
        },
        {
          "title": "Diagnostic 5",
          "task": "Which alternative and changed constraint would reverse the decision?",
          "page": 48
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Participate through intent, constraints, alternatives and failure reasoning.",
        "Stage 3 milestone requires validated work evidence and explainable architecture/decisions, not invented migration history."
      ],
      "recovery": "Revisit the unanswered rationale with a focused evidence question and update only the affected model."
    },
    {
      "id": "fabric-4-1",
      "sourceId": "4.1",
      "title": "Reliable Collections \u2014 Deep Dive",
      "phaseId": "advanced-topics",
      "role": "checkpoint",
      "pages": [
        50,
        51
      ],
      "summary": "Select reliable-state structures from access patterns, transaction scope, state growth, schema evolution and recovery cost.",
      "action": "Compare keyed order state with queued pending work and mark their transaction boundary.",
      "minutes": 60,
      "concepts": [
        "transaction scope",
        "enumeration",
        "serialization",
        "memory pressure",
        "queue semantics",
        "schema evolution",
        "Reliable Dictionary",
        "Reliable Queue",
        "idempotency",
        "hot keys",
        "external database",
        "cache"
      ],
      "sections": [
        {
          "heading": "State as an architectural subsystem",
          "paragraphs": [
            "Reliable Collections fit stateful-service integration, not every database need. Dictionaries support keyed state and point access; queues support ordered work consumption. Decide whether a dedicated data platform is a better owner.",
            "Large state affects resources and recovery; poor partitioning creates bottlenecks. Design growth and version evolution alongside the initial schema."
          ],
          "items": [
            "Do not assume cross-service transactions without a supporting design.",
            "Avoid unbounded large values.",
            "Match structure to workload, not API familiarity.",
            "Define idempotent operations and transaction limits for order state plus pending work."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Four-store transfer",
          "level": "L6 Transfer",
          "task": "For four workload patterns, choose among reliable collection, external database, cache and queue; defend each.",
          "page": 50
        },
        {
          "title": "Dictionary plus queue design",
          "task": "Design order state in a reliable dictionary and pending work in a reliable queue; define transactions and idempotency.",
          "page": 50
        },
        {
          "title": "Ten-million-order schema",
          "task": "Design a collection schema for 10 million orders, considering growth and evolution.",
          "page": 51
        },
        {
          "title": "Hot-key identification",
          "task": "Identify hot keys and their impact on the collection design.",
          "page": 51
        },
        {
          "title": "Transfer drill \u2014 universal database",
          "task": "Challenge the assumption that Reliable Collections should replace every data platform.",
          "page": 51
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared artifact for workload-driven state design.",
          "page": 51
        },
        {
          "title": "Diagnostic 1",
          "task": "What workload problem does the chosen reliable-state structure solve?",
          "page": 51
        },
        {
          "title": "Diagnostic 2",
          "task": "What are its transaction, lifecycle and persistence limits?",
          "page": 51
        },
        {
          "title": "Diagnostic 3",
          "task": "Which schema, access and growth evidence precedes a change?",
          "page": 51
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure exposes a poor reliable-state design?",
          "page": 51
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative state platform fits a changed constraint?",
          "page": 51
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Reason about reliable state as an architectural subsystem, including its limits."
      ],
      "recovery": "Revisit the failed access-pattern, scope, growth or evolution assumption and test the smallest relevant state case."
    },
    {
      "id": "fabric-4-2",
      "sourceId": "4.2",
      "title": "Fault Tolerance and High Availability",
      "phaseId": "advanced-topics",
      "role": "checkpoint",
      "pages": [
        51,
        52,
        53
      ],
      "summary": "Evaluate end-to-end availability using failure domains, replica placement, quorum, external dependencies, client behavior and recovery correctness.",
      "action": "List process, node, correlated-domain and dependency failures for one request path.",
      "minutes": 60,
      "concepts": [
        "failure domains",
        "replica sets",
        "reconfiguration",
        "quorum",
        "node loss",
        "correlated failure",
        "storage durability",
        "network health",
        "client retries",
        "recovery time",
        "recovery correctness"
      ],
      "sections": [
        {
          "heading": "End-to-end availability",
          "paragraphs": [
            "Availability depends on placement, network, storage, clients and dependencies, not just replica count. For process, node, applicable rack/zone, dependency, configuration and deployment failures, identify detection, containment, recovery and user effect.",
            "Reason through one lost node in a three-replica service, then two correlated failures and an external dependency. Internal replication cannot protect the entire request path."
          ],
          "items": [
            "Correlated failure can defeat independent-failure assumptions.",
            "Recovery speed and correctness are different dimensions.",
            "Client retries can alter effective failure behavior.",
            "Test the exact scenario instead of assuming immediate recovery."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Replicated state, single dependency",
          "level": "L6 Transfer",
          "task": "Find the true availability bottleneck in an application with replicated state and one external dependency.",
          "page": 51
        },
        {
          "title": "Three-replica failure walkthrough",
          "task": "Analyze one-node loss, two correlated failures and an unavailable external dependency for a three-replica stateful service.",
          "page": 52
        },
        {
          "title": "Availability failure matrix",
          "task": "Build the full process/node/domain/dependency/configuration/deployment failure matrix.",
          "page": 52
        },
        {
          "title": "Qualitative blast radius",
          "task": "Assess the affected services and user behavior for each failure.",
          "page": 52
        },
        {
          "title": "Transfer drill \u2014 replica counting",
          "task": "Correct an availability claim based on replica count without placement analysis.",
          "page": 52
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared artifact for end-to-end availability and recovery.",
          "page": 52
        },
        {
          "title": "Diagnostic 1",
          "task": "Which failure risks does the availability design address?",
          "page": 52
        },
        {
          "title": "Diagnostic 2",
          "task": "What remains outside its guarantees?",
          "page": 52
        },
        {
          "title": "Diagnostic 3",
          "task": "Which placement, dependency and client evidence precedes a change?",
          "page": 52
        },
        {
          "title": "Diagnostic 4",
          "task": "Which correlated failure would expose a shallow availability model?",
          "page": 52
        },
        {
          "title": "Diagnostic 5",
          "task": "Compare an alternative resilience design and the condition favoring it.",
          "page": 52
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain availability through failure domains, dependencies, recovery and clients."
      ],
      "recovery": "Rebuild the failure matrix for the overlooked domain or dependency and verify the relevant invariant."
    },
    {
      "id": "fabric-4-3",
      "sourceId": "4.3",
      "title": "Scaling and Load Balancing",
      "phaseId": "advanced-topics",
      "role": "checkpoint",
      "pages": [
        53,
        54
      ],
      "summary": "Scale the actual unit of parallelism while accounting for skew, partition keys, placement constraints and shared bottlenecks.",
      "action": "Identify the workload's unit of parallelism and compare per-partition traffic with total capacity.",
      "minutes": 60,
      "concepts": [
        "horizontal scaling",
        "partition distribution",
        "resource load",
        "placement constraints",
        "hot partitions",
        "capacity",
        "traffic skew",
        "ordering",
        "locality",
        "repartitioning",
        "caching",
        "request coalescing",
        "workload separation"
      ],
      "sections": [
        {
          "heading": "Bottleneck-driven scaling",
          "paragraphs": [
            "More nodes cannot necessarily help a hot partition, inflexible placement or a serial downstream dependency. Start with independent work units, state division, traffic skew and the limiting component.",
            "For twenty partitions with one handling 60% of traffic, compare repartitioning, key redesign, caching, request coalescing, workload separation and capacity changes against correctness and operating cost."
          ],
          "items": [
            "Data distribution and traffic distribution can differ.",
            "Scale the constrained component, not merely the easiest one.",
            "Include CPU, memory, network and storage saturation.",
            "Do not improve throughput by violating ordering or consistency."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Ordering under skew",
          "level": "L6 Transfer",
          "task": "Design partitioning for skewed traffic with strict per-customer ordering; explain the scaling ceiling.",
          "page": 53
        },
        {
          "title": "Twenty partitions, 60% hotspot",
          "task": "Compare the six stated mitigation options for one of twenty partitions receiving 60% of requests.",
          "page": 53
        },
        {
          "title": "Metric-based hotspot diagnosis",
          "task": "Use per-partition metrics to diagnose a hotspot.",
          "page": 54
        },
        {
          "title": "Two key alternatives",
          "task": "Propose two partition-key alternatives and compare business semantics and distribution.",
          "page": 54
        },
        {
          "title": "Transfer drill \u2014 add nodes",
          "task": "Explain why adding nodes alone may not fix a hot partition.",
          "page": 54
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared scaling-decision artifact with evidence and trade-offs.",
          "page": 54
        },
        {
          "title": "Diagnostic 1",
          "task": "Which bottleneck does the scaling proposal address?",
          "page": 54
        },
        {
          "title": "Diagnostic 2",
          "task": "What can the change improve and what remains constrained?",
          "page": 54
        },
        {
          "title": "Diagnostic 3",
          "task": "Which load and placement evidence precedes scaling?",
          "page": 54
        },
        {
          "title": "Diagnostic 4",
          "task": "What failure would expose a bad key or capacity assumption?",
          "page": 54
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative scaling design fits another constraint?",
          "page": 54
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Connect workload shape, partitioning, placement and bottlenecks in the decision."
      ],
      "recovery": "Return to the per-partition measurements and retest only the failed distribution or ordering assumption."
    },
    {
      "id": "fabric-4-4",
      "sourceId": "4.4",
      "title": "Rolling Upgrades",
      "phaseId": "advanced-topics",
      "role": "checkpoint",
      "pages": [
        55,
        56
      ],
      "summary": "Plan application and cluster upgrades as compatibility-preserving distributed transitions with health gates and viable rollback.",
      "action": "Build a two-version compatibility matrix before planning a rollout.",
      "minutes": 60,
      "concepts": [
        "application upgrade",
        "cluster upgrade",
        "upgrade domains",
        "health policies",
        "version coexistence",
        "rollback",
        "compatibility",
        "schema evolution",
        "irreversible change",
        "staged rollout"
      ],
      "sections": [
        {
          "heading": "Mixed-version correctness",
          "paragraphs": [
            "The hard part of a rolling upgrade is preserving behavior while versions coexist. Follow preconditions, start, change a subset, observe health, continue and complete or roll back.",
            "For an API contract change, first make behavior backward-compatible, then roll out the server and then clients. Define signals that detect semantic regressions, not only live processes."
          ],
          "items": [
            "Backward compatibility enables safe rollout.",
            "Irreversible schema/data changes complicate rollback.",
            "Simultaneous unrelated changes increase uncertainty.",
            "Define rollback triggers before starting and consider concurrent dependency changes."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Breaking-response transfer",
          "level": "L6 Transfer",
          "task": "Redesign a breaking response release so old and new service versions coexist safely.",
          "page": 55
        },
        {
          "title": "Server/client staging",
          "task": "Plan a backward-compatible API change, server rollout, client rollout and regression health signals.",
          "page": 55
        },
        {
          "title": "Two-version matrix",
          "task": "Create a compatibility matrix for old/new callers and servers.",
          "page": 56
        },
        {
          "title": "Rollback criteria",
          "task": "Write observable rollback criteria and identify irreversible schema constraints.",
          "page": 56
        },
        {
          "title": "Transfer drill \u2014 mixed-version break",
          "task": "Diagnose a contract-breaking mixed-version rollout and revise its staging.",
          "page": 56
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared compatibility and rollout evidence artifact.",
          "page": 56
        },
        {
          "title": "Diagnostic 1",
          "task": "Which availability and change problem do rolling upgrades address?",
          "page": 56
        },
        {
          "title": "Diagnostic 2",
          "task": "What does rolling deployment guarantee and what compatibility work remains?",
          "page": 56
        },
        {
          "title": "Diagnostic 3",
          "task": "Which version, health and data evidence precedes an upgrade?",
          "page": 56
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure exposes an unsafe rollback assumption?",
          "page": 56
        },
        {
          "title": "Diagnostic 5",
          "task": "Name an alternative release strategy and the constraint favoring it.",
          "page": 56
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain upgrade safety as compatibility and risk management, not binary replacement."
      ],
      "recovery": "Revisit the failing version pair or health gate; repair the release plan before any authorized retry."
    },
    {
      "id": "fabric-4-5",
      "sourceId": "4.5",
      "title": "Health Monitoring and Diagnostics",
      "phaseId": "advanced-topics",
      "role": "checkpoint",
      "pages": [
        56,
        57,
        58
      ],
      "summary": "Correlate Service Fabric health with request, dependency and resource telemetry to reconstruct incidents and guide decisions.",
      "action": "Map one request across services and storage, identifying correlation IDs, latency, errors and saturation.",
      "minutes": 45,
      "concepts": [
        "health reports",
        "aggregation",
        "logs",
        "metrics",
        "traces",
        "correlation",
        "request IDs",
        "error classes",
        "saturation",
        "recovery evidence",
        "four golden signals",
        "alert actionability"
      ],
      "sections": [
        {
          "heading": "Signals with explicit meaning",
          "paragraphs": [
            "Health compresses observations; it does not independently establish cause or user correctness. Define normal, degraded and actionable conditions and the evidence needed for each.",
            "Map client \u2192 service A \u2192 service B \u2192 state store with correlation identifiers, timings, error classes, saturation and recovery signals. Telemetry must support time-ordered reconstruction."
          ],
          "items": [
            "Green health can coexist with user-visible failure or poor performance.",
            "Red health does not necessarily locate the cause.",
            "Dashboards should support operational decisions.",
            "Avoid low-value alerts, uncorrelated logs, secret-bearing telemetry and retries counted only as successes.",
            "Health checks must not generate harmful load or mask failures."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Green health, intermittent 503s",
          "level": "L6 Transfer",
          "task": "Design an investigation when users receive intermittent 503s while service health stays green.",
          "page": 56
        },
        {
          "title": "End-to-end observability map",
          "task": "Specify correlation, timings, error classes, saturation and recovery evidence for client \u2192 A \u2192 B \u2192 store.",
          "page": 57
        },
        {
          "title": "Incident dashboard specification",
          "task": "Design a dashboard around investigation decisions rather than arbitrary numbers.",
          "page": 57
        },
        {
          "title": "Four golden signals",
          "task": "Define four golden signals appropriate to the workload and explain their use.",
          "page": 57
        },
        {
          "title": "Transfer drill \u2014 alert noise",
          "task": "Analyze excessive low-value alerts and identify the missing actionable signals.",
          "page": 57
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared artifact with interpreted health and telemetry evidence.",
          "page": 57
        },
        {
          "title": "Diagnostic 1",
          "task": "What uncertainty does the observability model resolve?",
          "page": 57
        },
        {
          "title": "Diagnostic 2",
          "task": "What does health report, and what does it not guarantee?",
          "page": 57
        },
        {
          "title": "Diagnostic 3",
          "task": "Which telemetry should be captured before intervention?",
          "page": 57
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure exposes weak correlation or misleading health?",
          "page": 57
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative diagnostic signal would you choose under changed constraints?",
          "page": 57
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Use health and telemetry as evidence in distributed troubleshooting."
      ],
      "recovery": "Reconstruct one request timeline and add only the missing discriminating signal before retesting."
    },
    {
      "id": "fabric-4-6",
      "sourceId": "4.6",
      "title": "Security \u2014 Authentication, Certificates, Secrets and Network Boundaries",
      "phaseId": "advanced-topics",
      "role": "checkpoint",
      "pages": [
        58,
        59
      ],
      "summary": "Model layered identity and trust, credential ownership, least privilege and safe certificate lifecycle as security and availability concerns.",
      "action": "Map one service's trust boundaries and credential owners without collecting secret values.",
      "minutes": 45,
      "concepts": [
        "cluster security",
        "application identity",
        "authentication",
        "authorization",
        "certificates",
        "secrets",
        "network segmentation",
        "least privilege",
        "trust chain",
        "expiry",
        "rotation",
        "management plane"
      ],
      "sections": [
        {
          "heading": "Layered trust model",
          "paragraphs": [
            "Map client-to-cluster, node-to-node, service-to-service, application-to-dependency and operator-to-management boundaries. Each credential needs an owner, scope, rotation method, failure behavior and observability.",
            "Authentication establishes identity; authorization limits actions. Segmentation reduces blast radius but does not replace identity. Expiry and rotation are availability failure modes as well as security concerns."
          ],
          "items": [
            "Do not share credentials among unrelated services.",
            "Avoid unmanaged long-lived credentials.",
            "Test rotation and its recovery path.",
            "Do not open broad network access merely to simplify troubleshooting."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Post-rotation failure transfer",
          "level": "L6 Transfer",
          "task": "Separate identity, trust-chain, configuration and connectivity hypotheses after a certificate rotation.",
          "page": 58
        },
        {
          "title": "API/database/service threat model",
          "task": "Model an API that calls a database and another Service Fabric service; identify authentication, authorization, secret storage, network controls and rotation.",
          "page": 58
        },
        {
          "title": "Trust-boundary diagram",
          "task": "Draw the system's trust boundaries with explicit identities and owners.",
          "page": 59
        },
        {
          "title": "Rotation plan",
          "task": "Design a credential/certificate rotation, validation and rollback plan; do not perform live rotation.",
          "page": 59
        },
        {
          "title": "Transfer drill \u2014 credential lifetime",
          "task": "Analyze unmanaged long-lived credentials and define ownership and lifecycle controls.",
          "page": 59
        },
        {
          "title": "Checkpoint artifact",
          "task": "Create the shared security/availability artifact without secret or confidential values.",
          "page": 59
        },
        {
          "title": "Diagnostic 1",
          "task": "What risks does the layered security model address?",
          "page": 59
        },
        {
          "title": "Diagnostic 2",
          "task": "What does each control establish and not guarantee?",
          "page": 59
        },
        {
          "title": "Diagnostic 3",
          "task": "Which non-secret evidence precedes a trust or access change?",
          "page": 59
        },
        {
          "title": "Diagnostic 4",
          "task": "Which rotation or boundary failure exposes a weak security model?",
          "page": 59
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative control fits another security/availability constraint?",
          "page": 59
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain layered security and its availability trade-offs."
      ],
      "recovery": "Revisit the failing trust boundary and distinguish identity, chain, configuration and network evidence before a bounded authorized action."
    },
    {
      "id": "fabric-4-7",
      "sourceId": "4.7",
      "title": "Performance Tuning \u2014 Bottlenecks and Trade-offs",
      "phaseId": "advanced-topics",
      "role": "checkpoint",
      "pages": [
        60,
        61
      ],
      "summary": "Investigate measured latency and saturation by hop, then validate a single optimization without hiding correctness trade-offs.",
      "action": "Define workload, percentile, concurrency and per-hop latency before proposing an optimization.",
      "minutes": 60,
      "concepts": [
        "latency",
        "throughput",
        "CPU",
        "memory",
        "network",
        "storage",
        "p99",
        "tail latency",
        "concurrency",
        "saturation",
        "serialization",
        "retries",
        "caching",
        "invalidation",
        "latency budget"
      ],
      "sections": [
        {
          "heading": "Measured bottleneck tree",
          "paragraphs": [
            "Start at client, ingress, service, dependency, state store and network/storage. Measure latency and saturation by hop under a stated workload; change one variable and compare.",
            "Consider CPU, dependency latency, state access, serialization and retries as competing causes. Distributed optimizations can relocate a bottleneck rather than eliminate it."
          ],
          "items": [
            "Averages hide tails.",
            "Retries can briefly improve throughput while worsening tail latency.",
            "Caching introduces staleness and invalidation questions.",
            "Partitioning can create new bottlenecks.",
            "Use representative traffic and a stable baseline."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Doubled p99, stable average",
          "level": "L6 Transfer",
          "task": "Choose the next measurements for a 2\u00d7 p99 increase with unchanged average latency.",
          "page": 60
        },
        {
          "title": "Competing performance hypotheses",
          "task": "Design an experiment that confirms or rejects CPU, downstream latency, state access, serialization and retry explanations for an API p99 regression.",
          "page": 60
        },
        {
          "title": "Performance baseline",
          "task": "Create a baseline with workload, concurrency, percentile and saturation assumptions.",
          "page": 61
        },
        {
          "title": "Latency budget",
          "task": "Allocate and measure latency across the critical request path.",
          "page": 61
        },
        {
          "title": "Transfer drill \u2014 premature optimization",
          "task": "Replace an optimization-first proposal with a measurable hypothesis and one-variable experiment.",
          "page": 61
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared artifact with before/after measurements and trade-offs.",
          "page": 61
        },
        {
          "title": "Diagnostic 1",
          "task": "Which measured symptom is the optimization intended to solve?",
          "page": 61
        },
        {
          "title": "Diagnostic 2",
          "task": "What does the measurement establish and what remains uncertain?",
          "page": 61
        },
        {
          "title": "Diagnostic 3",
          "task": "What baseline evidence is needed before changing code or capacity?",
          "page": 61
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure exposes an average-only or unrealistic benchmark?",
          "page": 61
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative optimization fits changed correctness or cost constraints?",
          "page": 61
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Diagnose from evidence and defend optimization trade-offs.",
        "Stage 4 milestone: design, troubleshoot and optimize Service Fabric applications with production-oriented reasoning, not unearned production claims."
      ],
      "recovery": "Return to the baseline, isolate the missing measurement or variable, and repeat only the failing hypothesis test."
    },
    {
      "id": "fabric-5-1",
      "sourceId": "5.1",
      "title": "Migration Case Study",
      "phaseId": "interview-career",
      "role": "checkpoint",
      "pages": [
        62,
        63
      ],
      "summary": "Turn validated Stage 3 evidence into a sanitized decision narrative with exact contribution, failure reasoning and trade-offs.",
      "action": "Select one validated work note and separate system/team facts from your evidenced contribution.",
      "minutes": 45,
      "concepts": [
        "context",
        "problem",
        "constraints",
        "architecture",
        "role",
        "decision",
        "failure narrative",
        "ownership",
        "sanitized evidence",
        "follow-up questions"
      ],
      "sections": [
        {
          "heading": "Decision narrative, not project r\u00e9sum\u00e9",
          "paragraphs": [
            "Explain system needs, constraints, changes, actual contribution, failure and learning. Build the case only once Stage 3 evidence exists; a hypothetical case must stay explicitly hypothetical.",
            "Prepare one-page, five-minute and deep-dive versions with an architecture diagram and failure scenario. The account should withstand repeated why questions without invented detail."
          ],
          "items": [
            "Precise ownership supports credibility.",
            "Explain trade-offs rather than listing technologies.",
            "Do not claim team architecture or hide failure discussion.",
            "Exclude confidential project details."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Unfamiliar story transfer",
          "level": "L6 Transfer",
          "task": "Convert an unfamiliar migration story into an interview case, labeling facts and assumptions.",
          "page": 62
        },
        {
          "title": "Three-depth case study",
          "task": "From validated Stage 3 evidence, prepare one-page, five-minute and deep-dive versions with a diagram and failure scenario.",
          "page": 62
        },
        {
          "title": "Five-minute work narrative",
          "task": "Draft a five-minute case from a validated, sanitized work note.",
          "page": 63
        },
        {
          "title": "Ten follow-ups",
          "task": "Generate ten likely technical follow-up questions.",
          "page": 63
        },
        {
          "title": "Transfer drill \u2014 ownership inflation",
          "task": "Correct a story that claims team-level architecture as individual work.",
          "page": 63
        },
        {
          "title": "Checkpoint artifact",
          "task": "Create the shared artifact with explicit contribution and defensible evidence.",
          "page": 63
        },
        {
          "title": "Diagnostic 1",
          "task": "What does an evidence-based case study communicate beyond a project summary?",
          "page": 63
        },
        {
          "title": "Diagnostic 2",
          "task": "What can the evidence support and what must not be claimed?",
          "page": 63
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence would be needed before changing the described system?",
          "page": 63
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure question exposes gaps in the narrative?",
          "page": 63
        },
        {
          "title": "Diagnostic 5",
          "task": "What rejected alternative and switch condition can you defend?",
          "page": 63
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Present actual validated work as defensible engineering evidence; no evidence means no personal production claim."
      ],
      "recovery": "Return to the underlying technical note and repair only the unsupported fact, ownership boundary or reasoning gap."
    },
    {
      "id": "fabric-5-2",
      "sourceId": "5.2",
      "title": "Explain Key Concepts \u2014 Simple to Deep",
      "phaseId": "interview-career",
      "role": "checkpoint",
      "pages": [
        63,
        64,
        65
      ],
      "summary": "Explain one consistent mental model at 30-second, two-minute and deep-dive lengths with mechanisms, limits and failure behavior.",
      "action": "Record a 30-second partition/replica explanation using what, why, how and failure/trade-off.",
      "minutes": 45,
      "concepts": [
        "30-second explanation",
        "2-minute explanation",
        "deep dive",
        "analogy",
        "failure mode",
        "trade-off",
        "what/why/how",
        "guarantee boundaries"
      ],
      "sections": [
        {
          "heading": "Compression without distortion",
          "paragraphs": [
            "Use what \u2192 why \u2192 how \u2192 failure/trade-off. A follow-up should deepen the same model rather than trigger unrelated fact recitation.",
            "Short answers need correct boundaries; deep answers need mechanisms. Analogies help only when their limits are clear."
          ],
          "items": [
            "Explain purpose before implementation.",
            "Avoid jargon as a substitute for understanding.",
            "State non-guarantees.",
            "Include failure behavior at every useful depth."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Unfamiliar-concept transfer",
          "level": "L6 Transfer",
          "task": "Explain an unfamiliar distributed-systems concept using the four-layer structure.",
          "page": 63
        },
        {
          "title": "Ten concepts at three depths",
          "task": "Produce 30-second, two-minute and deep answers for cluster, node, service, partition, replica, stateful/stateless, Reliable Collections, health, upgrade and failover.",
          "page": 64
        },
        {
          "title": "Short recordings",
          "task": "Record 30-second concept explanations.",
          "page": 64
        },
        {
          "title": "Two-minute expansion",
          "task": "Expand each short answer without changing its underlying model.",
          "page": 64
        },
        {
          "title": "Transfer drill \u2014 definitions only",
          "task": "Replace definition recitation with purpose, mechanism, boundary and failure reasoning.",
          "page": 64
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared artifact for a layered technical explanation.",
          "page": 64
        },
        {
          "title": "Diagnostic 1",
          "task": "What communication problem does layered explanation solve?",
          "page": 64
        },
        {
          "title": "Diagnostic 2",
          "task": "What guarantees and limits must the explanation preserve?",
          "page": 64
        },
        {
          "title": "Diagnostic 3",
          "task": "Which evidence would be needed before changing the described system?",
          "page": 64
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure question reveals a superficial analogy?",
          "page": 64
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative and changed constraint deepen the answer?",
          "page": 64
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Communicate simply and deeply without sacrificing precision."
      ],
      "recovery": "Retrieve the mechanism without notes, correct the inaccurate boundary, then re-record only the weak explanation."
    },
    {
      "id": "fabric-5-3",
      "sourceId": "5.3",
      "title": "Interview Questions \u2014 Architecture, Design and Trade-offs",
      "phaseId": "interview-career",
      "role": "checkpoint",
      "pages": [
        65,
        66
      ],
      "summary": "Answer Service Fabric interview questions through requirements, mechanisms, failure behavior, alternatives and decision boundaries.",
      "action": "Answer one failure question, then add an alternative and the constraint that would reverse your decision.",
      "minutes": 45,
      "concepts": [
        "why",
        "when",
        "failure",
        "scale",
        "trade-off",
        "alternative",
        "fundamentals",
        "implementation",
        "operations",
        "upgrades",
        "security",
        "design"
      ],
      "sections": [
        {
          "heading": "Reasoning instead of trivia",
          "paragraphs": [
            "An answer is stronger when it explains when a design fits and when it does not. For example, stateful services require state ownership and availability benefits sufficient to justify partitioning and operational complexity.",
            "Organize questions into fundamentals, implementation, operations, failure, scale, upgrades, security and design. Every answer needs a concrete model, an alternative and a switch condition."
          ],
          "items": [
            "Avoid documentation recitation and feature lists.",
            "Do not omit operations or concrete examples.",
            "No design is universally correct."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Platform-optional design transfer",
          "level": "L6 Transfer",
          "task": "Answer a system-design question where Service Fabric is only one candidate and justify whether it belongs.",
          "page": 65
        },
        {
          "title": "Question family \u2014 node failure",
          "task": "Explain what happens when a node fails.",
          "page": 65
        },
        {
          "title": "Question family \u2014 partitioning",
          "task": "Explain why the workload should be partitioned.",
          "page": 65
        },
        {
          "title": "Question family \u2014 scaling",
          "task": "Explain how to scale the workload and where it stops scaling.",
          "page": 65
        },
        {
          "title": "Question family \u2014 upgrades",
          "task": "Explain how to upgrade safely.",
          "page": 65
        },
        {
          "title": "Question family \u2014 discovery",
          "task": "Explain how services locate each other.",
          "page": 65
        },
        {
          "title": "Question family \u2014 health",
          "task": "Explain what a health signal means and omits.",
          "page": 65
        },
        {
          "title": "Question family \u2014 avoid stateful",
          "task": "Explain when stateful services are the wrong boundary.",
          "page": 65
        },
        {
          "title": "Forty-question bank",
          "task": "Build a 40-question bank across the stated families.",
          "page": 66
        },
        {
          "title": "Ten no-notes answers",
          "task": "Answer ten questions from memory.",
          "page": 66
        },
        {
          "title": "Transfer drill \u2014 copied phrasing",
          "task": "Replace documentation phrases with a concrete model, example and trade-off.",
          "page": 66
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared artifact for a defensible interview answer.",
          "page": 66
        },
        {
          "title": "Diagnostic 1",
          "task": "What reasoning problem does this interview-answer method address?",
          "page": 66
        },
        {
          "title": "Diagnostic 2",
          "task": "What guarantee and non-guarantee boundaries does your answer preserve?",
          "page": 66
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence would precede a change to the proposed system?",
          "page": 66
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure would expose a memorized rather than understood answer?",
          "page": 66
        },
        {
          "title": "Diagnostic 5",
          "task": "Which alternative and constraint would reverse your recommendation?",
          "page": 66
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Defend decisions and compare alternatives under interview constraints."
      ],
      "recovery": "Turn each vague answer into a targeted mechanism or failure drill rather than memorizing a longer script."
    },
    {
      "id": "fabric-5-4",
      "sourceId": "5.4",
      "title": "System Design Scenarios Using Service Fabric",
      "phaseId": "interview-career",
      "role": "checkpoint",
      "pages": [
        67,
        68
      ],
      "summary": "Choose Service Fabric's scope inside a requirements-first architecture, considering external stores, messaging, scale and alternatives.",
      "action": "State functional requirements, scale and non-functional constraints before drawing platform boxes.",
      "minutes": 60,
      "concepts": [
        "requirements",
        "scale",
        "latency",
        "availability",
        "consistency",
        "partitioning",
        "stateless services",
        "stateful services",
        "queues",
        "external databases",
        "caches",
        "cost",
        "operational complexity"
      ],
      "sections": [
        {
          "heading": "Platform serves the design",
          "paragraphs": [
            "Choose where Service Fabric helps and where managed services or dedicated data systems form better boundaries. Start from requirements before selecting stateless, stateful, queued, database or cache responsibilities.",
            "Every stateful component needs a partitioning and recovery story; every synchronous dependency couples latency and availability."
          ],
          "items": [
            "State scale assumptions.",
            "Include failure, operations and cost.",
            "Compare a baseline with an alternative that reduces Service Fabric responsibility.",
            "Avoid technology-first box diagrams."
          ]
        }
      ],
      "exercises": [
        {
          "title": "One-subsystem transfer",
          "level": "L6 Transfer",
          "task": "Design a system where Service Fabric is appropriate for only one subsystem and explain the boundary.",
          "page": 67
        },
        {
          "title": "Order processing design",
          "task": "Create an order-processing baseline and an alternative with less Service Fabric responsibility.",
          "page": 67
        },
        {
          "title": "Notification fan-out design",
          "task": "Create a notification fan-out baseline and a lower-Service-Fabric alternative.",
          "page": 67
        },
        {
          "title": "Collaborative state design",
          "task": "Create a collaborative-state baseline and a lower-Service-Fabric alternative.",
          "page": 67
        },
        {
          "title": "Telemetry ingestion design",
          "task": "Create a telemetry-ingestion baseline and a lower-Service-Fabric alternative.",
          "page": 67
        },
        {
          "title": "Requirements-first design",
          "task": "Perform a design starting with requirements and constraints.",
          "page": 68
        },
        {
          "title": "10\u00d7 modification",
          "task": "Adapt that architecture to ten times the traffic.",
          "page": 68
        },
        {
          "title": "Transfer drill \u2014 technology first",
          "task": "Rework a technology-box-first design into a requirements-driven decision.",
          "page": 68
        },
        {
          "title": "Checkpoint artifact",
          "task": "Produce the shared design artifact with failure behavior, alternatives and exact role.",
          "page": 68
        },
        {
          "title": "Diagnostic 1",
          "task": "Which workload problem does the proposed architecture solve?",
          "page": 68
        },
        {
          "title": "Diagnostic 2",
          "task": "What does it guarantee and leave outside its boundary?",
          "page": 68
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence should precede a design change?",
          "page": 68
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure exposes platform-biased reasoning?",
          "page": 68
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative fits a changed requirement better?",
          "page": 68
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Use Service Fabric without assuming it must own the whole architecture."
      ],
      "recovery": "Return to the unsupported requirement or failure assumption and redesign only the affected subsystem."
    },
    {
      "id": "fabric-5-5",
      "sourceId": "5.5",
      "title": "Architecture, Data Flow and Failover Diagrams",
      "phaseId": "interview-career",
      "role": "checkpoint",
      "pages": [
        68,
        69,
        70
      ],
      "summary": "Use purpose-specific visual models to communicate logical responsibility, deployment, state movement and recovery without altering facts.",
      "action": "Choose one diagram question and label each arrow's protocol, direction, owner and failure behavior.",
      "minutes": 45,
      "concepts": [
        "logical architecture",
        "deployment view",
        "data flow",
        "failure flow",
        "sequence",
        "ownership",
        "current state",
        "target state",
        "replication view",
        "legend"
      ],
      "sections": [
        {
          "heading": "A diagram answers a question",
          "paragraphs": [
            "Logical views explain responsibility, deployment views explain placement, data-flow views explain movement and failure views explain recovery. Use small cross-referenced diagrams rather than one overloaded picture.",
            "A migration diagram set includes current state, target state, request flow, state/replication and node-failure flow. Each arrow needs explainable protocol, direction and failure semantics."
          ],
          "items": [
            "Identify the reader and question.",
            "Show ownership, state ownership, legends and failure paths.",
            "A picture that cannot be explained is unfinished."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Messy screenshot transfer",
          "level": "L6 Transfer",
          "task": "Redraw a messy architecture screenshot into three useful views without changing its factual content.",
          "page": 68
        },
        {
          "title": "Migration diagram set",
          "task": "Create current, target, request, state/replication and node-failure views with annotated arrows.",
          "page": 69
        },
        {
          "title": "Five representations",
          "task": "Redraw the same system five ways, each answering a distinct question.",
          "page": 69
        },
        {
          "title": "Node failure overlay",
          "task": "Add a node failure and the recovery path.",
          "page": 69
        },
        {
          "title": "Transfer drill \u2014 overloaded diagram",
          "task": "Split an overloaded diagram into focused views without losing relationships.",
          "page": 69
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared evidence artifact supporting the diagram set.",
          "page": 69
        },
        {
          "title": "Diagnostic 1",
          "task": "Which question does each view answer?",
          "page": 69
        },
        {
          "title": "Diagnostic 2",
          "task": "What facts does the view establish and what does it not guarantee?",
          "page": 69
        },
        {
          "title": "Diagnostic 3",
          "task": "Which evidence would be needed before changing a depicted relationship?",
          "page": 69
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure exposes missing state ownership or recovery arrows?",
          "page": 69
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative view fits a different audience or decision?",
          "page": 69
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Explain distributed architecture clearly under interview time pressure."
      ],
      "recovery": "Repair the specific missing arrow, legend, ownership boundary or failure path and explain that view again."
    },
    {
      "id": "fabric-5-6",
      "sourceId": "5.6",
      "title": "Mock Interviews \u2014 Technical + Behavioral",
      "phaseId": "interview-career",
      "role": "checkpoint",
      "pages": [
        70,
        71
      ],
      "summary": "Test no-notes retrieval and adaptation under follow-ups while keeping technical and behavioral ownership claims consistent.",
      "action": "Run a no-notes concept-to-failure explanation and mark vague or unsupported answers for targeted repair.",
      "minutes": 45,
      "concepts": [
        "technical drill",
        "deep dive",
        "challenge question",
        "unknowns",
        "behavioral framing",
        "reflection",
        "retrieval",
        "ownership",
        "changed requirements"
      ],
      "sections": [
        {
          "heading": "Evidence under pressure",
          "paragraphs": [
            "Progress through warm-up, concept, project deep dive, failure, trade-off, unfamiliar design and behavioral reflection. Score evidence rather than confidence.",
            "Review a thirty-minute no-notes mock for vagueness, overclaiming or lost failure reasoning, then turn each weakness into a focused drill."
          ],
          "items": [
            "Honest uncertainty is stronger than invented certainty.",
            "Technical and behavioral accounts must agree.",
            "Avoid scripts, irrelevant detail, team-level ownership inflation and failure-question deflection."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Mid-interview requirement change",
          "level": "L6 Transfer",
          "task": "Adapt when an interviewer changes one major design requirement midway.",
          "page": 70
        },
        {
          "title": "Thirty-minute mock",
          "task": "Run a 30-minute no-notes interview across the stated sequence and convert weak answers into targeted drills.",
          "page": 70
        },
        {
          "title": "No-notes round",
          "task": "Complete a separate no-notes technical round.",
          "page": 71
        },
        {
          "title": "Hostile follow-up round",
          "task": "Practice adversarial technical follow-ups about mechanisms, alternatives, failures and ownership.",
          "page": 71
        },
        {
          "title": "Transfer drill \u2014 memorized script",
          "task": "Replace a brittle memorized answer with reasoning that survives a changed constraint.",
          "page": 71
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared artifact with honest mock evidence and remaining weaknesses.",
          "page": 71
        },
        {
          "title": "Diagnostic 1",
          "task": "What capability is a mock interview testing?",
          "page": 71
        },
        {
          "title": "Diagnostic 2",
          "task": "What does one mock establish and not establish?",
          "page": 71
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence should precede a change to the system discussed?",
          "page": 71
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure follow-up exposes a weak model?",
          "page": 71
        },
        {
          "title": "Diagnostic 5",
          "task": "Which alternative and changed constraint can you defend under pressure?",
          "page": 71
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Stay technically coherent while adapting to new constraints and acknowledging unknowns."
      ],
      "recovery": "Target the specific vague, overclaimed or inconsistent answer with retrieval or failure practice, then retest."
    },
    {
      "id": "fabric-5-7",
      "sourceId": "5.7",
      "title": "Continued Learning and Platform Awareness",
      "phaseId": "interview-career",
      "role": "checkpoint",
      "pages": [
        72,
        73
      ],
      "summary": "Maintain a compact, current platform model through selective documentation review, validated changes and delayed retrieval.",
      "action": "Choose one platform change and decide whether it needs a note, lab, interview update or no action.",
      "minutes": 30,
      "concepts": [
        "release awareness",
        "documentation review",
        "architecture patterns",
        "deprecations",
        "operational lessons",
        "learning backlog",
        "quarterly audit",
        "change log",
        "stale notes"
      ],
      "sections": [
        {
          "heading": "Low-noise learning loop",
          "paragraphs": [
            "Review quarterly what changed, what affects the relevant system or interview answers, what can be ignored and what needs a lab. Record the change, significance, affected architecture, required action and validation need.",
            "Maintain core architectural principles as tooling changes rather than treating syntax knowledge as mastery."
          ],
          "items": [
            "Not all release notes deserve equal attention.",
            "Validate architecture-changing updates.",
            "Curate rather than copy documentation.",
            "Retire stale notes and avoid announcement chasing disconnected from capability."
          ]
        }
      ],
      "exercises": [
        {
          "title": "New-capability triage",
          "level": "L6 Transfer",
          "task": "Decide whether a new capability deserves a lab, note, interview revision or no action.",
          "page": 72
        },
        {
          "title": "Platform change log",
          "task": "Create entries identifying change, importance, affected architecture, action and need for hands-on validation.",
          "page": 72
        },
        {
          "title": "Quarterly knowledge audit",
          "task": "Audit the platform model and relevant documentation quarterly.",
          "page": 73
        },
        {
          "title": "Retire stale notes",
          "task": "Identify and retire or correct obsolete notes without replacing evidence with assumptions.",
          "page": 73
        },
        {
          "title": "Transfer drill \u2014 announcement chasing",
          "task": "Replace unselective release consumption with a capability-driven learning choice.",
          "page": 73
        },
        {
          "title": "Checkpoint artifact",
          "task": "Record the shared artifact for a validated platform-model update.",
          "page": 73
        },
        {
          "title": "Diagnostic 1",
          "task": "What knowledge-maintenance problem does this review loop solve?",
          "page": 73
        },
        {
          "title": "Diagnostic 2",
          "task": "What does documentation review establish and what still needs validation?",
          "page": 73
        },
        {
          "title": "Diagnostic 3",
          "task": "What evidence precedes adoption of a platform change?",
          "page": 73
        },
        {
          "title": "Diagnostic 4",
          "task": "Which failure would expose stale platform assumptions?",
          "page": 73
        },
        {
          "title": "Diagnostic 5",
          "task": "What alternative learning action fits a changed relevance constraint?",
          "page": 73
        }
      ],
      "criteria": [
        "Apply the common checkpoint gate.",
        "Maintain durable capability through an evidence-led, low-noise learning loop.",
        "Stage 5 milestone: convert genuine technical understanding into defensible interview and architect-track evidence."
      ],
      "recovery": "Probe recall, repair the stale or missing concept with a targeted note/lab, and continue from real evidence rather than restarting."
    },
    {
      "id": "fabric-integration-a",
      "sourceId": "Integration A",
      "title": "Build \u2192 Observe \u2192 Fail",
      "phaseId": "core-development",
      "role": "practice",
      "pages": [
        74
      ],
      "summary": "Combine local stateless implementation, entity navigation, dependency failure and verified recovery.",
      "action": "Choose a small local stateless service and define one dependency-failure invariant.",
      "minutes": 60,
      "concepts": [
        "stateless service",
        "deployment",
        "entity hierarchy",
        "dependency failure",
        "client impact",
        "health",
        "telemetry",
        "recovery"
      ],
      "sections": [
        {
          "heading": "Combination gate, not a new checkpoint",
          "paragraphs": [
            "Use a local or explicitly authorized sandbox. Preserve the observations before restoring the dependency."
          ],
          "items": [
            "This integration supplements canonical progression; it does not create a second active checkpoint."
          ]
        }
      ],
      "exercises": [
        {
          "title": "1. Service",
          "task": "Create or inspect a small stateless service.",
          "page": 74
        },
        {
          "title": "2. Deployment hierarchy",
          "task": "Deploy locally and identify application, service and node relationships.",
          "page": 74
        },
        {
          "title": "3. Dependency",
          "task": "Add one dependency.",
          "page": 74
        },
        {
          "title": "4. Failure",
          "task": "Inject a bounded dependency failure in the sandbox.",
          "page": 74
        },
        {
          "title": "5. Evidence",
          "task": "Explain client-visible behavior using health and telemetry.",
          "page": 74
        },
        {
          "title": "6. Recovery",
          "task": "Restore the dependency and demonstrate recovery against the invariant.",
          "page": 74
        },
        {
          "title": "Changed requirement and failure question",
          "task": "Adapt the design to a changed requirement and answer one failure question.",
          "check": "The design remains coherent under both challenges.",
          "page": 74
        }
      ],
      "criteria": [
        "Pass when the design survives a changed requirement and one failure question."
      ],
      "recovery": "Restore the known-good dependency and repair only the failed combination or explanation."
    },
    {
      "id": "fabric-integration-b",
      "sourceId": "Integration B",
      "title": "State \u2192 Partition \u2192 Failure",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        74
      ],
      "summary": "Connect a business invariant to state partitioning, replica assumptions and node-loss behavior.",
      "action": "Define the stateful workload and its invariant before choosing a key.",
      "minutes": 60,
      "concepts": [
        "business invariant",
        "partition key",
        "replicas",
        "placement",
        "node failure",
        "hot partition",
        "correlated failure"
      ],
      "sections": [
        {
          "heading": "Combined state reasoning",
          "paragraphs": [
            "Treat the node failure as a bounded local experiment or explicit simulation. Separate remaining availability from recovery needs."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Invariant",
          "task": "Define a stateful workload and business invariant.",
          "page": 74
        },
        {
          "title": "2. Key",
          "task": "Choose its partition key.",
          "page": 74
        },
        {
          "title": "3. Copies and placement",
          "task": "State replica expectations and placement assumptions.",
          "page": 74
        },
        {
          "title": "4. Node loss",
          "task": "Simulate one node failure safely.",
          "page": 74
        },
        {
          "title": "5. Availability and recovery",
          "task": "Identify what remains available and what must recover.",
          "page": 74
        },
        {
          "title": "6. Skew and correlation",
          "task": "Explain hot-partition and correlated-failure risks.",
          "page": 74
        },
        {
          "title": "Changed requirement and failure question",
          "task": "Adapt one requirement and defend one failure scenario.",
          "check": "Preserve a coherent state/availability design.",
          "page": 74
        }
      ],
      "criteria": [
        "Pass when the design survives a changed requirement and one failure question."
      ],
      "recovery": "Repair the specific invariant, key or replica assumption using a focused failure matrix."
    },
    {
      "id": "fabric-integration-c",
      "sourceId": "Integration C",
      "title": "Migration \u2192 Upgrade \u2192 Rollback",
      "phaseId": "real-world-application",
      "role": "practice",
      "pages": [
        74
      ],
      "summary": "Connect component migration to mixed-version compatibility, health gates and operator recovery.",
      "action": "Choose a synthetic or authorized sanitized component and mark its current/target responsibilities.",
      "minutes": 60,
      "concepts": [
        "migration component",
        "compatibility boundary",
        "rolling deployment",
        "health gates",
        "rollback triggers",
        "operator recovery"
      ],
      "sections": [
        {
          "heading": "Planning boundary",
          "paragraphs": [
            "Design the rollout and recovery sequence; this exercise does not authorize deployment."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Component",
          "task": "Select one migration component.",
          "page": 74
        },
        {
          "title": "2. Responsibilities",
          "task": "Map current and target responsibilities.",
          "page": 74
        },
        {
          "title": "3. Compatibility",
          "task": "Define the compatibility boundary.",
          "page": 74
        },
        {
          "title": "4. Rollout",
          "task": "Design a rolling deployment.",
          "page": 74
        },
        {
          "title": "5. Gates",
          "task": "Specify health gates and rollback triggers.",
          "page": 74
        },
        {
          "title": "6. Recovery sequence",
          "task": "Write operator-facing recovery decisions and steps.",
          "page": 74
        },
        {
          "title": "Changed requirement and failure question",
          "task": "Adapt a changed requirement and answer one failure challenge.",
          "check": "The plan remains safe and coherent.",
          "page": 74
        }
      ],
      "criteria": [
        "Pass when the design survives a changed requirement and one failure question."
      ],
      "recovery": "Repair only the failing compatibility, health or rollback boundary before further authorized work."
    },
    {
      "id": "fabric-integration-d",
      "sourceId": "Integration D",
      "title": "Architecture \u2192 Interview",
      "phaseId": "interview-career",
      "role": "practice",
      "pages": [
        74
      ],
      "summary": "Compress a factual architecture into clear explanations while defending state, partitioning, failure and ownership.",
      "action": "Draw one factual system model and prepare its 30-second explanation.",
      "minutes": 45,
      "concepts": [
        "diagram",
        "30-second explanation",
        "2-minute explanation",
        "state model",
        "partitioning",
        "failure",
        "alternative",
        "ownership"
      ],
      "sections": [
        {
          "heading": "Consistent explanation",
          "paragraphs": [
            "Short and detailed accounts must agree. State actual ownership only; synthetic work is labeled as such."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Diagram",
          "task": "Draw the system.",
          "page": 74
        },
        {
          "title": "2. Short explanation",
          "task": "Explain it in 30 seconds.",
          "page": 74
        },
        {
          "title": "3. Detailed explanation",
          "task": "Explain it in two minutes.",
          "page": 74
        },
        {
          "title": "4. State defense",
          "task": "Defend its state model.",
          "page": 74
        },
        {
          "title": "5. Partition defense",
          "task": "Defend its partitioning choice.",
          "page": 74
        },
        {
          "title": "6. Failure",
          "task": "Explain one failure and recovery path.",
          "page": 74
        },
        {
          "title": "7. Alternative",
          "task": "Explain one rejected alternative.",
          "page": 74
        },
        {
          "title": "8. Ownership",
          "task": "State exactly which work you actually owned.",
          "page": 74
        },
        {
          "title": "Changed requirement and failure question",
          "task": "Handle a changed requirement and a failure follow-up.",
          "check": "Keep the explanation coherent and evidence-grounded.",
          "page": 74
        }
      ],
      "criteria": [
        "Pass when the design survives a changed requirement and one failure question."
      ],
      "recovery": "Return to the underlying evidence and target only the weak explanation or unsupported ownership claim."
    },
    {
      "id": "fabric-case-1",
      "sourceId": "Case 1",
      "title": "Stateful Order Processing",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        75
      ],
      "summary": "Design low-latency order reads and invariant-preserving transitions that tolerate one node loss.",
      "action": "State the order-transition invariant and compare local memory with replicated partitioned state.",
      "minutes": 60,
      "concepts": [
        "availability",
        "state ownership",
        "partitioning",
        "idempotency",
        "external dependencies",
        "transactions",
        "state locality"
      ],
      "sections": [
        {
          "heading": "Generic case and trade-offs",
          "paragraphs": [
            "A single memory-only process loses authoritative state on restart. Improve it with partitioned replicated state, explicit transactions and suitable external dependencies."
          ],
          "items": [
            "Compare state locality with operational complexity.",
            "Compare partition count with coordination overhead.",
            "Compare synchronous validation with availability."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Baseline redesign",
          "task": "Meet low-latency reads, valid status transitions and continued overall operation during one node loss.",
          "page": 75
        },
        {
          "title": "Primary fails mid-transition",
          "task": "Explain behavior if the primary fails during an order transition.",
          "page": 75
        },
        {
          "title": "Slow database",
          "task": "Analyze a slow external database dependency.",
          "page": 75
        },
        {
          "title": "Hot partition",
          "task": "Analyze one partition becoming hot.",
          "page": 75
        },
        {
          "title": "Final changed-constraint challenge",
          "task": "Change one major constraint and redesign only affected parts; defend the decision.",
          "page": 75
        }
      ],
      "criteria": [
        "Preserve the stated business invariants and explain the changed-constraint design; no additional numeric threshold is supplied."
      ],
      "recovery": "Revisit the failed invariant or dependency assumption with the shared failure-reasoning method."
    },
    {
      "id": "fabric-case-2",
      "sourceId": "Case 2",
      "title": "Stateless API Migration",
      "phaseId": "real-world-application",
      "role": "practice",
      "pages": [
        75
      ],
      "summary": "Move a fictional legacy API while retaining its external database, external behavior and safe rolling deployment.",
      "action": "Identify the unchanged API contract and the database failure boundary.",
      "minutes": 60,
      "concepts": [
        "stateless service",
        "deployment",
        "configuration",
        "timeouts",
        "health",
        "external database",
        "backward compatibility",
        "retries"
      ],
      "sections": [
        {
          "heading": "Generic migration reasoning",
          "paragraphs": [
            "Relocating a process without revisiting failure assumptions is insufficient. Establish true stateless behavior, configuration separation, timeout budgets, health signals and compatible rollout."
          ],
          "items": [
            "Preserve external API behavior and isolate dependency failures.",
            "Compare migration speed with observability, retries with overload, and compatibility with release speed."
          ]
        }
      ],
      "exercises": [
        {
          "title": "API migration design",
          "task": "Design the fictional move with external persistence and compatible rolling deployment.",
          "page": 75
        },
        {
          "title": "Unavailable database",
          "task": "Explain behavior when the external database is unavailable.",
          "page": 75
        },
        {
          "title": "Half-upgraded fleet",
          "task": "Explain behavior when half the instances run the new version.",
          "page": 75
        },
        {
          "title": "Final changed-constraint challenge",
          "task": "Change one major constraint, redesign only necessary parts and defend the result.",
          "page": 75
        }
      ],
      "criteria": [
        "Preserve the API contract, rolling deployment and dependency isolation requirements."
      ],
      "recovery": "Repair the failing contract or timeout boundary in the plan before a local retest."
    },
    {
      "id": "fabric-case-3",
      "sourceId": "Case 3",
      "title": "Hot Partition",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        75
      ],
      "summary": "Maintain per-customer ordering while increasing throughput under highly skewed traffic.",
      "action": "Compare a proposed key's distribution with its ordering and locality obligations.",
      "minutes": 45,
      "concepts": [
        "partitioning",
        "load balancing",
        "capacity",
        "data distribution",
        "skew",
        "locality",
        "ordering",
        "workload separation"
      ],
      "sections": [
        {
          "heading": "Distribution with semantics",
          "paragraphs": [
            "A hotspot-producing key limits scale. Prefer a key aligned with concurrency needs, monitor skew and consider separating workloads."
          ],
          "items": [
            "Even distribution can conflict with locality and ordering."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Skew-aware design",
          "task": "Choose a key and monitoring strategy that support per-customer ordering and aggregate throughput.",
          "page": 75
        },
        {
          "title": "Forty-percent customer",
          "task": "Analyze one customer becoming 40% of all traffic.",
          "page": 75
        },
        {
          "title": "Ordering during repartition",
          "task": "Explain what happens if repartitioning changes ordering.",
          "page": 75
        },
        {
          "title": "Final changed-constraint challenge",
          "task": "Modify one major constraint and defend the smallest required redesign.",
          "page": 75
        }
      ],
      "criteria": [
        "Defend distribution choices without silently violating ordering."
      ],
      "recovery": "Recheck the hot-key and ordering evidence, then revise the affected partition boundary."
    },
    {
      "id": "fabric-case-4",
      "sourceId": "Case 4",
      "title": "Rolling Upgrade with Contract Change",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        75
      ],
      "summary": "Change a response contract without a full outage while old callers and server versions remain in service.",
      "action": "List compatible old/new caller-server combinations and irreversible data changes.",
      "minutes": 45,
      "concepts": [
        "upgrade",
        "compatibility",
        "health",
        "rollback",
        "additive contract",
        "staged rollout",
        "schema change"
      ],
      "sections": [
        {
          "heading": "Compatibility before rollout",
          "paragraphs": [
            "Breaking server and client changes together create risk. Prefer additive contracts, staged deployment, health gates and delayed retirement of old behavior."
          ],
          "items": [
            "Temporary compatibility complexity buys rollout safety.",
            "Process health must not hide semantic errors."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Compatible rollout design",
          "task": "Plan a no-full-outage rollout while old callers remain.",
          "page": 75
        },
        {
          "title": "Healthy but wrong",
          "task": "Explain detection when a new version is healthy but semantically incorrect.",
          "page": 75
        },
        {
          "title": "Schema blocks rollback",
          "task": "Analyze recovery when a schema change prevents rollback.",
          "page": 75
        },
        {
          "title": "Final changed-constraint challenge",
          "task": "Change one major constraint and defend only the necessary redesign.",
          "page": 75
        }
      ],
      "criteria": [
        "Preserve mixed-version behavior and explicitly reason about semantic health and rollback limits."
      ],
      "recovery": "Repair the incompatible version pair or irreversible-change plan before retesting."
    },
    {
      "id": "fabric-case-5",
      "sourceId": "Case 5",
      "title": "Certificate Rotation Incident",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        76
      ],
      "summary": "Investigate post-rotation communication failure and design validated credential renewal without downtime.",
      "action": "List identity, trust, expiry, thumbprint, network and configuration hypotheses.",
      "minutes": 45,
      "concepts": [
        "security",
        "availability",
        "configuration",
        "diagnostics",
        "trust chain",
        "expiry",
        "thumbprint",
        "rotation",
        "compatibility window"
      ],
      "sections": [
        {
          "heading": "Generic rotation case",
          "paragraphs": [
            "Replacing a certificate without overlap or validation can break communication. Design trust-chain validation, an explicit procedure, pre-production tests and monitoring."
          ],
          "items": [
            "Shorter credential lifetimes reduce exposure but increase rotation demands."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Rotation design",
          "task": "Plan downtime-free rotation with appropriate compatibility, validation and monitoring.",
          "page": 76
        },
        {
          "title": "Discriminating diagnosis",
          "task": "Distinguish identity, trust-chain, expiry, wrong-thumbprint, network and configuration causes using minimum evidence.",
          "page": 76
        },
        {
          "title": "Final changed-constraint challenge",
          "task": "Change one major constraint and defend the necessary redesign without live credential changes.",
          "page": 76
        }
      ],
      "criteria": [
        "Treat rotation as both trust management and availability engineering."
      ],
      "recovery": "Diagnose the failing boundary before another rotation; verify recovery and remaining uncertainty."
    },
    {
      "id": "fabric-case-6",
      "sourceId": "Case 6",
      "title": "Intermittent 503s",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        76
      ],
      "summary": "Find a user-visible bottleneck despite normal cluster health using correlated request and dependency evidence.",
      "action": "Correlate failing requests with partition, node, dependency and traffic class before proposing a restart.",
      "minutes": 45,
      "concepts": [
        "observability",
        "dependency latency",
        "retries",
        "capacity",
        "request correlation",
        "saturation",
        "partition locality",
        "traffic class"
      ],
      "sections": [
        {
          "heading": "Evidence rather than repeated restart",
          "paragraphs": [
            "Repeatedly restarting instances does not identify the bottleneck. Correlate request IDs, latency, dependency calls, retries, saturation and health."
          ],
          "items": [
            "Balance useful telemetry against cost and noise."
          ]
        }
      ],
      "exercises": [
        {
          "title": "503 investigation design",
          "task": "Plan an evidence-first investigation of intermittent failures with normal cluster health.",
          "page": 76
        },
        {
          "title": "Failure localization",
          "task": "Determine whether the failures align with a partition, node, dependency or traffic class.",
          "page": 76
        },
        {
          "title": "Final changed-constraint challenge",
          "task": "Change one major constraint and defend the smallest necessary investigation/design revision.",
          "page": 76
        }
      ],
      "criteria": [
        "Use distributed evidence to identify or bound the bottleneck."
      ],
      "recovery": "Add the missing discriminating telemetry rather than restarting unrelated services."
    },
    {
      "id": "fabric-diagnostic-1",
      "sourceId": "Diagnostic 1",
      "title": "Foundation Recall",
      "phaseId": "foundation",
      "role": "practice",
      "pages": [
        77
      ],
      "summary": "Test no-notes recall of entities, state models, partitioning, Explorer triage and local-lab limits.",
      "action": "Answer the five foundation prompts without notes before reviewing explanations.",
      "minutes": 30,
      "concepts": [
        "hierarchy",
        "stateful/stateless",
        "partitioning/replication",
        "Explorer",
        "local versus production"
      ],
      "sections": [
        {
          "heading": "Diagnostic conditions",
          "paragraphs": [
            "The source explicitly sets an at-least-80% coherent no-notes standard for this diagnostic, not for every roadmap activity."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Hierarchy",
          "task": "Explain the Service Fabric entity hierarchy from memory.",
          "page": 77
        },
        {
          "title": "2. State models",
          "task": "Explain stateful and stateless without implementation jargon.",
          "page": 77
        },
        {
          "title": "3. Division and redundancy",
          "task": "Distinguish partitioning from replication.",
          "page": 77
        },
        {
          "title": "4. Explorer first inspection",
          "task": "Identify the first Explorer inspection for an unhealthy service.",
          "page": 77
        },
        {
          "title": "5. Local evidence limit",
          "task": "Explain why a local lab helps learning but does not prove production behavior.",
          "page": 77
        }
      ],
      "criteria": [
        "At least 80% coherent answers without notes."
      ],
      "recovery": "Turn failed answers into targeted recovery drills before retesting."
    },
    {
      "id": "fabric-diagnostic-2",
      "sourceId": "Diagnostic 2",
      "title": "Standard Application",
      "phaseId": "core-development",
      "role": "practice",
      "pages": [
        77
      ],
      "summary": "Check standard local service implementation, lifecycle, mobile placement and configuration validation.",
      "action": "Prepare the smallest local stateless and stateful examples for no-notes explanation.",
      "minutes": 60,
      "concepts": [
        "stateless implementation",
        "stateful implementation",
        "deployment lifecycle",
        "logical communication",
        "configuration validation"
      ],
      "sections": [
        {
          "heading": "Diagnostic scope",
          "paragraphs": [
            "Use a local sandbox for implementation. Demonstrate or coherently explain each standard task without notes."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Stateless service",
          "task": "Create a minimal local stateless service.",
          "page": 77
        },
        {
          "title": "2. Stateful service",
          "task": "Create a minimal local stateful service.",
          "page": 77
        },
        {
          "title": "3. Deployment",
          "task": "Describe the deployment lifecycle.",
          "page": 77
        },
        {
          "title": "4. Changing placement",
          "task": "Explain why service communication remains valid as placement changes.",
          "page": 77
        },
        {
          "title": "5. Configuration",
          "task": "Introduce and validate one local configuration change.",
          "page": 77
        }
      ],
      "criteria": [
        "At least 80% coherent answers without notes."
      ],
      "recovery": "Recover the failed standard task in the smallest lab, then retest."
    },
    {
      "id": "fabric-diagnostic-3",
      "sourceId": "Diagnostic 3",
      "title": "Modification",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        77
      ],
      "summary": "Test adaptation when state, partitioning, communication, upgrades or availability constraints change.",
      "action": "Select a baseline design and modify one constraint at a time.",
      "minutes": 60,
      "concepts": [
        "state-model change",
        "partitioning assumption",
        "asynchronous communication",
        "breaking upgrade",
        "node-failure requirement"
      ],
      "sections": [
        {
          "heading": "Changed-constraint reasoning",
          "paragraphs": [
            "Preserve unaffected design decisions while explaining what each variation changes."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Stateful conversion",
          "task": "Change a stateless API into a stateful workload.",
          "page": 77
        },
        {
          "title": "2. Partition assumption",
          "task": "Change one partitioning assumption and adapt the design.",
          "page": 77
        },
        {
          "title": "3. Async dependency",
          "task": "Change one synchronous dependency to asynchronous communication.",
          "page": 77
        },
        {
          "title": "4. Breaking upgrade",
          "task": "Make a compatible upgrade breaking, then redesign its rollout safely.",
          "page": 77
        },
        {
          "title": "5. Node-failure requirement",
          "task": "Add a node-loss requirement and update the availability argument.",
          "page": 77
        }
      ],
      "criteria": [
        "At least 80% coherent answers without notes."
      ],
      "recovery": "Use a targeted changed-constraint drill for each failed variation before retesting."
    },
    {
      "id": "fabric-diagnostic-4",
      "sourceId": "Diagnostic 4",
      "title": "Failure Handling",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        77
      ],
      "summary": "Test detection, hypotheses, evidence, bounded recovery and risk across seven distributed failures.",
      "action": "Choose one failure and state the observation separately from two plausible causes.",
      "minutes": 60,
      "concepts": [
        "node failure",
        "replica failure",
        "hot partition",
        "slow dependency",
        "certificate rotation",
        "partial upgrade",
        "green health/bad experience"
      ],
      "sections": [
        {
          "heading": "Failure diagnostic",
          "paragraphs": [
            "Use shared failure reasoning to connect symptoms, evidence, action and verified recovery; destructive tests remain sandbox-only."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Node failure",
          "task": "Analyze detection, impact and recovery from node loss.",
          "page": 77
        },
        {
          "title": "2. Replica failure",
          "task": "Analyze a replica failure and partition availability.",
          "page": 77
        },
        {
          "title": "3. Hot partition",
          "task": "Diagnose skew and its limits on throughput.",
          "page": 77
        },
        {
          "title": "4. Slow dependency",
          "task": "Analyze latency budgets, retry behavior and recovery.",
          "page": 77
        },
        {
          "title": "5. Certificate failure",
          "task": "Diagnose expiry or rotation failure without assuming the cause.",
          "page": 77
        },
        {
          "title": "6. Partial upgrade",
          "task": "Investigate mixed versions and bounded recovery.",
          "page": 77
        },
        {
          "title": "7. Green health, degraded experience",
          "task": "Explain which evidence reveals user-visible failure despite healthy status.",
          "page": 77
        }
      ],
      "criteria": [
        "At least 80% coherent answers without notes."
      ],
      "recovery": "Construct a targeted failure matrix for weak scenarios, then retest."
    },
    {
      "id": "fabric-diagnostic-5",
      "sourceId": "Diagnostic 5",
      "title": "Design Defense",
      "phaseId": "interview-career",
      "role": "practice",
      "pages": [
        77
      ],
      "summary": "Defend platform, persistence, communication and partitioning choices while stating reversal conditions.",
      "action": "Choose one design comparison and name the requirement that would reverse your recommendation.",
      "minutes": 45,
      "concepts": [
        "platform alternative",
        "relational requirements",
        "external database",
        "Reliable Collections",
        "synchronous latency",
        "queue",
        "partition complexity",
        "switch condition"
      ],
      "sections": [
        {
          "heading": "Alternative-aware defense",
          "paragraphs": [
            "Defend choices under stated requirements instead of treating any technology as universally superior."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Stateful platform",
          "task": "Defend Service Fabric against a generic container platform for a stateful workload.",
          "page": 77
        },
        {
          "title": "2. Relational persistence",
          "task": "Defend an external database over Reliable Collections for strong relational requirements.",
          "page": 77
        },
        {
          "title": "3. Latency-critical communication",
          "task": "Defend synchronous calls over a queue when latency is critical.",
          "page": 77
        },
        {
          "title": "4. Partition complexity",
          "task": "Defend a more complex partitioning scheme against a simpler one.",
          "page": 77
        },
        {
          "title": "5. Reversal conditions",
          "task": "For every defense, state the exact constraint that would reverse the decision.",
          "page": 77
        }
      ],
      "criteria": [
        "At least 80% coherent answers without notes."
      ],
      "recovery": "Repair the missing requirement, alternative or switch condition and repeat the weak defense."
    },
    {
      "id": "fabric-capstone-1",
      "sourceId": "Capstone 1",
      "title": "Local Service Fabric System",
      "phaseId": "core-development",
      "role": "practice",
      "pages": [
        77,
        78
      ],
      "summary": "Integrate at least one stateless and one stateful service into an inspected and documented local application.",
      "action": "Outline the two-service local system and its lifecycle evidence before building.",
      "minutes": 75,
      "concepts": [
        "stateless service",
        "stateful service",
        "configuration",
        "deployment lifecycle",
        "architecture",
        "failure test"
      ],
      "sections": [
        {
          "heading": "Required evidence",
          "paragraphs": [
            "The heading starts on page 77; its task and evidence are on page 78."
          ],
          "items": [
            "Repository or sanitized lab notes.",
            "Architecture diagram.",
            "Deployment notes.",
            "Failure test."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Local application capstone",
          "task": "Build at least one stateless and one stateful service, inspect the application, change configuration and document its lifecycle.",
          "check": "Supply the listed architecture, deployment and failure evidence.",
          "page": 78
        }
      ],
      "criteria": [
        "Provide the source-listed evidence; no extra mandatory canonical gate or numeric threshold is added."
      ],
      "recovery": "Use the failed implementation or lifecycle dimension to select a minimal corrective lab."
    },
    {
      "id": "fabric-capstone-2",
      "sourceId": "Capstone 2",
      "title": "Failure Lab",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        78
      ],
      "summary": "Run controlled local experiments from an explicit fault matrix and verify invariants after recovery.",
      "action": "Define one fault's precondition, invariant, observation and recovery plan.",
      "minutes": 75,
      "concepts": [
        "fault matrix",
        "controlled failure",
        "precondition",
        "invariant",
        "recovery",
        "residual risk"
      ],
      "sections": [
        {
          "heading": "Required evidence",
          "paragraphs": [],
          "items": [
            "Starting precondition and injected fault.",
            "Predicted invariant and observed result.",
            "Verified recovery and remaining risk."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Controlled local fault capstone",
          "task": "Create a fault matrix and run bounded failure experiments against the local system.",
          "check": "Record all listed evidence for each experiment.",
          "page": 78
        }
      ],
      "criteria": [
        "Each experiment has the stated evidence, not merely a successful restart."
      ],
      "recovery": "Restore known-good state and repeat only the failed invariant or observation test."
    },
    {
      "id": "fabric-capstone-3",
      "sourceId": "Capstone 3",
      "title": "Migration Architecture",
      "phaseId": "real-world-application",
      "role": "practice",
      "pages": [
        78
      ],
      "summary": "Build a factual, sanitized migration model with explicit unknowns and a validated decision.",
      "action": "Identify authorized evidence for current state, target state and component owners.",
      "minutes": 60,
      "concepts": [
        "current state",
        "target state",
        "dependencies",
        "unknowns",
        "ownership",
        "validated decision"
      ],
      "sections": [
        {
          "heading": "Required evidence and privacy",
          "paragraphs": [
            "Use real work only with appropriate authorization and sanitization; absent real inputs do not become fabricated experience."
          ],
          "items": [
            "Current and target views.",
            "Dependency map and unknowns.",
            "Ownership boundaries.",
            "One validated design decision."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Migration model capstone",
          "task": "Map an authorized real migration without exposing confidential details.",
          "check": "Provide all listed evidence and leave unsupported fields unknown.",
          "page": 78
        }
      ],
      "criteria": [
        "The model is evidence-grounded and includes one validated decision."
      ],
      "recovery": "Investigate the unsupported component or decision through authorized sources; do not invent missing context."
    },
    {
      "id": "fabric-capstone-4",
      "sourceId": "Capstone 4",
      "title": "Production Reasoning",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        78
      ],
      "summary": "Analyze one real authorized or synthetic operational problem end to end with bounded conclusions.",
      "action": "Choose a performance, health, upgrade or security problem and state competing hypotheses.",
      "minutes": 60,
      "concepts": [
        "performance",
        "health",
        "upgrade",
        "security",
        "measurements",
        "bounded conclusion",
        "fix",
        "rollback",
        "prevention"
      ],
      "sections": [
        {
          "heading": "Required evidence",
          "paragraphs": [],
          "items": [
            "Symptom, hypotheses and measurements.",
            "Confirmed root cause or explicitly bounded conclusion.",
            "Fix, rollback and prevention."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Operational reasoning capstone",
          "task": "Analyze one real authorized or synthetic performance, health, upgrade or security problem end to end.",
          "check": "Support the conclusion and recovery proposal with the listed evidence.",
          "page": 78
        }
      ],
      "criteria": [
        "A bounded evidence-based conclusion is acceptable when root cause remains unknown."
      ],
      "recovery": "Collect the minimum missing evidence and revise only unsupported hypotheses or actions."
    },
    {
      "id": "fabric-capstone-5",
      "sourceId": "Capstone 5",
      "title": "Interview Case",
      "phaseId": "interview-career",
      "role": "practice",
      "pages": [
        78
      ],
      "summary": "Present a factual five-minute architecture case and defend it under follow-up questions.",
      "action": "Prepare a one-page case summary with a diagram and precise contribution boundary.",
      "minutes": 45,
      "concepts": [
        "five-minute case",
        "diagram",
        "question bank",
        "failure scenario",
        "trade-off defense",
        "ownership statement"
      ],
      "sections": [
        {
          "heading": "Required evidence",
          "paragraphs": [],
          "items": [
            "One-page summary and diagram.",
            "Question bank and failure scenario.",
            "Defended trade-off and accurate ownership statement."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Five-minute interview capstone",
          "task": "Present the sanitized migration architecture in five minutes and respond to follow-up questions.",
          "check": "Support answers with the listed evidence; do not overclaim ownership.",
          "page": 78
        }
      ],
      "criteria": [
        "Provide the complete source-listed evidence and a defensible account."
      ],
      "recovery": "Return to the technical evidence behind a weak follow-up and repeat that part."
    },
    {
      "id": "fabric-capstone-6",
      "sourceId": "Capstone 6",
      "title": "Architect Defense",
      "phaseId": "interview-career",
      "role": "practice",
      "pages": [
        78
      ],
      "summary": "Design a new system while treating Service Fabric as one candidate rather than a predetermined answer.",
      "action": "State requirements, scale and NFRs before choosing platform responsibilities.",
      "minutes": 75,
      "concepts": [
        "requirements",
        "scale",
        "NFRs",
        "architecture",
        "failure handling",
        "security",
        "observability",
        "cost",
        "alternatives",
        "platform rejection"
      ],
      "sections": [
        {
          "heading": "Required evidence",
          "paragraphs": [],
          "items": [
            "Requirements, scale assumptions and non-functional requirements.",
            "Architecture, failure handling, security and observability.",
            "Cost and credible alternatives.",
            "Explicit reasons to select or reject Service Fabric."
          ]
        }
      ],
      "exercises": [
        {
          "title": "New-system defense capstone",
          "task": "Design a new system, compare Service Fabric with an alternative, and defend selection or rejection.",
          "check": "Provide the complete stated evidence set.",
          "page": 78
        }
      ],
      "criteria": [
        "The decision follows constraints and includes a credible alternative."
      ],
      "recovery": "Repair the unsupported requirement or trade-off rather than redrawing the whole system."
    },
    {
      "id": "fabric-retention",
      "sourceId": "Review, Retention and Re-Entry",
      "title": "Review, Retention and Re-Entry",
      "phaseId": "interview-career",
      "role": "reference",
      "pages": [
        79
      ],
      "summary": "Use spaced retrieval and changed-context practice without resetting the permanent roadmap.",
      "action": "Probe the active checkpoint's mental model without notes and choose the smallest needed recovery task.",
      "minutes": 30,
      "concepts": [
        "retrieval",
        "spaced review",
        "re-entry",
        "transfer",
        "trade-off defense",
        "quarterly review",
        "save state"
      ],
      "sections": [
        {
          "heading": "Intervals and evidence",
          "paragraphs": [
            "The intervals are source review guidance, not fabricated due dates. A break weakens recall but does not erase the roadmap."
          ],
          "items": [
            "Same session: mental-model recall \u2192 no-notes explanation.",
            "About one week: blank-page reconstruction \u2192 diagram plus failure path.",
            "About two to three weeks: modified case \u2192 transfer artifact.",
            "About one month: unfamiliar design \u2192 trade-off defense.",
            "Before an interview: timed project deep dive \u2192 mock interview.",
            "Quarterly: documentation refresh \u2192 change log and targeted lab."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Same-session retrieval",
          "task": "Recall the mental model without notes.",
          "check": "Produce a no-notes explanation.",
          "page": 79
        },
        {
          "title": "Approximately one-week reconstruction",
          "task": "Rebuild from a blank page.",
          "check": "Produce a diagram and failure path.",
          "page": 79
        },
        {
          "title": "Approximately two-to-three-week variation",
          "task": "Solve a modified case.",
          "check": "Produce a transfer artifact.",
          "page": 79
        },
        {
          "title": "Approximately one-month design",
          "task": "Solve an unfamiliar design.",
          "check": "Defend a trade-off.",
          "page": 79
        },
        {
          "title": "Pre-interview deep dive",
          "task": "Perform a timed project explanation.",
          "check": "Record mock-interview evidence.",
          "page": 79
        },
        {
          "title": "Quarterly refresh",
          "task": "Review relevant current documentation.",
          "check": "Produce a change log and targeted validation lab where needed.",
          "page": 79
        }
      ],
      "criteria": [
        "Retained capability requires delayed no-notes success; a review schedule alone is not evidence."
      ],
      "recovery": "Read the actual save state, probe recall and resume the next evidence-producing task without restarting."
    },
    {
      "id": "fabric-career-evidence",
      "sourceId": "Professional Application and Career Evidence",
      "title": "Professional Application and Career Evidence",
      "phaseId": "interview-career",
      "role": "reference",
      "pages": [
        80
      ],
      "summary": "Connect technical artifacts to architecture, reliability, operations and interview reasoning with accurate contribution language.",
      "action": "Select one supported artifact and answer what happened, why, how it was validated and what you actually owned.",
      "minutes": 30,
      "concepts": [
        "service model",
        "partitioning",
        "failure",
        "upgrade",
        "observability",
        "security",
        "performance",
        "migration",
        "ownership discipline"
      ],
      "sections": [
        {
          "heading": "Capability \u2192 artifact \u2192 use",
          "paragraphs": [],
          "items": [
            "Service model \u2192 stateful/stateless decision record \u2192 architecture reasoning.",
            "Partitioning \u2192 key/hotspot analysis \u2192 scaling reasoning.",
            "Failure \u2192 fault test or incident reconstruction \u2192 reliability.",
            "Upgrade \u2192 compatibility and rollback plan \u2192 production-change reasoning.",
            "Observability \u2192 triage/runbook \u2192 operations.",
            "Security \u2192 trust-boundary and rotation plan \u2192 security plus availability.",
            "Performance \u2192 measured experiment \u2192 optimization.",
            "Migration \u2192 sanitized case study \u2192 interview evidence."
          ]
        },
        {
          "heading": "Ownership discipline",
          "paragraphs": [
            "Use implemented, investigated, contributed, observed or learned from only when evidence supports the verb. A team outcome is not automatically a personal achievement."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Event",
          "task": "Explain what actually happened.",
          "page": 80
        },
        {
          "title": "2. Mechanism",
          "task": "Identify the technical mechanism involved.",
          "page": 80
        },
        {
          "title": "3. Rationale",
          "task": "Explain why the approach fit the constraints.",
          "page": 80
        },
        {
          "title": "4. Failure",
          "task": "Identify what could fail.",
          "page": 80
        },
        {
          "title": "5. Validation",
          "task": "Explain how behavior was validated.",
          "page": 80
        },
        {
          "title": "6. Alternative",
          "task": "Describe a credible alternative.",
          "page": 80
        },
        {
          "title": "7. Contribution",
          "task": "State what you personally owned, using supported verbs.",
          "page": 80
        },
        {
          "title": "8. Reflection",
          "task": "Explain what you would change now.",
          "page": 80
        }
      ],
      "criteria": [
        "Career claims must remain traceable to actual artifacts and contribution."
      ],
      "recovery": "Return to source evidence and narrow unsupported claims rather than polishing invented details."
    },
    {
      "id": "fabric-competency-matrix",
      "sourceId": "Final Competency Matrix",
      "title": "Final Competency Matrix",
      "phaseId": "interview-career",
      "role": "reference",
      "pages": [
        81
      ],
      "summary": "Audit 23 capabilities across six evidence levels without importing the source's status glyphs as completion.",
      "action": "Choose one capability and link actual evidence to its level; leave unsupported cells unclaimed.",
      "minutes": 30,
      "concepts": [
        "Familiar",
        "Practiced",
        "Applied",
        "Transferred",
        "Demonstrated",
        "Retained",
        "evidence ledger",
        "competency audit"
      ],
      "sections": [
        {
          "heading": "Six-column evidence matrix",
          "paragraphs": [
            "Each capability has Familiar, Practiced, Applied, Transferred, Demonstrated and Retained columns. A marker only records status; the evidence ledger must identify the supporting artifact or exercise."
          ],
          "items": [
            "Why Service Fabric / platform choice.",
            "Cluster / node / application / service model.",
            "Stateful versus stateless.",
            "Partitions and replicas.",
            "Service Fabric Explorer / health.",
            "Local development loop.",
            "Stateless implementation.",
            "Stateful implementation / Reliable Collections.",
            "Service communication.",
            "Configuration.",
            "Fault testing.",
            "Migration architecture.",
            "Work-to-learning mapping.",
            "Fault tolerance / high availability.",
            "Scaling / load balancing.",
            "Rolling upgrades.",
            "Health / diagnostics.",
            "Security.",
            "Performance.",
            "Migration case study.",
            "System design with Service Fabric.",
            "Trade-off defense.",
            "Interview communication."
          ]
        }
      ],
      "exercises": [],
      "criteria": [
        "Every claimed cell must reference evidence appropriate to that level; no source glyph is treated as achieved progress."
      ],
      "recovery": "Probe a weak capability and repair its failed dimension rather than clearing the whole matrix."
    },
    {
      "id": "fabric-question-bank",
      "sourceId": "Appendix A",
      "title": "Service Fabric Reasoning Question Bank",
      "phaseId": "interview-career",
      "role": "practice",
      "pages": [
        84,
        85
      ],
      "summary": "Practice all 51 source-numbered reasoning questions across lifecycle, state, failure, scaling, security and architecture defense.",
      "action": "Answer one numbered question without notes, then add a failure case and a decision boundary.",
      "minutes": 45,
      "concepts": [
        "platform responsibility",
        "state ownership",
        "partitioning",
        "replication",
        "placement",
        "discovery",
        "health",
        "lifecycle",
        "upgrades",
        "rollback",
        "retries",
        "async semantics",
        "skew",
        "trust",
        "p99",
        "caching",
        "migration",
        "ownership",
        "design evolution"
      ],
      "sections": [
        {
          "heading": "Question-bank use",
          "paragraphs": [
            "This bank is supplemental practice, not fifty-one new checkpoint gates. Keep the original question numbers and use evidence-based answers."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Platform responsibility",
          "task": "Which parts of a distributed application does Service Fabric own?",
          "page": 84
        },
        {
          "title": "2. Remaining responsibilities",
          "task": "When the platform owns placement and failover, which work disappears and which remains with the application?",
          "page": 84
        },
        {
          "title": "3. Stateless fit",
          "task": "Under what conditions is stateless the simpler choice?",
          "page": 84
        },
        {
          "title": "4. Stateful fit",
          "task": "When do stateful benefits justify added complexity?",
          "page": 84
        },
        {
          "title": "5. Partitioning versus replication",
          "task": "Distinguish dividing state from keeping copies.",
          "page": 84
        },
        {
          "title": "6. Replica throughput limits",
          "task": "Why might extra replicas not increase throughput?",
          "page": 84
        },
        {
          "title": "7. Hot partitions",
          "task": "What conditions create a hot partition?",
          "page": 84
        },
        {
          "title": "8. Placement diagnosis",
          "task": "How would you identify a placement problem?",
          "page": 84
        },
        {
          "title": "9. Stateless node loss",
          "task": "Explain node-loss consequences for a stateless service.",
          "page": 84
        },
        {
          "title": "10. Stateful node loss",
          "task": "Explain node-loss consequences for a stateful service.",
          "page": 84
        },
        {
          "title": "11. Replica roles",
          "task": "Explain the responsibilities of primary and secondary replicas.",
          "page": 84
        },
        {
          "title": "12. Discovery and movement",
          "task": "How does a caller find a service after placement changes?",
          "page": 84
        },
        {
          "title": "13. Service definitions and instances",
          "task": "Distinguish a service type from a named service.",
          "page": 84
        },
        {
          "title": "14. Application definitions and instances",
          "task": "Distinguish application type from application instance.",
          "page": 84
        },
        {
          "title": "15. Health levels",
          "task": "Compare application and service health.",
          "page": 84
        },
        {
          "title": "16. Evidence before restart",
          "task": "Which evidence should be captured before restarting an unhealthy service?",
          "page": 84
        },
        {
          "title": "17. Local learning value",
          "task": "Why does a local cluster help distributed-systems learning?",
          "page": 84
        },
        {
          "title": "18. Local evidence limit",
          "task": "Why does local behavior not prove production behavior?",
          "page": 84
        },
        {
          "title": "19. Package lifecycle",
          "task": "Trace the application package to running service lifecycle.",
          "page": 84
        },
        {
          "title": "20. Deployment versus runtime",
          "task": "Why should deployment and runtime state be modeled separately?",
          "page": 84
        },
        {
          "title": "21. Upgrade safety",
          "task": "What conditions make a rolling upgrade safe?",
          "page": 84
        },
        {
          "title": "22. Version coexistence",
          "task": "What must be considered when old and new versions coexist?",
          "page": 84
        },
        {
          "title": "23. Compatibility as mechanism",
          "task": "Explain how backward compatibility enables deployment.",
          "page": 84
        },
        {
          "title": "24. Rollback versus forward repair",
          "task": "When can rollback be harder than forward repair?",
          "page": 84
        },
        {
          "title": "25. Useful health",
          "task": "What makes a health signal actionable?",
          "page": 84
        },
        {
          "title": "26. Complementary telemetry",
          "task": "Explain how logs, metrics, traces and health complement each other.",
          "page": 84
        },
        {
          "title": "27. Green health during outage",
          "task": "Why can users experience an outage while health is green?",
          "page": 84
        },
        {
          "title": "28. Retry amplification",
          "task": "How can retries worsen an outage?",
          "page": 84
        },
        {
          "title": "29. Retry budget",
          "task": "Explain a retry budget and its purpose.",
          "page": 84
        },
        {
          "title": "30. Asynchronous fit",
          "task": "When is asynchronous communication preferable?",
          "page": 84
        },
        {
          "title": "31. Async consistency",
          "task": "Which consistency assumptions change when replacing synchronous calls with asynchronous communication?",
          "page": 84
        },
        {
          "title": "32. Key selection",
          "task": "How would you choose a partition key?",
          "page": 84
        },
        {
          "title": "33. Skew detection",
          "task": "How would you detect traffic or data skew?",
          "page": 84
        },
        {
          "title": "34. Failure domain",
          "task": "Define a failure domain in the relevant topology.",
          "page": 84
        },
        {
          "title": "35. Correlated failure",
          "task": "Why is correlated failure more dangerous than independent failures?",
          "page": 84
        },
        {
          "title": "36. Rotation availability",
          "task": "How can certificate rotation affect availability?",
          "page": 84
        },
        {
          "title": "37. Trust boundaries",
          "task": "Identify the application's Service Fabric trust boundaries.",
          "page": 84
        },
        {
          "title": "38. Secret separation",
          "task": "Explain why secrets require different treatment from ordinary configuration.",
          "page": 84
        },
        {
          "title": "39. Pre-change performance investigation",
          "task": "Describe performance investigation before modifying code.",
          "page": 84
        },
        {
          "title": "40. Tail versus average",
          "task": "Why is p99 often more useful than average latency?",
          "page": 84
        },
        {
          "title": "41. Cache consistency",
          "task": "How can caching introduce consistency problems?",
          "page": 84
        },
        {
          "title": "42. Reliable Collections poor fit",
          "task": "When are Reliable Collections unsuitable?",
          "page": 85
        },
        {
          "title": "43. External database boundary",
          "task": "When is an external database the better owner of state?",
          "page": 85
        },
        {
          "title": "44. Migration rollback",
          "task": "How would you design a migration rollback?",
          "page": 85
        },
        {
          "title": "45. Migration diagram",
          "task": "What relationships belong in a migration architecture view?",
          "page": 85
        },
        {
          "title": "46. Failure diagram",
          "task": "What belongs in a failure and recovery view?",
          "page": 85
        },
        {
          "title": "47. Contribution boundaries",
          "task": "How do you separate team ownership from personal contribution?",
          "page": 85
        },
        {
          "title": "48. Credible project story",
          "task": "What makes a Service Fabric interview case credible?",
          "page": 85
        },
        {
          "title": "49. Rejecting the platform",
          "task": "Which workload constraints would make you reject Service Fabric?",
          "page": 85
        },
        {
          "title": "50. Tenfold traffic",
          "task": "How would 10\u00d7 traffic change the design?",
          "page": 85
        },
        {
          "title": "51. Hard availability requirement",
          "task": "How would a new strict availability requirement change the design?",
          "page": 85
        }
      ],
      "criteria": [
        "Use the common evidence and targeted-recovery model; this bank supplies no additional numerical threshold."
      ],
      "recovery": "Convert each weak answer into a focused recall, variation or failure drill and retest after a delay."
    },
    {
      "id": "fabric-artifact-checklist",
      "sourceId": "Appendix B",
      "title": "Artifact Checklist",
      "phaseId": "interview-career",
      "role": "reference",
      "pages": [
        86
      ],
      "summary": "Audit roadmap integrity and the complete evidence portfolio while preserving if-reached conditions.",
      "action": "Check one reached capability against its actual artifact; do not create completion from a checklist.",
      "minutes": 30,
      "concepts": [
        "artifact audit",
        "roadmap integrity",
        "active checkpoint",
        "environment notes",
        "implementation evidence",
        "diagram portfolio",
        "decision record",
        "competency matrix"
      ],
      "sections": [
        {
          "heading": "Source artifact checklist",
          "paragraphs": [
            "Setup and implementation artifacts are conditional on reaching those activities. The checklist is not a claim that they already exist."
          ],
          "items": [
            "Preserve the canonical roadmap and original checkpoint IDs.",
            "Show exactly one active checkpoint for actual work.",
            "Keep Current Stage, Current Checkpoint, Status and Next Unlock accurate.",
            "Local environment notes, if reached.",
            "Stateless service artifact, if reached.",
            "Stateful service artifact, if reached.",
            "Service communication diagram.",
            "Configuration classification note.",
            "Fault matrix.",
            "Migration current-state view.",
            "Migration target-state view.",
            "Dependency map.",
            "Work-to-learning mappings.",
            "Validated design decision.",
            "Failure analysis or incident reconstruction.",
            "Upgrade compatibility and rollback plan.",
            "Observability and health map.",
            "Security trust-boundary view.",
            "Performance experiment.",
            "Sanitized migration case study.",
            "30-second and two-minute explanations.",
            "Question bank and mock-interview notes.",
            "System-design case with alternatives and trade-offs.",
            "Final competency evidence matrix."
          ]
        }
      ],
      "exercises": [],
      "criteria": [
        "Record actual artifacts and unmet requirements; preserve conditional items and ownership limits."
      ],
      "recovery": "Use the missing artifact to select a targeted next evidence-producing task without resetting unrelated work."
    },
    {
      "id": "fabric-lab-01",
      "sourceId": "Lab 01",
      "title": "Platform Choice Matrix",
      "phaseId": "foundation",
      "role": "practice",
      "pages": [
        88,
        89
      ],
      "summary": "Compare a stateless API, stateful session service, batch worker and containerized legacy process using constraints rather than familiarity.",
      "action": "Write requirements and state ownership for the four source workloads.",
      "minutes": 45,
      "concepts": [
        "platform choice",
        "workload shape",
        "state ownership",
        "availability",
        "scaling",
        "platform mechanisms",
        "rejection criteria"
      ],
      "sections": [
        {
          "heading": "Applied lab",
          "paragraphs": [
            "Use all four workloads and the shared six-field lab evidence protocol. Changing a requirement should lead to a focused decision update, not a complete rewrite."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Requirements",
          "task": "Write each workload's requirements.",
          "page": 89
        },
        {
          "title": "2. State",
          "task": "Classify authoritative state ownership.",
          "page": 89
        },
        {
          "title": "3. Availability and scale",
          "task": "Identify availability and scaling needs.",
          "page": 89
        },
        {
          "title": "4. Helpful mechanisms",
          "task": "List platform mechanisms that address those needs.",
          "page": 89
        },
        {
          "title": "5. Rejection conditions",
          "task": "List reasons Service Fabric may be unsuitable.",
          "page": 89
        },
        {
          "title": "6. Five-sentence defense",
          "task": "Defend the decision in five sentences.",
          "page": 89
        },
        {
          "title": "Changed requirement",
          "task": "Change one requirement and update the platform choice.",
          "check": "Revise only the affected analysis.",
          "page": 89
        }
      ],
      "criteria": [
        "Update the choice after one requirement changes without rewriting the whole analysis.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Revisit the missing workload constraint and repeat the decision variation."
    },
    {
      "id": "fabric-lab-02",
      "sourceId": "Lab 02",
      "title": "Object Hierarchy Navigation",
      "phaseId": "foundation",
      "role": "practice",
      "pages": [
        88,
        90
      ],
      "summary": "Trace a hypothetical unhealthy replica through relevant cluster, node, application, service and partition relationships.",
      "action": "Name the unhealthy replica and separate its logical parent from its physical host.",
      "minutes": 45,
      "concepts": [
        "cluster",
        "node",
        "application",
        "service",
        "partition",
        "replica",
        "deployment objects",
        "runtime entities",
        "diagnostic surfaces"
      ],
      "sections": [
        {
          "heading": "Applied lab",
          "paragraphs": [
            "Use a hypothetical failure. Keep observations separate from causal hypotheses and capture the shared lab evidence fields."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Entities",
          "task": "Name each entity along the hierarchy/navigation path.",
          "page": 90
        },
        {
          "title": "2. Layer information",
          "task": "State which information belongs at each layer.",
          "page": 90
        },
        {
          "title": "3. Diagnostic surfaces",
          "task": "Identify likely evidence surfaces.",
          "page": 90
        },
        {
          "title": "4. Observation versus hypothesis",
          "task": "Separate reported facts from proposed causes.",
          "page": 90
        },
        {
          "title": "5. Safe investigation",
          "task": "Write the safest next investigation step.",
          "page": 90
        }
      ],
      "criteria": [
        "Explain the hierarchy without mixing deployment definitions and runtime entities.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Redraw only the confused relationship and re-explain the relevant layer."
    },
    {
      "id": "fabric-lab-03",
      "sourceId": "Lab 03",
      "title": "Stateful vs Stateless Redesign",
      "phaseId": "foundation",
      "role": "practice",
      "pages": [
        88,
        91
      ],
      "summary": "Design one workload with external persistence and with service-local replicated state, then defend the ownership choice.",
      "action": "State one invariant shared by both candidate designs.",
      "minutes": 60,
      "concepts": [
        "business invariant",
        "authoritative state",
        "external store",
        "replicated state",
        "latency",
        "failure behavior",
        "operational complexity",
        "migration"
      ],
      "sections": [
        {
          "heading": "Two versions of one workload",
          "paragraphs": [
            "Keep the workload constant while comparing stateless plus external store against stateful local replicated state. Apply the shared lab evidence protocol."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Invariant",
          "task": "Define the business invariant.",
          "page": 91
        },
        {
          "title": "2. State placement",
          "task": "Place authoritative state in both designs.",
          "page": 91
        },
        {
          "title": "3. Failure comparison",
          "task": "Compare failure and recovery behavior.",
          "page": 91
        },
        {
          "title": "4. Latency and operations",
          "task": "Compare latency and operating complexity.",
          "page": 91
        },
        {
          "title": "5. Migration implications",
          "task": "Identify migration consequences of each choice.",
          "page": 91
        },
        {
          "title": "Reversal condition",
          "task": "State a concrete condition that would reverse the recommendation.",
          "check": "The condition follows from workload requirements.",
          "page": 91
        }
      ],
      "criteria": [
        "Identify a concrete decision-reversal condition.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Revisit the failed invariant, ownership or recovery comparison rather than rebuilding both designs."
    },
    {
      "id": "fabric-lab-04",
      "sourceId": "Lab 04",
      "title": "Partition Key Stress Test",
      "phaseId": "foundation",
      "role": "practice",
      "pages": [
        88,
        92
      ],
      "summary": "Compare three candidate partition keys for a skewed customer workload while preserving ordering and locality.",
      "action": "List three candidate keys and estimate each one's traffic distribution.",
      "minutes": 60,
      "concepts": [
        "partition key",
        "skew",
        "hot key",
        "ordering",
        "locality",
        "scaling ceiling",
        "business semantics"
      ],
      "sections": [
        {
          "heading": "Three-key comparison",
          "paragraphs": [
            "Evaluate all three keys rather than assuming uniform traffic. Capture the shared lab evidence fields."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Distribution",
          "task": "Estimate distribution for three candidate keys.",
          "page": 92
        },
        {
          "title": "2. Hot-key risk",
          "task": "Identify concentrated-key traffic risks.",
          "page": 92
        },
        {
          "title": "3. Ordering",
          "task": "Check the workload's ordering requirement.",
          "page": 92
        },
        {
          "title": "4. Locality",
          "task": "Check required data or processing locality.",
          "page": 92
        },
        {
          "title": "5. Scaling ceiling",
          "task": "State each candidate's scaling ceiling and select a key.",
          "page": 92
        }
      ],
      "criteria": [
        "Justify the selected key using both workload distribution and business semantics.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Recheck the distribution estimate or violated semantic constraint and revise the affected candidate."
    },
    {
      "id": "fabric-lab-05",
      "sourceId": "Lab 05",
      "title": "Replica Failure Walkthrough",
      "phaseId": "foundation",
      "role": "practice",
      "pages": [
        88,
        93
      ],
      "summary": "Reason through node disappearance while a stateful service serves traffic without claiming instantaneous recovery.",
      "action": "Record replica placement and the pre-failure serving state.",
      "minutes": 45,
      "concepts": [
        "node loss",
        "replica placement",
        "reconfiguration",
        "client risk",
        "recovery evidence",
        "stateful traffic"
      ],
      "sections": [
        {
          "heading": "Failure sequence",
          "paragraphs": [
            "Use a simulated or local bounded node-loss scenario and the shared lab evidence protocol."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Baseline",
          "task": "Record the pre-failure state.",
          "page": 93
        },
        {
          "title": "2. Affected replicas",
          "task": "Identify replicas on the lost node.",
          "page": 93
        },
        {
          "title": "3. Reconfiguration",
          "task": "Describe the expected reconfiguration sequence.",
          "page": 93
        },
        {
          "title": "4. User-visible risk",
          "task": "Identify effects visible to clients.",
          "page": 93
        },
        {
          "title": "5. Recovery proof",
          "task": "Define evidence that establishes recovery.",
          "page": 93
        }
      ],
      "criteria": [
        "Explain the sequence without assuming recovery is instantaneous.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Revisit the missing transition or client effect and verify the relevant invariant."
    },
    {
      "id": "fabric-lab-06",
      "sourceId": "Lab 06",
      "title": "Explorer Incident Triage",
      "phaseId": "foundation",
      "role": "practice",
      "pages": [
        88,
        94
      ],
      "summary": "Analyze a simulated node warning, unhealthy service and degraded partition with three discriminating hypotheses.",
      "action": "Separate the snapshot's three symptoms from causal explanations.",
      "minutes": 45,
      "concepts": [
        "Service Fabric Explorer",
        "node warning",
        "unhealthy service",
        "degraded partition",
        "three hypotheses",
        "minimum evidence",
        "safe action"
      ],
      "sections": [
        {
          "heading": "Simulated snapshot",
          "paragraphs": [
            "The source specifies snapshot conditions but supplies no actual screenshot. Work from a clearly labeled simulation and record the shared evidence fields."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Symptoms",
          "task": "Start with the node warning, unhealthy service and degraded partition observations.",
          "page": 94
        },
        {
          "title": "2. Three hypotheses",
          "task": "Build three plausible explanations.",
          "page": 94
        },
        {
          "title": "3. Discriminating evidence",
          "task": "Request the minimum evidence needed for each.",
          "page": 94
        },
        {
          "title": "4. Avoid premature restart",
          "task": "Explain why a restart is premature before the evidence is captured.",
          "page": 94
        },
        {
          "title": "5. Safe next action",
          "task": "Write a bounded evidence-led next action.",
          "page": 94
        }
      ],
      "criteria": [
        "Distinguish observation, hypothesis and confirmed cause.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Return to unclassified observations and collect the missing discriminating evidence."
    },
    {
      "id": "fabric-lab-07",
      "sourceId": "Lab 07",
      "title": "Stateless API Resilience",
      "phaseId": "core-development",
      "role": "practice",
      "pages": [
        88,
        95
      ],
      "summary": "Bound a request path's response to a slow downstream dependency through timeout, cancellation and safe retry eligibility.",
      "action": "Set a local request deadline and determine which operations are safely retryable.",
      "minutes": 60,
      "concepts": [
        "timeout",
        "cancellation propagation",
        "retry eligibility",
        "idempotency",
        "non-retryable operation",
        "retry storm",
        "client-visible behavior"
      ],
      "sections": [
        {
          "heading": "One-dependency resilience",
          "paragraphs": [
            "Build a local request path with one slow downstream dependency; apply the shared lab evidence protocol."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Timeout",
          "task": "Set a timeout for the request path.",
          "page": 95
        },
        {
          "title": "2. Cancellation",
          "task": "Propagate cancellation to downstream work.",
          "page": 95
        },
        {
          "title": "3. Retry eligibility",
          "task": "Define when a retry is allowed.",
          "page": 95
        },
        {
          "title": "4. Non-idempotent safety",
          "task": "Make non-idempotent operations safe to retry or explicitly non-retryable.",
          "page": 95
        },
        {
          "title": "5. Client observation",
          "task": "Measure behavior visible to clients during slowdown.",
          "page": 95
        }
      ],
      "criteria": [
        "A dependency slowdown must not produce an uncontrolled retry storm.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Restore the baseline, repair the failed budget or eligibility rule and retest the slow path."
    },
    {
      "id": "fabric-lab-08",
      "sourceId": "Lab 08",
      "title": "Reliable Collection Transaction",
      "phaseId": "core-development",
      "role": "practice",
      "pages": [
        88,
        96
      ],
      "summary": "Model an order update spanning two related state changes and identify the transaction's exact protection boundary.",
      "action": "Write the two-change invariant before choosing the reliable collection structure.",
      "minutes": 60,
      "concepts": [
        "order update",
        "business invariant",
        "collection structure",
        "transaction scope",
        "partial failure",
        "serialization",
        "protection boundary"
      ],
      "sections": [
        {
          "heading": "Two related updates",
          "paragraphs": [
            "Test in a local or synthetic system. Capture the shared evidence fields and explicitly identify effects outside the transaction."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Invariant",
          "task": "Define the invariant relating the two changes.",
          "page": 96
        },
        {
          "title": "2. Collection",
          "task": "Select an appropriate collection structure.",
          "page": 96
        },
        {
          "title": "3. Transaction",
          "task": "Define the supported transaction scope.",
          "page": 96
        },
        {
          "title": "4. Partial failure",
          "task": "Test a bounded partial failure.",
          "page": 96
        },
        {
          "title": "5. Serialization",
          "task": "Explain serialization implications.",
          "page": 96
        }
      ],
      "criteria": [
        "State exactly what the transaction protects and what remains outside it.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Recheck the invariant and smallest partial-failure case without assuming cross-boundary atomicity."
    },
    {
      "id": "fabric-lab-09",
      "sourceId": "Lab 09",
      "title": "Service Communication Failure",
      "phaseId": "core-development",
      "role": "practice",
      "pages": [
        88,
        97
      ],
      "summary": "Compare direct node and logical service addressing when the destination moves, including timeout and messaging alternatives.",
      "action": "Draw direct-address and logical-address request paths side by side.",
      "minutes": 60,
      "concepts": [
        "node addressing",
        "logical addressing",
        "service movement",
        "timeout",
        "synchronous communication",
        "asynchronous communication",
        "caller correctness"
      ],
      "sections": [
        {
          "heading": "Mobility experiment",
          "paragraphs": [
            "Move only a local or authorized sandbox service; a synthetic walkthrough is valid when execution is unavailable. Use the shared evidence protocol."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Two flows",
          "task": "Draw direct-node and logical-service addressing flows.",
          "page": 97
        },
        {
          "title": "2. Destination movement",
          "task": "Move the destination in the safe test system or explicit simulation.",
          "page": 97
        },
        {
          "title": "3. Broken assumptions",
          "task": "Identify assumptions invalidated by movement.",
          "page": 97
        },
        {
          "title": "4. Timeout behavior",
          "task": "Add timeout behavior to the caller.",
          "page": 97
        },
        {
          "title": "5. Communication alternatives",
          "task": "Compare synchronous and asynchronous designs.",
          "page": 97
        }
      ],
      "criteria": [
        "The caller remains correct despite placement changes.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Repair the placement-coupled identity or timeout assumption and repeat the movement case."
    },
    {
      "id": "fabric-lab-10",
      "sourceId": "Lab 10",
      "title": "Configuration Safety Review",
      "phaseId": "core-development",
      "role": "practice",
      "pages": [
        88,
        98
      ],
      "summary": "Review a fictional production configuration proposal for ownership, secret handling, defaults, validation, rollback and impact.",
      "action": "Classify each proposed setting and identify high-risk defaults without changing any live configuration.",
      "minutes": 45,
      "concepts": [
        "configuration classification",
        "secrets",
        "dangerous defaults",
        "validation signal",
        "rollback",
        "blast radius",
        "ownership"
      ],
      "sections": [
        {
          "heading": "Fictional change review",
          "paragraphs": [
            "This is a design review, not permission to change production. Capture the shared evidence fields using the fictional scenario."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Classification",
          "task": "Classify every setting.",
          "page": 98
        },
        {
          "title": "2. Secrets",
          "task": "Identify values that require secret handling without collecting real secrets.",
          "page": 98
        },
        {
          "title": "3. Defaults",
          "task": "Find dangerous defaults.",
          "page": 98
        },
        {
          "title": "4. Validation",
          "task": "Define observable validation.",
          "page": 98
        },
        {
          "title": "5. Rollback",
          "task": "Define a rollback plan.",
          "page": 98
        },
        {
          "title": "6. Impact",
          "task": "Identify blast radius and responsible owners.",
          "page": 98
        }
      ],
      "criteria": [
        "Every high-risk setting has an owner, validation signal and rollback story.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Repair the specific missing owner, safe range, validation or rollback field."
    },
    {
      "id": "fabric-lab-11",
      "sourceId": "Lab 11",
      "title": "Fault Injection Matrix",
      "phaseId": "core-development",
      "role": "practice",
      "pages": [
        88,
        99
      ],
      "summary": "Specify measurable success criteria for process restart, node loss, dependency outage, bad configuration and partial upgrade.",
      "action": "Create five fault rows and state the expected invariant before considering any sandbox injection.",
      "minutes": 60,
      "concepts": [
        "process restart",
        "node loss",
        "dependency outage",
        "bad configuration",
        "partial upgrade",
        "fault matrix",
        "measurable invariant",
        "residual risk"
      ],
      "sections": [
        {
          "heading": "Five failure contexts",
          "paragraphs": [
            "Each procedure field must be completed for all five stated failures. Use the shared lab evidence protocol; execution requires a bounded local or authorized sandbox."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Preconditions",
          "task": "Record preconditions for all five fault rows.",
          "page": 99
        },
        {
          "title": "2. Injected fault",
          "task": "Specify the bounded fault in each row.",
          "page": 99
        },
        {
          "title": "3. Expected invariant",
          "task": "State a measurable expected invariant per fault.",
          "page": 99
        },
        {
          "title": "4. Observed signal",
          "task": "Specify and record the observation that tests the invariant.",
          "page": 99
        },
        {
          "title": "5. Recovery action",
          "task": "Define recovery to known-good state for each fault.",
          "page": 99
        },
        {
          "title": "6. Residual risk",
          "task": "Record remaining uncertainty and untested behavior.",
          "page": 99
        }
      ],
      "criteria": [
        "Every fault has a measurable success criterion.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Repair the missing measurement or recovery invariant in the affected row before a safe retest."
    },
    {
      "id": "fabric-lab-12",
      "sourceId": "Lab 12",
      "title": "Migration Dependency Graph",
      "phaseId": "real-world-application",
      "role": "practice",
      "pages": [
        88,
        100
      ],
      "summary": "Sequence a fictional legacy-to-Service-Fabric migration from dependencies, state ownership and compatibility.",
      "action": "Inventory fictional components and mark synchronous calls and authoritative state owners.",
      "minutes": 60,
      "concepts": [
        "component inventory",
        "data ownership",
        "synchronous calls",
        "external dependencies",
        "migration order",
        "rollback boundaries",
        "compatibility"
      ],
      "sections": [
        {
          "heading": "Fictional migration",
          "paragraphs": [
            "Do not use or imply confidential migration facts. Capture shared evidence from the fictional graph and explain its dependency constraints."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Inventory",
          "task": "Inventory components.",
          "page": 100
        },
        {
          "title": "2. Data ownership",
          "task": "Identify authoritative data owners.",
          "page": 100
        },
        {
          "title": "3. Synchronous calls",
          "task": "Mark synchronous relationships.",
          "page": 100
        },
        {
          "title": "4. External dependencies",
          "task": "Mark dependencies outside the migration boundary.",
          "page": 100
        },
        {
          "title": "5. Migration order",
          "task": "Choose a migration sequence.",
          "page": 100
        },
        {
          "title": "6. Rollback boundaries",
          "task": "Define rollback boundaries and compatibility assumptions.",
          "page": 100
        }
      ],
      "criteria": [
        "Sequencing follows dependency and compatibility constraints.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Revise only the dependency or compatibility edge that invalidates the sequence."
    },
    {
      "id": "fabric-lab-13",
      "sourceId": "Lab 13",
      "title": "Rolling Upgrade Compatibility",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        88,
        101
      ],
      "summary": "Design old/new version coexistence with health gates, explicit rollback triggers and known irreversible changes.",
      "action": "List contract changes and mark which remain compatible during partial rollout.",
      "minutes": 60,
      "concepts": [
        "mixed versions",
        "backward compatibility",
        "health gates",
        "rollback triggers",
        "irreversible changes",
        "partial rollout"
      ],
      "sections": [
        {
          "heading": "Rollout design",
          "paragraphs": [
            "This lab produces a rollout plan, not a live deployment. Use shared lab evidence to support the compatibility argument."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Contract changes",
          "task": "List all contract changes.",
          "page": 101
        },
        {
          "title": "2. Compatibility",
          "task": "Make the change backward-compatible.",
          "page": 101
        },
        {
          "title": "3. Health gates",
          "task": "Define observable health gates.",
          "page": 101
        },
        {
          "title": "4. Rollback triggers",
          "task": "Define rollback triggers before rollout.",
          "page": 101
        },
        {
          "title": "5. Irreversible changes",
          "task": "Identify changes that cannot be undone safely.",
          "page": 101
        }
      ],
      "criteria": [
        "A partial rollout should not require an emergency full-system rollback.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Repair the incompatible contract or unsafe irreversible step before any authorized rollout."
    },
    {
      "id": "fabric-lab-14",
      "sourceId": "Lab 14",
      "title": "Health vs User Experience",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        88,
        102
      ],
      "summary": "Investigate intermittent 503s despite green Service Fabric health without a restart-first response.",
      "action": "Write what health measures and compare it with the user-visible failure.",
      "minutes": 45,
      "concepts": [
        "liveness",
        "correctness",
        "request latency",
        "dependency failure",
        "retries",
        "saturation",
        "skew",
        "503"
      ],
      "sections": [
        {
          "heading": "Signals versus experience",
          "paragraphs": [
            "Treat healthy status and failing requests as separate observations. Use the shared evidence protocol to discriminate causes."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Liveness versus correctness",
          "task": "Separate process liveness from successful user behavior.",
          "page": 102
        },
        {
          "title": "2. Request latency",
          "task": "Correlate request latency with failures.",
          "page": 102
        },
        {
          "title": "3. Dependencies",
          "task": "Inspect dependency failures.",
          "page": 102
        },
        {
          "title": "4. Retries",
          "task": "Measure retry activity and amplification.",
          "page": 102
        },
        {
          "title": "5. Saturation or skew",
          "task": "Look for resource saturation or concentrated traffic.",
          "page": 102
        }
      ],
      "criteria": [
        "Produce discriminating evidence rather than a restart-first response.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Collect the missing request/dependency measurement before choosing a bounded action."
    },
    {
      "id": "fabric-lab-15",
      "sourceId": "Lab 15",
      "title": "Certificate Rotation",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        88,
        103
      ],
      "summary": "Plan rotation for a service-to-service trust relationship as both a security and availability event.",
      "action": "Map the trust boundary and decide whether an old/new certificate overlap is appropriate.",
      "minutes": 45,
      "concepts": [
        "service trust",
        "certificate rotation",
        "old/new overlap",
        "trust chain",
        "configuration",
        "failure test",
        "monitoring",
        "rollback"
      ],
      "sections": [
        {
          "heading": "Design-only rotation plan",
          "paragraphs": [
            "Use synthetic certificate identities, not real secrets. Testing belongs only in an authorized sandbox; capture shared evidence."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Trust boundary",
          "task": "Map the service-to-service trust boundary.",
          "page": 103
        },
        {
          "title": "2. Overlap",
          "task": "Define old/new certificate overlap where appropriate.",
          "page": 103
        },
        {
          "title": "3. Validation",
          "task": "Validate the planned trust-chain and configuration requirements.",
          "page": 103
        },
        {
          "title": "4. Failure behavior",
          "task": "Test or explicitly simulate failure behavior safely.",
          "page": 103
        },
        {
          "title": "5. Monitoring and rollback",
          "task": "Define monitoring and rollback decisions.",
          "page": 103
        }
      ],
      "criteria": [
        "Treat rotation as both security lifecycle and availability engineering.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Isolate the failing trust or configuration assumption before revising the rotation plan."
    },
    {
      "id": "fabric-lab-16",
      "sourceId": "Lab 16",
      "title": "Performance Bottleneck Tree",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        88,
        104
      ],
      "summary": "Analyze a p99 regression with representative workload, per-layer measurements and one-variable experimentation.",
      "action": "Define the workload and compare average with tail latency before optimizing.",
      "minutes": 60,
      "concepts": [
        "p99 regression",
        "workload",
        "average latency",
        "tail latency",
        "CPU",
        "memory",
        "network",
        "storage",
        "dependency timing",
        "retries",
        "serialization"
      ],
      "sections": [
        {
          "heading": "Evidence-led performance lab",
          "paragraphs": [
            "The source supplies no performance dataset or measured result. Use explicit synthetic or authorized measurements and the shared evidence protocol."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Workload",
          "task": "Define representative workload conditions.",
          "page": 104
        },
        {
          "title": "2. Average and tail",
          "task": "Separate average behavior from tail latency.",
          "page": 104
        },
        {
          "title": "3. Resources",
          "task": "Measure CPU, memory, network and storage.",
          "page": 104
        },
        {
          "title": "4. Dependencies",
          "task": "Measure downstream latency.",
          "page": 104
        },
        {
          "title": "5. Retries and serialization",
          "task": "Inspect retry and serialization contributions.",
          "page": 104
        },
        {
          "title": "6. One-variable experiment",
          "task": "Change one variable and compare with the baseline.",
          "page": 104
        }
      ],
      "criteria": [
        "Tie the proposed optimization to evidence.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Return to baseline and fill the missing measurement before repeating one controlled change."
    },
    {
      "id": "fabric-lab-17",
      "sourceId": "Lab 17",
      "title": "10\u00d7 Scale Modification",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        88,
        105
      ],
      "summary": "Adapt a working architecture to tenfold traffic by changing bottlenecks rather than every component.",
      "action": "Identify the first expected bottleneck under 10\u00d7 traffic.",
      "minutes": 60,
      "concepts": [
        "tenfold traffic",
        "bottleneck",
        "partitioning",
        "placement",
        "dependency capacity",
        "observability",
        "unchanged decisions"
      ],
      "sections": [
        {
          "heading": "Targeted architectural change",
          "paragraphs": [
            "Use a design exercise or authorized sandbox, not an unapproved load increase. Apply the shared evidence protocol."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. First bottleneck",
          "task": "Identify the first constraint reached at 10\u00d7 traffic.",
          "page": 105
        },
        {
          "title": "2. Partitioning",
          "task": "Revisit partitioning choices.",
          "page": 105
        },
        {
          "title": "3. Placement",
          "task": "Revisit placement constraints.",
          "page": 105
        },
        {
          "title": "4. Dependencies",
          "task": "Revisit downstream capacity.",
          "page": 105
        },
        {
          "title": "5. Observability",
          "task": "Revisit signals needed at the new scale.",
          "page": 105
        },
        {
          "title": "6. Deliberate non-changes",
          "task": "State what should remain unchanged and why.",
          "page": 105
        }
      ],
      "criteria": [
        "Target actual bottlenecks instead of uniformly scaling everything.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Recheck the first-bottleneck evidence and remove unjustified redesign."
    },
    {
      "id": "fabric-lab-18",
      "sourceId": "Lab 18",
      "title": "Failure Domain Defense",
      "phaseId": "advanced-topics",
      "role": "practice",
      "pages": [
        88,
        106
      ],
      "summary": "Defend replica placement under independent and correlated failures with qualitative availability and operational constraints.",
      "action": "List failure domains and shared risks before counting nodes or replicas.",
      "minutes": 45,
      "concepts": [
        "replica placement",
        "independent failure",
        "correlated failure",
        "failure domains",
        "availability impact",
        "operational constraints"
      ],
      "sections": [
        {
          "heading": "Placement defense",
          "paragraphs": [
            "Evaluate topology and correlated risk rather than relying only on node count. Use the shared lab evidence fields."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Domains",
          "task": "List relevant failure domains.",
          "page": 106
        },
        {
          "title": "2. Correlated risk",
          "task": "Identify shared failures affecting several replicas.",
          "page": 106
        },
        {
          "title": "3. Alternatives",
          "task": "Compare placement alternatives.",
          "page": 106
        },
        {
          "title": "4. Availability impact",
          "task": "Estimate qualitative availability consequences.",
          "page": 106
        },
        {
          "title": "5. Operational constraints",
          "task": "State placement and operating constraints.",
          "page": 106
        }
      ],
      "criteria": [
        "Account for correlated failures rather than only counting nodes.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Rebuild the overlooked correlated-failure scenario and revise the affected placement assumption."
    },
    {
      "id": "fabric-lab-19",
      "sourceId": "Lab 19",
      "title": "Interview Deep-Dive Drill",
      "phaseId": "interview-career",
      "role": "practice",
      "pages": [
        88,
        107
      ],
      "summary": "Give a five-minute migration explanation that remains factual under at least five why/what-if interruptions.",
      "action": "Prepare the problem, diagram and accurate role statement for a five-minute explanation.",
      "minutes": 45,
      "concepts": [
        "five-minute explanation",
        "architecture",
        "ownership",
        "decision defense",
        "failure",
        "alternative",
        "unknowns",
        "follow-ups"
      ],
      "sections": [
        {
          "heading": "Interrupted technical explanation",
          "paragraphs": [
            "Use validated sanitized work or label the case synthetic. Record shared evidence and do not replace unknowns with invented history."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Problem",
          "task": "State the problem.",
          "page": 107
        },
        {
          "title": "2. Architecture",
          "task": "Draw the architecture.",
          "page": 107
        },
        {
          "title": "3. Role",
          "task": "Explain your actual role.",
          "page": 107
        },
        {
          "title": "4. Decision",
          "task": "Defend one decision.",
          "page": 107
        },
        {
          "title": "5. Failure",
          "task": "Explain one failure scenario.",
          "page": 107
        },
        {
          "title": "6. Alternative",
          "task": "Explain one credible alternative.",
          "page": 107
        },
        {
          "title": "7. Unknown",
          "task": "State one unresolved unknown.",
          "page": 107
        },
        {
          "title": "Five-follow-up challenge",
          "task": "Give the five-minute account while answering at least five why/what-if follow-ups.",
          "check": "The account stays consistent and evidence-grounded.",
          "page": 107
        }
      ],
      "criteria": [
        "Maintain consistency under at least five follow-ups.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Repair the specific vague, unsupported or contradictory answer with a targeted evidence or recall drill."
    },
    {
      "id": "fabric-lab-20",
      "sourceId": "Lab 20",
      "title": "Architect Defense",
      "phaseId": "interview-career",
      "role": "practice",
      "pages": [
        88,
        108
      ],
      "summary": "Design a new system across eleven decision areas and justify Service Fabric against an alternative platform.",
      "action": "Write requirements, scale and NFRs before selecting platform mechanisms.",
      "minutes": 75,
      "concepts": [
        "requirements",
        "scale",
        "NFRs",
        "state model",
        "partitioning",
        "failure handling",
        "security",
        "observability",
        "cost",
        "alternative platform",
        "decision"
      ],
      "sections": [
        {
          "heading": "Constraint-led platform choice",
          "paragraphs": [
            "Service Fabric is only one possible implementation. Apply the shared lab evidence protocol to the design and its limitations."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "1. Requirements",
          "task": "Define functional requirements.",
          "page": 108
        },
        {
          "title": "2. Scale",
          "task": "State workload and growth scale.",
          "page": 108
        },
        {
          "title": "3. NFRs",
          "task": "Define non-functional requirements.",
          "page": 108
        },
        {
          "title": "4. State model",
          "task": "Choose authoritative state ownership.",
          "page": 108
        },
        {
          "title": "5. Partitioning",
          "task": "Choose partitioning and explain skew risk.",
          "page": 108
        },
        {
          "title": "6. Failure handling",
          "task": "Define failure and recovery behavior.",
          "page": 108
        },
        {
          "title": "7. Security",
          "task": "Define security boundaries.",
          "page": 108
        },
        {
          "title": "8. Observability",
          "task": "Define diagnostic telemetry.",
          "page": 108
        },
        {
          "title": "9. Cost",
          "task": "Identify major cost drivers.",
          "page": 108
        },
        {
          "title": "10. Alternative platform",
          "task": "Compare a credible alternative platform.",
          "page": 108
        },
        {
          "title": "11. Decision",
          "task": "Defend the platform decision under the stated constraints.",
          "page": 108
        }
      ],
      "criteria": [
        "Drive the decision from constraints rather than technology familiarity.",
        "Capture the shared lab evidence fields."
      ],
      "recovery": "Revisit the unsupported constraint or comparison and revise only the affected design choice."
    },
    {
      "id": "fabric-failure-node-loss",
      "sourceId": "Appendix E \u2014 Node loss",
      "title": "Failure Reasoning: Node Loss",
      "phaseId": "advanced-topics",
      "role": "reference",
      "pages": [
        109
      ],
      "summary": "Identify affected placements and user impact before choosing a bounded recovery action.",
      "action": "List services and replicas hosted on the lost node.",
      "minutes": 30,
      "concepts": [
        "node loss",
        "placement",
        "health",
        "client impact",
        "blast radius"
      ],
      "sections": [
        {
          "heading": "Catalog row",
          "paragraphs": [
            "First ask which services and replicas were placed on the node. Use health, placement and client-impact evidence."
          ],
          "items": [
            "Trap: restarting unrelated services.",
            "Apply the six shared failure-reasoning scoring rules."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Node-loss reasoning",
          "task": "Identify affected placements, consider at least two causes or impact hypotheses, collect discriminating evidence and propose bounded recovery.",
          "page": 109
        }
      ],
      "criteria": [
        "Verify recovery against the affected service invariant and state residual risk."
      ],
      "recovery": "Use placement and client evidence to limit recovery to the actual affected scope."
    },
    {
      "id": "fabric-failure-replica",
      "sourceId": "Appendix E \u2014 Replica failure",
      "title": "Failure Reasoning: Replica Failure",
      "phaseId": "advanced-topics",
      "role": "reference",
      "pages": [
        109
      ],
      "summary": "Assess whether a partition still meets its availability requirement after a replica failure.",
      "action": "Inspect replica states and reconfiguration before assuming the partition is unaffected.",
      "minutes": 30,
      "concepts": [
        "replica states",
        "partition availability",
        "reconfiguration",
        "user impact"
      ],
      "sections": [
        {
          "heading": "Catalog row",
          "paragraphs": [
            "First ask whether the partition still satisfies its availability requirement. Inspect replica states and reconfiguration evidence."
          ],
          "items": [
            "Trap: assuming there is no user impact.",
            "Apply the six shared failure-reasoning scoring rules."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Replica-failure reasoning",
          "task": "Evaluate partition availability using replica/reconfiguration evidence; distinguish hypotheses and define recovery validation.",
          "page": 109
        }
      ],
      "criteria": [
        "Do not equate remaining replicas with proven user availability."
      ],
      "recovery": "Verify the partition's invariant after reconfiguration and record remaining risk."
    },
    {
      "id": "fabric-failure-hot-partition",
      "sourceId": "Appendix E \u2014 Hot partition",
      "title": "Failure Reasoning: Hot Partition",
      "phaseId": "advanced-topics",
      "role": "reference",
      "pages": [
        109
      ],
      "summary": "Use per-partition traffic and latency to establish key skew before adding capacity.",
      "action": "Compare per-partition request volume and latency by key distribution.",
      "minutes": 30,
      "concepts": [
        "key skew",
        "per-partition traffic",
        "latency",
        "distribution",
        "capacity"
      ],
      "sections": [
        {
          "heading": "Catalog row",
          "paragraphs": [
            "First ask whether load is skewed by key. Use per-partition traffic and latency."
          ],
          "items": [
            "Trap: adding nodes without changing the limiting distribution.",
            "Apply the six shared failure-reasoning scoring rules."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Hot-partition reasoning",
          "task": "Distinguish key skew from other capacity hypotheses, identify minimum evidence and propose a bounded response.",
          "page": 109
        }
      ],
      "criteria": [
        "The action addresses the demonstrated bottleneck and preserves the business invariant."
      ],
      "recovery": "Recheck distribution evidence and verify latency and ordering after any authorized correction."
    },
    {
      "id": "fabric-failure-dependency-timeout",
      "sourceId": "Appendix E \u2014 Dependency timeout",
      "title": "Failure Reasoning: Dependency Timeout",
      "phaseId": "advanced-topics",
      "role": "reference",
      "pages": [
        109
      ],
      "summary": "Locate where a latency budget is consumed and measure downstream retries before intervening.",
      "action": "Break down downstream timings and retry contributions to the request deadline.",
      "minutes": 30,
      "concepts": [
        "latency budget",
        "downstream timing",
        "retries",
        "timeout",
        "bounded action"
      ],
      "sections": [
        {
          "heading": "Catalog row",
          "paragraphs": [
            "First ask where the latency budget goes. Inspect downstream timing and retries."
          ],
          "items": [
            "Trap: infinite retries.",
            "Apply the six shared failure-reasoning scoring rules."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Dependency-timeout reasoning",
          "task": "Compare plausible sources of delay, identify discriminating timing evidence and define bounded action and recovery.",
          "page": 109
        }
      ],
      "criteria": [
        "Avoid unbounded retry amplification and verify the request invariant."
      ],
      "recovery": "Repair the evidenced budget or dependency behavior and verify client recovery without hiding retry cost."
    },
    {
      "id": "fabric-failure-partial-upgrade",
      "sourceId": "Appendix E \u2014 Partial upgrade",
      "title": "Failure Reasoning: Partial Upgrade",
      "phaseId": "advanced-topics",
      "role": "reference",
      "pages": [
        109
      ],
      "summary": "Identify coexisting versions and health state before choosing rollback or other recovery.",
      "action": "Record upgrade state, running versions and health before changing the rollout.",
      "minutes": 30,
      "concepts": [
        "version coexistence",
        "upgrade state",
        "health",
        "compatibility",
        "rollback"
      ],
      "sections": [
        {
          "heading": "Catalog row",
          "paragraphs": [
            "First ask which versions coexist. Use upgrade-state and health evidence."
          ],
          "items": [
            "Trap: rolling back blindly.",
            "Apply the six shared failure-reasoning scoring rules."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Partial-upgrade reasoning",
          "task": "Analyze current versions and health, compare causes and define a bounded compatibility-aware recovery sequence.",
          "page": 109
        }
      ],
      "criteria": [
        "Base action on version/health evidence and validate recovery against the workload invariant."
      ],
      "recovery": "Check compatibility and irreversible changes before selecting an authorized recovery action."
    },
    {
      "id": "fabric-failure-certificate",
      "sourceId": "Appendix E \u2014 Certificate failure",
      "title": "Failure Reasoning: Certificate Failure",
      "phaseId": "advanced-topics",
      "role": "reference",
      "pages": [
        109
      ],
      "summary": "Distinguish identity, trust, configuration and connectivity causes before repeating rotation.",
      "action": "Compare non-secret certificate/configuration metadata with connection evidence.",
      "minutes": 30,
      "concepts": [
        "identity",
        "trust",
        "configuration",
        "network",
        "certificate metadata",
        "connection evidence"
      ],
      "sections": [
        {
          "heading": "Catalog row",
          "paragraphs": [
            "First ask whether identity, trust, configuration or network behavior explains the failure. Compare certificate/configuration and connection evidence."
          ],
          "items": [
            "Trap: rotating again without diagnosis.",
            "Apply the six shared failure-reasoning scoring rules."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Certificate-failure reasoning",
          "task": "Separate competing boundary hypotheses and choose the minimum evidence before a bounded authorized action.",
          "page": 109
        }
      ],
      "criteria": [
        "Verify restored trust and communication, then record remaining risk."
      ],
      "recovery": "Correct only the evidenced boundary problem; do not rotate again speculatively."
    },
    {
      "id": "fabric-failure-green-health",
      "sourceId": "Appendix E \u2014 Green health / bad UX",
      "title": "Failure Reasoning: Green Health, Bad User Experience",
      "phaseId": "advanced-topics",
      "role": "reference",
      "pages": [
        109
      ],
      "summary": "Investigate the difference between measured health and actual user behavior.",
      "action": "State exactly what the health signal measures and compare it with request failures.",
      "minutes": 30,
      "concepts": [
        "health meaning",
        "user correctness",
        "request telemetry",
        "dependency signals"
      ],
      "sections": [
        {
          "heading": "Catalog row",
          "paragraphs": [
            "First ask what health actually measures. Use request telemetry and dependency signals."
          ],
          "items": [
            "Trap: treating health as proof of correctness.",
            "Apply the six shared failure-reasoning scoring rules."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Health/experience reasoning",
          "task": "Compare at least two explanations for green health and poor user results, then choose discriminating request/dependency evidence.",
          "page": 109
        }
      ],
      "criteria": [
        "Recovery is verified through the user-facing invariant, not merely a green status."
      ],
      "recovery": "Repair the missing measurement or demonstrated user-path failure and retain explicit uncertainty."
    },
    {
      "id": "fabric-failure-memory",
      "sourceId": "Appendix E \u2014 Memory pressure",
      "title": "Failure Reasoning: Memory Pressure",
      "phaseId": "advanced-topics",
      "role": "reference",
      "pages": [
        109
      ],
      "summary": "Attribute resource growth to its owning component using process/node memory and workload shape.",
      "action": "Compare process and node memory trends with workload growth.",
      "minutes": 30,
      "concepts": [
        "memory pressure",
        "growth ownership",
        "process memory",
        "node memory",
        "workload shape"
      ],
      "sections": [
        {
          "heading": "Catalog row",
          "paragraphs": [
            "First ask which component owns the growth. Use process/node memory and workload evidence."
          ],
          "items": [
            "Trap: scaling everything.",
            "Apply the six shared failure-reasoning scoring rules."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Memory-growth reasoning",
          "task": "Identify competing growth explanations, the minimum resource evidence and a bounded corrective proposal.",
          "page": 109
        }
      ],
      "criteria": [
        "Target the evidenced owner of growth and verify the workload invariant."
      ],
      "recovery": "Reassess component-level growth before any broad capacity change."
    },
    {
      "id": "fabric-failure-serialization",
      "sourceId": "Appendix E \u2014 Serialization issue",
      "title": "Failure Reasoning: Serialization Issue",
      "phaseId": "advanced-topics",
      "role": "reference",
      "pages": [
        109
      ],
      "summary": "Connect a stored-value shape change to schema/version and exception evidence without deleting state.",
      "action": "Identify the changed value shape and compare schema/version metadata with exceptions.",
      "minutes": 30,
      "concepts": [
        "serialization",
        "value shape",
        "schema evolution",
        "version compatibility",
        "exceptions",
        "state preservation"
      ],
      "sections": [
        {
          "heading": "Catalog row",
          "paragraphs": [
            "First ask which value changed shape. Inspect schema/version and exception evidence."
          ],
          "items": [
            "Trap: deleting state to make the error disappear.",
            "Apply the six shared failure-reasoning scoring rules."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Serialization-failure reasoning",
          "task": "Distinguish schema/version hypotheses and propose a bounded state-preserving response with invariant-based validation.",
          "page": 109
        }
      ],
      "criteria": [
        "Preserve state and explain schema compatibility before proposing recovery."
      ],
      "recovery": "Investigate the changed shape and supported compatibility path; never substitute state deletion for diagnosis."
    },
    {
      "id": "fabric-failure-config-drift",
      "sourceId": "Appendix E \u2014 Configuration drift",
      "title": "Failure Reasoning: Configuration Drift",
      "phaseId": "advanced-topics",
      "role": "reference",
      "pages": [
        109
      ],
      "summary": "Use versioned configuration differences to identify environment divergence instead of trial-and-error production changes.",
      "action": "Compare versioned configurations for the affected and known-good environments.",
      "minutes": 30,
      "concepts": [
        "configuration drift",
        "environment difference",
        "versioned diff",
        "known-good baseline",
        "bounded change"
      ],
      "sections": [
        {
          "heading": "Catalog row",
          "paragraphs": [
            "First ask which environment differs. Use a versioned configuration diff."
          ],
          "items": [
            "Trap: changing production until it appears to work.",
            "Apply the six shared failure-reasoning scoring rules."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Configuration-drift reasoning",
          "task": "Separate plausible environment causes, inspect the smallest useful diff and define a bounded authorized recovery with validation.",
          "page": 109
        }
      ],
      "criteria": [
        "Use evidence and a recovery invariant rather than uncontrolled configuration experimentation."
      ],
      "recovery": "Return to the known-good configuration evidence and repair only the validated difference."
    },
    {
      "id": "fabric-architecture-checklist",
      "sourceId": "Appendix F",
      "title": "Architecture Review Checklist",
      "phaseId": "interview-career",
      "role": "reference",
      "pages": [
        110
      ],
      "summary": "Review seventeen architectural concerns and test whether an operator can take a safe evidence-led action during failure.",
      "action": "Audit one design's requirements, invariant owners and first safe failure response.",
      "minutes": 45,
      "concepts": [
        "requirements",
        "scale",
        "latency budget",
        "availability",
        "consistency",
        "state ownership",
        "partitioning",
        "replication",
        "communication",
        "upgrades",
        "observability",
        "security",
        "cost",
        "operations",
        "alternatives",
        "evolution",
        "ownership"
      ],
      "sections": [
        {
          "heading": "Broad review, not universal mechanisms",
          "paragraphs": [
            "Use during design defenses and migration reviews. Not every workload requires every mechanism; record applicability rather than adding unnecessary architecture."
          ],
          "items": [
            "Requirements: explicit functional and non-functional behavior.",
            "Scale: stated traffic, data volume, concurrency and growth.",
            "Latency: a budget for critical paths.",
            "Availability: failure domains and expected recovery.",
            "Consistency: business invariants and permissible staleness.",
            "State: an owner for every authoritative value.",
            "Partitioning: justified keys and understood skew.",
            "Replication: placement and failure behavior understood.",
            "Communication: justified synchronous/asynchronous choices.",
            "Upgrades: compatibility and rollback considered.",
            "Observability: telemetry supports diagnosis, not only dashboards.",
            "Security: trust, identity, authorization and secret lifecycle covered.",
            "Cost: major operating cost drivers identified.",
            "Operational complexity: runbook and recovery owners named.",
            "Alternatives: at least one credible option compared.",
            "Evolution: change possible without a total rewrite.",
            "Ownership: actual decisions made or influenced are stated accurately."
          ]
        }
      ],
      "exercises": [
        {
          "title": "2 a.m. failure review",
          "task": "If the system fails at 2 a.m., identify the first safe action, available evidence and how to establish that recovery really worked.",
          "page": 110
        }
      ],
      "criteria": [
        "Review all applicable concerns and justify omissions; do not impose every mechanism on every workload."
      ],
      "recovery": "Repair only the missing requirement, ownership, evidence or recovery decision."
    },
    {
      "id": "fabric-evidence-rubric",
      "sourceId": "Appendix G",
      "title": "Evidence Rubric",
      "phaseId": "interview-career",
      "role": "reference",
      "pages": [
        111
      ],
      "summary": "Distinguish six levels of capability and preserve a ten-field future checkpoint evidence record.",
      "action": "Choose one actual artifact and identify which evidence level it supports without inflating the claim.",
      "minutes": 30,
      "concepts": [
        "Familiar",
        "Practiced",
        "Applied",
        "Transferred",
        "Demonstrated",
        "Retained",
        "evidence record",
        "unknowns"
      ],
      "sections": [
        {
          "heading": "Evidence level \u2192 proof",
          "paragraphs": [],
          "items": [
            "Familiar: definition and recognition support vocabulary and a broad model.",
            "Practiced: a successful standard task supports basic execution.",
            "Applied: realistic use supports contextual competence.",
            "Transferred: unfamiliar variation supports adaptability.",
            "Demonstrated: failure handling and trade-off defense support production-oriented reasoning.",
            "Retained: delayed no-notes success supports durable capability."
          ]
        },
        {
          "heading": "Future evidence record",
          "paragraphs": [
            "This is a blank record structure, not a seeded achievement."
          ],
          "items": [
            "1. Checkpoint identifier and title.",
            "2. Evidence date.",
            "3. Performed task or scenario.",
            "4. Produced artifact or observation.",
            "5. Explanation possible without notes.",
            "6. Modification or transfer attempted.",
            "7. Handled failure scenario.",
            "8. Considered alternative.",
            "9. Defended trade-off.",
            "10. Remaining unknowns."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Evidence record",
          "task": "For a genuinely performed future checkpoint task, complete all ten evidence fields and assign only the supported capability level.",
          "page": 111
        }
      ],
      "criteria": [
        "Studying alone is not demonstrated capability; each level requires the stated evidence."
      ],
      "recovery": "Collect the missing kind of evidence through a targeted drill instead of promoting a weaker artifact."
    },
    {
      "id": "fabric-final-mastery",
      "sourceId": "Appendix H",
      "title": "Final Mastery Gate",
      "phaseId": "interview-career",
      "role": "reference",
      "pages": [
        112
      ],
      "summary": "Audit eighteen evidence requirements before final career conversion; page coverage is not learner completion.",
      "action": "Review the eighteen requirements against actual evidence and identify the smallest unsupported capability.",
      "minutes": 45,
      "concepts": [
        "platform judgment",
        "entity model",
        "state ownership",
        "partitioning",
        "replication",
        "Explorer",
        "local implementation",
        "communication",
        "configuration",
        "fault experiments",
        "migration reasoning",
        "ownership",
        "operational design",
        "case study",
        "transfer",
        "trade-offs",
        "retention"
      ],
      "sections": [
        {
          "heading": "Final audit boundary",
          "paragraphs": [
            "The source makes this an evidence readiness audit for career conversion, not another numbered canonical checkpoint. Reading every page does not satisfy it.",
            "Readiness depends on understanding, reproduction, modification, transfer, safe failure handling, design, trade-off defense and retained capability."
          ],
          "items": []
        }
      ],
      "exercises": [],
      "criteria": [
        "1. Explain why Service Fabric exists and when to reject it.",
        "2. Explain the cluster/node/application/service model.",
        "3. Choose stateful or stateless behavior from requirements.",
        "4. Reason correctly about partitions and replicas.",
        "5. Use Explorer as a diagnostic surface.",
        "6. Build and inspect a basic local application.",
        "7. Build or accurately analyze stateless and stateful services.",
        "8. Explain communication and logical service discovery.",
        "9. Handle configuration safely.",
        "10. Run controlled fault experiments in an authorized sandbox.",
        "11. Map actual authorized migration work to distributed-systems principles.",
        "12. Explain real work without overstating ownership.",
        "13. Reason about availability, scaling, upgrades, health, security and performance.",
        "14. Produce a sanitized migration case study from validated evidence.",
        "15. Defend Service Fabric as one candidate in broader system design.",
        "16. Handle an unfamiliar failure scenario.",
        "17. Defend at least three trade-offs under changed constraints.",
        "18. Retrieve key concepts after a delay."
      ],
      "recovery": "Identify the unsupported capability, apply targeted recall/lab/variation/failure practice, and retest without resetting the roadmap."
    }
  ],
  "commonSections": [
    {
      "heading": "Canonical progression and honest state (pages 1, 12\u201316, 27, 38, 49, 61, 82, 87\u201388)",
      "paragraphs": [
        "Keep the five-stage roadmap and original checkpoint numbering. Actual work has one active checkpoint; browsing supplementary material does not activate it or unlock later work. Source save-state cards are examples or baseline assertions, not imported completion records.",
        "Advance only after recorded evidence. Resume from the real saved state after a break, probe recall, and select the next evidence-producing task rather than restarting the curriculum."
      ],
      "items": [
        "Report substantive changes as Done / Blocked / Next, using actual evidence and explicit blockers.",
        "Escalate major milestones and cross-mission blockers without fabricating progress.",
        "Use authorized, sanitized work as an application anchor only when its facts are supplied. Unknown architecture, responsibilities and outcomes remain unknown."
      ]
    },
    {
      "heading": "Learning sequence and practice ladder (pages 12, 17\u201373)",
      "paragraphs": [
        "The overarching sequence is understand, recognize, reproduce, modify, combine, transfer, handle failure, design, defend and retain. Within a checkpoint, build a mental model, identify it in a scenario, reproduce a standard task, vary a constraint, combine prior knowledge, attempt an unfamiliar case, analyze failure, defend a choice and record evidence.",
        "The same eight-level ladder is repeated for every canonical checkpoint; it is factored here, not removed from any topic."
      ],
      "items": [
        "L1 Recognition: locate the relevant mechanism in a scenario.",
        "L2 Recall: explain the mechanism without notes.",
        "L3 Reproduction: carry out the standard topic-specific task.",
        "L4 Modification: adapt after changing one constraint.",
        "L5 Combination: connect the topic with an earlier concept.",
        "L6 Transfer: reason through a genuinely unfamiliar case.",
        "L7 Failure Handling: describe detection, impact, recovery and remaining risk.",
        "L8 Design Defense: compare credible alternatives and justify the decision."
      ]
    },
    {
      "heading": "Checkpoint gate and targeted recovery (pages 18\u201373)",
      "paragraphs": [
        "Each canonical checkpoint requires demonstrated explanation, reproduction, modification, transfer and one failure scenario. The source supplies no numeric percentage for these local gates. Its separate diagnostics on page 77 do specify at least 80% coherent no-notes answers.",
        "Repair the failed dimension only: no-notes retrieval for explanation, a minimal lab for reproduction, a changed-constraint drill for modification, an unfamiliar case for transfer, and a failure matrix for failure handling. Retest; do not reset unrelated progress."
      ],
      "items": [
        "A successful process restart is not evidence that business invariants recovered.",
        "A local lab supports bounded learning claims, not proof of production topology or production experience.",
        "Topic-specific transfer scenarios and diagnostics remain separate entries in each checkpoint."
      ]
    },
    {
      "heading": "Shared checkpoint artifact and ownership (pages 18\u201373, 80, 86, 111)",
      "paragraphs": [
        "Every checkpoint asks for an artifact recording its problem, assumptions, mechanism, supporting evidence, failure behavior, trade-off and exact contributor role. Local exercises retain this requirement even when the artifact format is shared.",
        "Use ownership verbs supported by evidence: implemented, investigated, contributed, observed, or learned from. Team outcomes must not become personal achievements."
      ],
      "items": [
        "For future evidence records include checkpoint ID/title, evidence date, performed task/scenario, produced artifact or observation, no-notes explanation, modification/transfer, handled failure, considered alternative, defended trade-off and unresolved unknowns.",
        "Keep company identifiers, confidential topology, credentials, sensitive payloads and personal history out of public learning artifacts.",
        "Do not transform screenshots without interpretation, copied documentation or reading time into demonstrated capability."
      ]
    },
    {
      "heading": "Sandbox and change boundaries (pages 26, 36\u201348, 58\u201359, 78, 88\u2013110)",
      "paragraphs": [
        "Implementation and failure exercises belong in a local cluster, synthetic system or separately authorized sanitized work context. This curriculum is not authorization to deploy, inject faults, rotate credentials, alter access, delete state or change production.",
        "Before an authorized experiment, establish a known-good baseline, predict the invariant, define scope and blast radius, identify validation evidence and rollback/recovery, and change one major variable at a time. Capture evidence before repair; restore and verify the known-good state."
      ],
      "items": [
        "Separate observation, hypothesis and confirmed cause; choose the minimum discriminating evidence before a bounded action.",
        "Never solve serialization errors by deleting state or security trouble by broadly opening network access.",
        "Record what an experiment cannot establish and what remains untested.",
        "Production tasks require actual ownership, authorization and applicable change controls; when inputs or permission are absent, plan or analyze a synthetic case instead."
      ]
    },
    {
      "heading": "Lab evidence protocol (pages 88\u2013108)",
      "paragraphs": [
        "Each of the twenty labs independently requires the following six evidence fields. This shared structure applies to every lab procedure and its local pass condition; no laboratory is pre-completed."
      ],
      "items": [
        "Precondition: record the starting state.",
        "Expected behavior: state the predicted invariant or operational result.",
        "Observation: record what happened before interpreting it.",
        "Diagnosis: connect the observation to a mechanism.",
        "Recovery: document return to a verified known-good state.",
        "Residual risk: identify uncertainty and untested behavior."
      ]
    },
    {
      "heading": "Failure-reasoning scoring rules (page 109)",
      "paragraphs": [
        "Apply these rules to each failure-catalog entry and failure exercise. No numeric score is supplied."
      ],
      "items": [
        "State the observation without a causal conclusion.",
        "Consider at least two plausible hypotheses.",
        "Identify the smallest evidence set that distinguishes them.",
        "Bound the proposed action's blast radius.",
        "Verify recovery against the relevant invariant.",
        "State remaining risk and prevention."
      ]
    },
    {
      "heading": "Evidence levels, not automatic completion (pages 12, 81, 111)",
      "paragraphs": [
        "NOT MASTERED means explanation or use is unreliable. The following six evidence levels describe distinct capabilities; none is seeded by the document's matrix symbols."
      ],
      "items": [
        "Familiar: recognize and define a concept, establishing terminology and a broad model.",
        "Practiced: successfully complete a standard task, establishing basic execution.",
        "Applied: use the concept in a realistic context.",
        "Transferred: solve an unfamiliar variation.",
        "Demonstrated: explain the mechanism, handle failure and defend a trade-off.",
        "Retained: retrieve and apply it after a delay without notes."
      ]
    }
  ]
} satisfies RoadmapPack;
