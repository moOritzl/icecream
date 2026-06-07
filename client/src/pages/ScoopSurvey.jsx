import { useState, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '../SurveyContext.jsx';
import MotionPage from '../components/MotionPage.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';

const LABELS = ['1 scoop', '2 scoops', '3 scoops', '4 scoops', '5 scoops'];

// Plot insets (px): room for Y labels on the left, X labels + axis title below.
const PLOT = { top: 28, right: 16, bottom: 30, left: 52 };
const Y_TICKS = [0, 100, 200, 300, 400, 500];

// Measure a container element. We render the chart as plain SVG (see JoyChart)
// rather than recharts: recharts 3.x runs an internal ResizeObserver that, when
// the chart is re-rendered during a route transition, falls into an infinite
// "width(-1)/height(-1)" measurement loop. That loop starves React's commit so
// the next page never mounts (blank/stuck page), and — with framer-motion in
// the tree — corrupted an animation ref ("Cannot assign to read only property
// 'current'"). A hand-rolled SVG chart has no observer and no loop.
function useElementSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) setSize(prev => (prev.width === w && prev.height === h ? prev : { width: w, height: h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

// Hand-rolled enjoyment-curve chart. Five points (one per scoop count); points
// 2–5 are draggable vertically to set their % joy. Pure SVG, no chart library.
function JoyChart({ width, height, drafts, activeIdx, chartRef, onDrag }) {
  const plotW = Math.max(0, width - PLOT.left - PLOT.right);
  const plotH = Math.max(0, height - PLOT.top - PLOT.bottom);
  const baseY = PLOT.top + plotH;
  const xAt = (i) => PLOT.left + (plotW * i) / 4;
  const yAt = (pct) => PLOT.top + plotH * (1 - Math.max(0, Math.min(500, pct)) / 500);

  const points = drafts.map((pct, i) => ({
    i, pct,
    x: xAt(i),
    y: yAt(Number.isFinite(pct) ? pct : 0),
  }));
  const linePath = points
    .map((p, k) => `${k === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  // Vertical drag → value. Maps pointer Y within the plot band to 0–500%.
  const startDrag = (index) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    const el = chartRef.current;
    if (!el) return;
    const apply = (clientY) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + PLOT.top;
      const bottom = top + plotH;
      const clamped = Math.max(top, Math.min(bottom, clientY));
      const ratio = 1 - (clamped - top) / (bottom - top);
      onDrag(index, Math.round(Math.max(0, Math.min(500, ratio * 500)) / 5) * 5);
    };
    apply(e.clientY);
    const onMove = (ev) => apply(ev.clientY);
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const MONO = 'JetBrains Mono, monospace';

  return (
    <svg width={width} height={height} style={{ display: 'block', touchAction: 'none' }}>
      {/* Horizontal gridlines + Y labels. 100% is the solid pistachio baseline. */}
      {Y_TICKS.map((t) => {
        const y = yAt(t);
        const base = t === 100;
        return (
          <g key={t}>
            <line x1={PLOT.left} x2={width - PLOT.right} y1={y} y2={y}
              stroke={base ? 'var(--pistachio-200)' : 'var(--vanilla-200)'}
              strokeWidth={base ? 1.5 : 1}
              strokeDasharray={base ? undefined : '2 4'} />
            <text x={PLOT.left - 8} y={y + 4} textAnchor="end"
              fontFamily={MONO} fontSize="10" fill={base ? '#4a7c40' : '#8A7A66'}>{t}%</text>
          </g>
        );
      })}

      {/* X axis line, scoop numbers, and axis title */}
      <line x1={PLOT.left} x2={width - PLOT.right} y1={baseY} y2={baseY} stroke="var(--ink-300)" />
      {[1, 2, 3, 4, 5].map((n, i) => (
        <text key={n} x={xAt(i)} y={baseY + 16} textAnchor="middle"
          fontFamily={MONO} fontSize="11"
          fill={i === activeIdx ? 'var(--strawberry-700)' : 'var(--ink-500)'}>{n}</text>
      ))}
      <text x={PLOT.left + plotW / 2} y={height - 2} textAnchor="middle"
        fontFamily={MONO} fontSize="10" fill="var(--ink-500)">scoops</text>

      {/* The curve */}
      <path d={linePath} fill="none" stroke="var(--strawberry-500)"
        strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

      {/* Points (index 0 locked baseline; 1–4 draggable) */}
      {points.map((p) => {
        const locked = p.i === 0;
        return (
          <g key={p.i}>
            {Number.isFinite(p.pct) && (
              <text x={p.x} y={p.y - 14} textAnchor="middle"
                fontFamily={MONO} fontSize={11}
                fill={locked ? 'var(--pistachio-700)' : 'var(--strawberry-700)'}
                style={{ pointerEvents: 'none', userSelect: 'none' }}>{p.pct}%</text>
            )}
            {!locked && (
              <circle cx={p.x} cy={p.y} r={20} fill="transparent"
                style={{ cursor: 'ns-resize' }} onPointerDown={startDrag(p.i)} />
            )}
            <circle cx={p.x} cy={p.y} r={locked ? 5 : 6}
              fill={locked ? 'var(--pistachio-200)' : 'var(--strawberry-500)'}
              stroke="var(--vanilla-50)" strokeWidth={2} style={{ pointerEvents: 'none' }} />
            {locked && (
              <circle cx={p.x} cy={p.y} r={3} fill="var(--pistachio-700)"
                style={{ pointerEvents: 'none' }} />
            )}
          </g>
        );
      })}
    </svg>
  );
}

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

export default function ScoopSurvey() {
  const navigate   = useNavigate();
  const direction  = useDirection();
  const { answers, update } = useSurvey();
  const chartRef   = useRef(null);
  const { width: chartW, height: chartH } = useElementSize(chartRef);

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

  const setDraft = (idx, value) => {
    setActiveIdx(idx);
    setTouched(prev => new Set([...prev, idx]));
    setDrafts(prev => { const n = [...prev]; n[idx] = value; return n; });
  };

  const handleContinue = () => {
    update({ answers: [...drafts] });
    navigate('/optional');
  };

  return (
    <MotionPage direction={direction} variant="fade">
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
            <div ref={chartRef} style={{ height: 'clamp(240px, 40vh, 340px)', position: 'relative' }}>
              {chartW > 0 && chartH > 0 && (
                <JoyChart width={chartW} height={chartH} drafts={drafts}
                  activeIdx={activeIdx} chartRef={chartRef} onDrag={setDraft} />
              )}
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
            Continue →
          </button>
        </div>

        <footer style={{
          marginTop: 16, display: 'flex', justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)',
        }}>
          <span>drag the dots on the chart or use the sliders</span>
        </footer>

      </div>
      </div>
    </MotionPage>
  );
}
