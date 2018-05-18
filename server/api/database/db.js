/* eslint-disable camelcase */
const mysql = require('../../db/mysql')
const config = require('../../config/config')

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
  let { p, pc } = ctx.request.query
  p = p !== null && p !== undefined ? parseInt(p) : 1
  pc = pc !== null && pc !== undefined ? parseInt(pc) : config.PAGE_COUNT
  try {
    await mysql.getAllArticle(p, pc)
      .then((res) => {
        ctx.body = resObj(1, {
          data: res[1],
          totalCount: res[0][0]['COUNT(`article_id`)'],
          page: p,
          pageCount: pc
        })
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
