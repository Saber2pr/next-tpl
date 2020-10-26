import { GetServerSidePropsResult } from 'next'
import axios from 'axios'

import createAxiosMonad from '@saber2pr/next-with-axios'

/**
 * 服务端页面初始化请求，request:root
 */
export const AxiosMonad = createAxiosMonad(async (handler, ctx) => {
  const result: GetServerSidePropsResult<any> = {
    props: {},
  }

  try {
    result.props = await handler(axios, ctx)
  } catch (error) {
    result.props = error
  } finally {
    return result
  }
})

export const withAxios = AxiosMonad
