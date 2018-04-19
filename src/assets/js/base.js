import Cookies from 'js-cookie'
import MD5 from 'md5.js'

const isLogin = new MD5().update('gyjYYwc.1993').digest('hex') === Cookies.get('TOKEN')

const throttle = function (fn, threshhold) {
  let lastTime, throttleTimer
  lastTime = +new Date() + 10000
  threshhold || (threshhold = 250)
  return function (...args) {
    const nowTime = +new Date()
    if (lastTime && nowTime < lastTime + threshhold) {
      clearTimeout(throttleTimer)
      // 保证在当前时间区间结束后，再执行一次 fn
      throttleTimer = setTimeout(() => {
        lastTime = nowTime
        fn.apply(this, args)
      }, threshhold)
      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      lastTime = nowTime
      fn.apply(this, args)
    }
  }
}

const debounce = function (fn, delay) {
  let debounceTimer
  return function (...args) {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    } else {
      debounceTimer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}

export {
  isLogin,
  throttle,
  debounce
}
