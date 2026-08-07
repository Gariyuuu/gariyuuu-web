"use client";

import { useEffect, useRef } from "react";

const CHARS = "0123456789";
const FONT_SIZE = 16;

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let columns = 0;
    let drops: number[] = [];

    function resize() {
      const c = canvas!;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      columns = Math.floor(c.width / FONT_SIZE);
      drops = new Array(columns).fill(0).map(() => Math.floor((Math.random() * c.height) / FONT_SIZE));
    }
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let raf = 0;
    function draw() {
      raf = requestAnimationFrame(draw);
      frame++;
      if (frame % 2 !== 0) return; // slow the fall rate

      ctx!.fillStyle = "rgba(0, 0, 0, 0.07)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.font = `${FONT_SIZE}px var(--font-hacker, monospace)`;
      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        ctx!.fillStyle = "rgba(0, 255, 140, 0.85)";
        ctx!.fillText(char, x, y);
        ctx!.fillStyle = "rgba(0, 255, 140, 0.13)";
        for (let t = 1; t <= 6; t++) {
          ctx!.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - t * FONT_SIZE);
        }

        if (y > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }
    }
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-40"
    />
  );
}
