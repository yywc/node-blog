/**
 * 数据库初始化
 * *nix NODE_ENV=development node init-database.js
 * cmd set NODE_ENV=development node init-database.js
 */
const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const config = require('../config/config.js')

console.log('======================================')
console.log('开始初始化数据库...')

// 初始化 SQL 文件路径
const INIT_DB_FILE = path.join(__dirname, './node-blog.sql')

const connection = mysql.createConnection({
  host: config.DATABASE_CONFIG.HOST,
  user: config.DATABASE_CONFIG.USERNAME,
  password: config.DATABASE_CONFIG.PASSWORD,
  database: config.DATABASE_CONFIG.DATABASE,
  multipleStatements: config.DATABASE_CONFIG.MULTIPLE_STATEMENTS,
  dateStrings: config.DATABASE_CONFIG.DATE_STRINGS
})

// 读取 .sql 文件内容
const content = fs.readFileSync(INIT_DB_FILE, 'utf8')

console.log('开始执行 SQL 文件...')

connection.connect()
connection.query(content, function (error, results, fields) {
  if (error) {
    throw error
  }
  console.log('数据库初始化完成...')
})

connection.end()
