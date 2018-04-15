import axios from 'axios'
import config from './config'

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

export {
  login,
  logout
}
