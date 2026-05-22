import { Link } from 'react-router-dom';
import ScoopCone from './ScoopCone.jsx';

export default function PageShell({ children, eyebrow, style }) {
  return (
    <div className="scoop-screen" style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', ...style }}>
      <header className="site-header">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <ScoopCone size={28} scoops={1} />
          <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz</span>
        </Link>
        {eyebrow && <div className="eyebrow" style={{ fontSize: 11 }}>{eyebrow}</div>}
        {!eyebrow && (
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>
            a neuroscience study · since 2026
          </div>
        )}
      </header>

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <footer className="site-footer">
        <span>
          <Link to="/privacy" style={{ color: 'inherit' }}>privacy</Link>
          {' · '}
          <a href="mailto:contact@lenhard.xyz" style={{ color: 'inherit' }}>contact</a>
        </span>
      </footer>
    </div>
  );
}
