import { message } from 'antd'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

/**
 * 同构渲染的数据请求方法
 * 用法参考：https://saber2pr.top/#/blog/Nextjs%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93/ssr%E9%A1%B9%E7%9B%AE%E6%9E%B6%E6%9E%84%E6%B3%A8%E6%84%8F%E4%B8%8E%E4%BC%98%E5%8C%96
 * @param request axios请求方法
 * @param initData 初始占位数据, 默认null
 * @param autoLoad 是否自动请求一次, 默认true
 */
export const useFetch = <T>(
  request: () => Promise<AxiosResponse<T>>,
  initData: T = null,
  autoLoad = true
): [T, boolean, () => Promise<void>] => {
  const [result, setResult] = useState<T>(initData)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const apiRes = await request()
      setResult(apiRes.data)
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
