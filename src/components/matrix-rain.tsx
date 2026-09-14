"use client";

import { useEffect, useRef } from "react";

const FONT_SIZE = 13;

const FAST = { throttle: 1, fadeAlpha: 0.035, trailCount: 14 };
const SLOW = { throttle: 6, fadeAlpha: 0.09, trailCount: 5 };

function randomNumber() {
  return String(Math.floor(Math.random() * 100));
}

export function MatrixRain({ fast = false }: { fast?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fastRef = useRef(fast);

  useEffect(() => {
    fastRef.current = fast;
  }, [fast]);

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
    // A background animation has no reason to burn a frame budget in a tab
    // nobody is looking at.
    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(draw);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    function draw() {
      raf = requestAnimationFrame(draw);
      const settings = fastRef.current ? FAST : SLOW;
      frame++;
      if (frame % settings.throttle !== 0) return;

      ctx!.fillStyle = `rgba(0, 0, 0, ${settings.fadeAlpha})`;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.font = `${FONT_SIZE - 2}px var(--font-hacker, monospace)`;
      for (let i = 0; i < columns; i++) {
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // Kept a step below the white foreground so the rain never reads as
        // body text and competes with the hero copy.
        ctx!.fillStyle = "rgba(200, 200, 200, 0.72)";
        ctx!.fillText(randomNumber(), x, y);
        ctx!.fillStyle = "rgba(120, 120, 120, 0.20)";
        for (let t = 1; t <= settings.trailCount; t++) {
          ctx!.fillText(randomNumber(), x, y - t * FONT_SIZE);
        }

        if (y > canvas!.height && Math.random() > 0.96) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }
    }
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.22]"
      />
      {/* A scrim between the rain and the content. Without it the rain sits at
          the same visual depth as the body copy and the page fails to read in
          the first three seconds. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 30%, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </>
  );
}
