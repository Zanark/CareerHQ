import {
  AdditiveBlending, BufferGeometry, Color, Euler, Float32BufferAttribute, Group,
  LineSegments, Mesh, MeshBasicMaterial, PerspectiveCamera, Points, Quaternion, ShaderMaterial,
  SphereGeometry, Vector3,
} from 'three';

const TAU = Math.PI * 2;
const GOLD = new Color('#EDAE29');
const PALE = new Color('#EEE8D5');
const YELLOW = new Color('#EBE565');
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
  varying vec3 vViewPosition;
  void main() {
    vec4 p = modelViewMatrix * vec4(position, 1.0);
    vDepth = -p.z;
    vViewPosition = p.xyz;
    vColor = color;
    gl_Position = projectionMatrix * p;
  }
`;
const rimMask = `
  uniform vec3 uCenterView;
  uniform float uRadius;
  varying vec3 vViewPosition;
  float rimVisibility() {
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
 * Decorative arcs stay outside the data sphere AND outside its projected
 * silhouette. Surface placement alone would still draw front/back arcs across
 * the interior when the camera turns.
 */
export class HolographicCore {
  readonly object = new Group();
  private readonly geometries: BufferGeometry[] = [];
  private readonly materials: (ShaderMaterial | MeshBasicMaterial)[] = [];
  private readonly filaments: ShaderMaterial[] = [];
  private readonly particles: Points<BufferGeometry, ShaderMaterial>;
  private readonly rim = new Group();
  private readonly heart = new Group();
  private readonly center = new Vector3();
  private readonly centerView = new Vector3();
  private phase = 0;
  private radius = 80;

  constructor(private readonly calm = false) {
    const random = seededRandom();
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
    for (let belt = 0; belt < 15; belt++) {
      const q = new Quaternion().setFromEuler(new Euler(0.28 + belt * 0.213, belt * 0.41, -0.6 + belt * 0.19));
      const radius = 1.06 + belt / 15 * 0.13;
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
    this.rim.add(this.lineObject(beltPositions, beltColors, 0.55));

    while (sparks.length / 3 < 1200) {
      const z = random() * 2 - 1;
      const a = random() * TAU;
      const radial = Math.sqrt(1 - z * z);
      const r = 1.07 + random() * 0.14;
      point.set(radial * Math.cos(a) * r, z * r, radial * Math.sin(a) * r);
      pushSpark(point, random() > 0.2 ? GOLD : YELLOW, 0.5 + random(), 0.35 + random() * 0.6);
    }
    const sparkGeometry = new BufferGeometry();
    sparkGeometry.setAttribute('position', new Float32BufferAttribute(sparks, 3));
    sparkGeometry.setAttribute('color', new Float32BufferAttribute(sparkColors, 3));
    sparkGeometry.setAttribute('aSize', new Float32BufferAttribute(sparkSizes, 1));
    this.geometries.push(sparkGeometry);
    const sparkMaterial = new ShaderMaterial({
      uniforms: { uScale: { value: 700 }, uRatio: { value: 1 }, uDistance: { value: 300 }, uRadius: { value: 80 }, uCenterView: { value: this.centerView }, uBrightness: { value: calm ? 0.45 : 1 } },
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
          gl_PointSize = clamp(aSize * uScale / max(1.0, -p.z), 0.8 * uRatio, 4.0 * uRatio);
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
    const heartMaterial = new MeshBasicMaterial({ color: PALE.clone().multiplyScalar(calm ? 1.35 : 2.8), transparent: true, opacity: 0.88 });
    this.geometries.push(heartGeometry);
    this.materials.push(heartMaterial);
    this.heart.add(new Mesh(heartGeometry, heartMaterial));
    this.rim.name = 'Decorative outer rim only';
    this.heart.name = 'Existing core node aura';
    this.heart.visible = false;
    this.object.add(this.rim, this.heart);
    this.object.name = 'Outer-rim decoration - not graph connections';
  }

  private lineObject(positions: number[], colors: number[], opacity: number): LineSegments<BufferGeometry, ShaderMaterial> {
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
    const material = new ShaderMaterial({
      vertexShader: filamentVertex, fragmentShader: filamentFragment,
      uniforms: { uDistance: { value: 300 }, uRadius: { value: 80 }, uCenterView: { value: this.centerView }, uOpacity: { value: opacity * (this.calm ? 0.48 : 1) } },
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
    this.heart.scale.setScalar(radius);
  }

  resize(height: number, pixelRatio: number, compact: boolean): void {
    this.particles.material.uniforms.uScale.value = height * pixelRatio;
    this.particles.material.uniforms.uRatio.value = pixelRatio;
    this.particles.geometry.setDrawRange(0, this.calm ? (compact ? 350 : 600) : (compact ? 650 : 1200));
  }

  update(camera: PerspectiveCamera, delta: number): void {
    if (delta > 0) {
      this.phase += delta;
      const motionScale = this.calm ? 0.22 : 1;
      this.rim.rotation.y = this.phase * 0.017 * motionScale;
      if (this.calm) this.heart.scale.setScalar(this.radius * (1 + 0.012 * Math.sin(this.phase * TAU / 8)));
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
