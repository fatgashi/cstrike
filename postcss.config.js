const purgecssPlugin = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecssPlugin({
      content: ['./public/index.html', './src/**/*.vue', './src/**/*.js'],
      safelist: {
        standard: [
          // ✅ Bootstrap dropdown + modal + toast classes
          /^fade/,
          /^show/,
          /^modal/,
          /^dropdown/,
          /^dropdown-menu/,
          /^dropdown-toggle/,
          /^dropdown-item/,
          /^dropdown-divider/,
          /^dropdown-header/,
          /^btn-group/,
          /^shadow/,
          /^shadow-lg/,
          /^text-end/,
          /^text-start/,
          /^text-white/,
          /^text-muted/,
          /^visually-hidden/,
          /^position/,
          /^d-block/,
          /^d-flex/,
          /^align-items-center/,
          /^justify-content-between/,
        ],
      },
      defaultExtractor: content => content.match(/[\w-/:]+/g) || [],
    }),
  ],
};
