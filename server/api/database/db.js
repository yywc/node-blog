const mysql = require('../../db/mysql')

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
  try {
    await mysql.getAllArticle()
      .then((res) => {
        ctx.body = resObj(1, res)
      })
      .catch((e) => {
        ctx.body = resObj(2, e.toString())
      })
  } catch (e) {
    ctx.body = resObj(0, '数据库错误: ' + e.toString())
  }
}

const getArticle = async (ctx, next) => {
  const { articleId } = ctx.request.body
  try {
    await mysql.getArticle(articleId)
      .then((res) => {
        ctx.body = resObj(1, res)
      })
      .catch((e) => {
        ctx.body = resObj(2, e.toString())
      })
  } catch (e) {
    ctx.body = resObj(0, '数据库错误: ' + e.toString())
  }
}

const updateArticle = async (ctx, next) => {
  if (ctx.session && ctx.session.userName && ctx.session.loginName) {
    const { article } = ctx.request.body
    try {
      await mysql.updateArticle(article)
        .then((res) => {
          ctx.body = resObj(1, '文章修改成功')
        })
        .catch((e) => {
          ctx.body = resObj(2, e.toString())
        })
    } catch (e) {
      ctx.body = resObj(0, '数据库错误: ' + e.toString())
    }
  } else {
    ctx.body = resObj(0, '未登录')
  }
}

const addArticle = async (ctx, next) => {
  if (ctx.session && ctx.session.userName && ctx.session.loginName) {
    const { article } = ctx.request.body
    // eslint-disable-next-line camelcase
    const { article_id, category, content, favorite_count, img, read_count, tag, title } = article
    console.log(article_id)
    console.log(category)
    console.log(content)
    console.log(favorite_count)
    console.log(img)
    console.log(read_count)
    console.log(tag)
    console.log(title)
  //   try {
  //     await mysql.addArticle(article)
  //       .then((res) => {
  //         ctx.body = resObj(1, '文章修改成功')
  //       })
  //       .catch((e) => {
  //         ctx.body = resObj(2, e.toString())
  //       })
  //   } catch (e) {
  //     ctx.body = resObj(0, '数据库错误: ' + e.toString())
  //   }
  } else {
    ctx.body = resObj(0, '未登录')
  }
}

module.exports = {
  getAllArticle,
  getArticle,
  updateArticle,
  addArticle
}
