declare module 'ctx' {
  import { ParameterizedContext } from 'koa';
  import { Instance } from 'seneca';

  export interface ResponseJSON {
    readonly code: number;
    readonly msg: string;
    data?: Record<string, any>;
  }

  export interface Ctx extends ParameterizedContext {
    readonly service: Record<string, Instance>;
    readonly util: {
      responseJSON: (code: number, msg: string, data?: Record<string, any>) => ResponseJSON;
    };
  }
}
