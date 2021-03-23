const moment = require('moment')

const { NODE_ENV, API } = process.env

const isProd = NODE_ENV === 'production'

const apis = {
  development: {
    target: 'https://xxx.com/',
    allowOrigin: '*',
    domain: 'localhost',
  },
  production: {
    target: API,
    allowOrigin: '*.xxx.com',
    domain: '.xxx.com',
  },
  testing: {
    target: API,
    allowOrigin: '*',
    domain: '192.168.2.222',
  },
}[NODE_ENV]

/**
 * 公开
 */
const publicRuntimeConfig = {
  /**
   * 是否启用调试功能
   */
  log: true,
  /**
   * 更换origin，用于连接线上接口(只用于本地开发)
   */
  changeOrigin: true,
  /**
   * 反向代理api
   */
  proxyApi: '/api',
  /**
   * origin侧是否为^/api代理
   */
  useProxyOrigin: /\.xxx\.com/.test(apis.target),
  /**
   * 授权api
   */
  oauthApi: '/api/oauth',

  appId: 2,

  timeout: 1000 * 60,
  ...apis,
  static: '//cdn.xxx.com',

  publishTime: moment().format('YYYY-MM-DD HH:mm:ss'),
  dingtalkKey: 'xxx',

  blockDingtalk: !isProd,

  env: NODE_ENV,

  ...apis,
}

/**
 * 非公开私密
 */
const serverRuntimeConfig = {
  webhook_dingtalk: 'https://oapi.dingtalk.com/robot/send?access_token=xxx',
}

module.exports = {
  publicRuntimeConfig,
  serverRuntimeConfig,
}
