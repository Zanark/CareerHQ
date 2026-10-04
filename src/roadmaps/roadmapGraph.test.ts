import { describe, expect, it } from 'vitest';
import { getMissionVersion, missions } from '../domain/catalog';
import { checkpointLevels, roadmapGroups } from './roadmapGraph';

describe('whole mission roadmap structure', () => {
  it('includes every documented stage and checkpoint exactly once', () => {
    for (const mission of missions) {
      const groups = roadmapGroups(mission);
      expect(groups.map(group => group.id)).toEqual(mission.stages?.map(stage => stage.id) ?? []);
      const ids = groups.flatMap(group => group.checkpoints.map(checkpoint => checkpoint.id));
      expect(ids).toHaveLength(mission.checkpoints.length);
      expect(new Set(ids).size).toBe(mission.checkpoints.length);
      expect(new Set(ids)).toEqual(new Set(mission.checkpoints.map(checkpoint => checkpoint.id)));
    }
  });

  it('keeps optional and forecast stages without inventing completion nodes', () => {
    const credential = roadmapGroups(getMissionVersion('credential', '2.0.0'));
    expect(credential).toHaveLength(9);
    expect(credential.filter(group => group.optional)).toHaveLength(3);
    expect(credential.filter(group => group.optional).every(group => group.checkpoints.length === 0 && group.topics.length > 0)).toBe(true);
    const forecast = roadmapGroups(getMissionVersion('algorithm', '2.0.0'));
    expect(forecast).toHaveLength(4);
    expect(forecast.every(group => group.checkpoints.length === 0 && group.topics.length > 0)).toBe(true);
  });

  it('groups the original version without replacing its checkpoints', () => {
    const mission = getMissionVersion('pattern', '1.0.0');
    const groups = roadmapGroups(mission);
    expect(groups.map(group => group.title)).toEqual([...new Set(mission.checkpoints.map(checkpoint => checkpoint.stage))]);
    expect(groups.flatMap(group => group.checkpoints)).toEqual(mission.checkpoints);
    expect(roadmapGroups(getMissionVersion('algorithm', '1.0.0'))).toEqual([]);
  });

  it('preserves both HashMap branches at the same depth', () => {
    const mission = getMissionVersion('pattern', '2.0.0');
    const group = roadmapGroups(mission)[1];
    const levels = checkpointLevels(mission, group.checkpoints);
    expect(levels.at(-1)?.map(checkpoint => checkpoint.sourceId)).toEqual(['2.3', '2.4']);
    expect(levels.flat()).toHaveLength(group.checkpoints.length);
  });

  it('surfaces cycles rather than hiding nodes from the full map', () => {
    const source = getMissionVersion('pattern', '2.0.0');
    const a = { ...source.checkpoints[0], prerequisites: [source.checkpoints[1].id] };
    const b = { ...source.checkpoints[1], prerequisites: [a.id] };
    const mission = { ...source, checkpoints: [a, b] };
    expect(() => checkpointLevels(mission, mission.checkpoints)).toThrow('Cyclic source roadmap');
  });
});
