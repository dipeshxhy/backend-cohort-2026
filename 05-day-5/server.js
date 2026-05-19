import 'dotenv/config';

import http from 'node:http';
import app from './src/app.js';
import { connectDB } from './src/common/config/db.js';

const port = process.env.PORT ?? 8000;

const main = async () => {
  const server = http.createServer(app);
  server.listen(port, () => {
    try {
      await connectDB();
      
      console.log(`Server is up and running on  http://localhost:${port}`);
    } catch (error) {
      console.error(
        `Error occurred while starting the server: ${error.message}`,
      );
      process.exit(1);
    }
  });
};

main();
