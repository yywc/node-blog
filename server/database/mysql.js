/* eslint-disable camelcase */
const mysql = require('mysql')
const config = require('../config/config.js')

const pool = mysql.createPool({
  host: config.DATABASE_CONFIG.HOST,
  user: config.DATABASE_CONFIG.USERNAME,
  password: config.DATABASE_CONFIG.PASSWORD,
  database: config.DATABASE_CONFIG.DATABASE,
  multipleStatements: config.DATABASE_CONFIG.MULTIPLE_STATEMENTS,
  dateStrings: config.DATABASE_CONFIG.DATE_STRINGS
})

const query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

// 用户登录
const login = function (loginName, password) {
  const sql = 'SELECT * FROM `blog_user` WHERE `name` = ? AND `password` = ? LIMIT 1;'
  return query(sql, [loginName, password])
}

// jwt 检验用户是否登录
const checkLogin = function (uid, nickname) {
  const sql = 'SELECT * FROM `blog_user` WHERE `uid` = ? AND `nickname` = ? LIMIT 1;'
  return query(sql, [uid, nickname])
}

// 获取全部文章
const getAllArticle = function (page, pageCount, category) {
  let allArticleSql = ''
  let totalCountSql = ''
  const CATEGORY_ALL = 0
  const CATEGORY_TECH = 1
  const CATEGORY_NOTE = 2
  page = (page - 1) * pageCount
  // 是否包含分类查询
  switch (category) {
    case CATEGORY_ALL:
      totalCountSql = 'SELECT COUNT(`article_id`) FROM `blog_article`;'
      allArticleSql = 'SELECT * FROM `blog_article` WHERE `article_id` <= (SELECT `article_id` FROM `blog_article` ORDER BY article_id DESC LIMIT ?, 1) ORDER BY `article_id` DESC LIMIT ?;'
      break
    case CATEGORY_TECH:
      totalCountSql = 'SELECT COUNT(`article_id`) FROM `blog_article` WHERE `category` LIKE \'%技术%\';'
      allArticleSql = 'SELECT * FROM `blog_article` WHERE `article_id` <= (SELECT `article_id` FROM `blog_article` ORDER BY article_id DESC LIMIT ?, 1) AND `category` LIKE \'%技术%\' ORDER BY `article_id` DESC LIMIT ?;'
      break
    case CATEGORY_NOTE:
      totalCountSql = 'SELECT COUNT(`article_id`) FROM `blog_article` WHERE `category` LIKE \'%生活%\';'
      allArticleSql = 'SELECT * FROM `blog_article` WHERE `article_id` <= (SELECT `article_id` FROM `blog_article` ORDER BY article_id DESC LIMIT ?, 1) AND `category` LIKE \'%生活%\' ORDER BY `article_id` DESC LIMIT ?;'
      break
    default:
      totalCountSql = 'SELECT COUNT(`article_id`) FROM `blog_article`;'
      allArticleSql = 'SELECT * FROM `blog_article` WHERE `article_id` <= (SELECT `article_id` FROM `blog_article` ORDER BY article_id DESC LIMIT ?, 1) ORDER BY `article_id` DESC LIMIT ?;'
  }
  const sql = totalCountSql + allArticleSql
  return query(sql, [page, pageCount])
}

// 查看某一篇文章以及评论
const getArticle = function (id, page, pageCount) {
  page = (page - 1) * pageCount
  let sql = 'SELECT * FROM `blog_article` WHERE article_id=?;'
  sql += 'SELECT * FROM `blog_comment` ' +
    'LEFT OUTER JOIN `blog_article`' +
    'ON blog_article.article_id = blog_comment.article_id WHERE blog_comment.article_id=? ' +
    'ORDER BY `create_comment_time` ASC LIMIT ?,?;'
  sql += 'SELECT COUNT(`article_id`) FROM `blog_comment` WHERE `article_id`=?;'
  return query(sql, [id, id, page, pageCount, id])
}

// 修改某一篇文章
const updateArticle = function (article) {
  const { category, content, comment_count, img, read_count, tag, title, article_id } = article
  const value = { category, content, comment_count, img, read_count, tag, title }
  const sql = 'UPDATE `blog_article` SET ? WHERE `article_id` = ?;'
  return query(sql, [value, article_id])
}

