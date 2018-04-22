const {getArticleByAll, getArticleById} = require('../../db/mysql')

/**
 * 返回值
 * @param code
 * @param msg
 * @param data
 * @returns {{status: *, msg: *, data: *}}
 */
const resObj = (code, data) => {
  return {
    status: code,
    data: data
  }
}

const getAllArticle = async (ctx, next) => {
  await getArticleByAll()
    .then((res) => {
      ctx.body = resObj(1, res)
    })
    .catch((e) => {
      ctx.body = resObj(0, e.toString())
    })
}

const getArticle = async (ctx, next) => {
  const {articleId} = ctx.request.body
  await getArticleById(articleId)
    .then((res) => {
      ctx.body = resObj(1, res)
    })
    .catch((e) => {
      ctx.body = resObj(0, e.toString())
    })
}

module.exports = {
  getAllArticle,
  getArticle
}
