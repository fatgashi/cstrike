const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const createPurgeCSSPlugin = require('./purgecss.config');

module.exports = defineConfig({
  configureWebpack() {
    const plugins = [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      })
    ];

    if (process.env.NODE_ENV === 'production') {
      plugins.push(createPurgeCSSPlugin());
    }

    return { plugins };
  }
});
