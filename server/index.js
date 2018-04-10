const Koa = require('koa')
const Router = require('koa-router')
const { findUserData } = require('./lib/mysql.js')

const app = new Koa()
const router = new Router()
const bodyParser = require('koa-bodyparser')

app.use(bodyParser());

router.post('/login', (ctx, next) => {
  const data = new Map()
  const context = this;
  let code;
  let userName = ctx.request.body.userName
  let password = ctx.request.body.pass
  findUserData(userName, password)
    .then((res) => {
      code = 200
      if (res.length) {
        data.set('data', '登陆成功')
        data.set('status', 'success')
      } else {
        data.set('data', '账号或密码错误')
        data.set('status', 'failure')
      }
    })
    .catch((error) => {
      code = 500
      data.set('error', error)
    })

  ctx.response.type = 'json'
  ctx.response.body = {
    code,
    data
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
console.log('Listening at http://localhost:' + 3000 + '\n')
