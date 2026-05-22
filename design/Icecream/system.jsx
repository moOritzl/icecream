/* eslint-disable */
// ──────────────────────────────────────────────────────────────
// Design system artboards: moodboard, color, type, spacing, radius
// ──────────────────────────────────────────────────────────────

const Swatch = ({ name, hex, ink = 'var(--ink-900)' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div style={{ width: '100%', height: 76, background: hex, borderRadius: 12, border: '1px solid rgba(43,31,18,.06)' }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: ink }}>
      <span style={{ fontWeight: 600 }}>{name}</span>
      <span className="mono" style={{ color: 'var(--ink-500)' }}>{hex}</span>
    </div>
  </div>
);

const ColorRow = ({ title, items }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    <div className="eyebrow">{title}</div>
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 12 }}>
      {items.map(([n, h]) => <Swatch key={n} name={n} hex={h} />)}
    </div>
  </div>
);

function MoodboardArtboard() {
  const moods = [
    { title: 'Stripe docs', desc: 'Confident, generous whitespace, content-first.' },
    { title: 'A gelato menu', desc: 'Handwritten warmth, palette named by flavor.' },
    { title: 'Scandinavian risograph zine', desc: 'Limited palette, gentle grain, soft edges.' },
    { title: 'Aspen Magazine, 1965', desc: 'Italic serif headlines, mono captions, paper feel.' },
    { title: 'A field notebook', desc: 'Marginalia, hand-numbered, observed not designed.' },
  ];
  return (
    <div className="scoop-screen grain" style={{ padding: 40, overflow: 'auto' }}>
      <div className="eyebrow">01 · Moodboard</div>
      <h1 style={{ fontSize: 56, margin: '12px 0 8px' }}>
        A serious survey,<br /> served lukewarm.
      </h1>
      <p style={{ color: 'var(--ink-700)', maxWidth: 540, marginTop: 0 }}>
        Indie research project, summery palette, ice-cream theme. Credible
        enough for IRB review; warm enough to finish on a phone in line at
        the co-op.
      </p>

      <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {moods.map((m, i) => (
          <div key={m.title} className="card" style={{ padding: 20 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>0{i + 1}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 24, marginTop: 4 }}>{m.title}</div>
            <div style={{ fontSize: 14, color: 'var(--ink-700)', marginTop: 4 }}>{m.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28, display: 'flex', gap: 24, flexWrap: 'wrap', color: 'var(--ink-700)', fontSize: 14 }}>
        <span><b style={{ color: 'var(--ink-900)' }}>Yes:</b> soft, observed, slow.</span>
        <span><b style={{ color: 'var(--ink-900)' }}>No:</b> gradient blobs, 3D ice-cream emoji, neumorphic.</span>
      </div>
    </div>
  );
}

function ColorArtboard() {
  return (
    <div className="scoop-screen" style={{ padding: 40, overflow: 'auto' }}>
      <div className="eyebrow">02 · Color</div>
      <h2 style={{ marginTop: 8, marginBottom: 4 }}>Palette named by flavor.</h2>
      <p style={{ color: 'var(--ink-700)', marginTop: 0, maxWidth: 560 }}>
        Low chroma so a full screen of swatches still reads as research, not
        candy shop. Pistachio carries actions; strawberry highlights the
        respondent's own data.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 28 }}>
        <ColorRow title="Surfaces — vanilla cream" items={[
          ['vanilla-50', '#FFFBF1'],
          ['vanilla-100', '#FBF4E3'],
          ['vanilla-200', '#F3E9D0'],
          ['cream-300', '#E8D9B3'],
        ]} />
        <ColorRow title="Ink — warm neutral" items={[
          ['ink-900', '#2B1F12'],
          ['ink-700', '#564636'],
          ['ink-500', '#8A7A66'],
          ['ink-300', '#BFB09A'],
        ]} />
        <ColorRow title="Pistachio · primary" items={[
          ['p-50', '#EFF5E6'],
          ['p-200', '#C7DBA5'],
          ['p-500', '#7FA859'],
          ['p-700', '#4F7233'],
          ['p-900', '#2C4119'],
        ]} />
        <ColorRow title="Strawberry · accent" items={[
          ['s-50', '#FCEBEE'],
          ['s-200', '#F4B8C6'],
          ['s-500', '#DE5B7C'],
          ['s-700', '#A03554'],
        ]} />
        <ColorRow title="Status" items={[
          ['mint (ok)', '#4FA68C'],
          ['honey (warn)', '#D9A441'],
          ['cherry (err)', '#C84B3E'],
          ['blueberry (data)', '#5D6FB8'],
        ]} />
      </div>

      <div className="card" style={{ marginTop: 28, padding: 20 }}>
        <div className="eyebrow">Contrast</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10, fontSize: 13 }}>
          <div>ink-900 on vanilla-50 — <span className="mono" style={{ color: 'var(--mint-500)' }}>14.8 : 1 ✓ AAA</span></div>
          <div>ink-700 on vanilla-50 — <span className="mono" style={{ color: 'var(--mint-500)' }}>8.6 : 1 ✓ AAA</span></div>
          <div>pistachio-700 on vanilla-50 — <span className="mono" style={{ color: 'var(--mint-500)' }}>5.4 : 1 ✓ AA</span></div>
          <div>strawberry-700 on vanilla-50 — <span className="mono" style={{ color: 'var(--mint-500)' }}>6.1 : 1 ✓ AA</span></div>
        </div>
      </div>
    </div>
  );
}

