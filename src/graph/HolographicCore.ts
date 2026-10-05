import {
  AdditiveBlending, BufferGeometry, Color, Euler, Float32BufferAttribute, Group,
  LineSegments, Mesh, MeshBasicMaterial, Points, Quaternion, ShaderMaterial,
  SphereGeometry, Vector3,
} from 'three';

const TAU = Math.PI * 2;
const GOLD = new Color('#EDAE29');
const PALE = new Color('#EEE8D5');
const YELLOW = new Color('#EBE565');
const COPPER = new Color('#CB4B16');
const TEAL = new Color('#00A591');
const BLUE = new Color('#268BD2');
const VIOLET = new Color('#6C71C4');

function seededRandom(): () => number {
  let seed = 0x43485131;
  return () => {
    seed = Math.imul(seed ^ seed >>> 15, 1 | seed);
    seed ^= seed + Math.imul(seed ^ seed >>> 7, 61 | seed);
    return ((seed ^ seed >>> 14) >>> 0) / 4294967296;
  };
}

const filamentVertex = `
  varying vec3 vColor;
  varying float vDepth;
  void main() {
    vec4 p = modelViewMatrix * vec4(position, 1.0);
    vDepth = -p.z;
    vColor = color;
    gl_Position = projectionMatrix * p;
  }
`;
const filamentFragment = `
  uniform float uDistance;
  uniform float uRadius;
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vDepth;
  void main() {
    float depth = mix(1.0, 0.18, smoothstep(uDistance - uRadius, uDistance + uRadius, vDepth));
    gl_FragColor = vec4(vColor, depth * uOpacity);
    #include <colorspace_fragment>
  }
`;

/**
 * Original, deterministic scenic geometry. Never included in the work-node
 * raycast, graph counts, evidence, or relationships.
 */
export class HolographicCore {
  readonly object = new Group();
  private readonly geometries: BufferGeometry[] = [];
  private readonly materials: (ShaderMaterial | MeshBasicMaterial)[] = [];
  private readonly filaments: ShaderMaterial[] = [];
  private readonly particles: Points<BufferGeometry, ShaderMaterial>;
  private readonly atmosphere = new Group();
  private readonly heart = new Group();
  private phase = 0;
  private radius = 80;

