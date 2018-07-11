const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const debug = require('debug')('blog-server:check')
const config = require('../config/config')
const mysql = require('../database/mysql')

module.exports = async (ctx) => {
  const sessionId = ctx.cookies.get('sessionId') // 获取jwt
  if (sessionId) {
    try {
      const payload = await verify(sessionId, config.USER_SECRET)
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
          msg: '查询用户失败'
        }
      }
      debug(`查询用户失败: ${e.toString()}`)
    }
  } else {
    ctx.state.data = {
      isLogin: false
    }
  }
}
