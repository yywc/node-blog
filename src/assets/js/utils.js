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
  let index = _array.findIndex((value) => {
    return value.trim() === element.trim()
  })
  if (index !== -1) {
    _array.splice(index, 1)
  }
  return _array
}
const _vendor = (function () {
  const eleStyle = document.createElement('div').style
  // 以 transform 为例子，只是用来判断加前缀，并不是只支持这一个属性。
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (eleStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

const prefixStyle = function (style) {
  if (_vendor) {
    if (_vendor === 'standard') {
      return style
    }
    return _vendor + style.charAt(0).toUpperCase() + style.substr(1)
  }
}

export {
  throttle,
  debounce,
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  removeElementFromArray,
  prefixStyle
}
