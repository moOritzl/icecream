import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import MotionPage from '../components/MotionPage.jsx';
import ThankYouMark from '../components/ThankYouMark.jsx';
import ScoopCone from '../components/ScoopCone.jsx';
import { useDirection } from '../hooks/useDirection.js';

function DualCurveChart({ yours, average, total }) {
  const padL = 44, padR = 18, padT = 18, padB = 36;
  const width = 460, height = 260;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const xOf = (n) => padL + ((n - 0.5) / 5) * innerW;
  const yOf = (v) => padT + innerH - (Math.min(500, Math.max(0, v)) / 500) * innerH;

  const yTicks = [0, 100, 200, 300, 400, 500];
  const pathYou = yours
    ? 'M ' + yours.map((v, i) => `${xOf(i + 1)} ${yOf(v)}`).join(' L ')
    : null;
  const pathAvg = average
    ? 'M ' + average.map((v, i) => `${xOf(i + 1)} ${yOf(v)}`).join(' L ')
    : null;
  const areaAvg = pathAvg
    ? pathAvg + ` L ${xOf(5)} ${yOf(0)} L ${xOf(1)} ${yOf(0)} Z`
    : null;

  const peakIdx = yours ? yours.indexOf(Math.max(...yours)) : -1;
  const peakVal = yours ? yours[peakIdx] : null;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={width - padR} y1={yOf(t)} y2={yOf(t)}
            stroke={t === 100 ? 'var(--pistachio-200)' : 'var(--vanilla-200)'}
            strokeWidth={t === 100 ? 1.5 : 1}
            strokeDasharray={t === 100 ? '0' : '2 4'} />
          <text x={padL - 8} y={yOf(t) + 4} textAnchor="end"
            fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-500)">{t}%</text>
        </g>
      ))}
      {[1, 2, 3, 4, 5].map((n) => (
        <text key={n} x={xOf(n)} y={yOf(0) + 18} textAnchor="middle"
          fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-500)">{n} scoop{n > 1 ? 's' : ''}</text>
      ))}

      {areaAvg && <path d={areaAvg} fill="var(--pistachio-500)" opacity=".1" />}
      {pathAvg && (
        <path d={pathAvg} fill="none" stroke="var(--pistachio-500)" strokeWidth="2"
          opacity=".55" strokeDasharray="4 4" strokeLinecap="round" />
      )}
      {pathYou && (
        <path d={pathYou} fill="none" stroke="var(--strawberry-500)" strokeWidth="3"
          strokeLinejoin="round" strokeLinecap="round" />
      )}
      {yours && yours.map((v, i) => (
        <circle key={i} cx={xOf(i + 1)} cy={yOf(v)} r={5}
          fill="var(--strawberry-500)" stroke="var(--vanilla-50)" strokeWidth="2" />
      ))}

      {peakIdx >= 0 && peakVal != null && (
        <g transform={`translate(${xOf(peakIdx + 1)}, ${yOf(peakVal) - 18})`}>
          <rect x="-36" y="-22" width="72" height="22" rx="6" fill="var(--ink-900)" />
          <text x="0" y="-7" textAnchor="middle" fontFamily="JetBrains Mono, monospace"
            fontSize="11" fill="var(--vanilla-50)">peak · {peakVal}%</text>
        </g>
      )}
    </svg>
  );
}

export default function Thanks() {
  const { token } = useParams();
  const { state } = useLocation();
  const direction = useDirection();
  const [copied, setCopied] = useState(false);

  const answers = state?.answers ?? null;
  const mean = state?.mean ?? null;
  const total = state?.total ?? null;

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback: select text
    }
  };

  const peakIdx = answers ? answers.indexOf(Math.max(...answers)) : -1;
  const peakScoops = peakIdx >= 0 ? peakIdx + 1 : null;

  return (
    <MotionPage direction={direction} variant="fade">
      <div className="scoop-screen grain" style={{ padding: 40, display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScoopCone size={28} scoops={1} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
          </div>
          {total && (
            <div className="eyebrow">SUBMISSION #{total.toLocaleString()}</div>
          )}
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'var(--thanks-grid-cols, 1fr 1.1fr)', gap: 40, marginTop: 24, flex: 1, alignItems: 'center' }}
          className="thanks-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
              <ThankYouMark size={56} />
              <div className="eyebrow" style={{ color: 'var(--strawberry-700)' }}>You're the data</div>
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '8px 0 8px' }}>
              Thank you.<br />You're the&nbsp;data.
            </h1>
            {answers && (
              <p style={{ color: 'var(--ink-700)', fontSize: 16, lineHeight: 1.6, maxWidth: 440, margin: 0 }}>
                Here's your enjoyment curve, plotted against the running average of
                everyone before you.
                {peakScoops && (
                  <> Yours peaked at <b style={{ color: 'var(--strawberry-700)' }}>{peakScoops} scoop{peakScoops > 1 ? 's' : ''}</b>.</>
                )}
              </p>
            )}
            {!answers && (
              <p style={{ color: 'var(--ink-700)', fontSize: 16, lineHeight: 1.6, maxWidth: 440, margin: 0 }}>
                Your responses have been recorded. Thank you for contributing to the study.
              </p>
            )}

            <div style={{ marginTop: 28 }}>
              <div className="eyebrow">Deletion token · save this</div>
              <div style={{
                marginTop: 8, display: 'flex', alignItems: 'stretch',
                background: 'var(--ink-900)', borderRadius: 12, overflow: 'hidden',
              }}>
                <div style={{
                  flex: 1, padding: '14px 16px',
                  fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--vanilla-50)',
                  letterSpacing: '0.04em', wordBreak: 'break-all',
                }}>{token}</div>
                <button onClick={copyToken} style={{
                  border: 0, padding: '0 18px',
                  background: copied ? 'var(--pistachio-500)' : 'var(--ink-700)',
                  color: 'white', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14,
                  display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
                  transition: 'background 0.15s',
                }}>
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M3 7.5 L6 10 L11 4" />
                      </svg>
                      Copied
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="4" width="8" height="8" rx="1.5" />
                        <path d="M2 10 V2 H10" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="caption" style={{ marginTop: 6 }}>
                Visit <a href="/privacy" style={{ color: 'inherit' }}>/privacy</a> and enter this token any time to erase your responses.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <a href="/" className="btn btn-ghost">Back to start</a>
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 16 }}>Your curve vs. everyone else</h3>
              <div style={{ display: 'flex', gap: 14, fontSize: 12, alignItems: 'center' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 16, height: 3, background: 'var(--strawberry-500)', display: 'inline-block', borderRadius: 2 }} />
                  <span>You</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 16, height: 3, background: 'var(--pistachio-500)', display: 'inline-block', borderRadius: 2, opacity: .6 }} />
                  <span style={{ color: 'var(--ink-700)' }}>
                    Average{total ? ` (n = ${total.toLocaleString()})` : ''}
                  </span>
                </span>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <DualCurveChart yours={answers} average={mean} total={total} />
            </div>
            {(!answers || !mean) && (
              <p style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 8 }}>
                {!answers
                  ? 'Navigate here directly from the survey to see your curve.'
                  : 'Not enough data yet to show a population average.'}
              </p>
            )}
          </div>
        </div>

        <footer style={{ marginTop: 24, fontSize: 12, color: 'var(--ink-500)', textAlign: 'center' }}>
          Your responses are stored anonymously. No IP address, no cookies.
        </footer>
      </div>
    </MotionPage>
  );
}
