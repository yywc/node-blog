const config = require('../config/config')
const mysql = require('../database/mysql')
const debug = require('debug')('blog-server:login')
const jwt = require('jsonwebtoken')

module.exports = async (ctx) => {
  const { loginName, password } = ctx.request.body
  if (!loginName || !password) {
    ctx.state = {
      code: -1,
      data: {
        msg: '账号密码填写不完整'
      }
    }
    return
  }
  const loginNameReg = /^[a-z]\w{3,15}/
  if (!loginName.match(loginNameReg)) {
    ctx.state = {
      code: -1,
      data: {
        msg: '账号格式不正确'
      }
    }
    return
  }
  try {
    const res = await mysql.login(loginName, password)
    if (res.length > 0) {
      const nickname = res[0].nickname
      const uid = res[0].uid
      const payload = {
        uid,
        nickname
      }
      // 两个 token，一个是前端调用判断是否登录而显示不同 ui，确保 token 不被篡改
      const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '24h' }) // token签名 有效期为1小时
      const sessionId = jwt.sign(payload, config.USER_SECRET, { expiresIn: config.COOKIES.maxAge }) // sessionId 签名
      ctx.cookies.set('token', token, config.COOKIES)
      ctx.cookies.set('sessionId', sessionId, Object.assign(config.COOKIES, {
        httpOnly: false
      }))
      ctx.state.data = {
        msg: '登录成功'
      }
    } else {
      ctx.state = {
        code: -1,
        data: {
          msg: '账号或者密码有误'
        }
      }
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: '数据库连接错误, 登陆失败'
      }
    }
    debug(`登陆失败: ${e.toString()}`)
  }
}
