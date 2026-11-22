import React from 'react';
import { motion } from 'framer-motion';

// Small spaced-out eyebrow over one giant steel word, e.g. "ABOUT ME" / "Intro".
const SectionHeading: React.FC<{ eyebrow: string; title: string; className?: string }> = ({
  eyebrow,
  title,
  className = '',
}) => (
  <div className={className}>
    <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-muted lg:mb-10">{eyebrow}</p>
    <motion.h2
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="text-steel text-[clamp(4.5rem,12vw,11rem)] font-black leading-none tracking-[-0.05em]"
    >
      {title}
    </motion.h2>
  </div>
);

export default SectionHeading;
