/**
 * 文章翻页接口
 */
const mysql = require('../database/mysql')
const debug = require('debug')('blog-server:turn-page')

module.exports = async (ctx) => {
  let { id, d } = ctx.request.query
  try {
    const res = await mysql.pageTurning(id, d)
    ctx.state.data = res[1]
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: '数据库连接错误, 文章翻页失败'
      }
    }
    debug(`文章翻页失败: ${e.toString()}`)
  }
}