// 插入一篇文章
const addArticle = function (article) {
  const { title, content, category, tag, img } = article
  const value = [title, content, category, tag, img]
  const sql = 'INSERT INTO `blog_article` VALUES (NULL, ?, ?, NULL, NULL, ?, ?, ?, 1, 0);'
  return query(sql, value)
}

// 删除一篇文章
const deleteArticle = function (id) {
  const sql = 'DELETE FROM `blog_article` WHERE `article_id` = ?;'
  return query(sql, id)
}

// 搜索文章
const searchArticle = function (title, page, pageCount) {
  title = `%${title}%`
  page = (page - 1) * pageCount
  let sql = 'SELECT COUNT(`article_id`) FROM `blog_article` WHERE `title` LIKE ?;'
  sql += 'SELECT * FROM `blog_article` WHERE `title` LIKE ? ORDER BY `article_id` DESC LIMIT ?,?;'
  return query(sql, [title, title, page, pageCount])
}

// 获取所有的分类
const getTags = function () {
  const sql = 'SELECT `tag` FROM `blog_article`;'
  return query(sql)
}

// 获取指定分类的文章
const getArticlesByTag = function (tag, page, pageCount) {
  tag = `%${tag}%`
  page = (page - 1) * pageCount
  let sql = 'SELECT COUNT(`article_id`) FROM `blog_article` WHERE `tag` LIKE ?;'
  sql += 'SELECT * FROM `blog_article` WHERE `tag` LIKE ? ORDER BY `article_id` DESC LIMIT ?,?;'
  return query(sql, [tag, tag, page, pageCount])
}

// 获取统计信息
const getStatistics = function () {
  let sql = 'SELECT `category` FROM `blog_article`;'
  sql += 'SELECT `tag` FROM `blog_article`;'
  sql += 'SELECT `comment_count` FROM `blog_article`;'
  return query(sql)
}

// 前后翻页
const pageTurning = function (id, direction) {
  let sql = 'UPDATE `blog_article` SET `read_count` = `read_count` + 1 WHERE `article_id` = ?;'
  const LEFT_PAGE = 0
  const RIGHT_PAGE = 1
  switch (parseInt(direction)) {
    case LEFT_PAGE:
      sql += 'SELECT * FROM `blog_article` WHERE `article_id` < ? ORDER BY `article_id` DESC LIMIT 1;'
      break
    case RIGHT_PAGE:
      sql += 'SELECT * FROM `blog_article` WHERE `article_id` > ? LIMIT 1;'
      break
  }
  return query(sql, [id, id])
}

// 插入评论
const addComment = function (comment) {
  const { articleId, userId, nickname, contact, content, targetUserId } = comment
  let sql = 'INSERT INTO `blog_comment` VALUES (NULL, ?, ?, ?, ?, ?, ?, NULL);'
  sql += 'UPDATE blog_article SET `comment_count` = `comment_count` + 1 WHERE `article_id`= ?;'
  return query(sql, [articleId, userId, nickname, contact, content, targetUserId, articleId])
}

// 插入临时用户
const addUser = function (nickname, contact, ipAddress) {
  const sql = 'INSERT INTO `blog_user` VALUES (NULL, NULL, NULL, ?, ?, ?, NULL, NULL);'
  return query(sql, [nickname, contact, ipAddress])
}

// 查询用户
const searchUser = function (ipAddress) {
  const sql = 'SELECT * FROM `blog_user` WHERE `ip_address` = ? LIMIT 1'
  return query(sql, [ipAddress])
}

// 更新阅读数
const updateCommentCount = function (id) {
  let sql = 'UPDATE `blog_article` SET `read_count` = `read_count` + 1 WHERE `article_id`=?;'
  return query(sql, [id])
}

module.exports = {
  login,
  checkLogin,
  getAllArticle,
  getArticle,
  updateArticle,
  addArticle,
  deleteArticle,
  searchArticle,
  getTags,
  getArticlesByTag,
  getStatistics,
  pageTurning,
  addComment,
  addUser,
  searchUser,
  updateCommentCount
}
