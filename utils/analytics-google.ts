// @ts-nocheck
export const registerAnalyticsGoogle = () => {
  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())

  gtag('config', 'UA-XXX')
}
