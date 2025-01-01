/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide: {
          // from: { transform: 'translateX(0)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        slide: 'slide 5s ease-in-out',
      },
    },
  },
  plugins: [],
};