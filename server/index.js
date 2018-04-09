var Koa = require('koa')
var Router = require('koa-router')
var {findUserData} = require('mysql.js')

var app = new Koa()
var router = new Router()

router.get('/login', (ctx, next) => {
  // ctx.router available
  findUserData()
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
console.log('Listening at http://localhost:' + 3000 + '\n')
