import Cookie from 'cookie'

import { KEYS } from '../utils/constants'

// //
// cookie方案已废弃。参考：https://saber2pr.top/#/blog/Nextjs%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/ssr%E9%A1%B9%E7%9B%AE%E6%9E%B6%E6%9E%84%E6%B3%A8%E6%84%8F%E4%B8%8E%E4%BC%98%E5%8C%96
// 在前端携带auth-token，代理端透传headers。
// //

export const getToken = (cookie: string, key: string = KEYS.token) => {
  if (!cookie) return ''
  const cookies = Cookie.parse(cookie)
  return cookies[key]
}

interface Request {
  url?: string
  headers?: any
}

/**
 * 从cookie中取token放到auth
 * 兼容服务端和客户端
 */
export const resolveToken = <T extends Request>(req: T) => {
  const reqHeaders = req.headers
  if (reqHeaders) {
    // 接口调用从cookie中取token放到auth
    const cookie = reqHeaders['cookie'] ?? reqHeaders['Cookie']
    const token = getToken(cookie)
    if (token) {
      // reqHeaders.Authorization = `Bearer ${token}`
    }
  }
  return req
}
