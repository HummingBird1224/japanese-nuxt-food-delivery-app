export default {
  dev: process.env.NODE_ENV !== 'production',

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'kfc',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios-error-handler.js',
    '~/plugins/global-error-handler.js',
    '~/plugins/disable-right-click.js',
    '~/plugins/socketio-connection.js',
    '~/plugins/kfc-sound.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: {
  //   // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
  //   // baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/' : '/v1/',
  //   baseURL:
  //     process.env.NODE_ENV !== 'production'
  //       ? 'http://192.168.1.46/v1/'
  //       : '/v1/',
  // },
  axios: {
    baseURL:
      process.env.NODE_ENV !== 'production'
        ? 'https://pickup-admin.u-bo.jp//7SLvwonZidwQArB49ELGXpHa/v1/'
        : '/v1/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Disable loading bar.
  loading: false,
}
