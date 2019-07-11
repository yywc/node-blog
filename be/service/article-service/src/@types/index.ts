declare module 'ctx' {
  import { Instance } from 'seneca';

  export interface Ctx {
    readonly query: (sql: string, values: any[]) => Promise<void>;
    readonly seneca: Instance;
  }
}