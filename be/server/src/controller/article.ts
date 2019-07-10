import { Ctx } from 'ctx';
import { ArticleModel } from '../interface';

const Article: ArticleModel = class {
  public static async getOne(ctx: Ctx): Promise<void> {
    const { responseJSON } = ctx.util;
    const { id } = ctx.params;
    if (id) {
      const data = await ctx.service.article.actAsync({
        role: 'article',
        cmd: 'one.get',
        params: { id },
      });
      console.log(data);
      ctx.body = responseJSON(0, 'SUCCESS', data);
    }
  }

  public static async getSome(ctx: Ctx): Promise<void> {
    console.log(ctx);
  }

  public static async getAll(ctx: Ctx): Promise<void> {
    console.log(ctx);
  }

  public static async updateOne(ctx: Ctx): Promise<void> {
    console.log(ctx);
  }

  public static async deleteOne(ctx: Ctx): Promise<void> {
    console.log(ctx);
  }

  public static async createOne(ctx: Ctx): Promise<void> {
    console.log(ctx);
  }
};

export default Article;
