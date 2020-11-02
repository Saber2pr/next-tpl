import './style.less'

import { MainLayout } from '../common'
import { IndexText } from '../modules/index'
import { withAxios, withPage } from '../plugin'

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
