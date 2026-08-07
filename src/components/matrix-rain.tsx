"use client";

import { useEffect, useRef } from "react";

const FONT_SIZE = 20;

function randomNumber() {
  return String(Math.floor(Math.random() * 100));
}

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
      if (frame % 4 !== 0) return; // slow the fall rate

      ctx!.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.font = `${FONT_SIZE - 4}px var(--font-hacker, monospace)`;
      for (let i = 0; i < columns; i++) {
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        ctx!.fillStyle = "rgba(210, 210, 210, 0.75)";
        ctx!.fillText(randomNumber(), x, y);
        ctx!.fillStyle = "rgba(120, 120, 120, 0.12)";
        for (let t = 1; t <= 6; t++) {
          ctx!.fillText(randomNumber(), x, y - t * FONT_SIZE);
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
