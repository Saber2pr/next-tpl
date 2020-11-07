import { getHost } from '../utils'
import { KEYS } from '../utils/constants'
import { createError, unWrapError } from '../utils/createError'
import { toQueryStr } from '../utils/toQueryStr'
import { ApiConfig } from './apiConfig'
import { getMetadata, rewriteUrl, setMetadata } from './utils'

import type {
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
      let optionalParams = [reqUrl]
      if (duration) {
        optionalParams = optionalParams.concat(`[duration]: ${duration}ms`)
        setMetadata(res.data, 'duration', duration)
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
  console.log('[error]:', error?.request?.res?.responseUrl ?? String(error))
  return {
    data: {
      [KEYS.error]: createError(error),
    },
  }
}

/**
 * 如果baseUrl设置了/v1，请求时可以带/v2前缀
 * api version control
 */
const REG_VER = /^\/v(\d)\//
export const extendVersion: ReqOnFulfilledInterceptor = req => {
  const url = req?.url
  if (url && REG_VER.test(url)) {
    const version = url.match(REG_VER)?.[1]
    if (version) {
      if (/\/v\d$/.test(req.baseURL)) {
        req.baseURL = req.baseURL.replace(/\/v\d$/, `/v${version}`)
        req.url = url.replace(/^\/v\d\//, '/')
      }
    }
  }
  return req
}
