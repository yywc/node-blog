import { Ctx } from 'ctx';

export default interface ArticleModel {
  getOne(ctx: Ctx): void;

  getSome(ctx: Ctx): void;

  getAll(ctx: Ctx): void;

  updateOne(ctx: Ctx): void;

  deleteOne(ctx: Ctx): void;

  createOne(ctx: Ctx): void;
}