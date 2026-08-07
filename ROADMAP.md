# ROADMAP.md

Nothing in this repo states a formal roadmap — there's no `ROADMAP` file,
issue tracker, or planning doc predating this session. Everything below is
**inferred** from `TASKS.md` gaps and the shape of the current codebase, not
a commitment from the user. Confirm priority with the user before acting on
any of it.

## Plausible near-term candidates

- **Close the dashboard login rate-limiting gap** (see `SECURITY.md`) — cheap,
  concrete, and the clearest actionable security improvement identified.
- **Decide on `playwright`**: either write the E2E tests it's sitting there
  for, or remove the unused dependency. See `TESTING.md`.
- **Fix or confirm the `daily-brief` project URL** — it's currently a
  Vercel preview-deploy URL rather than a stable production domain, unlike
  every other entry in `src/lib/projects.ts`.

## Plausible longer-term directions (speculative, not sourced from any
in-repo statement of intent)

- Add more projects as they ship (the `PROJECTS` array is manually
  maintained — new personal projects need an entry added by hand).
- If the dashboard's value grows, consider whether per-user (not shared)
  dashboard credentials are worth the added complexity — current single
  shared password is a reasonable tradeoff for low-stakes read-only data
  (see `SECURITY.md`), but that calculus changes if more is ever exposed
  through it.
- If the chat demo gets more traffic, watch `AI_PLATFORM_DEMO_API_KEY`'s
  rate limit — the route already surfaces 429s to the user with a friendly
  message, so the failure mode is graceful, but it's worth knowing this is
  a shared/limited resource.

## Explicitly not planned (as far as this repo shows)

- A CMS or database-backed content system for `/about` or `/projects` — both
  are, by design as far as can be told, hand-edited source files. No
  evidence of intent to change that.
- A user account system — the dashboard's gate is intentionally minimal
  (see `DECISIONS.md`), not a stepping stone toward full auth as far as
  anything in the repo indicates.
