export interface CtxLink {
  query: any
}

export const getCtxQuery = <T extends CtxLink = any>(ctx: T, name: string) =>
  decodeURIComponent((ctx?.query?.[name] ?? '') as string)

export const getArray = <T>(array: T[]) => (Array.isArray(array) ? array : [])
