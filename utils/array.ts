/**
 * 将数组等分割
 */
export const splitArray = <T>(array: T[], interval = 4) => {
  const result: T[][] = []
  let temp: T[] = []
  for (const item of array) {
    temp.push(item)
    if (temp.length === interval) {
      result.push(temp)
      temp = []
    }
  }
  if (temp.length) {
    result.push(temp)
  }

  return result
}

export const getArray = <T>(array: T[]) => (Array.isArray(array) ? array : [])

/**
 * 对象数组去重
 */
export const dedup = <T>(array: T[], compare: (a: T, b: T) => boolean) =>
  array.reduce(
    (acc, item) => (acc.find(i => compare(i, item)) ? acc : acc.concat(item)),
    []
  )
