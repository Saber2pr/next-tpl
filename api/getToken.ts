import Cookie from 'cookie'

import { KEYS } from '../utils/constants'

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
