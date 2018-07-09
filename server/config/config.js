const config = {
  PORT: 3000,
  PAGE_COUNT: 8,
  JWT_SECRET: 'GyjYywc.1993',
  // 数据库配置
  DATABASE_CONFIG: {
    DATABASE: 'nodeblog',
    USERNAME: 'bloguser',
    PASSWORD: 'guo5664332',
    PORT: '3306',
    HOST: '119.29.101.186',
    MULTIPLE_STATEMENTS: true,
    DATE_STRINGS: true
  },
  // cookies
  COOKIES: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie有效时长
    path: '/', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: true // 是否允许重写
    // signed: true,
    // secure: true
  }
}

module.exports = config
