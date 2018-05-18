const config = {
  PORT: 3000,
  MAX_AGE: 30 * 24 * 60 * 60 * 1000,
  PAGE_COUNT: 8,
  // 数据库配置
  DATABASE_CONFIG: {
    DATABASE: 'nodeblog',
    USERNAME: 'bloguser',
    PASSWORD: 'guo5664332',
    PORT: '3306',
    HOST: '119.29.101.186',
    MULTIPLE_STATEMENTS: true
  }
}

module.exports = config
