import type { Page } from '@playwright/test';

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
  await page.evaluate(() => {
    const observer = window as typeof window & { careerSpatialCapture?: boolean; careerSpatialDraw?: unknown };
    delete observer.careerSpatialDraw;
    observer.careerSpatialCapture = true;
  });
  await page.getByRole('button', { name: 'Frame all', exact: true }).click();
  await page.waitForFunction(() => Boolean((window as typeof window & { careerSpatialDraw?: unknown }).careerSpatialDraw));
  return page.evaluate(() => (window as typeof window & {
    careerSpatialDraw: { points: number[][]; world: number[][]; view: number[]; projection: number[] };
  }).careerSpatialDraw);
}

export function projectedSeparation(points: number[][]) {
  const nearest = points.map((a, index) => Math.min(...points.filter((_, other) => index !== other)
    .map(b => Math.hypot(a[0] - b[0], a[1] - b[1])))).sort((a, b) => a - b);
  return { p10: nearest[Math.floor(nearest.length * 0.1)], median: nearest[Math.floor(nearest.length / 2)] };
}
