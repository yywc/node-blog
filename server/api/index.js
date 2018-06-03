const { login } = require('./login/login')
const { logout } = require('./logout/logout')
const { uploadImg } = require('./upload-img/upload-img')
const db = require('./database/db')

const API = {
  USER_LOGIN: login,
  USER_LOGOUT: logout,
  GET_ALL_ARTICLE: db.getAllArticle,
  GET_ARTICLE: db.getArticle,
  UPDATE_ARTICLE: db.updateArticle,
  ADD_ARTICLE: db.addArticle,
  DELETE_ARTICLE: db.deleteArticle,
  SEARCH_ARTICLE: db.searchArticle,
  GET_TAGS: db.getTags,
  GET_ARTICLES_BY_TAG: db.getArticlesByTag,
  GET_STATISTICS: db.getStatistics,
  PAGE_TURNING: db.pageTurning,
  UPLOAD_IMG: uploadImg
}

module.exports = API
