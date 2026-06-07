// Page transition wrapper — CSS-only.
//
// We deliberately do NOT use framer-motion / AnimatePresence here. Under React
// 19's production concurrent renderer, framer-motion's animated unmount
// ("mode=wait" exit) walks the unmounting fiber tree and chokes on a ref during
// commit — "Cannot assign to read only property 'current'" — an infinite rAF
// loop that blanks the page. It only reproduces in real browsers (rAF timing),
// not in throttled headless ones, which made it maddening to catch.
//
// Each route is keyed by pathname in App.jsx, so every page remounts on
// navigation. A CSS enter animation therefore plays automatically on mount.
// There is no exit animation — that is exactly the crash-prone path we removed.

export default function MotionPage({ children, variant = 'fade', style }) {
  const cls = variant === 'slide' ? 'page-enter page-enter-slide' : 'page-enter page-enter-fade';
  return (
    <div className={cls} style={{ width: '100%', ...style }}>
      {children}
    </div>
  );
}
