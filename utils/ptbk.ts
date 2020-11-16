import Ptbk from '@saber2pr/ptbk'

// 如果被破解，请更改以下加密方法
export const ptbk = Ptbk.create(
  ([pri, pub]) => {
    const boundary_prefix = pri.slice(pri.length - 3)
    return boundary_prefix + pri + pub
  },
  ptbk => {
    ptbk = ptbk.slice(3)
    const m = ptbk.length / 2
    return [ptbk.slice(0, m), ptbk.slice(m)]
  }
)
