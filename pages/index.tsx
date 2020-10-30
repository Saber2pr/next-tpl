import './style.less'

import { withAxios, withPage } from '../plugin'
import { MainLayout } from '../common'

type Props = {}

export const getServerSideProps = withAxios<Props>(async ({ get }, ctx) => {
  return {}
})

export default withPage<Props>(props => {
  return (
    <MainLayout className="PageIndex" title="首页">
      首页
    </MainLayout>
  )
})
