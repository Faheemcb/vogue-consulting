/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['Helvetica', 'Arial', 'sans-serif'], // Include Helvetica as the default sans-serif font
      },
    },
  },
  plugins: [],
};
