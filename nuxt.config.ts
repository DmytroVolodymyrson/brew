export default defineNuxtConfig({
  modules: ['unplugin-icons/nuxt'],
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
