import { ApiConfig } from '../api/apiConfig'

export const resolveImgSrc = (src: string, cdn = false) => {
  if (cdn) {
    return `${ApiConfig.static}img/${src}`
  }
  if (src) {
    if (/^\/static\//.test(src)) {
      src = src.replace(/^\/static\//, ApiConfig.static)
    }
  }
  return src
}
