/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      colors: {
        paper: '#F4F4F0',
        ink: '#0A0A0A',
        accent: '#FF3B30',
      },
      animation: {
        'fade-1': 'fade 12s infinite 0s',
        'fade-2': 'fade 12s infinite 4s',
        'fade-3': 'fade 12s infinite 8s',
      },
      keyframes: {
        fade: {
          '0%, 25%': { opacity: '0.6' },
          '33%, 92%': { opacity: '0' },
          '100%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
