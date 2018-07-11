const production = (process.env.NODE_ENV ? process.env.NODE_ENV : 'production') === 'production'

const config = {
  PORT: 3000,
  PAGE_COUNT: 8,
  JWT_SECRET: '?GyjYywc.1993$',
  // 数据库配置
  DATABASE_CONFIG: {
    DATABASE: production ? '' : 'nodeblog',
    USERNAME: production ? '' : 'bloguser',
    PASSWORD: production ? '' : 'guo5664332',
    PORT: '3306',
    HOST: production ? '' : '119.29.101.186',
    MULTIPLE_STATEMENTS: true,
    DATE_STRINGS: true
  },
  // cookies
  COOKIES: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // cookie有效时长
    path: '/', // 写cookie所在的路径
    domain: production ? 'iwangshu.com' : '', // 写cookie所在的域名
    httpOnly: true, // 是否只用于http请求中获取
    overwrite: true, // 是否允许重写
    secure: production ? true : '',
    sameSite: production ? 'Strict' : '',
    signed: ''
  }
}

module.exports = config
