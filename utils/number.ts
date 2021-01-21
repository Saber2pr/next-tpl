import { isNullOrUndefined } from './is'

const WAN = 10000
const YI = 100000000

/**
 * 保留size位小数
 * 超过省略，不超过不处理
 * 1.0334 -> 1.03
 * 1.0 -> 1.0
 */
export const parseFixed = (val: number, size = 2) => {
  if (isNullOrUndefined(val) || Number.isNaN(val)) {
    return '-'
  }

  /**
   * 判断小数点后位数
   */
  const after = String(val).split('.')[1] || ''
  const afterLength = after.length
  const isOver = afterLength > size

  return isOver ? Number(val).toFixed(size) : String(val)
}

/**
 * 单位化
 */
export const parseUnit = (val: number, prefix = ''): string => {
  if (isNullOrUndefined(val) || Number.isNaN(val)) {
    return '-'
  }

  if (val < 0) {
    prefix += '-'
  }

  val = Math.abs(val)

  const hasWan = val >= WAN

  // 小于1万的没有单位
  if (!hasWan) {
    return prefix + parseFixed(val)
  }

  const hasYI = val >= YI
  if (hasYI) {
    // 大于等于1亿
    const valByYI = val / YI
    const valByYIFixed = parseFixed(valByYI)
    const resultNum = valByYIFixed
    const suffix = '亿'
    return prefix + resultNum + suffix
  } else {
    // 小于1亿大于等于1w
    const valByWan = val / WAN
    /**
     * 保留size位小数
     */
    const valByWanFixed = parseFixed(valByWan)

    const resultNum = valByWanFixed
    const suffix = 'w'

    return prefix + resultNum + suffix
  }
}

/**
 * 数字逗号分割
 */
export const parseNumberSplit = (val: number | string, split = ',') => {
  const reg = /\.\d+/
  const num = (val || 0).toString()
  const temp = reg.exec(num)
  const decimal = temp && temp[0] ? temp[0] : ''
  const decimalPointIndex = temp && temp.index ? temp.index : num.length
  let integerNum = num.slice(0, decimalPointIndex)
  let result = ''
  while (integerNum.length > 3) {
    result = split + integerNum.slice(-3) + result
    integerNum = integerNum.slice(0, integerNum.length - 3)
  }
  if (integerNum) {
    result = integerNum + result
  }
  result = result + decimal
  return result
}
