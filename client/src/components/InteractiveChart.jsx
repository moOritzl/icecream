import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ReferenceDot,
  ResponsiveContainer,
} from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length || payload[0].value == null) return null;
  return (
    <div style={{
      background: 'var(--ink-900)', color: 'var(--vanilla-50)',
      padding: '5px 12px', borderRadius: 8,
      fontFamily: 'var(--font-mono)', fontSize: 12,
      boxShadow: 'var(--shadow-md)', pointerEvents: 'none',
      display: 'flex', gap: 8, alignItems: 'baseline',
    }}>
      <span style={{ opacity: 0.5, fontSize: 10 }}>
        {label} scoop{label > 1 ? 's' : ''}
      </span>
      <strong style={{ fontSize: 13 }}>{payload[0].value}%</strong>
    </div>
  );
}

function ChartDot({ cx, cy, value }) {
  if (value == null) return null;
  return (
    <g>
      <text
        x={cx} y={cy - 13} textAnchor="middle"
        fontFamily="JetBrains Mono, monospace" fontSize={11}
        fill="var(--strawberry-700)"
      >{value}%</text>
      <circle cx={cx} cy={cy} r={5} fill="var(--strawberry-500)" stroke="var(--vanilla-50)" strokeWidth={2} />
    </g>
  );
}

function ActiveDot({ cx, cy, value }) {
  if (value == null) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={12} fill="var(--strawberry-500)" opacity={0.12} />
      <circle cx={cx} cy={cy} r={6} fill="var(--strawberry-500)" stroke="var(--vanilla-50)" strokeWidth={2} />
    </g>
  );
}

function YAxisTick(props) {
  const { x, y, payload } = props;
  if (!payload) return null;
  const is100 = payload.value === 100;
  return (
    <text
      x={x - 4} y={y + 4} textAnchor="end"
      fill={is100 ? '#4a7c40' : '#8A7A66'}
      fontFamily="JetBrains Mono, monospace"
      fontSize="10"
    >{payload.value}%</text>
  );
}

function XTick({ x, y, payload, currentIdx = 0 }) {
  const isActive = payload.value === currentIdx + 1;
  return (
    <text
      x={x} y={y + 14} textAnchor="middle"
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '11px',
        fill: isActive ? 'var(--strawberry-700)' : 'var(--ink-500)',
      }}
    >{payload.value}</text>
  );
}

export default function InteractiveChart({ answers, currentIdx }) {
  const data = answers.map((pct, i) => ({ scoop: i + 1, pct }));
  const hasData = answers.some(v => v != null);

  return (
    <div style={{ height: 'clamp(220px, 28vw, 300px)', width: '100%', position: 'relative' }}>
      {!hasData && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--ink-300)', pointerEvents: 'none',
          whiteSpace: 'nowrap', zIndex: 1,
        }}>
          drag the slider to start your curve
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 24, bottom: 20, left: 0 }}>
          <CartesianGrid
            strokeDasharray="2 4"
            stroke="var(--vanilla-200)"
            vertical={false}
          />
          <ReferenceLine
            y={100}
            stroke="var(--pistachio-200)"
            strokeWidth={1.5}
          />
          <XAxis
            dataKey="scoop"
            tick={<XTick currentIdx={currentIdx} />}
            tickLine={false}
            axisLine={{ stroke: 'var(--ink-300)' }}
            interval={0}
            label={{
              value: 'scoops',
              position: 'insideBottom',
              offset: -6,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              fill: 'var(--ink-500)',
            }}
          />
          <YAxis
            domain={[0, 500]}
            allowDataOverflow
            ticks={[0, 100, 200, 300, 400, 500]}
            tick={<YAxisTick />}
            tickLine={false}
            axisLine={false}
            width={52}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: 'var(--ink-300)', strokeWidth: 1, strokeDasharray: '2 3' }}
          />
          <ReferenceDot
            x={1} y={100} r={4}
            fill="var(--pistachio-200)"
            stroke="var(--pistachio-700)"
            strokeWidth={1.2}
          />
          <Line
            type="monotone"
            dataKey="pct"
            stroke="var(--strawberry-500)"
            strokeWidth={2.5}
            dot={<ChartDot />}
            activeDot={<ActiveDot />}
            connectNulls
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
