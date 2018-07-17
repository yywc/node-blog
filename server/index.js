const Koa = require('koa')
// const http = require('http')
// const https = require('https')
// const fs = require('fs')
// const enforceHttps = require('koa-sslify')
const bodyParser = require('koa-bodyparser')
const config = require('./config/config')
const router = require('./router/index')
const debug = require('debug')('blog-server')
const response = require('./middlewares/response')
const checkLogin = require('./middlewares/check-login')
const csrf = require('./middlewares/csrf')

const app = new Koa()
// const production = (process.env.NODE_ENV ? process.env.NODE_ENV : 'production') === 'production'

// let options
// if (production) {
  // 强制使用 https
  // app.use(enforceHttps())
  // // SSL options
  // options = {
  //   // ssl文件路径
  //   key: fs.readFileSync('/root/.acme.sh/iwangshu.com/iwangshu.com.key'),
  //   // ssl文件路径
  //   cert: fs.readFileSync('/root/.acme.sh/iwangshu.com/fullchain.cer')
  // }
// }

// csrf
app.use(csrf)

// 响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// 判断是否登录
app.use(checkLogin)

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())

// start the server
// if (production) {
//   http.createServer(app.callback()).listen(80)
//   https.createServer(options, app.callback()).listen(443)
//   debug(`production: listening on port ${config.PORT}`)
// } else {
//   app.listen(config.PORT, debug(`listening on port ${config.PORT}`))
// }

app.listen(config.PORT, debug(`listening on port ${config.PORT}`))
