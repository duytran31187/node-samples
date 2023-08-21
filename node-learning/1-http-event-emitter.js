const EventEmitter = require('events');
const http = require('http');

const customEmitter = new EventEmitter();
customEmitter.on('response', (name, id) => {
  console.log(`data received user ${name} with id: ${id}`);
})
customEmitter.emit('response', 'duy', 31);
//sample with http

const server = http.createServer();
server.on('request', (req, res) => {
  res.end('welcome'); // in browser open: http://localhost:5000/
})
server.listen(5000);
