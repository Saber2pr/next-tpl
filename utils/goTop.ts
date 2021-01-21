import Router from 'next/router'
import { tween } from 'popmotion'
import createPageRef from 'scroll-doc'

import * as easing from '@popmotion/easing'

export const pageRef = createPageRef()

export const goTop = (top = 0, cb?: Function) => {
  tween({ from: pageRef.scrollTop, to: top, ease: easing.easeInOut }).start(
    (v: number) => {
      pageRef.scrollTop = v
      if (v === 0) {
        cb && cb()
      }
    }
  )
}
export const goTopQuick = (top = 0) => {
  pageRef.scrollTop = top
}

export function getElementTop(elem: HTMLElement) {
  let elemTop = elem.offsetTop
  elem = elem.offsetParent as HTMLElement
  while (elem != null) {
    elemTop += elem.offsetTop
    elem = elem.offsetParent as HTMLElement
  }
  return elemTop
}

export const goElementTop = (elem: HTMLElement, cb?: Function) => {
  const eleTop = getElementTop(elem)
  goTop(eleTop, cb)
}

export const pushGoTop = (url: string) => {
  Router.push(url).then(() => goTopQuick())
}

export const pushReplace = async (url: string, cb?: Function) => {
  Router.replace(url).then(() => {
    cb && cb()
  })
}

export const pushReplaceTop = async (url: string, cb?: Function) => {
  pushReplace(url, () => {
    goTopQuick()
    cb && cb()
  })
}
