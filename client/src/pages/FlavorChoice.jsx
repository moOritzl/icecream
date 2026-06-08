import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../SurveyContext.jsx';
import MotionPage from '../components/MotionPage.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';

const OPTIONS = [
  { id: 'vanilla',       label: 'Vanilla' },
  { id: 'chocolate',     label: 'Chocolate' },
  { id: 'stracciatella', label: 'Stracciatella' },
  { id: 'strawberry',    label: 'Strawberry' },
  { id: 'lemon',         label: 'Lemon' },
  { id: 'yoghurt',       label: 'Yoghurt' },
  { id: 'cookie',        label: 'Cookie' },
  { id: 'other',         label: 'Other' },
];

export default function FlavorChoice() {
  const navigate = useNavigate();
  const direction = useDirection();
  const { flavor, update } = useSurvey();
  const [selected, setSelected] = useState(flavor);

  const handleNext = () => {
    update({ flavor: selected });
    navigate('/q/8');
  };

  return (
    <MotionPage direction={direction} variant="slide">
      <div className="scoop-screen" style={{ padding: 36, display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScoopCone size={28} scoops={1} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
          </div>
          <div className="eyebrow">QUESTION 2 OF 3 · OPTIONAL</div>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 640, margin: '0 auto', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '8px 0 6px' }}>If forced to pick&nbsp;one.</h1>
          <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: 0 }}>One only. Don't be diplomatic.</p>

          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {OPTIONS.map((o) => {
              const isSel = o.id === selected;
              return (
                <label key={o.id} style={{
                  display: 'flex', gap: 12, alignItems: 'center',
                  padding: 16, borderRadius: 12, cursor: 'pointer',
                  background: isSel ? 'var(--pistachio-50)' : 'var(--vanilla-100)',
                  border: isSel ? '1.5px solid var(--pistachio-700)' : '1px solid var(--vanilla-200)',
                  transition: 'background 0.12s, border-color 0.12s',
                }}>
                  <input type="radio" name="flavor" value={o.id} checked={isSel}
                    onChange={() => setSelected(o.id)} style={{ display: 'none' }} />
                  <span style={{
                    flex: '0 0 20px', width: 20, height: 20, borderRadius: 999,
                    border: `2px solid ${isSel ? 'var(--pistachio-700)' : 'var(--ink-500)'}`,
                    background: isSel ? 'var(--pistachio-500)' : 'transparent',
                    position: 'relative', flexShrink: 0,
                  }}>
                    {isSel && <div style={{ position: 'absolute', inset: 4, borderRadius: 999, background: 'white' }} />}
                  </span>
                  <div style={{ fontWeight: 500, color: 'var(--ink-900)' }}>{o.label}</div>
                </label>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
            <button className="btn btn-quiet" onClick={() => navigate('/q/6')}>← back</button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost" onClick={() => { update({ flavor: null }); navigate('/q/8'); }}>Skip</button>
              <button className="btn btn-primary" disabled={!selected} onClick={handleNext}>Next →</button>
            </div>
          </div>
        </div>
      </div>
    </MotionPage>
  );
}
