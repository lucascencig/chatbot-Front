
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Noto Serif NP Hmong', 'serif'],
        mono: ['Source Code Pro', 'monospace'],
      },
      boxShadow: {
        'custom': '0 1px 2px #4A90E2',
        'custom2': '0 2px 3px #4A90E2',
      },

    },
    backgroundImage: {
      'fondo': "url('./assets/fotoCinco.jpeg')",
      'footer-texture': "url('/img/footer-texture.png')",
    }

  },
  plugins: [

  ],
  fontFamily: {
    sans: ['Poppins', 'sans'],
    serif: ['Noto Serif NP Hmong', 'serif'],
    mono: ['Source Code Pro', 'monospace'],
  },

}
