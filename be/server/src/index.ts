import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as KoaBodyParser from 'koa-bodyparser';
import config from './common/config';
import util from './common/util';
import ApiController from './api/controller';

const app = new Koa();
const router = new Router();

app.on('error', (err, ctx): void => {
  console.error('server error', err, ctx);
});

app.proxy = true;

app.use(KoaBodyParser());

app.use(async (ctx, next): Promise<void> => {
  Object.assign(ctx, {
    service: config.service,
    util,
  });
  await next();
});

// 路由配置
(async (): Promise<void> => {
  const controller = await ApiController();
  router.all('/api', controller);
  app.use(router.routes());
})();

// 开启端口
app.listen(config.port, (): void => {
  console.log(`start blog-server and listen at:  ${config.port}`);
});
