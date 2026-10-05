import type { RoadmapPack } from '../types';

export default {
  "missionId": "blueprint",
  "document": "Operation_Blueprint_Architect_Master_Roadmap.pdf",
  "title": "Operation Blueprint \u2014 Software Architect Capability Roadmap",
  "pageCount": 168,
  "overview": "An evidence-led architecture curriculum connecting backend implementation, distributed systems, cloud decisions, Service Fabric, AI systems and technical influence. Thirteen numbered stages are followed by separately browsable cases, diagnostics, professional practices, domain extensions, retention activities and eight capstones. This pack contains curriculum, not learner progress.",
  "sourceNotes": [
    "Reviewed every line of the 5,419-line extraction and all 168 physical pages. The original PDF contains 42,582 word objects; the supplied text has 43,422 whitespace tokens because its page markers and extraction formatting change the count.",
    "The original PDF has 168 nonempty text pages and no raster images. Original vector-table cells were inspected on pages 5 and 166; the page-4 state-table structure was checked without carrying its personal values into this pack.",
    "The six canonical pillars remain Architect Foundations; Service Fabric Mastery; Design Thinking; Certifications; Leadership & Communication; Long-term Goals.",
    "Numbered stages retain the headings and within-stage topic order of pages 6\u2013109. The serial checkpoint sequence contains only Day 0 and the 91 numbered stage topics. Later source sections are supporting practice/reference, not additional post-mastery or parallel gate chains.",
    "Personal baseline/history and prefilled progress on pages 2, 4 and 168 are excluded. Day 0 is available as an uncredited curriculum checkpoint. No status, completed count, current mastery or learner baseline is seeded.",
    "Many numbered topic pages use the same teaching template. Its reasoning and evidence rules are factored into commonSections; all topic-specific exercise occurrences remain separately recorded.",
    "The source offers approximate planning anchors of three months each for foundations, Service Fabric and design thinking, six to nine months for certifications, and ongoing leadership/long-term development. These are not deadlines or duration claims for units.",
    "The source names no particular certification, exam objective list, provider URL or external exercise identifier. Free learning and any separately paid exam are distinct; no current exam availability was verified.",
    "Minutes estimate only a starting session. Labs and deployment-related exercises require an authorized sandbox and a recovery/rollback plan; this review executes none of them."
  ],
  "phases": [
    {
      "id": "blueprint-stage-0",
      "title": "Stage 0 \u2014 Orientation & Capability Activation",
      "summary": "Activate coding and architectural learning, establish evidence and recall, and avoid treating a baseline as a permanent identity."
    },
    {
      "id": "blueprint-stage-1",
      "title": "Stage 1 \u2014 Foundations",
      "summary": "Make architecture concrete through backend APIs, execution, data, networking and deployment boundaries."
    },
    {
      "id": "blueprint-stage-2",
      "title": "Stage 2 \u2014 Core Architecture Components",
      "summary": "Explain why recurring production components exist and what resources and invariants they protect."
    },
    {
      "id": "blueprint-stage-3",
      "title": "Stage 3 \u2014 Pattern Recognition",
      "summary": "Recognize reusable mechanisms across differently worded architectural problems."
    },
    {
      "id": "blueprint-stage-4",
      "title": "Stage 4 \u2014 Guided Application",
      "summary": "Combine fundamentals into small end-to-end designs with stated requirements and constraints."
    },
    {
      "id": "blueprint-stage-5",
      "title": "Stage 5 \u2014 Progressive Practice",
      "summary": "Increase scale, ambiguity and time pressure while exposing the reasoning behind each change."
    },
    {
      "id": "blueprint-stage-6",
      "title": "Stage 6 \u2014 Intermediate Variations",
      "summary": "Handle interacting patterns, conflicting guarantees and partial failures."
    },
    {
      "id": "blueprint-stage-7",
      "title": "Stage 7 \u2014 Advanced Concepts",
      "summary": "Develop stronger coordination, resilience, security, cost and evolution decisions."
    },
    {
      "id": "blueprint-stage-8",
      "title": "Stage 8 \u2014 Real-World Case Studies",
      "summary": "Apply the full reasoning chain to chat, media, telemetry, commerce, collaboration, SaaS and AI systems."
    },
    {
      "id": "blueprint-stage-9",
      "title": "Stage 9 \u2014 Integration & Trade-offs",
      "summary": "Defend decisions when requirements, guarantees, cost and operational ownership compete."
    },
    {
      "id": "blueprint-stage-10",
      "title": "Stage 10 \u2014 Professional / Interview Application",
      "summary": "Produce clear design communication, useful reviews, operational reasoning and technical mentoring."
    },
    {
      "id": "blueprint-stage-11",
      "title": "Stage 11 \u2014 Diagnostics",
      "summary": "Measure explanation, reproduction, modification, transfer, failure reasoning and defense; repair weak prerequisites without restarting."
    },
    {
      "id": "blueprint-stage-12",
      "title": "Stage 12 \u2014 Mastery & Retention",
      "summary": "Demonstrate architecture, implementation, recovery and review capability, then maintain it through evidence and retrieval."
    },
    {
      "id": "blueprint-cases",
      "title": "Case Studies A\u2013H",
      "summary": "Standalone practice cases with concrete evolution, failure and modification scenarios; not an additional mandatory checkpoint chain."
    },
    {
      "id": "blueprint-diagnostics",
      "title": "Diagnostics 1\u20138",
      "summary": "Reusable source assessments with explicit pass conditions and corrective actions."
    },
    {
      "id": "blueprint-professional",
      "title": "Professional Practice",
      "summary": "Source professional-application pages: ADRs, reviews, writing, mentoring, interviews, evidence, AI assistance and certification validation."
    },
    {
      "id": "blueprint-ai",
      "title": "AI Architecture Extension",
      "summary": "Supporting deeper practice in probabilistic components, RAG, evaluation, workflows, safety, reliability and cost; not an added post-Stage-12 checkpoint chain."
    },
    {
      "id": "blueprint-sf",
      "title": "Service Fabric Mastery",
      "summary": "Supporting deeper practice linking cluster mechanisms to distributed-systems reasoning and authorized evidence; not an added post-Stage-12 checkpoint chain."
    },
    {
      "id": "blueprint-retention",
      "title": "Retention System",
      "summary": "Small retrieval activities from daily through quarterly cadence, plus an error ledger and recall-first practice."
    },
    {
      "id": "blueprint-capstones",
      "title": "Capstones 1\u20138",
      "summary": "Eight separately browsable source challenges; choose suitable evidence work without treating all eight as mandatory parallel gates."
    },
    {
      "id": "blueprint-final",
      "title": "Final Competency Matrix & Mastery Checklist",
      "summary": "Classify demonstrated evidence and review durable capabilities without assigning percentage scores or importing a baseline."
    }
  ],
  "units": [
    {
      "id": "blueprint-day-0",
      "sourceId": "Day 0",
      "title": "Code Touch + Code Modification + System Exposure",
      "phaseId": "blueprint-stage-0",
      "role": "checkpoint",
      "pages": [
        4,
        168
      ],
      "summary": "A low-friction activation using Two Sum, HashMap reasoning, load-balancer exposure and a short note; no historical completion is imported.",
      "action": "Touch a Two Sum example and identify its HashMap operation.",
      "minutes": 25,
      "concepts": [
        "Two Sum",
        "HashMap",
        "Code Touch",
        "Code Modification",
        "Load Balancer",
        "short notes"
      ],
      "sections": [
        {
          "heading": "Activation, not a verdict",
          "paragraphs": [
            "The source uses a small coding interaction, one modification and system exposure to reduce starting friction. This is not an intelligence test or a demand to solve an entire career problem in one session."
          ],
          "items": [
            "The precise original code change is not specified in this PDF.",
            "A source save-state assertion is excluded rather than converted into progress."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Code touch",
          "task": "Inspect or reproduce the source-named Two Sum/HashMap example.",
          "page": 4
        },
        {
          "title": "Code modification",
          "task": "Make one small change to that example and note its effect; the PDF does not prescribe the exact change.",
          "page": 4
        },
        {
          "title": "System exposure",
          "task": "Inspect a load-balancer explanation and relate it to incoming requests.",
          "page": 4
        },
        {
          "title": "Short note",
          "task": "Leave a short note connecting the coding and system exposure.",
          "page": 168
        }
      ],
      "criteria": [
        "Leave evidence of code contact, a modification, system exposure and a short note; do not infer mastery from this activation."
      ],
      "recovery": "Resume with the smallest code interaction and inspect the example; do not reset the roadmap."
    },
    {
      "id": "blueprint-s0-1",
      "sourceId": "Stage 0 \u2014 1",
      "title": "Baseline the learner without treating baseline as identity",
      "phaseId": "blueprint-stage-0",
      "role": "checkpoint",
      "pages": [
        7
      ],
      "summary": "Use an evidence-based starting assessment without turning current recall into a permanent capability label.",
      "action": "Write what one small task demonstrates and what remains untested.",
      "minutes": 30,
      "concepts": [
        "baseline",
        "capability evidence",
        "invariants",
        "resource constraints"
      ],
      "sections": [
        {
          "heading": "Assess a capability, not a person",
          "paragraphs": [
            "Apply the shared single-service reasoning frame to a small baseline task. Separate observed evidence from assumptions and identify the resource or invariant being tested."
          ],
          "items": [
            "Use a production, interview or review connection rather than a global self-rating."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain baseline-without-identity in 60 seconds without notes.",
          "page": 7
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system where this baseline capability matters.",
          "page": 7
        },
        {
          "title": "Scale modification",
          "task": "Revise that design for 10\u00d7 traffic.",
          "page": 7
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; specify detection, mitigation and user-visible behavior.",
          "page": 7
        },
        {
          "title": "Alternative",
          "task": "Name an alternative and justify rejecting it.",
          "page": 7
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed constraint from the shared transfer frame.",
          "page": 7
        },
        {
          "title": "Professional note",
          "task": "Write the one-page design note defined in the shared reasoning frame for this topic.",
          "page": 7
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose a failure, adapt to 10\u00d7 load and defend a trade-off.",
          "check": "Reason coherently rather than reciting labels.",
          "page": 7
        }
      ],
      "criteria": [
        "Pass the local diagnostic and meet the shared staged evidence standard."
      ],
      "recovery": "Reproduce the smallest baseline example and retry the local diagnostic."
    },
    {
      "id": "blueprint-s0-2",
      "sourceId": "Stage 0 \u2014 2",
      "title": "Use Copy\u2013Modify\u2013Repeat to lower implementation friction",
      "phaseId": "blueprint-stage-0",
      "role": "checkpoint",
      "pages": [
        8
      ],
      "summary": "Move from reproducing an example to changing it, so implementation practice produces inspectable evidence.",
      "action": "Reproduce one small example before making a single modification.",
      "minutes": 30,
      "concepts": [
        "Copy\u2013Modify\u2013Repeat",
        "reproduction",
        "implementation friction",
        "modification"
      ],
      "sections": [
        {
          "heading": "Reason beyond copying",
          "paragraphs": [
            "Use the shared invariant/resource frame to explain what a copied implementation preserves and what its modification changes. Copying alone does not establish applied capability."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain Copy\u2013Modify\u2013Repeat in 60 seconds without notes.",
          "page": 8
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system where this implementation practice is useful.",
          "page": 8
        },
        {
          "title": "Scale modification",
          "task": "Revise the design for 10\u00d7 traffic.",
          "page": 8
        },
        {
          "title": "Failure",
          "task": "Introduce one failure and specify detection, mitigation and visible behavior.",
          "page": 8
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting one alternative.",
          "page": 8
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product, changing one shared transfer constraint.",
          "page": 8
        },
        {
          "title": "Professional note",
          "task": "Produce the shared one-page design-note artifact for this topic.",
          "page": 8
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain the mechanism, one failure, 10\u00d7 adaptation and a trade-off.",
          "check": "Demonstrate reasoning rather than terminology recall.",
          "page": 8
        }
      ],
      "criteria": [
        "Pass the topic diagnostic; reproduce before claiming practice and modify before claiming application."
      ],
      "recovery": "Rebuild the smallest copied example, change it once and retry."
    },
    {
      "id": "blueprint-s0-3",
      "sourceId": "Stage 0 \u2014 3",
      "title": "Create architecture notes that record why, not only what",
      "phaseId": "blueprint-stage-0",
      "role": "checkpoint",
      "pages": [
        9
      ],
      "summary": "Capture the requirement-to-mechanism reasoning that makes an architecture note reusable.",
      "action": "Write one decision with its requirement and a rejected alternative.",
      "minutes": 30,
      "concepts": [
        "architecture notes",
        "decision rationale",
        "assumptions",
        "observability"
      ],
      "sections": [
        {
          "heading": "Preserve decision context",
          "paragraphs": [
            "A useful note links a system's requirements, constraints, invariant and failure assumptions to its chosen mechanism. Use the shared example and note structure rather than a component inventory."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain rationale-focused architecture notes in 60 seconds without notes.",
          "page": 9
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing this reasoning record.",
          "page": 9
        },
        {
          "title": "Scale modification",
          "task": "Update the design for 10\u00d7 traffic.",
          "page": 9
        },
        {
          "title": "Failure",
          "task": "Specify one failure, detection, mitigation and user-visible behavior.",
          "page": 9
        },
        {
          "title": "Alternative",
          "task": "Explain why one alternative was rejected.",
          "page": 9
        },
        {
          "title": "Transfer",
          "task": "Move the idea to a new product with one changed shared transfer constraint.",
          "page": 9
        },
        {
          "title": "Professional note",
          "task": "Write the complete shared one-page design note for this topic.",
          "page": 9
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify a failure, adapt to 10\u00d7 load and defend a trade-off without notes.",
          "check": "Connect requirements to reasoning, not labels.",
          "page": 9
        }
      ],
      "criteria": [
        "Pass the local diagnostic and retain the source's staged evidence distinctions."
      ],
      "recovery": "Reproduce a small decision note and retry its reasoning diagnostic."
    },
    {
      "id": "blueprint-s0-4",
      "sourceId": "Stage 0 \u2014 4",
      "title": "Learn the difference between exposure, practice, demonstration, and mastery",
      "phaseId": "blueprint-stage-0",
      "role": "checkpoint",
      "pages": [
        10
      ],
      "summary": "Distinguish familiarity from reproduced, applied, transferred and demonstrated evidence.",
      "action": "Classify one artifact by what it actually proves.",
      "minutes": 30,
      "concepts": [
        "exposure",
        "practice",
        "demonstration",
        "mastery",
        "evidence states"
      ],
      "sections": [
        {
          "heading": "Evidence changes the state",
          "paragraphs": [
            "Use the common progression to avoid upgrading capability merely after reading. Apply the shared system reasoning exercise even though this source topic is about learning evidence."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain these evidence distinctions in 60 seconds without notes.",
          "page": 10
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system in which distinguishing these capability levels matters.",
          "page": 10
        },
        {
          "title": "Scale modification",
          "task": "Modify the design for 10\u00d7 traffic.",
          "page": 10
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and user-visible effects.",
          "page": 10
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting one alternative.",
          "page": 10
        },
        {
          "title": "Transfer",
          "task": "Apply the distinction in a new product context with one changed shared constraint.",
          "page": 10
        },
        {
          "title": "Professional note",
          "task": "Produce the shared one-page design note for this topic.",
          "page": 10
        },
        {
          "title": "Diagnostic",
          "task": "Explain the mechanism, a failure, 10\u00d7 adaptation and a trade-off without notes.",
          "check": "Use coherent evidence-led reasoning, not state-name recall.",
          "page": 10
        }
      ],
      "criteria": [
        "Pass the local diagnostic; do not equate exposure with demonstrated or retained capability."
      ],
      "recovery": "Reproduce a smallest example and reassess what it proves."
    },
    {
      "id": "blueprint-s0-5",
      "sourceId": "Stage 0 \u2014 5",
      "title": "Establish a recall loop: same-day, next-day, weekly, monthly",
      "phaseId": "blueprint-stage-0",
      "role": "checkpoint",
      "pages": [
        11
      ],
      "summary": "Make retrieval recur at increasing intervals instead of relying on repeated reading.",
      "action": "Recall one topic before reopening its notes.",
      "minutes": 25,
      "concepts": [
        "same-day recall",
        "next-day recall",
        "weekly recall",
        "monthly recall"
      ],
      "sections": [
        {
          "heading": "Retrieval survives gaps",
          "paragraphs": [
            "Use a small inspectable artifact at each interval and the common reasoning frame to distinguish retained understanding from familiarity. Later retention pages supply concrete cadence activities."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain the four-interval recall loop in 60 seconds without notes.",
          "page": 11
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system where this recall capability is needed.",
          "page": 11
        },
        {
          "title": "Scale modification",
          "task": "Change the design for 10\u00d7 traffic.",
          "page": 11
        },
        {
          "title": "Failure",
          "task": "Add one failure and describe detection, mitigation and visible behavior.",
          "page": 11
        },
        {
          "title": "Alternative",
          "task": "State and reject one alternative with reasons.",
          "page": 11
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product under one changed shared constraint.",
          "page": 11
        },
        {
          "title": "Professional note",
          "task": "Write the shared one-page design note for this topic.",
          "page": 11
        },
        {
          "title": "Diagnostic",
          "task": "Explain, reason about failure, modify for 10\u00d7 and defend a trade-off without notes.",
          "check": "Demonstrate reasoning rather than a list of intervals.",
          "page": 11
        }
      ],
      "criteria": [
        "Pass the local diagnostic and use evidence rather than assumed retention."
      ],
      "recovery": "Reproduce the smallest example and retry recall, without restarting."
    },
    {
      "id": "blueprint-s0-6",
      "sourceId": "Stage 0 \u2014 6",
      "title": "Connect coding patterns to system-level reasoning",
      "phaseId": "blueprint-stage-0",
      "role": "checkpoint",
      "pages": [
        12
      ],
      "summary": "Link implementation patterns to system invariants, scarce resources and scaling decisions.",
      "action": "Explain the system consequence of one coding-pattern choice.",
      "minutes": 30,
      "concepts": [
        "coding patterns",
        "system reasoning",
        "invariants",
        "scale"
      ],
      "sections": [
        {
          "heading": "From code to architecture",
          "paragraphs": [
            "Place a coding pattern inside a small service, identify the requirement it satisfies and ask what changes when scale or failure assumptions change. Use the shared reasoning frame."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain the coding-to-system connection in 60 seconds without notes.",
          "page": 12
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system where this connection is necessary.",
          "page": 12
        },
        {
          "title": "Scale modification",
          "task": "Modify the system for 10\u00d7 traffic.",
          "page": 12
        },
        {
          "title": "Failure",
          "task": "Introduce one failure and define detection, mitigation and user-visible behavior.",
          "page": 12
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting one alternative.",
          "page": 12
        },
        {
          "title": "Transfer",
          "task": "Reuse the idea in a different product with one changed shared transfer constraint.",
          "page": 12
        },
        {
          "title": "Professional note",
          "task": "Write the shared one-page design note for this topic.",
          "page": 12
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain the mechanism, a failure, 10\u00d7 adaptation and a trade-off.",
          "check": "Reason from constraints instead of pattern names.",
          "page": 12
        }
      ],
      "criteria": [
        "Pass the local diagnostic and show reproduction, modification and transfer evidence in sequence."
      ],
      "recovery": "Reproduce the smallest coding example in its service context and retry."
    },
    {
      "id": "blueprint-s0-7",
      "sourceId": "Stage 0 \u2014 7",
      "title": "Define evidence standards for future stages",
      "phaseId": "blueprint-stage-0",
      "role": "checkpoint",
      "pages": [
        13
      ],
      "summary": "Specify what an inspectable artifact must establish before a capability label changes.",
      "action": "Write a concrete evidence requirement for the next learning task.",
      "minutes": 30,
      "concepts": [
        "evidence standards",
        "professional artifacts",
        "capability progression",
        "diagnostics"
      ],
      "sections": [
        {
          "heading": "Inspectable claims",
          "paragraphs": [
            "A code sample, diagram, benchmark, failure experiment or decision record can expose capability. Use the common stage standards to connect that artifact to real reasoning rather than reading completion."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain future-stage evidence standards in 60 seconds without notes.",
          "page": 13
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system where these standards matter.",
          "page": 13
        },
        {
          "title": "Scale modification",
          "task": "Revise the design for 10\u00d7 traffic.",
          "page": 13
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 13
        },
        {
          "title": "Alternative",
          "task": "Name and reject an alternative with reasons.",
          "page": 13
        },
        {
          "title": "Transfer",
          "task": "Apply the idea in a new product context with one changed shared constraint.",
          "page": 13
        },
        {
          "title": "Professional note",
          "task": "Produce the shared one-page design note for this topic.",
          "page": 13
        },
        {
          "title": "Diagnostic",
          "task": "Explain, diagnose a failure, modify for 10\u00d7 and defend a trade-off without notes.",
          "check": "Show coherent reasoning instead of an evidence-label list.",
          "page": 13
        }
      ],
      "criteria": [
        "Pass the local diagnostic and define evidence that can actually be inspected."
      ],
      "recovery": "Reproduce the smallest example and reassess the evidence before retrying."
    },
    {
      "id": "blueprint-s1-1",
      "sourceId": "Stage 1 \u2014 1",
      "title": "HTTP request/response and API boundaries",
      "phaseId": "blueprint-stage-1",
      "role": "checkpoint",
      "pages": [
        15
      ],
      "summary": "Reason about HTTP exchanges and API boundaries using requirements, invariants and failure assumptions.",
      "action": "Draw one HTTP request and response across an API boundary.",
      "minutes": 40,
      "concepts": [
        "HTTP",
        "request/response",
        "API boundaries"
      ],
      "sections": [
        {
          "heading": "Boundary reasoning",
          "paragraphs": [
            "Apply the shared single-service frame to an HTTP exchange: state the contract, traffic and resource constraint before choosing a mechanism; distinguish the successful exchange from recovery."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain HTTP request/response and API boundaries in 60 seconds without notes.",
          "page": 15
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing these HTTP/API boundaries.",
          "page": 15
        },
        {
          "title": "Scale modification",
          "task": "Revise it for 10\u00d7 traffic.",
          "page": 15
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; define detection, mitigation and user-visible behavior.",
          "page": 15
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting one alternative.",
          "page": 15
        },
        {
          "title": "Transfer",
          "task": "Reuse the mechanism in another product under one changed shared constraint.",
          "page": 15
        },
        {
          "title": "Professional note",
          "task": "Write the shared one-page design note for HTTP/API boundaries.",
          "page": 15
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Use mechanism-level reasoning, not vocabulary alone.",
          "page": 15
        }
      ],
      "criteria": [
        "Pass the HTTP/API diagnostic and the common staged evidence standard."
      ],
      "recovery": "Reproduce the smallest request/response example and retry."
    },
    {
      "id": "blueprint-s1-2",
      "sourceId": "Stage 1 \u2014 2",
      "title": "REST resource modeling and idempotency",
      "phaseId": "blueprint-stage-1",
      "role": "checkpoint",
      "pages": [
        16
      ],
      "summary": "Connect REST resource choices and repeat-operation behavior to a service's correctness contract.",
      "action": "Model one resource and describe what a repeated operation means.",
      "minutes": 40,
      "concepts": [
        "REST",
        "resource modeling",
        "idempotency"
      ],
      "sections": [
        {
          "heading": "Model before mechanism",
          "paragraphs": [
            "State the resource invariant, traffic and failure assumptions. Use the shared example to compare a simple adequate REST design with one rejected alternative."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain REST modeling and idempotency in 60 seconds without notes.",
          "page": 16
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system requiring these resource semantics.",
          "page": 16
        },
        {
          "title": "Scale modification",
          "task": "Adapt it to 10\u00d7 traffic.",
          "page": 16
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 16
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting one alternative.",
          "page": 16
        },
        {
          "title": "Transfer",
          "task": "Transfer the idea to a different product with one changed shared constraint.",
          "page": 16
        },
        {
          "title": "Professional note",
          "task": "Write the shared one-page design note for REST and idempotency.",
          "page": 16
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify a failure, adapt for 10\u00d7 and defend a trade-off without notes.",
          "check": "Provide coherent reasoning beyond component names.",
          "page": 16
        }
      ],
      "criteria": [
        "Pass the REST/idempotency diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce a small resource example and retry its diagnostic."
    },
    {
      "id": "blueprint-s1-3",
      "sourceId": "Stage 1 \u2014 3",
      "title": "Processes, threads, concurrency and async work",
      "phaseId": "blueprint-stage-1",
      "role": "checkpoint",
      "pages": [
        17
      ],
      "summary": "Relate execution and asynchronous work choices to constrained resources and service correctness.",
      "action": "Draw where one service's work executes and waits.",
      "minutes": 40,
      "concepts": [
        "processes",
        "threads",
        "concurrency",
        "async work"
      ],
      "sections": [
        {
          "heading": "Execution and resources",
          "paragraphs": [
            "Use the common frame to identify execution resources, the invariant being preserved and recovery behavior. Explain a mechanism before discussing what limits it under more traffic."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain processes, threads, concurrency and async work in 60 seconds without notes.",
          "page": 17
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing these execution mechanisms.",
          "page": 17
        },
        {
          "title": "Scale modification",
          "task": "Change it for 10\u00d7 traffic.",
          "page": 17
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; describe detection, mitigation and visible effects.",
          "page": 17
        },
        {
          "title": "Alternative",
          "task": "Explain rejection of one alternative.",
          "page": 17
        },
        {
          "title": "Transfer",
          "task": "Apply the mechanism to another product with one changed shared constraint.",
          "page": 17
        },
        {
          "title": "Professional note",
          "task": "Produce the shared one-page note for execution/concurrency choices.",
          "page": 17
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Reason about the mechanism rather than reciting terms.",
          "page": 17
        }
      ],
      "criteria": [
        "Pass the execution/concurrency diagnostic and shared staged evidence standard."
      ],
      "recovery": "Reproduce the smallest execution example and retry."
    },
    {
      "id": "blueprint-s1-4",
      "sourceId": "Stage 1 \u2014 4",
      "title": "Relational data modeling and transactions",
      "phaseId": "blueprint-stage-1",
      "role": "checkpoint",
      "pages": [
        18
      ],
      "summary": "Choose a relational model and transaction boundary from data invariants rather than database terminology.",
      "action": "Draw one relational model and its transaction invariant.",
      "minutes": 40,
      "concepts": [
        "relational data modeling",
        "transactions",
        "correctness invariants"
      ],
      "sections": [
        {
          "heading": "Data requirements first",
          "paragraphs": [
            "Begin with a single-service data design, its access demand and failure assumptions. Use the shared frame to expose the simplest model and its first scale limit."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain relational modeling and transactions in 60 seconds without notes.",
          "page": 18
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing this relational/transaction capability.",
          "page": 18
        },
        {
          "title": "Scale modification",
          "task": "Revise the design for 10\u00d7 traffic.",
          "page": 18
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible behavior.",
          "page": 18
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting one alternative.",
          "page": 18
        },
        {
          "title": "Transfer",
          "task": "Transfer to a new product with one changed shared constraint.",
          "page": 18
        },
        {
          "title": "Professional note",
          "task": "Write the shared one-page note for relational modeling and transactions.",
          "page": 18
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify a failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason coherently from constraints.",
          "page": 18
        }
      ],
      "criteria": [
        "Pass the relational/transaction diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest model and transaction example, then retry."
    },
    {
      "id": "blueprint-s1-5",
      "sourceId": "Stage 1 \u2014 5",
      "title": "NoSQL data-modeling intuition",
      "phaseId": "blueprint-stage-1",
      "role": "checkpoint",
      "pages": [
        19
      ],
      "summary": "Build requirement-led intuition for nonrelational models, their invariants and resource limits.",
      "action": "Sketch a simple nonrelational model for one stated access need.",
      "minutes": 40,
      "concepts": [
        "NoSQL",
        "data modeling",
        "access requirements"
      ],
      "sections": [
        {
          "heading": "Explain the model's job",
          "paragraphs": [
            "Apply the shared single-service reasoning frame to a NoSQL choice, including correctness, traffic shape and failure assumptions. Product-name recall is insufficient."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain NoSQL data-modeling intuition in 60 seconds without notes.",
          "page": 19
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing this data-modeling choice.",
          "page": 19
        },
        {
          "title": "Scale modification",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 19
        },
        {
          "title": "Failure",
          "task": "Specify one failure, its detection, mitigation and user-visible effect.",
          "page": 19
        },
        {
          "title": "Alternative",
          "task": "Justify rejection of one alternative.",
          "page": 19
        },
        {
          "title": "Transfer",
          "task": "Move the model to another product with one changed shared constraint.",
          "page": 19
        },
        {
          "title": "Professional note",
          "task": "Write the shared one-page design note for the NoSQL choice.",
          "page": 19
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Use coherent mechanism-level reasoning.",
          "page": 19
        }
      ],
      "criteria": [
        "Pass the NoSQL diagnostic and shared staged evidence standard."
      ],
      "recovery": "Reproduce the smallest NoSQL example and retry."
    },
    {
      "id": "blueprint-s1-6",
      "sourceId": "Stage 1 \u2014 6",
      "title": "Networking basics: DNS, TCP, TLS and proxies",
      "phaseId": "blueprint-stage-1",
      "role": "checkpoint",
      "pages": [
        20
      ],
      "summary": "Connect naming, transport, security and proxy boundaries to a service request's operational path.",
      "action": "Draw a request path naming DNS, TCP, TLS and proxy boundaries.",
      "minutes": 40,
      "concepts": [
        "DNS",
        "TCP",
        "TLS",
        "proxies",
        "networking"
      ],
      "sections": [
        {
          "heading": "Trace mechanisms and boundaries",
          "paragraphs": [
            "Use the shared resource/invariant frame to explain why each networking mechanism is present. State failure assumptions and identify what signal would expose the first limit at higher traffic."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain DNS, TCP, TLS and proxies in 60 seconds without notes.",
          "page": 20
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing these networking mechanisms.",
          "page": 20
        },
        {
          "title": "Scale modification",
          "task": "Revise it for 10\u00d7 traffic.",
          "page": 20
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible behavior.",
          "page": 20
        },
        {
          "title": "Alternative",
          "task": "Explain why one alternative is rejected.",
          "page": 20
        },
        {
          "title": "Transfer",
          "task": "Use the same idea in another product under one changed shared constraint.",
          "page": 20
        },
        {
          "title": "Professional note",
          "task": "Write the shared one-page note for this networking design.",
          "page": 20
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, modify for 10\u00d7 and defend a trade-off without notes.",
          "check": "Demonstrate reasoning rather than protocol-name recall.",
          "page": 20
        }
      ],
      "criteria": [
        "Pass the networking diagnostic and common evidence standard."
      ],
      "recovery": "Reproduce the smallest request path and retry."
    },
    {
      "id": "blueprint-s1-7",
      "sourceId": "Stage 1 \u2014 7",
      "title": "Service boundaries and deployment units",
      "phaseId": "blueprint-stage-1",
      "role": "checkpoint",
      "pages": [
        21
      ],
      "summary": "Relate logical service boundaries to what can be deployed and operated under stated constraints.",
      "action": "Sketch one service boundary beside its deployment unit.",
      "minutes": 40,
      "concepts": [
        "service boundaries",
        "deployment units",
        "failure boundaries"
      ],
      "sections": [
        {
          "heading": "A boundary must serve a requirement",
          "paragraphs": [
            "Apply the common single-service reasoning exercise to a boundary and its operational unit. Identify the constrained resource and separate normal operation from failure recovery."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain service boundaries and deployment units in 60 seconds without notes.",
          "page": 21
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing these boundaries.",
          "page": 21
        },
        {
          "title": "Scale modification",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 21
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; specify detection, mitigation and user-visible behavior.",
          "page": 21
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting one alternative.",
          "page": 21
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to a new product with one changed shared constraint.",
          "page": 21
        },
        {
          "title": "Professional note",
          "task": "Produce the shared one-page note for service/deployment boundaries.",
          "page": 21
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason coherently from the service constraints.",
          "page": 21
        }
      ],
      "criteria": [
        "Pass the boundary diagnostic and shared staged evidence standard."
      ],
      "recovery": "Reproduce the smallest boundary example and retry."
    },
    {
      "id": "blueprint-s2-1",
      "sourceId": "Stage 2 \u2014 1",
      "title": "Load balancing and traffic distribution",
      "phaseId": "blueprint-stage-2",
      "role": "checkpoint",
      "pages": [
        23
      ],
      "summary": "Treat routing as an admission/distribution policy that preserves correctness and availability, not merely a box before servers.",
      "action": "Design a two-instance API and name its routing and health policy.",
      "minutes": 45,
      "concepts": [
        "load balancing",
        "traffic distribution",
        "admission",
        "L4",
        "L7",
        "session affinity",
        "state placement",
        "health checks",
        "connection pools",
        "downstream dependencies",
        "uneven keys",
        "long-lived connections",
        "tenant pools"
      ],
      "sections": [
        {
          "heading": "Routing policy and state",
          "paragraphs": [
            "First determine whether requests are independent. Session affinity changes both routing and state placement; L4/L7 implementation concerns are distinct from the business routing decision."
          ],
          "items": [
            "Reachability does not prove dependency health.",
            "At 10\u00d7 scale inspect the balancer, connection pools, downstream services and skewed keys rather than assuming the API tier is the bottleneck."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Two-instance API",
          "task": "Design an API with two instances behind a load balancer.",
          "page": 23
        },
        {
          "title": "Long-lived connections",
          "task": "Modify the API routing design for long-lived connections.",
          "page": 23
        },
        {
          "title": "Unhealthy instance",
          "task": "Make one instance unhealthy and explain how it is detected.",
          "page": 23
        },
        {
          "title": "Tenant-pool transfer",
          "task": "Route tenants to different pools without producing a single-tenant hotspot.",
          "page": 23
        },
        {
          "title": "Product transfer",
          "task": "Apply the idea to another product with one changed shared transfer constraint.",
          "page": 23
        },
        {
          "title": "Professional note",
          "task": "Write the shared one-page design note for the routing policy.",
          "page": 23
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain routing, one failure, a 10\u00d7 modification and a trade-off.",
          "check": "Coherent mechanism-level reasoning, not component names.",
          "page": 23
        }
      ],
      "criteria": [
        "Pass the local diagnostic and the shared staged evidence standard."
      ],
      "recovery": "Reproduce the two-instance example and retry the routing diagnostic."
    },
    {
      "id": "blueprint-s2-2",
      "sourceId": "Stage 2 \u2014 2",
      "title": "Caching and cache invalidation",
      "phaseId": "blueprint-stage-2",
      "role": "checkpoint",
      "pages": [
        24
      ],
      "summary": "Reason about a cache and its invalidation obligations from requirements and correctness.",
      "action": "State one cached value's correctness requirement before drawing its cache.",
      "minutes": 40,
      "concepts": [
        "caching",
        "cache invalidation"
      ],
      "sections": [
        {
          "heading": "Cache reasoning",
          "paragraphs": [
            "Use the common single-service frame to identify the resource saved, the invariant preserved and recovery behavior when the mechanism fails."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain caching and invalidation in 60 seconds without notes.",
          "page": 24
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing caching and invalidation.",
          "page": 24
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 24
        },
        {
          "title": "Failure",
          "task": "Add one failure; state detection, mitigation and user-visible effects.",
          "page": 24
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting one alternative.",
          "page": 24
        },
        {
          "title": "Transfer",
          "task": "Use caching in another product with one changed shared constraint.",
          "page": 24
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page note for this cache design.",
          "page": 24
        },
        {
          "title": "Diagnostic",
          "task": "Explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason beyond vocabulary.",
          "page": 24
        }
      ],
      "criteria": [
        "Pass the cache diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest cache example and retry."
    },
    {
      "id": "blueprint-s2-3",
      "sourceId": "Stage 2 \u2014 3",
      "title": "Queues, messaging and asynchronous processing",
      "phaseId": "blueprint-stage-2",
      "role": "checkpoint",
      "pages": [
        25
      ],
      "summary": "Explain asynchronous communication as a mechanism with explicit resource, correctness and recovery consequences.",
      "action": "Draw one message from producer through queue to processing.",
      "minutes": 40,
      "concepts": [
        "queues",
        "messaging",
        "asynchronous processing"
      ],
      "sections": [
        {
          "heading": "Communication under constraints",
          "paragraphs": [
            "Apply the common requirements-to-mechanism frame to queued work. State normal behavior and recovery separately before evaluating growth."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain queues, messaging and async processing in 60 seconds without notes.",
          "page": 25
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing these mechanisms.",
          "page": 25
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 25
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; define detection, mitigation and visible behavior.",
          "page": 25
        },
        {
          "title": "Alternative",
          "task": "Defend rejection of one alternative.",
          "page": 25
        },
        {
          "title": "Transfer",
          "task": "Move the mechanism to another product with one changed shared constraint.",
          "page": 25
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for queued processing.",
          "page": 25
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent reasoning beyond component names.",
          "page": 25
        }
      ],
      "criteria": [
        "Pass the messaging diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest queued-work example and retry."
    },
    {
      "id": "blueprint-s2-4",
      "sourceId": "Stage 2 \u2014 4",
      "title": "Databases: indexing, transactions and isolation",
      "phaseId": "blueprint-stage-2",
      "role": "checkpoint",
      "pages": [
        26
      ],
      "summary": "Connect database access and correctness requirements to indexes, transaction boundaries and isolation.",
      "action": "Identify an access requirement and invariant in a small database design.",
      "minutes": 45,
      "concepts": [
        "databases",
        "indexing",
        "transactions",
        "isolation"
      ],
      "sections": [
        {
          "heading": "Access and correctness",
          "paragraphs": [
            "Apply the shared frame to database mechanisms: name the constrained resource, traffic shape, invariant and failure assumption before choosing an index or transactional approach."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain indexing, transactions and isolation in 60 seconds without notes.",
          "page": 26
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing these database mechanisms.",
          "page": 26
        },
        {
          "title": "Scale",
          "task": "Modify the design for 10\u00d7 traffic.",
          "page": 26
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 26
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting one alternative.",
          "page": 26
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 26
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for this database design.",
          "page": 26
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason from requirements rather than labels.",
          "page": 26
        }
      ],
      "criteria": [
        "Pass the database diagnostic and shared staged evidence standard."
      ],
      "recovery": "Reproduce the smallest database example and retry."
    },
    {
      "id": "blueprint-s2-5",
      "sourceId": "Stage 2 \u2014 5",
      "title": "Replication and consistency",
      "phaseId": "blueprint-stage-2",
      "role": "checkpoint",
      "pages": [
        27
      ],
      "summary": "Explain replicated data in terms of required guarantees and failure assumptions.",
      "action": "State what one replicated value must guarantee to its readers.",
      "minutes": 45,
      "concepts": [
        "replication",
        "consistency"
      ],
      "sections": [
        {
          "heading": "Guarantees before components",
          "paragraphs": [
            "Use the common single-service starting frame and identify the invariant and coordination resource before adding replication. Distinguish normal behavior from recovery."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain replication and consistency in 60 seconds without notes.",
          "page": 27
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system requiring replication and consistency reasoning.",
          "page": 27
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 27
        },
        {
          "title": "Failure",
          "task": "Add one failure; state detection, mitigation and user-visible behavior.",
          "page": 27
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 27
        },
        {
          "title": "Transfer",
          "task": "Transfer the mechanism to a new product with one changed shared constraint.",
          "page": 27
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page note for replication and consistency.",
          "page": 27
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, modify for 10\u00d7 and defend a trade-off without notes.",
          "check": "Demonstrate coherent mechanism reasoning.",
          "page": 27
        }
      ],
      "criteria": [
        "Pass the replication diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest replication example and retry."
    },
    {
      "id": "blueprint-s2-6",
      "sourceId": "Stage 2 \u2014 6",
      "title": "CDNs and edge delivery",
      "phaseId": "blueprint-stage-2",
      "role": "checkpoint",
      "pages": [
        28
      ],
      "summary": "Relate edge delivery choices to a workload's requirements, resources and correctness.",
      "action": "Draw the smallest delivery path containing an edge boundary.",
      "minutes": 40,
      "concepts": [
        "CDNs",
        "edge delivery"
      ],
      "sections": [
        {
          "heading": "Delivery mechanism",
          "paragraphs": [
            "Apply the shared resource/invariant frame to edge delivery; state traffic and failure assumptions, then identify the first limiting resource under growth."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain CDNs and edge delivery in 60 seconds without notes.",
          "page": 28
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system where edge delivery is needed.",
          "page": 28
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 28
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 28
        },
        {
          "title": "Alternative",
          "task": "Explain why one alternative is rejected.",
          "page": 28
        },
        {
          "title": "Transfer",
          "task": "Apply edge delivery to another product under one changed shared constraint.",
          "page": 28
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for this delivery design.",
          "page": 28
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Use reasoning, not a component list.",
          "page": 28
        }
      ],
      "criteria": [
        "Pass the edge-delivery diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest delivery example and retry."
    },
    {
      "id": "blueprint-s2-7",
      "sourceId": "Stage 2 \u2014 7",
      "title": "Observability: logs, metrics, traces and health",
      "phaseId": "blueprint-stage-2",
      "role": "checkpoint",
      "pages": [
        29
      ],
      "summary": "Choose operational signals that reveal whether a system preserves its requirements and where it fails.",
      "action": "Name one health question and the signal needed to answer it.",
      "minutes": 40,
      "concepts": [
        "observability",
        "logs",
        "metrics",
        "traces",
        "health"
      ],
      "sections": [
        {
          "heading": "Signals tied to behavior",
          "paragraphs": [
            "Use the shared reasoning frame to connect an invariant and failure assumption to useful signals, including what reveals the first 10\u00d7 bottleneck."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain logs, metrics, traces and health in 60 seconds without notes.",
          "page": 29
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system requiring these observability mechanisms.",
          "page": 29
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 29
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; define detection, mitigation and visible effects.",
          "page": 29
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 29
        },
        {
          "title": "Transfer",
          "task": "Reuse the idea in another product with one changed shared constraint.",
          "page": 29
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page observability design note.",
          "page": 29
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, modify for 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason from operational needs rather than signal names.",
          "page": 29
        }
      ],
      "criteria": [
        "Pass the observability diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest instrumented design and retry."
    },
    {
      "id": "blueprint-s3-1",
      "sourceId": "Stage 3 \u2014 1",
      "title": "Stateless service pattern",
      "phaseId": "blueprint-stage-3",
      "role": "checkpoint",
      "pages": [
        31
      ],
      "summary": "Recognize stateless service design through its invariant, resource and failure assumptions.",
      "action": "Sketch a stateless service and explicitly locate any required state.",
      "minutes": 40,
      "concepts": [
        "stateless service pattern",
        "state",
        "pattern recognition"
      ],
      "sections": [
        {
          "heading": "Recognize the mechanism",
          "paragraphs": [
            "Apply the common single-service reasoning frame before adapting the pattern to scale or a new product. The source supplies practice prompts, not implementation code."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain the stateless service pattern in 60 seconds without notes.",
          "page": 31
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing the pattern.",
          "page": 31
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 31
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 31
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 31
        },
        {
          "title": "Transfer",
          "task": "Use the pattern in another product with one changed shared constraint.",
          "page": 31
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for this stateless design.",
          "page": 31
        },
        {
          "title": "Diagnostic",
          "task": "Explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent reasoning beyond pattern names.",
          "page": 31
        }
      ],
      "criteria": [
        "Pass the stateless-pattern diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest stateless example and retry."
    },
    {
      "id": "blueprint-s3-2",
      "sourceId": "Stage 3 \u2014 2",
      "title": "Read-heavy caching pattern",
      "phaseId": "blueprint-stage-3",
      "role": "checkpoint",
      "pages": [
        32
      ],
      "summary": "Recognize when a read-dominated workload motivates caching and reason about its constraints.",
      "action": "Describe a read-heavy workload and the invariant its cache must preserve.",
      "minutes": 40,
      "concepts": [
        "read-heavy caching",
        "read/write traffic shape",
        "pattern recognition"
      ],
      "sections": [
        {
          "heading": "Workload-driven recognition",
          "paragraphs": [
            "Use the common frame to connect read demand to the caching mechanism, then expose its failure and growth assumptions."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain read-heavy caching in 60 seconds without notes.",
          "page": 32
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal read-heavy system needing the pattern.",
          "page": 32
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 32
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 32
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 32
        },
        {
          "title": "Transfer",
          "task": "Apply the pattern in another product with one changed shared constraint.",
          "page": 32
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for read-heavy caching.",
          "page": 32
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Reason beyond cache terminology.",
          "page": 32
        }
      ],
      "criteria": [
        "Pass the read-heavy-cache diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest read-heavy example and retry."
    },
    {
      "id": "blueprint-s3-3",
      "sourceId": "Stage 3 \u2014 3",
      "title": "Write-behind / async processing",
      "phaseId": "blueprint-stage-3",
      "role": "checkpoint",
      "pages": [
        33
      ],
      "summary": "Recognize deferred processing as a pattern with correctness and recovery implications.",
      "action": "Draw where work is accepted and where deferred processing occurs.",
      "minutes": 40,
      "concepts": [
        "write-behind",
        "async processing",
        "deferred work"
      ],
      "sections": [
        {
          "heading": "Separate the work phases",
          "paragraphs": [
            "Apply the common requirements, invariant and scarce-resource frame to deferred work. Make failure assumptions explicit before choosing the mechanism."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain write-behind/async processing in 60 seconds without notes.",
          "page": 33
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing deferred processing.",
          "page": 33
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 33
        },
        {
          "title": "Failure",
          "task": "Add one failure; specify detection, mitigation and visible behavior.",
          "page": 33
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 33
        },
        {
          "title": "Transfer",
          "task": "Use the pattern in a different product with one changed shared constraint.",
          "page": 33
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page note for deferred processing.",
          "page": 33
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent mechanism reasoning.",
          "page": 33
        }
      ],
      "criteria": [
        "Pass the deferred-processing diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest deferred-work example and retry."
    },
    {
      "id": "blueprint-s3-4",
      "sourceId": "Stage 3 \u2014 4",
      "title": "Fan-out and fan-in",
      "phaseId": "blueprint-stage-3",
      "role": "checkpoint",
      "pages": [
        34
      ],
      "summary": "Recognize how distributing and combining work changes constraints and failure behavior.",
      "action": "Draw one fan-out and the corresponding fan-in boundary.",
      "minutes": 40,
      "concepts": [
        "fan-out",
        "fan-in"
      ],
      "sections": [
        {
          "heading": "Distribute and combine",
          "paragraphs": [
            "Use the common frame to state the invariant and scarce resource in a fan-out/fan-in design, then separate successful aggregation from recovery."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain fan-out and fan-in in 60 seconds without notes.",
          "page": 34
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing fan-out/fan-in.",
          "page": 34
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 34
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 34
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 34
        },
        {
          "title": "Transfer",
          "task": "Transfer the pattern to another product under one changed shared constraint.",
          "page": 34
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for fan-out/fan-in.",
          "page": 34
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Reason beyond pattern names.",
          "page": 34
        }
      ],
      "criteria": [
        "Pass the fan-out/fan-in diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest distribution/aggregation example and retry."
    },
    {
      "id": "blueprint-s3-5",
      "sourceId": "Stage 3 \u2014 5",
      "title": "Retry, timeout and circuit-breaker reasoning",
      "phaseId": "blueprint-stage-3",
      "role": "checkpoint",
      "pages": [
        35
      ],
      "summary": "Reason about retries, time limits and breakers from explicit failure and resource assumptions.",
      "action": "Describe a dependency failure before choosing a retry or timeout policy.",
      "minutes": 45,
      "concepts": [
        "retry",
        "timeout",
        "circuit breaker"
      ],
      "sections": [
        {
          "heading": "Recovery is part of the design",
          "paragraphs": [
            "Use the common single-service frame to preserve correctness while distinguishing normal calls from recovery. Explain why a policy fits before naming its component."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain retry, timeout and circuit-breaker reasoning in 60 seconds without notes.",
          "page": 35
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing these recovery mechanisms.",
          "page": 35
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 35
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; define detection, mitigation and user-visible effects.",
          "page": 35
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting one alternative.",
          "page": 35
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 35
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for retry/timeout/breaker decisions.",
          "page": 35
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Use coherent failure reasoning, not policy labels.",
          "page": 35
        }
      ],
      "criteria": [
        "Pass the recovery-pattern diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest dependency example and retry."
    },
    {
      "id": "blueprint-s3-6",
      "sourceId": "Stage 3 \u2014 6",
      "title": "Partitioning and sharding",
      "phaseId": "blueprint-stage-3",
      "role": "checkpoint",
      "pages": [
        36
      ],
      "summary": "Recognize partitioning as a response to specific resource and correctness constraints.",
      "action": "State the constraint a proposed shard boundary would address.",
      "minutes": 45,
      "concepts": [
        "partitioning",
        "sharding"
      ],
      "sections": [
        {
          "heading": "A split needs a reason",
          "paragraphs": [
            "Apply the shared single-service frame before distributing data or work. Identify the invariant, traffic shape, failure assumption and signal of the first growth limit."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain partitioning and sharding in 60 seconds without notes.",
          "page": 36
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system requiring partitioning/sharding.",
          "page": 36
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 36
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 36
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 36
        },
        {
          "title": "Transfer",
          "task": "Use the pattern in another product under one changed shared constraint.",
          "page": 36
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page note for partitioning/sharding.",
          "page": 36
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Reason beyond component names.",
          "page": 36
        }
      ],
      "criteria": [
        "Pass the partitioning diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest partitioning example and retry."
    },
    {
      "id": "blueprint-s3-7",
      "sourceId": "Stage 3 \u2014 7",
      "title": "Event-driven integration",
      "phaseId": "blueprint-stage-3",
      "role": "checkpoint",
      "pages": [
        37
      ],
      "summary": "Recognize event-driven integration through its requirements and failure semantics.",
      "action": "Draw a single event crossing a service boundary.",
      "minutes": 40,
      "concepts": [
        "events",
        "event-driven integration"
      ],
      "sections": [
        {
          "heading": "Integration mechanism",
          "paragraphs": [
            "Apply the common invariant/resource frame to an event path. Explain normal behavior, recovery and the first limiting resource under increased traffic."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain event-driven integration in 60 seconds without notes.",
          "page": 37
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing event-driven integration.",
          "page": 37
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 37
        },
        {
          "title": "Failure",
          "task": "Add one failure; define detection, mitigation and visible behavior.",
          "page": 37
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 37
        },
        {
          "title": "Transfer",
          "task": "Apply the pattern to another product with one changed shared constraint.",
          "page": 37
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for the event integration.",
          "page": 37
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent reasoning rather than vocabulary.",
          "page": 37
        }
      ],
      "criteria": [
        "Pass the event-integration diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest event flow and retry."
    },
    {
      "id": "blueprint-s4-1",
      "sourceId": "Stage 4 \u2014 1",
      "title": "URL shortener",
      "phaseId": "blueprint-stage-4",
      "role": "checkpoint",
      "pages": [
        39
      ],
      "summary": "Combine requirements, invariants and mechanisms into a small complete URL-shortener design.",
      "action": "State a shortener's requirement and draw the simplest request path.",
      "minutes": 45,
      "concepts": [
        "URL shortener",
        "guided end-to-end design"
      ],
      "sections": [
        {
          "heading": "Begin with one service",
          "paragraphs": [
            "Use the common single-service reasoning frame rather than jumping to a distributed diagram. Identify constraints, traffic, correctness and failures; Case Study A supplies a later, separate concrete practice scenario."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a URL shortener in 60 seconds without notes.",
          "page": 39
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest URL-shortener system.",
          "page": 39
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 39
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible behavior.",
          "page": 39
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 39
        },
        {
          "title": "Transfer",
          "task": "Apply the underlying idea to another product with one changed shared constraint.",
          "page": 39
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for the shortener.",
          "page": 39
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Reason coherently from requirements.",
          "page": 39
        }
      ],
      "criteria": [
        "Pass the shortener diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest shortener example and retry."
    },
    {
      "id": "blueprint-s4-2",
      "sourceId": "Stage 4 \u2014 2",
      "title": "Notification service",
      "phaseId": "blueprint-stage-4",
      "role": "checkpoint",
      "pages": [
        40
      ],
      "summary": "Develop a small notification design with explicit requirements, constraints and recovery assumptions.",
      "action": "Draw the simplest notification request and delivery path.",
      "minutes": 45,
      "concepts": [
        "notification service",
        "guided application"
      ],
      "sections": [
        {
          "heading": "Complete but small",
          "paragraphs": [
            "Use the common single-service frame to expose a notification invariant, scarce resource and first scaling limit. The later Notification Platform case remains separate practice."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a notification service in 60 seconds without notes.",
          "page": 40
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest notification system.",
          "page": 40
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 40
        },
        {
          "title": "Failure",
          "task": "Add one failure; state detection, mitigation and user-visible effects.",
          "page": 40
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 40
        },
        {
          "title": "Transfer",
          "task": "Reuse the idea in another product under one changed shared constraint.",
          "page": 40
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page notification design note.",
          "page": 40
        },
        {
          "title": "Diagnostic",
          "task": "Explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Mechanism reasoning rather than component recall.",
          "page": 40
        }
      ],
      "criteria": [
        "Pass the notification diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest notification example and retry."
    },
    {
      "id": "blueprint-s4-3",
      "sourceId": "Stage 4 \u2014 3",
      "title": "File upload and processing pipeline",
      "phaseId": "blueprint-stage-4",
      "role": "checkpoint",
      "pages": [
        41
      ],
      "summary": "Combine file transfer and processing into a guided design with clear constraints and failure behavior.",
      "action": "Draw the smallest upload-to-processing flow.",
      "minutes": 45,
      "concepts": [
        "file upload",
        "processing pipeline"
      ],
      "sections": [
        {
          "heading": "Follow the complete flow",
          "paragraphs": [
            "Use the common requirements-to-mechanism frame for upload and processing. Identify the limiting resource and correctness invariant before modifying the design."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a file upload/processing pipeline in 60 seconds without notes.",
          "page": 41
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest upload/processing system.",
          "page": 41
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 41
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible behavior.",
          "page": 41
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 41
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 41
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for upload and processing.",
          "page": 41
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent reasoning from requirements.",
          "page": 41
        }
      ],
      "criteria": [
        "Pass the pipeline diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest upload/processing example and retry."
    },
    {
      "id": "blueprint-s4-4",
      "sourceId": "Stage 4 \u2014 4",
      "title": "Rate limiter",
      "phaseId": "blueprint-stage-4",
      "role": "checkpoint",
      "pages": [
        42
      ],
      "summary": "Design admission controls around allowed work, caller identity, rates, bursts and exhaustion behavior.",
      "action": "Implement a small local counter and state its admission policy.",
      "minutes": 45,
      "concepts": [
        "rate limiter",
        "admission control",
        "local counter",
        "token bucket",
        "refill rate",
        "burst allowance",
        "fixed window",
        "boundary spikes",
        "distributed enforcement",
        "shared state",
        "consistency",
        "fail-open",
        "fail-closed",
        "user",
        "API key",
        "tenant",
        "endpoint"
      ],
      "sections": [
        {
          "heading": "Policy, not just counting",
          "paragraphs": [
            "A rate limit allocates scarce capacity and protects the service. Define which work is admitted, for whom, at what sustained rate and burst allowance, and what happens when capacity is exhausted.",
            "Token buckets combine refill with burst capacity; fixed windows are simpler but allow boundary spikes. Multi-instance enforcement adds shared-state and consistency decisions."
          ],
          "items": [
            "Fail-open versus fail-closed changes both product behavior and reliability, not merely implementation."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Local counter",
          "task": "Implement a local request counter.",
          "page": 42
        },
        {
          "title": "Token bucket",
          "task": "Modify the counter into a token bucket.",
          "page": 42
        },
        {
          "title": "Multiple instances",
          "task": "Add instances and explain the shared-state implications.",
          "page": 42
        },
        {
          "title": "Policy transfer",
          "task": "Apply distinct policies by user, API key, tenant and endpoint.",
          "page": 42
        },
        {
          "title": "Product transfer",
          "task": "Transfer the design to another product with one changed shared constraint.",
          "page": 42
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for the admission policy.",
          "page": 42
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, modify for 10\u00d7 and defend a trade-off.",
          "check": "Reason about admission and failure policy, not counter names.",
          "page": 42
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared staged evidence standard."
      ],
      "recovery": "Reproduce the local counter and explain its policy before retrying."
    },
    {
      "id": "blueprint-s4-5",
      "sourceId": "Stage 4 \u2014 5",
      "title": "Job scheduler",
      "phaseId": "blueprint-stage-4",
      "role": "checkpoint",
      "pages": [
        43
      ],
      "summary": "Build a small scheduler design from workload requirements, resource constraints and recovery assumptions.",
      "action": "Draw one job's scheduling and execution path.",
      "minutes": 45,
      "concepts": [
        "job scheduler",
        "scheduling",
        "execution"
      ],
      "sections": [
        {
          "heading": "A job through the system",
          "paragraphs": [
            "Apply the common single-service frame to the scheduler, including correctness, traffic shape, the first growth limit and normal versus recovery behavior."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a job scheduler in 60 seconds without notes.",
          "page": 43
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest scheduler system.",
          "page": 43
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 43
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 43
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 43
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 43
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page scheduler note.",
          "page": 43
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent requirement-to-mechanism reasoning.",
          "page": 43
        }
      ],
      "criteria": [
        "Pass the scheduler diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest scheduler example and retry."
    },
    {
      "id": "blueprint-s4-6",
      "sourceId": "Stage 4 \u2014 6",
      "title": "Order/payment workflow",
      "phaseId": "blueprint-stage-4",
      "role": "checkpoint",
      "pages": [
        44
      ],
      "summary": "Frame an order/payment flow around explicit correctness and failure assumptions.",
      "action": "State the workflow's invariant and draw its simplest path.",
      "minutes": 45,
      "concepts": [
        "order workflow",
        "payment workflow"
      ],
      "sections": [
        {
          "heading": "Correctness along a flow",
          "paragraphs": [
            "Use the common single-service frame to select the simplest adequate workflow mechanism and distinguish recovery from the happy path. The later order case adds specific business variations."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain an order/payment workflow in 60 seconds without notes.",
          "page": 44
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest order/payment system.",
          "page": 44
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 44
        },
        {
          "title": "Failure",
          "task": "Add one failure; define detection, mitigation and visible behavior.",
          "page": 44
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 44
        },
        {
          "title": "Transfer",
          "task": "Move the idea to another product with one changed shared constraint.",
          "page": 44
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page order/payment note.",
          "page": 44
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent reasoning, not component-name recall.",
          "page": 44
        }
      ],
      "criteria": [
        "Pass the workflow diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest order/payment example and retry."
    },
    {
      "id": "blueprint-s4-7",
      "sourceId": "Stage 4 \u2014 7",
      "title": "Search/autocomplete service",
      "phaseId": "blueprint-stage-4",
      "role": "checkpoint",
      "pages": [
        45
      ],
      "summary": "Create a small search/autocomplete design with explicit workload and correctness constraints.",
      "action": "Draw the simplest search request and response path.",
      "minutes": 45,
      "concepts": [
        "search",
        "autocomplete"
      ],
      "sections": [
        {
          "heading": "Start from the search requirement",
          "paragraphs": [
            "Apply the common resource/invariant frame, name the traffic shape and failure assumption, then identify what breaks first at increased load."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain search/autocomplete in 60 seconds without notes.",
          "page": 45
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest search/autocomplete system.",
          "page": 45
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 45
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 45
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 45
        },
        {
          "title": "Transfer",
          "task": "Apply the idea in another product with one changed shared constraint.",
          "page": 45
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page search/autocomplete note.",
          "page": 45
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Demonstrate mechanism-level reasoning.",
          "page": 45
        }
      ],
      "criteria": [
        "Pass the search/autocomplete diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest search example and retry."
    },
    {
      "id": "blueprint-s5-1",
      "sourceId": "Stage 5 \u2014 1",
      "title": "10\u00d7 traffic modifications",
      "phaseId": "blueprint-stage-5",
      "role": "checkpoint",
      "pages": [
        47
      ],
      "summary": "Adapt a design to tenfold demand while preserving its invariant and explaining the first bottleneck.",
      "action": "Identify what fails first when one service receives 10\u00d7 traffic.",
      "minutes": 45,
      "concepts": [
        "10\u00d7 traffic",
        "bottlenecks",
        "capacity",
        "scale modifications"
      ],
      "sections": [
        {
          "heading": "Growth with explicit reasoning",
          "paragraphs": [
            "Use the shared single-service frame, including traffic shape and observable limits. Increase ambiguity and pressure without skipping mechanism reasoning."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain 10\u00d7 modifications in 60 seconds without notes.",
          "page": 47
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing this scaling capability.",
          "page": 47
        },
        {
          "title": "Scale",
          "task": "Modify that design for 10\u00d7 traffic.",
          "page": 47
        },
        {
          "title": "Failure",
          "task": "Add one failure; specify detection, mitigation and visible effects.",
          "page": 47
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 47
        },
        {
          "title": "Transfer",
          "task": "Use the idea in a new product with one changed shared constraint.",
          "page": 47
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for the scaling decision.",
          "page": 47
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason coherently, not by adding named components.",
          "page": 47
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest pre-growth design and retry."
    },
    {
      "id": "blueprint-s5-2",
      "sourceId": "Stage 5 \u2014 2",
      "title": "100\u00d7 traffic modifications",
      "phaseId": "blueprint-stage-5",
      "role": "checkpoint",
      "pages": [
        48
      ],
      "summary": "Study hundredfold growth while retaining the source page's distinct tenfold practice and diagnostic prompts.",
      "action": "State the 100\u00d7 growth goal, then inspect the source's 10\u00d7 first modification.",
      "minutes": 45,
      "concepts": [
        "100\u00d7 traffic",
        "10\u00d7 modification",
        "scaling constraints"
      ],
      "sections": [
        {
          "heading": "Source scale mismatch",
          "paragraphs": [
            "The heading names 100\u00d7 growth, but this page's worked reasoning, practice modification and diagnostic explicitly use 10\u00d7. Both scales remain visible; the source does not supply a separate numerical 100\u00d7 solution."
          ],
          "items": [
            "Use the shared invariant, resource and failure frame."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain 100\u00d7 traffic modifications in 60 seconds without notes.",
          "page": 48
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing 100\u00d7 modification reasoning.",
          "page": 48
        },
        {
          "title": "Source 10\u00d7 modification",
          "task": "Modify the design for 10\u00d7 traffic, as the actual exercise specifies.",
          "page": 48
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible behavior.",
          "page": 48
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 48
        },
        {
          "title": "Transfer",
          "task": "Transfer the idea to another product with one changed shared constraint.",
          "page": 48
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page scaling note.",
          "page": 48
        },
        {
          "title": "Source 10\u00d7 diagnostic",
          "task": "Without notes explain, identify failure, modify for 10\u00d7 and defend a trade-off.",
          "check": "Coherent mechanism reasoning.",
          "page": 48
        }
      ],
      "criteria": [
        "Pass the source's local diagnostic and shared evidence standard; do not silently replace its 10\u00d7 requirement."
      ],
      "recovery": "Reproduce the smallest example and retry the stated diagnostic."
    },
    {
      "id": "blueprint-s5-3",
      "sourceId": "Stage 5 \u2014 3",
      "title": "Latency-budget exercises",
      "phaseId": "blueprint-stage-5",
      "role": "checkpoint",
      "pages": [
        49
      ],
      "summary": "Reason about latency constraints within an explicit service design instead of treating speed as an unspecified goal.",
      "action": "State a latency constraint and draw the path it covers.",
      "minutes": 45,
      "concepts": [
        "latency budget",
        "constraints",
        "timed practice"
      ],
      "sections": [
        {
          "heading": "Budget-led reasoning",
          "paragraphs": [
            "Apply the shared single-service frame to a latency budget, including scarce resources, traffic and failure assumptions. The source supplies no numerical budget to presume."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain latency budgets in 60 seconds without notes.",
          "page": 49
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing latency-budget reasoning.",
          "page": 49
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 49
        },
        {
          "title": "Failure",
          "task": "Add one failure; define detection, mitigation and visible effects.",
          "page": 49
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 49
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product under one changed shared constraint.",
          "page": 49
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page latency-budget note.",
          "page": 49
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason coherently from constraints.",
          "page": 49
        }
      ],
      "criteria": [
        "Pass the latency diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest latency-constrained design and retry."
    },
    {
      "id": "blueprint-s5-4",
      "sourceId": "Stage 5 \u2014 4",
      "title": "Capacity estimation",
      "phaseId": "blueprint-stage-5",
      "role": "checkpoint",
      "pages": [
        50
      ],
      "summary": "Connect expected traffic and resource constraints to defensible capacity reasoning.",
      "action": "Name the traffic assumption and scarce resource in a small service.",
      "minutes": 45,
      "concepts": [
        "capacity estimation",
        "traffic shape",
        "resource constraints"
      ],
      "sections": [
        {
          "heading": "Estimates follow assumptions",
          "paragraphs": [
            "Use the shared requirements-to-mechanism frame and identify the first observable growth limit. Do not invent source workload numbers."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain capacity estimation in 60 seconds without notes.",
          "page": 50
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing a capacity estimate.",
          "page": 50
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 50
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 50
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 50
        },
        {
          "title": "Transfer",
          "task": "Transfer the idea to another product with one changed shared constraint.",
          "page": 50
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page capacity note.",
          "page": 50
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Use coherent resource reasoning.",
          "page": 50
        }
      ],
      "criteria": [
        "Pass the capacity diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest capacity example and retry."
    },
    {
      "id": "blueprint-s5-5",
      "sourceId": "Stage 5 \u2014 5",
      "title": "Hot-key and hotspot diagnosis",
      "phaseId": "blueprint-stage-5",
      "role": "checkpoint",
      "pages": [
        51
      ],
      "summary": "Identify concentrated demand and reason about its effect on resource limits and correctness.",
      "action": "Describe where uneven demand could concentrate in one design.",
      "minutes": 45,
      "concepts": [
        "hot key",
        "hotspot",
        "diagnosis",
        "traffic skew"
      ],
      "sections": [
        {
          "heading": "Locate the constrained resource",
          "paragraphs": [
            "Use the shared frame to connect traffic shape, invariant and failure assumptions to a hotspot. Identify a signal that would expose the first limit under growth."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain hot-key/hotspot diagnosis in 60 seconds without notes.",
          "page": 51
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing hotspot diagnosis.",
          "page": 51
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 51
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; state detection, mitigation and visible behavior.",
          "page": 51
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 51
        },
        {
          "title": "Transfer",
          "task": "Reuse the idea in another product with one changed shared constraint.",
          "page": 51
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page hotspot note.",
          "page": 51
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Reason rather than naming components.",
          "page": 51
        }
      ],
      "criteria": [
        "Pass the hotspot diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest hotspot example and retry."
    },
    {
      "id": "blueprint-s5-6",
      "sourceId": "Stage 5 \u2014 6",
      "title": "Backpressure and overload",
      "phaseId": "blueprint-stage-5",
      "role": "checkpoint",
      "pages": [
        52
      ],
      "summary": "Reason about demand exceeding capacity and the mechanisms that preserve useful system behavior.",
      "action": "Draw where excess work accumulates and state the protected invariant.",
      "minutes": 45,
      "concepts": [
        "backpressure",
        "overload",
        "capacity"
      ],
      "sections": [
        {
          "heading": "Demand versus capacity",
          "paragraphs": [
            "Use the shared single-service frame to separate normal processing from overload recovery and identify the scarce resource and observable limit."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain backpressure and overload in 60 seconds without notes.",
          "page": 52
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing overload control.",
          "page": 52
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 52
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and user-visible effects.",
          "page": 52
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 52
        },
        {
          "title": "Transfer",
          "task": "Transfer the idea to another product with one changed shared constraint.",
          "page": 52
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page overload note.",
          "page": 52
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent mechanism reasoning.",
          "page": 52
        }
      ],
      "criteria": [
        "Pass the backpressure diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest overloaded example and retry."
    },
    {
      "id": "blueprint-s5-7",
      "sourceId": "Stage 5 \u2014 7",
      "title": "Timed architecture drills",
      "phaseId": "blueprint-stage-5",
      "role": "checkpoint",
      "pages": [
        53
      ],
      "summary": "Maintain explicit architecture reasoning as time pressure and ambiguity rise.",
      "action": "Give a 60-second explanation of one small architecture.",
      "minutes": 40,
      "concepts": [
        "timed architecture",
        "time pressure",
        "ambiguity"
      ],
      "sections": [
        {
          "heading": "Pressure without skipping reasoning",
          "paragraphs": [
            "Use the common requirements, constraints, invariant and failure frame under time pressure. Apart from the 60-second explanation, this page does not specify a drill duration."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain timed architecture drills in 60 seconds without notes.",
          "page": 53
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed for this drill.",
          "page": 53
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 53
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible behavior.",
          "page": 53
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 53
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 53
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for the timed design.",
          "page": 53
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent reasoning rather than rushed component recall.",
          "page": 53
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest design and retry before increasing pressure."
    },
    {
      "id": "blueprint-s6-1",
      "sourceId": "Stage 6 \u2014 1",
      "title": "Multi-region architecture",
      "phaseId": "blueprint-stage-6",
      "role": "checkpoint",
      "pages": [
        55
      ],
      "summary": "Reason about regional distribution as a change to requirements, guarantees and failure assumptions.",
      "action": "State the reason for using more than one region.",
      "minutes": 45,
      "concepts": [
        "multi-region architecture",
        "regional distribution"
      ],
      "sections": [
        {
          "heading": "Regions alter constraints",
          "paragraphs": [
            "Use the common single-service starting frame before adding regional variation. Preserve the invariant and distinguish normal operation from recovery."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain multi-region architecture in 60 seconds without notes.",
          "page": 55
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing multiple regions.",
          "page": 55
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 55
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; specify detection, mitigation and visible effects.",
          "page": 55
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 55
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 55
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page multi-region note.",
          "page": 55
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason coherently from constraints.",
          "page": 55
        }
      ],
      "criteria": [
        "Pass the multi-region diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest regional design and retry."
    },
    {
      "id": "blueprint-s6-2",
      "sourceId": "Stage 6 \u2014 2",
      "title": "Strong vs eventual consistency choices",
      "phaseId": "blueprint-stage-6",
      "role": "checkpoint",
      "pages": [
        56
      ],
      "summary": "Choose consistency behavior from correctness requirements rather than a default preference.",
      "action": "State what must remain correct before comparing strong and eventual consistency.",
      "minutes": 45,
      "concepts": [
        "strong consistency",
        "eventual consistency",
        "consistency choices"
      ],
      "sections": [
        {
          "heading": "Guarantees under constraints",
          "paragraphs": [
            "Use the shared invariant/resource frame to compare consistency choices and explain their behavior under growth and failure."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain strong versus eventual consistency in 60 seconds without notes.",
          "page": 56
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system requiring this choice.",
          "page": 56
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 56
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 56
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 56
        },
        {
          "title": "Transfer",
          "task": "Use the choice in another product with one changed shared constraint.",
          "page": 56
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page consistency-choice note.",
          "page": 56
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Mechanism reasoning, not guarantee names.",
          "page": 56
        }
      ],
      "criteria": [
        "Pass the consistency-choice diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest consistency example and retry."
    },
    {
      "id": "blueprint-s6-3",
      "sourceId": "Stage 6 \u2014 3",
      "title": "Distributed locks and coordination",
      "phaseId": "blueprint-stage-6",
      "role": "checkpoint",
      "pages": [
        57
      ],
      "summary": "Relate coordination mechanisms to explicit correctness and failure assumptions.",
      "action": "Name the invariant that a proposed distributed lock protects.",
      "minutes": 45,
      "concepts": [
        "distributed locks",
        "coordination"
      ],
      "sections": [
        {
          "heading": "Coordination has a purpose",
          "paragraphs": [
            "Apply the shared single-service frame and scarce-resource model before selecting a distributed mechanism. Separate the normal path from recovery."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain distributed locks and coordination in 60 seconds without notes.",
          "page": 57
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing distributed coordination.",
          "page": 57
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 57
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 57
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 57
        },
        {
          "title": "Transfer",
          "task": "Use the mechanism in another product under one changed shared constraint.",
          "page": 57
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page coordination note.",
          "page": 57
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent requirement-to-mechanism reasoning.",
          "page": 57
        }
      ],
      "criteria": [
        "Pass the coordination diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest coordination example and retry."
    },
    {
      "id": "blueprint-s6-4",
      "sourceId": "Stage 6 \u2014 4",
      "title": "Exactly-once vs at-least-once semantics",
      "phaseId": "blueprint-stage-6",
      "role": "checkpoint",
      "pages": [
        58
      ],
      "summary": "Compare processing guarantees in terms of invariants and failure assumptions.",
      "action": "State the exact operation and boundary to which a delivery guarantee applies.",
      "minutes": 45,
      "concepts": [
        "exactly-once",
        "at-least-once",
        "processing semantics"
      ],
      "sections": [
        {
          "heading": "State the guarantee's scope",
          "paragraphs": [
            "Apply the shared reasoning frame to the semantics being compared. Explain the mechanism and recovery assumptions instead of relying on the guarantee's name."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain exactly-once versus at-least-once in 60 seconds without notes.",
          "page": 58
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system where these semantics matter.",
          "page": 58
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 58
        },
        {
          "title": "Failure",
          "task": "Add one failure; specify detection, mitigation and visible behavior.",
          "page": 58
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 58
        },
        {
          "title": "Transfer",
          "task": "Apply the semantics to another product with one changed shared constraint.",
          "page": 58
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page processing-semantics note.",
          "page": 58
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent reasoning beyond guarantee labels.",
          "page": 58
        }
      ],
      "criteria": [
        "Pass the semantics diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest processing example and retry."
    },
    {
      "id": "blueprint-s6-5",
      "sourceId": "Stage 6 \u2014 5",
      "title": "Schema evolution",
      "phaseId": "blueprint-stage-6",
      "role": "checkpoint",
      "pages": [
        59
      ],
      "summary": "Reason about changing a data contract while preserving required system behavior.",
      "action": "State the invariant that must survive one schema change.",
      "minutes": 45,
      "concepts": [
        "schema evolution",
        "data contract"
      ],
      "sections": [
        {
          "heading": "Change with explicit assumptions",
          "paragraphs": [
            "Use the common requirement, resource and failure frame for schema evolution. Identify what must remain correct and separate the normal transition from recovery."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain schema evolution in 60 seconds without notes.",
          "page": 59
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing schema evolution.",
          "page": 59
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 59
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 59
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 59
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 59
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page schema-evolution note.",
          "page": 59
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Reason from constraints, not terminology.",
          "page": 59
        }
      ],
      "criteria": [
        "Pass the schema diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest schema-change example and retry."
    },
    {
      "id": "blueprint-s6-6",
      "sourceId": "Stage 6 \u2014 6",
      "title": "Data migration strategies",
      "phaseId": "blueprint-stage-6",
      "role": "checkpoint",
      "pages": [
        60
      ],
      "summary": "Choose migration mechanisms from correctness, traffic and failure requirements.",
      "action": "State a migration's protected invariant and recovery assumption.",
      "minutes": 45,
      "concepts": [
        "data migration",
        "migration strategy"
      ],
      "sections": [
        {
          "heading": "Migration is system behavior",
          "paragraphs": [
            "Apply the common single-service frame to moving data, including the scarce resource, correctness invariant and observable limit. Describe the happy path and recovery separately."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain data migration strategies in 60 seconds without notes.",
          "page": 60
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing migration reasoning.",
          "page": 60
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 60
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 60
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 60
        },
        {
          "title": "Transfer",
          "task": "Apply migration reasoning in another product under one changed shared constraint.",
          "page": 60
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page migration note.",
          "page": 60
        },
        {
          "title": "Diagnostic",
          "task": "Explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent mechanism reasoning.",
          "page": 60
        }
      ],
      "criteria": [
        "Pass the migration diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest migration model and retry; do not run unauthorized migrations."
    },
    {
      "id": "blueprint-s6-7",
      "sourceId": "Stage 6 \u2014 7",
      "title": "Graceful degradation",
      "phaseId": "blueprint-stage-6",
      "role": "checkpoint",
      "pages": [
        61
      ],
      "summary": "Reason about reduced service behavior that still preserves essential requirements during failure.",
      "action": "Name the behavior a service must preserve when one dependency fails.",
      "minutes": 45,
      "concepts": [
        "graceful degradation",
        "failure behavior"
      ],
      "sections": [
        {
          "heading": "Preserve what matters",
          "paragraphs": [
            "Use the shared invariant/resource frame to define acceptable normal and recovery behavior before choosing a degradation mechanism."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain graceful degradation in 60 seconds without notes.",
          "page": 61
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing degradation behavior.",
          "page": 61
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 61
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; define detection, mitigation and visible effects.",
          "page": 61
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 61
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 61
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page degradation note.",
          "page": 61
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason coherently about behavior.",
          "page": 61
        }
      ],
      "criteria": [
        "Pass the degradation diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest degraded-service example and retry."
    },
    {
      "id": "blueprint-s7-1",
      "sourceId": "Stage 7 \u2014 1",
      "title": "Consensus and coordination intuition",
      "phaseId": "blueprint-stage-7",
      "role": "checkpoint",
      "pages": [
        63
      ],
      "summary": "Develop requirement-led intuition for agreement and coordination in distributed systems.",
      "action": "State the agreement invariant before choosing a coordination mechanism.",
      "minutes": 45,
      "concepts": [
        "consensus",
        "coordination"
      ],
      "sections": [
        {
          "heading": "Agreement under assumptions",
          "paragraphs": [
            "Apply the common single-service starting frame to consensus and coordination. Identify the resource and failure assumptions, then explain the first limiting behavior under growth."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain consensus and coordination intuition in 60 seconds without notes.",
          "page": 63
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing agreement/coordination.",
          "page": 63
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 63
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 63
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 63
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 63
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page consensus/coordination note.",
          "page": 63
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Mechanism-level reasoning, not algorithm-name recall.",
          "page": 63
        }
      ],
      "criteria": [
        "Pass the consensus diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest agreement example and retry."
    },
    {
      "id": "blueprint-s7-2",
      "sourceId": "Stage 7 \u2014 2",
      "title": "Leader election and failure detection",
      "phaseId": "blueprint-stage-7",
      "role": "checkpoint",
      "pages": [
        64
      ],
      "summary": "Relate leadership and failure-detection mechanisms to a system's correctness and operational assumptions.",
      "action": "Describe the invariant a leader must preserve and how failure is noticed.",
      "minutes": 45,
      "concepts": [
        "leader election",
        "failure detection"
      ],
      "sections": [
        {
          "heading": "Leadership and observation",
          "paragraphs": [
            "Use the shared requirements, resource and failure frame to explain election and detection. Separate the normal leader path from recovery behavior."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain leader election and failure detection in 60 seconds without notes.",
          "page": 64
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing election/detection.",
          "page": 64
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 64
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 64
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 64
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 64
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page election/detection note.",
          "page": 64
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent reasoning beyond mechanism names.",
          "page": 64
        }
      ],
      "criteria": [
        "Pass the election/detection diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest leadership example and retry."
    },
    {
      "id": "blueprint-s7-3",
      "sourceId": "Stage 7 \u2014 3",
      "title": "Advanced partitioning",
      "phaseId": "blueprint-stage-7",
      "role": "checkpoint",
      "pages": [
        65
      ],
      "summary": "Defend partitioning decisions as scale, failure and other constraints become more demanding.",
      "action": "Identify one partitioning invariant and a resource limit.",
      "minutes": 45,
      "concepts": [
        "advanced partitioning",
        "scale",
        "trade-offs"
      ],
      "sections": [
        {
          "heading": "Defend the partition",
          "paragraphs": [
            "Apply the common single-service reasoning frame, then test the partitioning choice under changed constraints and failure. The source does not prescribe a particular algorithm."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain advanced partitioning in 60 seconds without notes.",
          "page": 65
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing this partitioning capability.",
          "page": 65
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 65
        },
        {
          "title": "Failure",
          "task": "Add one failure; state detection, mitigation and visible behavior.",
          "page": 65
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 65
        },
        {
          "title": "Transfer",
          "task": "Transfer the idea to another product with one changed shared constraint.",
          "page": 65
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page advanced-partitioning note.",
          "page": 65
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent resource and invariant reasoning.",
          "page": 65
        }
      ],
      "criteria": [
        "Pass the advanced-partitioning diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest partitioning example and retry."
    },
    {
      "id": "blueprint-s7-4",
      "sourceId": "Stage 7 \u2014 4",
      "title": "Replication topologies",
      "phaseId": "blueprint-stage-7",
      "role": "checkpoint",
      "pages": [
        66
      ],
      "summary": "Connect replication layout to required guarantees, resource constraints and recovery behavior.",
      "action": "Draw one replication layout and state its failure assumption.",
      "minutes": 45,
      "concepts": [
        "replication topologies",
        "replication layout"
      ],
      "sections": [
        {
          "heading": "Topology follows requirements",
          "paragraphs": [
            "Use the common invariant/resource frame to justify a topology before evaluating its behavior at higher traffic or during failure."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain replication topologies in 60 seconds without notes.",
          "page": 66
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing topology reasoning.",
          "page": 66
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 66
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 66
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 66
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product under one changed shared constraint.",
          "page": 66
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page replication-topology note.",
          "page": 66
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason rather than list topology names.",
          "page": 66
        }
      ],
      "criteria": [
        "Pass the topology diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest replication layout and retry."
    },
    {
      "id": "blueprint-s7-5",
      "sourceId": "Stage 7 \u2014 5",
      "title": "Resilience engineering",
      "phaseId": "blueprint-stage-7",
      "role": "checkpoint",
      "pages": [
        67
      ],
      "summary": "Design resilience from explicit failure assumptions and required user-visible behavior.",
      "action": "State one failure assumption and the behavior that must survive it.",
      "minutes": 45,
      "concepts": [
        "resilience engineering",
        "failure assumptions",
        "recovery"
      ],
      "sections": [
        {
          "heading": "Resilience is reasoned behavior",
          "paragraphs": [
            "Use the shared single-service frame to identify the invariant and constrained resource, then distinguish normal operation from recovery and defend the chosen mechanism."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain resilience engineering in 60 seconds without notes.",
          "page": 67
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing resilience reasoning.",
          "page": 67
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 67
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; define detection, mitigation and visible effects.",
          "page": 67
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 67
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 67
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page resilience note.",
          "page": 67
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent failure-to-mechanism reasoning.",
          "page": 67
        }
      ],
      "criteria": [
        "Pass the resilience diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest resilience model and retry in a safe environment."
    },
    {
      "id": "blueprint-s7-6",
      "sourceId": "Stage 7 \u2014 6",
      "title": "Security boundaries and threat modeling",
      "phaseId": "blueprint-stage-7",
      "role": "checkpoint",
      "pages": [
        68
      ],
      "summary": "Reason about security boundaries as requirements and invariants with explicit threat and failure assumptions.",
      "action": "Draw a boundary and state what it must protect.",
      "minutes": 45,
      "concepts": [
        "security boundaries",
        "threat modeling"
      ],
      "sections": [
        {
          "heading": "Protect the invariant",
          "paragraphs": [
            "Apply the common resource, constraint and failure frame to a security boundary. Explain the selected mechanism and recovery behavior rather than relying on security terminology."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain security boundaries and threat modeling in 60 seconds without notes.",
          "page": 68
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing these security boundaries.",
          "page": 68
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 68
        },
        {
          "title": "Failure",
          "task": "Model one failure; specify detection, mitigation and visible effects.",
          "page": 68
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 68
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product under one changed shared constraint.",
          "page": 68
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page security-boundary note.",
          "page": 68
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent reasoning beyond security labels.",
          "page": 68
        }
      ],
      "criteria": [
        "Pass the security-boundary diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest boundary model and retry; do not test unauthorized systems."
    },
    {
      "id": "blueprint-s7-7",
      "sourceId": "Stage 7 \u2014 7",
      "title": "Cost-aware architecture",
      "phaseId": "blueprint-stage-7",
      "role": "checkpoint",
      "pages": [
        69
      ],
      "summary": "Connect resource choices to cost while preserving the system's required behavior.",
      "action": "Identify the scarce resource and cost-sensitive choice in one design.",
      "minutes": 45,
      "concepts": [
        "cost-aware architecture",
        "resource costs",
        "trade-offs"
      ],
      "sections": [
        {
          "heading": "Cost is a design constraint",
          "paragraphs": [
            "Use the shared requirements-to-mechanism frame to compare a simple adequate design with an alternative under growth and failure. No workload price estimate is supplied by this page."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain cost-aware architecture in 60 seconds without notes.",
          "page": 69
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing cost-aware reasoning.",
          "page": 69
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 69
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible behavior.",
          "page": 69
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 69
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 69
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page cost-aware note.",
          "page": 69
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Reason from resource and correctness constraints.",
          "page": 69
        }
      ],
      "criteria": [
        "Pass the cost diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest cost-sensitive design and retry."
    },
    {
      "id": "blueprint-s8-1",
      "sourceId": "Stage 8 \u2014 1",
      "title": "Design a chat system",
      "phaseId": "blueprint-stage-8",
      "role": "checkpoint",
      "pages": [
        71
      ],
      "summary": "Practice the full architecture reasoning chain for a chat product.",
      "action": "State a chat requirement and draw the smallest service design.",
      "minutes": 45,
      "concepts": [
        "chat system",
        "case-study reasoning"
      ],
      "sections": [
        {
          "heading": "Chat as a reasoning exercise",
          "paragraphs": [
            "Apply the common requirements, traffic, invariant and failure frame to chat. This numbered topic supplies generic design drills, not a prebuilt chat architecture."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a chat-system design in 60 seconds without notes.",
          "page": 71
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest chat system.",
          "page": 71
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 71
        },
        {
          "title": "Failure",
          "task": "Add one failure; define detection, mitigation and visible behavior.",
          "page": 71
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 71
        },
        {
          "title": "Transfer",
          "task": "Use the underlying idea in another product with one changed shared constraint.",
          "page": 71
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page chat design note.",
          "page": 71
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason coherently beyond component names.",
          "page": 71
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest chat example and retry."
    },
    {
      "id": "blueprint-s8-2",
      "sourceId": "Stage 8 \u2014 2",
      "title": "Design a large file/media pipeline",
      "phaseId": "blueprint-stage-8",
      "role": "checkpoint",
      "pages": [
        72
      ],
      "summary": "Apply complete design reasoning to a large-file or media workload.",
      "action": "Name the workload constraint and draw the simplest media flow.",
      "minutes": 45,
      "concepts": [
        "large files",
        "media pipeline"
      ],
      "sections": [
        {
          "heading": "Media under constraints",
          "paragraphs": [
            "Use the shared single-service starting frame to identify the invariant, constrained resource and recovery behavior before adding scale mechanisms."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a large-file/media pipeline in 60 seconds without notes.",
          "page": 72
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system for this media flow.",
          "page": 72
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 72
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 72
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 72
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 72
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page media-pipeline note.",
          "page": 72
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent mechanism reasoning.",
          "page": 72
        }
      ],
      "criteria": [
        "Pass the media-pipeline diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest media pipeline and retry."
    },
    {
      "id": "blueprint-s8-3",
      "sourceId": "Stage 8 \u2014 3",
      "title": "Design a high-volume telemetry platform",
      "phaseId": "blueprint-stage-8",
      "role": "checkpoint",
      "pages": [
        73
      ],
      "summary": "Apply the full reasoning chain to telemetry with explicit demand and failure assumptions.",
      "action": "State a telemetry requirement and its expected traffic shape.",
      "minutes": 45,
      "concepts": [
        "high-volume telemetry",
        "platform design"
      ],
      "sections": [
        {
          "heading": "Telemetry from requirements",
          "paragraphs": [
            "Use the common single-service frame and identify what fails first under growth. The later Telemetry Platform case supplies a distinct concrete scenario."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a high-volume telemetry platform in 60 seconds without notes.",
          "page": 73
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest telemetry platform.",
          "page": 73
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 73
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 73
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 73
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product under one changed shared constraint.",
          "page": 73
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page telemetry design note.",
          "page": 73
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason rather than name products.",
          "page": 73
        }
      ],
      "criteria": [
        "Pass the telemetry diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest telemetry design and retry."
    },
    {
      "id": "blueprint-s8-4",
      "sourceId": "Stage 8 \u2014 4",
      "title": "Design a commerce/order platform",
      "phaseId": "blueprint-stage-8",
      "role": "checkpoint",
      "pages": [
        74
      ],
      "summary": "Frame a commerce platform through requirements, correctness, constraints and recovery.",
      "action": "State one order invariant and draw a minimal commerce path.",
      "minutes": 45,
      "concepts": [
        "commerce platform",
        "order platform"
      ],
      "sections": [
        {
          "heading": "Business correctness first",
          "paragraphs": [
            "Apply the shared single-service reasoning frame to commerce before expanding components. Distinguish required behavior from recovery and identify the first resource limit."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a commerce/order platform in 60 seconds without notes.",
          "page": 74
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest commerce/order system.",
          "page": 74
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 74
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; state detection, mitigation and visible effects.",
          "page": 74
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 74
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 74
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page commerce/order note.",
          "page": 74
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent requirement-to-mechanism reasoning.",
          "page": 74
        }
      ],
      "criteria": [
        "Pass the commerce diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest commerce example and retry."
    },
    {
      "id": "blueprint-s8-5",
      "sourceId": "Stage 8 \u2014 5",
      "title": "Design a collaborative application",
      "phaseId": "blueprint-stage-8",
      "role": "checkpoint",
      "pages": [
        75
      ],
      "summary": "Reason through a collaborative product's requirements, invariants and failure assumptions.",
      "action": "State what correct shared behavior means for one collaboration task.",
      "minutes": 45,
      "concepts": [
        "collaborative application",
        "shared behavior"
      ],
      "sections": [
        {
          "heading": "Define correctness",
          "paragraphs": [
            "Use the shared single-service frame to choose the simplest mechanism satisfying the collaboration requirement. The later standalone case adds specific synchronization variations."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a collaborative application in 60 seconds without notes.",
          "page": 75
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest collaborative system.",
          "page": 75
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 75
        },
        {
          "title": "Failure",
          "task": "Add one failure; define detection, mitigation and visible behavior.",
          "page": 75
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 75
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 75
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page collaboration note.",
          "page": 75
        },
        {
          "title": "Diagnostic",
          "task": "Explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent reasoning beyond component recall.",
          "page": 75
        }
      ],
      "criteria": [
        "Pass the collaboration diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest collaborative example and retry."
    },
    {
      "id": "blueprint-s8-6",
      "sourceId": "Stage 8 \u2014 6",
      "title": "Design a multi-tenant SaaS backend",
      "phaseId": "blueprint-stage-8",
      "role": "checkpoint",
      "pages": [
        76
      ],
      "summary": "Apply full architecture reasoning to a backend serving multiple tenants.",
      "action": "State a tenant invariant and draw the smallest SaaS backend.",
      "minutes": 45,
      "concepts": [
        "multi-tenant SaaS",
        "backend",
        "tenant isolation"
      ],
      "sections": [
        {
          "heading": "Tenant constraints",
          "paragraphs": [
            "Apply the common requirements, resource, traffic and failure frame to the SaaS design. The later standalone case provides concrete noisy-neighbor and isolation scenarios."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a multi-tenant SaaS backend in 60 seconds without notes.",
          "page": 76
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest multi-tenant backend.",
          "page": 76
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 76
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 76
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 76
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 76
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page SaaS note.",
          "page": 76
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent invariant-led reasoning.",
          "page": 76
        }
      ],
      "criteria": [
        "Pass the SaaS diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest multi-tenant example and retry."
    },
    {
      "id": "blueprint-s8-7",
      "sourceId": "Stage 8 \u2014 7",
      "title": "Design an AI-enabled application",
      "phaseId": "blueprint-stage-8",
      "role": "checkpoint",
      "pages": [
        77
      ],
      "summary": "Apply system-level requirements and failure reasoning to an AI-enabled product.",
      "action": "State the AI component's required role in a minimal application.",
      "minutes": 45,
      "concepts": [
        "AI-enabled application",
        "architecture reasoning"
      ],
      "sections": [
        {
          "heading": "A system, not only a model",
          "paragraphs": [
            "Use the common single-service starting frame and name the correctness and failure assumptions. Later AI case and extension pages deepen the model-specific concerns."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain an AI-enabled application in 60 seconds without notes.",
          "page": 77
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest AI-enabled application.",
          "page": 77
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 77
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 77
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 77
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 77
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page AI-application note.",
          "page": 77
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason beyond model or component names.",
          "page": 77
        }
      ],
      "criteria": [
        "Pass the AI-application diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest application model and retry."
    },
    {
      "id": "blueprint-s9-1",
      "sourceId": "Stage 9 \u2014 1",
      "title": "Architecture Decision Records",
      "phaseId": "blueprint-stage-9",
      "role": "checkpoint",
      "pages": [
        79
      ],
      "summary": "Record and defend decisions under competing constraints so their reasoning remains inspectable.",
      "action": "Write one decision with its problem and rejected alternative.",
      "minutes": 40,
      "concepts": [
        "Architecture Decision Records",
        "ADR",
        "decision rationale"
      ],
      "sections": [
        {
          "heading": "Record the why",
          "paragraphs": [
            "Use the shared single-service frame to connect requirements, invariant, mechanism and consequences. Later ADR practice adds reversal conditions and explicit record fields."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain Architecture Decision Records in 60 seconds without notes.",
          "page": 79
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system requiring a decision record.",
          "page": 79
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 79
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 79
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 79
        },
        {
          "title": "Transfer",
          "task": "Apply the idea in another product with one changed shared constraint.",
          "page": 79
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page ADR-topic note.",
          "page": 79
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent decision reasoning.",
          "page": 79
        }
      ],
      "criteria": [
        "Pass the ADR diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest decision record and retry."
    },
    {
      "id": "blueprint-s9-2",
      "sourceId": "Stage 9 \u2014 2",
      "title": "Requirement conflicts",
      "phaseId": "blueprint-stage-9",
      "role": "checkpoint",
      "pages": [
        80
      ],
      "summary": "Expose conflicts between requirements and defend a mechanism under competing constraints.",
      "action": "Write two competing requirements and the invariant neither may violate.",
      "minutes": 40,
      "concepts": [
        "requirement conflicts",
        "competing constraints"
      ],
      "sections": [
        {
          "heading": "Make conflicts explicit",
          "paragraphs": [
            "Apply the common requirement, resource and failure frame rather than hiding incompatible expectations behind a component choice."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain requirement conflicts in 60 seconds without notes.",
          "page": 80
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system where requirements conflict.",
          "page": 80
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 80
        },
        {
          "title": "Failure",
          "task": "Add one failure; define detection, mitigation and visible behavior.",
          "page": 80
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 80
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product under one changed shared constraint.",
          "page": 80
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page requirement-conflict note.",
          "page": 80
        },
        {
          "title": "Diagnostic",
          "task": "Explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason coherently about constraints.",
          "page": 80
        }
      ],
      "criteria": [
        "Pass the conflict diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest conflicting-requirements example and retry."
    },
    {
      "id": "blueprint-s9-3",
      "sourceId": "Stage 9 \u2014 3",
      "title": "Consistency vs availability",
      "phaseId": "blueprint-stage-9",
      "role": "checkpoint",
      "pages": [
        81
      ],
      "summary": "Defend consistency and availability choices in the context of a specific invariant and failure model.",
      "action": "State a business invariant and the failure assumption affecting availability.",
      "minutes": 45,
      "concepts": [
        "consistency",
        "availability",
        "trade-offs"
      ],
      "sections": [
        {
          "heading": "Tie guarantees to the scenario",
          "paragraphs": [
            "Use the shared single-service frame to explain the desired behavior and resource constraints. Compare mechanisms rather than presenting a slogan as the design."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain consistency versus availability in 60 seconds without notes.",
          "page": 81
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system where this trade-off matters.",
          "page": 81
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 81
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 81
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 81
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 81
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page consistency/availability note.",
          "page": 81
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent guarantee reasoning.",
          "page": 81
        }
      ],
      "criteria": [
        "Pass the guarantee-trade-off diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest guarantee example and retry."
    },
    {
      "id": "blueprint-s9-4",
      "sourceId": "Stage 9 \u2014 4",
      "title": "Latency vs cost",
      "phaseId": "blueprint-stage-9",
      "role": "checkpoint",
      "pages": [
        82
      ],
      "summary": "Compare latency and cost choices while preserving required correctness.",
      "action": "Name a latency target and the resource cost of meeting it.",
      "minutes": 40,
      "concepts": [
        "latency",
        "cost",
        "trade-offs"
      ],
      "sections": [
        {
          "heading": "Defend the balance",
          "paragraphs": [
            "Apply the common traffic, invariant, resource and failure frame. The source does not provide a numerical target or price to assume."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain latency versus cost in 60 seconds without notes.",
          "page": 82
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system requiring this trade-off.",
          "page": 82
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 82
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 82
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 82
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 82
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page latency/cost note.",
          "page": 82
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent constraint-led reasoning.",
          "page": 82
        }
      ],
      "criteria": [
        "Pass the latency/cost diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest latency/cost example and retry."
    },
    {
      "id": "blueprint-s9-5",
      "sourceId": "Stage 9 \u2014 5",
      "title": "Build vs buy",
      "phaseId": "blueprint-stage-9",
      "role": "checkpoint",
      "pages": [
        83
      ],
      "summary": "Defend building or adopting a capability based on requirements and operational consequences.",
      "action": "State the requirement before comparing a built and acquired solution.",
      "minutes": 40,
      "concepts": [
        "build vs buy",
        "alternatives",
        "operational constraints"
      ],
      "sections": [
        {
          "heading": "A requirement-led choice",
          "paragraphs": [
            "Use the common resource/invariant frame to compare mechanisms, including growth and failure. The source does not endorse a vendor or purchase."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain build versus buy in 60 seconds without notes.",
          "page": 83
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system requiring this decision.",
          "page": 83
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 83
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; specify detection, mitigation and visible effects.",
          "page": 83
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 83
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product under one changed shared constraint.",
          "page": 83
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page build/buy note.",
          "page": 83
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Reason rather than cite product popularity.",
          "page": 83
        }
      ],
      "criteria": [
        "Pass the build/buy diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest decision example and retry."
    },
    {
      "id": "blueprint-s9-6",
      "sourceId": "Stage 9 \u2014 6",
      "title": "Monolith vs microservices",
      "phaseId": "blueprint-stage-9",
      "role": "checkpoint",
      "pages": [
        84
      ],
      "summary": "Compare architectural decomposition choices under real constraints instead of choosing by fashion.",
      "action": "State the problem a service split would solve.",
      "minutes": 45,
      "concepts": [
        "monolith",
        "microservices",
        "service decomposition"
      ],
      "sections": [
        {
          "heading": "Decomposition must earn its cost",
          "paragraphs": [
            "Use the shared single-service starting frame and justify a different mechanism only from requirements, resource limits, failure assumptions and observable behavior."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain monolith versus microservices in 60 seconds without notes.",
          "page": 84
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system where this choice matters.",
          "page": 84
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 84
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 84
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 84
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 84
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page decomposition note.",
          "page": 84
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent mechanism reasoning rather than architecture labels.",
          "page": 84
        }
      ],
      "criteria": [
        "Pass the decomposition diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest service-boundary example and retry."
    },
    {
      "id": "blueprint-s9-7",
      "sourceId": "Stage 9 \u2014 7",
      "title": "Operational complexity vs team autonomy",
      "phaseId": "blueprint-stage-9",
      "role": "checkpoint",
      "pages": [
        85
      ],
      "summary": "Defend team-facing architecture choices with their operational burden made explicit.",
      "action": "Name an autonomy benefit and the operational complexity it introduces.",
      "minutes": 40,
      "concepts": [
        "operational complexity",
        "team autonomy",
        "operator attention"
      ],
      "sections": [
        {
          "heading": "People operate the design",
          "paragraphs": [
            "Apply the common frame, including operator attention as a scarce resource. Relate requirements and failure recovery to the chosen organizational/technical boundary."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain operational complexity versus autonomy in 60 seconds without notes.",
          "page": 85
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system where this trade-off matters.",
          "page": 85
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 85
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 85
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 85
        },
        {
          "title": "Transfer",
          "task": "Apply the idea in another product with one changed shared constraint.",
          "page": 85
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page complexity/autonomy note.",
          "page": 85
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent operational reasoning.",
          "page": 85
        }
      ],
      "criteria": [
        "Pass the complexity/autonomy diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest ownership/boundary example and retry."
    },
    {
      "id": "blueprint-s10-1",
      "sourceId": "Stage 10 \u2014 1",
      "title": "Architecture communication",
      "phaseId": "blueprint-stage-10",
      "role": "checkpoint",
      "pages": [
        87
      ],
      "summary": "Communicate architecture through clear requirements, mechanisms, failure behavior and decisions.",
      "action": "Explain one small design's purpose and trade-off aloud.",
      "minutes": 40,
      "concepts": [
        "architecture communication",
        "professional evidence"
      ],
      "sections": [
        {
          "heading": "Explain what matters",
          "paragraphs": [
            "Use the shared frame to make assumptions, invariants and operational consequences legible to another engineer. The source's generic system drills remain part of this communication topic."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain architecture communication in 60 seconds without notes.",
          "page": 87
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing this communication capability.",
          "page": 87
        },
        {
          "title": "Scale",
          "task": "Modify the design for 10\u00d7 traffic.",
          "page": 87
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 87
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 87
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product under one changed shared constraint.",
          "page": 87
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page architecture-communication note.",
          "page": 87
        },
        {
          "title": "Diagnostic",
          "task": "Explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent reasoning, not terminology recall.",
          "page": 87
        }
      ],
      "criteria": [
        "Pass the communication diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest design explanation and retry."
    },
    {
      "id": "blueprint-s10-2",
      "sourceId": "Stage 10 \u2014 2",
      "title": "Design interview opening and requirements",
      "phaseId": "blueprint-stage-10",
      "role": "checkpoint",
      "pages": [
        88
      ],
      "summary": "Open a design discussion by exposing requirements and assumptions before mechanisms.",
      "action": "State a prompt's requirement, constraint and unresolved assumption.",
      "minutes": 40,
      "concepts": [
        "design interview",
        "opening",
        "requirements",
        "assumptions"
      ],
      "sections": [
        {
          "heading": "Start with the problem",
          "paragraphs": [
            "Use the common single-service reasoning frame to establish traffic, correctness and failure assumptions. A confident component list is not evidence of an effective opening."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain interview opening/requirements in 60 seconds without notes.",
          "page": 88
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed for this opening exercise.",
          "page": 88
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 88
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; specify detection, mitigation and visible effects.",
          "page": 88
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 88
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 88
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page requirements/opening note.",
          "page": 88
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Reason from assumptions and requirements.",
          "page": 88
        }
      ],
      "criteria": [
        "Pass the opening/requirements diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest requirements-led example and retry."
    },
    {
      "id": "blueprint-s10-3",
      "sourceId": "Stage 10 \u2014 3",
      "title": "Deep dives and bottleneck defense",
      "phaseId": "blueprint-stage-10",
      "role": "checkpoint",
      "pages": [
        89
      ],
      "summary": "Defend a focused architecture deep dive with explicit bottleneck and mechanism reasoning.",
      "action": "Choose one likely bottleneck and explain the evidence needed to validate it.",
      "minutes": 45,
      "concepts": [
        "deep dive",
        "bottleneck defense"
      ],
      "sections": [
        {
          "heading": "Depth follows the limit",
          "paragraphs": [
            "Apply the shared resource/invariant frame to a bottleneck, including its observable signal and behavior at 10\u00d7 demand, before defending an improvement."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain deep dives and bottleneck defense in 60 seconds without notes.",
          "page": 89
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing this deep dive.",
          "page": 89
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 89
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 89
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 89
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 89
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page bottleneck-defense note.",
          "page": 89
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent bottleneck reasoning.",
          "page": 89
        }
      ],
      "criteria": [
        "Pass the deep-dive diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest bottleneck example and retry."
    },
    {
      "id": "blueprint-s10-4",
      "sourceId": "Stage 10 \u2014 4",
      "title": "Operational readiness review",
      "phaseId": "blueprint-stage-10",
      "role": "checkpoint",
      "pages": [
        90
      ],
      "summary": "Review whether a design's assumptions, signals and recovery behavior are sufficiently explicit.",
      "action": "Identify a failure assumption and the signal that would reveal it.",
      "minutes": 45,
      "concepts": [
        "operational readiness",
        "review",
        "failure behavior",
        "observability"
      ],
      "sections": [
        {
          "heading": "Review operation, not only construction",
          "paragraphs": [
            "Use the common single-service frame to connect requirements and mechanisms to detection, mitigation and visible behavior. A review artifact is not authorization to deploy."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain operational readiness review in 60 seconds without notes.",
          "page": 90
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing a readiness review.",
          "page": 90
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 90
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 90
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 90
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product under one changed shared constraint.",
          "page": 90
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page readiness note.",
          "page": 90
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent operational reasoning.",
          "page": 90
        }
      ],
      "criteria": [
        "Pass the readiness diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest operational scenario and retry."
    },
    {
      "id": "blueprint-s10-5",
      "sourceId": "Stage 10 \u2014 5",
      "title": "Technical writing",
      "phaseId": "blueprint-stage-10",
      "role": "checkpoint",
      "pages": [
        91
      ],
      "summary": "Turn architecture reasoning into a concise, inspectable written artifact.",
      "action": "Write a short explanation of one mechanism and its failure assumption.",
      "minutes": 40,
      "concepts": [
        "technical writing",
        "design notes"
      ],
      "sections": [
        {
          "heading": "Write reasoning, not labels",
          "paragraphs": [
            "Use the common requirements-to-mechanism frame and professional note structure. The later standalone writing exercise supplies a one-page teaching-note format."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain technical writing in 60 seconds without notes.",
          "page": 91
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing this writing capability.",
          "page": 91
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 91
        },
        {
          "title": "Failure",
          "task": "Add one failure; specify detection, mitigation and visible behavior.",
          "page": 91
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 91
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 91
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page technical-writing topic note.",
          "page": 91
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent reasoning beyond writing terminology.",
          "page": 91
        }
      ],
      "criteria": [
        "Pass the writing diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest written mechanism explanation and retry."
    },
    {
      "id": "blueprint-s10-6",
      "sourceId": "Stage 10 \u2014 6",
      "title": "Design review and critique",
      "phaseId": "blueprint-stage-10",
      "role": "checkpoint",
      "pages": [
        92
      ],
      "summary": "Critique a design through requirements and failure consequences instead of stylistic preference.",
      "action": "Restate a design's requirement before identifying one concern.",
      "minutes": 40,
      "concepts": [
        "design review",
        "critique"
      ],
      "sections": [
        {
          "heading": "Review with a reason",
          "paragraphs": [
            "Apply the shared invariant/resource frame to a design's choices and alternatives. Connect each critique to a constraint or failure assumption."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain design review and critique in 60 seconds without notes.",
          "page": 92
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needing review.",
          "page": 92
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 92
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 92
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 92
        },
        {
          "title": "Transfer",
          "task": "Apply the idea in another product with one changed shared constraint.",
          "page": 92
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page review/critique note.",
          "page": 92
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent critique grounded in requirements.",
          "page": 92
        }
      ],
      "criteria": [
        "Pass the review diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest design-review example and retry."
    },
    {
      "id": "blueprint-s10-7",
      "sourceId": "Stage 10 \u2014 7",
      "title": "Mentoring through architecture",
      "phaseId": "blueprint-stage-10",
      "role": "checkpoint",
      "pages": [
        93
      ],
      "summary": "Help another engineer develop architecture reasoning instead of merely receiving a fix.",
      "action": "Ask what invariant and resource a proposed mechanism addresses.",
      "minutes": 40,
      "concepts": [
        "mentoring",
        "technical influence",
        "architecture reasoning"
      ],
      "sections": [
        {
          "heading": "Teach the reasoning process",
          "paragraphs": [
            "Use the shared requirements, invariant, resource and failure frame to make a mechanism explainable. Later mentoring practice gives specific coaching questions."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain architecture mentoring in 60 seconds without notes.",
          "page": 93
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing this mentoring capability.",
          "page": 93
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 93
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 93
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 93
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product under one changed shared constraint.",
          "page": 93
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page mentoring-through-architecture note.",
          "page": 93
        },
        {
          "title": "Diagnostic",
          "task": "Explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent mechanism-level teaching.",
          "page": 93
        }
      ],
      "criteria": [
        "Pass the mentoring diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest teaching example and retry."
    },
    {
      "id": "blueprint-s11-1",
      "sourceId": "Stage 11 \u2014 1",
      "title": "Explanation-without-notes diagnostic",
      "phaseId": "blueprint-stage-11",
      "role": "checkpoint",
      "pages": [
        95
      ],
      "summary": "Assess whether explanation comes from usable reasoning rather than reference familiarity.",
      "action": "Explain one mechanism without opening its notes.",
      "minutes": 35,
      "concepts": [
        "explanation without notes",
        "diagnostics"
      ],
      "sections": [
        {
          "heading": "Test the explanation capability",
          "paragraphs": [
            "This numbered topic retains the shared design-practice frame. It is distinct from Diagnostic 1's concrete three-minute assessment on page 118."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain the no-notes diagnostic in 60 seconds without notes.",
          "page": 95
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed to exercise this capability.",
          "page": 95
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 95
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible behavior.",
          "page": 95
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 95
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 95
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page note for this explanation capability.",
          "page": 95
        },
        {
          "title": "Local diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent reasoning rather than vocabulary recall.",
          "page": 95
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest explanation example and retry without restarting."
    },
    {
      "id": "blueprint-s11-2",
      "sourceId": "Stage 11 \u2014 2",
      "title": "Reproduction diagnostic",
      "phaseId": "blueprint-stage-11",
      "role": "checkpoint",
      "pages": [
        96
      ],
      "summary": "Assess whether a basic architecture example can be reproduced rather than merely recognized.",
      "action": "Reproduce the smallest example of one learned mechanism.",
      "minutes": 35,
      "concepts": [
        "reproduction",
        "diagnostics"
      ],
      "sections": [
        {
          "heading": "Evidence through reproduction",
          "paragraphs": [
            "Apply the shared invariant/resource and single-service frame. The later three-tier drawing assessment is a separate concrete practice entry."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain reproduction diagnostics in 60 seconds without notes.",
          "page": 96
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed for this reproduction capability.",
          "page": 96
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 96
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible effects.",
          "page": 96
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 96
        },
        {
          "title": "Transfer",
          "task": "Apply the idea in another product with one changed shared constraint.",
          "page": 96
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page reproduction-topic note.",
          "page": 96
        },
        {
          "title": "Local diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent mechanism reasoning.",
          "page": 96
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest example and retry the assessment."
    },
    {
      "id": "blueprint-s11-3",
      "sourceId": "Stage 11 \u2014 3",
      "title": "Modification diagnostic",
      "phaseId": "blueprint-stage-11",
      "role": "checkpoint",
      "pages": [
        97
      ],
      "summary": "Measure whether a known design can be changed while preserving its invariant.",
      "action": "Choose one constraint to change in a small known design.",
      "minutes": 35,
      "concepts": [
        "modification",
        "diagnostics",
        "invariants"
      ],
      "sections": [
        {
          "heading": "Change reveals understanding",
          "paragraphs": [
            "Use the common single-service frame to expose mechanism reasoning, failure behavior and growth limits. The later URL-shortener assessment remains distinct."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain modification diagnostics in 60 seconds without notes.",
          "page": 97
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed for this modification capability.",
          "page": 97
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 97
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; define detection, mitigation and visible behavior.",
          "page": 97
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 97
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 97
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page modification-topic note.",
          "page": 97
        },
        {
          "title": "Local diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Reason coherently rather than reproduce labels.",
          "page": 97
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest design, modify it once and retry."
    },
    {
      "id": "blueprint-s11-4",
      "sourceId": "Stage 11 \u2014 4",
      "title": "Transfer diagnostic",
      "phaseId": "blueprint-stage-11",
      "role": "checkpoint",
      "pages": [
        98
      ],
      "summary": "Assess whether an architectural idea survives a changed product context.",
      "action": "Apply one familiar mechanism to a different product requirement.",
      "minutes": 35,
      "concepts": [
        "transfer",
        "diagnostics",
        "new context"
      ],
      "sections": [
        {
          "heading": "Recognize beyond wording",
          "paragraphs": [
            "Apply the shared invariant/resource frame in a new setting. Preserve the separate later caching-to-permissions/configuration diagnostic rather than merging its exercise."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain transfer diagnostics in 60 seconds without notes.",
          "page": 98
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needed for this transfer capability.",
          "page": 98
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 98
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible effects.",
          "page": 98
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 98
        },
        {
          "title": "Transfer practice",
          "task": "Use the idea in another product under one changed shared constraint.",
          "page": 98
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page transfer-topic note.",
          "page": 98
        },
        {
          "title": "Local diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent reasoning beyond familiar wording.",
          "page": 98
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest example, change its context and retry."
    },
    {
      "id": "blueprint-s11-5",
      "sourceId": "Stage 11 \u2014 5",
      "title": "Failure reasoning diagnostic",
      "phaseId": "blueprint-stage-11",
      "role": "checkpoint",
      "pages": [
        99
      ],
      "summary": "Measure whether failure assumptions, signals and recovery can be explained coherently.",
      "action": "State one failure hypothesis and the next useful observation.",
      "minutes": 35,
      "concepts": [
        "failure reasoning",
        "diagnostics",
        "detection",
        "mitigation"
      ],
      "sections": [
        {
          "heading": "Measure the reasoning",
          "paragraphs": [
            "Use the shared single-service frame and distinguish normal operation from recovery. The later healthy-CPU/slow-queue diagnostic supplies an additional concrete scenario."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain failure reasoning diagnostics in 60 seconds without notes.",
          "page": 99
        },
        {
          "title": "Smallest system",
          "task": "Draw a minimal system needing this assessment.",
          "page": 99
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 99
        },
        {
          "title": "Failure",
          "task": "Introduce one failure; specify detection, mitigation and visible behavior.",
          "page": 99
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 99
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 99
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page failure-reasoning note.",
          "page": 99
        },
        {
          "title": "Local diagnostic",
          "task": "Explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent failure reasoning, not component recall.",
          "page": 99
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest failure example and retry."
    },
    {
      "id": "blueprint-s11-6",
      "sourceId": "Stage 11 \u2014 6",
      "title": "Trade-off defense diagnostic",
      "phaseId": "blueprint-stage-11",
      "role": "checkpoint",
      "pages": [
        100
      ],
      "summary": "Assess whether a decision can be defended against an alternative using actual constraints.",
      "action": "State one chosen and one rejected mechanism with their reasons.",
      "minutes": 35,
      "concepts": [
        "trade-off defense",
        "diagnostics",
        "alternatives"
      ],
      "sections": [
        {
          "heading": "Defend a decision",
          "paragraphs": [
            "Use the common requirements, invariant, resource and failure frame. This Stage 11 topic is not the same numbering as standalone Diagnostic 7."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain trade-off defense diagnostics in 60 seconds without notes.",
          "page": 100
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed for this defense.",
          "page": 100
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 100
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible effects.",
          "page": 100
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 100
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 100
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page trade-off-defense note.",
          "page": 100
        },
        {
          "title": "Local diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent constraint-based defense.",
          "page": 100
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest decision example and retry its defense."
    },
    {
      "id": "blueprint-s11-7",
      "sourceId": "Stage 11 \u2014 7",
      "title": "Full architecture assessment",
      "phaseId": "blueprint-stage-11",
      "role": "checkpoint",
      "pages": [
        101
      ],
      "summary": "Assess the complete requirement-to-design-to-failure reasoning chain.",
      "action": "Frame a small architecture problem with requirements and assumptions.",
      "minutes": 45,
      "concepts": [
        "full architecture assessment",
        "diagnostics"
      ],
      "sections": [
        {
          "heading": "Integrate the capabilities",
          "paragraphs": [
            "Apply the full shared single-service reasoning frame and professional bridge. The later 30\u201345-minute notification-platform assessment remains a distinct exercise."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a full architecture assessment in 60 seconds without notes.",
          "page": 101
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed for the assessment.",
          "page": 101
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 101
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible behavior.",
          "page": 101
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 101
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product under one changed shared constraint.",
          "page": 101
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page architecture-assessment note.",
          "page": 101
        },
        {
          "title": "Local diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent integrated reasoning, not a template recital.",
          "page": 101
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest complete design and retry the weak capability."
    },
    {
      "id": "blueprint-s12-1",
      "sourceId": "Stage 12 \u2014 1",
      "title": "Capstone architecture",
      "phaseId": "blueprint-stage-12",
      "role": "checkpoint",
      "pages": [
        103
      ],
      "summary": "Demonstrate durable architectural reasoning through a capstone design.",
      "action": "State the problem and invariant of one capstone-sized design.",
      "minutes": 45,
      "concepts": [
        "capstone architecture",
        "mastery",
        "retention"
      ],
      "sections": [
        {
          "heading": "Demonstrate the design capability",
          "paragraphs": [
            "Use the common single-service frame to show requirements, mechanism, scale and failure reasoning. The later eight capstones are separate browsable challenges, not eight implied prerequisites here."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain capstone architecture in 60 seconds without notes.",
          "page": 103
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system demonstrating capstone architecture.",
          "page": 103
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 103
        },
        {
          "title": "Failure",
          "task": "Add one failure; define detection, mitigation and visible effects.",
          "page": 103
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 103
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 103
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page capstone-architecture note.",
          "page": 103
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent mechanism reasoning.",
          "page": 103
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest capstone design and retry."
    },
    {
      "id": "blueprint-s12-2",
      "sourceId": "Stage 12 \u2014 2",
      "title": "Capstone implementation slice",
      "phaseId": "blueprint-stage-12",
      "role": "checkpoint",
      "pages": [
        104
      ],
      "summary": "Connect architecture to a small implementation slice with inspectable behavior.",
      "action": "Choose the smallest slice that exposes an architectural decision.",
      "minutes": 45,
      "concepts": [
        "capstone implementation",
        "implementation slice"
      ],
      "sections": [
        {
          "heading": "Small code, explicit reasoning",
          "paragraphs": [
            "Use the shared invariant/resource frame to connect a slice to its requirement and failure assumptions. Evidence is actual reproduction and modification, not a plan to implement."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a capstone implementation slice in 60 seconds without notes.",
          "page": 104
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed for this implementation slice.",
          "page": 104
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 104
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible behavior.",
          "page": 104
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 104
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 104
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page implementation-slice note.",
          "page": 104
        },
        {
          "title": "Diagnostic",
          "task": "Explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent implementation-to-architecture reasoning.",
          "page": 104
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest implementation example and retry."
    },
    {
      "id": "blueprint-s12-3",
      "sourceId": "Stage 12 \u2014 3",
      "title": "Failure injection and recovery",
      "phaseId": "blueprint-stage-12",
      "role": "checkpoint",
      "pages": [
        105
      ],
      "summary": "Demonstrate understanding of failures and recovery through bounded, authorized experiments or models.",
      "action": "Write an expected failure, observation and recovery sequence before testing.",
      "minutes": 45,
      "concepts": [
        "failure injection",
        "recovery",
        "detection",
        "mitigation"
      ],
      "sections": [
        {
          "heading": "Expected versus observed behavior",
          "paragraphs": [
            "Apply the common requirements, invariant and failure frame. Disruptive experiments are limited to authorized sandbox scope with recovery available; a curriculum prompt is not production authorization."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain failure injection and recovery in 60 seconds without notes.",
          "page": 105
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed for this capability.",
          "page": 105
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 105
        },
        {
          "title": "Failure",
          "task": "Model or safely introduce one failure; define detection, mitigation and visible effects.",
          "page": 105
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 105
        },
        {
          "title": "Transfer",
          "task": "Apply the idea in another product under one changed shared constraint.",
          "page": 105
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page failure-injection/recovery note.",
          "page": 105
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent failure reasoning.",
          "page": 105
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Return to the smallest safe failure model and retry, without a roadmap reset."
    },
    {
      "id": "blueprint-s12-4",
      "sourceId": "Stage 12 \u2014 4",
      "title": "Architecture review panel",
      "phaseId": "blueprint-stage-12",
      "role": "checkpoint",
      "pages": [
        106
      ],
      "summary": "Defend a design in a professional review setting using explicit assumptions and consequences.",
      "action": "Present a small design and one rejected alternative.",
      "minutes": 45,
      "concepts": [
        "architecture review panel",
        "trade-off defense"
      ],
      "sections": [
        {
          "heading": "Evidence under challenge",
          "paragraphs": [
            "Use the common single-service frame to make reasoning inspectable to reviewers, including scale, failure and observable signals."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain an architecture review panel in 60 seconds without notes.",
          "page": 106
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed for the panel exercise.",
          "page": 106
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 106
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 106
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 106
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product with one changed shared constraint.",
          "page": 106
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page review-panel note.",
          "page": 106
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent review-quality reasoning.",
          "page": 106
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest reviewed design and retry its defense."
    },
    {
      "id": "blueprint-s12-5",
      "sourceId": "Stage 12 \u2014 5",
      "title": "Portfolio evidence package",
      "phaseId": "blueprint-stage-12",
      "role": "checkpoint",
      "pages": [
        107
      ],
      "summary": "Package actual architecture evidence clearly without turning plans into achievements.",
      "action": "Choose one existing artifact and state what it actually demonstrates.",
      "minutes": 40,
      "concepts": [
        "portfolio evidence",
        "evidence package",
        "professional application"
      ],
      "sections": [
        {
          "heading": "Show, explain and sanitize",
          "paragraphs": [
            "Apply the common design-note and evidence standards to an inspectable package. Keep personal, employer and confidential details out of public material and do not fabricate completed work."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain a portfolio evidence package in 60 seconds without notes.",
          "page": 107
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed to demonstrate this capability.",
          "page": 107
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 107
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 107
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 107
        },
        {
          "title": "Transfer",
          "task": "Apply the idea to another product with one changed shared constraint.",
          "page": 107
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page portfolio-evidence note.",
          "page": 107
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, diagnose failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent reasoning backed by actual evidence.",
          "page": 107
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard; public evidence must be sanitized."
      ],
      "recovery": "Reproduce the smallest artifact and correct unsupported claims before retrying."
    },
    {
      "id": "blueprint-s12-6",
      "sourceId": "Stage 12 \u2014 6",
      "title": "Long-term review cadence",
      "phaseId": "blueprint-stage-12",
      "role": "checkpoint",
      "pages": [
        108
      ],
      "summary": "Maintain architectural reasoning after gaps with recurring retrieval and evidence.",
      "action": "Recall a previous design before reading its notes.",
      "minutes": 30,
      "concepts": [
        "long-term review cadence",
        "retention",
        "retrieval"
      ],
      "sections": [
        {
          "heading": "Keep the capability retrievable",
          "paragraphs": [
            "Use the shared reasoning and evidence frame for long-term review. Later daily-through-quarterly activities give concrete cadence practice without creating additional mandatory parallel gates."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain long-term review cadence in 60 seconds without notes.",
          "page": 108
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed for this retention capability.",
          "page": 108
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 108
        },
        {
          "title": "Failure",
          "task": "Add one failure with detection, mitigation and visible behavior.",
          "page": 108
        },
        {
          "title": "Alternative",
          "task": "Justify rejecting an alternative.",
          "page": 108
        },
        {
          "title": "Transfer",
          "task": "Use the idea in another product under one changed shared constraint.",
          "page": 108
        },
        {
          "title": "Design note",
          "task": "Write the shared one-page review-cadence note.",
          "page": 108
        },
        {
          "title": "Diagnostic",
          "task": "Explain, identify failure, adapt to 10\u00d7 and defend a trade-off without notes.",
          "check": "Coherent retained reasoning rather than recognition.",
          "page": 108
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard."
      ],
      "recovery": "Reproduce the smallest old example and retry without restarting."
    },
    {
      "id": "blueprint-s12-7",
      "sourceId": "Stage 12 \u2014 7",
      "title": "Final competency matrix",
      "phaseId": "blueprint-stage-12",
      "role": "checkpoint",
      "pages": [
        109
      ],
      "summary": "Classify capability through actual evidence instead of a percentage or source baseline.",
      "action": "Identify what one artifact proves and what still needs demonstration.",
      "minutes": 35,
      "concepts": [
        "competency matrix",
        "evidence classification",
        "retention"
      ],
      "sections": [
        {
          "heading": "Classification is not progress seeding",
          "paragraphs": [
            "Apply the common staged evidence frame. Page 166 supplies the separate eight-row matrix; this numbered topic retains its own source exercises."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Recall",
          "task": "Explain the competency matrix in 60 seconds without notes.",
          "page": 109
        },
        {
          "title": "Smallest system",
          "task": "Draw the smallest system needed to assess this capability.",
          "page": 109
        },
        {
          "title": "Scale",
          "task": "Modify it for 10\u00d7 traffic.",
          "page": 109
        },
        {
          "title": "Failure",
          "task": "Introduce one failure with detection, mitigation and visible effects.",
          "page": 109
        },
        {
          "title": "Alternative",
          "task": "Defend rejecting an alternative.",
          "page": 109
        },
        {
          "title": "Transfer",
          "task": "Apply the idea in another product with one changed shared constraint.",
          "page": 109
        },
        {
          "title": "Design note",
          "task": "Produce the shared one-page competency-matrix note.",
          "page": 109
        },
        {
          "title": "Diagnostic",
          "task": "Without notes explain, identify failure, adapt to 10\u00d7 and defend a trade-off.",
          "check": "Coherent evidence-based reasoning.",
          "page": 109
        }
      ],
      "criteria": [
        "Pass the local diagnostic and shared evidence standard; do not substitute percentage completion."
      ],
      "recovery": "Reproduce the smallest example and reassess its evidence without resetting the roadmap."
    },
    {
      "id": "blueprint-case-a",
      "sourceId": "Case Study A",
      "title": "URL Shortener",
      "phaseId": "blueprint-cases",
      "role": "practice",
      "pages": [
        110
      ],
      "summary": "Evolve a read-heavy short-link service while keeping stable redirects independent of analytics.",
      "action": "Draw the one-server/one-database baseline and identify the redirect invariant.",
      "minutes": 45,
      "concepts": [
        "short links",
        "redirects",
        "read-heavy workload",
        "stable links",
        "relational database",
        "stateless API",
        "hot-mapping cache",
        "durable mappings",
        "async analytics",
        "connection limits",
        "cache outage",
        "read saturation",
        "hot key",
        "short-code collisions",
        "sharding",
        "distributed database",
        "redirect abuse",
        "cache hit rate",
        "egress",
        "custom aliases",
        "multi-region reads"
      ],
      "sections": [
        {
          "heading": "Requirements and evolution",
          "paragraphs": [
            "Create short links and redirect reliably at high read volume. Reads dominate; mappings must stay stable, and useful analytics must not delay redirects.",
            "A single web server and relational database encounter CPU, read-load and connection limits. Evolve toward stateless APIs, a cache for hot mappings, durable storage and asynchronous analytics so the redirect path remains short and predictable."
          ],
          "items": []
        },
        {
          "heading": "Production reasoning",
          "paragraphs": [
            "Consider cache failure, saturated reads, hot keys and duplicate code generation. Partition by key or adopt a distributed store only when one store becomes limiting. Prevent malicious redirect abuse."
          ],
          "items": [
            "Observe redirect latency, cache hit rate, errors and hot-key distribution.",
            "Cache footprint and egress affect cost.",
            "Accept invalidation complexity only with the read-heavy benefit understood."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Remove the cache",
          "level": "Modification",
          "task": "Remove caching and estimate the resulting changes.",
          "page": 110
        },
        {
          "title": "Regional reads",
          "level": "Modification",
          "task": "Add multi-region reads.",
          "page": 110
        },
        {
          "title": "Aliases and collisions",
          "level": "Modification",
          "task": "Require custom aliases and collision resistance.",
          "page": 110
        },
        {
          "title": "Analytics consistency",
          "level": "Modification",
          "task": "Require strongly consistent analytics and reconsider the redirect path.",
          "page": 110
        },
        {
          "title": "First bottleneck",
          "task": "Identify this design's first bottleneck.",
          "page": 110
        },
        {
          "title": "Invariant",
          "task": "State the invariant that must never be violated.",
          "page": 110
        },
        {
          "title": "Allowed failure",
          "task": "Identify which dependency may fail without unacceptable behavior.",
          "page": 110
        },
        {
          "title": "Health metric",
          "task": "Name the metric that demonstrates healthy behavior.",
          "page": 110
        },
        {
          "title": "10\u00d7 and 100\u00d7",
          "task": "Explain what changes at both 10\u00d7 and 100\u00d7 demand.",
          "page": 110
        },
        {
          "title": "Operating cost",
          "task": "Identify the expensive operational part.",
          "page": 110
        },
        {
          "title": "Memory redraw",
          "level": "Final challenge",
          "task": "Redraw the shortener architecture from memory in 8 minutes.",
          "page": 110
        },
        {
          "title": "Alternative defense",
          "level": "Final challenge",
          "task": "Defend one rejected alternative for 3 minutes.",
          "check": "Link requirements to trade-offs coherently.",
          "page": 110
        }
      ],
      "criteria": [
        "Complete the selected case with coherent requirement-to-trade-off reasoning in the 8-minute redraw and 3-minute defense."
      ],
      "recovery": "Rebuild the simplest shortener model, inspect its invariant and retry the failed reasoning step."
    },
    {
      "id": "blueprint-case-b",
      "sourceId": "Case Study B",
      "title": "Notification Platform",
      "phaseId": "blueprint-cases",
      "role": "practice",
      "pages": [
        111
      ],
      "summary": "Separate asynchronous notification delivery from user requests while handling provider failures, preferences and duplicate risk.",
      "action": "Draw direct provider calls, then show where notification intents could be queued.",
      "minutes": 45,
      "concepts": [
        "email",
        "SMS",
        "push",
        "asynchronous delivery",
        "provider rate limits",
        "user preferences",
        "notification intents",
        "workers",
        "provider adapters",
        "retry",
        "backoff",
        "deduplication",
        "dead-letter handling",
        "poison messages",
        "queue backlog",
        "duplicate delivery",
        "malformed payload",
        "tenant/channel partitioning",
        "backpressure",
        "recipient data",
        "provider credentials",
        "queue age",
        "delivery latency",
        "scheduled delivery",
        "quiet hours",
        "at-least-once"
      ],
      "sections": [
        {
          "heading": "Requirements and evolution",
          "paragraphs": [
            "Deliver email, SMS and push asynchronously, tolerate provider outages and reduce duplicate sends where possible. Respect provider limits and user preferences.",
            "Direct API-to-provider calls couple the user's request to provider latency and failure. Queue intents, process them with workers and use adapters for retries/backoff; retain deduplication state and isolate poison messages through dead-letter handling."
          ],
          "items": []
        },
        {
          "heading": "Production reasoning",
          "paragraphs": [
            "Backlogs, provider outages, duplicates and malformed payloads need explicit treatment. Partition work by tenant or channel and apply backpressure. Protect recipient information and provider credentials."
          ],
          "items": [
            "Observe queue age, delivery latency, retry counts and provider error rates.",
            "At-least-once processing is more honest and simpler than claiming end-to-end exactly-once delivery without support."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Noisy tenant",
          "level": "Modification",
          "task": "Make one tenant consume all worker capacity and redesign the response.",
          "page": 111
        },
        {
          "title": "Second provider",
          "level": "Modification",
          "task": "Add a second delivery provider.",
          "page": 111
        },
        {
          "title": "Scheduling",
          "level": "Modification",
          "task": "Require scheduled notification delivery.",
          "page": 111
        },
        {
          "title": "Quiet hours",
          "level": "Modification",
          "task": "Design per-user quiet-hours behavior.",
          "page": 111
        },
        {
          "title": "First bottleneck",
          "task": "Identify the first bottleneck.",
          "page": 111
        },
        {
          "title": "Invariant",
          "task": "State the invariant that must never fail.",
          "page": 111
        },
        {
          "title": "Allowed failure",
          "task": "Identify a dependency allowed to fail and the resulting behavior.",
          "page": 111
        },
        {
          "title": "Health metric",
          "task": "Name a metric proving healthy delivery behavior.",
          "page": 111
        },
        {
          "title": "10\u00d7 and 100\u00d7",
          "task": "Describe evolution at 10\u00d7 and 100\u00d7 demand.",
          "page": 111
        },
        {
          "title": "Operating cost",
          "task": "Identify the expensive operational component.",
          "page": 111
        },
        {
          "title": "Memory redraw",
          "level": "Final challenge",
          "task": "Redraw the platform from memory in 8 minutes.",
          "page": 111
        },
        {
          "title": "Alternative defense",
          "level": "Final challenge",
          "task": "Defend a rejected alternative for 3 minutes.",
          "check": "Connect requirements, mechanism and trade-offs coherently.",
          "page": 111
        }
      ],
      "criteria": [
        "Show coherent requirement-to-trade-off reasoning in the timed redraw and defense."
      ],
      "recovery": "Reproduce the smallest queued-notification example, modify it and retry the weak part."
    },
    {
      "id": "blueprint-case-c",
      "sourceId": "Case Study C",
      "title": "File Processing Pipeline",
      "phaseId": "blueprint-cases",
      "role": "practice",
      "pages": [
        112
      ],
      "summary": "Separate slow large-file transfer from CPU-heavy processing, with status and partial-failure recovery.",
      "action": "Draw synchronous upload/processing, then separate transfer and compute capacity.",
      "minutes": 45,
      "concepts": [
        "large files",
        "slow uploads",
        "CPU-heavy processing",
        "partial failure",
        "direct object storage upload",
        "metadata",
        "queue-triggered workers",
        "durable outputs",
        "status API",
        "partial upload",
        "duplicate event",
        "worker crash",
        "corrupted file",
        "output write failure",
        "job partitioning",
        "worker autoscaling",
        "expensive workload isolation",
        "signed upload URLs",
        "malware scanning",
        "tenant isolation",
        "queue age",
        "processing duration",
        "failure class",
        "storage errors",
        "priority jobs",
        "resumable upload",
        "multi-stage processing",
        "tenant ordering"
      ],
      "sections": [
        {
          "heading": "Requirements and evolution",
          "paragraphs": [
            "Accept large files, process asynchronously and expose status. Slow transfer, CPU-intensive processing and partial failures are normal constraints.",
            "Routing uploads through application servers and processing synchronously couples transfer and compute. Use direct object-storage upload, a metadata record, queued workers, durable output objects and a status API to scale those resources separately."
          ],
          "items": []
        },
        {
          "heading": "Production reasoning",
          "paragraphs": [
            "Handle incomplete uploads, duplicate events, crashed workers, corrupt files and failed output writes. Partition by job, scale workers and isolate expensive workloads."
          ],
          "items": [
            "Use signed upload URLs, malware scanning and tenant boundaries.",
            "Observe queue age, processing duration, failure categories and storage errors.",
            "Storage and compute dominate the stated cost model."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Priority",
          "level": "Modification",
          "task": "Add priority jobs.",
          "page": 112
        },
        {
          "title": "Resume uploads",
          "level": "Modification",
          "task": "Support resumable file uploads.",
          "page": 112
        },
        {
          "title": "Processing stages",
          "level": "Modification",
          "task": "Split processing into multiple stages.",
          "page": 112
        },
        {
          "title": "Tenant ordering",
          "level": "Modification",
          "task": "Require strict ordering for one tenant's files.",
          "page": 112
        },
        {
          "title": "First bottleneck",
          "task": "Identify the first bottleneck.",
          "page": 112
        },
        {
          "title": "Invariant",
          "task": "State the invariant that cannot be violated.",
          "page": 112
        },
        {
          "title": "Allowed failure",
          "task": "Choose a dependency allowed to fail and explain the behavior.",
          "page": 112
        },
        {
          "title": "Health metric",
          "task": "Name a metric demonstrating healthy processing.",
          "page": 112
        },
        {
          "title": "10\u00d7 and 100\u00d7",
          "task": "Explain changes at 10\u00d7 and 100\u00d7 demand.",
          "page": 112
        },
        {
          "title": "Operating cost",
          "task": "Identify the expensive operational part.",
          "page": 112
        },
        {
          "title": "Memory redraw",
          "level": "Final challenge",
          "task": "Redraw the pipeline from memory in 8 minutes.",
          "page": 112
        },
        {
          "title": "Alternative defense",
          "level": "Final challenge",
          "task": "Defend one rejected alternative for 3 minutes.",
          "check": "Link requirements to trade-offs coherently.",
          "page": 112
        }
      ],
      "criteria": [
        "Demonstrate coherent reasoning in the timed redraw and alternative defense."
      ],
      "recovery": "Reproduce the smallest transfer/compute model and retry after one modification."
    },
    {
      "id": "blueprint-case-d",
      "sourceId": "Case Study D",
      "title": "Order Workflow",
      "phaseId": "blueprint-cases",
      "role": "practice",
      "pages": [
        113
      ],
      "summary": "Make cross-system order states and compensation explicit instead of assuming a global transaction.",
      "action": "Draw order, inventory and payment states including one partial failure.",
      "minutes": 45,
      "concepts": [
        "order creation",
        "inventory reservation",
        "payment",
        "fulfillment events",
        "distributed transaction",
        "state machine",
        "durable events",
        "compensation",
        "intermediate states",
        "payment/inventory partial failure",
        "duplicate callbacks",
        "timeouts",
        "state transitions",
        "stuck orders",
        "compensation rate",
        "business-level consistency",
        "refunds",
        "partial fulfillment",
        "fraud review",
        "payment authorization"
      ],
      "sections": [
        {
          "heading": "Requirements and evolution",
          "paragraphs": [
            "Create orders, reserve stock, accept payment and emit fulfillment events across separate payment and inventory systems. Failures must not leave an impossible business state.",
            "Replace an assumed transaction spanning every service with explicit states, durable events and compensating actions. Intermediate states must be visible rather than concealed."
          ],
          "items": []
        },
        {
          "heading": "Production reasoning",
          "paragraphs": [
            "Analyze payment succeeding while stock reservation fails, reserved stock followed by failed payment, repeated callbacks and timed-out services."
          ],
          "items": [
            "Observe state changes, stuck orders and compensation frequency.",
            "Business-level consistency can be more practical than global transactional consistency."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Refunds",
          "level": "Modification",
          "task": "Add refund behavior.",
          "page": 113
        },
        {
          "title": "Partial fulfillment",
          "level": "Modification",
          "task": "Allow partial fulfillment.",
          "page": 113
        },
        {
          "title": "Fraud review",
          "level": "Modification",
          "task": "Introduce an explicit fraud-review state.",
          "page": 113
        },
        {
          "title": "Earlier authorization",
          "level": "Modification",
          "task": "Move payment authorization earlier in the workflow.",
          "page": 113
        },
        {
          "title": "First bottleneck",
          "task": "Identify the first bottleneck.",
          "page": 113
        },
        {
          "title": "Invariant",
          "task": "State the business invariant that must never be violated.",
          "page": 113
        },
        {
          "title": "Allowed failure",
          "task": "Identify a dependency permitted to fail and explain recovery.",
          "page": 113
        },
        {
          "title": "Health metric",
          "task": "Name a metric demonstrating workflow health.",
          "page": 113
        },
        {
          "title": "10\u00d7 and 100\u00d7",
          "task": "Explain evolution at 10\u00d7 and 100\u00d7 demand.",
          "page": 113
        },
        {
          "title": "Operating cost",
          "task": "Identify the expensive operational part.",
          "page": 113
        },
        {
          "title": "Memory redraw",
          "level": "Final challenge",
          "task": "Redraw the order architecture from memory in 8 minutes.",
          "page": 113
        },
        {
          "title": "Alternative defense",
          "level": "Final challenge",
          "task": "Defend a rejected alternative for 3 minutes.",
          "check": "Tie the defense to requirements and business trade-offs.",
          "page": 113
        }
      ],
      "criteria": [
        "Reason coherently from requirements through state/failure behavior to trade-offs in the timed challenge."
      ],
      "recovery": "Reproduce the smallest state machine and retry the failing transition or defense."
    },
    {
      "id": "blueprint-case-e",
      "sourceId": "Case Study E",
      "title": "Telemetry Platform",
      "phaseId": "blueprint-cases",
      "role": "practice",
      "pages": [
        114
      ],
      "summary": "Split high-volume ingestion from hot metrics and cold analysis paths according to consumer needs.",
      "action": "Draw a direct relational-ingestion baseline and identify its throughput constraint.",
      "minutes": 45,
      "concepts": [
        "high-volume events",
        "dashboards",
        "long-term analysis",
        "write throughput",
        "consumer latency",
        "ingestion tier",
        "durable stream",
        "hot metrics",
        "cold storage",
        "event keys",
        "hot partition",
        "slow consumer",
        "malformed events",
        "storage outage",
        "high-cardinality partition key",
        "skew",
        "tenant isolation",
        "retention cost",
        "replay",
        "exactly-once analytics",
        "schema evolution",
        "regional ingestion"
      ],
      "sections": [
        {
          "heading": "Requirements and evolution",
          "paragraphs": [
            "Ingest many events for dashboards and longer-term analysis while consumers have different latency needs.",
            "Instead of inserting every event directly into a relational database, introduce an ingestion tier, durable stream and consumers serving hot metrics and cold storage. Partition according to event-key distribution and consumer access."
          ],
          "items": []
        },
        {
          "heading": "Production reasoning",
          "paragraphs": [
            "Expect hot partitions, slow consumers, malformed events and storage failures. Use a stable, high-cardinality partition key and watch skew; retain tenant boundaries and explicit retention policies."
          ],
          "items": [
            "Retention becomes a major cost over time.",
            "Events need not all share the same query or storage path."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Replay",
          "level": "Modification",
          "task": "Add event replay.",
          "page": 114
        },
        {
          "title": "Analytics guarantee",
          "level": "Modification",
          "task": "Require exactly-once analytics and explain the needed semantics.",
          "page": 114
        },
        {
          "title": "Schema change",
          "level": "Modification",
          "task": "Support schema evolution.",
          "page": 114
        },
        {
          "title": "Regions",
          "level": "Modification",
          "task": "Introduce regional ingestion.",
          "page": 114
        },
        {
          "title": "First bottleneck",
          "task": "Identify the first bottleneck.",
          "page": 114
        },
        {
          "title": "Invariant",
          "task": "State the invariant that cannot be violated.",
          "page": 114
        },
        {
          "title": "Allowed failure",
          "task": "Identify a dependency allowed to fail and its consequences.",
          "page": 114
        },
        {
          "title": "Health metric",
          "task": "Name a metric demonstrating platform health.",
          "page": 114
        },
        {
          "title": "10\u00d7 and 100\u00d7",
          "task": "Describe changes at 10\u00d7 and 100\u00d7 demand.",
          "page": 114
        },
        {
          "title": "Operating cost",
          "task": "Identify the expensive operational part.",
          "page": 114
        },
        {
          "title": "Memory redraw",
          "level": "Final challenge",
          "task": "Redraw the telemetry architecture from memory in 8 minutes.",
          "page": 114
        },
        {
          "title": "Alternative defense",
          "level": "Final challenge",
          "task": "Defend a rejected alternative for 3 minutes.",
          "check": "Connect requirements and trade-offs coherently.",
          "page": 114
        }
      ],
      "criteria": [
        "Show coherent requirement-to-trade-off reasoning in the timed challenge."
      ],
      "recovery": "Reproduce the simplest ingestion/consumer split, modify it and retry."
    },
    {
      "id": "blueprint-case-f",
      "sourceId": "Case Study F",
      "title": "Collaborative Application",
      "phaseId": "blueprint-cases",
      "role": "practice",
      "pages": [
        115
      ],
      "summary": "Define concurrent-edit correctness and reconnect behavior before choosing synchronization mechanisms.",
      "action": "State what a correct concurrent edit means before drawing synchronization.",
      "minutes": 45,
      "concepts": [
        "concurrent editing",
        "shared state",
        "perceived latency",
        "conflict handling",
        "reconnect support",
        "last-write-wins",
        "conflict model",
        "operation/event sequencing",
        "reconnect protocol",
        "durable snapshots",
        "offline edits",
        "duplicate messages",
        "out-of-order delivery",
        "reconnect storms",
        "conflict rate",
        "reconnect success",
        "synchronization lag",
        "coordination cost",
        "presence",
        "large documents",
        "regional servers",
        "hours offline"
      ],
      "sections": [
        {
          "heading": "Requirements and evolution",
          "paragraphs": [
            "Support concurrent editing with low perceived latency, conflict handling and reconnection.",
            "A last-write-wins update policy is only a starting point. Define correctness, then introduce a conflict model, operation/event ordering, reconnect protocol and durable snapshots suited to it."
          ],
          "items": []
        },
        {
          "heading": "Production reasoning",
          "paragraphs": [
            "Plan for offline edits, duplicates, out-of-order messages and reconnect storms."
          ],
          "items": [
            "Observe conflict rate, reconnect success and synchronization lag.",
            "Stronger consistency may cost latency or coordination overhead."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Presence",
          "level": "Modification",
          "task": "Add user presence.",
          "page": 115
        },
        {
          "title": "Document size",
          "level": "Modification",
          "task": "Support large documents.",
          "page": 115
        },
        {
          "title": "Regional servers",
          "level": "Modification",
          "task": "Introduce regional servers.",
          "page": 115
        },
        {
          "title": "Extended offline editing",
          "level": "Modification",
          "task": "Allow offline editing lasting hours.",
          "page": 115
        },
        {
          "title": "First bottleneck",
          "task": "Identify the first bottleneck.",
          "page": 115
        },
        {
          "title": "Invariant",
          "task": "State the shared-edit invariant that cannot be violated.",
          "page": 115
        },
        {
          "title": "Allowed failure",
          "task": "Choose a dependency allowed to fail and explain behavior.",
          "page": 115
        },
        {
          "title": "Health metric",
          "task": "Name a metric demonstrating healthy synchronization.",
          "page": 115
        },
        {
          "title": "10\u00d7 and 100\u00d7",
          "task": "Describe design evolution at 10\u00d7 and 100\u00d7 demand.",
          "page": 115
        },
        {
          "title": "Operating cost",
          "task": "Identify the expensive operational part.",
          "page": 115
        },
        {
          "title": "Memory redraw",
          "level": "Final challenge",
          "task": "Redraw the architecture from memory in 8 minutes.",
          "page": 115
        },
        {
          "title": "Alternative defense",
          "level": "Final challenge",
          "task": "Defend a rejected alternative for 3 minutes.",
          "check": "Tie the argument to requirements and trade-offs.",
          "page": 115
        }
      ],
      "criteria": [
        "Defend the design coherently in the timed redraw and alternative discussion."
      ],
      "recovery": "Reproduce the smallest shared-state model, clarify correctness and retry."
    },
    {
      "id": "blueprint-case-g",
      "sourceId": "Case Study G",
      "title": "Multi-Tenant SaaS",
      "phaseId": "blueprint-cases",
      "role": "practice",
      "pages": [
        116
      ],
      "summary": "Make tenant identity, fairness, isolation and cost explicit when customers differ greatly in size.",
      "action": "Trace tenant identity through one request and identify a possible noisy neighbor.",
      "minutes": 45,
      "concepts": [
        "multi-tenant SaaS",
        "tenant size variation",
        "shared pool",
        "tenant identity",
        "quotas",
        "noisy-neighbor controls",
        "partitioning",
        "tenant-aware observability",
        "hotspot",
        "cross-tenant misconfiguration",
        "large tenant scaling",
        "dedicated shard",
        "per-tenant encryption keys",
        "regional tenancy",
        "customer-defined retention",
        "isolation cost"
      ],
      "sections": [
        {
          "heading": "Requirements and evolution",
          "paragraphs": [
            "Serve many differently sized customers with isolation, predictable performance and controlled cost.",
            "An unrestricted shared pool lacks tenant-aware protection. Carry tenant identity along the request path and add quotas, noisy-neighbor controls, deliberate partitioning and tenant-scoped observations."
          ],
          "items": []
        },
        {
          "heading": "Production reasoning",
          "paragraphs": [
            "Consider one tenant creating a hotspot, configuration crossing tenant boundaries and unusually large customers needing separate scaling."
          ],
          "items": [
            "Security and tenant isolation are primary requirements.",
            "Dedicated isolation can increase cost and operating complexity."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Dedicated shard",
          "level": "Modification",
          "task": "Move a large tenant into a dedicated shard.",
          "page": 116
        },
        {
          "title": "Encryption keys",
          "level": "Modification",
          "task": "Add per-tenant encryption keys.",
          "page": 116
        },
        {
          "title": "Regional tenancy",
          "level": "Modification",
          "task": "Introduce regional tenant placement.",
          "page": 116
        },
        {
          "title": "Retention policy",
          "level": "Modification",
          "task": "Allow customer-defined retention.",
          "page": 116
        },
        {
          "title": "First bottleneck",
          "task": "Identify the first bottleneck.",
          "page": 116
        },
        {
          "title": "Invariant",
          "task": "State the invariant that must not be violated.",
          "page": 116
        },
        {
          "title": "Allowed failure",
          "task": "Identify which dependency may fail and what happens.",
          "page": 116
        },
        {
          "title": "Health metric",
          "task": "Name a metric demonstrating healthy tenant service.",
          "page": 116
        },
        {
          "title": "10\u00d7 and 100\u00d7",
          "task": "Explain changes at 10\u00d7 and 100\u00d7 demand.",
          "page": 116
        },
        {
          "title": "Operating cost",
          "task": "Identify the expensive operational part.",
          "page": 116
        },
        {
          "title": "Memory redraw",
          "level": "Final challenge",
          "task": "Redraw the SaaS architecture from memory in 8 minutes.",
          "page": 116
        },
        {
          "title": "Alternative defense",
          "level": "Final challenge",
          "task": "Defend a rejected alternative for 3 minutes.",
          "check": "Connect requirements and isolation trade-offs coherently.",
          "page": 116
        }
      ],
      "criteria": [
        "Show coherent requirement-to-trade-off reasoning in the timed challenge."
      ],
      "recovery": "Reproduce the smallest tenant-aware request path and retry."
    },
    {
      "id": "blueprint-case-h",
      "sourceId": "Case Study H",
      "title": "AI-Enabled Knowledge Service",
      "phaseId": "blueprint-cases",
      "role": "practice",
      "pages": [
        117
      ],
      "summary": "Answer over private documents with citations while treating retrieval and authorization as separate correctness concerns.",
      "action": "Draw ingestion, retrieval and authorization separately before model generation.",
      "minutes": 45,
      "concepts": [
        "private-document questions",
        "citations",
        "probabilistic output",
        "controlled access",
        "document ingestion",
        "chunking",
        "indexing",
        "retrieval",
        "prompt assembly",
        "generation",
        "evaluation",
        "access-control filtering",
        "stale index",
        "retrieval miss",
        "prompt injection",
        "hallucination",
        "token/cost spike",
        "model outage",
        "retrieval-quality proxies",
        "answer latency",
        "refusal/error classes",
        "model selection",
        "multi-tenant indexes",
        "deterministic citation coverage",
        "fallback",
        "offline evaluation"
      ],
      "sections": [
        {
          "heading": "Requirements and evolution",
          "paragraphs": [
            "Provide grounded answers with citations and controlled document access despite probabilistic model behavior.",
            "Sending a query straight to an LLM is inadequate. Build ingestion, chunking/indexing, retrieval, prompt assembly, generation, citations, evaluation and access filtering. Retrieval relevance does not replace authorization."
          ],
          "items": []
        },
        {
          "heading": "Production reasoning",
          "paragraphs": [
            "Consider stale indexes, missed retrieval, injected instructions, unsupported answers, cost spikes and model outages."
          ],
          "items": [
            "Observe retrieval-quality proxies, answer latency, token cost and refusal/error categories.",
            "A larger model is not automatically the better system architecture."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Tenant indexes",
          "level": "Modification",
          "task": "Add multi-tenant indexes.",
          "page": 117
        },
        {
          "title": "Citation coverage",
          "level": "Modification",
          "task": "Require deterministic citation coverage.",
          "page": 117
        },
        {
          "title": "Model fallback",
          "level": "Modification",
          "task": "Add a model fallback path.",
          "page": 117
        },
        {
          "title": "Offline evaluation",
          "level": "Modification",
          "task": "Design offline evaluation.",
          "page": 117
        },
        {
          "title": "First bottleneck",
          "task": "Identify the first bottleneck.",
          "page": 117
        },
        {
          "title": "Invariant",
          "task": "State the invariant that cannot be violated.",
          "page": 117
        },
        {
          "title": "Allowed failure",
          "task": "Identify a dependency permitted to fail and the resulting behavior.",
          "page": 117
        },
        {
          "title": "Health metric",
          "task": "Name a metric demonstrating healthy knowledge-service behavior.",
          "page": 117
        },
        {
          "title": "10\u00d7 and 100\u00d7",
          "task": "Explain design changes at 10\u00d7 and 100\u00d7 demand.",
          "page": 117
        },
        {
          "title": "Operating cost",
          "task": "Identify the expensive operational part.",
          "page": 117
        },
        {
          "title": "Memory redraw",
          "level": "Final challenge",
          "task": "Redraw the architecture from memory in 8 minutes.",
          "page": 117
        },
        {
          "title": "Alternative defense",
          "level": "Final challenge",
          "task": "Defend a rejected alternative for 3 minutes.",
          "check": "Connect requirements, correctness boundaries and trade-offs.",
          "page": 117
        }
      ],
      "criteria": [
        "Show coherent requirement-to-trade-off reasoning in the timed challenge."
      ],
      "recovery": "Reproduce the smallest retrieval/authorization/generation model and retry."
    },
    {
      "id": "blueprint-diagnostic-1",
      "sourceId": "Diagnostic 1",
      "title": "Explanation Without Notes",
      "phaseId": "blueprint-diagnostics",
      "role": "practice",
      "pages": [
        118
      ],
      "summary": "Explain a core component's purpose, mechanism, failure and trade-off in three minutes.",
      "action": "Choose load balancing, caching, queues, replication or partitioning.",
      "minutes": 15,
      "concepts": [
        "load balancing",
        "caching",
        "queues",
        "replication",
        "partitioning",
        "three-minute explanation",
        "assumptions",
        "uncertainty"
      ],
      "sections": [
        {
          "heading": "Assess reasoning directly",
          "paragraphs": [
            "Choose one of the five named mechanisms. An explanation consisting only of definitions does not pass. Apply the common standalone diagnostic evidence and recovery rules."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Three-minute explanation",
          "level": "Diagnostic",
          "task": "In 3 minutes explain the selected mechanism's problem, operation, failure mode and one trade-off.",
          "check": "Not definition-only; state assumptions and acknowledge unresolved design uncertainty.",
          "page": 118
        },
        {
          "title": "Evidence and reflection",
          "task": "Save a diagram/design note and a paragraph about the largest mistake or uncertainty.",
          "page": 118
        }
      ],
      "criteria": [
        "Explain through reasoning, not vocabulary; state assumptions and uncertainty."
      ],
      "recovery": "Return to the smallest weak prerequisite, reproduce an example, modify it and rerun within the next review cycle."
    },
    {
      "id": "blueprint-diagnostic-2",
      "sourceId": "Diagnostic 2",
      "title": "Reproduction",
      "phaseId": "blueprint-diagnostics",
      "role": "practice",
      "pages": [
        119
      ],
      "summary": "Reproduce an internally consistent three-tier backend with flows, boundaries and observations.",
      "action": "Draw three tiers from memory and trace one request.",
      "minutes": 20,
      "concepts": [
        "three-tier backend",
        "request flow",
        "data flow",
        "failure boundaries",
        "observability"
      ],
      "sections": [
        {
          "heading": "Reproduce relationships",
          "paragraphs": [
            "The diagram must show compatible request/data paths, failure boundaries and operational signals, not disconnected boxes. Apply the common assessment evidence rules."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Three-tier drawing",
          "level": "Diagnostic",
          "task": "Draw a simple three-tier backend and label request flow, data flow, failure boundaries and observability.",
          "check": "The diagram is internally consistent and its assumptions are explicit.",
          "page": 119
        },
        {
          "title": "Evidence and reflection",
          "task": "Save the diagram/design note and a paragraph identifying the largest mistake or uncertainty.",
          "page": 119
        }
      ],
      "criteria": [
        "Produce an internally consistent diagram; explain reasoning and uncertainty."
      ],
      "recovery": "Reproduce the smallest prerequisite example, modify it once and rerun during the next review cycle."
    },
    {
      "id": "blueprint-diagnostic-3",
      "sourceId": "Diagnostic 3",
      "title": "Modification",
      "phaseId": "blueprint-diagnostics",
      "role": "practice",
      "pages": [
        120
      ],
      "summary": "Increase URL-shortener reads tenfold without changing correctness.",
      "action": "State the shortener invariant before changing its read capacity.",
      "minutes": 25,
      "concepts": [
        "URL shortener",
        "10\u00d7 reads",
        "correctness",
        "new bottleneck",
        "mitigation"
      ],
      "sections": [
        {
          "heading": "Change only what is justified",
          "paragraphs": [
            "Explain how the larger read workload shifts the bottleneck and why the selected mitigation fits. Apply the common diagnostic evidence rules."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Tenfold reads",
          "level": "Diagnostic",
          "task": "Modify a URL shortener for 10\u00d7 read demand while preserving correctness.",
          "check": "Identify the new bottleneck and justify the chosen mitigation.",
          "page": 120
        },
        {
          "title": "Evidence and reflection",
          "task": "Save the design artifact plus a paragraph on the largest mistake or uncertainty.",
          "page": 120
        }
      ],
      "criteria": [
        "Maintain correctness, identify the new bottleneck and justify mitigation with explicit assumptions."
      ],
      "recovery": "Reproduce a smaller shortener example, make one modification and rerun within the next review cycle."
    },
    {
      "id": "blueprint-diagnostic-4",
      "sourceId": "Diagnostic 4",
      "title": "Transfer",
      "phaseId": "blueprint-diagnostics",
      "role": "practice",
      "pages": [
        121
      ],
      "summary": "Transfer caching to permissions or configuration with explicit invalidation semantics.",
      "action": "Choose permissions or configuration and state what stale data would mean.",
      "minutes": 25,
      "concepts": [
        "caching",
        "permissions",
        "configuration",
        "invalidation semantics",
        "transfer"
      ],
      "sections": [
        {
          "heading": "Transfer the model, not the box",
          "paragraphs": [
            "A cache insertion without a defined invalidation model does not demonstrate transfer. Explain assumptions and uncertain choices under the common diagnostic rules."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Caching in another domain",
          "level": "Diagnostic",
          "task": "Apply caching to a different domain such as permissions or configuration.",
          "check": "Identify invalidation semantics rather than blindly adding a cache.",
          "page": 121
        },
        {
          "title": "Evidence and reflection",
          "task": "Save the diagram/design note and a paragraph on the largest mistake or uncertainty.",
          "page": 121
        }
      ],
      "criteria": [
        "Make domain-specific invalidation semantics explicit and reason about assumptions."
      ],
      "recovery": "Reproduce the smallest cache example, modify its domain and rerun during the next review cycle."
    },
    {
      "id": "blueprint-diagnostic-5",
      "sourceId": "Diagnostic 5",
      "title": "Failure Reasoning",
      "phaseId": "blueprint-diagnostics",
      "role": "practice",
      "pages": [
        122
      ],
      "summary": "Diagnose rising queue-worker latency despite healthy CPU through hypotheses and measurements.",
      "action": "List one hypothesis and the measurement that would distinguish it.",
      "minutes": 25,
      "concepts": [
        "queue-backed workers",
        "rising latency",
        "healthy CPU",
        "hypotheses",
        "measurements"
      ],
      "sections": [
        {
          "heading": "Do not equate CPU health with system health",
          "paragraphs": [
            "The prompt supplies a symptom, not a root cause. Enumerate plausible explanations and specify useful next observations; the source does not provide a single answer."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Slow workers, healthy CPU",
          "level": "Diagnostic",
          "task": "For a queue-backed worker system with rising latency and healthy CPU, enumerate hypotheses and next measurements.",
          "check": "Reason from measurements rather than assert an unverified cause.",
          "page": 122
        },
        {
          "title": "Evidence and reflection",
          "task": "Save the diagnostic artifact and a paragraph on the largest mistake or uncertainty.",
          "page": 122
        }
      ],
      "criteria": [
        "Use measurement-driven reasoning with explicit assumptions and uncertainty."
      ],
      "recovery": "Reproduce the smallest weak queue/worker prerequisite, modify it and rerun in the next review cycle."
    },
    {
      "id": "blueprint-diagnostic-6",
      "sourceId": "Diagnostic 6",
      "title": "Alternative Comparison",
      "phaseId": "blueprint-diagnostics",
      "role": "practice",
      "pages": [
        123
      ],
      "summary": "Compare relational, document and key-value storage for one workload using relevant architectural dimensions.",
      "action": "Write one workload's access patterns before comparing stores.",
      "minutes": 30,
      "concepts": [
        "relational database",
        "document database",
        "key-value store",
        "access patterns",
        "consistency",
        "transactions",
        "operational cost",
        "scaling"
      ],
      "sections": [
        {
          "heading": "Compare mechanisms, not popularity",
          "paragraphs": [
            "Keep the workload fixed while evaluating the three storage families. State assumptions and unresolved requirements so the comparison is not a product preference."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Three-store comparison",
          "level": "Diagnostic",
          "task": "Compare relational DB, document DB and key-value storage for one workload across access patterns, consistency, transactions, operational cost and scaling.",
          "check": "Use workload requirements rather than product popularity.",
          "page": 123
        },
        {
          "title": "Evidence and reflection",
          "task": "Save the comparison/design note and a paragraph on the largest mistake or uncertainty.",
          "page": 123
        }
      ],
      "criteria": [
        "Compare all five named dimensions with reasoning, assumptions and uncertainty."
      ],
      "recovery": "Reproduce one small storage example, modify it and rerun the comparison next review cycle."
    },
    {
      "id": "blueprint-diagnostic-7",
      "sourceId": "Diagnostic 7",
      "title": "Trade-off Defense",
      "phaseId": "blueprint-diagnostics",
      "role": "practice",
      "pages": [
        124
      ],
      "summary": "Show that eventual consistency can be appropriate in one business context and unacceptable in another.",
      "action": "Choose two designs with different correctness invariants.",
      "minutes": 25,
      "concepts": [
        "eventual consistency",
        "business invariants",
        "trade-off defense"
      ],
      "sections": [
        {
          "heading": "A choice can reverse with context",
          "paragraphs": [
            "Tie the decision to business invariants instead of universally accepting or rejecting a consistency model. Apply the common evidence and recovery rules."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Defend and reject",
          "level": "Diagnostic",
          "task": "Defend eventual consistency in one design and reject it in another.",
          "check": "Both arguments are tied to their business invariants.",
          "page": 124
        },
        {
          "title": "Evidence and reflection",
          "task": "Save the decision artifact and a paragraph on the largest mistake or uncertainty.",
          "page": 124
        }
      ],
      "criteria": [
        "Ground both decisions in invariants and state assumptions and uncertainty."
      ],
      "recovery": "Reproduce the smallest consistency prerequisite, modify the business context and rerun next review cycle."
    },
    {
      "id": "blueprint-diagnostic-8",
      "sourceId": "Diagnostic 8",
      "title": "Full Architecture Assessment",
      "phaseId": "blueprint-diagnostics",
      "role": "practice",
      "pages": [
        125
      ],
      "summary": "Design a multi-tenant notification platform in 30\u201345 minutes with all required architectural dimensions.",
      "action": "Start the 30\u201345-minute assessment by framing requirements and scale.",
      "minutes": 45,
      "concepts": [
        "multi-tenant notification platform",
        "requirements",
        "scale",
        "API",
        "data model",
        "async flow",
        "failures",
        "observability",
        "security",
        "cost",
        "10\u00d7 evolution"
      ],
      "sections": [
        {
          "heading": "Complete assessment scope",
          "paragraphs": [
            "Cover the mandatory source dimensions in one coherent design. State assumptions and acknowledge choices that the requirements do not uniquely determine."
          ],
          "items": [
            "Requirements and scale.",
            "API and data model.",
            "Asynchronous flow and failures.",
            "Observability, security and cost.",
            "Evolution under 10\u00d7 demand."
          ]
        }
      ],
      "exercises": [
        {
          "title": "30\u201345-minute full design",
          "level": "Diagnostic",
          "task": "Design a multi-tenant notification platform in 30\u201345 minutes covering requirements, scale, API, data model, async flow, failures, observability, security, cost and 10\u00d7 evolution.",
          "check": "All named dimensions are present and connected by reasoning, not vocabulary.",
          "page": 125
        },
        {
          "title": "Evidence and reflection",
          "task": "Save the diagram/design note and a paragraph on the largest mistake or uncertainty.",
          "page": 125
        }
      ],
      "criteria": [
        "Cover every required dimension, reason coherently and state assumptions and uncertainty."
      ],
      "recovery": "Repair the smallest weak prerequisite through reproduction and one modification, then rerun within the next review cycle."
    },
    {
      "id": "blueprint-professional-adr",
      "sourceId": "Architecture Decision Record Practice",
      "title": "Architecture Decision Record Practice",
      "phaseId": "blueprint-professional",
      "role": "practice",
      "pages": [
        126
      ],
      "summary": "Write durable decision records with alternatives, consequences and conditions for reversal.",
      "action": "Draft an ADR's context and decision before listing alternatives.",
      "minutes": 35,
      "concepts": [
        "ADR",
        "context",
        "decision",
        "alternatives",
        "consequences",
        "reversal conditions"
      ],
      "sections": [
        {
          "heading": "A decision months later",
          "paragraphs": [
            "A senior engineer should still understand why the choice exists months afterward. Include enough reasoning to make the record useful, not simply an announcement of a technology."
          ],
          "items": [
            "Follow the common professional-evidence and integrity standard."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Complete ADR",
          "task": "Write an ADR with context, decision, alternatives, consequences and reversal conditions.",
          "check": "A future reviewer can understand the reason for the decision.",
          "page": 126
        },
        {
          "title": "Senior-reasoning diagnostic",
          "task": "Give a concrete example of senior-level ADR reasoning and name one junior failure mode.",
          "check": "A specific example, not a generic claim.",
          "page": 126
        }
      ],
      "criteria": [
        "Produce an inspectable artifact and a concrete senior/junior reasoning comparison."
      ],
      "recovery": "Return to the smallest decision example, clarify the missing reasoning and retry."
    },
    {
      "id": "blueprint-professional-review",
      "sourceId": "Design Review Protocol",
      "title": "Design Review Protocol",
      "phaseId": "blueprint-professional",
      "role": "practice",
      "pages": [
        127
      ],
      "summary": "Review in requirement-first order and identify operational gaps without substituting taste for reasoning.",
      "action": "Restate another design's requirements before evaluating it.",
      "minutes": 35,
      "concepts": [
        "design review",
        "requirements",
        "invariants",
        "bottlenecks",
        "failure modes",
        "operational gaps",
        "stylistic preference"
      ],
      "sections": [
        {
          "heading": "Review order",
          "paragraphs": [
            "Begin by restating the requirements. Then examine invariants, bottlenecks, failure modes and operational gaps, in that order. Avoid treating stylistic preference as a defect."
          ],
          "items": [
            "Leave a review artifact usable by another engineer."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Ordered design review",
          "task": "Review another design in order: requirements, invariants, bottlenecks, failures, operational gaps.",
          "check": "Critique is grounded in the design's requirements rather than taste.",
          "page": 127
        },
        {
          "title": "Senior-reasoning diagnostic",
          "task": "Demonstrate senior-level review reasoning with one concrete example and one junior failure mode.",
          "check": "Use a specific example.",
          "page": 127
        }
      ],
      "criteria": [
        "Produce a useful review artifact and a concrete reasoning diagnostic."
      ],
      "recovery": "Re-review the smallest unclear design section from its requirements and retry."
    },
    {
      "id": "blueprint-professional-writing",
      "sourceId": "Technical Writing",
      "title": "Technical Writing",
      "phaseId": "blueprint-professional",
      "role": "practice",
      "pages": [
        128
      ],
      "summary": "Produce a one-page mechanism note that another engineer can act on.",
      "action": "Outline a mechanism, flow, failure modes and closing diagnostic.",
      "minutes": 35,
      "concepts": [
        "one-page technical note",
        "mechanism",
        "flow",
        "failure modes",
        "diagnostic"
      ],
      "sections": [
        {
          "heading": "Actionable clarity",
          "paragraphs": [
            "Explain a mechanism, show its flow, identify failure modes and finish with a diagnostic. Apply the common professional-evidence standard rather than equating length with quality."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "One-page teaching note",
          "task": "Write one page explaining a mechanism, showing a flow, naming failures and ending with a diagnostic.",
          "check": "Another engineer can act on the explanation.",
          "page": 128
        },
        {
          "title": "Senior-reasoning diagnostic",
          "task": "Give a concrete senior-level writing example and identify one junior failure mode.",
          "check": "The answer is specific rather than generic.",
          "page": 128
        }
      ],
      "criteria": [
        "Produce a clear, actionable artifact and a concrete reasoning comparison."
      ],
      "recovery": "Reproduce the smallest mechanism explanation and correct the unclear section."
    },
    {
      "id": "blueprint-professional-mentoring",
      "sourceId": "Mentoring Through Systems Thinking",
      "title": "Mentoring Through Systems Thinking",
      "phaseId": "blueprint-professional",
      "role": "practice",
      "pages": [
        129
      ],
      "summary": "Teach the resource/invariant/state/failure/observation reasoning pattern instead of only supplying a fix.",
      "action": "Ask which resource and invariant are involved in a small technical problem.",
      "minutes": 35,
      "concepts": [
        "mentoring",
        "systems thinking",
        "resource",
        "invariant",
        "state location",
        "failure",
        "observation"
      ],
      "sections": [
        {
          "heading": "Coach the model",
          "paragraphs": [
            "Use questions to make another engineer's model visible. The goal is transferable reasoning, not dependency on receiving a correction."
          ],
          "items": [
            "Keep the resulting artifact understandable to a future teammate."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Resource question",
          "task": "Ask what resource the problem involves.",
          "page": 129
        },
        {
          "title": "Invariant question",
          "task": "Ask which invariant must be preserved.",
          "page": 129
        },
        {
          "title": "State question",
          "task": "Ask where the state is stored.",
          "page": 129
        },
        {
          "title": "Failure question",
          "task": "Ask what can fail.",
          "page": 129
        },
        {
          "title": "Observation question",
          "task": "Ask how the failure or behavior would be observed.",
          "page": 129
        },
        {
          "title": "Senior-reasoning diagnostic",
          "task": "Give a concrete example of senior-level mentoring reasoning and one junior failure mode.",
          "check": "Show the reasoning pattern rather than merely the fix.",
          "page": 129
        }
      ],
      "criteria": [
        "Demonstrate a concrete mentoring approach and inspectable professional reasoning."
      ],
      "recovery": "Use the five questions on the smallest example and retry the explanation."
    },
    {
      "id": "blueprint-professional-interview",
      "sourceId": "Architecture Interview Protocol",
      "title": "Architecture Interview Protocol",
      "phaseId": "blueprint-professional",
      "role": "practice",
      "pages": [
        130
      ],
      "summary": "Structure an interview from requirements and scale through deep dives, operational concerns and evolution.",
      "action": "Open a mock design with requirements, scale and assumptions.",
      "minutes": 40,
      "concepts": [
        "requirements",
        "scale",
        "assumptions",
        "high-level path",
        "data deep dive",
        "bottlenecks",
        "reliability",
        "security",
        "observability",
        "cost",
        "evolution"
      ],
      "sections": [
        {
          "heading": "Interview sequence",
          "paragraphs": [
            "Start with requirements and scale, state assumptions, draw the high-level path and deepen data/bottleneck reasoning. Cover reliability, security, observability and cost before closing with evolution."
          ],
          "items": [
            "Use the common professional-evidence standard; the source provides no interview outcome guarantee."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Protocol rehearsal",
          "task": "Rehearse the full source sequence from requirements/scale to assumptions, flow, deep dive, operational concerns and evolution.",
          "page": 130
        },
        {
          "title": "Senior-reasoning diagnostic",
          "task": "Show a concrete example of senior-level interview reasoning and one junior failure mode.",
          "check": "Use a specific example rather than generic advice.",
          "page": 130
        }
      ],
      "criteria": [
        "Produce an inspectable design artifact and a concrete reasoning diagnostic."
      ],
      "recovery": "Rehearse the smallest weak part of the design sequence and retry."
    },
    {
      "id": "blueprint-professional-work-evidence",
      "sourceId": "Current-Work Evidence Conversion",
      "title": "Current-Work Evidence Conversion",
      "phaseId": "blueprint-professional",
      "role": "practice",
      "pages": [
        131
      ],
      "summary": "Convert actually performed, authorized Service Fabric work into reusable architecture evidence without disclosing private history.",
      "action": "Choose a sanitized example that was actually performed, or label a design simulation honestly.",
      "minutes": 35,
      "concepts": [
        "Service Fabric migration",
        "replica lifecycle",
        "placement",
        "failover",
        "stateful/stateless",
        "rolling upgrades",
        "failure experiments",
        "evidence integrity"
      ],
      "sections": [
        {
          "heading": "Actual work, safe evidence",
          "paragraphs": [
            "A suitable Service Fabric example can document lifecycle, placement, failover, state ownership and upgrades. Claim hands-on failure experiments only when they were actually performed; no personal migration history is assumed."
          ],
          "items": [
            "Keep internal material private; public evidence must remove employer, customer and confidential details.",
            "A project without explanation does not fully demonstrate architecture."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Evidence conversion",
          "task": "Document replica lifecycle, placement, failover, stateful/stateless behavior, rolling upgrades and any actually performed failure experiments from a suitable authorized example.",
          "check": "Distinguish observation from simulation and sanitize public output.",
          "page": 131
        },
        {
          "title": "Senior-reasoning diagnostic",
          "task": "Give a concrete senior-level evidence-conversion example and one junior failure mode.",
          "check": "Specific reasoning, not unsupported achievement claims.",
          "page": 131
        }
      ],
      "criteria": [
        "Produce an honest, inspectable artifact and concrete reasoning diagnostic."
      ],
      "recovery": "Return to the smallest verifiable example and remove unsupported or confidential claims."
    },
    {
      "id": "blueprint-professional-ai-workflow",
      "sourceId": "AI-Enabled Architect Workflow",
      "title": "AI-Enabled Architect Workflow",
      "phaseId": "blueprint-professional",
      "role": "practice",
      "pages": [
        132
      ],
      "summary": "Use LLM assistance for architecture work while retaining responsibility for correctness, security and evaluation.",
      "action": "Ask for a critique of a public-safe design and verify one claim.",
      "minutes": 35,
      "concepts": [
        "LLM critique",
        "alternatives",
        "test cases",
        "documentation summaries",
        "assumption challenge",
        "correctness",
        "security",
        "evaluation",
        "trade-offs"
      ],
      "sections": [
        {
          "heading": "Assistance is not authority",
          "paragraphs": [
            "LLMs can help inspect designs and generate possibilities, but the architect still owns correctness, security, evaluation and trade-off decisions. Keep protected material out of unauthorized tools."
          ],
          "items": [
            "Apply the common professional-evidence standard."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Design critique",
          "task": "Use an LLM to critique a suitable design; verify its claims.",
          "page": 132
        },
        {
          "title": "Alternatives",
          "task": "Generate design alternatives with assistance and evaluate them.",
          "page": 132
        },
        {
          "title": "Test cases",
          "task": "Use assistance to propose test cases and inspect their relevance.",
          "page": 132
        },
        {
          "title": "Documentation summary",
          "task": "Summarize permitted documentation and check accuracy.",
          "page": 132
        },
        {
          "title": "Assumption challenge",
          "task": "Ask assistance to challenge assumptions and evaluate the response.",
          "page": 132
        },
        {
          "title": "Senior-reasoning diagnostic",
          "task": "Give a concrete senior-level AI-assisted architecture example and one junior failure mode.",
          "check": "Retain human responsibility rather than accepting output uncritically.",
          "page": 132
        }
      ],
      "criteria": [
        "Produce verifiable professional evidence and a concrete reasoning diagnostic."
      ],
      "recovery": "Reproduce the smallest reasoning task manually, verify the model's claim and retry."
    },
    {
      "id": "blueprint-professional-certification",
      "sourceId": "Certification as Validation",
      "title": "Certification as Validation",
      "phaseId": "blueprint-professional",
      "role": "practice",
      "pages": [
        133
      ],
      "summary": "Use certification objectives to validate cloud knowledge through applied evidence and a concrete reasoning diagnostic.",
      "action": "Pair one chosen learning objective with a lab or design artifact.",
      "minutes": 30,
      "concepts": [
        "certification",
        "cloud validation",
        "exam objectives",
        "labs",
        "architecture artifacts"
      ],
      "sections": [
        {
          "heading": "Learning evidence is distinct from an exam",
          "paragraphs": [
            "Pair exam objectives with labs or architecture artifacts when possible. Certification alone does not establish architectural capability, just as unexplained project code does not. Page 133 does not call this learning optional and explicitly asks for an artifact and diagnostic.",
            "This is an unnumbered professional-practice page, like the neighboring ADR, review and writing activities, rather than a numbered curriculum checkpoint. Its practice role preserves the learning work; it is not downgraded to reference because exams may cost money.",
            "The PDF specifies no credential or exam. Free study and optional paid exams are distinct; current availability has not been checked. Booking or passing an exam is not an added gate."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Objective-to-evidence pairing",
          "task": "For a selected certification objective, identify a lab or architecture artifact that demonstrates it.",
          "page": 133
        },
        {
          "title": "Senior-reasoning diagnostic",
          "task": "Give a concrete example of senior-level certification-to-application reasoning and one junior failure mode.",
          "check": "Use a specific applied example, not a certificate claim alone.",
          "page": 133
        }
      ],
      "criteria": [
        "Produce inspectable applied evidence and a concrete senior-level reasoning example with one junior failure mode; no exam booking or passing requirement is added."
      ],
      "recovery": "Return to the objective's smallest applied example and retry the reasoning diagnostic, without restarting or purchasing an exam."
    },
    {
      "id": "blueprint-ai-mental-model",
      "sourceId": "AI Architecture Extension \u2014 LLM system mental model",
      "title": "LLM system mental model",
      "phaseId": "blueprint-ai",
      "role": "practice",
      "pages": [
        134
      ],
      "summary": "Place a probabilistic model inside a larger controlled system with separate correctness responsibilities.",
      "action": "Draw retrieval, authorization, prompting, generation, validation and evaluation as distinct concerns.",
      "minutes": 40,
      "concepts": [
        "LLM",
        "probabilistic component",
        "deterministic system",
        "retrieval",
        "authorization",
        "prompting",
        "generation",
        "validation",
        "evaluation"
      ],
      "sections": [
        {
          "heading": "Model inside a system",
          "paragraphs": [
            "The model is one probabilistic component, not the whole architecture. Separate retrieval, authorization, prompting, generation, validation and evaluation so their responsibilities remain visible."
          ],
          "items": [
            "Use the common AI transfer and professional-application frame.",
            "This is supporting practice, not an inserted serial or post-mastery checkpoint."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Boundary model",
          "task": "Represent the LLM within the larger system and separate the six named concerns.",
          "page": 134
        },
        {
          "title": "Non-AI transfer",
          "level": "Transfer",
          "task": "Apply the concern to a non-AI backend first; identify the additional concerns caused by probabilistic output.",
          "page": 134
        },
        {
          "title": "Architect contribution",
          "level": "Professional",
          "task": "Explain architectural value in boundaries, flows, reliability, security, evaluation, cost, observability and evolution.",
          "page": 134
        },
        {
          "title": "Novel-use demonstration",
          "level": "Mastery",
          "task": "Demonstrate the architecture in a new use case and defend why AI belongs.",
          "check": "Justify the AI component, not merely its availability.",
          "page": 134
        }
      ],
      "criteria": [
        "Demonstrate a new use case and defend the AI component's purpose."
      ],
      "recovery": "Reproduce the smallest non-AI boundary model, add the probabilistic component explicitly and retry."
    },
    {
      "id": "blueprint-ai-rag",
      "sourceId": "AI Architecture Extension \u2014 RAG architecture",
      "title": "RAG architecture",
      "phaseId": "blueprint-ai",
      "role": "practice",
      "pages": [
        135
      ],
      "summary": "Design the full retrieval-augmented flow with freshness and explicit access enforcement.",
      "action": "Sketch ingestion through citations and mark where access control is enforced.",
      "minutes": 45,
      "concepts": [
        "RAG",
        "ingestion",
        "chunking",
        "indexing",
        "retrieval",
        "context assembly",
        "generation",
        "citations",
        "freshness controls",
        "access control"
      ],
      "sections": [
        {
          "heading": "Complete retrieval architecture",
          "paragraphs": [
            "Follow documents through ingestion, chunking and indexing, then requests through retrieval, context construction, generation and citations. Include freshness controls and identify the access-enforcement point."
          ],
          "items": [
            "Apply the common AI transfer and professional frame."
          ]
        }
      ],
      "exercises": [
        {
          "title": "RAG flow",
          "task": "Design ingestion, chunking, indexing, retrieval, context assembly, generation, citations and freshness controls.",
          "page": 135
        },
        {
          "title": "Authorization question",
          "task": "Identify where access control is enforced in the design.",
          "page": 135
        },
        {
          "title": "Non-AI transfer",
          "level": "Transfer",
          "task": "Apply the concept to a non-AI backend, then isolate concerns added by probabilistic generation.",
          "page": 135
        },
        {
          "title": "Architect contribution",
          "level": "Professional",
          "task": "Explain value through boundaries, flows, reliability, security, evaluation, cost, observability and evolution.",
          "page": 135
        },
        {
          "title": "Novel-use demonstration",
          "level": "Mastery",
          "task": "Demonstrate RAG in a new use case and defend why an AI component belongs.",
          "check": "A justified AI purpose and coherent architecture.",
          "page": 135
        }
      ],
      "criteria": [
        "Demonstrate a new use case and defend the role of AI with explicit access and freshness reasoning."
      ],
      "recovery": "Reproduce the smallest ingestion/retrieval model, distinguish authorization and retry."
    },
    {
      "id": "blueprint-ai-evaluation",
      "sourceId": "AI Architecture Extension \u2014 Evaluation",
      "title": "Evaluation",
      "phaseId": "blueprint-ai",
      "role": "practice",
      "pages": [
        136
      ],
      "summary": "Evaluate an AI system with task-specific cases and measurable failure categories.",
      "action": "Define one task-specific evaluation case and its failure category.",
      "minutes": 45,
      "concepts": [
        "evaluation sets",
        "failure categories",
        "retrieval quality",
        "answer correctness",
        "citation support",
        "latency",
        "cost",
        "safety"
      ],
      "sections": [
        {
          "heading": "Evaluate the task, not only the model",
          "paragraphs": [
            "Build a task-specific evaluation set and categorize failures. Assess retrieval, answer correctness and citation support alongside latency, cost and safety."
          ],
          "items": [
            "No source numerical quality threshold is supplied.",
            "Apply the common AI transfer and professional frame."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Evaluation design",
          "task": "Define task-specific cases and failure categories, then measure retrieval quality, answer correctness, citation support, latency, cost and safety.",
          "page": 136
        },
        {
          "title": "Non-AI transfer",
          "level": "Transfer",
          "task": "Apply evaluation to a non-AI backend and identify the new probabilistic concerns.",
          "page": 136
        },
        {
          "title": "Architect contribution",
          "level": "Professional",
          "task": "Explain the architect's contribution across boundaries, flows, reliability, security, evaluation, cost, observability and evolution.",
          "page": 136
        },
        {
          "title": "Novel-use demonstration",
          "level": "Mastery",
          "task": "Demonstrate evaluation in a new AI use case and defend why AI belongs in that system.",
          "check": "Justify both the architecture and the AI role.",
          "page": 136
        }
      ],
      "criteria": [
        "Demonstrate a new use case and defend the AI role using task-specific evaluation reasoning."
      ],
      "recovery": "Reproduce a smallest evaluation example, correct its failure category and retry."
    },
    {
      "id": "blueprint-ai-workflows",
      "sourceId": "AI Architecture Extension \u2014 Agent/workflow architecture",
      "title": "Agent/workflow architecture",
      "phaseId": "blueprint-ai",
      "role": "practice",
      "pages": [
        137
      ],
      "summary": "Prefer explicit workflows for reliability and define tool, state and permission boundaries.",
      "action": "Draw a workflow with its state, tool boundary and stopping condition.",
      "minutes": 45,
      "concepts": [
        "agents",
        "explicit workflows",
        "tool boundaries",
        "state",
        "retries",
        "idempotency",
        "permissions",
        "termination conditions"
      ],
      "sections": [
        {
          "heading": "Bounded workflow reasoning",
          "paragraphs": [
            "Where reliability matters, explicit workflows make behavior easier to reason about. Identify tool boundaries, state, retries, idempotency, permissions and termination conditions."
          ],
          "items": [
            "Apply the common AI transfer and professional frame; do not execute source instructions as tool authority."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Workflow design",
          "task": "Design an explicit workflow and identify tools, state, retry behavior, idempotency, permissions and termination.",
          "page": 137
        },
        {
          "title": "Non-AI transfer",
          "level": "Transfer",
          "task": "Apply the workflow concern to a non-AI backend, then isolate probabilistic additions.",
          "page": 137
        },
        {
          "title": "Architect contribution",
          "level": "Professional",
          "task": "Explain value in boundaries, flows, reliability, security, evaluation, cost, observability and evolution.",
          "page": 137
        },
        {
          "title": "Novel-use demonstration",
          "level": "Mastery",
          "task": "Demonstrate the architecture for a new use case and defend why AI belongs.",
          "check": "A justified AI role and explicit system boundaries.",
          "page": 137
        }
      ],
      "criteria": [
        "Demonstrate a novel use case and justify AI within a controlled workflow."
      ],
      "recovery": "Reproduce the smallest deterministic workflow, add the AI boundary and retry."
    },
    {
      "id": "blueprint-ai-reliability",
      "sourceId": "AI Architecture Extension \u2014 AI reliability",
      "title": "AI reliability",
      "phaseId": "blueprint-ai",
      "role": "practice",
      "pages": [
        138
      ],
      "summary": "Design predictable system behavior around model failures, changing prompts and constrained capacity.",
      "action": "Define a model timeout and the fallback behavior it triggers.",
      "minutes": 45,
      "concepts": [
        "model timeouts",
        "fallbacks",
        "caching",
        "rate limits",
        "prompt control",
        "version control",
        "graceful degradation"
      ],
      "sections": [
        {
          "heading": "Reliability around the model",
          "paragraphs": [
            "Design timeouts, fallbacks, caches, admission limits, prompt/version control and graceful degradation as system mechanisms, not merely prompt edits."
          ],
          "items": [
            "Apply the common AI transfer and professional frame."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Reliability design",
          "task": "Design model timeouts, fallbacks, caching, rate limits, prompt/version control and graceful degradation.",
          "page": 138
        },
        {
          "title": "Non-AI transfer",
          "level": "Transfer",
          "task": "Apply these reliability ideas to a non-AI backend, then isolate probabilistic concerns.",
          "page": 138
        },
        {
          "title": "Architect contribution",
          "level": "Professional",
          "task": "Explain value across boundaries, flows, reliability, security, evaluation, cost, observability and evolution.",
          "page": 138
        },
        {
          "title": "Novel-use demonstration",
          "level": "Mastery",
          "task": "Demonstrate reliability architecture for a new use case and justify the AI component.",
          "check": "Defend the AI role rather than assuming it.",
          "page": 138
        }
      ],
      "criteria": [
        "Demonstrate a new use case and defend AI's role with explicit reliability behavior."
      ],
      "recovery": "Reproduce the smallest timeout/fallback model and retry in a new scenario."
    },
    {
      "id": "blueprint-ai-security",
      "sourceId": "AI Architecture Extension \u2014 AI security",
      "title": "AI security",
      "phaseId": "blueprint-ai",
      "role": "practice",
      "pages": [
        139
      ],
      "summary": "Model risks from injected instructions, data exposure and tool use across AI system boundaries.",
      "action": "Mark untrusted retrieved content and the permissions of one tool.",
      "minutes": 45,
      "concepts": [
        "prompt injection",
        "data leakage",
        "tool abuse",
        "tenant isolation",
        "secret exposure",
        "untrusted retrieved content"
      ],
      "sections": [
        {
          "heading": "Untrusted input remains untrusted",
          "paragraphs": [
            "Consider prompt injection, data leakage, tool misuse, crossed tenant boundaries, exposed secrets and untrusted retrieval content. Model these as architecture concerns rather than assuming a model can enforce trust."
          ],
          "items": [
            "Use only authorized, sanitized examples.",
            "Apply the common AI transfer and professional frame."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Security analysis",
          "task": "Analyze prompt injection, data leakage, tool abuse, tenant isolation, secret exposure and untrusted retrieved content in a design.",
          "page": 139
        },
        {
          "title": "Non-AI transfer",
          "level": "Transfer",
          "task": "Apply the concern to a non-AI backend and isolate the risks introduced by probabilistic behavior.",
          "page": 139
        },
        {
          "title": "Architect contribution",
          "level": "Professional",
          "task": "Explain value in boundaries, flows, reliability, security, evaluation, cost, observability and evolution.",
          "page": 139
        },
        {
          "title": "Novel-use demonstration",
          "level": "Mastery",
          "task": "Demonstrate security architecture for a new use case and defend why AI belongs.",
          "check": "Justify the AI role and its boundaries.",
          "page": 139
        }
      ],
      "criteria": [
        "Demonstrate a new use case and defend the AI purpose with explicit trust-boundary reasoning."
      ],
      "recovery": "Reproduce the smallest non-AI trust model, add untrusted AI inputs and retry."
    },
    {
      "id": "blueprint-ai-cost",
      "sourceId": "AI Architecture Extension \u2014 AI cost and latency",
      "title": "AI cost and latency",
      "phaseId": "blueprint-ai",
      "role": "practice",
      "pages": [
        140
      ],
      "summary": "Optimize whole-system cost and latency through model, context and execution choices.",
      "action": "List tokens, model choice and context size for one request path.",
      "minutes": 45,
      "concepts": [
        "tokens",
        "model selection",
        "context size",
        "caching",
        "batching",
        "fallback policies",
        "cost",
        "latency"
      ],
      "sections": [
        {
          "heading": "Optimize the system",
          "paragraphs": [
            "Track tokens, chosen models, context size, caching, batching and fallback policies. Prompt optimization alone does not cover the system's latency and cost."
          ],
          "items": [
            "No source price or target latency is specified.",
            "Apply the common AI transfer and professional frame."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Cost/latency analysis",
          "task": "Track tokens, model selection, context size, caching, batching and fallback policies for a design.",
          "page": 140
        },
        {
          "title": "Non-AI transfer",
          "level": "Transfer",
          "task": "Apply the concern to a non-AI backend, then identify probabilistic additions.",
          "page": 140
        },
        {
          "title": "Architect contribution",
          "level": "Professional",
          "task": "Explain value across boundaries, flows, reliability, security, evaluation, cost, observability and evolution.",
          "page": 140
        },
        {
          "title": "Novel-use demonstration",
          "level": "Mastery",
          "task": "Demonstrate the architecture in a new use case and defend why AI belongs.",
          "check": "A justified AI role and system-level trade-off reasoning.",
          "page": 140
        }
      ],
      "criteria": [
        "Demonstrate a new use case and defend AI's role using whole-system reasoning."
      ],
      "recovery": "Reproduce the smallest request-cost model, change one assumption and retry."
    },
    {
      "id": "blueprint-ai-project",
      "sourceId": "AI Architecture Extension \u2014 AI project capstone",
      "title": "AI project capstone",
      "phaseId": "blueprint-ai",
      "role": "practice",
      "pages": [
        141
      ],
      "summary": "Build or design a small AI backend with a clear model job and measurable failure modes.",
      "action": "State the AI component's job and one measurable failure mode.",
      "minutes": 45,
      "concepts": [
        "AI-enabled backend",
        "measurable failure modes",
        "architecture",
        "evaluation plan",
        "security analysis",
        "cost assumptions"
      ],
      "sections": [
        {
          "heading": "Small, justified AI project",
          "paragraphs": [
            "The deliverable includes architecture, an evaluation plan, security analysis and cost assumptions. The model must have a defined purpose and failures that can be measured."
          ],
          "items": [
            "This extension capstone is separate from numbered Capstone 5.",
            "It is practice, not an invented additional mandatory gate."
          ]
        }
      ],
      "exercises": [
        {
          "title": "AI project",
          "task": "Build or design a small AI-enabled backend with a clear AI role, measurable failures, architecture, evaluation plan, security analysis and cost assumptions.",
          "page": 141
        },
        {
          "title": "Non-AI transfer",
          "level": "Transfer",
          "task": "Apply the concept to a non-AI backend first, then identify probabilistic concerns.",
          "page": 141
        },
        {
          "title": "Architect contribution",
          "level": "Professional",
          "task": "Explain architectural value in boundaries, flows, reliability, security, evaluation, cost, observability and evolution.",
          "page": 141
        },
        {
          "title": "Novel-use demonstration",
          "level": "Mastery",
          "task": "Demonstrate a new use case and defend why its AI component belongs.",
          "check": "Justify AI rather than adding it for novelty.",
          "page": 141
        }
      ],
      "criteria": [
        "Demonstrate the design in a new use case and defend the AI role."
      ],
      "recovery": "Reduce to the smallest non-AI backend, add a justified model role and retry."
    },
    {
      "id": "blueprint-sf-cluster",
      "sourceId": "Service Fabric Mastery \u2014 Cluster architecture",
      "title": "Cluster architecture",
      "phaseId": "blueprint-sf",
      "role": "practice",
      "pages": [
        142
      ],
      "summary": "Map Service Fabric cluster abstractions to the operational problems they solve.",
      "action": "Draw nodes, applications and services, then mark placement and health.",
      "minutes": 45,
      "concepts": [
        "Service Fabric",
        "nodes",
        "services",
        "applications",
        "placement",
        "health",
        "management",
        "cluster architecture"
      ],
      "sections": [
        {
          "heading": "Abstraction to operational purpose",
          "paragraphs": [
            "Map nodes, services, applications, placement, health and management concepts, explaining the problem solved by each abstraction."
          ],
          "items": [
            "Translate mechanisms to generic distributed-systems concepts and compare back.",
            "This is supporting practice, not an inserted serial or post-mastery checkpoint."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Cluster map",
          "task": "Map all six named cluster concepts and connect each abstraction to its operational purpose.",
          "page": 142
        },
        {
          "title": "Generic transfer",
          "level": "Transfer",
          "task": "Translate a mechanism into replication, placement, health detection or rolling deployment, then compare back to Service Fabric.",
          "page": 142
        },
        {
          "title": "Professional explanation",
          "task": "Explain why the mechanism exists and what changes when constraints change.",
          "page": 142
        },
        {
          "title": "Lifecycle/failure diagnostic",
          "level": "Mastery",
          "task": "Without documentation explain and draw one lifecycle or failure scenario; identify at least two observability signals.",
          "check": "A coherent scenario and two or more signals.",
          "page": 142
        }
      ],
      "criteria": [
        "Explain and draw one scenario without documentation and identify at least two signals."
      ],
      "recovery": "Reproduce the smallest cluster map, connect one abstraction to its purpose and retry."
    },
    {
      "id": "blueprint-sf-replicas",
      "sourceId": "Service Fabric Mastery \u2014 Replica lifecycle",
      "title": "Replica lifecycle",
      "phaseId": "blueprint-sf",
      "role": "practice",
      "pages": [
        143
      ],
      "summary": "Explain replica state and movement in terms of partitioning, placement, failover and operator observations.",
      "action": "Draw a replica movement with its state transition and observable signals.",
      "minutes": 45,
      "concepts": [
        "replica lifecycle",
        "partitioning",
        "replication",
        "state transitions",
        "placement",
        "failover",
        "replica movement",
        "operator observation"
      ],
      "sections": [
        {
          "heading": "Follow a moving replica",
          "paragraphs": [
            "Explain partitioning and replication, replica transitions, placement and failover. Describe what an operator should see when a replica moves rather than merely naming its state."
          ],
          "items": [
            "Use the common Service Fabric transfer and evidence frame."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Replica narrative",
          "task": "Explain partitioning, replication, state changes, placement and failover, including observations during replica movement.",
          "page": 143
        },
        {
          "title": "Generic transfer",
          "level": "Transfer",
          "task": "Translate the mechanism to a generic distributed-systems concept and compare back to Service Fabric.",
          "page": 143
        },
        {
          "title": "Professional explanation",
          "task": "Explain why the mechanism exists and how changed constraints affect it.",
          "page": 143
        },
        {
          "title": "Lifecycle/failure diagnostic",
          "level": "Mastery",
          "task": "Explain and draw one lifecycle or failure scenario without documentation; name at least two observability signals.",
          "check": "A coherent scenario and two or more signals.",
          "page": 143
        }
      ],
      "criteria": [
        "Explain and draw a scenario unaided with at least two relevant signals."
      ],
      "recovery": "Reproduce the smallest replica-lifecycle example and retry."
    },
    {
      "id": "blueprint-sf-state",
      "sourceId": "Service Fabric Mastery \u2014 Stateful vs stateless",
      "title": "Stateful vs stateless",
      "phaseId": "blueprint-sf",
      "role": "practice",
      "pages": [
        144
      ],
      "summary": "Compare state ownership, recovery, scaling and operational complexity before choosing a Service Fabric model.",
      "action": "State who owns the data in one stateful and one stateless design.",
      "minutes": 45,
      "concepts": [
        "stateful services",
        "stateless services",
        "state ownership",
        "recovery",
        "scaling",
        "operational complexity"
      ],
      "sections": [
        {
          "heading": "Availability is not justification",
          "paragraphs": [
            "A stateful service option should not be selected simply because the platform offers it. Compare where state is owned and how that changes recovery, scale and operation."
          ],
          "items": [
            "Use the common Service Fabric transfer and professional frame."
          ]
        }
      ],
      "exercises": [
        {
          "title": "State-model comparison",
          "task": "Compare stateful and stateless services across ownership, recovery, scaling and operational complexity.",
          "page": 144
        },
        {
          "title": "Generic transfer",
          "level": "Transfer",
          "task": "Translate the mechanism to generic distributed-systems reasoning and compare it back to Service Fabric.",
          "page": 144
        },
        {
          "title": "Professional explanation",
          "task": "Explain the mechanism's purpose and response to changed constraints.",
          "page": 144
        },
        {
          "title": "Lifecycle/failure diagnostic",
          "level": "Mastery",
          "task": "Without documentation explain and draw one lifecycle or failure scenario and identify at least two signals.",
          "check": "Coherent reasoning and at least two observability signals.",
          "page": 144
        }
      ],
      "criteria": [
        "Explain/draw a scenario without documentation and identify at least two signals."
      ],
      "recovery": "Reproduce the smallest state-ownership comparison and retry."
    },
    {
      "id": "blueprint-sf-placement",
      "sourceId": "Service Fabric Mastery \u2014 Placement and failover",
      "title": "Placement and failover",
      "phaseId": "blueprint-sf",
      "role": "practice",
      "pages": [
        145
      ],
      "summary": "Reason about actual redundancy through fault/upgrade domains, placement constraints and failure behavior.",
      "action": "Draw fault and upgrade domains around a small placement example.",
      "minutes": 45,
      "concepts": [
        "fault domains",
        "upgrade domains",
        "placement constraints",
        "redundancy",
        "failover"
      ],
      "sections": [
        {
          "heading": "Redundancy under failure",
          "paragraphs": [
            "Explain how domain boundaries and placement constraints affect redundancy when components fail. A replica count alone does not describe the operational behavior."
          ],
          "items": [
            "Apply the common Service Fabric transfer and evidence frame."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Placement reasoning",
          "task": "Reason through fault domains, upgrade domains, placement constraints and redundancy under failure.",
          "page": 145
        },
        {
          "title": "Generic transfer",
          "level": "Transfer",
          "task": "Translate placement/failover into generic distributed-systems concepts and compare back to Service Fabric.",
          "page": 145
        },
        {
          "title": "Professional explanation",
          "task": "Explain the mechanism's purpose and what changes with constraints.",
          "page": 145
        },
        {
          "title": "Lifecycle/failure diagnostic",
          "level": "Mastery",
          "task": "Explain and draw one lifecycle or failure scenario without documentation; identify at least two signals.",
          "check": "A coherent scenario and two or more observable signals.",
          "page": 145
        }
      ],
      "criteria": [
        "Explain and draw a scenario unaided with at least two signals."
      ],
      "recovery": "Reproduce the smallest domain/placement model and retry."
    },
    {
      "id": "blueprint-sf-upgrades",
      "sourceId": "Service Fabric Mastery \u2014 Rolling upgrades",
      "title": "Rolling upgrades",
      "phaseId": "blueprint-sf",
      "role": "practice",
      "pages": [
        146
      ],
      "summary": "Explain staged upgrades, health protection and the response to an unhealthy new version.",
      "action": "Draw the stages of a small upgrade and its health decision point.",
      "minutes": 45,
      "concepts": [
        "rolling upgrades",
        "staged deployment",
        "health policies",
        "unhealthy version"
      ],
      "sections": [
        {
          "heading": "Health protects progression",
          "paragraphs": [
            "Explain why an upgrade advances in stages, what the health policies protect and how the system responds when the new version is unhealthy."
          ],
          "items": [
            "Use an authorized sandbox or a design simulation; do not deploy from this prompt.",
            "Apply the common Service Fabric transfer and evidence frame."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Upgrade explanation",
          "task": "Explain staged upgrades, the purpose of health policies and behavior when the new version is unhealthy.",
          "page": 146
        },
        {
          "title": "Generic transfer",
          "level": "Transfer",
          "task": "Translate the mechanism into generic rolling-deployment reasoning and compare back to Service Fabric.",
          "page": 146
        },
        {
          "title": "Professional explanation",
          "task": "Explain why the mechanism exists and how changed constraints alter it.",
          "page": 146
        },
        {
          "title": "Lifecycle/failure diagnostic",
          "level": "Mastery",
          "task": "Without documentation explain and draw one lifecycle or failure scenario and identify at least two signals.",
          "check": "Coherent scenario reasoning with at least two observability signals.",
          "page": 146
        }
      ],
      "criteria": [
        "Explain/draw a scenario unaided and identify at least two signals."
      ],
      "recovery": "Reproduce the smallest staged-upgrade model and retry."
    },
    {
      "id": "blueprint-sf-failure-lab",
      "sourceId": "Service Fabric Mastery \u2014 Hands-on failure lab",
      "title": "Hands-on failure lab",
      "phaseId": "blueprint-sf",
      "role": "practice",
      "pages": [
        147
      ],
      "summary": "Where explicitly permitted, compare expected and observed health, replica movement and recovery after node/service failure.",
      "action": "Confirm sandbox permission and write expected observations before any failure simulation.",
      "minutes": 45,
      "concepts": [
        "node failure",
        "service failure",
        "health",
        "replica movement",
        "recovery",
        "expected versus observed",
        "authorized environment"
      ],
      "sections": [
        {
          "heading": "Conditional hands-on work",
          "paragraphs": [
            "The source conditions failure simulation on what the environment permits. Observe health, replica movement and recovery, and compare expected behavior with actual results."
          ],
          "items": [
            "Use an explicitly authorized sandbox and a known recovery/rollback path.",
            "If permission is absent, keep the activity a clearly labeled design simulation; do not claim hands-on completion."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Permitted failure experiment",
          "task": "Where allowed, simulate node/service failure and record expected versus observed health, replica movement and recovery.",
          "check": "Evidence distinguishes expectations from observations.",
          "page": 147
        },
        {
          "title": "Generic transfer",
          "level": "Transfer",
          "task": "Translate the observed mechanism to generic replication, placement, health or rollout reasoning and compare back.",
          "page": 147
        },
        {
          "title": "Professional explanation",
          "task": "Explain why the mechanism exists and what changes under different constraints.",
          "page": 147
        },
        {
          "title": "Lifecycle/failure diagnostic",
          "level": "Mastery",
          "task": "Explain and draw one lifecycle or failure scenario without documentation; name at least two observability signals.",
          "check": "Coherent explanation with at least two signals.",
          "page": 147
        }
      ],
      "criteria": [
        "For the selected activity, explain/draw a scenario unaided with at least two signals; hands-on claims require actual authorized observations."
      ],
      "recovery": "Return to the smallest safe model, reconcile expected and observed behavior and retry only within permitted scope."
    },
    {
      "id": "blueprint-sf-migration",
      "sourceId": "Service Fabric Mastery \u2014 Migration reasoning",
      "title": "Migration reasoning",
      "phaseId": "blueprint-sf",
      "role": "practice",
      "pages": [
        148
      ],
      "summary": "Turn migration analysis into architecture knowledge through old constraints, target assumptions, compatibility and rollback.",
      "action": "Write old constraints and target-state assumptions for a sanitized migration example.",
      "minutes": 45,
      "concepts": [
        "migration",
        "old constraints",
        "target-state assumptions",
        "compatibility risks",
        "operational rollback"
      ],
      "sections": [
        {
          "heading": "Reason about the transition",
          "paragraphs": [
            "Migration knowledge requires more than a target diagram. Explain the old constraints, assumptions of the target, compatibility risks and operational rollback."
          ],
          "items": [
            "No personal migration history is assumed or published.",
            "Use the common Service Fabric transfer and evidence frame."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Migration analysis",
          "task": "Identify old constraints, target assumptions, compatibility risks and operational rollback in a suitable migration example.",
          "page": 148
        },
        {
          "title": "Generic transfer",
          "level": "Transfer",
          "task": "Translate the mechanism to generic distributed-systems reasoning and compare back to Service Fabric.",
          "page": 148
        },
        {
          "title": "Professional explanation",
          "task": "Explain its purpose and how constraint changes alter the design.",
          "page": 148
        },
        {
          "title": "Lifecycle/failure diagnostic",
          "level": "Mastery",
          "task": "Without documentation explain and draw one lifecycle or failure scenario and identify at least two signals.",
          "check": "Coherent scenario with at least two observable signals.",
          "page": 148
        }
      ],
      "criteria": [
        "Explain/draw a scenario without documentation and identify at least two signals."
      ],
      "recovery": "Reproduce the smallest migration transition model, clarify rollback and retry."
    },
    {
      "id": "blueprint-sf-artifact",
      "sourceId": "Service Fabric Mastery \u2014 SF evidence artifact",
      "title": "SF evidence artifact",
      "phaseId": "blueprint-sf",
      "role": "practice",
      "pages": [
        149
      ],
      "summary": "Create a concise internal explanation of architecture, lifecycle, failure behavior and lessons from actual evidence.",
      "action": "Outline a one-page note and distinguish observed facts from assumptions.",
      "minutes": 40,
      "concepts": [
        "internal technical note",
        "cheat sheet",
        "architecture",
        "lifecycle",
        "failure behavior",
        "actual-work lessons"
      ],
      "sections": [
        {
          "heading": "Evidence with boundaries",
          "paragraphs": [
            "Produce a one-page internal note or cheat sheet covering architecture, lifecycle, failure behavior and lessons from work actually performed. Internal detail must not be copied into public artifacts without sanitization."
          ],
          "items": [
            "Use the common Service Fabric transfer and professional frame.",
            "No pre-existing work or mastery is assumed."
          ]
        }
      ],
      "exercises": [
        {
          "title": "One-page SF artifact",
          "task": "Create a one-page internal note or cheat sheet covering architecture, lifecycle, failures and lessons grounded in actual evidence.",
          "page": 149
        },
        {
          "title": "Generic transfer",
          "level": "Transfer",
          "task": "Translate the mechanism to generic distributed-systems concepts, then compare back to Service Fabric.",
          "page": 149
        },
        {
          "title": "Professional explanation",
          "task": "Explain why the mechanism exists and what changed constraints would affect.",
          "page": 149
        },
        {
          "title": "Lifecycle/failure diagnostic",
          "level": "Mastery",
          "task": "Explain and draw one lifecycle or failure scenario without documentation; identify at least two signals.",
          "check": "Coherent explanation and two or more observability signals.",
          "page": 149
        }
      ],
      "criteria": [
        "Explain/draw a scenario unaided with at least two signals and keep evidence claims verifiable."
      ],
      "recovery": "Reproduce the smallest supported example and correct the note before retrying."
    },
    {
      "id": "blueprint-retention-daily",
      "sourceId": "Retention System \u2014 Daily",
      "title": "Daily",
      "phaseId": "blueprint-retention",
      "role": "practice",
      "pages": [
        150
      ],
      "summary": "Recover the day's core reasoning in a small memory-written note.",
      "action": "Write 5\u201310 lines without reopening the source.",
      "minutes": 15,
      "concepts": [
        "daily recall",
        "5\u201310 lines",
        "concept",
        "purpose",
        "example",
        "failure",
        "trade-off"
      ],
      "sections": [
        {
          "heading": "Small retrieval evidence",
          "paragraphs": [
            "After learning, write the concept, its purpose, one example, one failure and one trade-off from memory. Keep the artifact small rather than creating an administrative burden."
          ],
          "items": [
            "If recall is weak, inspect the source briefly and reproduce the note again."
          ]
        }
      ],
      "exercises": [
        {
          "title": "5\u201310-line recall",
          "task": "After the session write 5\u201310 lines from memory covering concept, purpose, example, failure and trade-off.",
          "page": 150
        }
      ],
      "criteria": [
        "Recover the core reasoning after time away without restarting from zero."
      ],
      "recovery": "Briefly review the source and reproduce the note again."
    },
    {
      "id": "blueprint-retention-next-day",
      "sourceId": "Retention System \u2014 Next Day",
      "title": "Next Day",
      "phaseId": "blueprint-retention",
      "role": "practice",
      "pages": [
        151
      ],
      "summary": "Test yesterday's diagram or explanation before consuming new material.",
      "action": "Reproduce yesterday's core diagram without notes.",
      "minutes": 15,
      "concepts": [
        "next-day recall",
        "remembered",
        "partially remembered",
        "missing"
      ],
      "sections": [
        {
          "heading": "Recall before new content",
          "paragraphs": [
            "Reproduce the previous day's central diagram or explanation before new learning. Mark individual elements as remembered, partly remembered or missing."
          ],
          "items": [
            "Keep evidence small and useful."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Next-day reproduction",
          "task": "Without notes reproduce yesterday's core diagram/explanation and classify each element as remembered, partially remembered or missing.",
          "page": 151
        }
      ],
      "criteria": [
        "Recover core reasoning without restarting the topic from zero."
      ],
      "recovery": "Briefly inspect missing elements and reproduce the corrected explanation."
    },
    {
      "id": "blueprint-retention-weekly",
      "sourceId": "Retention System \u2014 Weekly",
      "title": "Weekly",
      "phaseId": "blueprint-retention",
      "role": "practice",
      "pages": [
        152
      ],
      "summary": "Mix older topics and a transfer problem so recall is not tied to identical wording.",
      "action": "Choose older topics and one changed-context transfer problem.",
      "minutes": 25,
      "concepts": [
        "weekly review",
        "mixed diagnostic",
        "older topics",
        "transfer problem"
      ],
      "sections": [
        {
          "heading": "Mixed retrieval",
          "paragraphs": [
            "Run one diagnostic spanning older material, including at least one transfer problem. The changed surface should reveal whether the underlying pattern is recognized."
          ],
          "items": [
            "Keep the evidence compact."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Weekly mixed diagnostic",
          "task": "Run one mixed assessment of older topics with at least one transfer problem.",
          "check": "Recognition does not depend on identical wording.",
          "page": 152
        }
      ],
      "criteria": [
        "Recover core reasoning after time away without a full restart."
      ],
      "recovery": "Reproduce the smallest weak prerequisite, modify its context and retry."
    },
    {
      "id": "blueprint-retention-monthly",
      "sourceId": "Retention System \u2014 Monthly",
      "title": "Monthly",
      "phaseId": "blueprint-retention",
      "role": "practice",
      "pages": [
        153
      ],
      "summary": "Redesign an old solution after changing a constraint to test the mental model.",
      "action": "Pick one previously solved design and change one constraint.",
      "minutes": 30,
      "concepts": [
        "monthly review",
        "changed constraint",
        "redesign",
        "mental model"
      ],
      "sections": [
        {
          "heading": "Model versus memorized picture",
          "paragraphs": [
            "A prior diagram is not enough: redesign it under a changed constraint to expose whether the reasoning is retained. Keep the resulting artifact small."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Monthly redesign",
          "task": "Redesign a previously solved system under a changed constraint.",
          "check": "Adapt the reasoning rather than repeat the original picture.",
          "page": 153
        }
      ],
      "criteria": [
        "Recover and adapt the core reasoning without starting the topic from zero."
      ],
      "recovery": "Reproduce the smallest original design, inspect the changed assumption and retry."
    },
    {
      "id": "blueprint-retention-quarterly",
      "sourceId": "Retention System \u2014 Quarterly",
      "title": "Quarterly",
      "phaseId": "blueprint-retention",
      "role": "practice",
      "pages": [
        154
      ],
      "summary": "Demonstrate three capabilities in professional artifact forms.",
      "action": "Choose three capabilities and their demonstration artifacts.",
      "minutes": 45,
      "concepts": [
        "quarterly review",
        "three capabilities",
        "design note",
        "working experiment",
        "trade-off defense"
      ],
      "sections": [
        {
          "heading": "Professional-form retrieval",
          "paragraphs": [
            "Select three capabilities and demonstrate them through a design note, a working experiment and a trade-off defense. Keep evidence practical; the starting-session estimate does not cover all three demonstrations."
          ],
          "items": [
            "Experiments require authorized environments."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Three-capability demonstration",
          "task": "Select three capabilities and demonstrate them in professional form using a design note, a working experiment and a trade-off defense.",
          "page": 154
        }
      ],
      "criteria": [
        "Recover core reasoning after time away without a topic-wide restart."
      ],
      "recovery": "Reproduce the weakest capability's smallest example, correct it and retry the demonstration."
    },
    {
      "id": "blueprint-retention-errors",
      "sourceId": "Error Ledger",
      "title": "Error Ledger",
      "phaseId": "blueprint-retention",
      "role": "practice",
      "pages": [
        155
      ],
      "summary": "Record meaningful failures in a compact form that reveals wrong assumptions and recurrence.",
      "action": "Record one symptom beside the mistaken assumption behind it.",
      "minutes": 15,
      "concepts": [
        "error ledger",
        "symptom",
        "mistaken assumption",
        "correct model",
        "detection signal",
        "prevention",
        "recurrence"
      ],
      "sections": [
        {
          "heading": "Learn from failure",
          "paragraphs": [
            "For each meaningful failure, connect the symptom to its mistaken assumption, corrected model, detection signal and prevention. Track whether the mistake repeats without creating a large administrative process."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Failure entry",
          "task": "Record symptom, mistaken assumption, correct model, detection signal, prevention and whether the failure has recurred.",
          "page": 155
        }
      ],
      "criteria": [
        "Use the record to recover core reasoning without restarting from zero."
      ],
      "recovery": "Reproduce the smallest failing example using the corrected model and check for recurrence."
    },
    {
      "id": "blueprint-retention-spaced",
      "sourceId": "Spaced Repetition for Architecture",
      "title": "Spaced Repetition for Architecture",
      "phaseId": "blueprint-retention",
      "role": "practice",
      "pages": [
        156
      ],
      "summary": "Use short architectural questions to retrieve mechanisms and trade-offs rather than reread large notes.",
      "action": "Answer one short prompt before consulting references.",
      "minutes": 15,
      "concepts": [
        "spaced repetition",
        "short prompts",
        "caching",
        "async harm",
        "retry failure",
        "100\u00d7 growth",
        "strong consistency"
      ],
      "sections": [
        {
          "heading": "Prompts, not giant notes",
          "paragraphs": [
            "Small questions make the reasoning retrievable. Keep answers and evidence compact; the goal is recovery after gaps, not maintaining a large note system."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Cache purpose",
          "task": "Explain why a cache is needed.",
          "page": 156
        },
        {
          "title": "Async harm",
          "task": "Explain when asynchronous processing is harmful.",
          "page": 156
        },
        {
          "title": "Retry failure",
          "task": "Explain what breaks when retries are introduced.",
          "page": 156
        },
        {
          "title": "Hundredfold change",
          "task": "Explain what changes at 100\u00d7 demand.",
          "page": 156
        },
        {
          "title": "Required consistency",
          "task": "Identify what must remain strongly consistent.",
          "page": 156
        }
      ],
      "criteria": [
        "Recover core reasoning after time away without restarting the topic."
      ],
      "recovery": "Recall first, inspect the missed mechanism briefly, correct and reproduce."
    },
    {
      "id": "blueprint-retention-recall-first",
      "sourceId": "Recall Before Consumption",
      "title": "Recall Before Consumption",
      "phaseId": "blueprint-retention",
      "role": "practice",
      "pages": [
        157
      ],
      "summary": "Attempt retrieval before references so familiarity does not masquerade as retained ability.",
      "action": "Recall and attempt one task before opening its reference.",
      "minutes": 15,
      "concepts": [
        "recall",
        "attempt",
        "inspect reference",
        "correct",
        "reproduce",
        "retrieval strength"
      ],
      "sections": [
        {
          "heading": "Default order",
          "paragraphs": [
            "Use recall, attempt, reference inspection, correction and reproduction in that order. Reading first may feel familiar without strengthening retrieval."
          ],
          "items": [
            "Keep the evidence small."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Recall-first loop",
          "task": "Recall, attempt, inspect the reference, correct and reproduce a small architecture task in that order.",
          "page": 157
        }
      ],
      "criteria": [
        "Recover core reasoning after time away without starting from zero."
      ],
      "recovery": "Inspect only the missing portion, correct it and reproduce again."
    },
    {
      "id": "blueprint-capstone-1",
      "sourceId": "Capstone 1",
      "title": "Production Backend",
      "phaseId": "blueprint-capstones",
      "role": "practice",
      "pages": [
        158
      ],
      "summary": "Design and implement a small backend that makes production architecture reasoning explicit.",
      "action": "Choose a small backend scope and outline its API and data path.",
      "minutes": 60,
      "concepts": [
        "API",
        "database",
        "cache",
        "async processing",
        "authentication boundary",
        "observability",
        "deployment",
        "production reasoning"
      ],
      "sections": [
        {
          "heading": "Small implementation, complete reasoning",
          "paragraphs": [
            "The implementation may remain deliberately small, but its architectural reasoning must address API, persistence, caching, async work, authentication boundary, observability and deployment."
          ],
          "items": [
            "Use all 21 capstone document sections in the common standard, in source order.",
            "Deploy only to an authorized sandbox with recovery/rollback planned.",
            "This is one selectable capstone, not a seeded completion or parallel mandatory gate."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Backend design and implementation",
          "level": "Capstone",
          "task": "Design and implement a small backend containing API, database, cache, async processing, authentication boundary, observability and deployment.",
          "page": 158
        },
        {
          "title": "Complete design document",
          "task": "Produce all 21 sections of the common capstone artifact standard for this backend.",
          "page": 158
        },
        {
          "title": "Changed-constraint defense",
          "task": "Defend the design after constraints change.",
          "check": "Adapt the reasoning rather than repeat the original diagram.",
          "page": 158
        }
      ],
      "criteria": [
        "Defend the design under changed constraints and provide the source's complete design-document structure."
      ],
      "recovery": "Return to the smallest backend slice, reproduce the weak mechanism and retry the changed constraint."
    },
    {
      "id": "blueprint-capstone-2",
      "sourceId": "Capstone 2",
      "title": "Distributed Workflow",
      "phaseId": "blueprint-capstones",
      "role": "practice",
      "pages": [
        159
      ],
      "summary": "Design a cross-service workflow that survives retries, timeouts, duplicates and partial failure.",
      "action": "Draw the workflow's states and one compensation path.",
      "minutes": 60,
      "concepts": [
        "cross-service workflow",
        "retries",
        "timeouts",
        "duplicate events",
        "partial failure",
        "state transitions",
        "compensation"
      ],
      "sections": [
        {
          "heading": "Make recovery explicit",
          "paragraphs": [
            "The workflow crosses service boundaries and must survive retried calls, timeouts, repeated events and incomplete outcomes. Include explicit transitions and compensating behavior."
          ],
          "items": [
            "Use every section of the common 21-part capstone artifact standard.",
            "This source challenge is design work; a full implementation is not separately required here."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Distributed workflow design",
          "level": "Capstone",
          "task": "Design a multi-service workflow surviving retries, timeouts, duplicate events and partial failure; include transitions and compensation.",
          "page": 159
        },
        {
          "title": "Complete design document",
          "task": "Produce all 21 common capstone sections for the workflow.",
          "page": 159
        },
        {
          "title": "Changed-constraint defense",
          "task": "Defend the workflow under changed constraints.",
          "check": "Adapt the design reasoning rather than repeat a picture.",
          "page": 159
        }
      ],
      "criteria": [
        "Defend changed constraints and provide the complete source artifact structure."
      ],
      "recovery": "Reproduce the smallest state transition and compensation example, then retry."
    },
    {
      "id": "blueprint-capstone-3",
      "sourceId": "Capstone 3",
      "title": "Multi-Region Service",
      "phaseId": "blueprint-capstones",
      "role": "practice",
      "pages": [
        160
      ],
      "summary": "Design regional-failure behavior with explicit placement, routing, consistency, recovery and ownership.",
      "action": "State a regional failure and what the service will not guarantee.",
      "minutes": 60,
      "concepts": [
        "regional failure",
        "data placement",
        "routing",
        "consistency",
        "failover",
        "recovery",
        "operational ownership",
        "non-guarantees"
      ],
      "sections": [
        {
          "heading": "State the guarantee boundary",
          "paragraphs": [
            "Specify where data lives, how requests route, what consistency is promised, how failover/recovery work and who owns operation. Explicitly name guarantees the system refuses to make."
          ],
          "items": [
            "Use every section of the common 21-part capstone artifact standard.",
            "No live regional failover is authorized by this design exercise."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Regional-failure design",
          "level": "Capstone",
          "task": "Design for regional failure with data placement, routing, consistency, failover, recovery and operational ownership; state non-guarantees.",
          "page": 160
        },
        {
          "title": "Complete design document",
          "task": "Produce all 21 common capstone sections for the regional service.",
          "page": 160
        },
        {
          "title": "Changed-constraint defense",
          "task": "Defend the design after constraints change.",
          "check": "Reason beyond the original regional diagram.",
          "page": 160
        }
      ],
      "criteria": [
        "Defend changed constraints and document the full source structure and guarantee limits."
      ],
      "recovery": "Reproduce the smallest regional-failure model, clarify guarantees and retry."
    },
    {
      "id": "blueprint-capstone-4",
      "sourceId": "Capstone 4",
      "title": "Service Fabric Case",
      "phaseId": "blueprint-capstones",
      "role": "practice",
      "pages": [
        161
      ],
      "summary": "Produce a Service Fabric migration narrative connecting architecture, replica behavior and operational risk.",
      "action": "Outline current and target architecture for a suitable sanitized example.",
      "minutes": 60,
      "concepts": [
        "Service Fabric migration",
        "current architecture",
        "target state",
        "replica lifecycle",
        "upgrade behavior",
        "failover behavior",
        "operational risks"
      ],
      "sections": [
        {
          "heading": "Use actual context only when appropriate",
          "paragraphs": [
            "A suitable authorized migration example can ground a narrative about current architecture, target state, replica lifecycle, upgrades, failover and operational risks. This pack does not assert any personal migration history."
          ],
          "items": [
            "Use all 21 common capstone sections.",
            "Keep confidential internal details private and distinguish observed work from a design simulation."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Service Fabric narrative",
          "level": "Capstone",
          "task": "Produce a design narrative covering current architecture, target state, replica lifecycle, upgrade/failover behavior and operational risks; use actual authorized context only where appropriate.",
          "page": 161
        },
        {
          "title": "Complete design document",
          "task": "Produce all 21 common capstone sections for the Service Fabric case.",
          "page": 161
        },
        {
          "title": "Changed-constraint defense",
          "task": "Defend the case after constraints change.",
          "check": "Adapt the architecture reasoning rather than repeat the source diagram.",
          "page": 161
        }
      ],
      "criteria": [
        "Defend changed constraints, use the full artifact structure and keep evidence claims honest."
      ],
      "recovery": "Reproduce the smallest lifecycle/migration example and retry the uncertain behavior."
    },
    {
      "id": "blueprint-capstone-5",
      "sourceId": "Capstone 5",
      "title": "AI-Enabled System",
      "phaseId": "blueprint-capstones",
      "role": "practice",
      "pages": [
        162
      ],
      "summary": "Build or design a backend with a justified AI pattern, evaluation, operational controls and fallback.",
      "action": "State the AI job, its evaluation method and fallback path.",
      "minutes": 60,
      "concepts": [
        "AI backend",
        "RAG",
        "justified AI pattern",
        "evaluation",
        "security",
        "observability",
        "latency controls",
        "cost controls",
        "fallback"
      ],
      "sections": [
        {
          "heading": "Justify and contain AI",
          "paragraphs": [
            "Use RAG or another justified AI pattern. The design must include evaluation, security, observability, latency/cost controls and a fallback path."
          ],
          "items": [
            "Build or design are both source-supported options.",
            "Use every section of the common 21-part capstone standard.",
            "This is separate from the AI extension project on page 141."
          ]
        }
      ],
      "exercises": [
        {
          "title": "AI system",
          "level": "Capstone",
          "task": "Build or design an AI backend with RAG or another justified pattern, evaluation, security, observability, latency/cost controls and fallback.",
          "page": 162
        },
        {
          "title": "Complete design document",
          "task": "Produce all 21 common capstone sections for the AI system.",
          "page": 162
        },
        {
          "title": "Changed-constraint defense",
          "task": "Defend the system after constraints change.",
          "check": "Adapt reasoning rather than repeat the original AI diagram.",
          "page": 162
        }
      ],
      "criteria": [
        "Defend changed constraints and provide the complete artifact structure with a justified AI role."
      ],
      "recovery": "Reproduce the smallest non-AI backend and AI boundary, then retry the weak guarantee."
    },
    {
      "id": "blueprint-capstone-6",
      "sourceId": "Capstone 6",
      "title": "Architecture Review",
      "phaseId": "blueprint-capstones",
      "role": "practice",
      "pages": [
        163
      ],
      "summary": "Present one capstone under senior-review interruptions about rationale, alternatives, failure, cost and scale.",
      "action": "Choose one capstone and prepare to defend its first bottleneck.",
      "minutes": 60,
      "concepts": [
        "senior review",
        "interruptions",
        "rationale",
        "what-if",
        "first bottleneck",
        "alternatives",
        "cost",
        "100\u00d7 demand"
      ],
      "sections": [
        {
          "heading": "Review one capstone",
          "paragraphs": [
            "Present a selected capstone as though senior engineers were reviewing it. Expect questions that challenge assumptions rather than letting the presentation follow a memorized script."
          ],
          "items": [
            "Use all 21 common capstone sections.",
            "The source says one capstone; it does not require completing every other capstone first."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Review presentation",
          "level": "Capstone",
          "task": "Present one capstone as a senior-engineer review.",
          "page": 163
        },
        {
          "title": "Why",
          "task": "Explain why the design choice is appropriate.",
          "page": 163
        },
        {
          "title": "What if",
          "task": "Respond to a changed-assumption question.",
          "page": 163
        },
        {
          "title": "First failure",
          "task": "Explain what breaks first.",
          "page": 163
        },
        {
          "title": "Rejected alternative",
          "task": "Explain why the alternative was not chosen.",
          "page": 163
        },
        {
          "title": "Cost question",
          "task": "Explain how much the design costs using explicit assumptions.",
          "page": 163
        },
        {
          "title": "100\u00d7 question",
          "task": "Explain what happens at 100\u00d7 demand.",
          "page": 163
        },
        {
          "title": "Complete design document",
          "task": "Provide all 21 common capstone sections for the reviewed design.",
          "page": 163
        },
        {
          "title": "Changed-constraint defense",
          "task": "Defend the design under changed constraints.",
          "check": "Adapt the reasoning, not merely the presentation order.",
          "page": 163
        }
      ],
      "criteria": [
        "Defend changed constraints coherently and retain the full source artifact structure."
      ],
      "recovery": "Reproduce the smallest disputed design choice, revise the reasoning and retry the review."
    },
    {
      "id": "blueprint-capstone-7",
      "sourceId": "Capstone 7",
      "title": "Portfolio Evidence",
      "phaseId": "blueprint-capstones",
      "role": "practice",
      "pages": [
        164
      ],
      "summary": "Convert one capstone into a concise public-safe artifact without confidential details or unsupported achievement claims.",
      "action": "Select one capstone and identify material that must remain private.",
      "minutes": 45,
      "concepts": [
        "public-safe design artifact",
        "problem",
        "requirements",
        "architecture",
        "trade-offs",
        "failure modes",
        "metrics",
        "lessons",
        "confidentiality"
      ],
      "sections": [
        {
          "heading": "Public-safe evidence",
          "paragraphs": [
            "Present the problem, requirements, architecture, trade-offs, failures, metrics and lessons concisely. Remove confidential company information and personal/employer/history values rather than treating internal context as publishable."
          ],
          "items": [
            "Use all 21 common capstone sections in the underlying artifact.",
            "The activity prepares evidence; it does not authorize publication or imply completed achievements."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Portfolio conversion",
          "level": "Capstone",
          "task": "Convert one capstone into a concise public-safe artifact with problem, requirements, architecture, trade-offs, failures, metrics and lessons; remove confidential details.",
          "page": 164
        },
        {
          "title": "Complete design document",
          "task": "Retain all 21 common capstone sections in the supporting design artifact.",
          "page": 164
        },
        {
          "title": "Changed-constraint defense",
          "task": "Defend the underlying design when constraints change.",
          "check": "Demonstrate reasoning rather than a polished but memorized diagram.",
          "page": 164
        }
      ],
      "criteria": [
        "Defend changed constraints, preserve complete reasoning and remove protected information."
      ],
      "recovery": "Return to the smallest supported artifact, remove unsupported/private claims and retry its explanation."
    },
    {
      "id": "blueprint-capstone-8",
      "sourceId": "Capstone 8",
      "title": "Founder-Level Problem Framing",
      "phaseId": "blueprint-capstones",
      "role": "practice",
      "pages": [
        165
      ],
      "summary": "Work backward from user value to system constraints instead of selecting architecture by fashion.",
      "action": "State a product problem and the user value a solution must deliver.",
      "minutes": 60,
      "concepts": [
        "product problem",
        "user value",
        "system constraints",
        "product requirements",
        "architecture fashion"
      ],
      "sections": [
        {
          "heading": "Value drives constraints",
          "paragraphs": [
            "Choose a product problem, derive the needed user value and work backward to system requirements. Show that architectural decisions follow those requirements rather than a fashionable pattern."
          ],
          "items": [
            "Use every section of the common 21-part capstone standard.",
            "This educational framing exercise promises no business or career outcome."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Product-to-system framing",
          "level": "Capstone",
          "task": "Choose a product problem and derive system constraints from user value; show how requirements drive architectural decisions.",
          "page": 165
        },
        {
          "title": "Complete design document",
          "task": "Produce all 21 common capstone sections for the product problem.",
          "page": 165
        },
        {
          "title": "Changed-constraint defense",
          "task": "Defend the architecture when constraints change.",
          "check": "Adapt requirements-led reasoning rather than repeat the original diagram.",
          "page": 165
        }
      ],
      "criteria": [
        "Defend changed constraints and demonstrate requirement-driven decisions with the full artifact structure."
      ],
      "recovery": "Return to the smallest user-value statement, rederive constraints and retry the design."
    },
    {
      "id": "blueprint-competency-matrix",
      "sourceId": "Capability matrix (page 166)",
      "title": "Capability Matrix",
      "phaseId": "blueprint-final",
      "role": "reference",
      "pages": [
        166
      ],
      "summary": "Classify evidence across eight capabilities and four source columns without assigning progress percentages.",
      "action": "Compare one actual artifact with the matrix's evidence descriptions.",
      "minutes": 25,
      "concepts": [
        "Familiar",
        "Practiced",
        "Applied/Transferred",
        "Demonstrated/Retained",
        "Backend/API design",
        "Data modeling",
        "Distributed systems",
        "Cloud architecture",
        "Service Fabric",
        "AI architecture",
        "System design",
        "Technical leadership"
      ],
      "sections": [
        {
          "heading": "How to read the vector table",
          "paragraphs": [
            "The original table has five columns: capability, Familiar, Practiced, Applied/Transferred and Demonstrated/Retained. The following rows preserve that order. Classification is not a percentage, and unaided reproduction is necessary before claiming demonstrated or retained capability."
          ],
          "items": []
        },
        {
          "heading": "Evidence by capability",
          "paragraphs": [],
          "items": [
            "Backend/API design: explain terms \u2192 build a small example \u2192 modify it under constraints \u2192 defend a production choice.",
            "Data modeling: describe models \u2192 reproduce a schema \u2192 adapt access patterns \u2192 justify consistency and indexing.",
            "Distributed systems: recognize components \u2192 explain failures \u2192 design under scale \u2192 defend trade-offs.",
            "Cloud architecture: know services \u2192 complete labs \u2192 choose services from requirements \u2192 explain cost and reliability consequences.",
            "Service Fabric: know terms \u2192 map a lifecycle \u2192 explain migration behavior \u2192 teach failure and upgrade reasoning.",
            "AI architecture: know LLM/RAG concepts \u2192 run experiments \u2192 design production boundaries \u2192 evaluate safety, cost and reliability.",
            "System design: follow a template \u2192 complete guided designs \u2192 handle novel cases \u2192 perform under interview/review pressure.",
            "Technical leadership: read designs \u2192 write notes \u2192 conduct reviews \u2192 influence decisions through reasoning."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Evidence classification",
          "task": "Use the matrix to classify actual capability evidence by state rather than assigning a percentage.",
          "check": "Do not claim demonstrated/retained ability without unaided reproduction.",
          "page": 166
        }
      ],
      "criteria": [
        "Classification must follow evidence, not source baseline or a percentage score."
      ],
      "recovery": "Reproduce the smallest relevant example, then reassess the evidence state without restarting."
    },
    {
      "id": "blueprint-final-checklist",
      "sourceId": "Final Mastery Checklist",
      "title": "Final Mastery Checklist",
      "phaseId": "blueprint-final",
      "role": "reference",
      "pages": [
        167
      ],
      "summary": "Review durable architecture capabilities without interpreting the roadmap as permanently finished.",
      "action": "Choose one checklist claim and locate actual evidence for it.",
      "minutes": 25,
      "concepts": [
        "backend boundaries",
        "data flow",
        "failure boundaries",
        "operational signals",
        "load balancing",
        "caching",
        "queues",
        "replication",
        "partitioning",
        "observability",
        "bottlenecks",
        "strong consistency",
        "eventual consistency",
        "retry storms",
        "duplicate processing",
        "timeouts",
        "backpressure",
        "graceful degradation",
        "10\u00d7",
        "100\u00d7",
        "alternatives",
        "cost",
        "operational complexity",
        "Service Fabric",
        "AI responsibility",
        "ADR",
        "design review",
        "timed design",
        "diagnostic recovery",
        "one active checkpoint"
      ],
      "sections": [
        {
          "heading": "Durable end state",
          "paragraphs": [
            "The intended end state is demonstrated, retained reasoning that grows with more complex systems and responsibility. Practice does not cease because the curriculum has been read.",
            "The checklist is an assessment reference, not a statement that the learner already has these abilities."
          ],
          "items": []
        }
      ],
      "exercises": [],
      "criteria": [
        "Explain backend boundaries, data flow, failures and operational signals without a memorized diagram.",
        "Reason from requirements about load balancing, caching, queues, replication, partitioning and observability.",
        "Identify the likely bottleneck before adding components.",
        "Distinguish what requires strong consistency from what permits eventual consistency.",
        "Explain retry storms, duplicate processing, timeouts, backpressure and graceful degradation.",
        "Design for 10\u00d7 and 100\u00d7 changes without blindly multiplying infrastructure.",
        "Compare alternatives by requirements, failure behavior, cost and operational complexity.",
        "Convert actual work, including suitable Service Fabric examples, into reusable knowledge without confidential disclosure.",
        "Use AI architecture assistance while retaining responsibility for correctness, security, evaluation and trade-offs.",
        "Write an ADR and concise architecture design document.",
        "Conduct a review that improves a system rather than merely criticizing it.",
        "Complete a full timed design case and defend decisions.",
        "Identify a weak capability diagnostically and recover it without a roadmap restart.",
        "Maintain one actual active checkpoint for resumption after gaps."
      ],
      "recovery": "Use the diagnostic matching a weak claim, reproduce the smallest prerequisite and retry; retain the existing roadmap."
    }
  ],
  "commonSections": [
    {
      "heading": "Curriculum-map evidence anchors \u2014 page 5",
      "paragraphs": [
        "The original vector table pairs each numbered stage with an evidence form. These are learning targets, not assertions that artifacts or capability already exist."
      ],
      "items": [
        "Stage 0: Day 0 artifacts and an uncredited starting assessment.",
        "Stage 1: API, service and data exercises.",
        "Stage 2: component-reasoning sheets.",
        "Stage 3: pattern-transfer drills.",
        "Stage 4: small complete service designs.",
        "Stage 5: timed design and coding sets.",
        "Stage 6: failure and scale modifications.",
        "Stage 7: defended trade-offs.",
        "Stage 8: full case studies.",
        "Stage 9: architecture decision records.",
        "Stage 10: design reviews and mock interviews.",
        "Stage 11: direct capability assessments.",
        "Stage 12: capstone evidence and retained recall."
      ]
    },
    {
      "heading": "Mission, pillars and cross-mission ownership \u2014 pages 1\u20133, 5, 168",
      "paragraphs": [
        "Architecture here means framing problems, selecting mechanisms, understanding implementation consequences, operating systems and explaining decisions. Technical leadership means influence, writing, review and mentoring rather than a people-management requirement.",
        "The permanent curriculum remains stable. Keep only one actual active checkpoint, resume it after a gap and use nearby diagnostics to check retention. Source examples are not actual progress."
      ],
      "items": [
        "Architect Foundations: backend, system fundamentals and deployable cloud reasoning.",
        "Service Fabric Mastery: lifecycle, placement, replication, health and upgrade knowledge.",
        "Design Thinking: requirements, alternatives, constraints and defensible system design.",
        "Certifications: structured cloud validation backed by applied learning evidence; exam booking or passing is not an added curriculum gate.",
        "Leadership & Communication: technical writing, reviews, mentoring and alignment.",
        "Long-term Goals: durable architectural capability, projects and product-centered decisions.",
        "DSA/Coding supplies implementation fluency and interview support; System Design supplies detailed design exercises; Service Fabric and AI coaches supply domain labs. Cross-mission deliverables may be taken to the relevant coach rather than duplicating whole curricula.",
        "Report significant capability evidence, blocked dependencies, priority shifts or cross-mission decisions briefly. Do not fabricate milestones, jobs or outcomes."
      ]
    },
    {
      "heading": "Learning loop and staged evidence \u2014 pages 3, 6\u2013109",
      "paragraphs": [
        "Work through understanding, recognition, reproduction, modification, combination, transfer, failure handling, design, trade-off defense and delayed retention. Increase ambiguity after the pattern becomes recognizable.",
        "Each numbered topic requires an inspectable artifact and a link to a production situation, interview, design review or suitably sanitized work example. Reading or terminology recall alone does not demonstrate capability."
      ],
      "items": [
        "FAMILIAR to PRACTICED requires reproduction.",
        "PRACTICED to APPLIED requires a modification.",
        "APPLIED to TRANSFERRED requires a different scenario.",
        "TRANSFERRED to DEMONSTRATED requires professional-quality reasoning.",
        "For numbered stage topics, the source's next-topic gate is the local diagnostic. If it fails, repair the current capability rather than restart the roadmap.",
        "Only Day 0 and the 91 numbered topics are serial checkpoints. All AI and Service Fabric extension units are independent practice; their local evidence criteria do not create post-mastery gates or prerequisites for unrelated work."
      ]
    },
    {
      "heading": "Shared numbered-topic reasoning frame \u2014 pages 7\u2013109",
      "paragraphs": [
        "For the current topic, identify its correctness invariant and the constrained resource: CPU, memory, network, storage, connections, coordination or operator attention. Begin with one service and explicit requirements, constraints, traffic shape and failure assumptions. Prefer the simplest adequate mechanism, then identify the first limit and its observable signal under 10\u00d7 growth.",
        "Distinguish normal operation from recovery. A familiar component name is not a substitute for explaining the mechanism. Generic framing on orientation, writing and diagnostic topics is retained as a source exercise, not represented as a worked implementation."
      ],
      "items": [
        "Transfer exercise: reuse the topic in a different product context; change one of latency, consistency, cost, tenant isolation, regional distribution or failure tolerance, and alter only the affected design.",
        "One-page design note: problem, assumptions, chosen mechanism, rejected alternative, failure behavior, observability signals and one question for a senior reviewer before release.",
        "No-notes diagnostic: explain the mechanism, identify one failure, adapt for 10\u00d7 load and defend a trade-off. Passing requires coherent reasoning, not a list of component names.",
        "Recovery: rebuild the smallest example and retry the diagnostic; preserve prior evidence and do not restart automatically."
      ]
    },
    {
      "heading": "Case-study practice protocol \u2014 pages 110\u2013117",
      "paragraphs": [
        "Each case preserves a simple initial design, its limiting behavior, an improved design, concrete operational concerns and four distinct modifications. The later cases are practice material, not substitutes for the earlier numbered topic exercises."
      ],
      "items": [
        "For each case, answer separately: first bottleneck; invariant that cannot be violated; dependency allowed to fail; health metric; evolution at 10\u00d7 and 100\u00d7; expensive operational part.",
        "Final challenge for each case: redraw from memory in 8 minutes, then defend a rejected alternative for 3 minutes. Pass through a coherent link from requirements to trade-offs."
      ]
    },
    {
      "heading": "Standalone diagnostic evidence and recovery \u2014 pages 118\u2013125",
      "paragraphs": [
        "An assessment must expose reasoning, state assumptions and acknowledge uncertainty when requirements permit several designs. Save the diagram or design note and a paragraph identifying the largest mistake or unresolved uncertainty."
      ],
      "items": [
        "After failure, find the smallest weak prerequisite, reproduce one example, make one modification and repeat the assessment within the next review cycle.",
        "No score cutoff is supplied. Apply the particular diagnostic's stated pass condition rather than inventing a percentage threshold."
      ]
    },
    {
      "heading": "Professional evidence and integrity \u2014 pages 126\u2013133, 164",
      "paragraphs": [
        "Produce evidence understandable by a reviewer, interviewer or future teammate. A certificate without application is incomplete evidence; unexplained project code is incomplete too. Only describe experiments and work that actually happened, and remove confidential organization, customer and personal details before public use."
      ],
      "items": [
        "Each professional page asks for a concrete example of senior-level reasoning and one junior failure mode; a generic claim does not pass.",
        "LLM suggestions remain untrusted assistance. The architect owns correctness, permissions, security, evaluation and trade-offs.",
        "Certification study and applied capability are distinct from optional paid exams. Retain source-required learning and diagnostics; do not add exam booking/passing as a gate. No current exam availability is implied."
      ]
    },
    {
      "heading": "Domain-extension evidence \u2014 pages 134\u2013149",
      "paragraphs": [
        "For every AI extension topic, first apply the concern to a non-AI backend, then isolate what changes because model outputs are probabilistic. Explain architectural contributions in boundaries, flows, reliability, security, evaluation, cost, observability and evolution. Demonstrate a new use case and justify why AI belongs.",
        "For every Service Fabric topic, translate the mechanism to generic replication, placement, health detection or rolling deployment and compare back to the product. Explain why it exists and how changed constraints affect it."
      ],
      "items": [
        "Service Fabric local mastery: without documentation, explain and draw one lifecycle or failure scenario and identify at least two observability signals.",
        "Run disruptive experiments only in an explicitly permitted sandbox with known scope, expected behavior and a recovery/rollback path; otherwise use a design simulation.",
        "Pages 134\u2013149 give local mastery criteria but do not insert the extensions into the numbered next-unlock sequence. All sixteen units remain independent practice with their complete evidence requirements, not serial post-mastery checkpoints."
      ]
    },
    {
      "heading": "Retention and capstone artifact standards \u2014 pages 150\u2013165",
      "paragraphs": [
        "Retention evidence stays small and useful. Recover core reasoning after time away instead of restarting or building an administrative project.",
        "Each numbered capstone uses the complete source design-document structure below and is assessed by defending changes in constraints, not by repeating a memorized diagram."
      ],
      "items": [
        "Capstone sections, in order: problem; requirements; non-functional requirements; constraints; assumptions; scale; naive approach; bottlenecks; improved approach; flows; failure scenarios; scaling; security; observability; cost; operational complexity; trade-offs; alternatives; modification scenarios; professional questions; final challenge.",
        "A capstone may span many sessions. Starting-session minutes do not estimate completion time, and none of the eight is silently credited.",
        "Keep deployment, failure injection and confidential evidence within authorized environments; public versions must be sanitized."
      ]
    }
  ]
} satisfies RoadmapPack;
