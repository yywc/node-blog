const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const config = require('./config/config')
const router = require('./router/index')
const debug = require('debug')('blog-server')
const response = require('./middlewares/response')

const app = new Koa()

app.use(bodyParser())

// 配置存储session信息的mysql
const store = new MysqlSession({
  user: config.DATABASE_CONFIG.USERNAME,
  password: config.DATABASE_CONFIG.PASSWORD,
  database: config.DATABASE_CONFIG.DATABASE,
  host: config.DATABASE_CONFIG.HOST
})

// 存放sessionId的cookie配置
const cookie = {
  maxAge: config.MAX_AGE, // cookie有效时长
  path: '/', // 写cookie所在的路径
  // domain: '', // 写cookie所在的域名
  httpOnly: true, // 是否只用于http请求中获取
  overwrite: true, // 是否允许重写
  signed: true
  // secure: '',
  // sameSite: '',
}

// 使用session中间件
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.PORT, debug(`listening on port ${config.PORT}`))
