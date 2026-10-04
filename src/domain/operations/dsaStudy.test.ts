import { describe, expect, it } from 'vitest';
import { dsaSections, dsaMasteryGate, dsaPracticeProtocol } from './dsaStudy';
import { dsaExpandedMission, dsaPhases } from './dsaExpanded';
import { technicalMissions } from './technical';

describe('complete expanded DSA source coverage', () => {
  it('contains all 50 source sections, every logical problem occurrence and original row metadata', () => {
    expect(dsaSections.map(section => section.number)).toEqual(Array.from({ length: 50 }, (_, index) => index + 1));
    const rows = dsaSections.flatMap(section => section.problems);
    expect(rows).toHaveLength(939);
    expect(new Set(rows.map(problem => problem.id)).size).toBe(371);
    for (const section of dsaSections) {
      expect(section.page).toBe(section.number * 2 + 1);
      expect(section.summary.length).toBeGreaterThan(20);
      expect(section.goal.length).toBeGreaterThan(20);
      expect(section.topics.length).toBeGreaterThan(0);
      expect(section.guidance.length).toBeGreaterThan(20);
      for (const problem of section.problems) {
        expect(problem.url).toMatch(/^https:\/\/leetcode\.com\/problems\/[a-z0-9-]+\/$/);
        expect(problem.page === section.page || problem.page === section.page + 1).toBe(true);
        expect(['Easy', 'Medium', 'Hard']).toContain(problem.difficulty);
        expect(['foundation', 'core-a', 'core-b', 'stress']).toContain(problem.set);
        expect(problem.title.length).toBeGreaterThan(0);
      }
    }
    expect(dsaSections[0].problems.find(problem => problem.id === 1)).toMatchObject({ set: 'core-a', difficulty: 'Easy' });
    expect(dsaSections[15].problems.some(problem => problem.difficulty === 'Easy')).toBe(false);
    for (const number of [8, 10, 34]) {
      const wrapped = dsaSections[number - 1].problems.filter(problem => problem.id === 1438);
      expect(wrapped).toHaveLength(1);
      expect(wrapped[0].title).toBe('Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit');
    }
  });

  it('retains the entire original roadmap as an unchanged prefix and joins both branches before appending', () => {
    const original = technicalMissions.find(mission => mission.id === 'pattern')!;
    expect(dsaExpandedMission.checkpoints.slice(0, 5)).toEqual(original.checkpoints);
    expect(dsaExpandedMission.stages?.slice(0, 2)).toEqual(original.stages);
    expect(dsaExpandedMission.checkpoints).toHaveLength(48);
    expect(dsaExpandedMission.stages).toHaveLength(14);
    expect(dsaExpandedMission.checkpoints[5].prerequisites).toEqual(['pattern-v2-2-3', 'pattern-v2-2-4']);
    expect(dsaExpandedMission.appendFrom).toBe('2.0.0');
  });

  it('follows Appendix A rather than chapter order and marks the omitted divide-and-conquer placement', () => {
    expect(dsaPhases[0].sections).toEqual([2, 42, 3, 4]);
    expect(dsaPhases[2].sections).toEqual([9, 10, 11, 12, 14]);
    expect(dsaPhases[3].sections).toEqual([6, 7, 8]);
    expect(dsaPhases[4].sections).toEqual([13]);
    expect(dsaPhases[5].sections).toEqual([15, 16, 38]);
    expect(dsaPhases[5].summary).toContain('explicit integration choice');
    expect(dsaPhases[9].sections).toEqual([31, 32, 33, 34, 35, 36]);
    const tracked = dsaExpandedMission.checkpoints.slice(5).map(checkpoint => checkpoint.studySection);
    expect(new Set(tracked).size).toBe(43);
    expect([...tracked].sort((a, b) => a! - b!)).toEqual([...Array.from({ length: 41 }, (_, index) => index + 2), 43, 50]);
    for (const support of [1, 44, 45, 46, 47, 48, 49]) expect(tracked).not.toContain(support);
    expect(dsaMasteryGate).toHaveLength(5);
    expect(dsaPracticeProtocol.join(' ')).toContain('does not require solving every listed problem');
  });

  it('keeps bounded practice actions and complete topic-specific criteria with source pages', () => {
    for (const checkpoint of dsaExpandedMission.checkpoints.slice(5)) {
      expect(checkpoint.action.length).toBeLessThanOrEqual(200);
      expect(checkpoint.minutes).toBe(30);
      expect(checkpoint.criteria).toHaveLength(6);
      expect(checkpoint.source?.page).toBe(checkpoint.studySection! * 2 + 1);
      expect(checkpoint.topics?.length).toBeGreaterThan(0);
    }
  });
});
