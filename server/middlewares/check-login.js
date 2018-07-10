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
  try {
    const token = ctx.cookies.get('auth-token') // 获取jwt
    if (token) {
      let payload
      try {
        payload = await verify(token, config.JWT_SECRET) // 解密payload，获取用户名和ID
        const uid = payload.uid
        const nickname = payload.nickname
        const res = await mysql.checkLogin(uid, nickname)
        if (res.length > 0) {
          ctx.user = true
        }
      } catch (err) {
        // 如果 token 过期，但是用户还是登录状态，则更新 token
        const user = JSON.parse(decodeURIComponent(ctx.cookies.get('user'))) // 获取用户
        const uid = decodeURIComponent(user.uid)
        const nickname = decodeURIComponent(user.nickname)
        payload = {
          uid,
          nickname
        }
        const res = await mysql.checkLogin(uid, nickname)
        if (res.length > 0) {
          ctx.user = true
          const newToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '24h' }) // token签名 有效期为24小时
          ctx.cookies.set('auth-token', newToken, config.COOKIES)
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
