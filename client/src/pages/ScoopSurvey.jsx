import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ReferenceDot, ResponsiveContainer,
} from 'recharts';
import { useSurvey } from '../SurveyContext.jsx';
import MotionPage from '../components/MotionPage.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';

const LABELS = ['1 scoop', '2 scoops', '3 scoops', '4 scoops', '5 scoops'];
const CHART_MARGIN = { top: 28, right: 16, bottom: 20, left: 0 };

function CompactSlider({ value, onChange, locked }) {
  const trackRef = useRef(null);
  const pct = (value / 500) * 100;

  const onDown = (e) => {
    if (locked) return;
    e.preventDefault();
    trackRef.current.setPointerCapture(e.pointerId);
    const update = (cx) => {
      const r = trackRef.current.getBoundingClientRect();
      onChange(Math.round((Math.max(0, Math.min(1, (cx - r.left) / r.width)) * 500) / 5) * 5);
    };
    update(e.clientX);
    const move = (ev) => update(ev.clientX);
    const up = () => {
      trackRef.current?.releasePointerCapture?.(e.pointerId);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div ref={trackRef} onPointerDown={onDown} style={{
      position: 'relative', height: 32, display: 'flex', alignItems: 'center',
      cursor: locked ? 'default' : 'ew-resize', touchAction: 'none',
    }}>
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 5, borderRadius: 999,
        background: locked
          ? 'var(--vanilla-200)'
          : `linear-gradient(to right, var(--pistachio-200) 0%, var(--pistachio-200) ${pct}%, var(--vanilla-200) ${pct}%, var(--vanilla-200) 100%)`,
      }} />
      <div style={{
        position: 'absolute', left: '20%', transform: 'translateX(-50%)',
        width: 1, height: 12,
        background: locked ? 'var(--vanilla-200)' : 'var(--pistachio-500)',
        borderRadius: 1,
      }} />
      {locked ? (
        <div style={{
          position: 'absolute', left: `${pct}%`, transform: 'translateX(-50%)',
          width: 10, height: 10, borderRadius: 999,
          background: 'var(--pistachio-500)', border: '2px solid var(--pistachio-700)',
        }} />
      ) : (
        <div style={{
          position: 'absolute', left: `${pct}%`, transform: 'translateX(-50%)',
          width: 22, height: 22, borderRadius: 999,
          border: '2px solid var(--ink-900)', background: 'var(--vanilla-50)',
          boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', pointerEvents: 'none',
        }}>
          <div style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--strawberry-500)' }} />
        </div>
      )}
    </div>
  );
}

// Draggable chart dot — vertical drag maps pointer Y to data value
function DraggableDot({ cx, cy, value, index, chartRef, onDrag }) {
  if (cx == null || cy == null) return null;
  const locked = index === 0;

  const onDown = (e) => {
    if (locked) return;
    e.preventDefault();
    e.stopPropagation();
    const container = chartRef.current;
    if (!container) return;

    const update = (clientY) => {
      const rect = container.getBoundingClientRect();
      const plotTop    = rect.top    + CHART_MARGIN.top;
      const plotBottom = rect.bottom - CHART_MARGIN.bottom;
      const clamped = Math.max(plotTop, Math.min(plotBottom, clientY));
      const ratio   = 1 - (clamped - plotTop) / (plotBottom - plotTop);
      onDrag(index, Math.round(Math.max(0, Math.min(500, ratio * 500)) / 5) * 5);
    };

    update(e.clientY);
    const move = (ev) => update(ev.clientY);
    const up   = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <g>
      {value != null && (
        <text x={cx} y={cy - 14} textAnchor="middle"
          fontFamily="JetBrains Mono, monospace" fontSize={11}
          fill={locked ? 'var(--pistachio-700)' : 'var(--strawberry-700)'}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >{value}%</text>
      )}
      {/* Invisible drag handle */}
      {!locked && (
        <circle cx={cx} cy={cy} r={20} fill="transparent"
          style={{ cursor: 'ns-resize' }} onPointerDown={onDown} />
      )}
      {/* Visible dot */}
      <circle cx={cx} cy={cy} r={locked ? 5 : 6}
        fill={locked ? 'var(--pistachio-200)' : 'var(--strawberry-500)'}
        stroke="var(--vanilla-50)" strokeWidth={2}
        style={{ pointerEvents: 'none' }}
      />
      {locked && (
        <circle cx={cx} cy={cy} r={3} fill="var(--pistachio-700)"
          style={{ pointerEvents: 'none' }} />
      )}
    </g>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length || payload[0].value == null) return null;
  return (
    <div style={{
      background: 'var(--ink-900)', color: 'var(--vanilla-50)',
      padding: '5px 12px', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 12,
      boxShadow: 'var(--shadow-md)', pointerEvents: 'none',
      display: 'flex', gap: 8, alignItems: 'baseline',
    }}>
      <span style={{ opacity: 0.5, fontSize: 10 }}>{label} scoop{label > 1 ? 's' : ''}</span>
      <strong style={{ fontSize: 13 }}>{payload[0].value}%</strong>
    </div>
  );
}

