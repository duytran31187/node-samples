const { createReadStream } = require('fs');

const stream = createReadStream('./files/big.txt');

stream.on('data', (chunk) => {
  console.log('Got %d characters of string data:', chunk.length); // https://nodejs.org/api/stream.html#readablereadsize
  console.log(`chunk data ${chunk}`);
});
stream.on('error', (error) => {
  console.log(`error ${error}}`);
})