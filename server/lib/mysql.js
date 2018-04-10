const mysql = require('mysql')
const config = require('./default.js')

const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

let query = function (sql, values) {
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

// 查找用户
let findUserData = function (userName, password) {
  let _sql = `SELECT * FROM blog_user WHERE user_name='${userName}' AND user_password='${password}';`
  return query(_sql)
}

module.exports = {findUserData}