  constructor() {
    const random = seededRandom();
    const positions: number[] = [];
    const colors: number[] = [];
    const sparks: number[] = [];
    const sparkColors: number[] = [];
    const sparkSizes: number[] = [];
    const point = new Vector3();
    const previous = new Vector3();
    const orientation = () => new Quaternion().setFromEuler(new Euler(random() * TAU, random() * TAU, random() * TAU));
    const pushSegment = (a: Vector3, b: Vector3, color: Color, brightness: number) => {
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      for (let end = 0; end < 2; end++) colors.push(color.r * brightness, color.g * brightness, color.b * brightness);
    };
    const pushSpark = (p: Vector3, color: Color, brightness: number, size: number) => {
      sparks.push(p.x, p.y, p.z);
      sparkColors.push(color.r * brightness, color.g * brightness, color.b * brightness);
      sparkSizes.push(size);
    };

    // Interrupted, kinked spherical traces at different radii form a volume,
    // rather than a latitude/longitude globe or one flat HUD texture.
    for (let trace = 0; trace < 510; trace++) {
      const q = orientation();
      const radius = 0.56 + Math.pow(random(), 0.42) * 0.44;
      const start = random() * TAU;
      const length = 0.2 + random() * 1.2;
      const slope = (random() - 0.5) * 0.28;
      const bend = 0.25 + random() * 0.5;
      const color = trace % 13 === 0 ? TEAL : trace % 7 === 0 ? COPPER : trace % 11 === 0 ? YELLOW : GOLD;
      const brightness = 0.65 + random() * 1.85;
      const steps = 24 + Math.floor(length * 22);
      for (let step = 0; step <= steps; step++) {
        const t = step / steps;
        const azimuth = start + length * t;
        const jog = t < bend ? 0 : t < bend + 0.14 ? (t - bend) / 0.14 : 1;
        const latitude = slope * t + jog * 0.055;
        const r = radius + 0.008 * Math.sin(t * 22 + trace);
        point.set(Math.cos(azimuth) * Math.cos(latitude) * r, Math.sin(latitude) * r, Math.sin(azimuth) * Math.cos(latitude) * r).applyQuaternion(q);
        if (step > 0 && step % 17 !== 0) pushSegment(previous, point, color, brightness);
        if (step % 4 === 0) {
          pushSpark(point, color, brightness * (0.6 + random()), 0.55 + random() * 1.6);
        }
        previous.copy(point);
      }
    }
    this.atmosphere.add(this.lineObject(positions, colors, 0.72));

    const beltPositions: number[] = [];
    const beltColors: number[] = [];
    for (let belt = 0; belt < 15; belt++) {
      const q = new Quaternion().setFromEuler(new Euler(0.28 + belt * 0.213, belt * 0.41, -0.6 + belt * 0.19));
      const radius = 0.8 + belt / 15 * 0.29;
      const color = belt % 5 === 0 ? TEAL : belt % 5 === 1 ? BLUE : belt % 5 === 2 ? VIOLET : GOLD;
      for (let lane = 0; lane < 3; lane++) {
        const r = radius + lane * 0.005;
        for (let segment = 0; segment < 280; segment++) {
          if ((segment + belt * 11) % 70 > 49 || (belt % 3 === 0 && segment % 5 === 0)) continue;
          for (let end = 0; end < 2; end++) {
            const angle = (segment + end) / 280 * TAU;
            point.set(Math.cos(angle) * r, Math.sin(angle) * r, 0).applyQuaternion(q);
            beltPositions.push(point.x, point.y, point.z);
            const brightness = lane === 1 ? 1.5 : 0.55;
            beltColors.push(color.r * brightness, color.g * brightness, color.b * brightness);
          }
          if (lane === 1 && segment % 7 === 0) {
            const angle = segment / 280 * TAU;
            for (const tick of [r + 0.008, r + (segment % 21 === 0 ? 0.042 : 0.024)]) {
              point.set(Math.cos(angle) * tick, Math.sin(angle) * tick, 0).applyQuaternion(q);
              beltPositions.push(point.x, point.y, point.z);
              beltColors.push(color.r * 1.1, color.g * 1.1, color.b * 1.1);
            }
          }
        }
      }
    }
    this.object.add(this.lineObject(beltPositions, beltColors, 0.55));

    const heartPositions: number[] = [];
    const heartColors: number[] = [];
    for (let strand = 0; strand < 86; strand++) {
      const q = orientation();
      const radius = 0.07 + random() * 0.27;
      const color = strand % 7 === 0 ? PALE : strand % 5 === 0 ? YELLOW : GOLD;
      for (let segment = 0; segment <= 110; segment++) {
        const t = segment / 110 * TAU;
        const r = radius * (1 + 0.18 * Math.sin(t * 3 + strand));
        point.set(Math.cos(t) * r, Math.sin(t * 2 + strand) * r * 0.45, Math.sin(t) * r).applyQuaternion(q);
        if (segment) {
          heartPositions.push(previous.x, previous.y, previous.z, point.x, point.y, point.z);
          const intensity = (0.85 + random()) * (1.7 - radius * 3);
          for (let end = 0; end < 2; end++) heartColors.push(color.r * intensity, color.g * intensity, color.b * intensity);
        }
        if (segment % 22 === 0) pushSpark(point, color, 2, 0.8 + random() * 1.4);
        previous.copy(point);
      }
    }
    this.heart.add(this.lineObject(heartPositions, heartColors, 0.5));

    while (sparks.length / 3 < 7600) {
      const z = random() * 2 - 1;
      const a = random() * TAU;
      const radial = Math.sqrt(1 - z * z);
      const r = 0.25 + Math.pow(random(), 0.45) * 0.75;
      point.set(radial * Math.cos(a) * r, z * r, radial * Math.sin(a) * r);
      pushSpark(point, random() > 0.15 ? GOLD : TEAL, 0.5 + random() * 1.8, 0.35 + random());
    }
    const sparkGeometry = new BufferGeometry();
    sparkGeometry.setAttribute('position', new Float32BufferAttribute(sparks, 3));
    sparkGeometry.setAttribute('color', new Float32BufferAttribute(sparkColors, 3));
    sparkGeometry.setAttribute('aSize', new Float32BufferAttribute(sparkSizes, 1));
    this.geometries.push(sparkGeometry);
    const sparkMaterial = new ShaderMaterial({
      uniforms: { uScale: { value: 700 }, uRatio: { value: 1 }, uDistance: { value: 300 }, uRadius: { value: 80 } },
      vertexShader: `
        attribute float aSize;
        uniform float uScale;
        uniform float uRatio;
        varying vec3 vColor;
        varying float vDepth;
        void main() {
          vec4 p = modelViewMatrix * vec4(position, 1.0);
          vColor = color;
          vDepth = -p.z;
          gl_Position = projectionMatrix * p;
          gl_PointSize = clamp(aSize * uScale / max(1.0, -p.z), 0.8 * uRatio, 4.0 * uRatio);
        }
      `,
      fragmentShader: `
        uniform float uDistance;
        uniform float uRadius;
        varying vec3 vColor;
        varying float vDepth;
        void main() {
          float r = length(gl_PointCoord - 0.5) * 2.0;
          if (r > 1.0) discard;
          float shape = exp(-r * r * 5.0);
          float depth = mix(1.0, 0.12, smoothstep(uDistance - uRadius, uDistance + uRadius, vDepth));
          gl_FragColor = vec4(vColor, shape * depth);
          #include <colorspace_fragment>
        }
      `,
      vertexColors: true, blending: AdditiveBlending, transparent: true, depthWrite: false,
    });
    this.materials.push(sparkMaterial);
    this.particles = new Points(sparkGeometry, sparkMaterial);
    this.atmosphere.add(this.particles);

    const heartGeometry = new SphereGeometry(0.032, 24, 16);
    const heartMaterial = new MeshBasicMaterial({ color: PALE.clone().multiplyScalar(2.8), transparent: true, opacity: 0.88 });
    this.geometries.push(heartGeometry);
    this.materials.push(heartMaterial);
    this.heart.add(new Mesh(heartGeometry, heartMaterial));
    this.object.add(this.atmosphere, this.heart);
    this.object.name = 'Decorative holographic ambience — not work nodes';
  }

