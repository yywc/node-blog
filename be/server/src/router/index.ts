import * as KoaRouter from 'koa-router';
import Controller from '../controller';
import { ArticleModel } from '../interface';

export default class Router {
  public static readonly instance = Router.initRouter();

  private static initRouter(): KoaRouter {
    const router = new KoaRouter();

    // 文章
    const article = Controller.get<ArticleModel>('article');
    router.get('/article/one/get/:id', article.getOne as any);

    return router;
  }
}
