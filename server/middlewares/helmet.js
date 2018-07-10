const helmet = require('koa-helmet')
const debug = require('debug')('blog-server:helmet')

module.exports = async (ctx, next) => {
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ['\'self\''],
      styleSrc: ['\'self\'']
    }
  })
  helmet.noCache()
  ctx.set({
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '1; mode=block',
    'cache-control': 'no-store, no-cache',
    'Connection': 'keep-alive'
  })
  debug(ctx.response)
  await next()
}
