import 'dotenv/config';

import http from 'node:http';
import { env } from './config/env.js';
import { createServerApplication } from './app/index.js';

async function main() {
  try {
    const server = http.createServer(createServerApplication());

    const port = env.PORT ?? 8000;

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error on starting server:', error);
  }
}
main();
