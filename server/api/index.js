const {query} = require('../db/mysql')

// 用户登录
const userLogin = function (userName, password) {
  let sql = `SELECT * FROM blog_user WHERE user_name='${userName}' AND user_password='${password}';`
  return query(sql)
}

module.exports = {userLogin}
