import Ptbk from '@saber2pr/ptbk'

// 如果被破解，请更改以下加密方法
export const ptbk = Ptbk.create(
  ([pri, pub]) => {
    return pri + pub
  },
  ptbk => {
    const m = ptbk.length / 2
    return [ptbk.slice(0, m), ptbk.slice(m)]
  }
)
