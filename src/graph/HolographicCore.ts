import {
  AdditiveBlending, BufferGeometry, Color, Euler, Float32BufferAttribute, Group,
  LineSegments, Mesh, MeshBasicMaterial, PerspectiveCamera, Points, Quaternion, ShaderMaterial,
  SphereGeometry, Vector3,
} from 'three';
import { heartbeatCoreScale, heartbeatGlow } from './coreHeartbeatTiming';

const TAU = Math.PI * 2;
const GOLD = new Color('#EDAE29');
const PALE = new Color('#EEE8D5');
const YELLOW = new Color('#EBE565');
const TEAL = new Color('#00A591');
const BLUE = new Color('#268BD2');
const VIOLET = new Color('#6C71C4');

function seededRandom(seed = 0x43485131): () => number {
  return () => {
    seed = Math.imul(seed ^ seed >>> 15, 1 | seed);
    seed ^= seed + Math.imul(seed ^ seed >>> 7, 61 | seed);
    return ((seed ^ seed >>> 14) >>> 0) / 4294967296;
  };
}

const filamentVertex = `
  attribute vec3 aOrbitAxis;
  attribute float aOrbitSpeed;
  uniform float uPhase;
  varying vec3 vColor;
  varying float vDepth;
  varying vec3 vViewPosition;
  void main() {
    float angle = uPhase * aOrbitSpeed;
    vec3 rotated = position * cos(angle) + cross(aOrbitAxis, position) * sin(angle)
      + aOrbitAxis * dot(aOrbitAxis, position) * (1.0 - cos(angle));
    vec4 p = modelViewMatrix * vec4(rotated, 1.0);
    vDepth = -p.z;
    vViewPosition = p.xyz;
    vColor = color;
    gl_Position = projectionMatrix * p;
  }
`;
const rimMask = `
  uniform vec3 uCenterView;
  uniform float uRadius;
  uniform float uRimOnly;
  varying vec3 vViewPosition;
  float rimVisibility() {
    if (uRimOnly < 0.5) return 1.0;
    float clearance = length(cross(uCenterView, normalize(vViewPosition))) / uRadius;
    if (clearance < 1.035) discard;
    return smoothstep(1.035, 1.075, clearance);
  }
`;
const filamentFragment = `
  uniform float uDistance;
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vDepth;
  ${rimMask}
  void main() {
    float depth = mix(1.0, 0.18, smoothstep(uDistance - uRadius, uDistance + uRadius, vDepth));
    gl_FragColor = vec4(vColor, depth * uOpacity * rimVisibility());
    #include <colorspace_fragment>
  }
`;

/**
 * Decorative geometry always stays outside the data sphere. The optional rim
 * mask also clips its projected silhouette; it does not remove real links.
 * This helper retains its masked default; CareerGraphScene selects each profile's default.
 */
export class HolographicCore {
  readonly object = new Group();
  private readonly geometries: BufferGeometry[] = [];
  private readonly materials: (ShaderMaterial | MeshBasicMaterial)[] = [];
  private readonly filaments: ShaderMaterial[] = [];
  private readonly particles: Points<BufferGeometry, ShaderMaterial>;
  private readonly rim = new Group();
  private readonly heart = new Group();
  private readonly heartMaterial: MeshBasicMaterial;
  private readonly heartColor: Color;
  private readonly center = new Vector3();
  private readonly centerView = new Vector3();
  private phase = 0;
  private radius = 80;
  private heartbeatStrength = 0;

