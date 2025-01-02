/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          from: { scale:"0" },
          to: { scale: '1' },
        },
      },
      animation: {
        slide: 'slide .2s ease-in-out',
      },
    },
  },
  plugins: [],
};