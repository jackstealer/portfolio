import React, { useLayoutEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import SectionHeading from './SectionHeading';
import Magnetic from './Magnetic';

const projects = [
  {
    title: 'FinGuide - AI Personal Finance Advisor',
    description:
      'An AI-powered personal finance advisor that helps students and young professionals track expenses and get smart saving recommendations. Features advanced ML analysis using ensemble models with 85-90% accuracy.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=500&fit=crop',
    tech: ['React', 'Flask', 'Python', 'Machine Learning', 'scikit-learn'],
    liveDemo: 'https://github.com/jackstealer/finguide',
    github: 'https://github.com/jackstealer/finguide',
    featured: true,
  },
  {
    title: 'Weather Forecasting ML',
    description:
      'ML-powered weather forecasting application with 97% accuracy using XGBoost. Features multiple ML models, interactive web UI with 3 modes, and multi-hour forecasting up to 7 days ahead.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=500&fit=crop',
    tech: ['Python', 'XGBoost', 'Streamlit', 'scikit-learn', 'Plotly'],
    liveDemo: 'https://github.com/jackstealer/weather-forecasting-ml',
    github: 'https://github.com/jackstealer/weather-forecasting-ml',
    featured: true,
  },
  {
    title: 'AgriSmart - Smart Crop Intelligence System',
    description:
      'A full-stack agriculture platform connecting farmers and buyers with AI-powered crop management, live market prices, weather insights, disease detection, and smart order logistics.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop',
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Express'],
    liveDemo: 'https://github.com/jackstealer/AgriSmart',
    github: 'https://github.com/jackstealer/AgriSmart',
    featured: true,
  },
  {
    title: 'VisionCart - AI Voice E-commerce',
    description:
      'AI-powered voice e-commerce platform for visually impaired users. Features WCAG AAA accessibility, voice-first shopping, AI product descriptions, and conversational assistant.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop',
    tech: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'OpenAI'],
    liveDemo: 'https://github.com/jackstealer/VisionCart',
    github: 'https://github.com/jackstealer/VisionCart',
    featured: false,
  },
  {
    title: 'Google Trends Analyzer',
    description:
      'Professional Google Trends analysis tool with CLI and Streamlit web dashboard. Features comprehensive EDA, visualizations, forecasting, and data export capabilities.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    tech: ['Python', 'Streamlit', 'Pandas', 'Matplotlib', 'scikit-learn'],
    liveDemo: 'https://github.com/jackstealer/google-trends-analyzer',
    github: 'https://github.com/jackstealer/google-trends-analyzer',
    featured: false,
  },
  {
    title: 'Spice Symphony Restaurant',
    description:
      'Premium responsive restaurant website with dark + gold theme. Features interactive menu, gallery, testimonials, reservation form, and smooth animations.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'AOS'],
    liveDemo: 'https://github.com/jackstealer/spice-symphony-restaurant',
    github: 'https://github.com/jackstealer/spice-symphony-restaurant',
    featured: false,
  },
  {
    title: 'HabitFlow - Daily Habit Tracker',
    description:
      'Full-stack habit tracking application with NestJS backend and Next.js frontend. Features streak tracking, analytics dashboard, and beautiful visualizations.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop',
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Prisma', 'TypeScript'],
    liveDemo: 'https://github.com/jackstealer/habit-tracker',
    github: 'https://github.com/jackstealer/habit-tracker',
    featured: false,
  },
  {
    title: 'Verbiage - Language Translation App',
    description:
      'Production-grade Android app for real-time language translation. Features voice & text translation, offline access, and Material Design 3 UI.',
    image: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=800&h=500&fit=crop',
    tech: ['Kotlin', 'Android', 'Firebase', 'Room', 'MVVM'],
    liveDemo: 'https://github.com/jackstealer/Verbiage',
    github: 'https://github.com/jackstealer/Verbiage',
    featured: false,
  },
];

gsap.registerPlugin(ScrollTrigger);

const TILT_SPRING = { stiffness: 150, damping: 15 };

// Tilts toward the mouse with a soft light that follows it across the card; stays flat for touch.
const TiltCard: React.FC<{ children: React.ReactNode; index: number }> = ({ children, index }) => {
  const ref = useRef<HTMLElement>(null);
  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (e.pointerType !== 'mouse' || !el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    rotateY.set((x - 0.5) * 10);
    rotateX.set((0.5 - y) * 8);
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-[20px] border border-white/[0.06] bg-panel transition-colors duration-300 hover:border-white/15 lg:w-[min(34vw,430px)] lg:shrink-0"
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.08), transparent 45%)' }}
      />
    </motion.article>
  );
};

const Projects: React.FC = () => {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Desktop: the card row pins mid-screen and slides sideways as you scroll. Smaller screens keep the grid.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = () => track.scrollWidth - track.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'center 55%', // centred in the space below the fixed navbar
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative overflow-x-clip px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1150px]">
        <div className="mb-16 grid items-end gap-8 lg:mb-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading eyebrow="Selected work" title="Work" />
          <p className="max-w-xl text-lg leading-relaxed text-gray-400">
            Some of the things I've built: each one explores a different side of how I design, build and ship, from
            ML models to full-stack products.
          </p>
        </div>

        <div ref={pinRef}>
          <div ref={trackRef} className="grid gap-5 md:grid-cols-2 lg:flex lg:gap-6">
            {projects.map((p, i) => (
              <TiltCard key={p.title} index={i}>
                <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[2/1]">
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover opacity-70 grayscale transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 text-xs tabular-nums text-white/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {p.featured && (
                    <span className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-3 text-xl font-semibold tracking-[-0.01em] text-white lg:text-2xl">{p.title}</h3>
                  <p className="mb-6 flex-1 text-[15px] leading-relaxed text-gray-400 lg:line-clamp-3">{p.description}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-5 text-sm">
                    <Magnetic>
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-white transition-opacity hover:opacity-70"
                      >
                        Code <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </a>
                    </Magnetic>
                    {p.liveDemo !== p.github && (
                      <Magnetic>
                        <a
                          href={p.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-white transition-opacity hover:opacity-70"
                        >
                          Live <ArrowUpRightIcon className="h-3.5 w-3.5" />
                        </a>
                      </Magnetic>
                    )}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// memo: App re-renders when the intro finishes; static sections needn't.
export default React.memo(Projects);
