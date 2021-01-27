import getConfig from 'next/config'

import { LS_KEY } from '../utils/constants'
import { isBrowser } from '../utils/is'
import { ApiConfig } from './apiConfig'

const { publicRuntimeConfig } = getConfig()

export const rewriteUrl = (
  url: string,
  prefix: string = ApiConfig.proxyApi
) => {
  return url.replace(new RegExp(`^${prefix}`), '')
}

export const testLog = () => {
  if (isBrowser()) {
    return localStorage.getItem(LS_KEY.LOG) === 'saber2pr'
  }
  return true
}

export const isDev = () => publicRuntimeConfig?.env?.NODE_ENV === 'development'
export const isTest = () => publicRuntimeConfig?.env?.NODE_ENV === 'testing'
export const isProd = () => publicRuntimeConfig?.env?.NODE_ENV === 'production'

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

/**
 * cors
 */
export const getOrigin = () => {
  if (isDev()) {
    return '*'
  }
  if (isTest()) {
    return '*'
  }
  if (isProd()) {
    return '*.xxx.com'
  }
}
