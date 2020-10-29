export const getHost = (url: string) => {
  const urlMatched = url.match(/https?:\/\/([^/]+)\//i)
  let domain = ''
  if (url && urlMatched[1]) {
    domain = urlMatched[1]
  }
  return domain
}
