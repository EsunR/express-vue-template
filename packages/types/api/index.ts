import { ITestApi } from "./test";
import { IUserApi } from "./user/types";

export type ServerAPI = ITestApi & IUserApi;

export type PickServerReq<P extends keyof ServerAPI> = ServerAPI[P]["req"];
export type PickServerRes<P extends keyof ServerAPI> = ServerAPI[P]["res"];

export interface ResponseData<T = any> {
  success: boolean;
  data: T;
  msg: string;
}

export * from "./test";
export * from "./user";
