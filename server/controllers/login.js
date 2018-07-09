const md5 = require('md5')
const config = require('../config/config')
const mysql = require('../database/mysql')
const debug = require('debug')('blog-server:login')

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
    if (Array.isArray(res) && res.length > 0) {
      // 设置 session
      const userName = res[0].nickname
      ctx.session.loginName = loginName
      ctx.session.userName = userName
      ctx.state.data = {
        msg: '登录成功',
        userName,
        maxAge: config.MAX_AGE
      }
      // md5 加密设置 response header
      ctx.set('x-auth-token', md5('gyjYYwc.1993'))
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
