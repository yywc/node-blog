import Methods from '@/api/methods';
import { Middleware } from 'koa';

export default (): Middleware => async (ctx: any): Promise<void> => {
  // 加载 methods 下所有的模块
  const methods = await Methods();
  const { method, params } = ctx.request.body;
  // 权限登录
  // const allowUrl = ['article.all.get'];
  // const { account } = ctx.session;

  // if (!_.isEmpty(account)) {
  //   ctx.account = account;
  // }

  // if (!account && !_.includes(allowUrl, method)) {
  //   ctx.body = ctx.utile.responseJSON(-1, 'session 过期');
  //   return;
  // }
  if (!methods[method]) {
    ctx.body = ctx.util.responseJSON(404, '没有找到该方法');
    return;
  }
  const response = await methods[method.trim()](ctx, params);
  if (response) {
    ctx.body = response;
  }
};
