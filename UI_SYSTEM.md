# UI_SYSTEM.md

Design system as actually implemented — read from `src/app/globals.css` and
component usage, not a separately maintained design spec (none exists).

## Theme: single fixed dark "hacker" palette

Defined as CSS custom properties in `:root` (`globals.css`), then mapped into
Tailwind v4's token system via `@theme inline`:

| Token | Value | Used for |
|---|---|---|
| `--background` | `#000000` | Page background |
| `--foreground` | `#d7f5df` | Body text (pale green-white) |
| `--surface` | `#060a07` | `.card` background |
| `--surface-2` | `#0d140f` | Hover states, secondary surfaces |
| `--border` | `#16241a` | All borders |
| `--muted` | `#5f7a68` | Secondary/muted text |
| `--accent` | `#00ff8c` | Primary accent (green) |
| `--accent-2` | `#00e5ff` | Secondary accent (cyan), used in gradients |
| `--accent-fg` | `#000000` | Text on top of accent-colored surfaces |

**There is no light theme and no theme switcher in the current code.** An
earlier version of the site had a 6-palette × light/dark picker (commit
`40635cf`); it was deliberately removed the same day (commit `0d61741`) in
favor of this single theme. See `DECISIONS.md`. Don't reintroduce
theme-switching without confirming it's wanted — it reads as a deliberate
simplification, not a gap.

## Typography

Single font family for everything: `Share_Tech_Mono` (Google Font, monospace,
weight 400 only), loaded in `layout.tsx` and aliased to both
`--font-sans` and `--font-mono` in `globals.css` — i.e., **the whole site is
monospace**, reinforcing the terminal/hacker aesthetic. No secondary
typeface.

## Reusable utility classes (hand-written, in `globals.css`)

- `.card` — surface background, border, `0.5rem` radius. The base container
  used everywhere (project cards, dashboard stat tiles, the chat widget,
  form containers).
- `.gradient-text` — `linear-gradient(90deg, accent, accent-2)` clipped to
  text. Used for the landing-page headline emphasis.
- `.neon` — text-shadow glow effect (double-layered, accent-colored). Used
  sparingly (e.g., the boot intro's "WELCOME BACK, GARY." line).

Everything else is inline Tailwind utility classes — there's no component
library (no shadcn/Radix/etc. in `package.json`).

## Motion

- Three custom keyframe animations, all in `globals.css`:
  `boot-crash-flicker` (red flicker + jitter, crash phase), `boot-flood-shake`
  (subtle continuous shake, flood phase — added in the change this
  documentation session found pending and committed), `boot-glitch-shake`
  (RGB-split text glitch, crash-phase headline text).
- Both `MatrixRain` and `BootIntro` explicitly check
  `window.matchMedia("(prefers-reduced-motion: reduce)")` and disable/skip
  themselves accordingly — **this is the one accessibility affordance
  built into the motion-heavy parts of the site; preserve it in any future
  change.**
- Standard Tailwind transition utilities (`transition-colors`,
  `transition-opacity`, `duration-*`) are used throughout for hover states
  and the boot-intro fade-out — no custom easing beyond Tailwind defaults.

## Layout conventions

- Content is consistently constrained with `mx-auto max-w-{3xl,4xl,5xl}
  px-6`, sized per page (narrower for prose-heavy pages like `/about` and
  `/dashboard`, wider for grids like `/` and `/projects`).
- Section rhythm: `border-t border-border py-{10,16,24}` between major
  sections on longer pages (`/`, `/about`).
- Cards in grids use `grid gap-{4,5} sm:grid-cols-{2,3}`.

## Iconography / imagery

No icon library — the few UI dots/indicators (status dots, nav pulse dot)
are plain styled `<span>`s, not an icon font/SVG set. Screenshots and the
about-page photo are the only raster imagery, served via `next/image` from
`/public`.
