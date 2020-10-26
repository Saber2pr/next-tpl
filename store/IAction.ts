import { IState } from './IState'

export type IAction<K extends keyof IState = keyof IState> = {
  type: K
  payload: IState[K]
}
