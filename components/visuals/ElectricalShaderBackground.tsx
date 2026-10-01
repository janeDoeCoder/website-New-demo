"use client";

import React, { useEffect, useRef } from "react";

export function ElectricalShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let mouseX = width * 0.5;
    let mouseY = height * 0.4;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Electrical Wave Phases matching VANNIC DYNAVION Brand Colors
    // Wave 1: Blue (#0052FF)
    // Wave 2: Cyan (#00D2FF)
    // Wave 3: Lime Green (#A6FF00)
    let time = 0;

    // Subtle Particle current nodes
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.4 + Math.random() * 0.8,
      size: 1 + Math.random() * 2,
      phaseOffset: Math.random() * Math.PI * 2,
      color:
        Math.random() > 0.65
          ? "rgba(166, 255, 0, " // Lime
          : Math.random() > 0.35
          ? "rgba(0, 210, 255, " // Cyan
          : "rgba(0, 82, 255, ", // Blue
    }));

    const render = () => {
      time += 0.012;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle interactive electrical grid lines
      const gridSize = 48;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Dynamic 3-Phase Waves
      const waves = [
        {
          color: "rgba(0, 82, 255, 0.28)",
          frequency: 0.0035,
          amplitude: 45,
          speed: 1.2,
          yOffset: height * 0.52,
          lineWidth: 2.2,
        },
        {
          color: "rgba(0, 210, 255, 0.32)",
          frequency: 0.0042,
          amplitude: 55,
          speed: 1.0,
          yOffset: height * 0.50,
          lineWidth: 2.5,
        },
        {
          color: "rgba(166, 255, 0, 0.26)",
          frequency: 0.0048,
          amplitude: 40,
          speed: 0.8,
          yOffset: height * 0.48,
          lineWidth: 2.0,
        },
      ];

      waves.forEach((wave, idx) => {
        ctx.beginPath();
        ctx.lineWidth = wave.lineWidth;
        ctx.strokeStyle = wave.color;

        for (let x = 0; x < width; x += 6) {
          // Distance from mouse for interactive ripple
          const dx = x - mouseX;
          const dist = Math.abs(dx);
          const mouseInfluence = Math.max(0, 1 - dist / 350) * 35;

          const y =
            wave.yOffset +
            Math.sin(x * wave.frequency + time * wave.speed + idx * 1.8) * wave.amplitude +
            Math.cos(x * 0.002 + time * 0.5) * 15 +
            Math.sin(dist * 0.02 - time * 3) * mouseInfluence * (mouseY / height);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Render glowing energy current particles
      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > width) p.x = 0;

        // Wave path alignment
        const waveY =
          height * 0.5 +
          Math.sin(p.x * 0.004 + time + p.phaseOffset) * 45;
        p.y += (waveY - p.y) * 0.03;

        const alpha = 0.25 + Math.sin(time * 3 + p.phaseOffset) * 0.2;

        ctx.fillStyle = `${p.color}${Math.max(0.05, alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle mouse spotlight bloom
      const radialGlow = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        320
      );
      radialGlow.addColorStop(0, "rgba(0, 210, 255, 0.06)");
      radialGlow.addColorStop(0.5, "rgba(0, 82, 255, 0.03)");
      radialGlow.addColorStop(1, "rgba(2, 4, 8, 0)");

      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
