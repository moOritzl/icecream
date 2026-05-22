import { motion, useReducedMotion } from 'framer-motion';

const slideVariants = {
  enter: (dir) => ({ x: dir >= 0 ? '55%' : '-55%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir >= 0 ? '-55%' : '55%', opacity: 0 }),
};

const fadeVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const spring = { type: 'spring', stiffness: 300, damping: 30 };
const fadeTrans = { duration: 0.22, ease: 'easeOut' };

export default function MotionPage({ children, direction = 1, variant = 'slide', style }) {
  const reduced = useReducedMotion();

  const vars = reduced
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : variant === 'slide'
      ? slideVariants
      : fadeVariants;

  const trans = reduced
    ? { duration: 0.15 }
    : variant === 'slide'
      ? spring
      : fadeTrans;

  return (
    <motion.div
      custom={direction}
      variants={vars}
      initial="enter"
      animate="center"
      exit="exit"
      transition={trans}
      style={{ width: '100%', ...style }}
    >
      {children}
    </motion.div>
  );
}
