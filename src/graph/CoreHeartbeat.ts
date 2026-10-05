import { Vector3 } from 'three';
import { CareerRippleField } from './careerRipple';
import {
  CoreHeartbeatClock, HEARTBEAT_WAVE_SECONDS, heartbeatCoreScale, heartbeatEnvelope,
  heartbeatGlow, heartbeatWaveEnvelope,
} from './coreHeartbeatTiming';

/** A shared presentation field: no overlay mesh, task node, geometry mutation or progress event. */
export class CoreHeartbeat {
  readonly field = new CareerRippleField();
  readonly clock = new CoreHeartbeatClock();
  private enabled = true;
  private source = false;
  private outerRadius = 1;
  private dataRadius = 1;
  private disposed = false;

  constructor(private readonly calm = false) {}

  get isEnabled(): boolean { return this.enabled; }
  get hasSource(): boolean { return this.source; }
  get running(): boolean { return this.clock.running; }
  get phase(): number { return this.clock.phase; }
  get cycle(): number { return this.clock.cycle; }
  get radius(): number { return this.field.frontRadius; }
  get sourcePosition(): Vector3 { return this.field.source; }
  get strength(): number { return this.running ? heartbeatEnvelope(this.phase) : 0; }
  get coreScale(): number { return heartbeatCoreScale(this.strength, this.calm); }
  get coreGlow(): number { return heartbeatGlow(this.strength, this.calm); }

  setSource(position: Vector3 | undefined, outerRadius: number, dataRadius: number): void {
    if (this.disposed) return;
    this.source = Boolean(position);
    if (position) this.field.source.copy(position);
    this.outerRadius = Math.max(0.01, outerRadius);
    this.dataRadius = Math.max(0, dataRadius);
    if (!position) this.cancel();
  }

  setEnabled(value: boolean): void {
    if (this.disposed || this.enabled === value) return;
    this.enabled = value;
    this.cancel();
  }

  update(now: number, motionAllowed: boolean): void {
    if (this.disposed) return;
    this.clock.update(now, this.enabled && this.source && motionAllowed);
    if (!this.running) {
      this.field.cancel();
      return;
    }
    const bandWidth = this.outerRadius * 0.2;
    const front = (this.outerRadius + bandWidth * 0.5) * Math.min(1, this.phase / HEARTBEAT_WAVE_SECONDS);
    const amplitude = this.dataRadius * (this.calm ? 0.0225 : 0.04) * heartbeatWaveEnvelope(this.phase);
    this.field.setWave(front, bandWidth, amplitude);
  }

  cancel(): void {
    this.clock.reset();
    this.field.cancel();
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.cancel();
  }
}
