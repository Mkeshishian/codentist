/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef3ff',
          100: '#dae5ff',
          200: '#b9ccff',
          300: '#8aa7ff',
          400: '#5a7dff',
          500: '#3a5cff',
          600: '#2c49f0',
          700: '#2639c8',
          800: '#2232a0',
          900: '#1f2e80',
        },
        ink: {
          900: '#0f1629',
          800: '#1b2439',
          700: '#2a3450',
          600: '#475069',
          500: '#6b7389',
          400: '#8b92a5',
          300: '#b0b6c4',
          200: '#d6d9e0',
          100: '#ebedf1',
          50: '#f5f6f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 22, 41, 0.04), 0 1px 3px rgba(15, 22, 41, 0.05)',
        pop: '0 10px 30px rgba(15, 22, 41, 0.12)',
      },
    },
  },
  plugins: [],
}
