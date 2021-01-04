import './style.less'

import React, { useState } from 'react'
import useInterval from 'react-use/lib/useInterval'

export interface TimeBtn {
  onClick: (start: Function) => void
  time?: number
}

export const TimeBtn = ({ onClick, time = 60 }: TimeBtn) => {
  const [text, setText] = useState('获取验证码')
  const [state, setState] = useState(time)
  const [isRunning, toggleIsRunning] = useState(false)
  useInterval(
    () => {
      if (state > 0) {
        setState(state - 1)
      } else {
        setState(time)
        setText('重新发送')
        toggleIsRunning(false)
      }
    },
    isRunning ? 1000 : null
  )

  return (
    <button
      disabled={isRunning}
      onClick={() => {
        onClick(() => toggleIsRunning(true))
      }}
      className="TimeBtn"
      style={{
        cursor: isRunning ? 'not-allowed' : 'pointer',
      }}
    >
      {isRunning ? (
        <span
          style={{
            color: '#BBB6C8',
          }}
        >
          {state}
        </span>
      ) : (
        text
      )}
    </button>
  )
}
