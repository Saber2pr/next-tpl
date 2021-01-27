import './style.less'

import { MainLayout } from '../../common/main-layout'
import { withAxios } from '../../plugin/withAxios'
import { withPage } from '../../plugin/withPage'

type Props = {}

export const getServerSideProps = withAxios<Props>(async ({ get }, ctx) => {
  return {}
})

export default withPage<Props>(props => {
  return (
    <MainLayout className="PageParas" title="文章">
      文章
    </MainLayout>
  )
})
