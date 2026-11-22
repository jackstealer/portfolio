import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import SectionHeading from './SectionHeading';

// [text, highlighted]
const intro: [string, boolean][] = [
  ["Hey, I'm", false],
  ['Atul Raj Gautam.', true],
  ['A Computer Science Engineering student and aspiring', false],
  ['AI/ML engineer', true],
  ['with a strong foundation in full-stack development and problem-solving. I build scalable, user-centric applications with', false],
  ['Python, React and Node.js', true],
  ["and right now I'm deeply focused on", false],
  ['Machine Learning and Generative AI:', true],
  ['AI agents, computer vision and NLP. I like turning ideas into real products that solve actual problems.', false],
];
const words = intro.flatMap(([text, bold]) => text.split(' ').map((w) => ({ w, bold })));

const features = [
  {
    title: 'AI/ML Engineering',
    description:
      'Building intelligent systems with Machine Learning, Generative AI, Computer Vision, and NLP to create impactful solutions.',
  },
  {
    title: 'Full-Stack Development',
    description: 'Proficient in Python, React, Node.js, and modern frameworks to build scalable, user-centric applications.',
  },
  {
    title: 'Continuous Learning',
    description: 'Mastering DSA fundamentals while actively building real-world projects and exploring emerging tech trends.',
  },
];

const stats = [
  { number: '8+', label: 'ML Projects' },
  { number: '30+', label: 'GitHub Repos' },
  { number: '15+', label: 'Technologies' },
];

// Each word brightens as the card scrolls through the viewport.
const Word: React.FC<{ progress: MotionValue<number>; range: [number, number]; bold: boolean; children: string }> = ({
  progress,
  range,
  bold,
  children,
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={bold ? 'font-bold text-white' : 'text-white'}>
      {children}{' '}
    </motion.span>
  );
};

const About: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start 0.85', 'end 0.5'] });

  return (
    <section id="about" className="relative px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto grid max-w-[1150px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHeading eyebrow="About me" title="Intro" className="self-start lg:sticky lg:top-36" />

        <div>
          <div
            ref={cardRef}
            className="rounded-[20px] border border-white/[0.06] bg-panel p-7 text-[17px] leading-[1.75] lg:p-11 lg:text-[19px]"
          >
            <p>
              {words.map(({ w, bold }, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} bold={bold}>
                  {w}
                </Word>
              ))}
            </p>
          </div>

          <ul className="mt-14">
            {features.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-white/[0.07] py-7"
              >
                <span className="pt-1 text-xs tabular-nums text-muted">0{i + 1}</span>
                <div>
                  <h3 className="mb-2 text-xl font-semibold tracking-[-0.01em] text-white">{f.title}</h3>
                  <p className="leading-relaxed text-gray-400">{f.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-chrome text-[clamp(2.5rem,5vw,4rem)] font-black leading-none tracking-[-0.04em]">
                  {s.number}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// memo: App re-renders when the intro finishes; static sections needn't.
export default React.memo(About);
