# SECURITY.md

This document exists specifically to answer: **is the dashboard gate a real
auth boundary, or a shared static password, and is that an acceptable risk?**
Answered by reading `src/lib/dashboard-auth.ts` and the three
`src/app/api/dashboard/*` routes directly.

## How the dashboard gate actually works (verified)

It's a hybrid: **a real, signed, time-limited session — protecting access
that's ultimately gated by one shared static password plus an email
allowlist.**

1. `POST /api/dashboard/auth` receives `{ email, password }`.
2. `email` (lowercased, trimmed) must appear in `DASHBOARD_ALLOWED_EMAILS`
   (a comma-separated env var — an allowlist of who's even allowed to try).
3. `password` must exactly equal the single `DASHBOARD_PASSWORD` env var —
   **there is one password shared by everyone on the allowlist, not
   per-user credentials.** (Comparison is a plain `!==`, not constant-time —
   see "Weaknesses" below.)
4. On success, the server issues a cookie: `dashboard_session =
   "${expiresAt}.${hmac}"`, where `hmac = HMAC-SHA256(expiresAt,
   DASHBOARD_SESSION_SECRET)`. This **is** a real, forgery-resistant,
   server-signed session token — a client can't fabricate a valid one
   without knowing `DASHBOARD_SESSION_SECRET`, and it can't be replayed past
   its 7-day expiry.
5. Cookie flags: `httpOnly` (not readable by JS — mitigates XSS token
   theft), `secure` in production (HTTPS-only), `sameSite: "lax"` (real CSRF
   mitigation for this kind of state-changing-via-GET-mostly flow).
6. Every subsequent authenticated request (`/dashboard` page load,
   `/api/dashboard/usage`) independently re-verifies the token server-side
   with `timingSafeEqual`, not just trusting the cookie's presence.

So: **this is not "no auth" and not just a bare shared password with no
session** — there's a genuine signed-session layer on top. But the thing
being protected by that session is itself gated by one password shared
across an email allowlist, not individual credentials.

## Weaknesses (verified by reading the code, not assumed)

- **No brute-force protection on login.** `/api/dashboard/auth` has no rate
  limiting, attempt counter, or lockout. An attacker who knows (or guesses)
  an allowlisted email can attempt the password an unlimited number of times
  directly against the API route (this is Vercel-hosted; Vercel's platform
  may apply some generic abuse mitigation, but nothing in this codebase
  does).
- **Password comparison is not constant-time** (`submittedPassword !==
  password`, a plain string comparison) — the session-token comparison
  *does* use `timingSafeEqual`, but the password check that gates issuing a
  new token does not. A timing side-channel here is a low-severity,
  high-effort attack vector for a short string, but it's a real gap, not a
  theoretical nitpick given the code was written to use `timingSafeEqual`
  elsewhere.
- **Single shared password** means it can't be revoked for one person
  without changing it for everyone on the allowlist, and there's no audit
  trail of *which* allowlisted person used it.
- **Session revocation is all-or-nothing.** There's no server-side session
  store, so there's no way to invalidate one issued token early — only
  rotating `DASHBOARD_SESSION_SECRET` (which invalidates every active
  session, not a targeted one).
- **Fails closed, which is good**: if any of `DASHBOARD_SESSION_SECRET`,
  `DASHBOARD_PASSWORD`, or `DASHBOARD_ALLOWED_EMAILS` is unset, the auth
  route returns `500` rather than silently allowing access.

## Is this an acceptable risk for what's behind it?

What's behind the gate: **read-only usage statistics** (request counts,
token counts, an estimated dollar cost, per-API-key enabled/error status) for
the owner's own AI platform. There is no PII beyond the allowlisted emails
themselves (which live in an env var, not in the UI), no ability to take
action (no key rotation, no billing changes, no data mutation) from this
dashboard, and no access to the underlying model, other apps' user data, or
credentials.

Given that, a single shared password behind an email allowlist and a
properly-signed session — with the specific gap of no login-attempt
throttling — reads as a **reasonable, low-but-not-zero risk** for this
specific payload. The main concrete recommendation, if the user wants to
close the gap cheaply, is adding basic rate-limiting to
`/api/dashboard/auth` (e.g., a per-IP or per-email attempt counter with a
short lockout). This is **advice, not something changed in this session** —
flagged in `TASKS.md`.

## Secrets inventory (names only — never real values, see below)

All defined in `.env.example` with empty placeholder values, loaded from
`.env.local` in dev (gitignored) and Vercel's env var settings in
production (verify in the Vercel dashboard, not checkable from this repo):

| Variable | Purpose |
|---|---|
| `AI_PLATFORM_BASE_URL` | Base URL for the public chat demo's upstream. |
| `AI_PLATFORM_DEMO_API_KEY` | Rate-limited key for the public chat demo. |
| `AI_PLATFORM_ADMIN_URL` | Base URL for the admin usage endpoint. |
| `AI_PLATFORM_ADMIN_SECRET` | Bearer token for the admin usage endpoint — high-value, grants read access to usage across every app on the AI platform. |
| `DASHBOARD_PASSWORD` | The shared dashboard password. |
| `DASHBOARD_ALLOWED_EMAILS` | Comma-separated email allowlist. |
| `DASHBOARD_SESSION_SECRET` | HMAC key signing dashboard session cookies — treat as high-value; anyone with it can forge a valid session without knowing the password. |

## Secrets audit (this session)

- Searched git history for `.env.local`: **never committed** (`git log --all
  -- .env.local` returns nothing).
- `.env.example` contains **no real values** — every variable is present
  with an empty right-hand side.
- No API keys, passwords, or tokens were found hardcoded anywhere in
  `src/**`.
- **No real secret values were written into any documentation file in this
  set** — every reference above is a variable *name*, never a value.
- `.vercel/project.json` (gitignored, present locally) contains a Vercel
  `projectId`/`orgId` — these are project identifiers, not credentials, and
  are not reproduced in this doc.

If a real secret is ever found committed in the future, rotate it
immediately (regenerate on the AI platform / update `DASHBOARD_PASSWORD` and
`DASHBOARD_SESSION_SECRET` in Vercel's env settings) — don't just remove it
from a future commit, since it'll still be in history.
