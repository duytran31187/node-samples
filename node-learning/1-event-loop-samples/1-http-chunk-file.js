const http = require('http');
const {createReadStream} = require('fs');

http.createServer((req, res) => {
  const stream = createReadStream('./files/big.txt');
  stream.on('open', () => {
    stream.pipe(res);
  });
  stream.on('error', (err) => {
    res.end(err);
  })
}).listen(5000);