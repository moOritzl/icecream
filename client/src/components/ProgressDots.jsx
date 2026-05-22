export default function ProgressDots({ total = 5, current, answers }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {Array.from({ length: total }, (_, i) => {
        const filled = answers && answers[i] != null;
        const isCurrent = i === current;
        return (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 2,
            background: filled
              ? 'var(--pistachio-500)'
              : isCurrent
                ? 'var(--strawberry-500)'
                : 'var(--vanilla-200)',
          }} />
        );
      })}
    </div>
  );
}
