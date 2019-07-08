import * as glob from 'glob';

export default async (): Promise<Record<string, Function>> => {
  const methods: Record<string, Function> = {}; // 目录下所有方法集合
  const modules = glob.sync(`${__dirname}/*/*.ts`);

  const pr: Promise<Record<string, Function>>[] = [];
  modules.forEach((module): void => {
    pr.push(new Promise(async (resolve, reject): Promise<void> => {
      const data = await import(module).catch((): void => {
        reject('Module import fail');
      });
      resolve(data.default);
    }));
  });

  const results = await Promise.all(pr);
  results.forEach((result): void => {
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        if (methods[key]) {
          throw new Error(`Don't override existed prototype method. method: ${key}`);
        }
        methods[key] = result[key];
      }
    }
  });
  return methods;
};
