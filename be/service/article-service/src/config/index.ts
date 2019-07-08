import { Config } from '@/type';

const config: Config = {
  port: 10101,
  // 数据库配置
  DATABASE: {
    DATABASE: 'node_blog',
    USERNAME: 'blog_user',
    PASSWORD: '123',
    PORT: '3306',
    HOST: 'localhost',
    MULTIPLE_STATEMENTS: true,
    DATE_STRINGS: true,
  },
};

export default config;
