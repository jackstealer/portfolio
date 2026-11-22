import React from 'react';
import { motion, Variants } from 'framer-motion';

const letter: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// Small spaced-out eyebrow over one giant steel word ("ABOUT ME" / "Intro"). The word's letters rise into
// view one by one from behind a mask when it scrolls in.
const SectionHeading: React.FC<{ eyebrow: string; title: string; className?: string }> = ({
  eyebrow,
  title,
  className = '',
}) => (
  <div className={className}>
    <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-muted lg:mb-10">{eyebrow}</p>
    <motion.h2
      aria-label={title}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.05 }}
      className="overflow-hidden text-[clamp(4.5rem,12vw,11rem)] font-black leading-none tracking-[-0.05em]"
    >
      {Array.from(title).map((ch, i) => (
        <motion.span key={i} aria-hidden variants={letter} className="text-steel inline-block">
          {ch}
        </motion.span>
      ))}
    </motion.h2>
  </div>
);

export default SectionHeading;
