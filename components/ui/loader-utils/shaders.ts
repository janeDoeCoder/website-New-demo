/**
 * GLSL Shaders and Color Utilities for Shader Loader Component
 */

export function hexToRgba(colorStr: string): [number, number, number, number] {
  if (typeof window === "undefined" || !colorStr) {
    return [0, 0.7, 1, 1];
  }

  // Handle transparent
  if (colorStr === "transparent") {
    return [0, 0, 0, 0];
  }

  // Resolve CSS variable if passed (e.g., var(--primary))
  let resolved = colorStr.trim();
  if (resolved.startsWith("var(")) {
    const varName = resolved.replace(/^var\(\s*|\s*\)$/g, "").split(",")[0].trim();
    const computed = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    if (computed) {
      resolved = computed;
    }
  }

  // RGB/RGBA format: rgb(0, 179, 255) or rgba(0, 179, 255, 0.5)
  const rgbaMatch = resolved.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10) / 255;
    const g = parseInt(rgbaMatch[2], 10) / 255;
    const b = parseInt(rgbaMatch[3], 10) / 255;
    const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1.0;
    return [r, g, b, a];
  }

  // Hex format: #rgb, #rgba, #rrggbb, #rrggbbaa
  let hex = resolved.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("") + "ff";
  } else if (hex.length === 4) {
    hex = hex.split("").map((c) => c + c).join("");
  } else if (hex.length === 6) {
    hex += "ff";
  }

  if (hex.length === 8) {
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;
    const a = parseInt(hex.slice(6, 8), 16) / 255;
    return [
      Number.isNaN(r) ? 0 : r,
      Number.isNaN(g) ? 0.7 : g,
      Number.isNaN(b) ? 1 : b,
      Number.isNaN(a) ? 1 : a,
    ];
  }

  return [0, 0.7, 1, 1];
}

const COMMON_SHADER_HEAD = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform float u_shape; // 1 = sphere, 2 = swirl, 3 = ripple
uniform float u_scale;
uniform float u_pxSize;

// Common shape intensity evaluator returning 0.0 to 1.0
float evaluateShape(vec2 uv) {
  float len = length(uv);
  float angle = atan(uv.y, uv.x);
  
  if (u_shape < 1.5) {
    // 1: Sphere - rotating 3D illumination sphere
    if (len > 0.48) return 0.0;
    vec3 normal = vec3(uv / 0.48, sqrt(max(0.0, 1.0 - dot(uv / 0.48, uv / 0.48))));
    vec3 lightDir = normalize(vec3(cos(u_time * 2.2), sin(u_time * 2.2), 0.8));
    float diff = max(0.0, dot(normal, lightDir));
    float rim = pow(1.0 - normal.z, 2.5) * 0.7;
    return clamp(diff + rim, 0.0, 1.0);
  } else if (u_shape < 2.5) {
    // 2: Swirl - rotating organic spiral vortex
    float arms = 3.0;
    float spiral = sin(angle * arms + len * 16.0 - u_time * 3.5);
    float falloff = smoothstep(0.48, 0.08, len);
    return clamp((spiral * 0.5 + 0.5) * falloff, 0.0, 1.0);
  } else {
    // 3: Ripple - expanding concentric sonar waves
    float rings = sin(len * 28.0 - u_time * 5.0);
    float falloff = smoothstep(0.48, 0.05, len);
    return clamp((rings * 0.5 + 0.5) * falloff, 0.0, 1.0);
  }
}
`;

/**
 * Plain (Solid / Crisp) Fragment Shader
 */
export const plainFragmentShader = `
${COMMON_SHADER_HEAD}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float raw = evaluateShape(uv);
  float mask = smoothstep(0.45, 0.55, raw);
  gl_FragColor = mix(u_colorBack, u_colorFront, mask);
}
`;

/**
 * Blur (Soft glow / Gaussian gradient) Fragment Shader
 */
export const blurFragmentShader = `
${COMMON_SHADER_HEAD}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float intensity = evaluateShape(uv);
  float glow = smoothstep(0.05, 0.95, intensity);
  gl_FragColor = mix(u_colorBack, u_colorFront, glow);
}
`;

/**
 * Dither (Pixelated retro Bayer matrix) Fragment Shader
 */
export const ditherFragmentShader = `
${COMMON_SHADER_HEAD}

// 4x4 Bayer Matrix
float bayerMatrix(vec2 p) {
  int x = int(mod(p.x, 4.0));
  int y = int(mod(p.y, 4.0));
  int index = x + y * 4;
  
  if (index == 0) return 0.0 / 16.0;
  if (index == 1) return 8.0 / 16.0;
  if (index == 2) return 2.0 / 16.0;
  if (index == 3) return 10.0 / 16.0;
  if (index == 4) return 12.0 / 16.0;
  if (index == 5) return 4.0 / 16.0;
  if (index == 6) return 14.0 / 16.0;
  if (index == 7) return 6.0 / 16.0;
  if (index == 8) return 3.0 / 16.0;
  if (index == 9) return 11.0 / 16.0;
  if (index == 10) return 1.0 / 16.0;
  if (index == 11) return 9.0 / 16.0;
  if (index == 12) return 15.0 / 16.0;
  if (index == 13) return 7.0 / 16.0;
  if (index == 14) return 13.0 / 16.0;
  return 5.0 / 16.0;
}

void main() {
  vec2 pixelCoord = floor(gl_FragCoord.xy / max(1.0, u_pxSize));
  vec2 uv = (pixelCoord * u_pxSize - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  
  float val = evaluateShape(uv);
  float threshold = bayerMatrix(pixelCoord);
  float dithered = step(threshold, val);
  
  gl_FragColor = mix(u_colorBack, u_colorFront, dithered);
}
`;
