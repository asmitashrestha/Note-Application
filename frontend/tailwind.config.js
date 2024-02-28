/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'note-1':"url('./src/assets/note1.jpg')",
        'note-2':"url('./src/assets/note2.jpg')",
        'note-3':"url('./src/assets/note3.jpg')"
      }
    },
  },
  plugins: [],
}