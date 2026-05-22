import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MotionPage from '../components/MotionPage.jsx';
import PageShell from '../components/PageShell.jsx';
import { useDirection } from '../hooks/useDirection.js';

export default function Privacy() {
  const navigate = useNavigate();
  const direction = useDirection();
  const [token, setToken] = useState('');
  const [status, setStatus] = useState(null); // null | 'success' | 'not_found' | 'error'
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    const t = token.trim();
    if (!t) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/delete/${encodeURIComponent(t)}`, { method: 'DELETE' });
      const { success } = await res.json();
      setStatus(success ? 'success' : 'not_found');
      if (success) {
        setTimeout(() => navigate('/'), 2000);
      }
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionPage direction={direction} variant="fade">
      <PageShell>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px' }}>
          <div className="eyebrow">Your data</div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '12px 0 8px' }}>Privacy policy</h1>

          <div style={{ fontSize: 15, color: 'var(--ink-700)', lineHeight: 1.7 }}>
            <p><b>What we collect:</b> your five slider answers, optional dessert-affinity rating,
            optional flavor preference, optional price estimate, and an anonymous UUID we generate
            server-side. That's it.</p>

            <p><b>What we don't collect:</b> your IP address (stripped before any data is written),
            your name, your email, or any identifying metadata. We set no cookies on public routes.</p>

            <p><b>How we use it:</b> to study how scoop count affects enjoyment. Results will
            be published in aggregate only — never raw individual responses.</p>

            <p><b>How long we keep it:</b> indefinitely, unless you delete it using your token.</p>

            <p><b>Who sees it:</b> nobody. The raw data is not shared with third parties. The
            researcher has admin access.</p>
          </div>

          <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid var(--vanilla-200)' }} />

          <div className="eyebrow">Delete your data</div>
          <h2 style={{ fontSize: 28, margin: '8px 0 6px' }}>Enter your deletion token</h2>
          <p style={{ fontSize: 15, color: 'var(--ink-700)', margin: '0 0 20px' }}>
            You received this on the thank-you page. Paste it below to permanently delete your responses.
          </p>

          <form onSubmit={handleDelete}>
            <div style={{ display: 'flex', gap: 0, borderRadius: 12, overflow: 'hidden',
              border: '1.5px solid var(--ink-900)', background: 'var(--vanilla-100)' }}>
              <input
                type="text" value={token} onChange={e => setToken(e.target.value)}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                style={{
                  flex: 1, border: 0, outline: 0, background: 'transparent',
                  padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ink-900)',
                }}
              />
              <button type="submit" className="btn btn-primary" disabled={loading || !token.trim()}
                style={{ borderRadius: 0, margin: 0 }}>
                {loading ? 'Deleting…' : 'Delete →'}
              </button>
            </div>
          </form>

          {status === 'success' && (
            <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10,
              background: 'var(--pistachio-50)', border: '1px solid var(--pistachio-200)',
              color: 'var(--pistachio-700)', fontSize: 14 }}>
              Your data has been deleted. Redirecting…
            </div>
          )}
          {status === 'not_found' && (
            <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10,
              background: 'rgba(200,75,62,.06)', border: '1px solid rgba(200,75,62,.2)',
              color: 'var(--strawberry-700)', fontSize: 14 }}>
              Token not found. Check that you copied it correctly.
            </div>
          )}
          {status === 'error' && (
            <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 10,
              background: 'rgba(200,75,62,.06)', color: 'var(--strawberry-700)', fontSize: 14 }}>
              Something went wrong. Please try again.
            </div>
          )}
        </div>
      </PageShell>
    </MotionPage>
  );
}
