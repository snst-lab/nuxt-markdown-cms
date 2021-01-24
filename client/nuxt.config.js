import path from 'path';
import dotenv from 'dotenv'
import minifyTheme from 'minify-css-string'

dotenv.config({
    path: path.resolve(process.cwd(),`.env.${process.env.NODE_ENV}`)
});

export default {
  env: process.env,
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Basic Auth
  basic: {
    name:  process.env.BASIC_AUTH_USER,
    pass:  process.env.BASIC_AUTH_PASS,
    enabled:  process.env.BASIC_AUTH_PASS !== '',
    // match: /(.*)admin(.*)/
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja'
    },
    title: process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { hid: "robots", name: "robots", content: "noindex" },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no, email=no, address=no' },
      { hid: 'description', name: 'description', content: process.env.APP_DESCRIPTION },
      { hid: 'keywords', name: 'keywords', content: ''},
      { hid: 'og:site_name', property: 'og:site_name', content: process.env.APP_NAME },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: process.env.CLIENT_URL },
      { hid: 'og:title', property: 'og:title', content: process.env.APP_NAME },
      { hid: 'og:description', property: 'og:description', content: process.env.APP_DESCRIPTION },
      { hid: 'og:image', property: 'og:image', content: '' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { hid: 'canonical', rel: 'canonical', href: process.env.CLIENT_URL },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script :[
      { src: 'https://polyfill.io/v3/polyfill.min.js?features=es5%2Ces6%2Ces7', body: false },
    ],
    __dangerouslyDisableSanitizers: ['title','meta'],
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GA_TRACKING_ID
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/refController", ssr: true },
    { src: "~/plugins/routerOption", ssr: true },
    { src: '~/plugins/dayjs', ssr: true },
    { src: '~/plugins/string', ssr: true },
    { src: '~/plugins/jsonld', ssr: true },
    { src: "~/plugins/nuxtClientInit", ssr: false },
    { src: "~/plugins/userAgent", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/style-resources',
    '@nuxtjs/vuetify',
    'vue-scrollto/nuxt',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    'nuxt-basic-auth-module',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    cache: false,
  }, 

  babel: {
    presets(env, [ preset, options ]) {
      return [
        [ "@nuxt/babel-preset-app", options ]
      ]
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  serverMiddleware: [],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      fileName: 'icon.png',
    },
    manifest: {
      name: process.env.APP_NAME,
      lang: 'ja',
      short_name: process.env.APP_NAME,
      title: process.env.APP_NAME,
      'og:title': process.env.APP_NAME,
      description: process.env.APP_DESCRIPTION,
      'og:description': process.env.APP_DESCRIPTION,
      theme_color: '#00aacc',
      background_color: '#ffffff',
    },
    workbox: {
      dev: false, // enable pwa on development mode
      runtimeCaching: [
        {
          urlPattern: 'https://polyfill.io/.*',
          handler: 'cacheFirst'
        },
        {
          urlPattern: '^https://fonts.(?:googleapis|gstatic).com/(.*)',
          handler: 'cacheFirst'
        },
        {
          urlPattern: 'https://cdn.jsdelivr.net/.*',
          handler: 'cacheFirst'
        },
        {
          urlPattern:  process.env.BASE_DIR || '/' + '.*',
          handler: 'staleWhileRevalidate',
          strategyOptions: {
            cacheName: 'my-cache',
            cacheExpiration: {
              maxAgeSeconds: 24 * 60 * 60 * 30
            }
          }
        }
      ]
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/global/index',
  ],
  styleResources: {
    scss: [
      '@/assets/css/resource/*.scss',
    ]
  },
  vuetify:{
    theme: {
      options: {
          cspNonce: Math.random().toString(32).substring(2),
          variations: false,
          minifyTheme,
      },
    },
    breakpoint: {
        thresholds: {
            xs: 600,
            sm: 960,
            md: 1264,
            lg: 1904,
        },
        scrollBarWidth: 24,
    },
  },
}
