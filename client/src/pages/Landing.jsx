import { useNavigate } from 'react-router-dom';
import MotionPage from '../components/MotionPage.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';
import scoopsPerson from '../assets/scoops-person.svg';

function TrustCheck() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none"
      stroke="var(--pistachio-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M2 6.5 L5 9 L10 3.5" />
    </svg>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const direction = useDirection();

  return (
    <MotionPage direction={direction} variant="fade">
      <div className="scoop-screen grain survey-page">
        <header className="survey-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScoopCone size={28} scoops={1} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>
            a neuroscience study
          </div>
        </header>

        <div className="landing-hero">
          <h1 className="lh-headline lh-reveal" style={{ '--i': 0 }}>
            Find your sweet&nbsp;spot.
          </h1>

          <p className="lh-lead lh-reveal" style={{ '--i': 1 }}>
            A neuroscience student and a CS student disagree on the perfect scoop
            count. Five sliders, ninety seconds, fully anonymous, and you'll see
            your own joy curve at the end.
          </p>

          <div className="lh-art lh-reveal" style={{ '--i': 2 }}>
            <img className="lh-illus" src={scoopsPerson}
              alt="Person enjoying a large ice cream cone" />
            <p className="lh-quote">"scoop three is where things get complicated."</p>
            <div className="lh-n">n = 1,284 respondents, so far</div>
          </div>

          <div className="lh-cta lh-reveal" style={{ '--i': 3 }}>
            <button className="btn btn-primary" onClick={() => navigate('/consent')}>
              Start the study →
            </button>
          </div>

          <div className="lh-trust lh-reveal" style={{ '--i': 4 }}>
            <span><TrustCheck /> no cookies</span>
            <span><TrustCheck /> no email</span>
            <span><TrustCheck /> delete anytime</span>
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
