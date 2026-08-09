# TASKS.md

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

## Completed (reconstructed from git log, pre-dating this session)

See `SESSION_LOG.md` and `CHANGELOG.md` for the full reconstructed history —
summary: initial site → dashboard email-allowlist hardening → 6-palette theme
picker + full projects showcase → real screenshots → full rework to a single
dark hacker theme → boot-up terminal intro animation → intro pacing/crash
screen → intro flood-phase visual polish (the change committed this session).
