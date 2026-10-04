import { describe, expect, it } from 'vitest';
import { systemPracticeCases, systemPracticeModules, systemCaseGuidance } from './systemPracticeContent';
import { systemPracticeMission } from './systemPractice';
import { SYSTEM_PRACTICE_SOURCE, systemDecisionLens, systemDiagnostics, systemMentalModel, systemPracticePhases, systemPracticeUnits, systemSketchTemplate } from './systemPracticeStudy';
import { systemConceptGroups } from '../../system/concepts';

describe('the complete System Design problems source', () => {
  it('preserves all 72 module identities, 146 practice prompts and physical page pairs', () => {
    expect(systemPracticeModules).toHaveLength(72);
    expect(systemPracticeModules.map(unit => unit.number)).toEqual(Array.from({ length: 72 }, (_, index) => index + 1));
    expect(systemPracticeModules.reduce((sum, unit) => sum + unit.practice.length, 0)).toBe(146);
    for (const unit of systemPracticeModules) {
      expect(unit.id).toBe(`module-${String(unit.number).padStart(2, '0')}`);
      expect(unit.page).toBe(unit.number * 2 + 2);
      expect(unit.summary.length).toBeGreaterThan(40);
      expect(unit.gate.length).toBeGreaterThan(15);
      expect(unit.practice.length).toBeGreaterThanOrEqual(2);
      expect(unit.focus.length).toBeGreaterThan(0);
    }
    expect(systemPracticeModules[0].practice.join(' ')).toContain('5 functional');
    expect(systemPracticeModules[1].practice.join(' ')).toContain('100 requests/sec');
    expect(systemPracticeModules[14].practice.join(' ')).toContain('3 servers');
    expect(systemPracticeModules[51].title).toBe('Circuit Breakers');
  });

  it('keeps all 15 case studies and their 195 scope/deep-dive prompts outside required checkpoint gates', () => {
    expect(systemPracticeCases).toHaveLength(15);
    expect(systemPracticeCases.reduce((sum, unit) => sum + unit.scope.length + unit.deepDive.length, 0)).toBe(195);
    systemPracticeCases.forEach((unit, index) => {
      expect(unit.id).toBe(`case-${String.fromCharCode(97 + index)}`);
      expect(unit.page).toBe(149 + index * 2);
      expect(unit.flow.length).toBeGreaterThan(0);
      expect(unit.scope.length).toBeGreaterThan(0);
      expect(unit.deepDive.length).toBeGreaterThan(0);
      expect(unit.gate.length).toBeGreaterThan(20);
      expect(systemPracticeMission.checkpoints.some(checkpoint => checkpoint.id.endsWith(unit.id))).toBe(false);
    });
    expect(systemCaseGuidance.join(' ')).toMatch(/not|no/i);
    expect(systemDiagnostics).toHaveLength(8);
    expect(systemMentalModel).toHaveLength(3);
    expect(systemSketchTemplate).toHaveLength(4);
    expect(systemDecisionLens).toHaveLength(5);
    expect(systemDiagnostics.at(-1)?.task).toContain('35-45');
  });

  it('uses the source A-I progression without changing core modules into case-to-case locks', () => {
    expect(systemPracticeMission.checkpoints).toHaveLength(72);
    expect(systemPracticeMission.stages).toHaveLength(9);
    expect(systemPracticeMission.stages?.map(stage => stage.checkpointIds.length)).toEqual([10, 10, 15, 9, 6, 11, 7, 3, 1]);
    expect(systemPracticePhases.map(phase => [phase.start, phase.end])).toEqual([[1, 10], [11, 20], [21, 35], [36, 44], [45, 50], [51, 61], [62, 68], [69, 71], [72, 72]]);
    for (const [index, checkpoint] of systemPracticeMission.checkpoints.entries()) {
      expect(checkpoint.source?.document).toBe(SYSTEM_PRACTICE_SOURCE);
      expect(checkpoint.source?.page).toBe((index + 1) * 2 + 2);
      expect(checkpoint.action.length).toBeLessThanOrEqual(200);
      expect(checkpoint.criteria).toHaveLength(6);
      expect(checkpoint.prerequisites).toEqual(index ? [systemPracticeMission.checkpoints[index - 1].id] : []);
    }
    expect(systemPracticeMission.appendFrom).toBeUndefined();
  });

  it('connects both sources through valid navigation categories without claiming equivalent mastery', () => {
    const groupIds = new Set(systemConceptGroups.map(group => group.id));
    for (const unit of systemPracticeUnits) {
      expect(unit.conceptGroupIds.length).toBeGreaterThan(0);
      for (const id of unit.conceptGroupIds) expect(groupIds.has(id), `${unit.id}: ${id}`).toBe(true);
    }
    for (const id of groupIds) expect(systemPracticeUnits.some(unit => unit.conceptGroupIds.includes(id)), id).toBe(true);
    expect(systemPracticeUnits).toHaveLength(87);
    expect(systemPracticeMission.sourceNotes?.join(' ')).toContain('overview depth');
  });
});
