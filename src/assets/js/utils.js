import Cookies from 'js-cookie'
import MD5 from 'md5.js'

const isLogin = new MD5().update('gyjYYwc.1993').digest('hex') === Cookies.get('TOKEN')

const throttle = function (fn, threshhold) {
  let lastTime, throttleTimer
  lastTime = +new Date()
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

const hasClass = function (el, clsName) {
  const reg = new RegExp('(^|\\s)' + clsName.trim() + '(\\s|$)')
  return reg.test(el.className)
}

const addClass = function (el, clsName) {
  const spaceReg = new RegExp('^\\s+$')
  if (!clsName.match(spaceReg) && !hasClass(el, clsName)) {
    el.className += ' ' + clsName.trim()
  }
}

const removeClass = function (el, clsName) {
  const spaceReg = new RegExp('^\\s+$')
  if (!clsName.match(spaceReg) && hasClass(el, clsName)) {
    const reg = new RegExp('(\\s|^)' + clsName.trim() + '(\\s|$)')
    el.className = el.className.replace(reg, ' ').trim()
  }
}

const toggleClass = function (el, clsName) {
  clsName = clsName.trim()
  if (hasClass(el, clsName)) {
    removeClass(el, clsName)
  } else {
    addClass(el, clsName)
  }
}

const removeElementFromArray = function (array, element) {
  let _array = [...array]
  let index = -1
  for (let i in _array) {
    if (_array[i] === element) {
      index = i
    }
  }
  if (index !== -1) {
    _array.splice(index, 1)
  }
  return _array
}

export {
  isLogin,
  throttle,
  debounce,
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  removeElementFromArray
}
