"use client";

import * as React from "react";

export interface ShaderMountProps {
  fragmentShader: string;
  uniforms: Record<string, number | number[]>;
  speed?: number;
  width: number;
  height: number;
}

const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export function ShaderMount({
  fragmentShader,
  uniforms,
  speed = 1,
  width,
  height,
}: ShaderMountProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const uniformsRef = React.useRef(uniforms);
  const speedRef = React.useRef(speed);

  React.useEffect(() => {
    uniformsRef.current = uniforms;
    speedRef.current = speed;
  }, [uniforms, speed]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { alpha: true, antialias: false }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      console.warn("[ShaderMount] WebGL not supported on this device/browser.");
      return;
    }

    // Helper: compile shader
    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error("[ShaderMount] Shader compilation error:", glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);

    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[ShaderMount] Program linking error:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    // Full-screen quad coordinates
    const quadVertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Cache uniform locations
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resLocation = gl.getUniformLocation(program, "u_resolution");

    let animationFrameId: number;
    const startTime = performance.now();

    const render = (now: number) => {
      const elapsedTime = ((now - startTime) / 1000) * speedRef.current;

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      if (timeLocation) {
        gl.uniform1f(timeLocation, elapsedTime);
      }
      if (resLocation) {
        gl.uniform2f(resLocation, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }

      // Apply dynamic uniforms
      const currentUniforms = uniformsRef.current;
      for (const [name, val] of Object.entries(currentUniforms)) {
        const loc = gl.getUniformLocation(program, name);
        if (!loc) continue;

        if (typeof val === "number") {
          gl.uniform1f(loc, val);
        } else if (Array.isArray(val)) {
          if (val.length === 2) gl.uniform2f(loc, val[0], val[1]);
          else if (val.length === 3) gl.uniform3f(loc, val[0], val[1], val[2]);
          else if (val.length === 4) gl.uniform4f(loc, val[0], val[1], val[2], val[3]);
        }
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (vertShader) gl.deleteShader(vertShader);
      if (fragShader) gl.deleteShader(fragShader);
      if (program) gl.deleteProgram(program);
    };
  }, [fragmentShader, width, height]);

  // Adjust for high-DPI displays after mount to prevent hydration mismatch
  const [dpr, setDpr] = React.useState(1);
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDpr(Math.min(window.devicePixelRatio || 1, 2));
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width * dpr}
      height={height * dpr}
      style={{
        width,
        height,
        display: "block",
      }}
    />
  );
}
