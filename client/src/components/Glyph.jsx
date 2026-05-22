export default function Glyph({ kind, size = 24, color = 'var(--ink-700)' }) {
  const s = size;
  const stroke = { stroke: color, strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (kind === 'cone') return (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <path d="M7 11 L12 21 L17 11 Z" />
      <path d="M6 11 q-1 -6 6 -6 q7 0 6 6 z" fill="var(--pistachio-200)" />
    </svg>
  );
  if (kind === 'cherry') return (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <circle cx="9" cy="17" r="4" fill="var(--strawberry-500)" stroke={color} />
      <circle cx="16" cy="15" r="3" fill="var(--strawberry-500)" stroke={color} />
      <path d="M9 13 q 4 -6 10 -8" />
    </svg>
  );
  if (kind === 'scoop') return (
    <svg width={s} height={s} viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="7" fill="var(--strawberry-200)" />
      <path d="M8 11 q1 -3 4 -3" />
    </svg>
  );
  if (kind === 'check') return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="var(--pistachio-700)"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
  return null;
}
