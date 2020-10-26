const withCss = require('@zeit/next-css')
const withPluginAntd = require('./next-plugin-antd')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const isProd = process.env.NODE_ENV === 'production'
const webpack = require('webpack')

const config = {
  publicRuntimeConfig: {
    env: {
      NODE_ENV: process.env['NODE_ENV'],
    },
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    importLoaders: 1,
    modifyVars: {
      'primary-color': '#673ae2',
      'border-color-base': '#673ae27a',
      'box-shadow-base': '0 0 0 2px rgba(230, 130, 255, 0.2)',
    },
  },
  webpack: config => {
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
      new webpack.IgnorePlugin(/\.\/locale/, /moment/)
    )
    return config
  },
  assetPrefix: isProd ? 'cdn' : '',
}

module.exports = withPluginAntd(withCss(config))
