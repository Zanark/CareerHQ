import { describe, expect, it } from 'vitest';
import {
  CoreHeartbeatClock, HEARTBEAT_PERIOD_MS, heartbeatCoreScale, heartbeatEnvelope,
  heartbeatGlow, heartbeatWaveEnvelope,
} from './coreHeartbeatTiming';

describe('ten-second active-wall-time ripple', () => {
  it('has exact boundaries at 0, 10000 and 20000 milliseconds', () => {
    const clock = new CoreHeartbeatClock();
    expect(HEARTBEAT_PERIOD_MS).toBe(10000);
    for (const [time, cycle, phase] of [[0, 0, 0], [9999, 0, 9.999], [10000, 1, 0], [20000, 2, 0]]) {
      clock.update(time, true);
      expect(clock.running).toBe(true);
      expect(clock.cycle).toBe(cycle);
      expect(clock.phase).toBeCloseTo(phase, 8);
    }
  });

  it('uses the current phase after skipped visible frames, without slowing or queueing missed waves', () => {
    const clock = new CoreHeartbeatClock();
    clock.update(120, true);
    clock.update(27970, true);
    expect(clock.cycle).toBe(2);
    expect(clock.phase).toBeCloseTo(7.85);
    clock.update(40120, true);
    expect(clock.cycle).toBe(4);
    expect(clock.phase).toBe(0);
  });

  it('cancels and restarts fresh after motion suppression, hidden time or an explicit reset', () => {
    const clock = new CoreHeartbeatClock();
    clock.update(100, true);
    clock.update(1300, true);
    expect(clock.phase).toBe(1.2);
    clock.update(1400, false);
    clock.update(200000, false);
    expect(clock).toMatchObject({ running: false, cycle: 0, phase: 0 });
    clock.update(200100, true);
    expect(clock).toMatchObject({ running: true, cycle: 0, phase: 0 });
    clock.update(210100, true);
    expect(clock).toMatchObject({ cycle: 1, phase: 0 });
    clock.reset();
    clock.update(800000, true);
    expect(clock).toMatchObject({ running: true, cycle: 0, phase: 0 });
  });

  it('ignores invalid and backwards timestamps rather than reversing the beat', () => {
    const clock = new CoreHeartbeatClock();
    clock.update(0, true);
    clock.update(5000, true);
    for (const time of [4900, NaN, Infinity]) clock.update(time, true);
    expect(clock.cycle).toBe(0);
    expect(clock.phase).toBe(5);
  });

  it('gently grows the core in a double bump, never shrinking below its opaque baseline', () => {
    expect(heartbeatEnvelope(0)).toBe(0);
    expect(heartbeatEnvelope(0.12)).toBeCloseTo(1);
    expect(heartbeatEnvelope(0.4)).toBeCloseTo(0.58);
    expect(heartbeatEnvelope(0.8)).toBe(0);
    for (const calm of [false, true]) {
      for (let milliseconds = 0; milliseconds < 10000; milliseconds += 5) {
        const strength = heartbeatEnvelope(milliseconds / 1000);
        expect(strength).toBeGreaterThanOrEqual(0);
        expect(strength).toBeLessThanOrEqual(1);
        expect(heartbeatCoreScale(strength, calm)).toBeGreaterThanOrEqual(1);
        expect(heartbeatCoreScale(strength, calm)).toBeLessThanOrEqual(1 + (calm ? 0.1 : 0.14));
        expect(heartbeatGlow(strength, calm)).toBeGreaterThanOrEqual(1);
        expect(heartbeatWaveEnvelope(milliseconds / 1000)).toBeLessThanOrEqual(1);
        expect(heartbeatWaveEnvelope(milliseconds / 1000)).toBeGreaterThanOrEqual(0);
        if (milliseconds >= 6000) expect(heartbeatWaveEnvelope(milliseconds / 1000)).toBe(0);
      }
    }
  });
});
