import * as Seneca from 'seneca';
import { Pattern } from 'seneca';

declare module 'seneca' {
  interface Instance {
    actAsync<PatternWithArgs = Pattern>(pattern: PatternWithArgs): any;
  }
}

const seneca = Seneca();

seneca.actAsync = function <PatternWithArgs = Pattern>(pattern: PatternWithArgs): any {
  return new Promise((resolve, reject): void => {
    this.act(pattern, (error: (Error | null), result?: any): void => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

export default seneca;
