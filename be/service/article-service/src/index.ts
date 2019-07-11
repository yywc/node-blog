import * as Seneca from 'seneca';
import Config from './common/config';
import Database from './common/database';
import { Ctx } from 'ctx';
import Controller from './controller';

const seneca = Seneca();

// 上下文参数
const ctx: Ctx = {
  query: Database.query,
  seneca,
};

// 注册服务
Controller.registerServices(seneca, ctx);

// 监听端口
seneca.listen(Config.port);

console.log(`start article-service and listen at: ${Config.port}`);
