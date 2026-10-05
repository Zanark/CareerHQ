export const HEARTBEAT_PERIOD_MS = 3000;
export const HEARTBEAT_WAVE_SECONDS = 2.6;

/** A single visual rhythm, measured in active monotonic wall time, not capped animation deltas. */
export class CoreHeartbeatClock {
  running = false;
  phase = 0;
  cycle = 0;
  private startedAt: number | null = null;
  private elapsed = 0;

  update(now: number, running: boolean): void {
    if (!running) {
      this.reset();
      return;
    }
    if (!Number.isFinite(now)) return;
    if (this.startedAt === null) this.startedAt = now;
    this.running = true;
    this.elapsed = Math.max(this.elapsed, now - this.startedAt);
    this.cycle = Math.floor(this.elapsed / HEARTBEAT_PERIOD_MS);
    this.phase = (this.elapsed % HEARTBEAT_PERIOD_MS) / 1000;
  }

  reset(): void {
    this.startedAt = null;
    this.elapsed = 0;
    this.running = false;
    this.phase = 0;
    this.cycle = 0;
  }
}

function bump(phase: number, start: number, duration: number): number {
  if (phase <= start || phase >= start + duration) return 0;
  return Math.sin((phase - start) / duration * Math.PI) ** 2;
}

export function heartbeatEnvelope(phase: number): number {
  return Math.max(bump(phase, 0, 0.24), bump(phase, 0.28, 0.24) * 0.58);
}

export function heartbeatCoreScale(strength: number, calm: boolean): number {
  return 1 + Math.max(0, Math.min(1, strength)) * (calm ? 0.1 : 0.14);
}

export function heartbeatGlow(strength: number, calm: boolean): number {
  return 1 + Math.max(0, Math.min(1, strength)) * (calm ? 0.22 : 0.32);
}

export function heartbeatWaveOpacity(phase: number, calm: boolean): number {
  if (phase <= 0 || phase >= HEARTBEAT_WAVE_SECONDS) return 0;
  const fadeIn = Math.min(1, phase / 0.12);
  const fadeOut = Math.min(1, (HEARTBEAT_WAVE_SECONDS - phase) / 0.65);
  return (calm ? 0.2 : 0.28) * fadeIn * fadeOut;
}
