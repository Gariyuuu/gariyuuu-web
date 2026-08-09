# PROJECT_STATE.md

Last updated: 2026-08-07, by a documentation-authoring Claude Code session.

## Where things stand

The site is **live in production** at https://gariyuuu.com (verified: `curl` to
both `/` and `/dashboard` returned `200` on 2026-08-07) and deployed on Vercel.
`git status` shows the working tree **clean** and local `main` **in sync with
`origin/main`** (no ahead/behind commits) as of this update.

All 8 commits in this repo's history are dated 2026-08-07 — this looks like a
site that was built and shipped in one continuous burst (landing → dashboard
auth hardening → theme picker → hacker-theme rework → boot intro → boot intro
polish), not an old project with a long history. See `SESSION_LOG.md` and
`CHANGELOG.md` for the reconstructed timeline.

## The 2 uncommitted changes found at the start of this session

At the start of this documentation session, `git status` showed two modified,
unstaged files:

- `src/app/globals.css`
- `src/components/boot-intro.tsx`

Diff summary: the "flood" phase of the boot-intro animation (the hacker-log
terminal windows shown mid-boot) was expanded from 6 windows with gaps between
them to **9 windows tiling the full screen**, plus a new `boot-flood-shake`
keyframe animation applied during that phase (subtle screen shake, matching the
existing crash-phase flicker). Each window's visible line buffer was also
increased from 5 to 8 lines and its layout changed from a fixed-height card to
a flex column that fills its tile.

This was **verified as finished, working code**, not a mid-work fragment:
`npm run lint` and `npx tsc --noEmit` both passed clean with the change applied.
It was staged and committed on its own (separate from the docs commit).

**Anomaly worth flagging:** the commit this session issued was authored with
the message "Expand boot-intro flood phase to 9 full-screen windows with
shake" (visible in `.git/COMMIT_EDITMSG`), but the commit that actually landed
at the tip of `main` — and which was, by the time this session next checked,
**already present on `origin/main`** (hash `3059953`) — carries a *different*
message: "Make the hacker-log flood fill the whole screen with a shake" (with
its own distinct body, also signed `Co-Authored-By: Claude Sonnet 5`). The
resulting file *contents* are correct (9 full-screen flood windows + shake,
matching this session's diff, lint/typecheck clean), but the commit metadata
doesn't match what this session issued, and `git status` reported local `main`
as already in sync with `origin/main` immediately after — with no separate
push step run by this session. This strongly suggests **another process or
session was writing to this same repo directory concurrently** (possibly
another Claude Code session working the same repo, consistent with the
multi-account workflow this doc set exists to support) and that its commit
superseded/raced this session's local one before or during the status check.
No work was lost — the intended change is committed and live on `origin/main`
— but **the user should be aware a concurrent writer touched this repo during
this session**, in case that wasn't expected.

## Documentation set added this session

Before this session, the repo had 2 of the 17 canonical docs, and both were
boilerplate: `README.md` was the unmodified `create-next-app` template, and
`CLAUDE.md` was a single line (`@AGENTS.md`, importing the auto-generated
Next.js agent-rules file — that import is preserved).

This session added real content to those 2 and created the other 15:
`TASKS.md`, `HANDOFF.md`, `SESSION_LOG.md`, `CHANGELOG.md`, `ARCHITECTURE.md`,
`FEATURES.md`, `DATABASE.md`, `SECURITY.md`, `DEPLOYMENT.md`, `TESTING.md`,
`DECISIONS.md`, `FILE_MAP.md`, `ROADMAP.md`, `UI_SYSTEM.md`, plus this file.

## Known gaps / things a future session should know

- **No automated tests.** `playwright` is a devDependency but there are no
  spec files and no Playwright config in the repo. See `TESTING.md`.
- **No login rate-limiting.** `/api/dashboard/auth` has no brute-force
  protection (no attempt counter, no lockout, no delay). See `SECURITY.md`.
- **Dashboard password is a single shared secret**, not per-user — the email
  allowlist restricts *who* can even try, but everyone who's allowed uses the
  same password. See `SECURITY.md` for whether that's an acceptable risk given
  what's behind it (read-only usage stats, no PII, no billing action).
- The prior-session memory note describing this site said it aggregates usage
  "across the owner's other 9 apps." That's accurate but slightly indirect:
  this repo doesn't call 9 separate apps — it calls **one** upstream endpoint
  (`AI_PLATFORM_ADMIN_URL` + `/admin/usage`, owned by the separate `ai-platform`
  repo), which itself tracks usage per API key. There happen to be exactly 9
  entries in `src/lib/projects.ts` with `onAiPlatform: true` (each presumably
  holding its own key on that platform), which is where "9 apps" comes from.
  See `ARCHITECTURE.md`.

## Next session should

1. Read `HANDOFF.md` in full before touching anything.
2. Run `git log --oneline -5` and `git status` immediately — this session
   observed the repo tip change unexpectedly mid-session (see the anomaly
   above), so treat "what's on `main`" as something to re-verify, not assume.
3. Push the documentation commit this session made (this session was told not
   to push — that's the user's call) once the user confirms.

## 2026-08-09 update — projects.ts sync

A later session cross-referenced `src/lib/projects.ts` against a fresh
portfolio-wide scope audit (`~/Projects/SCOPE.md`) and found it stale: 3 live
projects were missing entirely (Deckhouse, Voidshift, Edge Terminal — all
curl-verified 200 before adding) and Heart//Break Academy was still marked
`url: null` despite being live. All 4 fixed. `tsc`/`build` clean. Commit
`a27ea2b`, **not pushed** (repo rule: push is the user's call). No screenshots
exist yet for the 4 new/fixed entries — they render with the "No preview yet"
placeholder until screenshots are added.
