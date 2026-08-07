# gariyuuu.com

Gary Wang's personal site. Live at **https://gariyuuu.com**.

Four surfaces:
- `/` — landing page pitching the self-hosted AI platform, featured projects.
- `/about` — résumé/bio.
- `/projects` — every shipped/in-progress project (see `src/lib/projects.ts`).
- `/chat` — public, rate-limited streaming chat demo against Gary's self-hosted
  model ("Yuu no Sekai", Qwen3-8B).
- `/dashboard` — email-allowlist + password-gated live usage dashboard,
  aggregating per-app token/request usage from the AI platform's admin API.

For anyone (human or AI) picking this repo up: **read `HANDOFF.md` first**, then
`PROJECT_STATE.md`. The full canonical doc set (`CLAUDE.md`, `ARCHITECTURE.md`,
`SECURITY.md`, etc.) lives at the repo root — see `FILE_MAP.md` for what's where.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No database.
Deployed on Vercel, auto-deploy from `main`. See `DEPLOYMENT.md`.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in real values, never commit this file
npm run dev
```

Open http://localhost:3000. Some features degrade gracefully without env vars
set (e.g. dashboard/chat return a "not configured" error instead of crashing);
see `.env.example` for what each var does and `SECURITY.md` for how the
dashboard gate works.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — run a production build locally
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

## Docs

See `TASKS.md` (current work), `ARCHITECTURE.md` (how the usage dashboard talks
to the AI platform), `SECURITY.md` (how the dashboard gate actually works, and
its limits), `TESTING.md` (there is currently no automated test suite —
verification is manual).
