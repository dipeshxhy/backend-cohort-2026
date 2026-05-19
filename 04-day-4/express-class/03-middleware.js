const express = require('express');

function block_1_basicServer() {
  return new Promise((resolve) => {
    const app = express();
    
    app.use(express.json({
      limit: '50kb',
    }));

    app.use(express.urlencoded({ extended: true, limit: '50kb' }));
    
    app.use(express.static({
      dotfiles: 'ignore',
      etag: false,
      extensions: ['html', 'css', 'js'],
      index: 'index.html',
      maxAge: '1d',
      redirect: false,
    }))

    app.use(express.json());

    // middlewares
    app.use((req, res, next) => {

      // add to db
      // write in some file
      // authenticate user
      console.log('Request received:', req.method, req.url);

      //  if your request hangs forever and never reaches the route handler, check if you forgot to call next() in your middleware
      next();
    });

    app.use((req, res, next) => { 
      req.requestTime = new Date();

      res.on('finish', () => {
        const duration = new Date() - req.requestTime;
        console.log(`Request to ${req.url} took ${duration}ms`);
      });
      next();
    });

    function authMe(req, res, next) {
      const token = req.headers['x-auth-token']
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }
      if (token !== 'chaicode') {
        return res.status(403).json({ error: 'Invalid token' });
      }
      // extract data from token and add to req.user
      req.user = { id: 1, name: 'Dipesh',role:'admin' };
      next();
    }

    app.get('/profile', authMe, (req, res) => {
      res.json({
        message: 'This is your profile',
        user: req.user,
      });
    });

    function getRoles(...roles) {
      return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ error: 'Forbidden' });
        }
        next();
      } 
    }

    // rate limiter middleware
    function rateLimiter(maxRequest) {
      let count = 0
      // implement rate limiting logic here
      return (req, res, next) => {
        count++;
        if(count > maxRequest) {
          return res.status(429).json({ error: 'Too Many Requests' });
        }
        // check if user has exceeded maxRequest
        // if yes, return 429 Too Many Requests
        // else, call next()
        next();
      }
    }

  

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

    app.route('/schedule').get().post();

    app.use('/api', () => {
      // prefetch matching /api/* routes
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
