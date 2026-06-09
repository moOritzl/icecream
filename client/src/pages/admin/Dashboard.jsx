import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoopCone from '../../components/ScoopCone.jsx';

const FLAVOR_COLORS = {
  vanilla:       '#C9A227',
  chocolate:     '#7B4F2E',
  stracciatella: '#8B6E4A',
  strawberry:    '#C94070',
  lemon:         '#B8A000',
  yoghurt:       '#5060A0',
  cookie:        '#8B6030',
  other:         'var(--ink-300)',
};

function FlavorPill({ flavor }) {
  if (!flavor) return <span style={{ color: 'var(--ink-300)' }}>—</span>;
  const color = FLAVOR_COLORS[flavor.toLowerCase()] ?? 'var(--ink-500)';
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 'var(--r-pill)',
      background: color + '18',
      color,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.04em',
      whiteSpace: 'nowrap',
    }}>
      {flavor}
    </span>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="card" style={{
      padding: '20px 20px 18px',
      borderTop: `3px solid ${accent ?? 'var(--vanilla-200)'}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      <div className="eyebrow">{label}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: 44,
        lineHeight: 1,
        marginTop: 6,
        color: 'var(--ink-900)',
        letterSpacing: '-0.02em',
      }}>
        {value ?? '—'}
      </div>
      {sub && (
        <div className="caption" style={{ marginTop: 6 }}>{sub}</div>
      )}
    </div>
  );
}

function AdminChart({ curves, mean }) {
  const padL = 40, padR = 18, padT = 16, padB = 32;
  const w = 480, h = 240;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const xOf = (n) => padL + ((n - 0.5) / 5) * innerW;
  const yOf = (v) => padT + innerH - (Math.min(500, Math.max(0, v)) / 500) * innerH;

  const meanPath = mean
    ? 'M ' + mean.map((v, i) => `${xOf(i + 1)} ${yOf(v)}`).join(' L ')
    : null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div className="card" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink-900)' }}>Mean curve</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-300)' }}>± 1σ shaded</span>
        </div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', marginTop: 4 }}>
          {[0, 100, 200, 300, 400, 500].map((t) => (
            <g key={t}>
              <line x1={padL} x2={w - padR} y1={yOf(t)} y2={yOf(t)} stroke="var(--vanilla-200)" strokeDasharray={t === 0 ? 'none' : '3 4'} />
              <text x={padL - 6} y={yOf(t) + 4} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-300)">{t}%</text>
            </g>
          ))}
          {mean && (
            <path d={
              `M ${xOf(1)} ${yOf(mean[0] + 40)} ` +
              mean.map((v, i) => `L ${xOf(i + 1)} ${yOf(v + 40)}`).join(' ') +
              ' L ' + [...mean].reverse().map((v, i) => `${xOf(5 - i)} ${yOf(v - 40)}`).join(' L ') + ' Z'
            } fill="var(--pistachio-200)" opacity=".4" />
          )}
          {meanPath && (
            <path d={meanPath} fill="none" stroke="var(--pistachio-500)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          )}
          {mean && mean.map((v, i) => (
            <circle key={i} cx={xOf(i + 1)} cy={yOf(v)} r={4} fill="var(--pistachio-500)" stroke="var(--vanilla-50)" strokeWidth="2" />
          ))}
          {[1, 2, 3, 4, 5].map(n => (
            <text key={n} x={xOf(n)} y={yOf(0) + 20} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-300)">{n}</text>
          ))}
        </svg>
      </div>

      <div className="card" style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink-900)' }}>All curves</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-300)' }}>{curves?.length ?? 0} shown</span>
        </div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', marginTop: 4 }}>
          {[0, 100, 200, 300, 400, 500].map((t) => (
            <line key={t} x1={padL} x2={w - padR} y1={yOf(t)} y2={yOf(t)} stroke="var(--vanilla-200)" strokeDasharray={t === 0 ? 'none' : '3 4'} />
          ))}
          {(curves ?? []).map((c, i) => (
            <path key={i} d={'M ' + c.map((v, j) => `${xOf(j + 1)} ${yOf(v)}`).join(' L ')}
              fill="none" stroke="var(--strawberry-500)" strokeWidth="1" opacity=".15" />
          ))}
          {meanPath && (
            <path d={meanPath} fill="none" stroke="var(--ink-900)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          )}
          {[1, 2, 3, 4, 5].map(n => (
            <text key={n} x={xOf(n)} y={yOf(0) + 20} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-300)">{n}</text>
          ))}
        </svg>
      </div>
    </div>
  );
}

function SubmissionsTable({ submissions, onDelete }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: 12, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--vanilla-200)' }}>
            {['id', 'date', 'q1', 'q2', 'q3', 'q4', 'q5', 'affinity', 'flavor', 'original', 'usd', ''].map((h, i) => (
              <th key={i} style={{
                padding: '8px 10px',
                fontWeight: 500,
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--ink-300)',
                textAlign: 'left',
                whiteSpace: 'nowrap',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions.map((s) => (
            <tr
              key={s.id}
              onMouseEnter={() => setHoveredRow(s.id)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                borderBottom: '1px solid var(--vanilla-200)',
                background: hoveredRow === s.id ? 'var(--vanilla-100)' : 'transparent',
                transition: 'background .1s',
              }}
            >
              <td style={{ padding: '10px 10px', color: 'var(--ink-300)', fontSize: 11 }}>{s.id.slice(0, 8)}…</td>
              <td style={{ padding: '10px 10px', whiteSpace: 'nowrap', color: 'var(--ink-500)' }}>{s.created_at}</td>
              <td style={{ padding: '10px 10px', color: 'var(--ink-700)' }}>{s.scoop_1_pct}</td>
              <td style={{ padding: '10px 10px', color: 'var(--ink-700)' }}>{s.scoop_2_pct}</td>
              <td style={{ padding: '10px 10px', color: 'var(--ink-700)' }}>{s.scoop_3_pct}</td>
              <td style={{ padding: '10px 10px', color: 'var(--ink-700)' }}>{s.scoop_4_pct}</td>
              <td style={{ padding: '10px 10px', color: 'var(--ink-700)' }}>{s.scoop_5_pct}</td>
              <td style={{ padding: '10px 10px', color: 'var(--ink-700)' }}>{s.ice_cream_affinity ?? '—'}</td>
              <td style={{ padding: '10px 10px' }}><FlavorPill flavor={s.flavor_preference} /></td>
              <td style={{ padding: '10px 10px', color: 'var(--ink-700)' }}>
                {s.max_price_original != null ? `${s.max_price_original} ${s.currency ?? ''}`.trim() : '—'}
              </td>
              <td style={{ padding: '10px 10px', color: 'var(--ink-900)', fontWeight: 500 }}>
                {s.max_price_usd != null ? `$${s.max_price_usd}` : '—'}
              </td>
              <td style={{ padding: '10px 10px' }}>
                <button
                  onClick={() => onDelete(s.id)}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: hoveredRow === s.id ? 'var(--strawberry-500)' : 'var(--ink-300)',
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    padding: '2px 4px',
                    transition: 'color .15s',
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
          {submissions.length === 0 && (
            <tr>
              <td colSpan={12} style={{ padding: '32px 10px', color: 'var(--ink-300)', textAlign: 'center', fontFamily: 'var(--font-body)' }}>
                No submissions yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, subRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/submissions?perPage=20'),
      ]);
      if (!statsRes.ok || !subRes.ok) throw new Error('unauthorized');
      const [statsData, subData] = await Promise.all([statsRes.json(), subRes.json()]);
      setStats(statsData);
      setSubmissions(subData.submissions ?? []);
    } catch {
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    navigate('/admin/login');
  };

  const handleDelete = async (token) => {
    if (!confirm(`Delete submission ${token.slice(0, 8)}…?`)) return;
    await fetch(`/api/admin/submissions/${token}`, { method: 'DELETE' });
    fetchData();
  };

  const mean = stats?.curves?.length
    ? stats.curves[0].map((_, i) => Math.round(stats.curves.reduce((s, c) => s + c[i], 0) / stats.curves.length))
    : null;

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--vanilla-50)' }}>
        <span className="mono" style={{ fontSize: 12, color: 'var(--ink-300)', letterSpacing: '0.08em' }}>Loading…</span>
      </div>
    );
  }

  return (
    <div className="scoop-screen grain" style={{ minHeight: '100dvh', background: 'var(--vanilla-50)' }}>

      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--vanilla-200)',
        padding: '14px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--vanilla-100)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ScoopCone size={26} scoops={1} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink-900)', lineHeight: 1.2 }}>
              Admin dashboard
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-300)', marginTop: 2 }}>
              scoops.lenhard.xyz
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <a href="/api/admin/export.csv" className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }}>CSV</a>
          <a href="/api/admin/export.json" className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }}>JSON</a>
          <button className="btn btn-ghost" style={{ padding: '7px 14px', fontSize: 12 }} onClick={fetchData}>Refresh</button>
          <button className="btn btn-quiet" style={{ padding: '7px 12px', fontSize: 12 }} onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px 64px' }}>

        {/* Stat row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <StatCard
            label="Total submissions"
            value={stats?.total?.toLocaleString()}
            sub={`${stats?.today ?? 0} today`}
            accent="var(--pistachio-500)"
          />
          <StatCard
            label="This week"
            value={stats?.week?.toLocaleString()}
            accent="var(--pistachio-200)"
          />
          <StatCard
            label="Mean WTP"
            value={stats?.meanWtp != null ? `$${Number(stats.meanWtp).toFixed(2)}` : null}
            accent="var(--honeycomb-500)"
          />
          <StatCard
            label="Median peak"
            value={stats?.medianPeak ? `${stats.medianPeak} scoop${stats.medianPeak > 1 ? 's' : ''}` : null}
            accent="var(--strawberry-200)"
          />
        </div>

        {/* Charts */}
        <div style={{ marginTop: 20 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Curves</div>
          <AdminChart curves={stats?.curves} mean={mean} />
        </div>

        {/* Submissions table */}
        <div className="card" style={{ marginTop: 20, padding: '20px 20px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div className="eyebrow">Recent submissions</div>
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-300)' }}>{submissions.length} shown</span>
          </div>
          <SubmissionsTable submissions={submissions} onDelete={handleDelete} />
        </div>

      </div>
    </div>
  );
}
