import {
  BufferAttribute, BufferGeometry, Color, DynamicDrawUsage, Group, LineSegments,
  PerspectiveCamera, Points, ShaderMaterial, Vector3,
} from 'three';
import type { CareerGraphNode } from './careerGraphModel';
import type { CareerOrbit, CareerOrbitSelection } from './careerOrbitTypes';
import { CAREER_ORBIT_PLANES, orbitPoint } from './careerOrbitMotion';
import { CareerOrbitSavedPulses, SAVED_STATUS_PULSE_SECONDS } from './careerOrbitSavedPulses';
import type { SavedStatusPulse } from './careerOrbitSavedPulses';
import type { CareerOrbitScreenHit } from './careerSceneInteraction';

const TAU = Math.PI * 2;
const STATUS = { complete: new Color('#45D072'), incomplete: new Color('#F34B00'), reference: new Color('#268BD2') };
const WHITE = new Color('#EEE8D5');
const vertex = `
  varying vec3 vColor;
  varying vec3 vViewPosition;
  void main() {
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vColor = color;
    vViewPosition = viewPosition.xyz;
    gl_Position = projectionMatrix * viewPosition;
  }
`;
const mask = `
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

function lineMaterial(masked = false, opacity = 0.65): ShaderMaterial {
  return new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: `
      varying vec3 vColor;
      uniform float uOpacity;
      ${masked ? mask : ''}
      void main() {
        gl_FragColor = vec4(vColor, uOpacity ${masked ? '* rimVisibility()' : ''});
        #include <colorspace_fragment>
      }`,
    vertexColors: true, transparent: true, depthWrite: false, toneMapped: false,
    uniforms: {
      uOpacity: { value: opacity }, uCenterView: { value: new Vector3() },
      uRadius: { value: 1 }, uRimOnly: { value: 0 },
    },
  });
}

interface PathRange { start: number; end: number; selection: CareerOrbitSelection }
interface OrbitEntry {
  orbit: CareerOrbit;
  start: number;
  end: number;
  segmentAngles: Map<string, number>;
  visibleMemberCount: number;
}
interface Tether {
  entry: OrbitEntry;
  angle: number;
  offset: number;
  target: readonly [number, number, number];
  nodeId: string;
}
export interface OrbitAnchorInfo {
  orbit: CareerOrbit;
  visibleMemberCount: number;
}

function dynamicPositions(values: number[] | Float32Array): BufferAttribute {
  return new BufferAttribute(new Float32Array(values), 3).setUsage(DynamicDrawUsage);
}

/** Derived views only: never owns, moves, or mutates a graph node. */
export class CareerOrbitVisuals {
  readonly object = new Group();
  readonly paths = new LineSegments(new BufferGeometry(), lineMaterial(true));
  readonly anchors = new Points(new BufferGeometry(), new ShaderMaterial({
    vertexShader: `${vertex.replace('void main()', 'uniform float uPixelRatio;\nvoid main()').replace(
      'gl_Position = projectionMatrix * viewPosition;', 'gl_Position = projectionMatrix * viewPosition; gl_PointSize = 10.0 * uPixelRatio;')}`,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        if (r > 1.0) discard;
        float alpha = max(1.0 - smoothstep(0.3, 0.5, r), 1.0 - smoothstep(0.08, 0.16, abs(r - 0.8)));
        gl_FragColor = vec4(vColor, alpha);
        #include <colorspace_fragment>
      }`,
    uniforms: { uPixelRatio: { value: 1 } },
    vertexColors: true, transparent: true, depthWrite: false, depthTest: false, toneMapped: false,
  }));
  readonly primaryTethers = new LineSegments(new BufferGeometry(), lineMaterial(false, 0.22));
  readonly detailTethers = new LineSegments(new BufferGeometry(), lineMaterial(false, 0.55));
  readonly savedPulseTethers = new LineSegments(new BufferGeometry(), lineMaterial(false, 0.55));
  readonly savedPulsePackets = new Points(new BufferGeometry(), this.anchors.material);
  readonly selectedAnchor = new Points(new BufferGeometry(), this.anchors.material);
  private entries: OrbitEntry[] = [];
  private readonly byId = new Map<string, OrbitEntry>();
  private ranges: PathRange[] = [];
  private local = new Float32Array();
  private originalColors = new Float32Array();
  private primary: Tether[] = [];
  private details: Tether[] = [];
  private readonly savedPulses = new CareerOrbitSavedPulses();
  private readonly pulseTargets = new Map<SavedStatusPulse, Tether>();
  private pulseColorsDirty = false;
  private nodes: ReadonlyMap<string, CareerGraphNode> = new Map();
  private selection: CareerOrbitSelection | null = null;
  private readonly center = new Vector3();
  private readonly scratch = new Vector3();
  private readonly end = new Vector3();
  private readonly middle = new Vector3();
  private readonly projectedA = new Vector3();
  private readonly projectedB = new Vector3();
  private radius = 60;
  private phase = 0;
  private dirty = true;
  private disposed = false;
  private detailSegments = 8;
  private readonly primarySegments = 8;

  constructor(private readonly calm = false) {
    this.object.name = 'Real career orbit views';
    this.paths.name = 'Semantic orbit paths';
    this.anchors.name = 'Pickable orbit identities';
    this.primaryTethers.name = 'Orbit to actual hub membership';
    this.detailTethers.name = 'Selected orbit visible members';
    this.selectedAnchor.name = 'Selected orbit or stage anchor';
    this.savedPulseTethers.name = 'Transient saved-status membership tethers';
    this.savedPulsePackets.name = 'Saved-status packets - not inferred mastery';
    this.savedPulseTethers.visible = this.savedPulsePackets.visible = false;
    for (const item of [this.paths, this.primaryTethers, this.detailTethers, this.anchors, this.selectedAnchor, this.savedPulseTethers, this.savedPulsePackets]) {
      item.frustumCulled = false;
      item.renderOrder = item instanceof Points ? 4 : -1;
    }
    this.selectedAnchor.visible = false;
    this.selectedAnchor.geometry.setAttribute('position', dynamicPositions(new Float32Array(3)));
    this.selectedAnchor.geometry.setAttribute('color', new BufferAttribute(new Float32Array([WHITE.r, WHITE.g, WHITE.b]), 3));
    this.object.add(this.paths, this.primaryTethers, this.detailTethers, this.anchors, this.selectedAnchor, this.savedPulseTethers, this.savedPulsePackets);
    if (calm) {
      this.paths.material.uniforms.uOpacity.value = 0.38;
      this.primaryTethers.material.uniforms.uOpacity.value = 0.12;
    }
  }

  get animationTime(): number { return this.phase; }
  get orbitCount(): number { return this.entries.length; }
  get tetherCount(): number { return this.primary.length + this.details.length + this.savedPulses.active.length; }
  get savedPulseCount(): number { return this.savedPulses.active.length; }
  get detailTetherSegments(): number { return this.detailSegments; }
  get tetherTargetIds(): readonly string[] {
    return [...this.primary, ...this.details].map(tether => tether.nodeId).concat(this.savedPulses.active.map(pulse => pulse.nodeId));
  }
  get anchorInfo(): OrbitAnchorInfo[] { return this.entries.map(({ orbit, visibleMemberCount }) => ({ orbit, visibleMemberCount })); }

  setData(orbits: readonly CareerOrbit[], nodes: ReadonlyMap<string, CareerGraphNode>, center: Vector3, radius: number): void {
    if (this.disposed) return;
    this.nodes = nodes;
    this.center.copy(center);
    this.radius = Math.max(1, radius);
    this.byId.clear();
    this.entries = [];
    this.ranges = [];
    const positions: number[] = [];
    const colors: number[] = [];
    const anchorColors: number[] = [];
    const addArc = (entry: OrbitEntry, from: number, to: number, offset: number, color: Color, selection: CareerOrbitSelection) => {
      if (to <= from) return;
      const start = positions.length / 3;
      const segments = Math.max(1, Math.ceil((to - from) / TAU * 220));
      for (let sample = 0; sample < segments; sample++) {
        for (let endpoint = 0; endpoint < 2; endpoint++) {
          const angle = from + (to - from) * (sample + endpoint) / segments;
          const r = CAREER_ORBIT_PLANES[entry.orbit.index].radius + offset;
          positions.push(Math.cos(angle) * r, Math.sin(angle) * r, 0);
          colors.push(color.r, color.g, color.b);
        }
      }
      this.ranges.push({ start, end: positions.length / 3, selection });
    };
    for (const orbit of orbits) {
      if (!Number.isInteger(orbit.index) || orbit.index < 0 || orbit.index >= 15 || this.byId.has(orbit.id)) continue;
      const entry: OrbitEntry = {
        orbit, start: positions.length / 3, end: 0, segmentAngles: new Map(),
        visibleMemberCount: orbit.memberIds.reduce((count, id) => count + Number(nodes.has(id)), 0),
      };
      this.byId.set(orbit.id, entry);
      this.entries.push(entry);
      const color = new Color(orbit.color);
      if (!orbit.memberIds.length) color.multiplyScalar(0.32);
      color.toArray(anchorColors, anchorColors.length);
      addArc(entry, 0, TAU, 0, color.clone().multiplyScalar(0.62), { orbitId: orbit.id });
      const total = orbit.segments.reduce((count, segment) => count + segment.members.length, 0);
      let cursor = 0;
      for (const segment of orbit.segments) {
        if (!segment.members.length || !total) continue;
        const from = cursor / total * TAU;
        cursor += segment.members.length;
        const to = cursor / total * TAU;
        const gap = Math.min(0.035, (to - from) * 0.08);
        const selection = { orbitId: orbit.id, segmentId: segment.id };
        entry.segmentAngles.set(segment.id, (from + to) / 2);
        addArc(entry, from + gap, to - gap, 0.012, color, selection);
        if (orbit.kind === 'mission') {
          segment.members.forEach((member, index) => {
            const start = from + (to - from) * index / segment.members.length;
            const end = from + (to - from) * (index + 1) / segment.members.length;
            const slotGap = Math.min(0.008, (end - start) * 0.12);
            addArc(entry, start + slotGap, end - slotGap, 0.025, STATUS[member.status], selection);
            if (member.current) addArc(entry, start + slotGap, end - slotGap, 0.037, WHITE, selection);
          });
        }
      }
      entry.end = positions.length / 3;
    }
    this.local = new Float32Array(positions);
    this.originalColors = new Float32Array(colors);
    this.paths.geometry.dispose();
    this.paths.geometry.setAttribute('position', dynamicPositions(this.local));
    this.paths.geometry.setAttribute('color', dynamicPositions(this.originalColors));
    this.anchors.geometry.dispose();
    this.anchors.geometry.setAttribute('position', dynamicPositions(new Float32Array(this.entries.length * 3)));
    this.anchors.geometry.setAttribute('color', new BufferAttribute(new Float32Array(anchorColors), 3));
    this.primary = this.entries.flatMap(entry => {
      const hub = nodes.get(entry.orbit.hubNodeId);
      return hub ? [{ entry, angle: CAREER_ORBIT_PLANES[entry.orbit.index].anchorAngle, offset: 0, target: hub.position, nodeId: hub.id }] : [];
    });
    this.allocateTethers(this.primaryTethers.geometry, this.primary, this.primarySegments);
    this.savedPulses.observe(this.entries.map(entry => entry.orbit), nodes);
    this.rebuildPulseGeometry();
    this.setSelection(this.selection, true);
    this.dirty = true;
    this.updateGeometry();
  }

  setSelection(selection: CareerOrbitSelection | null, refresh = false): void {
    if (this.disposed) return;
    const active = selection && this.byId.has(selection.orbitId) ? selection : null;
    if (!refresh && this.selection?.orbitId === active?.orbitId
      && this.selection?.segmentId === active?.segmentId) return;
    this.selection = active;
    const entry = selection ? this.byId.get(selection.orbitId) : undefined;
    const segment = selection?.segmentId ? entry?.orbit.segments.find(item => item.id === selection.segmentId) : undefined;
    const ids = selection?.segmentId ? segment?.members.map(member => member.nodeId) ?? [] : entry?.orbit.memberIds ?? [];
    const angle = selection?.segmentId
      ? entry?.segmentAngles.get(selection.segmentId) ?? (entry ? CAREER_ORBIT_PLANES[entry.orbit.index].anchorAngle : 0)
      : entry ? CAREER_ORBIT_PLANES[entry.orbit.index].anchorAngle : 0;
    this.details = [];
    for (const id of new Set(ids)) {
      const node = this.nodes.get(id);
      if (entry && node) this.details.push({ entry, angle, offset: segment?.members.length ? 0.012 : 0, target: node.position, nodeId: id });
    }
    this.detailSegments = this.details.length > 2000 ? 1 : this.details.length > 500 ? 2 : 8;
    this.allocateTethers(this.detailTethers.geometry, this.details, this.detailSegments);
    this.updatePathColors();
    this.selectedAnchor.visible = Boolean(this.selection);
    this.dirty = true;
    this.updateGeometry();
  }

  private updatePathColors(): void {
    const colors = this.paths.geometry.getAttribute('color');
    if (colors) {
      const values = colors.array;
      values.set(this.originalColors);
      for (const range of this.ranges) {
        const selected = range.selection.orbitId === this.selection?.orbitId
          && (!this.selection.segmentId || range.selection.segmentId === this.selection.segmentId);
        if (selected) {
          for (let index = range.start * 3; index < range.end * 3; index++) values[index] *= 1.65;
        }
        let emphasis = 0;
        for (const pulse of this.savedPulses.active) {
          if (pulse.orbitId === range.selection.orbitId && pulse.segmentId === range.selection.segmentId) {
            emphasis = Math.max(emphasis, 0.55 * (1 - pulse.elapsed / SAVED_STATUS_PULSE_SECONDS));
          }
        }
        if (emphasis > 0) {
          for (let index = range.start * 3; index < range.end * 3; index += 3) {
            values[index] += (WHITE.r - values[index]) * emphasis;
            values[index + 1] += (WHITE.g - values[index + 1]) * emphasis;
            values[index + 2] += (WHITE.b - values[index + 2]) * emphasis;
          }
        }
      }
      colors.needsUpdate = true;
    }
    this.pulseColorsDirty = false;
  }

  getAnchor(selection: CareerOrbitSelection, target: Vector3): boolean {
    const entry = this.byId.get(selection.orbitId);
    if (!entry) return false;
    const angle = selection.segmentId ? entry.segmentAngles.get(selection.segmentId) : undefined;
    orbitPoint(entry.orbit.index, angle ?? CAREER_ORBIT_PLANES[entry.orbit.index].anchorAngle,
      this.phase, this.center, this.radius, target, angle === undefined ? 0 : 0.012, this.calm);
    return true;
  }

  setVisible(value: boolean): void { this.object.visible = value; }
  setRimOnly(value: boolean): void { this.paths.material.uniforms.uRimOnly.value = Number(value); }
  resize(pixelRatio: number): void { this.anchors.material.uniforms.uPixelRatio.value = pixelRatio; }

  setMotionAllowed(value: boolean): void {
    if (this.disposed) return;
    const wasActive = this.savedPulses.active.length > 0;
    this.savedPulses.setEnabled(value);
    if (!value && wasActive) {
      this.savedPulseTethers.visible = this.savedPulsePackets.visible = false;
      this.pulseTargets.clear();
      this.updatePulseGeometry();
      this.updatePathColors();
    }
  }

  update(camera: PerspectiveCamera, delta: number): void {
    if (this.disposed) return;
    if (delta > 0 && Number.isFinite(delta)) {
      this.phase += delta;
      this.dirty = true;
    }
    if (this.savedPulses.active.length) {
      this.savedPulses.advance(delta);
      this.pulseColorsDirty = true;
    }
    camera.updateMatrixWorld();
    this.paths.material.uniforms.uCenterView.value.copy(this.center).applyMatrix4(camera.matrixWorldInverse);
    this.paths.material.uniforms.uRadius.value = this.radius;
    if (this.dirty) this.updateGeometry();
    if (this.pulseColorsDirty) this.updatePathColors();
    this.updatePulseGeometry();
  }

  private updateGeometry(): void {
    const positions = this.paths.geometry.getAttribute('position');
    const anchors = this.anchors.geometry.getAttribute('position');
    if (!positions || !anchors) return;
    const values = positions.array;
    this.entries.forEach((entry, anchorIndex) => {
      const plane = CAREER_ORBIT_PLANES[entry.orbit.index];
      const angle = this.phase * plane.speed * (this.calm ? 0.4 : 1);
      const cos = Math.cos(angle), sin = Math.sin(angle);
      for (let vertex = entry.start; vertex < entry.end; vertex++) {
        const index = vertex * 3;
        const x = (this.local[index] * cos - this.local[index + 1] * sin) * this.radius;
        const y = (this.local[index] * sin + this.local[index + 1] * cos) * this.radius;
        values[index] = this.center.x + plane.x.x * x + plane.y.x * y;
        values[index + 1] = this.center.y + plane.x.y * x + plane.y.y * y;
        values[index + 2] = this.center.z + plane.x.z * x + plane.y.z * y;
      }
      orbitPoint(entry.orbit.index, plane.anchorAngle, this.phase, this.center, this.radius, this.scratch, 0, this.calm);
      anchors.setXYZ(anchorIndex, this.scratch.x, this.scratch.y, this.scratch.z);
    });
    positions.needsUpdate = true;
    anchors.needsUpdate = true;
    if (this.selection && this.getAnchor(this.selection, this.scratch)) {
      const marker = this.selectedAnchor.geometry.getAttribute('position');
      marker.setXYZ(0, this.scratch.x, this.scratch.y, this.scratch.z);
      marker.needsUpdate = true;
    }
    this.updateTethers(this.primaryTethers.geometry, this.primary, this.primarySegments);
    this.updateTethers(this.detailTethers.geometry, this.details, this.detailSegments);
    this.dirty = false;
  }

  private allocateTethers(geometry: BufferGeometry, tethers: Tether[], segments: number): void {
    geometry.dispose();
    geometry.setAttribute('position', dynamicPositions(new Float32Array(tethers.length * segments * 6)));
    const colors = new Float32Array(tethers.length * segments * 6);
    tethers.forEach((tether, index) => {
      const color = new Color(tether.entry.orbit.color);
      for (let vertex = 0; vertex < segments * 2; vertex++) color.toArray(colors, (index * segments * 2 + vertex) * 3);
    });
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
  }

  private rebuildPulseGeometry(): void {
    this.pulseTargets.clear();
    const tethers: Tether[] = [];
    for (const pulse of this.savedPulses.active) {
      const entry = this.byId.get(pulse.orbitId);
      const node = this.nodes.get(pulse.nodeId);
      const angle = entry?.segmentAngles.get(pulse.segmentId);
      if (!entry || !node || angle === undefined) continue;
      const tether = { entry, angle, offset: 0.012, target: node.position, nodeId: node.id };
      this.pulseTargets.set(pulse, tether);
      tethers.push(tether);
    }
    this.allocateTethers(this.savedPulseTethers.geometry, tethers, this.primarySegments);
    this.savedPulsePackets.geometry.dispose();
    this.savedPulsePackets.geometry.setAttribute('position', dynamicPositions(new Float32Array(tethers.length * 3)));
    this.savedPulsePackets.geometry.setAttribute('color', dynamicPositions(new Float32Array(tethers.length * 3)));
    this.updatePulseGeometry();
  }

  private updatePulseGeometry(): void {
    const tethers = this.savedPulseTethers.geometry.getAttribute('position');
    const packets = this.savedPulsePackets.geometry.getAttribute('position');
    const colors = this.savedPulsePackets.geometry.getAttribute('color');
    let count = 0;
    for (const pulse of this.savedPulses.active) {
      const tether = this.pulseTargets.get(pulse);
      if (!tether || !tethers || !packets) continue;
      this.writeTether(tethers.array, tether, count, this.primarySegments);
      const progress = pulse.elapsed / SAVED_STATUS_PULSE_SECONDS;
      // writeTether leaves the real moving anchor, control point and node in these scratch vectors.
      const t = 1 - progress;
      const a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
      packets.setXYZ(count,
        a * this.scratch.x + b * this.middle.x + c * this.end.x,
        a * this.scratch.y + b * this.middle.y + c * this.end.y,
        a * this.scratch.z + b * this.middle.z + c * this.end.z);
      const brightness = Math.min(1, (1 - progress) * 5);
      colors.setXYZ(count, WHITE.r * brightness, WHITE.g * brightness, WHITE.b * brightness);
      count++;
    }
    this.savedPulseTethers.visible = this.savedPulsePackets.visible = count > 0;
    this.savedPulseTethers.geometry.setDrawRange(0, count * this.primarySegments * 2);
    this.savedPulsePackets.geometry.setDrawRange(0, count);
    if (count > 0) {
      tethers.needsUpdate = packets.needsUpdate = colors.needsUpdate = true;
    } else this.pulseTargets.clear();
  }

  private writeTether(values: ArrayLike<number> & { [index: number]: number }, tether: Tether, index: number, segments: number): void {
    const entry = tether.entry;
    orbitPoint(entry.orbit.index, tether.angle, this.phase, this.center, this.radius, this.scratch, tether.offset, this.calm);
    this.end.fromArray(tether.target);
    this.middle.copy(this.scratch).add(this.end).multiplyScalar(0.5);
    // A shallow curve, not a fabricated intermediate node. Both ends remain exact.
    this.middle.addScaledVector(CAREER_ORBIT_PLANES[entry.orbit.index].y, this.radius * 0.06);
    for (let segment = 0; segment < segments; segment++) {
      for (let endpoint = 0; endpoint < 2; endpoint++) {
        const t = (segment + endpoint) / segments;
        const a = (1 - t) * (1 - t), b = 2 * (1 - t) * t, c = t * t;
        const offset = (index * segments * 2 + segment * 2 + endpoint) * 3;
        values[offset] = a * this.scratch.x + b * this.middle.x + c * this.end.x;
        values[offset + 1] = a * this.scratch.y + b * this.middle.y + c * this.end.y;
        values[offset + 2] = a * this.scratch.z + b * this.middle.z + c * this.end.z;
      }
    }
  }

  private updateTethers(geometry: BufferGeometry, tethers: Tether[], segments: number): void {
    const positions = geometry.getAttribute('position');
    if (!positions) return;
    const values = positions.array;
    tethers.forEach((tether, index) => this.writeTether(values, tether, index, segments));
    positions.needsUpdate = true;
  }

  /** Screen-space tests use the very buffers rendered this frame, never stale base arcs. */
  pick(x: number, y: number, camera: PerspectiveCamera, width: number, height: number): CareerOrbitSelection | undefined {
    return this.pickAnchor(x, y, camera, width, height)?.selection ?? this.pickPath(x, y, camera, width, height);
  }

  pickAnchor(x: number, y: number, camera: PerspectiveCamera, width: number, height: number): CareerOrbitScreenHit | undefined {
    if (!this.object.visible || this.disposed) return undefined;
    const project = (point: Vector3) => {
      point.project(camera);
      const visible = point.z >= -1 && point.z <= 1;
      point.x = (point.x + 1) * width / 2;
      point.y = (1 - point.y) * height / 2;
      return visible;
    };
    let best: CareerOrbitSelection | undefined;
    let closest = 11;
    if (this.selection && this.getAnchor(this.selection, this.projectedA) && project(this.projectedA)) {
      const distance = Math.hypot(x - this.projectedA.x, y - this.projectedA.y);
      if (distance < closest) {
        closest = distance;
        best = this.selection;
      }
    }
    const anchors = this.anchors.geometry.getAttribute('position');
    if (!anchors) return undefined;
    this.entries.forEach((entry, index) => {
      this.projectedA.fromBufferAttribute(anchors, index);
      if (!project(this.projectedA)) return;
      const distance = Math.hypot(x - this.projectedA.x, y - this.projectedA.y);
      if (distance < closest) {
        closest = distance;
        best = { orbitId: entry.orbit.id };
      }
    });
    return best ? { selection: best, distance: closest } : undefined;
  }

  pickPath(x: number, y: number, camera: PerspectiveCamera, width: number, height: number): CareerOrbitSelection | undefined {
    if (!this.object.visible || this.disposed) return undefined;
    const project = (point: Vector3) => {
      point.project(camera);
      const visible = point.z >= -1 && point.z <= 1;
      point.x = (point.x + 1) * width / 2;
      point.y = (1 - point.y) * height / 2;
      return visible;
    };
    let best: CareerOrbitSelection | undefined;
    let closest = 6;
    const positions = this.paths.geometry.getAttribute('position');
    const masked = this.paths.material.uniforms.uRimOnly.value > 0.5;
    const centerView = this.paths.material.uniforms.uCenterView.value as Vector3;
    for (const range of this.ranges) {
      for (let index = range.start; index < range.end; index += 2) {
        this.projectedA.fromBufferAttribute(positions, index);
        this.projectedB.fromBufferAttribute(positions, index + 1);
        if (masked) {
          this.scratch.copy(this.projectedA).add(this.projectedB).multiplyScalar(0.5)
            .applyMatrix4(camera.matrixWorldInverse).normalize().cross(centerView);
          if (this.scratch.length() / this.radius < 1.035) continue;
        }
        if (!project(this.projectedA) || !project(this.projectedB)) continue;
        const dx = this.projectedB.x - this.projectedA.x, dy = this.projectedB.y - this.projectedA.y;
        const t = Math.max(0, Math.min(1, ((x - this.projectedA.x) * dx + (y - this.projectedA.y) * dy) / (dx * dx + dy * dy || 1)));
        const distance = Math.hypot(x - this.projectedA.x - dx * t, y - this.projectedA.y - dy * t);
        if (distance < closest) {
          closest = distance;
          best = range.selection;
        }
      }
    }
    return best;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    for (const item of [this.paths, this.anchors, this.primaryTethers, this.detailTethers, this.selectedAnchor, this.savedPulseTethers, this.savedPulsePackets]) item.geometry.dispose();
    for (const material of [this.paths.material, this.anchors.material, this.primaryTethers.material, this.detailTethers.material, this.savedPulseTethers.material]) material.dispose();
    this.object.clear();
    this.entries = [];
    this.byId.clear();
    this.nodes = new Map();
    this.primary = [];
    this.details = [];
    this.ranges = [];
    this.local = new Float32Array();
    this.originalColors = new Float32Array();
    this.savedPulses.dispose();
    this.pulseTargets.clear();
  }
}
