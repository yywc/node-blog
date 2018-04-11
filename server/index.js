const Koa = require('koa')
const Router = require('koa-router')
const {findUserData} = require('./lib/mysql.js')

const app = new Koa()
const router = new Router()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

router.post('/login', async (ctx, next) => {
  let code, data
  const {userName, password} = ctx.request.body
  const result = await findUserData(userName, password)
  if (result) {
    if (result === 1) {
      code = 200
      data = {
        status: 'success'
      }
    } else {
      code = 200
      data = {
        status: 'failure'
      }
    }
  } else {
    code = 500
    data = {
      status: 'error'
    }
  }
  ctx.body = JSON.stringify({
    code,
    data
  })
})

// 加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000, () => {
  console.log('Listening at http://localhost:' + 3000 + '\n')
})
