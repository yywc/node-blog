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
      console.error('内部错误: ' + error)
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
      console.error('内部错误: ' + error)
    })
}

/**
 * 获取所有文章列表
 * @returns {Promise<AxiosResponse<any>>}
 */
const getAllArticle = function (data) {
  const url = config.getAllArticle
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
 * 获取某一篇文章
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
const getArticle = function (data) {
  const url = config.getArticle
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
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
const updateArticle = function (data) {
  const url = config.updateArticle
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
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
const addArticle = function (data) {
  const url = config.addArticle
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
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
const deleteArticle = function (data) {
  const url = config.deleteArticle
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
 * @param data
 * @returns {Promise<any>}
 */
const searchArticle = function (data) {
  const url = config.searchArticle
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
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
const getArticlesByTag = function (data) {
  const url = config.getArticlesByTag
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
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
const pageTurning = function (data) {
  const url = config.pageTurning
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

const addComment = function (data) {
  const url = config.addComment
  return axios
    .post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

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

const updateCommentCount = function (data) {
  const url = config.updateCommentCount
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
