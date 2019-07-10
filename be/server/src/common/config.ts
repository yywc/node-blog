import seneca from '../@types/actAsync';
import { Instance } from 'seneca';

export default class Config {
  public static readonly port = 3000;
  public static readonly service = Config.getService();

  private static getService(): Record<string, Instance> {
    const host = '127.0.0.1';
    return {
      article: seneca.client({
        host,
        port: 10101,
      }),
    };
  }
}
