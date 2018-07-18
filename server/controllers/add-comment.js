/**
 * 新增评论
 */
const mysql = require('../database/mysql')
const getIp = require('ipware')().get_ip
const debug = require('debug')('blog-server:add-comment')
const production = (process.env.NODE_ENV ? process.env.NODE_ENV : 'production') === 'production'

/**
 * comment 评论对象
 * ipAddress 评论用户的 ip 地址
 */
module.exports = async (ctx) => {
  if (ctx.user) {
    debug(`已登录`)
  } else {
    const comment = ctx.request.body
    const ipAddress = production ? getIp(ctx.request).clientIp : getIp(ctx.request).clientIp.split(':')[3]
    let result = await mysql.searchUser(ipAddress)
    let userId = -1
    let contact = ''
    let nickname = ''
    if (result.length === 0) {
      try {
        await mysql.addUser(comment.nickname, comment.contact, ipAddress)
        result = await mysql.searchUser(ipAddress)
        userId = result[0].uid
        contact = comment.nickname
        nickname = comment.contact
      } catch (e) {
        ctx.state = {
          code: -1,
          data: {
            msg: `获取普通用户失败: ${e.toString()}`
          }
        }
        debug(`获取普通用户失败: ${e.toString()}`)
      }
    } else {
      userId = result[0].uid
      contact = result[0].contact
      nickname = result[0].nickname
    }
    comment.userId = userId
    comment.contact = contact
    comment.nickname = nickname
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
