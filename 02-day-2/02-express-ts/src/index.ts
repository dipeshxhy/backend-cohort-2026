import 'dotenv/config';

import http from 'node:http';
import { createServerApplication } from './app/index.js';
import { env } from './env.js';

async function main() {
  try {
    const server = http.createServer(createServerApplication());

    const port = env.PORT ?? 8000;
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}
main();
