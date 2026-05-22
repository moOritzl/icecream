/* eslint-disable */
// ──────────────────────────────────────────────────────────────
// Reference artboards: microcopy, a11y notes, interactive prototype
// ──────────────────────────────────────────────────────────────

function MicrocopyArtboard() {
  const Block = ({ title, rows }) => (
    <div style={{ marginBottom: 28 }}>
      <div className="eyebrow">{title}</div>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {rows.map(([k, v], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr',
            gap: 14, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid var(--vanilla-200)' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)', paddingTop: 2 }}>{k}</div>
            <div style={{ fontSize: 14, color: 'var(--ink-900)', lineHeight: 1.5 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div className="scoop-screen" style={{ padding: 40, overflow: 'auto' }}>
      <div className="eyebrow">06 · Microcopy</div>
      <h2 style={{ marginTop: 8, marginBottom: 4 }}>Playful, but precise.</h2>
      <p style={{ color: 'var(--ink-700)', marginTop: 0, maxWidth: 540 }}>
        Lowercase mono for system text. Italic display serif for moments
        of warmth. The error messages tell you what to do, not just what's wrong.
      </p>
      <div style={{ marginTop: 28 }}>
        <Block title="Question prompts" rows={[
          ['Q1', 'How much joy does 1 scoop bring you?'],
          ['Q1 anchor', 'baseline · we anchor everything to this'],
          ['Q2', 'How about 2 scoops?'],
          ['Q3', 'Now 3 scoops, stacked.'],
          ['Q4', '4 scoops, getting serious.'],
          ['Q4 anchor', "be honest — you don't have to finish it"],
          ['Q5', 'And finally, 5 scoops.'],
          ['Q5 anchor', 'last one. then we let you go.'],
        ]} />

        <Block title="Buttons" rows={[
          ['Primary CTA', 'Start the study →  /  Next scoop →  /  See your curve  /  Submit →'],
          ['Secondary', 'Read methodology  /  Skip  /  Share with a friend →'],
          ['Quiet', '← back'],
        ]} />

        <Block title="Consent" rows={[
          ['Checkbox', "I'm at least 13 years old, I've read the above, and I'd like to help. Pass me the ice cream."],
          ['Header', 'The fine print, kept short.'],
        ]} />

        <Block title="Error states" rows={[
          ['Out of range', 'Please pick a value between 0 and 500.'],
          ['Price too high', "That's higher than the most expensive scoop on record. Please enter a value between $0 and $50."],
          ['Network', "Connection hiccupped. We'll resend on its own — leave this tab open."],
          ['Skipped required', 'This one we actually need. Pick anywhere on the slider and continue.'],
        ]} />

        <Block title="Thank-you screen" rows={[
          ['Headline', "Thank you. You're the data."],
          ['Subhead', 'Your curve peaked at {peak} scoops — same as {pct}% of folks before you.'],
          ['Token label', 'Deletion token · save this'],
          ['Token helper', 'Mail this to delete@scoops.study any time to erase your responses.'],
        ]} />

        <Block title="System chrome" rows={[
          ['Progress', 'QUESTION 03 OF 05'],
          ['Optional banner', 'OPTIONAL · ABOUT 30 SECONDS'],
          ['Footer', '← / → ±5  ·  shift+← / → ±25  ·  enter to confirm'],
          ['Loading', 'Drawing your curve…'],
        ]} />

        <Block title="Tone rules" rows={[
          ['Voice', 'Curious senior grad student. Owns the project. Never marketing.'],
          ['Use', "Contractions ('you're', 'we'll'), em-dashes, lowercase mono."],
          ['Avoid', "Exclamation points (mostly). Emoji. 'Awesome!' 'Yay!' 'Whoops!'"],
        ]} />
      </div>
    </div>
  );
}

function A11yArtboard() {
  const Spec = ({ label, value, status = 'pass' }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 12, padding: '10px 0',
      borderTop: '1px solid var(--vanilla-200)', alignItems: 'center' }}>
      <div style={{ fontSize: 14, color: 'var(--ink-900)' }}>{label}</div>
      <div className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>{value}</div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10,
        padding: '3px 8px', borderRadius: 999,
        background: status === 'pass' ? 'var(--mint-200)' : 'var(--honeycomb-200)',
        color: status === 'pass' ? 'var(--mint-500)' : 'var(--honeycomb-500)',
      }}>{status === 'pass' ? '✓ PASS' : 'NOTE'}</div>
    </div>
  );
  return (
    <div className="scoop-screen" style={{ padding: 40, overflow: 'auto' }}>
      <div className="eyebrow">07 · Accessibility</div>
      <h2 style={{ marginTop: 8, marginBottom: 4 }}>It has to work for everyone.</h2>
      <p style={{ color: 'var(--ink-700)', marginTop: 0, maxWidth: 540 }}>
        WCAG 2.2 AA for body content; AAA where the palette allows. The slider
        is the only novel component and gets extra attention.
      </p>

      <h3 style={{ marginTop: 28, marginBottom: 6 }}>Contrast</h3>
      <Spec label="Body text · ink-900 on vanilla-50" value="14.8 : 1" />
      <Spec label="Secondary · ink-700 on vanilla-50" value="8.6 : 1" />
      <Spec label="Helper · ink-500 on vanilla-50" value="4.7 : 1" />
      <Spec label="Primary button · vanilla-50 on pistachio-500" value="3.4 : 1" status="note" />
      <Spec label="Primary button · vanilla-50 on pistachio-700 (hover)" value="6.2 : 1" />
      <div className="caption" style={{ marginTop: 6, color: 'var(--ink-700)' }}>
        Note: pistachio-500 alone is below AA 4.5:1 for ≤18px text. Buttons solve
        this with 15px @ weight 500 (qualifies as "large") <i>and</i> ship at
        pistachio-700 on hover/focus. Verified.
      </div>

      <h3 style={{ marginTop: 28, marginBottom: 6 }}>Slider — keyboard pattern</h3>
      <div className="card" style={{ padding: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, fontSize: 14, color: 'var(--ink-900)' }}>
          <kbd style={kbd}>← / →</kbd> <div>nudge by ±5%</div>
          <kbd style={kbd}>↑ / ↓</kbd> <div>same as ←/→</div>
          <kbd style={kbd}>shift + ← / →</kbd> <div>large step ±25%</div>
          <kbd style={kbd}>Home / End</kbd> <div>jump to 0% / 500%</div>
          <kbd style={kbd}>Enter</kbd> <div>confirm and advance</div>
          <kbd style={kbd}>Tab</kbd> <div>moves to the Next button</div>
        </div>
      </div>

      <h3 style={{ marginTop: 28, marginBottom: 6 }}>Slider — ARIA</h3>
      <div className="card" style={{ padding: 16, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.7 }}>
        role="slider" · aria-valuemin="0" · aria-valuemax="500"<br/>
        aria-valuenow="&#123;value&#125;" · aria-valuetext="&#123;value&#125; percent of one-scoop joy"<br/>
        aria-labelledby="q&#123;n&#125;-prompt" · aria-describedby="q&#123;n&#125;-help"
      </div>

      <h3 style={{ marginTop: 28, marginBottom: 6 }}>Touch &amp; pointer</h3>
      <Spec label="Slider thumb target" value="44 × 44 px" />
      <Spec label="Likert / MC option" value="60 × 60 px (min 48)" />
      <Spec label="Focus ring" value="3 px outer · pistachio-500 @ 35%" />
      <Spec label="Reduced motion" value="prefers-reduced-motion → no transitions on track fill" />

      <h3 style={{ marginTop: 28, marginBottom: 6 }}>Other</h3>
      <Spec label="Form errors" value="announced via role=alert" />
      <Spec label="Survey progress" value="aria-current=step on dot" />
      <Spec label="Color-only meaning" value="never · always paired with shape or text" />
      <Spec label="Screen reader test" value="VoiceOver iOS · NVDA Windows · weekly" />
    </div>
  );
}
const kbd = {
  display: 'inline-block', padding: '3px 8px', background: 'var(--vanilla-200)',
  borderRadius: 6, border: '1px solid var(--cream-300)', fontFamily: 'var(--font-mono)',
  fontSize: 12, color: 'var(--ink-900)',
};

