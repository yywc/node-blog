import { ResponseJSON } from 'ctx';

export default class Util {
  public static responseJSON(
    code: number,
    msg: string,
    data?: Record<string, any>): ResponseJSON {
    const result: ResponseJSON = {
      code,
      msg,
    };
    if (data) {
      result.data = data;
    }
    return result;
  }
}
