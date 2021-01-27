import { NextApiRequest, NextApiResponse } from 'next'

import { getHeaderAuth } from '../../api/getToken'
import { getOrigin } from '../../api/utils'
import { KEYS } from '../../utils/constants'
import { createError } from '../../utils/createError'
import { ptbk } from '../../utils/ptbk'
import { timeout } from '../../utils/timeout'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

/**
 * 捕获所有路由
 * > 用于客户端请求的反向代理
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let data = [1, 2, 3]
    const authorization = getHeaderAuth(req.headers)
    if (authorization) {
      data = [1, 2, 3, 4, 5, 6]
    }

    res.writeHead(200, {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': getOrigin(),
    })

    await timeout(2000)
    const result = ptbk.encode(data)

    res.end(JSON.stringify(result))
  } catch (error) {
    res.end(JSON.stringify({ [KEYS.error]: createError(error) }))
  }
}
