import { KEYS } from '../utils/constants'

export const getToken = () => {
  return localStorage.getItem(KEYS.token)
}

export const saveToken = () => {
  return localStorage.getItem(KEYS.token)
}
