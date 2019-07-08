import * as Seneca from 'seneca';

export interface Config {
  port: number;
  // 数据库配置
  DATABASE: {
    DATABASE: string;
    USERNAME: string;
    PASSWORD: string;
    PORT: string;
    HOST: string;
    MULTIPLE_STATEMENTS: boolean;
    DATE_STRINGS: boolean;
  };
}

export interface PluginOptions {
  query: (sql: string, values: any[]) => Promise<void>;
  seneca: Seneca.Instance;
  config: Config;
}