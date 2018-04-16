const Router = require('koa-router')
const API = require('../api/index')

const router = new Router()

router.post('/login', API.USER_LOGIN)
router.post('/logout', API.USER_LOGOUT)
router.post('/get-all-article', API.GET_ALL_ARTICLE)

module.exports = router
