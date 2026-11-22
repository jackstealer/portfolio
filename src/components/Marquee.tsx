import React, { useEffect, useRef, useState } from 'react';
import { skillCategories } from './Skills';

const words = skillCategories.flatMap((c) => c.skills);

// One endless row: the list is rendered twice and the track slides by half its width, so it loops seamlessly.
const Row: React.FC<{ reverse?: boolean; outline?: boolean; running: boolean }> = ({ reverse, outline, running }) => (
  <div className="flex overflow-hidden">
    <div
      className={`flex shrink-0 animate-marquee items-center whitespace-nowrap will-change-transform hover:[animation-play-state:paused] ${
        reverse ? '[animation-direction:reverse]' : ''
      } ${running ? '' : '[animation-play-state:paused]'}`}
    >
      {[...words, ...words].map((w, i) => (
        <span key={i} className="flex items-center text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.15] tracking-[-0.03em]">
          <span className={outline ? 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.28)]' : 'text-steel'}>
            {w}
          </span>
          <span className="mx-8 text-[0.4em] text-white/25">✦</span>
        </span>
      ))}
    </div>
  </div>
);

// Two counter-scrolling bands of every skill, between sections. They only run while on screen: the bands are
// wide, and animating them off-screen cost the hero intro frames on slower machines.
const Marquee: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="Skills" className="relative space-y-2 overflow-hidden border-y border-white/[0.06] py-10">
      <Row running={running} />
      <Row reverse outline running={running} />
      {/* Edge fades as overlays: a CSS mask here forced the moving bands to be re-composited every frame. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[8%] bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-ink to-transparent" />
    </section>
  );
};

export default React.memo(Marquee);
