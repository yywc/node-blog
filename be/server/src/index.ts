import * as Koa from 'koa';
import * as KoaBodyParser from 'koa-bodyparser';
import Config from './common/config';
import Util from './common/util';
import Router from './router';

const app = new Koa();

app.on('error', (err, ctx): void => {
  console.error('server error', err, ctx);
});

app.proxy = true;

app.use(KoaBodyParser());

app.use(async (ctx, next): Promise<void> => {
  Object.assign(ctx, {
    service: Config.service,
    util: Util,
  });
  await next();
});

// 路由配置
app
  .use(Router.instance.routes())
  .use(Router.instance.allowedMethods());

// 开启端口
app.listen(Config.port, (): void => {
  console.log(`start blog-server and listen at:  ${Config.port}`);
});
