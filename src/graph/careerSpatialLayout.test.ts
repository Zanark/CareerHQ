import { Box3, PerspectiveCamera, Sphere, Vector3 } from 'three';
import { describe, expect, it } from 'vitest';
import { createInitialState } from '../domain/engine';
import { buildCareerGraph, type CareerGraph } from './careerGraphModel';
import { spaceCareerGraph } from './careerNodeSpacing';
import { careerOrbitFrameRadius, CAREER_ORBIT_PLANES } from './careerOrbitMotion';

function measure(graph: CareerGraph, legacy = false) {
  const box = new Box3();
  const point = new Vector3();
  for (const node of graph.nodes) box.expandByPoint(point.fromArray(node.position));
  const bounds = new Sphere(box.getCenter(new Vector3()), 35);
  if (!legacy) bounds.center.fromArray(graph.nodes.find(node => node.kind === 'core')!.position);
  for (const node of graph.nodes) bounds.radius = Math.max(bounds.radius, point.fromArray(node.position).distanceTo(bounds.center));
  const camera = new PerspectiveCamera(46, 1.3, 0.1, 3000);
  const distance = (legacy ? bounds.radius * 1.32 : careerOrbitFrameRadius(bounds.radius)) / Math.sin(23 * Math.PI / 180);
  camera.position.copy(new Vector3(0.58, 0.32, 1).normalize()).multiplyScalar(distance).add(bounds.center);
  camera.lookAt(bounds.center);
  camera.updateMatrixWorld();
  const points = graph.nodes.filter(node => node.kind !== 'core').map(node => point.fromArray(node.position).project(camera).clone());
  const nearest = points.map((a, index) => Math.min(...points.filter((_, other) => index !== other).map(b => Math.hypot((a.x - b.x) * 520, (a.y - b.y) * 400)))).sort((a, b) => a - b);
  const core = graph.nodes.find(node => node.kind === 'core')!;
  const projectedCore = point.fromArray(core.position).project(camera);
  const worldPoints = graph.nodes.filter(node => node.kind !== 'core').map(node => new Vector3().fromArray(node.position));
  const nearestWorld = worldPoints.map((a, index) => Math.min(...worldPoints.filter((_, other) => index !== other).map(b => a.distanceTo(b)))).sort((a, b) => a - b);
  const nonCore = graph.nodes.filter(node => node.kind !== 'core');
  const peers = nonCore.map((node, index) => points.map((point, other) => ({
    distance: Math.hypot(point.x - points[index].x, point.y - points[index].y), mission: nonCore[other].missionId, other,
  })).filter(item => item.other !== index).sort((a, b) => a.distance - b.distance).slice(0, 3)
    .filter(item => item.mission === node.missionId).length / 3);
  const lookup = new Map(graph.nodes.map(node => [node.id, new Vector3().fromArray(node.position).project(camera)]));
  const paths = graph.edges.filter(edge => edge.kind === 'prerequisite').map(edge => {
    const from = lookup.get(edge.source)!, to = lookup.get(edge.target)!;
    return Math.hypot((from.x - to.x) * 520, (from.y - to.y) * 400);
  }).sort((a, b) => a - b);
  return {
    p10: nearest[Math.floor(nearest.length * 0.1)], median: nearest[Math.floor(nearest.length * 0.5)],
    crowded: nearest.filter(value => value < 6).length / nearest.length,
    extent: bounds.radius,
    minimumRingGap: bounds.radius * ((legacy ? 1.06 : CAREER_ORBIT_PLANES[0].radius) - 1),
    projectedCoreClearance: Math.min(...points.map(node => Math.hypot((node.x - projectedCore.x) * 520, (node.y - projectedCore.y) * 400))),
    worldMedian: nearestWorld[Math.floor(nearestWorld.length * 0.5)],
    coreClearance: Math.min(...graph.nodes.filter(node => node.kind !== 'core').map(node => Math.hypot(...node.position.map((value, axis) => value - core.position[axis])))),
    neighborhoodPurity: peers.reduce((sum, value) => sum + value, 0) / peers.length,
    prerequisiteP75: paths[Math.floor(paths.length * 0.75)],
  };
}

describe('fitted spatial decluttering, not uniform enlargement', () => {
  it.each(['3.0.0', '2.0.0'] as const)('unmixes mission neighborhoods and untangles real paths for saved v%s after fitting', version => {
    const state = createInitialState(false, version);
    state.plans = {};
    const graph = buildCareerGraph(state);
    const legacy = measure(graph, true);
    const readings = [100, 200, 300].map(spacing => measure(spaceCareerGraph(graph, spacing)));
    if (process.env.CAREERHQ_LAYOUT_METRICS) console.table([legacy, ...readings]);
    expect(readings[0].p10).toBeGreaterThan(legacy.p10 * 2);
    expect(readings[0].median).toBeGreaterThan(legacy.median * 1.1);
    expect(readings[0].crowded).toBeLessThan(legacy.crowded * 0.1);
    expect(readings[0].coreClearance).toBeGreaterThan(legacy.coreClearance * 1.4);
    expect(readings[0].minimumRingGap).toBeGreaterThan(legacy.minimumRingGap * 5);
    expect(readings[0].projectedCoreClearance).toBeGreaterThan(legacy.projectedCoreClearance * 2);
    for (let index = 1; index < readings.length; index++) {
      expect(readings[index].p10).toBeGreaterThan(readings[0].p10 * 1.05);
      expect(readings[index].median).toBeGreaterThan(readings[0].median * 1.15);
      expect(readings[index].crowded).toBeLessThanOrEqual(readings[0].crowded);
      expect(readings[index].neighborhoodPurity).toBeGreaterThan(0.98);
      expect(readings[index].neighborhoodPurity - readings[0].neighborhoodPurity).toBeGreaterThan(0.25);
      expect(readings[index].prerequisiteP75).toBeLessThan(readings[0].prerequisiteP75 * 0.25);
      expect(readings[index].extent / readings[0].extent).toBeGreaterThan(0.9);
      expect(readings[index].extent / readings[0].extent).toBeLessThan(1.4);
    }
    const maximum = spaceCareerGraph(graph, 300);
    const depths = maximum.nodes.map(node => new Vector3().fromArray(node.position).dot(new Vector3(0.58, 0.32, 1).normalize()));
    expect(Math.max(...depths) - Math.min(...depths)).toBeGreaterThan(80);
  });
});
