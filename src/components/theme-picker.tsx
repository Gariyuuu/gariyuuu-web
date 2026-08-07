"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_PALETTE,
  MODE_STORAGE_KEY,
  PALETTES,
  PALETTE_STORAGE_KEY,
  type Mode,
} from "@/lib/theme";

function resolveMode(mode: Mode): "light" | "dark" {
  if (mode === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return mode;
}

function apply(mode: Mode, palette: string) {
  document.documentElement.setAttribute("data-theme", resolveMode(mode));
  document.documentElement.setAttribute("data-palette", palette);
}

function readStoredMode(): Mode {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem(MODE_STORAGE_KEY) as Mode | null) ?? "system";
}

function readStoredPalette(): string {
  if (typeof window === "undefined") return DEFAULT_PALETTE;
  return localStorage.getItem(PALETTE_STORAGE_KEY) ?? DEFAULT_PALETTE;
}

export function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(readStoredMode);
  const [palette, setPalette] = useState<string>(readStoredPalette);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function selectMode(next: Mode) {
    setMode(next);
    localStorage.setItem(MODE_STORAGE_KEY, next);
    apply(next, palette);
  }

  function selectPalette(next: string) {
    setPalette(next);
    localStorage.setItem(PALETTE_STORAGE_KEY, next);
    apply(mode, next);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Theme settings"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
      >
        <span
          className="h-3.5 w-3.5 rounded-full"
          style={{ background: `linear-gradient(135deg, var(--accent), var(--accent-2))` }}
        />
      </button>
      {open && (
        <div className="card absolute right-0 top-10 z-30 w-56 p-4 shadow-lg">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Mode</p>
          <div className="mb-4 grid grid-cols-3 gap-1">
            {(["light", "dark", "system"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => selectMode(m)}
                className={
                  "rounded-md px-2 py-1 text-xs capitalize transition-colors " +
                  (mode === m
                    ? "bg-gradient-to-r from-accent to-accent-2 text-accent-fg"
                    : "border border-border text-muted hover:bg-surface-2")
                }
              >
                {m}
              </button>
            ))}
          </div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Palette</p>
          <div className="grid grid-cols-6 gap-2">
            {PALETTES.map((p) => (
              <button
                key={p.id}
                onClick={() => selectPalette(p.id)}
                aria-label={p.label}
                title={p.label}
                className={
                  "h-6 w-6 rounded-full transition-transform hover:scale-110 " +
                  (palette === p.id ? "ring-2 ring-offset-2 ring-offset-surface ring-accent" : "")
                }
                style={{ background: p.swatch }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
