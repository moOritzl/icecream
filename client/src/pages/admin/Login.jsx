import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoopCone from '../../components/ScoopCone.jsx';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        navigate('/admin');
      } else {
        setError('Incorrect password.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--vanilla-100)', padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <ScoopCone size={28} scoops={1} />
          <span className="mono" style={{ fontSize: 12, color: 'var(--ink-700)' }}>scoops.lenhard.xyz / admin</span>
        </div>

        <h1 style={{ fontSize: 32, margin: '0 0 24px' }}>Sign in</h1>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6 }}>
              Password
            </div>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              required autoFocus
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--ink-900)',
                background: 'var(--vanilla-50)', fontFamily: 'var(--font-mono)', fontSize: 16,
                outline: 'none',
              }}
            />
          </label>

          {error && (
            <div style={{ marginBottom: 12, color: 'var(--strawberry-700)', fontSize: 14 }}>{error}</div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}
            style={{ width: '100%', padding: '13px', fontSize: 15 }}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>
      </div>
    </div>
  );
}
