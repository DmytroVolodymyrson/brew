export default defineNuxtConfig({
    modules: [
        'unplugin-icons/nuxt'
    ],
    css: ['~/assets/css/tailwind.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    typescript: {
        tsConfig: {
            compilerOptions: {
                types: ['unplugin-icons/types/vue'],
                include: ["types/**/*.d.ts"],
            },
        },
    },

})
