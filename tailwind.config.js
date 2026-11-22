/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#020404', // page background
        panel: '#0f1111', // cards
        muted: '#5e6060', // eyebrow labels
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        // The track holds the list twice, so sliding by half its width loops seamlessly.
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        // Background glows wander slowly; B mirrors A so the two never drift off the same edge.
        'drift-a': {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(14vw, 10vh, 0) scale(1.12)' },
          '100%': { transform: 'translate3d(6vw, 22vh, 0) scale(0.94)' },
        },
        'drift-b': {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-12vw, -14vh, 0) scale(0.92)' },
          '100%': { transform: 'translate3d(-20vw, -4vh, 0) scale(1.08)' },
        },
      },
      animation: {
        marquee: 'marquee 70s linear infinite',
        'drift-a': 'drift-a 38s ease-in-out infinite alternate',
        'drift-b': 'drift-b 52s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
