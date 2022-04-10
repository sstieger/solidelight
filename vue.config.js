/* eslint-disable @typescript-eslint/no-var-requires */

const { defineConfig } = require('@vue/cli-service');
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new LicenseWebpackPlugin({
        perChunkOutput: false,
      }),
    ],
  },
  pwa: {
    name: 'Solidelight',
    themeColor: '#333333',
    appleMobileWebAppCapable: true,
    appleMobileWebAppStatusBarStyle: 'black',
  },
});
