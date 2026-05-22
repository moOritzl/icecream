import { useRef } from 'react';

export default function ScoopSlider({ value, onChange, disabled }) {
  const trackRef = useRef(null);
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
        <div style={{
          position: 'relative', height: 8, borderRadius: 999,
          background: `linear-gradient(to right, var(--pistachio-200) 0%, var(--pistachio-200) ${pct}%, var(--strawberry-200) ${pct}%, var(--strawberry-200) 100%)`,
        }} />
        {/* 100% anchor tick */}
        <div style={{
          position: 'absolute', top: 18, left: '20%', transform: 'translateX(-50%)',
          width: 2, height: 20, background: 'var(--pistachio-700)', borderRadius: 1,
        }} />
        <div style={{
          position: 'absolute', top: -4, left: '20%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--pistachio-700)', whiteSpace: 'nowrap',
        }}>100%</div>
        {/* small ticks */}
        {ticks.filter((t) => t !== 100).map((t) => (
          <div key={t} style={{
            position: 'absolute', top: 22, left: `${(t / 500) * 100}%`, transform: 'translateX(-50%)',
            width: 1, height: 12, background: 'var(--ink-300)',
          }} />
        ))}
        {/* thumb */}
        <button
          role="slider"
          aria-valuemin={0} aria-valuemax={500} aria-valuenow={value}
          aria-valuetext={`${value} percent`}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={onKey}
          style={{
            position: 'absolute', top: 16, left: `${pct}%`, transform: 'translate(-50%, 0)',
            width: 32, height: 32, borderRadius: 999, border: '2px solid var(--ink-900)',
            background: 'var(--vanilla-50)', cursor: disabled ? 'default' : 'grab',
            boxShadow: 'var(--shadow-md)', padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--strawberry-500)' }} />
        </button>
        {/* live bubble */}
        <div style={{
          position: 'absolute', top: -28, left: `${pct}%`, transform: 'translateX(-50%)',
          background: 'var(--ink-900)', color: 'var(--vanilla-50)',
          fontFamily: 'var(--font-mono)', fontSize: 12, padding: '3px 8px', borderRadius: 6, whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          {value}%
        </div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)',
        fontSize: 11, color: 'var(--ink-500)', marginTop: 4,
      }}>
        <span>0% · hated it</span>
        <span>100% · same as 1 scoop</span>
        <span>500% · five-fold joy</span>
      </div>
    </div>
  );
}
