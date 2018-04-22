const {login} = require('./login/login')
const {logout} = require('./logout/logout')
const {getAllArticle, getArticle} = require('./database/db')

const API = {
  USER_LOGIN: login,
  USER_LOGOUT: logout,
  GET_ALL_ARTICLE: getAllArticle,
  GET_ARTICLE: getArticle
}

module.exports = API
