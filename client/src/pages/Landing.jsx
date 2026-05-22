import { useNavigate } from 'react-router-dom';
import MotionPage from '../components/MotionPage.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';

export default function Landing() {
  const navigate = useNavigate();
  const direction = useDirection();

  return (
    <MotionPage direction={direction} variant="fade">
      <div className="scoop-screen grain" style={{ padding: 48, display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScoopCone size={28} scoops={1} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>
            a neuroscience study · since 2026
          </div>
        </header>

        <div style={{
          flex: 1, marginTop: 36,
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center',
        }} className="hero-grid">
          <div>
            <div className="eyebrow">An ice-cream-flavored study</div>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', margin: '12px 0 18px', maxWidth: 540 }}>
              How much is too&nbsp;much&nbsp;ice&nbsp;cream?
            </h1>
            <p style={{ fontSize: 19, color: 'var(--ink-700)', maxWidth: 480, lineHeight: 1.55, marginTop: 0 }}>
              We're a small lab studying how additional scoops change the joy you
              get from a dessert. Five sliders, ninety seconds, totally anonymous.
              At the end, you'll see your personal "joy curve" against everyone else's.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 32, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ padding: '14px 28px', fontSize: 16 }}
                onClick={() => navigate('/consent')}>
                Start the study →
              </button>
            </div>

            <div style={{ display: 'flex', gap: 28, marginTop: 36, fontSize: 13, color: 'var(--ink-700)' }}>
              <span>✓ no cookies</span>
              <span>✓ no email</span>
              <span>✓ delete anytime</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ScoopCone size={320} scoops={3} />
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 18, color: 'var(--ink-700)', marginTop: 8, textAlign: 'center' }}>
              "the third scoop is a different animal"
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 4 }}>
              — n = 1,284 respondents, so far
            </div>
          </div>
        </div>

        <footer style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-500)' }}>
          <span>
            <a href="/privacy" style={{ color: 'inherit' }}>privacy</a>
            {' · '}
            <a href="mailto:contact@lenhard.xyz" style={{ color: 'inherit' }}>contact</a>
          </span>
        </footer>
      </div>
    </MotionPage>
  );
}
