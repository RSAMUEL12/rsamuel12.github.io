export default {
  modules: ['@nuxt/content'],
  buildModules: [
    '@nuxt/postcss8',
    // ...
  ],
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  css: ['@/assets/css/main.css'],
  target: 'static',
};
