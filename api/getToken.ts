import { KEYS } from '../utils/constants'

export const getToken = () => {
  return localStorage.getItem(KEYS.token)
}

export const saveToken = () => {
  return localStorage.getItem(KEYS.token)
}

export const getHeaderAuth = (headers: any) => {
  return headers?.[KEYS.authKey] ?? headers?.[KEYS.authKey.toLowerCase()]
}

export const setHeaderAuth = (headers: any, token: string) => {
  if (headers) {
    headers[KEYS.authKey] = token
  }
  return headers
}
