const purgecssPlugin = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecssPlugin({
      content: ['./public/index.html', './src/**/*.vue', './src/**/*.js'],
      safelist: {
        standard: [
          /^fade/,
          /^show/,
          /^modal/,
          /^dropdown/,
          /^toast/,
          /^alert/,
        ],
      },
      defaultExtractor: content => content.match(/[\w-/:]+/g) || [],
    }),
  ],
};
