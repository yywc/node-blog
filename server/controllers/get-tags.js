/**
 * 获取所有文章的分类
 */
const mysql = require('../database/mysql')
const debug = require('debug')('blog-server:get-tags')

module.exports = async (ctx) => {
  let resultArray = []
  try {
    const res = await mysql.getTags()
    for (let tags of res) {
      if (tags.tag !== null) {
        for (let tag of tags.tag.split(',')) {
          if (!resultArray.includes(tag)) {
            resultArray.push(tag)
          }
        }
      }
    }
    ctx.state.data = resultArray
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: '数据库连接错误, 获取文章标签失败'
      }
    }
    debug(`获取文章标签失败: ${e.toString()}`)
  }
}
