const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const config = require('./config/dbConfig')
const router = require('./router/index')

const app = new Koa()
const port = 3000

app.use(bodyParser())

// 配置存储session信息的mysql
const store = new MysqlSession({
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST
})

// 存放sessionId的cookie配置
const cookie = {
  maxAge: 24 * 60 * 60 * 1000, // cookie有效时长
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

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '\n')
})
