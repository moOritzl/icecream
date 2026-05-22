import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Ordered route list — determines forward vs. back direction for transitions.
const ROUTE_ORDER = [
  '/', '/consent',
  '/q/1', '/q/2', '/q/3', '/q/4', '/q/5',
  '/optional',
  '/q/6', '/q/7', '/q/8',
  '/thanks',
];

function rankOf(pathname) {
  // Exact match first, then prefix (e.g. /thanks/uuid matches /thanks)
  const exact = ROUTE_ORDER.indexOf(pathname);
  if (exact !== -1) return exact;
  return ROUTE_ORDER.findIndex(r => pathname.startsWith(r));
}

export function useDirection() {
  const location = useLocation();
  const prevRef = useRef(location.pathname);
  const dirRef = useRef(1);

  useEffect(() => {
    const prev = prevRef.current;
    const curr = location.pathname;
    if (prev !== curr) {
      dirRef.current = rankOf(curr) >= rankOf(prev) ? 1 : -1;
      prevRef.current = curr;
    }
  });

  return dirRef.current;
}
