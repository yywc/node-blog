declare module 'ctx' {
  import { ParameterizedContext } from 'koa';
  import { Instance } from 'seneca';

  export interface ResponseJSON {
    code: number;
    msg: string;
    data?: Record<string, any>;
  }

  export interface Ctx extends ParameterizedContext {
    service: Record<string, Instance>;
    util: {
      responseJSON: (code: number, msg: string, data?: Record<string, any>) => ResponseJSON;
    };
  }
}
