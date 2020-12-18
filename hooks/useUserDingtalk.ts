import { useCallback, useEffect } from 'react'

import { Dingtalk } from '../api/dingtalk'

export const useUserDingtalkFn = () => {
  // user应从store中获取(useSelector)
  const user = {
    nickName: '',
    role: {
      notes: '',
    },
  }
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

export const useUserDingtalk = (message: string) => {
  const send = useUserDingtalkFn()
  useEffect(() => {
    send(message)
  }, [message])
}
