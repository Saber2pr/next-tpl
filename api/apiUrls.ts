import { join } from '../utils/path'
import { ApiConfig } from './apiConfig'

export const ApiUrls = {
  // 工具api
  utils_proxy: '/utils/proxy',

  // 钉钉
  dingtalkSendMessage: '/dingtalk/sendMessage',

  // apis
  list: '/list',
}

export const resolveApiUrl = (apiUrl: string, params: object) =>
  apiUrl && apiUrl.replace(/\{(\w+)\}/g, (_, n) => params[n])

export const getAbsoluteUrl = (apiUrl: string) => join(ApiConfig.target, apiUrl)

export const getProxyUrl = (apiUrl: string) => join(ApiConfig.proxyApi, apiUrl)
