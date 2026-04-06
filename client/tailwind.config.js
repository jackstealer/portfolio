/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#854F6C', // Main mauve/purple (dark mode)
          600: '#522B5B', // Medium purple (dark mode)
          700: '#2B124C', // Dark purple (dark mode)
          800: '#190019', // Darkest purple (dark mode)
          900: '#0f0010',
        },
        accent: {
          50: '#FBF5E9', // Cream/off-white (light mode bg)
          100: '#B99268', // Tan/beige (light mode cards)
          200: '#895720', // Warm brown (light mode highlights)
          300: '#774723', // Medium brown (light mode accents)
          400: '#391809', // Dark brown (light mode text)
          500: '#DFB6B2', // Peachy cream
          600: '#FBE4D8', // Light cream
          700: '#854F6C', // Mauve (for dark mode accents)
          800: '#522B5B', // Purple
          900: '#2B124C', // Dark purple
        },
        dark: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#190019', // Darkest purple
          900: '#0f0010',
        },
        cream: {
          50: '#FBF5E9', // Cream/off-white
          100: '#B99268', // Tan/beige
          200: '#895720', // Warm brown
          300: '#774723', // Medium brown
          400: '#391809', // Dark brown
          500: '#FBE4D8', // Main light cream
          600: '#DFB6B2', // Peachy cream
          700: '#d4a8a4',
          800: '#c09a96',
          900: '#ac8c88',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}