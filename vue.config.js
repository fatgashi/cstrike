const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      })
    ],
  },
  // Ensure sitemap.xml is copied to dist
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // Vue CLI automatically copies files from public/ to dist/, so sitemap.xml will be included
});