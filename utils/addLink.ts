import { toQueryStr } from './toQueryStr'

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
