import './style.less'

import { MainLayout } from '../common/main-layout'
import { IndexText } from '../modules/index/index-text'
import { withAxios } from '../plugin/withAxios'
import { withPage } from '../plugin/withPage'

type Props = {}

export const getServerSideProps = withAxios<Props>(async ({ get }, ctx) => {
  return {}
})

export default withPage<Props>(props => {
  return (
    <MainLayout className="PageIndex" title="首页">
      <IndexText>首页</IndexText>
    </MainLayout>
  )
})
