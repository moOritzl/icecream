import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../SurveyContext.jsx';
import MotionPage from '../components/MotionPage.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';

const CURRENCIES = {
  EUR: { symbol: '€', placeholder: '6.50', rate: 0.92 },
  NOK: { symbol: 'kr', placeholder: '75',  rate: 10.5 },
  USD: { symbol: '$', placeholder: '7.50', rate: 1 },
};

export default function PriceQuestion() {
  const navigate = useNavigate();
  const direction = useDirection();
  const { maxPrice, answers, affinity, flavor, update, reset } = useSurvey();
  const [raw, setRaw] = useState(maxPrice != null ? String(maxPrice) : '');
  const [currency, setCurrency] = useState('EUR');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [priceStats, setPriceStats] = useState(null);

  useEffect(() => {
    fetch('/api/price-stats')
      .then(r => r.json())
      .then(d => setPriceStats(d))
      .catch(() => {});
  }, []);

  const { symbol, placeholder } = CURRENCIES[currency];
  const parsed = parseFloat(raw);
  const isValid = !isNaN(parsed) && parsed >= 0 && parsed <= 9999;
  const rangeError = !isNaN(parsed) && parsed > 9999;

  const submit = async (price) => {
    setSubmitting(true);
    setError(null);
    try {
      const body = {
        answers,
        affinity,
        flavor,
        maxPrice: price,
        currency: price != null ? currency : null,
      };
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Submit failed');
      const { token, mean, total } = await res.json();
      const savedAnswers = [...answers];
      reset();
      navigate(`/thanks/${token}`, { state: { answers: savedAnswers, mean, total } });
    } catch (e) {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (raw === '') { submit(null); return; }
    if (!isValid) return;
    update({ maxPrice: parsed });
    submit(parsed);
  };

  const handleSkip = () => submit(null);

  return (
    <MotionPage direction={direction} variant="slide">
      <div className="scoop-screen survey-page">
        <header className="survey-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScoopCone size={28} scoops={1} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
          </div>
          <div className="eyebrow">QUESTION 3 OF 3 · OPTIONAL</div>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 560, margin: '0 auto', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '8px 0 6px' }}>What's the most you'd pay for that ideal&nbsp;cone?</h1>
          <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: 0 }}>
            One cone, all scoops included — what would you pay at a nice indie shop?
          </p>

          <div style={{ marginTop: 32 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              {Object.keys(CURRENCIES).map(c => (
                <button key={c} onClick={() => setCurrency(c)} className="mono" style={{
                  padding: '4px 12px', borderRadius: 999, fontSize: 12, cursor: 'pointer',
                  border: c === currency ? '1.5px solid var(--ink-900)' : '1px solid var(--vanilla-300)',
                  background: c === currency ? 'var(--ink-900)' : 'transparent',
                  color: c === currency ? 'var(--vanilla-50)' : 'var(--ink-500)',
                  transition: 'background 0.12s, color 0.12s',
                }}>{c}</button>
              ))}
            </div>
            <div style={{
              display: 'flex', alignItems: 'stretch',
              borderRadius: 12, overflow: 'hidden',
              border: `1.5px solid ${rangeError ? 'var(--strawberry-700)' : 'var(--ink-900)'}`,
              background: 'var(--vanilla-100)',
            }}>
              <span style={{
                padding: '14px 16px', borderRight: '1px solid var(--vanilla-200)',
                background: 'var(--vanilla-200)',
                fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--ink-700)',
                display: 'flex', alignItems: 'center',
              }}>{symbol}</span>
              <input
                type="number" min="0" max="9999" step="0.5"
                value={raw}
                onChange={e => setRaw(e.target.value)}
                placeholder={placeholder}
                style={{
                  flex: 1, border: 0, outline: 0, background: 'transparent',
                  padding: '14px 18px', fontFamily: 'var(--font-mono)',
                  fontSize: 22, color: 'var(--ink-900)',
                }}
              />
              <span style={{
                padding: '14px 16px', fontSize: 13, color: 'var(--ink-500)',
                display: 'flex', alignItems: 'center', borderLeft: '1px solid var(--vanilla-200)',
              }}>/ cone</span>
            </div>
            {rangeError ? (
              <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8,
                background: 'rgba(200,75,62,.08)', color: 'var(--strawberry-700)', fontSize: 13 }}>
                That seems high — please enter a realistic price.
              </div>
            ) : (
              <div className="caption" style={{ marginTop: 8 }}>
                {priceStats?.count > 0 ? (() => {
                  const { rate, symbol } = CURRENCIES[currency];
                  const fmt = (usd) => {
                    const v = usd * rate;
                    return symbol + (v >= 10 ? Math.round(v) : v.toFixed(2));
                  };
                  return <>Median so far: <span className="mono" style={{ color: 'var(--ink-900)' }}>{fmt(priceStats.median)}</span> · range {fmt(priceStats.p10)}–{fmt(priceStats.p90)}</>;
                })() : 'Enter what feels right for a nice indie shop.'}
              </div>
            )}
            {error && (
              <div style={{ marginTop: 8, color: 'var(--strawberry-700)', fontSize: 13 }}>{error}</div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48 }}>
            <button className="btn btn-quiet" onClick={() => navigate('/q/7')} disabled={submitting}>← back</button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost" onClick={handleSkip} disabled={submitting}>Skip</button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting || (raw !== '' && !isValid)}>
                {submitting ? 'Submitting…' : 'Submit →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MotionPage>
  );
}
