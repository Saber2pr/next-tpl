// antd
import 'antd/dist/antd.min.css'
// moment
import 'moment/locale/zh-cn'
import 'nprogress/nprogress.css'
// styles
import '../styles/utils.less'
import '../styles/global.less'
import '../styles/reset.less'

import { AppProps } from 'next/app'
import Head from 'next/head'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { ApiConfig } from '../api/apiConfig'
import { requestApi } from '../api/request'
import { useRouterChange } from '../hooks/useRouterChange'
import { useUserDingtalkFn } from '../hooks/useUserDingtalk'
import { useStore } from '../store'
import { printLogo } from '../utils/console'

const ComponentWrapper = ({ Component, pageProps }: AppProps) => {
  const send = useUserDingtalkFn()

  useRouterChange(
    {
      start: () => NProgress.start(),
      end: () => {
        NProgress.done()
        send(`正在浏览页面->${document.title}`)
      },
      error: () => NProgress.done(),
    },
    [send]
  )
  return <Component {...pageProps} />
}

export default function App(AppProps: AppProps) {
  const store = useStore(AppProps?.pageProps?.initialReduxState)

  useEffect(() => {
    // registerAnalyticsGoogle('UA-XXX')
    printLogo()

    NProgress.configure({
      minimum: 0.08,
      easing: 'linear',
      speed: 200,
      trickleSpeed: 200,
    })

    if (ApiConfig.log) {
      window['__store'] = store
      window['__config'] = ApiConfig
      window['__requestApi'] = requestApi
      window['__NProgress'] = NProgress
    }
  }, [])

  return (
    <Provider store={store}>
      <Head>
        {/* <link rel="dns-prefetch" href="//cdn.xxx.com" /> */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge, chrome=1" />
        {/* <link rel="icon" href="favicon.svg" type="image/x-icon" /> */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXX" ></script> */}
      </Head>
      <ComponentWrapper {...AppProps} />
    </Provider>
  )
}
