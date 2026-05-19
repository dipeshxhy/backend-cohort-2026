const express = require('express');

function block_1_basicServer() {
  return new Promise((resolve) => {
    const app = express();

    app.use(express.json());

    app.get('/menu', (req, res) => {
      res.json({
        items: ['thali', 'biryani', 'dosa'],
      });
    });

    app.get('/search', (req, res) => {
      const { q, limit } = req.query;
      res.json({
        query: q,
        limit: limit || 10,
        results: ['result1', 'result2', 'result3'],
      });
    });

    app.get('/menu/:id', (req, res) => {
      const { id } = req.params;
      res.json({
        id: id,
        name: 'thali',
        price: 150,
      });
    });

    // ! post routes

    app.post('/order', (req, res) => {
      const { order } = req.body;
      res.status(201).json({
        status: 'created',
        message: 'Order placed successfully',
        order: order,
      });
    });

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://localhost:${port}`;

      try {
        const menuRes = await fetch(`${base}/menu`);
        menuRes.json().then((data) => console.log('Menu:', data));

        fetch(`${base}/search?q=pizza&limit=5`)
          .then((res) => res.json())
          .then((data) => console.log('Search:', data));

        fetch(`${base}/menu/123`)
          .then((res) => res.json())
          .then((data) => console.log('Menu Item:', data));

        fetch(`${base}/order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order: 'thali' }),
        });
      } catch (error) {
        console.error('Error:', error);
      }
    });

    server.on('close', () => {
      console.log('Server 1 closed');
      resolve();
    });
  });
}

function block_2_response() {
  return new Promise((resolve) => {
    const app = express();

    app.get('/custom', (req, res) => {
      res.status(202).json({
        message: 'This is a custom response',
      });
    });

    // ! text
    app.get('/text', (req, res) => {
      res.type('text/plain').send('This is a plain text response');
    });

    // !json
    app.get('/json', (req, res) => {
      res.json({ message: 'This is a JSON response' });
    });

    // ! html
    app.get('/html', (req, res) => {
      res.type('text/html').send('<h1>This is an HTML response</h1>');
    });

    // !not-found
    app.get('/not-found', (req, res) => {
      res.status(404).json({ error: 'Resource not found' });
    });

    //  !health
    app.get('/health', (req, res) => {
      res.sendStatus(200);
    });

    // !redirect
    app.get('/redirect', (req, res) => {
      res.redirect(301, '/custom');
    });

    // !xml
    app.get('/xml', (req, res) => {
      res
        .type('application/xml')
        .send('<message>This is an XML response</message>');
    });

    // !file download
    app.get('/download', (req, res) => {
      res.download('server.js', 'server.js');
    });

    // !custom header
    app.get('/custom-header', (req, res) => {
      res
        .set('X-Custom-Header', 'CustomValue')
        .json({ message: 'Custom header set' });
      res.set('X-Another-Header', 'AnotherValue');

      // cors caching tracing
    });

    app.get('/no-content', (req, res) => {
      res.sendStatus(204);
    });

    const server = app.listen(0, () => {
      const port = server.address().port;
      const base = `http://localhost:${port}`;
      console.log(`Server 2 running on ${base}`);
      server.close();
    });
    server.on('close', () => {
      console.log('Server 2 closed');
      resolve();
    });
  });
}

async function main() {
  await block_1_basicServer();
  await block_2_response();
  process.exit(1);
}
main();
