import { GET_TEST_ERROR_API, GET_TEST_SUCCESS_API } from ".";

export interface ITestApi {
  [GET_TEST_SUCCESS_API]: {
    req: never;
    res: {
      time: string;
    };
  };
  [GET_TEST_ERROR_API]: {
    req: never;
    res: never;
  };
}
