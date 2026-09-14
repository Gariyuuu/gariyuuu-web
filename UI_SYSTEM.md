# UI_SYSTEM.md

Design system as actually implemented — read from `src/app/globals.css` and
component usage, not a separately maintained design spec (none exists).

## Theme: single fixed dark "hacker" palette

Defined as CSS custom properties in `:root` (`globals.css`), then mapped into
Tailwind v4's token system via `@theme inline`:

| Token | Value | Used for |
|---|---|---|
| `--background` | `#000000` | Page background |
| `--foreground` | `#e6e6e6` | Body text (off-white) |
| `--surface` | `#0a0a0a` | `.card` background |
| `--surface-2` | `#141414` | Hover states, secondary surfaces |
| `--border` | `#1f1f1f` | All borders |
| `--muted` | `#7a7a7a` | Secondary/muted text |
| `--accent` | `#ffffff` | Primary accent (white) |
| `--accent-2` | `#a3a3a3` | Secondary accent (grey), used in gradients |

**Monochrome since 2026-09-14** — black / white / greys only, no hue anywhere
(the owner asked for "just black, not green"). The previous palette was neon
green `#00ff8c` + cyan `#00e5ff`. The boot crash flicker is dark greys (was red)
and the dashboard key status dot is white/grey (was green/red).
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
  sparingly (e.g., the boot intro's "oh. hey." line).

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

---

## Shared brand layer (added 2026-09-05, `/overhaul` W10)

`src/app/brand.css` is the portfolio-wide craft layer shared by every personal-brand
project. It is imported **after** `design-system/master.css` and composes with it:
radius is read from MASTER's `--radius-*` ramp, motion tokens are namespaced
`--brand-dur-*` / `--brand-ease-*`, every transition enumerates its properties (G10),
and it never declares `:focus-visible` — MASTER owns the ring. It carries no hue; the
site's monochrome tokens are mapped onto the `--brand-*` slots in `globals.css`.

Provides `.meta` / `.meta-md` / `.tnum` (the mono label voice, at MASTER's 12px floor),
`.brand-card` / `.brand-card-interactive`, the `.media` photography system,
`.u-link`, `.pressable`, `.brand-rise`, `.status-dot`, `.brand-scroll`, `--elev-1/2/3`.

### The rain is atmosphere, not content

The matrix canvas used to paint near-white glyphs (`rgba(220,220,220,0.85)`) at
`opacity-50`, which put it at the same visual depth as the hero body copy — the page
did not read in the first three seconds. It is now a mid grey, one step below the foreground,
runs at `opacity-[0.22]`, sits under a radial scrim at `z-[1]`, and pauses on
`visibilitychange`. Do not raise it back.

### Hero rule

One primary CTA. `/` previously offered three same-weight pill buttons; the chat demo
is now the only button and the other two are `.u-link` text links.

**`.brand-hero-title`'s clamp is not used here.** It is sized for a proportional
display face, and this site sets everything in Share Tech Mono, which is much wider —
the home `h1` uses its own `clamp(2rem, 4.2vw, 3.5rem)` instead.
