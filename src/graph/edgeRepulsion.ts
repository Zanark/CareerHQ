export const edgeRepulsionShader = `
  attribute vec2 aCurveT;
  uniform vec2 uCursor;
  uniform vec2 uCursorViewport;
  uniform float uCursorStrength;
  uniform float uCursorRadius;
  uniform float uCursorOffset;

  vec4 repelInterior(vec4 p, float t) {
    float attachment = 4.0 * t * (1.0 - t);
    if (attachment <= 0.0 || uCursorStrength <= 0.0 || p.z >= -0.1) return p;
    vec4 clip = projectionMatrix * p;
    vec2 delta = (clip.xy / clip.w - uCursor) * uCursorViewport * 0.5;
    float distance = length(delta);
    float falloff = 1.0 - smoothstep(0.0, uCursorRadius, distance);
    // Soften the singularity without a directional bias that could attract
    // points on the opposite side or flip an entire bend as the pointer moves.
    vec2 away = delta / max(distance, 6.0);
    vec2 pixels = away * (uCursorOffset * uCursorStrength * attachment * falloff);
    p.xy += pixels * 2.0 / uCursorViewport * clip.w
      / vec2(projectionMatrix[0][0], projectionMatrix[1][1]);
    return p;
  }
`;
