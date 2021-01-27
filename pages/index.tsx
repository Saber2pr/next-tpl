import './style.less'

import { ApiUrls } from '../api/apiUrls'
import { requestApi } from '../api/request'
import { MainLayout } from '../common/main-layout'
import { useFetch } from '../hooks/useFetch'
import { IndexText } from '../modules/index/index-text'
import { withAxios } from '../plugin/withAxios'
import { withPage } from '../plugin/withPage'
import { KEYS } from '../utils/constants'
import { ListView } from '../modules/index/list-view'

type Props = {
  initList: number[]
}

export const getServerSideProps = withAxios<Props>(async ({ get }, ctx) => {
  return {
    initList: [1, 2, 3],
  }
})

export default withPage<Props>(({ initList }) => {
  const [list, loadingList, refreshList] = useFetch(
    () =>
      requestApi.get(ApiUrls.list, {
        headers: {
          [KEYS.authKey]: 'test',
        },
      }),
    initList
  )
  return (
    <MainLayout className="PageIndex" title="首页">
      <IndexText>首页</IndexText>
      <ListView data={list} loading={loadingList} className="test" />
    </MainLayout>
  )
})
