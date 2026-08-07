# ARCHITECTURE.md

## Overview

A single Next.js 16 (App Router) app, deployed on Vercel, with no database of
its own. It has exactly two integration points with the outside world, both
env-var-configured HTTP calls to a **separate** project — the self-hosted AI
platform ("Yuu v1.1", repo: `~/Projects/ai-platform`, live at
`api.gariyuuu.com`):

```
Browser
  │
  ├─ GET /              → static-ish landing page, reads src/lib/projects.ts
  ├─ GET /about          → static résumé content
  ├─ GET /projects       → reads src/lib/projects.ts
  │
  ├─ GET /chat           → renders <ChatWidget/> (client component)
  │     └─ POST /api/chat  ──────────────► AI_PLATFORM_BASE_URL/chat/completions
  │                                        (Authorization: Bearer AI_PLATFORM_DEMO_API_KEY)
  │                                        streams SSE back to the browser
  │
  └─ GET /dashboard      → server component, checks session cookie
        ├─ not authed  → <DashboardLoginForm/>
        │     └─ POST /api/dashboard/auth → checks email allowlist + password,
        │                                    sets signed HMAC session cookie
        └─ authed      → <UsageDashboard/> (client component)
              └─ GET /api/dashboard/usage ──► AI_PLATFORM_ADMIN_URL/admin/usage?hours=N
                                              (Authorization: Bearer AI_PLATFORM_ADMIN_SECRET)
                                              returns per-API-key usage stats
```

## How the usage dashboard actually aggregates data

**Important nuance, verified by reading `src/app/api/dashboard/usage/route.ts`:**
this repo does **not** call each of the owner's other apps individually. It
makes exactly **one** upstream call, to a single endpoint
(`${AI_PLATFORM_ADMIN_URL}/admin/usage?hours=N`) owned by the separate
`ai-platform` project. That endpoint is the one actually doing the
aggregation — it's the admin/metering surface of the OpenAI-compatible
gateway that fronts the self-hosted model. This repo is a thin, authenticated
UI/proxy layer on top of it.

The "9 apps" framing (from prior project notes) comes from
`src/lib/projects.ts`: exactly 9 entries are flagged `onAiPlatform: true`
(`nodability`, `daily-brief`, `anibrief`, `dramabrief`, `market-brief`,
`engo`, `mindloop`, `trading-professor`, `sports-betting-project`). The
inference — not directly verifiable from this repo alone — is that each of
those apps holds its own dedicated API key issued by the AI platform, and the
`/admin/usage` endpoint's response is keyed per-API-key, which is why the
dashboard UI (`usage-dashboard.tsx`) renders one table row per "app" (really:
per key, `name` + `key_prefix`). Confirming that mapping precisely would
require reading the `ai-platform` repo, which is out of scope here — flagged
as **inferred, not verified**.

The `/api/chat` route is a separate, independent integration: it's the public
demo, uses its own rate-limited `AI_PLATFORM_DEMO_API_KEY`, and has nothing to
do with the dashboard/usage path.

## Request flow for the dashboard gate

1. Browser POSTs `{email, password}` to `/api/dashboard/auth`.
2. Route checks `email` (lowercased/trimmed) against
   `DASHBOARD_ALLOWED_EMAILS` (a comma-separated env var, split into a list)
   **and** `password` against the single `DASHBOARD_PASSWORD` env var.
3. On success, sets an `httpOnly`, `sameSite=lax` cookie (`dashboard_session`)
   containing `${expiresAt}.${hmac_sha256(expiresAt, DASHBOARD_SESSION_SECRET)}`,
   7-day TTL.
4. `/dashboard` (server component) and `/api/dashboard/usage` both verify
   that cookie via `verifySessionToken()` (`src/lib/dashboard-auth.ts`),
   using `timingSafeEqual` for the HMAC comparison.
5. `/api/dashboard/logout` just deletes the cookie.

See `SECURITY.md` for what this does and doesn't protect against.

## No database

There is no database, ORM, or persistent storage anywhere in this repo (no
Prisma/Drizzle/Supabase client in `package.json`, no `DATABASE_URL` in
`.env.example`). All "data" is either hardcoded (`src/lib/projects.ts`) or
fetched live from the AI platform on each request. See `DATABASE.md`.

## Rendering model

- Server components by default (Next.js App Router).
- Client components (`"use client"`) only where needed: `BootIntro`,
  `MatrixRain`, `ChatWidget`, `DashboardLoginForm`, `UsageDashboard` — all of
  these need browser state/effects (timers, canvas, fetch-and-render,
  cookies-via-router-refresh).
- `/dashboard`'s top-level page is a server component that reads the cookie
  server-side and decides which client tree to render — the actual usage
  data fetch happens client-side against `/api/dashboard/usage`, which
  independently re-validates the cookie.

## Deployment topology

Single Vercel project (`gariyuuu-web`, linked via `.vercel/project.json`,
gitignored). All three API routes that need `crypto` or server secrets set
`export const runtime = "nodejs"` explicitly (Vercel's default Edge runtime
doesn't support Node's `crypto` module used in `dashboard-auth.ts`). See
`DEPLOYMENT.md`.
