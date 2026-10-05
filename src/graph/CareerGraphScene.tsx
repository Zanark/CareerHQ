import { forwardRef, useEffect, useId, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import {
  Box3,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  LineSegments,
  MathUtils,
  MOUSE,
  PerspectiveCamera,
  Points,
  QuadraticBezierCurve3,
  Raycaster,
  Scene,
  ShaderMaterial,
  Sphere,
  Spherical,
  SRGBColorSpace,
  TOUCH,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { HolographicCore } from './HolographicCore';
import type { CareerGraph } from './careerGraphModel';
import './career-graph-scene.css';

type GraphNode = CareerGraph['nodes'][number];
type SceneStatus = 'ready' | 'unavailable' | 'lost';
type Direction = 'left' | 'right' | 'up' | 'down';

export interface CareerGraphSceneHandle {
  resetView: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  focusNode: (id: string) => void;
  rotate: (direction: Direction) => void;
}

export interface CareerGraphSceneProps {
  graph: CareerGraph;
  selectedId: string | null;
  onSelect: (id: string) => void;
  autoRotate: boolean;
  onInteraction?: () => void;
  onStatusChange?: (status: SceneStatus, message?: string) => void;
  visualProfile?: 'career' | 'focus';
}

interface SceneCallbacks {
  onSelect: (id: string) => void;
  onInteraction: () => void;
  onStatusChange: (status: SceneStatus, message?: string) => void;
}

const STATUS_COLORS = {
  complete: new Color('#45D072'),
  incomplete: new Color('#F34B00'),
  reference: new Color('#268BD2'),
};
const CORE_COLOR = new Color('#EEE8D5');
const EDGE_COLORS = {
  contains: new Color('#268BD2'),
  prerequisite: new Color('#6C71C4'),
  related: new Color('#D33682'),
  evidence: new Color('#00A591'),
};
const HOME_DIRECTION = new Vector3(0.58, 0.32, 1).normalize();
const FRAME_INTERVAL = 1000 / 30;
const VIEW_ATTRIBUTE_INTERVAL = 120;

const pointVertexShader = `
  attribute float aSize;
  attribute float aKind;
  uniform float uHeight;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vKind;
  varying float vDepth;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vColor = color;
    vKind = aKind;
    vDepth = -viewPosition.z;
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = clamp(aSize * uHeight / max(1.0, vDepth), 7.0 * uPixelRatio, 90.0 * uPixelRatio);
  }
`;

const pointFragmentShader = `
  uniform float uNear;
  uniform float uFar;
  varying vec3 vColor;
  varying float vKind;
  varying float vDepth;
  void main() {
    vec2 p = (gl_PointCoord - 0.5) * 2.0;
    float r = length(p);
    if (r > 1.0) discard;
    float glow = exp(-5.5 * r * r) * 0.28;
    float center = 1.0 - smoothstep(0.17, 0.3, r);
    float ring = (1.0 - smoothstep(0.035, 0.09, abs(r - 0.55))) * 0.65;
    if (vKind > 1.5) {
      ring = max(ring, (1.0 - smoothstep(0.015, 0.055, abs(r - 0.8))) * 0.5);
    }
    if (vKind > 0.5 && vKind < 1.5) {
      float diamond = abs(p.x) + abs(p.y);
      ring = (1.0 - smoothstep(0.035, 0.09, abs(diamond - 0.6))) * 0.75;
    }
    float depth = mix(1.0, 0.4, smoothstep(uNear, uFar, vDepth));
    float alpha = max(center, max(ring, glow)) * depth;
    float backing = vKind > 2.5 ? 0.0 : (1.0 - smoothstep(0.48, 0.64, r)) * 0.78;
    vec3 ink = mix(vec3(0.0, 0.005, 0.008), vColor, max(center, ring));
    gl_FragColor = vec4(ink, max(alpha, backing));
    #include <colorspace_fragment>
  }
`;

const selectionFragmentShader = `
  varying vec3 vColor;
  varying float vKind;
  varying float vDepth;
  void main() {
    vec2 p = (gl_PointCoord - 0.5) * 2.0;
    float r = length(p);
    if (r > 1.0) discard;
    float ring = 1.0 - smoothstep(0.018, 0.04, abs(r - 0.7));
    float corners = step(0.32, min(abs(p.x), abs(p.y)));
    float outer = (1.0 - smoothstep(0.012, 0.03, abs(r - 0.9))) * corners;
    gl_FragColor = vec4(vColor, max(ring * 0.7, outer));
    #include <colorspace_fragment>
  }
`;

const edgeVertexShader = `
  varying vec3 vColor;
  varying float vDepth;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vDepth = -viewPosition.z;
    vColor = color;
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const edgeFragmentShader = `
  uniform float uNear;
  uniform float uFar;
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vDepth;
  void main() {
    float depth = mix(1.0, 0.24, smoothstep(uNear, uFar, vDepth));
    gl_FragColor = vec4(vColor, uOpacity * depth);
    #include <colorspace_fragment>
  }
`;

function nodeSize(node: GraphNode): number {
  if (node.kind === 'core') return 15;
  if (node.kind === 'mission') return 9;
  if (node.kind === 'history' || node.kind === 'opportunity' || node.kind === 'freelance') return 6.5;
  return node.current ? 6 : 4;
}

function pointMaterial(selected = false): ShaderMaterial {
  return new ShaderMaterial({
    vertexShader: pointVertexShader,
    fragmentShader: selected ? selectionFragmentShader : pointFragmentShader,
    vertexColors: true,
    uniforms: {
      uHeight: { value: 1 },
      uPixelRatio: { value: 1 },
      uNear: { value: 100 },
      uFar: { value: 500 },
    },
    transparent: true,
    depthWrite: false,
    depthTest: !selected,
    toneMapped: false,
  });
}

function edgeMaterial(opacity: number): ShaderMaterial {
  return new ShaderMaterial({
    vertexShader: edgeVertexShader,
    fragmentShader: edgeFragmentShader,
    vertexColors: true,
    uniforms: { uNear: { value: 100 }, uFar: { value: 500 }, uOpacity: { value: opacity } },
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  });
}

function writePointGeometry(geometry: BufferGeometry, nodes: readonly GraphNode[], selected = false): void {
  const positions = new Float32Array(nodes.length * 3);
  const colors = new Float32Array(nodes.length * 3);
  const sizes = new Float32Array(nodes.length);
  const kinds = new Float32Array(nodes.length);
  nodes.forEach((node, index) => {
    positions.set(node.position, index * 3);
    const color = selected ? CORE_COLOR : node.kind === 'core' ? CORE_COLOR : STATUS_COLORS[node.status];
    color.toArray(colors, index * 3);
    sizes[index] = selected ? Math.max(14, nodeSize(node) * 1.85) : nodeSize(node);
    kinds[index] = node.kind === 'core' ? 3 : node.kind === 'mission' ? 2 : node.kind === 'evidence' || node.status === 'reference' ? 1 : 0;
  });
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  geometry.setAttribute('aSize', new Float32BufferAttribute(sizes, 1));
  geometry.setAttribute('aKind', new Float32BufferAttribute(kinds, 1));
  geometry.computeBoundingSphere();
}

function writeEdgeGeometry(
  geometry: BufferGeometry,
  edges: CareerGraph['edges'],
  nodes: ReadonlyMap<string, GraphNode>,
  selected = false,
): void {
  const validEdges = edges.filter(edge => nodes.has(edge.source) && nodes.has(edge.target));
  const segments = edges.length > 2000 ? 4 : 12;
  const positions = new Float32Array(validEdges.length * segments * 6);
  const colors = new Float32Array(validEdges.length * segments * 6);
  validEdges.forEach((edge, index) => {
    const source = nodes.get(edge.source)!;
    const target = nodes.get(edge.target)!;
    const start = new Vector3().fromArray(source.position);
    const end = new Vector3().fromArray(target.position);
    const middle = start.clone().add(end).multiplyScalar(0.5);
    middle.addScaledVector(middle.clone().normalize(), Math.min(8, start.distanceTo(end) * 0.17));
    const curve = new QuadraticBezierCurve3(start, middle, end);
    const color = selected ? CORE_COLOR : EDGE_COLORS[edge.kind];
    for (let segment = 0; segment < segments; segment++) {
      const offset = (index * segments + segment) * 6;
      curve.getPoint(segment / segments).toArray(positions, offset);
      curve.getPoint((segment + 1) / segments).toArray(positions, offset + 3);
      color.toArray(colors, offset);
      color.toArray(colors, offset + 3);
    }
  });
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
  geometry.computeBoundingSphere();
}

function createRenderer(canvas: HTMLCanvasElement): WebGLRenderer {
  const context = canvas.getContext('webgl2', { alpha: false, antialias: true, powerPreference: 'high-performance' });
  if (!context) throw new Error('This browser could not create a WebGL 2 graphics context.');
  try {
    return new WebGLRenderer({ canvas, context, antialias: true, alpha: false });
  } catch (error) {
    context.getExtension('WEBGL_lose_context')?.loseContext();
    throw error;
  }
}

class CareerScene implements CareerGraphSceneHandle {
  private readonly scene = new Scene();
  private readonly workScene = new Scene();
  private readonly camera = new PerspectiveCamera(46, 1, 0.1, 3000);
  private readonly controls: OrbitControls;
  private readonly nodeGeometry = new BufferGeometry();
  private readonly edgeGeometry = new BufferGeometry();
  private readonly selectedGeometry = new BufferGeometry();
  private readonly selectedEdgeGeometry = new BufferGeometry();
  private readonly nodesMaterial = pointMaterial();
  private readonly selectionMaterial = pointMaterial(true);
  private readonly edgesMaterial = edgeMaterial(0.4);
  private readonly selectedEdgesMaterial = edgeMaterial(0.7);
  private readonly points = new Points(this.nodeGeometry, this.nodesMaterial);
  private readonly selection = new Points(this.selectedGeometry, this.selectionMaterial);
  private readonly edges = new LineSegments(this.edgeGeometry, this.edgesMaterial);
  private readonly selectedEdges = new LineSegments(this.selectedEdgeGeometry, this.selectedEdgesMaterial);
  private readonly hologram: HolographicCore;
  private readonly composer: EffectComposer;
  private readonly renderPass: RenderPass;
  private readonly bloomPass = new UnrealBloomPass(new Vector2(256, 256), 0.72, 0.08, 0.9);
  private readonly outputPass = new OutputPass();
  private readonly raycaster = new Raycaster();
  private readonly pointer = new Vector2();
  private readonly projected = new Vector3();
  private readonly bounds = new Sphere(new Vector3(), 100);
  private readonly resizeObserver: ResizeObserver;
  private readonly intersectionObserver: IntersectionObserver;
  private readonly motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  private graph: CareerGraph | null = null;
  private nodeMap = new Map<string, GraphNode>();
  private selectedId: string | null = null;
  private hoveredId: string | null = null;
  private labelId: string | null = null;
  private missionLabels: { node: GraphNode; element: HTMLSpanElement; width: number; height: number }[] = [];
  private autoRotate = false;
  private intersecting = true;
  private lost = false;
  private disposed = false;
  private framed = false;
  private reportedReady = false;
  private frame = 0;
  private lastDraw = 0;
  private viewRevision = 0;
  private lastViewAttribute = 0;
  private viewTimer = 0;
  private hoverTimer = 0;
  private lastHover = 0;
  private hoverPosition: { x: number; y: number } | null = null;
  private width = 1;
  private height = 1;
  private pixelRatio = 1;
  private pointers = new Set<number>();
  private gesture: { pointerId: number; x: number; y: number; moved: boolean; selectable: boolean } | null = null;

  constructor(
    private readonly root: HTMLDivElement,
    private readonly viewport: HTMLDivElement,
    private readonly label: HTMLDivElement,
    private readonly marker: HTMLDivElement,
    private readonly missionLabelLayer: HTMLDivElement,
    private readonly renderer: WebGLRenderer,
    private readonly callbacks: SceneCallbacks,
    private readonly visualProfile: 'career' | 'focus',
  ) {
    this.hologram = new HolographicCore(visualProfile === 'focus');
    this.scene.background = new Color('#000F13');
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.camera.position.copy(HOME_DIRECTION).multiplyScalar(340);
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = false;
    this.controls.enablePan = true;
    this.controls.screenSpacePanning = true;
    this.controls.minDistance = 14;
    this.controls.maxDistance = 1800;
    this.controls.rotateSpeed = 0.65;
    this.controls.zoomSpeed = 0.8;
    this.controls.autoRotateSpeed = visualProfile === 'focus' ? 0.06 : 0.3;
    this.controls.enabled = visualProfile !== 'focus';
    this.controls.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };
    this.controls.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };
    this.controls.addEventListener('change', this.onCameraChange);
    this.controls.addEventListener('start', this.onControlStart);

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.outputPass);
    this.bloomPass.compositeMaterial.uniforms.bloomFactors.value = [1, 0.55, 0.2, 0.06, 0.01];
    if (visualProfile === 'focus') this.bloomPass.strength = 0.35;
    this.root.dataset.ambience = 'procedural-unpickable';
    this.root.dataset.decorationMode = 'outer-rim-only';
    this.root.dataset.postprocessing = 'gpu-bloom';
    this.points.frustumCulled = false;
    this.selection.frustumCulled = false;
    this.selection.visible = false;
    this.selection.renderOrder = 3;
    this.edges.renderOrder = 0;
    this.points.renderOrder = 1;
    this.selectedEdges.renderOrder = 2;
    this.scene.add(this.hologram.object);
    this.workScene.add(this.edges, this.points, this.selectedEdges, this.selection);

    this.canvas.addEventListener('pointerdown', this.onPointerDown, true);
    this.canvas.addEventListener('pointermove', this.onPointerMove, true);
    this.canvas.addEventListener('pointerup', this.onPointerUp, true);
    this.canvas.addEventListener('pointercancel', this.onPointerCancel, true);
    this.canvas.addEventListener('lostpointercapture', this.onPointerCancel);
    this.canvas.addEventListener('pointerleave', this.onPointerLeave);
    this.canvas.addEventListener('keydown', this.onKeyDown);
    this.canvas.addEventListener('webglcontextlost', this.onContextLost);
    this.canvas.addEventListener('webglcontextrestored', this.onContextRestored);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    this.motionPreference.addEventListener('change', this.onMotionChange);
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(this.viewport);
    this.intersectionObserver = new IntersectionObserver(entries => {
      this.intersecting = entries.some(entry => entry.isIntersecting);
      this.syncVisibility();
    }, { threshold: 0 });
    this.intersectionObserver.observe(this.root);
    this.resize();
  }

  private get canvas(): HTMLCanvasElement { return this.renderer.domElement; }

  setGraph(graph: CareerGraph): void {
    this.graph = graph;
    this.nodeMap = new Map(graph.nodes.map(node => [node.id, node]));
    // Replace GPU buffers, not the camera or the WebGL context, when progress changes.
    this.nodeGeometry.dispose();
    this.edgeGeometry.dispose();
    writePointGeometry(this.nodeGeometry, graph.nodes);
    writeEdgeGeometry(this.edgeGeometry, graph.edges, this.nodeMap);
    this.edgesMaterial.uniforms.uOpacity.value = graph.nodes.length > 2000 ? 0.16 : 0.3;
    const box = new Box3();
    for (const node of graph.nodes) box.expandByPoint(this.projected.fromArray(node.position));
    if (!box.isEmpty()) {
      box.getCenter(this.bounds.center);
      let radiusSquared = 35 * 35;
      for (const node of graph.nodes) {
        radiusSquared = Math.max(radiusSquared, this.projected.fromArray(node.position).distanceToSquared(this.bounds.center));
      }
      this.bounds.radius = Math.sqrt(radiusSquared);
    } else {
      this.bounds.set(new Vector3(), 60);
    }
    const core = graph.nodes.find(node => node.kind === 'core');
    this.hologram.setBounds(this.bounds.center, this.bounds.radius, core ? new Vector3().fromArray(core.position) : undefined);
    this.hologram.object.visible = graph.nodes.length > 0;
    this.root.dataset.nodeCount = String(graph.nodes.length);
    this.root.dataset.edgeCount = String(graph.edges.filter(edge => this.nodeMap.has(edge.source) && this.nodeMap.has(edge.target)).length);
    this.hoveredId = null;
    this.labelId = null;
    this.missionLabelLayer.replaceChildren();
    this.missionLabels = graph.nodes.filter(node => this.visualProfile === 'career' && node.kind === 'mission').slice(0, 9).map(node => {
      const element = document.createElement('span');
      element.className = 'career-graph-scene__mission-label';
      element.dataset.nodeId = node.id;
      element.textContent = node.label;
      element.style.visibility = 'hidden';
      this.missionLabelLayer.appendChild(element);
      return { node, element, width: 0, height: 0 };
    });
    this.setSelection(this.selectedId);
    if (!this.framed && graph.nodes.length > 0) {
      this.frameAll();
      this.framed = true;
    }
    this.requestFrame();
  }

  setSelection(id: string | null): void {
    this.selectedId = id;
    const node = id ? this.nodeMap.get(id) : undefined;
    this.selection.visible = Boolean(node);
    this.selectedGeometry.dispose();
    this.selectedEdgeGeometry.dispose();
    writePointGeometry(this.selectedGeometry, node ? [node] : [], true);
    writeEdgeGeometry(
      this.selectedEdgeGeometry,
      this.graph?.edges.filter(edge => edge.source === id || edge.target === id) ?? [],
      this.nodeMap,
      true,
    );
    this.canvas.dataset.selectedNodeId = node?.id ?? '';
    this.marker.dataset.nodeId = node?.id ?? '';
    this.requestFrame();
  }

  setAutoRotate(value: boolean): void {
    this.autoRotate = value;
    if (!value) this.controls.autoRotate = false;
    this.requestFrame();
  }

  resetView = (): void => {
    if (this.lost) return;
    this.callbacks.onInteraction();
    this.frameAll();
  };

  zoomIn = (): void => { this.zoom(0.8); };
  zoomOut = (): void => { this.zoom(1.25); };

  focusNode = (id: string): void => {
    const node = this.nodeMap.get(id);
    if (!node || this.lost) return;
    this.callbacks.onInteraction();
    const direction = this.camera.position.clone().sub(this.controls.target).normalize();
    this.controls.target.fromArray(node.position);
    this.camera.position.copy(this.controls.target).addScaledVector(direction, Math.max(45, nodeSize(node) * 7));
    this.controls.update();
    this.requestFrame();
  };

  rotate = (direction: Direction): void => {
    if (this.lost) return;
    this.callbacks.onInteraction();
    const spherical = new Spherical().setFromVector3(this.camera.position.clone().sub(this.controls.target));
    const step = Math.PI / 15;
    if (direction === 'left') spherical.theta -= step;
    if (direction === 'right') spherical.theta += step;
    if (direction === 'up') spherical.phi -= step;
    if (direction === 'down') spherical.phi += step;
    spherical.phi = MathUtils.clamp(spherical.phi, 0.02, Math.PI - 0.02);
    this.camera.position.copy(this.controls.target).add(new Vector3().setFromSpherical(spherical));
    this.controls.update();
    this.requestFrame();
  };

  private zoom(factor: number): void {
    if (this.lost) return;
    this.callbacks.onInteraction();
    const offset = this.camera.position.clone().sub(this.controls.target);
    const distance = MathUtils.clamp(offset.length() * factor, this.controls.minDistance, this.controls.maxDistance);
    this.camera.position.copy(this.controls.target).add(offset.setLength(distance));
    this.controls.update();
    this.requestFrame();
  }

  private frameAll(): void {
    const halfFov = MathUtils.degToRad(this.camera.fov / 2);
    const limitingFov = Math.min(halfFov, Math.atan(Math.tan(halfFov) * this.camera.aspect));
    const distance = this.bounds.radius * 1.32 / Math.sin(limitingFov);
    this.controls.maxDistance = Math.max(1800, distance * 4);
    this.camera.far = Math.max(3000, this.controls.maxDistance + this.bounds.radius * 3);
    this.camera.updateProjectionMatrix();
    this.controls.target.copy(this.bounds.center);
    this.camera.position.copy(this.bounds.center).addScaledVector(HOME_DIRECTION, distance);
    this.controls.update();
    this.requestFrame();
  }

  private resize = (): void => {
    this.width = Math.max(1, this.viewport.clientWidth);
    this.height = Math.max(1, this.viewport.clientHeight);
    const compact = this.width < 700;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, this.visualProfile === 'focus' ? 1 : compact ? 1.25 : 1.5);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(this.width, this.height, false);
    this.composer.setPixelRatio(this.pixelRatio);
    this.composer.setSize(this.width, this.height);
    // UnrealBloomPass starts its first mip at half this size, then halves four
    // more times; mobile bloom is therefore one-quarter of canvas resolution.
    const bloomScale = compact || this.visualProfile === 'focus' ? 0.5 : 0.7;
    this.bloomPass.setSize(this.width * this.pixelRatio * bloomScale, this.height * this.pixelRatio * bloomScale);
    this.hologram.resize(this.height, this.pixelRatio, compact);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    for (const label of this.missionLabels) label.width = 0;
    for (const material of [this.nodesMaterial, this.selectionMaterial]) {
      material.uniforms.uHeight.value = this.height * this.pixelRatio;
      material.uniforms.uPixelRatio.value = this.pixelRatio;
    }
    this.requestFrame();
  };

  private requestFrame = (): void => {
    if (!this.frame && !this.disposed && !this.lost && this.intersecting && !document.hidden) {
      this.frame = requestAnimationFrame(this.render);
    }
  };

  private render = (time: number): void => {
    this.frame = 0;
    if (this.disposed || this.lost || !this.intersecting || document.hidden) return;
    const rotating = this.autoRotate && !this.motionPreference.matches && this.pointers.size === 0;
    if (rotating && time - this.lastDraw < FRAME_INTERVAL) {
      this.requestFrame();
      return;
    }
    this.controls.autoRotate = rotating;
    if (rotating) this.controls.update(Math.min((time - this.lastDraw) / 1000, 0.05));
    const distance = this.controls.getDistance();
    for (const material of [this.nodesMaterial, this.edgesMaterial, this.selectedEdgesMaterial]) {
      material.uniforms.uNear.value = Math.max(1, distance - this.bounds.radius);
      material.uniforms.uFar.value = distance + this.bounds.radius * 1.3;
    }
    this.hologram.update(this.camera, rotating ? Math.min((time - this.lastDraw) / 1000, 0.05) : 0);
    this.composer.render();
    // Work markers bypass bloom: decorative brightness must not bleach status
    // colors, hide selection, or become an apparent completion indicator.
    this.renderer.autoClear = false;
    this.renderer.clearDepth();
    this.renderer.render(this.workScene, this.camera);
    this.renderer.autoClear = true;
    this.lastDraw = time;
    if (this.visualProfile === 'career') {
      this.updateLabels();
      this.updateMissionLabels();
    }
    if (!this.reportedReady) {
      this.reportedReady = true;
      this.callbacks.onStatusChange('ready');
    }
    if (rotating) this.requestFrame();
  };

  private onCameraChange = (): void => {
    this.viewRevision++;
    if (!this.viewTimer) {
      const remaining = Math.max(0, VIEW_ATTRIBUTE_INTERVAL - (performance.now() - this.lastViewAttribute));
      this.viewTimer = window.setTimeout(() => {
        this.viewTimer = 0;
        this.lastViewAttribute = performance.now();
        this.root.dataset.viewRevision = String(this.viewRevision);
        this.canvas.dataset.viewRevision = String(this.viewRevision);
      }, remaining);
    }
    this.requestFrame();
  };

  private onControlStart = (): void => {
    this.clearHover();
    this.callbacks.onInteraction();
  };

  private onPointerDown = (event: PointerEvent): void => {
    if (this.visualProfile === 'focus') return;
    this.pointers.add(event.pointerId);
    this.clearHover();
    if (this.pointers.size === 1) {
      this.gesture = {
        pointerId: event.pointerId, x: event.clientX, y: event.clientY,
        moved: false, selectable: event.isPrimary && event.button === 0,
      };
    } else if (this.gesture) {
      this.gesture.selectable = false;
    }
  };

  private onPointerMove = (event: PointerEvent): void => {
    if (this.visualProfile === 'focus') return;
    if (this.gesture && Math.hypot(event.clientX - this.gesture.x, event.clientY - this.gesture.y) > 5) {
      this.gesture.moved = true;
    }
    if (this.pointers.size > 0 || event.pointerType === 'touch') return;
    this.hoverPosition = { x: event.clientX, y: event.clientY };
    if (!this.hoverTimer) {
      this.hoverTimer = window.setTimeout(() => {
        this.hoverTimer = 0;
        this.lastHover = performance.now();
        if (!this.hoverPosition || this.pointers.size || this.lost) return;
        this.hoveredId = this.pick(this.hoverPosition.x, this.hoverPosition.y)?.id ?? null;
        this.canvas.style.cursor = this.hoveredId ? 'pointer' : 'grab';
        this.requestFrame();
      }, Math.max(0, 75 - (performance.now() - this.lastHover)));
    }
  };

  private onPointerUp = (event: PointerEvent): void => {
    const gesture = this.gesture;
    this.pointers.delete(event.pointerId);
    if (gesture?.pointerId === event.pointerId) {
      const moved = gesture.moved || Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) > 5;
      if (!moved && gesture.selectable && !this.lost) {
        const node = this.pick(event.clientX, event.clientY);
        if (node) this.callbacks.onSelect(node.id);
      }
      this.gesture = null;
    }
    this.requestFrame();
  };

  private onPointerCancel = (event: PointerEvent): void => {
    this.pointers.delete(event.pointerId);
    this.gesture = null;
    this.requestFrame();
  };

  private onPointerLeave = (): void => { this.clearHover(); };

  private clearHover(): void {
    window.clearTimeout(this.hoverTimer);
    this.hoverTimer = 0;
    this.hoverPosition = null;
    this.hoveredId = null;
    this.canvas.style.cursor = 'grab';
    this.requestFrame();
  }

  private pick(clientX: number, clientY: number): GraphNode | undefined {
    if (this.visualProfile === 'focus') return undefined;
    if (!this.graph?.nodes.length) return undefined;
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return undefined;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    this.pointer.set(x / rect.width * 2 - 1, -(y / rect.height) * 2 + 1);
    this.camera.updateMatrixWorld();
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const farthest = this.controls.getDistance() + this.bounds.radius * 2;
    this.raycaster.params.Points.threshold = Math.max(10, 18 * 2 * farthest * Math.tan(MathUtils.degToRad(this.camera.fov / 2)) / this.height);
    const hits = this.raycaster.intersectObject(this.points, false);
    let picked: GraphNode | undefined;
    let closest = Infinity;
    for (const hit of hits) {
      if (hit.index === undefined) continue;
      const node = this.graph.nodes[hit.index];
      if (!node || !this.projectNode(node)) continue;
      const distance = Math.hypot(this.projected.x - x, this.projected.y - y);
      const depth = -new Vector3().fromArray(node.position).applyMatrix4(this.camera.matrixWorldInverse).z;
      const visibleRadius = MathUtils.clamp(nodeSize(node) * this.height / Math.max(1, depth), 7, 90) * 0.42;
      if (distance <= Math.max(8, visibleRadius + 3) && distance < closest) {
        closest = distance;
        picked = node;
      }
    }
    return picked;
  }

  private projectNode(node: GraphNode): boolean {
    this.projected.fromArray(node.position).project(this.camera);
    const visible = this.projected.z >= -1 && this.projected.z <= 1
      && Math.abs(this.projected.x) <= 1 && Math.abs(this.projected.y) <= 1;
    this.projected.x = (this.projected.x + 1) * this.width / 2;
    this.projected.y = (1 - this.projected.y) * this.height / 2;
    return visible;
  }

  private updateLabels(): void {
    const selected = this.selectedId ? this.nodeMap.get(this.selectedId) : undefined;
    const selectedVisible = selected ? this.projectNode(selected) : false;
    this.marker.hidden = !selectedVisible;
    this.marker.dataset.screenVisible = String(selectedVisible);
    if (selectedVisible) {
      const x = this.projected.x.toFixed(2);
      const y = this.projected.y.toFixed(2);
      this.marker.dataset.screenX = x;
      this.marker.dataset.screenY = y;
      this.canvas.dataset.screenX = x;
      this.canvas.dataset.screenY = y;
      this.marker.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    } else {
      delete this.canvas.dataset.screenX;
      delete this.canvas.dataset.screenY;
    }
    const node = this.nodeMap.get(this.hoveredId ?? this.selectedId ?? '');
    const visible = node ? this.projectNode(node) : false;
    this.label.hidden = !visible;
    if (!node || !visible) return;
    if (this.labelId !== node.id) {
      this.label.textContent = node.label;
      this.label.dataset.status = node.status;
      this.labelId = node.id;
    }
    const labelWidth = Math.min(this.label.offsetWidth, this.width - 16);
    const x = MathUtils.clamp(this.projected.x + 16, 8, Math.max(8, this.width - labelWidth - 8));
    const y = MathUtils.clamp(this.projected.y - this.label.offsetHeight - 14, 8, Math.max(8, this.height - this.label.offsetHeight - 8));
    this.label.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
  }

  private updateMissionLabels(): void {
    this.missionLabelLayer.hidden = this.width < 640 || this.height < 350;
    if (this.missionLabelLayer.hidden) return;
    type LabelBox = { left: number; top: number; right: number; bottom: number };
    const occupied: LabelBox[] = [];
    if (!this.label.hidden) {
      const labelRect = this.label.getBoundingClientRect();
      const rootRect = this.root.getBoundingClientRect();
      occupied.push({
        left: labelRect.left - rootRect.left, top: labelRect.top - rootRect.top,
        right: labelRect.right - rootRect.left, bottom: labelRect.bottom - rootRect.top,
      });
    }
    const projectedLabels = this.missionLabels.map(entry => {
      const visible = this.projectNode(entry.node);
      return { entry, visible, x: this.projected.x, y: this.projected.y };
    });
    for (const point of projectedLabels) {
      if (point.visible) occupied.push({ left: point.x - 10, top: point.y - 10, right: point.x + 10, bottom: point.y + 10 });
    }
    for (const { entry, visible, x, y } of projectedLabels) {
      const { element, node } = entry;
      element.style.visibility = 'hidden';
      if (!visible || node.id === this.hoveredId || node.id === this.selectedId
        || Math.hypot(x - this.width / 2, y - this.height / 2) < this.height * 0.19) continue;
      if (!entry.width) {
        entry.width = element.offsetWidth;
        entry.height = element.offsetHeight;
      }
      const { width, height } = entry;
      const candidates = [
        [x + 18, y - height / 2],
        [x - width - 18, y - height / 2],
        [x - width / 2, y - height - 18],
        [x - width / 2, y + 18],
      ];
      for (const [left, top] of candidates) {
        const box = { left, top, right: left + width, bottom: top + height };
        if (left < 12 || top < 46 || box.right > this.width - 12 || box.bottom > this.height - 38) continue;
        const overlaps = occupied.some(other =>
          box.left < other.right + 6 && box.right > other.left - 6
          && box.top < other.bottom + 6 && box.bottom > other.top - 6);
        if (overlaps) continue;
        element.style.transform = `translate3d(${left.toFixed(2)}px, ${top.toFixed(2)}px, 0)`;
        element.style.visibility = 'visible';
        occupied.push(box);
        break;
      }
    }
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (this.visualProfile === 'focus') return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const directions: Record<string, Direction | undefined> = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' };
    const direction = directions[event.key];
    if (direction) this.rotate(direction);
    else if (event.key === '+' || event.key === '=') this.zoomIn();
    else if (event.key === '-' || event.key === '_') this.zoomOut();
    else if (event.key === 'Home') this.resetView();
    else return;
    event.preventDefault();
    event.stopPropagation();
  };

  private onMotionChange = (): void => { this.requestFrame(); };
  private onVisibilityChange = (): void => { this.syncVisibility(); };

  private syncVisibility(): void {
    if (!this.intersecting || document.hidden) {
      cancelAnimationFrame(this.frame);
      this.frame = 0;
      this.clearHover();
    } else {
      this.lastDraw = performance.now();
      this.requestFrame();
    }
  }

  private onContextLost = (event: Event): void => {
    event.preventDefault();
    this.lost = true;
    this.reportedReady = false;
    this.controls.enabled = false;
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.clearHover();
    this.label.hidden = true;
    this.marker.hidden = true;
    this.missionLabelLayer.hidden = true;
    this.callbacks.onStatusChange('lost', 'The 3D graphics context was lost. The graph will reconnect if the browser restores it. Your saved work is unchanged; the node list remains available.');
  };

  private onContextRestored = (): void => {
    this.lost = false;
    this.controls.enabled = this.visualProfile !== 'focus';
    this.pointers.clear();
    this.gesture = null;
    this.resize();
    this.requestFrame();
  };

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    window.clearTimeout(this.viewTimer);
    window.clearTimeout(this.hoverTimer);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.motionPreference.removeEventListener('change', this.onMotionChange);
    this.controls.removeEventListener('change', this.onCameraChange);
    this.controls.removeEventListener('start', this.onControlStart);
    this.controls.dispose();
    this.canvas.removeEventListener('pointerdown', this.onPointerDown, true);
    this.canvas.removeEventListener('pointermove', this.onPointerMove, true);
    this.canvas.removeEventListener('pointerup', this.onPointerUp, true);
    this.canvas.removeEventListener('pointercancel', this.onPointerCancel, true);
    this.canvas.removeEventListener('lostpointercapture', this.onPointerCancel);
    this.canvas.removeEventListener('pointerleave', this.onPointerLeave);
    this.canvas.removeEventListener('keydown', this.onKeyDown);
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    for (const geometry of [this.nodeGeometry, this.edgeGeometry, this.selectedGeometry, this.selectedEdgeGeometry]) geometry.dispose();
    for (const material of [this.nodesMaterial, this.selectionMaterial, this.edgesMaterial, this.selectedEdgesMaterial]) material.dispose();
    this.hologram.dispose();
    this.renderPass.dispose();
    this.bloomPass.dispose();
    this.bloomPass.materialHighPassFilter.dispose();
    this.outputPass.dispose();
    this.composer.dispose();
    this.scene.clear();
    this.workScene.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.canvas.remove();
    this.missionLabelLayer.replaceChildren();
  }
}

const CareerGraphScene = forwardRef<CareerGraphSceneHandle, CareerGraphSceneProps>(function CareerGraphScene(
  { graph, selectedId, onSelect, autoRotate, onInteraction, onStatusChange, visualProfile = 'career' }, ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const missionLabelLayerRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<CareerScene | null>(null);
  const callbacks = useRef({ onSelect, onInteraction, onStatusChange });
  const instructionsId = useId();
  const [state, setState] = useState<{ status: SceneStatus | 'loading'; message?: string }>({ status: 'loading' });

  useLayoutEffect(() => {
    callbacks.current = { onSelect, onInteraction, onStatusChange };
  }, [onSelect, onInteraction, onStatusChange]);

  useImperativeHandle(ref, () => ({
    resetView: () => runtimeRef.current?.resetView(),
    zoomIn: () => runtimeRef.current?.zoomIn(),
    zoomOut: () => runtimeRef.current?.zoomOut(),
    focusNode: id => runtimeRef.current?.focusNode(id),
    rotate: direction => runtimeRef.current?.rotate(direction),
  }), []);

  useEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    const label = labelRef.current;
    const marker = markerRef.current;
    const missionLabelLayer = missionLabelLayerRef.current;
    if (!root || !viewport || !label || !marker || !missionLabelLayer) return;
    // A fresh canvas also makes StrictMode's setup/cleanup/setup safe after forceContextLoss.
    const canvas = document.createElement('canvas');
    canvas.className = 'career-graph-scene__canvas';
    canvas.tabIndex = visualProfile === 'focus' ? -1 : 0;
    if (visualProfile === 'career') {
      canvas.setAttribute('aria-label', 'Interactive 3D career graph');
      canvas.setAttribute('aria-describedby', instructionsId);
    } else canvas.setAttribute('aria-hidden', 'true');
    canvas.dataset.renderer = 'webgl';
    canvas.dataset.contextApi = 'webgl2';
    canvas.dataset.viewRevision = '0';
    viewport.appendChild(canvas);
    let renderer: WebGLRenderer;
    try {
      renderer = createRenderer(canvas);
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'The browser could not initialize 3D graphics.';
      const message = `3D view unavailable. ${reason} ${visualProfile === 'focus' ? 'The timer and distraction recording remain available.' : 'Use the accessible node list to explore the same career data.'}`;
      setState({ status: 'unavailable', message });
      callbacks.current.onStatusChange?.('unavailable', message);
      canvas.remove();
      return;
    }
    const runtime = new CareerScene(root, viewport, label, marker, missionLabelLayer, renderer, {
      onSelect: id => callbacks.current.onSelect(id),
      onInteraction: () => callbacks.current.onInteraction?.(),
      onStatusChange: (status, message) => {
        setState({ status, message });
        callbacks.current.onStatusChange?.(status, message);
      },
    }, visualProfile);
    runtimeRef.current = runtime;
    return () => {
      runtimeRef.current = null;
      runtime.dispose();
    };
  }, [instructionsId, visualProfile]);

  useEffect(() => { runtimeRef.current?.setGraph(graph); }, [graph, visualProfile]);
  useEffect(() => { runtimeRef.current?.setSelection(selectedId); }, [selectedId, visualProfile]);
  useEffect(() => { runtimeRef.current?.setAutoRotate(autoRotate); }, [autoRotate, visualProfile]);

  return (
    <div ref={rootRef} className="career-graph-scene" data-visual-profile={visualProfile} data-scene-state={state.status} data-view-revision="0" role={visualProfile === 'career' ? 'region' : undefined} aria-label={visualProfile === 'career' ? 'Career graph in 3D' : undefined} aria-hidden={visualProfile === 'focus' || undefined}>
      <div ref={viewportRef} className="career-graph-scene__viewport" />
      <div ref={missionLabelLayerRef} className="career-graph-scene__mission-labels" aria-hidden="true" hidden />
      <div ref={markerRef} className="career-graph-scene__selected-marker" data-screen-visible="false" aria-hidden="true" hidden />
      <div ref={labelRef} className="career-graph-scene__node-label" aria-hidden="true" hidden />
      <p id={instructionsId} className="career-graph-scene__sr-only">
        Drag to rotate. Scroll or pinch to zoom. Use two fingers or the right mouse button to pan.
        With the canvas focused, arrow keys rotate, plus and minus zoom, and Home fits the graph.
        Select a ringed point to inspect real work. Interior lines represent graph connections; the outer rim is decorative, not an additional relationship.
        The accessible node list offers the same selections without the canvas.
      </p>
      <div className="career-graph-scene__status" role="status" aria-live="polite" aria-atomic="true">
        {state.status === 'loading' && <p>Opening 3D space…</p>}
        {(state.status === 'unavailable' || state.status === 'lost') && <p>{state.message}</p>}
        {state.status === 'ready' && graph.nodes.length === 0 && <p>No nodes in this view. Adjust the graph filters.</p>}
      </div>
      {state.status === 'ready' && visualProfile === 'career' && <span className="career-graph-scene__space-note" aria-hidden="true">Interior lines: connections · Outer rim: decoration</span>}
    </div>
  );
});

export default CareerGraphScene;
