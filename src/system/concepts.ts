export interface ConceptTopic {
  title: string;
  children: ConceptTopic[];
}

export interface ConceptGroup {
  id: string;
  title: string;
  summary: string;
  color: string;
  overview?: boolean;
  children: ConceptTopic[];
}

const topic = (title: string, children: ConceptTopic[] = []): ConceptTopic => ({ title, children });
const topics = (...titles: string[]) => titles.map(title => topic(title));

export const SYSTEM_CONCEPT_SOURCE = { document: 'system-design.pdf', page: 1, attribution: 'roadmap.sh', url: 'https://roadmap.sh/system-design' } as const;
export const SYSTEM_PATTERN_GUIDANCE = 'The source asks for an overview of the design patterns, not mastery of every pattern. This map is a concepts reference, not a compulsory completion checklist.';

export const systemConceptGroups: readonly ConceptGroup[] = [
  {
    id: 'introduction', title: 'Introduction', color: 'blue',
    summary: 'Frame the problem, identify requirements and constraints, and explain how you would approach a system design.',
    children: topics('What is System Design?', 'How to approach System Design?'),
  },
  {
    id: 'performance', title: 'Performance vs Scalability', color: 'violet',
    summary: 'Distinguish the performance of a given system from its ability to handle a growing workload.',
    children: [],
  },
  {
    id: 'latency', title: 'Latency vs Throughput', color: 'sand',
    summary: 'Separate the time taken by one operation from the rate at which operations are completed.',
    children: [],
  },
  {
    id: 'availability-consistency', title: 'Availability vs Consistency', color: 'rose',
    summary: 'Examine consistency and availability choices during network partitions. AP and CP are source labels, not a claim that every system has one permanent trade-off.',
    children: [topic('CAP Theorem', topics('AP - Availability + Partition Tolerance', 'CP - Consistency + Partition Tolerance'))],
  },
  {
    id: 'consistency', title: 'Consistency Patterns', color: 'blue',
    summary: 'Understand what different consistency models promise about the values a reader can observe.',
    children: topics('Weak Consistency', 'Eventual Consistency', 'Strong Consistency'),
  },
  {
    id: 'availability', title: 'Availability Patterns', color: 'violet',
    summary: 'Compare fail-over arrangements, replication arrangements, and the effect of component dependencies on availability.',
    children: [
      topic('Fail-Over', topics('Active - Active', 'Active - Passive')),
      topic('Replication', topics('Master - Slave', 'Master - Master')),
      topic('Availability in Numbers', topics('99.9% Availability - three 9s', '99.99% Availability - four 9s', 'Availability in Parallel vs Sequence')),
    ],
  },
  {
    id: 'background-jobs', title: 'Background Jobs', color: 'sand',
    summary: 'Decide how background work starts and how a caller receives its result or status.',
    children: topics('Event-Driven', 'Schedule Driven', 'Returning Results'),
  },
  {
    id: 'dns', title: 'Domain Name System', color: 'blue',
    summary: 'Understand how names resolve to destinations and where DNS fits in a request path.',
    children: [],
  },
  {
    id: 'cdn', title: 'Content Delivery Networks', color: 'magenta',
    summary: 'Compare content pushed to edge locations with content fetched by those locations on demand.',
    children: topics('Push CDNs', 'Pull CDNs'),
  },
  {
    id: 'load-balancers', title: 'Load Balancers', color: 'amber',
    summary: 'Study traffic distribution, protocol-layer choices, reverse proxies and scaling out the serving tier.',
    children: topics('LB vs Reverse Proxy', 'Load Balancing Algorithms', 'Layer 7 Load Balancing', 'Layer 4 Load Balancing', 'Horizontal Scaling'),
  },
  {
    id: 'application', title: 'Application Layer', color: 'violet',
    summary: 'Explore service boundaries and how services locate one another.',
    children: topics('Microservices', 'Service Discovery'),
  },
  {
    id: 'databases', title: 'Databases', color: 'blue',
    summary: 'Choose data models and scaling techniques by the access patterns and consistency requirements of the workload.',
    children: [
      topic('SQL vs NoSQL'),
      topic('RDBMS', topics('Replication', 'Sharding', 'Federation', 'Denormalization', 'SQL Tuning')),
      topic('NoSQL', topics('Key-Value Store', 'Document Store', 'Wide Column Store', 'Graph Databases')),
    ],
  },
  {
    id: 'caching', title: 'Caching', color: 'sand',
    summary: 'Consider both where a cache lives and how cached state is read, refreshed and written.',
    children: [
      topic('Strategies', topics('Refresh Ahead', 'Write-behind', 'Write-through', 'Cache Aside')),
      topic('Types of Caching', topics('Client Caching', 'CDN Caching', 'Web Server Caching', 'Database Caching', 'Application Caching')),
    ],
  },
  {
    id: 'asynchronism', title: 'Asynchronism', color: 'amber',
    summary: 'Decouple work through queues while controlling backlog and pressure on downstream consumers.',
    children: topics('Back Pressure', 'Task Queues', 'Message Queues'),
  },
  {
    id: 'idempotency', title: 'Idempotent Operations', color: 'rose',
    summary: 'Reason about repeated requests and side effects so retries do not unintentionally repeat an operation.',
    children: [],
  },
  {
    id: 'communication', title: 'Communication', color: 'blue',
    summary: 'Distinguish transport protocols from application communication and API styles.',
    children: topics('HTTP', 'TCP', 'UDP', 'RPC', 'REST', 'gRPC', 'GraphQL'),
  },
  {
    id: 'antipatterns', title: 'Performance Antipatterns', color: 'rose',
    summary: 'Recognize design choices that create unnecessary load, contention, blocking or repeated work.',
    children: topics('Busy Database', 'Busy Frontend', 'Chatty I/O', 'Extraneous Fetching', 'Improper Instantiation', 'Monolithic Persistence', 'No Caching', 'Noisy Neighbor', 'Synchronous I/O', 'Retry Storm'),
  },
  {
    id: 'monitoring', title: 'Monitoring', color: 'violet',
    summary: 'Choose signals and instrumentation for the questions an operator needs to answer, then make them observable and actionable.',
    children: topics('Health Monitoring', 'Availability Monitoring', 'Performance Monitoring', 'Security Monitoring', 'Usage Monitoring', 'Instrumentation', 'Visualization & Alerts'),
  },
  {
    id: 'cloud-patterns', title: 'Cloud Design Patterns', color: 'magenta', overview: true,
    summary: 'Survey design, data and messaging patterns and identify when each could help. This source explicitly does not require mastery of every pattern.',
    children: [
      topic('Design & Implementation', topics('Strangler Fig', 'Static Content Hosting', 'Sidecar', 'Pipes & Filters', 'Leader Election', 'Gateway Routing', 'Gateway Offloading', 'Gateway Aggregation', 'External Config Store', 'Compute Resource Consolidation', 'CQRS', 'Backends for Frontend', 'Anti-Corruption Layer', 'Ambassador')),
      topic('Data Management', topics('Valet Key', 'Static Content Hosting', 'Sharding', 'Materialized View', 'Index Table', 'Event Sourcing', 'CQRS', 'Cache-Aside')),
      topic('Messaging', topics('Sequential Convoy', 'Scheduling Agent Supervisor', 'Queue-based Load Leveling', 'Publisher/Subscriber', 'Priority Queue', 'Pipes and Filters', 'Competing Consumers', 'Choreography', 'Claim Check', 'Async Request Reply')),
    ],
  },
  {
    id: 'reliability', title: 'Reliability Patterns', color: 'amber', overview: true,
    summary: 'Compare availability, high-availability, resiliency and security patterns. Repeated patterns are retained in each source category rather than counted as new achievements.',
    children: [
      topic('Availability', topics('Deployment Stamps', 'Geodes', 'Health Endpoint Monitoring', 'Queue-Based Load Leveling', 'Throttling')),
      topic('High Availability', topics('Deployment Stamps', 'Geodes', 'Health Endpoint Monitoring', 'Bulkhead', 'Circuit Breaker')),
      topic('Resiliency', topics('Bulkhead', 'Circuit Breaker', 'Compensating Transaction', 'Health Endpoint Monitoring', 'Leader Election', 'Queue-Based Load Leveling', 'Retry', 'Scheduler Agent Supervisor')),
      topic('Security', topics('Federated Identity', 'Gatekeeper', 'Valet Key')),
    ],
  },
];

