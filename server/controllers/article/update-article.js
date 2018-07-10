/**
 * 更新某一篇文章
 */
const mysql = require('../../database/mysql')
const debug = require('debug')('blog-server:update-article')

module.exports = async (ctx) => {
  if (ctx.user) {
    const { article } = ctx.request.body
    try {
      await mysql.updateArticle(article)
      ctx.state.data = {
        msg: '文章修改成功'
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          msg: '数据库连接错误, 更新文章失败'
        }
      }
      debug(`更新文章失败: ${e.toString()}`)
    }
  } else {
    ctx.state = {
      code: -1,
      data: {
        msg: '更新文章失败,请先登录或重新登录'
      }
    }
  }
}
