/* eslint-disable camelcase */
/**
 * 删除指定文章
 */
const mysql = require('../../database/mysql')
const debug = require('debug')('blog-server:delete-article')

module.exports = async (ctx) => {
  if (ctx.session && ctx.session.userName && ctx.session.loginName) {
    const { article_id } = ctx.request.body
    try {
      await mysql.deleteArticle(article_id)
      ctx.state.data = {
        msg: '删除文章成功'
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          msg: '数据库连接错误, 删除文章失败'
        }
      }
      debug(`删除文章失败: ${e.toString()}`)
    }
  } else {
    ctx.state = {
      code: -1,
      data: {
        msg: '未登录'
      }
    }
  }
}
