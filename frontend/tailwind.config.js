/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding:{
        DEFAULT: '1rem',
      }
    },
    extend: {
      colors: {
        // green variants 
        'clr-primary-100': '#003C3C',
        'clr-primary-200': '#005555',
        'clr-primary-300': '#008888',
        'clr-primary-400': '#00C571',
        // black
        'text-clr-primary-100': '#282C31',
        // white
        'text-clr-secondary-100': '#cccccc',
        'text-clr-secondary-200': '#B5B5B5',
        'text-clr-secondary-300': '#F2F2F2',
        'text-clr-secondary-400': '#F2F2F2',
        'text-clr-secondary-500': '#F5F5F5',
        'text-clr-secondary-600': '#FFFFFF'
      }
    },
  },
  plugins: [],
}
