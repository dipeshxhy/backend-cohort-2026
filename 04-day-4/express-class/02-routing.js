const express = require('express');

function block_1_basicServer() {
  return new Promise((resolve) => {
    const app = express();

    app.use(express.json());

    const routes = [
      {
        id: 1,
        name: 'Dadar-Andhari Express',
        direction: 'North',
      },
      {
        id: 2,
        name: 'Dadar-Kalyan Local',
        direction: 'South',
      },
    ];

    let nextId = 3;

    // list all trains
    app.get('/routes', (req, res) => {
      res.json({
        routes: routes,
      });
    });

    // get train by id
    app.get('/routes/:id', (req, res) => {
      const { id } = req.params;
      const route = routes.find((r) => r.id === parseInt(id));
      if (route) {
        res.json(route);
      } else {
        res.status(404).json({ error: 'Route not found' });
      }
    });

    app.post('/routes', (req, res) => {
      const { name, direction } = req.body;
      if (!name || !direction) {
        return res
          .status(400)
          .json({ error: 'Name and direction are required' });
      }
      const newRoute = {
        id: nextId++,
        name,
        direction,
      };
      routes.push(newRoute);
      res.status(201).json(newRoute);
    });

    app.patch('/routes/:id', (req, res) => {
      const { id } = req.params;
      const route = routes.find((r) => r.id === parseInt(id));
      if (!route) {
        return res.status(404).json({ error: 'Route not found' });
      }
      const { name, direction } = req.body;
      if (name) route.name = name;
      if (direction) route.direction = direction;
      res.json(route);
    });

    app.delete('/routes/:id', (req, res) => {
      const { id } = req.params;
      const index = routes.findIndex((r) => r.id === parseInt(id));
      if (index === -1) {
        return res.status(404).json({ error: 'Route not found' });
      }
      routes.splice(index, 1);
      res.status(204).end();
    });

    app.get('/files/*filepath', (req, res) => {
      const filePath = req.params.filepath;
      const { filepath } = req.params;
      res.json({
        filepath: filepath,
      });
    })

    const server = app.listen(0, async () => {
      const port = server.address().port;
      const base = `http://localhost:${port}`;
    });

    try {
      const routesRes = await fetch(`${base}/routes`);
      routesRes.json().then((data) => console.log('Routes:', data));

      fetch(`${base}/routes/1`)
        .then((res) => res.json())
        .then((data) => console.log('Route 1:', data));
      
      fetch(`${base}/routes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Dadar-Thane Local', direction: 'North' }),
      })
        .then((res) => res.json())
        .then((data) => console.log('Created Route:', data));
      
      fetch(`${base}/routes/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Dadar-Andheri Express' }),
      })
        .then((res) => res.json())
        .then((data) => console.log('Updated Route 1:', data));
      
      fetch(`${base}/routes/2`, {
        method: 'DELETE',
      }).then(() => console.log('Deleted Route 2'));
      
      
    } catch (error) {
      console.error('Error:', error);
    }

    server.on('close', () => {
      console.log('Server 1 closed');
      resolve();
    });
  });
}

async function main() {
  await block_1_basicServer();
  process.exit(1);
}
main();
