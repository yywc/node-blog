/**
 * body 返回值
 * @param code
 * @param msg
 * @returns {{status: *, msg: *}}
 */
const resObj = (code, msg) => {
  return {
    status: code,
    msg: msg
  }
}

const logout = async (ctx, next) => {
  if (ctx.session && ctx.session.userName && ctx.session.loginName) {
    ctx.session = null
    ctx.body = resObj(1, '登出成功')
  } else {
    ctx.body = resObj(0, '登出失败')
  }
}

module.exports = {logout}
