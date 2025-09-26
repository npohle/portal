/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['PT Sans', 'sans-serif'],
      },
      colors: {
        'azure-blue': '#2980B9',
        'azure-blue-dark': '#1f5f8b',
        'text-primary': '#393939',
        'text-secondary': '#555555',
        'text-muted': '#858585',
        'border-light': '#e1e1e1',
        'background-light': '#fbfbfb',
        'error-red': '#e74c3c',
        'success-green': '#27ae60',
      },
    },
  },
  plugins: [],
}
