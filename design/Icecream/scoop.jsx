/* eslint-disable */
// ──────────────────────────────────────────────────────────────
// The heart of the survey: the scoop-value question.
// Slider 0-500%, live chart of running curve, tooltip on the unit.
// Three states: Q1 only, Q3 in progress, all five answered.
// ──────────────────────────────────────────────────────────────

const SCOOP_QUESTIONS = [
  { n: 1, label: '1 scoop',  prompt: 'How much joy does 1 scoop bring you?', anchor: 'baseline · we anchor everything to this' },
  { n: 2, label: '2 scoops', prompt: 'How about 2 scoops?',                  anchor: 'twice as much ice cream — but twice the joy?' },
  { n: 3, label: '3 scoops', prompt: 'Now 3 scoops, stacked.',               anchor: 'still going up? plateauing? declining?' },
  { n: 4, label: '4 scoops', prompt: '4 scoops, getting serious.',           anchor: 'be honest — you don\'t have to finish it' },
  { n: 5, label: '5 scoops', prompt: 'And finally, 5 scoops.',               anchor: 'last one. then we let you go.' },
];

// ── chart ──────────────────────────────────────────────────────
function CurveChart({ answers, currentIdx, width = 320, height = 220, mini = false }) {
  // chart space: x in [0.5, 5.5], y in [0, 500]
  const padL = mini ? 28 : 36, padR = 14, padT = 14, padB = mini ? 22 : 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const xOf = (n) => padL + ((n - 0.5) / 5) * innerW;
  const yOf = (v) => padT + innerH - (Math.min(500, Math.max(0, v)) / 500) * innerH;

  // gridlines
  const yTicks = [0, 100, 200, 300, 400, 500];
  // build polyline through answered points
  const pts = answers.map((v, i) => v == null ? null : [xOf(i + 1), yOf(v)]).filter(Boolean);
  const path = pts.length >= 2 ? 'M ' + pts.map((p) => p.join(' ')).join(' L ') : null;

  return (
    <svg width={width} height={height} style={{ overflow: 'visible', display: 'block' }}>
      {/* y-axis label values */}
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={width - padR} y1={yOf(t)} y2={yOf(t)}
            stroke={t === 100 ? 'var(--pistachio-200)' : 'var(--vanilla-200)'}
            strokeDasharray={t === 100 ? '0' : '2 4'}
            strokeWidth={t === 100 ? 1.5 : 1} />
          <text x={padL - 8} y={yOf(t) + 4} textAnchor="end"
            fontFamily="JetBrains Mono" fontSize={mini ? 9 : 10}
            fill={t === 100 ? 'var(--pistachio-700)' : 'var(--ink-500)'}>{t}{mini ? '' : '%'}</text>
        </g>
      ))}
      {/* x-axis */}
      <line x1={padL} x2={width - padR} y1={yOf(0)} y2={yOf(0)} stroke="var(--ink-300)" />
      {[1, 2, 3, 4, 5].map((n) => (
        <g key={n}>
          <line x1={xOf(n)} x2={xOf(n)} y1={yOf(0)} y2={yOf(0) + 4} stroke="var(--ink-300)" />
          <text x={xOf(n)} y={yOf(0) + 16} textAnchor="middle"
            fontFamily="JetBrains Mono" fontSize={mini ? 9 : 10}
            fill={n === currentIdx + 1 ? 'var(--strawberry-700)' : 'var(--ink-500)'}>{n}</text>
        </g>
      ))}
      {/* 100% reference dot */}
      <circle cx={xOf(1)} cy={yOf(100)} r={3} fill="var(--pistachio-200)" stroke="var(--pistachio-700)" strokeWidth="1.2" />

      {/* path */}
      {path && <path d={path} fill="none" stroke="var(--strawberry-500)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
      {answers.map((v, i) => v == null ? null : (
        <g key={i}>
          <circle cx={xOf(i + 1)} cy={yOf(v)} r={4} fill="var(--strawberry-500)" stroke="var(--vanilla-50)" strokeWidth="1.6" />
          {!mini && (
            <text x={xOf(i + 1)} y={yOf(v) - 10} textAnchor="middle"
              fontFamily="JetBrains Mono" fontSize="10" fill="var(--strawberry-700)">{v}%</text>
          )}
        </g>
      ))}
      {/* axis caption */}
      {!mini && (
        <text x={padL + innerW / 2} y={height - 4} textAnchor="middle"
          fontFamily="JetBrains Mono" fontSize="10" fill="var(--ink-500)">scoops</text>
      )}
    </svg>
  );
}

