const http = require('http');

// run command: node simpleServer.js
const server = http.createServer((req, res) => {
    console.log(`server is running on port 5000`);
    res.write(`Hello World \n`);
    if (req.url === '/about') {
        res.end('The about page\n');
    }
    res.end('homepage');
});
server.listen(5000);