import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { NODE_PORT } from './config';
import { STATIC_DIR_PATH } from './config/paths';
import dbGenerator from './db/db_generator';
import { createIO } from './instance/ws';
import errorHandler from './middleware/errorHandler';
import requestHandler from './middleware/requestHandler';
import { mountRoutes, mountWsRoutes } from './routers';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

const app = express();
const server = createServer(app);
const io = createIO(server);

// 需要数据库连接可选择接触该行注释
dbGenerator();

// 错误处理
app.use(requestHandler());

// 静态文件服务
app.use(express.static(STATIC_DIR_PATH));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// CORS
app.use(cors());

// 解析 HTTP Body
app.use(express.json());

// 解析 cookie
app.use(cookieParser());

// Router
mountWsRoutes();
mountRoutes(app);

// 错误处理
app.use(errorHandler());

// Listen
server.listen(NODE_PORT, () => {
  console.log(`serve running on port ${NODE_PORT}`);
});
