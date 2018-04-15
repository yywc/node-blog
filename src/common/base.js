import Cookies from 'js-cookie'

const isLogin = !!Cookies.get('TOKEN')

export {isLogin}
