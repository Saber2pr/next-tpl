const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const webpack = require('webpack')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const { NODE_ENV, API, ANALYZE } = process.env
const isProd = NODE_ENV === 'production'

const config = {
  publicRuntimeConfig: {
    env: {
      NODE_ENV,
      API,
    },
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    importLoaders: 1,
    // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
    modifyVars: {
      '@primary-color': '#FF2442',
    },
  },
  webpack: (config, { isServer }) => {
    // https://github.com/vercel/next.js/tree/canary/examples/with-ant-design-less
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]
      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    // plugins
    const plugins = [
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
      new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    ]
    if (ANALYZE) {
      plugins.push(new BundleAnalyzerPlugin())
    }
    config.plugins.push(...plugins)

    return config
  },
  assetPrefix: isProd ? 'cdn' : '',
}

module.exports = withLess(withCss(config))
