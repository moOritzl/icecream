export default function CurveChart({ answers, currentIdx, width = 320, height = 220, mini = false, secondaryCurve = null }) {
  const padL = mini ? 28 : 36, padR = 14, padT = 14, padB = mini ? 22 : 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const xOf = (n) => padL + ((n - 0.5) / 5) * innerW;
  const yOf = (v) => padT + innerH - (Math.min(500, Math.max(0, v)) / 500) * innerH;

  const yTicks = [0, 100, 200, 300, 400, 500];
  const pts = answers.map((v, i) => v == null ? null : [xOf(i + 1), yOf(v)]).filter(Boolean);
  const path = pts.length >= 2 ? 'M ' + pts.map((p) => p.join(' ')).join(' L ') : null;

  const secPts = secondaryCurve
    ? secondaryCurve.map((v, i) => v == null ? null : [xOf(i + 1), yOf(v)]).filter(Boolean)
    : null;
  const secPath = secPts && secPts.length >= 2
    ? 'M ' + secPts.map((p) => p.join(' ')).join(' L ')
    : null;

  return (
    <svg width={width} height={height} style={{ overflow: 'visible', display: 'block' }}>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={padL} x2={width - padR} y1={yOf(t)} y2={yOf(t)}
            stroke={t === 100 ? 'var(--pistachio-200)' : 'var(--vanilla-200)'}
            strokeDasharray={t === 100 ? '0' : '2 4'}
            strokeWidth={t === 100 ? 1.5 : 1} />
          <text x={padL - 8} y={yOf(t) + 4} textAnchor="end"
            fontFamily="JetBrains Mono, monospace" fontSize={mini ? 9 : 10}
            fill={t === 100 ? 'var(--pistachio-700)' : 'var(--ink-500)'}>{t}{mini ? '' : '%'}</text>
        </g>
      ))}
      <line x1={padL} x2={width - padR} y1={yOf(0)} y2={yOf(0)} stroke="var(--ink-300)" />
      {[1, 2, 3, 4, 5].map((n) => (
        <g key={n}>
          <line x1={xOf(n)} x2={xOf(n)} y1={yOf(0)} y2={yOf(0) + 4} stroke="var(--ink-300)" />
          <text x={xOf(n)} y={yOf(0) + 16} textAnchor="middle"
            fontFamily="JetBrains Mono, monospace" fontSize={mini ? 9 : 10}
            fill={currentIdx != null && n === currentIdx + 1 ? 'var(--strawberry-700)' : 'var(--ink-500)'}>{n}</text>
        </g>
      ))}
      <circle cx={xOf(1)} cy={yOf(100)} r={3} fill="var(--pistachio-200)" stroke="var(--pistachio-700)" strokeWidth="1.2" />

      {secPath && (
        <path d={secPath} fill="none" stroke="var(--ink-400)" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" opacity="0.6" />
      )}
      {path && (
        <path d={path} fill="none" stroke="var(--strawberry-500)" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round" />
      )}
      {answers.map((v, i) => v == null ? null : (
        <g key={i}>
          <circle cx={xOf(i + 1)} cy={yOf(v)} r={4} fill="var(--strawberry-500)" stroke="var(--vanilla-50)" strokeWidth="1.6" />
          {!mini && (
            <text x={xOf(i + 1)} y={yOf(v) - 10} textAnchor="middle"
              fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--strawberry-700)">{v}%</text>
          )}
        </g>
      ))}
      {!mini && (
        <text x={padL + innerW / 2} y={height - 4} textAnchor="middle"
          fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-500)">scoops</text>
      )}
    </svg>
  );
}