// ── slider ─────────────────────────────────────────────────────
function ScoopSlider({ value, onChange, disabled }) {
  const trackRef = React.useRef(null);
  const pct = (value / 500) * 100;
  const ticks = [0, 100, 200, 300, 400, 500];

  const setFromClientX = (cx) => {
    const r = trackRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (cx - r.left) / r.width));
    onChange(Math.round((p * 500) / 5) * 5);
  };

  const onDown = (e) => {
    if (disabled) return;
    e.preventDefault();
    trackRef.current.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
    const move = (ev) => setFromClientX(ev.clientX);
    const up = () => {
      trackRef.current?.releasePointerCapture?.(e.pointerId);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  const onKey = (e) => {
    if (disabled) return;
    const big = e.shiftKey ? 25 : 5;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); onChange(Math.max(0, value - big)); }
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); onChange(Math.min(500, value + big)); }
    if (e.key === 'Home') { e.preventDefault(); onChange(0); }
    if (e.key === 'End') { e.preventDefault(); onChange(500); }
  };

  return (
    <div style={{ width: '100%' }}>
      <div ref={trackRef} onPointerDown={onDown}
        style={{ position: 'relative', height: 56, padding: '24px 0', cursor: disabled ? 'default' : 'pointer', touchAction: 'none' }}>
        {/* track */}
        <div style={{ position: 'relative', height: 8, borderRadius: 999,
          background: 'linear-gradient(to right, var(--pistachio-200) 0%, var(--pistachio-200) 20%, var(--strawberry-200) 20%, var(--strawberry-200) 100%)' }} />
        {/* 100% anchor tick */}
        <div style={{ position: 'absolute', top: 18, left: '20%', transform: 'translateX(-50%)',
          width: 2, height: 20, background: 'var(--pistachio-700)', borderRadius: 1 }} />
        <div style={{ position: 'absolute', top: -4, left: '20%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--pistachio-700)', whiteSpace: 'nowrap' }}>100%</div>
        {/* small ticks */}
        {ticks.filter((t) => t !== 100).map((t) => (
          <div key={t} style={{ position: 'absolute', top: 22, left: `${(t / 500) * 100}%`, transform: 'translateX(-50%)',
            width: 1, height: 12, background: 'var(--ink-300)' }} />
        ))}
        {/* thumb */}
        <button
          role="slider"
          aria-valuemin={0} aria-valuemax={500} aria-valuenow={value}
          aria-valuetext={`${value} percent`}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={onKey}
          style={{ position: 'absolute', top: 16, left: `${pct}%`, transform: 'translate(-50%, 0)',
            width: 32, height: 32, borderRadius: 999, border: '2px solid var(--ink-900)',
            background: 'var(--vanilla-50)', cursor: disabled ? 'default' : 'grab',
            boxShadow: 'var(--shadow-md)', padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--strawberry-500)' }} />
        </button>
        {/* live bubble */}
        <div style={{ position: 'absolute', top: -28, left: `${pct}%`, transform: 'translateX(-50%)',
          background: 'var(--ink-900)', color: 'var(--vanilla-50)',
          fontFamily: 'var(--font-mono)', fontSize: 12, padding: '3px 8px', borderRadius: 6, whiteSpace: 'nowrap' }}>
          {value}%
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)',
        fontSize: 11, color: 'var(--ink-500)', marginTop: 4 }}>
        <span>0% · hated it</span>
        <span>100% · same as 1 scoop</span>
        <span>500% · five-fold joy</span>
      </div>
    </div>
  );
}

// ── tooltip on 100% term ───────────────────────────────────────
function UnitTooltip({ open }) {
  if (!open) return null;
  return (
    <div role="tooltip" style={{
      position: 'absolute', top: 'calc(100% + 8px)', left: 0,
      background: 'var(--ink-900)', color: 'var(--vanilla-50)',
      padding: '10px 14px', borderRadius: 10, maxWidth: 320, fontSize: 13, lineHeight: 1.5,
      boxShadow: 'var(--shadow-md)', zIndex: 5,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: .7, marginBottom: 4 }}>WHY %?</div>
      <span style={{ color: 'var(--vanilla-50)' }}>
        100% = exactly the same joy you got from your 1st scoop. 200% = double.
        50% = half. We use a ratio so we can compare across people who started
        from very different baselines.
      </span>
    </div>
  );
}

