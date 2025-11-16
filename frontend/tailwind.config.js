/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          pink: '#ec4899',
          rose: '#f43f5e', 
          gold: '#f59e0b',
          cream: '#fff7ed',
          red: '#dc2626'
        }
      },
      fontFamily: {
        'dancing': ['Dancing Script', 'cursive'],
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'romantic-pattern': "url('https://images.pexels.com/photos/3693905/pexels-photo-3693905.jpeg')",
        'love-hero': "url('https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
      }
    },
  },
  plugins: [],
}