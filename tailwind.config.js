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
          50: '#f8f7f4',
          100: '#f2efe8',
          200: '#e5dfd1',
          300: '#d4c8b0',
          400: '#bca988',
          500: '#D4AF37', // Gold
          600: '#a88c2e',
          700: '#8c6d26',
          800: '#735824',
          900: '#604a22',
          950: '#352711',
        },
        accent: {
          50: '#fbf8eb',
          100: '#f7f0d7',
          200: '#efe1af',
          300: '#e7d287',
          400: '#dfc35f',
          500: '#D4AF37', // Gold
          600: '#aa8c2c',
          700: '#806924',
          800: '#55461f',
          900: '#2b231f',
          950: '#15110f',
        },
        success: {
          500: '#D4AF37', // Gold for consistency
        },
        warning: {
          500: '#D4AF37', // Gold for consistency
        },
        error: {
          500: '#dc2626',
        },
      },
      boxShadow: {
        'subtle': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
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
      },
    },
  },
  plugins: [],
};