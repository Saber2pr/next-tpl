import { User } from '../api/interface'

export type IState = Readonly<{
  /**
   * 用户登录信息
   */
  userInfo: User
}>

export const initState: IState = {
  userInfo: null,
}
