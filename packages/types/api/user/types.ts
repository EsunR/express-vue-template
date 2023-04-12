import { GET_USER_INFO_API, POST_USER_CREATE_API } from ".";
import { UserAttributes } from "../../model/user";

export interface IUserApi {
  [POST_USER_CREATE_API]: {
    req: {
      name: string;
      password: string;
    };
    res: {
      name: string;
    };
  };
  [GET_USER_INFO_API]: {
    req: {
      name: string;
    };
    res: Pick<UserAttributes, "id" | "name" | "createdAt" | "note">;
  };
}
