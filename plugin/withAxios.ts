import { GetServerSidePropsResult } from 'next'

import createAxiosMonad from '@saber2pr/next-with-axios'

import { createRequestRoot } from '../api'
import { createError } from '../utils'
import { KEYS } from '../utils/constants'
import { withRedirect } from './withRedirect'

export const AxiosMonad = createAxiosMonad(async (handler, ctx) => {
  const reqHeaders = ctx?.req?.headers
  const requestRoot = createRequestRoot(reqHeaders)

  const result: GetServerSidePropsResult<any> = {
    props: {},
  }

  try {
    result.props = await handler(requestRoot, ctx)
  } catch (error) {
    result.props[KEYS.error] = createError(error)
  } finally {
    return result
  }
})

export const withAxios = withRedirect(AxiosMonad)
