const Router = require('koa-router')
const API = require('../api/index')

const router = new Router()

router.post('/login', API.USER_LOGIN)
router.post('/update-article', API.UPDATE_ARTICLE)
router.post('/add-article', API.ADD_ARTICLE)
router.post('/delete-article', API.DELETE_ARTICLE)
router.post('/upload-img', API.UPLOAD_IMG)

router.get('/logout', API.USER_LOGOUT)
router.get('/get-all-article', API.GET_ALL_ARTICLE)
router.get('/get-article', API.GET_ARTICLE)
router.get('/search-article', API.SEARCH_ARTICLE)
router.get('/get-tags', API.GET_TAGS)
router.get('/get-articles-by-tag', API.GET_ARTICLES_BY_TAG)
router.get('/get-statistics', API.GET_STATISTICS)
router.get('/page-turning', API.PAGE_TURNING)

module.exports = router
