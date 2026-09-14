# CHANGELOG.md

Reconstructed from `git log` (no prior CHANGELOG existed). All dates are
2026-08-07 — this project was built and shipped in one continuous session.
Format: loosely [Keep a Changelog](https://keepachangelog.com/), without
version numbers since this project has no release/tag scheme (`git tag`
shows none). Starting with the 0.1.1 patch below, `package.json`'s
`version` field is kept in sync.

## 2026-09-14 — RGB static glitch on the hero highlight

### Changed
- "running my own apps." now uses `.glitch` (globals.css, replacing the unused
  `.gradient-text`): white text with a red/blue channel split that hard-cuts to
  red or blue while sliced red/blue copies jump sideways (steps(1), 2.4s loop,
  under 3 flashes/s). Reduced motion keeps only the still RGB split. The rest of
  the site stays monochrome; the matrix rain background is unchanged.

## 2026-09-14 — Monochrome palette, nonchalant boot intro

### Changed
- Palette is now black / white / greys only — no green, no cyan. Tokens in
  `globals.css`, matrix rain tint, boot crash flicker (red → dark greys), glitch
  fringe (cyan → grey), OG/Twitter image colours, dashboard key status dot.
- Boot intro copy rewritten in a lowercase, deadpan voice ("starting up. no
  rush.", "welp.", "oh. hey."). Line counts per phase are unchanged, so every
  phase, timing, transition and animation is exactly as before — copy only.

## 0.1.1 — 2026-08-07

### Changed
- Rebranded the on-page model name from "Yuu no Sekai" to "Yuu v1.1"
  across the landing page, `/chat`, `/projects`, the chat widget, the boot
  intro, and page metadata. Display-only: the `model` field actually sent
  to the AI platform's `/chat/completions` in `src/app/api/chat/route.ts`
  is unchanged (`"Yuu no Sekai"`), since that must match the `MODEL_NAME`
  registered in the separate `ai-platform` repo's production config — see
  `FEATURES.md` for the note on this intentional split.

## 2026-08-07

### Added
- Initial site: landing (`/`), about/résumé (`/about`), projects showcase
  (`/projects`), public chat demo (`/chat`), usage dashboard (`/dashboard`).
- Dashboard auth hardened to require an email (checked against an allowlist)
  in addition to a shared password.
- A 6-palette, light/dark theme picker and a fuller `/projects` grid.
- Real designed cover-art screenshots, replacing 5 placeholder/dead-end ones.
- Terminal-style boot-up intro animation (`BootIntro`) and Matrix-style
  canvas rain background (`MatrixRain`).
- Boot intro "crash" phase (red flicker + glitch text: "SYSTEM COMPROMISED",
  "SYSTEM FAILURE", "CONNECTION TERMINATED").
- Boot intro "flood" phase: scrolling hacker-log terminal windows.

### Changed
- Reworked the entire site from a multi-theme design to a single, fixed dark
  "hacker" theme (black background, green `--accent` / cyan `--accent-2`,
  `Share_Tech_Mono` font) — the theme picker from earlier the same day was
  removed.
- Boot intro pacing slowed; boot sequence extended.
- Boot intro flood phase expanded from 6 scattered, gapped terminal windows
  to 9 windows tiling the full screen edge-to-edge, plus a continuous
  screen-shake animation during that phase (this was the change pending as
  an uncommitted diff at the start of the 2026-08-07 documentation session;
  it's now committed — see `PROJECT_STATE.md` for a metadata anomaly noted
  around that commit).

### Unreleased / not yet in a commit
- Documentation set (this file and the other 16 canonical docs) — added in a
  separate documentation session, not yet committed as of this file being
  written (see `PROJECT_STATE.md` for exact status; committing the doc set
  is the last step of that session).

## 2026-09-05 — `/overhaul` W10 polish pass

Presentation only; no API, auth or dashboard logic touched.

- Installed the shared brand layer (`src/app/brand.css`, `src/lib/motion/tokens.ts`)
  and mapped the site's tokens onto its `--brand-*` slots. See `UI_SYSTEM.md`.
- **Matrix rain no longer competes with the copy** — green-tinted, `opacity-[0.22]`,
  a radial scrim between it and the content, and it now pauses when the tab is hidden
  instead of burning frames forever.
- Home hero: one primary CTA instead of three same-weight pills; `.meta` eyebrow with
  a live status dot; the headline got its own mono-aware clamp.
- **`Nav` became a client component with real active state** — it previously had none
  at all: no `aria-current`, no highlight for the current page. The active item now
  carries an accent rule, not colour alone, and the nav scrolls rather than wraps at
  390px.
- Project cards moved onto the brand card + 16:9 media system (reserved box, so a
  screenshot cannot shift the grid as it loads).
- OG/Twitter card redrawn in the shared family layout (accent rule, eyebrow, title,
  subtitle, domain footer) while keeping the site's green. Verified by fetching
  `/opengraph-image` from a running server (200, 45 KB PNG). The byline is omitted on
  this one card because the title already is the name.

Verified: `npx tsc --noEmit` clean · `npx eslint .` clean · `npm run build` clean.
Screenshot-checked at 1440×900 and 390×844 on `/`, `/projects`, `/about`, `/chat`,
`/dashboard` — 0 console errors, 0px horizontal overflow.
