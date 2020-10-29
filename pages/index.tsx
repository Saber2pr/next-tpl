import './style.less'

import { withAxios, withPage } from '../plugin'

type Props = {}

export const getServerSideProps = withAxios<Props>(async ({ get }, ctx) => {
  return {}
})

export default withPage<Props>(props => {
  return <div></div>
})
