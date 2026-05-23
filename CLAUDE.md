2# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Dev commands

All commands run from the repo root (`icecream/`):

```bash
# Install all workspace dependencies (first time / after adding packages)
npm install

# Run both servers with hot reload (Vite on :5173, Express on :3001)
npm run dev

# Build client for production
npm run build   # outputs to client/dist/

# Run production server (serves built client + API on :3001)
npm start

# Generate admin password hash
node -e "require('bcryptjs').hash('yourpassword', 12).then(console.log)"
```

**Environment:** copy `server/.env.example` to `server/.env` and fill in:
- `ADMIN_PASSWORD_HASH` — bcrypt hash of the admin password
- `SECRET_KEY` — long random string for session signing (required in production)

## Architecture

**Monorepo** — npm workspaces: `client/` (Vite + React SPA) and `server/` (Express REST API).

**Client** (`client/src/`):
- `main.jsx` — entry; wraps app in `BrowserRouter` + `SurveyProvider`
- `App.jsx` — React Router v7 routes + `AnimatePresence` (Framer Motion)
- `SurveyContext.jsx` — survey state (answers, affinity, flavor, maxPrice) persisted to `sessionStorage`; cleared after submit
- `hooks/useDirection.js` — tracks forward/back navigation direction for transition animations
- `components/` — `ScoopSlider`, `CurveChart`, `ScoopCone`, `Glyph`, `ProgressDots`, `MotionPage`, `PageShell`, `ThankYouMark`
- `pages/` — `Landing`, `Consent`, `ScoopQuestion` (Q1–Q5), `OptionalGate`, `DessertAffinity` (Q6), `FlavorChoice` (Q7), `PriceQuestion` (Q8 + submit), `Thanks`, `Privacy`; `admin/Login`, `admin/Dashboard`
- `styles/tokens.css` — design tokens (copy of `design/Icecream/tokens.css`)
- `styles/app.css` — all component styles

**Server** (`server/src/`):
- `index.js` — Express entry; privacy middleware, session, mounts `/api` routes; serves `client/dist/` in production with SPA catch-all
- `db.js` — `better-sqlite3` schema + all DB operations (DAL): `createSubmission`, `deleteSubmission`, `getMeanCurve`, `getStats`, `listSubmissions`, `getAllSubmissions`, `deleteSubmissionAdmin`
- `routes/submissions.js` — `POST /api/submit` (returns `{ token, mean, total }`), `DELETE /api/delete/:token`
- `routes/admin.js` — session-protected: login/logout/me, stats, paginated submissions list, CSV/JSON export, delete by token
- `middleware/privacy.js` — strips IP before any logging, adds security response headers

**Database:** SQLite at `server/instance/icecream.db` (gitignored). WAL mode enabled.

**Survey flow:**
```
/           Landing
/consent    Consent (checkbox gate)
/q/1–5      ScoopQuestion (slider + live curve chart)
/optional   OptionalGate (cherry-on-top interstitial)
/q/6        DessertAffinity (Likert 1–10)
/q/7        FlavorChoice (radio grid)
/q/8        PriceQuestion (numeric USD; triggers POST /api/submit on confirm)
/thanks/:token  Thank you + dual-curve SVG comparison chart
/privacy    Privacy policy + delete-by-token form
/admin      Admin dashboard (protected)
```

**Dev proxy:** Vite proxies `/api` → `http://localhost:3001` so the SPA and API run on different ports without CORS issues during development.

## Key invariants

- **Never store IP addresses.** `stripIp` middleware in `privacy.js` runs before every request. Do not add middleware or logging that bypasses it.
- **`created_at` is date-only** (`YYYY-MM-DD`), not datetime — prevents timing-based re-identification.
- **Survey state is client-side only.** No server-side session for survey flow. A single `POST /api/submit` at the end is the only write.
- **Admin password is never stored in code.** `ADMIN_PASSWORD_HASH` must come from the environment (`server/.env`). Empty hash → all login attempts fail.
- **`is_likely_bot`** is set to `1` when all five scoop answers exactly match the linear defaults `[200, 300, 400, 500, 600]`.

## Design files

The `design/Icecream/` directory contains the original JSX design prototypes (not production code). They are the source of truth for visual design — components in `client/src/` are ported from these files.

The old Flask app lives in `icecream-survey/` and is no longer active. It will be deleted once the Node.js app is fully verified.
