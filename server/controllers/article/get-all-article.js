/**
 * 分页获取所有文章
 */
const mysql = require('../../database/mysql')
const config = require('../../config/config')
const debug = require('debug')('blog-server:get-all-article')

module.exports = async (ctx) => {
  let { p, pc, c } = ctx.request.query
  p = p !== null && p !== undefined ? parseInt(p) : 1
  pc = pc !== null && pc !== undefined ? parseInt(pc) : config.PAGE_COUNT
  c = c !== null && c !== undefined ? parseInt(c) : 0
  try {
    const res = await mysql.getAllArticle(p, pc, c)
    ctx.state.data = {
      data: res[1],
      totalCount: res[0][0]['COUNT(`article_id`)'],
      currentPage: p,
      pageCount: pc
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: '数据库连接错误, 获取所有文章失败'
      }
    }
    debug(`获取所有文章失败: ${e.toString()}`)
  }
}
