import request from '@client/utils/request';
import {
  GET_USER_INFO_API,
  POST_USER_CREATE_API,
  PickServerReq,
  PickServerRes,
} from '@koa-vue-template/types/api';
import { AxiosResponse } from 'axios';

export async function createUser(
  data: PickServerReq<typeof POST_USER_CREATE_API>
) {
  return (await request.post(POST_USER_CREATE_API, data)) as AxiosResponse<
    PickServerRes<typeof POST_USER_CREATE_API>
  >;
}

export async function getUserInfo(
  params: PickServerReq<typeof GET_USER_INFO_API>
) {
  return (await request.get(GET_USER_INFO_API, { params })) as AxiosResponse<
    PickServerRes<typeof GET_USER_INFO_API>
  >;
}
