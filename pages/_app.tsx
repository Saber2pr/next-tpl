import { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { useStore } from '../store'

const ComponentWrapper = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default function App(AppProps: AppProps) {
  const store = useStore(AppProps?.pageProps?.initialReduxState)
  return (
    <Provider store={store}>
      <ComponentWrapper {...AppProps} />
    </Provider>
  )
}
