export const toQueryStr = (obj: any) => {
  if (obj) {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key]
      }
    }
    return new URLSearchParams(obj).toString()
  } else {
    return ''
  }
}
