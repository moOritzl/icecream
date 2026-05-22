/* eslint-disable */
// ──────────────────────────────────────────────────────────────
// App — Design Canvas wiring all sections + Tweaks
// ──────────────────────────────────────────────────────────────

// Context surfaces a few live tweak values to specific components
// (illustration scoops, etc). Everything else flows through CSS variables.
window.TweaksCtx = React.createContext({
  palette: 'pistachio', displayFont: 'Instrument Serif', grain: true, heroScoops: 3,
});

const W_DESKTOP = 1120;
const H_DESKTOP = 760;
const W_MOBILE_FRAME = 384;
const H_MOBILE_FRAME = 796;
const W_LIB = 640;
const H_LIB = 760;

function Canvas() {
  return (
    <DesignCanvas>
      <DCSection id="moodboard" title="01 — Direction"
        subtitle="The brief, the vibe, the don'ts.">
        <DCArtboard id="moodboard" label="Moodboard" width={W_LIB} height={H_LIB}>
          <MoodboardArtboard />
        </DCArtboard>
        <DCArtboard id="illustration" label="Illustration system" width={W_LIB} height={H_LIB}>
          <IllustrationArtboard />
        </DCArtboard>
      </DCSection>

      <DCSection id="tokens" title="02 — Design tokens"
        subtitle="Colors named by flavor. Three typefaces. 4px spacing. Six radii.">
        <DCArtboard id="color" label="Color palette" width={W_LIB} height={H_LIB}>
          <ColorArtboard />
        </DCArtboard>
        <DCArtboard id="type" label="Type scale" width={W_LIB} height={H_LIB}>
          <TypeArtboard />
        </DCArtboard>
        <DCArtboard id="spacing" label="Spacing &amp; radius" width={W_LIB} height={H_LIB}>
          <SpacingArtboard />
        </DCArtboard>
      </DCSection>

      <DCSection id="hero-q" title="03 — The hero: scoop-value question"
        subtitle="Three states of the heart of the survey, plus a fully interactive prototype.">
        <DCArtboard id="q1-only" label="State A · Q1 only" width={W_DESKTOP} height={H_DESKTOP}>
          <ScoopQuestionScreen
            currentIdx={0}
            answers={[null, null, null, null, null]}
            draft={100}
            showTooltip={true}
          />
        </DCArtboard>
        <DCArtboard id="q3-in-progress" label="State B · 3 answered, dragging Q3" width={W_DESKTOP} height={H_DESKTOP}>
          <ScoopQuestionScreen
            currentIdx={2}
            answers={[80, 175, null, null, null]}
            draft={230}
          />
        </DCArtboard>
        <DCArtboard id="all-five" label="State C · all 5 done" width={W_DESKTOP} height={H_DESKTOP}>
          <ScoopQuestionScreen
            currentIdx={4}
            answers={[80, 175, 230, 240, null]}
            draft={200}
          />
        </DCArtboard>
        <DCArtboard id="interactive" label="Try it · drag the slider" width={W_DESKTOP} height={H_DESKTOP}>
          <InteractivePrototype />
        </DCArtboard>
      </DCSection>

      <DCSection id="screens" title="04 — Other screens"
        subtitle="Landing, consent, question patterns, thank-you, admin.">
        <DCArtboard id="landing" label="Landing" width={W_DESKTOP} height={H_DESKTOP}>
          <LandingScreen />
        </DCArtboard>
        <DCArtboard id="consent" label="Consent" width={W_DESKTOP} height={H_DESKTOP}>
          <ConsentScreen />
        </DCArtboard>
        <DCArtboard id="optional" label="Optional section header" width={W_DESKTOP} height={H_DESKTOP}>
          <OptionalHeaderScreen />
        </DCArtboard>
        <DCArtboard id="likert" label="Likert 1–10" width={W_DESKTOP} height={H_DESKTOP}>
          <LikertScreen />
        </DCArtboard>
        <DCArtboard id="mc" label="Multiple choice" width={W_DESKTOP} height={H_DESKTOP}>
          <MultipleChoiceScreen />
        </DCArtboard>
        <DCArtboard id="numeric" label="Numeric with currency" width={W_DESKTOP} height={H_DESKTOP}>
          <NumericScreen />
        </DCArtboard>
        <DCArtboard id="numeric-err" label="Numeric · error state" width={W_DESKTOP} height={H_DESKTOP}>
          <NumericScreen error={true} />
        </DCArtboard>
        <DCArtboard id="thanks" label="Thank-you + your curve" width={W_DESKTOP} height={H_DESKTOP}>
          <ThankYouScreen />
        </DCArtboard>
        <DCArtboard id="thanks-copied" label="Thank-you · token copied" width={W_DESKTOP} height={H_DESKTOP}>
          <ThankYouScreen copied={true} />
        </DCArtboard>
      </DCSection>

      <DCSection id="admin" title="05 — Admin dashboard"
        subtitle="What Maya sees when she logs in.">
        <DCArtboard id="admin-main" label="Admin · live data" width={W_DESKTOP} height={H_DESKTOP}>
          <AdminScreen />
        </DCArtboard>
      </DCSection>

      <DCSection id="mobile" title="06 — Mobile"
        subtitle="Where most respondents will be.">
        <DCArtboard id="m-first" label="Mobile · Q1 only" width={W_MOBILE_FRAME} height={H_MOBILE_FRAME}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'var(--vanilla-50)' }}>
            <ScoopMobileArtboard state="first" />
          </div>
        </DCArtboard>
        <DCArtboard id="m-mid" label="Mobile · 3 in" width={W_MOBILE_FRAME} height={H_MOBILE_FRAME}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'var(--vanilla-50)' }}>
            <ScoopMobileArtboard state="mid" />
          </div>
        </DCArtboard>
        <DCArtboard id="m-done" label="Mobile · all done" width={W_MOBILE_FRAME} height={H_MOBILE_FRAME}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'var(--vanilla-50)' }}>
            <ScoopMobileArtboard state="done" />
          </div>
        </DCArtboard>
        <DCArtboard id="m-thanks" label="Mobile · thank-you" width={W_MOBILE_FRAME} height={H_MOBILE_FRAME}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'var(--vanilla-50)' }}>
            <ThankYouMobileArtboard />
          </div>
        </DCArtboard>
      </DCSection>

      <DCSection id="copy" title="07 — Microcopy &amp; accessibility"
        subtitle="Hand-off references for Claude Code.">
        <DCArtboard id="microcopy" label="Microcopy reference" width={W_LIB} height={H_LIB}>
          <MicrocopyArtboard />
        </DCArtboard>
        <DCArtboard id="a11y" label="Accessibility &amp; keyboard" width={W_LIB} height={H_LIB}>
          <A11yArtboard />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

