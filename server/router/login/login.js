const {userLogin} = require('../../db/mysql')

/**
 * 返回值
 * @param code 返回码
 * @param msg  返回信息
 * @param resData 返回数据
 * @param token token 码
 * @return
 */

const resObj = (code, msg, resData, token) => {
  return {
    status: code,
    msg: msg,
    data: resData,
    token: token
  }
}

const login = async (ctx, next) => {
  const {userName, password} = ctx.request.body
  if (!userName || !password) {
    ctx.body = resObj(-1, '用户名密码填写不完整')
    return
  }
  const userNameReg = /^[a-z]\w{3,15}/
  if (!userName.match(userNameReg)) {
    ctx.body = resObj(-1, '用户名格式不正确')
    return
  }
  try {
    await userLogin(userName, password)
      .then((res) => {
        if (res.length > 0) {
          ctx.body = resObj(1, '登录成功')
        } else {
          ctx.body = resObj(2, '用户名或者密码有误')
        }
      })
      .catch((e) => {
        ctx.body = resObj(0, '发生错误', e.toString())
      })
  } catch (e) {
    ctx.body = resObj(0, '数据库错误', e.toString())
  }
}

module.exports = {login}