function TypeArtboard() {
  const Row = ({ label, font, size, weight = 400, italic = true, sample, note }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 160px', gap: 16, alignItems: 'baseline',
      padding: '14px 0', borderTop: '1px solid var(--vanilla-200)' }}>
      <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>{label}</div>
      <div style={{ fontFamily: font, fontSize: size, fontWeight: weight, fontStyle: italic && font.includes('Instrument') ? 'italic' : 'normal',
        lineHeight: 1.1, color: 'var(--ink-900)' }}>{sample}</div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>{note}</div>
    </div>
  );
  return (
    <div className="scoop-screen" style={{ padding: 40, overflow: 'auto' }}>
      <div className="eyebrow">03 · Type</div>
      <h2 style={{ marginTop: 8, marginBottom: 4 }}>Three faces, all free.</h2>
      <p style={{ color: 'var(--ink-700)', marginTop: 0, maxWidth: 560 }}>
        <b>Instrument Serif</b> (italic) for headlines — gives the indie tilt.
        <b> Geist</b> for body — clean, neutral, easy at 14–16px.
        <b> JetBrains Mono</b> for numbers, captions, IDs. All on Google Fonts; self-host for GDPR.
      </p>

      <div style={{ marginTop: 24 }}>
        <Row label="display"  font="Instrument Serif" size={64}  sample="Two scoops, please." note="64 / 70" />
        <Row label="h1"       font="Instrument Serif" size={44}  sample="How much is enough?" note="44 / 48" />
        <Row label="h2"       font="Instrument Serif" size={32}  sample="The shape of pleasure" note="32 / 40" />
        <Row label="h3"       font="Geist" weight={600} italic={false} size={22}  sample="Section heading" note="22 / 30 · 600" />
        <Row label="h4"       font="Geist" weight={600} italic={false} size={18}  sample="Question prompt" note="18 / 26 · 600" />
        <Row label="body"     font="Geist" italic={false} size={16}  sample="The first scoop is a revelation; the fifth, an obligation." note="16 / 26 · 400" />
        <Row label="small"    font="Geist" italic={false} size={14}  sample="Privacy notice · 90 seconds · no cookies set" note="14 / 22" />
        <Row label="caption"  font="JetBrains Mono" italic={false} size={12} weight={500} sample="n = 1,284 · σ = 32%" note="12 / 18 · mono" />
        <Row label="eyebrow"  font="JetBrains Mono" italic={false} size={11} weight={500} sample="QUESTION 03 OF 05" note="11 · uppercase · +14%" />
      </div>
    </div>
  );
}

