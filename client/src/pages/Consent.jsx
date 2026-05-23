import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../SurveyContext.jsx';
import MotionPage from '../components/MotionPage.jsx';
import { useDirection } from '../hooks/useDirection.js';

function Bullet({ children }) {
  return (
    <li style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: '1px solid var(--vanilla-200)' }}>
      <span style={{
        flex: '0 0 22px', width: 22, height: 22, marginTop: 2, borderRadius: 999,
        background: 'var(--pistachio-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--pistachio-700)" strokeWidth="2" strokeLinecap="round">
          <path d="M2 6.5 L5 9 L10 3.5" />
        </svg>
      </span>
      <span style={{ fontSize: 15, color: 'var(--ink-900)', lineHeight: 1.5 }}>{children}</span>
    </li>
  );
}

export default function Consent() {
  const navigate = useNavigate();
  const direction = useDirection();
  const { update } = useSurvey();
  const [checked, setChecked] = useState(false);

  const handleStart = () => {
    update({ consent: true });
    navigate('/q/scoop');
  };

  return (
    <MotionPage direction={direction} variant="fade">
      <div className="scoop-screen" style={{ padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100dvh' }}>
        <div style={{ maxWidth: 560, width: '100%' }}>
          <div className="eyebrow">Before we start</div>
          <h1 style={{ fontSize: 48, margin: '12px 0 8px' }}>The fine print, kept short.</h1>
          <p style={{ fontSize: 15, color: 'var(--ink-700)', marginTop: 0, lineHeight: 1.6 }}>
            We have to ask. Your participation needs to be informed and entirely voluntary.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', borderBottom: '1px solid var(--vanilla-200)' }}>
            <Bullet><b>It takes about 90 seconds.</b> Five slider questions, plus three optional ones at the end.</Bullet>
            <Bullet><b>We store nothing identifying.</b> No email, no IP, no cookies. Just your slider answers and an anonymous ID.</Bullet>
            <Bullet><b>You can leave any time.</b> Close the tab and nothing is saved until you click "submit."</Bullet>
            <Bullet><b>You can delete your data later.</b> We'll give you a one-time deletion token at the end. Hold onto it.</Bullet>
            <Bullet><b>Results may be published</b> in aggregate, in academic and popular venues. Never the raw responses.</Bullet>
          </ul>

          <label style={{
            display: 'flex', gap: 14, padding: 20, marginTop: 24, alignItems: 'flex-start',
            background: checked ? 'var(--pistachio-50)' : 'var(--vanilla-100)',
            border: `1px solid ${checked ? 'var(--pistachio-200)' : 'var(--vanilla-200)'}`,
            borderRadius: 12, cursor: 'pointer', transition: 'background 0.15s, border-color 0.15s',
          }}>
            <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}
              style={{ display: 'none' }} />
            <span style={{
              flex: '0 0 22px', width: 22, height: 22, marginTop: 2,
              borderRadius: 6, border: `2px solid ${checked ? 'var(--pistachio-700)' : 'var(--ink-400)'}`,
              background: checked ? 'var(--pistachio-500)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s, border-color 0.15s',
            }}>
              {checked && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M2 6.5 L5 9 L10 3.5" />
                </svg>
              )}
            </span>
            <span style={{ fontSize: 15, color: 'var(--ink-900)' }}>
              I'm at least 13 years old, I've read the above, and I'd like to help. Pass me the ice cream.
            </span>
          </label>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, alignItems: 'center' }}>
            <button className="btn btn-quiet" onClick={() => navigate('/')}>← back</button>
            <button className="btn btn-primary" disabled={!checked} onClick={handleStart}>
              Start the survey →
            </button>
          </div>
        </div>
      </div>
    </MotionPage>
  );
}
