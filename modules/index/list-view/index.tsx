import './style.less'

import { Spin } from 'antd'
import React, { CSSProperties } from 'react'

import { getArray } from '../../../utils/array'
import { getPrefixCls } from '../../../utils/getPrefixCls'

export interface ListViewProps {
  loading?: boolean
  data: number[]
  className?: string
  style?: CSSProperties
}

export const ListView = ({ loading, data, className, style }: ListViewProps) => {
  let content = <>暂无数据</>
  if (data) {
    content = (
      <ul>
        {getArray(data).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )
  }
  return (
    <div className={getPrefixCls('listView', className)} style={style}>
      <Spin spinning={loading}>{content}</Spin>
    </div>
  )
}
