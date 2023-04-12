import cors from "@koa/cors";
import dbGenerator from "@server/db/db_generator";
import errorHandler from "@server/middle/error_handler";
import Koa from "koa";
import KoaBody from "koa-body";
import KoaLogger from "koa-logger";
import Router from "koa-router";
import KoaStatic from "koa-static";
import { NODE_PORT } from "./config";
import { STATIC_DIR_PATH } from "./config/paths";

const app: Koa = new Koa();
const router: Router = new Router();

// 需要数据库连接可选择接触该行注释
dbGenerator();

// log
app.use(KoaLogger());

// 错误处理
app.use(errorHandler());

// 静态文件服务
app.use(KoaStatic(STATIC_DIR_PATH, { gzip: true }));

// CORS
app.use(cors());

// 解析 HTTP Body
app.use(
  KoaBody({
    multipart: true,
    formidable: {
      maxFieldsSize: 2000 * 1024 * 1024,
    },
  })
);

// Router
import testRouter from "./routers/test";
import userRouter from "./routers/user";
router.use("/api", testRouter.routes());
router.use("/api", userRouter.routes());

app.use(router.routes()).use(router.allowedMethods());

// Listen
app.listen(NODE_PORT);
console.log(`serve running on port ${NODE_PORT}`);
