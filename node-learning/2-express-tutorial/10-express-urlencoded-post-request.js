const express = require('express')
const app = express()
const logger = require('./logger');
const authorize = require('./authorize');
const morgan = require('morgan');
//  req => middleware => res
app.use([morgan('tiny')]);
// api/home/about/products
app.use(express.urlencoded());
app.get('/', (req, res) => {
  res.send('Home')
})
app.post('/api/user', (req, res) => {
  const {user} = req.body;
  if (user) {
    res.status(200).send(`Welcome ${user}`);
  } else {
    res.status(401).send('please provide credentials');
  }
});
// make post to http://localhost:5000/api/user with {user:duy}

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})