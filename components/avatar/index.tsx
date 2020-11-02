import './style.less'

import AntdAvatar, { AvatarProps } from 'antd/lib/avatar'
import React, { useEffect, useState } from 'react'

import { resolveImgSrc } from '../../utils/resolveImgSrc'

export interface Avatar extends AvatarProps {
  pendingSrc?: Promise<string>
}

export const Avatar = ({ src, pendingSrc, ...props }: Avatar) => {
  const [display, setDisplay] = useState(src)

  useEffect(() => {
    setDisplay(src)
  }, [src])

  useEffect(() => {
    if (pendingSrc) {
      pendingSrc.then(setDisplay)
    }
  }, [pendingSrc])

  return <AntdAvatar {...props} src={resolveImgSrc(display)} />
}
