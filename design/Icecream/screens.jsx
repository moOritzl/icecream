/* eslint-disable */
// ──────────────────────────────────────────────────────────────
// Remaining survey screens
// ──────────────────────────────────────────────────────────────

function LandingScreen() {
  const t = React.useContext(window.TweaksCtx || React.createContext({}));
  const heroScoops = t.heroScoops || 3;
  return (
    <div className="scoop-screen grain" style={{ padding: 48, display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ScoopCone size={28} scoops={1} />
          <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.study</span>
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>
          a neuroscience study · since 2026
        </div>
      </header>

      <div style={{
        flex: 1, marginTop: 36,
        display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center',
      }}>
        <div>
          <div className="eyebrow">An ice-cream-flavored study</div>
          <h1 style={{ fontSize: 72, margin: '12px 0 18px', maxWidth: 540 }}>
            How much is too&nbsp;much&nbsp;ice&nbsp;cream?
          </h1>
          <p style={{ fontSize: 19, color: 'var(--ink-700)', maxWidth: 480, lineHeight: 1.55, marginTop: 0 }}>
            We're a small lab studying how additional scoops change the joy you
            get from a dessert. Five sliders, ninety seconds, totally anonymous.
            At the end, you'll see your personal "joy curve" against everyone
            else's.
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ padding: '14px 28px', fontSize: 16 }}>
              Start the study →
            </button>
            <button className="btn btn-ghost">Read methodology</button>
          </div>

          <div style={{ display: 'flex', gap: 28, marginTop: 36, fontSize: 13, color: 'var(--ink-700)' }}>
            <span>✓ no cookies</span>
            <span>✓ no email</span>
            <span>✓ delete anytime</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ScoopCone size={320} scoops={heroScoops} />
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 18, color: 'var(--ink-700)', marginTop: 8 }}>
            "the {heroScoops === 1 ? 'first' : heroScoops === 2 ? 'second' : 'third'} scoop is a different animal"
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 4 }}>
            — n = 1,284 respondents, so far
          </div>
        </div>
      </div>

      <footer style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between',
        fontSize: 12, color: 'var(--ink-500)' }}>
        <span>Maya Chen · Cognitive Neuroscience · Northwestern</span>
        <span><u style={{ textDecorationStyle: 'dotted' }}>privacy</u> · <u style={{ textDecorationStyle: 'dotted' }}>methodology</u> · <u style={{ textDecorationStyle: 'dotted' }}>contact</u></span>
      </footer>
    </div>
  );
}

