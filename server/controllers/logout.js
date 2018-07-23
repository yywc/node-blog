const config = require('../config/config')

module.exports = async (ctx) => {
  if (ctx.user) {
    ctx.user = false
    ctx.cookies.set('token', '', Object.assign(config.COOKIES, { maxAge: -1 }))
    ctx.state = {
      code: 0,
      data: {
        msg: '登出成功'
      }
    }
  } else {
    ctx.state = {
      code: -1,
      data: {
        msg: '登出失败'
      }
    }
  }
}
