const config = require('../config/config')
// const debug = require('debug')('blog-server:csrf')

/**
 * 检查是否由本网站发出请求
 */
module.exports = async (ctx, next) => {
  const reg = new RegExp(config.DOMAIN)
  if (reg.test(ctx.headers.referer) && reg.test(ctx.headers.host)) {
    await next()
  } else {
    ctx.body = {
      code: -1,
      data: {
        msg: '非法请求'
      }
    }
  }
}
