export const join = (base: string, path: string) => {
  if (base && path) {
    base = base.replace(/\/$/, '')
    path = path.replace(/^\//, '')
    return `${base}/${path}`
  }
  return base || path
}
