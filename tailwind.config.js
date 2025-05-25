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
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#1a1a1a',
          600: '#141414',
          700: '#0f0f0f',
          800: '#0a0a0a',
          900: '#050505',
          950: '#000000',
        },
        secondary: {
          50: '#fff9eb',
          100: '#fef2d6',
          200: '#fce4ad',
          300: '#fbd584',
          400: '#f9c65b',
          500: '#B8860B', // Dark Golden Rod
          600: '#926c09',
          700: '#6d5107',
          800: '#483704',
          900: '#241c02',
          950: '#120e01',
        },
        accent: {
          50: '#fdfbed',
          100: '#fcf7db',
          200: '#f8edb7',
          300: '#f5e493',
          400: '#f1da6f',
          500: '#DAA520', // Golden Rod
          600: '#ae841a',
          700: '#836313',
          800: '#57420d',
          900: '#2c2106',
          950: '#161103',
        },
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'gold': '0 4px 20px -2px rgba(218, 165, 32, 0.25)',
        'premium': '0 20px 40px -8px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(45deg, #B8860B, #DAA520, #B8860B)',
        'gradient-premium': 'linear-gradient(to right, #1a1a1a, #2d2d2d)',
      },
    },
  },
  plugins: [],
};