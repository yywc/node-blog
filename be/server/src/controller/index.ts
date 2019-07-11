import * as glob from 'glob';
import * as path from 'path';

export default class Controller {
  private static tree: Record<string, any> = {};
  private static isLoaded = false;

  private static register(): Controller {
    const tree: Record<string, any> = {};
    const paths = glob.sync(`${__dirname}/**/*.ts`);
    paths.forEach((p): void => {
      const name = path.relative(__dirname, p);
      // 不挂载当前文件
      if (name !== 'index.ts' && path.extname(name) === '.ts') {
        tree[name.replace('.ts', '')] = require(p).default;
      }
    });
    return tree;
  }

  public static get<T>(key: string): T {
    if (!Controller.isLoaded) {
      Controller.tree = Controller.register();
    }
    const node = Controller.tree[key];
    if (!node) {
      throw new Error(`Cannot find model of '${key}', 
      key muse be like <[controller path/]filename or directory_name/filename>`);
    }
    return node;
  }
}
