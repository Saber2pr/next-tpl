import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IAction } from '../store/IAction'
import { IState } from '../store/IState'
import { useRouterChange } from './useRouterChange'

export const useRestoreSiderScroll = (
  selectors: string
): [string[], (keys: string[]) => void] => {
  const ref = useRef<HTMLDivElement>()
  const dispatch = useDispatch()
  const siderScroll = useSelector<IState, number>(state => state?.siderScroll)
  const openKeys = useSelector<IState, string[]>(state => state?.siderOpenKeys)

  useEffect(() => {
    ref.current = document.querySelector(selectors)
  }, [])

  const setScroll = () => {
    if (ref.current) {
      ref.current.scrollTop = siderScroll
    }
  }
  const saveScroll = () => {
    if (ref.current) {
      dispatch<IAction<'siderScroll'>>({
        type: 'siderScroll',
        payload: ref.current.scrollTop,
      })
    }
  }

  useRouterChange(
    {
      start: () => saveScroll(),
      end: () => setScroll(),
      error: () => setScroll(),
    },
    []
  )

  const pustOpenKeys = (keys: string[]) =>
    dispatch<IAction<'siderOpenKeys'>>({
      type: 'siderOpenKeys',
      payload: keys,
    })

  return [openKeys, pustOpenKeys]
}
