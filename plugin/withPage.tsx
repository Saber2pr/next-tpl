import { useEffect } from 'react'

import { ApiConfig } from '../api/apiConfig'
import { KEYS } from '../utils/constants'
import { Messager } from '../utils/message'
import { deepGet } from '../utils/obj-op'
import { ptbk } from '../utils/ptbk'

/**
 * 拦截所有页面的props
 */
export function withPage<T>(Component: React.FC<T>): React.FC<T> {
  return props => {
    if (ptbk.isPtbk(props)) {
      props = ptbk.decode(props)
    }

    useEffect(() => {
      if (ApiConfig.log) {
        console.log(props)
        if (new RegExp(`\\${KEYS.error}`).test(JSON.stringify(props ?? {}))) {
          const error = deepGet(props, KEYS.error)
          if (error) {
            Messager.error(error)
          }
        }
      }
    }, [])
    return <Component {...props} />
  }
}
