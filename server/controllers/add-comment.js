/**
 * 新增评论
 */
const mysql = require('../database/mysql')
const getIp = require('ipware')().get_ip
const debug = require('debug')('blog-server:add-comment')

module.exports = async (ctx) => {
  if (ctx.session && ctx.session.userName && ctx.session.loginName) {
    debug(`已登录`)
  } else {
    const comment = ctx.request.body
    const ipAddress = getIp(ctx.request).clientIp.split(':')[3]
    let result = await mysql.searchUser(ipAddress)
    let userId = -1
    if (result.length === 0) {
      await mysql.addUser(comment.nickname, comment.contact, ipAddress)
      result = await mysql.searchUser(ipAddress)
      userId = result[0].uid
    } else {
      userId = result[0].uid
    }
    comment.userId = userId
    try {
      await mysql.addComment(comment)
      ctx.state.data = {
        msg: '评论成功'
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          msg: '数据库连接错误, 新增评论失败'
        }
      }
      debug(`新增评论失败: ${e.toString()}`)
    }
  }
}
