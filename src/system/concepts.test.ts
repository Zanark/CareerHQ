import { describe, expect, it } from 'vitest';
import { matchingConceptGroups, SYSTEM_CONCEPT_SOURCE, SYSTEM_PATTERN_GUIDANCE, systemConceptGroups, systemConcepts } from './concepts';

describe('the supplied one-page System Design roadmap', () => {
  it('preserves all 20 main sections in the visual reading route', () => {
    expect(systemConceptGroups.map(group => group.title)).toEqual([
      'Introduction', 'Performance vs Scalability', 'Latency vs Throughput', 'Availability vs Consistency',
      'Consistency Patterns', 'Availability Patterns', 'Background Jobs', 'Domain Name System',
      'Content Delivery Networks', 'Load Balancers', 'Application Layer', 'Databases', 'Caching',
      'Asynchronism', 'Idempotent Operations', 'Communication', 'Performance Antipatterns', 'Monitoring',
      'Cloud Design Patterns', 'Reliability Patterns',
    ]);
    expect(systemConcepts).toHaveLength(160);
    expect(systemConceptGroups.map(group => systemConcepts.filter(concept => concept.groupId === group.id).length))
      .toEqual([3, 1, 1, 4, 4, 11, 4, 1, 3, 6, 3, 13, 12, 4, 1, 8, 11, 8, 36, 26]);
  });

  it('preserves source nesting and repeated pattern contexts instead of deduplicating them', () => {
    expect(new Set(systemConcepts.map(concept => concept.id)).size).toBe(systemConcepts.length);
    for (const concept of systemConcepts) {
      if (concept.parentId) {
        const parent = systemConcepts.find(candidate => candidate.id === concept.parentId)!;
        expect(parent).toBeDefined();
        expect(concept.path.slice(0, -1)).toEqual(parent.path);
      }
    }
    expect(systemConcepts.filter(concept => concept.title === 'Circuit Breaker').map(concept => concept.path))
      .toEqual([['Reliability Patterns', 'High Availability', 'Circuit Breaker'], ['Reliability Patterns', 'Resiliency', 'Circuit Breaker']]);
    expect(systemConcepts.filter(concept => concept.title === 'Valet Key').map(concept => concept.path))
      .toEqual([['Cloud Design Patterns', 'Data Management', 'Valet Key'], ['Reliability Patterns', 'Security', 'Valet Key']]);
    expect(systemConcepts.filter(concept => concept.title === 'Health Endpoint Monitoring')).toHaveLength(3);
    expect(systemConcepts.filter(concept => concept.title === 'CQRS')).toHaveLength(2);
    expect(systemConcepts.find(concept => concept.title === 'Master - Slave')?.path).toEqual(['Availability Patterns', 'Replication', 'Master - Slave']);
    expect(systemConcepts.find(concept => concept.title === 'Refresh Ahead')?.path).toEqual(['Caching', 'Strategies', 'Refresh Ahead']);
  });

  it('keeps the complete cloud, reliability, monitoring and antipattern sets', () => {
    const cloud = systemConceptGroups.find(group => group.id === 'cloud-patterns')!;
    expect(cloud.children.map(child => [child.title, child.children.length])).toEqual([
      ['Design & Implementation', 14], ['Data Management', 8], ['Messaging', 10],
    ]);
    const reliability = systemConceptGroups.find(group => group.id === 'reliability')!;
    expect(reliability.children.map(child => [child.title, child.children.length])).toEqual([
      ['Availability', 5], ['High Availability', 5], ['Resiliency', 8], ['Security', 3],
    ]);
    for (const title of ['Retry Storm', 'Extraneous Fetching', 'Improper Instantiation', 'Visualization & Alerts',
      'Availability in Parallel vs Sequence', 'GraphQL', 'Wide Column Store', 'Choreography', 'Claim Check',
      'Anti-Corruption Layer', 'Compute Resource Consolidation', 'Compensating Transaction']) {
      expect(systemConcepts.some(concept => concept.title === title), title).toBe(true);
    }
  });

  it('treats concepts and pattern overviews as references, never completion records', () => {
    expect(SYSTEM_PATTERN_GUIDANCE).toContain('not mastery of every pattern');
    expect(SYSTEM_CONCEPT_SOURCE).toMatchObject({ document: 'system-design.pdf', page: 1, attribution: 'roadmap.sh' });
    expect(systemConceptGroups.filter(group => group.overview).map(group => group.id)).toEqual(['cloud-patterns', 'reliability']);
    for (const node of systemConcepts) {
      expect(node).not.toHaveProperty('completed');
      expect(node).not.toHaveProperty('prerequisites');
    }
  });

  it('filters with the whole source branch context intact', () => {
    expect(matchingConceptGroups(' Circuit Breaker ').map(group => group.id)).toEqual(['reliability']);
    expect(matchingConceptGroups('cqrs').map(group => group.id)).toEqual(['cloud-patterns']);
    expect(matchingConceptGroups('retry').map(group => group.id)).toEqual(['antipatterns', 'reliability']);
    expect(matchingConceptGroups('not-a-concept')).toEqual([]);
    expect(matchingConceptGroups('')).toBe(systemConceptGroups);
  });
});
