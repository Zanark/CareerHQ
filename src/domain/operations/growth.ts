import { defineOperation } from '../operationBuilder';
import type { Mission } from '../types';

const BLUEPRINT_VISUAL = { document: 'Career_HQ_Operating_System.pdf', page: 116 };
const CREDENTIAL_VISUAL = { document: 'Career_HQ_Operating_System.pdf', page: 118 };
const NEURAL_VISUAL = { document: 'Operation_Neural_Edge_AI_Architect_Roadmap.pdf', page: 1 };

// Source-grounded, phase-level operations for Blueprint, Credential Forge, and Neural Edge.
// Each mission tracks only the phase-level outcomes explicitly shown in its source roadmap
// (visual diagram + mission handoff text). No fine-grained sub-checkpoint numbering is
// invented beyond what the sources name explicitly.

const blueprintMission: Mission = defineOperation({
  id: 'blueprint',
  name: 'Software Architecture',
  operation: 'Blueprint',
  description: 'Five-phase software architecture roadmap — Technical Rehab, Backend Mastery, System Design & '
    + 'Distributed Systems, Cloud & DevOps, and AI Integration & Advanced Architecture — tracked at the phase '
    + 'level shown in the source roadmap.',
  purpose: 'Give the architect roadmap a dedicated space for its phase-level outcomes without inventing '
    + 'fine-grained checkpoint numbering beyond what the mission handoff recorded.',
  color: 'violet',
  icon: 'compass',
  owner: 'Architect Coach',
  dependencies: ['system', 'fabric'],
  coverage: 'phase-level',
  completionLabel: 'Documented phase milestones complete',
  sources: [
    { document: 'Operation_Blueprint_Career_HQ_Mission_Handoff.pdf', section: '3. Roadmap', page: 2 },
    { ...BLUEPRINT_VISUAL, section: 'Canonical visual roadmap: Phase 0–4 outcomes' },
  ],
  sourceNotes: [
    'Only the Hashmaps Foundation (checkpoint 0.1) and the next Two Pointers unlock are named at fine-grained '
      + 'detail in the mission handoff; no further sub-checkpoint numbering is established, so none is invented here.',
    'The phase outcomes below are taken directly from the provided visual roadmap and are tracked as phase-level '
      + 'milestones, not fine-grained sub-checkpoints.',
  ],
  referenceGroups: [
    {
      title: 'Named kickoff topics in the handoff',
      kind: 'parallel',
      items: [
        { title: 'Hashmaps Foundation (checkpoint 0.1)', detail: 'Named in the Operation Blueprint handoff as the '
          + 'explicitly numbered kickoff lesson; it is not imported as anyone’s progress.' },
        { title: 'Next: Two Pointers', detail: 'Named in the handoff as the next unlock after Hashmaps Foundation. '
          + 'No further fine-grained numbering is established in the source.' },
      ],
    },
    {
      title: 'Continuous pillars (throughout the journey)',
      kind: 'parallel',
      items: [
        { title: 'DSA practice', detail: 'Regular problem solving, pattern mastery, interview readiness.' },
        { title: 'Certifications', detail: 'AWS / Azure as relevant, Kubernetes (CKA), others as needed.' },
        { title: 'Projects & portfolio', detail: 'Real-world projects, open-source contributions, documented learnings.' },
        { title: 'Communication', detail: 'Technical writing, system design discussions, interview and architecture storytelling.' },
        { title: 'Career & industry', detail: 'Follow industry trends, learn from real systems, network and opportunities.' },
      ],
    },
  ],
  stages: [
    {
      id: 'stage-0-technical-rehab',
      title: 'Phase 0 — Technical Rehab',
      summary: 'Rebuild consistency, confidence, and core skills.',
      topics: ['Setup environment (dev tools, Git & GitHub, coding workflow)', 'DSA fundamentals (hashmaps, two '
        + 'pointers, sliding window, stack, and more)', 'Computer science basics (time & space complexity, '
        + 'recursion, basic data structures, problem-solving patterns)', 'Track progress (daily practice, '
        + 'consistency, small wins)'],
      source: { ...BLUEPRINT_VISUAL, section: 'Phase 0 Technical Rehab' },
      checkpoints: [
        {
          id: 'stage-0-review',
          title: 'Technical Rehab phase review',
          action: 'Review your environment setup, DSA fundamentals practice, CS basics notes, and daily tracking '
            + 'log, then write one sentence per supporting topic confirming it is in place.',
          recoveryAction: 'Confirm your dev tools and Git workflow are set up and record one small coding win.',
          minutes: 30,
          criteria: ['Comfortable writing and running small code in your setup.', 'Describe a consistent daily '
            + 'practice habit.', 'State readiness to begin deeper backend work.'],
          sourceId: 'Stage 0',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'stage-1-backend-mastery',
      title: 'Phase 1 — Backend Mastery',
      summary: 'Become strong in building real backend systems.',
      topics: ['Programming language (Java primary; Go/other optional)', 'Core backend development (APIs & REST, '
        + 'authentication & authorization, error handling & logging, testing)', 'Databases (SQL Postgres/MySQL, '
        + 'NoSQL MongoDB, data modeling, indexing & query optimization)', 'Backend frameworks (Spring Boot, '
        + 'dependency injection, configuration management, microservice basics)'],
      source: { ...BLUEPRINT_VISUAL, section: 'Phase 1 Backend Mastery' },
      checkpoints: [
        {
          id: 'stage-1-review',
          title: 'Backend Mastery phase review',
          action: 'Review your backend language choice, REST API practice, SQL/NoSQL data modeling, and Spring '
            + 'Boot work, then summarize one backend service you can design end to end.',
          recoveryAction: 'Name one backend framework concept and one database choice for a small service.',
          minutes: 35,
          criteria: ['Explain how to design and build a robust backend service.', 'Connect an API decision to a '
            + 'data-modeling choice.', 'Describe one testing or error-handling practice.'],
          sourceId: 'Stage 1',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'stage-2-system-design-distributed',
      title: 'Phase 2 — System Design & Distributed Systems',
      summary: 'Learn to design scalable, reliable, and maintainable systems.',
      topics: ['System design fundamentals (requirements analysis, capacity estimation, high-level & low-level '
        + 'design)', 'Core components (load balancers, caching, message queues, databases at scale, CDN/DNS/API '
        + 'gateway)', 'Distributed systems concepts (consistency models, replication, partitioning & sharding, '
        + 'fault tolerance, CAP theorem)', 'Design practice (real-world design problems, trade-off discussions, '
        + 'iterative refinement)'],
      source: { ...BLUEPRINT_VISUAL, section: 'Phase 2 System Design & Distributed Systems' },
      checkpoints: [
        {
          id: 'stage-2-review',
          title: 'System Design & Distributed Systems phase review',
          action: 'Review your requirements analysis, core-component choices, and distributed-systems concepts for '
            + 'one design practice problem, then explain the scaling and fault-tolerance trade-offs you made.',
          recoveryAction: 'State one distributed-systems concept, such as the CAP theorem, in your own words.',
          minutes: 35,
          criteria: ['Explain a scalable, fault-tolerant design end to end.', 'Identify one trade-off among load '
            + 'balancing, caching, or queues.', 'Describe a consistency or partitioning choice and its risk.'],
          sourceId: 'Stage 2',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'stage-3-cloud-devops',
      title: 'Phase 3 — Cloud & DevOps',
      summary: 'Learn to deploy, scale, and operate systems in the real world.',
      topics: ['Cloud platforms (AWS primary; Azure/GCP optional; core compute, storage, networking, database '
        + 'services)', 'DevOps & CI/CD (Docker, Kubernetes, CI/CD pipelines, infrastructure as code with '
        + 'Terraform)', 'Monitoring & observability (logging, metrics, Jaeger tracing, alerting & incident '
        + 'response)', 'Security & reliability (IAM & access control, secrets management, system hardening, '
        + 'backup & disaster recovery)'],
      source: { ...BLUEPRINT_VISUAL, section: 'Phase 3 Cloud & DevOps' },
      checkpoints: [
        {
          id: 'stage-3-review',
          title: 'Cloud & DevOps phase review',
          action: 'Review your cloud platform services, containerization/CI-CD setup, observability stack, and '
            + 'security hardening notes, then describe how you would deploy and secure one workload at scale.',
          recoveryAction: 'Name one core cloud service and one CI/CD step you understand.',
          minutes: 35,
          criteria: ['Explain how to deploy, operate, and secure a system at scale.', 'Describe one monitoring or '
            + 'alerting signal you would track.', 'State one IAM, secrets, or backup/disaster-recovery safeguard.'],
          sourceId: 'Stage 3',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'stage-4-ai-integration-advanced-architecture',
      title: 'Phase 4 — AI Integration & Advanced Architecture',
      summary: 'Combine traditional systems with modern AI capabilities.',
      topics: ['AI/ML foundations, practical (LLM basics, prompt engineering, model APIs such as OpenAI, AI system '
        + 'design patterns)', 'AI-integrated systems (RAG, vector databases, AI agents & tool use, embedding AI '
        + 'into products)', 'Advanced architecture (event-driven architecture, microservices at scale, '
        + 'domain-driven design, multi-region systems)', 'Emerging technologies (serverless, edge computing, '
        + 'real-time systems, GenAI product architectures)'],
      source: { ...BLUEPRINT_VISUAL, section: 'Phase 4 AI Integration & Advanced Architecture' },
      checkpoints: [
        {
          id: 'stage-4-review',
          title: 'AI Integration & Advanced Architecture phase review',
          action: 'Review your LLM/prompting notes, one RAG or agent sketch, and one event-driven or multi-region '
            + 'architecture idea, then explain how you would architect an AI-integrated system.',
          recoveryAction: 'Name one AI-integrated-systems concept, such as RAG or vector databases.',
          minutes: 35,
          criteria: ['Explain how to architect an AI-integrated, next-generation system.', 'Connect an AI '
            + 'capability, such as RAG or agents, to a backend integration point.', 'Describe one advanced-'
            + 'architecture pattern, such as event-driven design, DDD, or multi-region systems.'],
          sourceId: 'Stage 4',
          granularity: 'phase',
        },
      ],
    },
  ],
});

const credentialMission: Mission = defineOperation({
  id: 'credential',
  name: 'Certifications',
  operation: 'Credential Forge',
  description: 'Capability path across Azure certifications — Foundations (AZ-900), Core Cloud Skills (AZ-104), '
    + 'Application Development (AZ-204), Architect Level (AZ-305), and AI & Data Specialization (AI-102) — plus '
    + 'optional AWS, data-engineering, and high-ROI credentials, ending in an apply-and-showcase phase.',
  purpose: 'Build demonstrable capability through hands-on labs and real projects; verify current certification '
    + 'names and requirements with the official provider before scheduling any exam.',
  color: 'sand',
  icon: 'award',
  owner: 'Certifications Coach',
  dependencies: ['fabric', 'neural'],
  coverage: 'phase-level',
  sources: [
    { document: 'Operation_Credential_Forge_Mission_Handoff.pdf', section: '3. Roadmap', page: 2 },
    { ...CREDENTIAL_VISUAL, section: 'Canonical visual roadmap: Stages 1–8' },
  ],
  sourceNotes: [
    'Exam names (AZ-900, AZ-104, AZ-204, AZ-305, AI-102, DP-203, AWS SAA-C03, and others) are taken from the '
      + 'provided source material; certifications may be retired, renamed, or have changed availability — check the '
      + 'official provider before scheduling any exam.',
    'A completed app milestone means self-recorded learning/capability progress, not automatic exam registration or '
      + 'credential issuance.',
    'Stage 1 support detail (Microsoft Learn setup, Module 1: Describe Cloud Concepts, and the Module 2 '
      + 'next-unlock) is named in the mission handoff as supporting detail; it does not by itself certify '
      + 'completion of AZ-900.',
  ],
  resources: [
    { label: 'Microsoft Learn certification catalog', url: 'https://learn.microsoft.com/en-us/credentials/certifications/' },
  ],
  stages: [
    {
      id: 'stage-1-foundations',
      title: 'Stage 1 — Foundations',
      summary: 'Understand the big picture. Reference: AZ-900 Azure Fundamentals.',
      topics: ['Cloud concepts, IT fundamentals, networking basics, security fundamentals, DevOps basics, and AI '
        + 'fundamentals', 'Microsoft Learn setup and Module 1: Describe Cloud Concepts (named support in handoff)',
        'Next (reference): Module 2 — Core Azure Services'],
      source: { ...CREDENTIAL_VISUAL, section: 'Stage 1 Foundations' },
      checkpoints: [
        {
          id: 'stage-1-review',
          title: 'Foundations phase review (AZ-900 reference)',
          action: 'Review your cloud-concepts notes, Microsoft Learn setup, and Module 1: Describe Cloud Concepts '
            + 'work, then write one sentence each on cloud computing, scalability, and elasticity.',
          recoveryAction: 'Confirm Microsoft Learn sign-in and sandbox access are in place.',
          minutes: 25,
          criteria: ['Explain core cloud concepts, pricing, SLA, and support basics.', 'Describe one Azure service '
            + 'and one shared-responsibility boundary.', 'State readiness to continue toward Module 2: Core Azure '
            + 'Services.'],
          sourceId: 'Stage 1',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'stage-2-core-cloud-skills',
      title: 'Stage 2 — Core Cloud Skills',
      summary: 'Work with cloud services. Reference: AZ-104 Azure Administrator.',
      topics: ['Compute, storage, networking', 'Identity & access management', 'Security & monitoring', 'Backup & '
        + 'recovery', 'Cost management'],
      source: { ...CREDENTIAL_VISUAL, section: 'Stage 2 Core Cloud Skills' },
      checkpoints: [
        {
          id: 'stage-2-review',
          title: 'Core Cloud Skills phase review (AZ-104 reference)',
          action: 'Review your Azure resource management, identity/security, and monitoring notes, then describe '
            + 'one production-ready environment you could set up.',
          recoveryAction: 'Name one least-privilege role and one monitoring signal.',
          minutes: 30,
          criteria: ['Explain how to manage Azure resources and implement security/governance.', 'Describe a '
            + 'monitoring or cost-management choice.', 'State what makes an environment production-ready.'],
          sourceId: 'Stage 2',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'stage-3-application-development',
      title: 'Stage 3 — Application Development',
      summary: 'Build cloud applications. Reference: AZ-204 Azure Developer.',
      topics: ['Azure App Services, Azure Functions', 'Cosmos DB', 'Event Grid & Service Bus', 'Key Vault', 'CI/CD '
        + 'with GitHub Actions'],
      source: { ...CREDENTIAL_VISUAL, section: 'Stage 3 Application Development' },
      checkpoints: [
        {
          id: 'stage-3-review',
          title: 'Application Development phase review (AZ-204 reference)',
          action: 'Review your cloud-application build notes (App Services/Functions, messaging, Key Vault), then '
            + 'describe one serverless or event-driven feature end to end.',
          recoveryAction: 'Name one Azure data or messaging service you used in a sketch.',
          minutes: 30,
          criteria: ['Explain how to build and deploy a cloud application with security and DevOps practices.',
            'Describe a serverless or event-driven design choice.', 'State one CI/CD step for the application.'],
          sourceId: 'Stage 3',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'stage-4-architect-level',
      title: 'Stage 4 — Architect Level',
      summary: 'Design scalable solutions. Reference: AZ-305 Azure Solutions Architect.',
      topics: ['Design for reliability, scalability, security', 'Hybrid and multi-cloud scenarios, governance and '
        + 'compliance', 'Cost optimization, migration strategies', 'Well-Architected Framework'],
      source: { ...CREDENTIAL_VISUAL, section: 'Stage 4 Architect Level' },
      checkpoints: [
        {
          id: 'stage-4-review',
          title: 'Architect Level phase review (AZ-305 reference)',
          action: 'Review your solution-architecture notes and one design artifact, then explain the architectural '
            + 'trade-offs and governance choices for a sample enterprise scenario.',
          recoveryAction: 'Name one Well-Architected Framework pillar relevant to your design.',
          minutes: 35,
          criteria: ['Explain how to design an end-to-end solution with architectural trade-offs.', 'Describe a '
            + 'governance or security choice for the design.', 'State one cost or migration consideration.'],
          sourceId: 'Stage 4',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'stage-5-ai-and-data-specialization',
      title: 'Stage 5 — AI & Data Specialization',
      summary: 'Integrate AI into architecture. Reference: AI-102 Azure AI Engineer.',
      topics: ['Azure OpenAI, AI Foundry', 'RAG and vector search', 'AI agents & Semantic Kernel', 'Responsible AI '
        + '& governance'],
      source: { ...CREDENTIAL_VISUAL, section: 'Stage 5 AI & Data Specialization' },
      checkpoints: [
        {
          id: 'stage-5-review',
          title: 'AI & Data Specialization phase review (AI-102 reference)',
          action: 'Review your Azure AI service notes (OpenAI, AI Foundry, RAG, agents), then describe one '
            + 'responsible-AI safeguard for an AI feature integrated into an enterprise application.',
          recoveryAction: 'Name one Azure AI service and one responsible-AI consideration.',
          minutes: 30,
          criteria: ['Explain how to build and deploy an AI solution integrated into enterprise applications.',
            'Describe a RAG or agentic design choice.', 'State one responsible-AI or governance safeguard.'],
          sourceId: 'Stage 5',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'stage-5a-data-engineering',
      title: 'Stage 5A — Data Engineering (optional, recommended)',
      summary: 'Optional but recommended companion to AI specialization. Reference: DP-203 Azure Data Engineer.',
      topics: ['Data pipelines', 'Azure Data Factory', 'Synapse Analytics / Microsoft Fabric', 'Data lakehouse',
        'Real-time analytics'],
      optional: true,
      source: { ...CREDENTIAL_VISUAL, section: 'Stage 5 Data Engineering (optional)' },
    },
    {
      id: 'stage-6-aws',
      title: 'Stage 6 — Expand to AWS (complementary, suggested)',
      summary: 'Broaden cloud expertise. Reference: AWS Solutions Architect Associate (SAA-C03).',
      topics: ['AWS core services', 'IAM, VPC, EC2, S3, RDS', 'Cloud architecture patterns', 'Security and cost '
        + 'management'],
      optional: true,
      source: { ...CREDENTIAL_VISUAL, section: 'Stage 6 Expand to AWS' },
    },
    {
      id: 'stage-7-additional',
      title: 'Stage 7 — Additional high-ROI certifications (optional)',
      summary: 'Optional supporting credentials that can enhance your profile; none are required to progress.',
      topics: ['GitHub Foundations', 'GitHub Actions', 'HashiCorp Terraform Associate', 'Microsoft Applied Skills',
        'Microsoft Fabric, DP-600 (optional)', 'FinOps Foundation (conditional)'],
      optional: true,
      source: { ...CREDENTIAL_VISUAL, section: 'Stage 7 Additional High-ROI Certs' },
    },
    {
      id: 'stage-8-apply-and-showcase',
      title: 'Stage 8 — Apply & Showcase',
      summary: 'Turn knowledge into impact.',
      topics: ['Build real projects (cloud-native application, AI-powered solution, end-to-end architecture)',
        'Document & share (GitHub repositories, architecture diagrams, technical blogs)', 'Showcase in interviews '
        + '(discuss design decisions, tradeoffs, demonstrate hands-on experience)'],
      source: { ...CREDENTIAL_VISUAL, section: 'Stage 8 Apply & Showcase' },
      checkpoints: [
        {
          id: 'stage-8-review',
          title: 'Apply & Showcase phase review',
          action: 'Document one real project with its architecture diagram and write-up, then rehearse explaining '
            + 'its design decisions and trade-offs as you would in an interview.',
          recoveryAction: 'Write one sentence describing a project’s architecture and one trade-off.',
          minutes: 35,
          criteria: ['Turn certification learning into a demonstrable project.', 'Document the project with a '
            + 'diagram or written explanation.', 'Explain design decisions and trade-offs as interview-ready '
            + 'evidence.'],
          sourceId: 'Stage 8',
          granularity: 'phase',
        },
      ],
    },
  ],
});

const neuralMission: Mission = defineOperation({
  id: 'neural',
  name: 'AI Engineering',
  operation: 'Neural Edge',
  description: 'Seven-phase AI Architect roadmap — Foundations, AI Backend Engineering, RAG Systems, Azure AI '
    + 'Platform, Service Fabric AI Integration, Enterprise AI Architecture, and Certifications & Capstone — '
    + 'tracked at the phase level shown in the dedicated roadmap.',
  purpose: 'Build enterprise AI-architecture capability end to end, from LLM foundations through a Service Fabric '
    + '+ Azure AI capstone, validated with phase-level evidence rather than certificate collection alone.',
  color: 'teal',
  icon: 'cpu',
  owner: 'AI Architect Coach',
  dependencies: ['pattern', 'system'],
  coverage: 'phase-level',
  sources: [
    { document: 'Operation_Neural_Edge_AI_Architect_Roadmap.pdf', section: 'Mission map and project ladder', page: 2 },
    { ...NEURAL_VISUAL, section: 'Phases 0–6' },
  ],
  sourceNotes: [
    'Phase numbering here is the latest dedicated roadmap (0–6) from the dedicated AI Architect roadmap page; it '
      + 'supersedes an older 7-section visual counting (1–7) used in an earlier artifact.',
    'No current personal progress state is sourced for this roadmap; the phase gates below require demonstrated '
      + 'core-capability evidence, not certification-exam claims.',
    'AI-900, AI-102, and AZ-305 are named as the certification priority in the source roadmap (AI-102 highest '
      + 'priority); verify current exam names and availability with the official provider before scheduling.',
  ],
  referenceGroups: [
    {
      title: 'Project ladder (reference)',
      kind: 'projects',
      items: [
        { title: 'AI Gateway API', detail: 'LLM APIs, backend integration.' },
        { title: 'Structured AI Utility', detail: 'Reliable JSON outputs / extraction.' },
        { title: 'PDF Document Chat', detail: 'RAG fundamentals.' },
        { title: 'Company Knowledge Assistant', detail: 'Vector search + retrieval.' },
        { title: 'Azure AI Deployment', detail: 'Enterprise cloud integration.' },
        { title: 'SF AI Assistant', detail: 'Distributed AI architecture.' },
        { title: 'Multi-Agent Assistant', detail: 'Tools + orchestration.' },
        { title: 'Enterprise AI Platform', detail: 'Governance + observability + cost.' },
        { title: 'AI Architect Capstone', detail: 'End-to-end architecture + review.' },
      ],
    },
  ],
  stages: [
    {
      id: 'phase-0-ai-foundations',
      title: 'Phase 0 — AI Foundations',
      summary: 'Understand how modern AI works before building with it.',
      topics: ['Tokens & context windows', 'Embeddings & vector similarity', 'Prompting & structured outputs',
        'Function/tool calling', 'First LLM API call'],
      source: { ...NEURAL_VISUAL, section: 'Phase 0 AI Foundations' },
      checkpoints: [
        {
          id: 'phase-0-review',
          title: 'AI Foundations phase review',
          action: 'Review your notes on tokens/context windows, embeddings, prompting basics, and one LLM API call '
            + 'you made, then explain each concept in your own words.',
          recoveryAction: 'Define one concept: token, embedding, or prompt structure.',
          minutes: 25,
          criteria: ['Explain how LLMs use tokens, context windows, and embeddings.', 'Describe a prompting '
            + 'practice, such as structure, temperature, or system versus user prompts.', 'Confirm you made at '
            + 'least one basic LLM API call.'],
          sourceId: 'Phase 0',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'phase-1-ai-backend-engineering',
      title: 'Phase 1 — AI Backend Engineering',
      summary: 'Treat AI as a production backend dependency.',
      topics: ['Python + FastAPI', 'OpenAI / Azure OpenAI SDK', 'Streaming & retries, rate limits & error '
        + 'handling', 'AI Gateway API'],
      source: { ...NEURAL_VISUAL, section: 'Phase 1 AI Backend Engineering' },
      checkpoints: [
        {
          id: 'phase-1-review',
          title: 'AI Backend Engineering phase review',
          action: 'Review your Python/FastAPI AI endpoint, structured-output handling, and retry/rate-limit logic, '
            + 'then describe how one AI API is wired into an application.',
          recoveryAction: 'Name one retry or rate-limit safeguard in your AI backend code.',
          minutes: 30,
          criteria: ['Explain how AI is treated as a normal backend dependency.', 'Describe structured output '
            + 'handling, such as JSON mode or function calling.', 'State one resilience practice, such as '
            + 'retries, rate limits, or error handling.'],
          sourceId: 'Phase 1',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'phase-2-rag-systems',
      title: 'Phase 2 — RAG Systems',
      summary: 'Build knowledge systems that retrieve information before generation.',
      topics: ['Chunking strategies', 'Embeddings', 'Vector databases', 'Azure AI Search', 'Hybrid search & '
        + 'reranking', 'Metadata/security filtering'],
      source: { ...NEURAL_VISUAL, section: 'Phase 2 RAG Systems' },
      checkpoints: [
        {
          id: 'phase-2-review',
          title: 'RAG Systems phase review',
          action: 'Review your chunking, embeddings, and vector-search setup for a small document set, then trace '
            + 'one answer back to its retrieved source passage.',
          recoveryAction: 'Name one chunking or embedding choice you made.',
          minutes: 35,
          criteria: ['Explain how retrieval supports generation in a RAG pipeline.', 'Describe a vector-database '
            + 'or hybrid-search choice.', 'Show a metadata or security filter applied to retrieved content.'],
          sourceId: 'Phase 2',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'phase-3-azure-ai-platform',
      title: 'Phase 3 — Azure AI Platform',
      summary: 'Move from prototype to enterprise Azure AI.',
      topics: ['Azure OpenAI', 'Azure AI Foundry', 'Azure AI Search', 'Prompt Flow', 'Managed Identity + Key '
        + 'Vault', 'Responsible AI + guardrails'],
      source: { ...NEURAL_VISUAL, section: 'Phase 3 Azure AI Platform' },
      checkpoints: [
        {
          id: 'phase-3-review',
          title: 'Azure AI Platform phase review',
          action: 'Review your Azure OpenAI deployment, Azure AI Search indexing, and managed-identity/Key Vault '
            + 'setup, then describe one responsible-AI guardrail you applied.',
          recoveryAction: 'Name one Azure AI Platform service and its role.',
          minutes: 30,
          criteria: ['Explain how to deploy and manage an AI solution on Azure.', 'Describe secret-free '
            + 'authentication via managed identity.', 'State one responsible-AI guardrail or evaluation check.'],
          sourceId: 'Phase 3',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'phase-4-service-fabric-ai-integration',
      title: 'Phase 4 — Service Fabric AI Integration',
      summary: 'Apply AI architecture directly to the Service Fabric ecosystem.',
      topics: ['Service Fabric basics (architecture, stateless vs stateful, reliable collections)', 'AI service in '
        + 'Service Fabric (design, service placement & scaling, fault tolerance, configuration management)',
        'Enterprise integration (API Gateway → AI service, Azure OpenAI integration, AI Search integration, '
        + 'caching/resilience/failover)'],
      source: { ...NEURAL_VISUAL, section: 'Phase 4 Service Fabric AI Integration' },
      checkpoints: [
        {
          id: 'phase-4-review',
          title: 'Service Fabric AI Integration phase review',
          action: 'Review your stateless/stateful service design, gateway-to-AI-service flow, and caching/failover '
            + 'notes, then describe how an AI service would run inside a Service Fabric cluster.',
          recoveryAction: 'Name one Service Fabric concept, such as stateless versus stateful, relevant to an AI '
            + 'service.',
          minutes: 35,
          criteria: ['Explain how to design and implement AI services within Service Fabric.', 'Describe an API '
            + 'Gateway to AI-service integration path.', 'State one caching, resilience, or failover safeguard.'],
          sourceId: 'Phase 4',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'phase-5-enterprise-ai-architecture',
      title: 'Phase 5 — Enterprise AI Architecture',
      summary: 'Design AI systems for security, reliability, scale, and governance.',
      topics: ['Prompt injection & data leakage', 'Identity / RBAC', 'Observability & evaluation', 'Cost '
        + 'optimization', 'Model routing & fallbacks', 'Agents & orchestration'],
      source: { ...NEURAL_VISUAL, section: 'Phase 5 Enterprise AI Architecture' },
      checkpoints: [
        {
          id: 'phase-5-review',
          title: 'Enterprise AI Architecture phase review',
          action: 'Review your prompt-injection defenses, identity/RBAC setup, observability plan, and '
            + 'model-routing/fallback notes, then describe one agent-orchestration pattern you would use.',
          recoveryAction: 'Name one prompt-injection or data-leakage defense.',
          minutes: 35,
          criteria: ['Explain how to defend against prompt injection and data leakage.', 'Describe an '
            + 'observability/evaluation or cost-optimization practice.', 'State one model-routing, fallback, or '
            + 'agent-orchestration choice.'],
          sourceId: 'Phase 5',
          granularity: 'phase',
        },
      ],
    },
    {
      id: 'phase-6-certifications-capstone',
      title: 'Phase 6 — Certifications & Capstone',
      summary: 'Validate capability through certifications and a production-style architecture.',
      topics: ['AI-900 — Foundations', 'AI-102 — highest priority', 'AZ-305 — Architecture', 'Service Fabric + '
        + 'Azure AI capstone', 'Architecture review / interview readiness'],
      source: { ...NEURAL_VISUAL, section: 'Phase 6 Certifications & Capstone' },
      checkpoints: [
        {
          id: 'phase-6-review',
          title: 'Certifications & Capstone phase review',
          action: 'Review your capstone architecture, such as Service Fabric + RAG + Azure AI, and rehearse '
            + 'explaining its design in an architecture review.',
          recoveryAction: 'Write one sentence describing your capstone’s architecture.',
          minutes: 35,
          criteria: ['Explain the end-to-end capstone architecture and its trade-offs.', 'Reference AI-900, '
            + 'AI-102, and AZ-305 as the certification priority for this mission, and verify current provider '
            + 'availability before scheduling.', 'Demonstrate interview/architecture-review readiness.'],
          sourceId: 'Phase 6',
          granularity: 'phase',
        },
      ],
    },
  ],
});

export const growthMissions: Mission[] = [blueprintMission, credentialMission, neuralMission];
