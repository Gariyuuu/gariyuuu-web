# DATABASE.md

## N/A — this project has no database.

Verified by inspection, not assumption:

- `package.json` has no ORM, database driver, or BaaS client
  (no `prisma`, `drizzle-orm`, `@supabase/*`, `pg`, `mysql2`, `mongodb`,
  etc. — dependencies are just `next`, `react`, `react-dom`).
- `.env.example` has no `DATABASE_URL` or equivalent.
- No `prisma/`, `drizzle/`, or migration directories anywhere in the repo.

## Where "data" actually lives

- **Project listing** (`src/lib/projects.ts`) — a hardcoded, hand-maintained
  TypeScript array of 26 project objects (`slug`, `name`, `description`,
  `url`, `screenshot`, `onAiPlatform`). This is the closest thing to a "data
  model" in the repo. No admin UI to edit it — it's a source file.
- **Usage numbers shown on `/dashboard`** — not stored here at all. Fetched
  live, on every request, from the AI platform's `/admin/usage` endpoint
  (owned by the separate `ai-platform` repo, which presumably has its own
  database — out of scope for this repo). This app holds no usage history of
  its own; if the AI platform is down, the dashboard shows an error, not
  stale cached data.
- **Dashboard session** — not a database row; it's a signed, stateless HMAC
  token stored client-side in a cookie (`src/lib/dashboard-auth.ts`). Nothing
  server-side to look up or revoke individually short of rotating
  `DASHBOARD_SESSION_SECRET` (which invalidates all sessions at once).

## If a database is ever added

There's nothing here to migrate away from — a from-scratch decision. Note the
project already runs on Vercel, so Vercel Postgres/Neon or similar would be
the path of least friction if a real need arises (e.g., persisting chat
history, or contact-form submissions). No such need currently exists in the
code.
