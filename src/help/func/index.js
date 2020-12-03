import dayjs from 'dayjs'

function dateAppendZero (obj) {
  if (obj < 10) {
    return '0' + '' + obj
  }
  return obj
}

/**
 * 获取查询的开始和结束时间
 * @param daterange
 * @returns {string[]}
 */
export function getDateDaterange (daterange) {
  dayjs()
  const start = daterange[0].getFullYear() + '-' + dateAppendZero(daterange[0].getMonth() + 1) + '-' + dateAppendZero(daterange[0].getDate()) + ' 00:00:00'
  const end = daterange[1].getFullYear() + '-' + dateAppendZero(daterange[1].getMonth() + 1) + '-' + dateAppendZero(daterange[1].getDate()) + ' 23:59:59'
  return [start, end]
}

export function isPhone (str) {
  const reg = /^1[3456789]d{9}$/
  return reg.test(str.trim())
}
