// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@vueuse/nuxt'
  ],

  devtools: {
    enabled: true
  },

  runtimeConfig: {
    // Private keys are only available on the server
    sifalopayApiKey: process.env.SIFALOPAY_API_KEY,
    sifalopayUsername: process.env.SIFALOPAY_USERNAME,
    // Public keys that are exposed to the client (if any, not needed here)
    public: {}
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/api/**': {
      cors: true
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
