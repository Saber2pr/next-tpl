import './style.less'

import { MainLayout } from '../../common/main-layout'
import { withPage } from '../../plugin/withPage'
import { disableAutomaticStaticOptimization } from '../../utils/next'

type Props = {}

export const getServerSideProps = disableAutomaticStaticOptimization

export default withPage<Props>(props => {
  return (
    <MainLayout className="PageParas" title="文章">
      文章
    </MainLayout>
  )
})
