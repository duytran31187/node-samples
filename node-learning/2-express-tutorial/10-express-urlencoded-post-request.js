const express = require('express')
const app = express()
const logger = require('./logger');
const authorize = require('./authorize');
const morgan = require('morgan');
//  req => middleware => res
app.use([morgan('tiny')]);
// api/home/about/products
// parse form data
app.use(express.urlencoded({ extended: false })) // parse if Content-Type is application/x-www-form-urlencoded
// parse json
app.use(express.json()) // // parse if Content-Type is application/json

app.get('/', (req, res) => {
  res.send('Home')
})
app.post('/api/user', (req, res) => {
  const {user} = req.body;
  console.log(req.body);
  if (user) {
    res.status(200).send(`Welcome ${user}`);
  } else {
    res.status(401).send('please provide credentials');
  }
});


app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})