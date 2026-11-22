import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const skillCategories = [
  { title: 'Languages', skills: ['Python', 'C / C++', 'JavaScript (ES6+)', 'TypeScript'] },
  { title: 'Frontend', skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { title: 'Backend', skills: ['Node.js', 'Express.js', 'REST API', 'GraphQL (basic)', 'Socket.io'] },
  {
    title: 'AI / ML',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Data Preprocessing', 'Supervised Learning', 'Model Training'],
  },
  { title: 'Databases', skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'] },
  { title: 'Tools', skills: ['Git & GitHub', 'VS Code', 'Postman', 'Figma'] },
  { title: 'Core CS', skills: ['DSA', 'Problem Solving', 'OOP Concepts'] },
  { title: 'Cloud & DevOps', skills: ['AWS (basic)', 'Docker (basic)'] },
];

const Skills: React.FC = () => (
  <section id="skills" className="relative px-6 py-28 lg:px-10 lg:py-40">
    <div className="mx-auto grid max-w-[1150px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <SectionHeading eyebrow="Toolbox" title="Stack" className="self-start lg:sticky lg:top-36" />

      <ul>
        {skillCategories.map((cat, i) => (
          <motion.li
            key={cat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.06 }}
            className="grid gap-4 border-t border-white/[0.07] py-7 last:border-b sm:grid-cols-[10rem_1fr]"
          >
            <h3 className="pt-1.5 text-xs font-medium uppercase tracking-[0.25em] text-muted">{cat.title}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-sm text-gray-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

// memo: App re-renders when the intro finishes; static sections needn't.
export default React.memo(Skills);
