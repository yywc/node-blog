/* eslint-disable camelcase */
const mysql = require('mysql')
const config = require('../config/config.js')

const pool = mysql.createPool({
  host: config.DATABASE_CONFIG.HOST,
  user: config.DATABASE_CONFIG.USERNAME,
  password: config.DATABASE_CONFIG.PASSWORD,
  database: config.DATABASE_CONFIG.DATABASE,
  multipleStatements: config.DATABASE_CONFIG.MULTIPLE_STATEMENTS
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
      totalCountSql = 'SELECT COUNT(`article_id`) FROM `blog_article` WHERE `category` LIKE \'%杂谈%\';'
      allArticleSql = 'SELECT * FROM `blog_article` WHERE `article_id` <= (SELECT `article_id` FROM `blog_article` ORDER BY article_id DESC LIMIT ?, 1) AND `category` LIKE \'%杂谈%\' ORDER BY `article_id` DESC LIMIT ?;'
      break
    default:
      totalCountSql = 'SELECT COUNT(`article_id`) FROM `blog_article`;'
      allArticleSql = 'SELECT * FROM `blog_article` WHERE `article_id` <= (SELECT `article_id` FROM `blog_article` ORDER BY article_id DESC LIMIT ?, 1) ORDER BY `article_id` DESC LIMIT ?;'
  }
  const sql = totalCountSql + allArticleSql
  return query(sql, [page, pageCount])
}

// 查看某一篇文章
const getArticle = function (id) {
  const sql = 'SELECT * FROM `blog_article` WHERE `article_id` = ? LIMIT 1;'
  return query(sql, id)
}

// 修改某一篇文章
const updateArticle = function (article) {
  const { category, content, favorite_count, img, read_count, tag, title, article_id } = article
  const value = { category, content, favorite_count, img, read_count, tag, title }
  const sql = 'UPDATE `blog_article` SET ? WHERE `article_id` = ?;'
  return query(sql, [value, article_id])
}

// 插入一篇文章
const addArticle = function (article) {
  const { title, content, category, tag, img } = article
  const value = [title, content, category, tag, img]
  const sql = 'INSERT INTO `blog_article` VALUES (NULL, ?, ?, NULL, NULL, ?, ?, ?, 0, 0);'
  return query(sql, value)
}

// 删除一篇文章
const deleteArticle = function (id) {
  const sql = 'DELETE FROM `blog_article` WHERE `article_id` = ?;'
  return query(sql, id)
}

// 搜索一篇文章
const searchArticle = function (title, page, pageCount) {
  title = `%${title}%`
  page = (page - 1) * pageCount
  let sql = 'SELECT COUNT(`article_id`) FROM `blog_article` WHERE `title` LIKE ?;'
  sql += 'SELECT * FROM `blog_article` WHERE `title` LIKE ? ORDER BY `article_id` DESC LIMIT ?,?;'
  return query(sql, [title, title, page, pageCount])
}

module.exports = {
  login,
  getAllArticle,
  getArticle,
  updateArticle,
  addArticle,
  deleteArticle,
  searchArticle
}
