const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const debug = require('debug')('blog-server:check-token')
const config = require('../config/config')
const mysql = require('../database/mysql')

/**
 * 检查是否登录
 */
module.exports = async (ctx, next) => {
  const token = ctx.cookies.get('token') // 获取jwt
  if (token) {
    try {
      const tokenPayload = await verify(token, config.JWT_SECRET) // 解密payload，获取用户名和ID
      const uid = tokenPayload.uid
      const nickname = tokenPayload.nickname
      const res = await mysql.checkLogin(uid, nickname)
      if (res.length > 0) {
        ctx.user = true
      }
    } catch (err) {
      debug(`token verify fail: ${err}`)
    }
  }

  // 调用下一个中间件
  await next()
}
