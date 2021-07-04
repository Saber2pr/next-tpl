declare module '*.less'

declare module 'scroll-doc' {
  export default Page as () => {
    /**
     * 兼容各浏览器的scrollTop
     */
    scrollTop: number
    clientHeight: number
  }
}

declare module 'next/config' {
  export default getConfig as () => {
    publicRuntimeConfig: Readonly<{
      log: boolean
      changeOrigin: boolean
      proxyApi: string
      useProxyOrigin: boolean
      oauthApi: string
      appId: number
      timeout: number
      target: string
      static: string
      oauth: string
      publishTime: string
      dingtalkKey: string
      blockDingtalk: boolean
      oauthWeb: string
      env: 'development' | 'production' | 'testing'
      allowOrigin: string
      domain: string
      enablePtbk: boolean
    }>
    serverRuntimeConfig: Readonly<{
      webhook_dingtalk: string
    }>
  }
}
