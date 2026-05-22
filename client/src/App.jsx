import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useDirection } from './hooks/useDirection.js';
import Landing from './pages/Landing.jsx';
import Consent from './pages/Consent.jsx';
import ScoopQuestion from './pages/ScoopQuestion.jsx';
import OptionalGate from './pages/OptionalGate.jsx';
import DessertAffinity from './pages/DessertAffinity.jsx';
import FlavorChoice from './pages/FlavorChoice.jsx';
import PriceQuestion from './pages/PriceQuestion.jsx';
import Thanks from './pages/Thanks.jsx';
import Privacy from './pages/Privacy.jsx';
import AdminLogin from './pages/admin/Login.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';

function ProtectedRoute({ children }) {
  const [authed, setAuthed] = useState(null);

  useEffect(() => {
    fetch('/api/admin/me').then(r => r.json()).then(d => setAuthed(d.authed));
  }, []);

  if (authed === null) return null;
  return authed ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  const location = useLocation();
  useDirection(); // prime the direction ref on every route change

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/consent" element={<Consent />} />
        {/* Specific optional-question routes ranked above :step wildcard */}
        <Route path="/q/6" element={<DessertAffinity />} />
        <Route path="/q/7" element={<FlavorChoice />} />
        <Route path="/q/8" element={<PriceQuestion />} />
        <Route path="/q/:step" element={<ScoopQuestion />} />
        <Route path="/optional" element={<OptionalGate />} />
        <Route path="/thanks/:token" element={<Thanks />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
