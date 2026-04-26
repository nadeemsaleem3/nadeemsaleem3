/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        primary: {
          light: '#FFFFFF',
          dark: '#0F172A',
        },
        secondary: {
          light: '#F8FAFC',
          dark: '#1E293B',
        },
        accent: {
          light: '#3B82F6',
          dark: '#60A5FA',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'pop-in': 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'typewriter': 'typewriter 2.5s steps(40) 1s 1 normal both',
        'blink-caret': 'blinkCaret 0.75s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '70%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blinkCaret: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
      },
    },
  },
  plugins: [],
}