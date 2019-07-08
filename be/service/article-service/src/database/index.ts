import * as mysql from 'mysql';
import config from '@/config';

const pool = mysql.createPool({
  host: config.DATABASE.HOST,
  user: config.DATABASE.USERNAME,
  password: config.DATABASE.PASSWORD,
  database: config.DATABASE.DATABASE,
  multipleStatements: config.DATABASE.MULTIPLE_STATEMENTS,
  dateStrings: config.DATABASE.DATE_STRINGS,
});

export default (sql: string, values: any[]): Promise<void> => {
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
