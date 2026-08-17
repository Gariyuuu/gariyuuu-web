# TASKS.md

## Current task

**T-001** (blocked: needs user confirmation) — decide the fate of branch
`chore/polish` (1 commit ahead of `main`: `f1643ee`, ThinkingOrb loading
indicator + new `thinking-orbs` dependency). It's not merged to `main` and
therefore not deployed. `[Needs confirmation]` whether to merge, keep
iterating, or abandon. See `PROJECT_STATE.md`'s 2026-08-17 update.

## In progress

- None known. Working tree was clean at the end of this session (after
  committing the pending boot-intro change and this documentation set).

## Queued / not started

Nothing is formally queued in-repo. Candidates inferred from `PROJECT_STATE.md`
gaps and `ROADMAP.md` — confirm with the user before treating any of these as
actual priorities:

- [ ] Decide on and add automated tests (`playwright` is already a
  devDependency but unused — no config, no spec files). See `TESTING.md`.
- [ ] Consider rate-limiting / lockout on `/api/dashboard/auth` (currently
  unlimited login attempts against a single shared password). See
  `SECURITY.md`.
- [ ] `daily-brief`'s URL in `src/lib/projects.ts` is a Vercel preview-deploy
  URL (`daily-brief-70cu7npew-garywangsmes-8349s-projects.vercel.app`), not a
  clean production domain like the other entries — worth confirming that's
  intentional/still live, or swapping for a stable URL if one exists.
- [ ] `phone-watchdog-web` has no screenshot (password-protected, documented
  inline in `projects.ts`) — acceptable as-is, just noting it's not an
  oversight.
- [ ] Tell the user: QuantDesk's own `README.md` claims it's live at
  `quantdesk-eta.vercel.app`, but that URL returns a real Vercel 404 on
  curl (not an auth redirect) — listed as `url: null` in `projects.ts`
  rather than trusted. Either the QuantDesk deploy needs fixing or its
  README needs correcting.
- [ ] Tell the user: `bite-map.vercel.app`, `helm.vercel.app`, and
  `project-messenger.vercel.app` are all name-collisions with unrelated
  third-party sites, not Gary's projects, despite returning HTTP 200 with
  plausible-looking titles. The real production URLs used in `projects.ts`
  are `bite-map-lyart.vercel.app`, `helm-lovat-theta.vercel.app`, and
  `project-messenger-gamma.vercel.app` (confirmed via `vercel project ls`
  + full-body diff). Worth knowing in case any external links/bookmarks
  point at the wrong vanity domain.

## Completed (this session — 2026-08-07, documentation session)

- [x] Read and understood the 2 pre-existing uncommitted changes
  (`src/app/globals.css`, `src/components/boot-intro.tsx`).
- [x] Verified the dashboard auth mechanism by reading the actual code
  (`src/lib/dashboard-auth.ts` and the three `api/dashboard/*` routes), not
  by trusting prior notes.
- [x] Verified `.env.local` is gitignored and has never been committed
  (`git log --all -- .env.local` is empty); `.env.example` holds only empty
  placeholders.
- [x] Ran `npm run lint` and `npx tsc --noEmit` clean before committing the
  pending code change.
- [x] Committed the pending boot-intro/globals.css change on its own (see
  `PROJECT_STATE.md` for an anomaly around how that commit's metadata ended
  up different from what was issued — worth the user's attention).
- [x] Created all 17 canonical docs (2 existed as boilerplate, 15 were
  missing).
- [x] Verified `gariyuuu.com` and `gariyuuu.com/dashboard` both return live
  `200` responses.

## Completed (2026-08-09 session)

- [x] Cross-checked `src/lib/projects.ts` against `~/Projects/SCOPE.md` and
  added 3 missing live projects (Deckhouse, Voidshift, Edge Terminal),
  curl-verifying each URL returns 200 first.
- [x] Fixed Heart//Break Academy, which was listed unreleased (`url: null`)
  despite being live at heartbreak-academy.vercel.app.
- [x] Ran `tsc --noEmit` and `npm run build` clean; committed locally
  (`a27ea2b`), did not push.

## Completed (2026-08-13 session)

- [x] Cross-checked `src/lib/projects.ts` against a fresh
  `~/Projects/PROJECTS_INVENTORY.md` (19 new folders since the 2026-08-09
  sync) and investigated all 19 for a live, working URL.
- [x] Added 13 verified-live entries and 4 in-progress (`url: null`)
  entries; skipped `edge-terminal` (already present) and
  `session-os-landing` (folded into the `session-os` entry).
- [x] Caught 3 wrong vanity-domain guesses (bite-map/helm/project-messenger
  `.vercel.app`) by diffing full page bodies against `vercel project ls`'s
  real production URLs, rather than trusting a matching HTTP 200 + title.
- [x] Caught QuantDesk's own README overclaiming a live URL that 404s on
  curl; listed `url: null` instead of trusting the doc.
- [x] Ran `npx tsc --noEmit` and `npm run lint` clean; committed locally
  (`f411695`), did not push.

## Completed (2026-08-14 session)

- [x] Captured and wired in screenshots for all 17 `projects.ts` entries
  that were missing them (AtlasYuu, Bite Map, ChatCut, Yuu Jarvis,
  Deckhouse, Voidshift, Edge Terminal, Heart//Break Academy, Application
  HQ, Project Library, Helm, Latticework, MacMine Lab, Messenger, World
  Monitor, Yuuki, Session OS). `phone-watchdog-web` deliberately left
  `screenshot: null` (password-protected, unchanged).
- [x] Two captures (atlasyuu, complete-shelf-demo) needed a one-off
  Playwright `.mjs` script with `waitUntil: "networkidle"` + a 5s explicit
  wait — the CLI's default wait wasn't enough to clear an intro
  overlay/animation. Every PNG visually inspected before wiring in.
- [x] Added `localOnly?: boolean` to the `Project` interface and set it on
  `friday`, `sports-betting-project`, and `kinetic` — verified each is
  complete/working but architecturally local-only via that project's own
  docs (DEPLOYMENT.md x2, CURRENT_STATE.md). Moved all 3 into a new
  "Complete, but local-only" section.
- [x] Updated `project-card.tsx` to render "Local app — no public demo" for
  `localOnly` entries instead of the misleading "Not deployed yet".
  `project-tally`, `project-lemon`, `red-light-chamber`, and `quantdesk`
  deliberately left untouched (genuinely unfinished/broken, not local-only).
- [x] Ran `npx tsc --noEmit`, `npm run lint`, `npm run build` clean before
  each of 2 commits: `6988b73` (screenshots), `61f26ff` (local-only
  schema + labeling). Not pushed — user's call.

## Completed (reconstructed from git log, pre-dating this session)

See `SESSION_LOG.md` and `CHANGELOG.md` for the full reconstructed history —
summary: initial site → dashboard email-allowlist hardening → 6-palette theme
picker + full projects showcase → real screenshots → full rework to a single
dark hacker theme → boot-up terminal intro animation → intro pacing/crash
screen → intro flood-phase visual polish (the change committed this session).
