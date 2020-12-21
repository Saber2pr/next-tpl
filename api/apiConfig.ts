import getConfig from 'next/config'

import { testLog, isProd } from './utils'

const { publicRuntimeConfig } = getConfig()

type APIS = {
  target: string
}

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
   * node代理
   */
  proxyApi: '/api',
  /**
   * origin侧是否为^/api代理
   */
  useProxyOrigin: /xxx\.xxx\.xxx/.test(apis.target),
  /**
   * 接口超时时间
   */
  timeout: 1000 * 60,
  // 后缀带 /
  static: 'cdn.com/',

  dingtalk: 'https://oapi.dingtalk.com/robot/send?access_token=xx',
  dingtalkKey: 'dingtalkKey',
  blockDingtalk: !isProd(),

  ...apis,
} as const
