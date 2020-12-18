import { ptbk } from '../utils/ptbk'
import { ApiConfig } from './apiConfig'
import { ApiUrls } from './apiUrls'
import { requestApi } from './request'

export namespace Dingtalk {
  export const sendMessage = (content: string) => {
    if (ApiConfig.blockDingtalk) {
      return
    }
    requestApi.post(ApiUrls.dingtalkSendMessage, {
      data: ptbk.encode({
        content: `${ApiConfig.dingtalkKey} ${content}`,
      }),
    })
  }
}
