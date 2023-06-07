export default defineNuxtConfig({
  modules: ['unplugin-icons/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