export interface SystemConcept {
  id: string;
  title: string;
  groupId: string;
  path: string[];
  parentId?: string;
  depth: number;
}

export const systemConcepts: readonly SystemConcept[] = systemConceptGroups.flatMap(group => {
  const nodes: SystemConcept[] = [];
  const visit = (node: ConceptTopic, id: string, path: string[], parentId?: string) => {
    nodes.push({ id, title: node.title, groupId: group.id, path: [...path, node.title], parentId, depth: path.length });
    node.children.forEach((child, index) => visit(child, `${id}-${index + 1}`, [...path, node.title], id));
  };
  visit(group, `concept-${group.id}`, []);
  return nodes;
});

export function matchingConceptGroups(query: string): readonly ConceptGroup[] {
  const text = query.trim().toLowerCase();
  if (!text) return systemConceptGroups;
  const matches = new Set(systemConcepts.filter(concept => concept.path.join(' ').toLowerCase().includes(text)).map(concept => concept.groupId));
  return systemConceptGroups.filter(group => matches.has(group.id));
}

export const systemRelatedTracks = [
  { title: 'Backend', url: 'https://roadmap.sh/backend' },
  { title: 'Software Design and Architecture', url: 'https://roadmap.sh/software-design-architecture' },
  { title: 'Software Architect', url: 'https://roadmap.sh/software-architect' },
  { title: 'DevOps', url: 'https://roadmap.sh/devops' },
];
