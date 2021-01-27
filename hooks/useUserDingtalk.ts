import { useCallback } from 'react'

import { Dingtalk } from '../api/dingtalk'
import { useSelectState } from './useSelectState'

export const useUserDingtalkFn = () => {
  // user应从store中获取(useSelector)
  const user = useSelectState('userInfo') as any
  const send = useCallback(
    (message: string) => {
      const nickName = user?.nickName ?? '游客用户'
      const notes = user?.role?.notes ?? '-'
      Dingtalk.sendMessage(`用户[${nickName}, ${notes}]: ${message}`)
    },
    [user]
  )
  return send
}
