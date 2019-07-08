import seneca from '@/@types/actAsync';
import { Instance } from 'seneca';

const getService = (): Record<string, Instance> => {
  const host = '`127.0.0.1';
  return {
    article: seneca.client({
      host,
      port: '10101',
    }),
  };
};

export default {
  port: 3000,
  service: getService(),
};
