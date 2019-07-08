import * as Seneca from 'seneca';
import * as glob from 'glob';
import config from './config';
import query from './database';
import { PluginOptions } from '@/type';
import { PluginModule } from 'seneca';

const seneca = Seneca();

// 上下文参数
const ctx: PluginOptions = {
  query,
  seneca,
  config,
};

// 自动加载服务
const services = glob.sync(`${__dirname}/controller/*.ts`);

(async (): Promise<void> => {
  const pr: Promise<PluginModule>[] = [];

  services.forEach((v: string): void => {
    pr.push(new Promise(async (resolve, reject): Promise<void> => {
      const data = await import(v).catch((): void => {
        reject('Module import fail');
      });
      resolve(data.default);
    }));
  });

  const result = await Promise.all(pr);
  result.forEach((service: PluginModule): void => {
    seneca.use(service, ctx);
  });
})();

// 监听端口
seneca.listen(config.port);

console.log(`start article-service and listen at: ${config.port}`);
