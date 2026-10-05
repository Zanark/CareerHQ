import { describe, expect, it, vi } from 'vitest';
import { BufferGeometry, Color, LineSegments, PerspectiveCamera, Points, Vector3 } from 'three';
import type { CareerGraphNode } from './careerGraphModel';
import type { CareerOrbit } from './careerOrbitTypes';
import { CareerOrbitVisuals } from './CareerOrbitVisuals';
import { CAREER_ORBIT_PLANES, orbitPoint } from './careerOrbitMotion';
import { SAVED_STATUS_PULSE_SECONDS } from './careerOrbitSavedPulses';

function node(id: string, position: [number, number, number] = [12, 7, 3]): CareerGraphNode {
  return { id, position, kind: 'checkpoint', roadmapVersion: '1.0.0', status: 'incomplete', label: id, detail: '', context: '', href: '/' };
}

function orbit(index = 0): CareerOrbit {
  return {
    id: `orbit:${index}`, index, kind: 'mission', label: `Mission ${index}`,
    summary: '1 of 3 checkpoints complete', detail: '', color: '#EDAE29', href: '/',
    hubNodeId: 'mission:hub', memberIds: ['checkpoint:done', 'checkpoint:now', 'checkpoint:later'],
    roadmapVersion: '1.0.0',
    progress: { completed: 1, total: 3 }, currentNodeId: 'checkpoint:now',
    segments: [
      { id: 'stage:first', label: 'First stage', summary: '1 of 2 complete', detail: '', members: [
        { nodeId: 'checkpoint:done', status: 'complete', current: false },
        { nodeId: 'checkpoint:now', status: 'incomplete', current: true },
      ] },
      { id: 'stage:second', label: 'Second stage', summary: '0 of 1 complete', detail: '', members: [
        { nodeId: 'checkpoint:later', status: 'reference', current: false },
      ] },
    ],
  };
}

function nodes(): Map<string, CareerGraphNode> {
  return new Map([
    node('mission:hub', [0, 0, 0]), node('checkpoint:done', [9, 2, -8]),
    node('checkpoint:now', [-6, 7, 8]), node('checkpoint:later', [2, -4, 6]),
    node('unrelated', [35, 0, 0]),
  ].map(item => [item.id, item]));
}

function camera(): PerspectiveCamera {
  const camera = new PerspectiveCamera(46, 1, 0.1, 1000);
  camera.position.set(0, 0, 260);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();
  return camera;
}

function position(geometry: BufferGeometry, index: number): Vector3 {
  return new Vector3().fromBufferAttribute(geometry.getAttribute('position'), index);
}

function screen(point: Vector3, view: PerspectiveCamera): [number, number] {
  point.project(view);
  return [(point.x + 1) * 400, (1 - point.y) * 400];
}

