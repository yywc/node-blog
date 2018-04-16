const config = {
  port: 3000,
  maxAge: 30 * 24 * 60 * 60 * 1000,
  // 数据库配置
  database: {
    DATABASE: 'nodeblog',
    USERNAME: 'bloguser',
    PASSWORD: 'guo5664332',
    PORT: '3306',
    HOST: '119.29.101.186'
  }
}

module.exports = config
