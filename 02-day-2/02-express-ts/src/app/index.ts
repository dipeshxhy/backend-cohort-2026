import express, { type Application } from 'express';
import todoRouter from './todo/routes.js';

export function createServerApplication(): Application {
  const app = express();
  app.use(express.json());

  //#region // ===== Routes ======
  app.use('/todos', todoRouter);
  //#endregion

  return app;
}
