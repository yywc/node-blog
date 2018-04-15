import axios from 'axios'
import config from './config'
import Cookies from 'js-cookie'

const login = function (data) {
  const url = config.login
  return axios
    .post(url, data)
    .then((res) => {
      const data = res.data
      if (data.status === 1) {
        const token = encodeURIComponent(res.headers['x-auth-token'] + '|' + data.data)
        Cookies.set('__token__', token, {expires: 30})
        return true
      } else {
        alert(res.data.msg)
        return false
      }
    })
    .catch((error) => {
      console.log('内部错误: ' + error)
    })
}

export {login}
