import getConfig from 'next/config'

import { isProd, testLog } from './utils'

const { publicRuntimeConfig } = getConfig()

type APIS = {
  target: string
}

// api地址结尾不要带'/'
const apis: APIS = {
  development: {
    target: 'http://192.168.1.1',
  },
  production: {
    target: 'xxx.xxx.xxx',
  },
  testing: {
    target: 'xxx.xxx.xxx',
  },
}[publicRuntimeConfig.env.NODE_ENV]

export const ApiConfig = {
  /**
   * 启用调试
   */
  log: testLog(),
  /**
   * 跨域
   */
  changeOrigin: true,
  /**
   * node代理。next规定为/api
   */
  proxyApi: '/api',
  /**
   * origin侧是否为^/api代理.用来连接自己线上的代理
   */
  useProxyOrigin: /xxx\.xxx\.xxx/.test(apis.target),
  /**
   * 接口超时时间
   */
  timeout: 1000 * 60,
  // cdn
  static: 'cdn.xxx.com',

  dingtalk: 'https://oapi.dingtalk.com/robot/send?access_token=xx',
  dingtalkKey: 'dingtalkKey',
  blockDingtalk: !isProd(),

  /**
   * 启用接口加密
   */
  enablePtbk: false,

  ...apis,
} as const
