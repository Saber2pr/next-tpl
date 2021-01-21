import { useEffect, useState } from 'react'

import { InputHistory } from '../utils/input-history'

export const useInputHistory = (
  key: string,
  defaultList = []
): [string[], (value: string) => void] => {
  const [list, setList] = useState<string[]>([])

  const setDisplayList = (list: string[]) => {
    if (list.length) {
      setList(list)
    } else {
      setList(defaultList)
    }
  }

  const initHistoryList = () => {
    const history = InputHistory.getList(key)
    if (history) {
      setDisplayList(history)
    }
  }

  useEffect(() => {
    initHistoryList()
  }, [key])

  const pushItem = (value: string) => {
    if (value) {
      InputHistory.pushItem(key, value)
      initHistoryList()
    }
  }

  return [list, pushItem]
}