// ── the full screen ────────────────────────────────────────────
function ScoopQuestionScreen({ currentIdx, answers, draft, layout = 'desktop', showTooltip = false }) {
  const q = SCOOP_QUESTIONS[currentIdx];
  const filled = answers.map((v, i) => i === currentIdx ? draft : v);
  const done = answers.filter((a) => a != null).length;
  const isMobile = layout === 'mobile';

  return (
    <div className="scoop-screen" style={{ display: 'flex', flexDirection: 'column', padding: isMobile ? 20 : 36 }}>
      {/* topbar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ScoopCone size={isMobile ? 28 : 32} scoops={1} />
          <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.study</span>
        </div>
        <div className="eyebrow" style={{ fontSize: isMobile ? 10 : 11 }}>QUESTION 0{currentIdx + 1} OF 05</div>
      </header>

      {/* progress dots */}
      <div style={{ display: 'flex', gap: 6, marginTop: isMobile ? 14 : 20 }}>
        {SCOOP_QUESTIONS.map((_, i) => {
          const filledHere = answers[i] != null;
          const isHere = i === currentIdx;
          return (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: filledHere ? 'var(--pistachio-500)' : isHere ? 'var(--strawberry-500)' : 'var(--vanilla-200)',
            }} />
          );
        })}
      </div>

      {/* body */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr',
        gap: isMobile ? 24 : 40,
        marginTop: isMobile ? 28 : 44, flex: 1, alignItems: 'start',
      }}>
        {/* Left: prompt + slider */}
        <div>
          <div className="eyebrow" style={{ color: 'var(--strawberry-700)' }}>{q.label}</div>
          <h1 style={{ fontSize: isMobile ? 36 : 48, margin: '8px 0 4px' }}>{q.prompt}</h1>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 8 }}>
            <p style={{ fontSize: isMobile ? 14 : 15, color: 'var(--ink-700)', margin: 0, maxWidth: 460 }}>
              {q.anchor} <span style={{
                borderBottom: '1.5px dotted var(--ink-500)', cursor: 'help', whiteSpace: 'nowrap',
              }}>What does 100% mean?</span>
            </p>
            <UnitTooltip open={showTooltip} />
          </div>

          {/* scoop visual */}
          <div style={{
            margin: isMobile ? '20px 0 8px' : '32px 0 12px',
            display: 'flex', alignItems: 'flex-end', gap: 12, height: isMobile ? 110 : 140,
          }}>
            {Array.from({ length: q.n }, (_, i) => (
              <div key={i} style={{
                width: isMobile ? 56 : 72, height: isMobile ? 56 : 72, borderRadius: 999,
                background: i % 2 === 0 ? 'var(--pistachio-200)' : 'var(--strawberry-200)',
                border: '2px solid var(--ink-900)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: isMobile ? 22 : 26, color: 'var(--ink-900)',
                transform: `translateY(${-i * (isMobile ? 4 : 6)}px) rotate(${i % 2 ? -3 : 3}deg)`,
              }}>{i + 1}</div>
            ))}
          </div>

          <ScoopSlider value={draft} onChange={() => {}} />

          {/* nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 }}>
            <button className="btn btn-quiet" disabled={currentIdx === 0}>
              ← back
            </button>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="caption">{done}/5 answered</span>
              <button className="btn btn-primary">
                {currentIdx === 4 ? 'See your curve' : 'Next scoop'} →
              </button>
            </div>
          </div>
        </div>

        {/* Right: live chart */}
        {!isMobile && (
          <div className="card" style={{ padding: 20, alignSelf: 'stretch' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div className="eyebrow">Your curve so far</div>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>%enjoyment ÷ scoops</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <CurveChart answers={filled} currentIdx={currentIdx} width={360} height={240} />
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.5 }}>
              {done === 0 && "Drag the slider on the left. We'll draw your enjoyment curve here in real time."}
              {done === 1 && "Nice — one point down, four to go. You'll see the shape of your curve emerge."}
              {done >= 2 && done < 5 && "Your curve is starting to take shape. Is it climbing, flattening, or already turning down?"}
              {done === 5 && "Complete. Compare to the population average on the next screen."}
            </div>
          </div>
        )}
      </div>

      {/* footer */}
      <footer style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>
        <span>← / → ±5 · shift+← / → ±25 · enter to confirm</span>
        <span>~ 90 sec total</span>
      </footer>
    </div>
  );
}

Object.assign(window, { ScoopQuestionScreen, ScoopSlider, CurveChart, SCOOP_QUESTIONS });
