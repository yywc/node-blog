/**
 * 新增文章
 */
const mysql = require('../../database/mysql')
const debug = require('debug')('blog-server:add-article')

module.exports = async (ctx) => {
  if (ctx.user) {
    const { article } = ctx.request.body
    try {
      await mysql.addArticle(article)
      ctx.state.data = {
        msg: '新增文章成功'
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          msg: '数据库连接错误, 新增文章失败'
        }
      }
      debug(`新增文章失败: ${e.toString()}`)
    }
  } else {
    ctx.state = {
      code: -1,
      data: {
        msg: '新增失败,请先登录或重新登录'
      }
    }
  }
}
