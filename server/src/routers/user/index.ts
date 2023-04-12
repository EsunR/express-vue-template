import {
  GET_USER_INFO_API,
  POST_USER_CREATE_API,
  PickServerReq,
  PickServerRes,
} from "@koa-vue-template/types/api";
import userModel from "@server/model/User";
import ResBody from "@server/struct/ResBody";
import { verifyRequestArgs } from "@server/utils";
import Router from "koa-router";
import { hashPassword } from "./controller";

const userRouter = new Router();

/**
 * 创建用户
 */
userRouter.post(POST_USER_CREATE_API, async (ctx) => {
  const { name, password } = ctx.request.body as PickServerReq<
    typeof POST_USER_CREATE_API
  >;
  // 校验参数
  const vResult = verifyRequestArgs(ctx.request.body, [
    { key: "name", type: "string", required: true },
    { key: "password", type: "string", required: true },
  ]);
  if (!vResult.result) {
    throw new Error(vResult.errMsg);
  }

  if(await userModel.findOne({ where: { name } })) {
    throw new Error('用户名已存在');
  }

  // 创建用户
  const record = await userModel.create({
    name,
    password: hashPassword(password),
  });

  ctx.body = new ResBody({
    data: {
      name: record.name,
    } as PickServerRes<typeof POST_USER_CREATE_API>,
  });
});

/**
 * 获取用户信息
 */
userRouter.get(GET_USER_INFO_API, async (ctx) => {
  const { name } = ctx.request.query as PickServerReq<typeof GET_USER_INFO_API>;

  const record = await userModel.findOne({
    where: {
      name,
    },
  });

  ctx.body = new ResBody({
    data: {
      id: record.id,
      name: record.name,
      note: record.note,
      createdAt: record.createdAt,
    } as PickServerRes<typeof GET_USER_INFO_API>,
  });
});

export default userRouter;
