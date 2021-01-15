import Cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

import { getDomain } from '../../../api/utils'
import { getToken } from '../../../api/getToken'
import { createError } from '../../../utils/createError'
import { KEYS } from '../../../utils/constants'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

/**
 * 登出
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const key = (req.query?.key ?? KEYS.token) as string
    const domain = (req.query?.domain ?? getDomain()) as string

    const cookie = req.headers?.cookie ?? ''
    const token = getToken(cookie, key) || ''

    // 删除cookie maxAge=0
    res.writeHead(200, {
      'Set-Cookie': Cookie.serialize(key, token, {
        maxAge: 0,
        path: '/',
        domain,
      }),
    })
    res.end()
  } catch (error) {
    res.end(JSON.stringify({ [KEYS.error]: createError(error) }))
  }
}
