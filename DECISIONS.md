# DECISIONS.md

Dated architecture/decision record. Entries before 2026-08-07 (documentation
session) are **inferred from git history and code**, not from original design
notes — marked accordingly. Newest first.

---

### 2026-08-07 — Add the full 17-file canonical doc set

**Decision**: Create all missing canonical docs; keep the `@AGENTS.md` import
in `CLAUDE.md` rather than replacing it.
**Why**: Repo had 2/17 (both boilerplate). Project follows a workflow where
different Claude Code sessions/accounts pick up repos cold with no shared
chat history — the repo itself has to carry memory.
**Status**: Done. *(This session, not inferred.)*

---

### 2026-08-07 — Expand boot-intro flood phase to 9 full-screen windows *(inferred)*

**Decision**: Change the "flood" phase of `BootIntro` from 6 scattered,
gapped terminal windows to 9 windows tiling the full screen, add a shake
animation.
**Why**: Inferred from the diff itself — no commit message existed until
this session committed it (see `PROJECT_STATE.md` for a metadata anomaly
around how that commit ultimately landed). Reads as a visual-density fix:
the 6-window scattered layout left a lot of empty screen during the flood
phase.
**Status**: Committed this session.

---

### 2026-08-07 — Rework to a single dark "hacker" theme, remove the theme picker *(inferred)*

**Decision**: Replace a 6-palette × light/dark theme system with one fixed
dark palette.
**Why**: Not stated anywhere in the repo — inferred from the commit
sequence (`40635cf` added the picker, `0d61741` immediately reworked to a
single theme in the same session) that the picker was tried and then
deliberately simplified away in favor of a stronger, single, cohesive
identity (matches the "hacker terminal" boot intro added right after in
`0caec4c`). If a future session finds this decision documented elsewhere
with a different rationale, prefer that source over this inference.
**Status**: Live. **Do not reintroduce a theme picker without confirming
with the user first** — this looks like a deliberate simplification, not an
oversight.

---

### 2026-08-07 — Dashboard gate: email allowlist + shared password, not just a password *(inferred)*

**Decision**: Require an email from `DASHBOARD_ALLOWED_EMAILS` in addition
to `DASHBOARD_PASSWORD`.
**Why**: Inferred from the commit message itself ("require email (from an
allowlist) plus password, not just password") — this was a deliberate
hardening of an earlier, weaker, password-only gate. The earlier
password-only version is visible in git history (`ecce103`'s parent) if a
future session needs to see exactly what changed.
**Status**: Live. See `SECURITY.md` for the full current-state breakdown of
what this gate does and doesn't protect against — notably, no rate limiting
on login attempts was added at any point in the observed history.

---

### 2026-08-07 — No database *(inferred, ongoing)*

**Decision**: Keep this app fully stateless — no DB, no ORM.
**Why**: Everything the site needs is either static content
(`projects.ts`, about-page bio) or fetched live from the separate AI
platform. Adding persistence has no current driver.
**Status**: Holds as of this session. Revisit only if a real feature needs
it (e.g., a contact form, cached usage history for the dashboard).
