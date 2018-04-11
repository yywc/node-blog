const Koa = require('koa')
const Router = require('koa-router')
const {login} = require('./router/login/login')

const app = new Koa()
const router = new Router()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

router.post('/login', login)

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())

const port = 3000
app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '\n')
})
