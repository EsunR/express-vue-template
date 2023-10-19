import type { Express } from 'express';
import testRouter from './test';
import userRouter from './user';
import mountMessageWsRoute from './ws/message';

export function mountRoutes(app: Express) {
  app.use('/api', testRouter);
  app.use('/api', userRouter);
}

export function mountWsRoutes() {
  mountMessageWsRoute();
}
