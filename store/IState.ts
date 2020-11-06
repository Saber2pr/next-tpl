import { Menus } from '../common/main-layout-admin/menus'

export type IState = Readonly<{
  layout: 'col' | 'row'
  /**
   * 侧边栏scroll
   */
  siderScroll: number
  siderOpenKeys: string[]
}>

export const initState: IState = {
  layout: 'row',
  siderScroll: 0,
  siderOpenKeys: Menus.map(item => item?.href),
}
