import type { Page } from '@playwright/test';
import type { CareerGraph } from '../src/graph/careerGraphModel';

export interface SpatialProjection {
  points: number[][];
  world: number[][];
  view: number[];
  projection: number[];
}

/** Read the actual work-point draw, not a second implementation of the layout or camera fit. */
export async function observeSpatialProjection(page: Page) {
  await page.addInitScript(() => {
    const observer = window as typeof window & {
      careerSpatialCapture?: boolean;
      careerSpatialDraw?: { points: number[][]; world: number[][]; view: number[]; projection: number[] };
    };
    const drawArrays = WebGL2RenderingContext.prototype.drawArrays;
    WebGL2RenderingContext.prototype.drawArrays = function(mode, first, count) {
      drawArrays.call(this, mode, first, count);
      if (!observer.careerSpatialCapture || mode !== this.POINTS || count < 2) return;
      const program = this.getParameter(this.CURRENT_PROGRAM) as WebGLProgram | null;
      if (!program || this.getAttribLocation(program, 'aKind') < 0) return;
      const position = this.getAttribLocation(program, 'position');
      if (position < 0) return;
      const viewLocation = this.getUniformLocation(program, 'modelViewMatrix');
      const projectionLocation = this.getUniformLocation(program, 'projectionMatrix');
      if (!viewLocation || !projectionLocation) return;
      const view = this.getUniform(program, viewLocation) as Float32Array | null;
      const projection = this.getUniform(program, projectionLocation) as Float32Array | null;
      if (!view || !projection) return;
      const previous = this.getParameter(this.ARRAY_BUFFER_BINDING) as WebGLBuffer | null;
      const buffer = this.getVertexAttrib(position, this.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING) as WebGLBuffer | null;
      if (!buffer) return;
      const values = new Float32Array((first + count) * 3);
      this.bindBuffer(this.ARRAY_BUFFER, buffer);
      this.getBufferSubData(this.ARRAY_BUFFER, 0, values);
      this.bindBuffer(this.ARRAY_BUFFER, previous);
      const transform = (point: number[], matrix: Float32Array) => Array.from({ length: 4 }, (_, row) =>
        point.reduce((sum, value, col) => sum + value * matrix[col * 4 + row], 0));
      const canvas = this.canvas as HTMLCanvasElement;
      const world = Array.from({ length: count }, (_, index) => Array.from(values.slice((first + index) * 3, (first + index + 1) * 3)));
      observer.careerSpatialDraw = {
        world, view: Array.from(view), projection: Array.from(projection),
        points: world.map(point => {
          const clip = transform(transform([...point, 1], view), projection);
          return [(clip[0] / clip[3] + 1) * canvas.clientWidth / 2, (1 - clip[1] / clip[3]) * canvas.clientHeight / 2];
        }),
      };
      observer.careerSpatialCapture = false;
    };
  });
}

export async function captureFittedSpatialProjection(page: Page) {
  // Finish the first fitted draw before arming: a pending pre-fit draw must
  // not satisfy a geometry assertion about the user's final Frame all view.
  await page.getByRole('button', { name: 'Frame all', exact: true }).click();
  await page.locator('.career-graph-page .career-graph-scene canvas').screenshot();
  await page.evaluate(() => {
    const observer = window as typeof window & { careerSpatialCapture?: boolean; careerSpatialDraw?: unknown };
    delete observer.careerSpatialDraw;
    observer.careerSpatialCapture = true;
  });
  await page.getByRole('button', { name: 'Frame all', exact: true }).click();
  await page.waitForFunction(() => Boolean((window as typeof window & { careerSpatialDraw?: unknown }).careerSpatialDraw));
  return page.evaluate(() => (window as typeof window & {
    careerSpatialDraw: SpatialProjection;
  }).careerSpatialDraw);
}

export function projectedSeparation(points: number[][]) {
  const nearest = points.map((a, index) => Math.min(...points.filter((_, other) => index !== other)
    .map(b => Math.hypot(a[0] - b[0], a[1] - b[1])))).sort((a, b) => a - b);
  return { p10: nearest[Math.floor(nearest.length * 0.1)], median: nearest[Math.floor(nearest.length / 2)] };
}

/** Match the actual GPU buffers to semantic identities without re-projecting them. */
export function projectedNeighborhoods(capture: SpatialProjection, graph: CareerGraph) {
  const key = (point: number[]) => point.map(Math.fround).join(',');
  const nodes = new Map(graph.nodes.map(node => [key(node.position), node]));
  const work = capture.world.map((position, index) => ({ node: nodes.get(key(position))!, point: capture.points[index] }))
    .filter(item => item.node?.kind !== 'core');
  if (work.some(item => !item.node)) throw new Error('Rendered work point has no source node identity.');
  const pointsById = new Map(work.map(item => [item.node.id, item.point]));
  let neighbors = 0, sameMission = 0, otherMissionNear = 0;
  for (const item of work) {
    if (!item.node.missionId) continue;
    const nearest = work.filter(other => other !== item)
      .map(other => ({ other, distance: Math.hypot(item.point[0] - other.point[0], item.point[1] - other.point[1]) }))
      .sort((a, b) => a.distance - b.distance).slice(0, 3);
    for (const candidate of nearest) {
      neighbors++;
      if (candidate.other.node.missionId === item.node.missionId) sameMission++;
      else if (candidate.distance < 18) otherMissionNear++;
    }
  }
  const paths = graph.edges.filter(edge => edge.kind === 'prerequisite'
    && pointsById.has(edge.source) && pointsById.has(edge.target)).map(edge => {
    const from = pointsById.get(edge.source)!, to = pointsById.get(edge.target)!;
    return Math.hypot(from[0] - to[0], from[1] - to[1]);
  }).sort((a, b) => a - b);
  return {
    sameMissionNeighbors: sameMission / neighbors,
    crossMissionNear: otherMissionNear,
    prerequisiteP75: paths[Math.floor(paths.length * 0.75)],
  };
}
