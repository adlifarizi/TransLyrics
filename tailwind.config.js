/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        maven: ['Maven Pro', 'sans-serif'],
      },
      fontSize: {
        xxs: ['10px', '14px'],
      },
      colors: {
        light: '#FFFFFF',
        dark: '#333333',

        'blue-100': '#DBE4FF',
        'blue-200': '#B6CAFF',
        'blue-300': '#92AFFF',
        'blue-400': '#6D95FF',
        'blue-500': '#497AFF',
        'blue-600': '#3A63D2',
        'blue-700': '#2C4DA6',
        'blue-800': '#1D3679',
        'blue-900': '#0F204D',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  variants: {
    extend: {
      textColor: ['hover'],
      backgroundColor: ['hover']
    },
  },
  plugins: [],
}

