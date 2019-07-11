import * as mysql from 'mysql';
import Config from './config';

type Query = (sql: string, values: any[]) => Promise<void>;

export default class Database {
  public static readonly query = Database.getQuery();

  private static getQuery(): Query {
    const pool = mysql.createPool(Config.database);

    return (sql: string, values: any[]): Promise<void> => {
      return new Promise((resolve, reject): void => {
        pool.getConnection((err, connection): void => {
          if (err) {
            reject(err);
          } else {
            connection.query(sql, values, (err, rows): void => {
              if (err) {
                reject(err);
              } else {
                resolve(rows);
              }
              connection.release();
            });
          }
        });
      });
    };
  }
}
