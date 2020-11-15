import Ptbk from '@saber2pr/ptbk'

export const ptbk = Ptbk.create(
  ([pri, pub]) => {
    return 'yes' + pri + pub
  },
  ptbk => {
    ptbk = ptbk.slice(3)
    const m = ptbk.length / 2
    return [ptbk.slice(0, m), ptbk.slice(m)]
  }
)
