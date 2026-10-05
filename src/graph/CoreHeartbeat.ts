import { AdditiveBlending, Color, Mesh, ShaderMaterial, SphereGeometry, Vector3 } from 'three';
import {
  CoreHeartbeatClock, HEARTBEAT_WAVE_SECONDS, heartbeatCoreScale, heartbeatEnvelope,
  heartbeatGlow, heartbeatWaveOpacity,
} from './coreHeartbeatTiming';

/** One reusable 3D wavefront, emitted only from the supplied real core position. */
export class CoreHeartbeat {
  readonly object = new Mesh(new SphereGeometry(1, 64, 48), new ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDirection;
      void main() {
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDirection = -viewPosition.xyz;
        gl_Position = projectionMatrix * viewPosition;
      }`,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec3 vNormal;
      varying vec3 vViewDirection;
      void main() {
        float facing = abs(dot(normalize(vNormal), normalize(vViewDirection)));
        float fresnel = pow(1.0 - facing, 3.5);
        float alpha = fresnel * uOpacity;
        if (alpha < 0.001) discard;
        gl_FragColor = vec4(uColor, alpha);
        #include <colorspace_fragment>
      }`,
    uniforms: {
      uColor: { value: new Color('#EEE8D5').multiplyScalar(1.25) },
      uOpacity: { value: 0 },
    },
    blending: AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false,
  }));
  readonly clock = new CoreHeartbeatClock();
  private enabled = true;
  private source = false;
  private outerRadius = 1;
  private innerRadius = 0.032;
  private disposed = false;

  constructor(private readonly calm = false) {
    this.object.name = 'Core heartbeat spherical wavefront - visual rhythm only';
    this.object.visible = false;
    this.object.frustumCulled = false;
    this.object.renderOrder = 1;
    this.object.scale.setScalar(0);
  }

  get isEnabled(): boolean { return this.enabled; }
  get hasSource(): boolean { return this.source; }
  get running(): boolean { return this.clock.running; }
  get phase(): number { return this.clock.phase; }
  get cycle(): number { return this.clock.cycle; }
  get radius(): number { return this.object.scale.x; }
  get strength(): number { return this.running ? heartbeatEnvelope(this.phase) : 0; }
  get coreScale(): number { return heartbeatCoreScale(this.strength, this.calm); }
  get coreGlow(): number { return heartbeatGlow(this.strength, this.calm); }

  setSource(position: Vector3 | undefined, outerRadius: number, innerRadius: number): void {
    if (this.disposed) return;
    this.source = Boolean(position);
    if (position) this.object.position.copy(position);
    this.outerRadius = Math.max(0.01, outerRadius);
    this.innerRadius = Math.min(this.outerRadius, Math.max(0.001, innerRadius));
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
      this.hide();
      return;
    }
    const progress = Math.min(1, this.phase / HEARTBEAT_WAVE_SECONDS);
    this.object.scale.setScalar(this.innerRadius + (this.outerRadius - this.innerRadius) * progress);
    const opacity = heartbeatWaveOpacity(this.phase, this.calm);
    this.object.material.uniforms.uOpacity.value = opacity;
    this.object.visible = opacity > 0;
  }

  cancel(): void {
    this.clock.reset();
    this.hide();
  }

  private hide(): void {
    this.object.visible = false;
    this.object.scale.setScalar(0);
    this.object.material.uniforms.uOpacity.value = 0;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.cancel();
    this.object.geometry.dispose();
    this.object.material.dispose();
    this.object.removeFromParent();
  }
}
