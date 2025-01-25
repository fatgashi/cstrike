module.exports = {
    configureWebpack: {
      output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
      },
    },
};