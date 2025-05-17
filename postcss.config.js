const purgecssPlugin = require('@fullhuman/postcss-purgecss').default;

module.exports = {
  plugins: [
    require('autoprefixer'),
    purgecssPlugin({
      content: ['./public/index.html', './src/**/*.vue', './src/**/*.js'],
      safelist: {
        standard: [
          // Bootstrap dropdown
          'dropdown-menu',
          'dropdown-menu-end',
          'dropdown-menu-dark',
          'dropdown-toggle',
          'dropdown-item',
          'dropdown-header',
          'dropdown-divider',
          'show',
          'btn-group',
          'shadow',
          'shadow-lg',
          'text-end',
          'text-start',
          'text-white',
          'text-muted',
          'visually-hidden',
          'd-block',
          'd-flex',
          'align-items-center',
          'justify-content-between',
        ],
        deep: [/dropdown/, /show/, /btn/, /shadow/, /text-/],
      },
      defaultExtractor: content => content.match(/[\w-/:]+/g) || [],
    }),
  ],
};
