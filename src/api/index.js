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
    .post(url)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 获取所有文章列表
 */
const getAllArticle = function () {
  const url = config.getAllArticle
  return axios
    .post(url)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

/**
 * 获取某一篇文章
 */
const getArticle = function (data) {
  const url = config.getArticle
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
 * 更新某一篇文章
 */
const updateArticle = function (data, isLogin) {
  const url = config.updateArticle
  axios.interceptors.request.use(function () {
    if (isLogin) {
      return axios
        .post(url, data)
        .then((res) => {
          return Promise.resolve(res.data)
        })
        .catch((error) => {
          console.error('内部错误: ' + error)
        })
    } else {
// eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('未登录')
    }
  }, function (error) {
    return Promise.reject(error)
  })
}

export {
  login,
  logout,
  getAllArticle,
  getArticle,
  updateArticle
}
