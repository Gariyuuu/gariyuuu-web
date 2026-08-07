# TESTING.md

## Current state: no automated test suite (verified)

- `playwright` is listed in `devDependencies` in `package.json`, but:
  - No `playwright.config.ts`/`.js` exists anywhere in the repo.
  - No `*.spec.ts`, `*.test.ts`, or equivalent files exist anywhere in the
    repo (searched the full tree, excluding `node_modules`).
- There is no `test` script in `package.json` — only `dev`, `build`,
  `start`, `lint`.
- This means `playwright` is currently an **unused dependency** — either
  installed in anticipation of writing tests that never got written, or a
  leftover from scaffolding. Flagged in `TASKS.md` as a candidate to either
  act on (write tests) or remove (drop the dependency) — not resolved in
  this session since it's a product decision, not a doc-correctness issue.

## What verification exists today

None automated. What this documentation session used to verify claims:

- `npm run lint` (ESLint flat config, `eslint.config.mjs`) — passed clean.
- `npx tsc --noEmit` — passed clean.
- Manual `curl` checks against the live site (`/` and `/dashboard`, both
  `200`).
- Direct code reading to verify behavior (auth logic, API routes, env-var
  gating) rather than exercising it end-to-end.

## How to manually test each feature (for a future session, until real
tests exist)

- **Landing/about/projects pages**: `npm run dev`, visit each route, check
  no console errors, check `/projects` renders all entries with either a
  screenshot or the "No preview yet" placeholder.
- **Chat demo**: requires real `AI_PLATFORM_BASE_URL` +
  `AI_PLATFORM_DEMO_API_KEY` in `.env.local` pointing at a reachable AI
  platform instance. Without them, `/api/chat` returns a `500`
  "not configured" — that's the expected degraded behavior, not a bug.
- **Dashboard**: requires all three `DASHBOARD_*` vars plus
  `AI_PLATFORM_ADMIN_URL`/`AI_PLATFORM_ADMIN_SECRET`. Test the negative
  paths deliberately: wrong password, email not on the allowlist, expired/
  tampered cookie (edit the cookie value in devtools) — all three should
  fail closed.
- **Boot intro / matrix rain**: toggle OS-level "reduce motion" and confirm
  both skip/disable — this is the one accessibility-relevant behavior
  that's easy to silently regress.

## If tests get added later

Given `playwright` is already a devDependency, the natural next step is
Playwright E2E tests for: the two gated-route negative paths (dashboard
without a session, chat/dashboard API routes without env config configured),
the reduced-motion behavior, and a smoke test that all `/projects` entries
with a `url` actually resolve (would have caught the `daily-brief`
preview-URL inconsistency noted in `TASKS.md` automatically).
