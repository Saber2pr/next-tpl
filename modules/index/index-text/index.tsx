import React from 'react'
import './style.less'

export interface IndexText {
  children: string
}

export const IndexText = ({ children }: IndexText) => {
  return <div className="IndexText">{children}</div>
}
