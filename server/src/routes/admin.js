import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getStats, listSubmissions, getAllSubmissions, deleteSubmissionAdmin } from '../db.js';

const router = Router();

// ── Auth guard ────────────────────────────────────────────────────────────────

function requireAuth(req, res, next) {
  if (req.session?.admin) return next();
  res.status(401).json({ error: 'unauthorized' });
}

// ── Auth routes ───────────────────────────────────────────────────────────────

router.post('/login', async (req, res) => {
  const { password } = req.body ?? {};
  const hash = process.env.ADMIN_PASSWORD_HASH ?? '';
  if (!hash || !password) return res.status(401).json({ error: 'unauthorized' });

  const ok = await bcrypt.compare(String(password), hash);
  if (!ok) return res.status(401).json({ error: 'unauthorized' });

  req.session.admin = true;
  res.json({ ok: true });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

router.get('/me', (req, res) => {
  res.json({ authed: !!req.session?.admin });
});

// ── Protected routes ──────────────────────────────────────────────────────────

router.get('/stats', requireAuth, (_req, res) => {
  try {
    res.json(getStats());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

router.get('/submissions', requireAuth, (req, res) => {
  const { page, perPage, ageBucket, country, affinityMin, affinityMax } = req.query;
  try {
    const result = listSubmissions({
      page: page ? Number(page) : 1,
      perPage: perPage ? Math.min(Number(perPage), 200) : 50,
      ageBucket, country, affinityMin, affinityMax,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

router.get('/export.json', requireAuth, (req, res) => {
  const { ageBucket, country, affinityMin, affinityMax } = req.query;
  const rows = getAllSubmissions({ ageBucket, country, affinityMin, affinityMax });
  res.setHeader('Content-Disposition', 'attachment; filename="icecream-export.json"');
  res.json(rows);
});

router.get('/export.csv', requireAuth, (req, res) => {
  const { ageBucket, country, affinityMin, affinityMax } = req.query;
  const rows = getAllSubmissions({ ageBucket, country, affinityMin, affinityMax });

  const cols = ['id','created_at','scoop_1_pct','scoop_2_pct','scoop_3_pct','scoop_4_pct','scoop_5_pct',
    'ice_cream_affinity','flavor_preference','max_price_usd','age_bucket','gender','country','is_likely_bot'];

  const escape = v => v == null ? '' : `"${String(v).replace(/"/g, '""')}"`;
  const lines = [cols.join(','), ...rows.map(r => cols.map(c => escape(r[c])).join(','))];

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="icecream-export.csv"');
  res.send(lines.join('\r\n'));
});

router.delete('/submissions/:token', requireAuth, (req, res) => {
  const { token } = req.params;
  const deleted = deleteSubmissionAdmin(token);
  res.json({ success: deleted });
});

export default router;