  constructor(private readonly calm = false, decorativeRings = true) {
    const random = seededRandom();
    // A separate seed picks two stable, distinct rings without changing any
    // existing arc speed, direction or particle placement.
    const pickRing = seededRandom(0x52494e47);
    const fasterRing = Math.floor(pickRing() * 15);
    const fastestRing = (fasterRing + 1 + Math.floor(pickRing() * 14)) % 15;
    const sparks: number[] = [];
    const sparkColors: number[] = [];
    const sparkSizes: number[] = [];
    const point = new Vector3();
    const pushSpark = (p: Vector3, color: Color, brightness: number, size: number) => {
      sparks.push(p.x, p.y, p.z);
      sparkColors.push(color.r * brightness, color.g * brightness, color.b * brightness);
      sparkSizes.push(size);
    };

    const beltPositions: number[] = [];
    const beltColors: number[] = [];
    const beltAxes: number[] = [];
    const beltSpeeds: number[] = [];
    for (let belt = 0; belt < 15; belt++) {
      const speedMultiplier = belt === fasterRing ? 1.5 : belt === fastestRing ? 2 : 1;
      const q = new Quaternion().setFromEuler(new Euler(0.28 + belt * 0.213, belt * 0.41, -0.6 + belt * 0.19));
      const axis = new Vector3(0, 0, 1).applyQuaternion(q);
      const speeds = Array.from({ length: 4 }, (_, arc) =>
        (0.028 + random() * 0.085) * ((belt + arc) % 3 === 0 ? -1 : 1) * speedMultiplier);
      // Semantic orbit scenes keep the original spark seed, but allocate no
      // legacy belt geometry underneath the data-backed rings.
      if (!decorativeRings) continue;
      const radius = 1.06 + belt / 15 * 0.13;
      const color = belt % 5 === 0 ? TEAL : belt % 5 === 1 ? BLUE : belt % 5 === 2 ? VIOLET : GOLD;
      for (let lane = 0; lane < 3; lane++) {
        const r = radius + lane * 0.005;
        for (let segment = 0; segment < 280; segment++) {
          if ((segment + belt * 11) % 70 > 49 || (belt % 3 === 0 && segment % 5 === 0)) continue;
          const speed = speeds[Math.floor(((segment + belt * 11) % 280) / 70)];
          for (let end = 0; end < 2; end++) {
            const angle = (segment + end) / 280 * TAU;
            point.set(Math.cos(angle) * r, Math.sin(angle) * r, 0).applyQuaternion(q);
            beltPositions.push(point.x, point.y, point.z);
            beltAxes.push(axis.x, axis.y, axis.z);
            beltSpeeds.push(speed);
            const brightness = lane === 1 ? 1.5 : 0.55;
            beltColors.push(color.r * brightness, color.g * brightness, color.b * brightness);
          }
          if (lane === 1 && segment % 7 === 0) {
            const angle = segment / 280 * TAU;
            for (const tick of [r + 0.008, r + (segment % 21 === 0 ? 0.042 : 0.024)]) {
              point.set(Math.cos(angle) * tick, Math.sin(angle) * tick, 0).applyQuaternion(q);
              beltPositions.push(point.x, point.y, point.z);
              beltAxes.push(axis.x, axis.y, axis.z);
              beltSpeeds.push(speed);
              beltColors.push(color.r * 1.1, color.g * 1.1, color.b * 1.1);
            }
          }
        }
      }
    }
    if (decorativeRings) this.rim.add(this.lineObject(beltPositions, beltColors, beltAxes, beltSpeeds, 0.7));

    while (sparks.length / 3 < (calm ? 300 : 1800)) {
      const z = random() * 2 - 1;
      const a = random() * TAU;
      const radial = Math.sqrt(1 - z * z);
      const r = 1.07 + random() * 0.14;
      point.set(radial * Math.cos(a) * r, z * r, radial * Math.sin(a) * r);
      pushSpark(point, random() > 0.2 ? GOLD : YELLOW,
        calm ? 0.5 + random() : 0.65 + random() * 1.5,
        calm ? 0.35 + random() * 0.6 : 0.4 + random() * 0.8);
    }
    const sparkGeometry = new BufferGeometry();
    sparkGeometry.setAttribute('position', new Float32BufferAttribute(sparks, 3));
    sparkGeometry.setAttribute('color', new Float32BufferAttribute(sparkColors, 3));
    sparkGeometry.setAttribute('aSize', new Float32BufferAttribute(sparkSizes, 1));
    this.geometries.push(sparkGeometry);
    const sparkMaterial = new ShaderMaterial({
      uniforms: { uScale: { value: 700 }, uRatio: { value: 1 }, uDistance: { value: 300 }, uRadius: { value: 80 }, uRimOnly: { value: 1 }, uCenterView: { value: this.centerView }, uBrightness: { value: calm ? 0.45 : 1 } },
      vertexShader: `
        attribute float aSize;
        uniform float uScale;
        uniform float uRatio;
        varying vec3 vColor;
        varying float vDepth;
        varying vec3 vViewPosition;
        void main() {
          vec4 p = modelViewMatrix * vec4(position, 1.0);
          vColor = color;
          vDepth = -p.z;
          vViewPosition = p.xyz;
          gl_Position = projectionMatrix * p;
          gl_PointSize = clamp(aSize * uScale / max(1.0, -p.z), 0.8 * uRatio, 5.0 * uRatio);
        }
      `,
      fragmentShader: `
        uniform float uDistance;
        uniform float uBrightness;
        varying vec3 vColor;
        varying float vDepth;
        ${rimMask}
        void main() {
          float r = length(gl_PointCoord - 0.5) * 2.0;
          if (r > 1.0) discard;
          float shape = exp(-r * r * 5.0);
          float depth = mix(1.0, 0.12, smoothstep(uDistance - uRadius, uDistance + uRadius, vDepth));
          gl_FragColor = vec4(vColor, shape * depth * uBrightness * rimVisibility());
          #include <colorspace_fragment>
        }
      `,
      vertexColors: true, blending: AdditiveBlending, transparent: true, depthWrite: false,
    });
    this.materials.push(sparkMaterial);
    this.particles = new Points(sparkGeometry, sparkMaterial);
    this.rim.add(this.particles);

    const heartGeometry = new SphereGeometry(0.032, 24, 16);
    const heartMaterial = new MeshBasicMaterial({ color: PALE.clone().multiplyScalar(calm ? 1.35 : 2.8) });
    this.heartMaterial = heartMaterial;
    this.heartColor = heartMaterial.color.clone();
    this.geometries.push(heartGeometry);
    this.materials.push(heartMaterial);
    this.heart.add(new Mesh(heartGeometry, heartMaterial));
    this.rim.name = 'Decorative outer rim only';
    this.heart.name = 'Existing core node aura';
    this.heart.visible = false;
    this.object.add(this.rim, this.heart);
    this.object.name = 'Outer-shell decoration - not graph connections';
  }

