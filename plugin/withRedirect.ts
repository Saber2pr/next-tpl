import { fmap } from '@saber2pr/next-with-axios'

export const withRedirect = fmap(withAxios => (handler, ctx) => {
  const reqHeaders = ctx?.req?.headers
  const agent = reqHeaders?.['user-agent']

  // if (agent && isMobAgent(agent)) {
  //   ctx.res.writeHead(302, {
  //     Location: '//m.xxx.com',
  //   })
  //   ctx.res.end()
  // }

  return withAxios(handler)(ctx)
})
