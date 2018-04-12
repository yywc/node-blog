const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router/index')

const app = new Koa()
const port = 3000

app.use(bodyParser())

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '\n')
})
