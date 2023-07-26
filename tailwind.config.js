/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'j-blue': '#7988F9',
        'j-yellow': '#fEE900',
        'light-white': '#E1E1E7',
        'dark-gray': '#606060',
        },
    },
  },
  plugins: [],
}
