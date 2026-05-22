import { useId } from 'react';

export default function ScoopCone({ size = 160, scoops = 3, melting = false, palette }) {
  const uid = useId();
  const clipId = 'cone-clip-' + uid.replace(/:/g, '');
  const ink = 'var(--ink-900)';
  const cream = 'var(--vanilla-200)';
  const colors = palette || ['var(--pistachio-500)', 'var(--strawberry-500)', 'var(--vanilla-100)'];

  const scoop = (cy) =>
    `M ${100 - 46} ${cy} C ${100 - 52} ${cy - 32}, ${100 - 30} ${cy - 52}, ${100} ${cy - 52} C ${100 + 30} ${cy - 52}, ${100 + 52} ${cy - 32}, ${100 + 46} ${cy} C ${100 + 30} ${cy + 6}, ${100 - 30} ${cy + 6}, ${100 - 46} ${cy} Z`;

  const scoopY = [142, 112, 82];
  const scoopPaths = scoopY.map(scoop);
  const swirls = scoopY.map((y) => `M ${100 - 28} ${y - 12} Q ${100 - 18} ${y - 22}, ${100 - 6} ${y - 22}`);
  const topY = scoopY[Math.min(scoops, 3) - 1] - 52;
  const cherryY = topY + 4;

  return (
    <svg width={size} height={size} viewBox="0 0 200 240" fill="none" stroke={ink}
      strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="100" cy="232" rx="38" ry="4" fill="var(--ink-900)" opacity="0.08" stroke="none" />
      <defs>
        <clipPath id={clipId}>
          <path d="M 50 140 Q 100 132, 150 140 L 100 228 Z" />
        </clipPath>
      </defs>
      <path d="M 50 140 Q 100 132, 150 140 L 100 228 Z" fill={cream} />
      <g clipPath={`url(#${clipId})`} stroke="var(--ink-700)" strokeWidth="1.1" opacity="0.55" fill="none">
        {[30,48,66,84,102,120,138].map(x0 => <line key={'r'+x0} x1={x0} y1={140} x2={x0+100} y2={240} />)}
        {[62,80,98,116,134,152,170].map(x1 => <line key={'l'+x1} x1={x1} y1={140} x2={x1-100} y2={240} />)}
      </g>
      <path d="M 50 140 L 100 228 L 150 140" />
      <path d="M 50 140 Q 100 132, 150 140" />
      {melting && <path d="M 62 140 Q 60 156, 66 160 Q 70 156, 68 142 Z" fill={colors[0]} />}
      <path d={scoopPaths[0]} fill={colors[0]} />
      <path d={swirls[0]} stroke="var(--ink-900)" strokeWidth="1.2" opacity="0.35" fill="none" />
      {scoops >= 2 && <>
        <path d={scoopPaths[1]} fill={colors[1] || colors[0]} />
        <path d={swirls[1]} stroke="var(--ink-900)" strokeWidth="1.2" opacity="0.35" fill="none" />
      </>}
      {scoops >= 3 && <>
        <path d={scoopPaths[2]} fill={colors[2] || colors[1] || colors[0]} />
        <path d={swirls[2]} stroke="var(--ink-900)" strokeWidth="1.2" opacity="0.35" fill="none" />
      </>}
      <path d={`M ${100+4} ${cherryY} Q ${100+10} ${cherryY-10}, ${100+18} ${cherryY-10}`}
        stroke="var(--pistachio-700)" strokeWidth="2" fill="none" />
      <circle cx="100" cy={cherryY} r="6" fill="var(--strawberry-500)" />
      <circle cx="98" cy={cherryY-2} r="1.4" fill="var(--vanilla-50)" stroke="none" />
    </svg>
  );
}
