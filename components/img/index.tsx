import React from 'react'

import { resolveImgSrc } from '../../utils/resolveImgSrc'

export interface ImgProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  /**
   * 未放到cdn时可以使用本地static
   */
  devForImg?: boolean
  cdn?: boolean
}

/**
 * 为方便后期图片资源懒加载、转移cdn等,所以使用封装后的Img
 */
export const Img = ({
  src = '',
  devForImg = false,
  cdn = false,
  ...props
}: ImgProps) => {
  return <img {...props} src={devForImg ? src : resolveImgSrc(src, cdn)} />
}
