/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FDFCFB',
          100: '#FBF9F5',
          200: '#F5F1EB',
          300: '#EBE5DC',
          400: '#DDD5C8',
          500: '#C5B9A5',
        },
        earth: {
          950: '#111714',
          900: '#1A211D',
          800: '#28332D',
          700: '#3A4941',
          600: '#4F6157',
          500: '#687D71',
        },
        sage: {
          DEFAULT: '#34493D',
          dark: '#24332B',
          light: '#476253',
          subtle: '#EDF2EE',
        },
        ochre: {
          DEFAULT: '#91795D',
          light: '#A68D70',
          subtle: '#F8F4EE',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(26, 33, 29, 0.04)',
        'float': '0 20px 40px -15px rgba(26, 33, 29, 0.08)',
      }
    },
  },
  plugins: [],
}
