// GARY WANG — SHARED MOTION TOKENS (v1)
// Single source of truth for motion. Components must not define inline
// durations/easings — import from here. Mirrors src/app/brand.css.

type Ease4 = [number, number, number, number];

export const SPRING = {
  /** default for UI state changes — snappy, settles fast */
  ui: { type: "spring" as const, stiffness: 300, damping: 30, mass: 0.8 },
  /** follows a pointer or a layout change */
  follow: { type: "spring" as const, stiffness: 170, damping: 26, mass: 1 },
  /** large surfaces arriving (sheets, panels) */
  settle: { type: "spring" as const, stiffness: 120, damping: 22, mass: 1 },
};

export const DUR = {
  instant: 0.12,
  fast: 0.18,
  base: 0.32,
  slow: 0.56,
} as const;

/** exits are shorter than entrances — leaving should feel decisive */
export const EXIT_RATIO = 0.65;

export const EASE = {
  out: [0.22, 1, 0.36, 1] as Ease4,
  in: [0.64, 0, 0.78, 0] as Ease4,
  inOut: [0.83, 0, 0.17, 1] as Ease4,
};

export const STAGGER = {
  tight: 0.035,
  base: 0.07,
} as const;

export const VIEWPORT_ONCE = { once: true, margin: "-15% 0px" as const };
