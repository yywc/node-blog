import axios from 'axios'
import config from './config'

/**
 * 用户登录
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
const login = function (data) {
  const url = config.login
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
const getAllCategory = function () {
  const url = config.getAllCategory
  return axios
    .get(url)
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
  getAllCategory
}
