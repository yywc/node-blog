import axios from 'axios'
import config from './config'

const login = function (data) {
  const url = config.login
  return axios
    .post(url, data)
    .then((res) => {
      return Promise.resolve(res.data)
    })
    .catch((error) => {
      console.log('内部错误: ' + error)
    })
}

export {login}
