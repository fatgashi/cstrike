const glob = require('glob-all');
const path = require('path');

// ⛳ Use `.default` when importing the plugin later
const PurgeCSSPlugin = require('purgecss-webpack-plugin').default;

module.exports = () =>
  new PurgeCSSPlugin({
    paths: glob.sync([
      path.join(__dirname, './public/index.html'),
      path.join(__dirname, './src/**/*.vue'),
      path.join(__dirname, './src/**/*.js'),
    ]),
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
  });