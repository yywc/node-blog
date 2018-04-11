const {userLogin} = require('../../api/index')

/**
 * 返回值
 * @param code 返回码
 * @param msg  返回信息
 * @param data 返回数据
 * @return
 */

// var resObj = (code, msg, resData, token) => {
//   return {
//     status: code,
//     msg: msg,
//     data: resData,
//     token: token
//   }
// }

const login = async (ctx, next) => {
  let code, data
  const {userName, password} = ctx.request.body
  const result = await userLogin(userName, password)
  if (result === 1) {
    code = 200
    data = {
      status: 'success'
    }
  } else if (result === 0) {
    code = 200
    data = {
      status: 'failure'
    }
  } else {
    code = 500
    data = {
      status: 'error'
    }
  }

  ctx.body = JSON.stringify({
    code,
    data
  })
}

module.exports = {login}
