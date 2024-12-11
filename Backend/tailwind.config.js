export default {
  content: ["./views/**/*.ejs", "./public/**/*.js"], // Ensure this includes all relevant files
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        'xsm': '488px', // Define the custom breakpoint correctly as a min-width
      },
    },
  },
  plugins: [],
};
