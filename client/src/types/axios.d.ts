import { AxiosRequestConfig as OriginalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig extends OriginalAxiosRequestConfig {
    /**
     * 是否禁用错误提示
     */
    silent?: boolean
  }
}
