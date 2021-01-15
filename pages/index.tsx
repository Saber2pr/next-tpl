import './style.less'

import { Select } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { MainLayout } from '../common/main-layout'
import { MainLayoutAdmin } from '../common/main-layout-admin'
import { IndexText } from '../modules/index/index-text'
import { withPage } from '../plugin/withPage'
import { withAxios } from '../plugin/withAxios'
import { IAction, IState } from '../store'

type Props = {}

export const getServerSideProps = withAxios<Props>(async ({ get }, ctx) => {
  return {}
})

export default withPage<Props>(props => {
  const layout = useSelector<IState, IState['layout']>(state => state?.layout)
  const dispatch = useDispatch()

  const Content = () => (
    <Select
      defaultValue={layout}
      onSelect={value =>
        dispatch<IAction<'layout'>>({ type: 'layout', payload: value as any })
      }
    >
      <Select.Option value="col">后台管理</Select.Option>
      <Select.Option value="row">前台展示</Select.Option>
    </Select>
  )

  switch (layout) {
    case 'col':
      return (
        <MainLayoutAdmin className="PageIndex" title="首页">
          <IndexText>首页</IndexText>
          <Content />
        </MainLayoutAdmin>
      )
    case 'row':
      return (
        <MainLayout className="PageIndex" title="首页">
          <IndexText>首页</IndexText>
          <Content />
        </MainLayout>
      )
    default:
      return <></>
  }
})
