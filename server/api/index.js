const {login} = require('./login/login')
const {logout} = require('./logout/logout')

const API = {
  USER_LOGIN: login,
  USER_LOGOUT: logout
}

module.exports = API
