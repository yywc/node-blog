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
  const { articleId } = ctx.request.query
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

const deleteArticle = async (ctx, next) => {
  if (ctx.session && ctx.session.userName && ctx.session.loginName) {
    const { article_id } = ctx.request.body
    try {
      await mysql.deleteArticle(article_id)
        .then(() => {
          ctx.body = resObj(1, '删除文章成功')
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

const searchArticle = async (ctx, next) => {
  if (ctx.session && ctx.session.userName && ctx.session.loginName) {
    const { title } = ctx.request.query
    try {
      await mysql.searchArticle(title)
        .then((res) => {
          ctx.body = resObj(1, res)
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
  addArticle,
  deleteArticle,
  searchArticle
}
