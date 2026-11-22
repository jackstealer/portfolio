import React from 'react';

// Ambient page background: two slow-drifting steel glows, a faint dot grid and film grain.
// CSS only (no per-frame JS) so it never competes with the hero globe. The hero paints solid
// black over it, so the intro stays clean and this shows from the About section down.
const Backdrop: React.FC = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -left-[22vmax] -top-[22vmax] h-[70vmax] w-[70vmax] animate-drift-a rounded-full bg-[radial-gradient(circle,rgba(170,182,200,0.11),transparent_62%)]" />
    <div className="absolute -bottom-[26vmax] -right-[22vmax] h-[76vmax] w-[76vmax] animate-drift-b rounded-full bg-[radial-gradient(circle,rgba(140,152,172,0.09),transparent_62%)]" />
    <div className="bg-dots absolute inset-0" />
    <div className="bg-grain absolute inset-0 opacity-[0.06]" />
  </div>
);

export default Backdrop;
