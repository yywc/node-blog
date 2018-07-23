/**
 * 更新评论数量
 */
const mysql = require('../database/mysql')
const debug = require('debug')('blog-server:update-comment-count')

module.exports = async (ctx) => {
  const { articleId } = ctx.request.body
  try {
    await mysql.updateReadCount(articleId)
    ctx.state.data = {
      msg: '更新评论数量成功'
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: '数据库连接错误, 更新评论数量失败'
      }
    }
    debug(`更新评论数量失败: ${e.toString()}`)
  }
}
