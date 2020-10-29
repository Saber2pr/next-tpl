export const deepGet = (obj: object, key: string) => {
  if (key in obj) {
    return obj[key]
  } else {
    for (const k in obj) {
      if (Object.prototype.toString.call(obj[k]) === '[object Object]') {
        const result = deepGet(obj[k], key)
        if (result) {
          return result
        }
      }
    }
  }
}
