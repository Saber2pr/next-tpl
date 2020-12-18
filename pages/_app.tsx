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
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { ApiConfig, requestApi } from '../api'
import { useRouterChange } from '../hooks'
import { useUserDingtalkFn } from '../hooks/useUserDingtalk'
import { useStore } from '../store'
import { printLogo, registerAnalyticsGoogle } from '../utils'

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
    registerAnalyticsGoogle()
    printLogo()

    if (ApiConfig.log) {
      window['__store'] = store
      window['__config'] = ApiConfig
      window['__requestApi'] = requestApi

      return store.subscribe(() => {
        console.log('[store]', store.getState())
      })
    }
  }, [])

  return (
    <Provider store={store}>
      <ComponentWrapper {...AppProps} />
    </Provider>
  )
}