describe('semantic career orbit geometry', () => {
  it('uses fixed identity planes and exactly two deterministic speed boosts, not filtered order', () => {
    expect(CAREER_ORBIT_PLANES.map(item => item.multiplier).sort()).toEqual([...Array<number>(13).fill(1), 1.5, 2]);
    expect(new Set(CAREER_ORBIT_PLANES.map(item => item.speed)).size).toBe(15);
    expect(CAREER_ORBIT_PLANES.some(item => item.speed < 0)).toBe(true);
    const first = new CareerOrbitVisuals();
    const second = new CareerOrbitVisuals();
    const a = orbit(2), b = orbit(12);
    first.setData([a, b], nodes(), new Vector3(), 60);
    second.setData([b], nodes(), new Vector3(), 60);
    first.update(camera(), 7);
    second.update(camera(), 7);
    const pointA = new Vector3(), pointB = new Vector3();
    first.getAnchor({ orbitId: b.id }, pointA);
    second.getAnchor({ orbitId: b.id }, pointB);
    expect(pointA.distanceTo(pointB)).toBeLessThan(0.000001);
    expect(pointA.length()).toBeCloseTo(CAREER_ORBIT_PLANES[12].radius * 60);
    const expected = orbitPoint(12, CAREER_ORBIT_PLANES[12].anchorAngle, 7, new Vector3(), 60, new Vector3());
    expect(pointA).toEqual(expected);
    first.dispose();
    second.dispose();
  });

  it('never moves nodes, connects invented neighbors, or treats membership as actual graph edges', () => {
    const actual = nodes();
    for (const item of actual.values()) {
      Object.freeze(item.position);
      Object.freeze(item);
    }
    const before = JSON.stringify([...actual]);
    const visuals = new CareerOrbitVisuals();
    visuals.setData([orbit()], actual, new Vector3(8, 3, -4), 65);
    expect(visuals.orbitCount).toBe(1);
    expect(visuals.tetherTargetIds).toEqual(['mission:hub']);
    visuals.setSelection({ orbitId: 'orbit:0', segmentId: 'stage:first' });
    expect(visuals.tetherTargetIds).toEqual(['mission:hub', 'checkpoint:done', 'checkpoint:now']);
    visuals.update(camera(), 12);
    expect(JSON.stringify([...actual])).toBe(before);
    expect(visuals.tetherTargetIds).not.toContain('unrelated');
    visuals.dispose();
  });

  it('keeps the supplied identity hue while showing only real checkpoint statuses and the actual current slot', () => {
    const data = orbit();
    const visuals = new CareerOrbitVisuals();
    visuals.setData([data], nodes(), new Vector3(), 60);
    const colorSet = () => {
      const colors = visuals.paths.geometry.getAttribute('color');
      return new Set(Array.from({ length: colors.count }, (_, index) =>
        [colors.getX(index), colors.getY(index), colors.getZ(index)].map(value => value.toFixed(5)).join(',')));
    };
    const expectedColor = (hex: string) => new Color(hex).toArray().map(value => value.toFixed(5)).join(',');
    for (const hex of [data.color, '#45D072', '#F34B00', '#268BD2', '#EEE8D5']) {
      expect(colorSet().has(expectedColor(hex))).toBe(true);
    }
    const positions = visuals.paths.geometry.getAttribute('position').array.slice();
    data.segments[0].members[1].status = 'complete';
    visuals.setData([data], nodes(), new Vector3(), 60);
    expect(colorSet().has(expectedColor('#F34B00'))).toBe(false);
    expect(visuals.paths.geometry.getAttribute('position').array).toEqual(positions);
    visuals.dispose();
  });

  it('sizes collection buckets by actual record counts rather than a fictitious completion percentage', () => {
    const data = orbit(10);
    data.kind = 'evidence';
    delete data.progress;
    data.segments[0].members = [data.segments[0].members[0]];
    data.segments[1].members = [
      { nodeId: 'a', status: 'reference', current: false },
      { nodeId: 'b', status: 'reference', current: false },
      { nodeId: 'c', status: 'reference', current: false },
    ];
    const visuals = new CareerOrbitVisuals();
    visuals.setData([data], nodes(), new Vector3(), 60);
    const anchor = new Vector3();
    visuals.getAnchor({ orbitId: data.id, segmentId: data.segments[0].id }, anchor);
    expect(anchor.distanceTo(orbitPoint(10, Math.PI / 4, 0, new Vector3(), 60, new Vector3(), 0.012))).toBeLessThan(0.000001);
    visuals.getAnchor({ orbitId: data.id, segmentId: data.segments[1].id }, anchor);
    expect(anchor.distanceTo(orbitPoint(10, Math.PI * 1.25, 0, new Vector3(), 60, new Vector3(), 0.012))).toBeLessThan(0.000001);
    const white = new Color('#EEE8D5').toArray();
    const colors = visuals.paths.geometry.getAttribute('color');
    expect(Array.from({ length: colors.count }, (_, index) =>
      Math.abs(colors.getX(index) - white[0]) < 0.0001
      && Math.abs(colors.getY(index) - white[1]) < 0.0001
      && Math.abs(colors.getZ(index) - white[2]) < 0.0001).some(Boolean)).toBe(false);
    visuals.dispose();
  });

  it('keeps complete membership but draws only visible, verified targets and distinguishes empty from filtered', () => {
    const real = orbit();
    real.memberIds.push('missing');
    real.segments[0].members.push({ nodeId: 'missing', status: 'incomplete', current: false });
    const empty = { ...orbit(9), kind: 'action' as const, memberIds: [], segments: [], hubNodeId: 'core:hidden' };
    const visible = new Map([['checkpoint:now', node('checkpoint:now')]]);
    const visuals = new CareerOrbitVisuals();
    visuals.setData([real, empty], visible, new Vector3(), 60);
    expect(visuals.tetherCount).toBe(0);
    visuals.setSelection({ orbitId: real.id });
    expect(visuals.tetherTargetIds).toEqual(['checkpoint:now']);
    expect(visuals.anchorInfo.map(item => [item.orbit.memberIds.length, item.visibleMemberCount])).toEqual([[4, 1], [0, 0]]);
    visuals.setData([real, empty], new Map(), new Vector3(), 60);
    expect(visuals.anchorInfo.map(item => [item.orbit.memberIds.length, item.visibleMemberCount])).toEqual([[4, 0], [0, 0]]);
    expect(visuals.tetherCount).toBe(0);
    expect(visuals.orbitCount).toBe(2);
    visuals.dispose();
  });

  it('stretches tethers from moving primary and selected stage anchors to unchanged endpoints', () => {
    const visuals = new CareerOrbitVisuals();
    const data = nodes();
    visuals.setData([orbit()], data, new Vector3(), 60);
    const selection = { orbitId: 'orbit:0', segmentId: 'stage:first' };
    visuals.setSelection(selection);
    const primary = visuals.primaryTethers.geometry.getAttribute('position');
    const details = visuals.detailTethers.geometry.getAttribute('position');
    const start = position(visuals.primaryTethers.geometry, 0);
    visuals.update(camera(), 8);
    expect(position(visuals.primaryTethers.geometry, 0).distanceTo(start)).toBeGreaterThan(10);
    expect(position(visuals.primaryTethers.geometry, primary.count - 1).toArray()).toEqual(data.get('mission:hub')!.position);
    const anchor = new Vector3();
    visuals.getAnchor(selection, anchor);
    expect(position(visuals.detailTethers.geometry, 0).distanceTo(anchor)).toBeLessThan(0.00001);
    expect(position(visuals.detailTethers.geometry, 15).toArray()).toEqual(data.get('checkpoint:done')!.position);
    expect(position(visuals.detailTethers.geometry, details.count - 1).toArray()).toEqual(data.get('checkpoint:now')!.position);
    expect(visuals.primaryTethers.geometry.getAttribute('position')).toBe(primary);
    expect(visuals.detailTethers.geometry.getAttribute('position')).toBe(details);
    visuals.dispose();
  });

  it('rotates all stage and status slots coherently and picks current anchors and arcs', () => {
    const visuals = new CareerOrbitVisuals();
    const view = camera();
    const data = orbit();
    visuals.setData([data], nodes(), new Vector3(), 60);
    const before = position(visuals.paths.geometry, 0);
    visuals.update(view, 8);
    const plane = CAREER_ORBIT_PLANES[0];
    const axis = plane.x.clone().cross(plane.y).normalize();
    expect(position(visuals.paths.geometry, 0).distanceTo(before.applyAxisAngle(axis, plane.speed * 8))).toBeLessThan(0.00001);
    const current = new Vector3();
    visuals.getAnchor({ orbitId: data.id }, current);
    expect(visuals.pick(...screen(current, view), view, 800, 800)).toEqual({ orbitId: data.id });
    for (const segment of data.segments) {
      const selection = { orbitId: data.id, segmentId: segment.id };
      visuals.getAnchor(selection, current);
      expect(visuals.pick(...screen(current, view), view, 800, 800)).toEqual(selection);
    }
    visuals.dispose();
  });

  it('exposes nearest foreground-anchor screen distance separately from underlying ring paths', () => {
    const visuals = new CareerOrbitVisuals(), view = camera(), data = orbit();
    visuals.setData([data], nodes(), new Vector3(), 60);
    visuals.update(view, 8);
    const point = new Vector3();
    visuals.getAnchor({ orbitId: data.id }, point);
    const [x, y] = screen(point, view);
    const hit = visuals.pickAnchor(x + 3, y + 4, view, 800, 800);
    expect(hit?.selection).toEqual({ orbitId: data.id });
    expect(hit?.distance).toBeCloseTo(5, 4);
    expect(visuals.pickPath(x, y, view, 800, 800)?.orbitId).toBe(data.id);
    const stage = { orbitId: data.id, segmentId: data.segments[0].id };
    visuals.getAnchor(stage, point);
    const [stageX, stageY] = screen(point, view);
    expect(visuals.pickAnchor(stageX, stageY, view, 800, 800)).toBeUndefined();
    expect(visuals.pickPath(stageX, stageY, view, 800, 800)).toEqual(stage);
    visuals.setSelection(stage);
    expect(visuals.pickAnchor(stageX, stageY, view, 800, 800)?.selection).toEqual(stage);
    visuals.setVisible(false);
    expect(visuals.pickAnchor(x, y, view, 800, 800)).toBeUndefined();
    expect(visuals.pickPath(stageX, stageY, view, 800, 800)).toBeUndefined();
    visuals.dispose();
  });

  it('masks only orbit paths, preserving primary anchors, details and selection hit testing', () => {
    const visuals = new CareerOrbitVisuals();
    const view = camera();
    visuals.setData([orbit()], nodes(), new Vector3(), 60);
    visuals.setSelection({ orbitId: 'orbit:0' });
    const geometry = visuals.paths.geometry.getAttribute('position');
    visuals.setRimOnly(true);
    visuals.update(view, 0);
    const anchor = new Vector3();
    visuals.getAnchor({ orbitId: 'orbit:0' }, anchor);
    expect(visuals.pick(...screen(anchor, view), view, 800, 800)).toEqual({ orbitId: 'orbit:0' });
    const stage = { orbitId: 'orbit:0', segmentId: 'stage:first' };
    visuals.setSelection(stage);
    visuals.getAnchor(stage, anchor);
    expect(visuals.pick(...screen(anchor, view), view, 800, 800)).toEqual(stage);
    expect(visuals.paths.material.fragmentShader).toContain('rimVisibility()');
    for (const material of [visuals.anchors.material, visuals.primaryTethers.material, visuals.detailTethers.material]) {
      expect(material.fragmentShader).not.toContain('rimVisibility()');
    }
    visuals.setRimOnly(false);
    expect(visuals.paths.geometry.getAttribute('position')).toBe(geometry);
    visuals.setVisible(false);
    expect(visuals.pick(...screen(new Vector3(60, 0, 0), view), view, 800, 800)).toBeUndefined();
    visuals.dispose();
  });

  it('preserves active time over selection/data rebuilds and pauses without resume catch-up', () => {
    const visuals = new CareerOrbitVisuals();
    const view = camera();
    visuals.setData([orbit()], nodes(), new Vector3(), 60);
    visuals.update(view, 0.05);
    const geometry = visuals.paths.geometry.getAttribute('position');
    const before = geometry.array.slice();
    for (let frame = 0; frame < 30; frame++) visuals.update(view, 0);
    visuals.update(view, -1);
    visuals.update(view, Infinity);
    expect(geometry.array).toEqual(before);
    expect(visuals.animationTime).toBe(0.05);
    visuals.setSelection({ orbitId: 'orbit:0', segmentId: 'stage:first' });
    visuals.setData([orbit()], nodes(), new Vector3(), 60);
    expect(visuals.animationTime).toBe(0.05);
    expect(visuals.paths.geometry.getAttribute('position').array).toEqual(before);
    visuals.update(view, 0.03);
    expect(visuals.animationTime).toBe(0.08);
    visuals.dispose();
  });

  it('compares selection identities, ignoring equivalent parent-render objects without rebuilding buffers', () => {
    const visuals = new CareerOrbitVisuals();
    visuals.setData([orbit()], nodes(), new Vector3(), 60);
    visuals.setSelection({ orbitId: 'orbit:0', segmentId: 'stage:first' });
    const positions = visuals.detailTethers.geometry.getAttribute('position');
    const dispose = vi.spyOn(visuals.detailTethers.geometry, 'dispose');
    for (let render = 0; render < 10; render++) visuals.setSelection({ orbitId: 'orbit:0', segmentId: 'stage:first' });
    expect(visuals.detailTethers.geometry.getAttribute('position')).toBe(positions);
    expect(dispose).not.toHaveBeenCalled();
    visuals.setData([], nodes(), new Vector3(), 60);
    visuals.setSelection({ orbitId: 'orbit:0', segmentId: 'stage:first' });
    expect(visuals.selectedAnchor.visible).toBe(false);
    expect(visuals.tetherCount).toBe(0);
    visuals.dispose();
  });

  it('runs the focus profile at 40% orbit speed, independent of any timer', () => {
    const normal = new CareerOrbitVisuals(), calm = new CareerOrbitVisuals(true);
    const view = camera();
    normal.setData([orbit()], nodes(), new Vector3(), 60);
    calm.setData([orbit()], nodes(), new Vector3(), 60);
    normal.update(view, 4);
    calm.update(view, 10);
    expect(calm.paths.geometry.getAttribute('position').array).toEqual(normal.paths.geometry.getAttribute('position').array);
    normal.dispose();
    calm.dispose();
  });

  it('sends a finite saved-status packet along only the changed checkpoint membership toward its moving stage', () => {
    const visuals = new CareerOrbitVisuals();
    visuals.setMotionAllowed(true);
    const data = orbit(), actual = nodes(), view = camera();
    visuals.setData([data], actual, new Vector3(), 60);
    expect(visuals.savedPulseCount).toBe(0);
    data.segments[0].members[1].status = 'complete';
    data.segments[0].members[1].current = false;
    visuals.setData([data], actual, new Vector3(), 60);
    expect(visuals.savedPulseCount).toBe(1);
    expect(visuals.tetherTargetIds).toEqual(['mission:hub', 'checkpoint:now']);
    expect(position(visuals.savedPulsePackets.geometry, 0).toArray()).toEqual(actual.get('checkpoint:now')!.position);
    const tether = visuals.savedPulseTethers.geometry.getAttribute('position');
    const packets = visuals.savedPulsePackets.geometry.getAttribute('position');
    visuals.update(view, SAVED_STATUS_PULSE_SECONDS / 2);
    expect(position(visuals.savedPulsePackets.geometry, 0).distanceTo(position(visuals.savedPulseTethers.geometry, 8))).toBeLessThan(0.00001);
    const anchor = new Vector3();
    visuals.getAnchor({ orbitId: data.id, segmentId: data.segments[0].id }, anchor);
    expect(position(visuals.savedPulseTethers.geometry, 0).distanceTo(anchor)).toBeLessThan(0.00001);
    expect(position(visuals.savedPulseTethers.geometry, tether.count - 1).toArray()).toEqual(actual.get('checkpoint:now')!.position);
    visuals.update(view, SAVED_STATUS_PULSE_SECONDS);
    expect(visuals.savedPulseCount).toBe(0);
    expect(visuals.tetherCount).toBe(1);
    expect(visuals.savedPulseTethers.visible).toBe(false);
    expect(visuals.savedPulsePackets.geometry.drawRange.count).toBe(0);
    expect(visuals.savedPulseTethers.geometry.getAttribute('position')).toBe(tether);
    expect(visuals.savedPulsePackets.geometry.getAttribute('position')).toBe(packets);
    const staticUpdated = new CareerOrbitVisuals();
    staticUpdated.setData([data], actual, new Vector3(), 60);
    expect(visuals.paths.geometry.getAttribute('color').array).toEqual(staticUpdated.paths.geometry.getAttribute('color').array);
    expect(actual.get('checkpoint:now')!.status).toBe('incomplete');
    visuals.dispose();
    staticUpdated.dispose();
  });

  it('cancels saved-status packets immediately when motion is disallowed and never replays on resume', () => {
    const visuals = new CareerOrbitVisuals();
    const data = orbit(), actual = nodes();
    visuals.setMotionAllowed(true);
    visuals.setData([data], actual, new Vector3(), 60);
    data.segments[0].members[1].status = 'complete';
    visuals.setData([data], actual, new Vector3(), 60);
    expect(visuals.savedPulseCount).toBe(1);
    visuals.setMotionAllowed(false);
    expect(visuals.savedPulseCount).toBe(0);
    expect(visuals.savedPulseTethers.visible).toBe(false);
    expect(visuals.savedPulsePackets.geometry.drawRange.count).toBe(0);
    visuals.update(camera(), 0);
    visuals.setMotionAllowed(true);
    visuals.setData([data], actual, new Vector3(), 60);
    expect(visuals.savedPulseCount).toBe(0);
    visuals.dispose();
  });

  it('retains all 10,000 records and tethers with reduced curve complexity and stable frame buffers', () => {
    const data = orbit(9);
    data.kind = 'action';
    data.memberIds = Array.from({ length: 10000 }, (_, index) => `record:${index}`);
    delete data.progress;
    data.segments = [{
      id: 'bucket', label: 'Recorded work', summary: '10,000 records', detail: '',
      members: data.memberIds.map(nodeId => ({ nodeId, status: 'reference', current: false })),
    }];
    const actual = nodes();
    for (const id of data.memberIds) actual.set(id, node(id));
    const visuals = new CareerOrbitVisuals();
    visuals.setData([data], actual, new Vector3(), 60);
    expect(visuals.tetherCount).toBe(1);
    visuals.setSelection({ orbitId: data.id });
    expect(visuals.tetherCount).toBe(10001);
    expect(visuals.detailTetherSegments).toBe(1);
    expect(visuals.detailTethers.geometry.getAttribute('position').count).toBe(20000);
    expect(visuals.paths.geometry.getAttribute('position').count).toBeLessThan(1000);
    const positions = visuals.detailTethers.geometry.getAttribute('position');
    const before = positions.array;
    for (let frame = 0; frame < 10; frame++) visuals.update(camera(), 0.03);
    expect(visuals.detailTethers.geometry.getAttribute('position').array).toBe(before);
    expect(new Set(visuals.tetherTargetIds).size).toBe(10001);
    expect(visuals.anchorInfo[0].visibleMemberCount).toBe(10000);
    visuals.dispose();
  });

  it('rejects invalid identity indices, tolerates zero-record segments and missing selections', () => {
    const data = orbit(4);
    data.segments.push({ id: 'empty', label: 'No records', summary: 'No records', detail: '', members: [] });
    const visuals = new CareerOrbitVisuals();
    visuals.setData([data, data, orbit(-1), orbit(15), orbit(1.5)], nodes(), new Vector3(), 0);
    expect(visuals.orbitCount).toBe(1);
    visuals.setSelection({ orbitId: data.id, segmentId: 'empty' });
    expect(visuals.tetherCount).toBe(1);
    expect(visuals.getAnchor({ orbitId: data.id, segmentId: 'empty' }, new Vector3())).toBe(true);
    expect(visuals.getAnchor({ orbitId: 'missing' }, new Vector3())).toBe(false);
    visuals.setSelection({ orbitId: 'missing' });
    expect(visuals.selectedAnchor.visible).toBe(false);
    visuals.setData([], new Map(), new Vector3(), 60);
    visuals.update(camera(), 1);
    expect(visuals.orbitCount).toBe(0);
    expect(visuals.tetherCount).toBe(0);
    expect(visuals.pick(400, 400, camera(), 800, 800)).toBeUndefined();
    visuals.dispose();
  });

  it('disposes geometries and shared materials exactly once, safely after pause or repeated cleanup', () => {
    const visuals = new CareerOrbitVisuals();
    visuals.setData([orbit()], nodes(), new Vector3(), 60);
    const geometries = new Set<BufferGeometry>();
    const materials = new Set<import('three').Material>();
    visuals.object.traverse(item => {
      if (!(item instanceof LineSegments || item instanceof Points)) return;
      geometries.add(item.geometry);
      for (const material of Array.isArray(item.material) ? item.material : [item.material]) materials.add(material);
    });
    const disposals = [...geometries, ...materials].map(item => vi.spyOn(item, 'dispose'));
    visuals.dispose();
    visuals.dispose();
    visuals.update(camera(), 1);
    for (const dispose of disposals) expect(dispose).toHaveBeenCalledOnce();
    expect(visuals.object.children).toHaveLength(0);
    expect(visuals.tetherCount).toBe(0);
  });
});
