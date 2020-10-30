import './style.less'

import { withAxios, withPage } from '../../plugin'
import { MainLayout } from '../../common'

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
