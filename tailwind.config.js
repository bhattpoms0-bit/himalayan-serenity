/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#e07b2a',
          'orange-light': '#f0943a',
          'orange-dark': '#c4661a',
          gold: '#C8A44B',
          'gold-light': '#E8C97A',
          'gold-muted': 'rgba(200,164,75,0.12)',
          dark: '#090909',
          'dark-2': '#101010',
          'dark-3': '#161616',
          'dark-card': '#171717',
          'dark-elevated': '#1c1c1c',
          'dark-border': '#222222',
          'dark-border-light': '#2e2e2e',
          cream: '#F0E8D8',
          'cream-muted': '#C8BFAE',
          'text-muted': '#787878',
          'text-light': '#B8B8B8',
          'text-whisper': '#454545',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['"Cinzel"', 'serif'],
      },
      letterSpacing: {
        luxury: '0.12em',
        ultra: '0.24em',
        display: '0.32em',
      },
      lineHeight: {
        'serif-tight': '1.06',
        'serif-normal': '1.28',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.88) 100%)',
        'card-gradient': 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)',
        'card-gradient-side': 'linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
        'luxury-gradient': 'linear-gradient(135deg, #e07b2a 0%, #C8A44B 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(200,164,75,0.08) 50%, transparent 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1.1s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scroll-indicator': 'scrollPulse 2.2s ease-in-out infinite',
        'float': 'float 7s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scrollPulse: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.35' },
          '50%': { transform: 'translateY(10px)', opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      }
    },
  },
  plugins: [],
}
