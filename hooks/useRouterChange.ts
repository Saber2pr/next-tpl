import { MittEmitter } from 'next/dist/next-server/lib/mitt'
import { Router } from 'next/router'
import { DependencyList, useEffect } from 'react'

type Handler = Parameters<MittEmitter['on']>[1]
export type RouterChangeOptions = {
  start?: Handler
  end?: Handler
  error?: Handler
}

export const useRouterChange = (
  { start, end, error }: RouterChangeOptions,
  deps?: DependencyList
) => {
  useEffect(() => {
    if (start) {
      Router.events.on('routeChangeStart', start)
    }
    if (end) {
      Router.events.on('routeChangeComplete', end)
    }
    if (error) {
      Router.events.on('routeChangeError', error)
    }

    return () => {
      if (start) {
        Router.events.off('routeChangeStart', start)
      }
      if (end) {
        Router.events.off('routeChangeComplete', end)
      }
      if (error) {
        Router.events.off('routeChangeError', error)
      }
    }
  }, deps)
}