function SpacingArtboard() {
  const sp = [
    ['s-1', 4], ['s-2', 8], ['s-3', 12], ['s-4', 16], ['s-5', 20], ['s-6', 24],
    ['s-8', 32], ['s-10', 40], ['s-12', 48], ['s-16', 64], ['s-20', 80],
  ];
  const rad = [['r-1', 4], ['r-2', 8], ['r-3', 12], ['r-4', 16], ['r-5', 24], ['r-pill', 36]];
  return (
    <div className="scoop-screen" style={{ padding: 40, overflow: 'auto' }}>
      <div className="eyebrow">04 · Spacing &amp; radius</div>
      <h2 style={{ marginTop: 8, marginBottom: 4 }}>4-pixel grid, six radii.</h2>
      <p style={{ color: 'var(--ink-700)', marginTop: 0, maxWidth: 540 }}>
        Tight scale near the bottom (densest hit-targets are 32–44px), generous
        at the top (section breathing room).
      </p>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sp.map(([n, v]) => (
          <div key={n} style={{ display: 'grid', gridTemplateColumns: '90px 60px 1fr', alignItems: 'center', gap: 16 }}>
            <div className="mono" style={{ fontSize: 12, color: 'var(--ink-500)' }}>{n}</div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>{v}px</div>
            <div style={{ height: 12, width: v, background: 'var(--pistachio-200)', borderLeft: '2px solid var(--pistachio-700)' }} />
          </div>
        ))}
      </div>

      <div className="eyebrow" style={{ marginTop: 32 }}>Radius</div>
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
        {rad.map(([n, v]) => (
          <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, background: 'var(--vanilla-100)', borderRadius: v, border: '1px solid var(--cream-300)' }} />
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-700)' }}>{n}</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-500)' }}>{v === 36 ? '999px' : v + 'px'}</div>
          </div>
        ))}
      </div>

      <div className="eyebrow" style={{ marginTop: 32 }}>Elevation</div>
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {['var(--shadow-sm)', 'var(--shadow-md)', 'var(--shadow-lg)'].map((s, i) => (
          <div key={i} style={{ background: 'var(--vanilla-50)', height: 72, borderRadius: 12, boxShadow: s,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-500)' }}>
            shadow-{['sm', 'md', 'lg'][i]}
          </div>
        ))}
      </div>
    </div>
  );
}

