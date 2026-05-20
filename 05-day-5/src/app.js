import express from 'express';
import { errorHandler } from './common/middleware/error-handler.js';
import authRouter from './modules/auth/auth.routes.js';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

// !routes
app.use('/api/v1/auth', authRouter);

app.use(errorHandler);

export default app;
