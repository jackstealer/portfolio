import React, { useEffect, useRef } from 'react';

interface Props {
  start: boolean; // begin gathering the dust into the sphere
  reduced: boolean; // prefers-reduced-motion: the sphere appears already formed, no swarm or shimmer
}

const TARGET_PARTICLES = 7000;
const ASSEMBLE = 1.6; // seconds for one particle to fly home
const LEVELS = 8; // brightness steps
const LIGHT = (() => {
  const v = [-0.45, -0.55, 0.7];
  const len = Math.hypot(v[0], v[1], v[2]);
  return v.map((c) => c / len);
})();

// A pixel-mosaic sphere that gathers out of a dust field behind the hero word, plus a faint starfield.
// Scrolling the hero away scatters it back into dust.
const ParticleField: React.FC<Props> = ({ start, reduced }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    if (start && startedAt.current === null) startedAt.current = performance.now();
  }, [start]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let W = 0;
    let H = 0;
    let cell = 6;
    let raf = 0;
    let resizeTimer = 0;
    let stars = new Float32Array(0); // x, y, alpha, phase
    let hx = new Float32Array(0); // scattered "home" position
    let hy = new Float32Array(0);
    let tx = new Float32Array(0); // position in the sphere
    let ty = new Float32Array(0);
    let delay = new Float32Array(0);
    let bucketEnd: number[] = []; // particles are grouped by colour so each colour is set once per frame

    // Grey and blue-grey steps, sampled from the reference look.
    const styles: string[] = [];
    for (let tint = 0; tint < 2; tint++) {
      for (let l = 0; l < LEVELS; l++) {
        const v = 34 + (l * 220) / (LEVELS - 1);
        styles.push(
          tint
            ? `rgb(${Math.round(v * 0.8)},${Math.round(v * 0.86)},${Math.min(255, Math.round(v + 28))})`
            : `rgb(${Math.round(v)},${Math.round(v)},${Math.round(v)})`
        );
      }
    }

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((W * H) / 4500);
      stars = new Float32Array(count * 4);
      for (let i = 0; i < count; i++) {
        stars.set([Math.random() * W, Math.random() * H, 0.08 + Math.random() * 0.4, Math.random() * 6.28], i * 4);
      }

      const R = Math.min(W * 0.42, H * 0.29);
      const cx = W / 2;
      const cy = H * 0.42;
      cell = Math.max(4, Math.ceil(Math.sqrt((Math.PI * R * R) / TARGET_PARTICLES)));

      const buckets: number[][] = styles.map(() => []);
      for (let y = cy - R; y < cy + R; y += cell) {
        for (let x = cx - R; x < cx + R; x += cell) {
          const dx = (x + cell / 2 - cx) / R;
          const dy = (y + cell / 2 - cy) / R;
          const d2 = dx * dx + dy * dy;
          if (d2 > 1) continue;
          const nz = Math.sqrt(1 - d2);
          const lambert = Math.max(0, dx * LIGHT[0] + dy * LIGHT[1] + nz * LIGHT[2]);
          const rim = Math.pow(1 - nz, 4) * 0.35; // thin lit edge
          const b = Math.min(1, (0.03 + 0.85 * Math.pow(lambert, 1.4) + rim) * (0.75 + 0.5 * Math.random()));
          if (Math.random() < 0.15 || (b < 0.12 && Math.random() < 0.75)) continue; // gaps; the night side thins out
          const level = Math.min(LEVELS - 1, Math.round(b * (LEVELS - 1)));
          const tint = Math.random() < 0.3 ? 1 : 0;
          buckets[tint * LEVELS + level].push(x, y);
        }
      }

      const n = buckets.reduce((sum, b) => sum + b.length / 2, 0);
      hx = new Float32Array(n);
      hy = new Float32Array(n);
      tx = new Float32Array(n);
      ty = new Float32Array(n);
      delay = new Float32Array(n);
      bucketEnd = [];
      let i = 0;
      for (const b of buckets) {
        for (let j = 0; j < b.length; j += 2, i++) {
          tx[i] = b[j];
          ty[i] = b[j + 1];
          hx[i] = Math.random() * W;
          hy[i] = Math.random() * H;
          delay[i] = Math.random() * 0.8;
        }
        bucketEnd.push(i);
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (window.scrollY > H * 1.1) return; // hero is off-screen
      ctx.clearRect(0, 0, W, H);
      const s = startedAt.current;
      if (s === null) return; // waits for its cue in the hero intro
      const t = reduced ? Infinity : (now - s) / 1000; // reduced motion: appears already formed, no swarm
      const fadeIn = Math.min(1, t / 0.8);
      const scatter = Math.min(1, window.scrollY / (H * 0.75));

      ctx.fillStyle = '#fff';
      for (let i = 0; i < stars.length; i += 4) {
        const twinkle = reduced ? 1 : 0.65 + 0.35 * Math.sin(now * 0.0015 + stars[i + 3]);
        ctx.globalAlpha = stars[i + 2] * fadeIn * twinkle;
        ctx.fillRect(stars[i], stars[i + 1], 1.2, 1.2);
      }

      let i = 0;
      for (let b = 0; b < bucketEnd.length; b++) {
        ctx.fillStyle = styles[b];
        for (; i < bucketEnd[b]; i++) {
          const p = Math.min(1, Math.max(0, (t - delay[i]) / ASSEMBLE));
          const k = (1 - Math.pow(1 - p, 3)) * (1 - scatter);
          const size = 1.4 + (cell - 2.4) * k; // dust speck -> cell minus a 1px gap
          let a = (0.3 + 0.7 * k) * fadeIn;
          if (!reduced && Math.random() < 0.015) a *= 0.35; // shimmer
          ctx.globalAlpha = a;
          ctx.fillRect(hx[i] + (tx[i] - hx[i]) * k, hy[i] + (ty[i] - hy[i]) * k, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (canvas.clientWidth !== W || canvas.clientHeight !== H) build();
      }, 150);
    };

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
};

export default ParticleField;
