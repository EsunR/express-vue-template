import request from '@client/utils/request';
import {
  GET_TEST_ERROR_API,
  GET_TEST_SUCCESS_API,
  PickServerRes,
} from '@express-vue-template/types/api';
import { AxiosResponse } from 'axios';

export async function getTestSuccess() {
  return (await request.get(GET_TEST_SUCCESS_API)) as AxiosResponse<
    PickServerRes<typeof GET_TEST_SUCCESS_API>
  >;
}

export async function getTestError() {
  return (await request.get(GET_TEST_ERROR_API)) as AxiosResponse<
    PickServerRes<typeof GET_TEST_ERROR_API>
  >;
}
