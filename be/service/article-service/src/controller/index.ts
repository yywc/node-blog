import * as glob from 'glob';
import { Instance } from 'seneca';
import { Ctx } from 'ctx';

export default class Controller {

  public static registerServices(seneca: Instance, ctx: Ctx): void {
    // 自动加载服务
    const services = glob.sync(`${__dirname}/**/*.ts`);
    services.forEach((path): void => {
      const { service } = require(path).default;
      service && seneca.use(service, ctx);
    });
  }
}
