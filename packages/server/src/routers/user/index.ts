import { Router } from 'express';
import { verifyRequestArgs } from '@server/utils';
import {
  GET_USER_INFO_API,
  POST_USER_CREATE_API,
  PickServerReq,
  PickServerRes,
} from '@express-vue-template/types/api';
import userModel from '@server/model/User';
import ResBody from '@server/struct/ResBody';
import { hashPassword } from './controller';

const userRouter = Router();

/**
 * 创建用户
 */
userRouter.post(POST_USER_CREATE_API, async (req, res, next) => {
  const { name, password } = req.body as PickServerReq<
    typeof POST_USER_CREATE_API
  >;
  // 校验参数
  const vResult = verifyRequestArgs(req.body, [
    { key: 'name', type: 'string', required: true },
    { key: 'password', type: 'string', required: true },
  ]);
  if (!vResult.result) {
    throw new Error(vResult.errMsg);
  }

  if (await userModel.findOne({ where: { name } })) {
    throw new Error('用户名已存在');
  }

  // 创建用户
  const record = await userModel.create({
    name,
    password: hashPassword(password),
  });

  res.json(
    new ResBody({
      data: {
        name: record.name,
      } as PickServerRes<typeof POST_USER_CREATE_API>,
    })
  );
});

/**
 * 获取用户信息
 */
userRouter.get(GET_USER_INFO_API, async (req, res, next) => {
  const { name } = req.query as PickServerReq<typeof GET_USER_INFO_API>;

  const record = await userModel.findOne({
    where: {
      name,
    },
  });

  res.json(
    new ResBody({
      data: {
        id: record.id,
        name: record.name,
        note: record.note,
        createdAt: record.createdAt,
      } as PickServerRes<typeof GET_USER_INFO_API>,
    })
  );
});

export default userRouter;
