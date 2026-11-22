import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, MotionConfig, useReducedMotion, Transition } from 'framer-motion';
import { ArrowDownLeftIcon } from '@heroicons/react/24/outline';
import ParticleField from './ParticleField';

const NAME = 'ATUL';
const WORD = 'PORTFOLIO';
// The falling dot becomes a "!" whose stem turns into this letter: the I if the name has one, else the last letter.
const STEM = NAME.includes('I') ? NAME.indexOf('I') : NAME.length - 1;
const LEFT = STEM; // letters that spill out of the "!" to its left
const RIGHT = NAME.length - 1 - STEM; // letters that tumble in from the right
const STAGGER = 0.12;
const MORPH_STAGGER = 0.08;
const INTRO_SCALE = 0.5; // word size during the intro, relative to its resting size

// Cue times in seconds after load.
const T = (() => {
  const stem = 1.05; // "!" stem drops onto the bounced dot
  const spill = 1.45; // stem tips over, left letters spill out
  const right = spill + 0.15 + LEFT * STAGGER + 0.3; // stem rights itself, right letters tumble in
  const bang = right + RIGHT * STAGGER + 0.2; // "!" turns into its letter
  const morph = bang + 0.45; // name flips letter by letter into WORD
  const settle = morph + WORD.length * MORPH_STAGGER + 0.4; // word moves into the hero layout
  return { stem, spill, right, bang, morph, settle, particles: settle + 0.35, done: settle + 1.1 };
})();

const enterAt = (i: number) =>
  i < STEM ? T.spill + 0.15 + (STEM - 1 - i) * STAGGER : T.right + (i - STEM - 1) * STAGGER;
const morphAt = (i: number) => T.morph + i * MORPH_STAGGER;

const CUES = Array.from(
  new Set([
    0, // the dot starts falling
    T.stem, T.spill, T.right, T.bang, T.settle, T.particles, T.done,
    ...Array.from(NAME, (_, i) => enterAt(i)),
    ...Array.from(WORD, (_, i) => morphAt(i)),
  ])
).sort((a, b) => a - b);

const TRACKING = -0.02; // em; must match the h1's tracking class
const WORD_SIZE = 'text-[clamp(3.4rem,12.6vw,13.5rem)]'; // h1 font size; the subtitle row is sized in the same em
// Tumble-in offsets, in % of the letter's own box. Units framer can't type (em) make it measure the element first,
// which briefly resets scale/rotate; the spring reads that jump as huge velocity and flings the letter to scale -2.5.
// For the same reason the slot's em width animates on an outer span that has no scale/rotate.
const TUMBLE = {
  left: { x: '130%', y: '-25%', rotate: -220, scale: 0.4 },
  right: { x: '170%', y: '-110%', rotate: 200, scale: 0.6 },
};
const TUMBLE_REST = { x: '0%', y: '0%', rotate: 0, scale: 1 };
const SPRING = { type: 'spring', stiffness: 170, damping: 17 } as const;
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DOT_Y = ['-120vh', '0vh', '-26vh', '0vh', '-9vh', '0vh', '-2.5vh', '0vh'];
const DOT_BOUNCE: Transition = {
  duration: T.stem - 0.05,
  times: [0, 0.38, 0.55, 0.7, 0.8, 0.89, 0.95, 1],
  ease: ['easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'],
};
const STEM_TILT = [0, -70, -70, 0];
const STEM_MOTION: Transition = {
  y: { type: 'spring', stiffness: 300, damping: 14 },
  opacity: { duration: 0.15 },
  rotate: { duration: T.right - T.spill, times: [0, 0.22, 0.7, 1], ease: 'easeInOut' },
};

// One character. Remount it with a new key to flip the next character in.
const Glyph: React.FC<{ char: string; flip: boolean; axis: 'x' | 'y' }> = ({ char, flip, axis }) => (
  <motion.span
    className="inline-block text-chrome"
    style={flip ? { transformPerspective: 500 } : undefined}
    initial={flip ? (axis === 'x' ? { rotateX: -90, opacity: 0 } : { rotateY: -90, opacity: 0 }) : false}
    animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
    transition={{ duration: 0.3, ease: [0.2, 0.7, 0.3, 1] }}
  >
    {char}
  </motion.span>
);

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

interface HeroProps {
  onIntroDone: () => void;
}

