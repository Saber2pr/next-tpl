import { NextApiRequest, NextApiResponse } from 'next'

import { createPureRequest } from '../../../api/request'
import { KEYS } from '../../../utils/constants'
import { createError } from '../../../utils/createError'
import { ptbk } from '../../../utils/ptbk'
import getConfig from 'next/config'

const { webhook_dingtalk } = getConfig().serverRuntimeConfig

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const request = createPureRequest({
      baseURL: '',
    })
    const data = req.body.data
    const apiRes = await request.post(webhook_dingtalk, {
      msgtype: 'text',
      text: ptbk.decode(data),
    })
    res.end(JSON.stringify(apiRes?.data))
  } catch (error) {
    res.end(JSON.stringify({ [KEYS.error]: createError(error) }))
  }
}
