import { useEffect } from 'react'

export function withPage<T>(Component: React.FC<T>): React.FC<T> {
  return props => {
    useEffect(() => {
      console.log(props)
    }, [])
    return <Component {...props} />
  }
}
