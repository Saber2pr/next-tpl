import './style.less'

import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { withAxios, withPage } from '../plugin'
import { IAction, IState } from '../store'

type Props = {
  data: Array<{ id: number; value: number }>
}

export const getServerSideProps = withAxios<Props>(async ({ get }, ctx) => {
  return {
    data: [
      {
        id: 1,
        value: 1,
      },
      {
        id: 2,
        value: 2,
      },
      {
        id: 3,
        value: 3,
      },
    ],
  }
})

export default withPage<Props>(props => {
  const dataSource = useSelector<IState, IState['data']>(state => state?.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<IAction<'data'>>({ type: 'data', payload: props?.data })
  }, [props])

  const columns: ColumnsType<Props['data'][0]> = [
    {
      title: '序号',
      width: 80,
      align: 'center',
      render: (item, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '值',
      align: 'left',
      render: (item, record, index) => <span>{record?.value}</span>,
    },
    {
      title: '操作',
      align: 'left',
      render: (item, record, index) => (
        <Button
          onClick={() => {
            const current = dataSource[index]
            current.value++
            dispatch<IAction<'data'>>({
              type: 'data',
              payload: dataSource.slice(),
            })
          }}
        >
          增加
        </Button>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      rowKey={record => record?.id}
      dataSource={dataSource}
      pagination={{
        position: ['bottomCenter'],
        pageSize: 5,
        hideOnSinglePage: true,
      }}
      locale={{ emptyText: <div>无数据</div> }}
    />
  )
})
