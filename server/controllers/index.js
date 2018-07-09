const _ = require('lodash')
const fs = require('fs')
const path = require('path')

/**
 * 格式化 - _ 的文件名和文件为驼峰形式，方便调用
 */
const formatName = function (str, reg) {
  let newStr = ''
  if (str.match(reg)) {
    const fileArray = str.split(reg)
    fileArray.forEach((value, index) => {
      if (index === 0) {
        newStr = value
      } else {
        newStr += value.substr(0, 1).toUpperCase() + value.substr(1)
      }
    })
  } else {
    newStr = str
  }
  return newStr
}

/**
 * 映射 d 文件夹下的文件为模块
 */
const mapDir = d => {
  const tree = {}

  // 获得当前文件夹下的所有的文件夹和文件
  const [dirs, files] = _(fs.readdirSync(d))
    .partition(p => fs.statSync(path.join(d, p)).isDirectory())
  // 映射文件夹
  dirs.forEach(dir => {
    const newDir = formatName(dir, /[-_]/g)
    tree[newDir] = mapDir(path.join(d, dir))
  })

  // 映射文件
  files.forEach(file => {
    if (path.extname(file) === '.js') {
      const newFile = formatName(file, /[-_]/g)
      tree[path.basename(newFile, '.js')] = require(path.join(d, file))
    }
  })

  return tree
}

// 默认导出当前文件夹下的映射
module.exports = mapDir(path.join(__dirname))
