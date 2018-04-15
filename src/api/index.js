import axios from 'axios'
import config from './config'
import Cookies from 'js-cookie'

const login = function (data) {
  const url = config.login
  return axios
    .post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

const logout = function () {
  const url = config.logout
  if (!Cookies.get('TOKEN')) {
    return '账号已登出'
  }
  return axios
    .post(url)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.error('内部错误: ' + error)
    })
}

export {
  login,
  logout
}
