import axios from 'axios'
import config from './config'
import store from 'store'

const login = function (data) {
  const url = config.login
  axios
    .post(url, data)
    .then((res) => {
      const data = res.data
      if (data.status === 1) {
        store.set('__token__', res.headers['x-auth-token'])
        store.set('__user__', res.data.data)
      } else {
        alert(res.data.msg)
      }
    })
    .catch((error) => {
      console.log('内部错误: ' + error)
    })
}

export {login}