// ── Palette swaps — bind the "primary" semantic to a chosen flavor ──
const PALETTES = {
  pistachio: null,
  strawberry: {
    '--pistachio-50':  '#FCEBEE',
    '--pistachio-200': '#F4B8C6',
    '--pistachio-500': '#DE5B7C',
    '--pistachio-700': '#A03554',
    // strawberry chips swap to pistachio so accents still contrast
    '--strawberry-50':  '#EFF5E6',
    '--strawberry-200': '#C7DBA5',
    '--strawberry-500': '#7FA859',
    '--strawberry-700': '#4F7233',
  },
  blueberry: {
    '--pistachio-50':  '#EEF0F8',
    '--pistachio-200': '#C3CAE6',
    '--pistachio-500': '#5D6FB8',
    '--pistachio-700': '#3D4A8F',
  },
};

const DISPLAY_FONTS = {
  'Instrument Serif': "'Instrument Serif', 'Iowan Old Style', Georgia, serif",
  'DM Serif Display': "'DM Serif Display', Georgia, serif",
  'Newsreader':       "'Newsreader', Georgia, serif",
};

function AppRoot() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "pistachio",
    "displayFont": "Instrument Serif",
    "grain": true,
    "heroScoops": 3
  }/*EDITMODE-END*/;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply CSS variables on the root so every artboard picks them up.
  React.useEffect(() => {
    const r = document.documentElement;
    // Clear previous overrides
    ['--pistachio-50','--pistachio-200','--pistachio-500','--pistachio-700',
     '--strawberry-50','--strawberry-200','--strawberry-500','--strawberry-700'].forEach((k) => r.style.removeProperty(k));
    const p = PALETTES[t.palette];
    if (p) Object.entries(p).forEach(([k, v]) => r.style.setProperty(k, v));
    r.style.setProperty('--font-display', DISPLAY_FONTS[t.displayFont] || DISPLAY_FONTS['Instrument Serif']);
    r.classList.toggle('no-grain', !t.grain);
  }, [t.palette, t.displayFont, t.grain]);

  return (
    <window.TweaksCtx.Provider value={t}>
      <Canvas />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Look &amp; feel">
          <TweakSelect label="Palette" value={t.palette}
            options={['pistachio', 'strawberry', 'blueberry']}
            onChange={(v) => setTweak('palette', v)} />
          <TweakSelect label="Display font" value={t.displayFont}
            options={['Instrument Serif', 'DM Serif Display', 'Newsreader']}
            onChange={(v) => setTweak('displayFont', v)} />
          <TweakToggle label="Paper grain" value={t.grain}
            onChange={(v) => setTweak('grain', v)} />
        </TweakSection>
        <TweakSection label="Hero illustration">
          <TweakRadio label="Scoops" value={String(t.heroScoops)}
            options={['1', '2', '3']}
            onChange={(v) => setTweak('heroScoops', Number(v))} />
        </TweakSection>
      </TweaksPanel>
    </window.TweaksCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppRoot />);