function ConsentScreen() {
  const Bullet = ({ children }) => (
    <li style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: '1px solid var(--vanilla-200)' }}>
      <span style={{
        flex: '0 0 22px', width: 22, height: 22, marginTop: 2, borderRadius: 999,
        background: 'var(--pistachio-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--pistachio-700)" strokeWidth="2" strokeLinecap="round">
          <path d="M2 6.5 L5 9 L10 3.5" />
        </svg>
      </span>
      <span style={{ fontSize: 15, color: 'var(--ink-900)', lineHeight: 1.5 }}>{children}</span>
    </li>
  );
  return (
    <div className="scoop-screen" style={{ padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <div className="eyebrow">Before we start</div>
        <h1 style={{ fontSize: 48, margin: '12px 0 8px' }}>The fine print, kept short.</h1>
        <p style={{ fontSize: 15, color: 'var(--ink-700)', marginTop: 0, lineHeight: 1.6 }}>
          We have to ask. Your participation needs to be informed and entirely voluntary.
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', borderBottom: '1px solid var(--vanilla-200)' }}>
          <Bullet><b>It takes about 90 seconds.</b> Five slider questions, plus three optional ones at the end.</Bullet>
          <Bullet><b>We store nothing identifying.</b> No email, no IP, no cookies. Just your slider answers and an anonymous ID.</Bullet>
          <Bullet><b>You can leave any time.</b> Close the tab and nothing is saved until you click "submit."</Bullet>
          <Bullet><b>You can delete your data later.</b> We'll give you a one-time deletion token at the end. Hold onto it.</Bullet>
          <Bullet><b>Results may be published</b> in aggregate, in academic and popular venues. Never the raw responses.</Bullet>
        </ul>

        <label style={{
          display: 'flex', gap: 14, padding: 20, marginTop: 24, alignItems: 'flex-start',
          background: 'var(--pistachio-50)', border: '1px solid var(--pistachio-200)',
          borderRadius: 12, cursor: 'pointer',
        }}>
          <span style={{
            flex: '0 0 22px', width: 22, height: 22, marginTop: 2,
            borderRadius: 6, border: '2px solid var(--pistachio-700)',
            background: 'var(--pistachio-500)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round">
              <path d="M2 6.5 L5 9 L10 3.5" />
            </svg>
          </span>
          <span style={{ fontSize: 15, color: 'var(--ink-900)' }}>
            I'm at least 13 years old, I've read the above, and I'd like to help. Pass me the ice cream.
          </span>
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, alignItems: 'center' }}>
          <button className="btn btn-quiet">← back</button>
          <button className="btn btn-primary">Start the survey →</button>
        </div>
      </div>
    </div>
  );
}

// ── Likert 1-10 ────────────────────────────────────────────────
function LikertScreen() {
  const selected = 7;
  return (
    <div className="scoop-screen" style={{ padding: 36, display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ScoopCone size={28} scoops={1} />
          <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.study</span>
        </div>
        <div className="eyebrow">QUESTION 06 OF 08 · OPTIONAL</div>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 720, margin: '0 auto', width: '100%' }}>
        <div className="eyebrow" style={{ color: 'var(--strawberry-700)' }}>Sweet tooth, calibrated</div>
        <h1 style={{ fontSize: 48, margin: '8px 0 6px' }}>How much of a dessert person are&nbsp;you?</h1>
        <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: 0, maxWidth: 540 }}>
          1 = "I'd rather have soup." 10 = "Dessert first, dinner if there's time."
        </p>

        <div style={{ marginTop: 44 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: 10 }, (_, i) => {
              const n = i + 1;
              const isSel = n === selected;
              return (
                <button key={n} style={{
                  flex: 1, height: 60, borderRadius: 12,
                  border: isSel ? '2px solid var(--ink-900)' : '1px solid var(--cream-300)',
                  background: isSel ? 'var(--pistachio-500)' : 'var(--vanilla-100)',
                  color: isSel ? 'white' : 'var(--ink-900)',
                  fontFamily: 'var(--font-display)', fontStyle: 'italic',
                  fontSize: 28, cursor: 'pointer',
                  boxShadow: isSel ? 'var(--shadow-md)' : 'none',
                }}>{n}</button>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10,
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-500)' }}>
            <span>1 · soup person</span>
            <span>5 · neutral</span>
            <span>10 · dessert maximalist</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48 }}>
          <button className="btn btn-quiet">← back</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost">Skip</button>
            <button className="btn btn-primary">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Multiple choice ────────────────────────────────────────────
function MultipleChoiceScreen() {
  const options = [
    { id: 'a', label: 'Vanilla', sub: 'plain, dignified, the control variable' },
    { id: 'b', label: 'Chocolate', sub: 'a classic, no notes' },
    { id: 'c', label: 'Pistachio', sub: 'we have a bias here' },
    { id: 'd', label: 'Strawberry', sub: 'a real one, not pink' },
    { id: 'e', label: 'Mint chip', sub: 'toothpaste-adjacent in the best way' },
    { id: 'f', label: 'Something else', sub: 'tell us in one line' },
  ];
  const sel = 'c';
  return (
    <div className="scoop-screen" style={{ padding: 36, display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ScoopCone size={28} scoops={1} />
          <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.study</span>
        </div>
        <div className="eyebrow">QUESTION 07 OF 08 · OPTIONAL</div>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 640, margin: '0 auto', width: '100%' }}>
        <div className="eyebrow" style={{ color: 'var(--strawberry-700)' }}>Flavor allegiance</div>
        <h1 style={{ fontSize: 44, margin: '8px 0 6px' }}>If forced to pick&nbsp;one.</h1>
        <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: 0 }}>One only. Don't be diplomatic.</p>

        <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {options.map((o) => {
            const isSel = o.id === sel;
            return (
              <label key={o.id} style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                padding: 16, borderRadius: 12,
                background: isSel ? 'var(--pistachio-50)' : 'var(--vanilla-100)',
                border: isSel ? '1.5px solid var(--pistachio-700)' : '1px solid var(--vanilla-200)',
                cursor: 'pointer',
              }}>
                <span style={{
                  flex: '0 0 20px', width: 20, height: 20, marginTop: 2, borderRadius: 999,
                  border: '2px solid ' + (isSel ? 'var(--pistachio-700)' : 'var(--ink-500)'),
                  background: isSel ? 'var(--pistachio-500)' : 'transparent',
                  position: 'relative',
                }}>
                  {isSel && <div style={{ position: 'absolute', inset: 4, borderRadius: 999, background: 'white' }} />}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 500, color: 'var(--ink-900)' }}>{o.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>{o.sub}</div>
                </div>
              </label>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
          <button className="btn btn-quiet">← back</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost">Skip</button>
            <button className="btn btn-primary">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Numeric with currency ──────────────────────────────────────
function NumericScreen({ error = false }) {
  return (
    <div className="scoop-screen" style={{ padding: 36, display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ScoopCone size={28} scoops={1} />
          <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.study</span>
        </div>
        <div className="eyebrow">QUESTION 08 OF 08 · OPTIONAL</div>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 560, margin: '0 auto', width: '100%' }}>
        <div className="eyebrow" style={{ color: 'var(--strawberry-700)' }}>Willingness to pay</div>
        <h1 style={{ fontSize: 44, margin: '8px 0 6px' }}>What's the most you'd pay for that ideal&nbsp;cone?</h1>
        <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: 0 }}>
          Pick the number of scoops that maximized your joy, then tell us the ceiling — what you'd pay at a nice indie shop.
        </p>

        <div style={{ marginTop: 32 }}>
          <label className="mono" style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            Maximum price
          </label>
          <div style={{
            display: 'flex', alignItems: 'stretch', marginTop: 8,
            borderRadius: 12, overflow: 'hidden',
            border: '1.5px solid ' + (error ? 'var(--cherry-500)' : 'var(--ink-900)'),
            background: 'var(--vanilla-100)',
            boxShadow: error ? '0 0 0 3px rgba(200,75,62,.2)' : 'var(--shadow-focus)',
          }}>
            <span style={{
              padding: '14px 16px', borderRight: '1px solid var(--vanilla-200)',
              background: 'var(--vanilla-200)',
              fontFamily: 'var(--font-mono)', fontSize: 18, color: 'var(--ink-700)',
              display: 'flex', alignItems: 'center',
            }}>USD $</span>
            <input
              defaultValue={error ? '650' : '8.50'}
              style={{
                flex: 1, border: 0, outline: 0, background: 'transparent',
                padding: '14px 18px', fontFamily: 'var(--font-mono)',
                fontSize: 22, color: 'var(--ink-900)',
              }}
            />
            <span style={{
              padding: '14px 16px', fontSize: 13, color: 'var(--ink-500)',
              display: 'flex', alignItems: 'center', borderLeft: '1px solid var(--vanilla-200)',
            }}>/ cone</span>
          </div>
          {error ? (
            <div style={{ marginTop: 8, padding: '8px 12px', borderRadius: 8,
              background: 'rgba(200,75,62,.08)', color: 'var(--cherry-500)', fontSize: 13,
              display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="7" cy="7" r="6" /><path d="M7 4v3.5M7 10v.01" strokeLinecap="round"/>
              </svg>
              That's higher than the most expensive scoop on record. Please enter a value between $0 and $50.
            </div>
          ) : (
            <div className="caption" style={{ marginTop: 8 }}>
              Median so far: <span className="mono" style={{ color: 'var(--ink-900)' }}>$7.25</span> · range $3–$22
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48 }}>
          <button className="btn btn-quiet">← back</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost">Skip</button>
            <button className="btn btn-primary">Submit →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Optional section divider ───────────────────────────────────
function OptionalHeaderScreen() {
  return (
    <div className="scoop-screen" style={{ padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 580, width: '100%', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Glyph kind="cherry" size={56} color="var(--strawberry-700)" />
        </div>
        <div className="eyebrow" style={{ color: 'var(--strawberry-700)', marginTop: 16 }}>OPTIONAL · ABOUT 30 SECONDS</div>
        <h1 style={{ fontSize: 56, margin: '12px 0 6px' }}>The cherry on&nbsp;top.</h1>
        <p style={{ fontSize: 17, color: 'var(--ink-700)', margin: '0 auto', maxWidth: 460, lineHeight: 1.55 }}>
          You've answered the main study. The next three questions help us
          slice the data by flavor preference and price sensitivity — they're
          useful but not required. Skip if you want.
        </p>

        {/* dashed separator */}
        <div style={{
          margin: '36px 0',
          height: 1,
          backgroundImage: 'linear-gradient(to right, var(--ink-300) 50%, transparent 50%)',
          backgroundSize: '12px 1px',
          backgroundRepeat: 'repeat-x',
        }} />

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="btn btn-ghost">Skip to the end</button>
          <button className="btn btn-primary">Three more questions →</button>
        </div>

        <div className="caption" style={{ marginTop: 20 }}>
          You'll get your personal curve either way.
        </div>
      </div>
    </div>
  );
}

// ── Thank you ─────────────────────────────────────────────────
function ThankYouScreen({ copied = false }) {
  const yours    = [80, 175, 230, 240, 200];
  const average  = [100, 175, 215, 220, 195];

  // chart: dual line, larger
  const padL = 44, padR = 18, padT = 18, padB = 36;
  const width = 460, height = 260;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const xOf = (n) => padL + ((n - 0.5) / 5) * innerW;
  const yOf = (v) => padT + innerH - (v / 500) * innerH;

  const pathYou = 'M ' + yours.map((v, i) => `${xOf(i + 1)} ${yOf(v)}`).join(' L ');
  const pathAvg = 'M ' + average.map((v, i) => `${xOf(i + 1)} ${yOf(v)}`).join(' L ');
  const areaAvg = pathAvg + ` L ${xOf(5)} ${yOf(0)} L ${xOf(1)} ${yOf(0)} Z`;

  return (
    <div className="scoop-screen grain" style={{ padding: 40, display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ScoopCone size={28} scoops={1} />
          <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.study</span>
        </div>
        <div className="eyebrow">COMPLETE · 02:13</div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 40, marginTop: 24, flex: 1, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
            <ThankYouMark size={56} />
            <div className="eyebrow" style={{ color: 'var(--strawberry-700)' }}>Submission #1,284</div>
          </div>
          <h1 style={{ fontSize: 60, margin: '8px 0 8px' }}>Thank you. <br/>You're the&nbsp;data.</h1>
          <p style={{ color: 'var(--ink-700)', fontSize: 16, lineHeight: 1.6, maxWidth: 440, margin: 0 }}>
            Here's your enjoyment curve, plotted against the running average of
            everyone before you. Yours peaked at <b style={{ color: 'var(--strawberry-700)' }}>3 scoops</b> and turned down
            after — same shape as 64% of respondents.
          </p>

          <div style={{ marginTop: 28 }}>
            <div className="eyebrow">Deletion token · save this</div>
            <div style={{
              marginTop: 8, display: 'flex', alignItems: 'stretch',
              background: 'var(--ink-900)', borderRadius: 12, overflow: 'hidden',
            }}>
              <div style={{
                flex: 1, padding: '14px 16px',
                fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--vanilla-50)',
                letterSpacing: '0.04em',
              }}>scoop-1284-pistachio-bonjour</div>
              <button style={{
                border: 0, padding: '0 18px',
                background: copied ? 'var(--mint-500)' : 'var(--pistachio-500)',
                color: 'white', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14,
                display: 'flex', alignItems: 'center', gap: 8,
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
                      <rect x="4" y="4" width="8" height="8" rx="1.5"/>
                      <path d="M2 10 V2 H10" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="caption" style={{ marginTop: 6 }}>
              Mail this to <span className="mono">delete@scoops.study</span> any time to erase your responses.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <button className="btn btn-primary">Share with a friend →</button>
            <button className="btn btn-ghost">Read the methodology</button>
          </div>
        </div>

        {/* chart */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3 style={{ margin: 0 }}>Your curve vs. everyone else</h3>
            <div style={{ display: 'flex', gap: 14, fontSize: 12, alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 16, height: 3, background: 'var(--strawberry-500)', borderRadius: 2 }} />
                <span>You</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 16, height: 3, background: 'var(--blueberry-500)', borderRadius: 2, opacity: .6 }} />
                <span style={{ color: 'var(--ink-700)' }}>Average (n = 1,284)</span>
              </span>
            </div>
          </div>

          <svg width={width} height={height} style={{ display: 'block', marginTop: 12 }}>
            {[0, 100, 200, 300, 400, 500].map((t) => (
              <g key={t}>
                <line x1={padL} x2={width - padR} y1={yOf(t)} y2={yOf(t)}
                  stroke={t === 100 ? 'var(--pistachio-200)' : 'var(--vanilla-200)'}
                  strokeWidth={t === 100 ? 1.5 : 1}
                  strokeDasharray={t === 100 ? '0' : '2 4'} />
                <text x={padL - 8} y={yOf(t) + 4} textAnchor="end"
                  fontFamily="JetBrains Mono" fontSize="10" fill="var(--ink-500)">{t}%</text>
              </g>
            ))}
            {[1, 2, 3, 4, 5].map((n) => (
              <text key={n} x={xOf(n)} y={yOf(0) + 18} textAnchor="middle"
                fontFamily="JetBrains Mono" fontSize="10" fill="var(--ink-500)">{n} scoop{n>1?'s':''}</text>
            ))}
            <path d={areaAvg} fill="var(--blueberry-500)" opacity=".1" />
            <path d={pathAvg} fill="none" stroke="var(--blueberry-500)" strokeWidth="2" opacity=".55" strokeDasharray="4 4" />
            <path d={pathYou} fill="none" stroke="var(--strawberry-500)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            {yours.map((v, i) => (
              <circle key={i} cx={xOf(i + 1)} cy={yOf(v)} r={5} fill="var(--strawberry-500)" stroke="var(--vanilla-50)" strokeWidth="2" />
            ))}
            {/* peak marker */}
            <g transform={`translate(${xOf(3)}, ${yOf(240) - 18})`}>
              <rect x="-32" y="-22" width="64" height="22" rx="6" fill="var(--ink-900)" />
              <text x="0" y="-7" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--vanilla-50)">peak · 240%</text>
            </g>
          </svg>
        </div>
      </div>

      <footer style={{ marginTop: 24, fontSize: 12, color: 'var(--ink-500)', textAlign: 'center' }}>
        Want to see what we find? <u style={{ textDecorationStyle: 'dotted' }}>Get a one-time email when results publish</u>.
      </footer>
    </div>
  );
}

// ── Admin dashboard ───────────────────────────────────────────
function AdminScreen() {
  // generate fake curve set for scatter
  const allCurves = React.useMemo(() => {
    const out = [];
    for (let s = 0; s < 80; s++) {
      const seed = s * 9301 + 49297;
      const r = (k) => (Math.abs(Math.sin(seed + k * 7)) % 1);
      const peak = 1 + Math.floor(r(1) * 5);
      const curve = [];
      for (let n = 1; n <= 5; n++) {
        const dist = Math.abs(n - peak);
        const base = 100 + (n === 1 ? 0 : 60 + r(n + 10) * 60) * (peak === 1 ? -0.4 : 1);
        const v = Math.max(0, Math.min(500, base + (5 - dist) * 30 + (r(n) - 0.5) * 60));
        curve.push(v);
      }
      out.push(curve);
    }
    return out;
  }, []);

  const mean = [0, 0, 0, 0, 0].map((_, i) => allCurves.reduce((s, c) => s + c[i], 0) / allCurves.length);

  const padL = 40, padR = 18, padT = 12, padB = 30;
  const w = 480, h = 220;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const xOf = (n) => padL + ((n - 0.5) / 5) * innerW;
  const yOf = (v) => padT + innerH - (v / 500) * innerH;
  const meanPath = 'M ' + mean.map((v, i) => `${xOf(i + 1)} ${yOf(v)}`).join(' L ');

  const Stat = ({ label, value, sub }) => (
    <div className="card" style={{ padding: 16 }}>
      <div className="eyebrow">{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36, marginTop: 4, lineHeight: 1 }}>{value}</div>
      {sub && <div className="caption" style={{ marginTop: 4 }}>{sub}</div>}
    </div>
  );

  return (
    <div className="scoop-screen" style={{ padding: 28, overflow: 'hidden' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ScoopCone size={28} scoops={1} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Admin · live data</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>scoops.study/admin</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 1v7M3 5l3 3 3-3M2 10h8" strokeLinecap="round"/></svg>
            CSV
          </button>
          <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 1v7M3 5l3 3 3-3M2 10h8" strokeLinecap="round"/></svg>
            JSON
          </button>
          <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>Refresh</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20 }}>
        <Stat label="Submissions" value="1,284" sub="+ 23 today" />
        <Stat label="Median peak" value="3 scoops" sub="64% peak at 3" />
        <Stat label="Mean WTP" value="$7.25" sub="σ = $2.80" />
        <Stat label="Completion" value="91%" sub="of starts" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 14 }}>
        {/* mean curve */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h4 style={{ margin: 0 }}>Mean curve</h4>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>± 1σ shaded</span>
          </div>
          <svg width={w} height={h} style={{ display: 'block', marginTop: 6, maxWidth: '100%' }}>
            {[0, 100, 200, 300, 400, 500].map((t) => (
              <g key={t}>
                <line x1={padL} x2={w - padR} y1={yOf(t)} y2={yOf(t)} stroke="var(--vanilla-200)" />
                <text x={padL - 6} y={yOf(t) + 4} textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" fill="var(--ink-500)">{t}%</text>
              </g>
            ))}
            {/* sigma band */}
            <path d={`M ${xOf(1)} ${yOf(mean[0] + 40)} ` +
              mean.map((v, i) => `L ${xOf(i + 1)} ${yOf(v + 40)}`).join(' ') +
              ' L ' + mean.slice().reverse().map((v, i) => `${xOf(5 - i)} ${yOf(v - 40)}`).join(' L ') + ' Z'}
              fill="var(--pistachio-200)" opacity=".5" />
            <path d={meanPath} fill="none" stroke="var(--pistachio-700)" strokeWidth="2.4" strokeLinejoin="round" />
            {mean.map((v, i) => (
              <circle key={i} cx={xOf(i + 1)} cy={yOf(v)} r={4} fill="var(--pistachio-700)" stroke="var(--vanilla-50)" strokeWidth="1.5" />
            ))}
            {[1,2,3,4,5].map(n => (
              <text key={n} x={xOf(n)} y={yOf(0) + 18} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--ink-500)">{n}</text>
            ))}
          </svg>
        </div>

        {/* scatter / all curves */}
        <div className="card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h4 style={{ margin: 0 }}>All curves</h4>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>{allCurves.length} of 1,284 shown</span>
          </div>
          <svg width={w} height={h} style={{ display: 'block', marginTop: 6, maxWidth: '100%' }}>
            {[0, 100, 200, 300, 400, 500].map((t) => (
              <line key={t} x1={padL} x2={w - padR} y1={yOf(t)} y2={yOf(t)} stroke="var(--vanilla-200)" />
            ))}
            {allCurves.map((c, i) => (
              <path key={i} d={'M ' + c.map((v, j) => `${xOf(j + 1)} ${yOf(v)}`).join(' L ')}
                fill="none" stroke="var(--strawberry-500)" strokeWidth="1" opacity=".18" />
            ))}
            <path d={meanPath} fill="none" stroke="var(--ink-900)" strokeWidth="2.4" />
            {[1,2,3,4,5].map(n => (
              <text key={n} x={xOf(n)} y={yOf(0) + 18} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--ink-500)">{n}</text>
            ))}
          </svg>
        </div>
      </div>

      {/* mini table */}
      <div className="card" style={{ marginTop: 12, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h4 style={{ margin: 0 }}>Recent submissions</h4>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>updated 14s ago</span>
        </div>
        <table style={{ width: '100%', marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 12, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--ink-500)', borderBottom: '1px solid var(--vanilla-200)' }}>
              {['id', 'q1', 'q2', 'q3', 'q4', 'q5', 'peak', 'wtp', 'at'].map((h) => (
                <th key={h} style={{ padding: '6px 8px', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['1284', 80, 175, 240, 230, 200, 3, '$8.50', '14s ago'],
              ['1283', 100, 220, 290, 210, 120, 3, '$6.00', '1m ago'],
              ['1282', 110, 180, 200, 195, 175, 3, '$7.00', '2m ago'],
              ['1281', 90, 200, 320, 410, 480, 5, '$11.00', '3m ago'],
              ['1280', 120, 110, 80, 60, 30, 1, '$4.50', '4m ago'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--vanilla-200)' }}>
                {row.map((c, j) => (
                  <td key={j} style={{ padding: '8px 8px', color: j === 0 ? 'var(--ink-500)' : 'var(--ink-900)' }}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, {
  LandingScreen, ConsentScreen, LikertScreen, MultipleChoiceScreen,
  NumericScreen, OptionalHeaderScreen, ThankYouScreen, AdminScreen,
});
