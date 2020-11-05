import './style.less'

import { useSelector } from 'react-redux'

import { MainLayout, MainLayoutAdmin } from '../../common'
import { withAxios, withPage } from '../../plugin'
import { IState } from '../../store'

type Props = {}

export const getServerSideProps = withAxios<Props>(async ({ get }, ctx) => {
  return {}
})

export default withPage<Props>(props => {
  const layout = useSelector<IState, IState['layout']>(state => state?.layout)
  switch (layout) {
    case 'col':
      return (
        <MainLayoutAdmin className="PageParas" title="文章">
          文章
        </MainLayoutAdmin>
      )
    case 'row':
      return (
        <MainLayout className="PageParas" title="文章">
          文章
        </MainLayout>
      )
    default:
      return <></>
  }
})
