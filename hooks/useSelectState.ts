import { useSelector } from 'react-redux'

import { IState } from '../store'

export const useSelectState = <K extends keyof IState = keyof IState>(k: K) =>
  useSelector<IState, IState[K]>(state => state[k])
