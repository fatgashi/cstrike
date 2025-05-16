const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

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
