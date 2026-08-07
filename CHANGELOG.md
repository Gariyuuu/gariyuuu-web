# CHANGELOG.md

Reconstructed from `git log` (no prior CHANGELOG existed). All dates are
2026-08-07 — this project was built and shipped in one continuous session.
Format: loosely [Keep a Changelog](https://keepachangelog.com/), without
version numbers since this project has no release/tag scheme (`git tag`
shows none). Starting with the 0.1.1 patch below, `package.json`'s
`version` field is kept in sync.

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
