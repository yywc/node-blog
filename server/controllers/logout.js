module.exports = async (ctx, next) => {
  if (ctx.session && ctx.session.userName && ctx.session.loginName) {
    ctx.session = null
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
