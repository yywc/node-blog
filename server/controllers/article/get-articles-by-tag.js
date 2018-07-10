/**
 * 根据标题内容模糊匹配文章
 */
const mysql = require('../../database/mysql')
const config = require('../../config/config')
const debug = require('debug')('blog-server:get-article-by-tag')

/**
 * p 页码
 * pc 每页显示条数
 * t 标签名
 */
module.exports = async (ctx) => {
  let { p, pc, t } = ctx.request.query
  p = p !== null && p !== undefined ? parseInt(p) : 1
  pc = pc !== null && pc !== undefined ? parseInt(pc) : config.PAGE_COUNT
  t = decodeURIComponent(t)
  try {
    const res = await mysql.getArticlesByTag(t, p, pc)
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
        msg: '数据库连接错误, 查看文章失败'
      }
    }
    debug(`查看文章失败: ${e.toString()}`)
  }
}
