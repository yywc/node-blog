const {login} = require('../router/login/login')
const {logout} = require('../router/logout/logout')

const API = {
  USER_LOGIN: login,
  USER_LOGOUT: logout
}

module.exports = API
