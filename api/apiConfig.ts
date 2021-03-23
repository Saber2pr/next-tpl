import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const isBrowser = () => typeof window !== 'undefined'

const testLog = () => {
  // if (
  //   publicRuntimeConfig.env === 'development' ||
  //   publicRuntimeConfig.env === 'testing'
  // ) {
  //   return true
  // }
  if (isBrowser()) {
    return localStorage.getItem('__DEV__') === 'saber2pr'
  }
  return true
}

// @ts-expect-error
publicRuntimeConfig.log = testLog()

export const ApiConfig = publicRuntimeConfig
