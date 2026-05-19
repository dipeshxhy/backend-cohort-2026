import express from 'express';
import { errorHandler } from './common/middleware/error-handler.js';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.use(errorHandler);

export default app;
