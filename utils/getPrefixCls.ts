import classnames from 'classnames'
import { ClassValue } from 'classnames/types'

const CommonPrefixCls = 'nextpl'

export const getPrefixCls = (suffixCls?: string, ...classes: ClassValue[]) => {
  const currentCls = suffixCls
    ? `${CommonPrefixCls}-${suffixCls}`
    : CommonPrefixCls
  return classnames(currentCls, ...classes)
}
