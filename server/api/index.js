const { login } = require('./login/login')
const { logout } = require('./logout/logout')
const { getAllArticle, getArticle, updateArticle } = require('./database/db')

const API = {
  USER_LOGIN: login,
  USER_LOGOUT: logout,
  GET_ALL_ARTICLE: getAllArticle,
  GET_ARTICLE: getArticle,
  UPDATE_ARTICLE: updateArticle
}

module.exports = API
