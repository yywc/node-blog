/**
 * 前端获取统计信息接口
 */
const mysql = require('../database/mysql')
const debug = require('debug')('blog-server:get-statistics')

module.exports = async (ctx) => {
  let categoryArr = []
  let tagArr = []
  let commentCount = 0
  try {
    const res = await mysql.getStatistics()
    const categoryResult = res[0]
    const tagResult = res[1]
    const commentResult = res[2]
    for (let category of categoryResult) {
      if (category.category !== null) {
        if (!categoryArr.includes(category.category)) {
          categoryArr.push(category.category)
        }
      }
    }
    for (let tags of tagResult) {
      if (tags.tag !== null) {
        for (let tag of tags.tag.split(',')) {
          if (!tagArr.includes(tag)) {
            tagArr.push(tag)
          }
        }
      }
    }
    for (let count of commentResult) {
      commentCount += count.comment_count
    }
    ctx.state.data = {
      categoryCount: categoryArr.length,
      tagCount: tagArr.length,
      commentCount: commentCount,
      articleCount: categoryResult.length
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: '数据库连接错误, 获取统计信息失败'
      }
    }
    debug(`获取统计信息失败: ${e.toString()}`)
  }
}
