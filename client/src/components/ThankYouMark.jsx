export default function ThankYouMark({ size = 80 }) {
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
