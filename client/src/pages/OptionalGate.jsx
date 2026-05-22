import { useNavigate } from 'react-router-dom';
import MotionPage from '../components/MotionPage.jsx';
import Glyph from '../components/Glyph.jsx';
import { useDirection } from '../hooks/useDirection.js';

export default function OptionalGate() {
  const navigate = useNavigate();
  const direction = useDirection();

  return (
    <MotionPage direction={direction} variant="fade">
      <div className="scoop-screen" style={{
        padding: 48, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', minHeight: '100dvh',
      }}>
        <div style={{ maxWidth: 580, width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Glyph kind="cherry" size={56} color="var(--strawberry-700)" />
          </div>
          <div className="eyebrow" style={{ color: 'var(--strawberry-700)', marginTop: 16 }}>OPTIONAL · ABOUT 30 SECONDS</div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', margin: '12px 0 6px' }}>The cherry on&nbsp;top.</h1>
          <p style={{ fontSize: 17, color: 'var(--ink-700)', margin: '0 auto', maxWidth: 460, lineHeight: 1.55 }}>
            You've answered the main study. The next three questions help us
            slice the data by flavor preference and price sensitivity — they're
            useful but not required. Skip if you want.
          </p>

          <div style={{
            margin: '36px 0',
            height: 1,
            backgroundImage: 'linear-gradient(to right, var(--ink-300) 50%, transparent 50%)',
            backgroundSize: '12px 1px',
            backgroundRepeat: 'repeat-x',
          }} />

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-ghost" onClick={() => navigate('/q/8')}>Skip to the end</button>
            <button className="btn btn-primary" onClick={() => navigate('/q/6')}>Three more questions →</button>
          </div>

          <div className="caption" style={{ marginTop: 20 }}>
            You'll get your personal curve either way.
          </div>
        </div>
      </div>
    </MotionPage>
  );
}
