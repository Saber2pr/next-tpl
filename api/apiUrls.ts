export const ApiUrls = {
  utils_proxy: '/utils/proxy',
}
export const resolveApiUrl = (apiUrl: string, params: object) =>
  apiUrl && apiUrl.replace(/\{(\w+)\}/g, (_, n) => params[n])
