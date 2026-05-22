import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoopCone from '../../components/ScoopCone.jsx';

function StatCard({ label, value, sub }) {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="eyebrow">{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 36, marginTop: 4, lineHeight: 1 }}>{value ?? '—'}</div>
      {sub && <div className="caption" style={{ marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function AdminChart({ curves, mean }) {
  const padL = 40, padR = 18, padT = 12, padB = 30;
  const w = 480, h = 220;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const xOf = (n) => padL + ((n - 0.5) / 5) * innerW;
  const yOf = (v) => padT + innerH - (Math.min(500, Math.max(0, v)) / 500) * innerH;

  const meanPath = mean
    ? 'M ' + mean.map((v, i) => `${xOf(i + 1)} ${yOf(v)}`).join(' L ')
    : null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h4 style={{ margin: 0 }}>Mean curve</h4>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>± 1σ shaded</span>
        </div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', marginTop: 6 }}>
          {[0, 100, 200, 300, 400, 500].map((t) => (
            <g key={t}>
              <line x1={padL} x2={w - padR} y1={yOf(t)} y2={yOf(t)} stroke="var(--vanilla-200)" />
              <text x={padL - 6} y={yOf(t) + 4} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-500)">{t}%</text>
            </g>
          ))}
          {mean && (
            <path d={
              `M ${xOf(1)} ${yOf(mean[0] + 40)} ` +
              mean.map((v, i) => `L ${xOf(i + 1)} ${yOf(v + 40)}`).join(' ') +
              ' L ' + [...mean].reverse().map((v, i) => `${xOf(5 - i)} ${yOf(v - 40)}`).join(' L ') + ' Z'
            } fill="var(--pistachio-200)" opacity=".5" />
          )}
          {meanPath && (
            <path d={meanPath} fill="none" stroke="var(--pistachio-700)" strokeWidth="2.4" strokeLinejoin="round" />
          )}
          {mean && mean.map((v, i) => (
            <circle key={i} cx={xOf(i + 1)} cy={yOf(v)} r={4} fill="var(--pistachio-700)" stroke="var(--vanilla-50)" strokeWidth="1.5" />
          ))}
          {[1, 2, 3, 4, 5].map(n => (
            <text key={n} x={xOf(n)} y={yOf(0) + 18} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-500)">{n}</text>
          ))}
        </svg>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h4 style={{ margin: 0 }}>All curves</h4>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>{curves?.length ?? 0} shown</span>
        </div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', marginTop: 6 }}>
          {[0, 100, 200, 300, 400, 500].map((t) => (
            <line key={t} x1={padL} x2={w - padR} y1={yOf(t)} y2={yOf(t)} stroke="var(--vanilla-200)" />
          ))}
          {(curves ?? []).map((c, i) => (
            <path key={i} d={'M ' + c.map((v, j) => `${xOf(j + 1)} ${yOf(v)}`).join(' L ')}
              fill="none" stroke="var(--strawberry-500)" strokeWidth="1" opacity=".18" />
          ))}
          {meanPath && (
            <path d={meanPath} fill="none" stroke="var(--ink-900)" strokeWidth="2.4" />
          )}
          {[1, 2, 3, 4, 5].map(n => (
            <text key={n} x={xOf(n)} y={yOf(0) + 18} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="var(--ink-500)">{n}</text>
          ))}
        </svg>
      </div>
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
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="mono" style={{ fontSize: 13, color: 'var(--ink-500)' }}>Loading…</span>
      </div>
    );
  }

  return (
    <div className="scoop-screen" style={{ padding: 28, minHeight: '100dvh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ScoopCone size={28} scoops={1} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Admin · live data</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>scoops.lenhard.xyz/admin</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="/api/admin/export.csv" className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}>CSV</a>
          <a href="/api/admin/export.json" className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}>JSON</a>
          <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }} onClick={fetchData}>Refresh</button>
          <button className="btn btn-quiet" style={{ padding: '8px 14px', fontSize: 13 }} onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20 }}>
        <StatCard label="Submissions" value={stats?.total?.toLocaleString()} sub={`+ ${stats?.today ?? 0} today`} />
        <StatCard label="Median peak" value={stats?.medianPeak ? `${stats.medianPeak} scoop${stats.medianPeak > 1 ? 's' : ''}` : null} />
        <StatCard label="Mean WTP" value={stats?.meanWtp != null ? `$${Number(stats.meanWtp).toFixed(2)}` : null} />
        <StatCard label="This week" value={stats?.week?.toLocaleString()} />
      </div>

      <div style={{ marginTop: 14 }}>
        <AdminChart curves={stats?.curves} mean={mean} />
      </div>

      <div className="card" style={{ marginTop: 12, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h4 style={{ margin: 0 }}>Recent submissions</h4>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-500)' }}>{submissions.length} shown</span>
        </div>
        <div style={{ overflowX: 'auto', marginTop: 12 }}>
          <table style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: 12, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--ink-500)', borderBottom: '1px solid var(--vanilla-200)' }}>
                {['id', 'date', 'q1', 'q2', 'q3', 'q4', 'q5', 'affinity', 'flavor', 'wtp', ''].map((h, i) => (
                  <th key={i} style={{ padding: '6px 8px', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--vanilla-200)' }}>
                  <td style={{ padding: '8px 8px', color: 'var(--ink-500)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{s.id.slice(0, 8)}…</td>
                  <td style={{ padding: '8px 8px', whiteSpace: 'nowrap' }}>{s.created_at}</td>
                  <td style={{ padding: '8px 8px' }}>{s.scoop_1_pct}</td>
                  <td style={{ padding: '8px 8px' }}>{s.scoop_2_pct}</td>
                  <td style={{ padding: '8px 8px' }}>{s.scoop_3_pct}</td>
                  <td style={{ padding: '8px 8px' }}>{s.scoop_4_pct}</td>
                  <td style={{ padding: '8px 8px' }}>{s.scoop_5_pct}</td>
                  <td style={{ padding: '8px 8px' }}>{s.ice_cream_affinity ?? '—'}</td>
                  <td style={{ padding: '8px 8px' }}>{s.flavor_preference ?? '—'}</td>
                  <td style={{ padding: '8px 8px' }}>{s.max_price_usd != null ? `$${s.max_price_usd}` : '—'}</td>
                  <td style={{ padding: '8px 8px' }}>
                    <button onClick={() => handleDelete(s.id)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--strawberry-700)', fontSize: 11, fontFamily: 'var(--font-mono)', padding: '2px 6px' }}>
                      delete
                    </button>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr><td colSpan="11" style={{ padding: '16px 8px', color: 'var(--ink-500)', textAlign: 'center' }}>No submissions yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
