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
