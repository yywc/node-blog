import Cookies from 'js-cookie'
import MD5 from 'md5.js'

const isLogin = new MD5().update('gyjYYwc.1993').digest('hex') === Cookies.get('TOKEN')

export {isLogin}
