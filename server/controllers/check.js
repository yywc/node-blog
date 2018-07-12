const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const debug = require('debug')('blog-server:check')
const config = require('../config/config')
const mysql = require('../database/mysql')

/**
 * 检查用户是否登录
 * @param ctx
 * @returns {Promise<void>}
 */

module.exports = async (ctx) => {
  const token = ctx.cookies.get('token') // 获取jwt
  if (token) {
    try {
      const payload = await verify(token, config.JWT_SECRET)
      const uid = payload.uid
      const nickname = payload.nickname
      const res = await mysql.checkLogin(uid, nickname)
      if (res.length > 0) {
        ctx.state.data = {
          isLogin: true
        }
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          isLogin: false
        }
      }
      debug(`未登录: ${e.toString()}`)
    }
  } else {
    ctx.state = {
      code: -1,
      data: {
        isLogin: false
      }
    }
  }
}
