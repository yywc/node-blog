import axios from 'axios'
import config from './config'

/**
 * 用户登录
 * @param loginName 账号
 * @param password 密码
 * @returns {Promise<AxiosResponse<any>>}
 */
const login = function (loginName, password) {
  const url = config.login
  const data = {
    loginName,
    password
  }
  return axios
    .post(url, data)
    .then((res) => {
      return Promise.resolve(res)
    })
    .catch((error) => {
      console.error('登陆失败: ' + error)
    })
}

/**
 * 用户登出
 * @returns {Promise<any>}
 */
const logout = function () {
  const url = config.logout
  return axios
    .get(url)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('登出失败: ' + error)
    })
}

/**
 * 获取所有文章列表
 * @param page 页码，默认第一页
 * @param category 分类，默认全部
 * @param pageCount 每页数量，默认是8
 * @returns {Promise<AxiosResponse<any>>}
 */
const getAllArticle = function (page, category, pageCount) {
  const url = config.getAllArticle
  const data = {
    p: page,
    c: category,
    pc: pageCount
  }
  return axios
    .get(url, {
      params: data
    })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('获取所有文章失败: ' + error)
    })
}

/**
 * 获取某一篇文章以及评论
 * @param articleId 文章ID
 * @param page 评论页码
 * @param pageCount 评论每页显示条数
 * @returns {Promise<AxiosResponse<any>>}
 */
const getArticle = function (articleId, page, pageCount, direction) {
  const url = config.getArticle
  const data = {
    articleId,
    p: page,
    pc: pageCount,
    direction
  }
  return axios
    .get(url, {
      params: data
    })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 更新某一篇文章
 * @param article 文章对象
 * @returns {Promise<AxiosResponse<any>>}
 */
const updateArticle = function (article) {
  const url = config.updateArticle
  const data = {
    article: article
  }
  return axios
    .post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 新建一篇文章
 * @param article 文章实体
 * @returns {Promise<AxiosResponse<any>>}
 */
const addArticle = function (article) {
  const url = config.addArticle
  const data = {
    article: article
  }
  return axios
    .post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 删除一篇文章
 * @param articleId 文章ID
 * @returns {Promise<AxiosResponse<any>>}
 */
const deleteArticle = function (articleId) {
  const url = config.deleteArticle
  const data = {
    articleId
  }
  return axios
    .post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 搜索文章
 * @param page 页码
 * @param title 文章标题
 * @returns {Promise<any>}
 */
const searchArticle = function (page, title) {
  const url = config.searchArticle
  const data = {
    p: page,
    t: title
  }
  return axios
    .get(url, {
      params: data
    })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 获取所有的分类
 * @returns {Promise<any>}
 */
const getTags = function () {
  const url = config.getTags
  return axios
    .get(url)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 根据标签获取文章
 * @param page 页码
 * @param tag 标签名
 * @returns {Promise<AxiosResponse<any>>}
 */
const getArticlesByTag = function (page, tag) {
  const url = config.getArticlesByTag
  const data = {
    p: page,
    t: tag
  }
  return axios
    .get(url, {
      params: data
    })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 获取统计数据
 * @returns {Promise<AxiosResponse<any>>}
 */
const getStatistics = function () {
  const url = config.getStatistics
  return axios
    .get(url)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 获取上下翻页文章
 * @param articleId 文章ID
 * @param direction 翻页方向 0左 1右
 * @returns {Promise<AxiosResponse<any>>}
 */
const pageTurning = function (articleId, direction) {
  const url = config.pageTurning
  const data = {
    id: articleId,
    d: direction
  }
  return axios
    .get(url, {
      params: data
    })
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 新增评论
 * @param comment 评论对象
 * @returns {Promise<AxiosResponse<any>>}
 */
const addComment = function (comment) {
  const url = config.addComment
  return axios
    .post(url, comment)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 检验匿名用户是否存在
 * @returns {Promise<AxiosResponse<any>>}
 */
const checkUser = function () {
  const url = config.checkUser
  return axios
    .get(url)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 更新文章评论数
 * @param articleId 文章ID
 * @returns {Promise<AxiosResponse<any>>}
 */
const updateCommentCount = function (articleId) {
  const url = config.updateCommentCount
  const data = {
    articleId
  }
  return axios
    .post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

export {
  login,
  logout,
  getAllArticle,
  getArticle,
  updateArticle,
  addArticle,
  deleteArticle,
  searchArticle,
  getTags,
  getArticlesByTag,
  getStatistics,
  pageTurning,
  addComment,
  checkUser,
  updateCommentCount
}
