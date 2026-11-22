import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const SPRING = { stiffness: 250, damping: 18, mass: 0.4 };

// Leans its child toward a mouse pointer hovering over it and springs back on leave. Touch is ignored.
const Magnetic: React.FC<{ children: React.ReactNode; strength?: number; className?: string }> = ({
  children,
  strength = 0.35,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  return (
    <motion.span
      ref={ref}
      // inline-flex, not inline-block: no text line box, so its height is the child's even inside big-font parents
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
};

export default Magnetic;
