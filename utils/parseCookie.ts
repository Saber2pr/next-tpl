import Cookie from 'cookie'

export const parseCookie = (cookie: string) => {
  if (!cookie) return null
  return Cookie.parse(cookie)
}

export const stringifyCookie = (
  name: string,
  value: string,
  options?: Cookie.CookieSerializeOptions
) => {
  Cookie.serialize(name, value, options)
}
