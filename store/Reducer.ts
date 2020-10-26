import type { Reducer } from 'redux'
import type { IAction } from './IAction'
import type { IState } from './IState'

export const reducer: Reducer<IState, IAction> = (
  state,
  { type, payload }
) => ({ ...state, [type]: payload })
