import * as fs from 'fs';
import * as path from 'path';

export default class Controller {
  private static tree: Record<string, any> = {};
  private static isLoaded = false;

  private static set(d = __dirname): Controller {
    const tree: Record<string, any> = {};
    const dirs: string[] = []; // 文件夹数组
    const files: string[] = []; // 文件数组

    fs.readdirSync(d).forEach((item: string): void => {
      const isDir = fs.statSync(path.join(d, item)).isDirectory();
      if (isDir) {
        dirs.push(item);
      } else if (item !== 'index.ts') {
        files.push(item);
      }
    });

    // 映射文件夹
    dirs.forEach((dir): void => {
      tree[dir] = Controller.set(path.join(d, dir));
    });

    // 映射文件
    files.forEach((file): void => {
      if (path.extname(file) === '.ts') {
        tree[path.basename(file, '.ts')] = require(path.join(d, file)).default;
      }
    });

    Controller.isLoaded = true;

    return tree;
  }

  public static get<T>(key: string): T {
    if (!Controller.isLoaded) {
      Controller.tree = Controller.set();
    }
    const keys = key.split('/');
    const getResult = (keys: string[]): any => {
      const node = Controller.tree[keys[0]];
      if (keys.length === 1) {
        if (!node) {
          throw new Error(`Cannot find model of '${key}', key muse be the same as class name`);
        }
        return node;
      }
      keys.shift();
      return getResult(keys);
    };
    return getResult(keys);
  }
}
