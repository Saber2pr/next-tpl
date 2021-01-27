import Button from 'antd/lib/button'
import Message from 'antd/lib/message'

import { ApiConfig } from '../api/apiConfig'
import { ApiError } from '../api/type'

export const Messager = {
  error(error: ApiError) {
    console.error(error)
    if (ApiConfig.log) {
      const { status, statusText, data } = error
      const message = data?.message || data?.error || data
      if (typeof message === 'string') {
        Message.error(
          <div>
            <div>错误: {status}</div>
            {statusText && <div>{statusText}</div>}
            {message && (
              <div
                dangerouslySetInnerHTML={{
                  __html: message,
                }}
              ></div>
            )}
            <br />
            <Button onClick={() => Message.destroy()}>关闭</Button>
          </div>,
          0
        )
      }
    }
  },
}
