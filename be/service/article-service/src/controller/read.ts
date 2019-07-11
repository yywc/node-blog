import { Ctx } from 'ctx';
import { AddCallback } from 'seneca';

enum Direction {
  Left = 1,
  Right = 2,
}

export default class Read {
  private static readonly role = 'article'; // 服务前缀
  public static service = (ctx: Ctx): void => {
    const result = Read.getCmd(ctx);
    for (const key in result) {
      ctx.seneca.add({
        role: Read.role,
        cmd: key,
      }, result[key]);
    }
  };

  private static getCmd(ctx: Ctx): Record<string, AddCallback> {
    return {
      // 获取某一篇文章以及评论数，参数为文章 id
      'one.get': async (msg, respond): Promise<void> => {
        const { id, direction } = msg.params;
        let sql: string;
        switch (direction) {
          case Direction.Left:
            sql = 'SELECT * FROM `article` WHERE `id` < ? ORDER BY `article_id` DESC LIMIT 1;';
            break;
          case Direction.Right:
            sql = 'SELECT * FROM `article` WHERE `id` > ? LIMIT 1;';
            break;
          default:
            sql = 'SELECT * FROM `article` WHERE id=?;';
            break;
        }
        sql += 'SELECT COUNT(`id`) AS `comment_count` FROM `comment` WHERE `article_id`=?;';
        const result = await ctx.query(sql, [id, id]);
        respond(null, result);
      },

      // // 获取查询的文章
      // 'some.get': async (msg, respond): Promise<void> => {
      //   const {
      //     title, page, pageSize, category, tag,
      //   } = msg.params;
      //   const where = {};
      //   if (title) {
      //     where.title = {
      //       contains: title,
      //     };
      //   }
      //   if (category) {
      //     where.category = category;
      //   }
      //   if (tag) {
      //     where.tag = tag;
      //   }
      //   const condition = {
      //     where,
      //     limit: pageSize,
      //     skip: pageSize * (page - 1),
      //   };
      //   const [result, count] = await Promise.all([
      //     articleModel.find(condition),
      //     articleModel.count({ where }),
      //   ]);
      //   respond(null, {
      //     result,
      //     count,
      //   });
      // },

      // // 获取所有的文章
      // 'all.get': async (msg, respond): Promise<void> => {
      //   const { page, pageSize, category } = msg.params;
      //   const condition = {
      //     limit: pageSize,
      //     skip: pageSize * (page - 1),
      //   };
      //   if (category) {
      //     condition.where = { category };
      //   }
      //   const [result, count] = await Promise.all([
      //     articleModel.find(condition),
      //     articleModel.count(),
      //   ]);
      //   respond(null, {
      //     result,
      //     count,
      //   });
      // },
    };
  }
}
