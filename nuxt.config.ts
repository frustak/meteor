// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        ['@nuxtjs/google-fonts', { 'Noto Sans': [100, 200, 300, 400, 500, 600, 700, 800, 900] }],
        '@nuxtjs/tailwindcss',
    ],
    devtools: { enabled: true },
    build: { transpile: ['gsap'] },
})
