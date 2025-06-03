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
          500: '#C9B037', // Premium Gold
          600: '#a18c2c',
          700: '#796921',
          800: '#514616',
          900: '#28230b',
          950: '#141205',
        },
        accent: {
          50: '#fdfbed',
          100: '#fcf7db',
          200: '#f8edb7',
          300: '#f5e493',
          400: '#f1da6f',
          500: '#C9B037', // Premium Gold
          600: '#a18c2c',
          700: '#796921',
          800: '#514616',
          900: '#28230b',
          950: '#141205',
        },
        background: '#F9F9F6', // Ivory
        text: '#111111', // Dark Charcoal
        border: '#E0E0E0', // Soft Gray
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'gold': '0 4px 20px -2px rgba(201, 176, 55, 0.25)',
        'premium': '0 20px 40px -8px rgba(0, 0, 0, 0.12)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(45deg, #C9B037, #E5CC4D, #C9B037)',
        'gradient-premium': 'linear-gradient(to right, #1a1a1a, #2d2d2d)',
      },
    },
  },
  plugins: [],
};