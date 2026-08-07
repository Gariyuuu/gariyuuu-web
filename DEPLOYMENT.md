# DEPLOYMENT.md

## Platform: Vercel (verified)

Verified via `.vercel/project.json` (gitignored, present in the local
checkout): `projectName: "gariyuuu-web"`, linked to a Vercel team. `.gitignore`
confirms `.vercel` is intentionally excluded from version control, consistent
with standard Vercel-linked-project practice.

## Live status (verified 2026-08-07)

- `curl -o /dev/null -w '%{http_code}' https://gariyuuu.com` → **200**
- `curl -o /dev/null -w '%{http_code}' https://gariyuuu.com/dashboard` →
  **200** (renders the login form when unauthenticated — the route itself
  isn't network-blocked, access to its *content* is gated client/server-side,
  see `SECURITY.md`)

## How deploys happen (inferred from repo conventions, not directly
observable from this repo alone)

This repo has a GitHub remote (`origin` → `github.com/Gariyuuu/gariyuuu-web`)
and is a standard Vercel-linked Next.js project. The conventional and almost
certainly correct setup — per the user's own prior notes on other projects in
`~/Projects` (Vercel auto-deploy from GitHub) — is: **push to `main` on
GitHub → Vercel builds and deploys automatically.** This wasn't independently
re-verified by triggering a deploy in this session (that would require
pushing, which this session was told not to do). Treat "auto-deploy on push
to `main`" as **inferred**, not confirmed, until a session actually observes
a push trigger a new Vercel deployment.

## Environment variables

Set in Vercel's project settings for Production (and optionally
Preview/Development) — **not** checkable from this repo. The full list of
required variables and what each does is in `.env.example` and
`SECURITY.md`. All three dashboard-auth variables
(`DASHBOARD_SESSION_SECRET`, `DASHBOARD_PASSWORD`, `DASHBOARD_ALLOWED_EMAILS`)
must be set together, and both AI-platform pairs
(`AI_PLATFORM_BASE_URL`+`AI_PLATFORM_DEMO_API_KEY`,
`AI_PLATFORM_ADMIN_URL`+`AI_PLATFORM_ADMIN_SECRET`) must be set together, or
the relevant feature fails closed with a `500` "not configured" response
(verified in the route code).

## Runtime notes

- Next.js 16.3.0, App Router. `next.config.ts` is minimal (default config,
  no custom `images`/`redirects`/`headers` overrides — verify if adding
  external image domains, since `next/image` is used for screenshots and the
  about-page photo, both served from `/public`, so no remote-image config is
  currently needed).
- Three API routes explicitly set `export const runtime = "nodejs"`
  (`/api/chat`, `/api/dashboard/auth`, `/api/dashboard/usage`) because
  `dashboard-auth.ts` uses Node's `crypto` module, which isn't available on
  Vercel's default Edge runtime. `/api/dashboard/logout` does not set this
  explicitly (it doesn't touch `crypto`) — low risk either way since it just
  deletes a cookie, but worth noting for consistency if touched.

## Manual deploy / rollback

Not exercised in this session. Standard Vercel mechanisms apply: redeploy a
previous deployment from the Vercel dashboard, or `vercel --prod` from the
CLI if the project is linked locally (it is, per `.vercel/`). No
project-specific deploy script exists in `package.json` beyond the standard
`build`/`start`.
