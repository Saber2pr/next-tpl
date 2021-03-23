import getConfig from 'next/config'

import { ApiConfig } from './apiConfig'

const { publicRuntimeConfig } = getConfig()

export const isDev = () => publicRuntimeConfig?.env === 'development'
export const isTest = () => publicRuntimeConfig?.env === 'testing'
export const isProd = () => publicRuntimeConfig?.env === 'production'

export const getOrigin = () => ApiConfig.allowOrigin
export const getDomain = () => ApiConfig.domain

export const rewriteUrl = (
  url: string,
  prefix: string = ApiConfig.proxyApi
) => {
  return url.replace(new RegExp(`^${prefix}`), '')
}

const META_KEY = '__$$metadata'
export const getMetadata = (resOrReq: any, key: string) => {
  let metadata = {}
  if (typeof resOrReq === 'object') {
    if ('config' in resOrReq) {
      metadata = resOrReq?.config?.[META_KEY]
    } else {
      metadata = resOrReq?.[META_KEY]
    }
    return metadata?.[key]
  }
}

export const setMetadata = (resOrReq: any, key: string, value: any) => {
  let metadata = {}
  if (typeof resOrReq === 'object') {
    if ('config' in resOrReq) {
      metadata = resOrReq?.config?.[META_KEY] ?? {}
    } else {
      metadata = resOrReq?.[META_KEY] ?? {}
    }
    metadata[key] = value
    resOrReq[META_KEY] = metadata
  }
}
