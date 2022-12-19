/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: '/',
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    plugins: [

    ],
  },
  chainWebpack: (config) => {
    // config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    config.output.pathinfo = false;
    config.optimization.usedExports = true;
    config.optimization.sideEffects = true;
  },
};
