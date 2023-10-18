import ResBody from '@server/struct/ResBody';
import { requestLogger } from '@server/utils/log';
import { NextFunction, Request, Response } from 'express';

export default function errorHandler() {
  return function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (res.headersSent) {
      return next(err);
    }
    if (err instanceof Error) {
      // 判断是否携带有错误码
      const messageArr = err.message.split('-');
      let statusCode = 500;
      let errorMessage = err.message;
      if (messageArr.length > 1 && !isNaN(parseInt(messageArr[0].trim()))) {
        statusCode = parseInt(messageArr[0].trim());
        errorMessage = messageArr.slice(1).join('-').trim();
      }
      requestLogger.error(
        `[${req.method}] ${req.path} ${statusCode} ${errorMessage}`
      );
      // 返回错误
      return res.status(statusCode).json(
        new ResBody({
          success: false,
          msg: errorMessage,
        })
      );
    }
    next(err);
  };
}
