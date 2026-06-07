import { useNavigate } from 'react-router-dom';
import MotionPage from '../components/MotionPage.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';
import scoopsPerson from '../assets/scoops-person.svg';

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
            <div className="eyebrow">sweet data</div>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', margin: '12px 0 18px', maxWidth: 540 }}>
              Find your sweet&nbsp;spot.
            </h1>
            <p style={{ fontSize: 19, color: 'var(--ink-700)', maxWidth: 480, lineHeight: 1.55, marginTop: 0 }}>
              A neuroscience student and a CS student disagree about the optimal
              scoop count. Help us settle it. Five sliders, ninety seconds, totally
              anonymous — and you'll get your personal joy curve at the end.
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
            <img
              src={scoopsPerson}
              alt="Person enjoying a large ice cream cone"
              style={{ width: '100%', maxWidth: 340, height: 'auto' }}
            />
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 18, color: 'var(--ink-700)', marginTop: 8, textAlign: 'center' }}>
              "scoop three is where things get complicated."
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
