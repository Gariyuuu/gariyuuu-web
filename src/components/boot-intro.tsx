"use client";

import { useEffect, useState } from "react";

const LINES = [
  "GARIYUUU.COM",
  "SITE INITIALIZING...",
  "LOADING MODULES: AI GATEWAY, PROJECTS, CHAT, DASHBOARD...",
  "ESTABLISHING CONNECTION TO YUU NO SEKAI...",
  "MOUNTING ASSETS...",
  "ACCESS GRANTED.",
];

export function BootIntro() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Skip the animation entirely for users who've asked for reduced motion.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHidden(true);
      return;
    }
    function skip() {
      setVisibleLines(LINES.length);
    }
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, []);

  useEffect(() => {
    if (hidden) return;
    if (visibleLines >= LINES.length) {
      const t = setTimeout(() => setFading(true), 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 220);
    return () => clearTimeout(t);
  }, [visibleLines, hidden]);

  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => setHidden(true), 500);
    return () => clearTimeout(t);
  }, [fading]);

  if (hidden) return null;

  return (
    <div
      className={
        "fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-background px-6 transition-opacity duration-500 " +
        (fading ? "pointer-events-none opacity-0" : "opacity-100")
      }
    >
      <div className="w-full max-w-md text-xs sm:text-sm">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <p key={i} className="mb-1 tracking-wide text-foreground/90">
            <span className="text-accent">&gt;</span> {line}
          </p>
        ))}
        {visibleLines < LINES.length && (
          <span className="inline-block h-3 w-2 animate-pulse bg-accent align-middle" />
        )}
      </div>
      <p className="mt-10 text-[10px] uppercase tracking-widest text-muted">
        click / press any key to skip
      </p>
    </div>
  );
}
