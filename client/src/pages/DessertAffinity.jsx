import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../SurveyContext.jsx';
import MotionPage from '../components/MotionPage.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';

export default function DessertAffinity() {
  const navigate = useNavigate();
  const direction = useDirection();
  const { affinity, update } = useSurvey();
  const [selected, setSelected] = useState(affinity);

  const handleNext = () => {
    update({ affinity: selected });
    navigate('/q/7');
  };

  return (
    <MotionPage direction={direction} variant="slide">
      <div className="scoop-screen" style={{ padding: 36, display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScoopCone size={28} scoops={1} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
          </div>
          <div className="eyebrow">QUESTION 06 OF 08 · OPTIONAL</div>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 720, margin: '0 auto', width: '100%' }}>
          <div className="eyebrow" style={{ color: 'var(--strawberry-700)' }}>Sweet tooth, calibrated</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', margin: '8px 0 6px' }}>How much of a dessert person are&nbsp;you?</h1>
          <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: 0, maxWidth: 540 }}>
            1 = "I'd rather have soup." 10 = "Dessert first, dinner if there's time."
          </p>

          <div style={{ marginTop: 44 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {Array.from({ length: 10 }, (_, i) => {
                const n = i + 1;
                const isSel = n === selected;
                return (
                  <button key={n}
                    onClick={() => setSelected(n)}
                    style={{
                      flex: 1, height: 60, borderRadius: 12,
                      border: isSel ? '2px solid var(--ink-900)' : '1px solid var(--vanilla-200)',
                      background: isSel ? 'var(--pistachio-500)' : 'var(--vanilla-100)',
                      color: isSel ? 'white' : 'var(--ink-900)',
                      fontFamily: 'var(--font-display)', fontStyle: 'italic',
                      fontSize: 28, cursor: 'pointer',
                      boxShadow: isSel ? 'var(--shadow-md)' : 'none',
                      transition: 'background 0.12s, border-color 0.12s',
                    }}>{n}</button>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10,
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>
              <span>1 · soup person</span>
              <span>5 · neutral</span>
              <span>10 · dessert maximalist</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48 }}>
            <button className="btn btn-quiet" onClick={() => navigate('/optional')}>← back</button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost" onClick={() => { update({ affinity: null }); navigate('/q/7'); }}>Skip</button>
              <button className="btn btn-primary" disabled={selected == null} onClick={handleNext}>Next →</button>
            </div>
          </div>
        </div>
      </div>
    </MotionPage>
  );
}
