export type IState = Readonly<{
  layout: 'col' | 'row'
}>

export const initState: IState = {
  layout: 'row',
}
