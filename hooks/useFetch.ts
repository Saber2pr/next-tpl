import { message } from 'antd'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

export const useFetch = <T>(
  request: () => Promise<AxiosResponse<T>>,
  autoLoad = true
): [T, boolean, () => Promise<void>] => {
  const [result, setResult] = useState<T>()
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)

      const res = await request()
      setResult(res.data)
    } catch (error) {
      console.log(error)
      message.error('获取数据失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    autoLoad && fetchData()
  }, [autoLoad])

  return [result, loading, fetchData]
}
