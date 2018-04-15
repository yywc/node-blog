const Router = require('koa-router')
const API = require('../api/index')

const router = new Router()

router.post('/login', API.USER_LOGIN)
router.post('/logout', API.USER_LOGOUT)

module.exports = router
