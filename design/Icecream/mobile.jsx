/* eslint-disable */
// ──────────────────────────────────────────────────────────────
// Mobile variants — drawn inside a phone-shaped frame for context
// ──────────────────────────────────────────────────────────────

function PhoneFrame({ children, width = 360, height = 740 }) {
  return (
    <div style={{
      width: width + 24, height: height + 56,
      background: 'var(--ink-900)', borderRadius: 48, padding: 12,
      boxShadow: 'var(--shadow-lg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      {/* notch */}
      <div style={{
        position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)',
        width: 90, height: 26, background: 'black', borderRadius: 14, zIndex: 2,
      }} />
      <div style={{
        width, height, borderRadius: 38, overflow: 'hidden',
        background: 'var(--vanilla-50)', position: 'relative',
      }}>
        {/* status bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 44, zIndex: 3,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 28px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
          color: 'var(--ink-900)',
        }}>
          <span>9:41</span>
          <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <svg width="16" height="11" viewBox="0 0 16 11"><path d="M1 9 L1 6 M5 9 L5 4 M9 9 L9 2 M13 9 L13 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            <svg width="14" height="11" viewBox="0 0 14 11"><path d="M7 9 a4 4 0 0 1 -4 -4 M7 9 a8 8 0 0 1 -8 -8" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>
            <span style={{ fontSize: 12 }}>●</span>
          </span>
        </div>
        <div style={{ position: 'absolute', inset: '44px 0 0 0' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function ScoopMobileArtboard({ state = 'mid' }) {
  // state: 'first', 'mid', 'done'
  const setups = {
    first: { idx: 0, answers: [null, null, null, null, null], draft: 100 },
    mid:   { idx: 2, answers: [80, 175, null, null, null], draft: 230 },
    done:  { idx: 4, answers: [80, 175, 230, 240, null], draft: 200 },
  };
  const s = setups[state];
  return (
    <PhoneFrame>
      <ScoopQuestionScreen layout="mobile" currentIdx={s.idx} answers={s.answers} draft={s.draft} />
      {/* show running mini-chart at the bottom on mobile */}
      <div style={{
        position: 'absolute', left: 16, right: 16, bottom: 64,
        background: 'var(--vanilla-100)', border: '1px solid var(--vanilla-200)',
        borderRadius: 12, padding: 12,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div className="eyebrow" style={{ fontSize: 10 }}>Your curve so far</div>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-500)' }}>
            {s.answers.filter(a => a != null).length + (s.draft != null ? 1 : 0)}/5
          </span>
        </div>
        <CurveChart
          answers={s.answers.map((v, i) => i === s.idx ? s.draft : v)}
          currentIdx={s.idx}
          width={300} height={110} mini
        />
      </div>
    </PhoneFrame>
  );
}

function ThankYouMobileArtboard() {
  const yours = [80, 175, 230, 240, 200];
  const avg   = [100, 175, 215, 220, 195];
  const padL = 28, padR = 8, padT = 10, padB = 24;
  const w = 312, h = 180;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const xOf = (n) => padL + ((n - 0.5) / 5) * innerW;
  const yOf = (v) => padT + innerH - (v / 500) * innerH;
  const pY = 'M ' + yours.map((v, i) => `${xOf(i+1)} ${yOf(v)}`).join(' L ');
  const pA = 'M ' + avg.map((v, i) => `${xOf(i+1)} ${yOf(v)}`).join(' L ');
  return (
    <PhoneFrame>
      <div className="scoop-screen grain" style={{ padding: 20, height: '100%', overflow: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <ThankYouMark size={40} />
          <div className="eyebrow" style={{ fontSize: 10, color: 'var(--strawberry-700)' }}>SUBMISSION #1,284</div>
        </div>
        <h1 style={{ fontSize: 36, margin: '4px 0 6px', lineHeight: 1.05 }}>
          Thank you.<br/>You're the&nbsp;data.
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-700)', margin: 0, lineHeight: 1.5 }}>
          Your curve peaked at <b style={{ color: 'var(--strawberry-700)' }}>3 scoops</b> — same as 64% of folks before you.
        </p>

        <div className="card" style={{ padding: 12, marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h4 style={{ margin: 0, fontSize: 14 }}>You vs. average</h4>
            <div style={{ display: 'flex', gap: 8, fontSize: 10 }}>
              <span style={{ color: 'var(--strawberry-700)' }}>● you</span>
              <span style={{ color: 'var(--ink-500)' }}>— avg</span>
            </div>
          </div>
          <svg width={w} height={h} style={{ display: 'block', marginTop: 4 }}>
            {[0, 100, 200, 300, 400, 500].map(t => (
              <g key={t}>
                <line x1={padL} x2={w - padR} y1={yOf(t)} y2={yOf(t)}
                  stroke={t === 100 ? 'var(--pistachio-200)' : 'var(--vanilla-200)'}
                  strokeDasharray={t === 100 ? '0' : '2 3'} strokeWidth={t === 100 ? 1.4 : 1} />
                <text x={padL - 4} y={yOf(t) + 3} textAnchor="end"
                  fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-500)">{t}</text>
              </g>
            ))}
            <path d={pA} fill="none" stroke="var(--blueberry-500)" strokeWidth="1.6" strokeDasharray="3 3" opacity=".7" />
            <path d={pY} fill="none" stroke="var(--strawberry-500)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
            {yours.map((v, i) => (
              <circle key={i} cx={xOf(i+1)} cy={yOf(v)} r={3.2} fill="var(--strawberry-500)" stroke="var(--vanilla-50)" strokeWidth="1.4" />
            ))}
            {[1,2,3,4,5].map(n => (
              <text key={n} x={xOf(n)} y={yOf(0) + 14} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--ink-500)">{n}</text>
            ))}
          </svg>
        </div>

        <div style={{ marginTop: 16 }}>
          <div className="eyebrow" style={{ fontSize: 10 }}>Deletion token · save this</div>
          <div style={{
            marginTop: 6, background: 'var(--ink-900)', borderRadius: 10, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'var(--vanilla-50)', wordBreak: 'break-all', lineHeight: 1.35,
            }}>scoop-1284-pistachio-bonjour</div>
            <button style={{
              border: 0, padding: '10px 0', cursor: 'pointer',
              background: 'var(--pistachio-500)', color: 'white',
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1.4"/><path d="M1 9V1h8"/></svg>
              Copy token
            </button>
          </div>
        </div>

        <button className="btn btn-primary" style={{
          width: '100%', marginTop: 16, padding: '14px 0', fontSize: 15,
        }}>Share with a friend →</button>
      </div>
    </PhoneFrame>
  );
}

Object.assign(window, { ScoopMobileArtboard, ThankYouMobileArtboard, PhoneFrame });
