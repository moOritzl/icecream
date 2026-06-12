import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../SurveyContext.jsx';
import MotionPage from '../components/MotionPage.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';

// Values must match VALID_AGES / VALID_GENDERS in server/src/routes/submissions.js
const AGES = [
  { value: '<18',   label: '<18' },
  { value: '18-24', label: '18–24' },
  { value: '25-34', label: '25–34' },
  { value: '35-44', label: '35–44' },
  { value: '45-54', label: '45–54' },
  { value: '55-64', label: '55–64' },
  { value: '65+',   label: '65+' },
];

const GENDERS = [
  { value: 'woman',         label: 'Woman' },
  { value: 'man',           label: 'Man' },
  { value: 'nonbinary',     label: 'Non-binary' },
  { value: 'self_describe', label: 'Self-describe' },
];

function ChipGroup({ options, selected, onToggle }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map(({ value, label }) => {
        const isSel = value === selected;
        return (
          <button key={value}
            onClick={() => onToggle(isSel ? null : value)}
            aria-pressed={isSel}
            className="mono"
            style={{
              padding: '10px 18px', borderRadius: 999, fontSize: 14, cursor: 'pointer',
              border: isSel ? '1.5px solid var(--ink-900)' : '1px solid var(--vanilla-300)',
              background: isSel ? 'var(--ink-900)' : 'var(--vanilla-100)',
              color: isSel ? 'var(--vanilla-50)' : 'var(--ink-700)',
              transition: 'background 0.12s, color 0.12s, border-color 0.12s',
            }}>{label}</button>
        );
      })}
    </div>
  );
}

export default function Demographics() {
  const navigate = useNavigate();
  const direction = useDirection();
  const { ageBucket, gender, update } = useSurvey();
  const [age, setAge] = useState(ageBucket);
  const [gen, setGen] = useState(gender);

  const handleNext = () => {
    update({ ageBucket: age, gender: gen });
    navigate('/q/9');
  };

  const handleSkip = () => {
    update({ ageBucket: null, gender: null });
    navigate('/q/9');
  };

  return (
    <MotionPage direction={direction} variant="slide">
      <div className="scoop-screen survey-page">
        <header className="survey-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScoopCone size={28} scoops={1} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
          </div>
          <div className="eyebrow">QUESTION 3 OF 4 · OPTIONAL</div>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 640, margin: '0 auto', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '8px 0 6px' }}>A little about&nbsp;you.</h1>
          <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: 0 }}>
            Helps us see how scoop joy shifts across groups. Answer either, both, or neither.
          </p>

          <div style={{ marginTop: 32 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Age</div>
            <ChipGroup options={AGES} selected={age} onToggle={setAge} />
          </div>

          <div style={{ marginTop: 28 }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Gender</div>
            <ChipGroup options={GENDERS} selected={gen} onToggle={setGen} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48 }}>
            <button className="btn btn-quiet" onClick={() => navigate('/q/7')}>← back</button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost" onClick={handleSkip}>Skip</button>
              <button className="btn btn-primary" onClick={handleNext}>Next →</button>
            </div>
          </div>
        </div>
      </div>
    </MotionPage>
  );
}
