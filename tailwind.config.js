/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#1F1F1F',
          700: '#1a1a1a',
          800: '#171717',
          900: '#141414',
          950: '#0a0a0a',
        },
        secondary: {
          50: '#fff9eb',
          100: '#fef2d6',
          200: '#fce4ad',
          300: '#fbd584',
          400: '#f9c65b',
          500: '#D4AF37',
          600: '#b38f24',
          700: '#8c6d1b',
          800: '#664f13',
          900: '#40310a',
          950: '#1a1305',
        },
        accent: {
          50: '#fdfbed',
          100: '#fcf7db',
          200: '#f8edb7',
          300: '#f5e493',
          400: '#f1da6f',
          500: '#D4AF37',
          600: '#b38f24',
          700: '#8c6d1b',
          800: '#664f13',
          900: '#40310a',
          950: '#1a1305',
        },
        success: {
          500: '#D4AF37',
        },
        warning: {
          500: '#D4AF37',
        },
        error: {
          500: '#dc2626',
        },
      },
      boxShadow: {
        'subtle': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
        'gold': '0 4px 20px -2px rgba(212, 175, 55, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(45deg, #D4AF37, #FFE5A0, #D4AF37)',
      },
    },
  },
  plugins: [],
};