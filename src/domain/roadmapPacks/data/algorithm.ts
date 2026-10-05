import type { RoadmapPack } from '../types';

export default {
  "missionId": "algorithm",
  "document": "Operation_Algorithm_Forge_Complete_Roadmap.pdf",
  "title": "Operation Algorithm Forge \u2014 Competitive Programming Mastery",
  "pageCount": 120,
  "overview": "A six-stage contest curriculum for Codeforces and CodeChef, progressing from an explainable C# environment through implementation, core patterns, graph/tree/DP modeling and Specialist-oriented judgment. Contest skill is distinct from interview DSA: constraints, independent observation, proof, accurate implementation, debugging and decisions under time pressure are central. Stage 5 is demand-driven, not a compulsory advanced-algorithm checklist. All evidence remains to be earned.",
  "sourceNotes": [
    "Reviewed every physical page and the entire supplied extraction. PyMuPDF reports 120 pages and 21,484 PDF word tokens; the extraction has 22,084 whitespace tokens including 120 page markers and layout artifacts.",
    "Original vector layouts were inspected for canonical stages, demand-driven unlocks, planning, competency symbols and remediation associations. There are no raster images.",
    "Page references use physical PDF numbering. Module, diagnostic, case, lab, packet and appendix identifiers retain their source identity.",
    "Personal baseline and save-state values on pages 1, 5 and 84 are excluded. No completion, active learner state, rating achievement or retained mastery is seeded.",
    "The six source stages and Module 01\u201334 order are preserved. Supplemental practice/reference units are browsable and are not additional mandatory checkpoint gates.",
    "Module practice and diagnostic entries remain separately present in each module even where the source repeats a framework. Shared explanation, evidence requirements and repair rules are factored into commonSections.",
    "Session minutes are starting estimates only. Full 90- and 120-minute source simulations retain their actual duration in exercise text.",
    "No platform problem IDs, concrete lab datasets or broken implementations are supplied for most prompts. These are task specifications, not claims that a complete executable problem set was included.",
    "Stage 5 names potential algorithms and failure triggers but supplies no full module lessons or mandatory assessments for them."
  ],
  "phases": [
    {
      "id": "stage-0",
      "title": "Stage 0 \u2014 Competitive Programming Setup",
      "summary": "Understand contest mechanics, ratings and etiquette; build and test a small C# template; complete a first practice contest and postmortem."
    },
    {
      "id": "stage-1",
      "title": "Stage 1 \u2014 Implementation Mastery",
      "summary": "Make loops, arrays, strings, simulation, prefix sums, sorting and frequency counting routine enough for comfortable Div 4 A\u2013D work."
    },
    {
      "id": "stage-2",
      "title": "Stage 2 \u2014 Core Contest Patterns",
      "summary": "Recognize and combine pointers, windows, binary search, greedy, keyed state, arithmetic and interval events in consistent Div 3 A\u2013C solving."
    },
    {
      "id": "stage-3",
      "title": "Stage 3 \u2014 Intermediate Competitive Programming",
      "summary": "Model recursive, graph, tree and DP state and develop reliable Div 2 A/B reasoning, implementation and upsolving."
    },
    {
      "id": "stage-4",
      "title": "Stage 4 \u2014 Specialist Level",
      "summary": "Build proof, advanced DP, arithmetic, combinatorics, bitmask and dynamic-aggregate breadth with repeated contest evidence around 1400+."
    },
    {
      "id": "stage-5",
      "title": "Stage 5 \u2014 Long-Term Growth",
      "summary": "After Specialist is reached or realistically near, use repeated capability failures to select advanced learning; there is no fixed timeline or compulsory algorithm sequence."
    }
  ],
  "units": [
    {
      "id": "algorithm-mission-charter",
      "sourceId": "1\u20134 / 24\u201325",
      "title": "Mission Charter and Curriculum Map",
      "phaseId": "stage-0",
      "role": "reference",
      "pages": [
        1,
        2,
        3,
        4,
        5,
        84,
        85
      ],
      "summary": "Understand the contest-specific end state, canonical six stages and evidence-only progression without importing the source's illustrative personal state.",
      "action": "Restate how contest solving differs from interview DSA, then walk one problem through the contest thinking loop.",
      "minutes": 25,
      "concepts": [
        "competitive programming",
        "Codeforces",
        "CodeChef",
        "Specialist 1400+",
        "Div 4",
        "Div 3",
        "Div 2 A/B/C",
        "constraints",
        "brute force",
        "bottleneck",
        "observation",
        "proof",
        "adversarial testing",
        "one active checkpoint"
      ],
      "sections": [
        {
          "heading": "Contest thinking pipeline",
          "paragraphs": [
            "Formalize the requested output, use constraints to estimate affordable work, construct a correct brute-force baseline, locate repetition, and find structure that removes it. Preserve correctness with a proof before implementation; adversarial tests and hypothesis-led debugging close the loop."
          ],
          "items": [
            "Read \u2192 constraints \u2192 brute force \u2192 bottleneck \u2192 observation \u2192 optimization \u2192 proof \u2192 implementation \u2192 adversarial test \u2192 debug.",
            "The intended outcome includes comfortable A/B work and some C capability; advanced algorithms are not all prerequisites for that outcome."
          ]
        },
        {
          "heading": "Map and feedback",
          "paragraphs": [
            "The long-form teaching overlay deepens the existing six stages rather than replacing them. Rating is feedback about performance and can fluctuate; it is not an identity or a substitute for retained skill."
          ],
          "items": [
            "0\u2013800: mechanics and implementation familiarity.",
            "800\u20131000: recognize common easy patterns.",
            "1000\u20131200: combine basic patterns.",
            "1200\u20131400: emphasize Div 2 A/B reasoning and debugging.",
            "1400+: deepen breadth and unfamiliar transfer.",
            "Overlay: orientation/foundations \u2192 foundations/core/guided work \u2192 recognition/practice \u2192 intermediate/advanced concepts \u2192 integration/application \u2192 diagnostics/mastery/retention."
          ]
        }
      ],
      "exercises": [],
      "criteria": [
        "Judge the mission by repeatable reasoning, implementation, debugging, transfer, retention and multiple contest results, not reading completion."
      ],
      "recovery": "Resume the saved work checkpoint with a short recall task; use observed weakness to select repair rather than copying the source's example state."
    },
    {
      "id": "algorithm-module-01",
      "sourceId": "Module 01",
      "title": "Contest Mechanics",
      "phaseId": "stage-0",
      "role": "checkpoint",
      "pages": [
        6,
        7,
        8,
        9,
        10
      ],
      "summary": "Execute the read\u2013choose\u2013implement\u2013submit\u2013verdict\u2013review loop and distinguish samples from a correctness argument.",
      "action": "Scan a small contest, formalize each task and its constraints, and choose the clearest first problem.",
      "minutes": 40,
      "concepts": [
        "problem",
        "input",
        "output",
        "constraints",
        "verdict",
        "submission",
        "virtual contest",
        "upsolve",
        "practice versus rated",
        "live versus virtual",
        "single versus multiple test cases"
      ],
      "sections": [
        {
          "heading": "Mental model and worked reasoning",
          "paragraphs": [
            "A contest is a sequence of testable solution hypotheses with limited time. Platform fluency frees attention for reasoning. A very large n already rules out blind enumeration; scan the set and start with a task whose formal output and bounds are clear."
          ],
          "items": [
            "Read constraints first; treat samples as evidence, never an exhaustive proof.",
            "Distinguish practice/rated contests, live/virtual participation and single/multiple-test input formats."
          ]
        },
        {
          "heading": "Failure boundaries and transfer",
          "paragraphs": [
            "Premature coding often causes misinterpreted output; ignoring bounds causes TLE. The same requirements discipline helps production engineering."
          ],
          "items": [
            "Do not begin before input and output are understood.",
            "Do not assume sample success establishes general correctness."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named-pattern practice",
          "level": "L1\u2013L3",
          "task": "Complete a standard contest-mechanics example with its pattern supplied.",
          "page": 9
        },
        {
          "title": "Independent reproduction",
          "level": "L2\u2013L3",
          "task": "Repeat a standard contest workflow without notes.",
          "page": 9
        },
        {
          "title": "Changed-constraint practice",
          "level": "L4",
          "task": "Adapt a contest-mechanics example after one constraint changes.",
          "page": 9
        },
        {
          "title": "Unlabeled solve",
          "level": "L6",
          "task": "Complete a mechanics transfer problem without a topic label.",
          "page": 9
        },
        {
          "title": "Broken implementation",
          "level": "L7",
          "task": "Diagnose and repair a deliberately broken contest-workflow implementation.",
          "page": 9
        },
        {
          "title": "Constraint-only classification",
          "level": "L1",
          "task": "Hide the label and classify a contest task using its constraints.",
          "page": 9
        },
        {
          "title": "Counterexample drill",
          "level": "L7",
          "task": "Construct a counterexample to a tempting wrong contest-task approach.",
          "page": 9
        },
        {
          "title": "Tiny oracle comparison",
          "level": "L8",
          "task": "Compare the chosen method with brute force on tiny inputs.",
          "page": 9
        },
        {
          "title": "Contest Mechanics timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes: one recognition, one reproduction, one transfer and one adversarial-debug task.",
          "page": 9
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain the contest-task state or invariant without notes.",
          "page": 9
        },
        {
          "title": "Resource estimate",
          "level": "Diagnostic",
          "task": "State time and memory complexity for the selected method.",
          "page": 9
        },
        {
          "title": "Invalidity condition",
          "level": "Diagnostic",
          "task": "Name a condition that invalidates the method.",
          "page": 9
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe one input that attacks the claimed invariant.",
          "page": 10
        }
      ],
      "criteria": [
        "Execute a standard contest task independently, explain its reasoning and solve at least one unnamed transfer task."
      ],
      "recovery": "Repair interpretation or constraint analysis first; repeat the weakest practice level before advancing."
    },
    {
      "id": "algorithm-module-02",
      "sourceId": "Module 02",
      "title": "Ratings, Divisions, and Contest Etiquette",
      "phaseId": "stage-0",
      "role": "checkpoint",
      "pages": [
        10,
        11,
        12,
        13,
        14
      ],
      "summary": "Use contest metrics and postmortems to locate learning gaps rather than treating one rating change as a skill verdict.",
      "action": "Classify a contest's problems as quick solve, slow solve, editorial-assisted or still unclear.",
      "minutes": 30,
      "concepts": [
        "rating",
        "rank",
        "division",
        "penalty",
        "virtual contest",
        "upsolve",
        "live versus virtual review",
        "contest formats",
        "postmortem"
      ],
      "sections": [
        {
          "heading": "Metrics as noisy evidence",
          "paragraphs": [
            "Performance varies with problem fit, bugs and fatigue. A rating summarizes a noisy observation; reviewing each problem converts that observation into a repair plan."
          ],
          "items": [
            "Use contests to expose gaps and upsolving to turn misses into learning.",
            "Separate quick solves, slow solves, editorial-assisted work and unresolved problems.",
            "Contest formats and live versus virtual review are meaningful variations."
          ]
        },
        {
          "heading": "Failure and professional connection",
          "paragraphs": [
            "Refreshing standings instead of reviewing, avoiding contests after a poor result, or repeatedly competing without learning all weaken progress. Engineering metrics likewise need interpretation rather than identity claims."
          ],
          "items": [
            "The source names etiquette but does not provide a detailed platform-rule checklist; it must not be invented here."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named-pattern practice",
          "level": "L1\u2013L3",
          "task": "Work a standard ratings/divisions example with the pattern named.",
          "page": 13
        },
        {
          "title": "Independent reproduction",
          "level": "L2\u2013L3",
          "task": "Repeat a standard contest-feedback exercise without notes.",
          "page": 13
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the ratings/divisions exercise to a changed constraint.",
          "page": 14
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar contest-feedback task without a topic hint.",
          "page": 14
        },
        {
          "title": "Broken implementation",
          "level": "L7",
          "task": "Repair a deliberately broken implementation in this module's context.",
          "page": 14
        },
        {
          "title": "Constraint classification",
          "level": "L1",
          "task": "Classify an unlabeled task from constraints alone.",
          "page": 14
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Refute a tempting wrong approach with a concrete counterexample.",
          "page": 14
        },
        {
          "title": "Tiny brute-force check",
          "level": "L8",
          "task": "Compare the method with brute force on tiny inputs.",
          "page": 14
        },
        {
          "title": "Ratings and Divisions timed set",
          "level": "Timed",
          "task": "Spend 30\u201345 minutes on recognition, reproduction, transfer and adversarial debugging, one task each.",
          "page": 14
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain the relevant state/invariant without notes.",
          "page": 14
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 14
        },
        {
          "title": "Applicability boundary",
          "level": "Diagnostic",
          "task": "Give a condition where the method is invalid.",
          "page": 14
        },
        {
          "title": "Adversarial case",
          "level": "Diagnostic",
          "task": "Describe one adversarial input.",
          "page": 14
        }
      ],
      "criteria": [
        "Independently perform the standard exercise, explain the reasoning and complete at least one transfer task without a named hint."
      ],
      "recovery": "Return to postmortem classification and upsolving rather than standings; repeat the weakest exercise level."
    },
    {
      "id": "algorithm-module-03",
      "sourceId": "Module 03",
      "title": "Fast I/O and C# Contest Template",
      "phaseId": "stage-0",
      "role": "checkpoint",
      "pages": [
        14,
        15,
        16,
        17,
        18,
        19
      ],
      "summary": "Build a small scanner/Solve/output boundary that handles numeric ranges and input structure without opaque copied machinery.",
      "action": "Write an isolated scanner test for 3 10 20 30, negatives and EOF; explain each template component.",
      "minutes": 45,
      "concepts": [
        "token stream",
        "buffer",
        "parser",
        "StringBuilder",
        "test case",
        "Solve",
        "long",
        "line parsing",
        "token parsing",
        "StringReader",
        "byte-buffer scanner",
        "EOF",
        "negative numbers",
        "overflow"
      ],
      "sections": [
        {
          "heading": "Input as an adapter",
          "paragraphs": [
            "The scanner converts incoming tokens to typed values while Solve owns the algorithm. For the sequence 3 10 20 30, token retrieval must preserve order. Choose long from the bounds and buffer large output."
          ],
          "items": [
            "Explain every template line; do not depend on a framework you cannot debug.",
            "Compare line-based parsing, token parsing, local StringReader tests and a byte-buffer scanner."
          ]
        },
        {
          "heading": "Failure boundaries",
          "paragraphs": [
            "Blind copying, arithmetic overflow and mixed parser/algorithm state obscure failures. Test EOF, negative-number handling and exact output formatting separately. Isolating infrastructure mirrors a useful production design boundary."
          ],
          "items": [
            "The compact reference on page 83 is explanatory material, not a verified drop-in executable template; see its reference unit and review notes."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named-template practice",
          "level": "L1\u2013L3",
          "task": "Implement a standard I/O example with the approach supplied.",
          "page": 18
        },
        {
          "title": "Independent template",
          "level": "L2\u2013L3",
          "task": "Rebuild the standard scanner and output flow without notes.",
          "page": 18
        },
        {
          "title": "Changed input constraint",
          "level": "L4",
          "task": "Adapt the template after an input or numeric constraint changes.",
          "page": 18
        },
        {
          "title": "Unlabeled I/O transfer",
          "level": "L6",
          "task": "Solve an unfamiliar parsing/output task without a pattern hint.",
          "page": 18
        },
        {
          "title": "Broken parser",
          "level": "L7",
          "task": "Diagnose a deliberately broken I/O implementation.",
          "page": 18
        },
        {
          "title": "Constraint classification",
          "level": "L1",
          "task": "Choose an approach from input constraints with the topic hidden.",
          "page": 18
        },
        {
          "title": "Parser counterexample",
          "level": "L7",
          "task": "Construct an input that defeats a tempting incorrect parser approach.",
          "page": 18
        },
        {
          "title": "Tiny comparison",
          "level": "L8",
          "task": "Compare the chosen implementation with an obvious tiny-input baseline.",
          "page": 18
        },
        {
          "title": "Fast I/O timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial-debug tasks.",
          "page": 18
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain scanner/template state without notes.",
          "page": 19
        },
        {
          "title": "Resource estimate",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 19
        },
        {
          "title": "Invalidity condition",
          "level": "Diagnostic",
          "task": "Name a condition where the implementation is unsuitable.",
          "page": 19
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a parser or output edge case.",
          "page": 19
        }
      ],
      "criteria": [
        "Explain and independently implement the standard form; complete a transfer task without a named hint."
      ],
      "recovery": "Separate scanner from Solve and test negatives, zero, EOF and large input; repair only the failing capability."
    },
    {
      "id": "algorithm-module-04",
      "sourceId": "Module 04",
      "title": "First Practice Contest",
      "phaseId": "stage-0",
      "role": "checkpoint",
      "pages": [
        19,
        20,
        21,
        22,
        23
      ],
      "summary": "Run a first contest as a readiness experiment, recording selection, implementation and debugging friction in a postmortem.",
      "action": "Scan a short contest, select the highest-confidence task and record time, submissions and failure causes.",
      "minutes": 45,
      "concepts": [
        "triage",
        "time budget",
        "postmortem",
        "upsolve",
        "confidence-adjusted selection",
        "switching",
        "short contest",
        "virtual contest",
        "single-problem sprint",
        "sunk cost"
      ],
      "sections": [
        {
          "heading": "Readiness experiment",
          "paragraphs": [
            "The first contest checks the whole system rather than judging identity. It reveals whether tooling, statement reading, typing or debugging is the main constraint. Scan first, choose by confidence and record where time went."
          ],
          "items": [
            "Use confidence-adjusted progress, deliberate switching and a postmortem.",
            "Short contests, virtual contests and single-problem sprints are alternatives."
          ]
        },
        {
          "heading": "Failure and transfer",
          "paragraphs": [
            "Spending the entire session on one problem creates sunk-cost and time-blindness failures. Skipping review discards the experiment's value. This has the same learning role as an engineering readiness drill."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Guided first-contest task",
          "level": "L1\u2013L3",
          "task": "Complete a standard first-contest exercise with its pattern named.",
          "page": 22
        },
        {
          "title": "Independent contest task",
          "level": "L2\u2013L3",
          "task": "Repeat a standard task without notes.",
          "page": 22
        },
        {
          "title": "Changed contest constraint",
          "level": "L4",
          "task": "Adapt the exercise to a changed constraint.",
          "page": 22
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar first-contest task without a topic label.",
          "page": 22
        },
        {
          "title": "Broken implementation",
          "level": "L7",
          "task": "Diagnose a deliberately broken contest solution.",
          "page": 22
        },
        {
          "title": "Constraint classification",
          "level": "L1",
          "task": "Classify a hidden-label task from its constraints.",
          "page": 22
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting wrong approach.",
          "page": 22
        },
        {
          "title": "Tiny brute-force comparison",
          "level": "L8",
          "task": "Compare the chosen method against brute force on small inputs.",
          "page": 22
        },
        {
          "title": "First Practice Contest timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes: recognition, reproduction, transfer and adversarial debugging, one task each.",
          "page": 22
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain the task's state or invariant without notes.",
          "page": 22
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "Give time and memory complexity.",
          "page": 22
        },
        {
          "title": "Invalidity boundary",
          "level": "Diagnostic",
          "task": "Identify where the method would fail.",
          "page": 22
        },
        {
          "title": "Adversarial case",
          "level": "Diagnostic",
          "task": "Describe one adversarial input.",
          "page": 22
        }
      ],
      "criteria": [
        "Pass the shared independent-standard/reasoning/unnamed-transfer gate.",
        "Meet Stage 0 evidence: an explainable tested template and a completed small practice contest with a postmortem."
      ],
      "recovery": "Use the recorded bottleneck to repair tooling, interpretation or debugging; repeat a shorter set instead of restarting."
    },
    {
      "id": "algorithm-module-05",
      "sourceId": "Module 05",
      "title": "Loops and Invariants",
      "phaseId": "stage-1",
      "role": "checkpoint",
      "pages": [
        23,
        24
      ],
      "summary": "Define what a loop has processed and what its state means so transitions and boundaries can be checked.",
      "action": "Sum an array while writing the processed-index range and accumulator meaning before each iteration.",
      "minutes": 40,
      "concepts": [
        "counter",
        "accumulator",
        "invariant",
        "sentinel",
        "boundary discipline",
        "early exit",
        "for",
        "while",
        "nested loops",
        "reverse scans"
      ],
      "sections": [
        {
          "heading": "State model and reasoning",
          "paragraphs": [
            "Each iteration changes state while an invariant summarizes the already-processed portion. For an array sum, the accumulator should equal exactly the consumed elements, not an ambiguously defined prefix."
          ],
          "items": [
            "State the consumed indices before the update.",
            "Check boundary discipline, accumulator meaning and early termination.",
            "Vary for/while, nested loops and reverse scans; apply the shared Stage 1 failure lens."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named loop pattern",
          "level": "L1\u2013L3",
          "task": "Solve a standard loop example with the pattern supplied.",
          "page": 24
        },
        {
          "title": "Recall and reproduce",
          "level": "L2\u2013L3",
          "task": "Implement a standard loop task without notes.",
          "page": 24
        },
        {
          "title": "Modify a constraint",
          "level": "L4",
          "task": "Adapt a loop solution after a constraint changes.",
          "page": 24
        },
        {
          "title": "Unlabeled solve",
          "level": "L6",
          "task": "Solve an unfamiliar loop task without a topic label.",
          "page": 24
        },
        {
          "title": "Broken loop",
          "level": "L7",
          "task": "Repair a deliberately broken loop implementation.",
          "page": 24
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify an unlabeled problem from its constraints.",
          "page": 24
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting wrong loop approach.",
          "page": 24
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the loop method with brute force on tiny inputs.",
          "page": 24
        },
        {
          "title": "Loops timed set",
          "level": "Timed",
          "task": "In 30\u201345 minutes do one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 24
        },
        {
          "title": "Invariant recall",
          "level": "Diagnostic",
          "task": "Explain state or invariant without notes.",
          "page": 24
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 24
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition where the method is invalid.",
          "page": 24
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a boundary-attacking input.",
          "page": 24
        }
      ],
      "criteria": [
        "Independently reproduce a standard form, explain its invariant and solve at least one unlabeled transfer task."
      ],
      "recovery": "Write boundary meanings and trace tiny cases; repeat the weakest exercise level."
    },
    {
      "id": "algorithm-module-06",
      "sourceId": "Module 06",
      "title": "Arrays as State",
      "phaseId": "stage-1",
      "role": "checkpoint",
      "pages": [
        24,
        25
      ],
      "summary": "Use indexed storage for aggregation and transformation while keeping only state required by the output.",
      "action": "Find minimum and maximum in one pass; explain each stored value and whether a second array is necessary.",
      "minutes": 40,
      "concepts": [
        "index",
        "length",
        "in-place",
        "auxiliary array",
        "direct indexing",
        "one-pass scan",
        "boundary checks",
        "1D",
        "2D",
        "copy versus in-place"
      ],
      "sections": [
        {
          "heading": "Representation and worked reasoning",
          "paragraphs": [
            "An array index is useful when position itself carries needed information. A min/max scan illustrates how a small summary can replace unnecessary retained data."
          ],
          "items": [
            "Choose state by the final query.",
            "Compare one-dimensional and two-dimensional storage.",
            "Defend copying versus in-place transformation and check index bounds.",
            "Use the shared Stage 1 failure and professional-transfer guidance."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named array pattern",
          "level": "L1\u2013L3",
          "task": "Solve a standard array example with its pattern named.",
          "page": 25
        },
        {
          "title": "Independent reproduction",
          "level": "L2\u2013L3",
          "task": "Implement a standard array task without notes.",
          "page": 25
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt an array task to a changed requirement.",
          "page": 25
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar array problem without a label.",
          "page": 25
        },
        {
          "title": "Broken array code",
          "level": "L7",
          "task": "Repair a deliberately broken array implementation.",
          "page": 25
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label problem from constraints.",
          "page": 25
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Refute a tempting array approach with a small case.",
          "page": 25
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the selected array method with brute force.",
          "page": 25
        },
        {
          "title": "Arrays timed set",
          "level": "Timed",
          "task": "Use 30\u201345 minutes for one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 25
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain the stored state without notes.",
          "page": 25
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 25
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name an invalidating condition.",
          "page": 25
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a case attacking array boundaries or state.",
          "page": 25
        }
      ],
      "criteria": [
        "Perform the standard task independently, explain state and complete at least one unnamed transfer solve."
      ],
      "recovery": "Trace indices and state on tiny inputs; repair the dominant bug class before repeating the weakest level."
    },
    {
      "id": "algorithm-module-07",
      "sourceId": "Module 07",
      "title": "Strings and Character Accounting",
      "phaseId": "stage-1",
      "role": "checkpoint",
      "pages": [
        25,
        26,
        27
      ],
      "summary": "Translate verbal string rules into explicit scans, counts, comparisons and output construction.",
      "action": "Write the case and whitespace rules for a character-count task before choosing token or line input.",
      "minutes": 40,
      "concepts": [
        "char",
        "token",
        "line",
        "StringBuilder",
        "scan",
        "count",
        "compare",
        "output construction",
        "spaces",
        "case rules",
        "Unicode",
        "token boundaries"
      ],
      "sections": [
        {
          "heading": "Sequence model and boundaries",
          "paragraphs": [
            "Treat a string as symbols processed by scan plus state. Counting characters or normalizing case is only correct after the transformation rules are separated from the input representation."
          ],
          "items": [
            "Explicitly handle spaces, case and Unicode/token boundaries.",
            "Decide whether to read a token or a full line.",
            "Apply the shared Stage 1 checks for off-by-one errors, unusual input and avoidable complexity."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named string pattern",
          "level": "L1\u2013L3",
          "task": "Solve a standard string example with its pattern supplied.",
          "page": 26
        },
        {
          "title": "Independent string task",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard string solution without notes.",
          "page": 26
        },
        {
          "title": "Changed string rule",
          "level": "L4",
          "task": "Adapt a string solution after one constraint changes.",
          "page": 26
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar string task without a topic hint.",
          "page": 26
        },
        {
          "title": "Broken string code",
          "level": "L7",
          "task": "Diagnose a deliberately broken transformation.",
          "page": 26
        },
        {
          "title": "Constraint classification",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints alone.",
          "page": 26
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting string approach.",
          "page": 27
        },
        {
          "title": "Tiny comparison",
          "level": "L8",
          "task": "Compare the optimized method with brute force on tiny strings.",
          "page": 27
        },
        {
          "title": "Strings timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes containing one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 27
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain string state/invariant without notes.",
          "page": 27
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory complexity.",
          "page": 27
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a rule change that invalidates the method.",
          "page": 27
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe one adversarial string.",
          "page": 27
        }
      ],
      "criteria": [
        "Independently execute the standard form, explain its reasoning and complete an unnamed transfer problem."
      ],
      "recovery": "Separate input boundaries from transformation rules and drill the weakest capability."
    },
    {
      "id": "algorithm-module-08",
      "sourceId": "Module 08",
      "title": "Simulation",
      "phaseId": "stage-1",
      "role": "checkpoint",
      "pages": [
        27,
        28
      ],
      "summary": "Convert an event-driven verbal process into minimal state and deterministic transitions.",
      "action": "List the state variables and write the effect of one score-update event before coding a loop.",
      "minutes": 40,
      "concepts": [
        "state",
        "event",
        "transition",
        "invariant",
        "state minimization",
        "event order",
        "grid simulation",
        "score simulation",
        "resource simulation",
        "movement"
      ],
      "sections": [
        {
          "heading": "Small deterministic machine",
          "paragraphs": [
            "A simulation is a machine whose next state follows from the current state and event. Many easy contest tasks reward precise updates rather than a more advanced algorithm."
          ],
          "items": [
            "Use score changes as the first transition example.",
            "Minimize state, preserve event order and verify transition correctness.",
            "Transfer the model to grid, resource and movement processes; use shared Stage 1 failure checks."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named simulation",
          "level": "L1\u2013L3",
          "task": "Solve a standard simulation with the pattern named.",
          "page": 28
        },
        {
          "title": "Independent simulation",
          "level": "L2\u2013L3",
          "task": "Reproduce the standard form without notes.",
          "page": 28
        },
        {
          "title": "Changed transition constraint",
          "level": "L4",
          "task": "Adapt the simulation to a changed constraint.",
          "page": 28
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve a differently presented simulation without a hint.",
          "page": 28
        },
        {
          "title": "Broken transition",
          "level": "L7",
          "task": "Repair a deliberately broken simulation.",
          "page": 28
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify an unlabeled task from its constraints.",
          "page": 28
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Build a case refuting a tempting simulation approach.",
          "page": 28
        },
        {
          "title": "Tiny baseline",
          "level": "L8",
          "task": "Compare the method with brute force on tiny inputs.",
          "page": 28
        },
        {
          "title": "Simulation timed set",
          "level": "Timed",
          "task": "Spend 30\u201345 minutes on recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 28
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain state and invariant without notes.",
          "page": 28
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 28
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition where the method fails.",
          "page": 28
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe an input attacking event order or state updates.",
          "page": 28
        }
      ],
      "criteria": [
        "Independently implement the standard process, explain it and solve at least one unnamed transfer task."
      ],
      "recovery": "Trace one event at a time and repair the weakest transition or boundary skill."
    },
    {
      "id": "algorithm-module-09",
      "sourceId": "Module 09",
      "title": "Prefix Sums",
      "phaseId": "stage-1",
      "role": "checkpoint",
      "pages": [
        28,
        29,
        30
      ],
      "summary": "Replace repeated static range traversal with a difference of precisely defined cumulative states.",
      "action": "Define a prefix array of length n+1 and derive sum(l,r)=pref[r+1]-pref[l] for inclusive endpoints.",
      "minutes": 45,
      "concepts": [
        "prefix",
        "inclusive range",
        "half-open range",
        "range query",
        "precomputation",
        "O(1) query",
        "long sums",
        "2D prefix",
        "prefix counts",
        "prefix XOR"
      ],
      "sections": [
        {
          "heading": "Accumulated-state subtraction",
          "paragraphs": [
            "Overlapping queries repeat the same work. Precompute cumulative information once, then subtract the state before the range from the state through its end. The formula follows the definition; it must not be recalled without its endpoint convention."
          ],
          "items": [
            "For an n+1 prefix representation, inclusive sum(l,r) is pref[r+1]-pref[l].",
            "Use a safe wide type for accumulated sums.",
            "Explore 2D prefixes, counts and XOR; keep boundaries and operation assumptions explicit."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named prefix task",
          "level": "L1\u2013L3",
          "task": "Solve a standard prefix example with the pattern supplied.",
          "page": 29
        },
        {
          "title": "Independent prefix task",
          "level": "L2\u2013L3",
          "task": "Reproduce the standard form without notes.",
          "page": 29
        },
        {
          "title": "Changed range constraint",
          "level": "L4",
          "task": "Adapt a prefix solution after one constraint changes.",
          "page": 29
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar prefix application without a label.",
          "page": 29
        },
        {
          "title": "Broken prefix code",
          "level": "L7",
          "task": "Repair a deliberately broken prefix implementation.",
          "page": 29
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label problem from constraints.",
          "page": 29
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct an input defeating a tempting wrong formula.",
          "page": 29
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare range answers with direct summation on tiny arrays.",
          "page": 29
        },
        {
          "title": "Prefix Sums timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 29
        },
        {
          "title": "Prefix-state recall",
          "level": "Diagnostic",
          "task": "Explain the prefix invariant without notes.",
          "page": 29
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 29
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the method.",
          "page": 30
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe an input attacking endpoint or numeric assumptions.",
          "page": 30
        }
      ],
      "criteria": [
        "Independently reproduce prefix queries, explain the definition and solve an unnamed transfer problem."
      ],
      "recovery": "Write what each boundary contains and hand-check three tiny cases before returning to the weakest level."
    },
    {
      "id": "algorithm-module-10",
      "sourceId": "Module 10",
      "title": "Basic Sorting",
      "phaseId": "stage-1",
      "role": "checkpoint",
      "pages": [
        30,
        31
      ],
      "summary": "Use ordering to expose equal-value runs and magnitude relationships without losing required original-order information.",
      "action": "Sort values and count equal-value runs, then state whether the output needs original indices.",
      "minutes": 40,
      "concepts": [
        "comparator",
        "ascending",
        "descending",
        "key",
        "sort and scan",
        "sort pairs",
        "preserve indices",
        "custom comparer",
        "partial sorting"
      ],
      "sections": [
        {
          "heading": "Ordering as a transformation",
          "paragraphs": [
            "Sorting removes arbitrary order so equality groups and relative sizes become easy to scan. Before applying it, decide whether original order is part of the required answer."
          ],
          "items": [
            "Start with sorting and counting equal-value runs.",
            "Vary keys, paired values and preserved indices.",
            "Compare custom comparers and partial sorting; apply shared Stage 1 boundary and complexity checks."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named sorting task",
          "level": "L1\u2013L3",
          "task": "Solve a standard sorting example with the pattern supplied.",
          "page": 31
        },
        {
          "title": "Independent sorting",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard sorting solution without notes.",
          "page": 31
        },
        {
          "title": "Changed ordering constraint",
          "level": "L4",
          "task": "Adapt the solution when one constraint changes.",
          "page": 31
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve a sorting transfer problem without a topic label.",
          "page": 31
        },
        {
          "title": "Broken sorting code",
          "level": "L7",
          "task": "Diagnose a deliberately broken implementation.",
          "page": 31
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify the task from constraints with its label hidden.",
          "page": 31
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Find a case defeating a tempting sorting approach.",
          "page": 31
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the method with brute force on tiny inputs.",
          "page": 31
        },
        {
          "title": "Sorting timed set",
          "level": "Timed",
          "task": "Use 30\u201345 minutes for one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 31
        },
        {
          "title": "Invariant recall",
          "level": "Diagnostic",
          "task": "Explain the state/invariant without notes.",
          "page": 31
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 31
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition that makes sorting unsuitable.",
          "page": 31
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe one adversarial input.",
          "page": 31
        }
      ],
      "criteria": [
        "Reproduce independently, explain the reasoning and solve at least one unnamed transfer task."
      ],
      "recovery": "Recheck the output's ordering contract and drill the weakest boundary, representation or complexity skill."
    },
    {
      "id": "algorithm-module-11",
      "sourceId": "Module 11",
      "title": "Frequency Arrays",
      "phaseId": "stage-1",
      "role": "checkpoint",
      "pages": [
        31,
        32
      ],
      "summary": "Use values as bucket indices when the domain is small enough for direct counting.",
      "action": "Count digits with freq[d]++, then compare array and map storage for a sparse large domain.",
      "minutes": 35,
      "concepts": [
        "frequency",
        "domain",
        "bucket",
        "histogram",
        "bounded domain",
        "counting",
        "letters",
        "digits",
        "residues",
        "array versus map",
        "sparsity"
      ],
      "sections": [
        {
          "heading": "Value-to-bucket model",
          "paragraphs": [
            "A bounded value becomes its own count index, often simplifying lookup compared with a map. Domain size and sparsity determine whether that representation is appropriate."
          ],
          "items": [
            "Digit counting uses freq[d]++.",
            "Transfer the bucket idea to letters and residues.",
            "Check legal indices, unexpected values and representation cost using the Stage 1 failure lens."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named frequency task",
          "level": "L1\u2013L3",
          "task": "Solve a standard frequency-array example with a named pattern.",
          "page": 32
        },
        {
          "title": "Independent counting",
          "level": "L2\u2013L3",
          "task": "Reproduce the standard form without notes.",
          "page": 32
        },
        {
          "title": "Changed domain",
          "level": "L4",
          "task": "Adapt counting after a domain constraint changes.",
          "page": 32
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve a disguised counting task without a topic hint.",
          "page": 32
        },
        {
          "title": "Broken counts",
          "level": "L7",
          "task": "Repair a deliberately broken counting implementation.",
          "page": 32
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 32
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting counting approach.",
          "page": 32
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare bucket counts with brute force on tiny inputs.",
          "page": 32
        },
        {
          "title": "Frequency timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 32
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain frequency state without notes.",
          "page": 32
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 32
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating direct indexing.",
          "page": 32
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a case attacking the chosen domain.",
          "page": 32
        }
      ],
      "criteria": [
        "Independently reproduce the standard form, explain the representation and solve an unnamed transfer task."
      ],
      "recovery": "Re-evaluate domain size and sparsity, then repeat the weakest exercise level."
    },
    {
      "id": "algorithm-module-12",
      "sourceId": "Module 12",
      "title": "Div 4 A\u2013D Integration",
      "phaseId": "stage-1",
      "role": "checkpoint",
      "pages": [
        32,
        33,
        34
      ],
      "summary": "Combine implementation techniques under a clock until simple tasks no longer consume all reasoning capacity.",
      "action": "Scan a mixed strings/simulation/sorting/arithmetic set, select by confidence and record a postmortem.",
      "minutes": 45,
      "concepts": [
        "integration",
        "triage",
        "upsolve",
        "mixed sets",
        "virtual contests",
        "confidence-adjusted selection",
        "edge-case testing",
        "postmortem",
        "Div 4 A\u2013D"
      ],
      "sections": [
        {
          "heading": "Fluency pipeline",
          "paragraphs": [
            "A mixed set tests whether implementation has stopped being the bottleneck. Scan, choose, solve, test, submit and record, using confidence rather than problem order alone."
          ],
          "items": [
            "Combine strings, simulation, sorting and arithmetic.",
            "Use mixed practice and virtual contests.",
            "Apply the shared Stage 1 exit and recovery table, not a calendar deadline."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named integration task",
          "level": "L1\u2013L3",
          "task": "Solve a standard mixed implementation task with its pattern named.",
          "page": 33
        },
        {
          "title": "Independent integration",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard task without notes.",
          "page": 33
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt a mixed solution to a changed constraint.",
          "page": 33
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar mixed task without labels.",
          "page": 33
        },
        {
          "title": "Broken mixed solution",
          "level": "L7",
          "task": "Diagnose a deliberately broken implementation.",
          "page": 33
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify an unlabeled problem from constraints.",
          "page": 33
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case refuting a tempting approach.",
          "page": 33
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the chosen method with brute force on tiny inputs.",
          "page": 33
        },
        {
          "title": "Div 4 integration timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes: one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 34
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain state/invariant without notes.",
          "page": 34
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 34
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name an invalidating condition.",
          "page": 34
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe one adversarial input.",
          "page": 34
        },
        {
          "title": "Recognition repair",
          "level": "Recovery",
          "task": "Classify 15 easy statements if recognition is the failed Stage 1 capability.",
          "page": 34
        },
        {
          "title": "Reproduction repair",
          "level": "Recovery",
          "task": "Redo five old problems if independent reproduction is weak.",
          "page": 34
        },
        {
          "title": "Modification repair",
          "level": "Recovery",
          "task": "Alter three accepted solutions if constraint adaptation is weak.",
          "page": 34
        },
        {
          "title": "Failure-handling repair",
          "level": "Recovery",
          "task": "Debug broken snippets if diagnosis is weak.",
          "page": 34
        },
        {
          "title": "Timed repair",
          "level": "Recovery",
          "task": "Repeat a shorter timed set if the timed demonstration is weak.",
          "page": 34
        }
      ],
      "criteria": [
        "Pass the shared independent-standard/reasoning/transfer gate.",
        "Meet Stage 1 recognition, reproduction, modification, diagnosis and timed-set requirements; Div 4 A\u2013D should be comfortable implementation work."
      ],
      "recovery": "Choose the specific Stage 1 repair matching evidence; do not substitute more volume or restart the stage."
    },
    {
      "id": "algorithm-module-13",
      "sourceId": "Module 13",
      "title": "Two Pointers",
      "phaseId": "stage-2",
      "role": "checkpoint",
      "pages": [
        35,
        36
      ],
      "summary": "Replace nested search with two indices only when ordering proves each movement safe.",
      "action": "For sorted pair sum, prove which candidates are eliminated when either endpoint moves.",
      "minutes": 45,
      "concepts": [
        "left/right",
        "slow/fast",
        "monotonic movement",
        "sorted pair sum",
        "partition scans",
        "opposite ends",
        "same direction"
      ],
      "sections": [
        {
          "heading": "Movement is a proof obligation",
          "paragraphs": [
            "For a sorted array with an undersized pair sum, increasing the smaller endpoint may be safe because ordering bounds the rejected candidates. Explain why no solution is skipped before coding."
          ],
          "items": [
            "Recognize sorted data, monotonic movement and partition scans.",
            "Compare opposite-end and same-direction variants.",
            "Use the Stage 2 warning against choosing a familiar technique with an unjustified invariant."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named pointer task",
          "level": "L1\u2013L3",
          "task": "Solve a standard two-pointer example with the pattern named.",
          "page": 35
        },
        {
          "title": "Independent pointers",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard pointer solution without notes.",
          "page": 35
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt a two-pointer task to a changed constraint.",
          "page": 35
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve a disguised pointer problem without a label.",
          "page": 35
        },
        {
          "title": "Broken pointer code",
          "level": "L7",
          "task": "Repair a deliberately broken pointer implementation.",
          "page": 35
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 36
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting movement rule.",
          "page": 36
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare pointers with brute force on tiny inputs.",
          "page": 36
        },
        {
          "title": "Two Pointers timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 36
        },
        {
          "title": "Invariant recall",
          "level": "Diagnostic",
          "task": "Explain the pointer invariant without notes.",
          "page": 36
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory complexity.",
          "page": 36
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition making pointer movement unsafe.",
          "page": 36
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe one adversarial input.",
          "page": 36
        }
      ],
      "criteria": [
        "Independently reproduce the method, explain safe movement and solve an unnamed transfer problem."
      ],
      "recovery": "Rebuild the ordering argument and compare tiny cases with exhaustive search; repeat the weakest level."
    },
    {
      "id": "algorithm-module-14",
      "sourceId": "Module 14",
      "title": "Sliding Window",
      "phaseId": "stage-2",
      "role": "checkpoint",
      "pages": [
        36,
        37
      ],
      "summary": "Maintain a contiguous segment incrementally when validity supports monotonic boundary motion.",
      "action": "Trace longest segment with at most K distinct values: add right, shrink while invalid, then update the answer.",
      "minutes": 45,
      "concepts": [
        "window",
        "expand",
        "shrink",
        "validity",
        "frequency",
        "at-most constraints",
        "fixed window",
        "variable window",
        "contiguity",
        "amortized movement"
      ],
      "sections": [
        {
          "heading": "Incremental window machine",
          "paragraphs": [
            "The boundaries move monotonically while state tracks the current segment. Repeated subarray checking can become linear because each element enters and leaves once, assuming suitable state-update costs."
          ],
          "items": [
            "For at most K distinct values, add the right element, remove left elements while invalid, and record only valid windows.",
            "Contrast fixed-size and variable-size windows.",
            "Do not assume every contiguous-property problem has the monotonicity this method requires."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named window task",
          "level": "L1\u2013L3",
          "task": "Solve a standard window example with the pattern named.",
          "page": 37
        },
        {
          "title": "Independent window",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard window solution without notes.",
          "page": 37
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt a window solution after a constraint changes.",
          "page": 37
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar window task without a hint.",
          "page": 37
        },
        {
          "title": "Broken window",
          "level": "L7",
          "task": "Repair a deliberately broken window implementation.",
          "page": 37
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 37
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting window rule.",
          "page": 37
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare window answers with exhaustive tiny-subarray checks.",
          "page": 37
        },
        {
          "title": "Sliding Window timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 37
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain window state and invariant without notes.",
          "page": 37
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 37
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a property for which the window method is invalid.",
          "page": 37
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a case attacking validity or removal logic.",
          "page": 37
        }
      ],
      "criteria": [
        "Independently implement the standard form, explain its invariant and solve an unnamed transfer task."
      ],
      "recovery": "Trace added and removed state and prove the validity behavior; repair the weakest capability."
    },
    {
      "id": "algorithm-module-15",
      "sourceId": "Module 15",
      "title": "Binary Search",
      "phaseId": "stage-2",
      "role": "checkpoint",
      "pages": [
        37,
        38,
        39
      ],
      "summary": "Eliminate candidates using a maintained interval and a proved monotonic predicate.",
      "action": "Write a first-true invariant and trace both predicate outcomes before implementing the search.",
      "minutes": 45,
      "concepts": [
        "predicate",
        "lower bound",
        "first true",
        "last true",
        "answer space",
        "monotonicity",
        "boundary discipline",
        "exact search",
        "capacity search"
      ],
      "sections": [
        {
          "heading": "Candidate-interval model",
          "paragraphs": [
            "Binary search is not restricted to finding an array value. Ordering or monotonic feasibility permits logarithmically many decisions over a candidate interval."
          ],
          "items": [
            "Begin with the first position whose predicate is true.",
            "State the invariant before writing updates.",
            "Compare exact search, first/last true and capacity/answer-space search.",
            "The source's compact interval wording needs a no-true/sentinel clarification; the reference unit preserves that boundary warning."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named binary search",
          "level": "L1\u2013L3",
          "task": "Solve a standard binary-search example with the pattern named.",
          "page": 38
        },
        {
          "title": "Independent search",
          "level": "L2\u2013L3",
          "task": "Reproduce the standard search without notes.",
          "page": 38
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the search after one constraint changes.",
          "page": 38
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve a disguised binary-search task without a hint.",
          "page": 38
        },
        {
          "title": "Broken search",
          "level": "L7",
          "task": "Repair a deliberately broken search implementation.",
          "page": 38
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 38
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting search rule.",
          "page": 38
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare binary-search results with linear enumeration.",
          "page": 38
        },
        {
          "title": "Binary Search timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 38
        },
        {
          "title": "Invariant recall",
          "level": "Diagnostic",
          "task": "Explain the candidate interval without notes.",
          "page": 38
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs, including predicate work.",
          "page": 38
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the search.",
          "page": 38
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a boundary-attacking case.",
          "page": 38
        }
      ],
      "criteria": [
        "Independently implement the standard form, justify its interval and solve at least one unnamed transfer task."
      ],
      "recovery": "Define every boundary variable and hand-trace tiny cases; repair monotonicity or the weakest exercise level."
    },
    {
      "id": "algorithm-module-16",
      "sourceId": "Module 16",
      "title": "Greedy Thinking",
      "phaseId": "stage-2",
      "role": "checkpoint",
      "pages": [
        39,
        40
      ],
      "summary": "Replace exponential choice exploration with a local choice only after a safety argument.",
      "action": "Explain how an optimal interval schedule can exchange its first interval for the earliest-finishing choice.",
      "minutes": 45,
      "concepts": [
        "exchange argument",
        "dominance",
        "safe choice",
        "sort and scan",
        "counterexamples",
        "scheduling",
        "pairing",
        "resource selection"
      ],
      "sections": [
        {
          "heading": "Safe rather than attractive",
          "paragraphs": [
            "A greedy rule is useful when a proof shows its local choice can belong to an optimum. For interval scheduling, transform an optimal solution to include the selected earliest finish without worsening future feasibility."
          ],
          "items": [
            "Use exchange, dominance and sort/scan signals.",
            "Explore scheduling, pairing and resource selection.",
            "A plausible-looking rule is not sufficient; use counterexamples and the shared Stage 2 applicability warning."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named greedy task",
          "level": "L1\u2013L3",
          "task": "Solve a standard greedy example with the pattern named.",
          "page": 39
        },
        {
          "title": "Independent greedy",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard solution without notes.",
          "page": 39
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt a greedy task after a constraint changes.",
          "page": 39
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar greedy task without a label.",
          "page": 39
        },
        {
          "title": "Broken greedy code",
          "level": "L7",
          "task": "Repair a deliberately broken implementation.",
          "page": 39
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label problem from constraints.",
          "page": 40
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Refute a tempting wrong greedy rule with a concrete case.",
          "page": 40
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the greedy result with exhaustive tiny-input search.",
          "page": 40
        },
        {
          "title": "Greedy Thinking timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 40
        },
        {
          "title": "Invariant recall",
          "level": "Diagnostic",
          "task": "Explain the greedy state/invariant without notes.",
          "page": 40
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 40
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the greedy choice.",
          "page": 40
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe an adversarial case.",
          "page": 40
        }
      ],
      "criteria": [
        "Execute independently, explain the safety argument and solve an unnamed transfer problem."
      ],
      "recovery": "Stop coding, find a small counterexample and repair the exchange/invariant argument."
    },
    {
      "id": "algorithm-module-17",
      "sourceId": "Module 17",
      "title": "Maps and Sets",
      "phaseId": "stage-2",
      "role": "checkpoint",
      "pages": [
        40,
        41
      ],
      "summary": "Select keyed state for membership, counts, grouping or occurrences based on the query that must be answered.",
      "action": "For Two Sum, define the seen-value-to-index map and explain why that key supports the future complement lookup.",
      "minutes": 40,
      "concepts": [
        "key",
        "value",
        "membership",
        "expected O(1)",
        "frequency",
        "first occurrence",
        "last occurrence",
        "grouping",
        "Two Sum",
        "set",
        "map",
        "bounded-domain array"
      ],
      "sections": [
        {
          "heading": "Future-query-driven keys",
          "paragraphs": [
            "A set records whether a key has appeared; a map associates needed state with that key. Hash lookup avoids repeated searching, but the key should follow the future decision rather than syntax familiarity."
          ],
          "items": [
            "Two Sum can retain seen value \u2192 index.",
            "Choose counts, first/last occurrences or grouping state as required.",
            "Prefer an array when a bounded domain makes direct indexing simpler.",
            "Hash complexity is expected rather than an unconditional guarantee."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named keyed-state task",
          "level": "L1\u2013L3",
          "task": "Solve a standard map/set example with the pattern supplied.",
          "page": 41
        },
        {
          "title": "Independent keyed state",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard solution without notes.",
          "page": 41
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt keyed state after a constraint changes.",
          "page": 41
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar map/set task without labels.",
          "page": 41
        },
        {
          "title": "Broken map/set code",
          "level": "L7",
          "task": "Repair a deliberately broken keyed-state implementation.",
          "page": 41
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label problem from constraints.",
          "page": 41
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting state choice.",
          "page": 41
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare keyed lookup with brute force on tiny inputs.",
          "page": 41
        },
        {
          "title": "Maps and Sets timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 41
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain keys and stored state without notes.",
          "page": 41
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 41
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name an invalidating condition.",
          "page": 41
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe an input attacking occurrence or membership logic.",
          "page": 41
        }
      ],
      "criteria": [
        "Independently reproduce the method, explain key/state choice and solve at least one unnamed transfer task."
      ],
      "recovery": "Re-derive the key from the future query and drill the weakest recognition or implementation level."
    },
    {
      "id": "algorithm-module-18",
      "sourceId": "Module 18",
      "title": "Basic Number Theory",
      "phaseId": "stage-2",
      "role": "checkpoint",
      "pages": [
        41,
        42
      ],
      "summary": "Use arithmetic structure to replace simulation while checking multiplication and representation bounds.",
      "action": "Trace Euclid's gcd(a,b)=gcd(b,a mod b) and identify the largest intermediate value in an arithmetic task.",
      "minutes": 40,
      "concepts": [
        "divisibility",
        "gcd",
        "lcm",
        "parity",
        "residue",
        "modulus",
        "factor",
        "modular arithmetic",
        "periodicity",
        "Euclid",
        "single versus many queries",
        "numeric bounds"
      ],
      "sections": [
        {
          "heading": "Remainder-class structure",
          "paragraphs": [
            "Modulo keeps the information about a remainder class; parity, divisibility, gcd and periodicity can make large simulations unnecessary. Euclid's recurrence is a small example of preserving the required arithmetic property while shrinking work."
          ],
          "items": [
            "Check bounds before multiplication, not only the final result.",
            "Method choice changes with value size and number of queries.",
            "Apply the Stage 2 warning against using a correct arithmetic technique under the wrong assumptions."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named arithmetic task",
          "level": "L1\u2013L3",
          "task": "Solve a standard number-theory example with its pattern supplied.",
          "page": 42
        },
        {
          "title": "Independent arithmetic",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard solution without notes.",
          "page": 42
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the arithmetic method after bounds change.",
          "page": 42
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve a disguised arithmetic problem without labels.",
          "page": 42
        },
        {
          "title": "Broken arithmetic",
          "level": "L7",
          "task": "Repair a deliberately broken implementation.",
          "page": 42
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label problem from constraints.",
          "page": 42
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Find a case defeating a tempting arithmetic approach.",
          "page": 42
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the arithmetic reduction with brute force.",
          "page": 42
        },
        {
          "title": "Basic Number Theory timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 42
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain the invariant without notes.",
          "page": 42
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 42
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the method.",
          "page": 42
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a case attacking numeric assumptions.",
          "page": 42
        }
      ],
      "criteria": [
        "Independently execute the standard form, explain its arithmetic reasoning and solve an unnamed transfer task."
      ],
      "recovery": "Check numeric ranges and assumptions, compare small cases and repeat the weakest exercise level."
    },
    {
      "id": "algorithm-module-19",
      "sourceId": "Module 19",
      "title": "Intervals and Sweep Line",
      "phaseId": "stage-2",
      "role": "checkpoint",
      "pages": [
        43,
        44
      ],
      "summary": "Convert interval relationships into ordered events with explicit endpoint and tie semantics.",
      "action": "Create start +1 and end -1 events and decide equal-coordinate ordering from the endpoint convention.",
      "minutes": 45,
      "concepts": [
        "closed intervals",
        "half-open intervals",
        "event",
        "active count",
        "merge intervals",
        "maximum overlap",
        "event sweep",
        "tie rules",
        "coordinate scale"
      ],
      "sections": [
        {
          "heading": "Ordered active state",
          "paragraphs": [
            "Sorting starts and ends exposes overlap as a maintained active count. A sweep can replace repeated pairwise interval comparisons, but equality rules decide what an event at a shared endpoint means."
          ],
          "items": [
            "Use +1 start and -1 end events as the initial model.",
            "Explore merging and maximum simultaneous intervals.",
            "State endpoint conventions, event tie ordering and coordinate scale before implementation."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named interval task",
          "level": "L1\u2013L3",
          "task": "Solve a standard interval/sweep example with the pattern named.",
          "page": 43
        },
        {
          "title": "Independent sweep",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard sweep without notes.",
          "page": 43
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the interval method after a constraint changes.",
          "page": 43
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar interval task without labels.",
          "page": 43
        },
        {
          "title": "Broken sweep",
          "level": "L7",
          "task": "Repair a deliberately broken sweep implementation.",
          "page": 43
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label problem from constraints.",
          "page": 43
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting interval rule.",
          "page": 43
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the sweep with brute force on tiny cases.",
          "page": 44
        },
        {
          "title": "Intervals timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 44
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain active state and invariant without notes.",
          "page": 44
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 44
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name an invalidating condition.",
          "page": 44
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a case attacking endpoint or tie rules.",
          "page": 44
        }
      ],
      "criteria": [
        "Independently reproduce the method, explain event semantics and solve an unnamed transfer task."
      ],
      "recovery": "Write endpoint meanings and trace three tiny boundary cases; repeat the weakest level."
    },
    {
      "id": "algorithm-module-20",
      "sourceId": "Module 20",
      "title": "Pattern Combination",
      "phaseId": "stage-2",
      "role": "checkpoint",
      "pages": [
        44,
        45
      ],
      "summary": "Identify the expensive operation and compose the simplest known primitives that remove it without relying on topic labels.",
      "action": "Analyze an unlabeled task's bottleneck and compare sort+greedy, prefix+map and window+frequency possibilities.",
      "minutes": 45,
      "concepts": [
        "pattern signal",
        "invariant",
        "hybrid",
        "sort and greedy",
        "prefix and map",
        "window and frequency",
        "constraint-first selection",
        "multiple valid solutions",
        "simplest correct method"
      ],
      "sections": [
        {
          "heading": "Integration through bottlenecks",
          "paragraphs": [
            "Contest statements rarely announce their component patterns. Find the repeated expensive action first, then choose primitives that remove it and explain the role of each."
          ],
          "items": [
            "Compare sort+greedy, prefix+map and window+frequency.",
            "Multiple solutions can be valid; prefer a simple correct fit to the constraints.",
            "Use the full Stage 2 exit evidence, including repeated mixed sessions, rather than one labeled success."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named hybrid task",
          "level": "L1\u2013L3",
          "task": "Solve a standard combined-pattern example with the pattern named.",
          "page": 45
        },
        {
          "title": "Independent hybrid",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard combined solution without notes.",
          "page": 45
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the combination after one constraint changes.",
          "page": 45
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar hybrid task without labels.",
          "page": 45
        },
        {
          "title": "Broken combination",
          "level": "L7",
          "task": "Repair a deliberately broken combined implementation.",
          "page": 45
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label problem from constraints.",
          "page": 45
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting combination.",
          "page": 45
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the composed method with brute force.",
          "page": 45
        },
        {
          "title": "Pattern Combination timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 45
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain combined state/invariant without notes.",
          "page": 45
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 45
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the composition.",
          "page": 45
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe one adversarial input.",
          "page": 45
        }
      ],
      "criteria": [
        "Pass the shared independent-standard/reasoning/transfer gate.",
        "Meet Stage 2 mixed recognition, memory reconstruction, Div 3 A\u2013C application, disguised transfer, counterexample and repeated-session evidence requirements."
      ],
      "recovery": "Identify whether recognition, recall, transfer or proof failed and repair that level rather than defaulting to a favorite technique."
    },
    {
      "id": "algorithm-module-21",
      "sourceId": "Module 21",
      "title": "Recursion as State",
      "phaseId": "stage-3",
      "role": "checkpoint",
      "pages": [
        46,
        47
      ],
      "summary": "Define each recursive call by its state, base case, transition and returned meaning before writing a recurrence.",
      "action": "Write what f(i) means, its stopping condition and the meaning of its return value before implementing it.",
      "minutes": 45,
      "concepts": [
        "state",
        "base case",
        "transition",
        "return value",
        "call stack",
        "DFS",
        "trees",
        "backtracking",
        "DP",
        "iterative rewrite",
        "memoization"
      ],
      "sections": [
        {
          "heading": "A call represents a smaller state",
          "paragraphs": [
            "Recursion supports DFS, trees, backtracking and DP when every call has a precise meaning. For f(i) as the solution starting at i, the recurrence must preserve that interpretation rather than merely resemble familiar code."
          ],
          "items": [
            "Define state before recurrence.",
            "Compare iterative rewrites and memoization.",
            "Check for missing state and repeated work using the Stage 3 failure lens."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named recursion task",
          "level": "L1\u2013L3",
          "task": "Solve a standard recursion example with the pattern named.",
          "page": 46
        },
        {
          "title": "Independent recursion",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard recursive form without notes.",
          "page": 46
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt recursion after a constraint changes.",
          "page": 46
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar recursion task without a hint.",
          "page": 46
        },
        {
          "title": "Broken recursion",
          "level": "L7",
          "task": "Repair a deliberately broken recursive implementation.",
          "page": 46
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 47
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting recursive approach.",
          "page": 47
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the method with tiny-input brute force.",
          "page": 47
        },
        {
          "title": "Recursion timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 47
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain recursive state without notes.",
          "page": 47
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 47
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name an invalidating condition.",
          "page": 47
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe an input attacking the recurrence.",
          "page": 47
        }
      ],
      "criteria": [
        "Independently execute the standard form, explain state and solve an unnamed transfer problem."
      ],
      "recovery": "Rewrite the call's state and return meanings; repair only the weakest state, recall or implementation skill."
    },
    {
      "id": "algorithm-module-22",
      "sourceId": "Module 22",
      "title": "BFS and DFS",
      "phaseId": "stage-3",
      "role": "checkpoint",
      "pages": [
        47,
        48
      ],
      "summary": "Separate graph representation from traversal and use explicit visited state for connectivity and reachability.",
      "action": "Flood-fill a small grid and trace queue/stack and visited state independently of its representation.",
      "minutes": 45,
      "concepts": [
        "graph",
        "adjacency",
        "visited",
        "queue",
        "stack",
        "BFS layers",
        "DFS depth",
        "components",
        "reachability",
        "unweighted shortest path",
        "grid",
        "adjacency list",
        "iterative DFS"
      ],
      "sections": [
        {
          "heading": "Layers versus depth",
          "paragraphs": [
            "BFS expands by layers and DFS follows depth; both require a deliberate visited policy. Connectivity and reachability are basic graph capabilities, with unweighted shortest paths an important BFS specialization."
          ],
          "items": [
            "Begin with grid flood fill.",
            "Separate representation from exploration logic.",
            "Vary grids, adjacency lists and iterative DFS; do not silently apply the unweighted distance claim to arbitrary edge costs."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named traversal task",
          "level": "L1\u2013L3",
          "task": "Solve a standard BFS/DFS example with the pattern supplied.",
          "page": 48
        },
        {
          "title": "Independent traversal",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard graph traversal without notes.",
          "page": 48
        },
        {
          "title": "Changed graph constraint",
          "level": "L4",
          "task": "Adapt traversal after a constraint changes.",
          "page": 48
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar traversal task without a label.",
          "page": 48
        },
        {
          "title": "Broken traversal",
          "level": "L7",
          "task": "Repair a deliberately broken graph implementation.",
          "page": 48
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 48
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a graph defeating a tempting approach.",
          "page": 48
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare traversal answers with brute force on tiny inputs.",
          "page": 48
        },
        {
          "title": "BFS and DFS timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 48
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain traversal state/invariant without notes.",
          "page": 48
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 48
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the selected traversal claim.",
          "page": 48
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe an adversarial graph or grid.",
          "page": 48
        }
      ],
      "criteria": [
        "Independently implement the standard traversal, explain state and solve an unnamed transfer task."
      ],
      "recovery": "Draw a five-node graph and trace queue/stack plus visited state; repair representation or the weakest level."
    },
    {
      "id": "algorithm-module-23",
      "sourceId": "Module 23",
      "title": "Trees",
      "phaseId": "stage-3",
      "role": "checkpoint",
      "pages": [
        48,
        49,
        50
      ],
      "summary": "Root an acyclic connected graph and compute child-to-parent summaries without revisiting the parent edge.",
      "action": "Root a small tree and derive subtreeSize(u)=1+sum(child sizes), marking the parent edge.",
      "minutes": 45,
      "concepts": [
        "root",
        "parent",
        "child",
        "depth",
        "subtree",
        "rooting",
        "subtree summaries",
        "different roots",
        "diameter preview",
        "DFS"
      ],
      "sections": [
        {
          "heading": "Hierarchy from rooting",
          "paragraphs": [
            "Rooting supplies parent/child roles that let DFS summarize subtrees. The size recurrence adds the current node to child sizes; correctness depends on excluding the parent edge."
          ],
          "items": [
            "Study depth and subtree aggregation.",
            "Change the root and inspect how relationships change.",
            "Diameter is a preview, not a fully developed extra module in this source."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named tree task",
          "level": "L1\u2013L3",
          "task": "Solve a standard tree example with its pattern named.",
          "page": 49
        },
        {
          "title": "Independent tree summary",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard tree solution without notes.",
          "page": 49
        },
        {
          "title": "Changed tree constraint",
          "level": "L4",
          "task": "Adapt a tree solution after a constraint changes.",
          "page": 49
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar tree task without a topic label.",
          "page": 49
        },
        {
          "title": "Broken tree code",
          "level": "L7",
          "task": "Repair a deliberately broken tree implementation.",
          "page": 49
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 49
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a tree defeating a tempting approach.",
          "page": 49
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the summary with brute force on tiny trees.",
          "page": 49
        },
        {
          "title": "Trees timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 49
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain rooted state or invariant without notes.",
          "page": 49
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 49
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the method.",
          "page": 49
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe an adversarial tree input.",
          "page": 49
        }
      ],
      "criteria": [
        "Independently reproduce a rooted summary, explain it and solve an unnamed transfer task."
      ],
      "recovery": "Clarify parent exclusion and returned state; repeat the weakest state-modeling or implementation level."
    },
    {
      "id": "algorithm-module-24",
      "sourceId": "Module 24",
      "title": "DP Fundamentals",
      "phaseId": "stage-3",
      "role": "checkpoint",
      "pages": [
        50,
        51
      ],
      "summary": "Derive dynamic programming from repeated brute-force states rather than treating recurrences as formulas to memorize.",
      "action": "Draw the repeated states of Fibonacci or climbing stairs, define dp[i], then add memoization.",
      "minutes": 45,
      "concepts": [
        "state",
        "transition",
        "memoization",
        "tabulation",
        "Fibonacci",
        "climbing stairs",
        "1D DP",
        "choose/skip",
        "grid DP",
        "top-down",
        "bottom-up",
        "memory compression"
      ],
      "sections": [
        {
          "heading": "Search plus reused results",
          "paragraphs": [
            "DP removes repeated state exploration by remembering answers or choosing an evaluation order. Exponential work often comes from solving the same state many times, so define dp[i] before writing transitions."
          ],
          "items": [
            "Start with Fibonacci or climbing stairs.",
            "Explore one-dimensional, choose/skip and grid shapes.",
            "Compare top-down and bottom-up evaluation, then consider safe memory compression.",
            "Check state sufficiency and hidden repetition with the Stage 3 failure lens."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named DP task",
          "level": "L1\u2013L3",
          "task": "Solve a standard DP example with its pattern supplied.",
          "page": 50
        },
        {
          "title": "Independent DP",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard DP without notes.",
          "page": 50
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the DP after a constraint changes.",
          "page": 50
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar DP task without a label.",
          "page": 50
        },
        {
          "title": "Broken DP",
          "level": "L7",
          "task": "Repair a deliberately broken DP implementation.",
          "page": 50
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 51
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting state or transition.",
          "page": 51
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the DP with brute force on tiny inputs.",
          "page": 51
        },
        {
          "title": "DP Fundamentals timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 51
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain the DP state without notes.",
          "page": 51
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 51
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the recurrence.",
          "page": 51
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe an input attacking state or base cases.",
          "page": 51
        }
      ],
      "criteria": [
        "Independently execute the standard DP, explain its reasoning and solve an unnamed transfer problem."
      ],
      "recovery": "Return to brute-force parameters and write the meaning of each state before repairing transitions."
    },
    {
      "id": "algorithm-module-25",
      "sourceId": "Module 25",
      "title": "DP Pattern Recognition",
      "phaseId": "stage-3",
      "role": "checkpoint",
      "pages": [
        51,
        52
      ],
      "summary": "Recognize useful DP state shapes by retaining exactly the past information that future decisions require.",
      "action": "List a choose/skip recursion's parameters, identify repeated states and justify each retained dimension.",
      "minutes": 45,
      "concepts": [
        "dimension",
        "capacity",
        "position",
        "last choice",
        "choose/skip",
        "prefix DP",
        "state compression",
        "extra dimension",
        "max objective",
        "min objective",
        "count objective"
      ],
      "sections": [
        {
          "heading": "Smallest sufficient history",
          "paragraphs": [
            "State design is the main DP skill. Starting with brute-force parameters exposes repetition and reveals which dimensions future decisions actually depend on."
          ],
          "items": [
            "Use choose/skip over a prefix as the worked shape.",
            "Compare prefix DP, compressed state and an added dimension.",
            "Changing from maximum to minimum or counting can alter transitions even when the state shape is similar."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named DP shape",
          "level": "L1\u2013L3",
          "task": "Solve a standard DP-recognition example with its pattern named.",
          "page": 52
        },
        {
          "title": "Independent state design",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard state design without notes.",
          "page": 52
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt a DP pattern after one constraint changes.",
          "page": 52
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar DP-shaped task without labels.",
          "page": 52
        },
        {
          "title": "Broken state design",
          "level": "L7",
          "task": "Repair a deliberately broken DP implementation.",
          "page": 52
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 52
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting state definition.",
          "page": 52
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the DP with brute-force answers.",
          "page": 52
        },
        {
          "title": "DP Recognition timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 52
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain the DP state without notes.",
          "page": 52
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 52
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the state or transition.",
          "page": 52
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe one adversarial input.",
          "page": 52
        }
      ],
      "criteria": [
        "Independently reproduce the standard form, explain state sufficiency and solve an unnamed transfer task."
      ],
      "recovery": "Reconstruct the brute-force state and find the missing future-relevant information; drill the weakest level."
    },
    {
      "id": "algorithm-module-26",
      "sourceId": "Module 26",
      "title": "Div 2 A/B Transition",
      "phaseId": "stage-3",
      "role": "checkpoint",
      "pages": [
        52,
        53,
        54
      ],
      "summary": "Find hidden structure in Div 2 A/B tasks through constraints, observation, proof and deliberate time allocation.",
      "action": "Reduce a story problem to parity, counts, extrema or order and time-box exploration before choosing to code or switch.",
      "minutes": 45,
      "concepts": [
        "observation",
        "invariant",
        "constructive step",
        "case split",
        "parity",
        "counts",
        "extrema",
        "ordering",
        "constraint-driven simplification",
        "case analysis",
        "constructive reasoning",
        "triage"
      ],
      "sections": [
        {
          "heading": "Decision pipeline",
          "paragraphs": [
            "Div 2 work often hides familiar structure. Move from constraints to an observation, establish why it works, then implement. If exploration produces no new information, use a time box and consider switching."
          ],
          "items": [
            "Compare multiple valid approaches and choose sensible first targets.",
            "Use parity, counts, extrema and ordering as possible reductions, not keywords that guarantee a solution.",
            "The Stage 3 gate also requires graph/tree/DP modeling and upsolving evidence."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named A/B task",
          "level": "L1\u2013L3",
          "task": "Solve a standard A/B-transition example with its pattern named.",
          "page": 53
        },
        {
          "title": "Independent A/B task",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard solution without notes.",
          "page": 53
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the solution after a constraint changes.",
          "page": 53
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar A/B-style task without labels.",
          "page": 53
        },
        {
          "title": "Broken A/B implementation",
          "level": "L7",
          "task": "Repair a deliberately broken solution.",
          "page": 53
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 53
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting observation.",
          "page": 53
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the chosen method with brute force.",
          "page": 53
        },
        {
          "title": "Div 2 A/B timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 53
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain the invariant without notes.",
          "page": 53
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 53
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the method.",
          "page": 53
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe one adversarial input.",
          "page": 53
        }
      ],
      "criteria": [
        "Pass the shared independent-standard/reasoning/transfer gate.",
        "Meet Stage 3 independent graph/grid traversal, rooted summary, brute-force-derived DP, triage, some timed A/B success and reusable upsolve evidence."
      ],
      "recovery": "Use a shorter explicitly time-boxed simulation and repair the weakest modeling or contest-decision capability."
    },
    {
      "id": "algorithm-module-27",
      "sourceId": "Module 27",
      "title": "Advanced Greedy and Exchange Arguments",
      "phaseId": "stage-4",
      "role": "checkpoint",
      "pages": [
        55,
        56
      ],
      "summary": "Defend safe local choices with exchange or dominance arguments and reject nearby invalid rules with small counterexamples.",
      "action": "Write an earliest-finish scheduling exchange proof before code, then explain what a weighted variant changes.",
      "minutes": 45,
      "concepts": [
        "exchange",
        "dominance",
        "safe choice",
        "sort and scan",
        "earliest finish",
        "weighted intervals",
        "DP alternative",
        "counterexample"
      ],
      "sections": [
        {
          "heading": "Proof before implementation",
          "paragraphs": [
            "An exchange proof changes an optimal solution so it includes the greedy decision. The critical insight can be small even when the proof is decisive."
          ],
          "items": [
            "Use earliest-finish scheduling as the example.",
            "Weighted variants often need DP because the original safety argument changes.",
            "Short code does not excuse missing proof; use the shared Stage 4 checks for small hidden counterexamples."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named advanced greedy",
          "level": "L1\u2013L3",
          "task": "Solve a standard advanced-greedy example with its pattern named.",
          "page": 55
        },
        {
          "title": "Independent greedy",
          "level": "L2\u2013L3",
          "task": "Reproduce the standard form without notes.",
          "page": 55
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the greedy problem after a constraint changes.",
          "page": 55
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar greedy task without labels.",
          "page": 55
        },
        {
          "title": "Broken greedy solution",
          "level": "L7",
          "task": "Repair a deliberately broken implementation.",
          "page": 55
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 56
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Refute a tempting greedy rule with a small case.",
          "page": 56
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the greedy result with exhaustive tiny-input search.",
          "page": 56
        },
        {
          "title": "Advanced Greedy timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 56
        },
        {
          "title": "Invariant recall",
          "level": "Diagnostic",
          "task": "Explain the invariant without notes.",
          "page": 56
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 56
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the choice.",
          "page": 56
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a proof-attacking input.",
          "page": 56
        }
      ],
      "criteria": [
        "Independently implement the standard form, explain the proof and solve an unnamed transfer task."
      ],
      "recovery": "Construct the smallest counterexample and repair the exchange argument before more coding."
    },
    {
      "id": "algorithm-module-28",
      "sourceId": "Module 28",
      "title": "Advanced DP",
      "phaseId": "stage-4",
      "role": "checkpoint",
      "pages": [
        56,
        57
      ],
      "summary": "Add necessary state dimensions and compress memory only when state count and dependency order remain valid.",
      "action": "Define a 0/1 knapsack state, count states and transitions, and justify the update direction before compression.",
      "minutes": 45,
      "concepts": [
        "dimension",
        "transition",
        "rolling array",
        "0/1 knapsack",
        "2D state",
        "compression",
        "loop order",
        "capacity constraints",
        "sequence DP",
        "state count"
      ],
      "sections": [
        {
          "heading": "Sufficient state within bounds",
          "paragraphs": [
            "State summarizes the smallest past information that future choices need. A new dimension may unlock a problem, but its time and memory cost must be estimated before implementation."
          ],
          "items": [
            "Use 0/1 knapsack as the worked example.",
            "Explore two-dimensional state, capacity limits and sequence DP.",
            "Rolling arrays and loop order require a dependency argument; avoid state explosion."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named advanced DP",
          "level": "L1\u2013L3",
          "task": "Solve a standard advanced-DP example with its pattern named.",
          "page": 57
        },
        {
          "title": "Independent advanced DP",
          "level": "L2\u2013L3",
          "task": "Reproduce the standard form without notes.",
          "page": 57
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the DP after a constraint changes.",
          "page": 57
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar DP task without a label.",
          "page": 57
        },
        {
          "title": "Broken advanced DP",
          "level": "L7",
          "task": "Repair a deliberately broken implementation.",
          "page": 57
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 57
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting state or loop order.",
          "page": 57
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the DP with exhaustive tiny-input search.",
          "page": 57
        },
        {
          "title": "Advanced DP timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 57
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain state and dependencies without notes.",
          "page": 57
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 57
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the DP.",
          "page": 57
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a case attacking the transition or compression.",
          "page": 57
        }
      ],
      "criteria": [
        "Independently implement the standard DP, explain its state and solve an unnamed transfer problem."
      ],
      "recovery": "Return to a precise uncompressed state and dependency order, then repair only the failed capability."
    },
    {
      "id": "algorithm-module-29",
      "sourceId": "Module 29",
      "title": "Number Theory for Contests",
      "phaseId": "stage-4",
      "role": "checkpoint",
      "pages": [
        57,
        58,
        59
      ],
      "summary": "Choose arithmetic reductions and preprocessing from query count and value bounds instead of iterating over huge domains.",
      "action": "Compare one primality query with many queries up to a bound and justify trial work versus a sieve.",
      "minutes": 45,
      "concepts": [
        "prime",
        "sieve",
        "factorization",
        "divisor",
        "modular power",
        "gcd structure",
        "periodicity",
        "single versus many queries",
        "maximum value"
      ],
      "sections": [
        {
          "heading": "Scale-driven arithmetic",
          "paragraphs": [
            "Contest tasks around the source's 1200\u20131600 band may hide arithmetic structure. Factors, gcd relationships, modular powers and periodicity can replace large-domain simulation."
          ],
          "items": [
            "Compare a single primality test with a many-query sieve.",
            "Select preprocessing from maximum value and query count.",
            "Apply the shared Stage 4 warnings about prestige-driven choices and invalid assumptions."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named contest arithmetic",
          "level": "L1\u2013L3",
          "task": "Solve a standard number-theory example with its pattern named.",
          "page": 58
        },
        {
          "title": "Independent arithmetic",
          "level": "L2\u2013L3",
          "task": "Reproduce the standard form without notes.",
          "page": 58
        },
        {
          "title": "Changed query bounds",
          "level": "L4",
          "task": "Adapt the arithmetic method after a constraint changes.",
          "page": 58
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar arithmetic task without labels.",
          "page": 58
        },
        {
          "title": "Broken number theory",
          "level": "L7",
          "task": "Repair a deliberately broken implementation.",
          "page": 58
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label problem from constraints.",
          "page": 58
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting arithmetic approach.",
          "page": 58
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the optimized method with brute force.",
          "page": 58
        },
        {
          "title": "Contest Number Theory timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 58
        },
        {
          "title": "Invariant recall",
          "level": "Diagnostic",
          "task": "Explain arithmetic state/invariant without notes.",
          "page": 58
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 58
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name an invalidating assumption.",
          "page": 58
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe one adversarial input.",
          "page": 58
        }
      ],
      "criteria": [
        "Independently implement the standard form, explain the reduction and solve an unnamed transfer problem."
      ],
      "recovery": "Recheck value/query scale and arithmetic assumptions; repair the weakest level rather than adding another algorithm."
    },
    {
      "id": "algorithm-module-30",
      "sourceId": "Module 30",
      "title": "Combinatorics Foundations",
      "phaseId": "stage-4",
      "role": "checkpoint",
      "pages": [
        59,
        60
      ],
      "summary": "Count independent choices while accounting for symmetry, ordering and double counting.",
      "action": "Derive the count of unordered pairs from n ordered first choices and n-1 second choices, then correct symmetry.",
      "minutes": 45,
      "concepts": [
        "permutation",
        "combination",
        "factorial",
        "binomial",
        "multiplication principle",
        "symmetry",
        "distinctness",
        "modulus",
        "double counting"
      ],
      "sections": [
        {
          "heading": "Derive rather than memorize",
          "paragraphs": [
            "Enumeration expands rapidly. Identify independent decisions, then determine whether the same construction has been counted more than once. Choosing two items illustrates why ordered choices must be adjusted for symmetry."
          ],
          "items": [
            "Explain formulas from the construction.",
            "Check whether objects are distinct and whether order matters.",
            "A modulus changes arithmetic assumptions; it does not justify ordinary division without checking validity."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named counting task",
          "level": "L1\u2013L3",
          "task": "Solve a standard combinatorics example with its pattern named.",
          "page": 59
        },
        {
          "title": "Independent counting",
          "level": "L2\u2013L3",
          "task": "Reproduce the standard derivation without notes.",
          "page": 59
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt counting after a constraint changes.",
          "page": 60
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar counting problem without labels.",
          "page": 60
        },
        {
          "title": "Broken counting code",
          "level": "L7",
          "task": "Repair a deliberately broken implementation.",
          "page": 60
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 60
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting counting formula.",
          "page": 60
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the count with explicit tiny-domain enumeration.",
          "page": 60
        },
        {
          "title": "Combinatorics timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 60
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain the counting invariant without notes.",
          "page": 60
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 60
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the count.",
          "page": 60
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a case attacking distinctness or symmetry assumptions.",
          "page": 60
        }
      ],
      "criteria": [
        "Independently reproduce the standard form, explain the derivation and solve an unnamed transfer task."
      ],
      "recovery": "Enumerate a tiny domain and identify missing or double-counted constructions before repairing the formula."
    },
    {
      "id": "algorithm-module-31",
      "sourceId": "Module 31",
      "title": "Bitwise and Bitmask Thinking",
      "phaseId": "stage-4",
      "role": "checkpoint",
      "pages": [
        60,
        61
      ],
      "summary": "Represent a small universe of independent yes/no choices as bits and use masks for membership or subset state.",
      "action": "Interpret binary 101 as selected features, then enumerate subsets of a small universe.",
      "minutes": 40,
      "concepts": [
        "AND",
        "OR",
        "XOR",
        "shift",
        "mask",
        "membership",
        "subset enumeration",
        "XOR parity",
        "small-set DP",
        "feature flags"
      ],
      "sections": [
        {
          "heading": "Compact subset representation",
          "paragraphs": [
            "Each bit records a feature's membership. A mask makes subset enumeration practical only when the universe is small enough; compact representation does not eliminate exponential state count."
          ],
          "items": [
            "Use tiny binary examples before code.",
            "Explore membership, subset enumeration and XOR parity.",
            "Connect masks to small-set DP and feature flags; check state feasibility."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named bitmask task",
          "level": "L1\u2013L3",
          "task": "Solve a standard bitmask example with its pattern named.",
          "page": 61
        },
        {
          "title": "Independent bitmask",
          "level": "L2\u2013L3",
          "task": "Reproduce the standard form without notes.",
          "page": 61
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the mask method after a constraint changes.",
          "page": 61
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar bitmask task without labels.",
          "page": 61
        },
        {
          "title": "Broken mask code",
          "level": "L7",
          "task": "Repair a deliberately broken implementation.",
          "page": 61
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 61
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting bitwise approach.",
          "page": 61
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare mask results with explicit tiny-set enumeration.",
          "page": 61
        },
        {
          "title": "Bitmask timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 61
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain what the bits mean without notes.",
          "page": 61
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 61
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the method.",
          "page": 61
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe an input attacking mask or scale assumptions.",
          "page": 61
        }
      ],
      "criteria": [
        "Independently implement the standard form, explain bit state and solve an unnamed transfer task."
      ],
      "recovery": "Return to tiny binary representations, count states and repair the weakest level."
    },
    {
      "id": "algorithm-module-32",
      "sourceId": "Module 32",
      "title": "Fenwick Tree",
      "phaseId": "stage-4",
      "role": "checkpoint",
      "pages": [
        61,
        62,
        63
      ],
      "summary": "Maintain prefix aggregates under point updates by understanding the lowbit-defined range stored at each index.",
      "action": "Draw several index ranges using lowbit(x)=x & -x and derive query and update motion from the drawing.",
      "minutes": 45,
      "concepts": [
        "BIT",
        "lowbit",
        "prefix query",
        "point update",
        "prefix sum",
        "range sum",
        "coordinate compression",
        "index wrappers"
      ],
      "sections": [
        {
          "heading": "Stored ranges explain the loops",
          "paragraphs": [
            "Static prefixes cease to answer updated data correctly. A Fenwick node stores a partial range whose size follows lowbit(index); derive navigation from those ranges instead of memorizing loops."
          ],
          "items": [
            "Use lowbit(x)=x & -x as the representation clue.",
            "Support point updates and prefix/range sums.",
            "Explore coordinate compression and index wrappers while preserving range meanings."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named Fenwick task",
          "level": "L1\u2013L3",
          "task": "Solve a standard Fenwick example with its pattern named.",
          "page": 62
        },
        {
          "title": "Independent Fenwick",
          "level": "L2\u2013L3",
          "task": "Reproduce the structure without notes.",
          "page": 62
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the Fenwick task after a constraint changes.",
          "page": 62
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar dynamic-prefix problem without labels.",
          "page": 62
        },
        {
          "title": "Broken Fenwick",
          "level": "L7",
          "task": "Repair a deliberately broken implementation.",
          "page": 62
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 62
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting update/query rule.",
          "page": 62
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare Fenwick operations with direct tiny-array updates and queries.",
          "page": 62
        },
        {
          "title": "Fenwick timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with recognition, reproduction, transfer and adversarial debugging, one each.",
          "page": 62
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain stored ranges without notes.",
          "page": 63
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 63
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name an invalidating condition.",
          "page": 63
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a case attacking indexing or aggregate assumptions.",
          "page": 63
        }
      ],
      "criteria": [
        "Independently reconstruct the standard structure, explain ranges and solve an unnamed transfer task."
      ],
      "recovery": "Redraw node coverage and derive the loops; repair the weakest representation or indexing skill."
    },
    {
      "id": "algorithm-module-33",
      "sourceId": "Module 33",
      "title": "Segment Tree",
      "phaseId": "stage-4",
      "role": "checkpoint",
      "pages": [
        63,
        64
      ],
      "summary": "Combine hierarchical segment summaries for range queries and point updates using a valid merge and identity.",
      "action": "Define merge and identity for range minimum, then explain how disjoint covered segments form a query answer.",
      "minutes": 45,
      "concepts": [
        "node",
        "interval",
        "merge",
        "identity",
        "range minimum",
        "range maximum",
        "range sum",
        "point update",
        "iterative tree",
        "recursive tree",
        "lazy propagation later"
      ],
      "sections": [
        {
          "heading": "Hierarchical aggregation",
          "paragraphs": [
            "Each node summarizes a segment; a query combines disjoint covered pieces. The structure generalizes static aggregation, but correctness rests on the merge operation and identity."
          ],
          "items": [
            "Begin with range minimum.",
            "Compare min, max and sum with point updates.",
            "Iterative and recursive forms are alternatives; lazy propagation is explicitly deferred."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named segment-tree task",
          "level": "L1\u2013L3",
          "task": "Solve a standard segment-tree example with its pattern named.",
          "page": 64
        },
        {
          "title": "Independent segment tree",
          "level": "L2\u2013L3",
          "task": "Reproduce the structure without notes.",
          "page": 64
        },
        {
          "title": "Changed constraint",
          "level": "L4",
          "task": "Adapt the structure after a constraint changes.",
          "page": 64
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Solve an unfamiliar aggregation task without labels.",
          "page": 64
        },
        {
          "title": "Broken segment tree",
          "level": "L7",
          "task": "Repair a deliberately broken implementation.",
          "page": 64
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 64
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting merge or query rule.",
          "page": 64
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare updates and queries with direct tiny-array operations.",
          "page": 64
        },
        {
          "title": "Segment Tree timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 64
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain node state and invariant without notes.",
          "page": 64
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 64
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name a condition invalidating the structure's assumptions.",
          "page": 64
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe a case attacking merge, identity or bounds.",
          "page": 64
        }
      ],
      "criteria": [
        "Independently reconstruct the standard tree, explain aggregation and solve an unnamed transfer problem."
      ],
      "recovery": "Re-derive segment meanings, merge and identity and compare tiny operations before repeating the weakest level."
    },
    {
      "id": "algorithm-module-34",
      "sourceId": "Module 34",
      "title": "Contest Strategy",
      "phaseId": "stage-4",
      "role": "checkpoint",
      "pages": [
        64,
        65,
        66
      ],
      "summary": "Allocate contest time using progress evidence and opportunity cost, with deliberate switching and upsolving.",
      "action": "Track interpretation, observation, proof, implementation and debugging time separately in a short mixed set.",
      "minutes": 45,
      "concepts": [
        "triage",
        "sunk cost",
        "upsolve",
        "time box",
        "opportunity cost",
        "early wins",
        "switching",
        "strengths",
        "contest formats",
        "postmortem"
      ],
      "sections": [
        {
          "heading": "Time is a constrained resource",
          "paragraphs": [
            "Strategy is part of Specialist performance. Every minute excludes another attempt, so switching after a period without new information can be a sound technical decision."
          ],
          "items": [
            "Record time spent on interpretation, observation, proof, implementation and debugging separately.",
            "Adapt to strengths and contest format without treating past effort as a reason to persist.",
            "The Specialist gate requires breadth, proof, independent structures, transfer, strategy and repeated rating evidence; one lucky contest is insufficient."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Named strategy task",
          "level": "L1\u2013L3",
          "task": "Solve a standard contest-strategy example with its pattern named.",
          "page": 65
        },
        {
          "title": "Independent strategy",
          "level": "L2\u2013L3",
          "task": "Reproduce a standard strategy exercise without notes.",
          "page": 65
        },
        {
          "title": "Changed contest constraint",
          "level": "L4",
          "task": "Adapt the plan after a constraint changes.",
          "page": 65
        },
        {
          "title": "Unlabeled transfer",
          "level": "L6",
          "task": "Complete an unfamiliar strategy task without labels.",
          "page": 65
        },
        {
          "title": "Broken implementation",
          "level": "L7",
          "task": "Diagnose a deliberately broken implementation in the strategy set.",
          "page": 65
        },
        {
          "title": "Constraint recognition",
          "level": "L1",
          "task": "Classify a hidden-label task from constraints.",
          "page": 65
        },
        {
          "title": "Counterexample",
          "level": "L7",
          "task": "Construct a case defeating a tempting approach.",
          "page": 65
        },
        {
          "title": "Tiny oracle",
          "level": "L8",
          "task": "Compare the selected method with brute force on tiny inputs.",
          "page": 65
        },
        {
          "title": "Contest Strategy timed set",
          "level": "Timed",
          "task": "Run 30\u201345 minutes with one recognition, reproduction, transfer and adversarial-debug task each.",
          "page": 65
        },
        {
          "title": "State recall",
          "level": "Diagnostic",
          "task": "Explain the relevant state/invariant without notes.",
          "page": 65
        },
        {
          "title": "Complexity",
          "level": "Diagnostic",
          "task": "State time and memory costs.",
          "page": 65
        },
        {
          "title": "Invalidity",
          "level": "Diagnostic",
          "task": "Name an invalidating condition.",
          "page": 65
        },
        {
          "title": "Adversarial input",
          "level": "Diagnostic",
          "task": "Describe one adversarial input.",
          "page": 65
        }
      ],
      "criteria": [
        "Pass the shared independent-standard/reasoning/transfer gate.",
        "Demonstrate Stage 4 breadth, nontrivial proof/DP-transition defense, independent structures, target-band transfer, deliberate switching/upsolving and repeated results trending toward or reaching 1400+."
      ],
      "recovery": "Use a shorter time-boxed virtual set with explicit switch rules and return to the weakest evidenced Stage 4 capability."
    },
    {
      "id": "algorithm-growth-dsu",
      "sourceId": "Stage 5 / Connectivity",
      "title": "DSU \u2014 Connectivity Trigger",
      "phaseId": "stage-5",
      "role": "reference",
      "pages": [
        67
      ],
      "summary": "Consider disjoint-set union when repeated failures reveal a need for efficient component merging.",
      "action": "Inspect repeated connectivity misses and decide whether component merging is the missing capability.",
      "minutes": 25,
      "concepts": [
        "DSU",
        "connectivity",
        "component merging",
        "demand-driven learning"
      ],
      "sections": [
        {
          "heading": "Conditional unlock",
          "paragraphs": [
            "The source offers DSU for connectivity failures, not as an automatic next gate. Study it when the current toolkit repeatedly cannot meet the problem's constraints."
          ],
          "items": [
            "Stage 5 begins when Specialist is reached or clearly within reach.",
            "No implementation lesson, fixed deadline or pass threshold is supplied."
          ]
        }
      ],
      "exercises": [],
      "criteria": [],
      "recovery": "If the issue is an earlier traversal or modeling weakness, repair that rather than adding an algorithm."
    },
    {
      "id": "algorithm-growth-shortest-paths",
      "sourceId": "Stage 5 / Weighted shortest paths",
      "title": "Dijkstra and Related Methods",
      "phaseId": "stage-5",
      "role": "reference",
      "pages": [
        67
      ],
      "summary": "Use repeated weighted-path failures to justify learning an appropriate shortest-path method.",
      "action": "Identify the weighted-path capability missing from repeated problems before selecting an algorithm.",
      "minutes": 25,
      "concepts": [
        "weighted shortest paths",
        "Dijkstra",
        "weighted graph optimization"
      ],
      "sections": [
        {
          "heading": "Conditional unlock",
          "paragraphs": [
            "The table connects weighted shortest-path problems with Dijkstra or related methods. It does not claim that one method handles every edge-cost model or provide a full lesson."
          ],
          "items": [
            "Selection is driven by evidence and constraints, not a compulsory sequence."
          ]
        }
      ],
      "exercises": [],
      "criteria": [],
      "recovery": "Separate representation mistakes from a genuinely missing weighted-path capability."
    },
    {
      "id": "algorithm-growth-lca",
      "sourceId": "Stage 5 / Tree ancestor queries",
      "title": "LCA and Binary Lifting",
      "phaseId": "stage-5",
      "role": "reference",
      "pages": [
        67
      ],
      "summary": "Consider fast ancestor and distance queries when repeated tree-query failures exceed the current toolkit.",
      "action": "Classify repeated tree-query misses as ancestor/distance needs before opening LCA study.",
      "minutes": 25,
      "concepts": [
        "LCA",
        "binary lifting",
        "ancestor queries",
        "tree distance queries"
      ],
      "sections": [
        {
          "heading": "Conditional unlock",
          "paragraphs": [
            "The source links ancestor-query failures to LCA/binary lifting for fast ancestor or distance answers. It gives a trigger and purpose, not an implementation curriculum."
          ],
          "items": []
        }
      ],
      "exercises": [],
      "criteria": [],
      "recovery": "Repair basic rooting and tree summaries first if those are the actual failure."
    },
    {
      "id": "algorithm-growth-strings",
      "sourceId": "Stage 5 / String matching",
      "title": "KMP, Z and Hashing",
      "phaseId": "stage-5",
      "role": "reference",
      "pages": [
        67
      ],
      "summary": "Choose advanced matching study when recurring problems require more string structure than basic scans and counts provide.",
      "action": "Collect the repeated string-matching constraint that current methods fail to meet.",
      "minutes": 25,
      "concepts": [
        "KMP",
        "Z algorithm",
        "hashing",
        "string matching",
        "pattern structure"
      ],
      "sections": [
        {
          "heading": "Conditional unlock",
          "paragraphs": [
            "KMP, Z and hashing are possible string-matching unlocks. Their individual assumptions, trade-offs and implementations are not developed in this source."
          ],
          "items": []
        }
      ],
      "exercises": [],
      "criteria": [],
      "recovery": "Check whether the miss is basic representation or character-accounting rather than advanced matching."
    },
    {
      "id": "algorithm-growth-lazy-segment-tree",
      "sourceId": "Stage 5 / Range updates",
      "title": "Lazy Segment Tree",
      "phaseId": "stage-5",
      "role": "reference",
      "pages": [
        67
      ],
      "summary": "Extend aggregation study when repeated dynamic range modifications require more than point updates.",
      "action": "State the range-update operation that the current point-update structure cannot handle efficiently.",
      "minutes": 25,
      "concepts": [
        "lazy segment tree",
        "range updates",
        "dynamic range modification"
      ],
      "sections": [
        {
          "heading": "Conditional unlock",
          "paragraphs": [
            "Range-update failures can justify lazy propagation. This is the deferred growth path from the basic segment-tree module, not a new mandatory Specialist prerequisite."
          ],
          "items": []
        }
      ],
      "exercises": [],
      "criteria": [],
      "recovery": "Verify merge, identity and point-update understanding before attributing the problem to missing lazy propagation."
    },
    {
      "id": "algorithm-growth-flow",
      "sourceId": "Stage 5 / Network capacity",
      "title": "Max Flow and Min Cut",
      "phaseId": "stage-5",
      "role": "reference",
      "pages": [
        67
      ],
      "summary": "Consider flow/cut modeling when network capacity or matching repeatedly defeats the existing toolkit.",
      "action": "Identify the capacity or matching structure in repeated misses before selecting flow study.",
      "minutes": 25,
      "concepts": [
        "max flow",
        "min cut",
        "network capacity",
        "matching"
      ],
      "sections": [
        {
          "heading": "Conditional unlock",
          "paragraphs": [
            "The source names max flow/min cut as a response to network-capacity problems. It supplies neither a particular flow algorithm nor a required assessment."
          ],
          "items": []
        }
      ],
      "exercises": [],
      "criteria": [],
      "recovery": "Distinguish a modeling problem from a genuinely missing flow capability."
    },
    {
      "id": "algorithm-growth-sos-dp",
      "sourceId": "Stage 5 / Advanced subset aggregation",
      "title": "SOS DP and Advanced Bitmasking",
      "phaseId": "stage-5",
      "role": "reference",
      "pages": [
        67
      ],
      "summary": "Use subset-transform study when recurring subset-aggregation constraints demand it.",
      "action": "Explain the repeated aggregation over subsets that basic mask enumeration cannot afford.",
      "minutes": 25,
      "concepts": [
        "SOS DP",
        "advanced bitmasking",
        "subset transforms",
        "subset aggregation"
      ],
      "sections": [
        {
          "heading": "Conditional unlock",
          "paragraphs": [
            "Advanced subset aggregation is the trigger for SOS DP or advanced bitmasking. A new algorithm is not progress unless the constraints justify its added complexity."
          ],
          "items": []
        }
      ],
      "exercises": [],
      "criteria": [],
      "recovery": "Repair basic mask meanings and state counting if they are the actual gap."
    },
    {
      "id": "algorithm-growth-tree-decomposition",
      "sourceId": "Stage 5 / Complex tree queries",
      "title": "Advanced Tree Decomposition",
      "phaseId": "stage-5",
      "role": "reference",
      "pages": [
        67
      ],
      "summary": "Investigate tree-query optimization only after repeated complex queries expose a capability gap.",
      "action": "Describe which repeated tree queries exceed the current representations and summaries.",
      "minutes": 25,
      "concepts": [
        "advanced tree decomposition",
        "complex tree queries",
        "tree query optimization"
      ],
      "sections": [
        {
          "heading": "Conditional unlock",
          "paragraphs": [
            "The source names advanced tree decomposition generically; it does not prescribe a particular technique or an ordered advanced syllabus."
          ],
          "items": [
            "There is no fixed Stage 5 timeline."
          ]
        }
      ],
      "exercises": [],
      "criteria": [],
      "recovery": "Return to the weakest existing tree capability when advanced machinery is not yet justified."
    },
    {
      "id": "algorithm-solving-engine",
      "sourceId": "11\u201312",
      "title": "Problem-Solving and Progressive Exercise Engine",
      "phaseId": "stage-0",
      "role": "reference",
      "pages": [
        68,
        69
      ],
      "summary": "Use a correct baseline, targeted optimization, adversarial validation and an evidence ledger to turn attempts into reusable contest skill.",
      "action": "Write a brute-force baseline and name exactly which repeated operation the optimization removes.",
      "minutes": 45,
      "concepts": [
        "brute-force oracle",
        "bottleneck",
        "order",
        "frequency",
        "monotonicity",
        "state compression",
        "arithmetic structure",
        "randomized validation",
        "1\u20133\u20131 rule",
        "postmortem",
        "AC",
        "WA",
        "TLE",
        "RE"
      ],
      "sections": [
        {
          "heading": "Failure taxonomy and repair",
          "paragraphs": [
            "Start with an obviously correct method so its preserved behavior is visible. Optimize the expensive repetition rather than guessing a favorite pattern."
          ],
          "items": [
            "Interpretation: restate the formal task and rewrite examples.",
            "Constraint: estimate bounds, operations and memory.",
            "Observation: locate work repeated by the slow baseline.",
            "Proof: minimize the counterexample and repair the invariant.",
            "Implementation: isolate code and test tiny cases.",
            "Boundary: test minimum/maximum, duplicates and sorted/reversed cases.",
            "Debug loop: stop uninformative edits and form a targeted hypothesis."
          ]
        },
        {
          "heading": "Adversarial families",
          "paragraphs": [],
          "items": [
            "Minimum legal input; maximum legal input.",
            "All equal; all distinct.",
            "Sorted; reversed.",
            "Alternating extremes; many duplicates at a decision boundary.",
            "Negative values where allowed; overflow-sized sums/products.",
            "One component versus many; already optimal versus worst arrangement."
          ]
        },
        {
          "heading": "Postmortem record",
          "paragraphs": [
            "Keep problem title/ID, initial idea, failed bottleneck, final observation, implementation risk, verdict, mistake class, future transfer cue and delayed-recall result. The source's postmortem category list omits proof even though its failure taxonomy includes it; retain proof failures explicitly rather than losing them."
          ],
          "items": [
            "Record actual evidence only; an editorial-assisted solve is not independent work.",
            "Use the common L1\u2013L8 ladder for recognition through design defense."
          ]
        }
      ],
      "exercises": [
        {
          "title": "1\u20133\u20131 recognition",
          "level": "L1",
          "task": "Before a new pattern, complete one recognition task and explain the likely technique.",
          "page": 69
        },
        {
          "title": "1\u20133\u20131 implementation variations",
          "level": "L3\u2013L4",
          "task": "After learning the pattern, complete three implementation or variation tasks.",
          "page": 69
        },
        {
          "title": "1\u20133\u20131 delayed transfer",
          "level": "L6",
          "task": "After 24\u201372 hours, solve one transfer task without a topic label.",
          "page": 69
        },
        {
          "title": "Randomized validation",
          "level": "L7\u2013L8",
          "task": "Keep a tiny brute-force oracle and compare the optimized method on random small inputs.",
          "check": "Investigate mismatches as evidence about correctness and the optimization's assumptions.",
          "page": 69
        }
      ],
      "criteria": [],
      "recovery": "Classify the failure first and choose the matching repair; avoid random code edits and undirected problem volume."
    },
    {
      "id": "algorithm-d0",
      "sourceId": "D0",
      "title": "Setup Diagnostic",
      "phaseId": "stage-0",
      "role": "practice",
      "pages": [
        70
      ],
      "summary": "Check the complete minimal compile/input/output/submission workflow.",
      "action": "Compile and run a tiny input/output program and exercise the submission workflow.",
      "minutes": 30,
      "concepts": [
        "compile",
        "run",
        "parse input",
        "output",
        "submission"
      ],
      "sections": [
        {
          "heading": "Evidence boundary",
          "paragraphs": [
            "This diagnostic tests tooling readiness rather than algorithm mastery."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "D0 workflow",
          "level": "Diagnostic",
          "task": "Compile/run, parse input, produce output and complete a tiny submission workflow.",
          "check": "Every workflow step succeeds.",
          "page": 70
        }
      ],
      "criteria": [
        "The tiny end-to-end workflow works."
      ],
      "recovery": "Repair tooling before continuing."
    },
    {
      "id": "algorithm-d1",
      "sourceId": "D1",
      "title": "Implementation Diagnostic",
      "phaseId": "stage-1",
      "role": "practice",
      "pages": [
        70
      ],
      "summary": "Check independent implementation across mixed basic task types.",
      "action": "Attempt mixed loops, arrays, strings and simulation without a tutorial.",
      "minutes": 45,
      "concepts": [
        "loops",
        "arrays",
        "strings",
        "simulation",
        "tutorial independence"
      ],
      "sections": [
        {
          "heading": "Diagnostic scope",
          "paragraphs": [
            "The evidence is mixed execution, not familiarity with a single labeled lesson."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "D1 mixed implementation",
          "level": "Diagnostic",
          "task": "Solve mixed loops/arrays/strings/simulation tasks without tutorial dependence.",
          "check": "Solutions do not depend on a tutorial.",
          "page": 70
        }
      ],
      "criteria": [
        "Mixed implementation is independent."
      ],
      "recovery": "Drill the dominant bug class."
    },
    {
      "id": "algorithm-d2",
      "sourceId": "D2",
      "title": "Pattern Recognition Diagnostic",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        70
      ],
      "summary": "Check technique classification with topic labels removed.",
      "action": "Classify an unlabeled set using constraints and invariants.",
      "minutes": 30,
      "concepts": [
        "unlabeled classification",
        "pattern recognition",
        "constraints"
      ],
      "sections": [
        {
          "heading": "Diagnostic scope",
          "paragraphs": [
            "Named-pattern familiarity is not enough; infer likely techniques from the actual problem."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "D2 classification",
          "level": "Diagnostic",
          "task": "Classify likely techniques with no topic labels.",
          "check": "The technique is identified without a supplied label.",
          "page": 70
        },
        {
          "title": "D2 repair set",
          "level": "Recovery",
          "task": "If recognition fails, complete 20 classification drills.",
          "page": 70
        }
      ],
      "criteria": [
        "Classify likely techniques without topic labels."
      ],
      "recovery": "Use the 20-drill classification repair rather than more labeled implementations."
    },
    {
      "id": "algorithm-d3",
      "sourceId": "D3",
      "title": "Transfer Diagnostic",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        70
      ],
      "summary": "Test whether a known invariant survives an unfamiliar surface presentation.",
      "action": "Attempt an unfamiliar-surface problem and write its underlying invariant.",
      "minutes": 45,
      "concepts": [
        "transfer",
        "invariant",
        "surface wording"
      ],
      "sections": [
        {
          "heading": "Diagnostic scope",
          "paragraphs": [
            "Transfer is independent use on changed wording, not matching keywords."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "D3 unfamiliar solve",
          "level": "Diagnostic",
          "task": "Solve an unfamiliar-surface problem with a known invariant.",
          "check": "The known invariant supports a correct independent solution.",
          "page": 70
        },
        {
          "title": "D3 comparison repair",
          "level": "Recovery",
          "task": "Compare the failed transfer task with two known problems.",
          "page": 70
        }
      ],
      "criteria": [
        "Use a known invariant successfully on an unfamiliar surface."
      ],
      "recovery": "Compare with two known problems and identify the common structure."
    },
    {
      "id": "algorithm-d4",
      "sourceId": "D4",
      "title": "Failure Reasoning Diagnostic",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        70
      ],
      "summary": "Reject plausible wrong solutions using a counterexample or complexity argument.",
      "action": "Diagnose a plausible wrong solution before trying to edit it.",
      "minutes": 35,
      "concepts": [
        "counterexample",
        "complexity argument",
        "broken-code labs"
      ],
      "sections": [
        {
          "heading": "Diagnostic scope",
          "paragraphs": [
            "A diagnosis needs evidence that explains the failure, not only a replacement solution."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "D4 wrong-solution diagnosis",
          "level": "Diagnostic",
          "task": "Diagnose a plausible wrong solution with a counterexample or complexity argument.",
          "check": "The evidence identifies why the approach fails.",
          "page": 70
        }
      ],
      "criteria": [
        "Explain the failure with a concrete counterexample or resource argument."
      ],
      "recovery": "Use broken-code labs to practice root-cause reasoning."
    },
    {
      "id": "algorithm-d5",
      "sourceId": "D5",
      "title": "Div 2 Simulation Diagnostic",
      "phaseId": "stage-3",
      "role": "practice",
      "pages": [
        70
      ],
      "summary": "Check the virtual-contest and full-postmortem workflow.",
      "action": "Prepare a virtual contest and explicitly time-box decision stages.",
      "minutes": 30,
      "concepts": [
        "virtual contest",
        "postmortem",
        "time boxes",
        "Div 2"
      ],
      "sections": [
        {
          "heading": "Diagnostic scope",
          "paragraphs": [
            "The source requires completion and a full review; it does not specify a fixed problem count or score for this diagnostic."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "D5 virtual contest",
          "level": "Diagnostic",
          "task": "Complete a virtual contest and write a full postmortem.",
          "check": "Both the contest and complete review are recorded.",
          "page": 70
        }
      ],
      "criteria": [
        "Complete the virtual contest and full postmortem."
      ],
      "recovery": "Repeat a shorter simulation with explicit time boxes."
    },
    {
      "id": "algorithm-d6",
      "sourceId": "D6",
      "title": "Specialist Readiness Diagnostic",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        70
      ],
      "summary": "Assess repeated contest evidence near the target range rather than one exceptional result.",
      "action": "Review multiple contest records and identify the weakest stage capability.",
      "minutes": 30,
      "concepts": [
        "Specialist readiness",
        "repeated evidence",
        "rating range"
      ],
      "sections": [
        {
          "heading": "Diagnostic scope",
          "paragraphs": [
            "A target-range claim must come from repeated observed performance. This pack supplies no learner results."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "D6 evidence review",
          "level": "Diagnostic",
          "task": "Demonstrate repeated evidence around the target rating range.",
          "check": "Evidence is repeated rather than a single isolated performance.",
          "page": 70
        }
      ],
      "criteria": [
        "Repeated evidence supports target-range readiness."
      ],
      "recovery": "Return to the weakest stage capability."
    },
    {
      "id": "algorithm-diagnostic-bank",
      "sourceId": "13 / Diagnostic question bank",
      "title": "Diagnostic Question Bank",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        70
      ],
      "summary": "Probe algorithm choice, invariants, edge cases, scaling, memory and delayed reconstruction.",
      "action": "Choose one question and answer from the current problem's exact constraints.",
      "minutes": 25,
      "concepts": [
        "constraints",
        "pointer proof",
        "greedy proof",
        "DP repeated state",
        "monotonic predicate",
        "edge cases",
        "scaling",
        "memory trade-offs",
        "delayed recall"
      ],
      "sections": [
        {
          "heading": "Use as probes",
          "paragraphs": [
            "These questions reveal a weak capability; no numeric score or automatic pass threshold is supplied."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Q1 \u2014 Input size",
          "task": "Explain why n affects algorithm selection.",
          "page": 70
        },
        {
          "title": "Q2 \u2014 Pointer safety",
          "task": "State the invariant that justifies pointer movement.",
          "page": 70
        },
        {
          "title": "Q3 \u2014 Greedy safety",
          "task": "Explain why the chosen greedy decision is safe.",
          "page": 70
        },
        {
          "title": "Q4 \u2014 Repeated DP state",
          "task": "Identify the repeated state that makes DP useful.",
          "page": 70
        },
        {
          "title": "Q5 \u2014 Search monotonicity",
          "task": "Justify monotonicity of the binary-search predicate.",
          "page": 70
        },
        {
          "title": "Q6 \u2014 All equal",
          "task": "Explain behavior when every input value is equal.",
          "page": 70
        },
        {
          "title": "Q7 \u2014 Minimum n",
          "task": "Trace the smallest legal input size.",
          "page": 70
        },
        {
          "title": "Q8 \u2014 Tenfold scale",
          "task": "Explain the effect of 10\u00d7 input size.",
          "page": 70
        },
        {
          "title": "Q9 \u2014 Smallest refutation",
          "task": "Find the smallest counterexample to the tempting wrong approach.",
          "page": 70
        },
        {
          "title": "Q10 \u2014 Half memory",
          "task": "Choose a data structure to remove if memory is halved.",
          "page": 70
        },
        {
          "title": "Q11 \u2014 Tomorrow's recall",
          "task": "Reproduce the core idea tomorrow without notes.",
          "page": 70
        }
      ],
      "criteria": [],
      "recovery": "Route the failed question to recognition, recall, implementation, transfer or proof repair."
    },
    {
      "id": "algorithm-case-a",
      "sourceId": "Case A",
      "title": "Pair Matching",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        71
      ],
      "summary": "Compare complement lookup with sorting/two pointers while respecting distinct occurrences, negative values and numeric range.",
      "action": "Write the all-pairs baseline, then specify what a seen-value lookup must retain.",
      "minutes": 45,
      "concepts": [
        "distinct elements",
        "duplicate occurrences",
        "negative values",
        "complement",
        "seen set",
        "seen map",
        "sorting",
        "two pointers",
        "overflow",
        "indices"
      ],
      "sections": [
        {
          "heading": "Requirements, reasoning and scale",
          "paragraphs": [
            "The task asks whether two different occurrences sum to a target; n may be large and values may be negative. All-pairs checking is quadratic. While scanning x, an earlier occurrence of target-x supplies a valid partner."
          ],
          "items": [
            "Do not reuse one occurrence twice; check overflow and output indices.",
            "Hash scanning is expected O(n); sorting plus pointers is O(n log n) and can use less auxiliary memory.",
            "Choose from the output contract and memory budget."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Case A final challenge",
          "level": "L5\u2013L8",
          "task": "Implement both hash lookup and sorting/two pointers, then compare both with brute force on random small arrays.",
          "check": "Respect distinct occurrences and numeric bounds; investigate any result mismatch.",
          "page": 71
        }
      ],
      "criteria": [],
      "recovery": "Minimize a mismatch and check occurrence reuse, complement arithmetic and index handling."
    },
    {
      "id": "algorithm-case-b",
      "sourceId": "Case B",
      "title": "Static Range Queries",
      "phaseId": "stage-1",
      "role": "practice",
      "pages": [
        71,
        72
      ],
      "summary": "Derive prefix subtraction for many static queries and identify the structural change introduced by updates.",
      "action": "Fix an endpoint convention and compare direct range summation with cumulative-state subtraction.",
      "minutes": 45,
      "concepts": [
        "static range sum",
        "endpoint convention",
        "safe numeric type",
        "prefix sums",
        "point updates",
        "Fenwick",
        "segment tree"
      ],
      "sections": [
        {
          "heading": "Requirements, bottleneck and alternative",
          "paragraphs": [
            "Both n and q can be large, so traversing every overlapping query repeats work. A cumulative array gives O(n+q) total work; subtract the prefix before l from the prefix through r."
          ],
          "items": [
            "Guard against overflow and mixing inclusive/half-open conventions.",
            "Updates invalidate the static-only assumption and motivate dynamic aggregates."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Case B final challenge",
          "level": "L4\u2013L8",
          "task": "Add point updates and choose between a Fenwick tree and a segment tree.",
          "check": "Defend the choice using required operations and aggregation assumptions.",
          "page": 72
        }
      ],
      "criteria": [],
      "recovery": "Re-derive endpoint meanings and check whether the task is still static before selecting a structure."
    },
    {
      "id": "algorithm-case-c",
      "sourceId": "Case C",
      "title": "Longest Valid Window",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        72
      ],
      "summary": "Replace exhaustive contiguous-subarray checks with incremental state only when validity supports the required shrinking behavior.",
      "action": "State the exact at-most resource and what happens to it when the left element is removed.",
      "minutes": 45,
      "concepts": [
        "contiguity",
        "at-most constraint",
        "incremental validity",
        "frequency state",
        "monotonic shrinking",
        "prefix alternative"
      ],
      "sections": [
        {
          "heading": "Reasoning and failure boundary",
          "paragraphs": [
            "Enumerating and validating every subarray is quadratic or worse. With maintainable state and appropriate monotonicity, each element enters and leaves once, yielding O(n) when updates are expected O(1)."
          ],
          "items": [
            "Removing left must also remove its contribution from state.",
            "Do not apply this argument to a non-monotonic property.",
            "Prefixes may fit additive properties but not arbitrary frequency constraints."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Case C final challenge",
          "level": "L6\u2013L7",
          "task": "Construct a property for which shrinking does not restore validity monotonically.",
          "check": "Show exactly why the window argument fails for that property.",
          "page": 72
        }
      ],
      "criteria": [],
      "recovery": "Trace resource changes under removal and compare against exhaustive tiny-subarray answers."
    },
    {
      "id": "algorithm-case-d",
      "sourceId": "Case D",
      "title": "Greedy Scheduling",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        72,
        73
      ],
      "summary": "Prove earliest-finish scheduling for maximum interval count and expose the weighted variant's changed objective.",
      "action": "Define overlap endpoints and exchange the first interval of an optimal schedule with the earliest finish.",
      "minutes": 45,
      "concepts": [
        "non-overlapping intervals",
        "endpoint convention",
        "earliest finish",
        "exchange argument",
        "earliest-start failure",
        "tie handling",
        "weighted interval DP"
      ],
      "sections": [
        {
          "heading": "From subsets to a safe choice",
          "paragraphs": [
            "Subset enumeration is exponential. Sorting by finish and repeatedly taking a compatible interval costs O(n log n). Exchanging the first optimal interval for an earlier-finishing one preserves future capacity."
          ],
          "items": [
            "An earliest-start rule can fail; equal endpoints and ties need explicit treatment.",
            "Weights change what is optimized and can break the unweighted argument, leading toward DP."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Case D final challenge",
          "level": "L4\u2013L8",
          "task": "Create a weighted scheduling variant and identify the exact step where the greedy proof fails.",
          "check": "Explain why the original exchange no longer preserves the required objective.",
          "page": 73
        }
      ],
      "criteria": [],
      "recovery": "Construct a small counterexample and revisit feasibility versus objective preservation."
    },
    {
      "id": "algorithm-case-e",
      "sourceId": "Case E",
      "title": "DP from Brute Force",
      "phaseId": "stage-3",
      "role": "practice",
      "pages": [
        73,
        74
      ],
      "summary": "Model choose/skip capacity optimization with item-prefix and capacity state, checking feasibility before selecting DP.",
      "action": "Write the subset recursion, define its repeated state and estimate n\u00d7capacity work.",
      "minutes": 45,
      "concepts": [
        "choose/skip",
        "capacity",
        "item prefix",
        "remaining capacity",
        "memoization",
        "state sufficiency",
        "compressed loop order",
        "state explosion"
      ],
      "sections": [
        {
          "heading": "State and scale",
          "paragraphs": [
            "Each item is selected or skipped. Exhaustive subsets repeat subtrees; a state over item prefix and remaining capacity retains what future decisions need. Standard DP costs O(n\u00b7capacity), so both dimensions must be feasible."
          ],
          "items": [
            "Check capacity conventions and compressed-loop direction.",
            "When capacity is too large, another method is necessary; the source does not supply concrete ranges or prescribe those alternatives."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Case E final challenge",
          "level": "L8",
          "task": "For several constraint ranges, select a method and defend it.",
          "check": "The selected state count fits the given time and memory constraints.",
          "page": 74
        }
      ],
      "criteria": [],
      "recovery": "Rebuild the brute-force state, count repeated states and test the smallest failing transition."
    },
    {
      "id": "algorithm-professional-transfer",
      "sourceId": "15",
      "title": "Professional and Interview Application",
      "phaseId": "stage-4",
      "role": "reference",
      "pages": [
        75
      ],
      "summary": "Translate contest reasoning into engineering artifacts without equating competitive programming with professional or interview competence.",
      "action": "Write a complexity note and a state invariant for one contest solution.",
      "minutes": 30,
      "concepts": [
        "capacity planning",
        "stateful correctness",
        "reference testing",
        "performance engineering",
        "root-cause workflow",
        "decision record",
        "caching",
        "planning",
        "state machines",
        "retrospective"
      ],
      "sections": [
        {
          "heading": "Skill-to-artifact mapping",
          "paragraphs": [
            "Professional value comes from transferable reasoning, not an automatic equivalence between contests and engineering. Start with constraints, separate correctness from performance and treat debugging as hypothesis testing."
          ],
          "items": [
            "Constraint analysis \u2192 capacity/performance planning \u2192 complexity note.",
            "Invariant reasoning \u2192 stateful correctness \u2192 state invariant.",
            "Brute-force baseline \u2192 reference testing \u2192 tiny oracle.",
            "Optimization \u2192 performance engineering \u2192 before/after benchmark.",
            "Debug taxonomy \u2192 root-cause workflow \u2192 failure note.",
            "Greedy proof \u2192 decision justification \u2192 decision record.",
            "DP/state modeling \u2192 caching/planning/state machines \u2192 state definition.",
            "Contest postmortem \u2192 engineering retrospective \u2192 actionable review.",
            "Explain 10\u00d7 and 100\u00d7 scale changes and identify abstraction limits."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Invalidating constraint",
          "task": "Which constraint made the original solution unsuitable?",
          "page": 75
        },
        {
          "title": "Optimization invariant",
          "task": "Which invariant preserves correctness after optimization?",
          "page": 75
        },
        {
          "title": "Simplest alternative",
          "task": "What is the simplest reasonable alternative?",
          "page": 75
        },
        {
          "title": "Likely failure",
          "task": "What is most likely to fail?",
          "page": 75
        },
        {
          "title": "Testing plan",
          "task": "How would you test the solution?",
          "page": 75
        },
        {
          "title": "Omitted state",
          "task": "What information did you deliberately choose not to store?",
          "page": 75
        }
      ],
      "criteria": [],
      "recovery": "Return to explicit constraints, correctness and evidence rather than a prestige-based tool choice."
    },
    {
      "id": "algorithm-retention",
      "sourceId": "16",
      "title": "Review and Retention System",
      "phaseId": "stage-0",
      "role": "reference",
      "pages": [
        76
      ],
      "summary": "Schedule retrieval from immediate reconstruction to a month-later upsolve, using an error ledger for targeted repair.",
      "action": "Choose a learned pattern for a 2\u20135-minute reconstruction and schedule its delayed retrievals.",
      "minutes": 15,
      "concepts": [
        "reconstruction",
        "reproduction",
        "modification",
        "unlabeled retrieval",
        "timed demonstration",
        "delayed review",
        "error ledger"
      ],
      "sections": [
        {
          "heading": "Repair-oriented ledger",
          "paragraphs": [
            "For a meaningful mistake record what failed, why, the future recognition signal and a tiny repair drill. The ledger supports pattern repair rather than undirected journaling."
          ],
          "items": [
            "A scheduled review is not evidence that recall succeeded.",
            "Record actual hints, independence and outcomes when reviews are performed."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Same-day review",
          "level": "Recall",
          "task": "Reconstruct the idea in 2\u20135 minutes on the same day.",
          "check": "Aim at initial encoding.",
          "page": 76
        },
        {
          "title": "+1 day",
          "level": "Recall",
          "task": "Perform a small reproduction after one day.",
          "page": 76
        },
        {
          "title": "+3 days",
          "level": "Modification/Transfer",
          "task": "Attempt a changed or transfer version after three days.",
          "page": 76
        },
        {
          "title": "+7 days",
          "level": "Recognition",
          "task": "Solve an unlabeled mixed problem after seven days.",
          "page": 76
        },
        {
          "title": "+14 days",
          "level": "Demonstration",
          "task": "Attempt a timed problem or mini-contest after fourteen days.",
          "page": 76
        },
        {
          "title": "+30 days",
          "level": "Retention",
          "task": "Perform a delayed review or upsolve after thirty days.",
          "page": 76
        }
      ],
      "criteria": [],
      "recovery": "Use the mistake's recognition signal to select a tiny drill; absence does not reset the roadmap."
    },
    {
      "id": "algorithm-capstone-1",
      "sourceId": "Capstone 1",
      "title": "Contest Environment",
      "phaseId": "stage-0",
      "role": "practice",
      "pages": [
        77
      ],
      "summary": "Demonstrate the whole beginner virtual-contest environment with an explainable template.",
      "action": "Prepare a beginner virtual contest and a blank time/submission log.",
      "minutes": 30,
      "concepts": [
        "own template",
        "virtual contest",
        "triage",
        "time log",
        "postmortem"
      ],
      "sections": [
        {
          "heading": "Evidence",
          "paragraphs": [
            "Scan every problem before coding and retain both submission/time records and a postmortem. This is a browsable capstone, not an extra compulsory checkpoint."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Capstone 1 run",
          "level": "Capstone",
          "task": "Use your own template in a beginner virtual contest, scan all tasks first, record time/submissions and write a postmortem.",
          "check": "Tooling is no longer the main blocker.",
          "page": 77
        }
      ],
      "criteria": [
        "Tooling is not the principal obstacle."
      ],
      "recovery": "Repair the observed environment bottleneck and repeat a small workflow."
    },
    {
      "id": "algorithm-capstone-2",
      "sourceId": "Capstone 2",
      "title": "Pattern Recognition Set",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        77
      ],
      "summary": "Classify twelve mixed unlabeled problems by structural evidence before implementation.",
      "action": "Prepare 12 mixed unlabeled tasks and write the pattern and reason before coding the first.",
      "minutes": 45,
      "concepts": [
        "12 mixed problems",
        "unlabeled classification",
        "constraints",
        "invariants"
      ],
      "sections": [
        {
          "heading": "Evidence",
          "paragraphs": [
            "The test is consistent structural classification, not recognizing keywords."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Capstone 2 mixed set",
          "level": "Capstone",
          "task": "Complete 12 mixed problems without topic labels, writing likely pattern and reason before coding each.",
          "check": "Classification consistently follows constraints/invariants rather than keywords.",
          "page": 77
        }
      ],
      "criteria": [
        "Classification is consistently constraint/invariant-driven."
      ],
      "recovery": "Use recognition drills on the confused boundary before repeating mixed work."
    },
    {
      "id": "algorithm-capstone-3",
      "sourceId": "Capstone 3",
      "title": "Div 3 Simulation",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        77
      ],
      "summary": "Convert misses from a 90-minute virtual set into reusable transfer knowledge.",
      "action": "Select the virtual set and prepare to record every miss for upsolving.",
      "minutes": 30,
      "concepts": [
        "Div 3",
        "90-minute virtual set",
        "upsolve",
        "transfer cue"
      ],
      "sections": [
        {
          "heading": "Duration and evidence",
          "paragraphs": [
            "The complete source simulation lasts 90 minutes; the displayed starting estimate only covers preparation. Upsolve every missed task."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Capstone 3 simulation",
          "level": "Capstone",
          "task": "Run a 90-minute virtual set and upsolve every miss.",
          "check": "At least one missed problem becomes a reusable transfer pattern.",
          "page": 77
        }
      ],
      "criteria": [
        "Extract at least one reusable transfer pattern from a miss."
      ],
      "recovery": "Return to the failed recognition or implementation capability and use a shorter explicit time box if needed."
    },
    {
      "id": "algorithm-capstone-4",
      "sourceId": "Capstone 4",
      "title": "Div 2 A/B Simulation",
      "phaseId": "stage-3",
      "role": "practice",
      "pages": [
        77
      ],
      "summary": "Build repeated A/B evidence with deliberate switching and actionable reviews.",
      "action": "Prepare one virtual contest with explicit switch decisions and a postmortem log.",
      "minutes": 30,
      "concepts": [
        "repeated virtual contests",
        "Div 2 A/B",
        "switching",
        "accepted solutions",
        "postmortem"
      ],
      "sections": [
        {
          "heading": "Evidence trend",
          "paragraphs": [
            "The source asks for repeated virtual contests, not a single fixed-score test."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Capstone 4 repeated simulations",
          "level": "Capstone",
          "task": "Run repeated virtual contests while practicing deliberate switching and postmortems.",
          "check": "A becomes reliable and B attempts increasingly become accepted solutions.",
          "page": 77
        }
      ],
      "criteria": [
        "Repeated evidence shows reliable A work and improving B conversion."
      ],
      "recovery": "Repair the recorded bottleneck and shorten the next simulation when time allocation is the issue."
    },
    {
      "id": "algorithm-capstone-5",
      "sourceId": "Capstone 5",
      "title": "Specialist Readiness",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        77
      ],
      "summary": "Combine repeated contests, mixed transfer and delayed recall into a readiness assessment.",
      "action": "Review actual contest, transfer and delayed-recall evidence without inferring achievement.",
      "minutes": 30,
      "concepts": [
        "Specialist",
        "repeated contests",
        "mixed transfer",
        "delayed recall",
        "performance trend"
      ],
      "sections": [
        {
          "heading": "Evidence over exceptional outcomes",
          "paragraphs": [
            "One unusually good contest cannot establish the mission target."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Capstone 5 evidence set",
          "level": "Capstone",
          "task": "Build repeated contest records, mixed-transfer performance and delayed-recall evidence.",
          "check": "Performance trends toward the target without relying on one exceptional contest.",
          "page": 77
        }
      ],
      "criteria": [
        "A repeated trend supports readiness across contests, transfer and recall."
      ],
      "recovery": "Return to the weakest evidenced capability, not the next advanced algorithm."
    },
    {
      "id": "algorithm-capstone-6",
      "sourceId": "Capstone 6",
      "title": "Failure Laboratory",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        77
      ],
      "summary": "Practice hypothesis-led diagnosis by injecting distinct bug classes into accepted solutions.",
      "action": "Introduce one boundary bug in an accepted solution and diagnose it without opening the original.",
      "minutes": 45,
      "concepts": [
        "boundary bugs",
        "overflow",
        "state bugs",
        "pointer bugs",
        "complexity bugs",
        "hypothesis-driven debugging"
      ],
      "sections": [
        {
          "heading": "Independent diagnosis",
          "paragraphs": [
            "Use accepted code as the starting artifact, but hide the original while diagnosing the modified version."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Capstone 6 bug injection",
          "level": "Capstone",
          "task": "Inject boundary, overflow, state, pointer or complexity bugs into accepted solutions; diagnose without reading the originals.",
          "check": "Diagnosis proceeds through explicit hypotheses rather than random edits.",
          "page": 77
        }
      ],
      "criteria": [
        "Debugging is hypothesis-driven."
      ],
      "recovery": "Minimize the failing input, state the violated invariant and repair one bug class at a time."
    },
    {
      "id": "algorithm-competency-matrix",
      "sourceId": "18 / 22 / 25",
      "title": "Competency Matrix and Final Mastery Checklist",
      "phaseId": "stage-4",
      "role": "reference",
      "pages": [
        78,
        82,
        85
      ],
      "summary": "Keep all 29 competency domains and 29 final probes evidence-based, with no imported checkbox or mastery state.",
      "action": "Choose one checklist item and identify what real evidence would support it.",
      "minutes": 30,
      "concepts": [
        "contest mechanics",
        "C# template / I/O",
        "loops / conditions",
        "arrays / strings",
        "simulation",
        "prefix sums",
        "sorting",
        "frequency counting",
        "two pointers",
        "sliding window",
        "binary search",
        "greedy",
        "maps / sets",
        "basic number theory",
        "intervals / sweep line",
        "recursion",
        "BFS / DFS",
        "trees",
        "DP fundamentals",
        "advanced greedy",
        "advanced DP",
        "number theory",
        "combinatorics",
        "bitmasking",
        "Fenwick tree",
        "segment tree",
        "contest strategy",
        "failure handling",
        "transfer ability"
      ],
      "sections": [
        {
          "heading": "Unfilled evidence matrix",
          "paragraphs": [
            "Each domain can separately have Familiar, Practiced, Applied, Transferred, Demonstrated and Retained evidence. The source's symbol-font cells are not learner results; no boxes are filled by this artifact."
          ],
          "items": [
            "Reading is not evidence of mastery.",
            "Mission evidence includes explanation without notes, accurate C# implementation, structural recognition, unfamiliar transfer, hypothesis-led debugging, deliberate strategy, delayed recall and multiple contests.",
            "The final target is repeatable recognize \u2192 reason \u2192 implement \u2192 debug \u2192 transfer \u2192 retain performance under contest constraints, around or trending toward Specialist 1400+."
          ]
        }
      ],
      "exercises": [
        {
          "title": "01 \u2014 Formal task",
          "task": "Restate a new problem formally.",
          "page": 82
        },
        {
          "title": "02 \u2014 Constraints first",
          "task": "Inspect constraints before choosing complexity.",
          "page": 82
        },
        {
          "title": "03 \u2014 Baseline",
          "task": "Write a brute-force baseline.",
          "page": 82
        },
        {
          "title": "04 \u2014 Bottleneck",
          "task": "Identify the repeated work causing the bottleneck.",
          "page": 82
        },
        {
          "title": "05 \u2014 Invariant",
          "task": "State the invariant.",
          "page": 82
        },
        {
          "title": "06 \u2014 Resources",
          "task": "Estimate time and memory before coding.",
          "page": 82
        },
        {
          "title": "07 \u2014 Template recall",
          "task": "Recreate the C# template without blind copying.",
          "page": 82
        },
        {
          "title": "08 \u2014 Boundary tests",
          "task": "Test boundary cases deliberately.",
          "page": 82
        },
        {
          "title": "09 \u2014 Failure classification",
          "task": "Classify a wrong answer by failure type.",
          "page": 82
        },
        {
          "title": "10 \u2014 Oracle",
          "task": "Use a brute-force oracle on small random inputs.",
          "page": 82
        },
        {
          "title": "11 \u2014 Pointer recognition",
          "task": "Recognize justified monotonic pointer movement.",
          "page": 82
        },
        {
          "title": "12 \u2014 Window boundary",
          "task": "Recognize when sliding window is invalid.",
          "page": 82
        },
        {
          "title": "13 \u2014 Predicate search",
          "task": "Derive binary search from a monotonic predicate.",
          "page": 82
        },
        {
          "title": "14 \u2014 Greedy proof",
          "task": "Prove a greedy choice.",
          "page": 82
        },
        {
          "title": "15 \u2014 DP derivation",
          "task": "Derive DP state from brute force.",
          "page": 82
        },
        {
          "title": "16 \u2014 Traversal",
          "task": "Traverse a graph or grid reliably.",
          "page": 82
        },
        {
          "title": "17 \u2014 Rooted tree",
          "task": "Root and traverse a basic tree.",
          "page": 82
        },
        {
          "title": "18 \u2014 Representation choice",
          "task": "Choose map, set, frequency array or sorting from constraints.",
          "page": 82
        },
        {
          "title": "19 \u2014 Modular assumptions",
          "task": "Use modular arithmetic without invalid assumptions.",
          "page": 82
        },
        {
          "title": "20 \u2014 Modification",
          "task": "Modify a known solution after one constraint changes.",
          "page": 82
        },
        {
          "title": "21 \u2014 Surface transfer",
          "task": "Solve a familiar pattern under unfamiliar wording.",
          "page": 82
        },
        {
          "title": "22 \u2014 Counterexamples",
          "task": "Construct counterexamples to wrong approaches.",
          "page": 82
        },
        {
          "title": "23 \u2014 Switching",
          "task": "Switch problems deliberately.",
          "page": 82
        },
        {
          "title": "24 \u2014 Upsolving",
          "task": "Upsolve and extract a transfer cue.",
          "page": 82
        },
        {
          "title": "25 \u2014 Delayed retrieval",
          "task": "Reproduce a pattern after a delay.",
          "page": 82
        },
        {
          "title": "26 \u2014 Defense",
          "task": "Defend the approach against a reasonable alternative.",
          "page": 82
        },
        {
          "title": "27 \u2014 Scaling",
          "task": "Explain what changes at 10\u00d7 and 100\u00d7 input size.",
          "page": 82
        },
        {
          "title": "28 \u2014 Debugging",
          "task": "Debug systematically after a wrong answer.",
          "page": 82
        },
        {
          "title": "29 \u2014 Repeated performance",
          "task": "Check whether repeated contests show movement toward Specialist.",
          "page": 82
        }
      ],
      "criteria": [],
      "recovery": "Select repair from the failed capability; never mark the matrix based on reading or imported source state."
    },
    {
      "id": "algorithm-execution-planner",
      "sourceId": "19",
      "title": "First 12 Weeks \u2014 Execution Planner",
      "phaseId": "stage-0",
      "role": "reference",
      "pages": [
        79
      ],
      "summary": "Preserve the source's illustrative twelve-week practice structure and 60-minute session without turning dates into gates.",
      "action": "Use the 5/15/25/10/5-minute session shape for the current evidenced checkpoint.",
      "minutes": 60,
      "concepts": [
        "12-week planner",
        "recall",
        "learning",
        "practice",
        "transfer",
        "ledger",
        "timed sets",
        "virtual contests",
        "diagnostic recovery"
      ],
      "sections": [
        {
          "heading": "Planning, not automatic progression",
          "paragraphs": [
            "The weekly outline is a pacing example. Source module order remains canonical, and unmet capability gates are not overridden by a week number."
          ],
          "items": [
            "Default hour: 5 minutes recall of an old pattern/mistake; 15 minutes one concept/worked example; 25 minutes one or two problems; 10 minutes unlabeled variation; 5 minutes evidence, mistake class and next action."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Week 1 \u2014 Stage 0",
          "task": "Contest mechanics, template and first contest: one setup, one mini-contest and a postmortem.",
          "page": 79
        },
        {
          "title": "Week 2 \u2014 Stage 1",
          "task": "Loops/arrays: 5\u20138 easy problems plus recall.",
          "page": 79
        },
        {
          "title": "Week 3 \u2014 Stage 1",
          "task": "Strings/simulation: 5\u20138 problems and a debugging drill.",
          "page": 79
        },
        {
          "title": "Week 4 \u2014 Stage 1",
          "task": "Prefix sums/sorting: 6\u201310 problems with brute-force comparison.",
          "page": 79
        },
        {
          "title": "Week 5 \u2014 Stage 1",
          "task": "Frequency/integration: a mixed easy set and a virtual contest.",
          "page": 79
        },
        {
          "title": "Week 6 \u2014 Stage 1",
          "task": "Div 4 A\u2013D: two timed sets followed by upsolving.",
          "page": 79
        },
        {
          "title": "Week 7 \u2014 Stage 2",
          "task": "Two pointers/windows: recognition, implementation and transfer.",
          "page": 79
        },
        {
          "title": "Week 8 \u2014 Stage 2",
          "task": "Binary search/maps: a mixed-pattern set.",
          "page": 79
        },
        {
          "title": "Week 9 \u2014 Stage 2",
          "task": "Greedy: proof work and a counterexample lab.",
          "page": 79
        },
        {
          "title": "Week 10 \u2014 Stage 2",
          "task": "Intervals/math: mixed Div 3 practice.",
          "page": 79
        },
        {
          "title": "Week 11 \u2014 Stage 2",
          "task": "Pattern combinations: unlabeled tasks and a virtual contest.",
          "page": 79
        },
        {
          "title": "Week 12 \u2014 Stage 2",
          "task": "Diagnostics/recovery: Div 3 simulation and the stage gate.",
          "page": 79
        }
      ],
      "criteria": [],
      "recovery": "Adjust pace to the actual weak capability rather than restarting or claiming a scheduled week is completed."
    },
    {
      "id": "algorithm-reference-templates",
      "sourceId": "23",
      "title": "Reference Patterns and Compact C# Templates",
      "phaseId": "stage-0",
      "role": "reference",
      "pages": [
        83
      ],
      "summary": "Understand the compact C# scanner/Solve/output architecture, complexity ladder and search/window/debug patterns without treating rendered snippets as verified code.",
      "action": "Explain the scanner, Solve boundary and output buffer, then test EOF and the statement's actual test-case format.",
      "minutes": 35,
      "concepts": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)",
        "O(n\u00b2)",
        "O(2^n)",
        "FastScanner",
        "StringBuilder",
        "checked int conversion",
        "byte buffer",
        "first true",
        "sliding window",
        "debug hypothesis"
      ],
      "sections": [
        {
          "heading": "Complexity ladder",
          "paragraphs": [],
          "items": [
            "O(1): independent of n; O(log n): repeated halving/tree search.",
            "O(n): a scan; O(n log n): often sorting plus scanning.",
            "O(n\u00b2): pairwise work appropriate only at smaller scales; O(2^n): subset enumeration for very small n."
          ]
        },
        {
          "heading": "Template architecture and caveats",
          "paragraphs": [
            "The example separates Main, a scanner, Solve and buffered output. A test-case loop defaults to one case and reads a count only when the statement requires it. The scanner uses a 1<<16 byte buffer, whitespace skipping, sign handling, long accumulation and a checked conversion for NextInt.",
            "The rendered skeleton is not safe to claim as a tested copy/paste program: inline line-comments and wrapping obscure code boundaries, and NextLong returns zero at EOF rather than distinguishing missing input. Understand and test the intended components rather than preserving the snippet as executable code."
          ],
          "items": [
            "Keep the template small and explainable.",
            "Numeric types must follow maximum intermediate values, not only sample values."
          ]
        },
        {
          "heading": "Compact algorithm references",
          "paragraphs": [
            "For first-true search, a true mid moves hi to mid and a false mid moves lo to mid+1; monotonicity is essential. The printed claim that [lo,hi) contains the answer is underspecified for a no-true result: define sentinel/no-answer behavior explicitly.",
            "A window adds the right value, removes left values while invalid and updates the length when valid; its preconditions must be justified."
          ],
          "items": [
            "Debug sequence: verdict \u2192 smallest reproducer \u2192 interpretation \u2192 complexity \u2192 expected invariant \u2192 first violating variable \u2192 exact hypothesis \u2192 regression test."
          ]
        }
      ],
      "exercises": [],
      "criteria": [],
      "recovery": "Rebuild and test the scanner in isolation; restate interval/window assumptions before trusting a compact skeleton."
    },
    {
      "id": "algorithm-transfer-bank",
      "sourceId": "20",
      "title": "Transfer Drill Bank",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        80
      ],
      "summary": "Retain all thirty cross-topic drills on applicability, invariants, representation, counterexamples, strategy and scale.",
      "action": "Choose one drill tied to the current failure and answer it without a topic hint.",
      "minutes": 35,
      "concepts": [
        "implementation",
        "arrays",
        "strings",
        "simulation",
        "prefix sums",
        "sorting",
        "frequency",
        "two pointers",
        "sliding window",
        "binary search",
        "greedy",
        "maps",
        "math",
        "intervals",
        "recursion",
        "BFS",
        "DFS",
        "trees",
        "DP",
        "bitmask",
        "Fenwick",
        "segment tree",
        "strategy",
        "failure",
        "transfer",
        "scale"
      ],
      "sections": [
        {
          "heading": "Cross-topic retrieval",
          "paragraphs": [
            "This bank is supplemental practice. Similar prompts elsewhere are intentionally retained in their separate contexts."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Implementation \u2014 Boundary attack",
          "task": "Create an input exposing a common off-by-one loop.",
          "page": 80
        },
        {
          "title": "Arrays \u2014 Memory defense",
          "task": "Decide whether a second array is needed and defend that memory choice.",
          "page": 80
        },
        {
          "title": "Strings \u2014 Case semantics",
          "task": "Create two strings differing only under a case rule and specify their expected comparison.",
          "page": 80
        },
        {
          "title": "Simulation \u2014 State first",
          "task": "List state variables before writing simulation code.",
          "page": 80
        },
        {
          "title": "Prefix sums \u2014 Derivation",
          "task": "Derive the range formula from the chosen prefix definition.",
          "page": 80
        },
        {
          "title": "Sorting \u2014 Lost information",
          "task": "Give a task where sorting destroys information required by the output.",
          "page": 80
        },
        {
          "title": "Frequency \u2014 Five domains",
          "task": "Choose an array or map for five value domains.",
          "page": 80
        },
        {
          "title": "Two pointers \u2014 Safety proof",
          "task": "Prove that a pointer movement cannot skip the answer.",
          "page": 80
        },
        {
          "title": "Two pointers \u2014 Unsorted failure",
          "task": "Build an unsorted case where naive two-pointer reasoning fails.",
          "page": 80
        },
        {
          "title": "Sliding window \u2014 Applicability pair",
          "task": "Give one monotonic window property and one non-monotonic property.",
          "page": 80
        },
        {
          "title": "Binary search \u2014 Invariant",
          "task": "Express the first-true invariant in one sentence.",
          "page": 80
        },
        {
          "title": "Binary search \u2014 Predicate design",
          "task": "Invent a monotonic feasibility predicate.",
          "page": 80
        },
        {
          "title": "Greedy \u2014 Minimal counterexample",
          "task": "Find the smallest counterexample to a tempting greedy rule.",
          "page": 80
        },
        {
          "title": "Greedy \u2014 Exchange argument",
          "task": "Write an exchange argument for a scheduling rule.",
          "page": 80
        },
        {
          "title": "Maps \u2014 Query-driven key",
          "task": "Select keys for first-occurrence, last-occurrence and frequency tasks.",
          "page": 80
        },
        {
          "title": "Math \u2014 Intermediate bounds",
          "task": "Find the largest intermediate value and select a safe C# type.",
          "page": 80
        },
        {
          "title": "Intervals \u2014 Three conventions",
          "task": "Decide whether equal endpoints overlap under three endpoint conventions.",
          "page": 80
        },
        {
          "title": "Recursion \u2014 Parameter meaning",
          "task": "Explain a recursive parameter's meaning before coding.",
          "page": 80
        },
        {
          "title": "BFS \u2014 Edge-cost condition",
          "task": "Explain the edge-cost assumption needed for BFS shortest-path correctness.",
          "page": 80
        },
        {
          "title": "DFS \u2014 Missing visited",
          "task": "Construct a graph where omitting visited state causes severe repeated work.",
          "page": 80
        },
        {
          "title": "Trees \u2014 Rooting benefit",
          "task": "Root a tree and explain what parent relationships enable.",
          "page": 80
        },
        {
          "title": "DP \u2014 Brute-force parameters",
          "task": "Begin with brute force and list state parameters before memoizing.",
          "page": 80
        },
        {
          "title": "DP \u2014 Missing dimension",
          "task": "Remove a state dimension and construct a counterexample.",
          "page": 80
        },
        {
          "title": "Bitmask \u2014 Four features",
          "task": "Represent a subset of four features as a mask and test membership.",
          "page": 80
        },
        {
          "title": "Fenwick \u2014 Node meaning",
          "task": "Explain each stored node's range instead of reciting loops.",
          "page": 80
        },
        {
          "title": "Segment tree \u2014 Three merges",
          "task": "Define merge and identity for sum, minimum and gcd.",
          "page": 80
        },
        {
          "title": "Strategy \u2014 Four problems",
          "task": "Given four problems and 60 minutes, defend the first two choices.",
          "page": 80
        },
        {
          "title": "Failure \u2014 Inject and diagnose",
          "task": "Inject a boundary bug into an accepted solution and diagnose it.",
          "page": 80
        },
        {
          "title": "Transfer \u2014 New story",
          "task": "Solve a familiar pattern under completely different story wording.",
          "page": 80
        },
        {
          "title": "Scale \u2014 Two increases",
          "task": "Explain the effect of 10\u00d7 and 100\u00d7 input size.",
          "page": 80
        }
      ],
      "criteria": [],
      "recovery": "Use the failed drill to distinguish recognition, proof, representation, implementation or retrieval repair."
    },
    {
      "id": "algorithm-archetype-library",
      "sourceId": "21",
      "title": "Problem Archetype Library",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        81
      ],
      "summary": "Explore eighteen archetypes through an obvious instance, a disguised instance and a tempting wrong-technique instance for each.",
      "action": "Choose one archetype and prepare its three-instance applicability drill.",
      "minutes": 45,
      "concepts": [
        "scan and aggregate",
        "frequency",
        "sort and scan",
        "two pointers",
        "sliding window",
        "prefix aggregate",
        "binary search",
        "greedy",
        "hash lookup",
        "graph traversal",
        "tree summary",
        "DP",
        "arithmetic structure",
        "interval events",
        "small universe",
        "dynamic aggregate",
        "constructive",
        "case split"
      ],
      "sections": [
        {
          "heading": "Signals and candidate tools",
          "paragraphs": [
            "An archetype is a hypothesis about structure, not a keyword match. Each exercise below contains the source's three distinct contexts, for 54 problem slots across 18 archetypes."
          ],
          "items": [
            "One-pass summary \u2192 loops/arrays; occurrence counts \u2192 array/map; order-revealed structure \u2192 sorting/greedy.",
            "Monotonic indices \u2192 pointers; contiguous maintainable validity \u2192 window plus map/count.",
            "Many static ranges \u2192 prefixes/counts; order or monotonic predicate \u2192 binary search.",
            "Provably safe local choice \u2192 exchange/sorting; keyed membership \u2192 map/set.",
            "Reachability/components \u2192 BFS/DFS; child-derived hierarchy \u2192 tree DFS.",
            "Repeated subproblems \u2192 memoization/tabulation; divisibility/residues/factors \u2192 number theory.",
            "Range relationships \u2192 event sweep; small subset universe \u2192 bitmasks.",
            "Queries plus updates \u2192 Fenwick/segment tree.",
            "Construct an object satisfying constraints \u2192 invariants/case analysis; few structural cases \u2192 observation/proof."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Scan + aggregate",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting scan/aggregate problem.",
          "check": "Explain the applicability boundary in each.",
          "page": 81
        },
        {
          "title": "Frequency",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting frequency problem.",
          "check": "Explain when array/map counting fits.",
          "page": 81
        },
        {
          "title": "Sort + scan",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting sort/scan problem.",
          "check": "Explain ordering's role and limits.",
          "page": 81
        },
        {
          "title": "Two pointers",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting pointer problem.",
          "check": "Justify movement rather than relying on the label.",
          "page": 81
        },
        {
          "title": "Sliding window",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting window problem.",
          "check": "Explain maintainable validity and its boundary.",
          "page": 81
        },
        {
          "title": "Prefix aggregate",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting prefix problem.",
          "check": "Explain static-range assumptions.",
          "page": 81
        },
        {
          "title": "Binary search",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting search problem.",
          "check": "Establish ordering or monotonicity.",
          "page": 81
        },
        {
          "title": "Greedy",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting greedy problem.",
          "check": "Defend safe choice and reject an invalid rule.",
          "page": 81
        },
        {
          "title": "Hash lookup",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting keyed-lookup problem.",
          "check": "Justify the key and stored state.",
          "page": 81
        },
        {
          "title": "Graph traversal",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting traversal problem.",
          "check": "Connect representation and traversal to the required answer.",
          "page": 81
        },
        {
          "title": "Tree summary",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting tree-summary problem.",
          "check": "Explain child-to-parent state.",
          "page": 81
        },
        {
          "title": "DP",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting DP problem.",
          "check": "Identify sufficient repeated state.",
          "page": 81
        },
        {
          "title": "Arithmetic structure",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting arithmetic problem.",
          "check": "Explain divisibility, residue or factor structure.",
          "page": 81
        },
        {
          "title": "Interval events",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting interval-event problem.",
          "check": "Explain endpoint and active-state assumptions.",
          "page": 81
        },
        {
          "title": "Small universe",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting subset-state problem.",
          "check": "Justify mask representation and feasible state count.",
          "page": 81
        },
        {
          "title": "Dynamic aggregate",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting dynamic-query problem.",
          "check": "Explain operations and aggregation assumptions.",
          "page": 81
        },
        {
          "title": "Constructive",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting constructive problem.",
          "check": "Prove the produced object satisfies constraints.",
          "page": 81
        },
        {
          "title": "Case split",
          "task": "Solve one obvious, one disguised and one wrong-technique-tempting case-analysis problem.",
          "check": "Explain the structural cases and applicability boundary.",
          "page": 81
        }
      ],
      "criteria": [],
      "recovery": "Compare the three contexts to locate the missing applicability condition, then practice that boundary."
    },
    {
      "id": "algorithm-appendix-a",
      "sourceId": "Appendix A",
      "title": "60 Practice Prompts \u2014 Source Entries 01\u201361",
      "phaseId": "stage-0",
      "role": "practice",
      "pages": [
        86,
        87
      ],
      "summary": "Preserve all 61 numbered source prompts, including the extra entry beyond the appendix's stated count.",
      "action": "Select the numbered prompt matching the current checkpoint and write its invariant before attempting it.",
      "minutes": 45,
      "concepts": [
        "implementation drills",
        "core patterns",
        "graph drills",
        "tree drills",
        "DP drills",
        "proof drills",
        "dynamic aggregates",
        "bitmasks",
        "number theory",
        "contest triage",
        "oracles",
        "resource trade-offs"
      ],
      "sections": [
        {
          "heading": "Source numbering and scope",
          "paragraphs": [
            "The heading says 60 prompts, but the list actually runs 01\u201361. All entries are retained; later-stage prompts are browsable options rather than prerequisites for early checkpoints."
          ],
          "items": [
            "Several prompts omit concrete data ranges or a complete problem statement. Supply an instance before solving; do not invent a source-specified answer or grading threshold."
          ]
        }
      ],
      "exercises": [
        {
          "title": "01 \u2014 Minimum and first index",
          "task": "Given n and an array, return its minimum and first index; state the invariant before coding.",
          "page": 86
        },
        {
          "title": "02 \u2014 Adjacent differences",
          "task": "Count adjacent pairs whose values differ.",
          "page": 86
        },
        {
          "title": "03 \u2014 Nondecreasing sequence",
          "task": "Determine whether a sequence is nondecreasing.",
          "page": 86
        },
        {
          "title": "04 \u2014 Score updates",
          "task": "Apply score updates and report the highest score reached.",
          "page": 86
        },
        {
          "title": "05 \u2014 Equal-value run",
          "task": "Find the longest consecutive run of equal values.",
          "page": 86
        },
        {
          "title": "06 \u2014 Bounded counts",
          "task": "Count a bounded value domain with a frequency array.",
          "page": 86
        },
        {
          "title": "07 \u2014 Static range sums",
          "task": "Answer many static range-sum queries with prefixes.",
          "page": 86
        },
        {
          "title": "08 \u2014 Distinct after sorting",
          "task": "Sort values and count distinct values.",
          "page": 86
        },
        {
          "title": "09 \u2014 Character frequencies",
          "task": "Compare the character frequencies of two strings.",
          "page": 86
        },
        {
          "title": "10 \u2014 Blocked movement",
          "task": "Simulate movement with blocked positions and explicit state transitions.",
          "page": 86
        },
        {
          "title": "11 \u2014 Target pair",
          "task": "Determine whether a pair sums to a target.",
          "page": 86
        },
        {
          "title": "12 \u2014 Sorted pair condition",
          "task": "Determine whether a sorted array has a pair satisfying the supplied condition.",
          "page": 86
        },
        {
          "title": "13 \u2014 At most K distinct",
          "task": "Find the longest segment containing at most K distinct values.",
          "page": 86
        },
        {
          "title": "14 \u2014 At least constraint",
          "task": "Find the minimum segment satisfying an at-least constraint.",
          "page": 86
        },
        {
          "title": "15 \u2014 First predicate index",
          "task": "Find the first index satisfying a monotonic predicate.",
          "page": 86
        },
        {
          "title": "16 \u2014 Feasible capacity",
          "task": "Binary-search the minimum feasible capacity.",
          "page": 86
        },
        {
          "title": "17 \u2014 Interval count",
          "task": "Schedule the maximum number of non-overlapping intervals.",
          "page": 86
        },
        {
          "title": "18 \u2014 Greedy pairs",
          "task": "Choose pairs greedily and prove the choice.",
          "page": 86
        },
        {
          "title": "19 \u2014 Group keys",
          "task": "Use a map to group equal keys.",
          "page": 86
        },
        {
          "title": "20 \u2014 First repeat",
          "task": "Find the first repeated value.",
          "page": 86
        },
        {
          "title": "21 \u2014 Target-sum subarrays",
          "task": "Count target-sum subarrays using prefixes and a map.",
          "page": 86
        },
        {
          "title": "22 \u2014 Many gcd queries",
          "task": "Compute gcd for many pairs.",
          "page": 86
        },
        {
          "title": "23 \u2014 Divisor counts",
          "task": "Count divisors of small values.",
          "page": 86
        },
        {
          "title": "24 \u2014 Parity construction",
          "task": "Simplify a construction using parity.",
          "page": 86
        },
        {
          "title": "25 \u2014 Merge intervals",
          "task": "Merge overlapping intervals.",
          "page": 86
        },
        {
          "title": "26 \u2014 Simultaneous intervals",
          "task": "Find the maximum number of simultaneous intervals.",
          "page": 86
        },
        {
          "title": "27 \u2014 Graph components",
          "task": "Count components of an undirected graph.",
          "page": 86
        },
        {
          "title": "28 \u2014 Grid components",
          "task": "Flood-fill a grid and count components.",
          "page": 86
        },
        {
          "title": "29 \u2014 Grid shortest path",
          "task": "Find a shortest path in an unweighted grid.",
          "page": 86
        },
        {
          "title": "30 \u2014 Tree depth",
          "task": "Compute tree depth using DFS.",
          "page": 86
        },
        {
          "title": "31 \u2014 Subtree sizes",
          "task": "Compute subtree sizes.",
          "page": 86
        },
        {
          "title": "32 \u2014 Child aggregate",
          "task": "Compute a simple tree aggregate from child results.",
          "page": 86
        },
        {
          "title": "33 \u2014 Fibonacci derivation",
          "task": "Derive Fibonacci DP from recursion.",
          "page": 86
        },
        {
          "title": "34 \u2014 Choose/skip",
          "task": "Solve a choose/skip DP.",
          "page": 86
        },
        {
          "title": "35 \u2014 Grid paths",
          "task": "Solve a basic grid-path DP.",
          "page": 86
        },
        {
          "title": "36 \u2014 Constant memory",
          "task": "Compress a DP from O(n) to O(1) memory where dependencies allow it.",
          "page": 86
        },
        {
          "title": "37 \u2014 Wrong greedy rule",
          "task": "Find a counterexample to an incorrect greedy rule.",
          "page": 86
        },
        {
          "title": "38 \u2014 Predicate proof",
          "task": "Explain why a binary-search predicate is monotonic.",
          "page": 86
        },
        {
          "title": "39 \u2014 Broken window",
          "task": "Construct an input that breaks an incorrect sliding-window method.",
          "page": 86
        },
        {
          "title": "40 \u2014 Array versus map",
          "task": "Compare array and map representations for a bounded domain.",
          "page": 86
        },
        {
          "title": "41 \u2014 Fenwick implementation",
          "task": "Implement a Fenwick tree from first principles.",
          "page": 87
        },
        {
          "title": "42 \u2014 Fenwick range",
          "task": "Explain the range represented by a Fenwick node.",
          "page": 87
        },
        {
          "title": "43 \u2014 Range-minimum tree",
          "task": "Implement a segment tree for range minimum.",
          "page": 87
        },
        {
          "title": "44 \u2014 Identity element",
          "task": "Explain the identity for a merge operation.",
          "page": 87
        },
        {
          "title": "45 \u2014 Subset masks",
          "task": "Enumerate subsets of a small set using a bitmask.",
          "page": 87
        },
        {
          "title": "46 \u2014 Set-bit count",
          "task": "Count set bits in several ways and compare complexity.",
          "page": 87
        },
        {
          "title": "47 \u2014 Safe modular arithmetic",
          "task": "Use modular arithmetic safely with long.",
          "page": 87
        },
        {
          "title": "48 \u2014 Trial division",
          "task": "Factor a number by trial division.",
          "page": 87
        },
        {
          "title": "49 \u2014 Sieve",
          "task": "Sieve primes up to a bound.",
          "page": 87
        },
        {
          "title": "50 \u2014 Unordered pairs",
          "task": "Count unordered pairs without double counting.",
          "page": 87
        },
        {
          "title": "51 \u2014 Binomial derivation",
          "task": "Derive a binomial-coefficient formula from first principles.",
          "page": 87
        },
        {
          "title": "52 \u2014 Four-problem plan",
          "task": "Write a virtual-contest triage plan for four problems.",
          "page": 87
        },
        {
          "title": "53 \u2014 Upsolve before code",
          "task": "Upsolve a missed problem without viewing solution code first.",
          "page": 87
        },
        {
          "title": "54 \u2014 Five-sentence proof",
          "task": "Write a greedy correctness proof in five sentences.",
          "page": 87
        },
        {
          "title": "55 \u2014 One-sentence state",
          "task": "Express a DP state's meaning in one sentence.",
          "page": 87
        },
        {
          "title": "56 \u2014 Small-domain oracle",
          "task": "Build a brute-force oracle for a small input domain.",
          "page": 87
        },
        {
          "title": "57 \u2014 Random comparison",
          "task": "Generate random tests and compare two implementations.",
          "page": 87
        },
        {
          "title": "58 \u2014 Inject boundary bug",
          "task": "Inject a boundary bug into accepted code and diagnose it.",
          "page": 87
        },
        {
          "title": "59 \u2014 Tenfold input",
          "task": "Explain the effect of 10\u00d7 input size.",
          "page": 87
        },
        {
          "title": "60 \u2014 Half memory",
          "task": "Explain the effect of halving the memory budget.",
          "page": 87
        },
        {
          "title": "61 \u2014 Simpler valid solution",
          "task": "Compare two valid solutions and defend the simpler one.",
          "page": 87
        }
      ],
      "criteria": [],
      "recovery": "Use the error-driven remediation appendix to select a targeted repair for the failed prompt."
    },
    {
      "id": "algorithm-lab-01",
      "sourceId": "Lab 01",
      "title": "Constraint Translation",
      "phaseId": "stage-0",
      "role": "practice",
      "pages": [
        88
      ],
      "summary": "Translate five statements into output contracts and justified complexity budgets without relying on algorithm names.",
      "action": "Take the first of five statements and write only its constraints, required output and affordable work.",
      "minutes": 45,
      "concepts": [
        "constraint translation",
        "output contract",
        "O(n)",
        "O(n log n)",
        "O(n\u00b2)",
        "exponential work"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared deep-lab evidence record, including the initial estimate, baseline where applicable, selected invariant, tempting approach, adversarial risk and observation timing."
          ],
          "items": [
            "Do not substitute an algorithm label for an operation-budget argument."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Lab 01 main task",
          "level": "Lab",
          "task": "For five statements, write constraints and required output; assess O(n), O(n log n), O(n\u00b2) or exponential plausibility and explain each in one sentence.",
          "check": "Complexity choices are justified without requiring an algorithm name.",
          "page": 88
        },
        {
          "title": "Lab 01 transfer",
          "level": "L6",
          "task": "Solve one differently worded problem using the same idea; write your first approach before reading an editorial.",
          "page": 88
        }
      ],
      "criteria": [
        "Justify complexity without relying on an algorithm name."
      ],
      "recovery": "Classify the miss as recognition, recall, implementation, transfer or proof and repeat only that level."
    },
    {
      "id": "algorithm-lab-02",
      "sourceId": "Lab 02",
      "title": "Brute Force Oracle",
      "phaseId": "stage-1",
      "role": "practice",
      "pages": [
        89
      ],
      "summary": "Make an obviously correct small-domain reference before implementing an optimization.",
      "action": "Choose a small combinatorial task and implement its simplest exhaustive version first.",
      "minutes": 45,
      "concepts": [
        "brute-force oracle",
        "combinatorial search",
        "random small inputs",
        "differential testing"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Record the common lab evidence and retain both reference and optimized implementations. The source requires many generated comparisons but gives no numeric sample threshold."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 02 main task",
          "level": "Lab",
          "task": "Implement the slowest obviously correct solution to a small combinatorial problem, generate small random inputs and compare an optimized version against it.",
          "check": "The two versions agree across many generated cases.",
          "page": 89
        },
        {
          "title": "Lab 02 transfer",
          "level": "L6",
          "task": "Solve a differently worded problem using the same idea, writing the initial approach before consulting an editorial.",
          "page": 89
        }
      ],
      "criteria": [
        "Optimized and brute-force results agree across many generated cases."
      ],
      "recovery": "Minimize any mismatch and repair only the failed recognition, recall, implementation, transfer or proof capability."
    },
    {
      "id": "algorithm-lab-03",
      "sourceId": "Lab 03",
      "title": "Boundary Attack",
      "phaseId": "stage-1",
      "role": "practice",
      "pages": [
        90
      ],
      "summary": "Tie fifteen adversarial cases across three accepted implementations to specific logic or invariants.",
      "action": "Choose one accepted implementation and justify five adversarial cases against its logic.",
      "minutes": 45,
      "concepts": [
        "minimum size",
        "maximum size",
        "all equal",
        "reversed",
        "boundary-heavy",
        "adversarial testing"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record. Each test needs a reason connected to code or an invariant rather than merely belonging to a generic list."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 03 main task",
          "level": "Lab",
          "task": "For each of three accepted implementations, invent five cases: minimum size, maximum size, all equal, reversed and boundary-heavy.",
          "check": "Every case has a reason tied to a line of logic or invariant.",
          "page": 90
        },
        {
          "title": "Lab 03 transfer",
          "level": "L6",
          "task": "Solve a differently worded problem using the same idea; write the first approach before viewing an editorial.",
          "page": 90
        }
      ],
      "criteria": [
        "Each adversarial case is justified by the solution's logic or invariant."
      ],
      "recovery": "Identify the failed capability and repeat that level, not all earlier practice."
    },
    {
      "id": "algorithm-lab-04",
      "sourceId": "Lab 04",
      "title": "Two-Pointer Proof",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        91
      ],
      "summary": "Derive safe pointer movement for pair search before implementation.",
      "action": "Write the ordering property and the candidates ruled out by one pointer move.",
      "minutes": 45,
      "concepts": [
        "pair search",
        "two pointers",
        "ordering property",
        "safe elimination"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared lab record and place the movement proof before code."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 04 main task",
          "level": "Lab/Proof",
          "task": "Solve a pair-search problem with two pointers; before coding, explain exactly why the chosen movement cannot discard a valid solution.",
          "check": "The proof identifies the ordering property making movement safe.",
          "page": 91
        },
        {
          "title": "Lab 04 transfer",
          "level": "L6",
          "task": "Solve a differently worded problem using the same idea; record the first approach before an editorial.",
          "page": 91
        }
      ],
      "criteria": [
        "Identify the ordering property that guarantees safe movement."
      ],
      "recovery": "Repair the missing recognition or proof step, then retry that capability only."
    },
    {
      "id": "algorithm-lab-05",
      "sourceId": "Lab 05",
      "title": "Sliding Window Boundary",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        92
      ],
      "summary": "Compare longest and shortest windows while making the validity behavior under shrinking explicit.",
      "action": "Choose a longest-window task and state its exact resource change when the left boundary moves.",
      "minutes": 45,
      "concepts": [
        "longest window",
        "shortest window",
        "validity",
        "monotonic shrinking",
        "invalid window properties"
      ],
      "sections": [
        {
          "heading": "Lab boundary",
          "paragraphs": [
            "Retain the common lab evidence. Longest and shortest objectives must each use their actual validity condition; the source does not license the same update rule for arbitrary properties."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 05 main task",
          "level": "Lab",
          "task": "Solve one longest-window and one shortest-window problem and explain the monotonic behavior of validity under shrinking.",
          "check": "Name a property for which the same window technique fails.",
          "page": 92
        },
        {
          "title": "Lab 05 transfer",
          "level": "L6",
          "task": "Solve a differently worded problem using the same idea, writing your approach before consulting an editorial.",
          "page": 92
        }
      ],
      "criteria": [
        "Explain an applicability boundary with a property that defeats the method."
      ],
      "recovery": "Trace state removal and repair the specific recognition, transfer or proof failure."
    },
    {
      "id": "algorithm-lab-06",
      "sourceId": "Lab 06",
      "title": "Binary Search on Answer",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        93
      ],
      "summary": "Design an integer-capacity problem and establish its monotonic feasibility before writing a search loop.",
      "action": "Invent an integer-capacity question and define the feasibility predicate precisely.",
      "minutes": 45,
      "concepts": [
        "integer answer",
        "capacity",
        "feasibility predicate",
        "monotonicity",
        "answer-space search"
      ],
      "sections": [
        {
          "heading": "Proof before search",
          "paragraphs": [
            "Use the shared lab evidence. The important artifact is the validity argument, not a memorized loop."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 06 main task",
          "level": "Lab/Proof",
          "task": "Invent a capacity problem with an integer answer, define feasibility and prove the predicate monotonic.",
          "check": "Explain why binary search is valid before writing its loop.",
          "page": 93
        },
        {
          "title": "Lab 06 transfer",
          "level": "L6",
          "task": "Solve a differently worded problem using the same idea; write the initial approach before an editorial.",
          "page": 93
        }
      ],
      "criteria": [
        "Justify binary search before implementation."
      ],
      "recovery": "Repair the predicate definition or monotonicity proof at the failed capability level."
    },
    {
      "id": "algorithm-lab-07",
      "sourceId": "Lab 07",
      "title": "Greedy Counterexample Factory",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        94
      ],
      "summary": "Systematically test three attractive scheduling rules and minimally refute those that are incorrect.",
      "action": "Write three plausible rules for one scheduling-style problem and begin a small counterexample search.",
      "minutes": 45,
      "concepts": [
        "scheduling",
        "greedy rules",
        "minimal counterexample",
        "systematic search"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record and retain a concrete input and explanation for every rejected rule."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 07 main task",
          "level": "Lab/Failure",
          "task": "Write three tempting greedy rules for one scheduling-style task; systematically seek the smallest counterexample for each incorrect rule.",
          "check": "Every rejected rule has a concrete failing input and explanation.",
          "page": 94
        },
        {
          "title": "Lab 07 transfer",
          "level": "L6",
          "task": "Solve a differently worded problem using the same idea; write the first approach before an editorial.",
          "page": 94
        }
      ],
      "criteria": [
        "Every rejected rule is supported by an explained failure input."
      ],
      "recovery": "Repair proof or failure-reasoning skill before adding more problem volume."
    },
    {
      "id": "algorithm-lab-08",
      "sourceId": "Lab 08",
      "title": "Greedy Exchange Proof",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        95
      ],
      "summary": "Make the greedy choice, optimal counterpart and feasibility-preserving swap explicit in plain language.",
      "action": "Name the chosen greedy decision, the corresponding optimal decision and the proposed exchange.",
      "minutes": 45,
      "concepts": [
        "exchange proof",
        "optimal solution",
        "greedy choice",
        "swap",
        "remaining feasibility"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record. A valid exchange must preserve the remaining solution's feasibility."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 08 main task",
          "level": "Lab/Proof",
          "task": "Write a plain-language exchange proof for a valid greedy algorithm, identifying its choice, the optimal counterpart and the swap.",
          "check": "Explain why the remaining solution stays feasible.",
          "page": 95
        },
        {
          "title": "Lab 08 transfer",
          "level": "L6",
          "task": "Solve a differently worded problem using the same idea; record the first approach before an editorial.",
          "page": 95
        }
      ],
      "criteria": [
        "Explain preservation of the remaining feasible solution."
      ],
      "recovery": "Repair the exact failed proof step and retry that capability."
    },
    {
      "id": "algorithm-lab-09",
      "sourceId": "Lab 09",
      "title": "Map Key Design",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        96
      ],
      "summary": "Choose map representation from the future query across six different problems.",
      "action": "For the first of six tasks, write the future query before choosing the key.",
      "minutes": 45,
      "concepts": [
        "value key",
        "pair key",
        "prefix state",
        "first occurrence",
        "last occurrence",
        "derived state",
        "future query"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record. The source groups first/last occurrence among key-design possibilities; decide carefully which information belongs in a key versus its stored value for the actual query."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 09 main task",
          "level": "Lab",
          "task": "For six problems choose the map representation from value, pair, prefix state, first/last occurrence or another derived state.",
          "check": "The future query, not syntax familiarity, justifies the key.",
          "page": 96
        },
        {
          "title": "Lab 09 transfer",
          "level": "L6",
          "task": "Solve a differently worded task using the same idea; write an initial approach before an editorial.",
          "page": 96
        }
      ],
      "criteria": [
        "Justify the key using the future query."
      ],
      "recovery": "Restate the queried information and repair only the failed recognition, state or implementation skill."
    },
    {
      "id": "algorithm-lab-10",
      "sourceId": "Lab 10",
      "title": "Prefix + Map",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        97
      ],
      "summary": "Derive a subarray lookup equation before deciding which prefix information to retain.",
      "action": "Write the prefix-state equation for a subarray-sum problem before designing its map.",
      "minutes": 45,
      "concepts": [
        "subarray sum",
        "prefix-state equation",
        "map state",
        "algebraic lookup"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record. Derivation distinguishes genuine understanding from memorized lookup code."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 10 main task",
          "level": "Lab",
          "task": "Take a subarray-sum task, derive the prefix-state equation first and determine what the map must store.",
          "check": "Derive the lookup condition algebraically rather than recalling a formula.",
          "page": 97
        },
        {
          "title": "Lab 10 transfer",
          "level": "L6",
          "task": "Solve a differently worded problem using the same idea; write the first approach before consulting an editorial.",
          "page": 97
        }
      ],
      "criteria": [
        "Derive the lookup condition from the algebra."
      ],
      "recovery": "Rebuild prefix meanings and repair the missing state or proof step."
    },
    {
      "id": "algorithm-lab-11",
      "sourceId": "Lab 11",
      "title": "Graph Representation",
      "phaseId": "stage-3",
      "role": "practice",
      "pages": [
        98
      ],
      "summary": "Compare three representations of the same graph by memory and supported operations.",
      "action": "Draw one graph and begin its adjacency matrix, adjacency list and edge list.",
      "minutes": 45,
      "concepts": [
        "adjacency matrix",
        "adjacency list",
        "edge list",
        "memory cost",
        "operation costs"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record and justify representation from constraints plus needed operations."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 11 main task",
          "level": "Lab/Defense",
          "task": "Represent the same graph as matrix, adjacency list and edge list; state memory cost and the operations each favors.",
          "check": "Select a representation using constraints and operations.",
          "page": 98
        },
        {
          "title": "Lab 11 transfer",
          "level": "L6",
          "task": "Solve a differently worded task using the same idea; write the initial approach before an editorial.",
          "page": 98
        }
      ],
      "criteria": [
        "Representation choice follows constraints and operations."
      ],
      "recovery": "Repair the failed cost estimate or representation skill before retrying the full task."
    },
    {
      "id": "algorithm-lab-12",
      "sourceId": "Lab 12",
      "title": "BFS vs DFS",
      "phaseId": "stage-3",
      "role": "practice",
      "pages": [
        99
      ],
      "summary": "Select traversals for five graph tasks and justify the conditions behind each BFS distance claim.",
      "action": "Classify the first of five graph tasks as BFS, DFS or either and explain why.",
      "minutes": 45,
      "concepts": [
        "BFS",
        "DFS",
        "either traversal",
        "shortest-path assumptions",
        "edge costs"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record. Merely saying a method is for graphs is not a valid selection argument."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 12 main task",
          "level": "Lab/Recognition",
          "task": "Classify five graph tasks as BFS, DFS or either; for BFS choices explain the exact shortest-path assumption.",
          "check": "No choice is justified only by saying BFS is for graphs.",
          "page": 99
        },
        {
          "title": "Lab 12 transfer",
          "level": "L6",
          "task": "Solve a differently worded task using the same idea; record the first approach before an editorial.",
          "page": 99
        }
      ],
      "criteria": [
        "Traversal choices have task-specific justification and valid distance assumptions."
      ],
      "recovery": "Repair the misunderstood traversal boundary rather than repeating labeled examples."
    },
    {
      "id": "algorithm-lab-13",
      "sourceId": "Lab 13",
      "title": "Tree State",
      "phaseId": "stage-3",
      "role": "practice",
      "pages": [
        100
      ],
      "summary": "Change the meaning of a DFS return value while preserving traversal structure.",
      "action": "Implement subtree size, then state how the return meaning changes for sum and maximum depth.",
      "minutes": 45,
      "concepts": [
        "DFS return value",
        "subtree size",
        "subtree sum",
        "maximum depth",
        "traversal structure"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record and separate traversal mechanics from the returned summary."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 13 main task",
          "level": "Lab/Modification",
          "task": "Write DFS returning subtree size, then change the returned result to subtree sum and maximum depth.",
          "check": "Change return-value meaning without changing traversal structure.",
          "page": 100
        },
        {
          "title": "Lab 13 transfer",
          "level": "L6",
          "task": "Solve a differently worded task using the same idea; write the first approach before an editorial.",
          "page": 100
        }
      ],
      "criteria": [
        "Modify the summary independently of traversal structure."
      ],
      "recovery": "Restate the recursive return contract and repair only the failed state or implementation level."
    },
    {
      "id": "algorithm-lab-14",
      "sourceId": "Lab 14",
      "title": "DP from Recursion",
      "phaseId": "stage-3",
      "role": "practice",
      "pages": [
        101
      ],
      "summary": "Turn a precisely defined choose/skip recursion into memoization over exactly the distinct states.",
      "action": "Write a choose/skip brute-force function and list which parameter combinations repeat.",
      "minutes": 45,
      "concepts": [
        "choose/skip",
        "brute-force recursion",
        "state definition",
        "repeated states",
        "memo key"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record. Memo keys must distinguish exactly the defined states."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 14 main task",
          "level": "Lab",
          "task": "Choose a choose/skip task, write brute-force recursion with precise state, identify repetition and add memoization.",
          "check": "Each memo key corresponds exactly to a distinct state.",
          "page": 101
        },
        {
          "title": "Lab 14 transfer",
          "level": "L6",
          "task": "Solve a differently worded task using the same idea; write the initial approach before an editorial.",
          "page": 101
        }
      ],
      "criteria": [
        "Memo keys align exactly with distinct states."
      ],
      "recovery": "Repair state definition before changing the cache or transition."
    },
    {
      "id": "algorithm-lab-15",
      "sourceId": "Lab 15",
      "title": "DP Compression",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        102
      ],
      "summary": "Decide whether two DP rows can become one without violating dependency order.",
      "action": "Draw two-row dependencies and choose an update direction before trying one-row storage.",
      "minutes": 45,
      "concepts": [
        "two-row DP",
        "one-row DP",
        "update direction",
        "dependency order",
        "counterexample"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record. A memory reduction requires an argument about which version of each state is read."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 15 main task",
          "level": "Lab/Proof",
          "task": "Take a two-row DP, determine whether one-row compression is valid, justify update direction and construct a case failing under the wrong direction.",
          "check": "Dependency order justifies the memory optimization.",
          "page": 102
        },
        {
          "title": "Lab 15 transfer",
          "level": "L6",
          "task": "Solve a differently worded task using the same idea; write the first approach before an editorial.",
          "page": 102
        }
      ],
      "criteria": [
        "Dependency order proves compression is valid."
      ],
      "recovery": "Restore the uncompressed state and repair the dependency argument only."
    },
    {
      "id": "algorithm-lab-16",
      "sourceId": "Lab 16",
      "title": "Number-Theory Choice",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        103
      ],
      "summary": "Select arithmetic methods from maximum values and query counts rather than algorithm prestige.",
      "action": "Compare query count and maximum value before choosing trial division, sieve, factorization or gcd reasoning.",
      "minutes": 40,
      "concepts": [
        "trial division",
        "sieve",
        "factorization",
        "gcd reasoning",
        "query count",
        "maximum value"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record. Concrete ranges are not supplied, so select explicit instances before performing the lab."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 16 main task",
          "level": "Lab/Defense",
          "task": "For several maximum-value and query-count ranges, choose trial division, sieve, factorization or gcd-based reasoning.",
          "check": "Explain every choice using input scale rather than algorithm prestige.",
          "page": 103
        },
        {
          "title": "Lab 16 transfer",
          "level": "L6",
          "task": "Solve a differently worded task using the same idea; write the first approach before an editorial.",
          "page": 103
        }
      ],
      "criteria": [
        "Input scale supports every method choice."
      ],
      "recovery": "Repair constraint translation or arithmetic applicability, whichever actually failed."
    },
    {
      "id": "algorithm-lab-17",
      "sourceId": "Lab 17",
      "title": "Bitmask State",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        104
      ],
      "summary": "Enumerate small-universe subsets and attach DP values with an explicit interpretation and state-count budget.",
      "action": "Define each bit of a small universe and count the masks before adding DP values.",
      "minutes": 45,
      "concepts": [
        "subset mask",
        "small universe",
        "enumeration",
        "mask DP",
        "state count"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record. Compact storage must still have a feasible number of states."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 17 main task",
          "level": "Lab",
          "task": "Represent and enumerate subsets of a small universe, then associate a DP value with each mask.",
          "check": "Explain every bit's meaning and why the state count is feasible.",
          "page": 104
        },
        {
          "title": "Lab 17 transfer",
          "level": "L6",
          "task": "Solve a differently worded task using the same idea; write an initial approach before an editorial.",
          "page": 104
        }
      ],
      "criteria": [
        "Bit meanings and feasible state count are explained."
      ],
      "recovery": "Return to tiny masks and repair state meaning or scale estimates."
    },
    {
      "id": "algorithm-lab-18",
      "sourceId": "Lab 18",
      "title": "Fenwick from First Principles",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        105
      ],
      "summary": "Reconstruct update and query loops from drawn Fenwick coverage ranges.",
      "action": "Draw the ranges stored by the first several Fenwick indices.",
      "minutes": 45,
      "concepts": [
        "Fenwick indices",
        "covered ranges",
        "query loop",
        "update loop",
        "representation"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record and derive motion from the representation rather than recalling a template."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 18 main task",
          "level": "Lab/Recall",
          "task": "Draw coverage for the first several Fenwick indices, then derive update and query loops from those ranges.",
          "check": "Reconstruct loops using the representation.",
          "page": 105
        },
        {
          "title": "Lab 18 transfer",
          "level": "L6",
          "task": "Solve a differently worded task using the same idea; write the first approach before an editorial.",
          "page": 105
        }
      ],
      "criteria": [
        "The representation is sufficient to reconstruct both loops."
      ],
      "recovery": "Repair stored-range understanding before implementation practice."
    },
    {
      "id": "algorithm-lab-19",
      "sourceId": "Lab 19",
      "title": "Segment Tree Merge",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        106
      ],
      "summary": "Treat a segment tree as generic aggregation by replacing sum with minimum and gcd.",
      "action": "Define sum merge and identity, then state their minimum and gcd replacements.",
      "minutes": 45,
      "concepts": [
        "segment tree",
        "sum",
        "minimum",
        "gcd",
        "merge",
        "identity",
        "generic aggregation"
      ],
      "sections": [
        {
          "heading": "Lab evidence",
          "paragraphs": [
            "Use the shared evidence record and separate tree traversal from aggregation semantics."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 19 main task",
          "level": "Lab/Modification",
          "task": "Implement a sum segment tree, change its merge to minimum and gcd, and identify each identity value.",
          "check": "Demonstrate understanding of a generic aggregation tree.",
          "page": 106
        },
        {
          "title": "Lab 19 transfer",
          "level": "L6",
          "task": "Solve a differently worded task using the same idea; write the first approach before an editorial.",
          "page": 106
        }
      ],
      "criteria": [
        "Understand and adapt the generic aggregation structure."
      ],
      "recovery": "Repair merge/identity assumptions and compare tiny direct queries."
    },
    {
      "id": "algorithm-lab-20",
      "sourceId": "Lab 20",
      "title": "Contest Strategy Simulation",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        107
      ],
      "summary": "Record decision boundaries during a 60\u201390-minute mixed set and evaluate opportunity cost rather than sunk cost.",
      "action": "Prepare a mixed set and a log for interpretation-to-implementation and switching timestamps.",
      "minutes": 30,
      "concepts": [
        "60\u201390-minute set",
        "interpretation time",
        "implementation time",
        "switch point",
        "opportunity cost",
        "sunk cost"
      ],
      "sections": [
        {
          "heading": "Lab evidence and duration",
          "paragraphs": [
            "The full set lasts 60\u201390 minutes; the starting estimate is preparation only. Record common lab evidence plus exact transitions into implementation and switching decisions."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Lab 20 main task",
          "level": "Lab/Timed",
          "task": "Run a 60\u201390-minute mixed set; record the exact transition from interpretation to implementation and when you chose to switch.",
          "check": "Decisions follow evidence and opportunity cost, not sunk cost.",
          "page": 107
        },
        {
          "title": "Lab 20 transfer",
          "level": "L6",
          "task": "Solve a differently worded task using the same idea; write the first approach before an editorial.",
          "page": 107
        }
      ],
      "criteria": [
        "Use evidence and opportunity cost to explain decisions."
      ],
      "recovery": "Repair the specific decision or skill failure and repeat a shorter explicit time box if needed."
    },
    {
      "id": "algorithm-packet-1",
      "sourceId": "Packet 1",
      "title": "Implementation",
      "phaseId": "stage-1",
      "role": "practice",
      "pages": [
        108
      ],
      "summary": "Run a 60-minute four-task implementation simulation and review every wrong answer.",
      "action": "Scan the four tasks and record likely first choices before starting the timer.",
      "minutes": 60,
      "concepts": [
        "scan/aggregate",
        "strings",
        "simulation",
        "sorting/counting",
        "60 minutes",
        "wrong-answer review",
        "postmortem"
      ],
      "sections": [
        {
          "heading": "Simulation protocol",
          "paragraphs": [
            "Before starting, scan all tasks and note initial choices. During the set, record the first stuck point and the hypothesis being tested. Afterward, classify every miss and select one transfer drill."
          ],
          "items": [
            "Goal: remove implementation friction and review every wrong answer."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Packet 1 run",
          "level": "Timed",
          "task": "In 60 minutes attempt four easy tasks: one scan/aggregate, one string, one simulation and one sorting/counting task.",
          "page": 108
        },
        {
          "title": "Starting value",
          "level": "Postmortem",
          "task": "Which task had the highest expected value at the start?",
          "page": 108
        },
        {
          "title": "Ten-minute reassessment",
          "level": "Postmortem",
          "task": "Was the first choice still sensible after 10 minutes?",
          "page": 108
        },
        {
          "title": "Implementation cost",
          "level": "Postmortem",
          "task": "Where did implementation take longer than reasoning?",
          "page": 108
        },
        {
          "title": "Informative wrong answer",
          "level": "Postmortem",
          "task": "Which wrong submission produced useful information?",
          "page": 108
        },
        {
          "title": "Pattern note",
          "level": "Postmortem",
          "task": "Which missed task should become a pattern note?",
          "page": 108
        },
        {
          "title": "Next simulation",
          "level": "Postmortem",
          "task": "What will change in the next simulation?",
          "page": 108
        }
      ],
      "criteria": [],
      "recovery": "Classify misses, choose one transfer repair and review the dominant implementation bug."
    },
    {
      "id": "algorithm-packet-2",
      "sourceId": "Packet 2",
      "title": "Core Patterns",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        109
      ],
      "summary": "Classify five core-pattern tasks before coding in a 75-minute unlabeled simulation.",
      "action": "Scan the five-task set and write likely techniques and first choices without topic labels.",
      "minutes": 75,
      "concepts": [
        "two pointers",
        "window",
        "map/set",
        "binary search",
        "basic greedy",
        "75 minutes",
        "classification"
      ],
      "sections": [
        {
          "heading": "Simulation protocol",
          "paragraphs": [
            "Scan and choose before starting; record the first stuck time and tested hypothesis during the set; classify misses and choose a transfer drill afterward."
          ],
          "items": [
            "Goal: classify before coding without relying on topic labels."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Packet 2 run",
          "level": "Timed",
          "task": "Use 75 minutes for five tasks spanning pointers, windows, maps/sets, binary search and basic greedy.",
          "page": 109
        },
        {
          "title": "Starting value",
          "level": "Postmortem",
          "task": "Which task had the highest expected value initially?",
          "page": 109
        },
        {
          "title": "Ten-minute reassessment",
          "level": "Postmortem",
          "task": "Was the initial choice still correct after 10 minutes?",
          "page": 109
        },
        {
          "title": "Implementation cost",
          "level": "Postmortem",
          "task": "Where did implementation exceed reasoning time?",
          "page": 109
        },
        {
          "title": "Informative wrong answer",
          "level": "Postmortem",
          "task": "Which wrong submission taught something useful?",
          "page": 109
        },
        {
          "title": "Pattern note",
          "level": "Postmortem",
          "task": "Which miss should become a pattern note?",
          "page": 109
        },
        {
          "title": "Next simulation",
          "level": "Postmortem",
          "task": "What will you do differently next time?",
          "page": 109
        }
      ],
      "criteria": [],
      "recovery": "Repair the failed classification or implementation capability and select one transfer drill."
    },
    {
      "id": "algorithm-packet-3",
      "sourceId": "Packet 3",
      "title": "Mixed Div 3",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        110
      ],
      "summary": "Use a 90-minute mixed A\u2013C-style set, including one disguised pattern, to test recognition beyond labels.",
      "action": "Prepare the mixed set and record likely first choices before its full 90-minute run.",
      "minutes": 30,
      "concepts": [
        "Div 3 A\u2013C",
        "disguised pattern",
        "90 minutes",
        "recognition",
        "postmortem"
      ],
      "sections": [
        {
          "heading": "Simulation protocol",
          "paragraphs": [
            "The complete simulation lasts 90 minutes, not the preparation estimate. Scan first; log the first stuck point and hypothesis; classify every miss and select one transfer drill afterward."
          ],
          "items": [
            "Goal: observe the move from named-pattern practice to independent recognition."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Packet 3 run",
          "level": "Timed",
          "task": "Run a 90-minute mixed A\u2013C-style set containing one disguised-pattern problem.",
          "page": 110
        },
        {
          "title": "Starting value",
          "level": "Postmortem",
          "task": "Which task had the highest expected value at the start?",
          "page": 110
        },
        {
          "title": "Ten-minute reassessment",
          "level": "Postmortem",
          "task": "Did the first choice remain appropriate after 10 minutes?",
          "page": 110
        },
        {
          "title": "Implementation cost",
          "level": "Postmortem",
          "task": "Where did implementation exceed reasoning time?",
          "page": 110
        },
        {
          "title": "Informative wrong answer",
          "level": "Postmortem",
          "task": "Which wrong submission provided useful learning?",
          "page": 110
        },
        {
          "title": "Pattern note",
          "level": "Postmortem",
          "task": "Which miss belongs in a pattern note?",
          "page": 110
        },
        {
          "title": "Next simulation",
          "level": "Postmortem",
          "task": "What will change in the next simulation?",
          "page": 110
        }
      ],
      "criteria": [],
      "recovery": "Classify the miss and practice its hidden structural cue before another full set."
    },
    {
      "id": "algorithm-packet-4",
      "sourceId": "Packet 4",
      "title": "Graph/DP",
      "phaseId": "stage-3",
      "role": "practice",
      "pages": [
        111
      ],
      "summary": "Define representation and state before attempting a 90-minute graph/tree/DP mixture.",
      "action": "Prepare two graph/grid tasks, one tree task and one basic DP task; state representations before coding.",
      "minutes": 30,
      "concepts": [
        "graph/grid",
        "tree",
        "basic DP",
        "representation",
        "state definition",
        "90 minutes"
      ],
      "sections": [
        {
          "heading": "Simulation protocol",
          "paragraphs": [
            "The full set is 90 minutes. Scan and select first; log the first stuck point and hypothesis; after the set classify misses and choose one transfer drill."
          ],
          "items": [
            "Goal: define state and representation before implementation."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Packet 4 run",
          "level": "Timed",
          "task": "Run 90 minutes with two graph/grid tasks, one tree task and one basic DP task.",
          "page": 111
        },
        {
          "title": "Starting value",
          "level": "Postmortem",
          "task": "Which task had the highest initial expected value?",
          "page": 111
        },
        {
          "title": "Ten-minute reassessment",
          "level": "Postmortem",
          "task": "Was the first choice still suitable after 10 minutes?",
          "page": 111
        },
        {
          "title": "Implementation cost",
          "level": "Postmortem",
          "task": "Where did implementation exceed reasoning time?",
          "page": 111
        },
        {
          "title": "Informative wrong answer",
          "level": "Postmortem",
          "task": "Which wrong submission taught something?",
          "page": 111
        },
        {
          "title": "Pattern note",
          "level": "Postmortem",
          "task": "Which missed task should become a pattern note?",
          "page": 111
        },
        {
          "title": "Next simulation",
          "level": "Postmortem",
          "task": "What will you change in the next simulation?",
          "page": 111
        }
      ],
      "criteria": [],
      "recovery": "Repair the failed state or representation capability and select one related transfer drill."
    },
    {
      "id": "algorithm-packet-5",
      "sourceId": "Packet 5",
      "title": "Div 2 A/B",
      "phaseId": "stage-3",
      "role": "practice",
      "pages": [
        112
      ],
      "summary": "Practice switching and opportunity cost in a 120-minute A/B-oriented set containing a deliberate time trap.",
      "action": "Prepare first choices and a switch policy for the full 120-minute set.",
      "minutes": 30,
      "concepts": [
        "Div 2 A/B",
        "120 minutes",
        "time trap",
        "switching",
        "opportunity cost",
        "sunk cost"
      ],
      "sections": [
        {
          "heading": "Simulation protocol",
          "paragraphs": [
            "The full duration is 120 minutes. Include a task that consumes time when approached incorrectly. Scan first, log the first stuck point and hypothesis, then classify misses and choose one transfer drill."
          ],
          "items": [
            "Goal: make switching decisions using opportunity cost."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Packet 5 run",
          "level": "Timed",
          "task": "Run a 120-minute A/B-oriented mixed set with one problem designed to waste time under an incorrect approach.",
          "page": 112
        },
        {
          "title": "Starting value",
          "level": "Postmortem",
          "task": "Which problem had the highest expected value initially?",
          "page": 112
        },
        {
          "title": "Ten-minute reassessment",
          "level": "Postmortem",
          "task": "Was the first choice still justified after 10 minutes?",
          "page": 112
        },
        {
          "title": "Implementation cost",
          "level": "Postmortem",
          "task": "Where did implementation take longer than reasoning?",
          "page": 112
        },
        {
          "title": "Informative wrong answer",
          "level": "Postmortem",
          "task": "Which wrong submission provided useful evidence?",
          "page": 112
        },
        {
          "title": "Pattern note",
          "level": "Postmortem",
          "task": "Which miss should become a pattern note?",
          "page": 112
        },
        {
          "title": "Next simulation",
          "level": "Postmortem",
          "task": "What will change next time?",
          "page": 112
        }
      ],
      "criteria": [],
      "recovery": "Use the recorded stuck point to repair strategy or the underlying capability; shorten the next simulation when needed."
    },
    {
      "id": "algorithm-packet-6",
      "sourceId": "Packet 6",
      "title": "Specialist Push",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        113
      ],
      "summary": "Defend trade-offs and upsolve misses after a 120-minute advanced mixed set.",
      "action": "Prepare a greedy/DP/math/bitmask/data-structure set and a trade-off/postmortem log.",
      "minutes": 30,
      "concepts": [
        "greedy",
        "DP",
        "math",
        "bitmasking",
        "data structures",
        "120 minutes",
        "trade-offs",
        "upsolve"
      ],
      "sections": [
        {
          "heading": "Simulation protocol",
          "paragraphs": [
            "The full set lasts 120 minutes. Scan first; record the first stuck point and tested hypothesis; classify each miss and choose a transfer drill afterward."
          ],
          "items": [
            "Goal: defend trade-offs and upsolve misses."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Packet 6 run",
          "level": "Timed",
          "task": "Run 120 minutes of mixed greedy, DP, math, bitmask and data-structure problems; defend trade-offs and upsolve misses.",
          "page": 113
        },
        {
          "title": "Starting value",
          "level": "Postmortem",
          "task": "Which task had the highest expected value at the start?",
          "page": 113
        },
        {
          "title": "Ten-minute reassessment",
          "level": "Postmortem",
          "task": "Did the initial choice remain sound after 10 minutes?",
          "page": 113
        },
        {
          "title": "Implementation cost",
          "level": "Postmortem",
          "task": "Where did implementation exceed reasoning time?",
          "page": 113
        },
        {
          "title": "Informative wrong answer",
          "level": "Postmortem",
          "task": "Which wrong submission led to useful learning?",
          "page": 113
        },
        {
          "title": "Pattern note",
          "level": "Postmortem",
          "task": "Which miss should become a pattern note?",
          "page": 113
        },
        {
          "title": "Next simulation",
          "level": "Postmortem",
          "task": "What will you do differently in the next simulation?",
          "page": 113
        }
      ],
      "criteria": [],
      "recovery": "Repair the weakest evidenced capability and upsolve deliberately rather than treating one set as a rating achievement."
    },
    {
      "id": "algorithm-proof-window",
      "sourceId": "Appendix D / Monotonicity proof",
      "title": "Monotonicity Proof",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        114
      ],
      "summary": "Prove resource behavior under shrinking for an at-most window constraint.",
      "action": "Define the maintained resource precisely and prove what removing the left element changes.",
      "minutes": 35,
      "concepts": [
        "sliding window",
        "at-most resource",
        "monotonicity",
        "left boundary",
        "invariant"
      ],
      "sections": [
        {
          "heading": "Focus warning",
          "paragraphs": [
            "Use the exact resource, not the vague claim that a smaller window is always better. Apply the common proof requirements for definitions, preservation, boundaries and complexity."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Window monotonicity proof",
          "level": "Proof",
          "task": "Show that after an at-most window becomes invalid, moving its left boundary right cannot worsen the maintained resource usage.",
          "check": "The claim follows from the actual resource and valid assumptions, not window size alone.",
          "page": 114
        }
      ],
      "criteria": [
        "Define the resource and prove the relevant monotonic behavior with boundary cases."
      ],
      "recovery": "Find a counterexample to the vague claim and repair the missing resource assumption."
    },
    {
      "id": "algorithm-proof-binary-search",
      "sourceId": "Appendix D / Binary-search proof",
      "title": "Binary-Search Proof",
      "phaseId": "stage-2",
      "role": "practice",
      "pages": [
        115
      ],
      "summary": "Prove candidate elimination for a first-true predicate rather than relying on a search template.",
      "action": "State the monotonic predicate and interval invariant before explaining the two mid outcomes.",
      "minutes": 35,
      "concepts": [
        "first true",
        "monotonic predicate",
        "interval invariant",
        "candidate elimination"
      ],
      "sections": [
        {
          "heading": "Focus warning",
          "paragraphs": [
            "Without monotonicity, discarded candidates may contain a valid region. Use precise boundaries and define no-true handling; follow the common proof-quality requirements."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "First-true elimination proof",
          "level": "Proof",
          "task": "Show why each first-true search iteration may discard one half of the candidate interval.",
          "check": "Prove the predicate monotonic and preserve the chosen interval invariant.",
          "page": 115
        }
      ],
      "criteria": [
        "Justify discarded candidates through monotonicity and a precise invariant."
      ],
      "recovery": "Repair the predicate or boundary definition and trace a smallest counterexample."
    },
    {
      "id": "algorithm-proof-greedy",
      "sourceId": "Appendix D / Greedy exchange",
      "title": "Greedy Exchange",
      "phaseId": "stage-4",
      "role": "practice",
      "pages": [
        116
      ],
      "summary": "Transform an optimum to include the earliest-finishing compatible interval without reducing future feasibility.",
      "action": "Identify the greedy interval, the optimal interval it replaces and the remaining feasible region.",
      "minutes": 35,
      "concepts": [
        "optimal interval schedule",
        "earliest finish",
        "compatible interval",
        "exchange",
        "feasible region"
      ],
      "sections": [
        {
          "heading": "Focus warning",
          "paragraphs": [
            "The replacement must not shrink the remaining feasible choices. Use the common proof structure and establish correctness before complexity."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Interval exchange proof",
          "level": "Proof",
          "task": "Transform an optimal interval schedule so it uses the earliest-finishing compatible interval.",
          "check": "Explain why the remaining feasible region is not reduced.",
          "page": 116
        }
      ],
      "criteria": [
        "The exchange preserves the remaining feasibility and the objective."
      ],
      "recovery": "Find the failing exchange step or endpoint assumption and repair it."
    },
    {
      "id": "algorithm-proof-prefix",
      "sourceId": "Appendix D / Prefix query proof",
      "title": "Prefix Query Proof",
      "phaseId": "stage-1",
      "role": "practice",
      "pages": [
        117
      ],
      "summary": "Derive range subtraction from exact prefix contents.",
      "action": "Write what prefix[r+1] and prefix[l] contain before subtracting them.",
      "minutes": 30,
      "concepts": [
        "prefix definition",
        "range-sum formula",
        "inclusive endpoints",
        "boundary cases"
      ],
      "sections": [
        {
          "heading": "Focus warning",
          "paragraphs": [
            "The meanings of the two prefixes must be explicit. Use the common proof requirements rather than quoting a memorized formula."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "Prefix subtraction proof",
          "level": "Proof",
          "task": "Derive the range-sum formula from the prefix-array definition.",
          "check": "State exactly what prefix[r+1] and prefix[l] include before subtraction.",
          "page": 117
        }
      ],
      "criteria": [
        "Definitions, subtraction and boundary cases agree."
      ],
      "recovery": "Redefine prefixes and trace tiny inclusive ranges."
    },
    {
      "id": "algorithm-proof-bfs",
      "sourceId": "Appendix D / BFS distance proof",
      "title": "BFS Distance Proof",
      "phaseId": "stage-3",
      "role": "practice",
      "pages": [
        118
      ],
      "summary": "Use queue order and layers to justify nondecreasing discovery distance in an unweighted graph.",
      "action": "Trace BFS layers on a small unweighted graph and state the queue invariant.",
      "minutes": 35,
      "concepts": [
        "BFS",
        "unweighted graph",
        "edge distance",
        "queue order",
        "layers"
      ],
      "sections": [
        {
          "heading": "Focus warning",
          "paragraphs": [
            "The core argument is queue order plus layer structure, not simply choosing BFS. Use the shared proof standards and retain the unweighted assumption."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "BFS distance proof",
          "level": "Proof",
          "task": "Show that BFS discovers vertices in nondecreasing edge distance in an unweighted graph.",
          "check": "Use queue ordering and distance layers in the argument.",
          "page": 118
        }
      ],
      "criteria": [
        "Layer/queue reasoning establishes the stated unweighted distance property."
      ],
      "recovery": "Trace the first claimed layer violation and repair the queue or visited invariant."
    },
    {
      "id": "algorithm-proof-dp",
      "sourceId": "Appendix D / DP correctness",
      "title": "DP Correctness",
      "phaseId": "stage-3",
      "role": "practice",
      "pages": [
        119
      ],
      "summary": "Prove a recurrence by induction over a state order whose meanings and transitions agree.",
      "action": "Write a state's meaning and base case, then choose the induction order.",
      "minutes": 35,
      "concepts": [
        "recurrence",
        "induction",
        "state order",
        "state meaning",
        "base case",
        "transition"
      ],
      "sections": [
        {
          "heading": "Focus warning",
          "paragraphs": [
            "State meaning, base cases and transitions must describe the same problem. Follow the common proof requirements and analyze complexity only after correctness."
          ],
          "items": []
        }
      ],
      "exercises": [
        {
          "title": "DP induction proof",
          "level": "Proof",
          "task": "Prove a recurrence by induction on its state order.",
          "check": "Align state meaning, base cases and transition preservation.",
          "page": 119
        }
      ],
      "criteria": [
        "A valid state-order induction establishes the recurrence."
      ],
      "recovery": "Return to the brute-force state and repair the first mismatched definition or transition."
    },
    {
      "id": "algorithm-remediation",
      "sourceId": "Appendix E",
      "title": "Error-Driven Remediation",
      "phaseId": "stage-0",
      "role": "reference",
      "pages": [
        120
      ],
      "summary": "Select a targeted corrective drill from the actual error class rather than responding to every failure with more volume.",
      "action": "Classify one recent failure and choose only its matching repair drill.",
      "minutes": 30,
      "concepts": [
        "off-by-one",
        "TLE",
        "greedy WA",
        "DP state",
        "graph representation",
        "visited state",
        "template bugs",
        "contest time loss",
        "forgotten patterns",
        "delayed recall"
      ],
      "sections": [
        {
          "heading": "Capability-specific repair",
          "paragraphs": [
            "First identify the kind of failure. More problems are not a universal remedy."
          ],
          "items": [
            "Recognition \u2192 classification drills.",
            "Recall \u2192 reconstruction.",
            "Implementation \u2192 standard reproduction.",
            "Transfer \u2192 unlabeled variants.",
            "Proof \u2192 counterexamples and proof work.",
            "Consistency \u2192 a sustainable schedule and delayed review.",
            "These are repair options, not an automatic roadmap restart."
          ]
        }
      ],
      "exercises": [
        {
          "title": "Off-by-one repair",
          "level": "Recovery",
          "task": "For prefix, binary-search or interval errors, define every boundary variable before coding and solve three tiny hand cases.",
          "page": 120
        },
        {
          "title": "TLE repair",
          "level": "Recovery",
          "task": "Estimate operation count before implementation and compare with a brute-force baseline.",
          "page": 120
        },
        {
          "title": "Greedy WA repair",
          "level": "Recovery",
          "task": "Stop coding first, build a counterexample and write an exchange or invariant argument.",
          "page": 120
        },
        {
          "title": "DP confusion repair",
          "level": "Recovery",
          "task": "Write what dp[state] means before writing any transition.",
          "page": 120
        },
        {
          "title": "Graph bug repair",
          "level": "Recovery",
          "task": "Draw a five-node graph and trace queue/stack plus visited state.",
          "page": 120
        },
        {
          "title": "Template repair",
          "level": "Recovery",
          "task": "Rebuild the scanner in isolation and test negatives, zero, EOF and large input.",
          "page": 120
        },
        {
          "title": "Contest time repair",
          "level": "Recovery",
          "task": "Run short time-boxed virtual sets with explicit switching rules.",
          "page": 120
        },
        {
          "title": "Forgotten-pattern repair",
          "level": "Recovery",
          "task": "Perform delayed recall at +1, +3, +7, +14 and +30 days.",
          "page": 120
        }
      ],
      "criteria": [],
      "recovery": "Match repair to the diagnosed capability; preserve the one current checkpoint and continue after targeted retrieval."
    }
  ],
  "commonSections": [
    {
      "heading": "Learning and evidence framework \u2014 pages 2\u20133, 69, 78, 82, 85",
      "paragraphs": [
        "Work from concept and purpose through a mental model, a small example, worked reasoning, variations, failures and applications before practice, transfer, diagnostics and a gate. Reading establishes exposure only.",
        "The evidence ladder separates NOT MASTERED, FAMILIAR, PRACTICED, APPLIED, TRANSFERRED, DEMONSTRATED and RETAINED. Recognition after prompting, supported practice, independent use, unfamiliar transfer, timed performance and delayed retrieval are different claims."
      ],
      "items": [
        "L1 Recognition: choose a likely pattern and justify it.",
        "L2 Recall: reconstruct without notes.",
        "L3 Reproduction: independently implement a standard form and obtain acceptance.",
        "L4 Modification: adapt a changed constraint or requirement.",
        "L5 Combination: use multiple techniques and explain each contribution.",
        "L6 Transfer: solve an unfamiliar presentation without a topic label.",
        "L7 Failure Handling: identify a root cause and repair it.",
        "L8 Design Defense: compare alternatives and defend trade-offs."
      ]
    },
    {
      "heading": "Common module gate and recovery \u2014 Modules 01\u201334, pages 6\u201365",
      "paragraphs": [
        "Every module asks for independent standard execution, an explanation of the reasoning, and at least one transfer solve without a named hint. Its diagnostic asks for the state/invariant, time and memory cost, an invalidity condition and an adversarial input.",
        "The repeated 30\u201345-minute module set contains recognition, reproduction, transfer and adversarial debugging. Each module retains its own exercise occurrences below; a shared template is not evidence of completion."
      ],
      "items": [
        "Use earlier mission stages as prerequisites without assuming contest intuition.",
        "Follow the source module order; do not infer a separate hard dependency between every neighboring reference or practice unit.",
        "If the gate is missed, repeat the weakest exercise level rather than all earlier stages.",
        "After an absence, load the one saved checkpoint, try short retrieval, repair the weakest prerequisite and continue; never automatically restart."
      ]
    },
    {
      "heading": "Stage-specific failure and professional lenses \u2014 pages 23\u201365",
      "paragraphs": [
        "Implementation-stage work transfers to reliable stateful processing and debugging. Pattern-stage composition resembles reusable software primitives. Graph/tree/DP work transfers to graph-shaped systems, caching and state modeling. Specialist work develops explicit constraints, invariants and performance trade-offs, not automatic professional or interview equivalence."
      ],
      "items": [
        "Stage 1: avoid off-by-one errors, needless complexity and omitted edge cases; inspect boundaries, unusual inputs and complexity mismatches.",
        "Stage 2: avoid pattern anchoring and using a favorite tool everywhere; the right technique can still use the wrong invariant or exceed bounds.",
        "Stage 3: define state before code, avoid overthinking easy cases, and check insufficient state or hidden repeated work.",
        "Stage 4: do not select advanced structures for prestige or skip proof because code is short; attack small counterexamples, state explosion and invalid structure assumptions."
      ]
    },
    {
      "heading": "Stage exit evidence \u2014 pages 4\u20135, 34, 45, 54, 66",
      "paragraphs": [
        "These are capability checks, not schedule deadlines or imported learner results."
      ],
      "items": [
        "Stage 0: explain contests and their distinction from ordinary coding, read constraints before complexity selection, test a C# template, and finish a small contest with a postmortem.",
        "Stage 1: rapidly recognize implementation tasks, reproduce without notes, modify a representation/constraint, diagnose bugs and complete an easy timed set; Div 4 A\u2013D should be comfortable.",
        "Stage 1 recovery: classify 15 easy statements, redo five old tasks, alter three accepted solutions, debug broken snippets, or repeat a shorter set according to the failed capability.",
        "Stage 2: classify mixed unlabeled tasks, recall core patterns, solve Div 3 A\u2013C standard tasks, transfer to disguised versions, reject wrong approaches with counterexamples and show repeated mixed-session progress.",
        "Stage 3: independently traverse graphs/grids, implement rooted summaries, derive basic DP from brute force, triage Div 2 tasks, solve some A/B tasks under time pressure and extract reusable patterns from misses.",
        "Stage 4: select among greedy, DP, number theory, bitmasks, Fenwick and segment trees; defend a nontrivial proof/transition; implement without blind copying; transfer in the target band; switch and upsolve deliberately; show repeated results trending toward or reaching 1400+."
      ]
    },
    {
      "heading": "Deep-lab evidence and repair \u2014 pages 88\u2013107",
      "paragraphs": [
        "Every deep lab records interpretation and constraint estimates, the brute-force baseline where applicable, its chosen pattern/invariant, one tempting alternative, implementation risk with an adversarial test, and time spent before versus after the observation."
      ],
      "items": [
        "Each lab has a separate differently worded transfer task; write an initial approach before consulting an editorial.",
        "Classify a miss as recognition, recall, implementation, transfer or proof; repair only that capability level.",
        "A lab's own pass statement applies to that lab, not as an invented compulsory gate for the whole roadmap."
      ]
    },
    {
      "heading": "Proof quality \u2014 pages 114\u2013119",
      "paragraphs": [
        "A proof needs precise definitions, an invariant or induction statement, a preservation argument, boundary/base cases, and complexity analysis after correctness. Vague appeals to a pattern name are not proofs."
      ],
      "items": [
        "Window: name the resource and prove the effect of removal.",
        "Binary search: establish monotonicity before discarding candidates.",
        "Greedy: preserve the remaining feasible choices after exchange.",
        "Prefix sums: state the two prefix contents before subtraction.",
        "BFS: use queue order and distance layers under unweighted edges.",
        "DP: align state meaning, base cases and transitions."
      ]
    },
    {
      "heading": "Scope, pacing and state integrity \u2014 pages 1\u20135, 79, 84\u201385",
      "paragraphs": [
        "Competitive programming does not replace interview DSA and does not own system design, cloud services, certifications or architecture training. Success is repeated contest performance, not chapter or problem counts.",
        "Maintain one current work checkpoint while allowing reference browsing. State moves only with real evidence. The source's illustrative state is not a user baseline."
      ],
      "items": [
        "Canonical stage estimates: Stage 0 3\u20135 days; Stage 1 3\u20135 weeks; Stage 2 2\u20133 months; Stage 3 3\u20135 months; Stage 4 6\u201312 months; Stage 5 unspecified.",
        "Treat estimates and the 12-week planner as orientation rather than deadlines; the source does not settle whether all stage month ranges are cumulative.",
        "Use intuition before formulas and brute force before optimization. Add advanced topics only when justified by the current problem class."
      ]
    }
  ]
} satisfies RoadmapPack;
