# FEATURES.md

Feature-by-feature status. "Verified" = confirmed by reading the actual code
and/or a live `curl`/browser check during the 2026-08-07 documentation
session, not by trusting prior notes.

## Landing page (`/`)

**Status: verified, live.**

- Pitches the self-hosted AI platform ("Yuu v1.1" / Qwen3-8B) as the
  reason the site exists.
- Links to `/chat`, `/projects`, `/about`.
- "How it works" 3-step explainer (gateway → per-app keys → no vendor
  lock-in).
- "Featured projects" — first 4 entries of `src/lib/projects.ts`, rendered
  via `<ProjectCard/>`.
- `curl https://gariyuuu.com` → `200` (checked 2026-08-07).

## About / résumé (`/about`)

**Status: verified, live.**

Real bio content — statically defined arrays in `src/app/about/page.tsx`
(`experience`, `projects`, `skills`, `honors`). Photo at `/public/photo.jpg`.
Links to real GitHub (`github.com/Gariyuuu`), LinkedIn, OpenReview, and a
`mailto:` — these are the owner's real identity, not placeholders. No CMS,
edited by hand in the source file.

## Projects showcase (`/projects` + featured section on `/`)

**Status: verified, live.**

Reads `src/lib/projects.ts`, a hardcoded array of 26 projects (as of this
session) split into "live" (has a `url`) and "in progress / not yet
deployed" (`url: null`) sections. Each entry has a screenshot (or a "No
preview yet" placeholder) and an "AI platform" badge when
`onAiPlatform: true`. This is manually maintained — adding a new personal
project means adding an entry here by hand.

## Public chat demo (`/chat`)

**Status: verified, live** (verified against code; did not send a live
message during this session to avoid consuming the rate-limited demo key
unnecessarily — the route and streaming logic were read directly instead).

- `ChatWidget` client component posts to `/api/chat`, which proxies to
  `AI_PLATFORM_BASE_URL/chat/completions` using a **separate, rate-limited**
  `AI_PLATFORM_DEMO_API_KEY` (distinct from the dashboard's admin secret).
- Streams via SSE, parsed manually in `parseSSE()` (no SDK dependency).
- Input caps: 20 messages/conversation, 2000 chars/message, `max_tokens: 400`,
  reasoning disabled — all enforced server-side in the route, not just the
  UI.
- Model is presented to users as "Yuu v1.1" (rebranded from "Yuu no Sekai"
  on 2026-08-07). This is now a display-only label — the `model` string
  actually sent to the AI platform's `/chat/completions` in
  `src/app/api/chat/route.ts` is still the literal `"Yuu no Sekai"`, matching
  the `MODEL_NAME` registered in the separate `ai-platform` repo's config.
  Don't "fix" this mismatch by renaming the API field without first updating
  `MODEL_NAME` in that repo's production `.env` — doing so will break the
  live chat demo with a `model_not_found` error.
- Fails gracefully with a user-facing error message on missing env config,
  upstream unreachable, or 429 (rate-limited).

## Password-gated usage dashboard (`/dashboard`)

**Status: verified, live** — confirmed `200` at `https://gariyuuu.com/dashboard`
(returns the login form when unauthenticated; content is gated, the *route*
itself isn't blocked at the network level).

- Gate: email (must be in `DASHBOARD_ALLOWED_EMAILS`) **and** a single shared
  `DASHBOARD_PASSWORD`. See `SECURITY.md` for a full breakdown of what this
  is and isn't.
- On success: shows live per-key usage (requests, tokens, estimated cost,
  error count, enabled/disabled status) pulled from the AI platform's
  `/admin/usage` endpoint, with 24h/7d/30d window toggles.
- Cost is explicitly labeled an *estimate* (hardcoded OpenRouter Qwen3-8B
  pricing constants in `usage-dashboard.tsx`), not billed truth.
- Logout clears the session cookie via `/api/dashboard/logout`.

## Boot intro + Matrix rain (site-wide chrome, not a "page")

**Status: verified, live** — and the two files that implement the flood-phase
visual (9 full-screen terminal windows + shake) were the pending uncommitted
change at the start of this documentation session; now committed (see
`PROJECT_STATE.md`).

- `BootIntro`: full-screen takeover on every route (mounted in
  `layout.tsx`), phases `boot → flood → crash → recover → hidden`. Skippable
  by click or keypress at any point. Respects `prefers-reduced-motion`
  (skips straight to hidden).
- `MatrixRain`: canvas background animation behind all content, also respects
  `prefers-reduced-motion` (doesn't even start its render loop).

## Theme

**Status: verified — single fixed dark theme, no picker.** Prior project
notes may reference a "theme picker" (6 palettes × light/dark) — that existed
for one commit (`40635cf`) and was removed the same day (`0d61741`). The
current, live theme system is a single hardcoded dark palette in
`globals.css`. See `UI_SYSTEM.md`.
