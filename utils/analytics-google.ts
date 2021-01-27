// @ts-nocheck

/**
 * 谷歌分析加载
 * ```ts
 * // 示例
 * registerAnalyticsGoogle('UA-XXX')
 * ```
 */
export const registerAnalyticsGoogle = (id: string) => {
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', id)
}
