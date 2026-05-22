import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../SurveyContext.jsx';
import MotionPage from '../components/MotionPage.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';

export default function PriceQuestion() {
  const navigate = useNavigate();
  const direction = useDirection();
  const { maxPrice, answers, affinity, flavor, update, reset } = useSurvey();
  const [raw, setRaw] = useState(maxPrice != null ? String(maxPrice) : '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const parsed = parseFloat(raw);
  const isValid = !isNaN(parsed) && parsed >= 0 && parsed <= 500;
  const rangeError = !isNaN(parsed) && parsed > 500;

  const submit = async (price) => {
    setSubmitting(true);
    setError(null);
    try {
      const body = {
        answers,
        affinity,
        flavor,
        maxPrice: price,
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
      <div className="scoop-screen" style={{ padding: 36, display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScoopCone size={28} scoops={1} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
          </div>
          <div className="eyebrow">QUESTION 08 OF 08 · OPTIONAL</div>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 560, margin: '0 auto', width: '100%' }}>
          <div className="eyebrow" style={{ color: 'var(--strawberry-700)' }}>Willingness to pay</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '8px 0 6px' }}>What's the most you'd pay for that ideal&nbsp;cone?</h1>
          <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: 0 }}>
            Pick the number of scoops that maximized your joy, then tell us the ceiling — what you'd pay at a nice indie shop.
          </p>

          <div style={{ marginTop: 32 }}>
            <label className="mono" style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
              Maximum price
            </label>
            <div style={{
              display: 'flex', alignItems: 'stretch', marginTop: 8,
              borderRadius: 12, overflow: 'hidden',
              border: `1.5px solid ${rangeError ? 'var(--strawberry-700)' : 'var(--ink-900)'}`,
              background: 'var(--vanilla-100)',
            }}>
              <span style={{
                padding: '14px 16px', borderRight: '1px solid var(--vanilla-200)',
                background: 'var(--vanilla-200)',
                fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--ink-700)',
                display: 'flex', alignItems: 'center',
              }}>USD $</span>
              <input
                type="number" min="0" max="500" step="0.25"
                value={raw}
                onChange={e => setRaw(e.target.value)}
                placeholder="8.50"
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
                background: 'rgba(200,75,62,.08)', color: 'var(--strawberry-700)', fontSize: 13,
                display: 'flex', alignItems: 'center', gap: 8 }}>
                Please enter a value between $0 and $500.
              </div>
            ) : (
              <div className="caption" style={{ marginTop: 8 }}>
                Median so far: <span className="mono" style={{ color: 'var(--ink-900)' }}>$7.25</span> · range $3–$22
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
