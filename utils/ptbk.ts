import Ptbk from '@saber2pr/ptbk'

import { ApiConfig } from '../api/apiConfig'

// 如果被破解，请更改以下加密方法
const ptbk = Ptbk.create(
  ([pri, pub]) => {
    return pri + pub
  },
  ptbk => {
    const m = ptbk.length / 2
    return [ptbk.slice(0, m), ptbk.slice(m)]
  }
)

ptbk.setEnable(ApiConfig.enablePtbk)

export { ptbk }
