import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSurvey } from '../SurveyContext.jsx';
import MotionPage from '../components/MotionPage.jsx';
import ScoopSlider from '../components/ScoopSlider.jsx';
import CurveChart from '../components/CurveChart.jsx';
import ProgressDots from '../components/ProgressDots.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';

const QUESTIONS = [
  { n: 1, label: '1 scoop',  prompt: 'How much joy does 1 scoop bring you?', anchor: 'baseline · we anchor everything to this' },
  { n: 2, label: '2 scoops', prompt: 'How about 2 scoops?',                  anchor: 'twice as much ice cream — but twice the joy?' },
  { n: 3, label: '3 scoops', prompt: 'Now 3 scoops, stacked.',               anchor: 'still going up? plateauing? declining?' },
  { n: 4, label: '4 scoops', prompt: '4 scoops, getting serious.',           anchor: "be honest — you don't have to finish it" },
  { n: 5, label: '5 scoops', prompt: 'And finally, 5 scoops.',              anchor: 'last one. then we let you go.' },
];

export default function ScoopQuestion() {
  const { step } = useParams();
  const navigate = useNavigate();
  const direction = useDirection();
  const { answers, setAnswer } = useSurvey();
  const idx = parseInt(step, 10) - 1;
  const q = QUESTIONS[idx];

  const [draft, setDraft] = useState(() => answers[idx] ?? 100);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  if (!q) return null;

  const displayAnswers = answers.map((v, i) => i === idx ? draft : v);
  const done = answers.filter(a => a != null).length;

  const handleNext = () => {
    setAnswer(idx, draft);
    if (idx === 4) navigate('/optional');
    else navigate(`/q/${idx + 2}`);
  };

  const handleBack = () => {
    if (idx === 0) navigate('/consent');
    else navigate(`/q/${idx}`);
  };

  return (
    <MotionPage direction={direction} variant="slide">
      <div className="scoop-screen" style={{ display: 'flex', flexDirection: 'column', padding: 36, minHeight: '100dvh' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScoopCone size={32} scoops={1} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
          </div>
          <div className="eyebrow" style={{ fontSize: 11 }}>QUESTION 0{idx + 1} OF 05</div>
        </header>

        <div style={{ marginTop: 20 }}>
          <ProgressDots total={5} current={idx} answers={answers} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'var(--scoop-grid-cols, 1.1fr 1fr)',
          gap: 40,
          marginTop: 44, flex: 1, alignItems: 'start',
        }} className="scoop-body-grid">
          <div>
            <div className="eyebrow" style={{ color: 'var(--strawberry-700)' }}>{q.label}</div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', margin: '8px 0 4px' }}>{q.prompt}</h1>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: 8 }}>
              <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: 0, maxWidth: 460 }}>
                {q.anchor}{' '}
                <button
                  style={{ border: 'none', background: 'none', padding: 0, borderBottom: '1.5px dotted var(--ink-500)', cursor: 'help', fontSize: 15, color: 'var(--ink-700)', fontFamily: 'inherit' }}
                  onClick={() => setTooltipOpen(o => !o)}
                  onBlur={() => setTooltipOpen(false)}
                >
                  What does 100% mean?
                </button>
              </p>
              {tooltipOpen && (
                <div role="tooltip" style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                  background: 'var(--ink-900)', color: 'var(--vanilla-50)',
                  padding: '10px 14px', borderRadius: 10, maxWidth: 320, fontSize: 13, lineHeight: 1.5,
                  boxShadow: 'var(--shadow-md)', zIndex: 5,
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: .7, marginBottom: 4 }}>WHY %?</div>
                  100% = exactly the same joy you got from your 1st scoop. 200% = double.
                  50% = half. We use a ratio so we can compare across people who started
                  from very different baselines.
                </div>
              )}
            </div>

            <div style={{
              margin: '32px 0 12px',
              display: 'flex', alignItems: 'flex-end', gap: 12, height: 140,
            }}>
              {Array.from({ length: q.n }, (_, i) => (
                <div key={i} style={{
                  width: 72, height: 72, borderRadius: 999,
                  background: i % 2 === 0 ? 'var(--pistachio-200)' : 'var(--strawberry-200)',
                  border: '2px solid var(--ink-900)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontStyle: 'italic',
                  fontSize: 26, color: 'var(--ink-900)',
                  transform: `translateY(${-i * 6}px) rotate(${i % 2 ? -3 : 3}deg)`,
                }}>{i + 1}</div>
              ))}
            </div>

            <ScoopSlider value={draft} onChange={setDraft} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 }}>
              <button className="btn btn-quiet" onClick={handleBack} disabled={false}>
                ← back
              </button>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="caption">{done}/5 answered</span>
                <button className="btn btn-primary" onClick={handleNext}>
                  {idx === 4 ? 'See your curve' : 'Next scoop'} →
                </button>
              </div>
            </div>
          </div>

          <div className="card scoop-chart-panel" style={{ padding: 20, alignSelf: 'stretch' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div className="eyebrow">Your curve so far</div>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>%enjoyment ÷ scoops</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <CurveChart answers={displayAnswers} currentIdx={idx} width={360} height={240} />
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.5 }}>
              {done === 0 && "Drag the slider on the left. We'll draw your enjoyment curve here in real time."}
              {done === 1 && "Nice — one point down, four to go. You'll see the shape of your curve emerge."}
              {done >= 2 && done < 5 && "Your curve is starting to take shape. Is it climbing, flattening, or already turning down?"}
              {done === 5 && "Complete. Compare to the population average on the next screen."}
            </div>
          </div>
        </div>

        <footer style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>
          <span>← / → ±5 · shift+← / → ±25</span>
          <span>~ 90 sec total</span>
        </footer>
      </div>
    </MotionPage>
  );
}
