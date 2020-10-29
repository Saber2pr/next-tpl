import { useEffect } from 'react'

import { ApiConfig } from '../api'
import { deepGet, KEYS, Messager } from '../utils'

/**
 * 拦截所有页面的props
 */
export function withPage<T>(Component: React.FC<T>): React.FC<T> {
  return props => {
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
