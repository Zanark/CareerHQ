import { Camera, Vector3 } from 'three';
import { edgeRepulsionShader } from './edgeRepulsion';

export function createRippleUniforms() {
  return {
    uRippleSourceView: { value: new Vector3() },
    uRippleFront: { value: 0 },
    uRippleBandWidth: { value: 1 },
    uRippleAmplitude: { value: 0 },
    uRippleActive: { value: 0 },
  };
}

export type CareerRippleUniforms = ReturnType<typeof createRippleUniforms>;

/** This same bounded, nonintegrating field is evaluated after every model-view transform. */
export const careerRippleVertexShader = `
  uniform vec3 uRippleSourceView;
  uniform float uRippleFront;
  uniform float uRippleBandWidth;
  uniform float uRippleAmplitude;
  uniform float uRippleActive;
  vec4 rippleView(vec4 point) {
    if (uRippleActive < 0.5 || uRippleAmplitude <= 0.0) return point;
    vec3 radial = point.xyz - uRippleSourceView;
    float distance = length(radial);
    if (distance <= 0.0001 || uRippleBandWidth <= 0.0001) return point;
    float q = abs(distance - uRippleFront) * 2.0 / uRippleBandWidth;
    if (q >= 1.0) return point;
    float shoulder = 1.0 - q * q;
    float pin = smoothstep(0.0, uRippleBandWidth * 0.5, distance);
    float offset = uRippleAmplitude * shoulder * shoulder * pin;
    return vec4(point.xyz + radial * (offset / distance), point.w);
  }
`;

export function careerEdgeVertexShader(vertexShader: string): string {
  return vertexShader
    .replace('#include <fog_pars_vertex>', `#include <fog_pars_vertex>\n${careerRippleVertexShader}\n${edgeRepulsionShader}`)
    .replace('vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );', `
      vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
      start = rippleView(start);
      end = rippleView(end);
      if (uCursorStrength > 0.0) {
        start = repelInterior(start, aCurveT.x);
        end = repelInterior(end, aCurveT.y);
      }
    `);
}

/** World-space equivalent of rippleView, including its exact support and core pin. */
export function rippleOffset(distance: number, front: number, bandWidth: number, amplitude: number, active = true): number {
  if (!active || amplitude <= 0 || distance <= 0.0001 || bandWidth <= 0.0001) return 0;
  const q = Math.abs(distance - front) * 2 / bandWidth;
  if (q >= 1) return 0;
  const shoulder = 1 - q * q;
  const t = Math.max(0, Math.min(1, distance / (bandWidth * 0.5)));
  const pin = t * t * (3 - 2 * t);
  return amplitude * shoulder * shoulder * pin;
}

export class CareerRippleField {
  readonly source = new Vector3();
  readonly uniforms = createRippleUniforms();

  get active(): boolean { return this.uniforms.uRippleActive.value > 0.5; }
  get frontRadius(): number { return this.uniforms.uRippleFront.value; }
  get bandWidth(): number { return this.uniforms.uRippleBandWidth.value; }
  get maxDisplacement(): number { return this.active ? this.uniforms.uRippleAmplitude.value : 0; }

  setWave(front: number, bandWidth: number, amplitude: number): void {
    this.uniforms.uRippleFront.value = Math.max(0, front);
    this.uniforms.uRippleBandWidth.value = Math.max(0.0001, bandWidth);
    this.uniforms.uRippleAmplitude.value = Math.max(0, amplitude);
    this.uniforms.uRippleActive.value = amplitude > 0 ? 1 : 0;
  }

  updateCamera(camera: Camera): void {
    camera.updateMatrixWorld();
    this.uniforms.uRippleSourceView.value.copy(this.source).applyMatrix4(camera.matrixWorldInverse);
  }

  deformWorld(position: Vector3, target: Vector3): Vector3 {
    const x = position.x - this.source.x, y = position.y - this.source.y, z = position.z - this.source.z;
    const distance = Math.hypot(x, y, z);
    const offset = rippleOffset(distance, this.frontRadius, this.bandWidth, this.maxDisplacement, this.active);
    target.copy(position);
    if (offset > 0) {
      const scale = offset / distance;
      target.x += x * scale;
      target.y += y * scale;
      target.z += z * scale;
    }
    return target;
  }

  cancel(): void { this.setWave(0, this.bandWidth, 0); }
}
