const { login } = require('./login/login')
const { logout } = require('./logout/logout')
const db = require('./database/db')

const API = {
  USER_LOGIN: login,
  USER_LOGOUT: logout,
  GET_ALL_ARTICLE: db.getAllArticle,
  GET_ARTICLE: db.getArticle,
  UPDATE_ARTICLE: db.updateArticle,
  ADD_ARTICLE: db.addArticle,
  DELETE_ARTICLE: db.deleteArticle
}

module.exports = API
