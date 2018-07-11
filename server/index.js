const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const config = require('./config/config')
const router = require('./router/index')
const debug = require('debug')('blog-server')
const response = require('./middlewares/response')
const checkLogin = require('./middlewares/check-login')

const app = new Koa()

// 响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// 判断是否登录
app.use(checkLogin)

// app.use(jwt({ secret: 'todoList' }).unless({ path: [/^\/login/] }))

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.PORT, debug(`listening on port ${config.PORT}`))
