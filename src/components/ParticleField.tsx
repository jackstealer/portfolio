import React, { useEffect, useRef } from 'react';

interface Props {
  start: boolean; // begin gathering the dust into the globe
}

const POINTS = 7000; // spread over the whole sphere; about half face the viewer at any time
const ASSEMBLE = 1.6; // seconds for one particle to fly home
const SPIN = 0.12; // rad/s around the vertical axis
const TILT = 0.38; // rad; the axis leans toward the viewer
const REPEL_R = 110; // px; the pointer pushes particles within this radius...
const REPEL_F = 38; // ...by up to this many px
const LIGHT = (() => {
  const v = [-0.5, -0.55, 0.67];
  const len = Math.hypot(v[0], v[1], v[2]);
  return v.map((c) => c / len);
})();
const COLORS = ['#e6e8ec', '#aab8e6']; // grey-white and blue-grey, as in the reference

// A slowly spinning globe of square particles that gathers out of a dust field behind the hero word, plus a
// faint starfield. The pointer pushes particles aside; scrolling the hero away scatters them back into dust.
const ParticleField: React.FC<Props> = ({ start }) => {
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
    let R = 0;
    let cx = 0;
    let cy = 0;
    let dot = 3;
    let raf = 0;
    let resizeTimer = 0;
    let stars = new Float32Array(0); // x, y, alpha, phase
    // Per point, ordered by colour (tintSplit = first index of the second colour).
    const px = new Float32Array(POINTS); // position on the unit sphere
    const py = new Float32Array(POINTS);
    const pz = new Float32Array(POINTS);
    const tex = new Float32Array(POINTS); // surface pattern brightness
    const delay = new Float32Array(POINTS);
    const hx = new Float32Array(POINTS); // scattered "home" position in px
    const hy = new Float32Array(POINTS);
    const ox = new Float32Array(POINTS); // current push from the pointer
    const oy = new Float32Array(POINTS);
    let tintSplit = 0;
    const pointer = { x: -1e4, y: -1e4 };

    // Fibonacci sphere with a banded surface pattern, so the rotation reads.
    const golden = Math.PI * (3 - Math.sqrt(5));
    const order = Array.from({ length: POINTS }, (_, i) => i).sort(() => Math.random() - 0.5);
    const blue = Math.floor(POINTS * 0.3);
    tintSplit = POINTS - blue;
    order.forEach((slot, i) => {
      const y = 1 - (2 * (i + 0.5)) / POINTS;
      const r = Math.sqrt(1 - y * y);
      const phi = i * golden;
      px[slot] = Math.cos(phi) * r;
      py[slot] = y;
      pz[slot] = Math.sin(phi) * r;
      const lat = Math.asin(y);
      const band = 0.5 + 0.5 * Math.sin(3 * phi + 2.2 * Math.sin(2 * lat)) * Math.cos(1.7 * lat);
      tex[slot] = Math.min(1, (0.3 + 0.7 * band) * (0.75 + 0.5 * Math.random()));
      delay[slot] = Math.random() * 0.8;
    });

    const build = () => {
      // One canvas pixel per CSS pixel: the square "pixels" don't need hi-dpi, and fill cost grows with dpr².
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W;
      canvas.height = H;
      R = Math.min(W * 0.42, H * 0.29);
      cx = W / 2;
      cy = H * 0.42;
      dot = Math.max(2, R / 80);

      const count = Math.round((W * H) / 4500);
      stars = new Float32Array(count * 4);
      for (let i = 0; i < count; i++) {
        stars.set([Math.random() * W, Math.random() * H, 0.08 + Math.random() * 0.4, Math.random() * 6.28], i * 4);
      }
      for (let i = 0; i < POINTS; i++) {
        hx[i] = Math.random() * W;
        hy[i] = Math.random() * H;
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const s = startedAt.current;
      if (s === null || window.scrollY > H * 1.1) return; // not cued yet, or hero off-screen
      ctx.clearRect(0, 0, W, H);
      const t = (now - s) / 1000;
      const fadeIn = Math.min(1, t / 0.8);
      const scatter = Math.min(1, window.scrollY / (H * 0.75));

      ctx.fillStyle = '#fff';
      for (let i = 0; i < stars.length; i += 4) {
        ctx.globalAlpha = stars[i + 2] * fadeIn * (0.65 + 0.35 * Math.sin(now * 0.0015 + stars[i + 3]));
        ctx.fillRect(stars[i], stars[i + 1], 1.2, 1.2);
      }

      const a = t * SPIN;
      const cosA = Math.cos(a);
      const sinA = Math.sin(a);
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);
      for (let i = 0; i < POINTS; i++) {
        if (i === 0 || i === tintSplit) ctx.fillStyle = COLORS[i === 0 ? 0 : 1];
        // Spin around the vertical axis, then lean the axis toward the viewer.
        const x = px[i] * cosA + pz[i] * sinA;
        const z1 = pz[i] * cosA - px[i] * sinA;
        const y = py[i] * cosT - z1 * sinT;
        const z = py[i] * sinT + z1 * cosT;
        if (z <= 0) continue; // far side

        const sx = cx + x * R;
        const sy = cy + y * R;
        // Push away from the pointer, easing toward the target push each frame.
        let tox = 0;
        let toy = 0;
        const dx = sx - pointer.x;
        const dy = sy - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_R * REPEL_R) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / REPEL_R) ** 2 * REPEL_F;
          tox = (dx / d) * f;
          toy = (dy / d) * f;
        }
        ox[i] += (tox - ox[i]) * 0.12;
        oy[i] += (toy - oy[i]) * 0.12;

        const p = Math.min(1, Math.max(0, (t - delay[i]) / ASSEMBLE));
        const k = (1 - (1 - p) ** 3) * (1 - scatter);
        const lambert = Math.max(0, x * LIGHT[0] + y * LIGHT[1] + z * LIGHT[2]);
        const b = Math.min(1, (0.08 + 0.92 * lambert ** 1.2) * tex[i] + (1 - z) ** 4 * 0.35);
        let alpha = (0.25 + 0.75 * k * b) * fadeIn * Math.min(1, z * 5);
        if (Math.random() < 0.01) alpha *= 0.3; // shimmer
        const size = (1.2 + (dot - 1.2) * k) * (0.75 + 0.35 * z); // nearer = bigger
        ctx.globalAlpha = alpha;
        ctx.fillRect(hx[i] + (sx + ox[i] - hx[i]) * k, hy[i] + (sy + oy[i] - hy[i]) * k, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onAway = () => {
      pointer.x = -1e4;
      pointer.y = -1e4;
    };
    const onUp = (e: PointerEvent) => e.pointerType !== 'mouse' && onAway(); // a lifted finger stops pushing
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (canvas.clientWidth !== W || canvas.clientHeight !== H) build();
      }, 150);
    };

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('blur', onAway);
    document.documentElement.addEventListener('pointerleave', onAway);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('blur', onAway);
      document.documentElement.removeEventListener('pointerleave', onAway);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
};

export default ParticleField;
