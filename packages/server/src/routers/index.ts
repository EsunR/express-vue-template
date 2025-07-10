import type { Express } from 'express';
import testRouter from './test';
import userRouter from './user';

export default function mountRoutes(app: Express) {
  app.use('/api', testRouter);
  app.use('/api', userRouter);
}
