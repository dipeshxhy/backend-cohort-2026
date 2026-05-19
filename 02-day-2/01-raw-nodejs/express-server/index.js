const express = require('express');

const app = express();

app.use(express.json());

app.get('/menu', (req, res) => {
  res.send('menu ');
});

const orderFn = (req, res) => {
  const order = req.body;
  console.log(order);
  res.send('order received');
};
app.post('/order', orderFn);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
