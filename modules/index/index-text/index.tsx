import './style.less'

import React from 'react'

export interface IndexText {
  children: string
}

export const IndexText = ({ children }: IndexText) => {
  return <div className="IndexText">{children}</div>
}
