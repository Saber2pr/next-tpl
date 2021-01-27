import { toQueryStr } from './toQueryStr'

/**
 * url添加参数方法
 * ```ts
 * // 示例
 * appendParams('/user', { id: 1, name: null })
 * // 输出 /user?id=1
 * ```
 */
export const appendParams = (url: string, params?: object) => {
  if (url && params) {
    if (url.indexOf('?') !== -1) {
      return `${url}&${toQueryStr(params)}`
    } else {
      return `${url}?${toQueryStr(params)}`
    }
  }
  return url
}
