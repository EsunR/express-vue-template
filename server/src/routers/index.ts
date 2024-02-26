import type { Express } from 'express';
import krpanoRouter from './krpano';
import testRouter from './test';
import userRouter from './user';
import posterRouter from './poster';
import mountMessageWsRoute from './ws/message';

export function mountRoutes(app: Express) {
  app.use('/api', testRouter);
  app.use('/api', userRouter);
  app.use('/api', krpanoRouter);
  app.use('/api', posterRouter);
}

export function mountWsRoutes() {
  mountMessageWsRoute();
}
