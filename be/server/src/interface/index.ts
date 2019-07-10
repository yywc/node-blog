import { Ctx } from 'ctx';

export interface ArticleModel {
  getOne(ctx: Ctx): void;

  getSome(ctx: Ctx): void;

  getAll(ctx: Ctx): void;

  updateOne(ctx: Ctx): void;

  deleteOne(ctx: Ctx): void;

  createOne(ctx: Ctx): void;
}

export interface OperatorModel {
  login(): void;

  logout(): void;
}