import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand': {
          50: '#e6f2f3',
          100: '#c7e2e5',
          200: '#a3d1d7',
          300: '#7fc1c9',
          400: '#5cb0ba',
          500: '#38a0ac',
          600: '#2e8e98',
          700: '#247d84',
          800: '#2E4E50',
          900: '#264a4c',
          950: '#1d3538'
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
