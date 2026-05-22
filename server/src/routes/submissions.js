import { Router } from 'express';
import { createSubmission, deleteSubmission, getMeanCurve } from '../db.js';

const router = Router();

const VALID_FLAVORS = new Set(['vanilla', 'chocolate', 'pistachio', 'strawberry', 'mint_chip', 'other']);
const VALID_AGES    = new Set(['<18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']);
const VALID_GENDERS = new Set(['woman', 'man', 'nonbinary', 'self_describe']);

function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

router.post('/submit', (req, res) => {
  const { answers, affinity, flavor, maxPrice, ageBucket, gender, country } = req.body ?? {};

  if (!Array.isArray(answers) || answers.length !== 5) {
    return res.status(400).json({ error: 'answers must be an array of 5 numbers' });
  }
  const scoops = answers.map(Number);
  if (scoops.some(n => isNaN(n) || n < 0 || n > 500)) {
    return res.status(400).json({ error: 'each answer must be 0–500' });
  }

  const cleanAffinity = affinity != null ? clamp(Math.round(Number(affinity)), 1, 10) : null;
  if (affinity != null && (isNaN(cleanAffinity))) {
    return res.status(400).json({ error: 'affinity must be 1–10' });
  }

  const cleanFlavor = flavor != null ? String(flavor) : null;
  if (cleanFlavor && !VALID_FLAVORS.has(cleanFlavor)) {
    return res.status(400).json({ error: 'invalid flavor' });
  }

  const cleanPrice = maxPrice != null ? Number(maxPrice) : null;
  if (cleanPrice != null && (isNaN(cleanPrice) || cleanPrice < 0 || cleanPrice > 500)) {
    return res.status(400).json({ error: 'maxPrice must be 0–500' });
  }

  const cleanAge    = ageBucket && VALID_AGES.has(ageBucket)    ? ageBucket : null;
  const cleanGender = gender    && VALID_GENDERS.has(gender)    ? gender    : null;
  const cleanCountry = country  && /^[A-Z]{2}$/.test(country)   ? country   : null;

  try {
    const token = createSubmission({
      answers: scoops,
      affinity: cleanAffinity,
      flavor: cleanFlavor,
      maxPrice: cleanPrice,
      ageBucket: cleanAge,
      gender: cleanGender,
      country: cleanCountry,
    });
    const { mean, total } = getMeanCurve();
    res.json({ token, mean, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal error' });
  }
});

router.delete('/delete/:token', (req, res) => {
  const { token } = req.params;
  if (!token || !/^[0-9a-f-]{36}$/.test(token)) {
    return res.status(400).json({ error: 'invalid token' });
  }
  const deleted = deleteSubmission(token);
  res.json({ success: deleted });
});

export default router;