function YAxisTick({ x, y, payload }) {
  if (!payload) return null;
  return (
    <text x={x - 4} y={y + 4} textAnchor="end"
      fill={payload.value === 100 ? '#4a7c40' : '#8A7A66'}
      fontFamily="JetBrains Mono, monospace" fontSize="10"
    >{payload.value}%</text>
  );
}

function XTick({ x, y, payload, currentIdx = 0 }) {
  return (
    <text x={x} y={y + 14} textAnchor="middle" style={{
      fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
      fill: payload.value === currentIdx + 1 ? 'var(--strawberry-700)' : 'var(--ink-500)',
    }}>{payload.value}</text>
  );
}

export default function ScoopSurvey() {
  const navigate   = useNavigate();
  const direction  = useDirection();
  const { answers, setAnswer } = useSurvey();
  const chartRef   = useRef(null);

  // All scoops start at 100% so every dot is immediately visible and draggable.
  // "touched" tracks which ones the user has intentionally set.
  const [drafts, setDrafts] = useState(() => {
    const d = answers.map(v => v ?? 100);
    d[0] = 100;
    return d;
  });
  const [touched,   setTouched]   = useState(() => new Set([0]));
  const [activeIdx, setActiveIdx] = useState(1);

  const allDone = touched.size === 5;
  const data    = drafts.map((pct, i) => ({ scoop: i + 1, pct }));

  const setDraft = (idx, value) => {
    setActiveIdx(idx);
    setTouched(prev => new Set([...prev, idx]));
    setDrafts(prev => { const n = [...prev]; n[idx] = value; return n; });
  };

  const handleContinue = () => {
    drafts.forEach((v, i) => setAnswer(i, v));
    navigate('/optional');
  };

  return (
    <MotionPage direction={direction} variant="slide">
      <div style={{ minHeight: '100dvh', padding: '24px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 1200 }}>

        {/* Header */}
        <header style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 20, flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScoopCone size={32} scoops={1} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
          </div>
          <div className="eyebrow" style={{ fontSize: 11 }}>SCOOP QUESTIONS · 5</div>
        </header>

        {/* Hero split: chart left, sliders right */}
        <div className="survey-hero-grid">

          {/* Chart column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              marginBottom: 6, paddingLeft: 52, paddingRight: 4,
            }}>
              <span className="eyebrow">your enjoyment curve</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>% joy ÷ scoops</span>
            </div>
            <div ref={chartRef} style={{ flex: 1, minHeight: 'clamp(240px, 40vh, 340px)', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={CHART_MARGIN}>
                  <CartesianGrid strokeDasharray="2 4" stroke="var(--vanilla-200)" vertical={false} />
                  <ReferenceLine y={100} stroke="var(--pistachio-200)" strokeWidth={1.5} />
                  <XAxis dataKey="scoop" tick={<XTick currentIdx={activeIdx} />}
                    tickLine={false} axisLine={{ stroke: 'var(--ink-300)' }} interval={0}
                    label={{ value: 'scoops', position: 'insideBottom', offset: -6,
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: 'var(--ink-500)' }}
                  />
                  <YAxis domain={[0, 500]} allowDataOverflow ticks={[0, 100, 200, 300, 400, 500]}
                    tick={<YAxisTick />} tickLine={false} axisLine={false} width={52} />
                  <Tooltip content={<CustomTooltip />}
                    cursor={{ stroke: 'var(--ink-300)', strokeWidth: 1, strokeDasharray: '2 3' }} />
                  <ReferenceDot x={1} y={100} r={4}
                    fill="var(--pistachio-200)" stroke="var(--pistachio-700)" strokeWidth={1.2} />
                  <Line type="monotone" dataKey="pct"
                    stroke="var(--strawberry-500)" strokeWidth={2.5}
                    dot={<DraggableDot chartRef={chartRef} onDrag={setDraft} />}
                    activeDot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sliders column */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-300)',
              textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              or use the sliders
            </div>

            {LABELS.map((label, i) => {
              const locked    = i === 0;
              const value     = drafts[i];
              const isTouched = touched.has(i);
              return (
                <div key={i}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    marginBottom: 4,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 11,
                      color: locked ? 'var(--ink-300)' : isTouched ? 'var(--ink-700)' : 'var(--ink-500)',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                    }}>{label}</span>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: isTouched ? 600 : 400,
                      color: locked ? 'var(--pistachio-700)' : isTouched ? 'var(--strawberry-700)' : 'var(--ink-400)',
                    }}>
                      {locked ? '100% · baseline' : `${value}%`}
                    </span>
                  </div>
                  <CompactSlider value={value} onChange={(v) => setDraft(i, v)} locked={locked} />
                </div>
              );
            })}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="caption">{touched.size}/5 set</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-300)' }}>
                0% · hated it &nbsp;·&nbsp; 500% · five-fold joy
              </span>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
          <button className="btn btn-quiet" onClick={() => navigate('/consent')}>← back</button>
          <button className="btn btn-primary" onClick={handleContinue}
            disabled={!allDone}
            style={!allDone ? { opacity: 0.45, cursor: 'default', pointerEvents: 'none' } : {}}>
            See your curve →
          </button>
        </div>

        <footer style={{
          marginTop: 16, display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)',
        }}>
          <span>drag the dots on the chart or use the sliders</span>
          <span>~ 90 sec total</span>
        </footer>

      </div>
      </div>
    </MotionPage>
  );
}
