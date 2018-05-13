const Router = require('koa-router')
const API = require('../api/index')

const router = new Router()

router.post('/login', API.USER_LOGIN)
router.post('/logout', API.USER_LOGOUT)
router.post('/get-all-article', API.GET_ALL_ARTICLE)
router.post('/get-article', API.GET_ARTICLE)
router.post('/update-article', API.UPDATE_ARTICLE)
router.post('/add-article', API.ADD_ARTICLE)
router.post('/delete-article', API.DELETE_ARTICLE)
router.post('/search-article', API.SEARCH_ARTICLE)

module.exports = router
