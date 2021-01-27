import { GetServerSidePropsResult } from 'next'

import createAxiosMonad from '@saber2pr/next-with-axios'

import { createRequestRoot } from '../api/request'
import { KEYS } from '../utils/constants'
import { createError } from '../utils/createError'
import { ptbk } from '../utils/ptbk'
import { withRedirect } from './withRedirect'

export const AxiosMonad = createAxiosMonad(async (handler, ctx) => {
  const reqHeaders = ctx?.req?.headers
  const requestRoot = createRequestRoot(reqHeaders)

  const result: GetServerSidePropsResult<any> = {
    props: {},
  }

  try {
    // 服务端HTTP Exception统一捕获
    result.props = await handler(requestRoot, ctx)
  } catch (error) {
    result.props[KEYS.error] = createError(error)
  } finally {
    result.props = ptbk.encode(result.props)
    return result
  }
})

export const withAxios = withRedirect(AxiosMonad)