const Hero: React.FC<HeroProps> = ({ onIntroDone }) => {
  const reduced = useReducedMotion();
  const [clock, setClock] = useState(-1); // time of the latest cue fired
  const at = (t: number) => clock >= t;
  const heroRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const [offset, setOffset] = useState<number | null>(null);
  const [widths, setWidths] = useState<Record<string, number>>({});

  // Slot widths in em, from the font's own metrics. framer's width:'auto' measures with transforms applied,
  // which is wrong inside the scaled, spinning word.
  useEffect(() => {
    document.fonts?.load('900 100px Inter').then(() => {
      const ctx = document.createElement('canvas').getContext('2d');
      if (!ctx) return;
      ctx.font = '900 100px Inter';
      const w: Record<string, number> = {};
      Array.from(new Set(NAME + WORD + '!')).forEach((ch) => (w[ch] = ctx.measureText(ch).width / 100 + TRACKING));
      setWidths(w);
    });
  }, []);
  const widthOf = (ch: string) => `${widths[ch] ?? 0.7}em`;
  const wordWidth = Array.from(WORD).reduce((sum, ch) => sum + (widths[ch] ?? 0.7), 0);

  // Fire each cue on schedule. The intro plays for everyone (owner's choice, even with reduced motion on);
  // any click, key, scroll or touch skips straight to the end.
  useEffect(() => {
    const skipEvents = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    let ids: number[] = [];
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      ids.forEach(clearTimeout);
      skipEvents.forEach((e) => window.removeEventListener(e, finish));
      setClock(Infinity);
      onIntroDone();
    };
    // Start once the font is in and the page's first layout/paint work is done; otherwise the dot stutters
    // through that busy first half-second.
    const begin = () => {
      if (finished) return;
      ids = CUES.map((t) => window.setTimeout(() => (t === T.done ? finish() : setClock(t)), t * 1000));
    };
    const whenIdle = (cb: () => void) =>
      typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(cb, { timeout: 600 }) : window.setTimeout(cb, 100);
    Promise.race([
      document.fonts ? Promise.all([document.fonts.load('900 1em Inter'), document.fonts.load('italic 300 1em Inter')]) : null,
      new Promise((resolve) => window.setTimeout(resolve, 2500)),
    ]).then(() => whenIdle(begin));
    skipEvents.forEach((e) => window.addEventListener(e, finish, { passive: true }));
    return () => {
      finished = true;
      ids.forEach(clearTimeout);
      skipEvents.forEach((e) => window.removeEventListener(e, finish));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // During the intro the word sits at the centre of the hero; measure how far that is from where it rests.
  useLayoutEffect(() => {
    const measure = () => {
      const hero = heroRef.current;
      const block = blockRef.current;
      const word = wordRef.current;
      if (!hero || !block || !word) return;
      // offsetTop ignores transforms, so this is the resting position.
      setOffset(hero.clientHeight / 2 - (block.offsetTop + word.offsetTop + word.offsetHeight / 2));
    };
    measure();
    document.fonts?.ready.then(measure);
    // The block changes size as the word grows (the hidden subtitle row re-wraps), and with the viewport.
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    [heroRef.current, blockRef.current].forEach((el) => el && ro?.observe(el));
    return () => ro?.disconnect();
  }, []);

  const settled = at(T.settle);
  const slots: React.ReactNode[] = [];
  for (let i = 0; i < Math.max(NAME.length, WORD.length); i++) {
    const morphed = at(morphAt(i));
    const visible =
      i < NAME.length ? (i === STEM ? at(0) : at(enterAt(i))) && (i < WORD.length || !morphed) : morphed;
    if (!visible) continue;
    const char = morphed ? WORD[i] : NAME[i];
    const from = i >= NAME.length ? 'grow' : i < STEM ? 'left' : i > STEM ? 'right' : null;
    const isStem = i === STEM;

    slots.push(
      <motion.span
        key={i}
        className="relative inline-block"
        initial={from ? { width: '0em', opacity: from === 'grow' ? 0 : 1 } : false}
        animate={{ width: widthOf(isStem && !at(T.bang) ? '!' : char), opacity: 1 }}
        // A short tween, not the spring: width changes re-lay out the whole word every frame.
        transition={{ default: SPRING, width: { duration: 0.35, ease: EASE_OUT } }}
      >
        <motion.span
          className="inline-block"
          initial={from === 'left' || from === 'right' ? TUMBLE[from] : false}
          animate={TUMBLE_REST}
          transition={SPRING}
        >
          {isStem && !at(T.bang) ? (
            <span className="invisible">!</span>
          ) : (
            <Glyph key={char} char={char} flip={morphed || isStem} axis={isStem && !morphed ? 'y' : 'x'} />
          )}
        </motion.span>

        {/* The "!": a dot that bounces in, then a stem that drops onto it. Two copies of the glyph, clipped at the
            gap between stem (0.14-0.64em) and dot (0.68-0.87em) in Inter Black's line box. */}
        {isStem && !at(T.morph) && (
          <>
            <motion.span
              className="absolute inset-0 text-center text-chrome"
              style={{ clipPath: 'inset(0 0 34% 0)', transformOrigin: '50% 64%' }}
              initial={{ y: '-1.5em', opacity: 0, rotate: 0 }}
              animate={
                at(T.bang)
                  ? { y: '0em', opacity: 0, rotate: 0 }
                  : at(T.stem)
                  ? { y: '0em', opacity: 1, rotate: at(T.spill) && LEFT > 0 ? STEM_TILT : 0 }
                  : { y: '-1.5em', opacity: 0, rotate: 0 }
              }
              transition={STEM_MOTION}
            >
              !
            </motion.span>
            <motion.span
              className="absolute inset-0 text-center text-gray-100"
              style={{ clipPath: 'inset(66% 0 0 0)' }}
              initial={{ y: DOT_Y[0], opacity: 1 }}
              animate={at(T.bang) ? { y: '8vh', opacity: 0 } : { y: DOT_Y, opacity: 1 }}
              transition={at(T.bang) ? { duration: 0.35, ease: 'easeIn' } : DOT_BOUNCE}
            >
              !
            </motion.span>
          </>
        )}
      </motion.span>
    );
  }

  return (
    // The app-wide MotionConfig honours reduced motion; the intro opts out so it always plays.
    <MotionConfig reducedMotion="never">
      <section
        ref={heroRef}
        id="home"
        className="relative flex h-[100svh] min-h-[560px] flex-col items-center justify-end overflow-hidden bg-ink pb-[6vh]"
      >
        {/* Spotlight; it pulses as the dot lands. */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 38% 45% at 50% 50%, rgba(255,255,255,0.075), rgba(255,255,255,0.02) 55%, transparent 75%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: at(0) ? [0, 0.35, 1, 0.55, 0.85, 0.6, 0.7] : 0 }}
          transition={{ duration: T.stem, times: [0, 0.36, 0.4, 0.55, 0.72, 0.88, 1] }}
        />

        <ParticleField start={at(T.particles)} reduced={!!reduced} />

        <div ref={blockRef} className="relative z-10 flex max-w-full flex-col">
          <motion.h1
            ref={wordRef}
            aria-label="Atul Raj Gautam, Portfolio"
            className={`whitespace-nowrap text-center ${WORD_SIZE} font-black leading-none tracking-[-0.02em]`}
            style={{ opacity: offset === null ? 0 : 1 }}
            initial={false}
            animate={settled ? { y: 0, scale: 1 } : { y: offset ?? 0, scale: INTRO_SCALE }}
            transition={settled ? { duration: 1.1, ease: EASE } : { duration: 0 }}
          >
            {/* Zero-width space keeps the line box (and the measured centre) before the first letter appears. */}
            <span aria-hidden>{slots.length ? slots : '​'}</span>
          </motion.h1>

          <motion.div
            // Fixed to the final word's width, so it neither widens the block nor re-wraps (moving the word) mid-intro.
            className={`mt-3 flex max-w-full flex-wrap items-center justify-between gap-x-8 gap-y-4 pl-[1.6%] pr-[7%] lg:mt-5 ${WORD_SIZE}`}
            style={{ width: `${wordWidth}em` }}
            initial={false}
            animate={settled ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[clamp(1.05rem,2.1vw,2rem)] tracking-[-0.01em] text-white">
              <span className="font-bold">AI/ML &amp; Full-Stack</span>{' '}
              <span className="font-light italic text-gray-200">Developer</span>
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Scroll to about"
                onClick={() => scrollTo('about')}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-white/40 hover:bg-white/5"
              >
                <ArrowDownLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="h-11 rounded-full border border-white/15 px-6 text-[15px] italic text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Contact
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default Hero;
