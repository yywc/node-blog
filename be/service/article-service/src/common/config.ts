import { PoolConfig } from 'mysql';

export default class Config {
  public static readonly port = 10101;

  public static readonly database: PoolConfig = {
    database: 'node_blog',
    user: 'blog_user',
    password: '123',
    port: 3306,
    host: 'localhost',
    multipleStatements: true,
    dateStrings: true,
  }
}