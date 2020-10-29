import getConfig from 'next/config'

import { testLog } from './utils'

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
  changeOrigin: false,
  /**
   * node代理
   */
  proxyApi: '/api',
  /**
   * 接口超时时间
   */
  timeout: 1000 * 60,
  // 后缀带 /
  static: 'cdn.com/',
  ...apis,
} as const