// ──────────────────────────────────────────────────────────────
// Interactive prototype: fully working scoop question
// ──────────────────────────────────────────────────────────────
function InteractivePrototype() {
  const [answers, setAnswers] = React.useState([100, null, null, null, null]);
  const [idx, setIdx] = React.useState(0);
  const [draft, setDraft] = React.useState(100);
  const [showTip, setShowTip] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    setDraft(answers[idx] != null ? answers[idx] : 100);
  }, [idx]);

  const onChange = (v) => {
    setDraft(v);
  };

  const advance = () => {
    const next = answers.slice();
    next[idx] = draft;
    setAnswers(next);
    if (idx < 4) setIdx(idx + 1);
    else setSubmitted(true);
  };
  const back = () => {
    if (idx > 0) setIdx(idx - 1);
  };
  const restart = () => {
    setAnswers([100, null, null, null, null]);
    setIdx(0); setDraft(100); setSubmitted(false);
  };

  if (submitted) {
    const yours = answers.map((v, i) => i === idx ? draft : v);
    return (
      <div className="scoop-screen grain" style={{ padding: 36, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ThankYouMark size={40} />
            <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.study</span>
          </div>
          <button className="btn btn-quiet" onClick={restart}>↺ try again</button>
        </div>
        <h1 style={{ fontSize: 56, margin: '20px 0 6px' }}>Thank you. <br/>You're the data.</h1>
        <p style={{ color: 'var(--ink-700)', maxWidth: 460, marginTop: 0 }}>
          Your curve, plotted live as you answered:
        </p>
        <div className="card" style={{ padding: 16, marginTop: 16 }}>
          <CurveChart answers={yours} currentIdx={-1} width={440} height={240} />
        </div>
        <div className="caption" style={{ marginTop: 12 }}>
          Submission #1,285 · token <span className="mono" style={{ color: 'var(--ink-900)' }}>scoop-1285-mint-saturn</span>
        </div>
      </div>
    );
  }

  const q = SCOOP_QUESTIONS[idx];
  const filled = answers.map((v, i) => i === idx ? draft : v);
  const done = answers.filter((a) => a != null).length;

  return (
    <div className="scoop-screen" style={{ display: 'flex', flexDirection: 'column', padding: 36 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ScoopCone size={28} scoops={1} />
          <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.study</span>
        </div>
        <div className="eyebrow">QUESTION 0{idx + 1} OF 05</div>
      </header>
      <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
        {SCOOP_QUESTIONS.map((_, i) => {
          const f = i < idx || answers[i] != null;
          const here = i === idx;
          return <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: here ? 'var(--strawberry-500)' : f ? 'var(--pistachio-500)' : 'var(--vanilla-200)',
            transition: 'background .2s',
          }} />;
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 36, marginTop: 32, flex: 1, alignItems: 'start' }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--strawberry-700)' }}>{q.label}</div>
          <h1 style={{ fontSize: 44, margin: '6px 0 4px' }}>{q.prompt}</h1>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 6 }}>
            <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: 0, maxWidth: 460 }}>
              {q.anchor}{' '}
              <span
                onMouseEnter={() => setShowTip(true)}
                onMouseLeave={() => setShowTip(false)}
                onFocus={() => setShowTip(true)} onBlur={() => setShowTip(false)}
                tabIndex={0}
                style={{ borderBottom: '1.5px dotted var(--ink-500)', cursor: 'help', whiteSpace: 'nowrap' }}>
                What does 100% mean?
              </span>
            </p>
            <UnitTooltip open={showTip} />
          </div>

          <div style={{
            margin: '28px 0 14px',
            display: 'flex', alignItems: 'flex-end', gap: 12, height: 130,
          }}>
            {Array.from({ length: q.n }, (_, i) => (
              <div key={i} style={{
                width: 68, height: 68, borderRadius: 999,
                background: i % 2 === 0 ? 'var(--pistachio-200)' : 'var(--strawberry-200)',
                border: '2px solid var(--ink-900)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 24, color: 'var(--ink-900)',
                transform: `translateY(${-i * 6}px) rotate(${i % 2 ? -3 : 3}deg)`,
                transition: 'transform .25s',
              }}>{i + 1}</div>
            ))}
          </div>

          <ScoopSlider value={draft} onChange={onChange} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
            <button className="btn btn-quiet" disabled={idx === 0} onClick={back}
              style={{ opacity: idx === 0 ? .35 : 1 }}>← back</button>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span className="caption">{done}/5 answered</span>
              <button className="btn btn-primary" onClick={advance}>
                {idx === 4 ? 'See your curve →' : 'Next scoop →'}
              </button>
            </div>
          </div>
        </div>
        <div className="card" style={{ padding: 18, alignSelf: 'stretch' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div className="eyebrow">Your curve so far</div>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>live</span>
          </div>
          <CurveChart answers={filled} currentIdx={idx} width={340} height={240} />
          <div style={{ marginTop: 10, fontSize: 13, color: 'var(--ink-700)' }}>
            Drag the slider to feel the curve respond in real time. Each
            answered point is locked in when you hit "next."
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MicrocopyArtboard, A11yArtboard, InteractivePrototype });
