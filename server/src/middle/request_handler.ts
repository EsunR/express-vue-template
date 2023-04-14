import { requestLogger } from '@server/utils/log';
import { NextFunction, Request, Response } from 'express';

export default function requestHandler() {
  return function (req: Request, res: Response, next: NextFunction) {
    requestLogger.info(`[${req.method}] ${req.path}`);
    next();
  };
}
