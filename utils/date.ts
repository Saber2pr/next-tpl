import moment from 'moment'

export const getNowMon = () => moment()
export const getNow = (format = 'YYYY-MM-DD HH:mm:ss') =>
  getNowMon().format(format)
