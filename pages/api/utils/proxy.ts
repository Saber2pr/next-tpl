import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { parse } from 'url'

import { getOrigin } from '../../../api/utils'
import { KEYS } from '../../../utils/constants'
import { createError } from '../../../utils/createError'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

/**
 * > 用于客户端请求的反向代理
 * requestAPi /utils/proxy?url=https://xxx.com
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = req.query?.url as string
  const method = req.method as any
  const body = req.body
  const headers = (req.headers ?? {}) as any

  headers.host = parse(url).host

  try {
    const apiRes = await axios({
      url,
      data: body,
      method: method,
      headers,
    })

    res.writeHead(200, {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': getOrigin(),
    })

    res.end(JSON.stringify(apiRes.data))
  } catch (error) {
    res.end(JSON.stringify({ [KEYS.error]: createError(error) }))
  }
}
