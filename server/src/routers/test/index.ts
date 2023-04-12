import ResBody from '@server/struct/ResBody';
import Router from 'koa-router';
import {
  GET_TEST_ERROR_API,
  GET_TEST_SUCCESS_API,
} from '@koa-vue-template/types/api';

const testRouter = new Router();

testRouter.get(GET_TEST_SUCCESS_API, async (ctx) => {
  ctx.body = new ResBody({
    data: { time: new Date() },
  });
});

testRouter.get(GET_TEST_ERROR_API, async (ctx) => {
  try {
  } catch (error) {}
  throw new Error('500-服务器接口错误测试');
});

export default testRouter;
