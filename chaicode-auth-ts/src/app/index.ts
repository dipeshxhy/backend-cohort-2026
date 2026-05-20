import type { Application } from 'express';
import express from 'express';

export function createServerApplication(): Application {
  const app = express();

  app.get('/health', (req, res) => {
    res.sendStatus(200).end();
  });

  return app;
}