  private lineObject(positions: number[], colors: number[], axes: number[], speeds: number[], opacity: number): LineSegments<BufferGeometry, ShaderMaterial> {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    geometry.setAttribute('aOrbitAxis', new Float32BufferAttribute(axes, 3));
    geometry.setAttribute('aOrbitSpeed', new Float32BufferAttribute(speeds, 1));
    const material = new ShaderMaterial({
      vertexShader: filamentVertex, fragmentShader: filamentFragment,
      uniforms: { uDistance: { value: 300 }, uRadius: { value: 80 }, uRimOnly: { value: 1 }, uCenterView: { value: this.centerView }, uOpacity: { value: this.calm ? 0.55 * 0.48 : opacity }, uPhase: { value: 0 } },
      transparent: true, vertexColors: true, depthWrite: false, blending: AdditiveBlending,
    });
    this.geometries.push(geometry);
    this.materials.push(material);
    this.filaments.push(material);
    return new LineSegments(geometry, material);
  }

  setBounds(center: Vector3, radius: number, corePosition?: Vector3): void {
    this.radius = radius;
    this.center.copy(center);
    this.rim.position.copy(center);
    this.rim.scale.setScalar(radius);
    this.heart.visible = !!corePosition;
    if (corePosition) this.heart.position.copy(corePosition);
    this.setHeartbeatStrength(this.heartbeatStrength);
  }

  setRimOnly(value: boolean): void {
    for (const material of [...this.filaments, this.particles.material]) {
      material.uniforms.uRimOnly.value = value ? 1 : 0;
    }
  }

  setDecorationVisible(value: boolean): void {
    this.rim.visible = value;
  }

  setHeartbeatStrength(value: number): void {
    this.heartbeatStrength = Math.max(0, Math.min(1, value));
    this.heart.scale.setScalar(this.radius * heartbeatCoreScale(this.heartbeatStrength, this.calm));
    this.heartMaterial.color.copy(this.heartColor).multiplyScalar(heartbeatGlow(this.heartbeatStrength, this.calm));
  }

  get animationTime(): number { return this.phase; }

  resize(height: number, pixelRatio: number, compact: boolean): void {
    this.particles.material.uniforms.uScale.value = height * pixelRatio;
    this.particles.material.uniforms.uRatio.value = pixelRatio;
    this.particles.geometry.setDrawRange(0, this.calm ? (compact ? 175 : 300) : (compact ? 900 : 1800));
  }

  update(camera: PerspectiveCamera, delta: number): void {
    if (delta > 0) {
      this.phase += delta;
      const motionScale = this.calm ? 0.22 : 1;
      for (const material of this.filaments) material.uniforms.uPhase.value = this.phase * (this.calm ? 0.4 : 1);
      this.particles.rotation.y = this.phase * 0.012 * motionScale;
      this.particles.rotation.z = this.phase * 0.004 * motionScale;
    }
    camera.updateMatrixWorld();
    this.centerView.copy(this.center).applyMatrix4(camera.matrixWorldInverse);
    const distance = this.centerView.length();
    for (const material of [...this.filaments, this.particles.material]) {
      material.uniforms.uDistance.value = distance;
      material.uniforms.uRadius.value = this.radius;
    }
  }

  dispose(): void {
    for (const geometry of this.geometries) geometry.dispose();
    for (const material of this.materials) material.dispose();
    this.object.clear();
  }
}
