import cors from 'cors';
import express from 'express';
import { NODE_PORT } from './config';
import { STATIC_DIR_PATH } from './config/paths';
import dbGenerator from './db/db_generator';
import errorHandler from './middle/error_handler';
import requestHandler from './middle/request_handler';
import testRouter from './routers/test';
import userRouter from './routers/user';

// const app: Koa = new Koa();
const app = express();

// 需要数据库连接可选择接触该行注释
dbGenerator();

// 错误处理
app.use(requestHandler());

// 静态文件服务
app.use(express.static(STATIC_DIR_PATH));

// CORS
app.use(cors());

// 解析 HTTP Body
app.use(express.json());

// Router
app.use('/api', testRouter);
app.use('/api', userRouter);

app.use(errorHandler());

// Listen
app.listen(NODE_PORT);
console.log(`serve running on port ${NODE_PORT}`);
