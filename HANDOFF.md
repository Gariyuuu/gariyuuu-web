# HANDOFF.md — start here

This is **gariyuuu.com**, Gary Wang's personal site, **live in production**.
Landing page + real résumé + a public rate-limited AI chat demo + a
password-gated dashboard showing live usage stats from Gary's self-hosted AI
platform. Verified live (`200`) on both `/` and `/dashboard` as of
2026-08-07.

## Read in this order

1. **This file**, fully.
2. `PROJECT_STATE.md` — exact current stopping point, including anything
   left mid-work and any anomalies from the last session.
3. `CLAUDE.md` — operating rules and conventions. Non-negotiable stuff lives
   here (don't push without being asked, never commit secrets, respect
   `prefers-reduced-motion`, etc.).
4. `TASKS.md` — what's queued.
5. Whatever doc is relevant to the specific thing you're about to touch:
   `ARCHITECTURE.md` (how the dashboard talks to the AI platform),
   `SECURITY.md` (exactly how the dashboard gate works and its known gaps),
   `UI_SYSTEM.md` (the design system, single dark theme, no picker),
   `FILE_MAP.md` (where things live).

## The most important things to internalize fast

- **This is production, not a sandbox.** Real users can hit `/chat` and
  `/dashboard` right now. Don't `git push` unless the user asks — they treat
  deploys as their own call.
- **The dashboard gate is real but has known gaps**: email allowlist +
  one shared password + a genuinely signed session cookie, but **no
  login-attempt rate limiting**. Read `SECURITY.md` before assuming it's
  either "totally fine" or "totally broken" — it's neither.
- **The dashboard doesn't call each of the other apps directly.** It calls
  one endpoint on a separate project (`~/Projects/ai-platform`,
  `api.gariyuuu.com/admin/usage`), which does the real aggregation. See
  `ARCHITECTURE.md` if this matters to what you're doing.
- **There's no database.** Everything is either a hardcoded source file
  (`src/lib/projects.ts`, the `/about` bio) or fetched live from the AI
  platform on each request.
- **The theme is a single fixed dark palette.** If you see old notes
  mentioning a "theme picker," that existed for one commit and was removed
  the same day — don't reintroduce it without checking with the user first.
- **No automated tests exist** (`playwright` is installed but unused — no
  config, no spec files). Verification today is manual: `npm run lint`,
  `npx tsc --noEmit`, and reading/curling.
- **Never write real secret values into any file, doc or code.** Only
  variable names, in `.env.example` style placeholders. See `SECURITY.md`
  for the full list of what each secret gates.

## Before you end your session

Update `PROJECT_STATE.md` (new stopping point), `TASKS.md` (move anything
you finished, add anything new), and append an entry to `SESSION_LOG.md`
(what you did, dated). This repo is picked up cold by different Claude Code
accounts/sessions with **no shared chat history** — these docs are the only
thing that survives between sessions. If you don't update them, the next
session starts blind.

---

## Prompt for the next Claude Code account

Copy-paste this to start the next session:

```
This is ~/Projects/gariyuuu-web — Gary Wang's personal site, LIVE IN
PRODUCTION at https://gariyuuu.com (landing + real résumé/about page +
public rate-limited AI chat demo + a password-gated dashboard showing live
usage across his other apps via a self-hosted AI platform).

Before doing anything else:
1. Read HANDOFF.md (this doc's parent), then PROJECT_STATE.md, then
   CLAUDE.md, in that order.
2. Run `git status` and `git log --oneline -5` and reconcile them against
   what PROJECT_STATE.md claims — a prior session observed the repo tip
   change unexpectedly mid-session (possible concurrent writer on this same
   repo path), so don't assume the docs are perfectly in sync with reality
   until you've checked.
3. Verify gariyuuu.com and gariyuuu.com/dashboard both still return 200
   before assuming production is healthy.
4. This is a production site — do not `git push` or trigger a deploy
   without the user's explicit go-ahead.
5. Never write real secret values (DASHBOARD_PASSWORD,
   AI_PLATFORM_ADMIN_SECRET, DASHBOARD_SESSION_SECRET, etc.) into any file —
   placeholders only, per SECURITY.md.

Before you end your session: update PROJECT_STATE.md with the new exact
stopping point, update TASKS.md (move completed items, add new ones), and
append a dated entry to SESSION_LOG.md describing what you did. These docs
are the only memory that carries forward to the next account/session — if
you skip this, the next session starts cold with no way to know what
changed.
```
