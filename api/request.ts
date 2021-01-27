import axios, { AxiosRequestConfig } from 'axios'

import { getHost } from '../utils/url'
import { ApiConfig } from './apiConfig'
import {
  autoWithClientToken,
  calcRequestTimeEnd,
  calcRequestTimeStart,
  decodeApiPtbk,
  handleError,
  printResData,
  printResUrlTime,
  reThrowError,
  rewriteApiUrl,
  setClientErrorMessage,
} from './interceptors'

const JSONbigString = require('json-bigint')({ storeAsString: true })
import type { OutgoingHttpHeaders } from 'http'

// nextjs不支持BigInt,需要这里转换为string
const HTMLTAG = /^\</
axios.defaults.transformResponse = [
  text => {
    // java报错会返回html
    if (HTMLTAG.test(text)) {
      return text
    } else {
      return JSONbigString.parse(text)
    }
  },
]

/**
 * 用于客户端请求(Ajax)使用的axios实例
 * > 请求proxy
 */
const requestApiConfig: AxiosRequestConfig = {
  baseURL: ApiConfig.proxyApi,
  timeout: ApiConfig.timeout,
  withCredentials: true,
}

const requestApi = axios.create(requestApiConfig)

// 自动携带token
requestApi.interceptors.request.use(autoWithClientToken)
// 开始计算请求时间
requestApi.interceptors.request.use(calcRequestTimeStart)

// 结束计算请求时间
requestApi.interceptors.response.use(calcRequestTimeEnd)
// api解密
requestApi.interceptors.response.use(decodeApiPtbk)
// 打印请求url
requestApi.interceptors.response.use(printResUrlTime)
// 打印返回值信息
requestApi.interceptors.response.use(printResData)
// 提示错误
requestApi.interceptors.response.use(
  setClientErrorMessage,
  setClientErrorMessage
)
// 抛出被服务端吞掉的错误
requestApi.interceptors.response.use(reThrowError)

/**
 * 工厂函数
 * 用于服务端请求使用的axios实例
 * 代理服务端无状态,所以使用函数式,保证每个请求都是新的实例
 */
const createRequestRoot = (headers?: OutgoingHttpHeaders) => {
  let baseURL = ApiConfig.target
  if (ApiConfig.changeOrigin) {
    headers.host = getHost(ApiConfig.target)
    if (ApiConfig.useProxyOrigin) {
      baseURL += ApiConfig.proxyApi
    }
  }
  const requestRoot = axios.create({
    baseURL,
    timeout: ApiConfig.timeout,
    headers,
  })

  // 转发到target前，去除^/api前缀
  requestRoot.interceptors.request.use(rewriteApiUrl)
  // 开始计算请求时间
  requestRoot.interceptors.request.use(calcRequestTimeStart)

  // 结束计算请求时间
  requestRoot.interceptors.response.use(calcRequestTimeEnd)
  // api解密
  requestRoot.interceptors.response.use(decodeApiPtbk)
  // 打印请求url， 捕获异常
  requestRoot.interceptors.response.use(printResUrlTime, handleError)

  return requestRoot
}

const createPureRequest = (config?: AxiosRequestConfig) => {
  const request = axios.create(config)

  request.interceptors.request.use(calcRequestTimeStart)
  request.interceptors.request.use(rewriteApiUrl)

  request.interceptors.response.use(calcRequestTimeEnd)
  request.interceptors.response.use(printResUrlTime, handleError)

  return request
}

export { requestApi, createRequestRoot, createPureRequest }
