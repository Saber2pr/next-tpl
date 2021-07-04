import { AxiosResponse } from 'axios'
import { appendParams } from '../utils/addLink'
import { join } from '../utils/path'
import { ApiUrls } from './apiUrls'
import { requestApi } from './request'

export interface RequestProxyOptions {
  baseUrl?: string
  url: string
  params?: object
  method?: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch'
  data?: any
}

export const requestProxy = async <T>({
  baseUrl,
  url,
  params,
  method = 'get',
  data,
}: RequestProxyOptions): Promise<AxiosResponse<T>> => {
  const path = baseUrl ? join(baseUrl, url) : url
  return requestApi({
    method,
    data,
    url: ApiUrls.utils_proxy,
    params: {
      url: params ? appendParams(path, params) : path,
    },
  })
}
