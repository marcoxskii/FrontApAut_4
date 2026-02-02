/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1e3a8a', // dark blue
          lightBlue: '#3b82f6', // bright blue
          grey: '#64748b', // slate grey
          darkGrey: '#334155', // dark slate
          lightGrey: '#f1f5f9', // very light grey
        }
      }
    },
  },
  plugins: [],
}