function IllustrationArtboard() {
  const t = React.useContext(window.TweaksCtx || React.createContext({}));
  const heroScoops = t.heroScoops || 3;
  return (
    <div className="scoop-screen" style={{ padding: 40, overflow: 'auto' }}>
      <div className="eyebrow">05 · Illustration</div>
      <h2 style={{ marginTop: 8, marginBottom: 4 }}>Two-color, all SVG.</h2>
      <p style={{ color: 'var(--ink-700)', marginTop: 0, maxWidth: 540 }}>
        Single hero cone + a small "thanks" mark + tiny section glyphs.
        Stroke-based so they scale and stay under 4 KB each.
      </p>

      <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 240 }}>
          <ScoopCone size={180} scoops={heroScoops} />
        </div>
        <div className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 240 }}>
          <ThankYouMark size={140} />
        </div>
      </div>

      <div className="eyebrow" style={{ marginTop: 28 }}>Section glyphs (decorate question numbers)</div>
      <div style={{ marginTop: 12, display: 'flex', gap: 18, alignItems: 'center' }}>
        {['cone', 'scoop', 'drip', 'cherry', 'spoon'].map((k) => (
          <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <Glyph kind={k} size={36} />
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Illustrations
// ──────────────────────────────────────────────────────────────
function ScoopCone({ size = 160, scoops = 3, melting = false, palette }) {
  // Each scoop is drawn over the previous so the boundary curve (the
  // overlapping scoop's lower edge) reads as the natural "scoop interface"
  // ridge inside the lower scoop's body. Lower scoops are larger and
  // slightly off-center so the stack feels piped, not stacked.
  const ink = 'var(--ink-900)';
  const cream = 'var(--vanilla-200)';
  const colors = palette || ['var(--pistachio-500)', 'var(--strawberry-500)', 'var(--vanilla-100)'];
  // Unique clipPath id so multiple cones on a page don't collide.
  const uid = React.useId();
  const clipId = 'cone-clip-' + uid.replace(/:/g, '');

  // Bottom scoop: a wide oval with a "lick" indent on the upper-left and
  // a small drip overhanging the rim of the cone on the right.
  // Coordinate system: 200×240 viewBox, cone rim is at y=140.
  // All scoops are the SAME shape and size — the stack should feel like
  // three equal scoops "overloading" the cone, not a tapered pile.
  const scoop = (cy) => (
    `M ${100 - 46} ${cy} \
     C ${100 - 52} ${cy - 32}, ${100 - 30} ${cy - 52}, ${100} ${cy - 52} \
     C ${100 + 30} ${cy - 52}, ${100 + 52} ${cy - 32}, ${100 + 46} ${cy} \
     C ${100 + 30} ${cy + 6}, ${100 - 30} ${cy + 6}, ${100 - 46} ${cy} Z`
  );
  // Bottom curve y-position for each scoop. The bottom scoop's curve dips
  // below the cone rim (y=140 at the edges, y=134 in the middle) so the
  // scoop body actually covers and "sits on" the rim instead of floating
  // above it. Each scoop above is offset 30px up for natural overlap.
  const scoopY = [142, 112, 82];
  const scoopPaths = scoopY.map((y) => scoop(y));

  // Subtle highlight lines inside each scoop — implies the spoon swirl
  const swirls = scoopY.map((y) => `M ${100 - 28} ${y - 12} Q ${100 - 18} ${y - 22}, ${100 - 6} ${y - 22}`);

  return (
    <svg width={size} height={size} viewBox="0 0 200 240" fill="none" stroke={ink} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      {/* cast shadow */}
      <ellipse cx="100" cy="232" rx="38" ry="4" fill="var(--ink-900)" opacity="0.08" stroke="none" />

      {/* cone — wider mouth so the scoop stack actually fits in it.
          Rim spans x=50–150, tip at (100, 228). */}
      <defs>
        <clipPath id={clipId}>
          <path d="M 50 140 Q 100 132, 150 140 L 100 228 Z" />
        </clipPath>
      </defs>
      <path d="M 50 140 Q 100 132, 150 140 L 100 228 Z" fill={cream} />
      {/* waffle: diamonds, clipped to the cone outline */}
      <g clipPath={`url(#${clipId})`} stroke="var(--ink-700)" strokeWidth="1.1" opacity="0.55" fill="none">
        {/* right-leaning diagonals: y = (x - x0) + 140 */}
        {[30, 48, 66, 84, 102, 120, 138].map((x0) => (
          <line key={'r' + x0} x1={x0} y1={140} x2={x0 + 100} y2={240} />
        ))}
        {/* left-leaning diagonals: y = -(x - x1) + 140 */}
        {[62, 80, 98, 116, 134, 152, 170].map((x1) => (
          <line key={'l' + x1} x1={x1} y1={140} x2={x1 - 100} y2={240} />
        ))}
      </g>
      {/* cone outline last so the waffle strokes don't bleed past the edges */}
      <path d="M 50 140 L 100 228 L 150 140" />
      <path d="M 50 140 Q 100 132, 150 140" />

      {/* a small drip down the cone rim, on the side where the bottom scoop overhangs */}
      {melting && (
        <path d={`M 62 140 Q 60 156, 66 160 Q 70 156, 68 142 Z`}
              fill={colors[0]} />
      )}

      {/* scoop 1 (always shown) */}
      <path d={scoopPaths[0]} fill={colors[0]} />
      <path d={swirls[0]} stroke="var(--ink-900)" strokeWidth="1.2" opacity="0.35" fill="none" />

      {/* scoop 2 */}
      {scoops >= 2 && (
        <g>
          <path d={scoopPaths[1]} fill={colors[1] || colors[0]} />
          <path d={swirls[1]} stroke="var(--ink-900)" strokeWidth="1.2" opacity="0.35" fill="none" />
        </g>
      )}

      {/* scoop 3 */}
      {scoops >= 3 && (
        <g>
          <path d={scoopPaths[2]} fill={colors[2] || colors[1] || colors[0]} />
          <path d={swirls[2]} stroke="var(--ink-900)" strokeWidth="1.2" opacity="0.35" fill="none" />
        </g>
      )}

      {/* cherry on top — always sits on the topmost visible scoop */}
      {(() => {
        const topY = scoopY[scoops - 1] - 52; // top of topmost dome
        const cy = topY + 4;
        return (
          <g>
            <path d={`M ${100 + 4} ${cy} Q ${100 + 10} ${cy - 10}, ${100 + 18} ${cy - 10}`}
                  stroke="var(--pistachio-700)" strokeWidth="2" fill="none" />
            <circle cx="100" cy={cy} r="6" fill="var(--strawberry-500)" />
            <circle cx="98" cy={cy - 2} r="1.4" fill="var(--vanilla-50)" stroke="none" />
          </g>
        );
      })()}
    </svg>
  );
}

function ThankYouMark({ size = 140 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
      <circle cx="80" cy="80" r="64" fill="var(--strawberry-50)" stroke="var(--ink-900)" strokeWidth="2" />
      <path d="M48 90 q 32 28 64 0" stroke="var(--ink-900)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="68" r="3.5" fill="var(--ink-900)" />
      <circle cx="100" cy="68" r="3.5" fill="var(--ink-900)" />
      <path d="M30 30 l -8 -10 M130 30 l 8 -10 M20 80 l -12 0 M140 80 l 12 0 M30 130 l -8 10 M130 130 l 8 10"
        stroke="var(--strawberry-500)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Glyph({ kind, size = 24, color = 'var(--ink-700)' }) {
  const s = size;
  const stroke = { stroke: color, strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'cone') return (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <path d="M7 11 L12 21 L17 11 Z" />
      <path d="M6 11 q-1 -6 6 -6 q7 0 6 6 z" fill="var(--pistachio-200)" />
    </svg>
  );
  if (kind === 'scoop') return (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="7" fill="var(--strawberry-200)" />
      <path d="M8 11 q1 -3 4 -3" />
    </svg>
  );
  if (kind === 'drip') return (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <path d="M12 4 q -5 8 -5 12 a 5 5 0 0 0 10 0 q 0 -4 -5 -12 z" fill="var(--vanilla-200)" />
    </svg>
  );
  if (kind === 'cherry') return (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <circle cx="9" cy="17" r="4" fill="var(--strawberry-500)" stroke={color} />
      <circle cx="16" cy="15" r="3" fill="var(--strawberry-500)" stroke={color} />
      <path d="M9 13 q 4 -6 10 -8" />
    </svg>
  );
  if (kind === 'spoon') return (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <ellipse cx="9" cy="8" rx="4" ry="5" fill="var(--vanilla-200)" />
      <path d="M11 11 L18 19" />
    </svg>
  );
  return null;
}

Object.assign(window, { MoodboardArtboard, ColorArtboard, TypeArtboard, SpacingArtboard, IllustrationArtboard, ScoopCone, ThankYouMark, Glyph });
