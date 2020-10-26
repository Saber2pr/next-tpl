import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

/**
 * 接收ajax请求，request:root
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiRes = await axios({
      url: req.url,
      method: req.method as any,
      data: req.body,
      headers: req.headers,
    })
    const { data } = apiRes

    res.end(JSON.stringify(data))
  } catch (error) {
    res.end(JSON.stringify(error))
  }
}
