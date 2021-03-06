export default {
  // 关闭每次run dev的时候的选择
  telemetry: false,
  server: {
    port: 8081
  },
  env: {
    API_ENV: process.env.API_ENV
  },
  srcDir: "src/",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "布雷博",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: ["ant-design-vue/dist/antd.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "~/plugins/vue-inject.js", // 注入vue实例的全局属性
    "~/plugins/ctx-inject.js", // 注入ctx-asyncData使用的全局属性
    "~/plugins/combined-inject.js", // 同时注入ctx-asyncData和Vue实例的全局属性
    "~/plugins/antd-ui.js",
    "~/plugins/apollo.js"
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@nuxtjs/style-resources"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "nuxt-ssr-cache",
    "@nuxtjs/proxy",
    ['cookie-universal-nuxt']
  ],

  styleResources: {
    less: ["./src/common/less/index.less"]
  },

  serverMiddleware: [],
  cache: {
    // if you're serving multiple host names (with differing
    // results) from the same server, set this option to true.
    // (cache keys will be prefixed by your host name)
    // if your server is behind a reverse-proxy, please use
    // express or whatever else that uses 'X-Forwarded-Host'
    // header field to provide req.hostname (actual host name)
    useHostPrefix: false,
    pages: [
      // these are prefixes of pages that need to be cached
      // if you want to cache all pages, just include '/'
      "/",

      // you can also pass a regular expression to test a path
      /^\/page3\/\d+$/,

      // to cache only root route, use a regular expression
      /^\/$/
    ],
    key (route, context) {
      // custom function to return cache key, when used previous
      // properties (useHostPrefix, pages) are ignored. return
      // falsy value to bypass the cache
    },

    store: {
      type: "memory",

      // maximum number of pages to store in memory
      // if limit is reached, least recently used page
      // is removed.
      max: 100,

      // number of seconds to store this page in cache
      ttl: 60
    }
  },
  proxy: ["http://brembo-backend-uat.cloud.bz/graphql"],
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extend (config, { isClient }) {
      config.module.rules.push({
        enforce: "pre",
        test: /(\.graphql)|(\.gql)$/,
        use: ["graphql-tag/loader"]
      })
      config.resolve.extensions.push(".gql")
    }
  }
}
