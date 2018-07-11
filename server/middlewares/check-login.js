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
  let tokenPayload
  let sessionIdPayload
  try {
    const token = ctx.cookies.get('token') // 获取jwt
    const sessionId = ctx.cookies.get('sessionId') // 获取jwt
    let sUid
    let sNickname
    if (sessionId) {
      sessionIdPayload = await verify(sessionId, config.USER_SECRET) // 解密payload，获取用户名和ID
      sUid = sessionIdPayload.uid
      sNickname = sessionIdPayload.nickname
    }
    if (token) {
      try {
        tokenPayload = await verify(token, config.JWT_SECRET) // 解密payload，获取用户名和ID
        const uid = tokenPayload.uid
        const nickname = tokenPayload.nickname
        const res = await mysql.checkLogin(uid, nickname)
        if (res.length > 0) {
          ctx.user = true
        }
      } catch (err) {
        // 如果 token 过期，但是用户还是登录状态，则更新 token
        const res = await mysql.checkLogin(sUid, sNickname)
        if (res.length > 0) {
          ctx.user = true
          const newToken = jwt.sign(tokenPayload, config.JWT_SECRET, { expiresIn: '24h' }) // token签名 有效期为24小时
          ctx.cookies.set('token', newToken, config.COOKIES)
        }
        debug(`token verify fail: ${err}`)
      }
    }

    // 调用下一个中间件
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.state = {
        code: -1,
        msg: '认证失败'
      }
    } else {
      err.status = 404
      ctx.state.data = '404'
    }
  }
}
