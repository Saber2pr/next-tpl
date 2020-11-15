import { NextApiRequest, NextApiResponse } from 'next'

import { createRequestRoot, getOrigin } from '../../api'
import { createError } from '../../utils'
import { KEYS } from '../../utils/constants'
import { ptbk } from '../../utils/ptbk'

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
  const requestRoot = createRequestRoot(req.headers)
  try {
    const apiRes = await requestRoot({
      url: req.url,
      method: req.method as any,
      data: req.body,
    })
    const { data } = apiRes

    res.writeHead(200, {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': getOrigin(),
    })

    const result = ptbk.encode(data)
    res.end(JSON.stringify(result))
  } catch (error) {
    res.end(JSON.stringify({ [KEYS.error]: createError(error) }))
  }
}
