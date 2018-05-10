/* eslint-disable camelcase */
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

// 封装文章数据
const _checkArticleData = function (article, ctx) {
  let { title, category, content, img, tag, favorite_count, read_count } = article
  if (!title || !content || !category) {
    ctx.body = resObj(0, '文章内容不全')
    return
  }
  article.title = `'${title}'`
  article.content = `'${content}'`
  article.category = `'${category}'`

  if (img === undefined || img === null) {
    article.img = null
  } else {
    article.img = `'${img}'`
  }

  if (tag === undefined || tag === null) {
    article.tag = null
  } else {
    article.tag = `'${tag}'`
  }

  if (favorite_count === undefined) {
    article.favorite_count = 0
  }

  if (read_count === undefined) {
    article.read_count = 0
  }
}

const updateArticle = async (ctx, next) => {
  if (ctx.session && ctx.session.userName && ctx.session.loginName) {
    const { article } = ctx.request.body
    // 处理数据，方便数据库直接提交
    _checkArticleData(article, ctx)
    try {
      await mysql.updateArticle(article)
        .then(() => {
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
    // 处理数据，方便数据库直接提交
    _checkArticleData(article, ctx)
    try {
      await mysql.addArticle(article)
        .then(() => {
          ctx.body = resObj(1, '新增文章成功')
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

module.exports = {
  getAllArticle,
  getArticle,
  updateArticle,
  addArticle
}
