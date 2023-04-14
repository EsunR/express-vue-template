import {
  GET_TEST_ERROR_API,
  GET_TEST_SUCCESS_API,
} from '@express-vue-template/types/api';
import { Router } from 'express';

const testRouter = Router();

testRouter.get(GET_TEST_SUCCESS_API, async (req, res) => {
  res.json({
    data: { time: new Date() },
  });
});

testRouter.get(GET_TEST_ERROR_API, async (req, res) => {
  // express 5 开始，在 async 函数中抛出错误会被自动捕获，不需要再调用 next
  new Error('500-服务器接口错误测试');
});

export default testRouter;
