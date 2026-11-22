import React, { useEffect, useRef, useState } from 'react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, label, select';

// Desktop custom cursor: a dot pinned to the pointer and a ring that trails it, growing over anything
// clickable. Not rendered on touch screens. It only animates while catching up with the pointer, and
// avoids mix-blend-mode, which made every frame of the page's other animations more expensive.
const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState(() => !!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!enabled || !dot || !ring) return;
    document.documentElement.classList.add('custom-cursor');

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let scale = 1;
    let hover = false;
    let down = false;
    let raf = 0;

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      const target = hover ? 1.8 : down ? 0.75 : 1;
      scale += (target - scale) * 0.2;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${hover ? 0 : 1})`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      const settled = Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1 && Math.abs(target - scale) < 0.005;
      raf = settled ? 0 : requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      if (dot.style.opacity !== '1') {
        rx = e.clientX;
        ry = e.clientY;
        dot.style.opacity = ring.style.opacity = '1';
      }
      mx = e.clientX;
      my = e.clientY;
      hover = !!(e.target as Element | null)?.closest?.(INTERACTIVE);
      kick();
    };
    const hide = () => (dot.style.opacity = ring.style.opacity = '0');
    const press = () => {
      down = true;
      kick();
    };
    const release = () => {
      down = false;
      kick();
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    document.documentElement.addEventListener('pointerleave', hide);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
      document.documentElement.removeEventListener('pointerleave', hide);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-white/60 opacity-0"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-white opacity-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.45)]"
      />
    </>
  );
};

export default React.memo(Cursor);
