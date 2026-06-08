import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../SurveyContext.jsx';
import MotionPage from '../components/MotionPage.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import FlavorIcon from '../components/FlavorIcon.jsx';
import { useDirection } from '../hooks/useDirection.js';

// Each flavor carries its own color palette (CSS vars) and a decoration that
// animates in on select. `deco` picks which extra layer(s) render on the card.
const OPTIONS = [
  { id: 'vanilla',       label: 'Vanilla',       deco: 'drip',         bg: '#FFFBEA', border: '#D4B84A', accent: '#C9A227', text: '#7A5C00' },
  { id: 'chocolate',     label: 'Chocolate',     deco: 'icon',         bg: '#F5EAE0', border: '#9B6645', accent: '#7B4F2E', text: '#4A2800' },
  { id: 'stracciatella', label: 'Stracciatella', deco: 'chips',        bg: '#F9F5ED', border: '#B8A080', accent: '#8B6E4A', text: '#3D2B10' },
  { id: 'strawberry',    label: 'Strawberry',    deco: 'bloom-icon',   bg: '#FFF0F4', border: '#E07090', accent: '#C94070', text: '#7A1035' },
  { id: 'lemon',         label: 'Lemon',         deco: 'icon',         bg: '#FEFCE0', border: '#D4C020', accent: '#B8A000', text: '#5A4A00' },
  { id: 'yoghurt',       label: 'Yoghurt',       deco: 'milk-icon',    bg: '#EEF2FF', border: '#8090C0', accent: '#5060A0', text: '#1A2560' },
  { id: 'cookie',        label: 'Cookie',        deco: 'crumbs-icon',  bg: '#F8EDD8', border: '#B08050', accent: '#8B6030', text: '#4A2E08' },
  { id: 'other',         label: 'Other',         deco: 'icon',         bg: '#F0F0F0', border: '#909090', accent: '#606060', text: '#282828' },
];

// Stracciatella chip positions (scatter across the right half of the card).
const CHIPS = [
  { left: '56%', top: '20%', rot: '-20deg', dur: '0.40s', delay: '0s' },
  { left: '70%', top: '32%', rot: '35deg',  dur: '0.42s', delay: '0.04s' },
  { left: '60%', top: '52%', rot: '-10deg', dur: '0.38s', delay: '0.08s' },
  { left: '78%', top: '24%', rot: '50deg',  dur: '0.44s', delay: '0.02s' },
  { left: '74%', top: '56%', rot: '-40deg', dur: '0.40s', delay: '0.06s' },
  { left: '84%', top: '40%', rot: '15deg',  dur: '0.37s', delay: '0.10s' },
];

// Cookie crumb positions (small dots that pop and drift outward).
const CRUMBS = [
  { left: '52%', top: '30%', size: 4, tx: '10px', ty: '-8px', dur: '0.38s', delay: '0s' },
  { left: '60%', top: '52%', size: 5, tx: '8px',  ty: '10px', dur: '0.42s', delay: '0.04s' },
  { left: '68%', top: '36%', size: 3, tx: '12px', ty: '-4px', dur: '0.40s', delay: '0.07s' },
];

function FlavorCard({ option, selected, onSelect }) {
  const { id, label, deco } = option;
  const showIcon = deco.includes('icon');

  const style = {
    '--flavor-bg': option.bg,
    '--flavor-border': option.border,
    '--flavor-accent': option.accent,
    '--flavor-text': option.text,
  };

  return (
    <label className={`flavor-card${selected ? ' selected' : ''}`} style={style}>
      <input
        type="radio"
        name="flavor"
        value={id}
        checked={selected}
        onChange={() => onSelect(id)}
        style={{ display: 'none' }}
      />

      {deco === 'milk-icon' && <div className="flavor-milk" />}
      {deco === 'bloom-icon' && <div className="flavor-bloom" />}
      {deco === 'drip' && <div className="flavor-drip" />}

      {deco === 'chips' && CHIPS.map((c, i) => (
        <div key={i} className="flavor-chip"
          style={{ left: c.left, top: c.top, '--rot': c.rot, '--dur': c.dur, '--delay': c.delay }} />
      ))}

      {deco === 'crumbs-icon' && CRUMBS.map((c, i) => (
        <div key={i} className="flavor-crumb"
          style={{ left: c.left, top: c.top, width: c.size, height: c.size, '--tx': c.tx, '--ty': c.ty, '--dur': c.dur, '--delay': c.delay }} />
      ))}

      <span className="flavor-radio" />
      <span className="flavor-label">{label}</span>

      {showIcon && (
        <span className="flavor-icon"><FlavorIcon flavor={id} /></span>
      )}
    </label>
  );
}

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
      <div className="scoop-screen survey-page">
        <header className="survey-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScoopCone size={28} scoops={1} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
          </div>
          <div className="eyebrow">QUESTION 2 OF 3 · OPTIONAL</div>
        </header>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 640, margin: '0 auto', width: '100%' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', margin: '8px 0 6px' }}>If forced to pick&nbsp;one.</h1>
          <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: 0 }}>One only. Don't be diplomatic.</p>

          <div className="flavor-grid" style={{ marginTop: 28 }}>
            {OPTIONS.map((o) => (
              <FlavorCard key={o.id} option={o} selected={o.id === selected} onSelect={setSelected} />
            ))}
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
