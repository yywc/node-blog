/* eslint-disable no-undef,space-infix-ops */
const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()

// post 请求
router.post('/login', controllers.login)
router.post('/update-article', controllers.article.updateArticle)
router.post('/add-article', controllers.article.addArticle)
router.post('/delete-article', controllers.article.deleteArticle)
router.post('/upload-img', controllers.uploadImg)
router.post('/add-comment', controllers.addComment)
router.post('/update-comment-count', controllers.updateCommentCount)

// get 请求
router.get('/logout', controllers.logout)
router.get('/get-all-article', controllers.article.getAllArticle)
router.get('/get-article', controllers.article.getArticle)
router.get('/search-article', controllers.article.searchArticle)
router.get('/get-tags', controllers.getTags)
router.get('/get-articles-by-tag', controllers.article.getArticlesByTag)
router.get('/get-statistics', controllers.getStatistics)
router.get('/page-turning', controllers.turnPage)
router.get('/check-user', controllers.searchUser)

// 测试页面
router.get('/', async (ctx) => {
  ctx.response.type = 'text/html'
  ctx.response.body = '<h1>Hello World!</h1>'
})

module.exports = router
