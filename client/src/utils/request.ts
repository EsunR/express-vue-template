import { ResponseData } from '@express-vue-template/types/api';
import axios, { AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import qs from 'qs';

const request = axios.create({ baseURL: '/api', timeout: 10000 });

request.interceptors.request.use((config) => {
  if (config.method === 'get') {
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    };
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (e: AxiosError<ResponseData>) => {
    const errorMsg = e.response?.data?.msg ?? '服务端错误，请稍后重试';
    if (!e.config.silent) {
      ElMessage({
        message: errorMsg,
        type: 'error',
      });
    }
    throw e;
  }
);

export default request;
