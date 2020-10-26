export type IState = Readonly<{
  data: Array<{ id: number; value: number }>
}>

export const initState: IState = {
  data: [],
}