  private lineObject(positions: number[], colors: number[], opacity: number): LineSegments<BufferGeometry, ShaderMaterial> {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    const material = new ShaderMaterial({
      vertexShader: filamentVertex, fragmentShader: filamentFragment,
      uniforms: { uDistance: { value: 300 }, uRadius: { value: 80 }, uOpacity: { value: opacity } },
      transparent: true, vertexColors: true, depthWrite: false, blending: AdditiveBlending,
    });
    this.geometries.push(geometry);
    this.materials.push(material);
    this.filaments.push(material);
    return new LineSegments(geometry, material);
  }

  setBounds(center: Vector3, radius: number): void {
    this.radius = radius;
    this.object.position.copy(center);
    this.object.scale.setScalar(radius);
  }

  resize(height: number, pixelRatio: number, compact: boolean): void {
    this.particles.material.uniforms.uScale.value = height * pixelRatio;
    this.particles.material.uniforms.uRatio.value = pixelRatio;
    this.particles.geometry.setDrawRange(0, compact ? 4200 : 7600);
  }

  update(distance: number, delta: number): void {
    if (delta > 0) {
      this.phase += delta;
      this.atmosphere.rotation.y = this.phase * 0.017;
      this.heart.rotation.z = this.phase * -0.045;
      this.heart.rotation.y = this.phase * 0.027;
    }
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
