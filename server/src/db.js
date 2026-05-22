import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = process.env.DATABASE_URL
  ?? join(__dirname, '../instance/icecream.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id                   TEXT PRIMARY KEY,
    created_at           TEXT NOT NULL,
    consent_given        INTEGER NOT NULL DEFAULT 1,
    scoop_1_pct          INTEGER NOT NULL,
    scoop_2_pct          INTEGER NOT NULL,
    scoop_3_pct          INTEGER NOT NULL,
    scoop_4_pct          INTEGER NOT NULL,
    scoop_5_pct          INTEGER NOT NULL,
    ice_cream_affinity   INTEGER,
    flavor_preference    TEXT,
    max_price_usd        REAL,
    age_bucket           TEXT,
    gender               TEXT,
    country              TEXT,
    is_likely_bot        INTEGER NOT NULL DEFAULT 0
  )
`);

function isLikelyBot(scoops) {
  // Flag if the five values are exactly the linear defaults
  const DEFAULTS = [200, 300, 400, 500, 600];
  return scoops.every((v, i) => v === DEFAULTS[i]) ? 1 : 0;
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ── Public ──────────────────────────────────────────────────────────────────

const insertStmt = db.prepare(`
  INSERT INTO submissions
    (id, created_at, consent_given,
     scoop_1_pct, scoop_2_pct, scoop_3_pct, scoop_4_pct, scoop_5_pct,
     ice_cream_affinity, flavor_preference, max_price_usd,
     age_bucket, gender, country, is_likely_bot)
  VALUES
    (@id, @created_at, 1,
     @scoop_1_pct, @scoop_2_pct, @scoop_3_pct, @scoop_4_pct, @scoop_5_pct,
     @ice_cream_affinity, @flavor_preference, @max_price_usd,
     @age_bucket, @gender, @country, @is_likely_bot)
`);

export function createSubmission({ answers, affinity, flavor, maxPrice, ageBucket, gender, country }) {
  const id = randomUUID();
  const scoops = answers.map(Number);
  insertStmt.run({
    id,
    created_at: todayISO(),
    scoop_1_pct: scoops[0],
    scoop_2_pct: scoops[1],
    scoop_3_pct: scoops[2],
    scoop_4_pct: scoops[3],
    scoop_5_pct: scoops[4],
    ice_cream_affinity: affinity ?? null,
    flavor_preference:  flavor  ?? null,
    max_price_usd:      maxPrice != null ? Number(maxPrice) : null,
    age_bucket: ageBucket ?? null,
    gender:     gender    ?? null,
    country:    country   ?? null,
    is_likely_bot: isLikelyBot(scoops),
  });
  return id;
}

export function deleteSubmission(token) {
  const r = db.prepare('DELETE FROM submissions WHERE id = ?').run(token);
  return r.changes > 0;
}

// ── Admin ────────────────────────────────────────────────────────────────────

export function getStats() {
  const today = todayISO();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const { total } = db.prepare('SELECT COUNT(*) as total FROM submissions').get();
  const { today_count } = db.prepare(
    "SELECT COUNT(*) as today_count FROM submissions WHERE created_at = ?"
  ).get(today);
  const { week_count } = db.prepare(
    "SELECT COUNT(*) as week_count FROM submissions WHERE created_at >= ?"
  ).get(weekAgo);

  // Median peak: for each row, find which scoop index has the max value
  const rows = db.prepare(
    'SELECT scoop_1_pct, scoop_2_pct, scoop_3_pct, scoop_4_pct, scoop_5_pct FROM submissions'
  ).all();

  const peaks = rows.map(r => {
    const vals = [r.scoop_1_pct, r.scoop_2_pct, r.scoop_3_pct, r.scoop_4_pct, r.scoop_5_pct];
    return vals.indexOf(Math.max(...vals)) + 1; // 1-indexed scoop number
  });
  peaks.sort((a, b) => a - b);
  const medianPeak = peaks.length ? peaks[Math.floor(peaks.length / 2)] : null;

  const { mean_wtp } = db.prepare(
    'SELECT AVG(max_price_usd) as mean_wtp FROM submissions WHERE max_price_usd IS NOT NULL'
  ).get();

  // All curves for chart (limit to 200 for perf)
  const curves = db.prepare(
    'SELECT scoop_1_pct, scoop_2_pct, scoop_3_pct, scoop_4_pct, scoop_5_pct FROM submissions ORDER BY created_at DESC LIMIT 200'
  ).all().map(r => [r.scoop_1_pct, r.scoop_2_pct, r.scoop_3_pct, r.scoop_4_pct, r.scoop_5_pct]);

  return { total, today: today_count, week: week_count, medianPeak, meanWtp: mean_wtp, curves };
}

export function listSubmissions({ page = 1, perPage = 50, ageBucket, country, affinityMin, affinityMax } = {}) {
  const conditions = [];
  const params = [];
  if (ageBucket) { conditions.push('age_bucket = ?'); params.push(ageBucket); }
  if (country)   { conditions.push('country = ?');    params.push(country); }
  if (affinityMin != null) { conditions.push('ice_cream_affinity >= ?'); params.push(Number(affinityMin)); }
  if (affinityMax != null) { conditions.push('ice_cream_affinity <= ?'); params.push(Number(affinityMax)); }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  const offset = (page - 1) * perPage;

  const rows = db.prepare(
    `SELECT * FROM submissions ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`
  ).all(...params, perPage, offset);

  const { count } = db.prepare(`SELECT COUNT(*) as count FROM submissions ${where}`).get(...params);
  return { submissions: rows, total: count };
}

export function getAllSubmissions(filters = {}) {
  const { ageBucket, country, affinityMin, affinityMax } = filters;
  const conditions = [];
  const params = [];
  if (ageBucket) { conditions.push('age_bucket = ?'); params.push(ageBucket); }
  if (country)   { conditions.push('country = ?');    params.push(country); }
  if (affinityMin != null) { conditions.push('ice_cream_affinity >= ?'); params.push(Number(affinityMin)); }
  if (affinityMax != null) { conditions.push('ice_cream_affinity <= ?'); params.push(Number(affinityMax)); }
  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  return db.prepare(`SELECT * FROM submissions ${where} ORDER BY created_at DESC`).all(...params);
}

export function deleteSubmissionAdmin(token) {
  const r = db.prepare('DELETE FROM submissions WHERE id = ?').run(token);
  return r.changes > 0;
}

export function getMeanCurve() {
  const row = db.prepare(`
    SELECT
      AVG(scoop_1_pct) as s1, AVG(scoop_2_pct) as s2,
      AVG(scoop_3_pct) as s3, AVG(scoop_4_pct) as s4,
      AVG(scoop_5_pct) as s5, COUNT(*) as total
    FROM submissions WHERE is_likely_bot = 0
  `).get();
  if (!row || !row.total) return { mean: null, total: 0 };
  return {
    mean: [row.s1, row.s2, row.s3, row.s4, row.s5].map(Math.round),
    total: row.total,
  };
}
