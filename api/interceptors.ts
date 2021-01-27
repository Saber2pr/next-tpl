import { KEYS } from '../utils/constants'
import { createError, unWrapError } from '../utils/createError'
import { getNowMon } from '../utils/date'
import { Messager } from '../utils/message'
import { ptbk } from '../utils/ptbk'
import { toQueryStr } from '../utils/toQueryStr'
import { getHost } from '../utils/url'
import { ApiConfig } from './apiConfig'
import { getToken } from './getToken'
import { getMetadata, rewriteUrl, setMetadata } from './utils'

import type {
  ApiError,
  ReqOnFulfilledInterceptor,
  ResOnFulfilledInterceptor,
} from './type'
/**
 * 输出调试信息
 */
export const printResUrlTime: ResOnFulfilledInterceptor = res => {
  if (ApiConfig.log) {
    const req = res.config
    if (req) {
      let reqUrl = req.baseURL + req.url
      if (req.params) {
        let queryUrl = toQueryStr(req.params)
        if (reqUrl.includes('?')) {
          queryUrl = '&' + queryUrl
        } else {
          queryUrl = '?' + queryUrl
        }
        reqUrl += queryUrl
      }

      if (typeof window === 'undefined') {
        reqUrl = rewriteUrl(reqUrl)
      }

      const duration = getMetadata(res, 'duration')
      let optionalParams = [getNowMon().format('YYYY-MM-DD HH:mm:ss'), reqUrl]
      if (duration) {
        optionalParams = optionalParams.concat(`[duration]: ${duration}ms`)
        setMetadata(res, 'duration', duration)
      }
      console.log(...optionalParams)
    }
  }
  return res
}

export const printResData: ResOnFulfilledInterceptor = res => {
  if (ApiConfig.log) {
    console.log(res)
  }
  return res
}

/**
 * 客户端重新抛出被服务端吞掉的错误
 */
export const reThrowError: ResOnFulfilledInterceptor = res => {
  const error = unWrapError(res?.data)
  if (error) {
    return Promise.reject(error)
  }
  return res
}

/**
 * 去掉代理用的 ^/api
 */
export const rewriteApiUrl: ReqOnFulfilledInterceptor = req => {
  req.url = rewriteUrl(req.url, ApiConfig.proxyApi)
  return req
}

/**
 * 客户端报错提示
 */
export const setClientErrorMessage: ResOnFulfilledInterceptor = res => {
  const error: ApiError = res.data[KEYS.error]
  if (error) {
    if (ApiConfig.log) {
      // 输出错误信息
      Messager.error(error)
    }
  }
  return res
}

/**
 * 计算接口请求时间
 */
export const calcRequestTimeStart: ReqOnFulfilledInterceptor = req => {
  if (ApiConfig.log) {
    setMetadata(req, 'startTime', new Date())
  }
  return req
}

/**
 * 计算接口请求时间
 */
export const calcRequestTimeEnd: ResOnFulfilledInterceptor = res => {
  if (ApiConfig.log) {
    const endTime = new Date()
    const startTime = getMetadata(res, 'startTime')
    setMetadata(res, 'duration', Number(endTime) - Number(startTime))
  }
  return res
}

/**
 * 转发时如果需要，代理验证host
 */
export const changeOrigin: ReqOnFulfilledInterceptor = req => {
  const headers = req.headers ?? {}
  headers.host = getHost(req.baseURL)
  req.headers = headers
  return req
}

/**
 * axios异常全局处理（服务端渲染）
 */
export const handleError = (error: any) => {
  console.log('[error]:', error?.message, error?.request?.res?.responseUrl)
  return {
    data: {
      [KEYS.error]: createError(error),
    },
  }
}

export const decodeApiPtbk: ResOnFulfilledInterceptor = res => {
  if (ptbk.isPtbk(res?.data)) {
    res.data = ptbk.decode(res?.data)
  }
  return res
}

/**
 * 客户端自动携带token
 */
export const autoWithClientToken: ReqOnFulfilledInterceptor = req => {
  const headers = req.headers
  if (headers) {
    const token = getToken()
    if (token) {
      headers[KEYS.authKey] = token
    }
  }
  return req
}

/**
 * 代理服务端如何发送token
 */
export const resolveServerToken: ReqOnFulfilledInterceptor = req => {
  const headers = req.headers
  if (headers) {
    const token = headers[KEYS.authKey]
    if (token) {
      // 例如放到cookie中
      // 不处理就是auth header
    }
  }
  return req
}
