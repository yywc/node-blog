import { ResponseJSON } from 'ctx';

export default {
  responseJSON(code: number, msg: string, data: Record<string, any>): ResponseJSON {
    const result: ResponseJSON = {
      code,
      msg,
    };
    if (data) {
      result.data = data;
    }
    return result;
  },
};
