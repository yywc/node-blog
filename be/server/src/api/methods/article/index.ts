import { ResponseJSON } from 'ctx';

export default {
  'article.one.get': async (ctx: any, params: any): Promise<ResponseJSON> => {
    const { responseJSON } = ctx.util;
    const { id } = params;
    if (id) {
      const data = await ctx.service.article.actAsync({
        role: 'article',
        cmd: 'one.get',
        params: { id },
      });
      return responseJSON(0, 'SUCCESS', data);
    }
    return responseJSON(-1, '缺少参数: 文章ID');
  },
};
